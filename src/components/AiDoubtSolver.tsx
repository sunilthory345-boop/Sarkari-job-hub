import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Camera, Mic, MicOff, RefreshCw, 
  Copy, Check, Volume2, Share2, Download, HelpCircle, 
  BookOpen, Calculator, Brain, Globe, Shield, Flame, 
  Zap, ChevronRight, X, FileText, CheckCircle2, AlertCircle
} from 'lucide-react';
import { fetchWithRetry } from '../utils/fetchHelper';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
  timestamp: string;
  subjectCategory?: string;
}

interface AiDoubtSolverProps {
  initialQuestion?: string;
  initialImage?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export default function AiDoubtSolver({
  initialQuestion = '',
  initialImage = '',
  onClose,
  isModal = false
}: AiDoubtSolverProps) {
  const [inputQuery, setInputQuery] = useState(initialQuestion);
  const [selectedImage, setSelectedImage] = useState<string | null>(initialImage || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `👋 **Namaste! I am Sarkari AI Doubt Mitra (सरकारी एआई डाउट मित्र)**
    
I can instantly solve any exam question with **Complete Step-by-Step Method Breakdown (प्रश्न को समझें ➔ मुख्य सूत्र ➔ चरणबद्ध हल ➔ शॉर्ट ट्रिक)** and **Bilingual Voice Translation (हिन्दी + English आवाज़ से समझें)** for **SSC, UPSC, Railways, Banking, Defence, State PSC & Health Exams**!

**🎯 Solution Structure Provided for Every Doubt (हल करने का तरीका):**
1. 💡 **Question Analysis (प्रश्न को समझें):** Identify given inputs and required variables.
2. 📐 **Core Formula (मुख्य सूत्र व सिद्धांत):** Standard exam rules and equations.
3. ✍️ **Step-by-Step Calculation (चरणबद्ध समाधान):** Clear math working without skips.
4. ⚡ **Exam Short Trick (शॉर्ट ट्रिक):** Save 45 seconds in live examination hall!
5. 🔊 **Voice Explanation (आवाज़ में समझें):** Click **Hindi Voice** or **English Voice** below any solution to listen out loud!

**How would you like to solve your doubt today?**
- 📸 **Upload or Snap Photo:** Click camera to read printed/handwritten questions.
- 🎙️ **Voice Doubt:** Click mic to ask your question out loud in Hindi or English.
- 📝 **Type Question:** Enter math problem, reasoning puzzle, or GS query below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subjectCategory: 'Welcome'
    }
  ]);

  // If initialQuestion comes in later or when modal opens, send it automatically if messages length is 1
  useEffect(() => {
    if (initialQuestion && messages.length === 1) {
      handleSolveSubmit(initialQuestion, initialImage || undefined);
    }
  }, [initialQuestion, initialImage]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Voice Recognition Handler using Web Speech API
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your doubt or upload an image.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'hi-IN'; // Supports Hindi & English mixed

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  // Image Upload Handler
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file (JPG, PNG).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Main Submit Solver Handler
  const handleSolveSubmit = async (customText?: string, customImage?: string) => {
    const queryText = customText !== undefined ? customText : inputQuery;
    const imgData = customImage !== undefined ? customImage : selectedImage;

    if (!queryText.trim() && !imgData) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: queryText,
      image: imgData || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subjectCategory: selectedCategory
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const response = await fetchWithRetry('/api/doubt-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          image: imgData || undefined
        })
      });

      const data = await response.json();
      const aiMessageId = `ai-${Date.now()}`;
      setMessages(prev => [...prev, {
        id: aiMessageId,
        sender: 'ai',
        text: data.text || "⚠️ Unable to generate solution. Please try asking again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: "⚠️ **Connection Failure**\n\nCould not connect to Sarkari AI Doubt Solver backend. Please check your network and try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Copy solution to clipboard
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Text to Speech Handler with Language Selection (Hindi / English)
  const handleTextToSpeech = (text: string, id: string, lang: 'hi' | 'en' = 'hi') => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    const speakingKey = `${id}-${lang}`;

    if (isSpeaking === speakingKey) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown formatting for clear speech pronunciation
    let cleanText = text
      .replace(/[*#_~`$]/g, '')
      .replace(/\\times/g, ' multiplied by ')
      .replace(/\\div/g, ' divided by ')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 divided by $2')
      .replace(/\\text\{([^}]+)\}/g, '$1');

    if (lang === 'hi') {
      cleanText = `नमस्ते शिक्षार्थी, ध्यान से सुनें सवाल को हल करने का तरीका: ` + cleanText;
    } else {
      cleanText = `Hello Aspirant, here is the step by step voice explanation to solve this question: ` + cleanText;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(speakingKey);
    window.speechSynthesis.speak(utterance);
  };

  // Download solution as a text file
  const handleDownloadSolution = (text: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Sarkari_AI_Solved_Doubt_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Pre-built Subject Chips
  const categoryChips = [
    { id: 'Maths', label: '🔢 Maths (गणित)', icon: Calculator, color: 'bg-blue-600 text-white' },
    { id: 'Reasoning', label: '🧩 Reasoning (रीजनिंग)', icon: Brain, color: 'bg-purple-600 text-white' },
    { id: 'Science', label: '🔬 Science (विज्ञान)', icon: Zap, color: 'bg-emerald-600 text-white' },
    { id: 'Polity', label: '🏛️ Polity (संविधान)', icon: Shield, color: 'bg-amber-600 text-white' },
    { id: 'History', label: '📜 History (इतिहास)', icon: BookOpen, color: 'bg-red-600 text-white' },
    { id: 'English', label: '✍️ English (अंग्रेजी)', icon: FileText, color: 'bg-indigo-600 text-white' },
    { id: 'CurrentAffairs', label: '📰 Current Affairs', icon: Flame, color: 'bg-rose-600 text-white' }
  ];

  // Quick Instant Doubt Buttons
  const quickDoubts = [
    { label: '🤝 If A:B = 2:3 and B:C = 4:5, find A:B:C', category: 'Maths' },
    { label: '📈 Find net gain if item is marked 20% costlier with 10% discount', category: 'Maths' },
    { label: '🧩 Explain EJOTY coding rule in Reasoning with examples', category: 'Reasoning' },
    { label: '🏛️ Article 12 to 35 Fundamental Rights key summary', category: 'Polity' },
    { label: '💉 Cold chain storage temperature for BCG and OPV vaccines', category: 'Science' },
    { label: '✍️ Explain Subject-Verb Agreement rules for Each/Every and Neither-Nor', category: 'English' }
  ];

  return (
    <div className={`flex flex-col bg-slate-900 text-white rounded-2xl shadow-2xl border border-blue-900/60 overflow-hidden ${isModal ? 'h-[90vh] max-h-[750px] w-full max-w-4xl mx-auto' : 'h-[750px] w-full'}`}>
      
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-4 border-b border-blue-800/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 rounded-xl shadow-md">
            <Sparkles className="h-5 w-5 fill-slate-950 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
              Sarkari AI Doubt Mitra <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">⚡ Step-by-Step Solver</span>
            </h2>
            <p className="text-xs text-blue-200">
              Free 24/7 Bilingual Solution Engine for SSC, Railways, Bank, UPSC & State Exams
            </p>
          </div>
        </div>

        {isModal && onClose && (
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            aria-label="Close Modal"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Category Shortcut Filter Strip */}
      <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-400 font-semibold shrink-0">Select Subject:</span>
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-2.5 py-1 rounded-full font-medium transition-all ${selectedCategory === 'All' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          All Subjects
        </button>
        {categoryChips.map(chip => (
          <button
            key={chip.id}
            onClick={() => setSelectedCategory(chip.id)}
            className={`px-2.5 py-1 rounded-full font-medium transition-all shrink-0 flex items-center gap-1 ${selectedCategory === chip.id ? chip.color : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-950/40">
        
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-[10px] text-slate-400 font-mono">
                {msg.sender === 'user' ? 'Candidate Query' : 'Sarkari AI Tutor'} • {msg.timestamp}
              </span>
            </div>

            <div 
              className={`max-w-[90%] sm:max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-lg relative leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-800/90 text-slate-100 rounded-tl-none border border-slate-700/80'
              }`}
            >
              {/* Image Thumbnail if user attached image */}
              {msg.image && (
                <div className="mb-3 rounded-lg overflow-hidden border border-white/20 max-w-sm">
                  <img src={msg.image} alt="User Question attachment" className="w-full max-h-56 object-contain bg-black/50" />
                </div>
              )}

              {/* Text content with clean markdown handling */}
              <div className="whitespace-pre-line text-sm sm:text-base font-normal space-y-2 select-text">
                {msg.text}
              </div>

              {/* Action buttons on AI responses */}
              {msg.sender === 'ai' && msg.id !== 'welcome-1' && (
                <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-col space-y-2 text-xs">
                  
                  {/* Voice Explanation Strip */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 p-2 rounded-xl border border-slate-700/60">
                    <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                      <Volume2 className="h-3.5 w-3.5 text-amber-400 animate-pulse" /> आवाज़ में समझें (Voice Explanation):
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleTextToSpeech(msg.text, msg.id, 'hi')}
                        className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                          isSpeaking === `${msg.id}-hi`
                            ? 'bg-amber-500 text-slate-950 border border-amber-400 animate-pulse'
                            : 'bg-blue-900/60 hover:bg-blue-800 text-blue-200 border border-blue-700/50'
                        }`}
                        title="हिन्दी में आवाज से समझें"
                      >
                        🔊 {isSpeaking === `${msg.id}-hi` ? 'रोकें (Stop)' : 'हिन्दी (Hindi)'}
                      </button>

                      <button
                        onClick={() => handleTextToSpeech(msg.text, msg.id, 'en')}
                        className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1 ${
                          isSpeaking === `${msg.id}-en`
                            ? 'bg-amber-500 text-slate-950 border border-amber-400 animate-pulse'
                            : 'bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/50'
                        }`}
                        title="Listen Voice Explanation in English"
                      >
                        🔊 {isSpeaking === `${msg.id}-en` ? 'Stop' : 'English'}
                      </button>
                    </div>
                  </div>

                  {/* Copy & Download Options */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="px-2.5 py-1 rounded-md bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-1.5"
                        title="Copy Solution"
                      >
                        {copiedId === msg.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === msg.id ? 'Copied!' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleDownloadSolution(msg.text)}
                        className="px-2.5 py-1 rounded-md bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-1.5"
                        title="Download Solution as TXT"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download TXT</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      ✓ Verified Step-by-Step Solution
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Spinner Indicator */}
        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none p-4 border border-slate-700 flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-amber-400 animate-spin" />
              <div>
                <p className="text-sm font-bold text-amber-300 animate-pulse">
                  Solving doubt step-by-step...
                </p>
                <p className="text-xs text-slate-400">
                  Applying OCR, exam formulas, short tricks, and bilingual explanations
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Doubts Strip */}
      {messages.length <= 3 && (
        <div className="bg-slate-950 p-3 border-t border-slate-800">
          <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-amber-400" /> Click any frequent exam doubt to solve instantly:
          </p>
          <div className="flex flex-wrap gap-2">
            {quickDoubts.map((qd, idx) => (
              <button
                key={idx}
                onClick={() => handleSolveSubmit(qd.label)}
                className="text-xs bg-slate-800 hover:bg-blue-900/60 hover:border-blue-500 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition-all text-left"
              >
                {qd.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Image Preview Bar */}
      {selectedImage && (
        <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={selectedImage} alt="Thumbnail preview" className="h-10 w-10 object-cover rounded border border-blue-500" />
            <span className="text-xs text-emerald-400 font-medium">📸 Notebook photo attached ready for OCR solving</span>
          </div>
          <button 
            onClick={() => setSelectedImage(null)}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold"
          >
            Remove
          </button>
        </div>
      )}

      {/* Input controls form */}
      <div className="bg-slate-900 p-3 sm:p-4 border-t border-slate-800">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSolveSubmit();
          }} 
          className="flex items-center gap-2"
        >
          {/* Hidden File Input */}
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          {/* Camera / Image Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`p-3 rounded-xl transition-all ${
              selectedImage ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Upload or Snap Notebook / Book Photo"
          >
            <Camera className="h-5 w-5" />
          </button>

          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-3 rounded-xl transition-all ${
              isListening ? 'bg-rose-600 text-white animate-bounce' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Speak your question in Hindi or English (बोलकर सवाल पूछें)"
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          {/* Question Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={isListening ? "Listening... Speak now..." : "Ask any question, equation, or syllabus doubt..."}
            className="flex-1 bg-slate-950 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-all"
          />

          {/* Submit Send Button */}
          <button
            type="submit"
            disabled={isLoading || (!inputQuery.trim() && !selectedImage)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold p-3 sm:px-5 rounded-xl transition-all flex items-center gap-2 shadow-lg shrink-0"
          >
            <Send className="h-5 w-5" />
            <span className="hidden sm:inline">Solve</span>
          </button>
        </form>
        
        <p className="text-[11px] text-slate-400 mt-2 text-center">
          💡 Pro-tip: Type any formula, photo, or question. Sarkari AI gives step-by-step bilingual solutions & short tricks.
        </p>
      </div>

    </div>
  );
}
