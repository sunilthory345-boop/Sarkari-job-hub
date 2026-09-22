import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, AlertTriangle, 
  HelpCircle, RefreshCw, FileText, ChevronRight, 
  ChevronLeft, BookOpen, Star, Sparkles, Download, Lock, Check, Minimize2, Video, Terminal,
  Zap, ArrowRight
} from 'lucide-react';
import { MockTest, UserProfile, Question } from '../types';
import CertificateModal from './CertificateModal';
import SscAiMockGenerator from './SscAiMockGenerator';
import AutoMockTestCreator from './AutoMockTestCreator';

interface MockTestPortalProps {
  mockTests: MockTest[];
  user: UserProfile;
  onSaveTestResult: (result: {
    testTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: string;
  }) => void;
  setPremiumModal: (open: boolean) => void;
  onChangeTab?: (tab: string) => void;
  initialActiveTestId?: string | null;
  onClearInitialActiveTestId?: () => void;
  onOpenAiDoubt?: (questionText: string) => void;
  onAddMockTest?: (newTest: MockTest) => void;
  triggerToast?: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  defaultView?: 'standard' | 'ssc-ai-generator' | 'auto-creator';
}

export default function MockTestPortal({ 
  mockTests, 
  user, 
  onSaveTestResult, 
  setPremiumModal,
  onChangeTab,
  initialActiveTestId,
  onClearInitialActiveTestId,
  onOpenAiDoubt,
  onAddMockTest,
  triggerToast,
  defaultView
}: MockTestPortalProps) {
  const [activePortalView, setActivePortalView] = useState<'standard' | 'ssc-ai-generator' | 'auto-creator'>(defaultView || 'auto-creator');
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [completedStats, setCompletedStats] = useState<{
    score: number;
    correct: number;
    wrong: number;
    skipped: number;
    timeSpentStr: string;
    percentage: number;
  } | null>(null);

  // CBT State Machine Management
  const [cbtInstructionsActive, setCbtInstructionsActive] = useState(false);
  const [cbtTermsAccepted, setCbtTermsAccepted] = useState(false);
  const [cbtViewLanguage, setCbtViewLanguage] = useState<'English' | 'Hindi'>('English');
  const [questionCBTStates, setQuestionCBTStates] = useState<Record<string, 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked_for_review'>>({});
  const [selectedDomainStream, setSelectedDomainStream] = useState<string>('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [examSearchQuery, setExamSearchQuery] = useState<string>('');

  // Active question filter by section
  const getExamSections = (testCategory: string = '') => {
    const cat = testCategory.toLowerCase();
    
    // Haryana Exams
    if (cat.includes('hssc') || (cat.includes('haryana') && cat.includes('cet'))) {
      return [
        { id: 'sec-1', label: 'हरियाणा सामान्य ज्ञान व संस्कृति (25% Weightage)', start: 0, end: 24 },
        { id: 'sec-2', label: 'सामान्य अध्ययन व विज्ञान (GS & Science)', start: 25, end: 49 },
        { id: 'sec-3', label: 'गणित व तार्किक क्षमता (Quant & Reasoning)', start: 50, end: 74 },
        { id: 'sec-4', label: 'सामान्य हिंदी, अंग्रेज़ी व कंप्यूटर (Languages & IT)', start: 75, end: 99 }
      ];
    }
    if (cat.includes('haryana') && cat.includes('police')) {
      return [
        { id: 'sec-1', label: 'हरियाणा ज्ञान व पुलिस अभिरुचि (Haryana GK & Aptitude)', start: 0, end: 24 },
        { id: 'sec-2', label: 'सामान्य ज्ञान व समसामयिकी (GS & Current Affairs)', start: 25, end: 49 },
        { id: 'sec-3', label: 'कृषि व पशुपालन विज्ञान (Agriculture & Animal Husbandry)', start: 50, end: 74 },
        { id: 'sec-4', label: 'संख्यात्मक योग्यता व तर्कशक्ति (Math & Reasoning)', start: 75, end: 99 }
      ];
    }
    if (cat.includes('hpsc') || cat.includes('hcs')) {
      return [
        { id: 'sec-1', label: 'General Studies & Indian Polity', start: 0, end: 34 },
        { id: 'sec-2', label: 'Haryana History, Economy & Heritage', start: 35, end: 69 },
        { id: 'sec-3', label: 'CSAT & Analytical Aptitude', start: 70, end: 99 }
      ];
    }

    // Bank Exams
    if (cat.includes('clerk')) {
      return [
        { id: 'sec-1', label: 'English Language', start: 0, end: 29 },
        { id: 'sec-2', label: 'Numerical Ability', start: 30, end: 64 },
        { id: 'sec-3', label: 'Reasoning Ability', start: 65, end: 99 }
      ];
    }
    if (cat.includes('rrb bank') || cat.includes('ibps rrb') || (cat.includes('rrb') && cat.includes('officer'))) {
      return [
        { id: 'sec-1', label: 'Reasoning Ability (तर्कशक्ति)', start: 0, end: 39 },
        { id: 'sec-2', label: 'Quantitative Aptitude (संख्यात्मक अभियोग्यता)', start: 40, end: 79 }
      ];
    }
    if (cat.includes('nabard')) {
      return [
        { id: 'sec-1', label: 'Economic & Social Issues (ESI) & Rural Dev (ARD)', start: 0, end: 34 },
        { id: 'sec-2', label: 'Quantitative Aptitude & Decision Making', start: 35, end: 64 },
        { id: 'sec-3', label: 'Reasoning Ability & Computer Awareness', start: 65, end: 99 }
      ];
    }
    if (cat.includes('bob') || cat.includes('baroda') || cat.includes('pnb') || cat.includes('punjab national') || cat.includes('union bank') || cat.includes('ubi') || cat.includes('canara') || cat.includes('specialist')) {
      return [
        { id: 'sec-1', label: 'Professional Knowledge & Banking Awareness', start: 0, end: 39 },
        { id: 'sec-2', label: 'Reasoning & Computer Aptitude', start: 40, end: 69 },
        { id: 'sec-3', label: 'Quantitative Aptitude & English Language', start: 70, end: 99 }
      ];
    }
    if (cat.includes('rbi')) {
      return [
        { id: 'sec-1', label: 'English Language', start: 0, end: 29 },
        { id: 'sec-2', label: 'Numerical Ability & DI', start: 30, end: 64 },
        { id: 'sec-3', label: 'Reasoning Ability & RBI Banking GK', start: 65, end: 99 }
      ];
    }
    if (cat.includes('sbi') || cat.includes('ibps') || cat.includes('bank') || cat.includes('clerk') || cat.includes('po')) {
      return [
        { id: 'sec-1', label: 'English Language (अंग्रेजी भाषा)', start: 0, end: 29 },
        { id: 'sec-2', label: 'Quantitative Aptitude & DI (गणित व डीआई)', start: 30, end: 64 },
        { id: 'sec-3', label: 'Reasoning Ability & Puzzles (तर्कशक्ति व पहेली)', start: 65, end: 99 }
      ];
    }

    // Railway Exams
    if (cat.includes('je') || cat.includes('junior engineer')) {
      return [
        { id: 'sec-1', label: 'Mathematics', start: 0, end: 29 },
        { id: 'sec-2', label: 'General Intelligence & Reasoning', start: 30, end: 54 },
        { id: 'sec-3', label: 'General Science (Physics/Chemistry)', start: 55, end: 84 },
        { id: 'sec-4', label: 'General Awareness', start: 85, end: 99 }
      ];
    }
    if (cat.includes('alp')) {
      return [
        { id: 'sec-1', label: 'Mathematics', start: 0, end: 19 },
        { id: 'sec-2', label: 'General Intelligence & Reasoning', start: 20, end: 44 },
        { id: 'sec-3', label: 'Basic Science & Engineering', start: 45, end: 64 },
        { id: 'sec-4', label: 'General Awareness', start: 65, end: 74 }
      ];
    }
    if (cat.includes('rpf') && (cat.includes('constable') || cat.includes('si'))) {
      return [
        { id: 'sec-1', label: 'General Awareness (सामान्य ज्ञान)', start: 0, end: 49 },
        { id: 'sec-2', label: 'Arithmetic (अंकगणित)', start: 50, end: 84 },
        { id: 'sec-3', label: 'General Intelligence & Reasoning (तर्कशक्ति)', start: 85, end: 119 }
      ];
    }
    if (cat.includes('group-d') || cat.includes('group d')) {
      return [
        { id: 'sec-1', label: 'General Science', start: 0, end: 24 },
        { id: 'sec-2', label: 'Mathematics', start: 25, end: 49 },
        { id: 'sec-3', label: 'General Intelligence & Reasoning', start: 50, end: 79 },
        { id: 'sec-4', label: 'General Awareness & CA', start: 80, end: 99 }
      ];
    }
    if (cat.includes('railway') || cat.includes('ntpc')) {
      return [
        { id: 'sec-1', label: 'General Awareness', start: 0, end: 39 },
        { id: 'sec-2', label: 'Mathematics', start: 40, end: 69 },
        { id: 'sec-3', label: 'General Intelligence & Reasoning', start: 70, end: 99 }
      ];
    }

    // Online & Teaching Exams
    if (cat.includes('dsssb')) {
      return [
        { id: 'sec-1', label: 'General Awareness', start: 0, end: 19 },
        { id: 'sec-2', label: 'General Intelligence & Reasoning', start: 20, end: 39 },
        { id: 'sec-3', label: 'Arithmetical & Numerical Ability', start: 40, end: 59 },
        { id: 'sec-4', label: 'General Hindi (सामान्य हिंदी)', start: 60, end: 79 },
        { id: 'sec-5', label: 'General English', start: 80, end: 99 }
      ];
    }
    if (cat.includes('ctet') || cat.includes('tet')) {
      return [
        { id: 'sec-1', label: 'Child Development & Pedagogy (बाल विकास)', start: 0, end: 29 },
        { id: 'sec-2', label: 'Mathematics & Environmental Studies (गणित व EVS)', start: 30, end: 59 },
        { id: 'sec-3', label: 'Language I (हिंदी शिक्षण)', start: 60, end: 79 },
        { id: 'sec-4', label: 'Language II (English Comprehension & Pedagogy)', start: 80, end: 99 }
      ];
    }
    if (cat.includes('police')) {
      return [
        { id: 'sec-1', label: 'General Hindi (सामान्य हिंदी)', start: 0, end: 24 },
        { id: 'sec-2', label: 'General Knowledge & Law (सामान्य ज्ञान व संविधान)', start: 25, end: 49 },
        { id: 'sec-3', label: 'Numerical & Mental Ability (संख्यात्मक योग्यता)', start: 50, end: 74 },
        { id: 'sec-4', label: 'Mental Aptitude & Reasoning (मानसिक अभिरुचि व तार्किक)', start: 75, end: 99 }
      ];
    }
    if (cat.includes('defense') || cat.includes('nda')) {
      return [
        { id: 'sec-1', label: 'English Comprehension', start: 0, end: 29 },
        { id: 'sec-2', label: 'General Science & Physics', start: 30, end: 59 },
        { id: 'sec-3', label: 'Mathematics & General Knowledge', start: 60, end: 99 }
      ];
    }
    if (cat.includes('upsc')) {
      return [
        { id: 'sec-1', label: 'History, Art & Culture', start: 0, end: 24 },
        { id: 'sec-2', label: 'Geography & Environment', start: 25, end: 49 },
        { id: 'sec-3', label: 'Indian Polity & Constitution', start: 50, end: 74 },
        { id: 'sec-4', label: 'Economy & IR', start: 75, end: 99 }
      ];
    }

    // SSC Exams
    if (cat.includes('steno')) {
      return [
        { id: 'sec-1', label: 'General Intelligence & Reasoning', start: 0, end: 24 },
        { id: 'sec-2', label: 'General Awareness', start: 25, end: 49 },
        { id: 'sec-3', label: 'English Language & Comprehension', start: 50, end: 99 }
      ];
    }
    if (cat.includes('mts')) {
      return [
        { id: 'sec-1', label: 'Session 1: Numerical Ability', start: 0, end: 24 },
        { id: 'sec-2', label: 'Session 1: Reasoning Ability', start: 25, end: 49 },
        { id: 'sec-3', label: 'Session 2: General Awareness', start: 50, end: 74 },
        { id: 'sec-4', label: 'Session 2: English Language', start: 75, end: 99 }
      ];
    }
    if (cat.includes('gd')) {
      return [
        { id: 'sec-1', label: 'General Intelligence & Reasoning', start: 0, end: 24 },
        { id: 'sec-2', label: 'General Knowledge & Awareness', start: 25, end: 49 },
        { id: 'sec-3', label: 'Elementary Mathematics', start: 50, end: 74 },
        { id: 'sec-4', label: 'Hindi / English Comprehension', start: 75, end: 99 }
      ];
    }
    // Default 4-section SSC CGL / CHSL / CPO pattern
    return [
      { id: 'Reasoning', label: 'General Intelligence & Reasoning', start: 0, end: 24 },
      { id: 'General Awareness', label: 'General Awareness', start: 25, end: 49 },
      { id: 'Quantitative Aptitude', label: 'Quantitative Aptitude', start: 50, end: 74 },
      { id: 'English Comprehension', label: 'English Comprehension', start: 75, end: 99 }
    ];
  };

  const getQuestionSection = (idx: number, totalQuestions: number, category: string = ''): string => {
    const sections = getExamSections(category);
    const matched = sections.find(sec => idx >= sec.start && idx <= sec.end);
    return matched ? matched.label : 'General Practice';
  };

  // For PYQ section
  const previousPapers = [
    { id: 'pyq-ssc-2025', title: 'SSC CGL General Awareness 2025 Solved Paper', year: 2025, exam: 'SSC', size: '2.4 MB', premium: false },
    { id: 'pyq-upsc-2025', title: 'UPSC Civil Services GS-1 2025 Question Booklet', year: 2025, exam: 'UPSC', size: '4.1 MB', premium: true },
    { id: 'pyq-rrb-2024', title: 'RRB NTPC General Science Chapter-wise PYQ', year: 2024, exam: 'Railway', size: '1.8 MB', premium: false },
    { id: 'pyq-bank-2025', title: 'IBPS PO Reasoning Sectional 5-Year compiled PDF', year: 2025, exam: 'Bank', size: '5.2 MB', premium: true }
  ];

  // Timer logic
  useEffect(() => {
    if (!isTestRunning || timeLeft <= 0 || cbtInstructionsActive) {
      if (timeLeft === 0 && isTestRunning && !cbtInstructionsActive) {
        handleAutoSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTestRunning, cbtInstructionsActive]);

  const handleStartTest = (test: MockTest) => {
    setActiveTest(test);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    
    // Create initial state for CBT palette
    const initialStates: Record<string, 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked_for_review'> = {};
    test.questions.forEach((q, idx) => {
      initialStates[q.id] = idx === 0 ? 'not_answered' : 'not_visited';
    });
    setQuestionCBTStates(initialStates);
    
    setTimeLeft(test.durationMinutes * 60);
    
    // Enable CBT Instructions for grand mock
    if (test.questions.length >= 25) {
      setCbtInstructionsActive(true);
      setCbtTermsAccepted(false);
    } else {
      setCbtInstructionsActive(false);
    }
    
    setIsTestRunning(true);
    setTestCompleted(false);
    setCompletedStats(null);
  };

  useEffect(() => {
    if (initialActiveTestId) {
      const matched = mockTests.find(t => t.id === initialActiveTestId);
      if (matched) {
        handleStartTest(matched);
      }
      if (onClearInitialActiveTestId) {
        onClearInitialActiveTestId();
      }
    }
  }, [initialActiveTestId, mockTests]);

  const navigateToQuestion = (idx: number) => {
    if (!activeTest) return;
    const currentQ = activeTest.questions[currentQuestionIdx];
    const targetQ = activeTest.questions[idx];

    setQuestionCBTStates(prev => {
      const updated = { ...prev };
      // If previous question was visited but still marked unvisited/not_answered, evaluate
      if (updated[currentQ.id] === 'not_visited') {
        updated[currentQ.id] = 'not_answered';
      }
      // Target question becomes not_answered if it was not_visited
      if (updated[targetQ.id] === 'not_visited') {
        updated[targetQ.id] = 'not_answered';
      }
      return updated;
    });

    setCurrentQuestionIdx(idx);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSaveAndNext = () => {
    if (!activeTest) return;
    const currentQ = activeTest.questions[currentQuestionIdx];
    const hasAnswer = selectedAnswers[currentQ.id] !== undefined;

    setQuestionCBTStates(prev => ({
      ...prev,
      [currentQ.id]: hasAnswer ? 'answered' : 'not_answered'
    }));

    if (currentQuestionIdx < activeTest.questions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      const nextQ = activeTest.questions[nextIdx];
      setQuestionCBTStates(prev => {
        const updated = { ...prev };
        if (updated[nextQ.id] === 'not_visited') {
          updated[nextQ.id] = 'not_answered';
        }
        return updated;
      });
      setCurrentQuestionIdx(nextIdx);
    }
  };

  const handleMarkForReviewAndNext = () => {
    if (!activeTest) return;
    const currentQ = activeTest.questions[currentQuestionIdx];
    const hasAnswer = selectedAnswers[currentQ.id] !== undefined;

    setQuestionCBTStates(prev => ({
      ...prev,
      [currentQ.id]: hasAnswer ? 'answered_marked_for_review' : 'marked_for_review'
    }));

    if (currentQuestionIdx < activeTest.questions.length - 1) {
      const nextIdx = currentQuestionIdx + 1;
      const nextQ = activeTest.questions[nextIdx];
      setQuestionCBTStates(prev => {
        const updated = { ...prev };
        if (updated[nextQ.id] === 'not_visited') {
          updated[nextQ.id] = 'not_answered';
        }
        return updated;
      });
      setCurrentQuestionIdx(nextIdx);
    }
  };

  const handleClearResponse = () => {
    if (!activeTest) return;
    const currentQ = activeTest.questions[currentQuestionIdx];

    setSelectedAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });

    setQuestionCBTStates(prev => ({
      ...prev,
      [currentQ.id]: 'not_answered'
    }));
  };

  const handleAutoSubmit = () => {
    if (!activeTest) return;

    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    activeTest.questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === undefined) {
        skipped++;
      } else if (selected === q.correctOptionIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const marksPerQuestion = 2; // CGL tier 1 offers +2 marks per correct answer
    const rawScore = correct * marksPerQuestion;
    const penalty = wrong * activeTest.negativeMark;
    const finalScore = Number((rawScore - penalty).toFixed(2));
    
    const timeSpentSecs = (activeTest.durationMinutes * 60) - timeLeft;
    const minsSpent = Math.floor(timeSpentSecs / 60);
    const secsSpent = timeSpentSecs % 60;
    const timeSpentStr = `${minsSpent}m ${secsSpent}s`;

    const totalPossibleMarks = activeTest.questions.length * marksPerQuestion;
    const percentage = Number(((finalScore / totalPossibleMarks) * 100).toFixed(1));

    setCompletedStats({
      score: finalScore,
      correct,
      wrong,
      skipped,
      timeSpentStr,
      percentage
    });

    setIsTestRunning(false);
    setTestCompleted(true);

    // Persist result on dashboard
    onSaveTestResult({
      testTitle: activeTest.title,
      score: finalScore,
      totalQuestions: activeTest.questions.length,
      correctAnswers: correct,
      timeTaken: timeSpentStr
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Counting state palettes
  const getCBTStateCount = (stateType: 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked_for_review') => {
    if (!activeTest) return 0;
    return Object.values(questionCBTStates).filter(s => s === stateType).length;
  };

  return (
    <div className="space-y-8" id="mock-test-portal-root">
      
      {!isTestRunning && !testCompleted ? (
        // ==========================================
        // 1. TEST SELECTION PANEL
        // ==========================================
        <div className="grid gap-6 md:grid-cols-12 animate-fadeIn">
          
          <div className="md:col-span-8 space-y-6">
            {/* View Switcher Tabs: Auto Creator vs Standard vs SSC 7-Day AI Mock Generator */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-xs">
              <button
                id="portal-view-auto-creator-btn"
                onClick={() => setActivePortalView('auto-creator')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activePortalView === 'auto-creator'
                    ? 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white shadow-md'
                    : 'text-indigo-700 hover:bg-indigo-50/80 font-bold'
                }`}
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>🎯 Auto Mock Creator (All Exams)</span>
              </button>

              <button
                id="portal-view-standard-btn"
                onClick={() => setActivePortalView('standard')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activePortalView === 'standard'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>All Commission Mocks ({mockTests.length})</span>
              </button>

              <button
                id="portal-view-ssc-ai-btn"
                onClick={() => setActivePortalView('ssc-ai-generator')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activePortalView === 'ssc-ai-generator'
                    ? 'bg-gradient-to-r from-slate-800 to-indigo-950 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>🤖 SSC 7-Day AI Schedule</span>
              </button>
            </div>

            {activePortalView === 'auto-creator' ? (
              <AutoMockTestCreator
                user={user}
                onAddMockTest={(newTest) => {
                  if (onAddMockTest) onAddMockTest(newTest);
                }}
                onStartCbtTest={(testId) => {
                  const targetTest = mockTests.find(t => t.id === testId);
                  if (targetTest) {
                    handleStartTest(targetTest);
                  }
                }}
                triggerToast={triggerToast}
              />
            ) : activePortalView === 'ssc-ai-generator' ? (
              <SscAiMockGenerator
                user={user}
                onAddMockTest={(newTest) => {
                  if (onAddMockTest) onAddMockTest(newTest);
                }}
                onStartCbtTest={(testId) => {
                  const targetTest = mockTests.find(t => t.id === testId);
                  if (targetTest) {
                    handleStartTest(targetTest);
                  }
                }}
                onChangeTab={onChangeTab}
              />
            ) : (
              <>
                {/* Quick Auto-Creator Callout Banner */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">⚡ Need an Auto-Created Mock Test for Your Exam?</span>
                      <span className="text-slate-600 block text-xs mt-0.5">Generate bilingual tests for SSC CGL/CHSL, Banking IBPS/SBI, Railway NTPC/ALP, Army Agniveer GD, UP Police according to official 2026 syllabus.</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePortalView('auto-creator')}
                    className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Auto-Create Mock Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="rounded-2xl border border-blue-50 bg-white p-5 shadow-xs">
              <h3 className="font-sans text-base font-bold text-slate-900 mb-1">
                ⚡ Interactive Exam Mock Hub
              </h3>
              <p className="font-sans text-xs text-slate-500 mb-4">
                Test your knowledge in real-time under custom commission test parameters (with negative marking!).
              </p>

              {onChangeTab && (
                <div className="mb-5 bg-blue-50/50 border border-blue-100 rounded-xl p-3.5 flex items-center justify-between gap-4 text-xs font-sans">
                  <div>
                    <span className="font-bold text-blue-900 block">Want to make your own custom playable test?</span>
                    <span className="text-slate-500 block text-[11px] mt-0.5">Drag-and-drop questions in JSON/TXT format to launch mock series.</span>
                  </div>
                  <button
                    onClick={() => onChangeTab('uploads')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg text-[11px] shrink-0 transition"
                  >
                    Upload mock +
                  </button>
                </div>
              )}

              {/* Domain Streams & Category Filters (परीक्षा संवर्ग व ऑनलाइन CBT फिल्टर) */}
              <div className="mb-6 space-y-3.5 border-b border-slate-100 pb-5">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={examSearchQuery}
                    onChange={(e) => setExamSearchQuery(e.target.value)}
                    placeholder="🔍 Search mock tests (e.g., 'Haryana', 'HSSC', 'Clerk', 'JE', 'Bank', 'NTPC', 'CGL', 'Police')..."
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-3.5 pr-8 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  />
                  {examSearchQuery && (
                    <button
                      onClick={() => setExamSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Stream Tabs */}
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Select Exam Domain (परीक्षा वर्ग चुनें):</span>
                    <span className="text-blue-600 font-semibold lowercase">
                      {mockTests.length}+ CBT Mocks Loaded
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'All', label: 'All Exams (सभी परीक्षाएं)', icon: '📚' },
                      { id: 'SSC', label: 'SSC New Pattern 2026', icon: '🏛️' },
                      { id: 'Railway', label: 'Railway Exams', icon: '🚆' },
                      { id: 'Bank', label: 'Bank Exams', icon: '🏦' },
                      { id: 'Haryana', label: 'Haryana Exams', icon: '🌾' },
                      { id: 'OnlineCBT', label: 'Online Central/State CBT', icon: '🌐' }
                    ].map((dom) => {
                      const isSel = selectedDomainStream === dom.id;
                      return (
                        <button
                          key={dom.id}
                          onClick={() => {
                            setSelectedDomainStream(dom.id);
                            setSelectedCategoryFilter('All');
                          }}
                          className={`text-xs px-3 py-1.5 rounded-xl font-bold transition duration-150 border flex items-center gap-1.5 ${
                            isSel
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{dom.icon}</span>
                          <span>{dom.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sub-Pills for Specific Exam in Active Domain */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button
                    onClick={() => setSelectedCategoryFilter('All')}
                    className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition border ${
                      selectedCategoryFilter === 'All'
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    All in {selectedDomainStream === 'All' ? 'Every Category' : selectedDomainStream}
                  </button>

                  {/* Dynamic sub-pills depending on selectedDomainStream */}
                  {selectedDomainStream === 'Haryana' && [
                    { id: 'HSSC CET Group C & D Exam Prep', label: 'HSSC CET (25% Haryana GK)' },
                    { id: 'Haryana Police Constable Exam Prep', label: 'Haryana Police Constable' },
                    { id: 'HPSC HCS Haryana Civil Services Prep', label: 'HPSC HCS (Haryana Civil Services)' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategoryFilter(sub.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition border ${
                        selectedCategoryFilter === sub.id
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}

                  {selectedDomainStream === 'Bank' && [
                    { id: 'IBPS PO Exam Prep', label: 'IBPS PO (3,955 Posts)' },
                    { id: 'IBPS Clerk Exam Prep', label: 'IBPS Clerk' },
                    { id: 'SBI PO Exam Prep', label: 'SBI PO' },
                    { id: 'SBI Clerk Exam Prep', label: 'SBI Clerk (8,773 Posts)' },
                    { id: 'Bank of Baroda (BOB) Exam Prep', label: 'Bank of Baroda (BOB)' },
                    { id: 'Punjab National Bank (PNB) Exam Prep', label: 'Punjab National Bank (PNB)' },
                    { id: 'Union Bank of India (UBI) Exam Prep', label: 'Union Bank of India (UBI)' },
                    { id: 'Canara Bank Exam Prep', label: 'Canara Bank' },
                    { id: 'Central Bank of India (CBI) Exam Prep', label: 'Central Bank (CBI)' },
                    { id: 'IBPS RRB Officer & Assistant Prep', label: 'IBPS RRB Gramin Bank (9,923 Posts)' },
                    { id: 'RBI Assistant & Grade B Prep', label: 'RBI Assistant & Grade B' },
                    { id: 'NABARD Grade A Officer Prep', label: 'NABARD Grade A' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategoryFilter(sub.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition border ${
                        selectedCategoryFilter === sub.id
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}

                  {selectedDomainStream === 'Railway' && [
                    { id: 'RRB NTPC Exam Prep', label: 'RRB NTPC' },
                    { id: 'RRB ALP Exam Prep', label: 'RRB ALP & Tech' },
                    { id: 'Railway Group-D Exam Prep', label: 'Group D (Level-1)' },
                    { id: 'RRB JE Railway Exam Prep', label: 'RRB JE (Junior Eng.)' },
                    { id: 'Railway RPF SI Exam Prep', label: 'RPF SI' },
                    { id: 'Railway RPF Constable Exam Prep', label: 'RPF Constable' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategoryFilter(sub.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition border ${
                        selectedCategoryFilter === sub.id
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}

                  {selectedDomainStream === 'SSC' && [
                    { id: 'SSC CGL Exam Prep', label: 'SSC CGL Tier-1' },
                    { id: 'SSC CHSL Exam Prep', label: 'SSC CHSL (10+2)' },
                    { id: 'SSC MTS Exam Prep', label: 'SSC MTS & Havaldar' },
                    { id: 'SSC GD Exam Prep', label: 'SSC GD Constable' },
                    { id: 'SSC CPO SI Exam Prep', label: 'SSC CPO (Delhi Police)' },
                    { id: 'SSC Stenographer Exam Prep', label: 'SSC Stenographer' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategoryFilter(sub.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition border ${
                        selectedCategoryFilter === sub.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}

                  {selectedDomainStream === 'OnlineCBT' && [
                    { id: 'DSSSB General & Teaching CBT Mock', label: 'DSSSB Teaching & Non-Teaching' },
                    { id: 'CTET & State TET Online CBT Mock', label: 'CTET & State TET' },
                    { id: 'UP Police Exam Prep', label: 'UP Police Constable & SI' },
                    { id: 'Defense NDA Exam Prep', label: 'Defense NDA / CDS' },
                    { id: 'UPSC Civil Services Prep', label: 'UPSC CSE (IAS)' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategoryFilter(sub.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition border ${
                        selectedCategoryFilter === sub.id
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}

                  {selectedDomainStream === 'All' && [
                    { id: 'SSC CGL Exam Prep', label: 'SSC CGL' },
                    { id: 'HSSC CET Group C & D Exam Prep', label: 'HSSC CET (Haryana)' },
                    { id: 'Haryana Police Constable Exam Prep', label: 'Haryana Police' },
                    { id: 'IBPS PO Exam Prep', label: 'IBPS PO' },
                    { id: 'IBPS Clerk Exam Prep', label: 'Bank Clerk' },
                    { id: 'RRB NTPC Exam Prep', label: 'RRB NTPC' },
                    { id: 'RRB JE Railway Exam Prep', label: 'RRB JE' },
                    { id: 'DSSSB General & Teaching CBT Mock', label: 'DSSSB CBT' },
                    { id: 'CTET & State TET Online CBT Mock', label: 'CTET' }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategoryFilter(sub.id)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg font-semibold transition border ${
                        selectedCategoryFilter === sub.id
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* BANKING SYLLABUS & EXAM PATTERN BANNER */}
              {(selectedDomainStream === 'Bank' || 
                selectedCategoryFilter.toLowerCase().includes('bank') || 
                selectedCategoryFilter.toLowerCase().includes('ibps') || 
                selectedCategoryFilter.toLowerCase().includes('sbi') || 
                selectedCategoryFilter.toLowerCase().includes('rbi') || 
                selectedCategoryFilter.toLowerCase().includes('bob') || 
                selectedCategoryFilter.toLowerCase().includes('pnb')) && (
                <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 text-white rounded-2xl p-5 border border-indigo-500/30 shadow-lg relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-700/50 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Official IBPS / SBI / PSB Pattern
                        </span>
                        <span className="text-xs text-indigo-200 font-medium">
                          Banking Recruitment 2026
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        🏦 Banking Syllabus & CBT Mock Test System (बैंकिंग पाठ्यक्रम व परीक्षा पैटर्न)
                      </h4>
                      <p className="text-xs text-indigo-200 mt-0.5">
                        Aligned with latest notifications: Bank of Baroda (BOB), Punjab National Bank (PNB), IBPS PO/Clerk, SBI, RBI, and RRB.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedDomainStream('Bank')}
                        className="text-xs font-semibold px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition shadow-sm"
                      >
                        All Bank Mocks
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-indigo-950/60 border border-indigo-700/40 rounded-xl p-3">
                      <div className="flex items-center justify-between font-bold text-indigo-300 mb-1">
                        <span>1. English Language</span>
                        <span className="bg-indigo-500/20 text-indigo-200 px-1.5 py-0.5 rounded text-[10px]">30 Qs • 20 Min</span>
                      </div>
                      <p className="text-indigo-100/80 text-[11px] leading-relaxed">
                        Reading Comprehension (Financial/ESG), Cloze Test, Double Fillers, Error Detection (Grammar concord), Phrase Replacement.
                      </p>
                    </div>

                    <div className="bg-indigo-950/60 border border-indigo-700/40 rounded-xl p-3">
                      <div className="flex items-center justify-between font-bold text-emerald-300 mb-1">
                        <span>2. Quantitative Aptitude & DI</span>
                        <span className="bg-emerald-500/20 text-emerald-200 px-1.5 py-0.5 rounded text-[10px]">35 Qs • 20 Min</span>
                      </div>
                      <p className="text-emerald-100/80 text-[11px] leading-relaxed">
                        Bar/Pie/Caselet DI, Quadratic Equations (x vs y), Missing/Wrong Number Series, CI/SI Difference, Time & Work, Speed.
                      </p>
                    </div>

                    <div className="bg-indigo-950/60 border border-indigo-700/40 rounded-xl p-3">
                      <div className="flex items-center justify-between font-bold text-amber-300 mb-1">
                        <span>3. Reasoning Ability & Puzzles</span>
                        <span className="bg-amber-500/20 text-amber-200 px-1.5 py-0.5 rounded text-[10px]">35 Qs • 20 Min</span>
                      </div>
                      <p className="text-amber-100/80 text-[11px] leading-relaxed">
                        Circular/Linear Seating, Floor/Box Puzzles, "Only a few" Syllogisms, Coded Inequalities, Direction Sense & Blood Relations.
                      </p>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-indigo-800/40 flex flex-wrap items-center justify-between gap-2 text-[11px] text-indigo-200">
                    <div className="flex items-center gap-3">
                      <span>⚖️ <strong>Negative Marking:</strong> 0.25 (1/4th) per wrong MCQ</span>
                      <span>⏱️ <strong>Sectional Timing:</strong> 20 Mins strictly per section in Prelims</span>
                    </div>
                    <div className="font-semibold text-amber-300">
                      🎯 Specialist Officers (BOB/PNB): Includes 40 Qs Professional Knowledge + Banking Awareness
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {mockTests
                  .filter((t, index, self) => {
                    // Deduplicate
                    if (index !== self.findIndex(o => o.id === t.id)) return false;

                    // Domain stream filtering
                    if (selectedDomainStream === 'SSC' && !t.category.toLowerCase().includes('ssc')) return false;
                    if (selectedDomainStream === 'Railway' && !(t.category.toLowerCase().includes('railway') || t.category.toLowerCase().includes('rrb') || t.category.toLowerCase().includes('rpf'))) return false;
                    if (selectedDomainStream === 'Bank' && !(t.category.toLowerCase().includes('bank') || t.category.toLowerCase().includes('ibps') || t.category.toLowerCase().includes('sbi') || t.category.toLowerCase().includes('rbi') || t.category.toLowerCase().includes('bob') || t.category.toLowerCase().includes('pnb') || t.category.toLowerCase().includes('baroda') || t.category.toLowerCase().includes('union') || t.category.toLowerCase().includes('canara') || t.category.toLowerCase().includes('nabard') || t.category.toLowerCase().includes('cbi'))) return false;
                    if (selectedDomainStream === 'Haryana' && !(t.category.toLowerCase().includes('haryana') || t.category.toLowerCase().includes('hssc') || t.category.toLowerCase().includes('hpsc') || t.category.toLowerCase().includes('hcs'))) return false;
                    if (selectedDomainStream === 'OnlineCBT' && !(t.category.toLowerCase().includes('dsssb') || t.category.toLowerCase().includes('ctet') || t.category.toLowerCase().includes('police') || t.category.toLowerCase().includes('defense') || t.category.toLowerCase().includes('nda') || t.category.toLowerCase().includes('upsc'))) return false;

                    // Category filter
                    if (selectedCategoryFilter !== 'All') {
                      const filterKey = selectedCategoryFilter.toLowerCase().replace('exam prep', '').replace('prep', '').trim();
                      const catKey = t.category.toLowerCase();
                      const titleKey = t.title.toLowerCase();
                      if (t.category !== selectedCategoryFilter && !catKey.includes(filterKey) && !titleKey.includes(filterKey)) {
                        return false;
                      }
                    }

                    // Search query filtering
                    if (examSearchQuery.trim()) {
                      const q = examSearchQuery.toLowerCase();
                      const matchTitle = t.title.toLowerCase().includes(q);
                      const matchCat = t.category.toLowerCase().includes(q);
                      if (!matchTitle && !matchCat) return false;
                    }

                    return true;
                  })
                  .map((test, idx) => (
                  <div 
                    key={`${test.id}-${idx}`}
                    className="group border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-200 hover:bg-slate-50/50 transition duration-200"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-800">
                          {test.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium font-mono">
                          {test.questions.length} Items MCQ (बहुविकल्पीय)
                        </span>
                        {test.questions.length >= 100 && (
                          <span className="inline-block rounded-full bg-red-100 text-red-800 px-2 py-0.5 text-[10px] font-extrabold border border-red-200 animate-pulse">
                            🔥 Real CBT Exam Engine ({test.questions.length} Qs)
                          </span>
                        )}
                      </div>
                      <h4 className="font-sans text-sm font-bold text-slate-800 mt-2 group-hover:text-blue-600 transition">
                        {test.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {test.durationMinutes} minutes
                        </span>
                        <span>•</span>
                        <span className="text-rose-600 font-semibold italic">
                          -{test.negativeMark} Negative Marking
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartTest(test)}
                      className="rounded-xl bg-blue-600 py-2.5 px-5 text-xs font-bold text-white shadow-xs hover:bg-blue-750 transition duration-150 transform hover:-translate-y-0.5 shrink-0"
                    >
                      Begin Assessment
                    </button>
                  </div>
                ))}

                {mockTests.filter((t, index, self) => {
                  if (index !== self.findIndex(o => o.id === t.id)) return false;
                  if (selectedDomainStream === 'SSC' && !t.category.toLowerCase().includes('ssc')) return false;
                  if (selectedDomainStream === 'Railway' && !(t.category.toLowerCase().includes('railway') || t.category.toLowerCase().includes('rrb') || t.category.toLowerCase().includes('rpf'))) return false;
                  if (selectedDomainStream === 'Bank' && !(t.category.toLowerCase().includes('bank') || t.category.toLowerCase().includes('ibps') || t.category.toLowerCase().includes('sbi') || t.category.toLowerCase().includes('rbi') || t.category.toLowerCase().includes('bob') || t.category.toLowerCase().includes('pnb') || t.category.toLowerCase().includes('baroda'))) return false;
                  if (selectedDomainStream === 'Haryana' && !(t.category.toLowerCase().includes('haryana') || t.category.toLowerCase().includes('hssc') || t.category.toLowerCase().includes('hpsc') || t.category.toLowerCase().includes('hcs'))) return false;
                  if (selectedDomainStream === 'OnlineCBT' && !(t.category.toLowerCase().includes('dsssb') || t.category.toLowerCase().includes('ctet') || t.category.toLowerCase().includes('police') || t.category.toLowerCase().includes('defense') || t.category.toLowerCase().includes('nda') || t.category.toLowerCase().includes('upsc'))) return false;
                  if (selectedCategoryFilter !== 'All' && t.category !== selectedCategoryFilter) return false;
                  if (examSearchQuery.trim()) {
                    const q = examSearchQuery.toLowerCase();
                    if (!t.title.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false;
                  }
                  return true;
                }).length === 0 && (
                  <div className="text-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                    <p className="text-sm font-bold text-slate-700">No mock tests found matching your criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the domain filter or search query</p>
                    <button
                      onClick={() => {
                        setSelectedDomainStream('All');
                        setSelectedCategoryFilter('All');
                        setExamSearchQuery('');
                      }}
                      className="mt-3 px-3.5 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Previous Year Papers */}
            <div className="rounded-2xl border border-blue-50 bg-white p-5 shadow-xs">
              <h3 className="font-sans text-base font-bold text-slate-900 mb-1">
                📚 Previous Year Question Papers (PYQs)
              </h3>
              <p className="font-sans text-xs text-slate-500 mb-4">
                Review verified solved question papers compiled from major central and state exams.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {previousPapers.map((paper) => (
                  <div key={paper.id} className="rounded-xl border border-slate-100 p-3.5 space-y-3 relative overflow-hidden bg-slate-50/30">
                    <div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase">
                        {paper.exam} Exam
                      </span>
                      <h5 className="font-sans text-xs font-bold text-slate-800 line-clamp-2 mt-2 leading-snug">
                        {paper.title}
                      </h5>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100/50">
                      <span className="text-slate-400 font-medium font-mono">{paper.size}</span>
                      {paper.premium && !user.premiumUser ? (
                        <button
                          onClick={() => setPremiumModal(true)}
                          className="text-xs text-amber-600 font-bold flex items-center gap-1 hover:underline"
                        >
                          <Lock className="h-3.5 w-3.5 text-amber-500" /> Premium lock
                        </button>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`File "${paper.title}" download triggered! Saved PDF to downloads.`);
                          }}
                          className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" /> Get Solved PDF
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </>
            )}
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="rounded-2xl border border-blue-50 bg-gradient-to-b from-blue-900 to-indigo-950 p-5 text-white shadow-lg">
              <h4 className="font-sans text-sm font-extrabold flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-amber-300 animate-pulse" />
                Sarkari Hub Leaderboard
              </h4>
              <p className="font-sans text-xs text-blue-200 mt-1">
                Your ranking compared to all online aspirants in simulated test mock series.
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                  <span className="font-sans font-semibold font-mono">🏆 Rank 1: Pankaj K.</span>
                  <span className="font-mono text-amber-300">188.5 Marks (94.2%)</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                  <span className="font-sans font-medium text-slate-200">2: Shreya J.</span>
                  <span className="font-mono text-slate-300">181.0 Marks</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                  <span className="font-sans text-slate-200">3: Rohit Raj</span>
                  <span className="font-mono text-slate-300">176.4 Marks</span>
                </div>
                <div className="flex justify-between items-center bg-blue-500/10 p-2 rounded-lg border border-blue-400/20">
                  <span className="font-sans font-bold text-amber-100">You ({user.name.split(' ')[0]})</span>
                  <span className="font-mono text-amber-200">
                    {user.testHistory.length > 0 
                      ? `${user.testHistory[0].score} Marks` 
                      : 'Not Attempted'}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 text-slate-600 space-y-3 text-xs leading-relaxed">
              <h4 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <HelpCircle className="h-4 w-4 text-blue-600" />
                Assessment Instructions
              </h4>
              <p>1. Clicking 'Begin Assessment' locks your session and launches the test parameters.</p>
              <p>2. For 100-Question tests, you will see a detailed TCS CBT panel showing your question statuses.</p>
              <p>3. **Negative Marking Rules**: Unanswered questions incur 0 points. Selecting a wrong option deducts 0.50 marks.</p>
              <p>4. Upon completion, a comprehensive answer key worksheet with detailed bilingual answer summaries loaded.</p>
            </div>
          </div>
        </div>
      ) : isTestRunning && activeTest && cbtInstructionsActive ? (
        // ==========================================
        // 2. TCS iON CODES / CBT PROTOCOL INSTRUCTIONS SCREEN
        // ==========================================
        <div className="bg-[#f4f4f4] border border-slate-300 rounded-3xl p-4 md:p-6 shadow-2xl font-sans max-w-5xl mx-auto animate-fadeIn text-slate-800">
          
          {/* Header */}
          <div className="bg-slate-200 border border-slate-300 rounded-2xl p-4 flex justify-between items-center gap-4 mb-4">
            <div>
              <h2 className="text-base font-extrabold tracking-tight text-[#0F172A] uppercase flex items-center gap-1.5 font-mono">
                <Terminal className="h-5 w-5 text-blue-600 shrink-0" />
                TCS iON CBT Exam Terminal - Candidate Instructions
              </h2>
              <span className="text-xs text-slate-500 font-semibold block mt-0.5">Please read the instructions carefully before entering the examination environment.</span>
            </div>
            <div className="bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-300 text-xs text-right font-mono font-extrabold hidden md:block">
              Language / भाषा: <span className="text-blue-700">Bilingual (हिन्दी/English)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            
            {/* Left instructions block */}
            <div className="md:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 overflow-y-auto max-h-[460px] space-y-4 text-xs leading-relaxed text-slate-700 font-sans shadow-xs">
              <h3 className="font-bold text-slate-900 border-b pb-2 text-sm">General Instructions / सामान्य निर्देश:</h3>
              
              <div className="space-y-2">
                <p className="font-bold text-[#1E3A8A]">1. Total duration of examination is 60 minutes. / परीक्षा की कुल अवधि 60 मिनट है।</p>
                <p>2. The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the exam. / घड़ी को सर्वर पर सेट किया गया है। स्क्रीन के शीर्ष पर दाईं ओर उल्टी गिनती घड़ी परीक्षा पूरी करने के लिए बचा हुआ समय दिखाएगी।</p>
              </div>

              <h4 className="font-bold text-slate-900 pt-2 border-b pb-1">Question Status Palette / प्रश्न की स्थिति रंग पैलेट:</h4>
              <p>The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols / स्क्रीन के दाईं ओर प्रदर्शित प्रश्न पैलेट प्रत्येक प्रश्न की स्थिति को दर्शाता है:</p>

              <div className="space-y-3 pl-2 pt-1.5">
                <div className="flex items-center gap-3">
                  <span className="h-6 w-8 bg-[#f1f5f9] border border-slate-350 rounded-sm flex items-center justify-center font-bold font-mono text-[10px] text-slate-600">1</span>
                  <span><strong>Not Visited / अभी तक नहीं देखा:</strong> You have not visited the question yet. / आपने इस प्रश्न को अभी तक नहीं देखा है।</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-6 w-8 bg-[#EF4444] border border-[#DC2626] rounded-t-sm rounded-b-lg flex items-center justify-center font-bold font-mono text-[10px] text-white">2</span>
                  <span><strong>Not Answered / उत्तर नहीं दिया:</strong> You have visited but not answered. / आपने प्रश्न देखा है लेकिन उसका उत्तर नहीं दिया है।</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-6 w-8 bg-[#10B981] border border-[#059669] rounded-b-sm rounded-t-lg flex items-center justify-center font-bold font-mono text-[10px] text-white">3</span>
                  <span><strong>Answered / उत्तर दिया गया:</strong> You have answered the question. / आपने इस प्रश्न का उत्तर दे दिया है।</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="h-6 w-6 bg-[#8B5CF6] rounded-full flex items-center justify-center font-bold font-mono text-[10px] text-white">4</span>
                  <span><strong>Marked for Review / समीक्षा के लिए चिह्नित:</strong> You have marked for review without choosing option. / आपने विकल्प चुने बिना समीक्षा के लिए चिह्नित किया है।</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative h-6 w-6">
                    <span className="h-6 w-6 bg-[#8B5CF6] rounded-full flex items-center justify-center font-bold font-mono text-[10px] text-white">5</span>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-[#10B981] rounded-full border border-white"></span>
                  </div>
                  <span><strong>Answered & Marked for Review / उत्तर दिया और समीक्षा के लिए चिह्नित:</strong> The question evaluated. / प्रश्न मूल्यांकन के लिए माना जाएगा।</span>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 pt-2 border-b pb-1">Navigating & Answering Questions / प्रश्नों का नेविगेशन तथा उत्तर देना:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Click on <strong>"Save & Next"</strong> to save your answer and go to the next question. / अपना उत्तर सुरक्षित करने के लिए "Save & Next" पर क्लिक करें और अगले प्रश्न पर जाएं।</li>
                <li>Click on <strong>"Mark for Review & Next"</strong> to save your response for review. / समीक्षा के लिए चिह्नित करने हेतु "Mark for Review & Next" पर क्लिक करें।</li>
                <li>Click on <strong>"Clear Response"</strong> to wipe the chosen answer. / चुने गए उत्तर को मिटाने के लिए "Clear Response" पर क्लिक करें।</li>
              </ul>
            </div>

            {/* Right side Profile container */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center space-y-4 shadow-xs">
              <div className="mx-auto w-24 h-28 bg-slate-100 border border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
                <Video className="h-7 w-7 text-blue-500 animate-pulse mb-1" />
                <span className="text-[10px] px-1 bg-blue-500 text-white rounded font-bold uppercase tracking-widest leading-none font-mono">Exam CCTV</span>
                
                {/* Visual red recording blinking box */}
                <div className="absolute top-1 right-1 flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                  <span className="text-[7px] text-red-600 font-bold uppercase font-mono">LIVE</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">CANDIDATE PROFILE</span>
                <h4 className="font-extrabold text-slate-800 text-xs">{user.name}</h4>
                <p className="text-[10px] font-mono text-slate-500 font-bold bg-slate-150 rounded px-2 py-0.5 inline-block">ROLL: SSC-CGL-24589</p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <label className="block text-[10px] font-bold text-slate-400 text-left mb-1 uppercase tracking-wider font-mono">Default Language</label>
                <select 
                  value={cbtViewLanguage} 
                  onChange={(e) => setCbtViewLanguage(e.target.value as 'English' | 'Hindi')}
                  className="w-full text-xs font-bold border border-slate-300 rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-slate-50"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिन्दी (Hindi)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Terms Declared Checkbox */}
          <div className="bg-white border border-slate-250 rounded-2xl p-4 mt-5 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input 
                type="checkbox" 
                checked={cbtTermsAccepted} 
                onChange={(e) => setCbtTermsAccepted(e.target.checked)}
                className="mt-1 h-4.5 w-4.5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-md shrink-0 cursor-pointer" 
              />
              <span className="text-[11px] font-medium leading-relaxed text-slate-600">
                <strong>Declaration / स्वघोषणा:</strong> I have read and understood all instructions provided. All my computer accessories and keyboard blocks are properly configured and in working condition. I agree that in case of any malpractice or non-compliance, my candidature evaluated under SSC protocols is subject to cancellation. / मैंने ऊपर दी गई सभी शर्तों व निर्देशों को ध्यान से पढ़ और समझ लिया है। मैं घोषणा करता हूं कि मैं ईमानदारी से परीक्षा पूर्ण करूंगा।
              </span>
            </label>
          </div>

          {/* Start Actions */}
          <div className="flex justify-between items-center mt-5 pt-3 border-t border-slate-300">
            <button 
              onClick={() => {
                setActiveTest(null);
                setIsTestRunning(false);
              }}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-extrabold text-slate-600 transition"
            >
              Declined / Back
            </button>
            <button 
              disabled={!cbtTermsAccepted}
              onClick={() => setCbtInstructionsActive(false)}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:opacity-50 text-white text-xs font-extrabold shadow-md transition flex items-center gap-1"
            >
              I am ready to begin / परीक्षा आरंभ करें <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      ) : isTestRunning && activeTest ? (
        // ==========================================
        // 3. ACTUAL SYSTEM TEST ENVIRONMENT (TCS iON CBT LOOK & FEEL)
        // ==========================================
        <div className="bg-[#f0f0f0] border border-slate-300 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans text-slate-800 animate-fadeIn min-h-[580px]">
          
          {/* CBT TOP BLUE STRIP */}
          <div className="bg-[#e9e9e9] border-b border-slate-300 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="bg-blue-600 text-white font-black px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase">
                TCS CBT RUNTIME
              </span>
              <h1 className="font-extrabold text-slate-800 text-sm md:text-base font-sans truncate tracking-tight">
                {activeTest.title}
              </h1>
            </div>

            {/* Live cctv invigilator strip */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-[10px] bg-emerald-100 border border-emerald-200 text-emerald-800 font-extrabold rounded px-2.5 py-0.5 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                Secure Frame Protection Active
              </span>

              {/* View Language Dropdown */}
              <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-300 rounded-lg px-2 py-1">
                <span className="text-[10px] font-bold text-slate-500">View In:</span>
                <select
                  value={cbtViewLanguage}
                  onChange={(e) => setCbtViewLanguage(e.target.value as 'English' | 'Hindi')}
                  className="font-extrabold text-blue-900 border-none bg-transparent focus:ring-0 p-0 text-[11px] cursor-pointer"
                >
                  <option value="English">English Only</option>
                  <option value="Hindi">हिन्दी / English</option>
                </select>
              </div>
            </div>
          </div>

          {/* ACTIVE CANDIDATE INFORMATION Ticker */}
          <div className="bg-[#0f172a] text-slate-200 px-4 py-2.5 text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono border-b border-[#1e293b]">
            <div className="flex items-center gap-4 flex-wrap">
              <span>Candidate: <span className="text-amber-300 font-black">{user.name}</span></span>
              <span>•</span>
              <span>Reg: <span className="text-blue-300">SSC2026-98C3</span></span>
              <span>•</span>
              <span>Marks Schema: <span className="text-emerald-400 font-bold">+2.0 / -{activeTest.negativeMark}</span></span>
            </div>

            {/* TIMER badge countdown */}
            <div className="flex items-center gap-2 bg-red-950/50 border border-red-500/30 px-3.5 py-1.5 rounded-lg text-rose-300 font-black animate-fadeIn">
              <Clock className="w-4 h-4 text-red-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="tracking-widest font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* SECTION TABS FOR CBT TEST */}
          {activeTest.questions.length >= 100 && (
            <div className="bg-slate-200 border-b border-slate-300 p-2 flex gap-1 overflow-x-auto select-none scrollbar-thin">
              {getExamSections(activeTest.category).map((sectionTab) => {
                const isActive = currentQuestionIdx >= sectionTab.start && currentQuestionIdx <= sectionTab.end;
                return (
                  <button
                    key={sectionTab.id}
                    onClick={() => {
                      navigateToQuestion(sectionTab.start);
                    }}
                    className={`rounded-t-lg px-3.5 py-2 font-sans font-extrabold text-xs shrink-0 transition ${
                      isActive 
                        ? 'bg-white text-blue-700 shadow-sm border-t-2 border-blue-600' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {sectionTab.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* MAIN COLUMN WORKSPACE */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 items-start grow min-h-[460px]">
            
            {/* LEFT 75% QUESTION PANEL */}
            <div className="md:col-span-3 bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between min-h-[440px] h-full">
              
              <div>
                {/* Header title bar */}
                <div className="bg-[#415b76] text-white px-4 py-2 flex justify-between items-center text-xs font-bold leading-none font-mono">
                  <span>
                    SECTION: {getQuestionSection(currentQuestionIdx, activeTest.questions.length, activeTest.category).toUpperCase()}
                  </span>
                  <div className="flex items-center gap-3">
                    {onOpenAiDoubt && (
                      <button
                        type="button"
                        onClick={() => onOpenAiDoubt(activeTest.questions[currentQuestionIdx].text)}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded font-extrabold text-[10px] flex items-center gap-1 transition shadow-xs"
                      >
                        <Sparkles className="h-3 w-3 fill-slate-950" />
                        Ask AI Doubt Mitra (एआई से हल समझें)
                      </button>
                    )}
                    <span>
                      QUESTION NO: {currentQuestionIdx + 1}
                    </span>
                  </div>
                </div>

                <div className="p-4 md:p-6 space-y-6">
                  {/* QUESTION COMPONENT WITH OPTIONAL WATERMARK */}
                  <div className="relative overflow-hidden p-2 rounded-xl border border-slate-100 bg-slate-50/50">
                    <p className="font-extrabold text-[#0f172a] text-sm leading-relaxed whitespace-pre-wrap select-all">
                      {cbtViewLanguage === 'Hindi' 
                        ? activeTest.questions[currentQuestionIdx].text 
                        : activeTest.questions[currentQuestionIdx].text.split(' / ')[0]}
                    </p>
                    {/* Faint watermarked background to mimic real exam */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-3 select-none pointer-events-none">
                      <span className="font-black text-3xl tracking-widest text-[#1e293b] rotate-12 uppercase font-mono select-none">
                        SARKARI JOB HUB
                      </span>
                    </div>
                  </div>

                  {/* MCQ OPTION CARDS */}
                  <div className="space-y-3">
                    {activeTest.questions[currentQuestionIdx].options.map((option, oIdx) => {
                      const qId = activeTest.questions[currentQuestionIdx].id;
                      const isChecked = selectedAnswers[qId] === oIdx;

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(qId, oIdx)}
                          className={`w-full flex items-center justify-between p-3 px-4 rounded-xl border text-left text-xs font-semibold transition duration-100 select-none ${
                            isChecked 
                              ? 'bg-blue-50/70 border-blue-500 text-blue-900 shadow-xs' 
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full font-bold text-[10px] ${
                              isChecked ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="leading-normal">{option}</span>
                          </div>
                          <div className={`h-4 w-4 rounded-full border-2 ${isChecked ? 'border-blue-600 bg-blue-650' : 'border-slate-350'}`}></div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* FOOTER ACTIONS BAR */}
              <div className="bg-[#e9e9e9] border-t border-slate-300 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex gap-2">
                  <button
                    onClick={handleMarkForReviewAndNext}
                    className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-extrabold px-3 py-2 transition"
                  >
                    Mark for Review & Next
                  </button>
                  <button
                    onClick={handleClearResponse}
                    className="rounded-lg bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-705 font-bold px-3 py-2 transition"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex gap-1.5">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => navigateToQuestion(currentQuestionIdx - 1)}
                    className="rounded-lg bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-705 font-bold p-2.5 transition shrink-0 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    onClick={handleSaveAndNext}
                    className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-black px-5 py-2.5 transition shadow-xs"
                  >
                    Save & Next
                  </button>

                  <button
                    disabled={currentQuestionIdx === activeTest.questions.length - 1}
                    onClick={() => navigateToQuestion(currentQuestionIdx + 1)}
                    className="rounded-lg bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-705 font-bold p-2.5 transition shrink-0 disabled:opacity-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT 25% PALETTE PANEL */}
            <div className="bg-[#e9e9e9] border border-slate-300 rounded-2xl p-3 space-y-4 shadow-xs h-full flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Simulated Webcam Monitor */}
                <div className="bg-white border border-slate-300 rounded-xl p-2.5 flex items-center gap-3">
                  <div className="w-12 h-14 bg-slate-50 border border-slate-250 rounded-lg flex flex-col items-center justify-center text-slate-350 relative overflow-hidden shrink-0">
                    <Video className="h-4 w-4 text-emerald-500 animate-pulse" />
                    <span className="text-[7px] bg-red-600 text-white font-black rounded px-1 scale-85 leading-none">REC</span>
                  </div>
                  <div className="space-y-0.5 text-left truncate min-w-0">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold font-mono">Invigilator Feed</span>
                    <h5 className="font-extrabold text-slate-800 text-xs truncate leading-tight">{user.name}</h5>
                    <p className="text-[9px] font-medium font-mono text-emerald-600 flex items-center gap-0.5">
                      <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      Frame Synced
                    </p>
                  </div>
                </div>

                {/* LEGEND SPECIFICATIONS */}
                <div className="grid grid-cols-2 gap-2 text-[9px] text-slate-600 font-bold pr-1 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-4 w-6 bg-[#10B981] text-white rounded-b-xs rounded-t-md font-mono flex items-center justify-center scale-90 border border-emerald-600 text-[8px]">{getCBTStateCount('answered')}</span>
                    <span className="truncate">Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-4 w-6 bg-[#EF4444] text-white rounded-t-xs rounded-b-md font-mono flex items-center justify-center scale-90 border border-red-600 text-[8px]">{getCBTStateCount('not_answered')}</span>
                    <span className="truncate">Not Answered</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-4 w-6 bg-slate-100 text-slate-600 border border-slate-300 rounded-sm font-mono flex items-center justify-center scale-90 text-[8px]">{getCBTStateCount('not_visited')}</span>
                    <span className="truncate">Not Visited</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-4 w-4 bg-[#8B5CF6] text-white rounded-full font-mono flex items-center justify-center scale-90 text-[8px]">{getCBTStateCount('marked_for_review')}</span>
                    <span className="truncate">For Review</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <div className="relative h-4 w-4 scale-90 shrink-0">
                      <span className="h-4 w-4 bg-[#8B5CF6] text-white rounded-full font-mono flex items-center justify-center text-[8px]"></span>
                      <span className="absolute bottom-0 right-0 h-1.5 w-1.5 bg-green-500 rounded-full border border-white"></span>
                    </div>
                    <span className="text-[9px]">Answered & Review</span>
                  </div>
                </div>

                <div className="border-t border-slate-300 pt-3">
                  <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2 font-mono">
                    Question Palette (प्रश्न ग्रिड)
                  </span>

                  {/* GRID CONTAINER FOR PALETTE */}
                  <div className="grid grid-cols-5 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {activeTest.questions.map((q, idx) => {
                      const cbtState = questionCBTStates[q.id] || 'not_visited';
                      const isCurrent = currentQuestionIdx === idx;
                      
                      let btnClass = '';
                      if (cbtState === 'answered') {
                        btnClass = 'bg-[#10B981] text-white border-b-2 border-emerald-600 rounded-b-sm rounded-t-lg';
                      } else if (cbtState === 'not_answered') {
                        btnClass = 'bg-[#EF4444] text-white border-t-2 border-red-600 rounded-t-sm rounded-b-lg';
                      } else if (cbtState === 'marked_for_review') {
                        btnClass = 'bg-[#8B5CF6] text-white rounded-full';
                      } else if (cbtState === 'answered_marked_for_review') {
                        btnClass = 'bg-[#8B5CF6] text-white rounded-full ring-2 ring-emerald-400 ring-offset-1';
                      } else {
                        btnClass = 'bg-white text-slate-550 border border-slate-300 hover:bg-slate-50 rounded-sm';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => navigateToQuestion(idx)}
                          className={`h-7 w-full text-[10px] font-bold font-mono transition flex items-center justify-center relative shadow-3xs ${btnClass} ${
                            isCurrent ? 'ring-2 ring-blue-600 ring-offset-1' : ''
                          }`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* FLOATING SUBMIT BUTTON */}
              <div className="pt-4 border-t border-slate-350">
                <button
                  onClick={handleAutoSubmit}
                  className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs py-3 shadow-md border border-red-700 transition"
                >
                  Submit Examination
                </button>
              </div>

            </div>

          </div>

        </div>
      ) : (
        // ==========================================
        // 4. ASSESSMENT SCORECARD / REVIEW SOLUTIONS PANEL(COMPLETED)
        // ==========================================
        <div className="space-y-6 animate-fadeIn">
          
          <div className="rounded-3xl border border-blue-50 bg-white p-6 shadow-xl relative overflow-hidden">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Test successfully evaluated
                </span>
                <h3 className="font-sans text-xl font-extrabold text-slate-900 mt-2">
                  Assessment Report Card
                </h3>
                <p className="font-sans text-sm text-slate-500 max-w-sm leading-relaxed">
                  Excellent attempt! Review your statistics, marks and negative evaluation analysis below.
                </p>
              </div>

              {/* Huge performance badge circles */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100 min-w-[110px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Final score</span>
                  <span className="text-2xl font-black text-blue-950 mt-1">{completedStats?.score}</span>
                  <span className="text-[10px] text-slate-400 mt-1">/ {activeTest?.questions.length ? activeTest.questions.length * 2 : 0} Marks</span>
                </div>
                <div className="flex flex-col items-center bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 min-w-[110px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Accuracy</span>
                  <span className="text-2xl font-black text-emerald-705 mt-1">{completedStats?.percentage}%</span>
                  <span className="text-[10px] text-slate-400 mt-1">Completion rate</span>
                </div>
              </div>
            </div>

            {/* Minor breakdown bar graph indicator */}
            <div className="mt-8 grid gap-4 sm:grid-cols-4 text-center font-sans">
              <div className="border border-slate-100 p-3 rounded-2xl bg-slate-50/20">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Correct Options</span>
                <span className="block text-base font-bold text-emerald-600 mt-1 font-mono">{completedStats?.correct} Answers</span>
              </div>
              <div className="border border-slate-100 p-3 rounded-2xl bg-slate-50/20">
                <span className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Incorrect Penalty</span>
                <span className="block text-base font-bold text-rose-500 mt-1 font-mono">-{completedStats?.wrong} Answers</span>
              </div>
              <div className="border border-slate-100 p-3 rounded-2xl bg-slate-50/20">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Skipped Items</span>
                <span className="block text-base font-bold text-slate-500 mt-1 font-mono">{completedStats?.skipped} Items</span>
              </div>
              <div className="border border-slate-100 p-3 rounded-2xl bg-slate-50/20">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Elapsed Session Time</span>
                <span className="block text-base font-bold text-blue-900 mt-1 font-mono">{completedStats?.timeSpentStr}</span>
              </div>
            </div>

            {/* Custom interactive Mock achievement certificate download */}
            <div className="mt-6 border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="h-10 w-10 text-amber-500 animate-bounce" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800">Sarkari Mock Test Certificate Issued!</p>
                  <p className="text-[10px] text-slate-400">Unique certification verified under candidate email: {user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-600 transition duration-150"
              >
                <Download className="h-4 w-4" /> View & Download score card
              </button>
            </div>
          </div>

          {/* Solutions & Explanations review guide */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
            <h4 className="font-sans text-sm font-extrabold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Detailed Solutions & Revision Key
            </h4>

            <div className="space-y-6 font-sans">
              {activeTest?.questions.map((q, idx) => {
                const isCorrect = selectedAnswers[q.id] === q.correctOptionIndex;
                const wasSkipped = selectedAnswers[q.id] === undefined;
                const sectionLabel = activeTest.questions.length >= 100 ? getQuestionSection(idx, activeTest.questions.length, activeTest.category) : 'General Practice';

                return (
                  <div key={q.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/40 relative">
                    <div className="flex gap-2 items-center flex-wrap justify-between text-xs font-bold border-b border-slate-100 pb-2">
                      <span className="text-[#1E3A8A] font-mono">
                        Q{idx + 1}. SECTION: {sectionLabel.toUpperCase()}
                      </span>
                      <span className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
                        wasSkipped ? 'bg-slate-100 text-slate-500' : isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {wasSkipped ? 'Skipped' : isCorrect ? 'Correct +2.00' : `Incorrect -${activeTest.negativeMark}`}
                      </span>
                    </div>

                    <p className="text-sm font-extrabold text-slate-800 leading-relaxed mt-3">{q.text}</p>
                    
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs font-semibold">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selectedAnswers[q.id] === oIdx;
                        const isCorrectOption = q.correctOptionIndex === oIdx;

                        return (
                          <div 
                            key={oIdx} 
                            className={`p-2.5 rounded-lg border ${
                              isCorrectOption 
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                                : isChosen 
                                  ? 'bg-rose-50 border-rose-300 text-rose-950' 
                                  : 'bg-white border-slate-100 text-slate-500'
                            }`}
                          >
                            <span className="font-mono font-extrabold mr-1">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-xs text-sky-950">
                      <div className="flex items-center justify-between gap-2 border-b border-blue-100 pb-1.5 mb-1.5">
                        <p className="font-extrabold text-blue-900 font-mono">Detailed Explanation / विस्तारपूर्वक हल:</p>
                        {onOpenAiDoubt && (
                          <button
                            type="button"
                            onClick={() => onOpenAiDoubt(q.text)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded font-bold text-[10px] flex items-center gap-1 transition shadow-xs"
                          >
                            <Sparkles className="h-3 w-3 text-amber-300" />
                            Ask AI Doubt Mitra (शॉर्ट ट्रिक व पूर्ण समाधान)
                          </button>
                        )}
                      </div>
                      <p className="mt-1 leading-relaxed whitespace-pre-wrap">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setActiveTest(null);
                  setTestCompleted(false);
                }}
                className="rounded-xl bg-blue-600 text-white font-sans text-xs font-bold py-2.5 px-6 hover:bg-blue-700 transition duration-150 shadow"
              >
                Go back to MCQ Portal
              </button>
            </div>
          </div>
        </div>
      )}

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        candidateName={user.name}
        candidateEmail={user.email}
        testTitle={activeTest?.title || "Sarkari Mock Test"}
        score={completedStats?.score || 0}
        totalQuestions={activeTest?.questions.length || 0}
        correctAnswers={completedStats?.correct || 0}
        timeTaken={completedStats?.timeSpentStr || "00:00"}
        date={new Date().toLocaleDateString('en-GB')}
      />

    </div>
  );
}
