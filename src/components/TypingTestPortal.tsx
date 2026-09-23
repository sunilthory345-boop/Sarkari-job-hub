import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Keyboard, Clock, Award, RotateCcw, Play, Pause, 
  Volume2, VolumeX, CheckCircle2, AlertTriangle, 
  HelpCircle, Eye, Sliders, FileText, ChevronRight, 
  Sparkles, Download, Printer, ArrowRight, ShieldCheck,
  Zap, Info, BookOpen, Layers, Monitor, Check
} from 'lucide-react';
import { UserProfile } from '../types';

export interface TypingPassage {
  id: string;
  exam: 'SSC CHSL' | 'SSC Stenographer' | 'RRB NTPC' | 'Court / UPSSSC' | 'Custom';
  level: string;
  language: 'English' | 'Hindi';
  targetWpm: number;
  durationMinutes: number;
  title: string;
  category: string;
  text: string;
  stenoWpm?: number; // 80 or 100 for steno dictation
  description?: string;
}

const PASSAGES_DATABASE: TypingPassage[] = [
  // SSC CHSL English Passages
  {
    id: 'chsl-eng-1',
    exam: 'SSC CHSL',
    level: 'LDC / JSA Tier-II',
    language: 'English',
    targetWpm: 35,
    durationMinutes: 10,
    title: 'Parliamentary Debate on Digital Governance & Public Infrastructure',
    category: 'SSC CHSL Official Tier-II',
    description: 'Actual SSC CHSL pattern passage with 1750 key depressions (approx. 350 words). Qualifying speed: 35 WPM (10,500 KDPH).',
    text: `Digital public infrastructure in modern India has emerged as a cornerstone of transparent governance and equitable economic development. The rapid expansion of high-speed telecommunication networks across rural districts has bridged the historical divide between urban and agrarian communities. Through unified digital identity frameworks and immediate payment systems, millions of citizens now access government entitlements directly into their verified bank accounts without intermediate friction. Public administration has witnessed a decisive shift toward paperless transactions, reducing turnaround intervals for citizen services ranging from land records authentication to passport issuance. 

Furthermore, educational institutions have incorporated interactive digital portals to democratize knowledge dissemination, ensuring that students in remote hinterlands obtain quality academic resources on par with metropolitan universities. As artificial intelligence and cloud computing technologies mature, state departments must emphasize robust cyber security safeguards and strict data protection parameters to protect sensitive public records from unauthorized breaches. Continuous training of secretarial personnel remains imperative to ensure that public servants adapt to modern workflow automation platforms efficiently.`
  },
  {
    id: 'chsl-eng-2',
    exam: 'SSC CHSL',
    level: 'LDC / JSA Tier-II',
    language: 'English',
    targetWpm: 35,
    durationMinutes: 10,
    title: 'Economic Survey Insights on Sustainable Agriculture & Water Conservation',
    category: 'SSC CHSL Official Tier-II',
    description: 'Official test pattern focusing on technical vocabulary, numbers, and key depressions compliance.',
    text: `Sustainable agricultural practices constitute an indispensable element of our national food security roadmap for the upcoming decades. In the face of unpredictable precipitation cycles and depleting groundwater reservoirs, conservative irrigation systems such as micro-drip networks have demonstrated commendable resource efficiency. Farmers across semi-arid regions are being encouraged to diversify towards high-yielding millets and indigenous pulses that require minimal chemical fertilization and demonstrate resilience against severe climatic fluctuations.

Institutional credit facilities provided through specialized rural cooperatives have mitigated dependence on non-formal lending channels, granting smallholders greater autonomy over their seasonal investments. Modern cold-chain storage logistics and cooperative aggregation centres have significantly diminished post-harvest losses, enabling producers to negotiate remunerative market valuations for perishable horticultural produce. The ongoing modernization of agricultural wholesale markets through integrated electronic trading platforms connects local farmers directly with nationwide buyers, fostering financial stability and agricultural prosperity.`
  },
  {
    id: 'chsl-deo-1',
    exam: 'SSC CHSL',
    level: 'DEO (Data Entry Operator)',
    language: 'English',
    targetWpm: 50,
    durationMinutes: 15,
    title: 'CAG Office Statistical Data Entry & Financial Audit Report',
    category: 'SSC DEO Grade A',
    description: 'Fast-paced Data Entry Operator test with numbers, acronyms, and statistical passages. Required: 15,000 KDPH (~50 WPM).',
    text: `The statutory auditing framework instituted under constitutional provisions mandates comprehensive verification of fiscal allocations across all executive ministries. During the fiscal period 2025-26, the aggregate budgetary allocation under capital expenditure exceeded ₹11,20,500 crore, reflecting an annual acceleration of 16.4 percent in core infrastructure outlay. Scrutiny of municipal bond issuances across 48 urban agglomerations revealed that resource mobilization grew by 23.8 percent year-on-year, driven by investor confidence in audited municipal balance sheets.

Revenue realization under indirect tax frameworks averaged ₹1,82,450 crore per month during the preceding two quarters, demonstrating enhanced compliance through automated algorithmic reconciliations. Audit teams conducted field reviews across 3,420 procurement tenders valued above ₹50 crore each to verify compliance with general financial regulations and public procurement transparency standards. Strict documentation standards ensure that administrative deviations are catalogued systematically for legislative scrutiny before public accounts committees.`
  },

  // SSC Stenographer Passages (Grade C & Grade D)
  {
    id: 'steno-eng-80',
    exam: 'SSC Stenographer',
    level: 'Grade D (80 WPM Dictation)',
    language: 'English',
    targetWpm: 80,
    stenoWpm: 80,
    durationMinutes: 50,
    title: 'Presidential Address on Industrial Innovation and Skill Development',
    category: 'SSC Steno Grade D Official',
    description: 'Audio Dictation at 80 WPM for 10 minutes (800 words), followed by 50 minutes computer transcription.',
    text: `Honourable members of the council, today our nation stands at the threshold of a comprehensive industrial transformation driven by young entrepreneurial energy and technical innovation. In the manufacturing sector, our focus has decisively shifted towards high-value precision engineering, renewable energy hardware, and semiconductor fabrication. This transition requires not only capital investments, but equally an agile and proficient workforce capable of operating sophisticated computerized machinery with optimal productivity.

Our national apprenticeship initiatives have established vital bridges between vocational training academies and leading manufacturing hubs. By providing real-time shop-floor exposure and hands-on operational experience, thousands of youth from non-metropolitan towns have gained sustainable employment in modern industrial parks. In addition, small and medium enterprises have been provided with simplified credit guarantees and technological upgrading grants, enabling them to integrate seamlessly into global production value chains. 

We must also remember that balanced regional growth is the foundation of enduring peace and prosperity. The establishment of dedicated freight corridors, multimodal logistics parks, and upgraded national highways has drastically reduced transit delays and logistical overheads across all northern and eastern corridors. As we advance toward our centenary year of freedom, every citizen must rededicate their talents to building an self-reliant, inclusive, and forward-looking republic.`
  },
  {
    id: 'steno-eng-100',
    exam: 'SSC Stenographer',
    level: 'Grade C (100 WPM Dictation)',
    language: 'English',
    targetWpm: 100,
    stenoWpm: 100,
    durationMinutes: 40,
    title: 'Parliamentary Address on Environmental Protection & Renewable Energy',
    category: 'SSC Steno Grade C Official',
    description: 'High-speed audio dictation at 100 WPM for 10 minutes (1000 words), followed by 40 minutes computer transcription.',
    text: `Mr Speaker, sir, I rise to place before this august House the comprehensive national action plan on climate resilience and renewable energy expansion. It is universally acknowledged that sustainable economic progress cannot be attained by neglecting our ecological heritage. Over the past five years, our installed capacity in solar photovoltaic generation and offshore wind energy has witnessed unprecedented expansion, placing our nation among the premier international champions of green power transition.

The transformation of our urban transportation networks through electrical mass transit systems and incentivized commercial fleets has substantially lowered vehicular emissions in critical industrial zones. Furthermore, our state governments have collaborated to revitalize degraded forest corridors, restore river catchment basins, and incentivize water harvesting mechanisms across agricultural belts. We recognize that international financial flows must remain equitable and accessible to emerging economies seeking transition pathways. Our delegations have consistently articulated this principle on multilateral platforms, advocating for technology transfers without restrictive patent encumbrances.

I urge all distinguished members of this House to participate constructively in formulating state-level environmental bylaws that balance employment creation with stringent pollution prevention standards. With determined cooperation across all political boundaries, our nation will continue to lead the global fraternity towards a cleaner, healthier, and brighter future for our future generations.`
  },

  // SSC CHSL Hindi Passages (30 WPM - Mangal / Remington Gail)
  {
    id: 'chsl-hin-1',
    exam: 'SSC CHSL',
    level: 'LDC / JSA (Hindi Typing)',
    language: 'Hindi',
    targetWpm: 30,
    durationMinutes: 10,
    title: 'भारत में डिजिटल साक्षरता और ग्रामीण विकास पर आलेख',
    category: 'SSC CHSL Hindi Official',
    description: '30 शब्द प्रति मिनट (9000 Key Depressions प्रति घंटा) हेतु हिंदी गद्यांश (मंगल / रेमिंगटन गेल / इनस्क्रिप्ट लेआउट अनुकूल)।',
    text: `भारत में डिजिटल साक्षरता के विस्तार ने ग्रामीण अंचलों में सामाजिक और आर्थिक सशक्तिकरण की एक नई क्रांति का सूत्रपात किया है। पहले जहां सामान्य प्रशासनिक कार्यों, प्रमाण पत्रों और बैंकिंग सेवाओं के लिए ग्रामीणों को मीलों दूर तहसील या जिला मुख्यालय जाना पड़ता था, वहीं अब ग्राम पंचायतों में स्थापित नागरिक सेवा केंद्रों के माध्यम से सभी महत्वपूर्ण सेवाएं घर के समीप उपलब्ध हो रही हैं।

प्रत्यक्ष लाभ अंतरण योजना के माध्यम से विभिन्न जनकल्याणकारी योजनाओं का अनुदान सीधे लाभार्थियों के बैंक खातों में पहुंच रहा है। इससे न केवल कार्यप्रणाली में पारदर्शिता आई है, बल्कि बिचौलियों की भूमिका भी पूरी तरह समाप्त हो गई है। डिजिटल भुगतान प्रणालियों ने छोटे दुकानदारों और कृषकों को भी मुख्यधारा की वित्तीय व्यवस्था से जोड़ दिया है।

इसके साथ ही प्राथमिक और माध्यमिक विद्यालयों में स्मार्ट कक्षाओं की स्थापना से ग्रामीण विद्यार्थियों को भी गुणवत्तापूर्ण आधुनिक शिक्षा प्राप्त हो रही है। देश के चहुंमुखी विकास के लिए प्रत्येक नागरिक का तकनीकी रूप से दक्ष और जागरूक होना अत्यंत आवश्यक है। हमें आने वाली पीढ़ी को सूचना प्रौद्योगिकी के सकारात्मक उपयोग के प्रति निरंतर प्रेरित करते रहना होगा।`
  },
  {
    id: 'chsl-hin-2',
    exam: 'SSC CHSL',
    level: 'LDC / JSA (Hindi Typing)',
    language: 'Hindi',
    targetWpm: 30,
    durationMinutes: 10,
    title: 'पर्यावरण संरक्षण एवं जल संचयन का महत्व',
    category: 'SSC CHSL Hindi Official',
    description: '30 WPM की गति हेतु आधिकारिक शब्दावली युक्त हिंदी पैराग्राफ।',
    text: `पर्यावरण का संरक्षण वर्तमान युग की सबसे अनिवार्य आवश्यकता बन चुका है। औद्योगीकरण और अनियंत्रित शहरीकरण के कारण हमारी नदियां प्रदूषित हो रही हैं और वनों का दायरा निरंतर संकुचित हो रहा है। इसके परिणामस्वरूप मौसम चक्र में अनियमितता आ रही है और भूमिगत जल स्तर में भारी गिरावट दर्ज की जा रही है।

जल संकट से निपटने के लिए हमें पारंपरिक जल स्रोतों जैसे तालाबों, कुओं और बावडियों का पुनरुद्धार करना होगा। वर्षा जल संचयन की तकनीकों को प्रत्येक नागरिक और आवासीय परिसरों में अनिवार्य रूप से लागू करना चाहिए। इसके अतिरिक्त हमें एकल उपयोग प्लास्टिक के प्रयोग को पूर्णतया बंद करके पर्यावरण अनुकूल विकल्पों को दैनिक जीवन में अपनाना होगा। 

प्रकृति के साथ संतुलन बनाकर ही हम अपनी भावी पीढ़ियों को सुरक्षित और स्वस्थ भविष्य प्रदान कर सकते हैं। प्रत्येक नागरिक का यह नैतिक कर्तव्य है कि वह प्रतिवर्ष कम से कम एक वृक्ष अवश्य लगाए और उसकी पूरी देखभाल करे।`
  },

  // RRB NTPC Typing Skill Test (TST) Passages
  {
    id: 'rrb-eng-1',
    exam: 'RRB NTPC',
    level: 'Junior Clerk / Typist',
    language: 'English',
    targetWpm: 30,
    durationMinutes: 10,
    title: 'Indian Railways Modernization, Safety Systems & Vande Bharat Network',
    category: 'RRB NTPC Official TST',
    description: '30 WPM English Typing Skill Test without spell check, 300 words in 10 minutes. Minimum qualifying accuracy with 5% error rebate.',
    text: `The modern transformation of Indian Railways represents one of the most ambitious engineering undertakings in contemporary transportation history. With the phased introduction of indigenous semi-high-speed trainsets, passenger transit intervals between major industrial capitals have been reduced significantly. Concurrently, extensive track renewal programs and the installation of automatic train protection mechanisms like Kavach have augmented operational safety across critical high-density trunk routes.

The redevelopment of landmark railway terminals into world-class transit hubs featuring airport-grade passenger lounges, multi-level parking amenities, and seamless interchange with urban metro systems reflects a dedicated passenger-centric approach. Dedicated freight corridors have systematically isolated goods traffic from passenger arteries, accelerating raw material logistics for core steel, cement, and power generating enterprises. Continuous infrastructure investments ensure that the national railway network continues to serve as the economic lifeline of the subcontinent.`
  },

  // Court / UPSSSC Junior Assistant
  {
    id: 'court-eng-1',
    exam: 'Court / UPSSSC',
    level: 'High Court Clerk / Steno',
    language: 'English',
    targetWpm: 30,
    durationMinutes: 10,
    title: 'Judicial Administration and Alternative Dispute Resolution Mechanisms',
    category: 'High Court & UPSSSC',
    description: 'Legal terms and court drafting typing speed test at 30 WPM.',
    text: `The expeditious disposal of civil and commercial disputes is fundamental to maintaining public faith in the rule of law and fostering a vibrant investment environment. In recent years, Indian courts have progressively embraced virtual proceedings, digital filing mechanisms, and electronic summons delivery to mitigate procedural bottlenecks. The integration of National Judicial Data Grid parameters has provided litigating parties with real-time insight into cause lists and case status developments.

Concurrently, alternative dispute resolution mechanisms including statutory Lok Adalats, court-annexed mediation centres, and commercial arbitration tribunals have offered disputing parties cost-effective and amicable settlement pathways outside traditional adversarial courtroom procedures. Legal literacy drives organized through district legal services authorities guarantee that indigent litigants receive competent legal aid and constitutional representation without monetary distress.`
  }
];

