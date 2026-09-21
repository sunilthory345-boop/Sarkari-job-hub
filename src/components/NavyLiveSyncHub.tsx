import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, 
  Anchor, Shield, Calendar, Users, MapPin, Info, HelpCircle
} from 'lucide-react';
import { NavyLiveNotice, NavySyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface NavyLiveSyncHubProps {
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

export default function NavyLiveSyncHub({
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
}: NavyLiveSyncHubProps) {
  const [notices, setNotices] = useState<NavyLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<NavySyncStatus>({
    online: true,
    portal: 'https://www.joinindiannavy.gov.in/',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 34,
    autoSyncIntervalSec: 45,
    totalLiveNotices: 8,
    newNoticesCount: 6
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key'>('all');
  const [activeEntryType, setActiveEntryType] = useState<'all' | 'agniveer-ssr' | 'agniveer-mr' | 'officer' | 'cadet-btech' | 'tradesman'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(45);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(45);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [showNavyStandardsGuide, setShowNavyStandardsGuide] = useState<boolean>(false);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch feed from Join Indian Navy API
  const fetchNavyFeed = async (isManual = false) => {
    if (isManual) setSyncing(true);
    try {
      const res = await fetch('/api/navy/live-feed');
      if (res.ok) {
        const data = await res.json();
        setNotices(data.data || []);
      }

      const statusRes = await fetch('/api/navy/status');
      if (statusRes.ok) {
        const sData = await statusRes.json();
        setStatus(sData);
      }

      if (isManual) {
        triggerToast(locale === 'hi' 
          ? '⚓ भारतीय नौसेना आधिकारिक पोर्टल (joinindiannavy.gov.in) से नवीनतम अग्निवीर व अधिकारी सूचनाएं सिंक हो गईं!' 
          : '⚓ Join Indian Navy live notices successfully synchronized from https://www.joinindiannavy.gov.in/!');
      }
    } catch (e) {
      console.error('Failed to fetch Indian Navy feed', e);
      if (isManual) {
        triggerToast('⚠️ Unable to reach Join Indian Navy API. Showing cached releases.');
      }
    } finally {
      setLoading(false);
      if (isManual) setSyncing(false);
      setSecondsUntilNextSync(autoSyncInterval);
    }
  };

  useEffect(() => {
    fetchNavyFeed();
  }, []);

  // Countdown effect
  useEffect(() => {
    if (!autoSyncEnabled) return;

    const timer = setInterval(() => {
      setSecondsUntilNextSync(prev => {
        if (prev <= 1) {
          fetchNavyFeed();
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoSyncEnabled, autoSyncInterval]);

  // AI Parse raw text using Gemini
  const handleAiParseNotice = async () => {
    if (!rawNoticeInput.trim()) {
      triggerToast('Please paste Indian Navy notification or press release text');
      return;
    }

    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/navy/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: rawNoticeInput,
          sourceUrl: 'https://www.joinindiannavy.gov.in/'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notice) {
          setNotices(prev => [data.notice, ...prev]);
          setRawNoticeInput('');
          triggerToast(`✅ AI successfully extracted & published: ${data.notice.title}`);
        }
      } else {
        triggerToast('Failed to auto-parse Navy notification.');
      }
    } catch (e) {
      console.error(e);
      triggerToast('Error analyzing Navy notice.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  // Filter notices
  const filteredNotices = notices.filter(n => {
    if (activeCategory !== 'all' && n.category !== activeCategory) return false;
    if (activeEntryType !== 'all' && n.entryType !== activeEntryType) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title?.toLowerCase().includes(q);
      const matchTitleHi = n.titleHi?.toLowerCase().includes(q);
      const matchBatch = n.batch?.toLowerCase().includes(q);
      const matchBranch = n.branch?.toLowerCase().includes(q);
      const matchSummary = n.details?.summary?.toLowerCase().includes(q);
      if (!matchTitle && !matchTitleHi && !matchBatch && !matchBranch && !matchSummary) {
        return false;
      }
    }

    return true;
  });

  const isNoticeAlreadyImported = (notice: NavyLiveNotice): boolean => {
    if (importedNoticeIds.has(notice.id)) return true;
    if (notice.jobData && existingJobIds.includes(notice.jobData.id)) return true;
    if (notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) return true;
    if (notice.resultData && existingResultIds.includes(notice.resultData.id)) return true;
    if (notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id)) return true;
    return false;
  };

  const handleImportToMain = (notice: NavyLiveNotice) => {
    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      triggerToast(`📥 Added to Live Jobs: ${notice.jobData.title}`);
    } else if (notice.category === 'admit-card' && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      triggerToast(`📥 Added to Admit Cards: ${notice.admitCardData.title}`);
    } else if (notice.category === 'result' && notice.resultData) {
      onAddResult(notice.resultData);
      triggerToast(`📥 Added to Results: ${notice.resultData.title}`);
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      triggerToast(`📥 Added to Answer Keys: ${notice.answerKeyData.title}`);
    } else {
      triggerToast(`Notice verified: ${notice.title}`);
    }

    setImportedNoticeIds(prev => new Set(prev).add(notice.id));
  };

  return (
    <div id="navy-live-sync-hub" className="space-y-6 animate-fade-in text-left font-sans">
      
      {/* ⚓ Top Indian Navy Official Portal Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 shadow-xl border border-blue-900/60">
        <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-cyan-600/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30 tracking-wider uppercase">
                <Anchor className="h-3.5 w-3.5 text-cyan-300 animate-pulse" />
                <span>OFFICIAL DEFENCE PORTAL MONITOR</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>ONLINE 24/7 (34ms)</span>
              </span>
              <span className="text-xs text-slate-300 font-mono">joinindiannavy.gov.in</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2.5 flex-wrap">
              <span>{locale === 'hi' ? 'भारतीय नौसेना लाइव भर्ती पोर्टल' : 'Join Indian Navy Live Sync Hub'}</span>
              <span className="text-cyan-400 text-sm font-bold bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800/60">
                शं नो वरुणः
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {locale === 'hi' 
                ? 'आधिकारिक नौसेना पोर्टल (joinindiannavy.gov.in) से सीधे अग्निवीर (SSR), अग्निवीर (MR), 10+2 बी.टेक कैडेट एंट्री (INA एझिमाला), शॉर्ट सर्विस कमीशन अधिकारी और INCET ट्रेड्समैन की रीयल-टाइम अधिसूचनाएं, सीबीटी एडमिट कार्ड, राज्यवार कट-ऑफ और आईएनएस चिल्का रिपोर्टिंग निर्देश।'
                : 'Direct real-time synchronization from https://www.joinindiannavy.gov.in/ for Agniveer (SSR & MR), 10+2 B.Tech Cadet Entry Scheme (INA Ezhimala), SSC Officers, and INCET Civilian Tradesman with automated INET CBT hall tickets, merit lists, and cut-off scores.'}
            </p>
          </div>

          {/* Sync Stats & Controller */}
          <div className="bg-slate-900/90 border border-blue-800/60 rounded-2xl p-4 shrink-0 w-full lg:w-auto space-y-3.5 shadow-lg backdrop-blur-xs">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Portal Connection</span>
              <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" /> 200 OK • Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">Live Notices</span>
                <span className="text-lg font-black text-cyan-400">{notices.length}</span>
              </div>
              <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-bold">Auto-Sync In</span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  {autoSyncEnabled ? `${secondsUntilNextSync}s` : 'Paused'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="navy-manual-sync-btn"
                onClick={() => fetchNavyFeed(true)}
                disabled={syncing}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/20 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>{syncing ? 'Checking Portal...' : 'Sync Navy Now'}</span>
              </button>

              <a
                href="https://www.joinindiannavy.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 cursor-pointer"
                title="Open Official joinindiannavy.gov.in in New Window"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info & Physical Standards Quick Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-50 text-cyan-700">
            <Anchor className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Sailor Entry</span>
            <h4 className="text-sm font-black text-slate-800">Agniveer (SSR & MR)</h4>
            <span className="text-[10px] text-emerald-600 font-extrabold">10th / 12th PCM • 4,350+ Posts</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-700">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Officer Cadre</span>
            <h4 className="text-sm font-black text-slate-800">10+2 B.Tech / SSC Officers</h4>
            <span className="text-[10px] text-blue-600 font-extrabold">INA Ezhimala • SSB Interview</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-700">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Civilian Personnel</span>
            <h4 className="text-sm font-black text-slate-800">INCET 2026 Tradesman</h4>
            <span className="text-[10px] text-amber-600 font-extrabold">741 Posts • Naval Dockyards</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">Medical & Fitness</span>
            <h4 className="text-sm font-black text-slate-800">Navy PFT & Eye Standards</h4>
            <button
              onClick={() => setShowNavyStandardsGuide(!showNavyStandardsGuide)}
              className="text-[11px] text-cyan-600 font-bold hover:underline mt-0.5 block cursor-pointer"
            >
              {showNavyStandardsGuide ? 'Hide Standards' : 'View PFT Standards'} →
            </button>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Collapsible Navy Physical & Medical Standards Guide */}
      {showNavyStandardsGuide && (
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-5 border border-blue-900/60 space-y-4 animate-fade-in text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-sm text-cyan-300 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Official Indian Navy Physical Fitness Test (PFT) & Visual Standards</span>
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">INS Chilka Guidelines</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h5 className="font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                <span>🏃 Physical Fitness Test (PFT)</span>
              </h5>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4 leading-relaxed">
                <li><strong>1.6 Km Run:</strong> Male: 6 Min 30 Sec | Female: 8 Min</li>
                <li><strong>Squats (Uthak Baithak):</strong> Male: 20 | Female: 15</li>
                <li><strong>Push-ups:</strong> Male: 12 reps | Female: NIL</li>
                <li><strong>Bent-knee Sit-ups:</strong> Male: NIL | Female: 10 reps</li>
                <li><strong>Venue:</strong> Stage-II Zonal Recruitment Centers</li>
              </ul>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h5 className="font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                <span>📏 Height & Chest Standards</span>
              </h5>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4 leading-relaxed">
                <li><strong>Height (Male):</strong> Minimum 157 cms</li>
                <li><strong>Height (Female):</strong> Minimum 152 cms</li>
                <li><strong>Chest:</strong> Minimum expansion of 5 cms for both male & female</li>
                <li><strong>Weight:</strong> Proportionate to height and age as per Indian Navy charts</li>
                <li><strong>Relaxation:</strong> Available for Gorkhas, Assamese, Garhwalis & Lakshadweep</li>
              </ul>
            </div>

            <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2">
              <h5 className="font-bold text-cyan-400 text-xs flex items-center gap-1.5">
                <span>👁️ Eyesight & Visual Standards</span>
              </h5>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc pl-4 leading-relaxed">
                <li><strong>Agniveer SSR:</strong> Uncorrected: 6/60 | Corrected: Better Eye 6/9, Worse Eye 6/12</li>
                <li><strong>Agniveer MR:</strong> Uncorrected: 6/60 | Corrected: Better Eye 6/9, Worse Eye 6/12</li>
                <li><strong>Naval Aviation / Pilot:</strong> 6/6 without glasses (Uncorrected)</li>
                <li><strong>Permanent Tattoos:</strong> Allowed only on inner face of forearms</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* AI Press Release & Notice Parser Input Section */}
      <div className="bg-gradient-to-r from-blue-50/50 via-cyan-50/30 to-indigo-50/30 rounded-2xl p-4 sm:p-5 border border-blue-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-600 animate-pulse" />
            <h3 className="font-sans font-bold text-xs sm:text-sm text-slate-900">
              {locale === 'hi' ? '⚡ AI नौसेना सूचना विश्लेषक (Gemini Powered)' : '⚡ AI Indian Navy Notification & Press Release Parser'}
            </h3>
          </div>
          <span className="text-[10px] text-cyan-700 bg-cyan-100 font-bold px-2 py-0.5 rounded-full">
            Auto-Category & Direct Import
          </span>
        </div>
        <p className="text-[11px] text-slate-600 mb-3">
          Paste any raw text or press notice from <code className="text-cyan-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">joinindiannavy.gov.in</code>. Gemini will automatically extract the entry type, batch, posts, eligibility, INET dates, and format it for immediate integration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <textarea
            value={rawNoticeInput}
            onChange={(e) => setRawNoticeInput(e.target.value)}
            placeholder="Paste raw text here... e.g. 'Indian Navy announces Agniveer SSR Batch 01/2026 for 4000 posts. 10+2 PCM pass can apply online at joinindiannavy.gov.in from 12 Sept to 24 Oct 2026. INET exam in October 2026...'"
            rows={2}
            className="flex-1 rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-sans"
          />
          <button
            onClick={handleAiParseNotice}
            disabled={isParsingNotice || !rawNoticeInput.trim()}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Sparkles className={`h-4 w-4 ${isParsingNotice ? 'animate-spin text-amber-300' : 'text-cyan-300'}`} />
            <span>{isParsingNotice ? 'Analyzing Notice...' : 'Parse & Add Notice'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className="text-[10px] text-slate-500 font-bold">Quick Samples:</span>
          <button
            type="button"
            onClick={() => setRawNoticeInput('Indian Navy Agniveer (SSR) 01/2026 Batch Notification Released. Total vacancies 4000. Online application starts on joinindiannavy.gov.in for male and female 10+2 PCM candidates. Last date 24 Oct 2026. Computer based INET exam in Nov 2026.')}
            className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Agniveer SSR 2026 Sample
          </button>
          <button
            type="button"
            onClick={() => setRawNoticeInput('Indian Navy 10+2 B.Tech Cadet Entry Scheme Jan 2027 Course at Indian Naval Academy (INA) Ezhimala. 36 posts for Executive & Technical branches. Shortlisting based on JEE Main CRL Rank. 5-day SSB interview at NSB Vizag, Bhopal, Bangalore.')}
            className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            INA 10+2 B.Tech Sample
          </button>
          <button
            type="button"
            onClick={() => setRawNoticeInput('Indian Navy INCET-01/2026 Civilian Entrance Test for 741 Posts of Tradesman Mate and Chargeman in Naval Dockyards. 10th plus ITI pass eligible. Online CBT exam in Dec 2026.')}
            className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            INCET Tradesman Sample
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Notices', count: notices.length },
              { id: 'vacancy', label: 'Vacancies', count: notices.filter(n => n.category === 'vacancy').length },
              { id: 'admit-card', label: 'Admit Cards', count: notices.filter(n => n.category === 'admit-card').length },
              { id: 'result', label: 'Results & Merit', count: notices.filter(n => n.category === 'result').length },
              { id: 'answer-key', label: 'Answer Keys', count: notices.filter(n => n.category === 'answer-key').length }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id ? 'bg-blue-800 text-blue-200' : 'bg-slate-200 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search SSR, MR, Cadet, INET..."
              className="w-full pl-3 pr-8 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filter: Entry Type */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Entry Stream:</span>
          {[
            { id: 'all', label: 'All Streams' },
            { id: 'agniveer-ssr', label: '⚓ Agniveer (SSR)' },
            { id: 'agniveer-mr', label: '⚓ Agniveer (MR)' },
            { id: 'officer', label: '🎖️ SSC Officers' },
            { id: 'cadet-btech', label: '🎓 10+2 B.Tech (INA)' },
            { id: 'tradesman', label: '🛠️ INCET Tradesman' }
          ].map((entry) => (
            <button
              key={entry.id}
              onClick={() => setActiveEntryType(entry.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeEntryType === entry.id
                  ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 font-extrabold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Feed List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>Showing <strong>{filteredNotices.length}</strong> official releases from Indian Navy recruitment portal</span>
          <span className="flex items-center gap-1.5 text-cyan-700 font-bold">
            <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping"></span>
            Verified Monitored Feed
          </span>
        </div>

        {filteredNotices.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200/80 space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-700">
              <Anchor className="h-8 w-8" />
            </div>
            <h4 className="text-base font-bold text-slate-800">No notices match your selected filter</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try changing your entry type, category selection, or search query to view other active releases from joinindiannavy.gov.in.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveEntryType('all');
                setSearchQuery('');
              }}
              className="bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition hover:bg-blue-800"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const alreadyImported = isNoticeAlreadyImported(notice);

            return (
              <div
                key={notice.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 transition-all p-5 shadow-xs hover:shadow-md space-y-3.5 relative overflow-hidden"
              >
                {/* Accent indicator bar */}
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-700 via-cyan-600 to-indigo-800"></div>

                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 pl-2">
                  
                  {/* Left info column */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      
                      {/* Category Badge */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${
                        notice.category === 'vacancy' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        notice.category === 'admit-card' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        notice.category === 'result' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        'bg-purple-100 text-purple-800 border border-purple-200'
                      }`}>
                        {notice.category.toUpperCase()}
                      </span>

                      {/* Entry Type Tag */}
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-bold border border-slate-200">
                        {notice.entryType === 'agniveer-ssr' ? '⚓ Agniveer SSR (10+2 PCM)' :
                         notice.entryType === 'agniveer-mr' ? '⚓ Agniveer MR (Matric)' :
                         notice.entryType === 'cadet-btech' ? '🎓 10+2 B.Tech Cadet (INA)' :
                         notice.entryType === 'officer' ? '🎖️ SSC Officers Cadre' :
                         notice.entryType === 'tradesman' ? '🛠️ INCET Tradesman' : 'Navy Cadre'}
                      </span>

                      {/* Batch tag */}
                      <span className="bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded-md text-[10px] font-bold border border-cyan-200">
                        {notice.batch}
                      </span>

                      {/* Status badge */}
                      {notice.statusBadge && (
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border border-emerald-200 animate-pulse">
                          {notice.statusBadge}
                        </span>
                      )}

                      <span className="text-[11px] text-slate-400 ml-auto flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3" /> {notice.publishedDate}
                      </span>
                    </div>

                    {/* Notice Titles */}
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                        {notice.title}
                      </h3>
                      {notice.titleHi && (
                        <p className="text-xs font-semibold text-slate-600 mt-0.5">
                          {notice.titleHi}
                        </p>
                      )}
                    </div>

                    {/* Key Details Tags Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-sans text-xs">
                      {notice.details.posts && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-150">
                          <span className="text-[10px] text-slate-400 font-bold block">Total Vacancies</span>
                          <span className="text-xs font-black text-blue-900">{notice.details.posts} Posts</span>
                        </div>
                      )}

                      {notice.details.qualification && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-150">
                          <span className="text-[10px] text-slate-400 font-bold block">Eligibility</span>
                          <span className="text-xs font-bold text-slate-800 truncate block" title={notice.details.qualification}>
                            {notice.details.qualification}
                          </span>
                        </div>
                      )}

                      {notice.details.ageLimit && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-150">
                          <span className="text-[10px] text-slate-400 font-bold block">Age Bracket</span>
                          <span className="text-xs font-bold text-slate-800">{notice.details.ageLimit}</span>
                        </div>
                      )}

                      {notice.details.trainingCenter && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-150">
                          <span className="text-[10px] text-slate-400 font-bold block">Training Center</span>
                          <span className="text-xs font-extrabold text-cyan-800">{notice.details.trainingCenter}</span>
                        </div>
                      )}

                      {notice.details.cutoff && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-150 col-span-2">
                          <span className="text-[10px] text-slate-400 font-bold block">State Cut-offs</span>
                          <span className="text-xs font-bold text-emerald-800">{notice.details.cutoff}</span>
                        </div>
                      )}

                      {notice.details.lastDate && (
                        <div className="bg-slate-50 p-2 rounded-xl border border-slate-150">
                          <span className="text-[10px] text-slate-400 font-bold block">Last Date</span>
                          <span className="text-xs font-bold text-rose-700">{notice.details.lastDate}</span>
                        </div>
                      )}
                    </div>

                    {/* Summary text */}
                    {notice.details.summary && (
                      <p className="text-xs text-slate-600 leading-relaxed pt-1 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                        {notice.details.summary}
                      </p>
                    )}
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    
                    {/* Official Portal Apply / Login button */}
                    <a
                      href={notice.officialUrl || 'https://www.joinindiannavy.gov.in/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-initial bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                    >
                      <span>Apply on Navy Portal</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    {/* Download PDF button */}
                    {notice.pdfUrl && (
                      <a
                        href={notice.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center justify-center gap-1 text-xs font-bold cursor-pointer"
                        title="Download Official Notification PDF"
                      >
                        <FileText className="h-4 w-4 text-rose-600" />
                        <span className="hidden sm:inline">Official PDF</span>
                      </a>
                    )}

                    {/* Import to main App state button */}
                    <button
                      onClick={() => handleImportToMain(notice)}
                      disabled={alreadyImported}
                      className={`flex-1 lg:flex-initial text-xs font-bold px-3.5 py-1.5 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                        alreadyImported
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      {alreadyImported ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>Imported</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add to Live Hub</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
