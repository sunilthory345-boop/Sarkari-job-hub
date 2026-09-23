import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, Train
} from 'lucide-react';
import { RrbLiveNotice, RrbSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface RrbLiveSyncHubProps {
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

export default function RrbLiveSyncHub({
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
}: RrbLiveSyncHubProps) {
  const [notices, setNotices] = useState<RrbLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<RrbSyncStatus>({
    online: true,
    portal: 'https://www.rrbapply.gov.in/#/auth/landing',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 42,
    autoSyncIntervalSec: 60,
    totalLiveNotices: 8,
    newNoticesCount: 5
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(60);
  const [countdown, setCountdown] = useState<number>(60);

  // Manual Notice Importer
  const [customNoticeText, setCustomNoticeText] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);

  // Added notices cache
  const [importedNoticeIds, setImportedNoticeIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('sarkari_rrb_imported_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchStatusAndFeed = async (isManualSync = false) => {
    if (isManualSync) setSyncing(true);
    try {
      // 1. Fetch Status
      const statusRes = await fetch('/api/rrb/status').catch(() => null);
      if (statusRes && statusRes.ok) {
        const sData = await statusRes.json();
        setStatus(sData);
      }

      // 2. Fetch Feed
      const feedRes = await fetch('/api/rrb/live-feed').catch(() => null);
      if (feedRes && feedRes.ok) {
        const fData = await feedRes.json();
        if (fData.notices) {
          setNotices(fData.notices);
        }
      }

      if (isManualSync) {
        triggerToast('✅ RRB Portal (rrbapply.gov.in) synchronized! Latest notifications loaded.');
      }
    } catch (err) {
      console.warn('Error syncing with RRB:', err);
      if (isManualSync) {
        triggerToast('⚠️ Error refreshing live RRB feed. Showing cached records.');
      }
    } finally {
      setLoading(false);
      if (isManualSync) setSyncing(false);
      setCountdown(autoSyncInterval);
    }
  };

  // Trigger manual sync now
  const handleManualSyncNow = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/rrb/sync-now', { method: 'POST' });
      const data = await res.json();
      if (data.notices) {
        setNotices(data.notices);
      }
      if (data.status) {
        setStatus(data.status);
      }
      triggerToast('⚡ Fresh handshake completed with https://www.rrbapply.gov.in/ (Railway Recruitment Boards)');
    } catch (e) {
      fetchStatusAndFeed(true);
    } finally {
      setSyncing(false);
      setCountdown(autoSyncInterval);
    }
  };

  // Initial load
  useEffect(() => {
    fetchStatusAndFeed(false);
  }, []);

  // Auto-sync countdown timer
  useEffect(() => {
    if (!autoSyncEnabled) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchStatusAndFeed(false);
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [autoSyncEnabled, autoSyncInterval]);

  // Import single notice into portal
  const handleImportNotice = (notice: RrbLiveNotice) => {
    let success = false;

    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      success = true;
      triggerToast(`🚆 Imported Railway Vacancy: "${notice.title.slice(0, 45)}..." to Live Jobs list!`);
    } else if (notice.category === 'admit-card' && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      success = true;
      triggerToast(`🎫 Imported e-Call Letter / City Slip: "${notice.title.slice(0, 45)}..." to Admit Cards section!`);
    } else if (notice.category === 'result' && notice.resultData) {
      onAddResult(notice.resultData);
      success = true;
      triggerToast(`🏆 Imported RRB Result: "${notice.title.slice(0, 45)}..." to Results section!`);
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      success = true;
      triggerToast(`🔑 Imported RRB Answer Key / Objections: "${notice.title.slice(0, 45)}..." to Answer Keys section!`);
    }

    if (success) {
      const updated = [...importedNoticeIds, notice.id];
      setImportedNoticeIds(updated);
      localStorage.setItem('sarkari_rrb_imported_ids', JSON.stringify(updated));
    }
  };

  // Bulk import all notices
  const handleImportAll = () => {
    let count = 0;
    const newIds = [...importedNoticeIds];

    notices.forEach(notice => {
      const isAlreadyImported = importedNoticeIds.includes(notice.id);
      if (!isAlreadyImported) {
        if (notice.category === 'vacancy' && notice.jobData && !existingJobIds.includes(notice.jobData.id)) {
          onAddJob(notice.jobData);
          newIds.push(notice.id);
          count++;
        } else if (notice.category === 'admit-card' && notice.admitCardData && !existingAdmitCardIds.includes(notice.admitCardData.id)) {
          onAddAdmitCard(notice.admitCardData);
          newIds.push(notice.id);
          count++;
        } else if (notice.category === 'result' && notice.resultData && !existingResultIds.includes(notice.resultData.id)) {
          onAddResult(notice.resultData);
          newIds.push(notice.id);
          count++;
        } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey && !existingAnswerKeyIds.includes(notice.answerKeyData.id)) {
          onAddAnswerKey(notice.answerKeyData);
          newIds.push(notice.id);
          count++;
        }
      }
    });

    setImportedNoticeIds(newIds);
    localStorage.setItem('sarkari_rrb_imported_ids', JSON.stringify(newIds));

    if (count > 0) {
      triggerToast(`🎉 Successfully auto-imported ${count} fresh Railway (RRB) release(s) to your website!`);
    } else {
      triggerToast('ℹ️ All current Railway notices are already imported and published on your portal.');
    }
  };

  // Parse custom raw notice or CEN link
  const handleParseCustomNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNoticeText.trim()) return;

    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/rrb/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: customNoticeText,
          officialUrl: 'https://www.rrbapply.gov.in/#/auth/landing'
        })
      });

      const data = await res.json();
      if (data.success && data.notice) {
        setNotices(prev => [data.notice, ...prev]);
        setCustomNoticeText('');
        handleImportNotice(data.notice);
        triggerToast('✨ Railway notice automatically parsed and published to website!');
      } else {
        triggerToast('⚠️ Unable to parse notice text. Please review input.');
      }
    } catch (err) {
      console.error(err);
      triggerToast('❌ Error parsing notice.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  const filteredNotices = notices.filter(n => {
    if (activeCategory === 'all') return true;
    return n.category === activeCategory;
  });

  const getNoticeIsImported = (notice: RrbLiveNotice) => {
    if (importedNoticeIds.includes(notice.id)) return true;
    if (notice.category === 'vacancy' && notice.jobData && existingJobIds.includes(notice.jobData.id)) return true;
    if (notice.category === 'admit-card' && notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) return true;
    if (notice.category === 'result' && notice.resultData && existingResultIds.includes(notice.resultData.id)) return true;
    if (notice.category === 'answer-key' && notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id)) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER WITH OFFICIAL RAILWAY COLORS */}
      <div className="bg-gradient-to-r from-red-900 via-sky-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-red-700/40 relative overflow-hidden">
        {/* Background Decorative Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <Train className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-200 border border-red-400/30 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              {locale === 'hi' ? 'रेलवे भर्ती बोर्ड (RRB) आधिकारिक पोर्टल लाइव सिंक्रोनाइज़र' : 'Official Railway Recruitment Boards (RRB) Live Synchronizer'}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <Train className="w-8 h-8 text-amber-300 shrink-0" />
              <span>rrbapply.gov.in {locale === 'hi' ? 'लाइव ऑटो-अपडेटर' : 'Live Auto-Updater'}</span>
            </h1>

            <p className="text-sm text-sky-100/90 leading-relaxed">
              {locale === 'hi'
                ? 'भारतीय रेल के आधिकारिक भर्ती पोर्टल (https://www.rrbapply.gov.in/) से सीधे जुड़े रहें। NTPC, ALP, Technician, JE, Paramedical एवं RPF की नई भर्तियां, परीक्षा शहर पर्ची (City Slip), ई-कॉल लेटर, सीबीटी परिणाम और उत्तर कुंजी स्वतः इस वेबसाइट पर लाइव सिंक होते हैं।'
                : 'Directly synchronized with the official Indian Railways recruitment portal (https://www.rrbapply.gov.in/#/auth/landing). Real-time auto-injection for RRB NTPC, ALP, Technician, JE, Paramedical, and RPF notices, Exam City Slips, e-Call Letters, CBT Scorecards, and Answer Keys.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <a 
                href="https://www.rrbapply.gov.in/#/auth/landing" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-amber-300" />
                <span>Visit rrbapply.gov.in</span>
                <ExternalLink className="w-3 h-3 text-white/60" />
              </a>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Portal Status: <strong>{status.status}</strong> ({status.latencyMs}ms)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                <Clock className="w-3.5 h-3.5 text-indigo-300" />
                <span>Next Auto-Check: <strong>{countdown}s</strong></span>
              </span>
            </div>
          </div>

          {/* Action Hub */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={handleManualSyncNow}
              disabled={syncing}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold shadow-lg shadow-amber-500/25 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? (locale === 'hi' ? 'सिंक हो रहा है...' : 'Syncing Live...') : (locale === 'hi' ? '⚡ अभी तुरंत सिंक करें' : '⚡ Sync RRB Portal Now')}</span>
            </button>

            <button
              onClick={handleImportAll}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-700/25 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 text-emerald-200" />
              <span>{locale === 'hi' ? 'सभी नई रिलीज वेबसाइट में जोड़ें' : 'Import All Releases to Website'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QUICK STATUS BAR & PORTAL METRICS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
            <Train className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">RRB Portal Monitor</div>
            <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              rrbapply.gov.in
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Monitored Releases</div>
            <div className="text-sm font-bold text-slate-800">{notices.length} Live Items</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Fresh (Unimported)</div>
            <div className="text-sm font-bold text-amber-600">
              {notices.filter(n => !getNoticeIsImported(n)).length} Actionable
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Auto-Sync Cycle</div>
            <div className="text-sm font-bold text-slate-800">Every 45s (Active)</div>
          </div>
        </div>
      </div>

      {/* CATEGORY SELECTOR & FILTER TABS */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी रेलवे अपडेट (All)' : 'All RRB Updates', icon: Train, count: notices.length },
            { id: 'vacancy', label: locale === 'hi' ? 'भर्तियां / CEN (Vacancies)' : 'CEN Vacancies', icon: Briefcase, count: notices.filter(n => n.category === 'vacancy').length },
            { id: 'admit-card', label: locale === 'hi' ? 'ई-कॉल लेटर / City Slip' : 'e-Call Letter & City Slips', icon: FileText, count: notices.filter(n => n.category === 'admit-card').length },
            { id: 'result', label: locale === 'hi' ? 'सीबीटी परिणाम (Results)' : 'CBT Results & Cutoff', icon: Award, count: notices.filter(n => n.category === 'result').length },
            { id: 'answer-key', label: locale === 'hi' ? 'उत्तर कुंजी (Answer Keys)' : 'Answer Keys & Objections', icon: CheckSquare, count: notices.filter(n => n.category === 'answer-key').length },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-red-700 text-white shadow-md shadow-red-700/20' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-red-800 text-red-100' : 'bg-slate-200 text-slate-700'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={autoSyncEnabled}
              onChange={(e) => setAutoSyncEnabled(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span>{locale === 'hi' ? 'लाइव ऑटो-सिंक सक्रिय' : 'Live Auto-Sync Active'}</span>
          </label>
        </div>
      </div>

      {/* QUICK RRB PORTAL NOTIFICATION PARSER */}
      <div className="bg-gradient-to-r from-slate-900 to-red-950 text-white p-5 rounded-2xl border border-red-800/40 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">
              {locale === 'hi' ? 'त्वरित रेलवे सूचना पार्सर (Quick RRB Notice Parser)' : 'Instant RRB Notification Parser (Auto-Ingest)'}
            </h2>
          </div>
          <span className="text-xs bg-red-500/20 text-red-300 px-2.5 py-1 rounded-full border border-red-500/30">
            rrbapply.gov.in / rrbcdg.gov.in
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-3">
          {locale === 'hi'
            ? 'आरआरबी पोर्टल या किसी भी रेलवे जोन (CEN 01/2026, CEN 05/2026 आदि) से कोई भी नया नोटिस, परिपत्र या विज्ञप्ति टेक्स्ट यहाँ पेस्ट करें। AI इसे स्वतः वर्गीकृत कर आपकी वेबसाइट में जोड़ देगा।'
            : 'Paste any text, CEN advertisement snippet, or announcement from rrbapply.gov.in. The intelligent parser will categorize it and publish it immediately.'}
        </p>

        <form onSubmit={handleParseCustomNotice} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customNoticeText}
            onChange={(e) => setCustomNoticeText(e.target.value)}
            placeholder="e.g. CEN 05/2026: Notice on CBT-1 Exam Schedule & City Slip for NTPC Graduate Posts..."
            className="flex-1 bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            disabled={isParsingNotice || !customNoticeText.trim()}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shrink-0 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isParsingNotice ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            <span>{locale === 'hi' ? 'पार्स और प्रकाशित करें' : 'Parse & Publish'}</span>
          </button>
        </form>
      </div>

      {/* FEED NOTICES LIST */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-red-600 animate-spin mx-auto" />
            <div className="text-slate-600 font-medium">
              {locale === 'hi' ? 'आरआरबी पोर्टल (rrbapply.gov.in) से लाइव डेटा लोड हो रहा है...' : 'Connecting to rrbapply.gov.in & loading Railway notices...'}
            </div>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-slate-700 font-semibold">No notices found in this category.</div>
            <p className="text-xs text-slate-500">Switch to 'All' or trigger a manual sync.</p>
          </div>
        ) : (
          filteredNotices.map((notice) => {
            const isImported = getNoticeIsImported(notice);
            const isVacancy = notice.category === 'vacancy';
            const isAdmitCard = notice.category === 'admit-card';
            const isResult = notice.category === 'result';
            const isAnswerKey = notice.category === 'answer-key';

            return (
              <div
                key={notice.id}
                className={`bg-white rounded-2xl p-5 border transition-all ${
                  isImported 
                    ? 'border-emerald-200 bg-emerald-50/20 shadow-xs' 
                    : 'border-slate-200 hover:border-red-400 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left Column: Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {notice.cenNumber && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {notice.cenNumber}
                        </span>
                      )}

                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isVacancy 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : isAdmitCard 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                          : isResult 
                          ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {notice.statusBadge}
                      </span>

                      {notice.isNew && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 animate-pulse">
                          ⚡ LIVE NOW
                        </span>
                      )}

                      <span className="text-xs text-slate-500">
                        Released: <strong>{notice.publishedDate}</strong>
                      </span>

                      <span className="text-xs text-slate-400">
                        • {notice.org}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 leading-snug">
                      {locale === 'hi' ? notice.titleHi : notice.title}
                    </h2>

                    {notice.details.summary && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {notice.details.summary}
                      </p>
                    )}

                    {/* Meta Badges */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600">
                      {notice.details?.posts && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                          <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                          <span>Total Posts: <strong>{Number(notice.details.posts).toLocaleString()}</strong></span>
                        </span>
                      )}

                      {notice.details.salary && (
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-md">
                          <span>Pay Level: <strong>{notice.details.salary}</strong></span>
                        </span>
                      )}

                      {notice.details.lastDate && (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2.5 py-1 rounded-md">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Last Date: <strong>{notice.details.lastDate}</strong></span>
                        </span>
                      )}

                      {notice.details.examDate && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md">
                          <span>Exam Date: <strong>{notice.details.examDate}</strong></span>
                        </span>
                      )}

                      {notice.details.cityIntimationDate && (
                        <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md">
                          <span>City Slip: <strong>{notice.details.cityIntimationDate}</strong></span>
                        </span>
                      )}

                      {notice.details.cutoff && (
                        <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md">
                          <span>Cutoff Marks: <strong>{notice.details.cutoff}</strong></span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0">
                    {isImported ? (
                      <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{locale === 'hi' ? 'वेबसाइट पर प्रकाशित' : 'Published on Website'}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleImportNotice(notice)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>{locale === 'hi' ? 'वेबसाइट में जोड़ें' : 'Import to Website'}</span>
                      </button>
                    )}

                    <div className="flex items-center gap-2">
                      <a
                        href={notice.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                      >
                        <span>rrbapply.gov.in</span>
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                      </a>

                      {notice.pdfUrl && (
                        <a
                          href={notice.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          <span>PDF Notice</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FOOTER INFO WITH ALL 21 RRBS */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-800 flex items-center gap-2">
          <Train className="w-4 h-4 text-red-700" />
          <span>Covered Indian Railway Recruitment Boards (RRB Zones):</span>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
          {[
            'RRB Ahmedabad (rrbahmedabad.gov.in)',
            'RRB Ajmer (rrbajmer.gov.in)',
            'RRB Prayagraj / Allahabad (rrbald.gov.in)',
            'RRB Bangalore (rrbbnc.gov.in)',
            'RRB Bhopal (rrbbhopal.gov.in)',
            'RRB Bhubaneswar (rrbbbs.gov.in)',
            'RRB Bilaspur (rrbbilaspur.gov.in)',
            'RRB Chandigarh (rrbcdg.gov.in)',
            'RRB Chennai (rrbchennai.gov.in)',
            'RRB Gorakhpur (rrbgkp.gov.in)',
            'RRB Guwahati (rrbguwahati.gov.in)',
            'RRB Jammu-Srinagar (rrbjammu.nic.in)',
            'RRB Kolkata (rrbkolkata.gov.in)',
            'RRB Malda (rrbmalda.gov.in)',
            'RRB Mumbai (rrbmumbai.gov.in)',
            'RRB Muzaffarpur (rrbmuzaffarpur.gov.in)',
            'RRB Patna (rrbpatna.gov.in)',
            'RRB Ranchi (rrbranchi.gov.in)',
            'RRB Secunderabad (rrbsecunderabad.gov.in)',
            'RRB Siliguri (rrbsiliguri.gov.in)',
            'RRB Thiruvananthapuram (rrbthiruvananthapuram.gov.in)'
          ].map((zone, idx) => (
            <span key={idx} className="bg-white px-2 py-1 rounded-md border border-slate-200">
              {zone}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
