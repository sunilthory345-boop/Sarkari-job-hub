import React, { useState } from 'react';
import { 
  X, Mail, Lock, User, GraduationCap, CheckSquare, 
  Sparkles, ShieldCheck, ArrowRight, LogIn, UserPlus, RefreshCw 
} from 'lucide-react';
import { UserProfile } from '../types';
import { LocaleType } from '../utils/lang';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  triggerToast: (msg: string) => void;
  locale?: LocaleType;
}

interface SavedAccount {
  name: string;
  email: string;
  qualification: string;
  premiumUser: boolean;
  targetExams: string[];
}

export default function AuthModal({
  isOpen,
  onClose,
  user,
  setUser,
  isLoggedIn,
  setIsLoggedIn,
  triggerToast,
  locale = 'en'
}: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [qualificationInput, setQualificationInput] = useState('Graduate');
  const [selectedExams, setSelectedExams] = useState<string[]>(['SSC', 'Railway']);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Translation helpers for local interactive modal
  const textDict = {
    en: {
      title: "Interactive Candidate Guard",
      sub: "Log in or build a free credentials locker to save mock attempts and bookmark vacancies.",
      signInTab: "Sign In Securely",
      signUpTab: "New Candidate Register",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      passLabel: "Access Password",
      qualLabel: "Highest Qualification",
      targetLabel: "Target Govt Exams",
      triggerBtnIn: "Authenticate & Open Locker",
      triggerBtnUp: "Create My Sarkari Account",
      loaderText: "Verifying sandbox keys...",
      demoTitle: "Fast 1-Click Sandbox Portals",
      secureNote: "Secure sandbox environment. You may use any email and password."
    },
    hi: {
      title: "उम्मीदवार डिजिटल लॉकर",
      sub: "सरकारी परीक्षाओं के लिए मॉक टेस्ट का परिणाम स्टोर करने व रिक्तियों को सहेजने हेतु लॉग इन करें।",
      signInTab: "खाते में प्रवेश करें",
      signUpTab: "नया उम्मीदवार पंजीकरण",
      nameLabel: "पूरा नाम",
      emailLabel: "ईमेल आईडी",
      passLabel: "सुरक्षित पासवर्ड",
      qualLabel: "शैक्षणिक योग्यता",
      targetLabel: "लक्ष्य परीक्षाएं",
      triggerBtnIn: "सुरक्षित लॉगिन करें",
      triggerBtnUp: "नया खाता तैयार करें",
      loaderText: "सांडबॉक्स कुंजियों की पुष्टि...",
      demoTitle: "1-क्लिक रैपिड सांडबॉक्स लॉगिन",
      secureNote: "यह एक सुरक्षित विकास वातावरण है। किसी भी काल्पनिक विवरण का उपयोग करें।"
    },
    mr: {
      title: "उमेदवार डिजी लॉकर",
      sub: "मॉक परीक्षांचे निकाल सुरक्षित ठेवण्यासाठी आणि आवडत्या नोकऱ्या सेव्ह करण्यासाठी लॉग इन करा.",
      signInTab: "सुरक्षित प्रवेश",
      signUpTab: "नवीन नोंदणी",
      nameLabel: "पूर्ण नाव",
      emailLabel: "ईमेल पत्ता",
      passLabel: "पासवर्ड",
      qualLabel: "शिक्षण पातळी",
      targetLabel: "निवडलेल्या परीक्षा",
      triggerBtnIn: "लॉगिन पूर्ण करा",
      triggerBtnUp: "नवीन खाते तयार करा",
      loaderText: "प्रमाणपत्रे तपासत आहे...",
      demoTitle: "१-क्लिक झटपट लॉगिन पर्याय",
      secureNote: "सुरक्षित डेव्हलपमेंट मोड. कोणताही ईमेल आणि पासवर्ड चालेल."
    },
    rj: {
      title: "परीक्षा डिजिटल लॉकर",
      sub: "मॉक टेस्ट रो स्कोर अर वैकेंसी सेव करण सारु खातो खोलो सा।",
      signInTab: "साइन इन करो सा",
      signUpTab: "नयो खातो खोलो सा",
      nameLabel: "पूरों नाम",
      emailLabel: "ईमेल कागत",
      passLabel: "सुरक्षित पासवर्ड",
      qualLabel: "भणतर (Qualification)",
      targetLabel: "तैयारी री परीक्षा",
      triggerBtnIn: "लॉकर चालू करो सा",
      triggerBtnUp: "खातो बणावो सा",
      loaderText: "खाते री जांच होवे है सा...",
      demoTitle: "१-क्लिक फटाफट लॉगिन सांडबॉक्स",
      secureNote: "एकदम सुरक्षित सांडबॉक्स है। कोई भी पासवर्ड लगा सको सा।"
    }
  };

  const t = textDict[locale] || textDict['en'];

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
    { id: 'Railway', label: 'Railway (RRB)' },
    { id: 'UPSC', label: 'UPSC CSE (Civils)' },
    { id: 'Rajasthan State PSC', label: 'Rajasthan State (RPSC)' },
    { id: 'Army', label: 'Defence & Police' }
  ];

  const qualificationsList = [
    '10th Pass', '12th Pass', 'Diploma', 'Graduate', 'B.Tech', 'Post Graduate'
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
      setIsLoggedIn(true);
      setLoading(false);
      triggerToast(`👋 Welcome back, ${account.name}! Logged in successfully via credentials locker.`);
      onClose();
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !passwordInput.trim()) {
      triggerToast("⚠️ Email and password are required.");
      return;
    }
    if (isSignUp && !nameInput.trim()) {
      triggerToast("⚠️ Custom Name is required to register.");
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
      setIsLoggedIn(true);
      setLoading(false);
      triggerToast(
        isSignUp 
          ? `🎉 Welcome ${finalName}! Your Sarkari portal is ready.`
          : `🤝 Access granted. Welcome back, ${finalName}!`
      );
      onClose();
    }, 1000);
  };

  return (
    <div 
      id="auth-modal-overlay" 
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all duration-300 animate-fade-in"
    >
      <div 
        id="auth-modal-container"
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-blue-50 shadow-2xl overflow-hidden grid md:grid-cols-12 max-h-[90vh] md:max-h-none overflow-y-auto"
      >
        {/* Left branding bar (Hidden on mobile for micro-spacing) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-b from-[#1E3A8A] to-indigo-950 p-6 text-white flex-col justify-between relative">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15),transparent)]"></div>
          <div className="space-y-4 relative z-10">
            <span className="inline-block bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/30">
              🔑 SECURE GATEWAY
            </span>
            <h3 className="font-sans text-base font-extrabold text-white tracking-tight">{t.title}</h3>
            <p className="font-sans text-[11px] text-blue-200 leading-relaxed">{t.sub}</p>
            
            <div className="space-y-2 pt-3 border-t border-blue-800/60">
              <div className="flex items-center gap-1.5 text-[10px] text-blue-100">
                <span className="text-yellow-400">⚡</span>
                <span>Instant PYQ Solutions</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-blue-100">
                <span className="text-yellow-400">⚡</span>
                <span>Track 10+ State PSC Exams</span>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <div className="flex items-center gap-1 text-[9px] text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />
              <span>{t.secureNote}</span>
            </div>
          </div>
        </div>

        {/* Right form sector */}
        <div className="col-span-12 md:col-span-7 p-6 flex flex-col justify-between relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-5">
            {/* Header info */}
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 md:hidden">
                <span>🔑</span> {t.title}
              </h4>
            </div>

            {/* In/Up Tabs Selector */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setIsSignUp(false)}
                className={`w-full py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                  !isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LogIn className="h-3.5 w-3.5" /> {t.signInTab}
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`w-full py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                  isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserPlus className="h-3.5 w-3.5" /> {t.signUpTab}
              </button>
            </div>

            {/* Input Form structure */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5">
              {isSignUp && (
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">{t.nameLabel}</label>
                  <div className="relative">
                    <User className="absolute top-2 left-3 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Sunil Kumar"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all font-sans"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">{t.emailLabel}</label>
                <div className="relative">
                  <Mail className="absolute top-2 left-3 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="sunil.kumar@gmail.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase">{t.passLabel}</label>
                <div className="relative">
                  <Lock className="absolute top-2 left-3 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {isSignUp && (
                <>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">{t.qualLabel}</label>
                    <div className="relative">
                      <GraduationCap className="absolute top-2 left-3 h-4 w-4 text-slate-400" />
                      <select
                        value={qualificationInput}
                        onChange={(e) => setQualificationInput(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-1.5 pr-4 pl-9 text-xs focus:bg-white focus:outline-hidden focus:border-blue-500 transition-all font-sans"
                      >
                        {qualificationsList.map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">{t.targetLabel}</label>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                      {examCategories.map((exam) => {
                        const isSelected = selectedExams.includes(exam.id);
                        return (
                          <button
                            type="button"
                            key={exam.id}
                            onClick={() => toggleExamSelection(exam.id)}
                            className={`p-1.5 rounded-lg border text-left flex items-center gap-1 transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold' 
                                : 'bg-white hover:bg-slate-50/50 border-slate-200 text-slate-600'
                            }`}
                          >
                            <CheckSquare className={`h-3 w-3 shrink-0 ${isSelected ? 'text-blue-700' : 'text-slate-350'}`} />
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
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/15 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" /> {t.loaderText}
                  </>
                ) : isSignUp ? (
                  <>
                    {t.triggerBtnUp} <ArrowRight className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    {t.triggerBtnIn} <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Acc Choice */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{t.demoTitle}</span>
                <span className="text-[8px] font-sans font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase">Fast Pass</span>
              </div>

              <div className="grid gap-2 grid-cols-3">
                {demoAccounts.map((account, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleDemoSignIn(account)}
                    className="p-2.5 text-left border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50 rounded-xl transition duration-150 text-[10px] text-slate-700 cursor-pointer hover:shadow-2xs group"
                  >
                    <div className="flex justify-between items-center">
                      <h5 className="font-extrabold text-slate-800 group-hover:text-blue-700 transition truncate">{account.name}</h5>
                      {account.premiumUser && <Sparkles className="h-3 w-3 text-amber-500 inline fill-amber-500 shrink-0" />}
                    </div>
                    <p className="text-[8px] font-mono text-slate-400 mt-0.5 truncate">{account.email}</p>
                    <p className="text-[8px] font-bold text-blue-600 mt-1 uppercase tracking-tight">{account.targetExams[0]} Aspirant</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
