import React, { useState } from 'react';
import { 
  PlusCircle, Trash2, FileText, Gift, Award, 
  HelpCircle, CheckCircle, Database, RefreshCw, AlertTriangle
} from 'lucide-react';
import { GovJob, AdmitCard, JobResult, MockTest, Question } from '../types';

interface AdminConsoleProps {
  jobs: GovJob[];
  admitCards: AdmitCard[];
  results: JobResult[];
  mockTests: MockTest[];
  
  onAddJob: (job: GovJob) => void;
  onDeleteJob: (jobId: string) => void;
  onAddAdmitCard: (card: AdmitCard) => void;
  onAddResult: (res: JobResult) => void;
  onAddMockTest: (test: MockTest) => void;
}

export default function AdminConsole({
  jobs,
  admitCards,
  results,
  mockTests,
  onAddJob,
  onDeleteJob,
  onAddAdmitCard,
  onAddResult,
  onAddMockTest
}: AdminConsoleProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'jobs' | 'mocks' | 'cards'>('jobs');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Forms states
  const [jobForm, setJobForm] = useState({
    title: '',
    org: '',
    category: 'SSC' as GovJob['category'],
    qualification: 'Graduate' as GovJob['qualification'],
    ageLimit: '18 - 30 Years',
    salary: 'Rs. 35,400 - Rs. 1,12,400',
    GeneralFee: '₹100',
    OBCFee: '₹100',
    SCSTFee: '₹0',
    totalPosts: 1540,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notification.pdf',
    officialWebsite: 'https://ssc.gov.in',
    lastDate: '2026-08-30',
    location: 'All India',
    description: 'Provide dynamic opportunities in the governmental departments and secretariats.'
  });

  const [cardForm, setCardForm] = useState({
    title: '',
    org: '',
    examDate: '2026-08-15',
    examCity: 'Assigned Regional Hubs',
    downloadUrl: 'https://ssc.gov.in/admit-card',
    officialLink: 'https://ssc.gov.in'
  });

  const [resultForm, setResultForm] = useState({
    title: '',
    org: '',
    meritListUrl: 'https://upsc.gov.in/merit.pdf',
    scoreCardUrl: 'https://upsc.gov.in/scores',
    cutOffUR: '95 Marks',
    cutOffOBC: '92 Marks',
    cutOffSC: '82 Marks',
    cutOffST: '81 Marks',
    downloadUrl: 'https://upsc.gov.in/results'
  });

  const [mockForm, setMockForm] = useState({
    title: '',
    category: 'General Preparation',
    durationMinutes: 10,
    q1_text: '',
    q1_o1: '',
    q1_o2: '',
    q1_o3: '',
    q1_o4: '',
    q1_correct: 0,
    q1_explanation: ''
  });

  const triggerMessage = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: GovJob = {
      id: `custom-job-${Date.now()}`,
      title: jobForm.title,
      org: jobForm.org,
      category: jobForm.category,
      qualification: jobForm.qualification,
      ageLimit: jobForm.ageLimit,
      salary: jobForm.salary,
      fees: {
        General: jobForm.GeneralFee,
        OBC: jobForm.OBCFee,
        SC_ST_Female: jobForm.SCSTFee
      },
      totalPosts: Number(jobForm.totalPosts),
      applyUrl: jobForm.applyUrl,
      pdfUrl: jobForm.pdfUrl,
      officialWebsite: jobForm.officialWebsite,
      postedDate: new Date().toISOString().split('T')[0],
      lastDate: jobForm.lastDate,
      importantDates: {
        applyStart: new Date().toISOString().split('T')[0],
        applyEnd: jobForm.lastDate,
        examDate: '2026-11-20',
        admitCardRelease: '2026-11-05'
      },
      selectionProcess: ['Computer Based Objective Test', 'Interview / Personality Audit', 'Medical Screening'],
      location: jobForm.location,
      description: jobForm.description
    };

    onAddJob(newJob);
    triggerMessage(`✅ Job Notification "${newJob.title}" added successfully!`);
    
    // reset form
    setJobForm({
      ...jobForm,
      title: '',
      org: '',
      totalPosts: 100
    });
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: AdmitCard = {
      id: `custom-card-${Date.now()}`,
      title: cardForm.title,
      org: cardForm.org,
      examDate: cardForm.examDate,
      examCity: cardForm.examCity,
      downloadUrl: cardForm.downloadUrl,
      officialLink: cardForm.officialLink,
      addedDate: new Date().toISOString().split('T')[0]
    };

    onAddAdmitCard(newCard);
    triggerMessage(`✅ Admit Card alert for "${newCard.title}" created successfully!`);
    setCardForm({
      title: '',
      org: '',
      examDate: '2026-08-15',
      examCity: 'Assigned Regional Hubs',
      downloadUrl: 'https://ssc.gov.in/admit-card',
      officialLink: 'https://ssc.gov.in'
    });
  };

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: JobResult = {
      id: `custom-res-${Date.now()}`,
      title: resultForm.title,
      org: resultForm.org,
      meritListUrl: resultForm.meritListUrl,
      scoreCardUrl: resultForm.scoreCardUrl,
      cutOff: {
        UR: resultForm.cutOffUR,
        OBC: resultForm.cutOffOBC,
        SC: resultForm.cutOffSC,
        ST: resultForm.cutOffST
      },
      downloadUrl: resultForm.downloadUrl,
      releaseDate: new Date().toISOString().split('T')[0]
    };

    onAddResult(newRes);
    triggerMessage(`✅ Exam Result declaration for "${newRes.title}" is now live!`);
    setResultForm({
      title: '',
      org: '',
      meritListUrl: 'https://upsc.gov.in/merit.pdf',
      scoreCardUrl: 'https://upsc.gov.in/scores',
      cutOffUR: '95 Marks',
      cutOffOBC: '92 Marks',
      cutOffSC: '82 Marks',
      cutOffST: '81 Marks',
      downloadUrl: 'https://upsc.gov.in/results'
    });
  };

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customQuestions: Question[] = [
      {
        id: `q-cust-${Date.now()}-1`,
        text: mockForm.q1_text || 'Explain basic democratic standards in Indian assembly guidelines.',
        options: [
          mockForm.q1_o1 || 'Option A',
          mockForm.q1_o2 || 'Option B',
          mockForm.q1_o3 || 'Option C',
          mockForm.q1_o4 || 'Option D'
        ],
        correctOptionIndex: Number(mockForm.q1_correct),
        explanation: mockForm.q1_explanation || 'Detailed regulatory audit.'
      }
    ];

    const newTest: MockTest = {
      id: `custom-mock-${Date.now()}`,
      title: mockForm.title,
      category: mockForm.category,
      durationMinutes: Number(mockForm.durationMinutes),
      questions: customQuestions,
      totalMarks: 2,
      negativeMark: 0.5
    };

    onAddMockTest(newTest);
    triggerMessage(`✅ Simulated Exam Mock "${newTest.title}" uploaded! Active in test room.`);
    setMockForm({
      title: '',
      category: 'General Preparation',
      durationMinutes: 10,
      q1_text: '',
      q1_o1: '',
      q1_o2: '',
      q1_o3: '',
      q1_o4: '',
      q1_correct: 0,
      q1_explanation: ''
    });
  };

  return (
    <div className="font-sans text-slate-700 space-y-6">
      
      {/* Tab Select Header */}
      <div className="border-b border-slate-200 flex flex-wrap gap-4 pb-2 justify-between items-center bg-white p-4 rounded-2xl shadow-xs">
        <div className="flex gap-2">
          {[
            { id: 'jobs', label: 'Government Positions & Vacancies' },
            { id: 'mocks', label: 'Interactive MCQ Test Creator' },
            { id: 'cards', label: 'Admit Cards / Official Results' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                activeAdminTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 p-1.5 rounded flex items-center gap-1">
          <Database className="h-3 w-3 text-blue-600 animate-pulse" /> ADMIN AUTHORIZED ENVIRONMENT
        </span>
      </div>

      {statusMessage && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-3.5 text-xs font-bold animate-fade-in">
          {statusMessage}
        </div>
      )}

      {/* Dynamic Tabs Content */}
      {activeAdminTab === 'jobs' && (
        <div className="grid gap-6 md:grid-cols-12">
          
          {/* Add Job Form */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-blue-50 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <PlusCircle className="h-5 w-5 text-blue-600" />
              Publish Government Vacancy
            </h3>

            <form onSubmit={handleJobSubmit} className="space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Post / Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SSC CGL Recruitment 2026"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Commission / Organisation</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Staff Selection Commission"
                    value={jobForm.org}
                    onChange={(e) => setJobForm({...jobForm, org: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Exam Type Group</label>
                  <select
                    value={jobForm.category}
                    onChange={(e) => setJobForm({...jobForm, category: e.target.value as any})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="SSC">Staff Selection (SSC)</option>
                    <option value="UPSC">Union Public (UPSC)</option>
                    <option value="Railway">Railways (RRB)</option>
                    <option value="Bank">Bank (IBPS/SBI)</option>
                    <option value="Defence">Military Defence</option>
                    <option value="Police">State Police / Force</option>
                    <option value="Teaching">Education Board</option>
                    <option value="State PSC">State PSC/PSC</option>
                    <option value="Others">Other Central/State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Vacancy Qualification</label>
                  <select
                    value={jobForm.qualification}
                    onChange={(e) => setJobForm({...jobForm, qualification: e.target.value as any})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  >
                    {['Graduate', '12th Pass', '10th Pass', 'Post Graduate', 'B.Tech', 'Diploma', 'ITI', '8th Pass'].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Total Vacancies (Posts)</label>
                  <input 
                    type="number" 
                    value={jobForm.totalPosts}
                    onChange={(e) => setJobForm({...jobForm, totalPosts: Number(e.target.value)})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Age Limit Bracket</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 18 - 32 Years"
                    value={jobForm.ageLimit}
                    onChange={(e) => setJobForm({...jobForm, ageLimit: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Salary Range Scale</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Level 7 (₹44,900 - ₹1,42,400)"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Fees: General / OBC / Reserved Category</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <input 
                    type="text" 
                    placeholder="General (₹100)" 
                    value={jobForm.GeneralFee}
                    onChange={(e) => setJobForm({...jobForm, GeneralFee: e.target.value})}
                    className="rounded-lg border border-slate-200 p-2"
                  />
                  <input 
                    type="text" 
                    placeholder="OBC (₹100)" 
                    value={jobForm.OBCFee}
                    onChange={(e) => setJobForm({...jobForm, OBCFee: e.target.value})}
                    className="rounded-lg border border-slate-200 p-2"
                  />
                  <input 
                    type="text" 
                    placeholder="SC/ST/Women (₹0)" 
                    value={jobForm.SCSTFee}
                    onChange={(e) => setJobForm({...jobForm, SCSTFee: e.target.value})}
                    className="rounded-lg border border-slate-200 p-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Apply Online URL</label>
                  <input 
                    type="url" 
                    value={jobForm.applyUrl}
                    onChange={(e) => setJobForm({...jobForm, applyUrl: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Registration Closing Date</label>
                  <input 
                    type="date" 
                    value={jobForm.lastDate}
                    onChange={(e) => setJobForm({...jobForm, lastDate: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Notification Brief / Eligibility Criteria</label>
                <textarea 
                  rows={3}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-850"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-blue-600 font-bold text-white py-3 hover:bg-blue-700 transition"
              >
                Publish Live Job Alert
              </button>
            </form>
          </div>

          {/* Delete / View active lists */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                📋 Currently Published ({jobs.length})
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Review, manage or remove active government job notifications on the platform.
              </p>

              <div className="space-y-3 overflow-y-auto max-h-[500px]">
                {jobs.map((job) => (
                  <div key={job.id} className="p-3 border border-slate-50 rounded-xl flex items-center justify-between gap-3 bg-slate-55/10">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-xs truncate">{job.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{job.org}</p>
                    </div>
                    <button
                      onClick={() => onDeleteJob(job.id)}
                      className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition flex-shrink-0"
                      title="Delete Notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {activeAdminTab === 'mocks' && (
        <div className="bg-white rounded-2xl border border-blue-50 p-5 shadow-xs max-w-4xl mx-auto">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Launch Interactive MCQ Mock Paper
          </h3>

          <form onSubmit={handleMockSubmit} className="space-y-5 text-xs">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Assessment Sheet Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. UPSC CSE CSAT Logic Reasoning mock 1"
                  value={mockForm.title}
                  onChange={(e) => setMockForm({...mockForm, title: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Duration (Minutes)</label>
                <input 
                  type="number" 
                  value={mockForm.durationMinutes}
                  onChange={(e) => setMockForm({...mockForm, durationMinutes: Number(e.target.value)})}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Set Question 1 */}
            <div className="border border-slate-100 p-4 rounded-2xl bg-slate-50/50 space-y-3">
              <span className="text-[11px] font-bold text-blue-700 block uppercase tracking-wide">Configure Assessment MCQ Question</span>
              
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Question Statement</label>
                <input 
                  type="text" 
                  placeholder="e.g. Which tier of state shares national borders with Myanmar?"
                  value={mockForm.q1_text}
                  onChange={(e) => setMockForm({...mockForm, q1_text: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Option A</label>
                  <input type="text" placeholder="Choice A" value={mockForm.q1_o1} onChange={(e) => setMockForm({...mockForm, q1_o1: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-white p-2" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Option B</label>
                  <input type="text" placeholder="Choice B" value={mockForm.q1_o2} onChange={(e) => setMockForm({...mockForm, q1_o2: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-white p-2" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Option C</label>
                  <input type="text" placeholder="Choice C" value={mockForm.q1_o3} onChange={(e) => setMockForm({...mockForm, q1_o3: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-white p-2" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Option D</label>
                  <input type="text" placeholder="Choice D" value={mockForm.q1_o4} onChange={(e) => setMockForm({...mockForm, q1_o4: e.target.value})} className="w-full rounded-lg border border-slate-200 bg-white p-2" required />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Correct Answer Index</label>
                  <select
                    value={mockForm.q1_correct}
                    onChange={(e) => setMockForm({...mockForm, q1_correct: Number(e.target.value)})}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value={0}>Option A is Correct</option>
                    <option value={1}>Option B is Correct</option>
                    <option value={2}>Option C is Correct</option>
                    <option value={3}>Option D is Correct</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Logical reference explanation / Solution Key</label>
                  <input 
                    type="text" 
                    placeholder="Provide explanatory key for candidates..."
                    value={mockForm.q1_explanation}
                    onChange={(e) => setMockForm({...mockForm, q1_explanation: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full rounded-xl bg-orange-600 font-bold text-white py-3 hover:bg-orange-700 transition"
            >
              Publish Mock Paper to Aspirants hub
            </button>
          </form>

        </div>
      )}

      {activeAdminTab === 'cards' && (
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* Admit Cards Form */}
          <div className="bg-white rounded-2xl border border-blue-50 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Upload e-Admit Card Portal Link
            </h3>

            <form onSubmit={handleCardSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Download Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. UPSC CSE 2026 Prelims Admit Card"
                  value={cardForm.title}
                  onChange={(e) => setCardForm({...cardForm, title: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Issue Organisation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Union Public Service Commission"
                  value={cardForm.org}
                  onChange={(e) => setCardForm({...cardForm, org: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Expected Exam Timetable</label>
                  <input type="text" value={cardForm.examDate} onChange={(e) => setCardForm({...cardForm, examDate: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Assessment Venue / Cities</label>
                  <input type="text" value={cardForm.examCity} onChange={(e) => setCardForm({...cardForm, examCity: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Direct e-Admit Download Link</label>
                <input type="url" value={cardForm.downloadUrl} onChange={(e) => setCardForm({...cardForm, downloadUrl: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-blue-600 font-bold text-white py-2.5 hover:bg-blue-700 transition"
              >
                Publish Admit Card Link
              </button>
            </form>
          </div>

          {/* Results declaration form */}
          <div className="bg-white rounded-2xl border border-blue-50 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <Award className="h-5 w-5 text-blue-600" />
              Declare Merit Lists & Result Cut-offs
            </h3>

            <form onSubmit={handleResultSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Declared Exam/Post Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. RRB NTPC Grad Qualified merit scorecard list"
                  value={resultForm.title}
                  onChange={(e) => setResultForm({...resultForm, title: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cut-off General (UR)</label>
                  <input type="text" placeholder="e.g. 78%" value={resultForm.cutOffUR} onChange={(e) => setResultForm({...resultForm, cutOffUR: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cut-off OBC category</label>
                  <input type="text" placeholder="e.g. 72%" value={resultForm.cutOffOBC} onChange={(e) => setResultForm({...resultForm, cutOffOBC: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Direct Merit Slate PDF Link</label>
                <input type="url" value={resultForm.downloadUrl} onChange={(e) => setResultForm({...resultForm, downloadUrl: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-blue-600 font-bold text-white py-2.5 hover:bg-blue-700 transition"
              >
                Publish Merit Result
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
