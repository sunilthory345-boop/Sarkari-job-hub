import React, { useState } from 'react';
import { 
  Briefcase, Calendar, MapPin, IndianRupee,
  Search, ShieldAlert, ArrowUpRight, FileText,
  Filter, Bookmark, BookmarkCheck, Share2, Info, Clock, AlertCircle, GraduationCap, Sparkles
} from 'lucide-react';
import { GovJob, UserProfile } from '../types';
import { SarkariPdfModal } from './SarkariPdfModal';
import SarkariAds from './SarkariAds';
import { getJobDates, formatJobDate, getDaysRemaining as calcDaysRemaining } from '../utils/jobDateUtils';

interface JobCardProps {
  jobs: GovJob[];
  user: UserProfile;
  toggleSaveJob: (jobId: string) => void;
  qualificationFilter?: string;
  setQualificationFilter?: (q: string) => void;
  selectedCategory?: string;
  setSelectedCategory?: (c: string) => void;
  pyqsList?: { title: string; type: string; size: string; year: number; exam: string; premium: boolean; downloadUrl?: string }[];
  onOpenPdf?: (job: GovJob) => void;
  triggerToast?: (msg: string) => void;
  onGoPremium?: () => void;
  locale?: string;
  vacancySectionFilter?: 'all' | 'latest' | 'last-date';
  setVacancySectionFilter?: (filter: 'all' | 'latest' | 'last-date') => void;
}

const getCategoryStyles = (cat: string) => {
  switch (cat) {
    case 'SSC':
      return { border: 'border-l-4 border-l-blue-600', text: 'text-blue-600 bg-blue-50 border border-blue-100', btn: 'bg-blue-600 hover:bg-blue-700 text-white' };
    case 'Railway':
      return { border: 'border-l-4 border-l-green-600', text: 'text-green-600 bg-green-50 border border-green-100', btn: 'bg-green-600 hover:bg-green-700 text-white' };
    case 'UPSC':
      return { border: 'border-l-4 border-l-purple-600', text: 'text-purple-600 bg-purple-50 border border-purple-100', btn: 'bg-purple-600 hover:bg-purple-700 text-white' };
    case 'Defence':
      return { border: 'border-l-4 border-l-orange-600', text: 'text-orange-600 bg-orange-50 border border-orange-100', btn: 'bg-orange-600 hover:bg-orange-700 text-white' };
    case 'Bank':
      return { border: 'border-l-4 border-l-indigo-600', text: 'text-indigo-600 bg-indigo-50 border border-indigo-100', btn: 'bg-indigo-600 hover:bg-indigo-700 text-white' };
    case 'Police':
      return { border: 'border-l-4 border-l-red-600', text: 'text-red-600 bg-red-50 border border-red-100', btn: 'bg-red-600 hover:bg-red-700 text-white' };
    case 'State PSC':
      return { border: 'border-l-4 border-l-amber-600', text: 'text-amber-600 bg-amber-50 border border-amber-100', btn: 'bg-amber-600 hover:bg-amber-700 text-white' };
    default:
      return { border: 'border-l-4 border-l-slate-600', text: 'text-slate-600 bg-slate-50 border border-slate-100', btn: 'bg-slate-600 hover:bg-slate-700 text-white' };
  }
};

const getFormStatusInfo = (status?: 'started' | 'extended' | 'upcoming') => {
  if (!status) return null;
  switch (status) {
    case 'started':
      return {
        text: '🔥 आज इस पोस्ट के फार्म स्टार्ट हुए है / Online Form Started Today!',
        classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badge: 'bg-emerald-500 text-white',
        icon: '🔥'
      };
    case 'extended':
      return {
        text: '⏳ आज इस पोस्ट की फार्म डेट को आगे बढ़ाया गया है / Form Date Extended Today!',
        classes: 'bg-amber-50 text-amber-800 border-amber-200',
        badge: 'bg-amber-500 text-white',
        icon: '⏳'
      };
    case 'upcoming':
      return {
        text: '📅 इस पोस्ट की फार्म की डेट जल्द ही आने वाले समय में निर्धारित होगी / Dates Announced Soon!',
        classes: 'bg-blue-50 text-blue-800 border-blue-200',
        badge: 'bg-blue-500 text-white',
        icon: '📅'
      };
    default:
      return null;
  }
};

