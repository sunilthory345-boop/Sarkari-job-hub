import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Calendar, BookOpen, Clock, Award, CheckCircle2, 
  RefreshCw, Play, FileText, ChevronRight, AlertCircle, ArrowRight,
  Brain, Zap, Target, Layers, ShieldCheck, Check, Info, HelpCircle
} from 'lucide-react';
import { MockTest, UserProfile } from '../types';
import { safeGetJSON, safeSetJSON, safeRemoveItem } from '../utils/safeStorage';

interface DaySchedule {
  dayIndex: number;
  dayName: string;
  title: string;
  focusArea: string;
  examTarget: string;
  patternTier: 'Tier 1' | 'Tier 2';
  questionCount: number;
  durationMinutes: number;
  totalMarks: number;
  negativeMark: number;
  description: string;
  topicsCovered: string[];
}

interface SscAiMockGeneratorProps {
  user: UserProfile;
  onAddMockTest: (newTest: MockTest) => void;
  onStartCbtTest?: (testId: string) => void;
  onChangeTab?: (tab: string) => void;
}

export default function SscAiMockGenerator({
  user,
  onAddMockTest,
  onStartCbtTest,
  onChangeTab
}: SscAiMockGeneratorProps) {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(1);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState<boolean>(true);

  // Generation Form Controls
  const [selectedExam, setSelectedExam] = useState<string>('SSC CGL 2026');
  const [selectedTier, setSelectedTier] = useState<'Tier 1' | 'Tier 2'>('Tier 1');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Bilingual (Hindi & English)');
  const [selectedCount, setSelectedCount] = useState<number>(25);

  // Generation Loading States
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [generatedTest, setGeneratedTest] = useState<MockTest | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  // Saved 7-Day Tests Registry with safeStorage
  const [savedDayTests, setSavedDayTests] = useState<Record<number, MockTest>>(() => {
    return safeGetJSON<Record<number, MockTest>>('sarkari_ssc_ai_7day_mocks', {});
  });

  // Load 7-Day schedule from backend
  useEffect(() => {
    const fetchSchedule = async () => {
      setIsLoadingSchedule(true);
      try {
        const res = await fetch('/api/ssc/7-day-mock-schedule');
        if (res.ok) {
          const data = await res.json();
          if (data.schedule && Array.isArray(data.schedule)) {
            setSchedule(data.schedule);
            if (data.currentDayIndex) {
              setCurrentDayIndex(data.currentDayIndex);
              setSelectedDayIndex(data.currentDayIndex);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to load 7-day schedule from server, fallback to local:", err);
      } finally {
        setIsLoadingSchedule(false);
      }
    };
    fetchSchedule();
  }, []);

  const activeDay = schedule.find(s => s.dayIndex === selectedDayIndex) || schedule[0] || {
    dayIndex: 1,
    dayName: "Day 1 (Monday)",
    title: "SSC CGL/CHSL Tier-1 All-Rounder (New Pattern 2026)",
    focusArea: "Full 4-Section Diagnostic Simulator",
    examTarget: "SSC CGL & CHSL 2026",
    patternTier: "Tier 1",
    questionCount: 25,
    durationMinutes: 60,
    totalMarks: 50,
    negativeMark: 0.50,
    description: "Complete balance across Reasoning, General Awareness, Quantitative Aptitude, and English Language strictly matching TCS/SSC 2026 blueprint.",
    topicsCovered: ["Analogy & Syllogism", "Indian Polity & 2026 Budget", "Percentages & Profit-Loss", "Grammar Error Spotting & Cloze"]
  };

  // Synchronize tier with active day default
  useEffect(() => {
    if (activeDay) {
      setSelectedTier(activeDay.patternTier);
      setSelectedCount(activeDay.questionCount);
    }
  }, [selectedDayIndex, schedule]);

  // Handle generation
  const handleGenerateMock = async () => {
    setIsGenerating(true);
    setGeneratedTest(null);

    // Simulated progress steps for AI feedback
    setGenerationStep("Analyzing SSC 2026 TCS exam syllabus and weightage...");
    const t1 = setTimeout(() => {
      setGenerationStep("Formulating new pattern bilingual questions & options...");
    }, 900);
    const t2 = setTimeout(() => {
      setGenerationStep("Synthesizing step-by-step Hindi & English solutions...");
    }, 1800);

    try {
      const response = await fetch('/api/ssc/generate-ai-mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dayIndex: activeDay.dayIndex,
          examType: selectedExam,
          patternTier: selectedTier,
          focusArea: activeDay.focusArea,
          language: selectedLanguage,
          questionCount: selectedCount
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const result = await response.json();
      if (result.success && result.test) {
        const testPayload: MockTest = {
          id: result.test.id,
          title: result.test.title,
          category: "SSC",
          durationMinutes: result.test.durationMinutes,
          questions: result.test.questions,
          totalMarks: result.test.totalMarks,
          negativeMark: result.test.negativeMark
        };

        setGeneratedTest(testPayload);

        // Update local saved 7-day tests map safely
        const updated = { ...savedDayTests, [activeDay.dayIndex]: testPayload };
        setSavedDayTests(updated);
        safeSetJSON('sarkari_ssc_ai_7day_mocks', updated);

        // Also add directly to the global mockTests state so it's accessible anywhere
        onAddMockTest(testPayload);
      } else {
        throw new Error(result.error || "Generation unsuccessful");
      }
    } catch (err: any) {
      console.error("AI Generation Error:", err);
      alert(`AI Mock Test Generation: ${err.message || 'Please check your connection and try again.'}`);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  const handleLaunchTest = (test: MockTest) => {
    // Add to global mock tests if not already there
    onAddMockTest(test);
    if (onStartCbtTest) {
      onStartCbtTest(test.id);
    } else if (onChangeTab) {
      onChangeTab('mock-tests');
    }
  };

  return (
    <div id="ssc-ai-mock-generator-container" className="space-y-6 animate-fadeIn pb-12">
      {/* 1. HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] text-white p-6 sm:p-8 border border-indigo-900/50 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              SSC 2026 NEW PATTERN AI ENGINE
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Daily 7-Day Rolling CBT Curriculum
            </span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              7-Day SSC New Pattern AI Mock Test Generator
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              नवीनतम SSC 2026 टीसीएस पैटर्न (तर्कशक्ति, सामान्य जागरूकता, गणित, अंग्रेज़ी व कंप्यूटर मॉड्यूल) के अनुसार हर रोज़ एक बिल्कुल नया, उच्च-सटीक द्विभाषी (Hindi & English) मॉक टेस्ट बनाएं और असली सीबीटी (CBT) माहौल में अभ्यास करें।
            </p>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-xs text-slate-400 font-medium">Daily Schedule</div>
              <div className="text-lg font-black text-amber-400">Day 1 to Day 7</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-xs text-slate-400 font-medium">Negative Marking</div>
              <div className="text-lg font-black text-rose-400">-0.50 / -1.00</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-xs text-slate-400 font-medium">Medium</div>
              <div className="text-lg font-black text-sky-400">Hindi + English</div>
            </div>
            <div className="p-3 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="text-xs text-slate-400 font-medium">CBT Engine</div>
              <div className="text-lg font-black text-emerald-400">Instant AI Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 7-DAY ROLLING CALENDAR BAR */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              7-Day Daily Study & Mock Test Track (साप्ताहिक अभ्यास चक्र)
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            Today is: <strong className="text-indigo-700">{schedule[currentDayIndex - 1]?.dayName || `Day ${currentDayIndex}`}</strong>
          </span>
        </div>

        {/* 7 Days Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {(schedule.length > 0 ? schedule : [
            { dayIndex: 1, dayName: "Day 1 (Mon)", title: "Tier-1 All-Rounder", focusArea: "4 Sections", patternTier: "Tier 1" },
            { dayIndex: 2, dayName: "Day 2 (Tue)", title: "Quant & Math", focusArea: "Arithmetic & DI", patternTier: "Tier 1" },
            { dayIndex: 3, dayName: "Day 3 (Wed)", title: "Reasoning", focusArea: "Critical Logic", patternTier: "Tier 1" },
            { dayIndex: 4, dayName: "Day 4 (Thu)", title: "GK & 2026 CA", focusArea: "Polity & Science", patternTier: "Tier 1" },
            { dayIndex: 5, dayName: "Day 5 (Fri)", title: "English Mastery", focusArea: "Vocab & Cloze", patternTier: "Tier 1" },
            { dayIndex: 6, dayName: "Day 6 (Sat)", title: "Tier-2 Speed Booster", focusArea: "Quant & Computer", patternTier: "Tier 2" },
            { dayIndex: 7, dayName: "Day 7 (Sun)", title: "All India Mega Mock", focusArea: "Full Simulator", patternTier: "Tier 1" }
          ]).map((day) => {
            const isSelected = selectedDayIndex === day.dayIndex;
            const isToday = currentDayIndex === day.dayIndex;
            const hasSaved = !!savedDayTests[day.dayIndex];

            return (
              <button
                key={day.dayIndex}
                id={`ssc-day-btn-${day.dayIndex}`}
                onClick={() => setSelectedDayIndex(day.dayIndex)}
                className={`relative flex flex-col p-3 rounded-2xl text-left transition-all duration-200 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-md ring-2 ring-indigo-400/40 scale-[1.02]'
                    : isToday
                    ? 'bg-amber-50 text-slate-800 border-amber-300 hover:border-amber-400'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {/* Today Badge */}
                {isToday && (
                  <span className={`absolute -top-2 -right-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs ${
                    isSelected ? 'bg-amber-400 text-slate-900' : 'bg-amber-500 text-white'
                  }`}>
                    Today
                  </span>
                )}

                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                    Day {day.dayIndex}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : day.patternTier === 'Tier 2' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {day.patternTier}
                  </span>
                </div>

                <div className={`text-xs font-bold line-clamp-2 leading-snug mb-2 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                  {day.title}
                </div>

                <div className="mt-auto flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-indigo-200' : 'text-slate-500'}>
                    {hasSaved ? '✓ Ready' : 'Generate'}
                  </span>
                  {hasSaved && (
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE DAY BLUEPRINT & CONFIGURATION CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details of Active Day & Generate Control */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Day {activeDay.dayIndex} Curriculum
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                    {activeDay.examTarget}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeDay.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {activeDay.description}
                </p>
              </div>

              <div className="flex flex-row sm:flex-col items-end gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Duration</div>
                  <div className="text-sm font-bold text-slate-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    {activeDay.durationMinutes} Mins
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-medium">Marking Scheme</div>
                  <div className="text-xs font-bold text-rose-600">
                    -{activeDay.negativeMark} Neg / Q
                  </div>
                </div>
              </div>
            </div>

            {/* Covered Topics in this Day's Pattern */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                Key Focus Topics Covered (शामिल किए गए विषय):
              </label>
              <div className="flex flex-wrap gap-2">
                {activeDay.topicsCovered?.map((topic, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-medium"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Customization Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                  Target SSC Examination:
                </label>
                <select
                  id="ssc-exam-select"
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="SSC CGL 2026">SSC CGL 2026 (Officer Posts)</option>
                  <option value="SSC CHSL 2026">SSC CHSL 2026 (10+2 Level)</option>
                  <option value="SSC MTS 2026">SSC MTS & Havaldar 2026</option>
                  <option value="SSC CPO 2026">SSC CPO (SI in Delhi Police/CAPF)</option>
                  <option value="SSC GD 2026">SSC GD Constable 2026</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                  Examination Tier & Pattern:
                </label>
                <select
                  id="ssc-tier-select"
                  value={selectedTier}
                  onChange={(e) => setSelectedTier(e.target.value as 'Tier 1' | 'Tier 2')}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Tier 1">Tier 1 (4 Sections, 60 Mins, -0.50)</option>
                  <option value="Tier 2">Tier 2 (High-Weightage + Computer, -1.00)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                  Questions Length:
                </label>
                <select
                  id="ssc-count-select"
                  value={selectedCount}
                  onChange={(e) => setSelectedCount(Number(e.target.value))}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={20}>20 High-Yield Sprint Questions</option>
                  <option value={25}>25 Questions (Standard Sectional)</option>
                  <option value={50}>50 Questions (Intensive Booster)</option>
                </select>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="pt-2">
              <button
                id="generate-ssc-ai-mock-btn"
                onClick={handleGenerateMock}
                disabled={isGenerating}
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 hover:from-indigo-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{generationStep || 'Generating SSC New Pattern AI Mock Test...'}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-amber-300" />
                    <span>Generate Day {activeDay.dayIndex} AI Mock Test ({selectedExam} New Pattern)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GENERATED TEST RESULT CARD (IF READY) */}
          {(generatedTest || savedDayTests[activeDay.dayIndex]) && (
            <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-3xl p-6 shadow-sm space-y-4">
              {(() => {
                const currentTest = generatedTest || savedDayTests[activeDay.dayIndex];
                return (
                  <>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/60 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-emerald-600 text-white text-[11px] font-bold rounded-full">
                            ✓ Ready for CBT Exam
                          </span>
                          <span className="text-xs font-semibold text-emerald-800">
                            {currentTest.questions.length} Questions Generated
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">
                          {currentTest.title}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          id="ssc-preview-paper-btn"
                          onClick={() => setPreviewOpen(!previewOpen)}
                          className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          {previewOpen ? 'Hide Paper' : 'Preview Paper'}
                        </button>

                        <button
                          id="ssc-launch-cbt-btn"
                          onClick={() => handleLaunchTest(currentTest)}
                          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow transition-colors flex items-center gap-1.5"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          Start CBT Exam Now
                        </button>
                      </div>
                    </div>

                    {/* Paper Preview Drawer */}
                    {previewOpen && (
                      <div className="bg-white rounded-2xl border border-slate-200 p-4 max-h-96 overflow-y-auto space-y-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold border-b pb-2">
                          <span>Bilingual Question Palette & Solutions</span>
                          <span>Negative Marking: -{currentTest.negativeMark}</span>
                        </div>
                        {currentTest.questions.map((q, qIdx) => (
                          <div key={q.id} className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                            <div className="flex items-center justify-between text-slate-500 font-medium">
                              <span className="font-bold text-indigo-700">Q{qIdx + 1} ({q.section || 'General'})</span>
                              <span>+{q.marks || 2} Marks</span>
                            </div>
                            <div className="font-semibold text-slate-800 whitespace-pre-wrap">
                              {q.text}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                              {q.options.map((opt, optIdx) => (
                                <div
                                  key={optIdx}
                                  className={`p-2 rounded-lg border text-[11px] ${
                                    optIdx === q.correctOptionIndex
                                      ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900'
                                      : 'bg-white border-slate-200 text-slate-700'
                                  }`}
                                >
                                  <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                                  {opt}
                                  {optIdx === q.correctOptionIndex && (
                                    <span className="ml-1 text-[10px] text-emerald-700 font-bold">(Correct)</span>
                                  )}
                                </div>
                              ))}
                            </div>
                            {q.explanation && (
                              <div className="mt-2 p-2 bg-indigo-50/70 rounded-lg text-[11px] text-indigo-950 leading-relaxed border border-indigo-100">
                                <strong>💡 Solution: </strong>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Right Col: 7-Day Curriculum Overview & Progress */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Brain className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Weekly 7-Day Mock Plan
              </h3>
            </div>

            <div className="space-y-3">
              {schedule.map((item) => {
                const isGenerated = !!savedDayTests[item.dayIndex];
                const isCurrent = currentDayIndex === item.dayIndex;

                return (
                  <div
                    key={item.dayIndex}
                    onClick={() => setSelectedDayIndex(item.dayIndex)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedDayIndex === item.dayIndex
                        ? 'bg-indigo-50 border-indigo-200 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">
                          {item.dayName.split(' ')[0]}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-amber-200 text-amber-900 rounded">
                            Today
                          </span>
                        )}
                      </div>

                      {isGenerated ? (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Ready
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">
                          Pending
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-medium text-slate-700 line-clamp-1">
                      {item.title}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                      <span>{item.focusArea}</span>
                      <span>{item.questionCount} Qs</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Action to Reset / Regenerate */}
            <div className="pt-2 border-t border-slate-100">
              <button
                id="reset-ssc-schedule-btn"
                onClick={() => {
                  if (confirm("Reset all stored 7-day mocks to regenerate fresh tests?")) {
                    setSavedDayTests({});
                    safeRemoveItem('sarkari_ssc_ai_7day_mocks');
                  }
                }}
                className="w-full py-2 text-center text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors"
              >
                Clear / Refresh 7-Day Saved Tests
              </button>
            </div>
          </div>

          {/* CBT Examination Info Box */}
          <div className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl border border-indigo-100 space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              SSC 2026 Examination Norms
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Tier-1:</strong> 4 Sections, 100 Qs / 200 Marks (60 Mins, -0.50 Neg).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>Tier-2:</strong> 3 Marks/Q with 1 Mark negative penalty & Computer qualifying module.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-indigo-600 font-bold">•</span>
                <span>All tests include full step-by-step Hindi & English bilingual explanations.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
