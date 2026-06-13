import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Calendar, MapPin, IndianRupee, BookOpen, 
  Sparkles, Award, ShieldAlert, Clock, Star, Bell, 
  CheckCircle, ArrowUpRight, GraduationCap, FileText, 
  HelpCircle, Download, CheckSquare, Send, Mail, Phone, 
  Building2, Globe, Heart, ShieldCheck, Zap, CreditCard, Plus, Share2, ChevronDown, ChevronUp, Printer, Link, Camera, X
} from 'lucide-react';

import { GovJob, AdmitCard, JobResult, MockTest, CurrentAffair, Blog, UserProfile } from './types';
import { 
  INITIAL_JOBS, INITIAL_ADMIT_CARDS, INITIAL_RESULTS, 
  INITIAL_MOCK_TESTS, INITIAL_CURRENT_AFFAIRS, INITIAL_BLOGS 
} from './data/mockData';
import { LANGUAGES, TRANSLATIONS, LocaleType } from './utils/lang';

import Navbar from './components/Navbar';
import JobCard from './components/JobCard';
import MockTestPortal from './components/MockTestPortal';
import UserDashboard from './components/UserDashboard';
import AdminConsole from './components/AdminConsole';
import CalendarView from './components/CalendarView';
import PremiumPortal from './components/PremiumPortal';
import SyllabusPlanner from './components/SyllabusPlanner';
import ObjectionPortal from './components/ObjectionPortal';
import SarkariUploadVault from './components/SarkariUploadVault';
import SarkariAds from './components/SarkariAds';
import AuthModal from './components/AuthModal';

