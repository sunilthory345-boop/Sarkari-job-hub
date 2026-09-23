import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, Landmark, Building2, MapPin, Info, HelpCircle
} from 'lucide-react';
import { RajLiveNotice, RajSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface RajasthanLiveSyncHubProps {
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

export default function RajasthanLiveSyncHub({
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
}: RajasthanLiveSyncHubProps) {
  const [notices, setNotices] = useState<RajLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<RajSyncStatus>({
    online: true,
    portal: 'https://www.recruitment.rajasthan.gov.in/',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 42,
    autoSyncIntervalSec: 45,
    totalLiveNotices: 8,
    newNoticesCount: 6
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key' | 'otr'>('all');
  const [activeBoard, setActiveBoard] = useState<'all' | 'RSMSSB' | 'RPSC' | 'RajPolice' | 'Education' | 'Medical'>('all');
  const [cetFilter, setCetFilter] = useState<'all' | 'grad' | '10plus2' | 'none'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(45);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(45);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [showOtrGuide, setShowOtrGuide] = useState<boolean>(false);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch feed from Rajasthan Recruitment API
  const fetchRajFeed = async (isManual = false) => {
    if (isManual) setSyncing(true);
    try {
      const res = await fetch('/api/rajasthan/live-feed');
      if (res.ok) {
        const data = await res.json();
        setNotices(data.notices || []);
      }

      const statusRes = await fetch('/api/rajasthan/status');
      if (statusRes.ok) {
        const sData = await statusRes.json();
        setStatus(sData);
      }

      if (isManual) {
        triggerToast(locale === 'hi' 
          ? '🏛️ राजस्थान स्टेट रिक्रूटमेंट पोर्टल (recruitment.rajasthan.gov.in) से नवीनतम भर्तियां व परिणाम सिंक हो गए!' 
          : '🏛️ Live Rajasthan Recruitment releases successfully synced from https://www.recruitment.rajasthan.gov.in/!');
      }
    } catch (e) {
      console.error('Failed to fetch Rajasthan feed', e);
      if (isManual) {
        triggerToast('⚠️ Unable to reach Rajasthan SSO Recruitment API. Showing cached notices.');
      }
    } finally {
      setLoading(false);
      if (isManual) setSyncing(false);
      setSecondsUntilNextSync(autoSyncInterval);
    }
  };

  useEffect(() => {
    fetchRajFeed();
  }, []);

  // Countdown effect
  useEffect(() => {
    if (!autoSyncEnabled) return;
    const timer = setInterval(() => {
      setSecondsUntilNextSync(prev => {
        if (prev <= 1) {
          fetchRajFeed(false);
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [autoSyncEnabled, autoSyncInterval]);

  // Handle single item import into website database
  const handleImportNotice = (notice: RajLiveNotice) => {
    let success = false;
    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      success = true;
      triggerToast(`✅ Rajasthan Opening Published: "${notice.title.slice(0, 45)}..." added to Vacancies!`);
    } else if (notice.category === 'admit-card' && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      success = true;
      triggerToast(`🎟️ SSO e-Admit Card Published: "${notice.title.slice(0, 45)}..." added to Admit Cards!`);
    } else if (notice.category === 'result' && notice.resultData) {
      const sanitizedResult: JobResult = {
        ...notice.resultData,
        cutOff: {
          UR: notice.resultData.cutOff?.UR || notice.details?.cutoff || 'Declared on Portal',
          OBC: notice.resultData.cutOff?.OBC || 'Declared on Portal',
          SC: notice.resultData.cutOff?.SC || 'Declared on Portal',
          ST: notice.resultData.cutOff?.ST || 'Declared on Portal'
        }
      };
      onAddResult(sanitizedResult);
      success = true;
      triggerToast(`🏆 Merit & Cutoff Published: "${notice.title.slice(0, 45)}..." added to Results!`);
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      success = true;
      triggerToast(`📝 Key & Objections Published: "${notice.title.slice(0, 45)}..." added to Answer Keys!`);
    } else if (notice.category === 'otr') {
      triggerToast('ℹ️ One Time Registration (OTR) is a state policy guideline and available for candidate reference.');
      return;
    }

    if (success) {
      setImportedNoticeIds(prev => new Set([...prev, notice.id]));
    }
  };

  // Bulk Import all unsynced
  const handleImportAll = () => {
    let count = 0;
    filteredNotices.forEach(notice => {
      if (importedNoticeIds.has(notice.id)) return;

      if (notice.category === 'vacancy' && notice.jobData && !existingJobIds.includes(notice.jobData.id)) {
        onAddJob(notice.jobData);
        count++;
      } else if (notice.category === 'admit-card' && notice.admitCardData && !existingAdmitCardIds.includes(notice.admitCardData.id)) {
        onAddAdmitCard(notice.admitCardData);
        count++;
      } else if (notice.category === 'result' && notice.resultData && !existingResultIds.includes(notice.resultData.id)) {
        const sanitizedResult: JobResult = {
          ...notice.resultData,
          cutOff: {
            UR: notice.resultData.cutOff?.UR || notice.details?.cutoff || 'Declared on Portal',
            OBC: notice.resultData.cutOff?.OBC || 'Declared on Portal',
            SC: notice.resultData.cutOff?.SC || 'Declared on Portal',
            ST: notice.resultData.cutOff?.ST || 'Declared on Portal'
          }
        };
        onAddResult(sanitizedResult);
        count++;
      } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey && !existingAnswerKeyIds.includes(notice.answerKeyData.id)) {
        onAddAnswerKey(notice.answerKeyData);
        count++;
      }
      importedNoticeIds.add(notice.id);
    });

    if (count > 0) {
      setImportedNoticeIds(new Set(importedNoticeIds));
      triggerToast(`🚀 Imported ${count} live Rajasthan opening(s) directly to your website!`);
    } else {
      triggerToast('ℹ️ All displayed notices are already imported into your website.');
    }
  };

  // Parse Raw Notice with Gemini AI
  const handleParseRawNotice = async () => {
    if (!rawNoticeInput.trim()) {
      triggerToast('⚠️ Please paste text from a Rajasthan recruitment advertisement or press release.');
      return;
    }

    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/rajasthan/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: rawNoticeInput,
          sourceUrl: 'https://www.recruitment.rajasthan.gov.in/'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notice) {
          setNotices(prev => [data.notice, ...prev]);
          setRawNoticeInput('');
          triggerToast(`✨ AI Successfully Analyzed & Added: ${data.notice.title.slice(0, 50)}...`);
        }
      } else {
        triggerToast('⚠️ Failed to parse Rajasthan notice. Please verify text content.');
      }
    } catch (e) {
      console.error(e);
      triggerToast('⚠️ Error communicating with AI parsing engine.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  // Filter Notices
  const filteredNotices = notices.filter(n => {
    const matchesCategory = activeCategory === 'all' || n.category === activeCategory;
    const matchesBoard = activeBoard === 'all' || n.board === activeBoard;
    
    let matchesCet = true;
    if (cetFilter === 'grad') matchesCet = n.details?.cetRequired === 'CET (Graduation Level)';
    else if (cetFilter === '10plus2') matchesCet = n.details?.cetRequired === 'CET (Senior Secondary 10+2)';
    else if (cetFilter === 'none') matchesCet = !n.details?.cetRequired || n.details.cetRequired === 'None';

    const matchesQuery = !searchQuery || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.advtNo && n.advtNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.statusBadge && n.statusBadge.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.org && n.org.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.details?.summary && n.details.summary.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesBoard && matchesCet && matchesQuery;
  });

  const isNoticeImported = (notice: RajLiveNotice) => {
    if (importedNoticeIds.has(notice.id)) return true;
    if (notice.category === 'vacancy' && notice.jobData && existingJobIds.includes(notice.jobData.id)) return true;
    if (notice.category === 'admit-card' && notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) return true;
    if (notice.category === 'result' && notice.resultData && existingResultIds.includes(notice.resultData.id)) return true;
    if (notice.category === 'answer-key' && notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id)) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-stone-900 to-orange-950 p-6 md:p-8 text-white shadow-xl border border-amber-900/40">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Landmark className="w-96 h-96 text-amber-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-xs font-semibold text-amber-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Official Gateway: https://www.recruitment.rajasthan.gov.in/ (SSO Rajasthan)</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Landmark className="w-8 h-8 text-amber-400" />
              {locale === 'hi' 
                ? 'राजस्थान स्टेट रिक्रूटमेंट पोर्टल (SSO Portal) लाइव मॉनिटर' 
                : 'Rajasthan State Recruitment Portal (SSO Portal) Live Monitor'}
            </h1>
            <p className="text-sm text-amber-100 leading-relaxed">
              {locale === 'hi'
                ? 'राजस्थान कर्मचारी चयन बोर्ड (RSMSSB CET, पटवारी, पशु परिचर), आरपीएससी (RPSC RAS, सेकंड ग्रेड शिक्षक), राजस्थान पुलिस कांस्टेबल एवं स्वास्थ्य विभाग की सभी सरकारी भर्तियां, प्रवेश पत्र व कट-ऑफ मार्क्स सीधे recruitment.rajasthan.gov.in से लाइव सिंक।'
                : 'Direct real-time feed tracking for RSMSSB (CET Graduate & 10+2, Patwari, Animal Attendant), RPSC (RAS/RTS, 1st & 2nd Grade Teachers), Rajasthan Police Constable, and Medical Department directly from recruitment.rajasthan.gov.in.'}
            </p>

            {/* Quick Status Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>Portal: <strong>recruitment.rajasthan.gov.in</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gateway: <strong className="text-emerald-300">{status.status} ({status.latencyMs}ms)</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-orange-300" />
                <span>Next Auto-Poll: <strong>{secondsUntilNextSync}s</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => fetchRajFeed(true)}
              disabled={syncing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Pinging Rajasthan SSO...' : 'Sync SSO Portal Now'}</span>
            </button>
            <a
              href="https://www.recruitment.rajasthan.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open recruitment.rajasthan.gov.in</span>
            </a>
            <button
              onClick={() => setShowOtrGuide(!showOtrGuide)}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>{showOtrGuide ? 'Hide OTR Guide' : 'One Time Registration (OTR) Guide'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable One Time Registration (OTR) Info Card */}
      {showOtrGuide && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-xs text-amber-950 space-y-3">
          <div className="flex items-center gap-2 font-bold text-base text-amber-900">
            <HelpCircle className="w-5 h-5 text-amber-700" />
            <span>Rajasthan State Recruitment: One Time Registration (OTR) Explained</span>
          </div>
          <p className="text-xs leading-relaxed text-amber-900">
            Under Rajasthan Government policy on <strong>sso.rajasthan.gov.in</strong> / <strong>recruitment.rajasthan.gov.in</strong>, 
            candidates pay a single lifetime registration fee. After completing OTR via Jan Aadhaar or Aadhaar, 
            <strong>all subsequent applications for RSMSSB, RPSC, and Rajasthan Police recruitment exams are completely free of charge (₹0 Fee)</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <div className="font-bold text-amber-800">General / Creamy Layer OBC</div>
              <div className="text-lg font-black text-slate-800">₹600 <span className="text-[10px] font-normal text-slate-500">(One-time Lifetime)</span></div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <div className="font-bold text-amber-800">Non-Creamy OBC / EWS / SC / ST</div>
              <div className="text-lg font-black text-slate-800">₹400 <span className="text-[10px] font-normal text-slate-500">(One-time Lifetime)</span></div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-200">
              <div className="font-bold text-amber-800">Subsequent Exam Applications</div>
              <div className="text-lg font-black text-emerald-600">₹0 (Free) <span className="text-[10px] font-normal text-slate-500">For all state posts</span></div>
            </div>
          </div>
        </div>
      )}

      {/* Board & CET Filter Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            Recruiting Agency:
          </span>
          {[
            { id: 'all', label: 'All Boards' },
            { id: 'RSMSSB', label: 'RSMSSB (CET & Staff)' },
            { id: 'RPSC', label: 'RPSC (RAS & Teachers)' },
            { id: 'RajPolice', label: 'Rajasthan Police' },
            { id: 'Education', label: 'School Education' },
            { id: 'Medical', label: 'Medical & Health' }
          ].map(board => (
            <button
              key={board.id}
              onClick={() => setActiveBoard(board.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeBoard === board.id 
                  ? 'bg-amber-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {board.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* CET Filter */}
          <select
            value={cetFilter}
            onChange={(e) => setCetFilter(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">All CET Status</option>
            <option value="grad">CET (Graduation Level)</option>
            <option value="10plus2">CET (Senior Secondary 10+2)</option>
            <option value="none">Direct (No CET Required)</option>
          </select>

          <button
            onClick={handleImportAll}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Import All to Site</span>
          </button>
        </div>
      </div>

      {/* Main Category Tabs & Search Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-2xl">
          {[
            { id: 'all', label: 'All Releases', icon: Bell },
            { id: 'vacancy', label: 'Vacancies', icon: Briefcase },
            { id: 'admit-card', label: 'SSO e-Admit Cards', icon: FileText },
            { id: 'result', label: 'Results & Cut-Offs', icon: Award },
            { id: 'answer-key', label: 'Keys & Objections', icon: CheckSquare },
            { id: 'otr', label: 'OTR Guidelines', icon: Info }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-white text-amber-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CET, RAS, Patwari, Police, Cutoff..."
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Notices Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <RefreshCw className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-600">Connecting to Rajasthan State Recruitment Portal gateway...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Releases Match Your Filter Criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Try resetting the board filter or CET selection to view more Rajasthan recruitment releases.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => {
            const imported = isNoticeImported(notice);
            return (
              <div 
                key={notice.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-2.5">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        notice.category === 'vacancy' ? 'bg-emerald-100 text-emerald-800' :
                        notice.category === 'admit-card' ? 'bg-amber-100 text-amber-800' :
                        notice.category === 'result' ? 'bg-purple-100 text-purple-800' :
                        notice.category === 'answer-key' ? 'bg-blue-100 text-blue-800' : 'bg-stone-100 text-stone-800'
                      }`}>
                        {notice.category}
                      </span>
                      {notice.board && (
                        <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md">
                          {notice.board}
                        </span>
                      )}
                      {notice.advtNo && (
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          Advt: {notice.advtNo}
                        </span>
                      )}
                      {notice.details?.cetRequired && notice.details.cetRequired !== 'None' && (
                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-md">
                          {notice.details.cetRequired}
                        </span>
                      )}
                      {notice.isNew && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-rose-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                          LIVE
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {notice.publishedDate}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {locale === 'hi' && notice.titleHi ? notice.titleHi : notice.title}
                  </h3>

                  {/* Status Badge */}
                  <div className="text-xs font-semibold text-amber-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>{notice.statusBadge}</span>
                  </div>

                  {/* Micro Details Box */}
                  {notice.details && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 text-xs space-y-1.5 text-slate-600">
                      {notice.details.posts && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Total Posts:</span>
                          <span className="font-bold text-slate-800">{Number(notice.details.posts).toLocaleString()} Vacancies</span>
                        </div>
                      )}
                      {notice.details.qualification && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Eligibility:</span>
                          <span className="font-semibold text-slate-700 text-right line-clamp-1">{notice.details.qualification}</span>
                        </div>
                      )}
                      {notice.details.otrFee && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">OTR Fee:</span>
                          <span className="font-semibold text-amber-800 text-right">{notice.details.otrFee}</span>
                        </div>
                      )}
                      {notice.details.salary && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Pay Scale:</span>
                          <span className="font-bold text-emerald-700 text-right">{notice.details.salary}</span>
                        </div>
                      )}
                      {notice.details.lastDate && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Last Date to Apply:</span>
                          <span className="font-bold text-rose-600">{notice.details.lastDate}</span>
                        </div>
                      )}
                      {notice.details.examDate && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Exam Schedule:</span>
                          <span className="font-semibold text-slate-700">{notice.details.examDate}</span>
                        </div>
                      )}
                      {notice.details.cutoff && (
                        <div className="flex justify-between text-purple-700">
                          <span className="font-bold">Cut-Off Marks:</span>
                          <span className="font-bold text-right">{notice.details.cutoff}</span>
                        </div>
                      )}
                      {notice.details.summary && (
                        <p className="pt-1 text-[11px] text-slate-500 line-clamp-2 border-t border-slate-200">
                          {notice.details.summary}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions bottom */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    {notice.pdfUrl && (
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        <FileText className="w-3 h-3 text-red-500" />
                        <span>Official PDF</span>
                      </a>
                    )}
                    <a
                      href="https://www.recruitment.rajasthan.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold flex items-center gap-1 border border-amber-200 transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>SSO Portal</span>
                    </a>
                  </div>

                  {notice.category !== 'otr' && (
                    <button
                      onClick={() => handleImportNotice(notice)}
                      disabled={imported}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        imported
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                      }`}
                    >
                      {imported ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Already on Site</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Publish to Site</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Raw Notice AI Extractor Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {locale === 'hi' 
                ? 'राजस्थान भर्ती विज्ञप्ति एआई एक्सट्रैक्टर (AI Notice Analyzer)' 
                : 'Rajasthan State Recruitment Notice AI Extractor'}
            </h3>
            <p className="text-xs text-slate-500">
              Paste raw text from any new advertisement, notice, or press note from recruitment.rajasthan.gov.in, RSMSSB, or RPSC.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            rows={3}
            value={rawNoticeInput}
            onChange={(e) => setRawNoticeInput(e.target.value)}
            placeholder="e.g. राजस्थान कर्मचारी चयन बोर्ड, जयपुर - विज्ञापन संख्या 08/2026 समान पात्रता परीक्षा (CET स्नातक स्तर) 2026 हेतु ऑनलाइन आवेदन आमंत्रित किए जाते हैं... अंतिम तिथि 25.10.2026..."
            className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <div className="flex justify-end">
            <button
              onClick={handleParseRawNotice}
              disabled={isParsingNotice || !rawNoticeInput.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isParsingNotice ? 'animate-spin' : ''}`} />
              <span>{isParsingNotice ? 'Extracting with Gemini AI...' : 'Parse & Add to Rajasthan Live Feed'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
