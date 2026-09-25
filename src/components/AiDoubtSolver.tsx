import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Camera, Mic, MicOff, RefreshCw, 
  Copy, Check, Volume2, VolumeX, Share2, Download, HelpCircle, 
  BookOpen, Calculator, Brain, Globe, Shield, Flame, 
  Zap, ChevronRight, X, FileText, CheckCircle2, AlertCircle,
  Lightbulb, Layers, Award, Compass, Clock, Bookmark, ArrowRight,
  TrendingUp, GraduationCap, Play, Pause, RotateCcw, FastForward,
  Headphones, Radio
} from 'lucide-react';
import { fetchWithRetry } from '../utils/fetchHelper';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
  timestamp: string;
  subjectCategory?: string;
  subTopic?: string;
  isPro?: boolean;
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
  const [selectedCategory, setSelectedCategory] = useState<string>('AdvanceMath');
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>('All');
  const [isProMode, setIsProMode] = useState<boolean>(true);
  const [autoAudioAnswer, setAutoAudioAnswer] = useState<boolean>(true);
  const [showFormulaVault, setShowFormulaVault] = useState<boolean>(false);
  const [activeVaultTab, setActiveVaultTab] = useState<'math' | 'reasoning' | 'english'>('math');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Audio Player State
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioLang, setAudioLang] = useState<'hi' | 'en'>('hi');
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioLoadingId, setAudioLoadingId] = useState<string | null>(null);
  
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: `👋 **Namaste! I am Sarkari AI Doubt Mitra PRO (सरकारी एआई डाउट मित्र प्रो)**
    
I can explain answers in **Full Voice Audio (ऑडियो व्याख्या)** with Step-by-Step Rigor for:
- 🚀 **Advance Math Pro (उच्च गणित)**: Algebra, Trigonometry, Geometry, Coordinate Geometry, Mensuration 2D/3D & Remainder Theorems.
- 🧠 **Advance Reasoning Pro (उच्च तर्कशक्ति)**: 'Only a few' Syllogism, Floor/Circular Multi-Variable Puzzles, Machine Input-Output & Coded Inequalities.
- 📚 **Advance English Grammar Pro (एडवांस्ड इंग्लिश ग्रामर)**: Inversion, Conditionals, Subjunctive Mood ('It is high time + V2'), Dangling Participles, Subject-Verb Agreement & Fixed Prepositions.

**🎯 Audio Features (ऑडियो विशेषताएं):**
1. 🔊 **Auto-Audio Answer:** Automatically begins reading/explaining answers as soon as solved!
2. 🎙️ **Dual Language Voice:** Switch between 🇮🇳 हिन्दी आवाज़ and 🇬🇧 English Voice anytime.
3. ⚡ **Speed & Waveform Player:** Adjust speed (0.8x, 1x, 1.2x, 1.5x) with live soundwave animation.

**Select a Pro Subject or ask by photo 📸, voice 🎙️, or text ✍️!**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subjectCategory: 'AdvanceMath',
      isPro: true
    }
  ]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      stopAnyAudio();
    };
  }, []);

  // Stop any active audio or speech
  const stopAnyAudio = () => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setIsPlayingAudio(false);
    setActiveAudioId(null);
    setAudioProgress(0);
    setAudioLoadingId(null);
  };

  // Convert markdown and mathematical equations to natural phonetic spoken text
  const preparePhoneticSpeechText = (rawText: string, lang: 'hi' | 'en'): string => {
    let clean = rawText
      // Remove markdown headings, bold, bullet points
      .replace(/^#+\s+/gm, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/_{1,2}([^_]+)_{1,2}/g, '$1')
      // Clean math LaTeX notation
      .replace(/\\times/g, lang === 'hi' ? ' गुणा ' : ' multiplied by ')
      .replace(/\\div/g, lang === 'hi' ? ' भाग ' : ' divided by ')
      .replace(/\\pm/g, lang === 'hi' ? ' प्लस माइनस ' : ' plus or minus ')
      .replace(/\\theta/g, lang === 'hi' ? ' थीटा ' : ' theta ')
      .replace(/\\sin/g, lang === 'hi' ? ' साइन ' : ' sine ')
      .replace(/\\cos/g, lang === 'hi' ? ' कॉस ' : ' cosine ')
      .replace(/\\tan/g, lang === 'hi' ? ' टैन ' : ' tangent ')
      .replace(/\\cot/g, lang === 'hi' ? ' कॉट ' : ' cotangent ')
      .replace(/\\sec/g, lang === 'hi' ? ' सेक ' : ' secant ')
      .replace(/\\csc/g, lang === 'hi' ? ' कोसेक ' : ' cosecant ')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, lang === 'hi' ? '$1 बटा $2' : '$1 over $2')
      .replace(/\\sqrt\{([^}]+)\}/g, lang === 'hi' ? 'रूट $1' : 'square root of $1')
      .replace(/\\le/g, lang === 'hi' ? ' छोटा या बराबर ' : ' less than or equal to ')
      .replace(/\\ge/g, lang === 'hi' ? ' बड़ा या बराबर ' : ' greater than or equal to ')
      .replace(/\\equiv/g, lang === 'hi' ? ' बराबर ' : ' equivalent to ')
      .replace(/\\pmod\{([^}]+)\}/g, lang === 'hi' ? ' मॉड $1 ' : ' modulo $1 ')
      .replace(/\\circ/g, lang === 'hi' ? ' डिग्री ' : ' degrees ')
      .replace(/\\triangle/g, lang === 'hi' ? ' त्रिभुज ' : ' triangle ')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/[$]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // Intro greeting
    if (lang === 'hi') {
      clean = `नमस्ते अभ्यर्थी, इस प्रश्न का ऑडियो समाधान ध्यान से सुनें: ${clean}`;
    } else {
      clean = `Hello Aspirant, here is the audio explanation for this question: ${clean}`;
    }

    return clean;
  };

  // Play Audio Answer (tries server gemini-3.8-flash-lite-tts, then falls back to SpeechSynthesis)
  const handlePlayAudioAnswer = async (text: string, id: string, targetLang = audioLang, targetSpeed = audioSpeed) => {
    // If already playing this message, toggle pause
    if (activeAudioId === id && isPlayingAudio) {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
        setIsPlayingAudio(false);
        return;
      }
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        setIsPlayingAudio(false);
        return;
      }
    }

    // If paused on this message, resume
    if (activeAudioId === id && !isPlayingAudio) {
      if (currentAudioRef.current) {
        currentAudioRef.current.play();
        setIsPlayingAudio(true);
        return;
      }
      if ('speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlayingAudio(true);
        return;
      }
    }

    // Stop prior audio
    stopAnyAudio();

    setActiveAudioId(id);
    setAudioLoadingId(id);
    setAudioLang(targetLang);
    setAudioSpeed(targetSpeed);

    const phoneticText = preparePhoneticSpeechText(text, targetLang);

    // Try Backend Server TTS API first
    try {
      const response = await fetchWithRetry('/api/generate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: phoneticText.slice(0, 1000),
          lang: targetLang
        })
      });

      const data = await response.json();

      if (data?.audioBase64) {
        const audio = new Audio(`data:${data.mimeType || 'audio/mp3'};base64,${data.audioBase64}`);
        audio.playbackRate = targetSpeed;
        currentAudioRef.current = audio;

        audio.oncanplay = () => {
          setAudioLoadingId(null);
          setIsPlayingAudio(true);
          audio.play().catch(e => console.warn('Audio play catch:', e));
        };

        audio.ontimeupdate = () => {
          if (audio.duration) {
            setAudioProgress(Math.round((audio.currentTime / audio.duration) * 100));
          }
        };

        audio.onended = () => {
          stopAnyAudio();
        };

        audio.onerror = () => {
          playViaWebSpeech(phoneticText, id, targetLang, targetSpeed);
        };

        return;
      }
    } catch (err) {
      console.warn('Backend TTS failed, using Web Speech fallback', err);
    }

    // Fallback: Web Speech API (Always available in modern browsers, no external network needed)
    playViaWebSpeech(phoneticText, id, targetLang, targetSpeed);
  };

  // Web Speech API fallback player
  const playViaWebSpeech = (speechText: string, id: string, targetLang: 'hi' | 'en', targetSpeed: number) => {
    if (!('speechSynthesis' in window)) {
      setAudioLoadingId(null);
      alert('Audio speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = targetLang === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = targetSpeed * 0.95;
    utterance.pitch = 1.0;

    // Pick suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      const match = voices.find(v => targetLang === 'hi' ? v.lang.includes('hi') : (v.lang.includes('en-IN') || v.lang.includes('en-US')));
      if (match) utterance.voice = match;
    }

    currentUtteranceRef.current = utterance;

    // Progress simulation for SpeechSynthesis
    const estimatedDurationSec = (speechText.length / 15) / targetSpeed;
    let elapsed = 0;
    progressTimerRef.current = setInterval(() => {
      elapsed += 0.2;
      const pct = Math.min(99, Math.round((elapsed / estimatedDurationSec) * 100));
      setAudioProgress(pct);
    }, 200);

    utterance.onstart = () => {
      setAudioLoadingId(null);
      setIsPlayingAudio(true);
    };

    utterance.onend = () => {
      stopAnyAudio();
    };

    utterance.onerror = () => {
      stopAnyAudio();
    };

    window.speechSynthesis.speak(utterance);
  };

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

  // Subtopics for Pro Subjects
  const subTopicsMap: Record<string, { id: string; label: string }[]> = {
    AdvanceMath: [
      { id: 'All', label: 'All Math Topics' },
      { id: 'Trigonometry', label: '📐 Trigonometry (Max/Min)' },
      { id: 'Algebra', label: '🔣 Algebra & Identities' },
      { id: 'Geometry', label: '⭕ Circles & Triangles' },
      { id: 'Coordinate', label: '📍 Coordinate Geometry' },
      { id: 'NumberSystem', label: '🔢 Remainder & Euler' },
      { id: 'Mensuration', label: '📦 Mensuration 2D/3D' },
      { id: 'Permutation', label: '🎲 P&C & Probability' }
    ],
    AdvanceReasoning: [
      { id: 'All', label: 'All Reasoning Topics' },
      { id: 'Syllogism', label: '⭕ Only a Few Syllogism' },
      { id: 'Puzzles', label: '🏢 Puzzles & Seating (2-3 Var)' },
      { id: 'MachineIO', label: '📦 Machine Input-Output' },
      { id: 'Inequalities', label: '⚡ Coded Inequalities' },
      { id: 'ClockCalendar', label: '⏰ Clocks & Calendars' },
      { id: 'Direction', label: '🧭 Coded Direction & Shadow' },
      { id: 'CriticalReasoning', label: '🤔 Statement & Assumption' }
    ],
    AdvanceEnglish: [
      { id: 'All', label: 'All English Topics' },
      { id: 'Inversion', label: '🔄 Inversion & Conditionals' },
      { id: 'Subjunctive', label: '🎭 Subjunctive & High Time' },
      { id: 'NonFinites', label: '🔗 Dangling Participles & Gerunds' },
      { id: 'SubjectVerb', label: '⚖️ Subject-Verb Agreement' },
      { id: 'Prepositions', label: '📌 Fixed Prepositions & Phrasals' },
      { id: 'VoiceNarration', label: '🎙️ Active-Passive & Narration' },
      { id: 'ErrorSpotting', label: '🔍 CGL Tier-2 Error Spotting' }
    ]
  };

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
      recognition.lang = 'hi-IN';

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

    // Stop any ongoing audio
    stopAnyAudio();

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      sender: 'user',
      text: queryText,
      image: imgData || undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      subjectCategory: selectedCategory,
      subTopic: selectedSubTopic,
      isPro: isProMode
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
          image: imgData || undefined,
          mode: isProMode ? 'pro' : 'standard',
          subjectCategory: selectedCategory,
          subTopic: selectedSubTopic
        })
      });

      const data = await response.json();
      const aiMessageId = `ai-${Date.now()}`;
      const solutionText = data.text || "⚠️ Unable to generate solution. Please try asking again.";

      setMessages(prev => [...prev, {
        id: aiMessageId,
        sender: 'ai',
        text: solutionText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subjectCategory: selectedCategory,
        subTopic: selectedSubTopic,
        isPro: isProMode
      }]);

      // If Auto-Audio Answer is enabled, automatically speak and explain the answer!
      if (autoAudioAnswer) {
        setTimeout(() => {
          handlePlayAudioAnswer(solutionText, aiMessageId, audioLang, audioSpeed);
        }, 500);
      }

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

  // Download solution as a text file
  const handleDownloadSolution = (text: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Sarkari_AI_Pro_Doubt_Solution_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Subject Categories
  const categoryChips = [
    { 
      id: 'AdvanceMath', 
      label: '🚀 Advance Math Pro', 
      subLabel: 'उच्च गणित',
      icon: Calculator, 
      color: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/20 border-blue-400/50' 
    },
    { 
      id: 'AdvanceReasoning', 
      label: '🧠 Advance Reasoning Pro', 
      subLabel: 'तर्कशक्ति प्रो',
      icon: Brain, 
      color: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20 border-purple-400/50' 
    },
    { 
      id: 'AdvanceEnglish', 
      label: '📚 Advance English Grammar Pro', 
      subLabel: 'इंग्लिश ग्रामर',
      icon: BookOpen, 
      color: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 border-emerald-400/50' 
    },
    { id: 'Arithmetic', label: '🔢 Arithmetic Maths', subLabel: 'अंकगणित', icon: Calculator, color: 'bg-blue-700 text-white' },
    { id: 'Science', label: '🔬 Science & Tech', subLabel: 'विज्ञान', icon: Zap, color: 'bg-emerald-700 text-white' },
    { id: 'Polity', label: '🏛️ Polity & Law', subLabel: 'संविधान', icon: Shield, color: 'bg-amber-700 text-white' },
    { id: 'History', label: '📜 History & Culture', subLabel: 'इतिहास', icon: FileText, color: 'bg-red-700 text-white' },
    { id: 'CurrentAffairs', label: '📰 Current Affairs', subLabel: 'करेंट अफेयर्स', icon: Flame, color: 'bg-rose-700 text-white' }
  ];

  // Dynamic Pro Quick Doubts based on category
  const proQuickDoubts: Record<string, { label: string; tag: string }[]> = {
    AdvanceMath: [
      { label: '📐 If tan θ + cot θ = 2, find the value of tan^7 θ + cot^7 θ', tag: 'Trigonometry' },
      { label: '🔣 If x + 1/x = 5, find x^3 + 1/x^3 and x^4 + 1/x^4', tag: 'Algebra' },
      { label: '⭕ In △ABC, AD is angle bisector. AB=8, AC=12, BD=4. Find DC & Area ratio', tag: 'Geometry' },
      { label: '🔢 Find remainder when 2^100 is divided by 7 using Euler / Fermat theorem', tag: 'Number System' },
      { label: '📐 Find maximum and minimum values of 7 sin θ + 24 cos θ + 5', tag: 'Trigonometry Max/Min' },
      { label: '⭕ If PT is tangent of length 12 cm, secant PAB has PA=8 cm. Find PB & chord AB', tag: 'Circle Tangent' }
    ],
    AdvanceReasoning: [
      { label: '⭕ Syllogism: Only a few Pens are Pencils. All Pencils are Erasers. Can all Pens be Erasers?', tag: 'Only a few' },
      { label: '⏰ At what time between 3 and 4 o\'clock are the hands of a clock together?', tag: 'Clock Angle' },
      { label: '📦 Machine Input-Output: Step tracing logic for words ascending & numbers descending', tag: 'Machine I/O' },
      { label: '⚡ Coded Inequality: P @ Q means P >= Q, Q $ R means Q = R. Check conclusion P @ R', tag: 'Magic Box' },
      { label: '🧭 A person walks facing sunset, turns 135° clockwise. What direction is he facing?', tag: 'Direction & Shadow' },
      { label: '🏢 How to solve 8-person circular seating with 2 variables (Age & Profession) with 0 error?', tag: 'Puzzles' }
    ],
    AdvanceEnglish: [
      { label: '🔄 Inversion Rule: "Hardly had he entered the room when he saw the snake" - Spot the error', tag: 'Inversion' },
      { label: '🎭 Subjunctive Mood: "It is high time we start studying for the CGL exam" - Correct the verb', tag: 'Unreal Past' },
      { label: '🔗 Dangling Participle: "Being a rainy day, he decided to stay home" - Why is it wrong?', tag: 'Participles' },
      { label: '⚖️ Subject-Verb Concord: "The Prime Minister along with his ministers have/has arrived?"', tag: 'Agreement' },
      { label: '📌 Fixed Prepositions: Correct "He is senior than me and prefers coffee than tea"', tag: 'Fixed Prepositions' },
      { label: '🔍 "Look forward to" takes infinitive or gerund? Explain with 3 exam PYQs', tag: 'To + V-ing' }
    ]
  };

  const currentQuickDoubts = proQuickDoubts[selectedCategory] || [
    { label: '🤝 If A:B = 2:3 and B:C = 4:5, find combined ratio A:B:C', tag: 'Maths' },
    { label: '📈 Find net gain if item is marked 20% higher with 10% discount', tag: 'Maths' },
    { label: '🧩 Explain EJOTY coding rule in Reasoning with examples', tag: 'Reasoning' },
    { label: '🏛️ Article 12 to 35 Fundamental Rights key examination summary', tag: 'Polity' },
    { label: '💉 Cold chain storage temperature standard for BCG and OPV vaccines', tag: 'Science' },
    { label: '✍️ Explain Subject-Verb Agreement rules for Each/Every and Neither-Nor', tag: 'English' }
  ];

  return (
    <div className={`flex flex-col bg-slate-900 text-white rounded-2xl shadow-2xl border border-blue-900/60 overflow-hidden ${isModal ? 'h-[90vh] max-h-[820px] w-full max-w-4xl mx-auto' : 'h-[820px] w-full'}`}>
      
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-3.5 sm:p-4 border-b border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-amber-400 via-orange-400 to-amber-500 text-slate-950 rounded-xl shadow-lg ring-2 ring-amber-400/30">
            <Sparkles className="h-5 w-5 fill-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-1.5">
                <span>Sarkari AI Doubt Mitra</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-sm uppercase tracking-wider">
                  PRO LEVEL ⚡
                </span>
              </h2>
            </div>
            <p className="text-xs text-blue-200">
              Advance Math • Advance Reasoning • Advance English Grammar • Audio Answers 🔊
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Auto-Audio Answer Toggle Button */}
          <button
            onClick={() => {
              const nextVal = !autoAudioAnswer;
              setAutoAudioAnswer(nextVal);
              if (!nextVal) stopAnyAudio();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
              autoAudioAnswer 
                ? 'bg-emerald-600/30 border-emerald-400/60 text-emerald-300 ring-1 ring-emerald-400/40' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="ऑटो-ऑडियो उत्तर: जब यह चालू हो, तो उत्तर आते ही बोलकर समझाएगा"
          >
            {autoAudioAnswer ? (
              <Headphones className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-slate-500" />
            )}
            <span>ऑटो-ऑडियो: {autoAudioAnswer ? 'ON (चालू)' : 'OFF'}</span>
          </button>

          {/* Pro Mode Toggle */}
          <button
            onClick={() => setIsProMode(!isProMode)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
              isProMode 
                ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/60 text-amber-300' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Pro Level solving engine (CGL Tier-2 / Bank PO / CDS standard)"
          >
            <Award className={`h-3.5 w-3.5 ${isProMode ? 'text-amber-400' : 'text-slate-500'}`} />
            <span>{isProMode ? 'Pro Mode: Active' : 'Standard'}</span>
          </button>

          {/* Formula & Golden Rules Vault Button */}
          <button
            onClick={() => setShowFormulaVault(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/40 transition-all flex items-center gap-1.5 shadow-sm"
            title="Open Pro Formulas, Short Tricks & Golden Rules Cheat Sheet"
          >
            <BookOpen className="h-3.5 w-3.5 text-cyan-300" />
            <span className="hidden sm:inline">Cheat Sheet</span>
            <span className="sm:hidden">Rules</span>
          </button>

          {isModal && onClose && (
            <button 
              onClick={() => {
                stopAnyAudio();
                onClose();
              }}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all ml-1"
              aria-label="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Subject Category Selector Strip with glowing Pro Badges */}
      <div className="bg-slate-950/90 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-400 font-bold text-[11px] shrink-0 uppercase tracking-wider flex items-center gap-1">
          <GraduationCap className="h-3.5 w-3.5 text-blue-400" /> Subject:
        </span>
        
        {categoryChips.map(chip => {
          const Icon = chip.icon;
          const isSelected = selectedCategory === chip.id;
          const isProSubject = chip.id.startsWith('Advance');
          
          return (
            <button
              key={chip.id}
              onClick={() => {
                setSelectedCategory(chip.id);
                setSelectedSubTopic('All');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 flex items-center gap-1.5 border text-xs ${
                isSelected 
                  ? chip.color 
                  : isProSubject
                    ? 'bg-slate-900 text-slate-200 border-slate-700/80 hover:border-slate-500'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{chip.label}</span>
              {isProSubject && !isSelected && (
                <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded font-mono">PRO</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-Topic Quick Filter Pill Strip (When Pro Subject is chosen) */}
      {subTopicsMap[selectedCategory] && (
        <div className="bg-slate-900/70 px-4 py-1.5 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
            <Layers className="h-3 w-3 text-cyan-400" /> Topic Focus:
          </span>
          {subTopicsMap[selectedCategory].map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedSubTopic(topic.id)}
              className={`px-2.5 py-0.5 rounded-lg font-medium transition-all shrink-0 ${
                selectedSubTopic === topic.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold'
                  : 'bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {topic.label}
            </button>
          ))}
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-950/40">
        
        {messages.map((msg) => {
          const isThisAudioPlaying = activeAudioId === msg.id && isPlayingAudio;
          const isThisAudioLoading = audioLoadingId === msg.id;

          return (
            <div 
              key={msg.id} 
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  {msg.sender === 'user' ? (
                    <span>Candidate Doubt</span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Sparkles className="h-3 w-3" /> Sarkari AI Tutor PRO
                    </span>
                  )} 
                  • {msg.timestamp}
                  {msg.subjectCategory && (
                    <span className="ml-1 px-1.5 py-0.2 rounded bg-slate-800 text-blue-300 font-medium">
                      {msg.subjectCategory}
                    </span>
                  )}
                </span>
              </div>

              <div 
                className={`max-w-[95%] sm:max-w-[90%] rounded-2xl p-4 sm:p-5 shadow-xl relative leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-800/95 text-slate-100 rounded-tl-none border border-slate-700/80 ring-1 ring-white/5'
                }`}
              >
                {/* Pro Badge & Audio Explanation Bar on AI response */}
                {msg.sender === 'ai' && (
                  <div className="mb-3.5 space-y-2.5 pb-2.5 border-b border-slate-700/60">
                    
                    {/* Top Tier Badge & Live Audio Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
                        <Award className="h-3.5 w-3.5 text-amber-400" />
                        CGL TIER-2 / BANK PO / CDS LEVEL SOLUTION
                      </span>

                      {/* Live Audio Indicator */}
                      {isThisAudioPlaying ? (
                        <span className="inline-flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/50 px-2.5 py-0.5 rounded-full animate-pulse">
                          <Radio className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
                          <span>ऑडियो व्याख्या जारी है (Speaking...)</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Verified Steps & Formulas
                        </span>
                      )}
                    </div>

                    {/* ==================================================== */}
                    {/* 🎙️ DEDICATED PRO AUDIO ANSWER PLAYER CARD */}
                    {/* ==================================================== */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      isThisAudioPlaying 
                        ? 'bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/90 border-emerald-500/60 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30' 
                        : 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600'
                    }`}>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        
                        {/* Audio Waveform & Status Title */}
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-blue-600/30 text-blue-300 border border-blue-500/30">
                            <Headphones className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                              ऑडियो में उत्तर व्याख्या (Audio Answer Tutor)
                              {isThisAudioPlaying && (
                                <div className="flex items-end gap-0.5 h-3 ml-1">
                                  <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.1s] h-2.5" />
                                  <span className="w-0.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s] h-3.5" />
                                  <span className="w-0.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s] h-2" />
                                  <span className="w-0.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s] h-3" />
                                </div>
                              )}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {isThisAudioPlaying 
                                ? `Playing in ${audioLang === 'hi' ? 'हिन्दी (Hindi)' : 'English'} at ${audioSpeed}x`
                                : 'Click play to listen to formulas, steps & shortcuts out loud'}
                            </span>
                          </div>
                        </div>

                        {/* Language Selector: Hindi vs English */}
                        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                          <button
                            onClick={() => {
                              setAudioLang('hi');
                              handlePlayAudioAnswer(msg.text, msg.id, 'hi', audioSpeed);
                            }}
                            className={`px-2 py-0.5 rounded font-bold transition-all ${
                              audioLang === 'hi'
                                ? 'bg-amber-500 text-slate-950'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            🇮🇳 हिन्दी
                          </button>
                          <button
                            onClick={() => {
                              setAudioLang('en');
                              handlePlayAudioAnswer(msg.text, msg.id, 'en', audioSpeed);
                            }}
                            className={`px-2 py-0.5 rounded font-bold transition-all ${
                              audioLang === 'en'
                                ? 'bg-indigo-600 text-white'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            🇬🇧 English
                          </button>
                        </div>
                      </div>

                      {/* Main Audio Player Bar with Controls */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
                        <div className="flex items-center gap-2">
                          
                          {/* Play / Pause / Loading Button */}
                          <button
                            onClick={() => handlePlayAudioAnswer(msg.text, msg.id, audioLang, audioSpeed)}
                            disabled={isThisAudioLoading}
                            className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 shadow-md ${
                              isThisAudioPlaying
                                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white'
                            }`}
                          >
                            {isThisAudioLoading ? (
                              <>
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                <span>तैयार हो रहा है...</span>
                              </>
                            ) : isThisAudioPlaying ? (
                              <>
                                <Pause className="h-3.5 w-3.5 fill-current" />
                                <span>रोकें (Pause)</span>
                              </>
                            ) : (
                              <>
                                <Play className="h-3.5 w-3.5 fill-current" />
                                <span>ऑडियो उत्तर सुनें (Play Audio)</span>
                              </>
                            )}
                          </button>

                          {/* Stop Button */}
                          {activeAudioId === msg.id && (
                            <button
                              onClick={stopAnyAudio}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 font-bold text-xs transition flex items-center gap-1"
                              title="Stop Audio"
                            >
                              <VolumeX className="h-3.5 w-3.5" />
                              <span className="hidden sm:inline">Stop</span>
                            </button>
                          )}
                        </div>

                        {/* Speed Controls: 0.8x, 1.0x, 1.2x, 1.5x */}
                        <div className="flex items-center gap-1 text-[10px]">
                          <span className="text-slate-400 mr-1 hidden sm:inline">Speed:</span>
                          {[0.8, 1.0, 1.25, 1.5].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => {
                                setAudioSpeed(speed);
                                if (activeAudioId === msg.id && isPlayingAudio) {
                                  if (currentAudioRef.current) {
                                    currentAudioRef.current.playbackRate = speed;
                                  } else {
                                    handlePlayAudioAnswer(msg.text, msg.id, audioLang, speed);
                                  }
                                }
                              }}
                              className={`px-1.5 py-0.5 rounded font-mono font-bold transition-all ${
                                audioSpeed === speed 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Progress Bar when playing */}
                      {activeAudioId === msg.id && (
                        <div className="mt-2.5 pt-1">
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 via-cyan-400 to-amber-400 h-full transition-all duration-300"
                              style={{ width: `${audioProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* Image Thumbnail if user attached image */}
                {msg.image && (
                  <div className="mb-3 rounded-xl overflow-hidden border border-white/20 max-w-sm">
                    <img src={msg.image} alt="User Question attachment" className="w-full max-h-56 object-contain bg-black/50" />
                  </div>
                )}

                {/* Text content with clean markdown handling */}
                <div className="whitespace-pre-line text-sm sm:text-base font-normal space-y-2 select-text font-sans">
                  {msg.text}
                </div>

                {/* Bottom Quick Tools on AI responses */}
                {msg.sender === 'ai' && msg.id !== 'welcome-1' && (
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-1.5"
                        title="Copy Solution"
                      >
                        {copiedId === msg.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedId === msg.id ? 'Copied!' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => handleDownloadSolution(msg.text)}
                        className="px-2.5 py-1 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-200 transition-all flex items-center gap-1.5"
                        title="Download Solution as TXT"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download TXT</span>
                      </button>

                      <button
                        onClick={() => {
                          setInputQuery(`Could you explain another shortcut or alternative method for: "${msg.text.slice(0, 80)}..."`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-900/40 hover:bg-indigo-900/70 text-indigo-300 border border-indigo-700/40 transition-all flex items-center gap-1.5"
                        title="Ask a follow-up doubt or another shortcut"
                      >
                        <Lightbulb className="h-3.5 w-3.5 text-amber-300" />
                        <span>Another Shortcut</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      ✓ 100% Pro Formula & Audio Verified
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Spinner Indicator */}
        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none p-4 sm:p-5 border border-slate-700 flex items-center gap-3 shadow-xl max-w-md">
              <RefreshCw className="h-6 w-6 text-amber-400 animate-spin shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  Solving Pro Doubt with Step-by-Step Rigor...
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Applying OCR, Algebraic/Geometric theorems, syllogism logic, and preparing Audio Answer.
                </p>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Pro Doubts Strip */}
      {messages.length <= 4 && (
        <div className="bg-slate-950/90 p-3 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5 text-amber-400" /> 
              Instant Pro Doubts ({categoryChips.find(c => c.id === selectedCategory)?.label || 'Selected Subject'}):
            </p>
            <span className="text-[10px] text-slate-400">Click any card to solve and listen in audio</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {currentQuickDoubts.map((qd, idx) => (
              <button
                key={idx}
                onClick={() => handleSolveSubmit(qd.label)}
                className="text-xs bg-slate-900/90 hover:bg-blue-900/40 hover:border-blue-500/80 border border-slate-800 text-slate-200 p-2.5 rounded-xl transition-all text-left flex flex-col justify-between group shadow-sm"
              >
                <span className="line-clamp-2 font-medium group-hover:text-blue-200 transition-colors">
                  {qd.label}
                </span>
                <span className="text-[10px] text-amber-400/80 font-mono mt-1 flex items-center justify-between">
                  <span>#{qd.tag}</span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Volume2 className="h-3 w-3" /> Audio
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                  </span>
                </span>
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
            <span className="text-xs text-emerald-400 font-medium">📸 Notebook / Question photo attached ready for OCR solving</span>
          </div>
          <button 
            onClick={() => setSelectedImage(null)}
            className="text-xs text-rose-400 hover:text-rose-300 font-bold px-2 py-1 rounded bg-rose-950/40 border border-rose-800/40"
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
            className={`p-3 rounded-xl transition-all shadow-sm ${
              selectedImage ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Upload or Snap Notebook / Book Photo (OCR Engine)"
          >
            <Camera className="h-5 w-5" />
          </button>

          {/* Voice Mic Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-3 rounded-xl transition-all shadow-sm ${
              isListening ? 'bg-rose-600 text-white animate-bounce' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
            title="Speak your question in Hindi or English (बोलकर पूछें)"
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          {/* Question Text Input */}
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={
              isListening 
                ? "Listening... Speak your pro doubt now..." 
                : selectedCategory === 'AdvanceMath'
                  ? "Ask Advance Math: Trigonometry, Algebra, Geometry, Remainder theorem..."
                  : selectedCategory === 'AdvanceReasoning'
                    ? "Ask Advance Reasoning: Only a few syllogism, Puzzles, Machine I/O..."
                    : selectedCategory === 'AdvanceEnglish'
                      ? "Ask Advance English: Inversion, Subjunctive, Dangling participle, Subject-Verb..."
                      : "Ask any competitive exam question or formula doubt..."
            }
            className="flex-1 bg-slate-950 text-white placeholder-slate-400 text-sm rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-blue-500 transition-all font-sans"
          />

          {/* Submit Send Button */}
          <button
            type="submit"
            disabled={isLoading || (!inputQuery.trim() && !selectedImage)}
            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50 text-white font-black p-3 sm:px-5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 shrink-0"
          >
            <Send className="h-5 w-5" />
            <span className="hidden sm:inline">Solve Pro</span>
          </button>
        </form>
        
        <div className="flex flex-wrap items-center justify-between gap-2 mt-2.5 text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <strong className="text-slate-300">Audio Answer Engine:</strong> Auto-voice playback active with bilingual pronunciation & waveform player.
          </span>
          <button 
            type="button"
            onClick={() => setShowFormulaVault(true)}
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 flex items-center gap-1"
          >
            <span>📖 View Golden Formula & Rules Cheat Sheet</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 📖 PRO FORMULA & GOLDEN RULES VAULT MODAL (चीटशीट) */}
      {/* ======================================================== */}
      {showFormulaVault && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
          <div className="bg-slate-900 border border-blue-800 text-white w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Vault Header */}
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 rounded-xl">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <span>Pro Formulas & Golden Rules Vault</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      Exam Cheat Sheet
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">High-yield revision notes for SSC CGL Tier-2, Bank PO, Railways & CDS</p>
                </div>
              </div>
              <button 
                onClick={() => setShowFormulaVault(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Vault Tabs */}
            <div className="flex items-center bg-slate-950 px-4 pt-2 border-b border-slate-800 gap-2">
              <button
                onClick={() => setActiveVaultTab('math')}
                className={`px-4 py-2.5 font-bold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
                  activeVaultTab === 'math'
                    ? 'border-cyan-400 text-cyan-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Calculator className="h-4 w-4" /> 🚀 Advance Math Formulas
              </button>
              <button
                onClick={() => setActiveVaultTab('reasoning')}
                className={`px-4 py-2.5 font-bold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
                  activeVaultTab === 'reasoning'
                    ? 'border-purple-400 text-purple-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Brain className="h-4 w-4" /> 🧠 Advance Reasoning Tricks
              </button>
              <button
                onClick={() => setActiveVaultTab('english')}
                className={`px-4 py-2.5 font-bold text-xs sm:text-sm rounded-t-xl transition-all border-b-2 flex items-center gap-2 ${
                  activeVaultTab === 'english'
                    ? 'border-emerald-400 text-emerald-300 bg-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="h-4 w-4" /> 📚 Advance English Golden Rules
              </button>
            </div>

            {/* Vault Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-950/60">
              
              {/* TAB 1: ADVANCE MATH */}
              {activeVaultTab === 'math' && (
                <div className="space-y-4">
                  {/* Algebra Card */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-cyan-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <Calculator className="h-4 w-4" /> 1. Algebra Master Identities & Reciprocal Powers
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                        <p className="text-amber-300 font-bold">Standard x + 1/x = k Rules:</p>
                        <p>• x² + 1/x² = k² - 2</p>
                        <p>• x³ + 1/x³ = k³ - 3k = k(k² - 3)</p>
                        <p>• x⁴ + 1/x⁴ = (k² - 2)² - 2</p>
                        <p>• x⁵ + 1/x⁵ = (x² + 1/x²)(x³ + 1/x³) - (x + 1/x)</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 font-mono">
                        <p className="text-amber-300 font-bold">Cubic 3-Variable Formula:</p>
                        <p>• a³ + b³ + c³ - 3abc = (a+b+c)(a²+b²+c² - ab - bc - ca)</p>
                        <p>• = ½(a+b+c)[(a-b)² + (b-c)² + (c-a)²]</p>
                        <p className="text-emerald-400">⚡ If a + b + c = 0 ➔ a³ + b³ + c³ = 3abc</p>
                      </div>
                    </div>
                  </div>

                  {/* Trigonometry Maxima & Minima */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-cyan-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4" /> 2. Trigonometry Max/Min & Value Putting
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold font-mono">f(θ) = a sin θ + b cos θ + c</p>
                        <p>• Maximum Value = c + √(a² + b²)</p>
                        <p>• Minimum Value = c - √(a² + b²)</p>
                        <p className="text-slate-400">Example: 7 sin θ + 24 cos θ + 5 ➔ Max = 5 + 25 = 30, Min = 5 - 25 = -20</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold font-mono">Reciprocal Minimum Values (AM ≥ GM):</p>
                        <p>• a sin²θ + b csc²θ ➔ Min = 2√(ab)</p>
                        <p>• a tan²θ + b cot²θ ➔ Min = 2√(ab)</p>
                        <p className="text-rose-400 font-bold">⚠️ Trap: a sec²θ + b csc²θ ➔ Min = (√a + √b)²</p>
                      </div>
                    </div>
                  </div>

                  {/* Geometry Circles & Angle Bisector */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-cyan-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <Compass className="h-4 w-4" /> 3. Geometry Circles, Tangents & Triangle Centers
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-amber-300 font-bold">Tangent-Secant Theorem:</p>
                        <p className="font-mono">PT² = PA • PB</p>
                        <p className="text-slate-400">Where PT is tangent and PAB is secant from external point P.</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-amber-300 font-bold">Angle Bisector Theorem:</p>
                        <p className="font-mono">AB/AC = BD/DC</p>
                        <p className="font-mono">AD² = AB•AC - BD•DC</p>
                        <p className="text-slate-400">AD bisects ∠A meeting BC at D.</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-amber-300 font-bold">Triangle Centers Angles:</p>
                        <p>• Incentre: ∠BIC = 90° + ∠A/2</p>
                        <p>• Circumcentre: ∠BOC = 2∠A</p>
                        <p>• Orthocentre: ∠BHC = 180° - ∠A</p>
                      </div>
                    </div>
                  </div>

                  {/* Number System & Remainder Theorems */}
                  <div className="bg-slate-900/90 border border-blue-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-cyan-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4" /> 4. Number System: Euler, Fermat & Wilson's Theorems
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-amber-300 font-bold">Fermat's Little Theorem:</p>
                        <p className="font-mono">a^(p-1) ≡ 1 (mod p)</p>
                        <p className="text-slate-400">When p is prime and gcd(a, p) = 1.</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-amber-300 font-bold">Euler's Totient Theorem:</p>
                        <p className="font-mono">a^φ(n) ≡ 1 (mod n)</p>
                        <p className="text-slate-400">φ(n) = n(1 - 1/p₁)(1 - 1/p₂)...</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-amber-300 font-bold">Wilson's Theorem:</p>
                        <p className="font-mono">(p - 1)! ≡ -1 ≡ (p - 1) (mod p)</p>
                        <p className="text-slate-400">Example: 28! ÷ 29 leaves remainder 28.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ADVANCE REASONING */}
              {activeVaultTab === 'reasoning' && (
                <div className="space-y-4">
                  {/* Only a Few Syllogism */}
                  <div className="bg-slate-900/90 border border-purple-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-purple-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4" /> 1. 'Only A Few' Syllogism Truth Table
                    </h4>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                      <p className="text-amber-300 font-bold">Statement: "Only a few A are B"</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                          <p className="text-emerald-400 font-bold mb-1">✓ DEFINITELY TRUE DEDUCTIONS:</p>
                          <p>1. Some A are B (100% True)</p>
                          <p>2. Some A are NOT B (100% True)</p>
                          <p>3. All A can never be B (100% True)</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                          <p className="text-blue-400 font-bold mb-1">⚡ POSSIBILITY CASES:</p>
                          <p>1. "All A being B is a possibility" ➔ ❌ FALSE (Never)</p>
                          <p>2. "All B being A is a possibility" ➔ ✅ TRUE (Allowed unless blocked)</p>
                          <p>3. "Some B are not A" ➔ ? Undetermined (Can be true or false)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Clock & Calendar Formulas */}
                  <div className="bg-slate-900/90 border border-purple-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-purple-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4" /> 2. Clock Angle & Calendar Odd Days Formulae
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 font-mono">
                        <p className="text-amber-300 font-bold">Clock Hands Angle (θ):</p>
                        <p>θ = |30H - (11/2)M|</p>
                        <p className="text-emerald-400">Overlap (θ = 0°): M = (60/11) × H</p>
                        <p className="text-cyan-400">Right Angle (θ = 90°): M = 2/11 × (30H ± 90)</p>
                        <p className="text-slate-400">Hands in Straight line (180°): M = 2/11 × (30H ± 180)</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold font-mono">Calendar Odd Days Reference:</p>
                        <p>• 1 Ordinary Year = 1 Odd Day (52 weeks + 1 day)</p>
                        <p>• 1 Leap Year = 2 Odd Days</p>
                        <p>• 100 Years = 5 Odd Days</p>
                        <p>• 200 Years = 3 Odd Days | 300 Years = 1 Odd Day</p>
                        <p className="text-emerald-400 font-bold">⚡ 400 Years / Century Leap = 0 Odd Days</p>
                      </div>
                    </div>
                  </div>

                  {/* Machine Input Output & Coded Inequality */}
                  <div className="bg-slate-900/90 border border-purple-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-purple-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <Layers className="h-4 w-4" /> 3. Machine Input-Output Tracing & Magic Box
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold">Machine Input Dual-Shift:</p>
                        <p>• Left end arranges Words alphabetically (or length-wise).</p>
                        <p>• Right end arranges Numbers descending (or digit-sum).</p>
                        <p className="text-cyan-300">Shortcut: Never write full words. Write only 1st letters (e.g. \`a 48 z 19\`) and count auto-shifts!</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold">Coded Inequality Priority Rule:</p>
                        <p>• Priority 1: &gt; or &lt; (Strict inequality)</p>
                        <p>• Priority 2: ≥ or ≤</p>
                        <p>• Priority 3: = (Equality)</p>
                        <p className="text-rose-400">If opposite signs appear (e.g. A &gt; B &lt; C) ➔ Relation is FALSE.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ADVANCE ENGLISH GRAMMAR */}
              {activeVaultTab === 'english' && (
                <div className="space-y-4">
                  {/* Partial Inversion */}
                  <div className="bg-slate-900/90 border border-emerald-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-emerald-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <BookOpen className="h-4 w-4" /> 1. Rule of Partial Inversion (Auxiliary + Subject + Verb)
                    </h4>
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                      <p className="text-amber-300 font-bold">When sentence begins with negative/restrictive adverbs:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 font-mono">
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                          <p className="text-cyan-300 font-bold">Hardly / Scarcely Formula:</p>
                          <p>Hardly + <strong>had</strong> + Sub + V₃ ... <strong>WHEN</strong> + Clause</p>
                          <p className="text-rose-400">❌ Error Trap: Using THEN or THAN with Hardly</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                          <p className="text-cyan-300 font-bold">No Sooner Formula:</p>
                          <p>No sooner + <strong>did/had</strong> + Sub + V ... <strong>THAN</strong> + Clause</p>
                          <p className="text-rose-400">❌ Error Trap: Using WHEN or THEN with No sooner</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subjunctive & High Time */}
                  <div className="bg-slate-900/90 border border-emerald-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-emerald-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4" /> 2. Subjunctive Mood & 'It is high time' (Unreal Past)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold">It is high time / It is time:</p>
                        <p>• If followed by Subject ➔ Takes <strong>V₂ (Past Subjunctive)</strong></p>
                        <p className="text-emerald-400 font-mono">✅ It is high time we <strong>started</strong> studying.</p>
                        <p className="text-rose-400 font-mono">❌ It is high time we start studying.</p>
                        <p>• If NO subject ➔ Takes <strong>to + V₁ (Infinitive)</strong></p>
                        <p className="text-emerald-400 font-mono">✅ It is time <strong>to study</strong>.</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold">Dangling Participle Law:</p>
                        <p>Participle clause must have its own logical subject.</p>
                        <p className="text-rose-400 font-mono">❌ Being a rainy day, he stayed home.</p>
                        <p className="text-emerald-400 font-mono">✅ <strong>It being</strong> a rainy day, he stayed home.</p>
                        <p className="text-rose-400 font-mono">❌ Walking in the garden, a dog bit him.</p>
                        <p className="text-emerald-400 font-mono">✅ While he was walking in garden, a dog bit him.</p>
                      </div>
                    </div>
                  </div>

                  {/* Subject-Verb Concord & Fixed Prepositions */}
                  <div className="bg-slate-900/90 border border-emerald-900/60 rounded-2xl p-4 sm:p-5">
                    <h4 className="font-black text-emerald-300 text-sm sm:text-base flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4" /> 3. Subject-Verb Concord & 'To + V-ing' Idioms
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold">Subject-Verb Agreement Laws:</p>
                        <p>• <strong>Along with / Together with / As well as:</strong> Verb agrees with <strong>1st Subject</strong>.</p>
                        <p className="text-emerald-400">The King along with his soldiers <strong>was</strong> killed.</p>
                        <p>• <strong>Either...or / Neither...nor:</strong> Verb agrees with <strong>nearest subject</strong>.</p>
                        <p className="text-emerald-400">Neither the teacher nor students <strong>were</strong> present.</p>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                        <p className="text-amber-300 font-bold">Fixed 'To + V-ing' Exceptions:</p>
                        <p>These phrases take <strong>Gerund (V-ing)</strong> instead of bare V₁:</p>
                        <p>• Look forward to + V-ing</p>
                        <p>• Accustomed to / Habitual to + V-ing</p>
                        <p>• With a view to + V-ing</p>
                        <p>• Prone to / Addicted to + V-ing</p>
                        <p className="text-emerald-400 font-mono">✅ Looking forward to <strong>meeting</strong> you.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Vault Footer */}
            <div className="bg-slate-950 p-3.5 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">💡 Tap any formula to copy or ask our AI to derive it</span>
              <button
                onClick={() => setShowFormulaVault(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-md"
              >
                Close & Return to Solver
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
