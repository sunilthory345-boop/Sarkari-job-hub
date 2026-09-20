import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, Landmark, Building2
} from 'lucide-react';
import { SbiLiveNotice, SbiSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface SbiLiveSyncHubProps {
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

export default function SbiLiveSyncHub({
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
}: SbiLiveSyncHubProps) {
  const [notices, setNotices] = useState<SbiLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<SbiSyncStatus>({
    online: true,
    portal: 'https://sbi.bank.in/web/careers/current-openings',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 45,
    autoSyncIntervalSec: 45,
    totalLiveNotices: 8,
    newNoticesCount: 5
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key'>('all');
  const [activeCadre, setActiveCadre] = useState<'all' | 'PO' | 'Clerk' | 'CBO' | 'SCO' | 'Apprentice'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(45);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(45);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [syncHistory, setSyncHistory] = useState<string[]>([]);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch feed from SBI API
  const fetchSbiFeed = async (isManual = false) => {
    if (isManual) setSyncing(true);
    try {
      const res = await fetch('/api/sbi/live-feed');
      if (res.ok) {
        const data = await res.json();
        setNotices(data.notices || []);
      }

      const statusRes = await fetch('/api/sbi/status');
      if (statusRes.ok) {
        const sData = await statusRes.json();
        setStatus(sData);
      }

      if (isManual) {
        triggerToast(locale === 'hi' 
          ? '🏛️ एसबीआई करियर (sbi.bank.in/careers) से नवीनतम रिक्तियां व परिणाम सफलतापूर्वक सिंक हो गए!' 
          : '🏛️ Live SBI Careers releases successfully synced from https://sbi.bank.in/web/careers/current-openings!');
        setSyncHistory(prev => [
          `Manual check at ${new Date().toLocaleTimeString()} - Status 200 OK (${status.latencyMs}ms)`,
          ...prev.slice(0, 4)
        ]);
      }
    } catch (e) {
      console.error('Failed to fetch SBI feed', e);
      if (isManual) {
        triggerToast('⚠️ Unable to reach SBI API. Showing cached career notices.');
      }
    } finally {
      setLoading(false);
      if (isManual) setSyncing(false);
      setSecondsUntilNextSync(autoSyncInterval);
    }
  };

  useEffect(() => {
    fetchSbiFeed();
  }, []);

  // Polling countdown effect
  useEffect(() => {
    if (!autoSyncEnabled) return;
    const timer = setInterval(() => {
      setSecondsUntilNextSync(prev => {
        if (prev <= 1) {
          fetchSbiFeed(false);
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [autoSyncEnabled, autoSyncInterval]);

  // Handle single item import into website database
  const handleImportNotice = (notice: SbiLiveNotice) => {
    let success = false;
    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      success = true;
      triggerToast(`✅ Opening Published: "${notice.title.slice(0, 45)}..." added to Vacancies!`);
    } else if (notice.category === 'admit-card' && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      success = true;
      triggerToast(`🎟️ Call Letter Published: "${notice.title.slice(0, 45)}..." added to Admit Cards!`);
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
      triggerToast(`🏆 Result Published: "${notice.title.slice(0, 45)}..." added to Results!`);
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      success = true;
      triggerToast(`📝 Notice Published: "${notice.title.slice(0, 45)}..." added to Answer Keys!`);
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
      triggerToast(`🚀 Imported ${count} live SBI opening(s) directly to your website!`);
    } else {
      triggerToast('ℹ️ All displayed notices are already imported into your website.');
    }
  };

  // Parse Raw Notice with Gemini AI
  const handleParseRawNotice = async () => {
    if (!rawNoticeInput.trim()) {
      triggerToast('⚠️ Please paste text from an SBI Careers advertisement or notice.');
      return;
    }

    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/sbi/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: rawNoticeInput,
          sourceUrl: 'https://sbi.bank.in/web/careers/current-openings'
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
        triggerToast('⚠️ Failed to parse notice. Please verify notice content.');
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
    const matchesCadre = activeCadre === 'all' || n.cadre === activeCadre;
    const matchesQuery = !searchQuery || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.advtNo && n.advtNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.statusBadge && n.statusBadge.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.details?.summary && n.details.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesCadre && matchesQuery;
  });

  const isNoticeImported = (notice: SbiLiveNotice) => {
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
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-sky-900 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Landmark className="w-96 h-96 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-semibold text-blue-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Official Gateway Integration: https://sbi.bank.in/web/careers/current-openings</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <Landmark className="w-8 h-8 text-sky-400" />
              {locale === 'hi' 
                ? 'भारतीय स्टेट बैंक (SBI) करियर लाइव मॉनिटर' 
                : 'State Bank of India (SBI) Careers Live Monitor'}
            </h1>
            <p className="text-sm text-blue-100 leading-relaxed">
              {locale === 'hi'
                ? 'एसबीआई पीओ (PO), क्लर्क (Junior Associates), सीबीओ (CBO), स्पेशलिस्ट ऑफिसर्स (SCO) और अप्रेंटिस भर्ती की आधिकारिक रिक्तियां, कॉल लेटर और कटऑफ मार्क्स सीधे sbi.bank.in से लाइव सिंक।'
                : 'Direct real-time feed tracking for SBI Probationary Officers (PO), Junior Associates (Clerk), Circle Based Officers (CBO), Specialist Cadre Officers (SCO), and Apprentices directly from sbi.bank.in/web/careers/current-openings.'}
            </p>

            {/* Quick Status Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-blue-200">
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <Globe className="w-3.5 h-3.5 text-sky-300" />
                <span>Portal: <strong>sbi.bank.in/web/careers</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gateway: <strong className="text-emerald-300">{status.status} ({status.latencyMs}ms)</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                <span>Next Auto-Poll: <strong>{secondsUntilNextSync}s</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => fetchSbiFeed(true)}
              disabled={syncing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Pinging SBI Careers...' : 'Sync SBI Careers Now'}</span>
            </button>
            <a
              href="https://sbi.bank.in/web/careers/current-openings"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open sbi.bank.in</span>
            </a>
          </div>
        </div>
      </div>

      {/* Cadre Filter Row: All, PO, Clerk, CBO, SCO, Apprentice */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-blue-600" />
            Cadre Stream:
          </span>
          {[
            { id: 'all', label: 'All Cadres' },
            { id: 'PO', label: 'SBI PO (Officer)' },
            { id: 'Clerk', label: 'SBI Clerk / JA' },
            { id: 'CBO', label: 'Circle Based (CBO)' },
            { id: 'SCO', label: 'Specialist (SCO)' },
            { id: 'Apprentice', label: 'Apprentices' }
          ].map(cadre => (
            <button
              key={cadre.id}
              onClick={() => setActiveCadre(cadre.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCadre === cadre.id 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cadre.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleImportAll}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Import All Visible to Website</span>
          </button>
        </div>
      </div>

      {/* Main Filter & Search Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-2xl">
          {[
            { id: 'all', label: 'All Openings', icon: Bell },
            { id: 'vacancy', label: 'Vacancies', icon: Briefcase },
            { id: 'admit-card', label: 'Call Letters', icon: FileText },
            { id: 'result', label: 'Results & Marks', icon: Award },
            { id: 'answer-key', label: 'Notices & Keys', icon: CheckSquare }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-white text-blue-700 shadow-sm'
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
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PO, Clerk, Advt No, Cutoff..."
            className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notices Grid */}
      {loading ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-600">Connecting to SBI Careers gateway...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No Openings Match Your Selection</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clearing search filters or checking other cadres.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => {
            const imported = isNoticeImported(notice);
            return (
              <div 
                key={notice.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative"
              >
                <div className="space-y-2.5">
                  {/* Badges row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        notice.category === 'vacancy' ? 'bg-emerald-100 text-emerald-800' :
                        notice.category === 'admit-card' ? 'bg-amber-100 text-amber-800' :
                        notice.category === 'result' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {notice.category}
                      </span>
                      {notice.advtNo && (
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {notice.advtNo}
                        </span>
                      )}
                      {notice.cadre && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                          Cadre: {notice.cadre}
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
                  <div className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{notice.statusBadge}</span>
                  </div>

                  {/* Micro Details */}
                  {notice.details && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-150 text-xs space-y-1.5 text-slate-600">
                      {notice.details.posts && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Total Vacancies:</span>
                          <span className="font-bold text-slate-800">{notice.details.posts.toLocaleString()} Posts</span>
                        </div>
                      )}
                      {notice.details.qualification && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Eligibility:</span>
                          <span className="font-semibold text-slate-700 text-right line-clamp-1">{notice.details.qualification}</span>
                        </div>
                      )}
                      {notice.details.salary && (
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-500">Emoluments:</span>
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
                          <span className="font-medium text-slate-500">Exam Date:</span>
                          <span className="font-semibold text-slate-700">{notice.details.examDate}</span>
                        </div>
                      )}
                      {notice.details.cutoff && (
                        <div className="flex justify-between text-purple-700">
                          <span className="font-bold">Cut-off Marks:</span>
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
                    <a
                      href={notice.pdfUrl || notice.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <FileText className="w-3 h-3 text-red-500" />
                      <span>Official PDF</span>
                    </a>
                    <a
                      href={notice.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>sbi.bank.in</span>
                    </a>
                  </div>

                  <button
                    onClick={() => handleImportNotice(notice)}
                    disabled={imported}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      imported
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
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
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Raw Notice AI Extractor Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {locale === 'hi' 
                ? 'एसबीआई करियर नोटिस एआई एक्सट्रैक्टर (AI Notice Analyzer)' 
                : 'SBI Careers Notice AI Extractor'}
            </h3>
            <p className="text-xs text-slate-500">
              Paste raw text from any new advertisement, notice or corrigendum from sbi.bank.in/web/careers/current-openings.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            rows={3}
            value={rawNoticeInput}
            onChange={(e) => setRawNoticeInput(e.target.value)}
            placeholder="e.g. State Bank of India invites online applications for recruitment of 2,000 Probationary Officers (Advt No. CRPD/PO/2026-27/01). Last date to apply is 15.10.2026..."
            className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end">
            <button
              onClick={handleParseRawNotice}
              disabled={isParsingNotice || !rawNoticeInput.trim()}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isParsingNotice ? 'animate-spin' : ''}`} />
              <span>{isParsingNotice ? 'Extracting with Gemini AI...' : 'Parse & Add to Live SBI Feed'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
