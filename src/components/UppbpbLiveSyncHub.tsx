import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, CheckCircle, ExternalLink, Zap, ShieldCheck, 
  Bell, Globe, ArrowRight, CheckCircle2, Clock, 
  Briefcase, FileText, Award, CheckSquare, Sparkles, Plus, AlertCircle, Share2, 
  Landmark, GraduationCap, Building2, Stethoscope, Wrench, Users, Calendar, MapPin, Info, HelpCircle, Filter, Search, Siren, Flame
} from 'lucide-react';
import { UppbpbLiveNotice, UppbpbSyncStatus, GovJob, AdmitCard, JobResult, AnswerKey } from '../types';

interface UppbpbLiveSyncHubProps {
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

export default function UppbpbLiveSyncHub({
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
}: UppbpbLiveSyncHubProps) {
  const [notices, setNotices] = useState<UppbpbLiveNotice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [status, setStatus] = useState<UppbpbSyncStatus>({
    online: true,
    portal: 'https://uppbpb.gov.in/',
    status: 'ONLINE',
    lastChecked: new Date().toLocaleTimeString(),
    latencyMs: 28,
    autoSyncIntervalSec: 40,
    totalLiveNotices: 6,
    newNoticesCount: 4
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'vacancy' | 'admit-card' | 'result' | 'answer-key' | 'physical-test'>('all');
  const [activePostType, setActivePostType] = useState<'all' | 'constable' | 'sub-inspector' | 'radio-cadre' | 'computer-operator' | 'jail-warder' | 'clerk-cadre'>('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);
  const [autoSyncInterval, setAutoSyncInterval] = useState<number>(40);
  const [secondsUntilNextSync, setSecondsUntilNextSync] = useState<number>(40);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [rawNoticeInput, setRawNoticeInput] = useState<string>('');
  const [isParsingNotice, setIsParsingNotice] = useState<boolean>(false);
  const [showPortalGuide, setShowPortalGuide] = useState<boolean>(false);
  const [importedNoticeIds, setImportedNoticeIds] = useState<Set<string>>(new Set());

  // Fetch live feed from UPPBPB Lucknow API
  const fetchFeed = async (isManualSync = false) => {
    if (isManualSync) setSyncing(true);
    try {
      const [feedRes, statusRes] = await Promise.all([
        fetch('/api/uppbpb/live-feed'),
        fetch('/api/uppbpb/status')
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
            ? '🟢 उत्तर प्रदेश पुलिस भर्ती बोर्ड (uppbpb.gov.in) से लाइव सूचनाएं सफलतापूर्वक सिंक हो गईं!'
            : '🟢 UPPBPB Lucknow (uppbpb.gov.in) live notices synchronized successfully!'
        );
      }
    } catch (err) {
      console.error('Failed to sync UPPBPB feed:', err);
      if (isManualSync) {
        triggerToast('⚠️ Error connecting to UPPBPB Lucknow live monitor service.');
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
  const handleImportNotice = (notice: UppbpbLiveNotice) => {
    let addedType = '';

    if (notice.category === 'vacancy' && notice.jobData) {
      onAddJob(notice.jobData);
      addedType = locale === 'hi' ? 'नई पुलिस भर्ती (Job Vacancy)' : 'New Police Job';
    } else if ((notice.category === 'admit-card' || notice.category === 'physical-test') && notice.admitCardData) {
      onAddAdmitCard(notice.admitCardData);
      addedType = locale === 'hi' ? 'प्रवेश पत्र / DV-PST पत्र (Admit Card)' : 'Admit Card / Call Letter';
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
      addedType = locale === 'hi' ? 'परीक्षा परिणाम व कटऑफ (Result)' : 'Exam Result';
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
        ? `✅ [UPPBPB] "${notice.title}" आपकी वेबसाइट पर ${addedType} के रूप में जोड़ दिया गया!`
        : `✅ [UPPBPB] "${notice.title}" published to your website as ${addedType}!`
    );
  };

  // Check if notice is already imported or in state
  const isAlreadyImported = (notice: UppbpbLiveNotice): boolean => {
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
          ? `🎉 UPPBPB लखनऊ की कुल ${count} सूचनाएं आपकी मुख्य वेबसाइट पर लाइव प्रकाशित कर दी गईं!`
          : `🎉 ${count} UPPBPB notices published directly to your website!`
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
      const res = await fetch('/api/uppbpb/auto-parse', {
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
              ? '✨ AI ने UPPBPB विज्ञप्ति को सफलता से विश्लेषित कर लाइव स्ट्रीम में जोड़ दिया!'
              : '✨ Gemini AI successfully parsed and added the notice to UPPBPB feed!'
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
      case 'constable': return 'आरक्षी नागरिक पुलिस (Constable)';
      case 'sub-inspector': return 'उपनिरीक्षक नागरिक पुलिस (SI)';
      case 'radio-cadre': return 'रेडियो संवर्ग (Radio Cadre)';
      case 'computer-operator': return 'कंप्यूटर ऑपरेटर (CO / Programmer)';
      case 'jail-warder': return 'जेल वार्डर / फायरमैन';
      case 'clerk-cadre': return 'लिपिक / लेखा संवर्ग (ASI)';
      default: return 'अन्य पुलिस भर्ती (Police Cadre)';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vacancy': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'admit-card': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'result': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'answer-key': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'physical-test': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="uppbpb-live-hub-container" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-blue-700/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Siren className="w-9 h-9 text-blue-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-400/20 text-blue-200 border border-blue-300/30 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> https://uppbpb.gov.in/
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {locale === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती बोर्ड लाइव' : 'UP Police Board Live Sync Active'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
                {locale === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPBPB) लाइव हब' : 'UP Police Recruitment Board (UPPBPB) Live Sync Hub'}
              </h1>
              <p className="text-blue-200/90 text-sm mt-1 max-w-2xl font-medium">
                {locale === 'hi'
                  ? 'यूपी पुलिस 60,244 कांस्टेबल कटऑफ व DV/PST, उपनिरीक्षक (SI) 4,248 पद, रेडियो ऑपरेटर एवं जेल वार्डर की सत्यापित रियल-टाइम सूचनाएं।'
                  : 'Official live monitoring of UP Police Constable 60,244 re-exam results & DV/PST, SI 4,248 posts, Radio cadre, and Computer Operator.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-stretch md:self-auto">
            <button
              onClick={() => fetchFeed(true)}
              disabled={syncing}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white text-blue-950 font-bold hover:bg-blue-100 transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin text-blue-700' : ''}`} />
              {syncing ? (locale === 'hi' ? 'सिंक हो रहा है...' : 'Syncing...') : (locale === 'hi' ? 'ताज़ा करें (Sync Now)' : 'Sync Now')}
            </button>
            <a
              href="https://uppbpb.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/20 flex items-center justify-center gap-1.5 text-sm"
            >
              <span>uppbpb.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-200/80">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{locale === 'hi' ? 'सर्वर स्थिति:' : 'Server Health:'} <strong className="text-white">ONLINE (200 OK)</strong></span>
            </span>
            <span>{locale === 'hi' ? 'विलंबता:' : 'Latency:'} <strong className="text-white">{status.latencyMs}ms</strong></span>
            <span>{locale === 'hi' ? 'अंतिम जांच:' : 'Last Checked:'} <strong className="text-white">{status.lastChecked}</strong></span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-blue-100 font-mono">
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
              {locale === 'hi' ? 'यूपी पुलिस भर्ती गाइड' : 'UP Police Guide'}
            </button>
          </div>
        </div>
      </div>

      {/* Guide Collapsible */}
      {showPortalGuide && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-900 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base flex items-center gap-2 text-blue-950">
              <ShieldCheck className="w-5 h-5 text-blue-700" />
              {locale === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (लखनऊ) दिशानिर्देश' : 'UPPBPB Official Guidelines'}
            </h3>
            <button onClick={() => setShowPortalGuide(false)} className="text-blue-700 hover:text-blue-900 font-bold">✕</button>
          </div>
          <p>
            <strong>UPPBPB (उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड)</strong> उत्तर प्रदेश शासन के अधीन समस्त पुलिस संवर्गों (आरक्षी, उपनिरीक्षक, रेडियो संवर्ग, जेल वार्डर, फायरमैन एवं कंप्यूटर ऑपरेटर) की चयन परीक्षाओं का आयोजन करता है।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <strong className="block text-blue-950 mb-1">आरक्षी नागरिक पुलिस (60,244 पद)</strong>
              लिखित परीक्षा के कटऑफ अंक जारी। चयनित अभ्यर्थियों हेतु पुलिस लाइन्स में अभिलेख संवीक्षा (DV) व शारीरिक मानक परीक्षण (PST) कार्यक्रम।
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <strong className="block text-blue-950 mb-1">उपनिरीक्षक (SI) व प्लाटून कमांडर</strong>
              स्नातक उपाधि धारकों हेतु 4,248 पदों पर 400 अंकों की ऑनलाइन परीक्षा (प्रत्येक विषय में 35% व कुल 50% अनिवार्य)।
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200">
              <strong className="block text-blue-950 mb-1">रेडियो व कंप्यूटर संवर्ग</strong>
              प्रधान परिचालक, सहायक परिचालक एवं कंप्यूटर ऑपरेटर ग्रेड-ए के पदों पर अंतिम उत्तर कुंजी व परीक्षा तिथियां सक्रिय।
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
                  ? 'bg-blue-950 text-white shadow-sm'
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
              {locale === 'hi' ? 'भर्तियां (Jobs)' : 'Jobs'}
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
              {locale === 'hi' ? 'परिणाम व कटऑफ (Result)' : 'Result & Cutoff'}
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
              {locale === 'hi' ? 'प्रवेश पत्र (Admit Card)' : 'Admit Card'}
            </button>
            <button
              onClick={() => setActiveCategory('physical-test')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeCategory === 'physical-test'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              {locale === 'hi' ? 'DV/PST शारीरिक परीक्षण' : 'DV/PST'}
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
              {locale === 'hi' ? 'उत्तर कुंजी (Key)' : 'Answer Key'}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'hi' ? 'विज्ञप्ति संख्या, पद या संवर्ग खोजें...' : 'Search advt or post...'}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">✕</button>
            )}
          </div>
        </div>

        {/* Cadre Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" /> {locale === 'hi' ? 'संवर्ग:' : 'Cadre:'}
          </span>
          {[
            { id: 'all', label: locale === 'hi' ? 'सभी' : 'All' },
            { id: 'constable', label: 'आरक्षी (कांस्टेबल)' },
            { id: 'sub-inspector', label: 'उपनिरीक्षक (SI)' },
            { id: 'radio-cadre', label: 'रेडियो संवर्ग' },
            { id: 'computer-operator', label: 'कंप्यूटर ऑपरेटर' },
            { id: 'jail-warder', label: 'जेल वार्डर/फायरमैन' },
            { id: 'clerk-cadre', label: 'लिपिक (ASI)' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setActivePostType(type.id as any)}
              className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                activePostType === type.id
                  ? 'bg-blue-100 text-blue-900 font-bold border border-blue-300'
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
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 font-semibold">{locale === 'hi' ? 'उत्तर प्रदेश पुलिस भर्ती बोर्ड से सूचनाएं लोड हो रही हैं...' : 'Loading notices from UPPBPB Lucknow...'}</p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-700 font-bold text-base">{locale === 'hi' ? 'कोई मेल खाती सूचना नहीं मिली' : 'No matching notices found'}</p>
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
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 inline-block mb-1">
                      {notice.advtNo}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-blue-900 transition-colors">
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
                        <span className="text-slate-500">{locale === 'hi' ? 'कुल पद:' : 'Total Posts:'}</span>
                        <strong className="text-emerald-700 font-bold">{Number(notice.details.posts).toLocaleString('en-IN')} पद</strong>
                      </div>
                    )}
                    {notice.details.cutoff && (
                      <div className="p-2 bg-indigo-50/80 rounded border border-indigo-100">
                        <span className="text-indigo-900 font-bold block mb-0.5">{locale === 'hi' ? 'कटऑफ अंक (Normalised Marks):' : 'Cut-off Marks:'}</span>
                        <span className="font-mono text-xs text-indigo-800 font-semibold">{notice.details.cutoff}</span>
                      </div>
                    )}
                    {notice.details.qualification && (
                      <div>
                        <span className="text-slate-500 block">{locale === 'hi' ? 'शैक्षणिक योग्यता:' : 'Eligibility:'}</span>
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
                        <span className="text-slate-500">{locale === 'hi' ? 'परीक्षा / संवीक्षा तिथि:' : 'Exam / DV Date:'}</span>
                        <span className="font-semibold text-blue-900">{notice.details.examDate}</span>
                      </div>
                    )}
                    {notice.details.petPstDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">{locale === 'hi' ? 'DV/PST तिथि:' : 'DV/PST Date:'}</span>
                        <span className="font-semibold text-blue-800">{notice.details.petPstDate}</span>
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
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg border border-blue-200 transition-colors"
                    >
                      <span>आधिकारिक विज्ञप्ति / PDF</span>
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
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">
              {locale === 'hi' ? 'AI यूपी पुलिस विज्ञप्ति विश्लेषक (Gemini 2.5 Flash)' : 'Gemini AI UPPBPB Notice Auto-Parser'}
            </h3>
            <p className="text-xs text-slate-400">
              {locale === 'hi'
                ? 'UPPBPB की किसी भी नई विज्ञप्ति, कटऑफ सूचना या परीक्षा तिथियों का विवरण यहां पेस्ट करें। AI तुरंत इसे व्यवस्थित रिकॉर्ड में बदल देगा।'
                : 'Paste official UP Police recruitment press releases. Gemini automatically structures posts, eligibility, cut-off marks, and exam schedules.'}
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
                ? 'उदा. "उत्तर प्रदेश पुलिस भर्ती बोर्ड द्वारा उपनिरीक्षक (नागरिक पुलिस) के 4,248 पदों पर सीधी भर्ती हेतु विज्ञप्ति जारी की गई..."'
                : 'e.g. "UP Police Recruitment Board announces DV/PST call letter download for 60,244 Constable candidates..."'
            }
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <div className="flex justify-end">
            <button
              onClick={handleParseCustomNotice}
              disabled={isParsingNotice || !rawNoticeInput.trim()}
              className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
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
