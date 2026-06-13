import React, { useState } from 'react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Zap, Clock, Award, CheckCircle2, 
  Gauge, AlertCircle, BookOpen, Brain, Lightbulb, RefreshCw
} from 'lucide-react';

interface TestAttempt {
  id: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string; // e.g. "12:45"
  date: string;
}

interface AspirantAnalyticsProps {
  testHistory: TestAttempt[];
}

export default function AspirantAnalytics({ testHistory }: AspirantAnalyticsProps) {
  // Parsing helper to map mock test names to core subject streams
  const categorizeSubject = (title: string): string => {
    const lower = title.toLowerCase();
    if (lower.includes('quant') || lower.includes('math') || lower.includes('aptitude') || lower.includes('arithmetic')) {
      return 'Quantitative Aptitude';
    }
    if (lower.includes('reasoning') || lower.includes('intelligence') || lower.includes('syllogism') || lower.includes('puzzle') || lower.includes('logic')) {
      return 'Reasoning & Intelligence';
    }
    if (lower.includes('polity') || lower.includes('history') || lower.includes('economics') || lower.includes('gk') || lower.includes('constitutional') || lower.includes('awareness')) {
      return 'General GK & Polity';
    }
    if (lower.includes('english') || lower.includes('grammar') || lower.includes('comprehension')) {
      return 'English Comprehension';
    }
    if (lower.includes('science') || lower.includes('physics') || lower.includes('biology')) {
      return 'General Science';
    }
    return 'General Studies';
  };

  // Parsing helper: convert duration "12:45" to total minutes numerically
  const parseTimeToMinutes = (timeStr: string): number => {
    if (!timeStr) return 5;
    // format "MM:SS" or "MM mins"
    if (timeStr.includes(':')) {
      const parts = timeStr.split(':');
      const mins = parseFloat(parts[0]) || 0;
      const secs = parseFloat(parts[1]) || 0;
      return mins + secs / 60;
    }
    const numerical = parseFloat(timeStr);
    return isNaN(numerical) ? 10 : numerical;
  };

  // Compile overall dataset from history list
  const chartData = [...testHistory]
    .reverse() // Display chronological order (oldest first)
    .map((attempt, index) => {
      const scorePercentage = attempt.totalQuestions > 0 
        ? Math.round((attempt.correctAnswers / attempt.totalQuestions) * 100) 
        : 0;
      
      const durationMinutes = parseTimeToMinutes(attempt.timeTaken);
      // Speed: questions completed per minute
      const speedQPM = durationMinutes > 0 
        ? parseFloat((attempt.totalQuestions / durationMinutes).toFixed(1)) 
        : 0;

      return {
        id: attempt.id,
        attemptNumber: `M-${index + 1}`,
        testTitle: attempt.testTitle,
        subject: categorizeSubject(attempt.testTitle),
        date: attempt.date,
        score: attempt.score,
        accuracy: scorePercentage, // correct answers percent
        speed: speedQPM, // speed QPM
        duration: parseFloat(durationMinutes.toFixed(1))
      };
    });

  // Compile subject-wise parameters
  const subjectAggregates: Record<string, { correct: number, total: number, count: number }> = {};
  testHistory.forEach(attempt => {
    const subj = categorizeSubject(attempt.testTitle);
    if (!subjectAggregates[subj]) {
      subjectAggregates[subj] = { correct: 0, total: 0, count: 0 };
    }
    subjectAggregates[subj].correct += attempt.correctAnswers;
    subjectAggregates[subj].total += attempt.totalQuestions;
    subjectAggregates[subj].count += 1;
  });

  const subjectChartData = Object.keys(subjectAggregates).map(subj => {
    const agg = subjectAggregates[subj];
    const accuracy = agg.total > 0 ? Math.round((agg.correct / agg.total) * 100) : 0;
    return {
      subject: subj,
      accuracy: accuracy,
      attempts: agg.count
    };
  });

  // Calculate high-level summary metrics
  const totalCorrect = testHistory.reduce((sum, item) => sum + item.correctAnswers, 0);
  const totalQns = testHistory.reduce((sum, item) => sum + item.totalQuestions, 0);
  const overallAccuracy = totalQns > 0 ? Math.round((totalCorrect / totalQns) * 100) : 0;

  // Best & Worst performing streams
  let bestSubject = "N/A";
  let worstSubject = "N/A";
  let maxAcc = -1;
  let minAcc = 101;

  subjectChartData.forEach(item => {
    if (item.accuracy > maxAcc) {
      maxAcc = item.accuracy;
      bestSubject = item.subject;
    }
    if (item.accuracy < minAcc) {
      minAcc = item.accuracy;
      worstSubject = item.subject;
    }
  });

  // Average solving velocity
  const totalDuration = chartData.reduce((sum, item) => sum + item.duration, 0);
  const averageQPM = totalDuration > 0 
    ? (totalQns / totalDuration).toFixed(1) 
    : '0.0';

  // AI strategy state & trigger
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiStrategy, setAiStrategy] = useState<string>('');

  const handleGenerateAIStrategy = async () => {
    setLoadingAI(true);
    setAiStrategy('');
    try {
      const subjectStats = subjectChartData.map(s => `${s.subject}: ${s.accuracy}% accuracy (${s.attempts} attempts)`).join(', ');
      const response = await fetch('/api/doubt-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Please act as my personal Sarkari AI Exam Mentor. Here are my competitive mock test statistics:
- Overall Scorecard Accuracy: ${overallAccuracy}%
- Solving speed: ${averageQPM} questions/minute
- Strongest subject stream: ${bestSubject} (${maxAcc}% accuracy)
- Weakest subject stream: ${worstSubject} (${minAcc}% accuracy)
- Subject-wise scores summary: ${subjectStats ? subjectStats : 'Not enough tests taken yet.'}

Provide a highly personalized 7-Day study timetable and strategic action plan for my upcoming exam prep. Detail which concepts I should master first, how to schedule revision intervals, and speed optimization guidelines to increase my questions-per-minute score from ${averageQPM}. Present your answer in clear, beautifully formatted Hindi/English bilingual markdown with headers, bullets, and motivational tips. Keep it extremely structured and helpful!`
        })
      });
      const data = await response.json();
      if (data.text) {
        setAiStrategy(data.text);
      } else if (data.error) {
        setAiStrategy(`⚠️ **Error from AI Mentor:** ${data.error}`);
      } else {
        setAiStrategy('⚠️ **Error:** Failed to connect to the AI Mentor server.');
      }
    } catch (err: any) {
      setAiStrategy(`⚠️ **Network Error:** Could not contact AI Mentor. Please make sure the app backend is active. (Details: ${err.message})`);
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Overview stats dashboard cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
        <div className="bg-gradient-to-br from-blue-50/50 to-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800 shrink-0">
            <Gauge className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Overall Accuracy</span>
            <span className="text-xl font-black text-slate-800 font-mono">{overallAccuracy}%</span>
            <span className="text-[10.5px] text-slate-500 block">Average solved correctness</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/50 to-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
            <Zap className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Solving Speed</span>
            <span className="text-xl font-black text-slate-800 font-mono">{averageQPM} Qs/min</span>
            <span className="text-[10.5px] text-slate-500 block">Total average rate of response</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50/50 to-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800 shrink-0">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Top Sector Strength</span>
            <span className="text-[13px] font-extrabold text-slate-800 line-clamp-1 truncate block">{bestSubject}</span>
            <span className="text-[10.5px] text-emerald-700 font-bold block">★ {maxAcc > 0 ? `${maxAcc}% Peak Accuracy` : 'No attempts yet'}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-50/50 to-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-100 text-rose-800 shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Needs Improvement</span>
            <span className="text-[13px] font-extrabold text-slate-800 line-clamp-1 truncate block">{worstSubject}</span>
            <span className="text-[10.5px] text-rose-700 font-bold block">⚠️ {minAcc < 101 ? `${minAcc}% correctness` : 'No attempts yet'}</span>
          </div>
        </div>
      </div>

      {testHistory.length < 2 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-3">
          <Brain className="mx-auto h-9 w-9 text-slate-350 animate-bounce" />
          <h4 className="font-extrabold text-slate-800 text-sm">Waiting for more Mock Answers to populate trends</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try launching and submitting at least <strong>two mock tests</strong> inside our mock exam center. Once complete, full learning trend profiles appear instantly here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 text-xs">
          
          {/* Chart 1: Accuracy trend over consecutive trials */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div className="text-left space-y-0.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-600" /> Accuracy & Score Trend over Time
                </h4>
                <p className="text-[10px] text-slate-400">Progression marks percentage per successive mock exam</p>
              </div>
              <span className="text-[9px] font-extrabold bg-blue-100/70 text-blue-800 px-2 py-0.5 rounded uppercase">
                Progress Chart
              </span>
            </div>

            <div className="h-56 w-full text-slate-500">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="attemptNumber" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#CBD5E1" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} stroke="#CBD5E1" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', borderColor: '#E2E8F0', padding: '8px 10px', fontSize: '11px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`${value}%`, 'Accuracy']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#2563EB" 
                    strokeWidth={2.5} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Subject-wise Performance break-downs */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-xs">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div className="text-left space-y-0.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Award className="h-3.5 w-3.5 text-indigo-600" /> Subject-Wise Core Accuracy
                </h4>
                <p className="text-[10px] text-slate-400">Percentage of questions solved correctly across streams</p>
              </div>
              <span className="text-[9px] font-extrabold bg-indigo-100/70 text-indigo-800 px-2 py-0.5 rounded uppercase">
                Subject Strengths
              </span>
            </div>

            <div className="h-56 w-full text-slate-500">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="subject" 
                    tick={{ fontSize: 8.5, fill: '#64748B', fontWeight: 'bold' }} 
                    stroke="#CBD5E1"
                    tickFormatter={(val) => val.split(' ')[0]} // abbreviate to first word to prevent text overlap in layout
                  />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748B' }} stroke="#CBD5E1" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', padding: '8px 10px', fontSize: '11px' }}
                    formatter={(value) => [`${value}% Score`, 'Avg Correctness']}
                  />
                  <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                    {subjectChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.accuracy >= 75 ? '#10B981' : entry.accuracy >= 60 ? '#6366F1' : '#F43F5E'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Solving speed velocity trend (Questions solved per minute over time) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3.5 shadow-xs md:col-span-2 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div className="text-left space-y-0.5">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-xs">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" /> Solving Pace over Successive Mock Papers
                </h4>
                <p className="text-[10px] text-slate-400">Average response momentum (Number of exam questions answered per 1 minute of session)</p>
              </div>
              <span className="text-[9px] font-extrabold bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded uppercase">
                Solving Tempo
              </span>
            </div>

            <div className="h-44 w-full text-slate-500">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="attemptNumber" tick={{ fontSize: 10, fill: '#64748B' }} stroke="#CBD5E1" />
                  <YAxis tick={{ fontSize: 10, fill: '#64748B' }} stroke="#CBD5E1" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', padding: '8px 10px', fontSize: '11px' }}
                    formatter={(value) => [`${value} questions/min`, 'Speed']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="speed" 
                    stroke="#10B981" 
                    fillOpacity={1} 
                    fill="url(#colorSpeed)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-50/50 rounded-xl p-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-slate-150">
              <div className="flex gap-2 items-start text-xs">
                <span className="text-emerald-500 text-base mt-0.5">💡</span>
                <div className="space-y-0.5">
                  <p className="font-extrabold text-slate-800 text-[11px]">Recommended Competitive Speed Guidelines</p>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Most high-level exams like SSC CGL require answering <strong>1.5 to 2.0 questions per minute</strong>. To cross this cutoff benchmark safely, optimize time spent on puzzles and long calculations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Artificial Intelligence Personalized Mentor Section */}
          <div className="md:col-span-2 bg-[#FAF8F5] border border-orange-200/60 rounded-2xl p-4 space-y-4 text-left animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-100 pb-3">
              <h4 className="font-extrabold text-[#7C2D12] flex items-center gap-1.5 text-xs">
                <Lightbulb className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                Sarkari AI Mentor's Academic Strategy Guide (एआई शैक्षणिक परामर्शदाता)
              </h4>
              <button
                onClick={handleGenerateAIStrategy}
                disabled={loadingAI}
                className="self-start sm:self-auto whitespace-nowrap rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-sans text-[10px] font-extrabold px-3 py-1.5 transition-all shadow-xs flex items-center gap-1 hover:shadow-md cursor-pointer disabled:opacity-60"
              >
                {loadingAI ? (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Analyzing Roster...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-3.5 w-3.5 fill-white/10" />
                    <span>Generate custom 7-day study plan</span>
                  </>
                )}
              </button>
            </div>

            {aiStrategy ? (
              <div className="bg-white border border-orange-150 rounded-xl p-4 space-y-2 text-xs text-slate-800 leading-relaxed font-sans max-h-96 overflow-y-auto shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="font-mono text-[9px] uppercase font-bold text-amber-600 flex items-center gap-1">
                    <span>⚡ LIVE PLAN</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  </span>
                  <button 
                    onClick={() => setAiStrategy('')}
                    className="text-[9px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    Clear Strategy
                  </button>
                </div>
                
                <div className="space-y-2 prose prose-slate">
                  {aiStrategy.split('\n').map((line, idx) => {
                    const trimmed = line.trim();
                    if (!trimmed) return <div key={idx} className="h-2" />;
                    if (trimmed.startsWith('###')) {
                      return <h5 key={idx} className="font-extrabold text-[#7C2D12] text-[11px] uppercase tracking-wider mt-3 mb-1">{trimmed.replace('###', '').trim()}</h5>;
                    }
                    if (trimmed.startsWith('##')) {
                      return <h5 key={idx} className="font-extrabold text-slate-800 text-xs tracking-tight mt-4 mb-2 border-b border-slate-100 pb-1">{trimmed.replace('##', '').trim()}</h5>;
                    }
                    if (trimmed.startsWith('#')) {
                      return <h4 key={idx} className="font-bold text-slate-900 text-sm mt-4 mb-2">{trimmed.replace('#', '').trim()}</h4>;
                    }
                    if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                      let content = trimmed.substring(1).trim();
                      const parts = content.split('**');
                      if (parts.length > 2) {
                        return (
                          <div key={idx} className="flex items-start gap-1.5 pl-2">
                            <span className="text-amber-500 mt-1 shrink-0">•</span>
                            <span className="text-[11px]">
                              {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-slate-900">{p}</strong> : p)}
                            </span>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="flex items-start gap-1.5 pl-2">
                          <span className="text-amber-500 mt-1 shrink-0">•</span>
                          <span className="text-[11px]">{content}</span>
                        </div>
                      );
                    }
                    
                    const parts = trimmed.split('**');
                    if (parts.length > 2) {
                      return (
                        <p key={idx} className="text-[11px]">
                          {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-extrabold text-slate-900">{p}</strong> : p)}
                        </p>
                      );
                    }
                    return <p key={idx} className="text-[11px]">{trimmed}</p>;
                  })}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1 bg-white p-3 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800 text-[11px]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    Top Subject Mastered strategy list
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-1">
                    You scored excellent Correctness in <strong>{bestSubject}</strong> ({maxAcc}% accuracy). Leverage this section to build a solid lead. Revise critical sub-topics once a week.
                  </p>
                </div>

                <div className="space-y-1 bg-white p-3 rounded-xl border border-rose-100">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800 text-[11px]">
                    <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    Under-Performing Weak Spot study guides
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans mt-1">
                    Your core accuracy is a bit lower in <strong>{worstSubject}</strong> ({minAcc}% accuracy). Action plan: Dedicate 45 minutes everyday to solving basic solved examples and previous years' question bank indexes.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