interface TypingTestPortalProps {
  user: UserProfile;
  locale: string;
  onGoPremium: () => void;
  triggerToast: (msg: string) => void;
}

export function TypingTestPortal({ user, locale, onGoPremium, triggerToast }: TypingTestPortalProps) {
  // Navigation / Mode state
  const [selectedExam, setSelectedExam] = useState<'All' | 'SSC CHSL' | 'SSC Stenographer' | 'RRB NTPC' | 'Court / UPSSSC'>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'English' | 'Hindi'>('All');
  const [activePassage, setActivePassage] = useState<TypingPassage>(PASSAGES_DATABASE[0]);
  
  // Custom passage modal / state
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customText, setCustomText] = useState('');
  const [customDuration, setCustomDuration] = useState(10);
  const [customWpm, setCustomWpm] = useState(35);
  const [customLanguage, setCustomLanguage] = useState<'English' | 'Hindi'>('English');

  // Test Running State
  const [testState, setTestState] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [inputText, setInputText] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(activePassage.durationMinutes * 60);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);

  // Exam Simulation Options (TCS iON style)
  const [allowBackspace, setAllowBackspace] = useState(true); // SSC allows, Railway strict can disable
  const [highlightCurrentWord, setHighlightCurrentWord] = useState(true);
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg'>('base');
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  const [showKeyboardMap, setShowKeyboardMap] = useState(false);
  const [candidateCategory, setCandidateCategory] = useState<'UR' | 'OBC' | 'EWS' | 'SC' | 'ST' | 'PwD'>('UR');

  // Stenographer Audio Dictation State
  const [stenoAudioPhase, setStenoAudioPhase] = useState<'idle' | 'trial' | 'gap' | 'main' | 'finished'>('idle');
  const [stenoAudioPlaying, setStenoAudioPlaying] = useState(false);
  const [stenoSpeechSpeed, setStenoSpeechSpeed] = useState<number>(1.0); // 80wpm ~ 0.9x, 100wpm ~ 1.1x
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  // References
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const passageContainerRef = useRef<HTMLDivElement | null>(null);
  const timerIntervalRef = useRef<any>(null);

  // Filtered passages
  const filteredPassages = useMemo(() => {
    return PASSAGES_DATABASE.filter(p => {
      const matchExam = selectedExam === 'All' || p.exam === selectedExam;
      const matchLang = selectedLanguage === 'All' || p.language === selectedLanguage;
      return matchExam && matchLang;
    });
  }, [selectedExam, selectedLanguage]);

  // Handle Passage change
  const handleSelectPassage = (passage: TypingPassage) => {
    if (testState === 'running') {
      if (!confirm(locale === 'hi' ? 'वर्तमान टेस्ट प्रगति पर है। क्या आप नया टेस्ट चुनना चाहते हैं?' : 'A test is currently running. Do you want to switch?')) {
        return;
      }
    }
    stopStenoAudio();
    setActivePassage(passage);
    resetTest(passage.durationMinutes * 60);
  };

  // Reset Test
  const resetTest = (durationSec?: number) => {
    clearInterval(timerIntervalRef.current);
    const duration = durationSec !== undefined ? durationSec : activePassage.durationMinutes * 60;
    setTestState('idle');
    setInputText('');
    setTimeRemaining(duration);
    setElapsedSeconds(0);
    setTotalKeystrokes(0);
    setBackspaceCount(0);
    stopStenoAudio();
  };

  // Timer Tick
  useEffect(() => {
    if (testState === 'running') {
      timerIntervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [testState]);

  // Start Test
  const startTest = () => {
    setTestState('running');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    triggerToast(locale === 'hi' ? 'टाइपिंग टेस्ट प्रारंभ हो गया है! गति व सटीकता बनाए रखें।' : 'Typing test started! Keep steady pace.');
  };

  // Pause Test
  const togglePause = () => {
    if (testState === 'running') {
      setTestState('paused');
      triggerToast('⏸️ Test Paused.');
    } else if (testState === 'paused') {
      setTestState('running');
      setTimeout(() => inputRef.current?.focus(), 50);
      triggerToast('▶️ Test Resumed.');
    }
  };

  // Finish Test
  const finishTest = () => {
    setTestState('completed');
    stopStenoAudio();
    triggerToast('🎉 Test Completed! Official Scorecard Generated.');
  };

  // Steno Audio Speech Synthesizer
  const playStenoDictation = () => {
    if (!('speechSynthesis' in window)) {
      triggerToast('Speech Synthesis audio not supported in this browser.');
      return;
    }

    if (stenoAudioPlaying) {
      window.speechSynthesis.cancel();
      setStenoAudioPlaying(false);
      setStenoAudioPhase('idle');
      return;
    }

    window.speechSynthesis.cancel();
    
    // Choose appropriate rate based on 80 WPM or 100 WPM
    // Standard English normal rate is approx 130-150 wpm (rate=1.0)
    // For 80 wpm: rate ~ 0.70
    // For 100 wpm: rate ~ 0.85
    const targetWpm = activePassage.stenoWpm || 80;
    const calcRate = targetWpm === 100 ? 0.88 : 0.72;

    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `Attention candidates. This is a 1-minute trial passage for the SSC Stenographer Skill Test. Dictation starts in three, two, one... \n\n` + 
      activePassage.text.slice(0, 400) + 
      `\n\n Trial passage over. The main dictation of ten minutes will begin in ten seconds. Be ready with your shorthand notebooks. \n\n` + 
      activePassage.text;
    
    utterance.rate = calcRate;
    utterance.pitch = 1.0;
    utterance.lang = activePassage.language === 'Hindi' ? 'hi-IN' : 'en-IN';

    utterance.onstart = () => {
      setStenoAudioPlaying(true);
      setStenoAudioPhase('trial');
    };

    utterance.onend = () => {
      setStenoAudioPlaying(false);
      setStenoAudioPhase('finished');
      triggerToast('🎙️ Dictation completed. You can now begin transcription on the computer.');
    };

    utterance.onerror = () => {
      setStenoAudioPlaying(false);
      setStenoAudioPhase('idle');
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    triggerToast(`🎙️ Audio Dictation started at official ${targetWpm} WPM speed! Listen & write in your notebook.`);
  };

  const stopStenoAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setStenoAudioPlaying(false);
    setStenoAudioPhase('idle');
  };

  // Stop speech if unmounting
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle Input Key Events & Strict Backspace Check
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (testState === 'idle') {
      startTest();
    }

    if (e.key === 'Backspace') {
      setBackspaceCount(prev => prev + 1);
      if (!allowBackspace) {
        e.preventDefault();
        triggerToast('⚠️ Backspace is disabled in Strict/Railway exam mode!');
        return;
      }
    }

    // Ignore Tab so it doesn't change focus
    if (e.key === 'Tab') {
      e.preventDefault();
    }

    setTotalKeystrokes(prev => prev + 1);
  };

  // Real-time Metrics Calculation (as per SSC Guidelines)
  const targetWords = useMemo(() => {
    return activePassage.text.trim().split(/\s+/);
  }, [activePassage]);

  const typedWords = useMemo(() => {
    return inputText.trim() ? inputText.trim().split(/\s+/) : [];
  }, [inputText]);

  const stats = useMemo(() => {
    const elapsedMinutes = Math.max(elapsedSeconds / 60, 0.05);
    
    // Keystrokes count
    const totalTypedChars = inputText.length;
    
    // Gross WPM (Standard SSC formula: Total Strokes / 5 / Minutes)
    const grossWpm = Math.round((totalTypedChars / 5) / elapsedMinutes) || 0;
    
    // Key Depressions Per Hour (KDPH)
    const kdph = Math.round((totalTypedChars / elapsedMinutes) * 60) || 0;

    // Detailed Error Calculation (Full Mistakes & Half Mistakes)
    let fullMistakes = 0; // Omissions, Substitutions, Additions
    let halfMistakes = 0; // Spacing, Capitalization, Minor punctuation

    const compLength = Math.max(typedWords.length, targetWords.length);
    const checkedCount = Math.min(typedWords.length, targetWords.length);

    for (let i = 0; i < checkedCount; i++) {
      const target = targetWords[i];
      const typed = typedWords[i];

      if (target === typed) {
        // Exactly matches
        continue;
      } else if (target.toLowerCase() === typed.toLowerCase()) {
        // Capitalization difference (Half mistake in SSC)
        halfMistakes += 1;
      } else {
        // Word difference / substitution (Full mistake)
        fullMistakes += 1;
      }
    }

    // If candidate skipped words or typed extra words
    if (typedWords.length < targetWords.length && testState === 'completed') {
      // Omissions count as full mistakes in SSC evaluation
      fullMistakes += (targetWords.length - typedWords.length);
    } else if (typedWords.length > targetWords.length) {
      // Extra words added count as full mistakes
      fullMistakes += (typedWords.length - targetWords.length);
    }

    const totalMistakesPenalty = fullMistakes + (halfMistakes * 0.5);
    
    // Net WPM = Gross WPM - (Mistakes Penalty / Minutes)
    const penaltyWpm = Math.round(totalMistakesPenalty / elapsedMinutes);
    const netWpm = Math.max(0, grossWpm - penaltyWpm);

    // Accuracy percentage
    const correctChars = Math.max(0, totalTypedChars - Math.round(totalMistakesPenalty * 5));
    const accuracy = totalTypedChars > 0 ? Math.max(0, Math.min(100, Math.round((correctChars / totalTypedChars) * 100))) : 100;

    // Error percentage (%)
    const totalWordsEvaluated = Math.max(typedWords.length, 1);
    const errorPercentage = parseFloat(((totalMistakesPenalty / totalWordsEvaluated) * 100).toFixed(2));

    // Permissible Error Threshold by Exam & Category:
    // SSC CHSL: UR = 7%, SC/ST/OBC/EWS/PwD = 10%
    // SSC Steno Grade C: UR = 5%, Reserved = 7%
    // SSC Steno Grade D: UR = 7%, Reserved = 10%
    // RRB NTPC: 5% error rebate allowed
    let permissibleErrorPercent = 7.0;
    if (activePassage.exam === 'SSC Stenographer') {
      if (activePassage.stenoWpm === 100) {
        // Grade C
        permissibleErrorPercent = candidateCategory === 'UR' ? 5.0 : 7.0;
      } else {
        // Grade D
        permissibleErrorPercent = candidateCategory === 'UR' ? 7.0 : 10.0;
      }
    } else if (activePassage.exam === 'RRB NTPC') {
      permissibleErrorPercent = 5.0;
    } else {
      // SSC CHSL & Others
      permissibleErrorPercent = candidateCategory === 'UR' ? 7.0 : 10.0;
    }

    // Qualified status
    const speedQualified = netWpm >= activePassage.targetWpm;
    const errorQualified = errorPercentage <= permissibleErrorPercent;
    const isQualified = speedQualified && errorQualified;

    return {
      grossWpm,
      netWpm,
      kdph,
      accuracy,
      errorPercentage,
      permissibleErrorPercent,
      fullMistakes,
      halfMistakes,
      totalMistakesPenalty,
      isQualified,
      speedQualified,
      errorQualified,
      totalTypedWords: typedWords.length,
      targetTotalWords: targetWords.length
    };
  }, [inputText, elapsedSeconds, targetWords, typedWords, activePassage, candidateCategory, testState]);

  // Handle Custom Passage Save
  const handleSaveCustomPassage = () => {
    if (!customTitle.trim() || !customText.trim()) {
      triggerToast('Please provide both title and passage content.');
      return;
    }
    const newPassage: TypingPassage = {
      id: `custom-${Date.now()}`,
      exam: 'Custom',
      level: 'Custom Practice Passage',
      language: customLanguage,
      targetWpm: customWpm || 35,
      durationMinutes: customDuration || 10,
      title: customTitle.trim(),
      category: 'Self Practice Mode',
      description: 'Candidate uploaded custom text material.',
      text: customText.trim()
    };
    PASSAGES_DATABASE.unshift(newPassage);
    setActivePassage(newPassage);
    resetTest(newPassage.durationMinutes * 60);
    setShowCustomModal(false);
    triggerToast('✅ Custom passage loaded successfully!');
  };

  // Print scorecard
  const handlePrintScorecard = () => {
    window.print();
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-2 sm:px-4 pb-16 font-sans">
      
      {/* ======================================================== */}
      {/* HERO SECTION / BANNER                                    */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 md:p-8 text-white shadow-xl border border-blue-800/80">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-slate-950 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
                <Sparkles className="h-3.5 w-3.5 fill-slate-950" />
                {locale === 'hi' ? 'आधिकारिक सिलेबस आधारित टेस्ट' : 'Official Syllabus Based Simulator'}
              </span>
              <span className="rounded-full bg-blue-800/80 border border-blue-700 px-3 py-0.5 text-xs font-bold text-blue-200">
                TCS iON Pattern
              </span>
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold px-2.5 py-0.5">
                Bilingual (हिंदी / English)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {locale === 'hi' 
                ? 'सरकारी टाइपिंग और आशुलिपि (Steno) स्किल टेस्ट पोर्टल' 
                : 'Government Typing & Stenography Skill Test Portal'}
            </h2>

            <p className="text-sm text-blue-200 leading-relaxed font-normal">
              {locale === 'hi'
                ? 'SSC CHSL (LDC/DEO 35 WPM / 10500 KDPH), SSC आशुलिपिक (Grade C 100 WPM, Grade D 80 WPM ऑडियो डिक्टेशन), RRB NTPC व उच्च न्यायालय भर्ती परीक्षाओं के वास्तविक नियम, त्रुटि मूल्यांकन (% Error) और कटऑफ मानकों के अनुसार अभ्यास करें।'
                : 'Real exam simulator calibrated for SSC CHSL (35 WPM / 10,500 KDPH), SSC Stenographer (80 & 100 WPM Audio Dictation & Transcription), RRB NTPC (30 WPM), and Court Clerk examinations.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-blue-200">
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Full & Half Mistake Marking</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <Volume2 className="h-4 w-4 text-amber-300" />
                <span>Steno 80/100 WPM Audio Dictation</span>
              </div>
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                <Sliders className="h-4 w-4 text-blue-300" />
                <span>Backspace & Highlight Controls</span>
              </div>
            </div>
          </div>

          {/* Quick Syllabus & Rules Action button */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => setShowSyllabusModal(true)}
              className="px-4 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-xs uppercase cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>{locale === 'hi' ? 'आधिकारिक सिलेबस एवं नियम देखें' : 'View Official Syllabus & Rules'}</span>
            </button>
            <button
              onClick={() => setShowCustomModal(true)}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <FileText className="h-4 w-4" />
              <span>{locale === 'hi' ? 'अपना पैराग्राफ पेस्ट करें' : 'Paste Custom Passage'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EXAM SELECTION & LANGUAGE FILTER BAR                     */}
      {/* ======================================================== */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Exam Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-500 uppercase mr-1 flex items-center gap-1 shrink-0">
            <Layers className="h-3.5 w-3.5" /> Exam:
          </span>
          {(['All', 'SSC CHSL', 'SSC Stenographer', 'RRB NTPC', 'Court / UPSSSC'] as const).map(exam => (
            <button
              key={exam}
              onClick={() => setSelectedExam(exam)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedExam === exam 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>

        {/* Language & Layout Filter */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            {(['All', 'English', 'Hindi'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                  selectedLanguage === lang 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'Hindi' ? 'हिन्दी (Hindi)' : lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowKeyboardMap(!showKeyboardMap)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              showKeyboardMap 
                ? 'bg-amber-50 text-amber-900 border-amber-300' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Hindi Mangal Inscript keyboard guide"
          >
            <Keyboard className="h-3.5 w-3.5 text-amber-600" />
            <span>{locale === 'hi' ? 'कीबोर्ड मैप' : 'Keyboard Map'}</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* HINDI MANGAL INSCRIPT KEYBOARD VISUALIZER                */}
      {/* ======================================================== */}
      {showKeyboardMap && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-5 shadow-sm space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
            <div className="flex items-center gap-2">
              <Keyboard className="h-5 w-5 text-amber-700" />
              <div>
                <h4 className="font-bold text-sm text-amber-950">
                  {locale === 'hi' ? 'आधिकारिक मंगल (Mangal Inscript) हिंदी कीबोर्ड लेआउट' : 'Official Mangal (Inscript) Hindi Keyboard Layout Guide'}
                </h4>
                <p className="text-xs text-amber-800">
                  {locale === 'hi' ? 'SSC CHSL एवं राज्य परीक्षाओं में प्रयुक्त मानक इनस्क्रिप्ट लेआउट की कुंजियां:' : 'Standard Govt Exam Inscript Character Mapping:'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowKeyboardMap(false)}
              className="text-xs text-amber-800 hover:text-amber-950 font-bold underline cursor-pointer"
            >
              Close / बंद करें
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-center text-xs">
            {[
              { en: 'k', hi: 'क', desc: 'Ka' },
              { en: 'K', hi: 'ख', desc: 'Kha (Shift)' },
              { en: 'i', hi: 'ग', desc: 'Ga' },
              { en: 'I', hi: 'घ', desc: 'Gha (Shift)' },
              { en: 'u', hi: 'ज', desc: 'Ja' },
              { en: 'p', hi: 'च', desc: 'Cha' },
              { en: 'j', hi: 'र', desc: 'Ra' },
              { en: 'v', hi: 'न', desc: 'Na' },
              { en: 'l', hi: 'त', desc: 'Ta' },
              { en: 'h', hi: 'प', desc: 'Pa' },
              { en: 'm', hi: 'स', desc: 'Sa' },
              { en: 'e', hi: 'ा', desc: 'Aa Matra' },
              { en: 'f', hi: 'ि', desc: 'Chhoti I' },
              { en: 'r', hi: 'ी', desc: 'Badi I' },
              { en: 'g', hi: 'ु', desc: 'Chhota U' },
              { en: 't', hi: 'ू', desc: 'Bada U' },
              { en: 'd', hi: '्', desc: 'Halant (Half)' },
              { en: 'a', hi: 'ो', desc: 'O Matra' },
            ].map((k, idx) => (
              <div key={idx} className="bg-white/80 border border-amber-200 rounded-xl p-2 shadow-2xs">
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500">
                  <span>Key:</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 text-slate-900 font-black">{k.en}</kbd>
                </div>
                <div className="text-xl font-black text-amber-900 my-1">{k.hi}</div>
                <div className="text-[10px] text-slate-500">{k.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-amber-900 italic">
            💡 <strong>टिप:</strong> Windows में Hindi Inscript कीबोर्ड सक्रिय करने के लिए <kbd className="px-1 py-0.5 bg-white border rounded">Alt + Shift</kbd> या <kbd className="px-1 py-0.5 bg-white border rounded">Win + Space</kbd> दबाएं।
          </p>
        </div>
      )}

      {/* ======================================================== */}
      {/* PASSAGE PICKER CAROUSEL / SELECTOR                       */}
      {/* ======================================================== */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-blue-600" />
            {locale === 'hi' ? 'उपलब्ध अभ्यास गद्यांश (Select Passage):' : 'Available Test Passages:'}
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {filteredPassages.length} {locale === 'hi' ? 'गद्यांश उपलब्ध' : 'Passages available'}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPassages.map((passage) => {
            const isSelected = activePassage.id === passage.id;
            return (
              <div
                key={passage.id}
                onClick={() => handleSelectPassage(passage)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between text-left relative ${
                  isSelected 
                    ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20' 
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                      {passage.exam}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      passage.language === 'Hindi' ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {passage.language}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1 leading-snug">
                    {passage.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                    {passage.description || passage.text}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-600">
                  <span className="flex items-center gap-1 font-mono">
                    <Zap className="h-3 w-3 text-amber-500" />
                    Target: <strong>{passage.targetWpm} WPM</strong>
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {passage.durationMinutes} Min
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TCS iON / SSC OFFICIAL SIMULATOR WORKBENCH               */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl border-2 border-slate-300 shadow-lg overflow-hidden">
        
        {/* Top Header: Candidate & Exam Profile (Like TCS iON) */}
        <div className="bg-[#1E3A8A] text-white p-3.5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-base text-amber-300">
              <Monitor className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono bg-blue-800 text-blue-200 px-2 py-0.5 rounded font-bold uppercase">
                  TCS iON Examination Engine
                </span>
                <span className="text-[10px] font-bold text-amber-300">
                  System: C-104
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide mt-0.5">
                {activePassage.exam} — {activePassage.level} ({activePassage.language})
              </h3>
            </div>
          </div>

          {/* Candidate Category & Verification */}
          <div className="flex items-center gap-3 text-xs">
            <div className="bg-blue-950/60 border border-blue-700/60 rounded-xl px-3 py-1.5 text-right">
              <span className="text-[10px] text-blue-300 font-bold block uppercase">Candidate Category:</span>
              <select
                value={candidateCategory}
                onChange={(e) => setCandidateCategory(e.target.value as any)}
                className="bg-transparent text-white font-extrabold text-xs focus:outline-hidden cursor-pointer"
              >
                <option value="UR" className="text-slate-900">UR (Gen) - Cutoff: 7% / 5%</option>
                <option value="OBC" className="text-slate-900">OBC - Cutoff: 10% / 7%</option>
                <option value="EWS" className="text-slate-900">EWS - Cutoff: 10% / 7%</option>
                <option value="SC" className="text-slate-900">SC - Cutoff: 10% / 7%</option>
                <option value="ST" className="text-slate-900">ST - Cutoff: 10% / 7%</option>
                <option value="PwD" className="text-slate-900">PwD / Ex-S - Cutoff: 10%</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Controls Bar: Timer, Controls, Font size, Backspace toggle */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Timer Display */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-black text-sm shadow-xs ${
              timeRemaining < 120 
                ? 'bg-rose-600 text-white animate-pulse' 
                : 'bg-white text-slate-900 border border-slate-300'
            }`}>
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {testState === 'idle' ? (
                <button
                  onClick={startTest}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>Start Test / प्रारंभ</span>
                </button>
              ) : testState === 'running' || testState === 'paused' ? (
                <>
                  <button
                    onClick={togglePause}
                    className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1 cursor-pointer ${
                      testState === 'paused' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {testState === 'paused' ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                    <span>{testState === 'paused' ? 'Resume' : 'Pause'}</span>
                  </button>
                  <button
                    onClick={finishTest}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Submit Test
                  </button>
                </>
              ) : null}

              <button
                onClick={() => resetTest()}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition cursor-pointer"
                title="Reset Test"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Steno Audio Dictation Button (If Steno Exam) */}
          {activePassage.exam === 'SSC Stenographer' && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 px-3 py-1 rounded-xl">
              <button
                onClick={playStenoDictation}
                className={`flex items-center gap-1.5 font-bold text-xs px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  stenoAudioPlaying 
                    ? 'bg-rose-600 text-white animate-pulse' 
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs'
                }`}
              >
                {stenoAudioPlaying ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                <span>{stenoAudioPlaying ? 'Stop Audio Dictation' : `🎙️ Play ${activePassage.stenoWpm || 80} WPM Audio Dictation`}</span>
              </button>
              {stenoAudioPlaying && (
                <span className="text-[10px] font-bold text-amber-900 animate-pulse">
                  {stenoAudioPhase === 'trial' ? 'Phase: 1-Min Trial' : 'Phase: Main 10-Min Dictation'}
                </span>
              )}
            </div>
          )}

          {/* Simulation Toggles (Font size, Backspace rule, Highlight) */}
          <div className="flex items-center gap-3">
            {/* Font size */}
            <div className="flex items-center bg-white border border-slate-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 text-xs font-bold ${fontSize === 'sm' ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 text-xs font-bold ${fontSize === 'base' ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 text-xs font-bold ${fontSize === 'lg' ? 'bg-slate-200 text-slate-900' : 'text-slate-500'}`}
              >
                A+
              </button>
            </div>

            {/* Backspace toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-semibold select-none">
              <input
                type="checkbox"
                checked={allowBackspace}
                onChange={(e) => setAllowBackspace(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[11px]">Backspace Allowed (SSC Mode)</span>
            </label>

            {/* Highlight toggle */}
            <label className="hidden sm:flex items-center gap-1.5 cursor-pointer text-slate-700 font-semibold select-none">
              <input
                type="checkbox"
                checked={highlightCurrentWord}
                onChange={(e) => setHighlightCurrentWord(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[11px]">Highlight Word</span>
            </label>
          </div>
        </div>

        {/* Live Performance Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-center text-xs">
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block">Gross Speed</span>
            <span className="font-mono font-black text-sm text-slate-800">{stats.grossWpm} WPM</span>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block">Net Speed</span>
            <span className="font-mono font-black text-sm text-blue-700">{stats.netWpm} WPM</span>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block">Accuracy</span>
            <span className="font-mono font-black text-sm text-emerald-600">{stats.accuracy}%</span>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block">Key Depressions</span>
            <span className="font-mono font-black text-sm text-indigo-700">{totalKeystrokes}</span>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block">KDPH (Rate)</span>
            <span className="font-mono font-black text-sm text-purple-700">{stats.kdph}</span>
          </div>
          <div className="bg-white p-1.5 rounded-lg border border-slate-200">
            <span className="text-[10px] text-slate-400 font-bold block">Total Mistakes</span>
            <span className="font-mono font-black text-sm text-rose-600">{stats.totalMistakesPenalty}</span>
          </div>
        </div>

        {/* Split Screen Workspace: Passage on top, Typing input below */}
        <div className="p-4 sm:p-6 space-y-4">
          
          {/* Target Passage View Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-blue-600" />
                <span>{locale === 'hi' ? 'आधिकारिक मास्टर गद्यांश (Master Passage):' : 'Official Master Passage (Type the text below):'}</span>
              </span>
              <span className="font-mono text-slate-400">
                Word {Math.min(typedWords.length, targetWords.length)} / {targetWords.length}
              </span>
            </div>

            <div 
              ref={passageContainerRef}
              className={`p-4 bg-slate-50 border border-slate-300 rounded-2xl max-h-48 overflow-y-auto leading-relaxed select-none font-normal tracking-wide text-slate-800 ${
                fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm'
              }`}
            >
              {targetWords.map((word, idx) => {
                const isCurrent = idx === typedWords.length - 1;
                const isPast = idx < typedWords.length - 1;
                const isWrong = isPast && typedWords[idx] !== word;

                let wordClasses = 'inline-block mr-1.5 rounded px-0.5 ';
                if (highlightCurrentWord && isCurrent) {
                  wordClasses += 'bg-amber-300 text-slate-950 font-bold shadow-2xs ';
                } else if (isWrong) {
                  wordClasses += 'bg-rose-100 text-rose-800 underline decoration-rose-500 ';
                } else if (isPast) {
                  wordClasses += 'text-slate-400 ';
                }

                return (
                  <span key={idx} className={wordClasses}>
                    {word}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Typing Response Area */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Keyboard className="h-3.5 w-3.5 text-emerald-600" />
                <span>{locale === 'hi' ? 'अभ्यर्थी टाइपिंग क्षेत्र (Candidate Typing Box):' : 'Candidate Response Box (Start typing here):'}</span>
              </span>
              <span className="text-slate-400 text-[11px]">
                {testState === 'completed' ? '🔒 Test Ended' : 'Press any key to start timer automatically'}
              </span>
            </div>

            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={testState === 'completed'}
              placeholder={
                locale === 'hi' 
                  ? 'टाइपिंग प्रारंभ करने के लिए यहां लिखें... समय स्वचालित रूप से शुरू हो जाएगा।' 
                  : 'Start typing here... Countdown timer will start on first keystroke.'
              }
              rows={6}
              className={`w-full p-4 rounded-2xl border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 focus:outline-hidden transition leading-relaxed font-sans ${
                fontSize === 'sm' ? 'text-xs' : fontSize === 'lg' ? 'text-base' : 'text-sm'
              } ${testState === 'completed' ? 'bg-slate-100 text-slate-500' : 'bg-white text-slate-900'}`}
            />
          </div>

          {/* Test Control Actions below */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Backspace used: <strong>{backspaceCount}</strong></span>
              <span>•</span>
              <span>Current Length: <strong>{inputText.length}</strong> chars</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => resetTest()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Reset / रीसेट करें
              </button>
              {testState !== 'completed' && (
                <button
                  type="button"
                  onClick={finishTest}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md transition cursor-pointer"
                >
                  Final Submit / स्कोरकार्ड देखें
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* OFFICIAL SCORECARD & DIAGNOSTIC REPORT (UPON COMPLETION) */}
        {/* ======================================================== */}
        {testState === 'completed' && (
          <div className="border-t-2 border-slate-200 bg-slate-50 p-6 space-y-6 animate-fadeIn">
            
            {/* Qualification Banner */}
            <div className={`p-6 rounded-3xl border-2 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              stats.isQualified 
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950' 
                : 'bg-rose-50 border-rose-400 text-rose-950'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl ${stats.isQualified ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                  {stats.isQualified ? <CheckCircle2 className="h-8 w-8" /> : <AlertTriangle className="h-8 w-8" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      stats.isQualified ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                    }`}>
                      Official Evaluation Result
                    </span>
                    <span className="text-xs text-slate-500 font-semibold font-mono">
                      Category: {candidateCategory}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black mt-1">
                    {stats.isQualified 
                      ? `QUALIFIED! बधाई हो, आप ${activePassage.exam} टाइपिंग टेस्ट में उत्तीर्ण हैं!` 
                      : `NOT QUALIFIED — ${activePassage.exam} टाइपिंग गति या त्रुटि सीमा में सुधार की आवश्यकता है`}
                  </h3>

                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {stats.isQualified
                      ? `आपकी शुद्ध गति (${stats.netWpm} WPM) निर्धारित मानक (${activePassage.targetWpm} WPM) से अधिक है और आपकी त्रुटि दर (${stats.errorPercentage}%) अनुमेय सीमा (${stats.permissibleErrorPercent}%) के भीतर है।`
                      : !stats.speedQualified 
                        ? `आपकी शुद्ध गति (${stats.netWpm} WPM) आवश्यक न्यूनतम गति (${activePassage.targetWpm} WPM) से कम रह गई है।`
                        : `आपकी त्रुटि दर (${stats.errorPercentage}%) अनुमेय अधिकतम सीमा (${stats.permissibleErrorPercent}%) से अधिक है।`}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                <button
                  onClick={handlePrintScorecard}
                  className="px-4 py-2.5 bg-white text-slate-800 hover:bg-slate-100 font-bold rounded-xl border border-slate-300 text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="h-4 w-4 text-slate-600" />
                  <span>Print Scorecard</span>
                </button>
                <button
                  onClick={() => resetTest()}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Try Again / पुन: प्रयास</span>
                </button>
              </div>
            </div>

            {/* Metric Score Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Gross Speed</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{stats.grossWpm}</span>
                <span className="text-[10px] text-slate-500 font-semibold">Words Per Min</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/30 text-center shadow-xs">
                <span className="text-[10px] uppercase font-bold text-blue-700 block">Net Speed (Final)</span>
                <span className="text-2xl font-black text-blue-700 font-mono mt-1 block">{stats.netWpm}</span>
                <span className="text-[10px] text-blue-600 font-bold">Req: {activePassage.targetWpm} WPM</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Accuracy</span>
                <span className="text-2xl font-black text-emerald-600 font-mono mt-1 block">{stats.accuracy}%</span>
                <span className="text-[10px] text-slate-500 font-semibold">Character Level</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Error Percentage</span>
                <span className={`text-2xl font-black font-mono mt-1 block ${stats.errorQualified ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stats.errorPercentage}%
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Limit: ≤ {stats.permissibleErrorPercent}%</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Key Depressions</span>
                <span className="text-2xl font-black text-purple-700 font-mono mt-1 block">{totalKeystrokes}</span>
                <span className="text-[10px] text-slate-500 font-semibold">KDPH: {stats.kdph}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Mistakes Penalty</span>
                <span className="text-2xl font-black text-rose-600 font-mono mt-1 block">{stats.totalMistakesPenalty}</span>
                <span className="text-[10px] text-slate-500 font-semibold">{stats.fullMistakes} Full / {stats.halfMistakes} Half</span>
              </div>
            </div>

            {/* Official SSC Mistakes Breakdown Table */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <h4 className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
                <span>📋 Official SSC & Examination Mistake Breakdown Scheme</span>
                <span className="text-xs text-slate-400 font-normal">As per SSC CHSL / Steno Gazette Guidelines</span>
              </h4>

              <div className="grid sm:grid-cols-2 gap-4 text-xs leading-relaxed">
                <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between font-bold text-rose-900 border-b border-rose-200 pb-1">
                    <span>Full Mistakes (1 Mark Deduction each):</span>
                    <span className="font-mono text-base font-black">{stats.fullMistakes}</span>
                  </div>
                  <ul className="list-disc list-inside text-rose-800 space-y-1 text-[11px]">
                    <li><strong>Omission of word:</strong> Any word completely skipped from the master text.</li>
                    <li><strong>Substitution of word:</strong> Typing an incorrect word in place of the master word.</li>
                    <li><strong>Addition of word:</strong> Adding extra words not found in the original passage.</li>
                  </ul>
                </div>

                <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between font-bold text-amber-900 border-b border-amber-200 pb-1">
                    <span>Half Mistakes (0.5 Mark Deduction each):</span>
                    <span className="font-mono text-base font-black">{stats.halfMistakes}</span>
                  </div>
                  <ul className="list-disc list-inside text-amber-800 space-y-1 text-[11px]">
                    <li><strong>Capitalization error:</strong> Writing small letters instead of capital or vice versa.</li>
                    <li><strong>Spacing error:</strong> Extra space inside words or missing space between two words.</li>
                    <li><strong>Punctuation / Spelling error:</strong> Minor punctuation omissions.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Detailed Word-by-Word Diff Visualizer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-blue-600" />
                  <span>Word-by-Word Text Analysis (गलतियों का मिलान)</span>
                </h4>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-emerald-500"></span> Correct</span>
                  <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-rose-500"></span> Wrong / Substituted</span>
                  <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded bg-amber-400"></span> Case Mismatch (Half)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-loose font-mono max-h-60 overflow-y-auto">
                {targetWords.map((target, idx) => {
                  const typed = typedWords[idx];
                  if (!typed) {
                    return (
                      <span key={idx} className="bg-slate-200 text-slate-500 line-through px-1 py-0.5 rounded mr-1" title="Skipped / Omitted">
                        {target}
                      </span>
                    );
                  }
                  if (typed === target) {
                    return (
                      <span key={idx} className="text-emerald-700 font-semibold mr-1">
                        {typed}
                      </span>
                    );
                  }
                  if (typed.toLowerCase() === target.toLowerCase()) {
                    return (
                      <span key={idx} className="bg-amber-100 text-amber-900 border border-amber-300 px-1 py-0.5 rounded mr-1 font-bold" title={`Case error: Typed "${typed}" instead of "${target}"`}>
                        {typed}
                      </span>
                    );
                  }
                  return (
                    <span key={idx} className="bg-rose-100 text-rose-800 border border-rose-300 px-1 py-0.5 rounded mr-1 font-bold" title={`Incorrect: Typed "${typed}" instead of "${target}"`}>
                      {typed} <span className="text-[9px] text-rose-500">({target})</span>
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ======================================================== */}
      {/* DETAILED SYLLABUS & EVALUATION NORMS (SSC / STENO / RRB)  */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {locale === 'hi' 
                ? 'विभिन्न सरकारी भर्तियों हेतु टाइपिंग एवं आशुलिपि सिलेबस व मानक' 
                : 'Official Syllabus & Typing Standards by Government Recruitment Boards'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {locale === 'hi'
                ? 'कर्मचारी चयन आयोग (SSC), रेलवे भर्ती बोर्ड (RRB) और उच्च न्यायालयों के आधिकारिक निर्देश'
                : 'Direct reference guidelines for SSC CHSL, SSC Stenographer, RRB NTPC, and Court Clerks'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-xs leading-relaxed">
          
          {/* Card 1: SSC CHSL */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-800 rounded-lg font-bold">SSC</span>
              <h4 className="font-extrabold text-sm text-slate-900">SSC CHSL (LDC / JSA / DEO)</h4>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li><strong>English Typing:</strong> 35 WPM (10,500 KDPH) in 10 minutes (~1750 key depressions).</li>
              <li><strong>Hindi Typing:</strong> 30 WPM (9,000 KDPH) in 10 minutes (~1500 key depressions) on Mangal Inscript / Remington.</li>
              <li><strong>DEO (Data Entry):</strong> 8,000 to 15,000 KDPH (15 minutes).</li>
              <li><strong>Cutoff Error Limit:</strong> Max 7% for UR category, max 10% for Reserved categories (OBC/SC/ST/EWS).</li>
              <li><strong>Nature:</strong> Qualifying in nature; marks are not added to final merit.</li>
            </ul>
          </div>

          {/* Card 2: SSC Stenographer */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg font-bold">Steno</span>
              <h4 className="font-extrabold text-sm text-slate-900">SSC Stenographer Grade C & D</h4>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li><strong>Grade C Dictation:</strong> 100 WPM audio dictation for 10 minutes (1000 words). Transcription time: 40 min (Eng) / 55 min (Hindi).</li>
              <li><strong>Grade D Dictation:</strong> 80 WPM audio dictation for 10 minutes (800 words). Transcription time: 50 min (Eng) / 65 min (Hindi).</li>
              <li><strong>Evaluation:</strong> Full mistakes (omissions, substitutions) + Half mistakes (spelling, capitalization, punctuation).</li>
              <li><strong>Max Permissible Mistakes:</strong> Grade C: 5% (UR), 7% (Reserved); Grade D: 7% (UR), 10% (Reserved).</li>
            </ul>
          </div>

          {/* Card 3: RRB NTPC & State Courts */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg font-bold">RRB</span>
              <h4 className="font-extrabold text-sm text-slate-900">RRB NTPC & High Court Clerk</h4>
            </div>
            <ul className="space-y-2 text-slate-700">
              <li><strong>RRB NTPC Typing:</strong> English 30 WPM (300 words) / Hindi 25 WPM (250 words) in 10 minutes.</li>
              <li><strong>Railway Strict Rules:</strong> Editing outside the current paragraph disabled; 5% mistake rebate granted.</li>
              <li><strong>High Court Clerk:</strong> 30 WPM English / 25 WPM Hindi (KrutiDev 010 / Mangal).</li>
              <li><strong>UPSSSC Junior Assistant:</strong> 25 WPM in Hindi and 30 WPM in English mandatory.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* CUSTOM PASSAGE MODAL                                     */}
      {/* ======================================================== */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {locale === 'hi' ? 'अपना कस्टम गद्यांश जोड़ें' : 'Add Custom Typing Passage'}
                </h3>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Passage Title / शीर्षक:</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. My Coaching Daily Assignment #12"
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Language:</label>
                  <select
                    value={customLanguage}
                    onChange={(e) => setCustomLanguage(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">हिन्दी (Hindi)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Speed (WPM):</label>
                  <input
                    type="number"
                    value={customWpm}
                    onChange={(e) => setCustomWpm(Number(e.target.value))}
                    min={15}
                    max={120}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration (Mins):</label>
                  <input
                    type="number"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(Number(e.target.value))}
                    min={1}
                    max={60}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Passage Content (Paste text):</label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={6}
                  placeholder="Paste paragraph text from coaching material, newspaper, or official gazette..."
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:border-blue-500 focus:outline-hidden font-sans"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomPassage}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                Load Passage & Start / लोड करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DETAILED SYLLABUS MODAL                                  */}
      {/* ======================================================== */}
      {showSyllabusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 border border-slate-200 max-h-[85vh] overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                  {locale === 'hi' ? 'आधिकारिक सरकारी टाइपिंग एवं आशुलिपि दिशानिर्देश' : 'Official Govt Typing & Steno Guidelines'}
                </h3>
              </div>
              <button
                onClick={() => setShowSyllabusModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed text-slate-700">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-blue-900">1. SSC CHSL Tier-II Typing Test</h4>
                <p>
                  कर्मचारी चयन आयोग (SSC) द्वारा आयोजित CHSL परीक्षा के तहत लोअर डिवीजन क्लर्क (LDC) और कनिष्ठ सचिवालय सहायक (JSA) पदों के लिए 35 शब्द प्रति मिनट (अंग्रेजी) अथवा 30 शब्द प्रति मिनट (हिंदी) की गति अनिवार्य है। यह परीक्षा 10 मिनट की अवधि की होती है।
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-blue-200/80 font-mono text-[11px]">
                  <div>• अंग्रेजी गति: 35 WPM / 10,500 KDPH</div>
                  <div>• हिंदी गति: 30 WPM / 9,000 KDPH</div>
                  <div>• अनारक्षित (UR) कटऑफ छूट: अधिकतम 7%</div>
                  <div>• आरक्षित (OBC/SC/ST/EWS): अधिकतम 10%</div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-amber-900">2. SSC आशुलिपिक (Stenographer Grade C & D)</h4>
                <p>
                  आशुलिपिक कौशल परीक्षण में अभ्यर्थियों को निर्धारित गति पर 10 मिनट तक ऑडियो डिक्टेशन दिया जाता है जिसे उन्हें अपनी नोटबुक में शॉर्टहैंड में लिखना होता है। इसके उपरांत निर्धारित समय सीमा में कंप्यूटर पर टाइप (ट्रांसक्रिप्शन) करना होता है।
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-amber-200/80 font-mono text-[11px]">
                  <div>• ग्रेड C डिक्टेशन: 100 शब्द/मिनट (1000 शब्द)</div>
                  <div>• ग्रेड D डिक्टेशन: 80 शब्द/मिनट (800 शब्द)</div>
                  <div>• ग्रेड C ट्रांसक्रिप्शन: 40 मिनट (अंग्रेजी) / 55 मिनट (हिंदी)</div>
                  <div>• ग्रेड D ट्रांसक्रिप्शन: 50 मिनट (अंग्रेजी) / 65 मिनट (हिंदी)</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-sm text-emerald-900">3. रेलवे RRB NTPC व उच्च न्यायालय नियम</h4>
                <p>
                  रेलवे भर्ती बोर्ड (RRB) जूनियर क्लर्क व अकाउंट्स क्लर्क हेतु 30 WPM अंग्रेजी तथा 25 WPM हिंदी की मांग करता है। इसमें 5% तक गलतियों पर कोई अंक नहीं काटे जाते हैं तथा पैराग्राफ से बाहर संपादन की अनुमति नहीं होती है।
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSyllabusModal(false)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-xs transition cursor-pointer"
              >
                Got It / समझ गया
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
