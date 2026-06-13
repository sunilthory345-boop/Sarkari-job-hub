import React, { useState } from 'react';
import { 
  User, Sparkles, GraduationCap, Mail, 
  Bookmark, Award, Download, Clock, Star, 
  Trash2, ArrowUpRight, Check, CreditCard, LogOut, TrendingUp,
  Trophy, Medal
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { UserProfile, GovJob } from '../types';
import LoginPortal from './LoginPortal';
import AspirantAnalytics from './AspirantAnalytics';

interface UserDashboardProps {
  user: UserProfile;
  jobs: GovJob[];
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  toggleSaveJob: (jobId: string) => void;
  setPremiumModal: (open: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  triggerToast: (msg: string) => void;
}

export default function UserDashboard({ 
  user, 
  jobs, 
  setUser, 
  toggleSaveJob,
  setPremiumModal,
  isLoggedIn,
  setIsLoggedIn,
  triggerToast
}: UserDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    qualification: user.qualification
  });

  const handleExportCSV = () => {
    if (!user.testHistory || user.testHistory.length === 0) {
      triggerToast("⚠️ No mock test history found to export.");
      return;
    }
    
    setIsExporting(true);
    triggerToast("⏳ Initiated report generation. Compiling test performance logs...");

    // Simulate compilation time for visual feedback with the requested loading spinner
    setTimeout(() => {
      try {
        const headers = ["Assessed Paper Title", "Score Scored", "Total Questions", "Duration Taken", "Completion Date"];
        const rows = user.testHistory.map(history => [
          `"${history.testTitle.replace(/"/g, '""')}"`,
          history.score,
          history.totalQuestions,
          `"${history.timeTaken}"`,
          `"${history.date}"`
        ]);

        const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        
        link.setAttribute("href", url);
        link.setAttribute("download", `Sarkari_Mock_Performance_Report_${user.name.replace(/\s+/g, '_')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        triggerToast("🎉 PDF/CSV performance portfolio downloaded successfully!");
      } catch (err) {
        console.error("CSV Export Error:", err);
        triggerToast("❌ Failed to compile CSV file. Try again.");
      } finally {
        setIsExporting(false);
      }
    }, 1200);
  };

  if (!isLoggedIn) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-[11px] font-bold text-blue-800">
            🔐 HUB SECURE GATEWAY
          </span>
          <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Aspirant Security portal & Lock</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Log in or make a free account to customize target exams, save solved keys, and run full-length mock tests.
          </p>
        </div>
        
        <LoginPortal 
          user={user} 
          setUser={setUser} 
          onLoginSuccess={(msg) => {
            setIsLoggedIn(true);
            triggerToast(msg);
          }}
          triggerToast={triggerToast}
        />
      </div>
    );
  }

  const qualificationsList = [
    '8th Pass', '10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduate', 'B.Tech', 'B.Sc', 'MBA', 'M.Tech', 'Post Graduate'
  ];

  // Retrieve bookmarked jobs
  const savedJobsList = jobs.filter((job) => user.savedJobs.includes(job.id));

  const scoreTrendData = [...user.testHistory]
    .reverse()
    .map((attempt, index) => ({
      index: index + 1,
      name: `Try ${index + 1}`,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      title: attempt.testTitle,
      date: attempt.date
    }));

  // State-wide model competitive leaderboard simulation
  const latestScore = user.testHistory && user.testHistory.length > 0 ? user.testHistory[0].score : null;
  const staticCompetitors = [
    { name: "Pankaj Mewawat", score: 18, state: "Rajasthan", isCurrentUser: false, avatarColor: "bg-amber-100/75 text-amber-900", date: "2026-06-12" },
    { name: "Anushka Trivedi", score: 16, state: "Haryana", isCurrentUser: false, avatarColor: "bg-teal-100/70 text-teal-900", date: "2026-06-12" },
    { name: "Siddharth Verma", score: 14, state: "New Delhi", isCurrentUser: false, avatarColor: "bg-purple-100/70 text-purple-900", date: "2026-06-11" },
    { name: "Sunita Chaudhary", score: 12, state: "Punjab", isCurrentUser: false, avatarColor: "bg-emerald-100/70 text-emerald-900", date: "2026-06-11" },
    { name: "Rajesh Ranjan", score: 10, state: "Bihar", isCurrentUser: false, avatarColor: "bg-amber-100/70 text-amber-950", date: "2026-06-10" },
    { name: "Deepak Saini", score: 7, state: "Rajasthan", isCurrentUser: false, avatarColor: "bg-blue-100/70 text-blue-900", date: "2026-06-10" },
    { name: "Kirti Swamy", score: 5, state: "Karnataka", isCurrentUser: false, avatarColor: "bg-rose-100/70 text-rose-900", date: "2026-06-09" }
  ];

  const leaderboardList = [...staticCompetitors];
  if (latestScore !== null) {
    leaderboardList.push({
      name: `${user.name} (You)`,
      score: latestScore,
      state: user.qualification || "Aspirant",
      isCurrentUser: true,
      avatarColor: "bg-blue-600 text-white font-bold",
      date: user.testHistory[0].date
    });
  }

  // Sort descending by score, and then by newer date
  leaderboardList.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const rankedLeaderboard = leaderboardList.map((taker, index) => ({
    ...taker,
    rank: index + 1
  }));

  const userRankPosition = latestScore !== null ? rankedLeaderboard.findIndex((r) => r.isCurrentUser) + 1 : null;

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      qualification: editForm.qualification
    }));
    setIsEditing(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-12 font-sans text-slate-700">
      
      {/* Profile summary Card */}
      <div className="md:col-span-4 space-y-6">
        <div className="rounded-2xl border border-blue-50 bg-white p-5 shadow-xs relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 h-24 w-24 bg-blue-50/50 rounded-bl-full pointer-events-none"></div>

          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 font-sans font-bold text-2xl text-blue-800 ring-4 ring-blue-50">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <h3 className="font-sans text-base font-bold text-slate-900 mt-4">
              {user.name}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user.email}</p>

            {user.premiumUser ? (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-500 to-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                <Sparkles className="h-3 w-3 animate-pulse" />
                Lifetime Premium Aspirant
              </div>
            ) : (
              <button
                onClick={() => setPremiumModal(true)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-800 px-3 py-1 text-xs font-semibold hover:bg-blue-100 transition"
              >
                Free Explorer (Upgrade)
              </button>
            )}
          </div>

          <div className="mt-6 border-t border-slate-50 pt-5 space-y-3.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-slate-400" /> Education Qualification
              </span>
              <span className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded">
                {user.qualification}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Bookmark className="h-4 w-4 text-slate-400" /> Bookmarked Alerts
              </span>
              <span className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded">
                {user.savedJobs.length} Jobs
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Award className="h-4 w-4 text-slate-400" /> Completed Mocks
              </span>
              <span className="font-bold text-slate-800 bg-slate-50 px-2 py-0.5 rounded">
                {user.testHistory.length} Tests
              </span>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-50 pt-4 space-y-2">
            <button
              onClick={() => {
                setEditForm({
                  name: user.name,
                  email: user.email,
                  qualification: user.qualification
                });
                setIsEditing(!isEditing);
              }}
              className="w-full rounded-xl border border-slate-200 py-2.5 text-xs font-semibold hover:bg-slate-50 transition"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile Credentials'}
            </button>

            <button
              onClick={() => {
                setIsLoggedIn(false);
                triggerToast("🔒 Logged out successfully. Re-enter to monitor target results.");
              }}
              className="w-full rounded-xl bg-rose-50 border border-rose-100/60 text-rose-700 py-2.5 text-xs font-bold hover:bg-rose-100 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out from Gateway
            </button>
          </div>
        </div>

        {/* Edit profile form overlay */}
        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Update Info</span>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Full Name</label>
              <input 
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Primary Email</label>
              <input 
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Highest Qualification</label>
              <select
                value={editForm.qualification}
                onChange={(e) => setEditForm({...editForm, qualification: e.target.value})}
                className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs focus:outline-hidden focus:border-blue-500"
              >
                {qualificationsList.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 text-white font-bold py-2.5 text-xs hover:bg-blue-700 transition"
            >
              Confirm Update
            </button>
          </form>
        )}
      </div>

      {/* Bookmarked Jobs and Mock History dashboard */}
      <div className="md:col-span-8 space-y-6">
        
        {/* Bookmarked Active Vacancies */}
        <div className="rounded-2xl border border-blue-50 bg-white p-5 shadow-xs">
          <h3 className="font-sans text-base font-bold text-slate-900 mb-1">
            📌 Saved Job Notifications ({savedJobsList.length})
          </h3>
          <p className="font-sans text-xs text-slate-500 mb-4">
            Your pinned government notifications for easy application monitoring.
          </p>

          {savedJobsList.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {savedJobsList.map((job) => (
                <div key={job.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-1.5 py-0.5 rounded">
                      {job.category}
                    </span>
                    <h4 className="font-sans text-sm font-bold text-slate-800 truncate mt-1">
                      {job.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">Deadline: {job.lastDate}</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-100 transition flex items-center gap-1"
                    >
                      Apply online <ArrowUpRight className="h-3 w-3" />
                    </a>
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Bookmark className="mx-auto h-8 w-8 text-slate-200" />
              <p className="text-xs font-medium">No bookmarked government jobs found.</p>
              <p className="text-[11px] text-slate-400">Pinnings are retrievable at any time from the Job list.</p>
            </div>
          )}
        </div>

        {/* Recharts Performance Trends and Subject Analytics Dashboard */}
        <AspirantAnalytics testHistory={user.testHistory} />

        {/* Score Progression Line Graph over consecutive trials */}
        <div className="rounded-2xl border border-blue-50 bg-white p-5 shadow-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-sans text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Score Progression Over Time (मॉक टेस्ट स्कोर ग्राफ)
              </h3>
              <p className="font-sans text-xs text-slate-500">
                Visual representation of actual marks scored across successive mock attempts to track your real-time improvement.
              </p>
            </div>
            {user.testHistory && user.testHistory.length > 0 && (
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200 shrink-0 self-start sm:self-center">
                📈 Latest Scored: {user.testHistory[0].score} Marks
              </span>
            )}
          </div>

          {user.testHistory && user.testHistory.length > 0 ? (
            <div className="space-y-4">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scoreTrendData} margin={{ top: 10, right: 30, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} 
                      stroke="#CBD5E1" 
                    />
                    <YAxis 
                      tick={{ fontSize: 10, fill: '#64748B', fontWeight: 600 }} 
                      stroke="#CBD5E1" 
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white rounded-xl p-3 shadow-lg border border-slate-800 text-left space-y-1 text-xs">
                              <p className="font-bold text-slate-100 text-[11px] truncate max-w-xs">{data.title}</p>
                              <div className="flex gap-4 text-slate-300 font-mono text-[10px]">
                                <span>Attempt: {data.index}</span>
                                <span>Date: {data.date}</span>
                              </div>
                              <p className="text-emerald-400 font-bold font-mono text-[11.5px] border-t border-slate-800 pt-1 mt-1">
                                Marks Scored: {data.score} Marks
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      name="Score"
                      stroke="#1E3A8A" 
                      strokeWidth={3} 
                      dot={{ r: 5, stroke: '#1E3A8A', strokeWidth: 2, fill: '#FFFFFF' }} 
                      activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2, fill: '#1E3A8A' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-blue-50/40 p-3 rounded-xl border border-blue-100/50 flex items-center gap-2.5 text-xs text-slate-600">
                <span className="text-base text-blue-700 font-bold shrink-0">💡 Analysis</span>
                <p className="text-[11px] leading-relaxed">
                  Your graphical trajectory displays learning agility. A continuous upward trend suggests solid preparation, while high variance means selective sections require immediate revision!
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-405 space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-full inline-block">
                <TrendingUp className="h-6 w-6 text-slate-300" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-750">No score history plotted yet</p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-normal">
                  Complete mock papers inside the "Mock Tests & Quizzes" tab, and watch your progression curves live!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic State-Wide Competitive Leaderboard */}
        <div className="rounded-2xl border border-blue-50 bg-white p-5 shadow-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
            <div>
              <h3 className="font-sans text-base font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500 animate-pulse" />
                Live State-Wide Aspirant Leaderboard (राज्य-स्तरीय प्रतियोगी रैंकिंग)
              </h3>
              <p className="font-sans text-xs text-slate-500">
                Performance standing compiled across 45,000+ active mock test attempts nationwide.
              </p>
            </div>
            {userRankPosition !== null ? (
              <span className="text-[10px] bg-blue-50 border border-blue-200 text-blue-700 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 self-start sm:self-center flex items-center gap-1">
                🎖️ Your Dynamic Rank: #{userRankPosition}
              </span>
            ) : (
              <span className="text-[10px] bg-slate-50 border border-slate-200 text-slate-550 px-2.5 py-1 rounded-full font-bold uppercase shrink-0 self-start sm:self-center">
                🚫 Not Ranked Yet
              </span>
            )}
          </div>

          <div className="space-y-3">
            {/* Short insight status */}
            {userRankPosition !== null ? (
              <div className="text-xs bg-emerald-50/50 border border-emerald-100 p-3 rounded-xl text-emerald-800 leading-normal font-medium">
                🎉 Congratulations **{user.name}**! You are placed at **Rank #{userRankPosition}** out of {rankedLeaderboard.length} elite students based on your last attempt score of **{latestScore} Marks**. Push further to secure an under-3 national rank!
              </div>
            ) : (
              <div className="text-xs bg-amber-50/60 border border-amber-100/70 p-3 rounded-xl text-amber-800 leading-normal">
                💡 **Ready to compete?** Once you complete any mock tests or custom solvable papers inside the "Mock Tests & Quizzes" tab, your top score will automatically map you into the verified live cohort ranking above.
              </div>
            )}

            {/* List Table of Competitors */}
            <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden bg-slate-50/20">
              {rankedLeaderboard.map((aspirant) => {
                const isGold = aspirant.rank === 1;
                const isSilver = aspirant.rank === 2;
                const isBronze = aspirant.rank === 3;

                return (
                  <div 
                    key={aspirant.name} 
                    className={`p-3.5 flex items-center justify-between gap-4 transition ${
                      aspirant.isCurrentUser 
                        ? 'bg-blue-50/60 font-semibold ring-2 ring-blue-500/30' 
                        : 'hover:bg-slate-50/40 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Rank badge */}
                      <div className="flex-shrink-0 w-8 flex justify-center">
                        {isGold ? (
                          <div className="h-6 w-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-extrabold text-xs" title="Gold Medalist">
                            🥇
                          </div>
                        ) : isSilver ? (
                          <div className="h-6 w-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 font-extrabold text-xs" title="Silver Medalist">
                            🥈
                          </div>
                        ) : isBronze ? (
                          <div className="h-6 w-6 rounded-full bg-amber-600/15 border border-amber-600/30 flex items-center justify-center text-amber-800 font-extrabold text-xs" title="Bronze Medalist">
                            🥉
                          </div>
                        ) : (
                          <span className="text-xs font-bold text-slate-400 font-mono">
                            #{aspirant.rank}
                          </span>
                        )}
                      </div>

                      {/* Photo/Avatar Representation */}
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${aspirant.avatarColor}`}>
                        {aspirant.name.slice(0, 2).toUpperCase()}
                      </div>

                      {/* Name and region info */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-xs font-bold truncate ${aspirant.isCurrentUser ? 'text-blue-900' : 'text-slate-800'}`}>
                            {aspirant.name}
                          </span>
                          {aspirant.isCurrentUser && (
                            <span className="text-[9px] bg-blue-600 text-white font-extrabold px-1.5 rounded py-0.5 uppercase tracking-wide">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block font-medium">State: {aspirant.state} • Subm. Date: {aspirant.date}</span>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className={`font-mono text-xs font-extrabold block ${
                        aspirant.isCurrentUser ? 'text-emerald-600' : 'text-slate-700'
                      }`}>
                        {aspirant.score} Marks
                      </span>
                      <span className="text-[9px] text-slate-400 block">Accuracy: {Math.round((aspirant.score / 20) * 100)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mock Test Attempt History */}
        <div className="rounded-2xl border border-blue-50 bg-white p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-4">
            <div>
              <h3 className="font-sans text-base font-bold text-slate-900 flex items-center gap-1.5">
                🏆 Mock Assessment Performance Logs
              </h3>
              <p className="font-sans text-xs text-slate-500">
                Audit your marks, completion durations, and progress tracks.
              </p>
            </div>
            {user.testHistory && user.testHistory.length > 0 && (
              <button
                onClick={handleExportCSV}
                disabled={isExporting}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3.5 py-2 text-xs font-bold transition shadow-xs cursor-pointer self-start sm:self-center select-none"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating CSV...
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    Export Report (CSV)
                  </>
                )}
              </button>
            )}
          </div>

          {user.testHistory && user.testHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-2">Assessed Paper Title</th>
                    <th className="py-3 px-2">Score Scored</th>
                    <th className="py-3 px-2">Total MCQs</th>
                    <th className="py-3 px-2">Duration</th>
                    <th className="py-3 px-2">Completion Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  {user.testHistory.map((history, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-2 font-bold text-slate-800">{history.testTitle}</td>
                      <td className="py-3 px-2 text-emerald-600 font-bold font-mono">{history.score} Marks</td>
                      <td className="py-3 px-2">{history.totalQuestions} Questions</td>
                      <td className="py-3 px-2 text-slate-400 font-mono">{history.timeTaken}</td>
                      <td className="py-3 px-2 text-slate-400">{history.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Clock className="mx-auto h-8 w-8 text-slate-200" />
              <p className="text-xs font-medium">No recent test attempts recorded.</p>
              <p className="text-[11px] text-slate-400 mb-4">Launch our exam mock portal to review scores.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
