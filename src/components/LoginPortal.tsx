import React, { useState } from 'react';
import { 
  User, Mail, Lock, CheckCircle2, AlertCircle, 
  Sparkles, Key, LogIn, ArrowRight, UserPlus, 
  GraduationCap, CheckSquare, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { UserProfile } from '../types';

interface LoginPortalProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onLoginSuccess: (msg: string) => void;
  triggerToast: (msg: string) => void;
}

interface SavedAccount {
  name: string;
  email: string;
  qualification: string;
  premiumUser: boolean;
  targetExams: string[];
}

export default function LoginPortal({
  user,
  setUser,
  onLoginSuccess,
  triggerToast
}: LoginPortalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [qualificationInput, setQualificationInput] = useState('Graduate');
  const [selectedExams, setSelectedExams] = useState<string[]>(['SSC', 'Railway']);
  const [loading, setLoading] = useState(false);

  // Suggested preloaded accounts for demo testing
  const demoAccounts: SavedAccount[] = [
    {
      name: 'Sunil Kumar',
      email: 'sunilk94411@gmail.com',
      qualification: 'Graduate',
      premiumUser: true,
      targetExams: ['SSC', 'Bank', 'Railway', 'UPSC']
    },
    {
      name: 'Priya Sharma',
      email: 'priya.rajasthan@gmail.com',
      qualification: 'Post Graduate',
      premiumUser: false,
      targetExams: ['Rajasthan State PSC', 'UPSC', 'Teaching']
    },
    {
      name: 'Vikram Singh',
      email: 'vikram.army@defence.in',
      qualification: '12th Pass',
      premiumUser: false,
      targetExams: ['Army', 'Defence', 'Police']
    }
  ];

  const examCategories = [
    { id: 'SSC', label: 'Staff Selection (SSC)' },
    { id: 'Bank', label: 'Banking (SBI, IBPS)' },
    { id: 'Railway', label: 'Railway (RRB NTPC, ALP)' },
    { id: 'UPSC', label: 'UPSC CSE (Civil Services)' },
    { id: 'Rajasthan State PSC', label: 'Rajasthan State (RPSC, RSMSSB)' },
    { id: 'Army', label: 'Indian Army & Defence' },
    { id: 'State PSC', label: 'Other State Vacancies' }
  ];

  const qualificationsList = [
    '8th Pass', '10th Pass', '12th Pass', 'ITI', 'Diploma', 'Graduate', 'B.Tech', 'B.Sc', 'MBA', 'M.Tech', 'Post Graduate'
  ];

  const toggleExamSelection = (examId: string) => {
    setSelectedExams(prev => 
      prev.includes(examId) 
        ? prev.filter(id => id !== examId) 
        : [...prev, examId]
    );
  };

  const handleDemoSignIn = (account: SavedAccount) => {
    setLoading(true);
    setTimeout(() => {
      setUser({
        name: account.name,
        email: account.email,
        qualification: account.qualification,
        savedJobs: [],
        savedPDFs: [],
        premiumUser: account.premiumUser,
        premiumPlan: account.premiumUser ? 'Lifetime' : undefined,
        testHistory: []
      });
      setLoading(false);
      onLoginSuccess(`👋 Welcome back, ${account.name}! Logged in successfully.`);
    }, 850);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      triggerToast("⚠️ Email and password are required.");
      return;
    }
    if (isSignUp && !nameInput.trim()) {
      triggerToast("⚠️ Full Name is required to sign up.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const finalName = isSignUp ? nameInput : emailInput.split('@')[0];
      setUser({
        name: finalName,
        email: emailInput,
        qualification: qualificationInput,
        savedJobs: [],
        savedPDFs: [],
        premiumUser: false,
        testHistory: []
      });
      setLoading(false);
      onLoginSuccess(
        isSignUp 
          ? `🎉 Account created successfully for ${finalName}! Welcome to Job Sarkari Hub.`
          : `🤝 Logged in successfully as ${finalName}.`
      );
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-12 font-sans text-slate-800">
      
      {/* Intro info sidebar */}
      <div className="md:col-span-5 bg-gradient-to-b from-[#1E3A8A] to-indigo-950 rounded-3xl p-6 text-white flex flex-col justify-between border border-blue-900 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Sparkles className="h-56 w-56 -mr-10 -mb-10 text-yellow-300" />
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1E3A8A] font-bold text-lg">
            S
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-extrabold tracking-tight">Sarkari Exams Locker</h3>
            <p className="text-xs text-blue-200 leading-relaxed">
              Create an account or login to customize recruitment reminders, access AI Doubt Mitra, and save Mock Assessment results.
            </p>
          </div>

          <div className="space-y-3.5 pt-4">
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 bg-white/10 text-yellow-400 rounded-full flex items-center justify-center font-extrabold text-[10px] mt-0.5">✓</span>
              <div>
                <p className="font-bold text-xs">Dynamic Vacancy Feeds</p>
                <p className="text-[11px] text-blue-200 mt-0.5">Customized automatically for SSC, Banking, Army & State PSC.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-4 h-4 bg-white/10 text-yellow-400 rounded-full flex items-center justify-center font-extrabold text-[10px] mt-0.5">✓</span>
              <div>
                <p className="font-bold text-xs">Interactive Exam Calendar</p>
                <p className="text-[11px] text-blue-200 mt-0.5">Never miss any application deadline or entrance exam date.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-800/60 text-[10px] text-blue-300 flex items-center gap-1.5 leading-tight relative z-10">
          <ShieldCheck className="h-4.5 w-4.5 text-blue-400 shrink-0" />
          <span>Secure sandbox authentication. Use any simulated credentials.</span>
        </div>
      </div>

      {/* Login / Registration form card */}
      <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
        
        {/* Toggle Login type */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setIsSignUp(false)}
            className={`w-full py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              !isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="h-3.5 w-3.5" /> Sign In Here
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`w-full py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="h-3.5 w-3.5" /> Create Account (Sign Up)
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          {isSignUp && (
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase">Full Name</label>
              <div className="relative">
                <User className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Sunil Kumar"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase">Email Address</label>
            <div className="relative">
              <Mail className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                placeholder="sunilk94411@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all font-mono"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-slate-500 uppercase">Password</label>
            <div className="relative">
              <Lock className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all font-mono"
                required
              />
            </div>
          </div>

          {/* Qualification dropdown & Target exams for fresh signups */}
          {isSignUp && (
            <>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Highest Qualification</label>
                <div className="relative">
                  <GraduationCap className="absolute top-2.5 left-3 h-4.5 w-4.5 text-slate-400" />
                  <select
                    value={qualificationInput}
                    onChange={(e) => setQualificationInput(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all"
                  >
                    {qualificationsList.map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase">Select Target Exams (Interests):</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {examCategories.map((exam) => {
                    const isSelected = selectedExams.includes(exam.id);
                    return (
                      <button
                        type="button"
                        key={exam.id}
                        onClick={() => toggleExamSelection(exam.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                          isSelected 
                            ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        <CheckSquare className={`h-4 w-4 shrink-0 ${isSelected ? 'text-blue-700' : 'text-slate-300'}`} />
                        <span className="truncate">{exam.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10 cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Verifying Credentials...
              </>
            ) : isSignUp ? (
              <>
                Confirm Join Hub <ArrowRight className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                Sign In Securely <ArrowRight className="h-3.5 w-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Sandbox Login Profile switcher */}
        <div className="border-t border-slate-100 pt-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Demo Sandbox Profiles (1-Click Login):</span>
            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Fast Access</span>
          </div>
          
          <div className="grid gap-2 sm:grid-cols-3">
            {demoAccounts.map((account, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDemoSignIn(account)}
                className="p-3 text-left border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50 rounded-xl transition duration-150 text-xs text-slate-705 cursor-pointer hover:shadow-xs group"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition">{account.name}</h4>
                  {account.premiumUser && <Sparkles className="h-3.5 w-3.5 text-amber-500 inline fill-amber-500" />}
                </div>
                <p className="text-[10px] font-mono text-slate-450 mt-1 truncate">{account.email}</p>
                <div className="mt-2.5 flex flex-wrap gap-1">
                  {account.targetExams.slice(0, 2).map((tg, key) => (
                    <span key={key} className="bg-blue-50/70 border border-blue-100 text-[9px] px-1 rounded text-blue-800 uppercase font-medium">
                      {tg}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
