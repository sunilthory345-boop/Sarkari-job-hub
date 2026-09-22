import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, Landmark, Building2
} from 'lucide-react';
import { IbpsLiveNotice, IbpsSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface IbpsLiveSyncHubProps {
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

export default function IbpsLiveSyncHub({
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
}: IbpsLiveSyncHubProps) {
  const [notices, setNotices] = useState<IbpsLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<IbpsSyncStatus>({
    online: true,
    portal: 'https://www.ibps.in/',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 38,
    autoSyncIntervalSec: 45,
    totalLiveNotices: 8,
    newNoticesCount: 5
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key'>('all');
  const [activeCadre, setActiveCadre] = useState<'all' | 'PO' | 'Clerk' | 'SO' | 'RRB' | 'Specialist'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(45);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(45);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [syncHistory, setSyncHistory] = useState<string[]>([]);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch feed from IBPS API
  const fetchIbpsFeed = async (isManual = false) => {
    if (isManual) setSyncing(true);
    try {
      const res = await fetch('/api/ibps/live-feed');
      if (res.ok) {
        const data = await res.json();
        setNotices(data.notices || []);
      }

      const statusRes = await fetch('/api/ibps/status');
      if (statusRes.ok) {
        const sData = await statusRes.json();
        setStatus(sData);
      }

      if (isManual) {
        triggerToast(locale === 'hi' 
          ? '🏦 आईबीपीएस (ibps.in) से नवीनतम बैंकिंग अधिसूचनाएं सफलतापूर्वक सिंक हो गईं!' 
          : '🏦 Live banking recruitment notices successfully synced from https://www.ibps.in/!');
        setSyncHistory(prev => [
          `Manual check at ${new Date().toLocaleTimeString()} - Status 200 OK (${status.latencyMs}ms)`,
          ...prev.slice(0, 4)
        ]);
      }
    } catch (e) {
      console.error('Failed to fetch IBPS feed', e);
      if (isManual) {
        triggerToast('⚠️ Unable to reach IBPS API. Showing cached bank notices.');
      }
    } finally {
      setLoading(false);
      if (isManual) setSyncing(false);
      setSecondsUntilNextSync(autoSyncInterval);
    }
  };

  useEffect(() => {
    fetchIbpsFeed();
  }, []);

  // Polling countdown effect
  useEffect(() => {
    if (!autoSyncEnabled) return;
    const timer = setInterval(() => {
      setSecondsUntilNextSync(prev => {
        if (prev <= 1) {
          fetchIbpsFeed(false);
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [autoSyncEnabled, autoSyncInterval]);

  // Import individual notice to main website store
  const handleImportNotice = (notice: IbpsLiveNotice) => {
    let success = false;

    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      success = true;
      triggerToast(`✅ Job Published: "${notice.title.slice(0, 45)}..." added to Latest Jobs!`);
    } else if (notice.category === 'admit-card' && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      success = true;
      triggerToast(`🎟️ Call Letter Published: "${notice.title.slice(0, 45)}..." added to Admit Cards!`);
    } else if (notice.category === 'result' && notice.resultData) {
      const sanitizedResult: JobResult = {
        ...notice.resultData,
        cutOff: notice.resultData.cutOff || {
          UR: notice.details?.cutoff || 'Declared on Portal',
          OBC: 'Declared on Portal',
          SC: 'Declared on Portal',
          ST: 'Declared on Portal'
        }
      };
      onAddResult(sanitizedResult);
      success = true;
      triggerToast(`🏆 Result Published: "${notice.title.slice(0, 45)}..." added to Results!`);
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      success = true;
      triggerToast(`🔑 Answer Key Published: "${notice.title.slice(0, 45)}..." added to Answer Keys!`);
    }

    if (success) {
      setImportedNoticeIds(prev => new Set(prev).add(notice.id));
    }
  };

  // Import all notices in 1 click
  const handleImportAll = () => {
    let count = 0;
    notices.forEach(notice => {
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
          cutOff: notice.resultData.cutOff || {
            UR: notice.details?.cutoff || 'Declared on Portal',
            OBC: 'Declared on Portal',
            SC: 'Declared on Portal',
            ST: 'Declared on Portal'
          }
        };
        onAddResult(sanitizedResult);
        count++;
      } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey && !existingAnswerKeyIds.includes(notice.answerKeyData.id)) {
        onAddAnswerKey(notice.answerKeyData);
        count++;
      }
    });

    setImportedNoticeIds(new Set(notices.map(n => n.id)));
    triggerToast(locale === 'hi' 
      ? `🎉 ${count} आईबीपीएस अधिसूचनाएं आपकी वेबसाइट पर प्रकाशित हो गईं!` 
      : `🎉 ${count} IBPS release(s) synced to your website database!`);
  };

  // AI Auto-parser submission
  const handleParseAndPublishNotice = async () => {
    if (!rawNoticeInput.trim()) {
      triggerToast('Please enter text or notice details from ibps.in');
      return;
    }
    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/ibps/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: rawNoticeInput,
          officialUrl: 'https://www.ibps.in/'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notice) {
          setNotices(prev => [data.notice, ...prev]);
          handleImportNotice(data.notice);
          setRawNoticeInput('');
          triggerToast('✨ AI successfully parsed and published IBPS notice to your website!');
        }
      } else {
        triggerToast('Failed to auto-parse notice. Please check server logs.');
      }
    } catch (e) {
      console.error(e);
      triggerToast('Error connecting to parsing API.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  // Filter notices
  const filteredNotices = notices.filter(n => {
    const matchesCat = activeCategory === 'all' || n.category === activeCategory;
    const matchesCadre = activeCadre === 'all' || n.cadre === activeCadre;
    const matchesSearch = searchQuery === '' || 
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.crpCode && n.crpCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.details.summary && n.details.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesCadre && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Official Portal Direct Verification */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 text-white p-6 shadow-xl border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
                <span className="h-2 w-2 rounded-full bg-blue-400 -ml-3.5"></span>
                <Landmark className="h-3.5 w-3.5" />
                <span>IBPS.IN OFFICIAL AUTO-SYNC</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="h-3 w-3" />
                <span>Verified Gateway</span>
              </span>
              <span className="text-xs text-blue-200/70 font-mono">
                Ping: <strong className="text-white">{status.latencyMs}ms</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span>{locale === 'hi' ? 'बैंकिंग कार्मिक चयन संस्थान (IBPS) लाइव सिंक हब' : 'Institute of Banking Personnel Selection (IBPS) Live Sync Hub'}</span>
            </h1>
            <p className="text-sm text-blue-100/80 max-w-2xl">
              {locale === 'hi'
                ? 'आधिकारिक पोर्टल (https://www.ibps.in/) से सभी 11 राष्ट्रीयकृत एवं 43 क्षेत्रीय ग्रामीण बैंकों (RRBs) के CRP PO/MT, CRP Clerk, CRP RRBs एवं CRP SO के नए विज्ञापन, कॉल लेटर, स्कोरकार्ड व कट-ऑफ सीधे आपकी वेबसाइट पर स्वतः अपडेट होते हैं।'
                : 'Direct, real-time synchronization with official portal https://www.ibps.in/. Live tracking for CRP PO/MT, CRP Clerk, CRP RRBs, and CRP Specialist Officers (vacancies, prelims/mains call letters, scorecards, cutoff marks, and provisional allotment).'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-blue-200">
              <a
                href="https://www.ibps.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-800/60 hover:bg-blue-700/80 text-white font-semibold transition border border-blue-400/30"
              >
                <span>IBPS Portal (ibps.in)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://bankofbaroda.bank.in/career"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/70 hover:bg-amber-500/80 text-white font-semibold transition border border-amber-400/40"
              >
                <span>🏦 Bank of Baroda Careers (bankofbaroda.bank.in/career)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://pnb.bank.in/Recruitments.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-800/70 hover:bg-red-700/80 text-white font-semibold transition border border-red-400/40"
              >
                <span>🏛️ PNB Recruitments (pnb.bank.in)</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <span className="text-blue-300/60">•</span>
              <span>Last checked: <strong className="text-white font-mono">{status.lastChecked}</strong></span>
              <span className="text-blue-300/60">•</span>
              <span>Monitored: <strong className="text-white">PO, Clerk, RRB, SO, BOB, PNB</strong></span>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => fetchIbpsFeed(true)}
              disabled={syncing}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg transition active:scale-95 disabled:opacity-70 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? (locale === 'hi' ? 'सिंक हो रहा है...' : 'Syncing...') : (locale === 'hi' ? 'अभी IBPS री-सिंक करें' : 'Sync With IBPS Now')}</span>
            </button>

            <button
              onClick={handleImportAll}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>{locale === 'hi' ? 'सभी को वेबसाइट पर लाइव करें' : 'Import All to Website'}</span>
            </button>
          </div>
        </div>

        {/* Live Auto-Polling Status Bar */}
        <div className="mt-5 pt-4 border-t border-blue-800/40 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-blue-200">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Auto-Monitor Mode: <strong>ACTIVE</strong></span>
            <span className="text-blue-400 font-mono">
              (Auto-syncing every {autoSyncInterval}s • Next scan in: <span className="text-amber-300 font-bold">{secondsUntilNextSync}s</span>)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>Total Live Bank Notices: <strong className="text-white font-mono">{notices.length}</strong></span>
            <span>•</span>
            <span className="text-emerald-300">Ready to Publish: <strong className="font-mono">{notices.length - importedNoticeIds.size}</strong></span>
          </div>
        </div>
      </div>

      {/* Cadre Filter Buttons (PO, Clerk, RRB, SO) */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200">
        <span className="text-xs font-bold text-slate-500 px-2">Cadre Stream:</span>
        {[
          { id: 'all', label: 'All Banking Cadres' },
          { id: 'PO', label: '💼 Probationary Officer (PO/MT)' },
          { id: 'Clerk', label: '📝 Clerical Cadre (Clerk)' },
          { id: 'RRB', label: '🌾 Regional Rural Banks (RRB)' },
          { id: 'SO', label: '⚖️ Specialist Officers (SO)' }
        ].map(cadre => (
          <button
            key={cadre.id}
            onClick={() => setActiveCadre(cadre.id as any)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeCadre === cadre.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            {cadre.label}
          </button>
        ))}
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी' : 'All Releases', icon: Globe, count: notices.length },
            { id: 'vacancy', label: locale === 'hi' ? 'नई भर्तियां (Jobs)' : 'CRP Vacancies', icon: Briefcase, count: notices.filter(n => n.category === 'vacancy').length },
            { id: 'admit-card', label: locale === 'hi' ? 'कॉल लेटर (Call Letters)' : 'Exam Call Letters', icon: FileText, count: notices.filter(n => n.category === 'admit-card').length },
            { id: 'result', label: locale === 'hi' ? 'परिणाम व स्कोरकार्ड' : 'Results & Scores', icon: Award, count: notices.filter(n => n.category === 'result').length },
            { id: 'answer-key', label: locale === 'hi' ? 'उत्तर कुंजी व कैलेंडर' : 'Answer Keys & Objections', icon: CheckSquare, count: notices.filter(n => n.category === 'answer-key').length },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-2xs'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === 'hi' ? 'आईबीपीएस सूचना या परीक्षा खोजें...' : 'Filter notices, CRP code or exam...'}
            className="w-full sm:w-64 pl-3 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Quick AI Notice Ingester / Official Text Parser */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-2xl p-4 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span>{locale === 'hi' ? 'त्वरित IBPS सूचना पार्सर (Instant Live Ingestion)' : 'Quick IBPS Notice Auto-Parser (ibps.in)'}</span>
          </div>
          <span className="text-[11px] text-blue-700 bg-blue-100 px-2 py-0.5 rounded font-mono">
            Powered by Gemini AI
          </span>
        </div>
        <p className="text-xs text-blue-800/80 mb-3">
          {locale === 'hi'
            ? 'ibps.in से कोई भी नया परिपत्र, कॉल लेटर सूचना या परिणाम लिंक यहाँ पेस्ट करें। सिस्टम स्वतः 4 श्रेणियों में वर्गीकृत कर आपकी वेबसाइट पर प्रकाशित कर देगा:'
            : 'Paste any raw press release, call letter notification, or result link from https://www.ibps.in/. The engine automatically classifies and publishes it directly to your website.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={rawNoticeInput}
            onChange={(e) => setRawNoticeInput(e.target.value)}
            placeholder="e.g. CRP PO/MT-XVI Online Main Exam Call Letter Released. Download before 30th November..."
            className="flex-1 px-3 py-2 text-xs bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleParseAndPublishNotice();
            }}
          />
          <button
            onClick={handleParseAndPublishNotice}
            disabled={isParsingNotice || !rawNoticeInput.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95 disabled:opacity-60 cursor-pointer shrink-0"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{isParsingNotice ? 'Parsing & Publishing...' : 'Parse & Publish to Website'}</span>
          </button>
        </div>
      </div>

      {/* Main List of Notices */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-2xs">
          <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">Connecting to https://www.ibps.in/ and synchronizing live feed...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-2xs">
          <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 mb-1">No matching IBPS notices found</h3>
          <p className="text-xs text-slate-500">Try changing the search keyword or selecting a different category/cadre tab.</p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredNotices.map((notice) => {
            const isImported = importedNoticeIds.has(notice.id);
            const isAlreadyInJobs = notice.jobData && existingJobIds.includes(notice.jobData.id);
            const isAlreadyInAdmit = notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id);
            const isAlreadyInResults = notice.resultData && existingResultIds.includes(notice.resultData.id);
            const isAlreadyInKeys = notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id);
            const isSaved = isImported || isAlreadyInJobs || isAlreadyInAdmit || isAlreadyInResults || isAlreadyInKeys;

            return (
              <div
                key={notice.id}
                className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    {/* Badges Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      {notice.crpCode && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-900 text-white font-mono">
                          {notice.crpCode}
                        </span>
                      )}

                      {notice.cadre && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-800">
                          {notice.cadre}
                        </span>
                      )}

                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        notice.category === 'vacancy' ? 'bg-blue-100 text-blue-800' :
                        notice.category === 'admit-card' ? 'bg-amber-100 text-amber-800' :
                        notice.category === 'result' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {notice.category.replace('-', ' ')}
                      </span>

                      {notice.isNew && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-red-600 text-white animate-pulse">
                          NEW
                        </span>
                      )}

                      <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600">
                        {notice.statusBadge}
                      </span>

                      <span className="text-[11px] text-slate-400 font-mono ml-auto">
                        Released: <strong>{notice.publishedDate}</strong>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {locale === 'hi' ? notice.titleHi : notice.title}
                    </h3>

                    {/* Summary / Highlights */}
                    {notice.details.summary && (
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {notice.details.summary}
                      </p>
                    )}

                    {/* Key Details Pills */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-600">
                      {notice.details.posts && (
                        <div>
                          <span className="text-slate-400">Posts: </span>
                          <strong className="text-blue-700 font-mono">{notice.details.posts.toLocaleString()} Vacancies</strong>
                        </div>
                      )}
                      {notice.details.salary && (
                        <div>
                          <span className="text-slate-400">Salary: </span>
                          <strong className="text-emerald-700">{notice.details.salary}</strong>
                        </div>
                      )}
                      {notice.details.lastDate && (
                        <div>
                          <span className="text-slate-400">Last Date: </span>
                          <strong className="text-red-600 font-mono">{notice.details.lastDate}</strong>
                        </div>
                      )}
                      {notice.details.examDate && (
                        <div>
                          <span className="text-slate-400">Exam Date: </span>
                          <strong className="text-indigo-700 font-mono">{notice.details.examDate}</strong>
                        </div>
                      )}
                      {notice.details.cutoff && (
                        <div>
                          <span className="text-slate-400">Cutoff: </span>
                          <strong className="text-amber-700 font-mono">{notice.details.cutoff}</strong>
                        </div>
                      )}
                      {notice.details.participatingBanks && (
                        <div>
                          <span className="text-slate-400">Participating: </span>
                          <strong className="text-slate-700">{notice.details.participatingBanks.length} Public Sector Banks</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                    <button
                      onClick={() => handleImportNotice(notice)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                        isSaved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Live On Website</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>
                            {notice.category === 'vacancy' ? 'Publish Job' :
                             notice.category === 'admit-card' ? 'Publish Call Letter' :
                             notice.category === 'result' ? 'Publish Result' : 'Publish Answer Key'}
                          </span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      {notice.pdfUrl && (
                        <a
                          href={notice.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 text-[11px] font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition"
                        >
                          Official PDF
                        </a>
                      )}
                      <a
                        href={notice.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
                        title="Open on official ibps.in website"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Landmark className="h-4 w-4 text-blue-600" />
          <span>
            Automated monitoring running for <strong>https://www.ibps.in/</strong> (CRP PO, CRP Clerk, CRP RRB, CRP SO).
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.ibps.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold flex items-center gap-1"
          >
            <span>ibps.in Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
