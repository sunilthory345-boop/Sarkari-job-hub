import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, 
  Landmark, GraduationCap, Building2, Stethoscope, Wrench, Users, Calendar, MapPin, Info, HelpCircle, Filter, Search
} from 'lucide-react';
import { HpscLiveNotice, HpscSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface HpscLiveSyncHubProps {
  locale?: string;
  onAddJob: (job: GovJob) => void;
  onAddAdmitCard: (card: AdmitCard) => void;
  onAddResult: (res: JobResult) => void;
  onAddAnswerKey?: (key: AnswerKey) => void;
  triggerToast: (msg: string) => void;
  existingJobIds?: string[];
  existingAdmitCardIds?: string[];
  existingResultIds?: string[];
  existingAnswerKeyIds?: string[];
}

export default function HpscLiveSyncHub({
  locale = 'hi',
  onAddJob,
  onAddAdmitCard,
  onAddResult,
  onAddAnswerKey,
  triggerToast,
  existingJobIds = [],
  existingAdmitCardIds = [],
  existingResultIds = [],
  existingAnswerKeyIds = []
}: HpscLiveSyncHubProps) {
  const [notices, setNotices] = useState<HpscLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<HpscSyncStatus>({
    online: true,
    portal: 'https://hpsc.gov.in/',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 32,
    autoSyncIntervalSec: 40,
    totalLiveNotices: 8,
    newNoticesCount: 4
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key' | 'interview' | 'announcement'>('all');
  const [activePostType, setActivePostType] = useState<'all' | 'hcs-allied' | 'hcs-judicial' | 'asst-professor' | 'pgt' | 'asst-engineer' | 'medical-officer' | 'vet-surgeon'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(40);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(40);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [showHpscGuide, setShowHpscGuide] = useState<boolean>(false);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch live feed from HPSC Haryana API
  const fetchFeed = async (isManualSync = false) => {
    if (isManualSync) setSyncing(true);
    try {
      const [feedRes, statusRes] = await Promise.all([
        fetch('/api/hpsc/live-feed'),
        fetch('/api/hpsc/status')
      ]);

      if (feedRes.ok) {
        const feedData = await feedRes.json();
        setNotices(feedData.data || feedData.notices || []);
      }

      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setStatus(statusData);
      }

      if (isManualSync) {
        triggerToast(
          locale === 'hi'
            ? '🟢 हरियाणा लोक सेवा आयोग (hpsc.gov.in) से लाइव सूचनाएं सफलतापूर्वक सिंक हो गईं!'
            : '🟢 HPSC Haryana (hpsc.gov.in) live notices synchronized successfully!'
        );
      }
    } catch (err) {
      console.error('Failed to sync HPSC feed:', err);
      if (isManualSync) {
        triggerToast('⚠️ Error connecting to HPSC Haryana live monitor service.');
      }
    } finally {
      setLoading(false);
      if (isManualSync) setSyncing(false);
      setSecondsUntilNextSync(autoSyncInterval);
    }
  };

  useEffect(() => {
    fetchFeed(false);
  }, []);

  // Countdown timer for automatic sync
  useEffect(() => {
    if (!autoSyncEnabled) return;

    const timer = setInterval(() => {
      setSecondsUntilNextSync((prev) => {
        if (prev <= 1) {
          fetchFeed(false);
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoSyncEnabled, autoSyncInterval]);

  // Handle single notice import into central app tables
  const handleImportNotice = (notice: HpscLiveNotice) => {
    let addedType = '';

    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      addedType = locale === 'hi' ? 'नई भर्ती (Job Vacancy)' : 'New Job Vacancy';
    } else if ((notice.category === 'admit-card' || notice.category === 'interview') && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      addedType = locale === 'hi' ? 'प्रवेश पत्र / बुलावा पत्र (Admit Card)' : 'Admit Card / Call Letter';
    } else if (notice.category === 'result' && notice.resultData) {
      const sanitizedResult: JobResult = {
        ...notice.resultData,
        cutOff: {
          UR: notice.resultData.cutOff?.UR || notice.details.cutoff || 'Declared on Portal',
          OBC: notice.resultData.cutOff?.OBC || 'Declared on Portal',
          SC: notice.resultData.cutOff?.SC || 'Declared on Portal',
          ST: notice.resultData.cutOff?.ST || 'Declared on Portal'
        }
      };
      onAddResult(sanitizedResult);
      addedType = locale === 'hi' ? 'परीक्षा परिणाम / मेधा सूची (Result)' : 'Exam Result';
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      addedType = locale === 'hi' ? 'उत्तर कुंजी (Answer Key)' : 'Answer Key';
    } else if (notice.jobData) {
      onAddJob(notice.jobData);
      addedType = locale === 'hi' ? 'भर्ती सूचना' : 'Job Vacancy';
    }

    setImportedNoticeIds((prev) => new Set([...prev, notice.id]));
    triggerToast(
      locale === 'hi'
        ? `✅ [HPSC] "${notice.title}" आपकी वेबसाइट पर ${addedType} के रूप में सफलतापूर्वक जोड़ दिया गया!`
        : `✅ [HPSC] "${notice.title}" published to your website as ${addedType}!`
    );
  };

  // Import all filtered notices in one click
  const handleImportAll = () => {
    let count = 0;
    filteredNotices.forEach((notice) => {
      if (!isAlreadyImported(notice)) {
        handleImportNotice(notice);
        count++;
      }
    });
    if (count > 0) {
      triggerToast(
        locale === 'hi'
          ? `🎉 HPSC की कुल ${count} सूचनाएं आपकी मुख्य वेबसाइट पर लाइव प्रकाशित कर दी गईं!`
          : `🎉 ${count} HPSC notices published directly to your website!`
      );
    } else {
      triggerToast(
        locale === 'hi'
          ? 'ℹ️ चुनी गई सभी सूचनाएं पहले से ही आपकी वेबसाइट पर प्रकाशित हैं।'
          : 'ℹ️ All displayed notices are already imported.'
      );
    }
  };

  // Check if notice is already imported or in state
  const isAlreadyImported = (notice: HpscLiveNotice): boolean => {
    if (importedNoticeIds.has(notice.id)) return true;
    if (notice.jobData && existingJobIds.includes(notice.jobData.id)) return true;
    if (notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) return true;
    if (notice.resultData && existingResultIds.includes(notice.resultData.id)) return true;
    if (notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id)) return true;
    return false;
  };

  // Parse custom raw notice with AI
  const handleParseCustomNotice = async () => {
    if (!rawNoticeInput.trim()) return;
    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/hpsc/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawNoticeText: rawNoticeInput })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notice) {
          setNotices((prev) => [data.notice, ...prev]);
          setRawNoticeInput('');
          triggerToast(
            locale === 'hi'
              ? '✨ AI ने HPSC नोटिस को सफलतापूर्वक पार्स कर लिया और लाइव सूची में जोड़ दिया!'
              : '✨ AI parsed HPSC notice successfully and added to live feed!'
          );
        }
      } else {
        triggerToast('⚠️ Failed to parse HPSC notice.');
      }
    } catch (e) {
      console.error(e);
      triggerToast('⚠️ Error parsing notice.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  // Filter notices
  const filteredNotices = notices.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesPost = activePostType === 'all' || item.postType === activePostType;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.advtNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.department && item.department.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesPost && matchesSearch;
  });

  const vacancyCount = notices.filter(n => n.category === 'vacancy').length;
  const admitCardCount = notices.filter(n => n.category === 'admit-card').length;
  const resultCount = notices.filter(n => n.category === 'result').length;
  const answerKeyCount = notices.filter(n => n.category === 'answer-key').length;
  const interviewCount = notices.filter(n => n.category === 'interview').length;

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner & Real-Time Sync Status */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-6 text-white shadow-xl border border-blue-800/40">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-40 -bottom-10 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-500/30">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
                <span className="h-2 w-2 rounded-full bg-blue-400 -ml-3.5"></span>
                <span>hpsc.gov.in Live Engine Active</span>
              </span>
              <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-medium text-amber-300 border border-amber-500/30">
                हरियाणा लोक सेवा आयोग (पंचकूला)
              </span>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-mono text-slate-300 border border-slate-700">
                Latency: {status.latencyMs}ms
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Landmark className="h-7 w-7 text-blue-400 shrink-0" />
              <span>HPSC Haryana Live Recruitment Monitor</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {locale === 'hi'
                ? 'हरियाणा लोक सेवा आयोग (hpsc.gov.in) की आधिकारिक वेबसाइट से HCS (कार्यकारी शाखा), HCS (न्यायिक), सहायक प्रोफेसर (कॉलेज कैडर), PGT, सहायक अभियंता (SDE), चिकित्सा अधिकारी एवं पशु चिकित्सा शल्य चिकित्सक की सभी नई भर्तियां, एडमिट कार्ड, परीक्षा तिथियां, कट-ऑफ रिजल्ट एवं उत्तर कुंजी सीधे आपकी वेबसाइट पर स्वचालित रूप से सिंक होती हैं।'
                : 'Real-time synchronization engine monitoring https://hpsc.gov.in/ for Haryana Civil Services (HCS Ex. Br. & Judicial), Assistant Professor (College Cadre), PGT, Assistant Engineer (SDE), Medical Officer, and Veterinary Surgeon notices, admit cards, answer keys, and results.'
              }
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-blue-400" />
                <span>Portal: </span>
                <a href="https://hpsc.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:underline font-mono font-bold">
                  https://hpsc.gov.in/
                </a>
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span>Last Monitored: <strong className="text-white">{status.lastChecked}</strong></span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Official Source Verified</span>
              </span>
            </div>
          </div>

          {/* Action controls */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-2.5 shrink-0">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
              <span className="text-slate-400">Auto-Check:</span>
              <span className="font-mono font-bold text-amber-400">{secondsUntilNextSync}s</span>
              <button 
                onClick={() => setAutoSyncEnabled(!autoSyncEnabled)}
                className={`text-[10px] px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                  autoSyncEnabled ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'
                }`}
              >
                {autoSyncEnabled ? 'ON' : 'PAUSED'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchFeed(true)}
                disabled={syncing}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 text-xs font-bold transition shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95 disabled:opacity-75"
              >
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? (locale === 'hi' ? 'जांच जारी...' : 'Checking...') : (locale === 'hi' ? 'अभी रीफ्रेश करें' : 'Sync Now')}</span>
              </button>

              <button
                onClick={handleImportAll}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2.5 text-xs font-bold transition shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-95"
                title="Publish all active HPSC notices to jobs, admit cards and results tables"
              >
                <Sparkles className="h-4 w-4" />
                <span>{locale === 'hi' ? 'सभी 1-क्लिक इंपोर्ट' : 'Import All'}</span>
              </button>
            </div>

            <a
              href="https://hpsc.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-[11px] text-blue-300 hover:text-white transition"
            >
              <span>{locale === 'hi' ? 'hpsc.gov.in पोर्टल पर जाएं' : 'Open Official Portal'}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Live Counters */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-blue-400">{vacancyCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">{locale === 'hi' ? 'नई भर्तियां' : 'Live Vacancies'}</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-amber-400">{admitCardCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">{locale === 'hi' ? 'प्रवेश पत्र / SKT' : 'Admit Cards'}</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">{resultCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">{locale === 'hi' ? 'परिणाम व कट-ऑफ' : 'Results / Cutoffs'}</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-purple-400">{answerKeyCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">{locale === 'hi' ? 'उत्तर कुंजी व आपत्ति' : 'Answer Keys'}</div>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-2.5 border border-slate-800 col-span-2 sm:col-span-1">
            <div className="text-xl sm:text-2xl font-black text-cyan-400">{interviewCount}</div>
            <div className="text-[11px] text-slate-400 font-medium">{locale === 'hi' ? 'साक्षात्कार बुलावा' : 'Interviews'}</div>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={locale === 'hi' ? 'HCS, असिस्टेंट प्रोफेसर, PGT, SDE, Advt No. या विभाग खोजें...' : 'Search HCS, Asst Professor, PGT, SDE, Advt No., or department...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Category:</span>
          </span>
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी' : 'All' },
            { id: 'vacancy', label: locale === 'hi' ? 'भर्तियां' : 'Vacancies' },
            { id: 'admit-card', label: locale === 'hi' ? 'एडमिट कार्ड' : 'Admit Cards' },
            { id: 'result', label: locale === 'hi' ? 'परिणाम' : 'Results' },
            { id: 'answer-key', label: locale === 'hi' ? 'उत्तर कुंजी' : 'Answer Keys' },
            { id: 'interview', label: locale === 'hi' ? 'साक्षात्कार' : 'Interviews' },
            { id: 'announcement', label: locale === 'hi' ? 'सूचनाएं' : 'Notices' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Post Type Specific Filter Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <span className="text-slate-500 shrink-0 font-medium">Post Filter:</span>
        {[
          { id: 'all', label: 'All Cadres' },
          { id: 'hcs-allied', label: 'HCS (Ex. Br.)' },
          { id: 'hcs-judicial', label: 'HCS Judicial' },
          { id: 'asst-professor', label: 'Asst Professor (College)' },
          { id: 'pgt', label: 'PGT (School)' },
          { id: 'asst-engineer', label: 'SDE / AE (Irrigation/PWD)' },
          { id: 'medical-officer', label: 'Medical Officer (HCMS)' },
          { id: 'vet-surgeon', label: 'Veterinary Surgeon' }
        ].map((pt) => (
          <button
            key={pt.id}
            onClick={() => setActivePostType(pt.id as any)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer border ${
              activePostType === pt.id
                ? 'bg-blue-900/40 text-blue-300 border-blue-500'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-300'
            }`}
          >
            {pt.label}
          </button>
        ))}
      </div>

      {/* Notices Feed List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <RefreshCw className="h-8 w-8 text-blue-500 animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {locale === 'hi' ? 'HPSC हरियाणा लाइव सर्वर से डाटा लोड हो रहा है...' : 'Connecting to HPSC live recruitment stream...'}
          </p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            {locale === 'hi' ? 'कोई सूचना नहीं मिली' : 'No HPSC notices matching filter'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {locale === 'hi' ? 'कृपया अन्य फ़िल्टर या खोज शब्द आज़माएँ।' : 'Try modifying your search or filter parameters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const alreadyImported = isAlreadyImported(notice);
            return (
              <div
                key={notice.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition shadow-sm hover:shadow-md space-y-4"
              >
                {/* Top line badges */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {notice.advtNo}
                    </span>

                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      notice.category === 'vacancy'
                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                        : notice.category === 'admit-card'
                        ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                        : notice.category === 'result'
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                        : notice.category === 'answer-key'
                        ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                        : notice.category === 'interview'
                        ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      {notice.statusBadge}
                    </span>

                    {notice.isNew && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                    )}
                    {notice.isNew && (
                      <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">NEW</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{notice.publishedDate}</span>
                  </div>
                </div>

                {/* Notice Title */}
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {notice.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 font-medium">
                    {notice.titleHi}
                  </p>
                </div>

                {/* Department / Org details */}
                {notice.department && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Building2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span>{notice.department}</span>
                  </div>
                )}

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  {notice.details.posts && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">{locale === 'hi' ? 'कुल पद' : 'Vacancies'}</span>
                      <strong className="text-slate-900 dark:text-white font-mono">{notice.details.posts}</strong>
                    </div>
                  )}

                  {notice.details.qualification && (
                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">{locale === 'hi' ? 'योग्यता' : 'Qualification'}</span>
                      <span className="text-slate-800 dark:text-slate-200 line-clamp-1" title={notice.details.qualification}>
                        {notice.details.qualification}
                      </span>
                    </div>
                  )}

                  {notice.details.lastDate && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">{locale === 'hi' ? 'अंतिम तिथि' : 'Last Date'}</span>
                      <strong className="text-red-600 dark:text-red-400 font-mono">{notice.details.lastDate}</strong>
                    </div>
                  )}

                  {notice.details.examDate && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">{locale === 'hi' ? 'परीक्षा तिथि' : 'Exam Date'}</span>
                      <strong className="text-blue-600 dark:text-blue-400 font-mono">{notice.details.examDate}</strong>
                    </div>
                  )}

                  {notice.details.interviewDates && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">{locale === 'hi' ? 'साक्षात्कार तिथि' : 'Interview'}</span>
                      <strong className="text-rose-600 dark:text-rose-400 font-mono">{notice.details.interviewDates}</strong>
                    </div>
                  )}

                  {notice.details.cutoff && (
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">{locale === 'hi' ? 'कट-ऑफ अंक' : 'Cut-off Marks'}</span>
                      <span className="text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold">
                        {notice.details.cutoff}
                      </span>
                    </div>
                  )}

                  {notice.details.objectionEnd && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">{locale === 'hi' ? 'आपत्ति अंतिम तिथि' : 'Objection Deadline'}</span>
                      <strong className="text-purple-600 dark:text-purple-400 font-mono">{notice.details.objectionEnd}</strong>
                    </div>
                  )}
                </div>

                {/* Summary */}
                {notice.details.summary && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {notice.details.summary}
                  </p>
                )}

                {/* Bottom Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleImportNotice(notice)}
                      disabled={alreadyImported}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 ${
                        alreadyImported
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                      }`}
                    >
                      {alreadyImported ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                          <span>{locale === 'hi' ? 'वेबसाइट पर प्रकाशित है' : 'Imported to Portal'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>{locale === 'hi' ? 'वेबसाइट पर जोड़ें (1-Click)' : 'Import to Website'}</span>
                        </>
                      )}
                    </button>

                    {notice.pdfUrl && (
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      >
                        <FileText className="h-3.5 w-3.5 text-blue-500" />
                        <span>PDF Notice</span>
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={notice.officialUrl || 'https://hpsc.gov.in/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-xs"
                    >
                      <span>{notice.category === 'vacancy' ? (locale === 'hi' ? 'ऑनलाइन आवेदन करें' : 'Apply Online') : (locale === 'hi' ? 'hpsc.gov.in पर देखें' : 'View on HPSC')}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: notice.title,
                            text: `${notice.title} - Check full notification at Sarkari Hub & hpsc.gov.in`,
                            url: window.location.href
                          }).catch(() => {});
                        } else {
                          navigator.clipboard.writeText(`${notice.title}\nOfficial Portal: https://hpsc.gov.in/`);
                          triggerToast('📋 Notice details copied to clipboard!');
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
                      title="Share Notice"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* AI Press Note & Notification Parser */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 rounded-2xl border border-blue-800/40 text-white space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h3 className="text-base font-bold text-white">
            {locale === 'hi' ? 'AI-पावर्ड HPSC नोटिस पार्सर (Gemini)' : 'AI-Powered HPSC Notice & Press Release Parser'}
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          {locale === 'hi'
            ? 'hpsc.gov.in से कोई भी नया प्रेस नोट, शुद्धि-पत्र, परीक्षा कार्यक्रम या विज्ञापन का टेक्स्ट यहां पेस्ट करें। हमारा AI इसे स्वचालित रूप से पद संख्या, पात्रता, वेतन एवं परीक्षा तिथि के साथ आपकी वेबसाइट पर लाइव जोड़ देगा।'
            : 'Paste any raw official notice text, corrigendum, exam schedule, or advertisement snippet from https://hpsc.gov.in/. The AI engine will parse details and convert it into a structured notice ready for your live portal.'
          }
        </p>

        <textarea
          rows={3}
          value={rawNoticeInput}
          onChange={(e) => setRawNoticeInput(e.target.value)}
          placeholder={locale === 'hi' ? 'यहाँ HPSC का विज्ञापन या प्रेस नोट टेक्स्ट पेस्ट करें...' : 'Paste HPSC press note or advertisement snippet here...'}
          className="w-full rounded-xl bg-slate-800/90 border border-slate-700 p-3 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
        />

        <div className="flex justify-end">
          <button
            onClick={handleParseCustomNotice}
            disabled={isParsingNotice || !rawNoticeInput.trim()}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`h-3.5 w-3.5 ${isParsingNotice ? 'animate-spin' : ''}`} />
            <span>{isParsingNotice ? (locale === 'hi' ? 'AI पार्सिंग जारी...' : 'Parsing with AI...') : (locale === 'hi' ? 'AI से पार्स कर लाइव जोड़ें' : 'Parse & Add to Feed')}</span>
          </button>
        </div>
      </div>

      {/* Official Helpdesk & Candidate Information */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <Info className="h-4 w-4 text-blue-500" />
            <span>Haryana Public Service Commission (HPSC) Candidate Helpdesk</span>
          </div>
          <button
            onClick={() => setShowHpscGuide(!showHpscGuide)}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
          >
            {showHpscGuide ? 'Hide Details' : 'Show Contact & Examination Guidelines'}
          </button>
        </div>

        {showHpscGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div>
              <strong className="block text-slate-700 dark:text-slate-300 mb-1">📍 Commission Address:</strong>
              <p>Haryana Public Service Commission, Bays 1-10, Block-B, Sector 4, Panchkula, Haryana 134112</p>
            </div>
            <div>
              <strong className="block text-slate-700 dark:text-slate-300 mb-1">📞 Helpline & Contact:</strong>
              <p>Reception / Enquiry: 0172-2560755</p>
              <p>Technical Support Email: info.hpsc@gmail.com</p>
            </div>
            <div>
              <strong className="block text-slate-700 dark:text-slate-300 mb-1">🌐 Official Websites:</strong>
              <p><a href="https://hpsc.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://hpsc.gov.in/</a></p>
              <p>Official Online Application Portal: hpsc.gov.in/Advertisement</p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
