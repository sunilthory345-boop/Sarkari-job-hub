import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Clock, Award, Star, 
  BookOpen, Download, HelpCircle, Filter, Search,
  Brain, RefreshCw
} from 'lucide-react';
import { UserProfile } from '../types';
import { fetchWithRetry } from '../utils/fetchHelper';

interface SyllabusTopic {
  id: string;
  subject: string;
  topicName: string;
  examGroup: 'SSC' | 'UPSC' | 'Bank' | 'Railway' | 'Rajasthan' | 'Defence';
  importance: 'High' | 'Medium' | 'Low';
  details: string;
}

interface SyllabusPlannerProps {
  user: UserProfile;
  triggerToast: (msg: string) => void;
  selectedGroup?: 'All' | 'SSC' | 'UPSC' | 'Bank' | 'Railway' | 'Rajasthan' | 'Defence';
  setSelectedGroup?: (g: 'All' | 'SSC' | 'UPSC' | 'Bank' | 'Railway' | 'Rajasthan' | 'Defence') => void;
}

export default function SyllabusPlanner({ 
  user, 
  triggerToast,
  selectedGroup: propGroup,
  setSelectedGroup: propSetGroup
}: SyllabusPlannerProps) {
  const [localGroup, setLocalGroup] = useState<'All' | 'SSC' | 'UPSC' | 'Bank' | 'Railway' | 'Rajasthan' | 'Defence'>('All');
  const selectedGroup = propGroup !== undefined ? propGroup : localGroup;
  const setSelectedGroup = propSetGroup !== undefined ? propSetGroup : setLocalGroup;
  const [searchQuery, setSearchQuery] = useState('');

  // AI strategy advice states
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [loadingAdvice, setLoadingAdvice] = useState<boolean>(false);

  const handleFetchSyllabusAdvice = async () => {
    setLoadingAdvice(true);
    setAiAdvice('');
    try {
      const response = await fetchWithRetry('/api/doubt-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Act as a specialized Indian Civil Services and Government Exams Academic Advisor.
The student is viewing the syllabus section for: "${selectedGroup === 'All' ? 'All Subjects combined' : `${selectedGroup} Exams`}"
Their highest qualification is: "${user?.qualification || 'Graduate'}"

Please outline:
1. The standard exam structure and marking scheme of this commission / stream.
2. 3 highly important topics they must prioritize (with key reasons).
3. Recommended textbooks, free resources or websites, and offline notes reference materials.
4. A highly actionable 30-day mastering roadmap layout.

Present your syllabus guidance in beautiful, highly structured, bilingual (Hindi/English) markdown. Use headers, bullets, and separate sections clearly.`
        })
      });
      const data = await response.json();
      if (data.text) {
        setAiAdvice(data.text);
      } else {
        setAiAdvice('⚠️ Failed to load advice due to server configuration issue.');
      }
    } catch (err: any) {
      setAiAdvice(`⚠️ Error contacting server: ${err.message}`);
    } finally {
      setLoadingAdvice(false);
    }
  };
  
  // Load tracked topics status from localStorage
  const [topicStatus, setTopicStatus] = useState<Record<string, 'todo' | 'progress' | 'done'>>(() => {
    const saved = localStorage.getItem('sarkari_syllabus_tracking');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('sarkari_syllabus_tracking', JSON.stringify(topicStatus));
  }, [topicStatus]);

  const syllabusDatabase: SyllabusTopic[] = [
    // SSC
    { id: 'ssc-1', subject: 'Quantitative Aptitude', topicName: 'Percentage, Ratio & Proportion', examGroup: 'SSC', importance: 'High', details: 'Core weightage in SSC CGL Tier 1 & 2. Focus on ratio applications.' },
    { id: 'ssc-2', subject: 'General Intelligence', topicName: 'Syllogisms & Logical Venn Diagrams', examGroup: 'SSC', importance: 'High', details: '3-4 direct questions. Practice immediate deduction rules.' },
    { id: 'ssc-3', subject: 'General Awareness', topicName: 'Modern Indian History & Freedom Struggle', examGroup: 'SSC', importance: 'Medium', details: 'Revolt of 1857, Indian National Congress sessions, Gandhian Era.' },
    { id: 'ssc-4', subject: 'English Comprehension', topicName: 'Active Passive Voice & Direct/Indirect narration', examGroup: 'SSC', importance: 'High', details: 'High-scoring section in Tier 2. Understand conversion rules.' },
    
    // UPSC
    { id: 'upsc-1', subject: 'Indian Polity', topicName: 'Fundamental Rights & Constitutional Amendments', examGroup: 'UPSC', importance: 'High', details: 'Articles 12 to 35. Landmark judicial announcements.' },
    { id: 'upsc-2', subject: 'Economics', topicName: 'Fiscal Policy & Banking Reforms', examGroup: 'UPSC', importance: 'High', details: 'Concepts of Union Budget, monetary constraints, SLR, Repo Rate.' },
    { id: 'upsc-3', subject: 'Geography', topicName: 'Climatology & Oceanography Basics', examGroup: 'UPSC', importance: 'Medium', details: 'Global winds, monsoon mechanics in Indian subcontinent.' },
    { id: 'upsc-4', subject: 'Environment', topicName: 'Biodiversity Hotspots & National Parks of India', examGroup: 'UPSC', importance: 'High', details: 'Mapping Ramsar sites and endangered fauna distributions.' },

    // Bank
    { id: 'bank-1', subject: 'Quantitative Aptitude', topicName: 'Data Interpretation (Bar & Pie Charts)', examGroup: 'Bank', importance: 'High', details: 'Highest weightage in SBI/IBPS Mains exams. Speed calculation tricks are critical.' },
    { id: 'bank-2', subject: 'Reasoning Ability', topicName: 'Seating Arrangements (Circular & Linear Puzzles)', examGroup: 'Bank', importance: 'High', details: 'Complex multi-variable condition models. Build grid scenarios swiftly.' },
    { id: 'bank-3', subject: 'Financial Awareness', topicName: 'Insolvency Code, NPA Management & Basel Norms', examGroup: 'Bank', importance: 'Medium', details: 'Essential for banking interview rounds and descriptive write ups.' },

    // Railway
    { id: 'rail-1', subject: 'General Science', topicName: 'Physics Forces, Motion & Electricity', examGroup: 'Railway', importance: 'High', details: 'Class 9th & 10th NCERT core. numericals on Work-Energy-Power.' },
    { id: 'rail-2', subject: 'General GK', topicName: 'Railway History, Zones & Connectivity in India', examGroup: 'Railway', importance: 'Medium', details: 'Direct marks on Indian railway networks, oldest locomotives, and operational commands.' },
    { id: 'rail-3', subject: 'Arithmetic', topicName: 'Time & Work, Pipes & Cisterns', examGroup: 'Railway', importance: 'High', details: 'NTPC and ALP stages must-ask arithmetic section. Memorize efficiency ratios.' },

    // Rajasthan Exams
    { id: 'raj-1', subject: 'Rajasthan GK', topicName: 'Art, Architecture & Dynasties of Mewar and Marwar', examGroup: 'Rajasthan', importance: 'High', details: 'Major forts (Chittorgarh, Mehrangarh) and famous treaties. Extremely critical for RPSC RAS, Lecturer, REET.' },
    { id: 'raj-2', subject: 'Rajasthan Geography', topicName: 'Aravalli Range Divisions & Indira Gandhi Canal Project', examGroup: 'Rajasthan', importance: 'High', details: 'Irrigation updates, soil classification types in western deserts.' },
    { id: 'raj-3', subject: 'Rajasthan Polity', topicName: 'State Human Rights Commission & Panchayati Raj', examGroup: 'Rajasthan', importance: 'Medium', details: 'RPSC RAS Polity segment. Key structural rules and head appointments.' },

    // Defence / Army
    { id: 'army-1', subject: 'Armed General Duty', topicName: 'General Science: Human Anatomy & Nutrition', examGroup: 'Defence', importance: 'High', details: 'Vitamins, digestive systems, disease preventions. Mandatory for Army GD & Technical recruits.' },
    { id: 'army-2', subject: 'Military Aptitude', topicName: 'Vector Formulas & Ballistics Mechanics', examGroup: 'Defence', importance: 'Medium', details: 'Required for Technical Entry Schemes (TES) and Air Force group X/Y.' },
    { id: 'army-3', subject: 'Defence GK', topicName: 'Combat Aircraft, ICBM Missiles & Army Commands', examGroup: 'Defence', importance: 'High', details: 'Joint maneuvers, DRDO test protocols, national border checkpoints.' }
  ];

  const updateStatus = (topicId: string, status: 'todo' | 'progress' | 'done') => {
    setTopicStatus(prev => ({
      ...prev,
      [topicId]: status
    }));
    
    let emoji = '🎯';
    if (status === 'progress') emoji = '⚡';
    if (status === 'done') emoji = '✅';
    
    triggerToast(`${emoji} Topic status updated to matches preference.`);
  };

  // Filter topics
  const filteredTopics = syllabusDatabase.filter(topic => {
    const matchesGroup = selectedGroup === 'All' || topic.examGroup === selectedGroup;
    const matchesSearch = topic.topicName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          topic.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          topic.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // Calculate statistics
  const currentCategoryTopics = syllabusDatabase.filter(t => selectedGroup === 'All' || t.examGroup === selectedGroup);
  const totalInGroup = currentCategoryTopics.length;
  const completedInGroup = currentCategoryTopics.filter(t => topicStatus[t.id] === 'done').length;
  const progressInGroup = currentCategoryTopics.filter(t => topicStatus[t.id] === 'progress').length;
  const percentage = totalInGroup > 0 ? Math.round((completedInGroup / totalInGroup) * 100) : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans text-slate-800">
      
      {/* Header and status info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 uppercase">
            Study Planner (अभ्यास योजनाकार)
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
            Interactive Sarkari Syllabus Checklist
          </h2>
          <p className="text-xs text-slate-500">
            Select your target recruitment exam sector, mark progress, and tracking complete syllabus coverage parameters.
          </p>
        </div>

        {/* Dynamic Visual gauge widget */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center gap-3 min-w-[210px] w-full sm:w-auto">
          <div className="h-10 w-10 rounded-full border-4 border-blue-600 border-t-slate-200 flex items-center justify-center font-bold text-xs font-mono text-blue-900 shrink-0">
            {percentage}%
          </div>
          <div className="text-left py-0.5 space-y-0.5">
            <p className="text-[11px] font-bold text-slate-700 uppercase leading-none">Preparation Score</p>
            <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
              {completedInGroup} of {totalInGroup} topics completed
            </p>
            <div className="w-24 bg-slate-200 h-1 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-1 transition-all duration-300" style={{ width: `${percentage}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Category selectors */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-blue-600" /> Filter by Target Commission (विभाग के अनुसार):
          </label>
          <button
            onClick={handleFetchSyllabusAdvice}
            disabled={loadingAdvice}
            className="self-start sm:self-auto whitespace-nowrap inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-105 hover:border-indigo-300 text-indigo-700 font-sans text-[10px] font-extrabold px-3 py-1.5 transition-all outline-hidden cursor-pointer disabled:opacity-60"
          >
            {loadingAdvice ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Optimizing strategic roadmap...</span>
              </>
            ) : (
              <>
                <Brain className="h-3.5 w-3.5 text-indigo-600 fill-indigo-200/50" />
                <span>Ask AI Advisor for {selectedGroup === 'All' ? 'General' : selectedGroup} Syllabus Strategy</span>
              </>
            )}
          </button>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'All', label: 'All Subjects (सभी)', color: 'selected:bg-blue-600' },
            { id: 'SSC', label: 'SSC Exams (CGL, CHSL)' },
            { id: 'UPSC', label: 'UPSC CSE Syllabus' },
            { id: 'Bank', label: 'Banking (SBI/IBPS)' },
            { id: 'Railway', label: 'Railway Exams (RRB)' },
            { id: 'Rajasthan', label: 'Rajasthan State GK/RPSC' },
            { id: 'Defence', label: 'Army & Defence Forces' }
          ].map(grp => {
            const isSelected = selectedGroup === grp.id;
            return (
              <button
                key={grp.id}
                onClick={() => setSelectedGroup(grp.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border duration-100 cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                    : 'bg-slate-50/50 hover:bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {grp.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expandable AI Syllabus Strategist Advice Area */}
      {aiAdvice && (
        <div className="bg-gradient-to-br from-indigo-50/40 via-blue-50/20 to-white border border-indigo-150 rounded-2xl p-4 space-y-3 shadow-2xs text-left animate-fade-in">
          <div className="flex items-center justify-between border-b border-indigo-100/60 pb-2">
            <h4 className="font-extrabold text-indigo-900 text-xs flex items-center gap-1.5">
              <Brain className="h-4.5 w-4.5 text-indigo-600" />
              AI Syllabus strategist roadmap ({selectedGroup === 'All' ? 'All Subjects' : selectedGroup})
            </h4>
            <button 
              onClick={() => setAiAdvice('')}
              className="font-mono text-[9px] font-bold text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 bg-white cursor-pointer"
            >
              Close Roadmap
            </button>
          </div>
          
          <div className="space-y-2 text-xs text-slate-700 leading-relaxed font-sans max-h-80 overflow-y-auto pr-1">
            {aiAdvice.split('\n').map((line, idx) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={idx} className="h-2" />;
              if (trimmed.startsWith('###')) {
                return <h5 key={idx} className="font-extrabold text-indigo-950 text-[11px] uppercase tracking-wider mt-3 mb-1">{trimmed.replace('###', '').trim()}</h5>;
              }
              if (trimmed.startsWith('##')) {
                return <h5 key={idx} className="font-extrabold text-slate-800 text-xs tracking-tight mt-4 mb-2 border-b border-slate-100 pb-1">{trimmed.replace('##', '').trim()}</h5>;
              }
              if (trimmed.startsWith('#')) {
                return <h4 key={idx} className="font-bold text-slate-900 text-sm mt-3 mb-1">{trimmed.replace('#', '').trim()}</h4>;
              }
              if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                let content = trimmed.substring(1).trim();
                const parts = content.split('**');
                return (
                  <div key={idx} className="flex items-start gap-1.5 pl-2">
                    <span className="text-indigo-500 mt-1 shrink-0">•</span>
                    <span className="text-[11px]">
                      {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-[#7C2D12]">{p}</strong> : p)}
                    </span>
                  </div>
                );
              }
              const parts = trimmed.split('**');
              return (
                <p key={idx} className="text-[11px]">
                  {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-slate-900">{p}</strong> : p)}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Bar Input */}
      <div className="relative">
        <Search className="absolute top-3 left-3.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search specific syllabus subjects, topics or guidelines (e.g. Fundamental Rights, Rajasthan, Army...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all text-slate-800 placeholder-slate-450"
        />
      </div>

      {/* Topics list layout */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl text-white font-sans text-xs font-bold">
          <span className="pl-1">Syllabus Course Segment & Importance</span>
          <span>Action Status Tracker</span>
        </div>

        {filteredTopics.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-xs font-sans">
            No specific topics matching your custom search constraints. Try exploring other exam category tabs above.
          </div>
        ) : (
          <div className="space-y-3.5">
            {filteredTopics.map((topic) => {
              const status = topicStatus[topic.id] || 'todo';
              return (
                <div 
                  key={topic.id}
                  className={`border rounded-2xl p-4 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    status === 'done' 
                      ? 'bg-emerald-50/30 border-emerald-150/70' 
                      : status === 'progress' 
                        ? 'bg-blue-50/20 border-blue-100' 
                        : 'bg-white hover:bg-slate-50/30 border-slate-200/80'
                  }`}
                >
                  <div className="space-y-1.5 max-w-xl text-left">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[9px] font-bold px-1.5 rounded uppercase">
                        {topic.examGroup}
                      </span>
                      <span className="text-slate-400 text-[10px]">•</span>
                      <span className="text-slate-500 text-[10.5px] font-bold">{topic.subject}</span>
                      <span className="text-slate-400 text-[10px]">•</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        topic.importance === 'High' 
                          ? 'bg-rose-50 border border-rose-100 text-rose-700' 
                          : topic.importance === 'Medium' 
                            ? 'bg-amber-50 border border-amber-100 text-amber-700' 
                            : 'bg-slate-50 text-slate-505'
                      }`}>
                        {topic.importance} Weightage
                      </span>
                    </div>

                    <h4 className="font-extrabold text-slate-800 text-[13.5px] tracking-tight">{topic.topicName}</h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{topic.details}</p>
                  </div>

                  {/* Operational Status Action Selectors */}
                  <div className="flex gap-1 sm:self-center">
                    <button
                      onClick={() => updateStatus(topic.id, 'todo')}
                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                        status === 'todo'
                          ? 'bg-rose-50 border-rose-200 text-rose-700'
                          : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <Circle className="h-3 w-3 shrink-0" /> Stay Todo
                    </button>
                    <button
                      onClick={() => updateStatus(topic.id, 'progress')}
                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                        status === 'progress'
                          ? 'bg-blue-100 border-blue-300 text-blue-800'
                          : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <Clock className="h-3 w-3 shrink-0" /> Revisioning
                    </button>
                    <button
                      onClick={() => updateStatus(topic.id, 'done')}
                      className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-extrabold transition-all flex items-center gap-1 cursor-pointer ${
                        status === 'done'
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3 shrink-0" /> Mastered
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
