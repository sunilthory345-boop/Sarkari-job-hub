import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, 
  Landmark, Stethoscope, Wrench, Users, Calendar, MapPin, Info, HelpCircle, Filter, Search
} from 'lucide-react';
import { BtscLiveNotice, BtscSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface BtscLiveSyncHubProps {
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

export default function BtscLiveSyncHub({
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
}: BtscLiveSyncHubProps) {
  const [notices, setNotices] = useState<BtscLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<BtscSyncStatus>({
    online: true,
    portal: 'https://btsc.bihar.gov.in/hi/recruitment',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 35,
    autoSyncIntervalSec: 40,
    totalLiveNotices: 9,
    newNoticesCount: 5
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key' | 'counseling'>('all');
  const [activePostType, setActivePostType] = useState<'all' | 'junior-engineer' | 'anm-nurse' | 'pharmacist' | 'lab-tech' | 'ot-assistant' | 'xray-tech' | 'iti-instructor' | 'medical-officer'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(40);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(40);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [showBtscGuide, setShowBtscGuide] = useState<boolean>(false);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch feed from BTSC Bihar API
  const fetchFeed = async (isManualSync = false) => {
    if (isManualSync) setSyncing(true);
    try {
      const [feedRes, statusRes] = await Promise.all([
        fetch('/api/btsc/live-feed'),
        fetch('/api/btsc/status')
      ]);

      if (feedRes.ok) {
        const feedData = await feedRes.json();
        setNotices(feedData.data || []);
      }

      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setStatus(statusData);
      }

      if (isManualSync) {
        triggerToast(
          locale === 'hi'
            ? '🟢 बिहार तकनीकी सेवा आयोग (btsc.bihar.gov.in/hi/recruitment) से लाइव डाटा सफलतापूर्वक सिंक हो गया!'
            : '🟢 BTSC Bihar (btsc.bihar.gov.in/hi/recruitment) live notices synchronized successfully!'
        );
      }
    } catch (err) {
      console.error('Failed to sync BTSC feed:', err);
      if (isManualSync) {
        triggerToast('⚠️ Error connecting to BTSC Bihar live monitor service.');
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
  const handleImportNotice = (notice: BtscLiveNotice) => {
    let addedType = '';

    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      addedType = locale === 'hi' ? 'नई भर्ती (Job Vacancy)' : 'New Job Vacancy';
    } else if ((notice.category === 'admit-card' || notice.category === 'counseling') && notice.admitCardData) {
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
        ? `✅ [BTSC बिहार] "${notice.title}" को आपकी वेबसाइट के ${addedType} अनुभाग में जोड़ दिया गया है!`
        : `✅ [BTSC Bihar] "${notice.title}" successfully added to website ${addedType} section!`
    );
  };

  // Sync All New Notices to Central Website
  const handleSyncAllToWebsite = () => {
    let count = 0;
    notices.forEach((notice) => {
      const isAlreadyImported =
        importedNoticeIds.has(notice.id) ||
        (notice.jobData && existingJobIds.includes(notice.jobData.id)) ||
        (notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) ||
        (notice.resultData && existingResultIds.includes(notice.resultData.id)) ||
        (notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id));

      if (!isAlreadyImported) {
        if (notice.category === 'vacancy' && notice.jobData) {
          onAddJob(notice.jobData);
          count++;
        } else if ((notice.category === 'admit-card' || notice.category === 'counseling') && notice.admitCardData) {
          onAddAdmitCard(notice.admitCardData);
          count++;
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
          count++;
        } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
          onAddAnswerKey(notice.answerKeyData);
          count++;
        } else if (notice.jobData) {
          onAddJob(notice.jobData);
          count++;
        }
        importedNoticeIds.add(notice.id);
      }
    });

    setImportedNoticeIds(new Set(importedNoticeIds));
    triggerToast(
      locale === 'hi'
        ? `⚡ ${count} BTSC बिहार भर्ती, एडमिट कार्ड और परिणाम तुरंत वेबसाइट पर प्रकाशित कर दिए गए!`
        : `⚡ ${count} BTSC Bihar recruitment updates published to your website instantly!`
    );
  };

  // AI-Powered notice parser
  const handleParseAiNotice = async () => {
    if (!rawNoticeInput.trim()) {
      triggerToast(locale === 'hi' ? 'कृपया BTSC की सूचना का टेक्स्ट या अधिसूचना लिंक दर्ज करें।' : 'Please enter BTSC notification text or link.');
      return;
    }

    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/btsc/auto-parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawNoticeText: rawNoticeInput,
          sourceUrl: 'https://btsc.bihar.gov.in/hi/recruitment'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.notice) {
          setNotices((prev) => [data.notice, ...prev]);
          handleImportNotice(data.notice);
          setRawNoticeInput('');
          triggerToast(
            locale === 'hi'
              ? `✨ AI ने BTSC सूचना का विश्लेषण कर वेबसाइट में जोड़ दिया: ${data.notice.title}`
              : `✨ AI parsed and added BTSC notice: ${data.notice.title}`
          );
        }
      } else {
        triggerToast('Failed to parse notice with AI.');
      }
    } catch (err) {
      console.error(err);
      triggerToast('Network error during AI parse.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  // Filter notices
  const filteredNotices = notices.filter((n) => {
    const matchesCategory = activeCategory === 'all' || n.category === activeCategory;
    const matchesPostType = activePostType === 'all' || n.postType === activePostType;
    const matchesSearch =
      !searchQuery.trim() ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.advtNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.department && n.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (n.details.summary && n.details.summary.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesPostType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Hero / Portal Synchronizer Status Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white p-6 shadow-xl border border-emerald-500/30">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Landmark className="w-80 h-80 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-3.5"></span>
                <span>BTSC BIHAR LIVE ENGINE</span>
              </span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                {locale === 'hi' ? 'बिहार तकनीकी सेवा आयोग' : 'Bihar Technical Service Commission'}
              </span>
              <span className="bg-slate-800/80 text-slate-300 px-2.5 py-0.5 rounded-full text-xs border border-slate-700">
                Patna, Bihar
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              <Landmark className="h-7 w-7 text-emerald-400 shrink-0" />
              <span>
                {locale === 'hi' 
                  ? 'बिहार तकनीकी सेवा आयोग (BTSC) लाइव भर्ती मॉनिटर' 
                  : 'BTSC Bihar Live Recruitment & Notice Monitor'}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {locale === 'hi'
                ? 'आधिकारिक पोर्टल (btsc.bihar.gov.in/hi/recruitment) से कनीय अभियंता (JE), ए.एन.एम. (ANM), फार्मासिस्ट, लैब तकनीशियन, ओटी असिस्टेंट, एक्स-रे, अनुदेशक व चिकित्सा पदाधिकारी की सभी नई भर्तियां, प्रवेश पत्र, उत्तर कुंजी व परीक्षा परिणाम तुरंत आपकी वेबसाइट पर ऑटो-सिंक होते हैं।'
                : 'Direct, real-time live synchronization for BTSC Bihar recruitment updates, ANM, Junior Engineer (JE), Pharmacist, Lab Technician, OT Assistant, and Medical Officer vacancies, admit cards, answer keys, and results.'}
            </p>

            {/* Official Source Link Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
              <a 
                href="https://btsc.bihar.gov.in/hi/recruitment" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 px-3 py-1.5 rounded-lg border border-emerald-500/40 font-mono transition"
              >
                <Globe className="h-3.5 w-3.5 text-emerald-400" />
                <span>https://btsc.bihar.gov.in/hi/recruitment</span>
                <ExternalLink className="h-3 w-3 text-emerald-300" />
              </a>
              <span className="text-slate-400">
                {locale === 'hi' ? 'सत्यापित आधिकारिक स्रोत' : 'Verified Official Source'}
              </span>
            </div>
          </div>

          {/* Sync Controls & Health Card */}
          <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-md flex flex-col gap-3 min-w-[280px]">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-white font-bold">{status.status}</span>
              </span>
              <span>{status.latencyMs}ms latency</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700">
                <div className="text-lg font-bold text-emerald-400">{notices.length}</div>
                <div className="text-[11px] text-slate-400">{locale === 'hi' ? 'लाइव नोटिस' : 'Live Notices'}</div>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700">
                <div className="text-lg font-bold text-amber-400">
                  {autoSyncEnabled ? `${secondsUntilNextSync}s` : 'Paused'}
                </div>
                <div className="text-[11px] text-slate-400">{locale === 'hi' ? 'ऑटो-सिंक' : 'Auto-Sync In'}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => fetchFeed(true)}
                disabled={syncing}
                className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-sm transition disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin' : ''}`} />
                <span>{locale === 'hi' ? 'अभी तुरंत सिंक करें' : 'Sync BTSC Now'}</span>
              </button>

              <button
                onClick={handleSyncAllToWebsite}
                className="flex items-center justify-center gap-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 active:scale-95 text-slate-950 font-black text-xs py-2 px-3 rounded-lg shadow-sm transition cursor-pointer"
                title="Publish all BTSC notices to website main tabs immediately"
              >
                <Zap className="h-3.5 w-3.5 fill-slate-950" />
                <span>{locale === 'hi' ? 'वेबसाइट पर जोड़ें' : 'Publish All'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Notification Intake & Instant Publish Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                {locale === 'hi' 
                  ? '⚡ BTSC कोई भी नया नोटिस / प्रेस विज्ञप्ति तुरंत डालें (AI ऑटो-पार्सर)' 
                  : '⚡ Instant BTSC Notice / Press Release Ingestion (AI Auto-Parser)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {locale === 'hi'
                  ? 'https://btsc.bihar.gov.in से कोई भी नया नोटिस, शुद्धि पत्र या पीडीएफ का टेक्स्ट यहाँ पेस्ट करें। Gemini AI इसे तुरंत पहचान कर वेबसाइट में जोड़ देगा।'
                  : 'Paste any raw announcement or PDF text from btsc.bihar.gov.in. Gemini AI structures and publishes it to your website in seconds.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowBtscGuide(!showBtscGuide)}
            className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer self-start sm:self-auto"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>{locale === 'hi' ? 'BTSC मुख्य भर्ती संवर्ग' : 'BTSC Post Categories'}</span>
          </button>
        </div>

        {/* Quick BTSC categories guide banner */}
        {showBtscGuide && (
          <div className="mt-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-emerald-600 dark:text-emerald-400 block font-semibold">1. कनीय अभियंता (JE)</strong>
              <span>असैनिक (Civil), यांत्रिक (Mechanical), विद्युत (Electrical) - पे लेवल 7 (40% SBTE कोटा)</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-emerald-600 dark:text-emerald-400 block font-semibold">2. ए.एन.एम. एवं ट्यूटर (Nursing)</strong>
              <span>एएनएम 10,709 पद, स्टाफ नर्स ग्रेड-A, सिस्टर ट्यूटर (स्वास्थ्य विभाग)</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-emerald-600 dark:text-emerald-400 block font-semibold">3. पैरामेडिकल संवर्ग</strong>
              <span>फार्मासिस्ट (D.Pharm/B.Pharm), लैब तकनीशियन, OT सहायक, एक्स-रे तकनीशियन</span>
            </div>
            <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <strong className="text-emerald-600 dark:text-emerald-400 block font-semibold">4. अनुदेशक व चिकित्सा</strong>
              <span>आईटीआई ट्रेड इंस्ट्रक्टर, सामान्य व विशेषज्ञ चिकित्सा पदाधिकारी (GMO/SMO)</span>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-col sm:flex-row gap-2">
          <textarea
            rows={2}
            value={rawNoticeInput}
            onChange={(e) => setRawNoticeInput(e.target.value)}
            placeholder={
              locale === 'hi'
                ? 'उदा. "बिहार तकनीकी सेवा आयोग, पटना: विज्ञापन संख्या 01/2026 कनीय अभियंता (असैनिक/यांत्रिक/विद्युत) के कुल 8,996 रिक्त पदों पर ऑनलाइन आवेदन की अंतिम तिथि 31.10.2026 तक विस्तारित..."'
                : 'e.g. "BTSC Bihar: Advertisement 01/2026 Junior Engineer (Civil/Mech/Elec) 8,996 posts online CBT exam dates announced from 15th Nov 2026..."'
            }
            className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
          />
          <button
            onClick={handleParseAiNotice}
            disabled={isParsingNotice || !rawNoticeInput.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 transition disabled:opacity-50 cursor-pointer shrink-0 active:scale-95"
          >
            <Sparkles className={`h-4 w-4 ${isParsingNotice ? 'animate-spin text-amber-300' : ''}`} />
            <span>{isParsingNotice ? (locale === 'hi' ? 'AI विश्लेषण जारी...' : 'AI Analyzing...') : (locale === 'hi' ? 'तुरंत वेबसाइट में जोड़ें' : 'Parse & Publish')}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {[
              { id: 'all', label: locale === 'hi' ? 'सभी अपडेट (All)' : 'All Updates', icon: Landmark },
              { id: 'vacancy', label: locale === 'hi' ? 'नई भर्तियां (Vacancies)' : 'Vacancies', icon: Briefcase },
              { id: 'admit-card', label: locale === 'hi' ? 'प्रवेश पत्र (Admit Cards)' : 'Admit Cards', icon: FileText },
              { id: 'result', label: locale === 'hi' ? 'परिणाम व मेधा सूची (Results)' : 'Results', icon: Award },
              { id: 'answer-key', label: locale === 'hi' ? 'उत्तर कुंजी (Answer Key)' : 'Answer Keys', icon: CheckSquare },
              { id: 'counseling', label: locale === 'hi' ? 'काउंसलिंग / सत्यापन' : 'Counseling / DV', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'hi' ? 'खोजें: JE, ANM, फार्मासिस्ट, 01/2026...' : 'Search: JE, ANM, Pharmacist, 01/2026...'}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Post Type Specific Filter Sub-Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
          <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" />
            <span>{locale === 'hi' ? 'पद संवर्ग:' : 'Post Filter:'}</span>
          </span>
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी पद' : 'All Posts' },
            { id: 'junior-engineer', label: locale === 'hi' ? 'कनीय अभियंता (JE)' : 'Junior Engineer (JE)' },
            { id: 'anm-nurse', label: locale === 'hi' ? 'ए.एन.एम. (ANM)' : 'ANM & Nursing' },
            { id: 'pharmacist', label: locale === 'hi' ? 'फार्मासिस्ट (Pharmacist)' : 'Pharmacist' },
            { id: 'lab-tech', label: locale === 'hi' ? 'प्रयोगशाला प्रावैधिक (Lab Tech)' : 'Lab Tech' },
            { id: 'ot-assistant', label: locale === 'hi' ? 'ओटी सहायक (OT Assistant)' : 'OT Assistant' },
            { id: 'xray-tech', label: locale === 'hi' ? 'एक्स-रे तकनीशियन' : 'X-Ray Tech' },
            { id: 'iti-instructor', label: locale === 'hi' ? 'व्यवसाय अनुदेशक (Instructor)' : 'ITI Instructor' },
            { id: 'medical-officer', label: locale === 'hi' ? 'चिकित्सा पदाधिकारी (MO)' : 'Medical Officer' }
          ].map((pt) => {
            const isSelected = activePostType === pt.id;
            return (
              <button
                key={pt.id}
                onClick={() => setActivePostType(pt.id as any)}
                className={`px-2 py-0.5 rounded-full font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-400/40'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {pt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notices Feed List */}
      {loading ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
          <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {locale === 'hi' ? 'बिहार तकनीकी सेवा आयोग (btsc.bihar.gov.in) से लाइव सूचनाएं लोड हो रही हैं...' : 'Fetching verified live notifications from btsc.bihar.gov.in...'}
          </p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
          <Landmark className="h-10 w-10 text-slate-400 mx-auto" />
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">
            {locale === 'hi' ? 'चयनित फिल्टर के अनुसार कोई सूचना नहीं मिली।' : 'No notifications matched the selected filters.'}
          </p>
          <button
            onClick={() => { setActiveCategory('all'); setActivePostType('all'); setSearchQuery(''); }}
            className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            {locale === 'hi' ? 'सभी फिल्टर रीसेट करें' : 'Reset all filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.map((notice) => {
            const isImported =
              importedNoticeIds.has(notice.id) ||
              (notice.jobData && existingJobIds.includes(notice.jobData.id)) ||
              (notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) ||
              (notice.resultData && existingResultIds.includes(notice.resultData.id)) ||
              (notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id));

            return (
              <div
                key={notice.id}
                className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-4 relative overflow-hidden"
              >
                {notice.isNew && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-wider px-3 py-0.5 rounded-bl-lg shadow-xs">
                    {locale === 'hi' ? 'नया लाइव' : 'LIVE NEW'}
                  </div>
                )}

                <div className="space-y-2.5">
                  {/* Notice Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Advt No */}
                    <span className="font-mono font-black text-[11px] bg-slate-900 text-amber-300 dark:bg-slate-800 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-400/40">
                      विज्ञापन: {notice.advtNo}
                    </span>

                    {/* Category Badge */}
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                        notice.category === 'vacancy'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                          : notice.category === 'admit-card'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : notice.category === 'result'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : notice.category === 'counseling'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300 dark:border-purple-800'
                          : 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-300 dark:border-teal-800'
                      }`}
                    >
                      {notice.statusBadge}
                    </span>

                    {/* Department Tag */}
                    {notice.department && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {notice.department}
                      </span>
                    )}

                    <span className="text-[11px] text-slate-400 ml-auto flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{notice.publishedDate}</span>
                    </span>
                  </div>

                  {/* Bilingual Title */}
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {locale === 'hi' ? notice.titleHi : notice.title}
                    </h3>
                    {locale === 'hi' && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {notice.title}
                      </p>
                    )}
                  </div>

                  {/* Summary / Core Details */}
                  {notice.details.summary && (
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                      {notice.details.summary}
                    </p>
                  )}

                  {/* Key Meta Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    {notice.details.posts && (
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          {locale === 'hi' ? 'कुल पद' : 'Vacancies'}
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {Number(notice.details.posts).toLocaleString()} Posts
                        </span>
                      </div>
                    )}

                    {notice.details.lastDate && (
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          {locale === 'hi' ? 'अंतिम तिथि' : 'Last Date'}
                        </span>
                        <span className="font-bold text-red-600 dark:text-red-400">
                          {notice.details.lastDate}
                        </span>
                      </div>
                    )}

                    {notice.details.examDate && (
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          {locale === 'hi' ? 'परीक्षा / सीबीटी' : 'CBT Date'}
                        </span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {notice.details.examDate}
                        </span>
                      </div>
                    )}

                    {notice.details.counselingDates && (
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          {locale === 'hi' ? 'काउंसलिंग तिथि' : 'DV Dates'}
                        </span>
                        <span className="font-bold text-purple-600 dark:text-purple-400">
                          {notice.details.counselingDates}
                        </span>
                      </div>
                    )}

                    {notice.details.cutoff && (
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800 col-span-2">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          {locale === 'hi' ? 'कटऑफ प्राप्तांक' : 'Cutoff Marks'}
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                          {notice.details.cutoff}
                        </span>
                      </div>
                    )}

                    {notice.details.qualification && (
                      <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded border border-slate-100 dark:border-slate-800 col-span-2">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                          {locale === 'hi' ? 'शैक्षणिक योग्यता' : 'Eligibility'}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">
                          {notice.details.qualification}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={notice.pdfUrl || notice.officialUrl || 'https://btsc.bihar.gov.in/hi/recruitment'}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>{locale === 'hi' ? 'आधिकारिक अधिसूचना PDF' : 'Official Notification PDF'}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>

                    <span className="text-slate-300 dark:text-slate-700">|</span>

                    <a
                      href="https://btsc.bihar.gov.in/hi/recruitment"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:underline"
                    >
                      <Globe className="h-3.5 w-3.5" />
                      <span>btsc.bihar.gov.in</span>
                    </a>
                  </div>

                  {/* 1-Click Import / Synchronize to Main Website */}
                  <div>
                    {isImported ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-400/40">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{locale === 'hi' ? 'वेबसाइट पर प्रकाशित है' : 'Live on Website'}</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleImportNotice(notice)}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>
                          {notice.category === 'vacancy'
                            ? (locale === 'hi' ? 'नौकरी टैब में जोड़ें' : 'Add to Jobs')
                            : notice.category === 'admit-card'
                            ? (locale === 'hi' ? 'एडमिट कार्ड में जोड़ें' : 'Add to Admit Cards')
                            : notice.category === 'result'
                            ? (locale === 'hi' ? 'रिजल्ट टैब में जोड़ें' : 'Add to Results')
                            : (locale === 'hi' ? 'उत्तर कुंजी में जोड़ें' : 'Add to Answer Keys')}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