export default function JobCard({ 
  jobs, 
  user, 
  toggleSaveJob,
  qualificationFilter = 'All',
  setQualificationFilter,
  selectedCategory: propCategory,
  setSelectedCategory: propSetCategory,
  pyqsList,
  onOpenPdf,
  triggerToast,
  onGoPremium,
  locale = 'en',
  vacancySectionFilter,
  setVacancySectionFilter
}: JobCardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [localCategory, setLocalCategory] = useState('All');
  const selectedCategory = propCategory !== undefined ? propCategory : localCategory;
  const setSelectedCategory = propSetCategory !== undefined ? propSetCategory : setLocalCategory;
  const [selectedJob, setSelectedJob] = useState<GovJob | null>(null);
  const [pdfViewerJob, setPdfViewerJob] = useState<GovJob | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [localSectionFilter, setLocalSectionFilter] = useState<'all' | 'latest' | 'last-date'>('all');
  const sectionFilter = vacancySectionFilter !== undefined ? vacancySectionFilter : localSectionFilter;
  const setSectionFilter = setVacancySectionFilter !== undefined ? setVacancySectionFilter : setLocalSectionFilter;

  const handleOpenPdf = (job: GovJob) => {
    if (onOpenPdf) {
      onOpenPdf(job);
    } else {
      setPdfViewerJob(job);
    }
  };

  const getRelevantPyqsForJob = (job: GovJob) => {
    let list = pyqsList;
    if (!list) {
      try {
        const saved = localStorage.getItem('sarkari_pyqs');
        if (saved) {
          list = JSON.parse(saved);
        }
      } catch (e) {
        // ignore
      }
    }
    if (!list || list.length === 0) return [];

    return list.filter(pyq => {
      const jobCat = job.category.toLowerCase().trim();
      const pyqExam = pyq.exam.toLowerCase().trim();

      if (jobCat === pyqExam) return true;

      if (jobCat === 'police' && pyqExam === 'ssc' && pyq.title.toLowerCase().includes('constable')) return true;
      if (jobCat === 'others' && pyqExam === 'others') return true;

      const org = job.org.toLowerCase();
      const pyqTitle = pyq.title.toLowerCase();
      const pyqExamLower = pyq.exam.toLowerCase();

      if (org.includes('rrb') && (pyqTitle.includes('railway') || pyqTitle.includes('rrb') || pyqExamLower.includes('railway'))) return true;
      if (org.includes('ssc') && (pyqTitle.includes('ssc') || pyqExamLower.includes('ssc'))) return true;
      if (org.includes('upsc') && (pyqTitle.includes('upsc') || pyqExamLower.includes('upsc') || pyqTitle.includes('ias') || pyqTitle.includes('cds') || pyqTitle.includes('nda'))) return true;
      if (org.includes('nhm') && (pyqTitle.includes('nhm') || pyqExamLower.includes('health') || pyqTitle.includes('vaccin') || pyqTitle.includes('anm'))) return true;
      if (org.includes('rpsc') && (pyqTitle.includes('rpsc') || pyqTitle.includes('rajasthan'))) return true;
      if (org.includes('upsssc') && pyqTitle.includes('upsssc')) return true;
      if (org.includes('sbi') && (pyqTitle.includes('sbi') || pyqTitle.includes('bank') || pyqExamLower.includes('bank'))) return true;
      if (org.includes('ibps') && (pyqTitle.includes('ibps') || pyqTitle.includes('bank') || pyqExamLower.includes('bank'))) return true;

      const jobTitle = job.title.toLowerCase();
      if (jobTitle.includes('constable') && pyqTitle.includes('constable')) return true;
      if (jobTitle.includes('sub-inspector') && (pyqTitle.includes('sub-inspector') || pyqTitle.includes('cpo') || pyqTitle.includes('constable'))) return true;
      if (jobTitle.includes('assistant') && pyqTitle.includes('assistant')) return true;
      if (jobTitle.includes('lineman') && pyqTitle.includes('lineman')) return true;
      if (jobTitle.includes('vaccinat') && (pyqTitle.includes('vaccinat') || pyqTitle.includes('immuniz') || pyqTitle.includes('health'))) return true;
      if (jobTitle.includes('clerk') && pyqTitle.includes('clerk')) return true;
      if (jobTitle.includes('technician') && pyqTitle.includes('technician')) return true;

      return false;
    });
  };

  const categories = ['All', 'SSC', 'Bank', 'Railway', 'UPSC', 'Rajasthan', 'Defence', 'State PSC', 'Police', 'Teaching', 'Others'];
  const qualifications = [
    'All', '8th Pass', '10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduate', 'B.Tech', 'B.Sc', 'MBA', 'M.Tech', 'Post Graduate'
  ];

  // Filtering logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.org.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Customized category matcher for special targets requested
    let matchesCategory = false;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === 'Today') {
      matchesCategory = job.postedDate === '2026-06-28' || job.postedDate === '2026-06-27';
    } else if (selectedCategory === 'WhatsAppAlerts') {
      matchesCategory = !!job.isWhatsAppAlert;
    } else if (selectedCategory === 'Rajasthan') {
      matchesCategory = job.location.toLowerCase().includes('rajasthan') || 
                        job.org.toLowerCase().includes('rpsc') || 
                        job.org.toLowerCase().includes('rsmssb');
    } else if (selectedCategory === 'Defence') {
      matchesCategory = job.category === 'Defence' || 
                        job.title.toLowerCase().includes('army') || 
                        job.org.toLowerCase().includes('army') ||
                        job.org.toLowerCase().includes('drdo');
    } else {
      matchesCategory = job.category === selectedCategory;
    }
    
    // Check qualification or local prop qualification
    const activeQualification = qualificationFilter || 'All';
    const matchesQualification = activeQualification === 'All' || job.qualification === activeQualification;

    return matchesSearch && matchesCategory && matchesQualification;
  });

  const getDaysRemaining = (lastDateStr: string) => {
    return calcDaysRemaining(lastDateStr);
  };

  // Process and sort jobs based on sectionFilter
  const displayedJobs = [...filteredJobs].sort((a, b) => {
    const datesA = getJobDates(a);
    const datesB = getJobDates(b);

    if (sectionFilter === 'latest') {
      return datesB.startingDate.localeCompare(datesA.startingDate);
    } else if (sectionFilter === 'last-date') {
      const daysA = calcDaysRemaining(datesA.lastDate);
      const daysB = calcDaysRemaining(datesB.lastDate);
      if (daysA >= 0 && daysB >= 0) return daysA - daysB;
      if (daysA >= 0) return -1;
      if (daysB >= 0) return 1;
      return datesA.lastDate.localeCompare(datesB.lastDate);
    }
    return 0;
  });

  const handleCopyShare = (job: GovJob) => {
    const shareText = `🔥 ${job.title} - ${job.org} \n🎯 Total Vacancies: ${job.totalPosts} posts\n🎓 Qualification: ${job.qualification}\n⏱️ Last Date: ${job.lastDate}\n👉 Apply online here!`;
    navigator.clipboard.writeText(shareText);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-4">

      {/* DEDICATED SECTION TABS: ALL VACANCIES vs LATEST VACANCY vs LAST DATE VACANCY */}
      <div className="bg-white border border-slate-200 rounded-2xl p-2.5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setSectionFilter('all')}
            className={`flex items-center gap-3 p-3 rounded-xl transition cursor-pointer text-left ${
              sectionFilter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-500'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            <div className={`p-2 rounded-lg shrink-0 ${sectionFilter === 'all' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'}`}>
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wide">
                {locale === 'hi' ? 'सभी सरकारी भर्तियां' : 'All Vacancies'}
              </div>
              <div className={`text-[10px] font-semibold mt-0.5 ${sectionFilter === 'all' ? 'text-blue-100' : 'text-slate-500'}`}>
                {jobs.length} {locale === 'hi' ? 'सक्रिय पद उपलब्ध' : 'Active Vacancies'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSectionFilter('latest')}
            className={`flex items-center gap-3 p-3 rounded-xl transition cursor-pointer text-left ${
              sectionFilter === 'latest'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-400'
                : 'bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100/70 border border-emerald-200'
            }`}
          >
            <div className={`p-2 rounded-lg shrink-0 ${sectionFilter === 'latest' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
                <span>{locale === 'hi' ? '🆕 नवीनतम भर्तियां' : '🆕 Latest Vacancy'}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-400/30 text-emerald-100 font-bold">New</span>
              </div>
              <div className={`text-[10px] font-semibold mt-0.5 ${sectionFilter === 'latest' ? 'text-emerald-100' : 'text-emerald-700'}`}>
                {locale === 'hi' ? 'हाल ही में जारी विज्ञापन (New Releases)' : 'Newly Announced Notifications'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSectionFilter('last-date')}
            className={`flex items-center gap-3 p-3 rounded-xl transition cursor-pointer text-left ${
              sectionFilter === 'last-date'
                ? 'bg-gradient-to-r from-rose-600 to-red-700 text-white shadow-md shadow-rose-600/25 ring-2 ring-rose-400'
                : 'bg-rose-50/70 text-rose-900 hover:bg-rose-100/70 border border-rose-200'
            }`}
          >
            <div className={`p-2 rounded-lg shrink-0 ${sectionFilter === 'last-date' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'}`}>
              <Clock className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wide flex items-center gap-1.5">
                <span>{locale === 'hi' ? '⏳ अंतिम तिथि नजदीक' : '⏳ Last Date Vacancy'}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-400/30 text-rose-100 font-bold">Urgent</span>
              </div>
              <div className={`text-[10px] font-semibold mt-0.5 ${sectionFilter === 'last-date' ? 'text-rose-100' : 'text-rose-700'}`}>
                {locale === 'hi' ? 'जल्द समाप्त होने वाले आवेदन (Ending Soon)' : 'Closing Soon — Apply Before Deadline'}
              </div>
            </div>
          </button>
        </div>

        {/* Section info contextual banner */}
        {sectionFilter === 'latest' && (
          <div className="mt-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <span className="text-base">📢</span>
              <div>
                <span className="font-extrabold">{locale === 'hi' ? 'नवीनतम सरकारी भर्ती अनुभाग (Latest Vacancies Section):' : 'Latest Vacancies Section:'}</span>{' '}
                <span className="font-medium text-emerald-800">
                  {locale === 'hi' ? 'हाल ही में जारी भर्ती विज्ञापन व आवेदन शुरू तिथि (Starting Date) और अंतिम तिथि (Last Date) नीचे देखें।' : 'Recently released vacancies with application starting date and last date displayed below.'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSectionFilter('all')}
              className="text-[11px] font-bold text-emerald-700 hover:underline shrink-0 ml-2"
            >
              {locale === 'hi' ? 'सभी देखें' : 'View All'}
            </button>
          </div>
        )}

        {sectionFilter === 'last-date' && (
          <div className="mt-2.5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between text-xs text-rose-900">
            <div className="flex items-center gap-2">
              <span className="text-base animate-bounce">⚠️</span>
              <div>
                <span className="font-extrabold">{locale === 'hi' ? 'अंतिम तिथि नजदीक अनुभाग (Last Date Vacancies Section):' : 'Last Date Vacancies Section:'}</span>{' '}
                <span className="font-medium text-rose-800">
                  {locale === 'hi' ? 'जिन भर्तियों की अंतिम तिथि जल्द समाप्त हो रही है! अंतिम तिथि से पहले तुरंत आवेदन पूरा करें।' : 'Vacancies with deadlines ending soon! Submit your application before the registration closes.'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSectionFilter('all')}
              className="text-[11px] font-bold text-rose-700 hover:underline shrink-0 ml-2"
            >
              {locale === 'hi' ? 'सभी देखें' : 'View All'}
            </button>
          </div>
        )}
      </div>
      
      {/* Target Exam Quick Filter Board Roster */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest text-slate-600 flex items-center gap-1">
          <span>🎯</span> SELECT TARGET PREPARATION DEPARTMENT / EXAMS (लक्ष्य परीक्षा का चयन करें)
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'All', label: 'All Exams (सभी)', emoji: '🌐', color: 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800' },
            { id: 'Today', label: "Today's Updates (आज के अपडेट)", emoji: '🔥', color: 'border-rose-200 bg-rose-50/20 hover:bg-rose-50 text-rose-900 animate-pulse' },
            { id: 'WhatsAppAlerts', label: 'WhatsApp Job Alerts', emoji: '🟢', color: 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50 text-emerald-900' },
            { id: 'SSC', label: 'SSC Exams Office', emoji: '🏢', color: 'border-blue-200 bg-blue-50/20 hover:bg-blue-50 text-blue-900' },
            { id: 'Bank', label: 'Banking (SBI, IBPS)', emoji: '🏦', color: 'border-indigo-200 bg-indigo-50/20 hover:bg-indigo-50 text-indigo-900' },
            { id: 'Railway', label: 'Railway RRB NTPC/ALP', emoji: '🚉', color: 'border-green-200 bg-green-50/20 hover:bg-green-50 text-green-900' },
            { id: 'UPSC', label: 'UPSC CSE (IAS)', emoji: '🏛️', color: 'border-purple-200 bg-purple-50/20 hover:bg-purple-50 text-purple-900' },
            { id: 'Rajasthan', label: 'Rajasthan Govt RPSC/RSMSSB', emoji: '🏜️', color: 'border-rose-200 bg-rose-50/20 hover:bg-rose-50 text-rose-900' },
            { id: 'Defence', label: 'Army & Defence Special', emoji: '🪖', color: 'border-orange-200 bg-orange-50/20 hover:bg-orange-50 text-orange-900' },
            { id: 'State PSC', label: 'Other State Vacancies', emoji: '🌾', color: 'border-amber-200 bg-amber-50/20 hover:bg-amber-50 text-amber-900' }
          ].map((item) => {
            const isSelected = selectedCategory === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelectedCategory(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition duration-150 cursor-pointer shadow-xs ${
                  isSelected 
                    ? 'ring-2 ring-blue-600 bg-blue-600 text-white border-blue-600' 
                    : item.color
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Filters Header Pane */}
      <div id="search-filter-controls" className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs">
        <div className="grid gap-3 md:grid-cols-12">
          
          {/* Keyword Search Input */}
          <div className="relative md:col-span-6">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input 
              id="job-keyword-search"
              type="text"
              placeholder="Search by post, department, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pr-4 pl-9 font-sans text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                id="job-category-dropdown"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 px-3 font-sans text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden transition"
              >
                {categories.map((cat) => {
                  let label = cat + " Section";
                  if (cat === 'All') label = 'All Exam Sectors';
                  if (cat === 'Bank') label = 'Banking (SBI, IBPS) 🏦';
                  if (cat === 'Defence') label = 'Army & Defence Special 🪖';
                  if (cat === 'Rajasthan') label = 'Rajasthan Govt Jobs 🏜️';
                  if (cat === 'State PSC') label = 'All India States (UP, Bihar, etc.) 🌾';
                  if (cat === 'Railway') label = 'Railway Exams (RRB NTPC, ALP) 🚉';
                  if (cat === 'SSC') label = 'SSC Exam Updates (CGL, CHSL) 🏢';
                  return (
                    <option key={cat} value={cat}>{label}</option>
                  );
                })}
              </select>
              <Filter className="absolute top-2.5 right-3 h-3.5 w-3.5 pointer-events-none text-slate-500" />
            </div>
          </div>

          {/* Qualification Filter Subcomponent */}
          <div className="md:col-span-3">
            <div className="relative">
              <select
                id="job-qualification-dropdown"
                value={qualificationFilter}
                onChange={(e) => setQualificationFilter && setQualificationFilter(e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 py-1.5 px-3 font-sans text-xs text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-hidden transition"
              >
                {qualifications.map((qual) => (
                  <option key={qual} value={qual}>{qual}</option>
                ))}
              </select>
              <GraduationCap className="absolute top-2.5 right-3 h-3.5 w-3.5 pointer-events-none text-slate-500" />
            </div>
          </div>

        </div>

        {/* Quick Horizontal Scroll Category Pills */}
        <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-slate-105 items-center">
          <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Hot:</span>
          {['Graduate', '12th Pass', '10th Pass', 'B.Tech', 'Diploma'].map((q) => (
            <button
              key={q}
              onClick={() => setQualificationFilter && setQualificationFilter(q)}
              className={`rounded px-2 py-0.5 text-[10px] font-semibold transition ${
                qualificationFilter === q 
                  ? 'bg-[#1E3A8A] text-white shadow-xs' 
                  : 'bg-blue-50 text-[#1E3A8A] hover:bg-blue-100'
              }`}
            >
              {q}
            </button>
          ))}
          
          {/* Dedicate State (Rajasthan) Vacancy Filter Pill */}
          <button
            onClick={() => {
              if (searchTerm.toLowerCase() === 'rajasthan') {
                setSearchTerm('');
              } else {
                setSearchTerm('Rajasthan');
              }
            }}
            className={`rounded px-2 py-0.5 text-[10px] font-extrabold transition-all flex items-center gap-1 border cursor-pointer ${
              searchTerm.toLowerCase() === 'rajasthan'
                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                : 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100'
            }`}
          >
            🍁 Rajasthan Vacancy
          </button>

          {(qualificationFilter !== 'All' || searchTerm !== '') && (
            <button
              onClick={() => {
                if (setQualificationFilter) setQualificationFilter('All');
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-[10px] font-bold text-rose-500 hover:underline px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Jobs Catalog Listing Grid */}
      <div id="jobs-cards-grid" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {displayedJobs.length > 0 ? (
          displayedJobs.map((job, idx) => {
            const isSaved = user.savedJobs.includes(job.id);
            const { startingDate, lastDate } = getJobDates(job);
            const daysRemaining = calcDaysRemaining(lastDate);
            const isExpired = daysRemaining < 0;
            const cStyles = getCategoryStyles(job.category);

            return (
              <React.Fragment key={job.id}>
                {/* In-feed native sponsored ad slot after 2nd and 6th card */}
                {(idx === 2 || idx === 6) && !user.premiumUser && (
                  <SarkariAds 
                    user={user} 
                    onGoPremium={onGoPremium || (() => {})} 
                    triggerToast={triggerToast || (() => {})} 
                    layout="infeed" 
                  />
                )}

                <div 
                  id={`job-idx-${job.id}`}
                  className={`group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs transition-all duration-200 hover:shadow-md ${cStyles.border} ${
                    sectionFilter === 'last-date' || (daysRemaining <= 7 && daysRemaining >= 0) ? 'ring-1 ring-rose-200 hover:ring-rose-300' : ''
                  }`}
                >
                  {/* Save bookmark and Commission banner */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${cStyles.text}`}>
                      {job.category} Exam
                    </span>
                    {(sectionFilter === 'last-date' || (daysRemaining <= 5 && daysRemaining >= 0)) && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-rose-600 text-white px-1.5 py-0.5 text-[8.5px] font-extrabold animate-pulse shadow-xs">
                        <Clock className="h-2.5 w-2.5" />
                        {daysRemaining <= 1 ? (locale === 'hi' ? 'आज अंतिम दिन' : 'Ends Today') : `${daysRemaining}d left`}
                      </span>
                    )}
                    {(sectionFilter === 'latest' || job.postedDate === '2026-09-22' || job.postedDate === '2026-09-21' || job.postedDate === '2026-09-20') && (
                      <span className="inline-flex items-center gap-0.5 rounded bg-emerald-600 text-white px-1.5 py-0.5 text-[8.5px] font-extrabold shadow-xs">
                        <span className="h-1 w-1 rounded-full bg-white animate-ping"></span>
                        {locale === 'hi' ? 'नया विज्ञापन' : 'NEW'}
                      </span>
                    )}
                    {job.isWhatsAppAlert && (
                      <a 
                        href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-1.5 py-0.5 text-[8.5px] font-extrabold hover:bg-emerald-500/20 transition-colors cursor-pointer"
                        title="Official channel live vacancy alert!"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="relative flex h-1.5 w-1.5 shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        WA ALERT
                      </a>
                    )}
                  </div>
                  <button 
                    onClick={() => toggleSaveJob(job.id)}
                    className="rounded-full p-1 text-slate-400 hover:bg-slate-50 hover:text-blue-600 transition"
                    title={isSaved ? "Saved to Profile" : "Save Job Detail"}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="h-4.5 w-4.5 text-blue-600 fill-blue-600" />
                    ) : (
                      <Bookmark className="h-4.5 w-4.5" />
                    )}
                  </button>
                </div>

                {/* Job Info Body */}
                <div className="mt-2.5 flex-1">
                  {job.formStatus && (() => {
                    const statusInfo = getFormStatusInfo(job.formStatus);
                    if (statusInfo) {
                      return (
                        <div className={`mb-2 rounded-lg border p-2 text-[10px] font-bold leading-tight ${statusInfo.classes}`}>
                          {statusInfo.text}
                        </div>
                      );
                    }
                    return null;
                  })()}
                  <h3 className="font-sans text-xs font-extrabold text-[#1E293B] line-clamp-2 leading-snug group-hover:text-blue-700 cursor-pointer" onClick={() => setSelectedJob(job)}>
                    {job.title}
                  </h3>
                  <p className="font-sans text-[10px] text-slate-500 font-semibold mt-0.5">
                    {job.org}
                  </p>

                  {/* Highlights Grid */}
                  <div className="mt-2.5 grid grid-cols-2 gap-y-1.5 gap-x-1 border-t border-slate-100 pt-2 text-[10px] font-semibold text-slate-600">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                      <span>{(job?.totalPosts ? Number(job.totalPosts).toLocaleString() : 'Multiple')} Posts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{job.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">Active Salary Scale</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate">{job.location}</span>
                    </div>
                  </div>

                  {(() => {
                    const rPyqs = getRelevantPyqsForJob(job);
                    if (rPyqs.length > 0) {
                      return (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[9.5px] text-blue-700 font-extrabold bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-lg leading-tight">
                          <FileText className="h-3 w-3 text-blue-650 shrink-0" />
                          <span>{rPyqs.length} Solved PYQs Available</span>
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* DEDICATED STARTING DATE & LAST DATE BOX */}
                  <div className="mt-3 rounded-xl border border-slate-200/90 bg-slate-50/80 p-2 text-[10px]">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Starting Date */}
                      <div className="border-r border-slate-200 pr-1 space-y-0.5">
                        <div className="flex items-center gap-1 text-emerald-700 font-bold uppercase tracking-wider text-[8.5px]">
                          <Calendar className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span>{locale === 'hi' ? 'आवेदन शुरू' : 'Starting Date'}</span>
                        </div>
                        <div className="font-extrabold text-slate-900 text-[10.5px] font-mono leading-tight">
                          {formatJobDate(startingDate, locale === 'hi')}
                        </div>
                      </div>

                      {/* Last Date */}
                      <div className="pl-1 space-y-0.5">
                        <div className="flex items-center gap-1 text-rose-700 font-bold uppercase tracking-wider text-[8.5px]">
                          <Clock className="h-3 w-3 text-rose-600 shrink-0" />
                          <span>{locale === 'hi' ? 'अंतिम तिथि' : 'Last Date'}</span>
                        </div>
                        <div className="font-extrabold text-rose-750 text-[10.5px] font-mono leading-tight flex items-center justify-between">
                          <span>{formatJobDate(lastDate, locale === 'hi')}</span>
                          <span className={`text-[8px] px-1 py-0.2 rounded font-bold ${
                            daysRemaining <= 7 && daysRemaining >= 0
                              ? 'bg-rose-100 text-rose-850 animate-pulse border border-rose-200'
                              : isExpired
                              ? 'bg-slate-200 text-slate-650'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isExpired ? (locale === 'hi' ? 'समाप्त' : 'Closed') : `${daysRemaining}d`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action buttons & countdown */}
                <div className="mt-3.5 border-t border-slate-100 pt-2.5 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none">Last Date</span>
                    <span className={`text-[10px] font-bold mt-0.5 leading-none ${
                      isExpired ? 'text-rose-500' : daysRemaining <= 10 ? 'text-orange-600' : 'text-slate-700'
                    }`}>
                      {isExpired ? 'Expired' : `${daysRemaining} days left`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPdf(job);
                      }}
                      className="flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-extrabold bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 transition cursor-pointer shadow-xs"
                      title="View & Download Official PDF Notification / आधिकारिक अधिसूचना पीडीएफ"
                    >
                      <FileText className="h-3 w-3 text-red-600" />
                      <span>PDF</span>
                    </button>
                    <button
                      onClick={() => handleCopyShare(job)}
                      className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-650 transition cursor-pointer"
                      title="Share Job Notification"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className={`flex items-center gap-1 rounded px-2.5 py-1 text-[10px] font-bold transition cursor-pointer ${cStyles.btn}`}
                    >
                      Details & Apply
                    </button>
                  </div>
                </div>

                {copiedId === job.id && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 text-white font-sans text-xs font-semibold py-1.5 px-3 rounded-md shadow-lg z-10">
                    Copied WhatsApp Share Link!
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })
        ) : (
          <div className="col-span-full py-16 text-center">
            <ShieldAlert className="mx-auto h-12 w-12 text-slate-300" />
            <h4 className="font-sans text-lg font-bold text-slate-700 mt-3">No matching notifications</h4>
            <p className="font-sans text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              We couldn't find governmental alerts matching "{searchTerm}" for "{qualificationFilter === 'All' ? 'All Qualifications' : qualificationFilter}".
            </p>
          </div>
        )}
      </div>

      {/* Expanded Job Detail Modal */}
      {selectedJob && (
        <div id="job-detail-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs overflow-y-auto">
          <div 
            id="job-detail-modal"
            className="relative w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-blue-900/5 my-8"
          >
            {/* Header banner */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800 uppercase">
                  {selectedJob.category} Government Job
                </span>
                <h2 className="font-sans text-xl font-extrabold text-slate-900 mt-2">
                  {selectedJob.title}
                </h2>
                <p className="font-sans text-sm font-semibold text-slate-500">
                  {selectedJob.org}
                </p>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="rounded-full bg-slate-100 p-2 text-slate-400 hover:bg-slate-200 transition"
              >
                CLOSE
              </button>
            </div>

            {/* Scrollable details */}
            <div className="mt-5 space-y-5 max-h-[60vh] overflow-y-auto pr-1">
              
              {selectedJob.formStatus && (() => {
                const statusInfo = getFormStatusInfo(selectedJob.formStatus);
                if (statusInfo) {
                  return (
                    <div className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-3 ${statusInfo.classes}`}>
                      <span className="text-2xl shrink-0">{statusInfo.icon}</span>
                      <div>
                        <p className="font-extrabold text-[#1E293B]">{statusInfo.text}</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-0.5 leading-normal">
                          This status is live and verified by Jobs Sarkari Hub. Check below for application dates and direct links.
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

              {/* Short summary banner */}
              <div className="rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50/50 p-4 border border-blue-100/50 grid gap-3 sm:grid-cols-3 text-center">
                <div className="border-r border-blue-100 last:border-0 pr-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Vacancies</span>
                  <span className="text-base font-extrabold text-blue-900">{(selectedJob?.totalPosts ? Number(selectedJob.totalPosts).toLocaleString() : 'Multiple')} Posts</span>
                </div>
                <div className="border-r border-blue-100 last:border-0 px-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Eligibility</span>
                  <span className="text-base font-extrabold text-blue-900">{selectedJob.qualification}</span>
                </div>
                <div className="px-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Salary Range</span>
                  <span className="text-xs font-bold text-blue-900 line-clamp-1">{selectedJob.salary}</span>
                </div>
              </div>

              {/* Recruitment Dates calendar block */}
              <div>
                <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Official Important Timelines
                </h4>
                <div className="grid gap-3 sm:grid-cols-4 bg-slate-50 p-4 rounded-2xl text-xs border border-slate-200">
                  <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200">
                    <span className="block text-[10px] font-bold text-emerald-800 uppercase mb-0.5 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-emerald-600" />
                      {locale === 'hi' ? 'आवेदन शुरू तिथि (Starting)' : 'Starting Date'}
                    </span>
                    <span className="font-extrabold text-emerald-950 text-sm font-mono block">
                      {formatJobDate(selectedJob.importantDates?.applyStart || selectedJob.postedDate, locale === 'hi')}
                    </span>
                  </div>
                  <div className="bg-rose-50/60 p-2.5 rounded-xl border border-rose-200">
                    <span className="block text-[10px] font-bold text-rose-800 uppercase mb-0.5 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-rose-600" />
                      {locale === 'hi' ? 'आवेदन अंतिम तिथि (Last Date)' : 'Last Date'}
                    </span>
                    <span className="font-extrabold text-rose-700 text-sm font-mono block">
                      {formatJobDate(selectedJob.importantDates?.applyEnd || selectedJob.lastDate, locale === 'hi')}
                    </span>
                  </div>
                  <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-200">
                    <span className="block text-[10px] font-bold text-blue-800 uppercase mb-0.5">
                      {locale === 'hi' ? 'परीक्षा तिथि' : 'Exam Date'}
                    </span>
                    <span className="font-extrabold text-blue-900 text-xs block">
                      {selectedJob.importantDates?.examDate || 'TBA'}
                    </span>
                  </div>
                  <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                    <span className="block text-[10px] font-bold text-slate-700 uppercase mb-0.5">
                      {locale === 'hi' ? 'प्रवेश पत्र (Admit Card)' : 'Admit Card'}
                    </span>
                    <span className="font-extrabold text-slate-800 text-xs block">
                      {selectedJob.importantDates?.admitCardRelease || 'TBA'}
                    </span>
                  </div>
                </div>
              </div>

              {selectedJob.isWhatsAppAlert && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md font-sans font-extrabold text-xs">
                      WA
                    </div>
                    <div>
                      <h5 className="font-sans font-extrabold text-xs text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 leading-none">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded bg-emerald-500 h-2 w-2"></span>
                        </span>
                        Verified WhatsApp Channel Alerts
                      </h5>
                      <p className="font-sans text-xs text-slate-600 mt-1.5 leading-relaxed">
                        यह भर्ती आधिकारिक तौर पर हमारे सत्यापित <strong className="text-emerald-700">@SarkariJobHub</strong> व्हाट्सएप चैनल पर प्रसारित की गई है।
                      </p>
                    </div>
                  </div>
                  <a 
                    href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 w-full sm:w-auto text-center inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold transition duration-250 shadow-md shadow-emerald-600/10 cursor-pointer"
                  >
                    🟢 Join Channel For Fast Alerts
                  </a>
                </div>
              )}

              {/* Description body */}
              <div>
                <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  Role & Department Description
                </h4>
                <p className="font-sans text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
                  {selectedJob.description}
                </p>
              </div>

              {/* Application Fees structure */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-150 p-4 text-xs space-y-2">
                  <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-widest">Age Limits</span>
                  <p className="font-sans text-sm font-bold text-slate-800">{selectedJob.ageLimit}</p>
                  <p className="text-[11px] text-slate-400 leading-normal">Relaxations are granted for reserved category applicants as per prevailing union orders.</p>
                </div>

                <div className="rounded-2xl border border-slate-150 p-4 text-xs space-y-2">
                  <span className="font-sans text-[11px] font-bold text-slate-400 uppercase tracking-widest">Application Challan Fees</span>
                  <div className="space-y-1">
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">Unreserved / General:</span> <span className="font-bold text-slate-800">{selectedJob.fees?.General || '₹0'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">Other Backward Class:</span> <span className="font-bold text-slate-800">{selectedJob.fees?.OBC || '₹0'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">SC / ST / Women:</span> <span className="font-bold text-emerald-600">{selectedJob.fees?.SC_ST_Female || '₹0'}</span></div>
                  </div>
                </div>
              </div>

              {/* Selection Process List */}
              <div className="rounded-2xl bg-slate-50 p-4">
                <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                  <ShieldAlert className="h-4 w-4 text-blue-600" />
                  Selection Stages
                </h4>
                <ol className="list-decimal list-inside space-y-2 font-sans text-sm text-slate-600">
                  {selectedJob.selectionProcess.map((step, idx) => (
                    <li key={idx} className="leading-relaxed pl-1">
                      <span className="font-semibold text-slate-800">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Connected PYQs Section */}
              {(() => {
                const rPyqs = getRelevantPyqsForJob(selectedJob);
                if (rPyqs.length > 0) {
                  return (
                    <div className="rounded-2xl border border-blue-150 bg-blue-50/20 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-sans text-xs font-extrabold text-[#1E3A8A] uppercase tracking-wider flex items-center gap-2">
                          <FileText className="h-4.5 w-4.5 text-[#1E3A8A]" />
                          Solved Previous Year Papers (PYQs) / पिछले वर्षों के हल प्रश्न पत्र
                        </h4>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full">
                          {rPyqs.length} PAPERS FOUND
                        </span>
                      </div>
                      
                      <div className="grid gap-2 sm:grid-cols-2">
                        {rPyqs.map((pyq, pIdx) => {
                          const isPremiumLocked = pyq.premium && !user.premiumUser;
                          return (
                            <div 
                              key={pIdx} 
                              className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-150 shadow-xs hover:border-blue-300 transition"
                            >
                              <div className="flex-1 min-w-0 pr-2">
                                <div className="flex items-center gap-1 flex-wrap">
                                  <span className="text-[8.5px] bg-slate-100 text-slate-700 font-bold px-1 rounded font-mono">
                                    {pyq.year} Exam
                                  </span>
                                  <span className="text-[8.5px] bg-blue-50 text-blue-700 font-bold px-1 rounded font-mono">
                                    {pyq.size}
                                  </span>
                                </div>
                                <p className="font-sans text-xs font-bold text-slate-850 mt-1 line-clamp-1 leading-normal" title={pyq.title}>
                                  {pyq.title}
                                </p>
                              </div>
                              
                              <button
                                onClick={() => {
                                  if (isPremiumLocked) {
                                    if (triggerToast) {
                                      triggerToast("🔒 This Solved PYQ is a Premium resource. Please upgrade to Premium in the 'Premium Club' tab to unlock all PDF papers instantly!");
                                    } else {
                                      alert("🔒 This Solved PYQ is a Premium resource. Please upgrade to Premium in the 'Premium Club' tab to unlock all PDF papers instantly!");
                                    }
                                  } else {
                                    if (triggerToast) {
                                      triggerToast(`📥 Downloading solved paper: "${pyq.title}"`);
                                    }
                                    if (pyq.downloadUrl && !pyq.downloadUrl.includes('placeholder')) {
                                      window.open(pyq.downloadUrl, '_blank', 'noopener,noreferrer');
                                    }
                                  }
                                }}
                                className={`shrink-0 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[9.5px] font-bold transition cursor-pointer shrink-0 ${
                                  isPremiumLocked 
                                    ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                                    : 'bg-blue-650 hover:bg-blue-700 text-white'
                                }`}
                              >
                                {isPremiumLocked ? (
                                  <>🔒 Unlock PDF</>
                                ) : (
                                  <>📥 Download</>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}

            </div>

            {/* Call Action buttons footer */}
            <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div>
                <p className="font-mono text-[9px] text-slate-400 font-bold uppercase">Official Links Verified</p>
                <a 
                  href={selectedJob.officialWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1.5 mt-1"
                >
                  Commission Website <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button 
                  type="button"
                  onClick={() => handleOpenPdf(selectedJob)}
                  className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2.5 text-xs font-black text-red-800 shadow-xs transition cursor-pointer"
                  title="Open Official Notification PDF Document"
                >
                  <FileText className="h-4 w-4 text-red-600" /> View & Download PDF Notification
                </button>
                
                <a
                  href={selectedJob.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-100 hover:bg-blue-700 transition"
                >
                  Apply Online <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Global Sarkari PDF Viewer Modal */}
      {pdfViewerJob && (
        <SarkariPdfModal
          job={pdfViewerJob}
          onClose={() => setPdfViewerJob(null)}
          triggerToast={triggerToast}
        />
      )}

    </div>
  );
}
