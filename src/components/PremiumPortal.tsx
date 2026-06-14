import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Lock, Unlock, Download, Send, HelpCircle, 
  CheckCircle2, AlertCircle, RefreshCw, MessageSquare, 
  Compass, Award, ChevronRight, FileText, Check, Star,
  Camera, Image as ImageIcon, X
} from 'lucide-react';
import { UserProfile, MockTest } from '../types';
import { fetchWithRetry } from '../utils/fetchHelper';

interface PremiumPortalProps {
  user: UserProfile;
  mockTests: MockTest[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onActivatePremium: () => void;
  triggerToast: (msg: string) => void;
  locale?: string;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  image?: string; // Base64 data URL
  timestamp: string;
}

export default function PremiumPortal({
  user,
  mockTests,
  activeTab,
  setActiveTab,
  onActivatePremium,
  triggerToast,
  locale = 'en'
}: PremiumPortalProps) {
  // Tabs within Premium Section
  const [innerPremiumTab, setInnerPremiumTab] = useState<'ai-doubt' | 'premium-mocks' | 'premium-pyqs'>('ai-doubt');
  
  // AI Doubt Solver States
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        sender: 'ai',
        text: `👋 Jai Hind! I am your AI Exam Mitra, specialized in Indian Civil Services (UPSC), Staff Selection (SSC), State PSC (like RPSC), and Railway examinations.\n\nAsk me any concept, formula, eligibility query, or syllabus confusion! You can also click the camera icon to upload or drop a picture of a practice question and let me solve it live!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  // Dynamically translate the initial welcoming greeting when selected language changes
  useEffect(() => {
    if (messages.length === 1) {
      const texts = {
        en: `👋 Jai Hind! I am your AI Exam Mitra, specialized in Indian Civil Services (UPSC), Staff Selection (SSC), State PSC (like RPSC), and Railway examinations.\n\nAsk me any concept, formula, eligibility query, or syllabus confusion! You can also click the camera icon to upload or drop a picture of a practice question and let me solve it live!`,
        hi: `👋 जय हिन्द! मैं आपका AI परीक्षा मित्र हूँ, जो भारतीय सिविल सेवाओं (UPSC), कर्मचारी चयन (SSC), राज्य PSC (RPSC जैसे), और रेलवे परीक्षाओं में विशेषज्ञता रखता हूँ।\n\nमुझसे कोई भी अवधारणा, सूत्र, पात्रता प्रश्न या पाठ्यक्रम का भ्रम पूछें! आप अभ्यास प्रश्न की तस्वीर अपलोड करने के लिए कैमरा आइकन पर भी क्लिक कर सकते हैं और मैं इसे लाइव हल करूँगा!`,
        mr: `👋 जय हिंद! मी आपला AI परीक्षा मित्र आहे, जो केंद्रीय नागरी सेवा (UPSC), कर्मचारी निवड आयोग (SSC), राज्य लोकसेवा आयोग (MPSC) आणि रेल्वे परीक्षांमध्ये पारंगत आहे.\n\nमला कोणताही संशय, व्याख्या, पात्रता निकष किंवा अभ्यासक्रम विचारू शकता! तसेच कॅमेरा आयकॉनवर क्लिक करून प्रश्नाचे चित्र अपलोड करा, मी त्याचे थेट समाधान देईन!`,
        rj: `👋 राम राम सा अर जय हिन्द! मैं थारो आपनो AI परीक्षा मित्र हूँ, जो UPSC, SSC, RPSC, अर रेलवे री परीक्षा री बारीक जानकारियां राखे।\n\nसगळा सवाल, गणित रा सूत्र, या सिलेबस रो कोई संसो होय तो बेधड़क पूछो! थूं चाहवे तो कैमरा पे क्लिक कर परीक्षा रा कागद रो फोटो अपलोड करदे, मूं सगळो जवाब देऊला!`
      };
      const text = texts[locale as 'en' | 'hi' | 'mr' | 'rj'] || texts['en'];
      setMessages([{
        sender: 'ai',
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, [locale]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Trial query counter for non-premium users
  const [trialCount, setTrialCount] = useState<number>(() => {
    const saved = localStorage.getItem('sarkari_ai_trials');
    return saved ? parseInt(saved, 10) : 0;
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    localStorage.setItem('sarkari_ai_trials', trialCount.toString());
  }, [trialCount]);

  // Suggested Prompts
  const queryPills = [
    "If A:B = 2:3 and B:C = 4:5, find A:B:C",
    "What details exist in Part III Articles 12 to 35 Indian Constitution",
    "Mahatma Gandhi and Quit India Movement in 1942 history",
    "Explain cell mitochondria biology general science",
    "English grammar active passive voice rule",
    "Volatile RAM and ROM memory differences computer awareness",
    "West flowing peninsular rivers geography",
    "Explain standard syllogisms pattern for SSC CGL reasoning."
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      triggerToast('🚫 Please select a valid question paper image.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setAttachedImage(e.target?.result as string);
      triggerToast('📸 Image attached! Click Send or write details to solve.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const finalQuery = customText || userInput;
    const currentImage = customText ? null : attachedImage;

    if (!finalQuery.trim() && !currentImage) return;

    // Check trial limit for free tier
    if (!user.premiumUser && trialCount >= 30 && !customText) {
      triggerToast("🔒 AI Doubt Solver trial limit reached! Click Reset or upgrade to Premium for unmoderated questions.");
      return;
    }

    const newUserMsg: ChatMessage = {
      sender: 'user',
      text: finalQuery || "Solve this attached question sheet.",
      image: currentImage || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    if (!customText) {
      setUserInput('');
      setAttachedImage(null);
    }
    setIsLoading(true);

    try {
      if (!user.premiumUser) {
        setTrialCount(prev => prev + 1);
      }

      // API call to Express backend
      const response = await fetchWithRetry('/api/doubt-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: finalQuery, image: currentImage })
      });

      if (!response.ok) {
        throw new Error("Failed to reach AI Server");
      }

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data.text || "I was unable to retrieve a response from the model. Please check connection.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      // Fallback message
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `⚠️ **Network Error**\n\nCould not communicate with the backend AI tutor. Please make sure the server is booted, the port is bound to \`3000\`, and that your internet connection is active.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Curated PYQ papers
  const PYQPapers = [
    { title: 'UPSC IAS Prelims GS Paper I (2025) - Master Question Paper', year: '2025', org: 'UPSC', downloadCount: '12,500+', size: '4.2 MB' },
    { title: 'RPSC RAS General Studies Paper with Answers & Explanations', year: '2025', org: 'RPSC', downloadCount: '8,900+', size: '3.1 MB' },
    { title: 'SSC CGL Tier I Combined Shift-wise Complete Solved sets', year: '2024', org: 'SSC', downloadCount: '19,200+', size: '10.5 MB' },
    { title: 'IBPS PO Mains Quantitative Aptitude & Reasoning Question sets', year: '2024', org: 'IBPS', downloadCount: '7,400+', size: '5.8 MB' },
    { title: 'RRB NTPC CBT Stage 1 Math & General Knowledge Blueprint', year: '2024', org: 'Railway', downloadCount: '15,300+', size: '4.9 MB' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Premium Dashboard Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3A8A] via-[#1E1B4B] to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 bottom-0 top-0 opacity-10 pointer-events-none">
          <Sparkles className="h-44 w-44 -mr-5 -mt-5 animate-spin-slow text-yellow-300" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full text-[10px] font-extrabold border border-amber-500/20 w-fit uppercase tracking-widest">
              <Sparkles className="h-3 w-3 text-amber-400" /> Premium Member Area
            </div>
            <h2 className="font-sans text-xl sm:text-2xl font-extrabold tracking-tight">
              Aspirant Supercharged Workspace
            </h2>
            <p className="text-slate-300 text-xs max-w-xl leading-relaxed">
              Unrestricted access to our server-side **AI Exam Mitra Doubt Solver**, high-density **Premium Mock Assessments** covering RPSC, UPSC, & SSC, and verified compiled **PYQ Question Booklets**.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {user.premiumUser ? (
              <div className="bg-emerald-500/10 text-emerald-300 border border-emerald-400/35 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Active Premium ({user.premiumPlan || 'Lifetime'})
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="bg-rose-500/15 border border-rose-400/20 px-4 py-2 rounded-xl text-xs font-bold text-rose-300 flex items-center gap-1.5 justify-center">
                  <Lock className="h-4 w-4 text-rose-400" />
                  Free Tier Active
                </div>
                <button
                  type="button"
                  onClick={onActivatePremium}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 justify-center transition-all cursor-pointer shadow-md shadow-amber-500/20 active:scale-95 animate-pulse"
                >
                  <Unlock className="h-4 w-4" />
                  Activate Premium (1-Click)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Inner Sub-Navigation within the Premium Hub */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-700/50 pt-4 text-xs font-bold">
          <button
            onClick={() => setInnerPremiumTab('ai-doubt')}
            className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
              innerPremiumTab === 'ai-doubt'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-slate-200'
            }`}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            AI Doubt Solving Mitra
            {!user.premiumUser && trialCount > 0 && (
              <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded-full ml-1">Trial Used</span>
            )}
          </button>
          
