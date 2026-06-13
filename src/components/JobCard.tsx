import React, { useState } from 'react';
import { 
  Briefcase, Calendar, MapPin, IndianRupee,
  Search, ShieldAlert, ArrowUpRight, FileText,
  Filter, Bookmark, BookmarkCheck, Share2, Info, Clock, AlertCircle, GraduationCap
} from 'lucide-react';
import { GovJob, UserProfile } from '../types';

interface JobCardProps {
  jobs: GovJob[];
  user: UserProfile;
  toggleSaveJob: (jobId: string) => void;
  qualificationFilter?: string;
  setQualificationFilter?: (q: string) => void;
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

export default function JobCard({ 
  jobs, 
  user, 
  toggleSaveJob,
  qualificationFilter = 'All',
  setQualificationFilter
}: JobCardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJob, setSelectedJob] = useState<GovJob | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    const lastDate = new Date(lastDateStr);
    const today = new Date('2026-06-12'); // Mocked system baseline time from prompt metadata
    const diffTime = lastDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCopyShare = (job: GovJob) => {
    const shareText = `🔥 ${job.title} - ${job.org} \n🎯 Total Vacancies: ${job.totalPosts} posts\n🎓 Qualification: ${job.qualification}\n⏱️ Last Date: ${job.lastDate}\n👉 Apply online here!`;
    navigator.clipboard.writeText(shareText);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-4">
      
      {/* Target Exam Quick Filter Board Roster */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest text-slate-600 flex items-center gap-1">
          <span>🎯</span> SELECT TARGET PREPARATION DEPARTMENT / EXAMS (लक्ष्य परीक्षा का चयन करें)
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'All', label: 'All Exams (सभी)', emoji: '🌐', color: 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800' },
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
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => {
            const isSaved = user.savedJobs.includes(job.id);
            const daysRemaining = getDaysRemaining(job.lastDate);
            const isExpired = daysRemaining < 0;
            const cStyles = getCategoryStyles(job.category);

            return (
              <div 
                key={job.id} 
                id={`job-idx-${job.id}`}
                className={`group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs transition-all duration-200 hover:shadow-md ${cStyles.border}`}
              >
                {/* Save bookmark and Commission banner */}
                <div className="flex items-start justify-between gap-2">
                  <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide ${cStyles.text}`}>
                    {job.category} Exam
                  </span>
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
                      <span>{job.totalPosts.toLocaleString()} Posts</span>
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

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopyShare(job)}
                      className="rounded-md p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-650 transition"
                      title="Share Job Notification"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className={`flex items-center gap-1 rounded px-2.5 py-1 text-[10px] font-bold transition ${cStyles.btn}`}
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
              
              {/* Short summary banner */}
              <div className="rounded-2xl bg-linear-to-r from-blue-50 to-indigo-50/50 p-4 border border-blue-100/50 grid gap-3 sm:grid-cols-3 text-center">
                <div className="border-r border-blue-100 last:border-0 pr-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Vacancies</span>
                  <span className="text-base font-extrabold text-blue-900">{selectedJob.totalPosts.toLocaleString()} Posts</span>
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
                <div className="grid gap-3 sm:grid-cols-4 bg-slate-50 p-3.5 rounded-2xl text-xs">
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400 block mb-0.5">Submit Form From</span>
                    <span className="font-bold text-slate-700">{selectedJob.importantDates.applyStart}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400 block mb-0.5">Closing Registration</span>
                    <span className="font-bold text-rose-600">{selectedJob.importantDates.applyEnd}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400 block mb-0.5">Exam Calendar Date</span>
                    <span className="font-bold text-blue-700">{selectedJob.importantDates.examDate}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-medium text-slate-400 block mb-0.5">Admit Card Date</span>
                    <span className="font-bold text-emerald-600">{selectedJob.importantDates.admitCardRelease}</span>
                  </div>
                </div>
              </div>

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
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">Unreserved / General:</span> <span className="font-bold text-slate-800">{selectedJob.fees.General}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">Other Backward Class:</span> <span className="font-bold text-slate-800">{selectedJob.fees.OBC}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">SC / ST / Women:</span> <span className="font-bold text-emerald-600">{selectedJob.fees.SC_ST_Female}</span></div>
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

            </div>

            {/* Call Action buttons footer */}
            <div className="mt-6 border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
              <div>
                <p className="font-mono text-[9px] text-slate-400 font-bold uppercase">Official Links Verified</p>
                <a href={selectedJob.officialWebsite} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1.5 mt-1">
                  Commission Website <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a 
                  href={selectedJob.pdfUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-xs font-bold text-blue-800 shadow-xs hover:bg-slate-50 transition"
                >
                  <FileText className="h-4 w-4" /> Download PDF Notification
                </a>
                
                <a
                  href={selectedJob.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-100 hover:bg-blue-700 transition"
                >
                  Apply Online <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
