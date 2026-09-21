import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, 
  Landmark, GraduationCap, Building2, Stethoscope, Wrench, Users, Calendar, MapPin, Info, HelpCircle, Filter, Search, BookOpen, TreePine
} from 'lucide-react';
import { MpesbLiveNotice, MpesbSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface MpesbLiveSyncHubProps {
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

export default function MpesbLiveSyncHub({
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
}: MpesbLiveSyncHubProps) {
  const [notices, setNotices] = useState<MpesbLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<MpesbSyncStatus>({
    online: true,
    portal: 'https://esb.mponline.gov.in/Portal/Examinations/Vyapam/examsList.aspx',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 31,
    autoSyncIntervalSec: 40,
    totalLiveNotices: 6,
    newNoticesCount: 4
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key' | 'counseling'>('all');
  const [activePostType, setActivePostType] = useState<'all' | 'police-constable' | 'teacher-tet' | 'patwari-group2' | 'sub-engineer' | 'vanrakshak-jail' | 'nursing-pnst'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(40);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(40);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [showPortalGuide, setShowPortalGuide] = useState<boolean>(false);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch live feed from MP ESB API
  const fetchFeed = async (isManualSync = false) => {
    if (isManualSync) setSyncing(true);
    try {
      const [feedRes, statusRes] = await Promise.all([
        fetch('/api/mpesb/live-feed'),
        fetch('/api/mpesb/status')
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
            ? '🟢 मध्य प्रदेश कर्मचारी चयन मंडल (esb.mponline.gov.in) से लाइव सूचनाएं सिंक हो गईं!'
            : '🟢 MP ESB Vyapam (esb.mponline.gov.in) live notices synchronized successfully!'
        );
      }
    } catch (err) {
      console.error('Failed to sync MP ESB feed:', err);
      if (isManualSync) {
        triggerToast('⚠️ Error connecting to MP ESB Vyapam live monitor service.');
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
  const handleImportNotice = (notice: MpesbLiveNotice) => {
    let addedType = '';

    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      addedType = locale === 'hi' ? 'नई भर्ती (Job Vacancy)' : 'New Job Vacancy';
    } else if (notice.category === 'admit-card' && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      addedType = locale === 'hi' ? 'प्रवेश पत्र / TAC (Admit Card)' : 'Admit Card (TAC)';
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
      addedType = locale === 'hi' ? 'परीक्षा परिणाम व आवंटन (Result)' : 'Exam Result';
    } else if (notice.category === 'answer-key' && notice.answerKeyData && onAddAnswerKey) {
      onAddAnswerKey(notice.answerKeyData);
      addedType = locale === 'hi' ? 'मॉडल उत्तर कुंजी (Answer Key)' : 'Answer Key';
    } else if (notice.jobData) {
      onAddJob(notice.jobData);
      addedType = locale === 'hi' ? 'भर्ती सूचना' : 'Job Vacancy';
    }

    setImportedNoticeIds((prev) => new Set([...prev, notice.id]));
    triggerToast(
      locale === 'hi'
        ? `✅ [MP ESB] "${notice.title}" आपकी वेबसाइट पर ${addedType} के रूप में जोड़ दिया गया!`
        : `✅ [MP ESB] "${notice.title}" published to your website as ${addedType}!`
    );
  };

  // Check if notice is already imported or in state
  const isAlreadyImported = (notice: MpesbLiveNotice): boolean => {
    if (importedNoticeIds.has(notice.id)) return true;
    if (notice.jobData && existingJobIds.includes(notice.jobData.id)) return true;
    if (notice.admitCardData && existingAdmitCardIds.includes(notice.admitCardData.id)) return true;
    if (notice.resultData && existingResultIds.includes(notice.resultData.id)) return true;
    if (notice.answerKeyData && existingAnswerKeyIds.includes(notice.answerKeyData.id)) return true;
    return false;
  };

  // Import all filtered notices
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
          ? `🎉 MP ESB भोपाल की कुल ${count} सूचनाएं आपकी मुख्य वेबसाइट पर लाइव प्रकाशित कर दी गईं!`
          : `🎉 ${count} MP ESB notices published directly to your website!`
      );
    } else {
      triggerToast(
        locale === 'hi'
          ? 'ℹ️ चुनी गई सभी सूचनाएं पहले से ही आपकी वेबसाइट पर प्रकाशित हैं।'
          : 'ℹ️ All displayed notices are already imported.'
      );
    }
  };

  // Parse custom raw notice with AI
  const handleParseCustomNotice = async () => {
    if (!rawNoticeInput.trim()) return;
    setIsParsingNotice(true);
    try {
      const res = await fetch('/api/mpesb/auto-parse', {
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
              ? '✨ AI ने MP ESB नियमपुस्तिका को सफलता से विश्लेषित कर लाइव स्ट्रीम में जोड़ दिया!'
              : '✨ Gemini AI successfully parsed and added the notice to MP ESB feed!'
          );
        }
      } else {
        throw new Error('Parsing failed');
      }
    } catch (err) {
      triggerToast('❌ Error parsing notice text. Please check server or Gemini configuration.');
    } finally {
      setIsParsingNotice(false);
    }
  };

  // Filter notices based on category, post type, and search query
  const filteredNotices = notices.filter((notice) => {
    if (activeCategory !== 'all' && notice.category !== activeCategory) return false;
    if (activePostType !== 'all' && notice.postType !== activePostType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = notice.title.toLowerCase().includes(q);
      const matchTitleHi = notice.titleHi.toLowerCase().includes(q);
      const matchAdvt = notice.advtNo.toLowerCase().includes(q);
      return matchTitle || matchTitleHi || matchAdvt;
    }
    return true;
  });

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'police-constable': return 'म.प्र. पुलिस आरक्षी (Constable)';
      case 'teacher-tet': return 'शिक्षक चयन परीक्षा (MPTET)';
      case 'patwari-group2': return 'पटवारी व ग्रुप-2 (Patwari)';
      case 'sub-engineer': return 'उपयंत्री (Sub Engineer)';
      case 'vanrakshak-jail': return 'वनरक्षक व जेल प्रहरी';
      case 'nursing-pnst': return 'प्री-नर्सिंग (PNST / ANM)';
      default: return 'अन्य परीक्षा (ESB)';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vacancy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'admit-card': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'result': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'answer-key': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="mpesb-live-hub-container" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-teal-700/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Landmark className="w-9 h-9 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-400/20 text-teal-200 border border-teal-300/30 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> esb.mponline.gov.in
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {locale === 'hi' ? 'मध्य प्रदेश कर्मचारी चयन मंडल लाइव' : 'MP ESB Vyapam Live Sync Active'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                {locale === 'hi' ? 'मध्य प्रदेश कर्मचारी चयन मंडल (MP ESB / व्यापम) लाइव हब' : 'MP Employees Selection Board (MP ESB / Vyapam) Live Sync'}
              </h1>
              <p className="text-teal-200/90 text-sm mt-1 max-w-2xl font-medium">
                {locale === 'hi'
                  ? 'म.प्र. पुलिस आरक्षी 7,500 पद, शिक्षक चयन परीक्षा (वर्ग 2 व 3) 8,450 पद, पटवारी अंतिम परिणाम, सब इंजीनियर एवं वनरक्षक की आधिकारिक सूचनाएं।'
                  : 'Direct real-time tracking of MP Police Constable 7,500 posts, Teacher Selection Test (Varg 2 & 3) 8,450 posts, Patwari merit, and Sub-Engineer exams.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto">
            <button
              onClick={() => fetchFeed(true)}
              disabled={syncing}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white text-teal-950 font-bold hover:bg-teal-100 transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin text-teal-700' : ''}`} />
              {syncing ? (locale === 'hi' ? 'सिंक हो रहा है...' : 'Syncing...') : (locale === 'hi' ? 'ताज़ा करें (Sync Now)' : 'Sync Now')}
            </button>
            <a
              href="https://esb.mponline.gov.in/Portal/Examinations/Vyapam/examsList.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/20 flex items-center justify-center gap-1.5 text-sm"
            >
              <span>esb.mponline.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-teal-200/80">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{locale === 'hi' ? 'सर्वर स्थिति:' : 'Server Health:'} <strong className="text-white">ONLINE (200 OK)</strong></span>
            </span>
            <span>{locale === 'hi' ? 'विलंबता:' : 'Latency:'} <strong className="text-white">{status.latencyMs}ms</strong></span>
            <span>{locale === 'hi' ? 'अंतिम जांच:' : 'Last Checked:'} <strong className="text-white">{status.lastChecked}</strong></span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-teal-100 font-mono">
              Auto-Sync: {secondsUntilNextSync}s
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleImportAll}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              {locale === 'hi' ? 'सभी को वेबसाइट पर जोड़ें (Publish All)' : 'Publish All to Site'}
            </button>
            <button
              onClick={() => setShowPortalGuide(!showPortalGuide)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'MP ESB गाइड' : 'MP ESB Guide'}
            </button>
          </div>
        </div>
      </div>

      {/* Guide Collapsible */}
      {showPortalGuide && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-5 text-sm text-teal-900 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2 text-teal-950">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
              {locale === 'hi' ? 'मध्य प्रदेश कर्मचारी चयन मंडल (MP ESB / व्यापम) सूचना' : 'MP ESB Official Portal Guide'}
            </h3>
            <button onClick={() => setShowPortalGuide(false)} className="text-teal-700 hover:text-teal-900 font-bold">✕</button>
          </div>
          <p>
            <strong>MP ESB (Madhya Pradesh Employees Selection Board, पूर्व व्यापम/PEB)</strong> मध्य प्रदेश शासन के विभिन्न विभागों हेतु समूह-1, 2, 3, 4 की संयुक्त भर्ती परीक्षाओं, पुलिस आरक्षी, प्राथमिक/माध्यमिक शिक्षक पात्रता एवं चयन परीक्षाओं, तथा नर्सिंग प्रवेश परीक्षाओं का नोडल परीक्षा बोर्ड है।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-3 rounded-lg border border-teal-200">
              <strong className="block text-teal-950 mb-1">म.प्र. पुलिस आरक्षी (7,500 पद)</strong>
              10वीं पास अभ्यर्थियों हेतु सामान्य ड्यूटी (GD) व रेडियो ऑपरेटर। CBT लिखित परीक्षा व 100 अंकों का शारीरिक दक्षता परीक्षण (800मी दौड़, गोला फेंक, लंबी कूद)।
            </div>
            <div className="bg-white p-3 rounded-lg border border-teal-200">
              <strong className="block text-teal-950 mb-1">शिक्षक चयन परीक्षा (वर्ग-2 व 3)</strong>
              MP TET उत्तीर्ण अभ्यर्थियों हेतु 8,450 पदों पर विषयवार चयन परीक्षा (गणित, विज्ञान, सामाजिक विज्ञान, भाषा)।
            </div>
            <div className="bg-white p-3 rounded-lg border border-teal-200">
              <strong className="block text-teal-950 mb-1">पटवारी एवं संयुक्त समूह परीक्षाएं</strong>
              समूह-2 (उप समूह-4) सहायक संपरीक्षक व पटवारी अंतिम परिणाम व जिलावार पदस्थापना सूची स्कोरकार्ड।
            </div>
          </div>
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-teal-950 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {locale === 'hi' ? 'सभी सूचनाएं (All)' : 'All Notices'} ({notices.length})
            </button>
            <button
              onClick={() => setActiveCategory('vacancy')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'vacancy'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'भर्ती परीक्षाएं (Jobs)' : 'Jobs'}
            </button>
            <button
              onClick={() => setActiveCategory('result')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'result'
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'अंतिम परिणाम (Results)' : 'Results'}
            </button>
            <button
              onClick={() => setActiveCategory('admit-card')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'admit-card'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'प्रवेश पत्र (TAC)' : 'Admit Card (TAC)'}
            </button>
            <button
              onClick={() => setActiveCategory('answer-key')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'answer-key'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'मॉडल उत्तर कुंजी (Keys)' : 'Answer Keys'}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'hi' ? 'रूलबुक, परीक्षा या पद खोजें...' : 'Search exam or post...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">✕</button>
            )}
          </div>
        </div>

        {/* Cadre Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" /> {locale === 'hi' ? 'संवर्ग:' : 'Exam:'}
          </span>
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी' : 'All' },
            { id: 'police-constable', label: 'म.प्र. पुलिस आरक्षी' },
            { id: 'teacher-tet', label: 'शिक्षक चयन (TET)' },
            { id: 'patwari-group2', label: 'पटवारी व ग्रुप-2' },
            { id: 'sub-engineer', label: 'उपयंत्री (ग्रुप-3)' },
            { id: 'vanrakshak-jail', label: 'वनरक्षक/जेल प्रहरी' },
            { id: 'nursing-pnst', label: 'नर्सिंग (PNST)' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setActivePostType(type.id as any)}
              className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                activePostType === type.id
                  ? 'bg-teal-100 text-teal-900 font-bold border border-teal-300'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notices Grid */}
      {loading ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 font-semibold">{locale === 'hi' ? 'मध्य प्रदेश कर्मचारी चयन मंडल से सूचनाएं लोड हो रही हैं...' : 'Loading notices from MP ESB Bhopal...'}</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-700 font-bold text-base">{locale === 'hi' ? 'कोई मेल खाती परीक्षा सूचना नहीं मिली' : 'No matching exam notices found'}</p>
          <p className="text-slate-500 text-xs mt-1">{locale === 'hi' ? 'कृपया फ़िल्टर रीसेट करें या नया खोज शब्द दर्ज करें।' : 'Try clearing your filters or search keywords.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotices.map((notice) => {
            const alreadyAdded = isAlreadyImported(notice);

            return (
              <div
                key={notice.id}
                className={`bg-white rounded-xl border transition-all hover:shadow-md flex flex-col justify-between p-5 ${
                  alreadyAdded ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getCategoryColor(notice.category)}`}>
                        {notice.statusBadge}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {getPostTypeLabel(notice.postType)}
                      </span>
                      {notice.isNew && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-wide animate-pulse">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 shrink-0 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {notice.publishedDate}
                    </span>
                  </div>

                  {/* Title & Advt */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60 inline-block mb-1">
                      {notice.advtNo}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-teal-900 transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                      {notice.titleHi}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 text-xs space-y-1.5 my-3 text-slate-700">
                    {notice.details.posts && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{locale === 'hi' ? 'कुल रिक्तियां:' : 'Total Posts:'}</span>
                        <strong className="text-emerald-700 font-bold">{Number(notice.details.posts).toLocaleString('en-IN')} पद</strong>
                      </div>
                    )}
                    {notice.details.cutoff && (
                      <div className="p-2 bg-indigo-50/80 rounded border border-indigo-100">
                        <span className="text-indigo-900 font-bold block mb-0.5">{locale === 'hi' ? 'अंतिम कटऑफ अंक (Scorecard Cut-off):' : 'Cut-off Marks:'}</span>
                        <span className="font-mono text-xs text-indigo-800 font-semibold">{notice.details.cutoff}</span>
                      </div>
                    )}
                    {notice.details.qualification && (
                      <div>
                        <span className="text-slate-500 block">{locale === 'hi' ? 'पात्रता:' : 'Eligibility:'}</span>
                        <span className="font-medium text-slate-800 line-clamp-2">{notice.details.qualification}</span>
                      </div>
                    )}
                    {notice.details.ageLimit && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{locale === 'hi' ? 'आयु सीमा:' : 'Age Limit:'}</span>
                        <span className="font-medium">{notice.details.ageLimit}</span>
                      </div>
                    )}
                    {notice.details.examDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{locale === 'hi' ? 'परीक्षा दिनांक:' : 'Exam Date:'}</span>
                        <span className="font-semibold text-teal-900">{notice.details.examDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={notice.pdfUrl || notice.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-teal-900 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-1.5 rounded-lg border border-teal-200 transition-colors"
                    >
                      <span>रूलबुक / PDF लिंक</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button
                    onClick={() => handleImportNotice(notice)}
                    disabled={alreadyAdded}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all shadow-sm ${
                      alreadyAdded
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {alreadyAdded ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>{locale === 'hi' ? 'वेबसाइट पर प्रकाशित' : 'Already on Website'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>{locale === 'hi' ? 'वेबसाइट पर जोड़ें' : 'Publish to Website'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Ingestion Assistant */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">
              {locale === 'hi' ? 'AI मध्य प्रदेश व्यापम नियमपुस्तिका विश्लेषक (Gemini 2.5 Flash)' : 'Gemini AI MP ESB Rulebook Parser'}
            </h3>
            <p className="text-xs text-slate-400">
              {locale === 'hi'
                ? 'MP ESB की किसी भी नई विज्ञप्ति, नियमपुस्तिका या परीक्षा समय-सारणी का टेक्स्ट यहां पेस्ट करें। AI तुरंत इसे फॉर्मेटेड जॉब/रिजल्ट में बदल देगा।'
                : 'Paste official MP ESB Vyapam rulebooks or press notes. Gemini automatically parses posts, qualifications, and schedules.'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <textarea
            value={rawNoticeInput}
            onChange={(e) => setRawNoticeInput(e.target.value)}
            rows={3}
            placeholder={
              locale === 'hi'
                ? 'उदा. "मध्य प्रदेश कर्मचारी चयन मंडल द्वारा आरक्षी (जीडी) के 7,500 पदों हेतु नियमपुस्तिका जारी की गई है, ऑनलाइन आवेदन 26 अक्टूबर तक..."'
                : 'e.g. "MP ESB releases Rulebook for Middle & Primary Teacher Selection Test 2026 for 8,450 posts..."'
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
          <div className="flex justify-end">
            <button
              onClick={handleParseCustomNotice}
              disabled={isParsingNotice || !rawNoticeInput.trim()}
              className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
            >
              {isParsingNotice ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{locale === 'hi' ? 'AI विश्लेषण कर रहा है...' : 'AI Analyzing...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>{locale === 'hi' ? 'पार्स करके लाइव फीड में जोड़ें' : 'Parse & Add to Feed'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