          <button
            onClick={() => setInnerPremiumTab('premium-mocks')}
            className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
              innerPremiumTab === 'premium-mocks'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-slate-200'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            Premium Mock tests
            <span className="bg-blue-600 text-white text-[8px] font-extrabold uppercase px-1 rounded-sm">Uncapped</span>
          </button>

          <button
            onClick={() => setInnerPremiumTab('premium-pyqs')}
            className={`px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer ${
              innerPremiumTab === 'premium-pyqs'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-slate-200'
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            PYQ Vault (Solved Papers)
          </button>
        </div>
      </div>

      {/* RENDER INNER PREMIUM TABS */}
      <div id="premium-inner-viewer" className="grid grid-cols-12 gap-5 font-sans">
        
        {/* TAB 1: AI DOUBT SOLVING DESK */}
        {innerPremiumTab === 'ai-doubt' && (
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`col-span-12 lg:col-span-8 bg-white rounded-2xl border transition-all duration-200 shadow-sm p-4 flex flex-col justify-between min-h-[500px] relative ${
              isDragging ? 'border-dashed border-blue-500 bg-blue-50/40 scale-[0.99]' : 'border-slate-200'
            }`}
          >
            {isDragging && (
              <div className="absolute inset-0 z-40 bg-blue-500/10 backdrop-blur-xs flex flex-col items-center justify-center pointer-events-none rounded-2xl">
                <div className="bg-white p-4 rounded-full shadow-lg flex items-center justify-center animate-bounce mb-2">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <span className="text-sm font-extrabold text-blue-800">Drop your exam question picture here!</span>
                <span className="text-xs text-blue-500 font-medium">Supports question paper snapshots or formulas</span>
              </div>
            )}

            <div className="border-b border-slate-100 pb-3 flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border-dashed">
              <div className="flex items-center gap-2">
                <span className="p-1 w-7 h-7 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center font-extrabold">AI</span>
                <div>
                  <h3 className="text-xs font-bold text-slate-800 leading-tight">Sarkari Exam Mitra (AI Tutor & Image Solver)</h3>
                  <p className="text-[10px] text-slate-400">Instantly answers standard doubts or solves printed question images via Gemini 3.5</p>
                </div>
              </div>
              
              {!user.premiumUser && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[9px] font-extrabold text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 animate-pulse">
                    Free Trial: {trialCount}/30 limit
                  </span>
                  <button
                    onClick={() => {
                      setTrialCount(0);
                      triggerToast("🔄 Free trial counter reset! You have 30 more queries.");
                    }}
                    type="button"
                    title="Reset trial counter to 0"
                    className="text-[9px] bg-slate-200 hover:bg-slate-350 text-slate-700 font-extrabold px-2 py-0.5 rounded cursor-pointer transition"
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>

            {/* Chat message streams */}
            <div className="flex-1 overflow-y-auto max-h-[350px] min-h-[250px] py-4 space-y-4 px-1" id="doubt-chat-box">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#1E3A8A] text-white rounded-br-none font-medium'
                      : 'bg-slate-50 text-slate-800 border border-slate-150 rounded-bl-none font-sans'
                  }`}>
                    {msg.image && (
                      <div className="mb-2 max-w-xs overflow-hidden rounded-xl border border-white/20 shadow-xs bg-slate-100 p-1">
                        <img 
                          src={msg.image} 
                          alt="Uploaded query snapshot" 
                          className="max-h-56 object-contain rounded-lg w-full"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    {/* Simplified formatting logic for markdown structure */}
                    <div className="whitespace-pre-wrap select-text selection:bg-slate-200">
                      {msg.text}
                    </div>
                    <span className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3 text-xs text-slate-500 rounded-bl-none flex items-center gap-2">
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#1E3A8A]" />
                    <span>Mitra is solving & formulating explanations...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Attached Image Preview above inputs */}
            {attachedImage && (
              <div className="mb-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-150 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-12 h-12 rounded-lg border border-slate-300 bg-white overflow-hidden">
                    <img src={attachedImage} alt="Preview attachment" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-extrabold text-emerald-900 block leading-tight">Question Paper Attached</span>
                    <span className="text-[10px] text-emerald-600 leading-none block mt-0.5">Ready to solve upon sending</span>
                  </div>
                </div>
                <button 
                  onClick={() => setAttachedImage(null)}
                  className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 p-1.5 transition-colors cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            )}

            {/* Suggestions list for quick clicks */}
            <div className="mt-2.5 space-y-1.5 shrink-0 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Suggested Queries (Click to doubt solve):</span>
              <div className="flex flex-wrap gap-1">
                {queryPills.map((pill, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(pill)}
                    className="bg-white hover:bg-slate-100 border border-slate-150 rounded px-2 py-0.5 text-[10px] text-slate-600 transition truncate max-w-full text-left font-medium"
                  >
                    💡 {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Send Bar */}
            <div className="mt-4 pt-3 border-t border-slate-150 shrink-0 flex gap-2 items-center">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={!user.premiumUser && trialCount >= 30}
                title="Attach question image / take picture"
                className="p-3 rounded-xl border border-slate-205 hover:bg-slate-50 text-slate-550 hover:text-slate-800 transition cursor-pointer flex items-center justify-center shrink-0"
              >
                <Camera className="h-4.5 w-4.5 text-emerald-650 animate-pulse" />
              </button>

              <input
                type="text"
                placeholder={!user.premiumUser && trialCount >= 30 ? "🔒 Trial limit reached. Click Reset above or upgrade" : "Type exam query, drag-drop question picture..."}
                value={userInput}
                disabled={!user.premiumUser && trialCount >= 30}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="flex-1 rounded-xl border border-slate-205 bg-slate-50 p-3 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 placeholder-slate-400"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={(!user.premiumUser && trialCount >= 30) || (!userInput.trim() && !attachedImage) || isLoading}
                className="bg-[#1E3A8A] text-white px-4 py-3 rounded-xl flex items-center justify-center font-bold hover:bg-blue-800 disabled:opacity-50 transition shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PREMIUM MOCK ASSESSMENTS */}
        {innerPremiumTab === 'premium-mocks' && (
          <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900">Premium Mock Test assessments list</h3>
              <p className="text-xs text-slate-400">Completely uncapped mock series for active subscribers. Take unlimited tests, view performance metrics, and gain certificates.</p>
            </div>

            <div className="space-y-3 font-sans">
              {mockTests.map((test) => (
                <div key={test.id} className="p-4 border border-slate-150 rounded-xl bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="bg-[#1E3A8A] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase">
                        {test.category}
                      </span>
                      <span className="text-slate-400 font-mono font-bold">{test.durationMinutes} Minutes exam</span>
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{test.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Questions count: <strong>{test.questions.length} Sets</strong> • Total marks: <strong>{test.totalMarks}</strong> • Negative mark fraction: <strong>-{test.negativeMark}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (!user.premiumUser) {
                        triggerToast("🔒 Upgrading to any Premium Plan is required to unlock real mock tests.");
                      } else {
                        // Switch tab to standard mock tests
                        setActiveTab('mock-tests');
                        triggerToast(`✏️ Launching ${test.title} session`);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-lg font-bold text-[11px] shrink-0 border transition-all cursor-pointer flex items-center gap-1 ${
                      user.premiumUser 
                        ? 'bg-emerald-600 border-emerald-600 text-white hover:bg-emerald-700' 
                        : 'bg-[#1E3A8A] text-white border-[#1E3A8A] hover:bg-opacity-95'
                    }`}
                  >
                    {user.premiumUser ? (
                      <>⚡ Start Assessment</>
                    ) : (
                      <><Lock className="h-3 w-3" /> Unlock with Premium</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SARKARI PYQ COMPILATIONS */}
        {innerPremiumTab === 'premium-pyqs' && (
          <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-sm font-extrabold text-slate-900">Solved Previous Year Papers (PYQ Vault)</h3>
              <p className="text-xs text-slate-400">Authentic board question sheets with explanatory answer directories compiled by educators.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              {PYQPapers.map((paper, idx) => (
                <div key={idx} className="p-3.5 border border-slate-150 rounded-xl bg-slate-50/50 flex flex-col justify-between h-32 hover:border-slate-300 transition-all">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="bg-slate-100 text-slate-600 text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded">
                        PDF SOLVED PAPERS
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono font-extrabold">{paper.size}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-800 text-[11.5px] leading-snug mt-2 line-clamp-2">{paper.title}</h4>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                    <span className="text-[9px] text-slate-400 font-bold">{paper.downloadCount} Premium downloads</span>
                    <button
                      onClick={() => {
                        if (!user.premiumUser) {
                          triggerToast("🔒 Upgrading to Premium is required to download Previous Year Solved sheets.");
                        } else {
                          triggerToast(`📥 Downloading: ${paper.title}`);
                        }
                      }}
                      className="bg-[#1E3A8A] hover:bg-blue-800 text-white p-1 rounded font-bold text-[10px] flex items-center gap-0.5"
                    >
                      <Download className="h-3 w-3" /> Get PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Info Card panel: Highlights premium benefits or handles lock details */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          
          {/* Card 1: Premium Perks Listing */}
          <div className="bg-[#0F172A] text-white rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3.5">
            <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1 uppercase tracking-wider">
              <Star className="h-4 w-4 text-amber-400" />
              Member Access Perks
            </h4>

            <div className="space-y-3 text-[11px] font-medium leading-relaxed">
              {[
                { title: 'AI Exam Mitra Solves doubts', desc: 'Real-time personalized tutor explaining formulas & patterns.' },
                { title: 'Unrestricted Premium Mocks', desc: 'Interactive practice scorecards across state & national exam categories.' },
                { title: 'High Density Solved PYQs', desc: 'Get previous year papers instantly on your smartphone.' },
                { title: 'Zero Advertising Content', desc: 'Shorter loading states and uninterrupted focus on revisions.' }
              ].map((perk, pIdx) => (
                <div key={pIdx} className="flex gap-2">
                  <span className="w-4 h-4 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center font-extrabold text-[9px] shrink-0 mt-0.5">✓</span>
                  <div>
                    <h5 className="font-extrabold text-slate-200 leading-none">{perk.title}</h5>
                    <p className="text-slate-450 mt-1 leading-snug">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Subscription Selector for quick activation, synced with App payment methods */}
          {!user.premiumUser && (
            <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-sm bg-gradient-to-b from-amber-50/20 to-white relative overflow-hidden">
              <span className="absolute -right-4 -top-4 rounded-full w-12 h-12 bg-amber-500/10 text-amber-500 flex items-center justify-center rotate-45 font-mono text-[9px] font-bold">SALE</span>
              
              <h4 className="text-xs font-extrabold text-slate-900 uppercase">Unlock All Features Instantly</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">Unlock **AI doubt solving**, **mock tests**, and **PYQs** immediately inside this tab by selecting a plan below!</p>
              
              <div className="mt-3.5 space-y-2 text-xs">
                <button
                  onClick={onActivatePremium}
                  className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-2.5 flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-500 shadow-md shadow-amber-500/15"
                >
                  <Unlock className="h-3.5 w-3.5" />
                  Activate Now! (Sandbox Free Checkout)
                </button>
                <p className="text-[10px] text-center text-slate-450 leading-none">Safe simulated checkout. Upgrades profile instantaneously.</p>
              </div>
            </div>
          )}

          {/* Card 3: Study Guidance Notice */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-slate-600 flex items-start gap-1.5">
            <AlertCircle className="h-4 w-4 text-[#1E3A8A] shrink-0 mt-0.5" />
            <div className="text-[10px] font-semibold leading-normal">
              <span className="font-extrabold text-slate-800">Note for Aspirants:</span> All question keys and solver datasets are generated from the latest national and state board gazettes.
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
