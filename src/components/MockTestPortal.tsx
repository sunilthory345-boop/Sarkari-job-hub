import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, AlertTriangle, 
  HelpCircle, RefreshCw, FileText, ChevronRight, 
  ChevronLeft, BookOpen, Star, Sparkles, Download, Lock
} from 'lucide-react';
import { MockTest, UserProfile, Question } from '../types';

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
}

export default function MockTestPortal({ 
  mockTests, 
  user, 
  onSaveTestResult, 
  setPremiumModal,
  onChangeTab
}: MockTestPortalProps) {
  const [activeTest, setActiveTest] = useState<MockTest | null>(null);
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

  // For PYQ section
  const previousPapers = [
    { id: 'pyq-ssc-2025', title: 'SSC CGL General Awareness 2025 Solved Paper', year: 2025, exam: 'SSC', size: '2.4 MB', premium: false },
    { id: 'pyq-upsc-2025', title: 'UPSC Civil Services GS-1 2025 Question Booklet', year: 2025, exam: 'UPSC', size: '4.1 MB', premium: true },
    { id: 'pyq-rrb-2024', title: 'RRB NTPC General Science Chapter-wise PYQ', year: 2024, exam: 'Railway', size: '1.8 MB', premium: false },
    { id: 'pyq-bank-2025', title: 'IBPS PO Reasoning Sectional 5-Year compiled PDF', year: 2025, exam: 'Bank', size: '5.2 MB', premium: true }
  ];

  // Timer logic
  useEffect(() => {
    if (!isTestRunning || timeLeft <= 0) {
      if (timeLeft === 0 && isTestRunning) {
        handleAutoSubmit();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTestRunning]);

  const handleStartTest = (test: MockTest) => {
    setActiveTest(test);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTimeLeft(test.durationMinutes * 60);
    setIsTestRunning(true);
    setTestCompleted(false);
    setCompletedStats(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
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

    const marksPerQuestion = 2; // Fixed standard mark per answer
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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      
      {!isTestRunning && !testCompleted ? (
        // Test Selection Mode
        <div className="grid gap-6 md:grid-cols-12">
          
          {/* Active MCQs list */}
          <div className="md:col-span-8 space-y-6">
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

              <div className="space-y-4">
                {mockTests.map((test) => (
                  <div 
                    key={test.id}
                    className="group border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-200 hover:bg-slate-50/50 transition duration-200"
                  >
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="inline-block rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                          {test.category}
                        </span>
                        <span className="text-xs text-slate-400 font-medium font-mono">
                          {test.questions.length} Items MCQ
                        </span>
                        {test.id === 'ssc-cgl-science-mock-1' && (
                          <span className="inline-block rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-extrabold border border-emerald-200">
                            ✨ Clean study mode (PRACTICE MOCK watermark removed)
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
                      className="rounded-xl bg-blue-600 py-2.5 px-4 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
                    >
                      Begin Assessment
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Year Papers download center */}
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
                            alert(`File "${paper.title}" download triggered! Saved PDF to downloads folder.`);
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
          </div>

          {/* Quick FAQ / Guidelines Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="rounded-2xl border border-blue-50 bg-linear-to-b from-blue-900 to-indigo-950 p-5 text-white shadow-lg">
              <h4 className="font-sans text-sm font-extrabold flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-amber-300 animate-pulse" />
                Sarkari Hub Leaderboard
              </h4>
              <p className="font-sans text-xs text-blue-200 mt-1">
                Your ranking compared to all online aspirants in simulated test mock series.
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between items-center bg-white/10 p-2 rounded-lg">
                  <span className="font-sans font-semibold">🏆 Rank 1: Pankaj K.</span>
                  <span className="font-mono text-amber-300">5.8 Marks (96%)</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                  <span className="font-sans font-medium text-slate-200">2: Shreya J.</span>
                  <span className="font-mono text-slate-300">5.5 Marks</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-lg">
                  <span className="font-sans text-slate-200">3: Rohit Raj</span>
                  <span className="font-mono text-slate-300">5.2 Marks</span>
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
              <p>1. Clicking 'Begin Assessment' starts the server-authoritative ticking timer.</p>
              <p>2. Questions are in MCQ format with 4 possible choices.</p>
              <p>3. **Negative Marking Rules**: Unanswered questions incur 0 points. Selecting a wrong option deducts points as outlined on the exam banner.</p>
              <p>4. Upon completion, an assessment breakdown scorecard along with key explanations is immediately loaded.</p>
            </div>
          </div>

        </div>
      ) : isTestRunning && activeTest ? (
        // ACTIVE TEST RUNNING SCREEN
        <div className="rounded-3xl border border-blue-50 bg-white shadow-xl shadow-blue-50/20 overflow-hidden">
          
          {/* Header Progress panel */}
          <div className="bg-linear-to-r from-blue-900 to-indigo-950 p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-500/30 border border-red-400/40 text-rose-300 rounded px-2.5 py-0.5 font-sans font-extrabold uppercase tracking-widest animate-pulse flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                  BILINGUAL TEST ENGINE LIVE
                </span>
                <span className="text-[10px] bg-amber-500/30 border border-amber-400/40 text-amber-300 rounded px-2.5 py-0.5 font-sans font-bold uppercase tracking-wide">
                  Negative Penalized: -{activeTest.negativeMark}
                </span>
              </div>
              <h3 className="font-sans text-base font-extrabold mt-1.5">{activeTest.title}</h3>
            </div>
            
            {/* Timer circle badge */}
            <div className="flex items-center gap-3">
              <div className="text-right font-sans hidden sm:block">
                <span className="block text-[10px] text-blue-200 uppercase font-bold tracking-widest">Time Remaining</span>
                <span className="block text-[11px] text-rose-300 font-medium font-sans">बचा हुआ समय</span>
              </div>
              <div className="flex items-center gap-2.5 bg-rose-950/40 px-5 py-2.5 rounded-2xl border border-rose-500/20 backdrop-blur-xs font-mono text-base font-black tracking-widest text-rose-200 animate-fadeIn shrink-0">
                <Clock className="h-4.5 w-4.5 text-rose-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className={timeLeft < 60 ? 'text-red-400 animate-ping font-extrabold' : 'text-rose-100 font-extrabold'}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Timer Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100 relative overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                (timeLeft / (activeTest.durationMinutes * 60)) < 0.2 ? 'bg-red-500 animate-pulse' : 'bg-blue-600'
              }`}
              style={{ width: `${(timeLeft / (activeTest.durationMinutes * 60)) * 100}%` }}
            ></div>
          </div>

          {/* Bilingual Live Stats Tracker Box */}
          <div className="bg-amber-50/70 border-b border-amber-100 px-6 py-3 text-xs font-sans text-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">📝</span>
              <span className="font-extrabold text-[#1E3A8A]">Assessment Protocol / नियम:</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap text-[11px]">
              <span className="bg-emerald-100/85 text-emerald-800 font-extrabold px-2 py-1 rounded-lg border border-emerald-200">
                🟢 Correct / सही विकल्प: +2.00 Marks
              </span>
              <span className="bg-red-100/85 text-red-800 font-extrabold px-2 py-1 rounded-lg border border-red-200">
                🔴 Incorrect Penalty / गलत उत्तर का नुकसान: -{activeTest.negativeMark} Marks
              </span>
              <span className="bg-slate-100/85 text-slate-700 font-extrabold px-2 py-1 rounded-lg border border-slate-200">
                ⏳ Duration: {activeTest.durationMinutes} Mins
              </span>
            </div>
          </div>

          {activeTest.id === 'ssc-cgl-science-mock-1' && (
            <div className="bg-emerald-50 text-emerald-800 px-6 py-2 text-[11px] font-sans font-extrabold border-b border-emerald-100 flex items-center gap-2 animate-fadeIn">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>🔒 Clean Study Mode Active: Original background watermarks & "PRACTICE MOCK" overlay removed. Enjoy distraction-free learning!</span>
            </div>
          )}

          <div className="grid gap-6 p-6 md:grid-cols-12 font-sans">
            
            {/* Left side: Navigation panel matrix */}
            <div className="md:col-span-3 border-r border-slate-100 pr-4">
              <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Question Index
              </span>
              <div className="grid grid-cols-4 gap-2">
                {activeTest.questions.map((q, idx) => {
                  const answered = selectedAnswers[q.id] !== undefined;
                  const currentClass = currentQuestionIdx === idx 
                    ? 'bg-blue-600 text-white ring-2 ring-blue-100' 
                    : answered 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                      : 'bg-slate-50 text-slate-500 border border-slate-100';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`h-10 w-full rounded-lg text-xs font-bold transition flex items-center justify-center ${currentClass}`}
                    >
                      Q{idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-50 space-y-2 text-xs">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> <span>Answered</span></div>
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-200"></span> <span>Not Attempted</span></div>
              </div>
            </div>

            {/* Right side: Dynamic active Question question body */}
            <div className="md:col-span-9 flex flex-col justify-between min-h-[350px]">
              <div>
                <span className="text-xs text-blue-600 font-bold uppercase tracking-wider block mb-1">
                  Question {currentQuestionIdx + 1} of {activeTest.questions.length}
                </span>
                
                <h4 className="text-base font-bold text-slate-800 leading-relaxed mb-6">
                  {activeTest.questions[currentQuestionIdx].text}
                </h4>

                {/* Multiple Options Radio Cards */}
                <div className="space-y-3">
                  {activeTest.questions[currentQuestionIdx].options.map((option, oIdx) => {
                    const qId = activeTest.questions[currentQuestionIdx].id;
                    const isChecked = selectedAnswers[qId] === oIdx;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(qId, oIdx)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left text-sm font-medium transition duration-150 ${
                          isChecked 
                            ? 'bg-blue-50/50 border-blue-500 text-blue-900 shadow-xs' 
                            : 'border-slate-150 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full font-bold text-xs ${
                            isChecked ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{option}</span>
                        </div>
                        <div className={`h-4 w-4 rounded-full border-2 ${isChecked ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}></div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progress interaction buttons footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx(currentQuestionIdx - 1)}
                  className="rounded-xl px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-1"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>

                <button
                  onClick={handleAutoSubmit}
                  className="rounded-xl bg-orange-600 py-2.5 px-5 text-xs font-bold text-white hover:bg-orange-700 shadow-sm"
                >
                  Submit Test & Get Score
                </button>

                <button
                  disabled={currentQuestionIdx === activeTest.questions.length - 1}
                  onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)}
                  className="rounded-xl px-4 py-2 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 flex items-center gap-1"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      ) : (
        // COMPLETED TEST DETAILED REVIEW SCORECARD
        <div className="space-y-6">
          
          <div className="rounded-3xl border border-blue-50 bg-white p-6 shadow-xl relative overflow-hidden">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="space-y-2 text-center md:text-left">
                <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
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
                <div className="flex flex-col items-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100 min-w-[100px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final score</span>
                  <span className="text-xl font-extrabold text-blue-950 mt-1">{completedStats?.score}</span>
                  <span className="text-[10px] text-slate-400 mt-1">/ {activeTest?.questions.length ? activeTest.questions.length * 2 : 0} Marks</span>
                </div>
                <div className="flex flex-col items-center bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100 min-w-[100px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</span>
                  <span className="text-xl font-extrabold text-emerald-700 mt-1">{completedStats?.percentage}%</span>
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
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Incorrect Penalty</span>
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

            {/* Custom interactive Mock achievement certificate download mockup */}
            <div className="mt-6 border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="h-10 w-10 text-amber-500" />
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800">Sarkari Mock Test Certificate Issued!</p>
                  <p className="text-[10px] text-slate-400">Unique certification verified under candidate email: {user.email}</p>
                </div>
              </div>
              <button
                onClick={() => alert(`Certificate of Achievement downloaded for: ${activeTest?.title} successfully. Saved PDF to files.`)}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-600 transition"
              >
                <Download className="h-4 w-4" /> Download mock certificate
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

                return (
                  <div key={q.id} className="border border-slate-50 rounded-2xl p-4 bg-slate-50/30">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-blue-800">Question {idx + 1}</span>
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                        wasSkipped ? 'bg-slate-100 text-slate-500' : isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {wasSkipped ? 'Skipped' : isCorrect ? 'Correct +2.00' : `Incorrect -${activeTest.negativeMark}`}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-700 leading-relaxed mt-2">{q.text}</p>
                    
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 text-xs font-medium">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selectedAnswers[q.id] === oIdx;
                        const isCorrectOption = q.correctOptionIndex === oIdx;

                        return (
                          <div 
                            key={oIdx} 
                            className={`p-2.5 rounded-lg border ${
                              isCorrectOption 
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                                : isChosen 
                                  ? 'bg-rose-50 border-rose-300 text-rose-900' 
                                  : 'bg-white border-slate-100 text-slate-500'
                            }`}
                          >
                            <span className="font-bold mr-1">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-xs text-sky-950">
                      <p className="font-bold text-blue-900">Explanation & Reference Key:</p>
                      <p className="mt-1 leading-relaxed">{q.explanation}</p>
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
                className="rounded-xl bg-blue-600 text-white font-sans text-xs font-bold py-2.5 px-6 hover:bg-blue-700 transition"
              >
                Go back to MCQ Portal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