export default function App() {
  // ----- ROOT PERSISTENT STATE -----
  const [jobs, setJobs] = useState<GovJob[]>(() => {
    const saved = localStorage.getItem('sarkari_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [admitCards, setAdmitCards] = useState<AdmitCard[]>(() => {
    const saved = localStorage.getItem('sarkari_admit_cards');
    return saved ? JSON.parse(saved) : INITIAL_ADMIT_CARDS;
  });

  const [results, setResults] = useState<JobResult[]>(() => {
    const saved = localStorage.getItem('sarkari_results');
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [mockTests, setMockTests] = useState<MockTest[]>(() => {
    const saved = localStorage.getItem('sarkari_mock_tests');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_TESTS;
  });

  const [currentAffairs] = useState<CurrentAffair[]>(INITIAL_CURRENT_AFFAIRS);
  const [blogs] = useState<Blog[]>(INITIAL_BLOGS);

  const [pyqsList, setPyqsList] = useState<{ title: string; type: string; size: string; year: number; exam: string; premium: boolean }[]>(() => {
    const saved = localStorage.getItem('sarkari_pyqs');
    return saved ? JSON.parse(saved) : [
      { title: 'UPSC IAS General Studies 2024 Solved paper compilation', type: 'Solved PDF Booklet', size: '3.8 MB', year: 2024, exam: 'UPSC', premium: false },
      { title: 'SSC CHSL Quant & Logical Reasoning (10+2) sets', type: 'Practice Sheets', size: '1.2 MB', year: 2024, exam: 'SSC', premium: false },
      { title: 'IBPS PO Reasoning Mains 5-Year combined compilation', type: 'Solved Booklet', size: '4.8 MB', year: 2023, exam: 'Bank', premium: true }
    ];
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sarkari_user_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Sunil Kumar',
      email: 'sunilk94411@gmail.com', // Pre-populated from user metadata
      qualification: 'Graduate',
      savedJobs: [],
      savedPDFs: [],
      premiumUser: false,
      testHistory: [
        {
          id: 'mock-hist-1',
          testTitle: 'SSC CGL Quantitative Aptitude High-Speed Mock',
          score: 38,
          totalQuestions: 25,
          correctAnswers: 19,
          timeTaken: '11:45',
          date: '2026-06-01'
        },
        {
          id: 'mock-hist-2',
          testTitle: 'UPSC Civil Services Indian Polity Practice Paper',
          score: 44,
          totalQuestions: 30,
          correctAnswers: 22,
          timeTaken: '14:20',
          date: '2026-06-03'
        },
        {
          id: 'mock-hist-3',
          testTitle: 'RRB NTPC Physics & Chemical General Science Test',
          score: 24,
          totalQuestions: 25,
          correctAnswers: 16,
          timeTaken: '08:10',
          date: '2026-06-05'
        },
        {
          id: 'mock-hist-4',
          testTitle: 'IBPS Clerk Reasoning & Analogy Puzzle Series',
          score: 46,
          totalQuestions: 50,
          correctAnswers: 38,
          timeTaken: '22:15',
          date: '2026-06-08'
        },
        {
          id: 'mock-hist-5',
          testTitle: 'SSC General Awareness History & Heritage Section',
          score: 36,
          totalQuestions: 40,
          correctAnswers: 31,
          timeTaken: '15:30',
          date: '2026-06-11'
        }
      ]
    };
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [locale, setLocale] = useState<LocaleType>(() => {
    const saved = localStorage.getItem('sarkari_locale');
    return (saved as LocaleType) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('sarkari_locale', locale);
  }, [locale]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('sarkari_is_logged_in');
    return saved ? saved === 'true' : false;
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('sarkari_is_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  // Premium Transactions History types and state
  interface PremiumTransaction {
    id: string;
    date: string;
    plan: string;
    amount: string;
    status: 'COMPLETED' | 'PENDING' | 'REJECTED';
    refId: string;
  }

  const [premiumTransactions, setPremiumTransactions] = useState<PremiumTransaction[]>(() => {
    const saved = localStorage.getItem('sarkari_premium_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [notificationCount, setNotificationCount] = useState(3);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showWhyPremium, setShowWhyPremium] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [modalNotebookPhoto, setModalNotebookPhoto] = useState<string | null>(null);

  // Filter properties passed down to JobCard
  const [qualificationFilter, setQualificationFilter] = useState('All');

  // Contact support form
  const [contactForm, setContactForm] = useState({ name: '', email: '', query: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Payment states
  const [selectedPlan, setSelectedPlan] = useState<'Monthly' | 'Quarterly' | 'Yearly' | 'Lifetime'>('Lifetime');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card'>('UPI');
  const [upiId, setUpiId] = useState('sunilk94411@paytm');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dynamic searches
  const [homeJobSearch, setHomeJobSearch] = useState('');
  const [homeAdmitSearch, setHomeAdmitSearch] = useState('');

  // Sitemaps schema & SEO presentation simulation state
  const [viewingSEO, setViewingSEO] = useState(false);

  // Custom toast notification state
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'Job Sarkari Hub',
      text: 'Unlock exam prep, real-time results, daily syllabus planners, and comprehensive mock tests on Job Sarkari Hub!',
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        triggerToast("🎉 Thank you for sharing Job Sarkari Hub!");
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        triggerToast("📋 App link copied to clipboard! Share it with other aspirants.");
      } catch (err) {
        triggerToast("🚫 Clipboard copy failed. Share this link: " + shareData.url);
      }
    }
  };

  const handleCopyPaymentLink = async () => {
    const planPrices = {
      Monthly: "₹99",
      Quarterly: "₹199",
      Yearly: "₹499",
      Lifetime: "₹999"
    };
    const price = planPrices[selectedPlan] || "₹999";
    const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;
    const paymentText = `Job Sarkari Hub Premium Upgrade\n` +
      `Plan: ${selectedPlan} Access\n` +
      `Amount: ${price}\n` +
      `Reference ID: ${referenceId}\n` +
      `Checkout Link: ${window.location.origin}?ref=${referenceId}&plan=${selectedPlan.toLowerCase()}`;

    try {
      await navigator.clipboard.writeText(paymentText);
      triggerToast(`📋 ${selectedPlan} Access details copied with Ref ID: ${referenceId}!`);
    } catch (err) {
      triggerToast("🚫 Copy to clipboard failed.");
    }
  };

  const handleModalPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        triggerToast('🚫 Please capture or select a valid image file of your notebook.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setModalNotebookPhoto(dataUrl);
        localStorage.setItem('sarkari_notebook_photo_cached', dataUrl);
        triggerToast('📸 Physical notebook snapped! Premium upgrade will solve this query instantly.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Synchronizers
  useEffect(() => {
    localStorage.setItem('sarkari_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('sarkari_admit_cards', JSON.stringify(admitCards));
  }, [admitCards]);

  useEffect(() => {
    localStorage.setItem('sarkari_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('sarkari_mock_tests', JSON.stringify(mockTests));
  }, [mockTests]);

  useEffect(() => {
    localStorage.setItem('sarkari_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sarkari_pyqs', JSON.stringify(pyqsList));
  }, [pyqsList]);

  useEffect(() => {
    localStorage.setItem('sarkari_premium_transactions', JSON.stringify(premiumTransactions));
  }, [premiumTransactions]);

  useEffect(() => {
    if (user.premiumUser && premiumTransactions.length === 0) {
      const initialTrans: PremiumTransaction[] = [{
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        plan: user.premiumPlan || 'Lifetime',
        amount: user.premiumPlan === 'Monthly' ? '₹99' : user.premiumPlan === 'Quarterly' ? '₹199' : user.premiumPlan === 'Yearly' ? '₹499' : '₹999',
        status: 'COMPLETED',
        refId: `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`
      }];
      setPremiumTransactions(initialTrans);
    }
  }, [user.premiumUser, user.premiumPlan]);

  // Handle bookmarked jobs
  const toggleSaveJob = (jobId: string) => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      triggerToast("🔐 Please sign in or join to bookmark jobs.");
      return;
    }
    setUser(prev => {
      const exists = prev.savedJobs.includes(jobId);
      const updated = exists 
        ? prev.savedJobs.filter(id => id !== jobId)
        : [...prev.savedJobs, jobId];
      triggerToast(exists ? "Removed from bookmarked jobs." : "Job notification successfully bookmarked!");
      return { ...prev, savedJobs: updated };
    });
  };

  // Handle Mock Test completion saves
  const handleSaveTestResult = (result: {
    testTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: string;
  }) => {
    const timestamp = new Date().toISOString().split('T')[0];
    setUser(prev => ({
      ...prev,
      testHistory: [
        {
          id: `attempt-${Date.now()}`,
          testTitle: result.testTitle,
          score: result.score,
          totalQuestions: result.totalQuestions,
          correctAnswers: result.correctAnswers,
          timeTaken: result.timeTaken,
          date: timestamp
        },
        ...prev.testHistory
      ]
    }));
  };

  // Payment checkout triggers
  const handleCheckoutProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      const planPrices = {
        Monthly: "₹99",
        Quarterly: "₹199",
        Yearly: "₹499",
        Lifetime: "₹999"
      };
      const price = planPrices[selectedPlan] || "₹999";
      const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;

      const newTx: PremiumTransaction = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        plan: selectedPlan,
        amount: price,
        status: 'COMPLETED',
        refId: referenceId
      };

      setPremiumTransactions(prev => [newTx, ...prev]);

      setUser(prev => ({ 
        ...prev, 
        premiumUser: true,
        premiumPlan: selectedPlan
      }));
      setPaymentSuccess(false);
      setPremiumModalOpen(false);
      // Trigger a direct success dialogue
      triggerToast(`🎉 Congratulations ${user.name}! Your ${selectedPlan} Premium Access is successfully processed. Fully unlocked previous booklets and mock test analyzers.`);
    }, 2000);
  };

  // Support form submits
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', email: '', query: '' });
      triggerToast('📧 Message Sent! Our Helpdesk has filed ticket successfully. We will reach out within 24 business hours.');
    }, 1500);
  };

  // Quick Home redirect triggers
  const triggerQualTab = (qualName: string) => {
    setQualificationFilter(qualName);
    setActiveTab('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admit Cards list
  const filteredAdmitCards = admitCards.filter((card) => 
    card.title.toLowerCase().includes(homeAdmitSearch.toLowerCase()) ||
    card.org.toLowerCase().includes(homeAdmitSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 flex flex-col justify-between">
      
      {/* Navbar segment */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        setPremiumModal={setPremiumModalOpen}
        notificationCount={notificationCount}
        onClearNotifications={() => setNotificationCount(0)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        locale={locale}
        setLocale={setLocale}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Body wrap */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 flex-1">
        
        {/* TAB 1: HOME PAGE (DASHBOARD HIGHLIGHTS) */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            
            {/* National Emblem & Slogan Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-blue-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-12 shadow-xl shadow-blue-900/10 border border-blue-800/20">
              {/* Backglow blur effects */}
              <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                
                {/* Hero Slogan Left */}
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/25 px-3 py-1 text-xs font-bold text-blue-200 border border-blue-400/20">
                    <Star className="h-3 w-3 text-amber-400 animate-spin" /> No. 1 Job Portal in India
                  </div>
                  <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Sarkari Naukri Updates, Admit Cards & Results at <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-400">One Place</span>
                  </h1>
                  <p className="font-sans text-sm text-blue-200/90 max-w-xl leading-relaxed">
                    Stay ahead with prompt notifications, chapter-wise mock test structures, verified PDFs, and professional guidance compiled for SSC, Banking, Railways, UPSC & State Exams.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <button 
                      onClick={() => setActiveTab('jobs')}
                      className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition flex items-center gap-1"
                    >
                      Browse Vacancies <ArrowUpRight className="h-4.5 w-4.5" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('mock-tests')}
                      className="rounded-xl bg-white/10 px-6 py-3 text-sm font-extrabold text-white border border-white/20 hover:bg-white/15 transition"
                    >
                      Launch Mock Test
                    </button>
                  </div>
                </div>

                {/* Live stats center Right */}
                <div className="md:col-span-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 space-y-4 font-mono text-xs">
                  <span className="block text-[10px] font-bold text-blue-300 uppercase tracking-widest border-b border-white/10 pb-2">
                    🔴 Hub Live Telemetry
                  </span>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Active Positions:</span>
                      <span className="font-bold text-white">55,200+ Posts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Admit Cards Live:</span>
                      <span className="font-bold text-white">{admitCards.length} Live Links</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Registered Aspirants:</span>
                      <span className="font-bold text-emerald-400">42,500+ Active</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 text-[11px]">
                      <span className="text-amber-300 font-sans font-bold flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse" /> Gold Certified
                      </span>
                      <span className="text-white">Ad-Free Portal</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Search and qualification grids */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'UPSC Exams', color: 'border-amber-200 bg-amber-50/20 text-amber-800', category: 'UPSC', tag: 'Civil Services' },
                { label: 'Staff Selection (SSC)', color: 'border-blue-200 bg-blue-50/20 text-blue-800', category: 'SSC', tag: 'CGL & CHSL' },
                { label: 'Railway Exams (RRB)', color: 'border-emerald-200 bg-emerald-50/20 text-emerald-800', category: 'Railway', tag: 'NTPC & Group D' },
                { label: 'Military & Defence', color: 'border-rose-200 bg-rose-50/20 text-rose-800', category: 'Defence', tag: 'Army/Navy/AirForce' }
              ].map((card, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    // Quick category select simulation
                    setActiveTab('jobs');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className={`rounded-2xl border ${card.color} p-4 text-center cursor-pointer hover:scale-105 transition duration-200 group relative`}
                >
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{card.tag}</span>
                  <h4 className="font-sans text-sm font-bold mt-1 group-hover:underline text-slate-800">{card.label}</h4>
                  <p className="font-mono text-[9px] text-slate-400 font-semibold mt-1.5 flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Verified Updates
                  </p>
                </div>
              ))}
            </div>

            {/* Dedicated Multi-lingual Selection & Preparation Zone Section */}
            <div data-testid="multilingual-preparation-deck" className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm border-l-4 border-l-blue-600">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Globe className="h-5 w-5 animate-spin text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-sans text-sm md:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
                      <span>{locale === 'hi' ? 'भाषा चयन और बहुभाषी तैयारी केंद्र' : 'Language selection & bilingual prep desk'}</span>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 animate-pulse">BILINGUAL MOCKS LIVE</span>
                    </h3>
                    <p className="font-sans text-xs text-slate-500 mt-0.5">Choose your preparation language to translate the job boards, syllabuses, and mock test interfaces instantly.</p>
                  </div>
                </div>
                
                {/* Language pills picker */}
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-sans text-xs font-bold transition-all cursor-pointer ${
                        locale === lang.code 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-lingual quick stats of current selection */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 text-xs leading-relaxed text-left">
                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80">
                  <span className="font-mono text-[9px] text-blue-600 uppercase font-bold tracking-wider block">Selected Medium</span>
                  <p className="font-sans font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                    <span>{LANGUAGES.find(l => l.code === locale)?.flag}</span>
                    <strong>{LANGUAGES.find(l => l.code === locale)?.label}</strong>
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Your exam portal, notifications, and tests will adapt to this channel.</span>
                </div>

                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80">
                  <span className="font-mono text-[9px] text-orange-600 uppercase font-bold tracking-wider block">Bilingual Syllabus PDFs</span>
                  <p className="font-sans font-bold text-slate-800 mt-1">
                    📖 Available for All State PSC / SSC
                  </p>
                  <button 
                    onClick={() => setActiveTab('syllabus')}
                    className="text-[10px] text-blue-600 font-bold hover:underline block mt-1 text-left"
                  >
                    Download Localized Syllabus »
                  </button>
                </div>

                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80 sm:col-span-2 md:col-span-1">
                  <span className="font-mono text-[9px] text-emerald-600 uppercase font-bold tracking-wider block">AI Exam Assistant Help</span>
                  <p className="font-sans font-bold text-slate-800 mt-1">
                    🤖 {locale === 'hi' ? 'परीक्षा मित्र तैयार है' : 'Exam Mitra is Ready'}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Interactive doubt solving desk available {locale === 'hi' ? 'विशेष रूप से आपकी भाषा में' : 'fully native in your language'}.</span>
                </div>
              </div>
            </div>

            {/* Main grid columns */}
            <div className="grid gap-10 md:grid-cols-12">
              
              {/* Left Column (8 cols): Latest Job listings & category sections */}
              <div className="md:col-span-8 space-y-10">
                
                {/* Latest Jobs Highlight Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h3 className="font-sans text-base font-bold text-slate-900">
                      Latest Live Job Notifications
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('jobs')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View All Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {jobs.slice(0, 3).map((job) => (
                    <div 
                      key={job.id} 
                      className="bg-white rounded-2xl border border-slate-100 p-4 hover:border-blue-200 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      onClick={() => setActiveTab('jobs')}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {job.category} Exam
                          </span>
                          <span className="text-xs text-slate-400">{job.org}</span>
                        </div>
                        <h4 className="font-sans text-sm font-bold text-slate-800 mt-2 leading-snug">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}</span>
                          <span>•</span>
                          <span className="font-bold text-slate-700">Deadline: {job.lastDate}</span>
                        </div>
                      </div>

                      <button className="rounded-xl border border-blue-100 font-bold px-4 py-2 text-xs text-blue-600 hover:bg-blue-50/50 transition">
                        View Notice
                      </button>
                    </div>
                  ))}
                </div>

                {/* Educational qualification matrices */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
                  <h4 className="font-sans text-sm font-bold text-slate-900 border-b border-slate-50 pb-2">
                    💼 Qualification Wise Recruitment Listings
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs font-semibold">
                    {[
                      { label: '8th Pass', count: '1 Notice' },
                      { label: '10th Pass', count: '4 Active' },
                      { label: '12th Pass', count: '8 Active' },
                      { label: 'ITI Holders', count: '2 Notices' },
                      { label: 'Diploma', count: '3 Active' },
                      { label: 'Graduate Jobs', count: '14 Active' },
                      { label: 'B.Tech / B.Sc', count: '5 Active' },
                      { label: 'Post Graduate', count: '3 Active' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => triggerQualTab(item.label as any)}
                        className="p-3 border border-slate-100 rounded-xl bg-slate-50/30 hover:border-blue-200 hover:bg-blue-50/20 transition text-left"
                      >
                        <span className="block text-slate-800 font-bold">{item.label}</span>
                        <span className="block text-[10px] text-slate-400 font-normal mt-0.5 font-mono">{item.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admission & Scholarship notices */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
                  <h4 className="font-sans text-sm font-bold text-slate-900 border-b border-slate-50 pb-2">
                    🎓 Admissions & Government Scholarship Boards
                  </h4>
                  <div className="space-y-4 font-sans text-xs">
                    <div className="p-3 bg-indigo-50/30 border border-indigo-100/30 rounded-xl flex items-start gap-3">
                      <GraduationCap className="h-8 w-8 text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-slate-800">Prime Minister Post-Matric SC/ST Scholarship Scheme</h5>
                        <p className="text-slate-500 mt-1">Underprivileged eligible candidates of intermediate grades and research domains are offered full annual tuition waiver grants. Application Link Active.</p>
                        <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">National Scholarship Portal →</a>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50/30 border border-emerald-100/30 rounded-xl flex items-start gap-3">
                      <FileText className="h-8 w-8 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-slate-800">UGC Junior Research Fellowship (JRF) Admission</h5>
                        <p className="text-slate-500 mt-1">CSIR NET candidates are selected with up to ₹37,000 monthly research stipend packages in registered central and state laboratories.</p>
                        <span className="text-slate-400 mt-2 block font-semibold leading-normal">Status: Registration closes July 30.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (4 cols): Admit cards search, results scorecard, news feed */}
              <div className="md:col-span-4 space-y-8">
                
                {/* Admit Cards section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex justify-between items-center">
                    <h4 className="font-sans text-xs font-bold text-slate-750 flex items-center gap-1.5 uppercase tracking-wide">
                      <FileText className="h-4 w-4 text-blue-600" />
                      e-Admit Cards
                    </h4>
                    <span className="text-[9px] font-extrabold text-[#1E3A8A] uppercase hover:underline cursor-pointer" onClick={() => setActiveTab('admit-cards')}>View All</span>
                  </div>
                  <div className="p-3.5 space-y-3">
                    <input 
                      type="text" 
                      placeholder="Search admit card name..."
                      value={homeAdmitSearch}
                      onChange={(e) => setHomeAdmitSearch(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs focus:outline-hidden focus:border-blue-500 placeholder-slate-400"
                    />

                    <div className="space-y-2">
                      {filteredAdmitCards.map((card) => (
                        <div key={card.id} className="p-2.5 border border-slate-100 rounded-lg text-[11px] space-y-1.5 bg-slate-50/50">
                          <h5 className="font-bold text-slate-800 leading-snug">{card.title}</h5>
                          <p className="text-[9px] text-slate-400 font-bold">Exam Date: {card.examDate}</p>
                          <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              triggerToast(`📥 Hall ticket download initiated for "${card.title}"`);
                            }}
                            className="text-blue-600 font-bold inline-block hover:underline"
                          >
                            Download Hall Ticket →
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Scorecards Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200">
                    <h4 className="font-sans text-xs font-bold text-slate-750 flex items-center gap-1.5 uppercase tracking-wide">
                      <Award className="h-4 w-4 text-blue-600" />
                      Declared Exam Results
                    </h4>
                  </div>

                  <div className="p-3.5 space-y-2.5 text-xs">
                    {results.map((res) => (
                      <div key={res.id} className="p-2.5 border border-slate-100 rounded-lg space-y-2 bg-slate-50/50">
                        <div>
                          <h5 className="font-bold text-slate-800 text-[11px]">{res.title}</h5>
                          <span className="text-[9px] text-slate-400 font-extrabold font-mono tracking-wider">{res.releaseDate} released</span>
                        </div>
                        
                        {/* Cutoff micro block */}
                        <div className="bg-white p-1.5 rounded border border-slate-100 grid grid-cols-2 gap-1 text-[9px] text-slate-500 font-semibold">
                          <div>Gen/UR: <span className="font-bold text-slate-800">{res.cutOff.UR}</span></div>
                          <div>OBC: <span className="font-bold text-slate-800">{res.cutOff.OBC}</span></div>
                        </div>

                        <a 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            triggerToast(`🔍 Complete merit list & scorecard verification for ${res.title}`);
                          }}
                          className="font-bold text-emerald-600 hover:underline inline-block text-[10px]"
                        >
                          Check Scorecard List →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Government Schemes widget */}
                <div className="bg-linear-to-b from-blue-50 to-indigo-50/30 border border-slate-100 rounded-2xl p-5 space-y-3.5">
                  <h4 className="font-sans text-xs font-bold text-blue-900 uppercase tracking-widest">
                    🇮🇳 Dynamic Schemes Board
                  </h4>
                  <ul className="text-xs space-y-2.5 text-slate-600 list-disc list-inside">
                    <li><span className="font-bold text-slate-800">PM SVANidhi Program</span>: Collateral-free working capital loan limit scaled up.</li>
                    <li><span className="font-bold text-slate-800">Agnipath scheme updates</span>: Selected state force provisions updated.</li>
                    <li><span className="font-bold text-slate-800">Startup Intellectual Scheme</span>: Wave patent registration waiver for rural startups.</li>
                  </ul>
                </div>

                {/* Connected Interactive Academic Ad Banner Section (विज्ञापन अनुभाग) */}
                <SarkariAds 
                  user={user} 
                  onGoPremium={() => setActiveTab('premium')} 
                  triggerToast={triggerToast} 
                  layout="sidebar" 
                />

              </div>
            </div>

            {/* Quick FAQ accordion */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4">
              <h4 className="font-sans text-base font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Frequently Answered Queries (FAQ Section)
              </h4>
              <div className="grid gap-4 md:grid-cols-2 text-xs leading-relaxed">
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: How do I bookmark notifications?</h5>
                  <p className="text-slate-500">A: Click the bookmark ribbon icon on any vacancy card. Pins immediately save to your User Dashboard.</p>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: Does the mock timer submit automatically?</h5>
                  <p className="text-slate-500">A: Yes, once the stopwatch countdown hits zero, your responses are dispatched and scorecard displays.</p>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: Are e-Admit downloads secure?</h5>
                  <p className="text-slate-500">A: Absolutely. All URLs point to verified union databases or commission direct file assets. No external middleware redirects.</p>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: How to claim Premium membership?</h5>
                  <p className="text-slate-500">A: Go to the 'Premium' tab, choose an option, and complete the sandbox transaction. Premium privileges activate instantly.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LATEST JOBS (DETAILED COMPREHENSIVE FILTER ENGINE) */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="font-sans text-xl font-extrabold text-slate-900">
                  Government Vacancies & Notices
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time direct applications. Use search or sidebar tabs to filter.
                </p>
              </div>
              <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full font-mono">
                {jobs.length} Alerts Active
              </span>
            </div>

            <JobCard 
              jobs={jobs} 
              user={user} 
              toggleSaveJob={toggleSaveJob}
              qualificationFilter={qualificationFilter}
              setQualificationFilter={setQualificationFilter}
            />
          </div>
        )}

        {/* TAB: VISUAL EXAM CALENDAR TIMELINE */}
        {activeTab === 'calendar' && (
          <CalendarView 
            jobs={jobs} 
            admitCards={admitCards} 
            onSelectJob={(job) => {
              setActiveTab('jobs');
            }}
            triggerToast={triggerToast}
          />
        )}

        {/* TAB 3: ADMIT CARDS PANEL */}
        {activeTab === 'admit-cards' && (
          <div className="bg-white rounded-3xl border border-blue-50 p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                  <FileText className="h-5.5 w-5.5 text-blue-600" />
                  Direct e-Admit Cards Download Center
                </h2>
                <p className="text-xs text-slate-500">Instant registration and tracking of administrative portal-released hall tickets.</p>
              </div>

              <button
                onClick={() => setActiveTab('uploads')}
                className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 py-2.5 px-4 text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                <Plus className="h-4 w-4" /> Upload & Parse Admit Card
              </button>
            </div>

            <div className="space-y-4">
              {admitCards.map((card) => (
                <div key={card.id} className="border border-slate-100 p-4 rounded-2xl bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded">
                      {card.org}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm mt-1">{card.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                      <span>Venue: {card.examCity}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">Exam Date: {card.examDate}</span>
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Initiated secured download for: ${card.title}.`);
                    }}
                    className="rounded-xl bg-blue-600 py-2 px-4 text-xs font-bold text-white hover:bg-blue-700 transition"
                  >
                    Download Hall Ticket
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RESULTS DECLARATIONS SHEET */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-3xl border border-blue-50 p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans text-xs">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-1.5">
              <Award className="h-5.5 w-5.5 text-blue-600" />
              Verified Government Exam Merit Lists & Cut-offs
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {results.map((res) => (
                <div key={res.id} className="border border-slate-150 p-4 rounded-3xl bg-slate-50/30 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{res.title}</h3>
                    <p className="text-slate-400 mt-0.5">Released: {res.releaseDate}</p>
                  </div>

                  {/* Cutoff breakdown */}
                  <div className="p-3 bg-white border border-slate-100 rounded-2xl grid grid-cols-2 gap-2 text-[11px]">
                    <div>Unreserved (UR): <span className="font-bold text-slate-700">{res.cutOff.UR}</span></div>
                    <div>Backward (OBC): <span className="font-bold text-slate-700">{res.cutOff.OBC}</span></div>
                    <div>Scheduled (SC): <span className="font-bold text-slate-700">{res.cutOff.SC}</span></div>
                    <div>Scheduled (ST): <span className="font-bold text-slate-700">{res.cutOff.ST}</span></div>
                  </div>

                  <div className="flex gap-2 text-xs pt-1.5">
                    <button
                      onClick={() => alert(`Scorecard audit requires Candidate ID registration check.`)}
                      className="w-full rounded-xl border border-slate-200 py-2 text-slate-600 font-semibold hover:bg-slate-50 transition"
                    >
                      Personal Score Card
                    </button>
                    <button
                      onClick={() => alert(`Directly downloading verified Merit Rank PDF list.`)}
                      className="w-full rounded-xl bg-blue-600 text-white font-bold py-2 hover:bg-blue-700 transition"
                    >
                      Audit merit roll PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ANSWER KEYS releases */}
        {activeTab === 'answer-key' && (
          <ObjectionPortal triggerToast={triggerToast} />
        )}

        {/* TAB 6: MOCK TEST & EXPERT ASSESSMENTS */}
        {activeTab === 'mock-tests' && (
          <div className="space-y-6">
            <SarkariAds 
              user={user} 
              onGoPremium={() => setActiveTab('premium')} 
              triggerToast={triggerToast} 
              layout="banner" 
            />
            <MockTestPortal 
              mockTests={mockTests} 
              user={user} 
              onSaveTestResult={handleSaveTestResult}
              setPremiumModal={setPremiumModalOpen}
              onChangeTab={setActiveTab}
            />
          </div>
        )}

        {/* TAB 7: USER DASHBOARD PROFILE CREDENTIALS */}
        {activeTab === 'dashboard' && (
          <UserDashboard 
            user={user} 
            jobs={jobs} 
            setUser={setUser} 
            toggleSaveJob={toggleSaveJob}
            setPremiumModal={setPremiumModalOpen}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            triggerToast={triggerToast}
          />
        )}

        {/* TAB 8: ADMIN CONFIGURATION ZONE */}
        {activeTab === 'admin' && (
          <AdminConsole 
            jobs={jobs}
            admitCards={admitCards}
            results={results}
            mockTests={mockTests}
            onAddJob={(newJob) => setJobs([newJob, ...jobs])}
            onDeleteJob={(jobId) => setJobs(jobs.filter(j => j.id !== jobId))}
            onAddAdmitCard={(newCard) => setAdmitCards([newCard, ...admitCards])}
            onAddResult={(newRes) => setResults([newRes, ...results])}
            onAddMockTest={(newTest) => setMockTests([newTest, ...mockTests])}
          />
        )}

        {/* TAB 9: SYLLABUS & ADMISSIONS library */}
        {activeTab === 'syllabus' && (
          <SyllabusPlanner user={user} triggerToast={triggerToast} />
        )}

        {/* TAB 10: PREVIOUS YEAR PAPERS index sheets */}
        {activeTab === 'pyqs' && (
          <div className="bg-white rounded-3xl border border-blue-50 p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Download className="h-5.5 w-5.5 text-blue-600" />
                  Compilation of Previous Year Question Papers (PYQs)
                </h2>
                <p className="text-xs text-slate-500">Gain confidence by practicing mock papers with solutions downloaded directly to your phone.</p>
              </div>

              <button
                onClick={() => setActiveTab('uploads')}
                className="rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50/50 py-2 px-4 text-xs font-bold transition flex items-center gap-1 shrink-0"
              >
                <Sparkles className="h-4 w-4 animate-pulse text-blue-600" /> Contribute PYQ File
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              {pyqsList.map((pyq, idx) => (
                <div key={idx} className="p-4 border border-slate-150 rounded-2xl bg-slate-50/30 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] bg-slate-100 text-slate-550 font-bold px-2 py-0.5 rounded">
                        {pyq.type}
                      </span>
                      <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold font-mono">
                        {pyq.year} Exam
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 mt-2 leading-snug">{pyq.title}</h4>
                    <span className="text-slate-400 font-mono mt-1 block">Size: {pyq.size}</span>
                  </div>

                  {pyq.premium && !user.premiumUser ? (
                    <button
                      onClick={() => setPremiumModalOpen(true)}
                      className="flex items-center gap-1 border border-amber-400 text-amber-700 font-bold py-2 px-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 transition font-sans text-xs flex-shrink-0"
                    >
                      👑 Lock
                    </button>
                  ) : (
                    <button 
                      onClick={() => alert(`Starting download for file "${pyq.title}".`)}
                      className="flex items-center gap-1.5 bg-blue-600 text-white font-bold py-2 px-3.5 rounded-xl hover:bg-blue-700 transition font-sans text-xs flex-shrink-0"
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* In-Line Horizontal Ad Placement */}
            <div className="pt-4 border-t border-slate-100">
              <SarkariAds 
                user={user} 
                onGoPremium={() => setActiveTab('premium')} 
                triggerToast={triggerToast} 
                layout="banner" 
              />
            </div>
          </div>
        )}

        {/* TAB 15: BRAND NEW ASPIRANT UPLOADS & FILE VAULT */}
        {activeTab === 'uploads' && (
          <SarkariUploadVault
            user={user}
            setUser={setUser}
            onAddAdmitCard={(newCard) => setAdmitCards([newCard, ...admitCards])}
            onAddMockTest={(newTest) => setMockTests([newTest, ...mockTests])}
            onAddPYQ={(newPYQ) => setPyqsList(prev => [
              { title: newPYQ.title, type: 'Solved PDF Booklet', size: newPYQ.size, year: newPYQ.year, exam: newPYQ.exam, premium: newPYQ.premium },
              ...prev
            ])}
            triggerToast={triggerToast}
          />
        )}

        {/* TAB 11: CURRENT AFFAIRS MODULE */}
        {activeTab === 'current-affairs' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-sans text-xl font-extrabold text-slate-900">
                Daily General Knowledge & Current Affairs Update
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Stay updated on latest international and national events for competitive examinations.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-8 space-y-4">
                {currentAffairs.map((ca) => (
                  <div key={ca.id} className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 font-sans text-xs">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        {ca.category} Section
                      </span>
                      <span className="text-slate-400 font-mono font-semibold">{ca.date}</span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-900 leading-snug">{ca.title}</h4>
                    <p className="text-slate-600 leading-relaxed mt-2">{ca.content}</p>

                    <button
                      onClick={() => alert(`Downloading specialized daily newsletter PDF for "${ca.title}".`)}
                      className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline pt-2"
                    >
                      <Download className="h-4 w-4" /> Get Solved PDF Newsletter
                    </button>
                  </div>
                ))}
              </div>

              {/* Quick GA Current Affairs Daily Quiz widget */}
              <div className="md:col-span-4 bg-linear-to-b from-blue-900 to-indigo-950 text-white rounded-3xl p-5 shadow-lg space-y-4 text-xs font-sans">
                <span className="text-[10px] bg-blue-500/30 font-bold px-2 py-0.5 rounded uppercase block w-max">
                  Daily Quick Quizlet
                </span>

                <h4 className="font-bold text-slate-100 leading-normal">Which nation ratified the "Universal clean Green Sovereign Scheme" during the COP summit (COP-31)?</h4>
                
                <div className="space-y-2">
                  {['Sovereign Germany', 'India Union', 'Japan', 'United Kingdom'].map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => alert(oIdx === 1 ? '🎉 Correct answer! India Union actively ratified details on July meetings.' : '❌ Incorrect. Correct Option contains (India Union).')}
                      className="w-full text-left bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl p-3 font-medium text-slate-200 transition"
                    >
                      {String.fromCharCode(65 + oIdx)}. {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: BLOG & PREPARATION STRATEGY */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-sans text-xl font-extrabold text-slate-900">
                Exam Tips, Preparation Blueprints & Mentorship Guidance
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Maximize competitive score ratios with insights from certified top-scorers and rank guides.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {blogs.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl border border-slate-150 p-5 space-y-3 font-sans text-xs">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
                    <span>{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 text-sm mt-1">{post.title}</h3>
                  <p className="text-slate-500 text-xs leading-normal">{post.summary}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-[11px]">
                    <span className="text-slate-400 font-semibold italic">By: {post.author}</span>
                    <button
                      onClick={() => setSelectedBlog(post)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Read full blueprint →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Read Blog modal */}
            {selectedBlog && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
                <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl relative">
                  <button 
                    onClick={() => setSelectedBlog(null)}
                    className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 rounded-full p-2 text-slate-500 text-xs font-bold font-mono"
                  >
                    CLOSE
                  </button>
                  
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase">
                    {selectedBlog.category} Article
                  </span>
                  
                  <h3 className="font-sans text-lg font-extrabold text-slate-900 mt-3">{selectedBlog.title}</h3>
                  <p className="text-xs text-slate-400 italic mt-1 font-sans">Published by {selectedBlog.author} • {selectedBlog.readTime}</p>
                  
                  <p className="text-sm text-slate-600 leading-relaxed font-sans mt-5 bg-slate-50 p-4 rounded-2xl border border-slate-100 whitespace-pre-line">
                    {selectedBlog.content}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 13: PREMIUM MEMBERSHIP GATE CHOOSE PLANS & PREMIUM WORKSPACE */}
        {activeTab === 'premium' && (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* The main Premium Workspace containing AI Doubt Solving, Premium Mock Tests, and Solved PYQs */}
            <PremiumPortal 
              user={user}
              mockTests={mockTests}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              locale={locale}
              onActivatePremium={() => {
                // Simulate fast sandbox activation
                const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;
                const newTx: PremiumTransaction = {
                  id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
                  date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
                  plan: 'Lifetime',
                  amount: '₹999',
                  status: 'COMPLETED',
                  refId: referenceId
                };
                setPremiumTransactions(prev => [newTx, ...prev]);

                setUser(prev => ({ 
                  ...prev, 
                  premiumUser: true,
                  premiumPlan: 'Lifetime'
                }));
                triggerToast(`🎉 Congratulations! Your Lifetime Premium Access has been active and upgraded successfully. AI Doubt Solver, Mock Tests, and PYQs are fully unlocked!`);
              }}
              triggerToast={triggerToast}
            />

            {!user.premiumUser && (
              <div className="border-t border-slate-200 pt-10 space-y-8">
                {/* Promo Header */}
                <div className="text-center space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-800 border border-amber-400/20">
                    <Sparkles className="h-3 w-3 animate-spin" /> SELECT A PREMIUM MEMBERSHIP
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                    Select a budget-friendly plan to enjoy standard ad-free access, unlimited AI Doubt sessions, customized Mock Tests, and premium PDF syllabus keys.
                  </p>
                </div>

                {/* Plans choice blocks */}
                <div className="grid gap-6 sm:grid-cols-4 font-sans text-xs">
                  {[
                    { plan: 'Monthly', price: '₹99', features: 'Standard ad-free access + basic mock score updates', recommend: false },
                    { plan: 'Quarterly', price: '₹199', features: 'Ad-free access, daily quizzes, and regional hall tickets', recommend: false },
                    { plan: 'Yearly', price: '₹499', features: 'Complete solved keys, weekly GA newsletters, and certificates', recommend: false },
                    { plan: 'Lifetime', price: '₹999', features: 'Infinite access, 1-on-1 expert exam audits, and priority support', recommend: true }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedPlan(item.plan as any)}
                      className={`border rounded-3xl p-5 text-center cursor-pointer transition relative flex flex-col justify-between ${
                        selectedPlan === item.plan 
                          ? 'border-blue-500 ring-2 ring-blue-100 bg-linear-to-b from-blue-50/20 to-white' 
                          : 'border-slate-150 bg-white hover:border-slate-200'
                      }`}
                    >
                      {item.recommend && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-sans text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          RECOMMENDED
                        </span>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{item.plan} Option</h4>
                        <span className="block font-extrabold text-slate-900 text-xl mt-3">{item.price}</span>
                        <p className="text-slate-400 text-[11px] leading-relaxed mt-2.5">{item.features}</p>
                      </div>

                      <div className="mt-5">
                        <div className={`h-4.5 w-4.5 rounded-full border mx-auto flex items-center justify-center ${
                          selectedPlan === item.plan ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selectedPlan === item.plan && <CheckCircle className="h-3.5 w-3.5" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sandbox pay form */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-xl mx-auto shadow-sm">
                  <h3 className="font-sans text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Verified Ad-Free Sandbox checkout
                  </h3>

                  <form onSubmit={handleCheckoutProcess} className="space-y-4 text-xs">
                    
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold border ${
                          paymentMethod === 'UPI' 
                            ? 'border-blue-500 bg-blue-50/20 text-blue-800' 
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        UPI Payments (Recommended)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Card')}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold border ${
                          paymentMethod === 'Card' 
                            ? 'border-blue-500 bg-blue-50/20 text-blue-800' 
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        Debit / Credit Card
                      </button>
                    </div>

                    {paymentMethod === 'UPI' ? (
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 block">UPI verification parameters</span>
                        
                        <div className="grid grid-cols-2 gap-4 items-center">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">UPI ID address</label>
                            <input 
                              type="text" 
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="rounded-lg border border-slate-200 bg-white p-2 text-xs w-full font-mono text-slate-800 focus:outline-hidden"
                              required
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-[9px] text-slate-400 block mb-1">Secure UPI QR Mock</span>
                            <div className="mx-auto h-16 w-16 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-[9px] font-bold line-clamp-1">
                              QR PAY [📄]
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 block">Bank parameters</span>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <input type="text" placeholder="16 Digit Number" className="rounded-lg border border-slate-200 bg-white p-2 sm:col-span-3 text-xs focus:outline-hidden" required />
                          <input type="text" placeholder="MM/YY" className="rounded-lg border border-slate-200 bg-white p-2 text-xs focus:outline-hidden" required />
                          <input type="password" placeholder="CVV" className="rounded-lg border border-slate-200 bg-white p-2 text-xs focus:outline-hidden" required />
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50/50 p-3 rounded-xl text-[10px] text-slate-500 leading-normal flex items-start gap-1.5 border border-blue-100/50">
                      <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>The sandbox implements standard simulated verify. No real funds will transaction from your banking credentials. Instantly awards full access levels.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={paymentSuccess}
                      className="w-full rounded-xl bg-amber-500 text-white font-extrabold py-3 text-sm hover:bg-amber-600 transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                    >
                      {paymentSuccess ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" /> Verifying Payment Receipt...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4.5 w-4.5" /> Activate {selectedPlan} Access (Unlock)
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 14: CONTACT US support dashboard */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-10">
            
            <div className="text-center space-y-1">
              <h2 className="font-sans text-xl font-extrabold text-slate-900">
                Contact Job Sarkari Hub Helpdesk
              </h2>
              <p className="text-xs text-slate-500">
                Got questions regarding admit releases or mock certificates? Shoot us an inquiry.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Info columns */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 space-y-6 text-xs font-sans">
                <h4 className="font-bold text-slate-900 border-b border-slate-50 pb-2">Direct Headquarters Coordinates</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold">New Delhi Central Desk</h5>
                      <p className="text-slate-400 mt-0.5">3rd Complex, National Informatics Buildings, Lodhi Road, New Delhi, 110003</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold">Assigned Electronic Mail</h5>
                      <p className="text-slate-400 mt-0.5">helpdesk@jobsarkarihub.in</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold">Telephone Helpline</h5>
                      <p className="text-slate-400 mt-0.5">+91 11-2306-0000 (Central desk lines)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="font-bold text-slate-700 block mb-1">WhatsApp Broadcast hub</span>
                  <p className="text-slate-500">Subscribe directly to our broadcast alerts. Get instant notifications regarding vacancy extensions, results declarations, and mock keys.</p>
                </div>
              </div>

              {/* Message form */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
                <h4 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-50 pb-2">Dispatch Inquiry</h4>

                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      value={contactForm.name} 
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="rounded-lg border border-slate-200 p-2.5 w-full focus:outline-hidden"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Your Email</label>
                    <input 
                      type="email" 
                      value={contactForm.email} 
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="rounded-lg border border-slate-200 p-2.5 w-full focus:outline-hidden" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Describe Query</label>
                    <textarea 
                      rows={4}
                      value={contactForm.query} 
                      onChange={(e) => setContactForm({...contactForm, query: e.target.value})}
                      placeholder="Specify exam name and issue guidelines..."
                      className="rounded-lg border border-slate-200 p-2.5 w-full focus:outline-hidden" 
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full rounded-xl bg-blue-600 font-extrabold text-white py-3 hover:bg-blue-700 transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-4 w-4" /> Dispatch Query
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Persistent dynamic Footer details */}
      <footer id="global-portal-footer" className="bg-slate-900 text-slate-400 py-10 mt-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4 font-sans text-xs">
            
            <div className="space-y-3">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                🇮🇳 Job Sarkari Hub
              </span>
              <p className="text-slate-500 leading-relaxed font-sans">
                India's leading verified platform for mock test modules, direct admit downloads, government qualifications, and current affairs feeds.
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                SECURE SSL VERIFIED DESK
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-1">Quick Directories</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveTab('jobs')} className="hover:text-slate-200">Latest Govt Vacancies</button></li>
                <li><button onClick={() => setActiveTab('admit-cards')} className="hover:text-slate-200">Hall ticket admit downloads</button></li>
                <li><button onClick={() => setActiveTab('results')} className="hover:text-slate-200">Direct Merit results</button></li>
                <li><button onClick={() => setActiveTab('mock-tests')} className="hover:text-slate-200 font-bold text-amber-400">Mock Assessments</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-1">Security & Policies</h4>
              <ul className="space-y-1.5 font-sans">
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Services: All download links points to official Union or State Commission services.'); }} className="hover:text-slate-200">Terms of Service</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policies: Sarkari Hub complies with standard SSL certificates. Candidate registration profiles are stored locally.'); }} className="hover:text-slate-200">Privacy Policy</a></li>
                <li><button onClick={() => setViewingSEO(!viewingSEO)} className="hover:text-slate-200 font-bold text-emerald-400 flex items-center gap-1">
                  View SEO URLs & Sitemap XML {viewingSEO ? '[Hide]' : '[View]'}
                </button></li>
              </ul>
            </div>

            {/* Social Sharing elements */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-1">Broadcast Channels</h4>
              <p className="text-slate-500 leading-normal">Subscribe to verified Telegram / WhatsApp feeds for direct 24x7 notifications updates.</p>
              <div className="flex gap-2">
                <button onClick={() => alert('Redirecting to verified Telegram notification channel. @JobSarkariHubOfficial')} className="bg-blue-600/20 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-600/30 transition">
                  Telegram Alert
                </button>
                <button onClick={() => alert('Subscribed to verified WhatsApp broadcast alerts.')} className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-600/30 transition">
                  WhatsApp Alert
                </button>
              </div>
            </div>

          </div>

          {/* Simulated SEO Sitemap & Schema panel */}
          {viewingSEO && (
            <div id="seo-metadata-debugger" className="mt-8 border-t border-slate-800 pt-6 font-mono text-[10px] text-zinc-500 bg-zinc-950 p-4 rounded-xl leading-relaxed space-y-4">
              <div>
                <span className="text-emerald-500 font-bold block">=== DYNAMIC BREADCRUMB SCHEMA MARKUP ===</span>
                <code>{`{ "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Govt Jobs", "item": "https://jobsarkarihub.in/jobs" }] }`}</code>
              </div>
              <div>
                <span className="text-emerald-500 font-bold block">=== ROBOTS.TXT META CONFIG ===</span>
                <p>User-agent: *<br />Allow: /jobs<br />Allow: /mocks<br />Sitemap: https://jobsarkarihub.in/sitemap.xml</p>
              </div>
              <div>
                <span className="text-emerald-500 font-bold block">=== OPEN GRAPH META TAGS GENERATOR ===</span>
                <p>&lt;meta property="og:title" content="Latest Government Jobs 2026 - Job Sarkari Hub" /&gt;<br />&lt;meta property="og:description" content="Detailed updates on SSC CGL, UPSC prelims, Bank PO hall tickets, and Merit scorecards." /&gt;<br />&lt;meta name="twitter:card" content="summary_large_image" /&gt;</p>
              </div>
            </div>
          )}

          <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-sans">
            <p>© 2026 Job Sarkari Hub. Powered by Ministry of Informatics portal simulation guidelines.</p>
            <p className="flex items-center gap-1 mt-2 sm:mt-0">
              Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Government Job Seekers
            </p>
          </div>
        </div>
      </footer>

      {/* PREMIUM GATE PAYMENT DIALOG MODAL LAYOUT */}
      {premiumModalOpen && (
        <div id="premium-gate-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 shadow-2xl relative max-w-lg w-full text-slate-700">
            <input 
              type="file" 
              id="modal-camera-file" 
              accept="image/*" 
              capture="environment" 
              onChange={handleModalPhotoChange} 
              className="hidden" 
            />

            <button 
              onClick={() => window.print()}
              title="Print Plan Features"
              className="absolute top-4 right-22 rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-500 hover:text-slate-800 transition cursor-pointer flex items-center justify-center"
            >
              <Printer className="h-4 w-4" />
            </button>

            <label 
              htmlFor="modal-camera-file"
              title="Snap Notebook Image for AI solving"
              className="absolute top-4 right-13 rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-500 hover:text-slate-880 transition cursor-pointer flex items-center justify-center animate-pulse"
            >
              <Camera className="h-4 w-4 text-emerald-650" />
            </label>

            <button 
              onClick={() => {
                setShowCancelConfirm(true);
              }}
              className="absolute top-4 right-4 rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-400 font-bold font-sans text-xs"
            >
              CLOSE
            </button>

            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wide">
                <Sparkles className="h-3 w-3 animate-spin" /> Unrestricted Access Gate
              </span>
              <h3 className="font-sans text-lg font-extrabold text-slate-900">Unlock Job Sarkari Hub Premium</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Unlock instant solved previous year papers compiled, weekly PDF newsletters, ranking leaderboard, and certified mock report certificates.
              </p>
            </div>

            {modalNotebookPhoto && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-150 flex items-center justify-between text-left animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg border border-slate-300 bg-white overflow-hidden shrink-0">
                    <img src={modalNotebookPhoto} alt="Notebook preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-emerald-950 block">Notebook Snapshot Loaded</span>
                    <span className="text-[10px] text-emerald-600 block">Ready to solve upon premium activation</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setModalNotebookPhoto(null);
                    localStorage.removeItem('sarkari_notebook_photo_cached');
                  }}
                  className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 p-1.5 cursor-pointer flex items-center justify-center transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Micro Plan choosing */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-sans">
              {[
                { plan: 'Monthly', price: '₹99' },
                { plan: 'Quarterly', price: '₹199' },
                { plan: 'Yearly', price: '₹499' },
                { plan: 'Lifetime', price: '₹999' }
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPlan(p.plan as any)}
                  className={`p-3 rounded-2xl border text-center transition ${
                    selectedPlan === p.plan 
                      ? 'border-blue-600 bg-blue-50/30 font-bold text-blue-900' 
                      : 'border-slate-150 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-[10px] text-slate-400 uppercase">{p.plan} Access</span>
                  <span className="text-sm font-extrabold text-slate-900 mt-1">{p.price}</span>
                </button>
              ))}
            </div>

            {/* Dynamic UPI Payment Simulator / QR Code */}
            <div data-testid="upi-qr-card" className="mt-4 bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs shrink-0 flex items-center justify-center">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`upi://pay?pa=sarkarihub@upi&pn=JobSarkariHub&am=${selectedPlan === 'Monthly' ? '99' : selectedPlan === 'Quarterly' ? '199' : selectedPlan === 'Yearly' ? '499' : '999'}&cu=INR&tn=Upgrade+to+${selectedPlan}+Access`)}`}
                  alt="Sarkari Upgrade QR"
                  className="h-20 w-20 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1 text-left font-sans text-xs">
                <span className="font-extrabold text-slate-800 block">Instant QR Code Scanner</span>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Open any UPI app like GPay, PhonePe, or Paytm and scan this dynamic QR to instantly upgrade to <strong className="text-blue-650 font-extrabold">{selectedPlan}</strong> for <strong className="text-slate-900 font-extrabold">{selectedPlan === 'Monthly' ? '₹99' : selectedPlan === 'Quarterly' ? '₹199' : selectedPlan === 'Yearly' ? '₹499' : '₹999'}</strong>.
                </p>
                <span className="text-[10px] uppercase font-bold text-emerald-600 flex items-center gap-1.5 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active secure sandbox payment gateway
                </span>
              </div>
            </div>

            {/* Why go Premium? toggle link and collapsible section */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <button
                onClick={() => setShowWhyPremium(!showWhyPremium)}
                className="w-full flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 py-1.5 cursor-pointer select-none"
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4" />
                  Why go Premium? Check Plan Features
                </span>
                {showWhyPremium ? (
                  <ChevronUp className="h-4 w-4 text-blue-500 animate-bounce" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-blue-500 animate-bounce" />
                )}
              </button>

              {showWhyPremium && (
                <div className="mt-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-left space-y-3 max-h-56 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-2.5">
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-900 border-b border-slate-200/60 pb-0.5 flex items-center gap-1">
                        <span className="bg-slate-200 text-slate-700 text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹99</span> Monthly Access
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-slate-500 mt-1 space-y-0.5 font-sans">
                        <li>Daily Live Gov Notifications and direct syllabus guidelines via alerts.</li>
                        <li>Full access to ad-free mock test arena and basic scorecard metrics.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-900 border-b border-slate-200/60 pb-0.5 flex items-center gap-1">
                        <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹199</span> Quarterly Access
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-slate-500 mt-1 space-y-0.5 font-sans">
                        <li><strong>Standard Package:</strong> Includes all Monthly tools.</li>
                        <li>Previous 3 years Solved Papers compiled & active syllabus planner tools.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-900 border-b border-slate-200/60 pb-0.5 flex items-center gap-1">
                        <span className="bg-purple-100 text-purple-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹499</span> Yearly Access
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-slate-500 mt-1 space-y-0.5 font-sans">
                        <li><strong>Aspirant Special:</strong> Includes all Quarterly features.</li>
                        <li>Instant AI Doubt Solver (100 prompts/mo) & premium offline-printable test PDFs.</li>
                        <li>Automatic dynamic regional rank evaluation comparison.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-amber-900 border-b border-amber-200 pb-0.5 flex items-center gap-1 bg-amber-50 px-1 rounded">
                        <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹999</span> Lifetime Access (Highly Popular)
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-amber-850 mt-1 space-y-0.5 font-sans">
                        <li><strong>Ultimate Value:</strong> One-time payment, no recurring fees forever.</li>
                        <li>Unlimited developer UI AI Doubt solver prompts and customizable templates.</li>
                        <li>Country-wide dynamic leaderboard matching + Premium offline booklets.</li>
                        <li>Priority 24/7 helpline/objections review support.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Sandbox verify only</span>
                <span className="text-xs font-bold text-blue-800 mt-1 inline-block">UPI Direct verification payment</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="premium-copy-link-button"
                  onClick={handleCopyPaymentLink}
                  className="rounded-xl border border-slate-200 py-2.5 px-4 font-sans text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-1.5 shadow-xs select-none cursor-pointer"
                >
                  <Link className="h-4 w-4 text-emerald-600" />
                  <span>Copy Payment Link</span>
                </button>

                <button
                  id="premium-share-button"
                  onClick={handleShareApp}
                  className="rounded-xl border border-slate-200 py-2.5 px-4 font-sans text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-1.5 shadow-xs select-none cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                  <span>Share</span>
                </button>

                <button
                  id="premium-cancel-button"
                  onClick={() => {
                    setShowCancelConfirm(true);
                  }}
                  className="rounded-xl border border-slate-200 py-2.5 px-4 font-sans text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition select-none cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setPaymentSuccess(true);
                    setTimeout(() => {
                      const planPrices = {
                        Monthly: "₹99",
                        Quarterly: "₹199",
                        Yearly: "₹499",
                        Lifetime: "₹999"
                      };
                      const price = planPrices[selectedPlan] || "₹999";
                      const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;

                      const newTx: PremiumTransaction = {
                        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
                        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
                        plan: selectedPlan,
                        amount: price,
                        status: 'COMPLETED',
                        refId: referenceId
                      };

                      setPremiumTransactions(prev => [newTx, ...prev]);

                      setUser(prev => ({ 
                        ...prev, 
                        premiumUser: true,
                        premiumPlan: selectedPlan
                      }));
                      setPaymentSuccess(false);
                      setPremiumModalOpen(false);
                      triggerToast(`🎉 Congratulations ${user.name}! Your ${selectedPlan} Premium Access has been active and upgraded successfully.`);
                    }, 2000);
                  }}
                  disabled={paymentSuccess}
                  className="rounded-xl bg-amber-500 py-2.5 px-5 font-sans text-xs font-extrabold text-white hover:bg-amber-600 transition flex items-center gap-1 shadow-md shadow-amber-500/10"
                >
                  {paymentSuccess ? 'Processing...' : `Get Premium`}
                </button>
              </div>
            </div>

            {/* Previous Transactions Info Section */}
            <div data-testid="premium-transactions-history" className="mt-5 pt-3 border-t border-dashed border-slate-200">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                <span>Current Status & Plan History</span>
                <span className="text-blue-600 font-extrabold font-sans">Verified Log</span>
              </div>

              {/* Status Banner */}
              <div className="p-2.5 rounded-xl border flex items-center justify-between font-sans text-xs mb-2 bg-slate-50 border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${user.premiumUser ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400 animate-pulse'}`}></span>
                  <span className="text-slate-600">Current Subscription:</span>
                  <strong className={user.premiumUser ? "text-emerald-705 font-extrabold" : "text-slate-705 font-extrabold"}>
                    {user.premiumUser ? `${user.premiumPlan || 'Lifetime'} Premium` : 'Free Trial'}
                  </strong>
                </div>
                {user.premiumUser && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-0.5">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Transaction List */}
              <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                {premiumTransactions.length > 0 ? (
                  premiumTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-[11px] bg-slate-50/50 p-2 rounded-xl border border-slate-100 text-slate-600">
                      <div className="text-left font-mono">
                        <span className="font-extrabold text-slate-800 block leading-tight">{tx.plan} Upgrade</span>
                        <span className="text-[9px] text-slate-400 leading-none">{tx.id} • {tx.date}</span>
                      </div>
                      <div className="text-right font-sans">
                        <strong className="text-slate-900 block font-bold">{tx.amount}</strong>
                        <span className="text-[9px] font-semibold text-emerald-600 uppercase flex items-center gap-1 justify-end">
                          ● {tx.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-400 italic text-center py-2 bg-slate-50/40 rounded-xl border border-dashed border-slate-150">
                    No previous payment history found for this device sandbox. Keep simulated trials active.
                  </p>
                )}
              </div>
            </div>

            {showCancelConfirm && (
              <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-center items-center text-center text-white animate-fade-in">
                <div className="p-3.5 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-4 animate-bounce">
                  <ShieldAlert className="h-10 w-10 text-amber-500" />
                </div>
                <h3 className="text-sm font-extrabold text-white tracking-tight">Do you want to cancel the upgrade?</h3>
                <p className="text-xs text-slate-305 max-w-xs mt-2 leading-relaxed text-slate-300">
                  You will lose your selected <strong className="text-amber-400 font-extrabold">{selectedPlan}</strong> subscription, any captured notebook snapshots, and current position in the secure sandbox payment desk.
                </p>
                <div className="mt-6 flex items-center gap-3 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setShowCancelConfirm(false);
                      setPremiumModalOpen(false);
                      setShowWhyPremium(false);
                      setModalNotebookPhoto(null);
                    }}
                    className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-bold py-2.5 transition cursor-pointer"
                  >
                    Yes, Cancel Flow
                  </button>
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="flex-1 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-sans text-xs font-bold py-2.5 transition cursor-pointer"
                  >
                    No, Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embedded High Density Premium Toast Banner */}
      {toastMsg && (
        <div id="applet-toast-banner" className="fixed bottom-4 right-4 z-50 rounded-lg bg-slate-900 border border-slate-800 text-white px-4 py-2 font-sans text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <CheckSquare className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Interactive Authentication Locker Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        user={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        triggerToast={triggerToast}
        locale={locale}
      />

    </div>
  );
}
