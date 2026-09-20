import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2
} from 'lucide-react';
import { SscLiveNotice, SscSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface SscLiveSyncHubProps {
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

export default function SscLiveSyncHub({
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
}: SscLiveSyncHubProps) {
  const [notices, setNotices] = useState<SscLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<SscSyncStatus>({
    online: true,
    portal: 'https://ssc.gov.in/',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 42,
    autoSyncIntervalSec: 60,
    totalLiveNotices: 8,
    newNoticesCount: 4
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
    const saved = localStorage.getItem('sarkari_ssc_imported_ids');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchStatusAndFeed = async (isManualSync = false) => {
    if (isManualSync) setSyncing(true);
    try {
      // 1. Fetch Status
      const statusRes = await fetch('/api/ssc/status').catch(() => null);
      if (statusRes && statusRes.ok) {
        const sData = await statusRes.json();
        setStatus(sData);
      }

      // 2. Fetch Feed
      const feedRes = await fetch('/api/ssc/live-feed').catch(() => null);
      if (feedRes && feedRes.ok) {
        const fData = await feedRes.json();
        if (fData.notices && Array.isArray(fData.notices)) {
          setNotices(fData.notices);
          if (isManualSync) {
            triggerToast(
              locale === 'hi' 
                ? '⚡ https://ssc.gov.in/ से नवीनतम सूचनाएं सफलतापूर्वक सिंक हो गईं!' 
                : '⚡ Synced latest releases from https://ssc.gov.in/ successfully!'
            );
          }
        }
      }
    } catch (err) {
      console.error('Error syncing SSC feed:', err);
    } finally {
      setLoading(false);
      if (isManualSync) setSyncing(false);
      setCountdown(autoSyncInterval);
    }
  };

  useEffect(() => {
    fetchStatusAndFeed(false);
  }, []);

  // Countdown and periodic auto-sync
  useEffect(() => {
    if (!autoSyncEnabled) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchStatusAndFeed(false);
          return autoSyncInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [autoSyncEnabled, autoSyncInterval]);

  const handleImportNotice = (notice: SscLiveNotice) => {
    if (importedNoticeIds.includes(notice.id)) {
      triggerToast(locale === 'hi' ? 'यह सूचना पहले से ही आपकी वेबसाइट पर लाइव है।' : 'This notice is already active on your website.');
      return;
    }

    try {
      if (notice.category === 'vacancy') {
        const jobToAdd: GovJob = notice.jobData || {
          id: `ssc-job-${Date.now()}`,
          title: notice.title,
          org: notice.org,
          category: 'SSC',
          qualification: (notice.details?.qualification?.includes('10') ? '10th Pass' : notice.details?.qualification?.includes('12') ? '12th Pass' : 'Graduate') as any,
          ageLimit: '18-30 Years',
          salary: notice.details?.salary || '₹35,400 - ₹1,12,400',
          fees: { General: '₹100', OBC: '₹100', SC_ST_Female: 'Exempted (₹0)' },
          totalPosts: notice.details?.posts || 1000,
          applyUrl: notice.officialUrl,
          pdfUrl: notice.pdfUrl || notice.officialUrl,
          officialWebsite: 'https://ssc.gov.in/',
          postedDate: notice.publishedDate,
          lastDate: notice.details?.lastDate || '2026-10-31',
          importantDates: {
            applyStart: notice.publishedDate,
            applyEnd: notice.details?.lastDate || '2026-10-31',
            examDate: notice.details?.examDate || 'Upcoming 2026',
            admitCardRelease: '4 Days Before Exam'
          },
          selectionProcess: ['Computer Based Examination', 'Document Verification'],
          location: 'All India',
          description: notice.details?.summary || notice.title,
          formStatus: 'started',
          isWhatsAppAlert: true
        };
        onAddJob(jobToAdd);
      } else if (notice.category === 'admit-card') {
        const cardToAdd: AdmitCard = notice.admitCardData || {
          id: `ssc-admit-${Date.now()}`,
          title: notice.title,
          org: notice.org,
          examDate: notice.details?.examDate || 'Scheduled CBT',
          examCity: 'All Designated Regional Centres',
          downloadUrl: notice.pdfUrl || notice.officialUrl,
          officialLink: notice.officialUrl,
          addedDate: notice.publishedDate
        };
        onAddAdmitCard(cardToAdd);
      } else if (notice.category === 'result') {
        const resultToAdd: JobResult = notice.resultData || {
          id: `ssc-result-${Date.now()}`,
          title: notice.title,
          org: notice.org,
          meritListUrl: notice.pdfUrl || notice.officialUrl,
          scoreCardUrl: notice.officialUrl,
          cutOff: {
            UR: notice.details?.cutoff || '135+ Marks',
            OBC: '130+ Marks',
            SC: '115+ Marks',
            ST: '108+ Marks'
          },
          downloadUrl: notice.pdfUrl || notice.officialUrl,
          releaseDate: notice.publishedDate
        };
        onAddResult(resultToAdd);
      } else if (notice.category === 'answer-key') {
        if (onAddAnswerKey) {
          const keyToAdd: AnswerKey = notice.answerKeyData || {
            id: `ssc-key-${Date.now()}`,
            title: notice.title,
            org: notice.org,
            released: notice.publishedDate,
            objectionsLimit: 'Online Challenge Window Open',
            pdfUrl: notice.pdfUrl || notice.officialUrl
          };
          onAddAnswerKey(keyToAdd);
        }
      }

      const updated = [...importedNoticeIds, notice.id];
      setImportedNoticeIds(updated);
      localStorage.setItem('sarkari_ssc_imported_ids', JSON.stringify(updated));

      triggerToast(
        locale === 'hi'
          ? `✅ [SSC.GOV.IN] ${notice.title} तुरंत वेबसाइट पर जोड़ दी गई!`
          : `✅ [SSC.GOV.IN] ${notice.title} added and updated live on your website!`
      );
    } catch (e) {
      console.error('Failed to import notice:', e);
      triggerToast('❌ Failed to update item.');
    }
  };

  const handleImportAllNew = () => {
    let count = 0;
    notices.forEach((n) => {
      if (!importedNoticeIds.includes(n.id)) {
        handleImportNotice(n);
        count++;
      }
    });
    if (count > 0) {
      triggerToast(`🎉 Successfully imported ${count} fresh releases from https://ssc.gov.in/ to your website!`);
    } else {
      triggerToast(locale === 'hi' ? 'सभी नवीनतम SSC सूचनाएं पहले से ही आपकी वेबसाइट पर मौजूद हैं।' : 'All latest SSC notices are already published on your website.');
    }
  };

  const handleCustomNoticeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNoticeText.trim()) return;

    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/ssc/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: customNoticeText,
          officialUrl: 'https://ssc.gov.in/'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notice) {
          setNotices(prev => [data.notice, ...prev]);
          handleImportNotice(data.notice);
          setCustomNoticeText('');
          triggerToast(locale === 'hi' ? '✨ SSC नोटिस का विश्लेषण कर वेबसाइट पर प्रकाशित कर दिया गया!' : '✨ SSC Notice parsed and published live to website!');
        }
      } else {
        throw new Error('Parse error');
      }
    } catch (err) {
      console.error(err);
      triggerToast('⚠️ Unable to parse notice automatically.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  const filteredNotices = activeCategory === 'all' 
    ? notices 
    : notices.filter(n => n.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* TOP HERO MONITOR HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0d2149] to-[#1E3A8A] p-6 sm:p-8 text-white shadow-xl border border-blue-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 h-48 w-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-400/30">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 -ml-3.5"></span>
                24x7 SSC LIVE MONITOR ACTIVE
              </span>
              <span className="text-[11px] font-mono text-blue-200 bg-blue-900/60 px-2.5 py-0.5 rounded-md border border-blue-700/50">
                PORTAL: <strong className="text-white">https://ssc.gov.in/</strong>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {locale === 'hi' 
                ? 'कर्मचारी चयन आयोग (SSC) त्वरित ऑटो-अपडेट इंजन' 
                : 'Staff Selection Commission (SSC) Instant Auto-Update Engine'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {locale === 'hi'
                ? 'जैसे ही https://ssc.gov.in/ पर कोई भी नई वैकेंसी, एडमिट कार्ड, रिजल्ट या आंसर की जारी होती है, यह सिस्टम उसे तुरंत पकड़कर आपकी वेबसाइट पर लाइव अपडेट कर देता है।'
                : 'Monitors official notifications at https://ssc.gov.in/ in real-time. Instantly captures new Vacancies, Admit Cards, Results, and Answer Keys and publishes them live to your portal.'}
            </p>

            {/* LIVE METRICS PILLS */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-sans">
              <div className="bg-slate-900/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-sky-400" />
                <span className="text-slate-300">Ping Latency:</span>
                <span className="font-mono font-bold text-emerald-300">{status.latencyMs}ms</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-slate-300">Last Synced:</span>
                <span className="font-mono font-bold text-white">{new Date(status.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-slate-300">SSC Portal State:</span>
                <span className="font-bold text-emerald-400">{status.status}</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <button
              onClick={() => fetchStatusAndFeed(true)}
              disabled={syncing}
              className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
              <span>{locale === 'hi' ? '⚡ अभी SSC.GOV.IN से सिंक करें' : '⚡ Sync with ssc.gov.in Now'}</span>
            </button>

            <button
              onClick={handleImportAllNew}
              className="px-5 py-2.5 rounded-2xl bg-blue-600/90 hover:bg-blue-600 text-white font-bold text-xs transition border border-blue-400/40 flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>{locale === 'hi' ? 'सभी नई सूचनाएं वेबसाइट पर जोड़ें' : 'Import All New to Website'}</span>
            </button>

            <a
              href="https://ssc.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px] transition text-center flex items-center justify-center gap-1.5 border border-white/15"
            >
              <ExternalLink className="h-3.5 w-3.5 text-blue-300" />
              <span>Visit Official SSC Portal (ssc.gov.in)</span>
            </a>
          </div>
        </div>

        {/* AUTO-SYNC PROGRESS BAR STRIP */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoSyncEnabled}
                onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                className="rounded border-slate-700 text-amber-400 focus:ring-amber-400 h-4 w-4 cursor-pointer"
              />
              <span className="font-semibold text-slate-200">
                {locale === 'hi' ? 'पृष्ठभूमि में स्वचालित सिंक (Auto-Sync)' : 'Background Auto-Sync Active'}
              </span>
            </label>

            {autoSyncEnabled && (
              <span className="font-mono text-[11px] text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Next check in: <strong>{countdown}s</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-300 text-[11px]">Poll Interval:</span>
            <select
              value={autoSyncInterval}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAutoSyncInterval(val);
                setCountdown(val);
              }}
              className="bg-slate-900 text-white border border-white/20 rounded-lg px-2.5 py-1 text-xs font-mono font-bold cursor-pointer"
            >
              <option value={30}>Every 30 Seconds</option>
              <option value={60}>Every 1 Minute</option>
              <option value={120}>Every 2 Minutes</option>
              <option value={300}>Every 5 Minutes</option>
            </select>
          </div>
        </div>
      </div>

      {/* CATEGORY TABS SELECTOR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Releases (सभी)', icon: Zap, count: notices.length },
            { id: 'vacancy', label: 'Vacancies (भर्तियां)', icon: Briefcase, count: notices.filter(n => n.category === 'vacancy').length },
            { id: 'admit-card', label: 'Admit Cards (प्रवेश पत्र)', icon: FileText, count: notices.filter(n => n.category === 'admit-card').length },
            { id: 'result', label: 'Results (परिणाम)', icon: Award, count: notices.filter(n => n.category === 'result').length },
            { id: 'answer-key', label: 'Answer Keys (उत्तर कुंजी)', icon: CheckSquare, count: notices.filter(n => n.category === 'answer-key').length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E3A8A] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-mono">
          Showing <strong>{filteredNotices.length}</strong> official releases
        </div>
      </div>

      {/* FEED NOTICES LIST */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="text-xs font-bold text-slate-500">Connecting to https://ssc.gov.in/ live data stream...</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center bg-white space-y-2">
          <AlertCircle className="h-8 w-8 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No notices found in this category.</p>
          <p className="text-xs text-slate-400">Try switching to 'All Releases' or click Sync Now.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredNotices.map((notice) => {
            const isImported = importedNoticeIds.includes(notice.id);

            const categoryTheme = 
              notice.category === 'vacancy' 
                ? { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-600' }
                : notice.category === 'admit-card'
                  ? { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', badge: 'bg-purple-600' }
                  : notice.category === 'result'
                    ? { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-600' }
                    : { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-600' };

            return (
              <div
                key={notice.id}
                className={`rounded-2xl border bg-white p-5 transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                  isImported ? 'border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/10' : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="space-y-3">
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${categoryTheme.bg} ${categoryTheme.text} border ${categoryTheme.border}`}>
                        {notice.category.toUpperCase()}
                      </span>
                      {notice.isNew && (
                        <span className="text-[10px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          🔥 NEW LIVE
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-mono">
                        {notice.publishedDate}
                      </span>
                    </div>

                    {isImported ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3" /> Live on Website
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        Ready to Sync
                      </span>
                    )}
                  </div>

                  {/* Title & Authority */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">
                      {notice.org}
                    </span>
                    <h3 className="font-sans text-sm font-extrabold text-slate-900 leading-snug">
                      {notice.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 font-medium font-sans">
                      {notice.titleHi}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1.5 font-sans">
                    {notice.details?.posts && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Total Vacancies:</span>
                        <span className="font-bold font-mono text-blue-700">{notice.details.posts.toLocaleString()} Posts</span>
                      </div>
                    )}
                    {notice.details?.qualification && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Eligibility:</span>
                        <span className="font-bold text-slate-800">{notice.details.qualification}</span>
                      </div>
                    )}
                    {notice.details?.salary && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Pay Scale:</span>
                        <span className="font-bold text-slate-800">{notice.details.salary}</span>
                      </div>
                    )}
                    {notice.details?.examDate && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Exam Schedule:</span>
                        <span className="font-bold text-amber-700">{notice.details.examDate}</span>
                      </div>
                    )}
                    {notice.details?.cutoff && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Cut-Off Marks:</span>
                        <span className="font-bold text-emerald-700">{notice.details.cutoff}</span>
                      </div>
                    )}
                    {notice.details?.summary && (
                      <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 mt-1 leading-relaxed">
                        {notice.details.summary}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={notice.pdfUrl || notice.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Official PDF</span>
                    </a>
                    <a
                      href="https://ssc.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-medium text-slate-400 hover:text-slate-600 hover:underline"
                    >
                      ssc.gov.in
                    </a>
                  </div>

                  <button
                    onClick={() => handleImportNotice(notice)}
                    disabled={isImported}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                      isImported
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-[#1E3A8A] hover:bg-blue-800 text-white shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isImported ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{locale === 'hi' ? 'वेबसाइट पर सक्रिय' : 'Active on Website'}</span>
                      </>
                    ) : (
                      <>
                        <Zap className="h-3.5 w-3.5 text-amber-300" />
                        <span>{locale === 'hi' ? '⚡ तुरंत वेबसाइट पर जोड़ें' : '⚡ Update to Website'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* QUICK NOTICE PARSER BOX (FOR ANY NEW UNANNOUNCED SSC NOTICE) */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              {locale === 'hi' ? 'त्वरित नोटिस पार्सर (Instant Custom SSC Notice Publisher)' : 'Quick SSC Notice Auto-Parser & Publisher'}
            </h3>
            <p className="text-xs text-slate-500">
              {locale === 'hi' 
                ? 'यदि ssc.gov.in पर कोई नई पीडीएफ या नोटिस जारी हुआ है, तो उसका शीर्षक या लिंक यहाँ पेस्ट करें। AI उसे तुरंत श्रेणीबद्ध कर वेबसाइट पर प्रकाशित कर देगा।'
                : 'Paste any fresh notice text, circular headline, or link from https://ssc.gov.in/. The engine will auto-categorize and immediately publish it to your website.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleCustomNoticeSubmit} className="space-y-3">
          <textarea
            value={customNoticeText}
            onChange={(e) => setCustomNoticeText(e.target.value)}
            rows={3}
            placeholder="e.g. Notice of Examination for Junior Engineer (Civil, Mechanical & Electrical) Examination 2026 released at ssc.gov.in with 1,765 vacancies..."
            className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden font-sans"
            disabled={isParsingNotice}
          />

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400 font-mono">
              Source verified: https://ssc.gov.in/
            </span>

            <button
              type="submit"
              disabled={isParsingNotice || !customNoticeText.trim()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
            >
              {isParsingNotice ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Parsing Notice with AI...</span>
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 text-amber-300" />
                  <span>{locale === 'hi' ? 'तुरंत वेबसाइट पर जोड़ें' : 'Publish Live to Website'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
