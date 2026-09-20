import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, 
  Landmark, Shield, Swords, Calendar, Users, MapPin, Info, HelpCircle
} from 'lucide-react';
import { ArmyLiveNotice, ArmySyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface ArmyLiveSyncHubProps {
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

export default function ArmyLiveSyncHub({
  locale = 'en',
  onAddJob,
  onAddAdmitCard,
  onAddResult,
  onAddAnswerKey,
  triggerToast,
  existingJobIds = [],
  existingAdmitCardIds = [],
  existingResultIds = [],
  existingAnswerKeyIds = []
}: ArmyLiveSyncHubProps) {
  const [notices, setNotices] = useState<ArmyLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<ArmySyncStatus>({
    online: true,
    portal: 'https://joinindianarmy.nic.in/',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 38,
    autoSyncIntervalSec: 45,
    totalLiveNotices: 8,
    newNoticesCount: 6
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key' | 'rally-schedule'>('all');
  const [activeEntryType, setActiveEntryType] = useState<'all' | 'agniveer' | 'officer' | 'nursing-tech' | 'rally'>('all');
  const [activeZro, setActiveZro] = useState<'all' | 'All India' | 'Jaipur' | 'Lucknow' | 'Danapur' | 'Jalandhar' | 'Pune' | 'Ambala'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(45);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(45);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [showPftGuide, setShowPftGuide] = useState<boolean>(false);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch feed from Join Indian Army API
  const fetchArmyFeed = async (isManual = false) => {
    if (isManual) setSyncing(true);
    try {
      const res = await fetch('/api/army/live-feed');
      if (res.ok) {
        const data = await res.json();
        setNotices(data.notices || []);
      }

      const statusRes = await fetch('/api/army/status');
      if (statusRes.ok) {
        const sData = await statusRes.json();
        setStatus(sData);
      }

      if (isManual) {
        triggerToast(locale === 'hi' 
          ? '⚔️ भारतीय सेना आधिकारिक पोर्टल (joinindianarmy.nic.in) से नवीनतम अग्निवीर व अधिकारी भर्तियां सिंक हो गईं!' 
          : '⚔️ Join Indian Army live notices successfully synchronized from https://joinindianarmy.nic.in/!');
      }
    } catch (e) {
      console.error('Failed to fetch Indian Army feed', e);
      if (isManual) {
        triggerToast('⚠️ Unable to reach Join Indian Army API. Showing cached rally releases.');
      }
    } finally {
      setLoading(false);
      if (isManual) setSyncing(false);
      setSecondsUntilNextSync(autoSyncInterval);
    }
  };

  useEffect(() => {
    fetchArmyFeed();
  }, []);

  // Countdown effect
  useEffect(() => {
    if (!autoSyncEnabled) return;
    const timer = setInterval(() => {
      setSecondsUntilNextSync((prev) => {
        if (prev <= 1) {
          fetchArmyFeed();
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [autoSyncEnabled, autoSyncInterval]);

  // Handle Manual Force Sync
  const handleForceSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/army/sync-now', { method: 'POST' });
      if (res.ok) {
        await fetchArmyFeed(true);
      }
    } catch (err) {
      triggerToast('⚠️ Sync request failed. Checking connection.');
      setSyncing(false);
    }
  };

  // Import a single notice to site
  const handleImportNotice = (notice: ArmyLiveNotice) => {
    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      triggerToast(`✅ "${notice.title.slice(0, 45)}..." published to Live Vacancies!`);
    } else if (notice.category === 'admit-card' && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      triggerToast(`🎫 "${notice.title.slice(0, 45)}..." published to Admit Cards!`);
    } else if (notice.category === 'result' && notice.resultData) {
      onAddResult(notice.resultData);
      triggerToast(`🏆 "${notice.title.slice(0, 45)}..." published to Examination Results!`);
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      triggerToast(`🔑 "${notice.title.slice(0, 45)}..." published to Answer Keys!`);
    } else if (notice.category === 'rally-schedule' && notice.jobData) {
      onAddJob(notice.jobData);
      triggerToast(`📅 "${notice.title.slice(0, 45)}..." published to Rally Calendar!`);
    } else {
      triggerToast('ℹ️ Notice structure imported.');
    }
    setImportedNoticeIds(prev => new Set(prev).add(notice.id));
  };

  // Import all new notices at once
  const handleImportAll = () => {
    let count = 0;
    notices.forEach(n => {
      if (!isAlreadyImported(n)) {
        handleImportNotice(n);
        count++;
      }
    });
    if (count > 0) {
      triggerToast(`🚀 All ${count} Join Indian Army notices successfully published across your portal!`);
    } else {
      triggerToast('All visible notices are already published on your site.');
    }
  };

  // Check if item is already added
  const isAlreadyImported = (notice: ArmyLiveNotice): boolean => {
    if (importedNoticeIds.has(notice.id)) return true;
    if (notice.jobData && existingJobIds.includes(notice.jobData.id)) return true;
    if (notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) return true;
    if (notice.resultData && existingResultIds.includes(notice.resultData.id)) return true;
    if (notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id)) return true;
    return false;
  };

  // Parse custom raw notice with Gemini AI
  const handleParseRawNotice = async () => {
    if (!rawNoticeInput.trim()) {
      triggerToast('Please paste Indian Army notice or rally circular text first.');
      return;
    }
    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/army/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: rawNoticeInput,
          sourceUrl: 'https://joinindianarmy.nic.in/'
        })
      });
      if (res.ok) {
        const data = await res.json();
        triggerToast('✨ Indian Army notification analyzed with Gemini AI! Added to live list.');
        setRawNoticeInput('');
        fetchArmyFeed();
      } else {
        triggerToast('Failed to parse notice. Please verify text formatting.');
      }
    } catch (e) {
      triggerToast('Error during AI analysis.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  // Filter notices
  const filteredNotices = notices.filter(notice => {
    const matchCategory = activeCategory === 'all' || notice.category === activeCategory;
    const matchEntry = activeEntryType === 'all' || notice.entryType === activeEntryType;
    const matchZro = activeZro === 'all' || notice.zro.toLowerCase().includes(activeZro.toLowerCase());
    const matchSearch = !searchQuery || (
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (notice.trade && notice.trade.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (notice.aro && notice.aro.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (notice.details.summary && notice.details.summary.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return matchCategory && matchEntry && matchZro && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-white p-6 sm:p-8 shadow-xl border border-emerald-800/40">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Swords className="w-80 h-80 text-amber-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>MINISTRY OF DEFENCE • OFFICIAL RECRUITMENT</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>joinindianarmy.nic.in REAL-TIME SYNC</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <span>{locale === 'hi' ? '⚔️ भारतीय सेना लाइव भर्ती मॉनिटर' : '⚔️ Join Indian Army Live Monitor'}</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {locale === 'hi'
                ? 'भारतीय थल सेना आधिकारिक पोर्टल (joinindianarmy.nic.in) से सीधे समन्वित: अग्निवीर (GD, Tech, Clerk, Tradesman), टेक्निकल ग्रेजुएट कोर्स (TGC), TES, नर्सिंग असिस्टेंट, CEE ई-एडमिट कार्ड, रैली परिणाम और मेरिट सूचियां।'
                : 'Directly synchronized with the official Join Indian Army portal (https://joinindianarmy.nic.in/): Agniveer (GD, Tech, Clerk/SKT, Tradesman), Officer Entries (TGC, TES), Nursing Assistant, CEE e-Admit Cards, Rally Merit Lists, and Annual Rally Schedules.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 pt-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Official URL: <strong>https://joinindianarmy.nic.in/</strong></span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5" />
                <span>Auto-Refresh: <strong className="text-amber-400">{secondsUntilNextSync}s</strong></span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Portal Latency: <strong className="text-white">{status.latencyMs} ms</strong></span>
              </span>
            </div>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={handleForceSync}
              disabled={syncing}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-75"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? (locale === 'hi' ? 'सिंक हो रहा है...' : 'Syncing Army Portal...') : (locale === 'hi' ? 'अभी री-सिंक करें' : 'Sync Portal Now')}</span>
            </button>

            <button
              onClick={() => setShowPftGuide(true)}
              className="flex items-center justify-center gap-2 bg-slate-800/90 hover:bg-slate-700 text-amber-300 font-semibold px-4 py-2.5 rounded-xl border border-amber-500/40 text-xs transition shadow-sm cursor-pointer"
            >
              <Swords className="w-4 h-4 text-amber-400" />
              <span>{locale === 'hi' ? 'अग्निवीर PFT / शारीरिक मानक गाइड' : 'Agniveer PFT & Physical Guide'}</span>
            </button>

            <button
              onClick={handleImportAll}
              className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-sm cursor-pointer active:scale-95"
            >
              <CheckSquare className="w-4 h-4" />
              <span>{locale === 'hi' ? 'सभी नई भर्तियां पोर्टल पर जोड़ें' : 'Publish All Notices to Site'}</span>
            </button>

            <a
              href="https://joinindianarmy.nic.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white transition py-1 text-center"
            >
              <span>Visit joinindianarmy.nic.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Agniveer & Officer Posts</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">34,000+</p>
            <p className="text-[11px] text-slate-400 mt-0.5">GD, Tech, Clerk, Tradesman, TGC</p>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <Swords className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Active Online CEE Tests</p>
            <p className="text-2xl font-black text-amber-600 mt-1">176 Cities</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Computer Based Test (CBT)</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">HQ Recruiting Zones</p>
            <p className="text-2xl font-black text-blue-700 mt-1">12 ZROs</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Jaipur, Danapur, Lucknow, etc.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
            <MapPin className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Monthly Seva Nidhi</p>
            <p className="text-2xl font-black text-purple-700 mt-1">₹11.71 L</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Tax-free lump sum package</p>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH CONTROLS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Category:</span>
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी सूचनाएं' : 'All Updates', icon: Globe },
            { id: 'vacancy', label: locale === 'hi' ? 'भर्तियां व रैलियां' : 'Vacancies & Rallies', icon: Briefcase },
            { id: 'admit-card', label: locale === 'hi' ? 'CEE ई-एडमिट कार्ड' : 'CEE Admit Cards', icon: FileText },
            { id: 'result', label: locale === 'hi' ? 'रैली व CEE परिणाम' : 'Results & Merit Lists', icon: Award },
            { id: 'answer-key', label: locale === 'hi' ? 'आधिकारिक उत्तर कुंजी' : 'Answer Keys', icon: CheckSquare },
            { id: 'rally-schedule', label: locale === 'hi' ? 'वार्षिक रैली कैलेंडर' : 'Rally Calendar', icon: Calendar }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  active
                    ? 'bg-emerald-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Entry Type and ZRO Zone Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Cadre:</span>
            {[
              { id: 'all', label: 'All Cadres' },
              { id: 'agniveer', label: '⚡ Agniveer (All Arms)' },
              { id: 'officer', label: '🎖️ Officer (TGC / TES / IMA)' },
              { id: 'nursing-tech', label: '🩺 Nursing Assistant (Regular)' },
              { id: 'rally', label: '🏟️ Rally Grounds' }
            ].map(b => (
              <button
                key={b.id}
                onClick={() => setActiveEntryType(b.id as any)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer border ${
                  activeEntryType === b.id
                    ? 'bg-amber-600 text-white border-amber-600 font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">ZRO Zone:</span>
            {[
              { id: 'all', label: 'All Zones' },
              { id: 'Jaipur', label: 'ZRO Jaipur' },
              { id: 'Lucknow', label: 'ZRO Lucknow' },
              { id: 'Danapur', label: 'ZRO Danapur' },
              { id: 'Jalandhar', label: 'ZRO Jalandhar' },
              { id: 'Pune', label: 'ZRO Pune' }
            ].map(z => (
              <button
                key={z.id}
                onClick={() => setActiveZro(z.id as any)}
                className={`px-2 py-0.5 rounded-md text-[11px] transition cursor-pointer border ${
                  activeZro === z.id
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder={locale === 'hi' 
              ? 'सेना भर्ती खोजें (उदा. Agniveer GD, TGC-142, Clerk typing, Nursing Assistant, CEE Admit Card, ZRO Jaipur)...' 
              : 'Search Army updates (e.g. Agniveer GD, TGC-142, Clerk Typing, CEE Hall Ticket, Nursing, ZRO Jaipur, Cutoff)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* NOTICES LIST */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-slate-600 font-medium">Connecting to Join Indian Army Portal (joinindianarmy.nic.in)...</p>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="text-slate-700 font-bold">No updates found for the selected filter.</p>
            <p className="text-xs text-slate-500">Try switching your category, cadre, or search term.</p>
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const alreadyAdded = isAlreadyImported(notice);
            return (
              <div
                key={notice.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {notice.trade || notice.entryType.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        ZRO {notice.zro}
                      </span>
                      {notice.aro && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700">
                          {notice.aro}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400 font-mono">
                        Notice #{notice.noticeNo || notice.id}
                      </span>
                      {notice.isNew && (
                        <span className="px-1.5 py-0.2 bg-red-500 text-white rounded text-[9px] font-bold uppercase tracking-wider animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {locale === 'hi' ? notice.titleHi : notice.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {notice.details.summary || notice.title}
                    </p>
                  </div>

                  {/* Actions right */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                    <button
                      onClick={() => handleImportNotice(notice)}
                      disabled={alreadyAdded}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                        alreadyAdded
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                          : 'bg-emerald-700 hover:bg-emerald-600 text-white active:scale-95'
                      }`}
                    >
                      {alreadyAdded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Added to Site</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Publish on Site</span>
                        </>
                      )}
                    </button>

                    <a
                      href={notice.pdfUrl || notice.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[11px] font-semibold text-amber-700 hover:text-amber-900 transition"
                    >
                      <span>Official PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Details Footer Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  {notice.details.posts && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Vacancies</span>
                      <span className="font-semibold text-slate-800">{notice.details.posts}</span>
                    </div>
                  )}

                  {notice.details.ageLimit && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Age Eligibility</span>
                      <span className="font-semibold text-slate-800">{notice.details.ageLimit}</span>
                    </div>
                  )}

                  {notice.details.lastDate && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Last Date</span>
                      <span className="font-semibold text-red-600">{notice.details.lastDate}</span>
                    </div>
                  )}

                  {notice.details.ceeDate && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Exam / Rally Date</span>
                      <span className="font-semibold text-slate-800">{notice.details.ceeDate}</span>
                    </div>
                  )}

                  {notice.details.heightChest && (
                    <div className="col-span-2 sm:col-span-4 bg-emerald-50/70 p-2 rounded-lg text-[11px] text-emerald-950 font-medium">
                      📏 <strong>Physical Standards:</strong> {notice.details.heightChest}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* AI NOTICE PARSER ACCORDION */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-bold text-slate-800">
              {locale === 'hi' ? 'आर्मी भर्ती परिपत्र / प्रेस विज्ञप्ति AI विश्लेषक' : 'Army Rally Notification / Circular AI Analyzer'}
            </h4>
          </div>
          <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold">
            Gemini 2.5 Flash
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Paste any raw recruitment press release, Rally circular, or CEE result text from joinindianarmy.nic.in. The AI will extract structured vacancies, trade categories, physical standards, and admit card links.
        </p>

        <textarea
          rows={3}
          value={rawNoticeInput}
          onChange={(e) => setRawNoticeInput(e.target.value)}
          placeholder="Paste raw notice text here (e.g. Join Indian Army ARO Alwar Rally Notice, TGC-142 SSB Call up list, or CEE Cutoff list)..."
          className="w-full text-xs p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
        />

        <div className="flex justify-end">
          <button
            onClick={handleParseRawNotice}
            disabled={isParsingNotice || !rawNoticeInput.trim()}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold px-4 py-2 rounded-xl text-xs transition disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isParsingNotice ? 'animate-spin' : ''}`} />
            <span>{isParsingNotice ? 'Analyzing Rally Circular...' : 'Parse & Add to Army Feed'}</span>
          </button>
        </div>
      </div>

      {/* MODAL: AGNIVEER PFT & PHYSICAL STANDARDS GUIDE */}
      {showPftGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-emerald-950 to-amber-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Swords className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-lg">Indian Army Agniveer Rally Physical Standards (PFT & PMT)</h3>
              </div>
              <button
                onClick={() => setShowPftGuide(false)}
                className="text-slate-400 hover:text-white text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 space-y-1.5">
                <h4 className="font-bold text-emerald-900 text-sm">1. Physical Fitness Test (PFT) at Rally Ground (100 Marks)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                    <p className="font-bold text-emerald-800">🏃 1.6 Km Run:</p>
                    <ul className="list-disc pl-4 space-y-0.5 mt-1 text-slate-600">
                      <li><strong>Group I:</strong> Up to 5 min 30 sec (60 Marks)</li>
                      <li><strong>Group II:</strong> 5 min 31 sec to 5 min 45 sec (48 Marks)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100">
                    <p className="font-bold text-emerald-800">💪 Pull Ups (Beam):</p>
                    <ul className="list-disc pl-4 space-y-0.5 mt-1 text-slate-600">
                      <li>10 Pull Ups: 40 Marks</li>
                      <li>9 Pull Ups: 33 Marks | 8: 27 Marks</li>
                      <li>7: 21 Marks | 6 (Minimum): 16 Marks</li>
                    </ul>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-900">
                  • <strong>9 Feet Ditch Jump:</strong> Qualifying in nature • <strong>Zig-Zag Balance:</strong> Qualifying in nature
                </p>
              </div>

              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-900 text-sm">2. Minimum Educational & Age Standards</h4>
                <table className="w-full text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-amber-300 text-left text-amber-950 font-bold">
                      <th className="py-1">Trade</th>
                      <th className="py-1">Age Limit</th>
                      <th className="py-1">Qualification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-200/60 text-slate-800">
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Agniveer GD</td>
                      <td className="py-1 font-mono">17.5 - 21 Yrs</td>
                      <td className="py-1">10th Pass with 45% aggregate & 33% in each subject</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Agniveer Technical</td>
                      <td className="py-1 font-mono">17.5 - 21 Yrs</td>
                      <td className="py-1">10+2 Science (PCM) with 50% aggregate & 40% in each</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Agniveer Clerk/SKT</td>
                      <td className="py-1 font-mono">17.5 - 21 Yrs</td>
                      <td className="py-1">10+2 Any stream with 60% aggregate & 50% in English & Maths</td>
                    </tr>
                    <tr>
                      <td className="py-1 font-bold text-slate-900">Nursing Assistant</td>
                      <td className="py-1 font-mono">17.5 - 23 Yrs</td>
                      <td className="py-1">10+2 PCB (Physics, Chem, Biology) with min 50% aggregate</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">3. Seva Nidhi Package (Agnipath Scheme)</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  On completion of 4 years, Agniveers receive an attractive exit package of <strong>₹11.71 Lakh</strong> (Seva Nidhi, 100% income tax free), life insurance cover of <strong>₹48 Lakh</strong>, and priority recruitment in State Police forces and CAPFs (BSF, CISF, CRPF, ITBP, SSB).
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setShowPftGuide(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
