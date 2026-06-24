import React, { useState, useEffect } from 'react';
import { 
  Bell, CheckCircle2, Share2, Smartphone, ExternalLink, 
  MessageSquare, Users, Check, Sparkles, Send, Award, FileText
} from 'lucide-react';

interface WhatsAppChannelProps {
  locale: string;
  triggerToast: (msg: string) => void;
}

export default function WhatsAppChannelHub({ locale, triggerToast }: WhatsAppChannelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedQual, setSelectedQual] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Platform selection: 'whatsapp' or 'telegram'
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'telegram'>('whatsapp');
  
  // Active message ID state
  const [activePreviewMsg, setActivePreviewMsg] = useState<string>('top5');
  
  // Custom broadcasts state loaded dynamically from localStorage
  const [customBroadcasts, setCustomBroadcasts] = useState<any[]>([]);

  const isHindi = locale === 'hi';

  // Load and poll custom broadcasts from localStorage
  useEffect(() => {
    const loadBroadcasts = () => {
      const saved = localStorage.getItem('sarkari_wa_feed_broadcasts');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCustomBroadcasts(parsed);
          }
        } catch (e) {
          console.error("Error reading sarkari_wa_feed_broadcasts", e);
        }
      }
    };

    loadBroadcasts();
    
    // Poll every 1.5 seconds to instantly catch new admin creations
    const interval = setInterval(loadBroadcasts, 1500);
    return () => clearInterval(interval);
  }, []);

  // Standard static updates list
  const defaultMessagesList = [
    {
      id: 'top5',
      title: isHindi ? "🏆 आज की टॉप 5 सरकारी वैकेंसियां" : "🏆 Today's Top 5 Gov Vacancies",
      type: isHindi ? "नौकरी अलर्ट" : "Job Alert",
      time: "10:30 AM",
      body: `📢 *SARKARI JOB HUB — TOP 5 VACANCIES ALERT* 📢\n\n1️⃣ *India Post GDS Recruitment 2026*\n👥 Posts: 40,220 | 🎓 Qualification: 10th Pass\n📅 Last Date: 17 July 2026\n\n2️⃣ *GSRTC Driver & Conductor 2026*\n👥 Posts: 8,917 | 🎓 Qualification: 12th Pass\n\n3️⃣ *Railway RRB Technician (Grade I & III)*\n👥 Posts: 6,565 | 🎓 Qualification: ITI / Graduate\n\n4️⃣ *PSPCL Assistant Lineman (ALM)*\n👥 Posts: 6,289 | 🎓 Qualification: ITI (Line)\n\n5️⃣ *APMSRB Staff Nurse Recruitment 2026*\n👥 Posts: 529 | 🎓 Qualification: B.Sc Nursing\n\n🔗 *Apply Online Links & Official PDF:*\nhttps://sarkari-hub.web.app/?tab=jobs\n\n👇 *Join Verified Channel for Direct PDFs:*\nhttps://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U`
    },
    {
      id: 'indiapost',
      title: isHindi ? "📬 इंडिया पोस्ट GDS बम्पर भर्ती" : "📬 India Post GDS Mega Recruitment",
      type: isHindi ? "नौकरी अलर्ट" : "Job Alert",
      time: "02:15 PM",
      body: `🚨 *INDIA POST GDS MEGA VACANCY ALERT 2026* 🚨\n\n🏢 *Department of Posts, Govt of India*\n👥 *Total Vacancies:* 40,220 Posts (All India Circles)\n🎓 *Qualification:* 10th Class Passed\n💰 *Salary:* ₹12,000 to ₹29,380 / Month\n⚠️ *No Written Exam — Direct Selection on Merit Basis!*\n\n📅 *Last Date to Apply:* 17 July 2026\n\n🔗 *Apply Fast (Direct Official Link):*\nhttps://sarkari-hub.web.app/?job=india-post-gds-recruitment-2026\n\n👇 *Share with friends & JOIN WhatsApp channel for daily cutoff list:*\nhttps://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U`
    },
    {
      id: 'results',
      title: isHindi ? "🎉 सरकारी रिजल्ट अपडेट" : "🎉 Sarkari Result Updates",
      type: isHindi ? "रिजल्ट घोषित" : "Result",
      time: "Yesterday, 06:10 PM",
      body: `📢 *SARKARI JOB HUB — LIVE RESULTS DECK* 📢\n\n1️⃣ *JEE Advanced 2026 Final Score Card & Rank List*\n👉 Cutoff: Gen (109 Marks), OBC (98 Marks)\n🔗 Direct Link: https://jeeadv.ac.in\n\n2️⃣ *SSC CGL 2025 Final Rank Merit Select List Out!*\n👉 Assistant Section Officer: 312.5 Cutoff\n🔗 Direct Link: https://ssc.gov.in\n\n3️⃣ *UPSC Civil Services Prelims 2026 Merit PDF*\n👉 Direct Roll No check active in web panel.\n\n👇 *Subscribers get instant selection lists direct to phone! Join 👇*\nhttps://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U`
    },
    {
      id: 'admit',
      title: isHindi ? "🎟️ एडमिट कार्ड & परीक्षा तिथियां" : "🎟️ Admit Card & Exam Dates",
      type: isHindi ? "प्रवेश पत्र" : "Admit Card",
      time: "3 mins ago",
      body: `🎫 *LATEST EXAM HALL TICKET & CITY INTERFACE LIVE* 🎫\n\n➡️ *CSIR UGC NET June 2026 Exam City Slip*\n📅 Exam Date: 25-27 June 2026\n🔗 Slip Link: https://csirnet.nta.ac.in\n\n➡️ *IDBI Bank Contract Executive Admit Card*\n📅 Exam Date: July 2026\n🔗 Call Letter Link: https://www.idbibank.in\n\n➡️ *IBPS RRB XV Clerk & PO Pre-Exam Call Letter*\n📅 PET Commencing: 10-15 July 2026\n\n👇 *Download links verified free of ads. Do not miss! JOIN:*\nhttps://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U`
    }
  ];

  // Merge custom broadcasts from admin with default ones
  const allMessages = [
    ...customBroadcasts.map((cb: any) => ({
      id: cb.id || `custom-${cb.timestamp}`,
      title: cb.title,
      type: cb.type,
      time: cb.timestamp || "Just now",
      body: cb.message,
      isCustom: true
    })),
    ...defaultMessagesList
  ];

  // Dynamically configure tabs to show custom entries first!
  const tabsList = [
    ...customBroadcasts.slice(0, 3).map((cb: any) => {
      // Create readable short title
      const shortTitle = cb.title.includes(' - ') ? cb.title.split(' - ')[1] : cb.title;
      return {
        id: cb.id || `custom-${cb.timestamp}`,
        label: `✨ [${cb.type}] ${shortTitle.substring(0, 18)}...`,
        isCustom: true
      };
    }),
    { id: 'top5', label: isHindi ? '🏆 आज की भर्ती' : '🏆 Today\'s Top 5' },
    { id: 'indiapost', label: isHindi ? '📬 इंडिया पोस्ट' : '📬 India Post' },
    { id: 'results', label: isHindi ? '🎉 रिजल्ट्स अपडेट' : '🎉 Sarkari Results' },
    { id: 'admit', label: isHindi ? '🎟️ प्रवेश पत्र' : '🎟️ Admit Cards' }
  ];

  // Auto-set the active message to the first item (which will be the newly created custom broadcast!)
  useEffect(() => {
    if (customBroadcasts.length > 0 && activePreviewMsg === 'top5') {
      const latestId = customBroadcasts[0].id || `custom-${customBroadcasts[0].timestamp}`;
      setActivePreviewMsg(latestId);
    }
  }, [customBroadcasts]);

  // Find currently active message data
  const activeMsgData = allMessages.find(m => m.id === activePreviewMsg) || allMessages[0];

  const handleApplyPreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setShowConfetti(true);
    triggerToast(
      isHindi 
        ? "✅ आपकी व्हाट्सएप और टेलीग्राम अलर्ट सेटिंग्स सुरक्षित कर ली गईं! अब तुरंत चैनलों से जुड़ें।" 
        : "✅ Your alert preferences are secured! Now tap 'Join Channel' to receive customized posts."
    );
    setTimeout(() => setShowConfetti(false), 4500);
  };

  const copyChannelLink = () => {
    const link = selectedPlatform === 'whatsapp' 
      ? "https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U" 
      : "https://t.me/JobSarkariHubOfficial";
    
    navigator.clipboard.writeText(link).then(
      () => {
        triggerToast(
          isHindi 
            ? `👉 ${selectedPlatform === 'whatsapp' ? 'व्हाट्सएप' : 'टेलीग्राम'} चैनल आमंत्रण लिंक कॉपी हो गया है!` 
            : `👉 ${selectedPlatform === 'whatsapp' ? 'WhatsApp' : 'Telegram'} Channel link copied!`
        );
      },
      () => {
        triggerToast("Failed to copy link.");
      }
    );
  };

  return (
    <div className="bg-slate-50 rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-md max-w-7xl mx-auto overflow-hidden animate-fade-in text-left">
      
      {/* Header Banner Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-8 mb-8">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 text-blue-800 px-3.5 py-1 text-xs font-bold border border-blue-200">
            <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
            <Users className="h-3 w-3 text-sky-600" />
            <span>85k+ Active Channel Subscribers joined this week</span>
          </div>
          
          <h2 className="font-sans text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight flex items-center gap-2 flex-wrap">
            <span>
              {isHindi 
                ? '📱 सरकारी भर्तियां व्हाट्सएप और टेलीग्राम न्यूज़ डेस्क' 
                : '📱 Official Sarkari Vacancy WhatsApp & Telegram Feeds'}
            </span>
            <span className={`${selectedPlatform === 'whatsapp' ? 'bg-emerald-600' : 'bg-sky-600'} text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded transition`}>
              Verified {selectedPlatform === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
            </span>
          </h2>
          
          <p className="font-sans text-sm text-slate-600 leading-relaxed">
            {isHindi 
              ? 'बिना किसी विज्ञापन और फालतू फॉरवर्ड मैसेज के, सीधे भारत सरकार और सभी राज्यों की लेटेस्ट वैकेंसी, एडमिट कार्ड, परीक्षा तारीखें और सरकारी रिजल्ट सीधा अपने फोन पर पाएं। जब भी एडमिन कोई अपडेट करता है, वह तुरंत व्हाट्सएप और टेलीग्राम चैनलों पर भेज दिया जाता है।' 
              : 'Zero spam, zero advertisements, and prompt official links. Receive clean consolidated notifications on your smartphone daily. Whenever the administrator updates or publishes any vacancy, admit card, result, or answer key, it is broadcasted here immediately!'}
          </p>
        </div>

        <div className="flex shrink-0 gap-3 w-full sm:w-auto">
          {selectedPlatform === 'whatsapp' ? (
            <a
              href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerToast("✨ Forwarding to verified WhatsApp updates channel...")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 font-sans font-black text-sm tracking-wide shadow-lg shadow-emerald-600/30 transition-all active:scale-95 border border-emerald-400/20"
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.453L0 24zm6.59-4.846c1.6.95 3.1 1.4 4.8 1.4 5.25 0 9.5-4.25 9.5-9.5s-4.25-9.5-9.5-9.5-9.5 4.25-9.5 9.5c0 1.93.56 3.65 1.5 5.23l-.99 3.6 3.73-.98M16.5 13.9c-.24-.12-1.43-.7-1.65-.79-.22-.09-.38-.13-.54.12-.16.24-.61.79-.75.94-.14.15-.27.17-.5.06-2.07-1.06-3.15-1.92-4.14-3.63-.26-.45.26-.42.74-1.38.08-.16.04-.3-.02-.42s-.54-1.3-.74-1.78c-.2-.48-.38-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.83-.84 2.02s.87 2.33.99 2.5c.12.16 1.7 2.54 4.11 3.59.57.25 1.02.4 1.37.5.58.18 1.1.16 1.5.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28" />
              </svg>
              <span>{isHindi ? '🟢 अभी व्हाट्सएप चैनल जॉइन करें' : '🟢 JOIN WHATSAPP CHANNEL'}</span>
            </a>
          ) : (
            <a
              href="https://t.me/JobSarkariHubOfficial"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerToast("✨ Forwarding to verified Telegram updates channel...")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white px-6 py-3.5 font-sans font-black text-sm tracking-wide shadow-lg shadow-sky-600/30 transition-all active:scale-95 border border-sky-400/20"
            >
              <Send className="h-5 w-5 text-white" />
              <span>{isHindi ? '✈️ अभी टेलीग्राम चैनल जॉइन करें' : '✈️ JOIN TELEGRAM CHANNEL'}</span>
            </a>
          )}

          <button
            onClick={copyChannelLink}
            className="flex items-center justify-center p-3.5 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-800 transition"
            title="Share Channel Invite"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showConfetti && (
        <div className="bg-blue-50 border border-blue-300 rounded-2xl p-4 text-center text-blue-800 font-sans font-bold text-sm mb-6 animate-pulse flex items-center justify-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-yellow-500 animate-bounce" />
          <span>
            {isHindi 
              ? `🎉 अलर्ट प्राथमिकता सेट की गई: [राज्य: ${selectedState === 'all' ? 'सभी भारत' : selectedState}], [योग्यता: ${selectedQual === 'all' ? 'सभी' : selectedQual}]` 
              : `🎉 Saved settings: [State: ${selectedState} | Qual: ${selectedQual}]. Please open your desired channel and follow/unmute notifications.`}
          </span>
        </div>
      )}

      {/* Main Core Section Split */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Panel: Preference Generator */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="font-sans text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Bell className="h-4.5 w-4.5" />
              </span>
              <span>{isHindi ? '1. अपने मनचाहे जॉब अलर्ट फिल्टर करें' : '1. Customize your Alert Preferences'}</span>
            </h3>
            <p className="font-sans text-xs text-slate-500 leading-normal">
              {isHindi 
                ? 'जिस भी राज्य या योग्यता के लिए आप तैयारी कर रहे हैं, उसे चुनें। हमारी टीम उसी विशिष्ट श्रेणी के अनुसार व्हाट्सएप और टेलीग्राम चैनलों पर तुरंत अपडेट भेजेगी।' 
                : 'Define what you are preparing for so our broadcast updates directly cater to your desired categories.'}
            </p>
          </div>

          <form onSubmit={handleApplyPreferences} className="space-y-4 font-sans text-xs sm:text-sm">
            {/* Class / Sector selection */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{isHindi ? 'योग्यता योग्यता' : 'Desired Qualification'}</label>
                <select
                  value={selectedQual}
                  onChange={(e) => setSelectedQual(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                >
                  <option value="all">{isHindi ? 'सभी स्तर (Graduate + 10th + B.Sc + ITI / Diploma)' : 'All Qualifications'}</option>
                  <option value="Graduate">{isHindi ? 'स्नातक (Graduate Only)' : 'Graduate'}</option>
                  <option value="10th Pass">{isHindi ? '10वीं पास (10th Pass Grid)' : '10th Pass'}</option>
                  <option value="12th Pass">{isHindi ? '12वीं पास (12th Pass Grid)' : '12th Pass'}</option>
                  <option value="ITI">{isHindi ? 'ITI / डिप्लोमा होल्डर्स' : 'ITI / Diploma'}</option>
                  <option value="B.Sc">{isHindi ? 'B.Sc (नर्सिंग/टेक्निकल)' : 'B.Sc / Medical Staff'}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">{isHindi ? 'कार्य क्षेत्र/राज्य' : 'Target State / Org Category'}</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                >
                  <option value="all">{isHindi ? 'ऑल इंडिया (Central Gov Jobs)' : 'All India Circle'}</option>
                  <option value="Punjab">{isHindi ? 'पंजाब (Punjab PSPCL / ALM)' : 'Punjab'}</option>
                  <option value="Gujarat">{isHindi ? 'गुजरात (GSRTC / State Board)' : 'Gujarat'}</option>
                  <option value="Andhra Pradesh">{isHindi ? 'आंध्र प्रदेश (APMSRB)' : 'Andhra Pradesh'}</option>
                  <option value="Others-Central">{isHindi ? 'रेलवे (RRB) और बैंकिंग (SBI/IDBI)' : 'Railways & Banking'}</option>
                </select>
              </div>
            </div>

            {/* Category of exam check */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">{isHindi ? 'अलर्ट विषय चुनें' : 'Preferred Alert Notifications'}</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'jobs', label: isHindi ? 'ताज़ा वैकेंसियां 🏢' : 'New Vacancies 🏢' },
                  { id: 'admit', label: isHindi ? 'एडमिट कार्ड 🎟️' : 'Admit Cards 🎟️' },
                  { id: 'results', label: isHindi ? 'सरकारी रिजल्ट 🏆' : 'Exam Results 🏆' },
                  { id: 'answer', label: isHindi ? 'उत्तर कुंजी 🔑' : 'Answer Keys 🔑' },
                  { id: 'mock', label: isHindi ? 'मॉक टेस्ट / PYQ 📚' : 'Mocks & PYQs 📚' },
                  { id: 'daily-news', label: isHindi ? 'करंट अफेयर्स 📰' : 'Current Affairs 📰' }
                ].map((item) => (
                  <label key={item.id} className="flex items-center gap-2 p-2 px-3 border border-slate-200 hover:border-blue-500 rounded-xl cursor-pointer bg-slate-50 select-none">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-[11px] font-medium text-slate-700">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white font-extrabold px-4 py-3 text-xs sm:text-sm hover:bg-slate-800 transition"
              >
                <span>{isSubscribed ? '🔔 ' + (isHindi ? 'अलर्ट प्राथमिकता सहेजें' : 'Save Alerts Preferences') : (isHindi ? '⚡ अलर्ट सेटिंग्स सक्रिय करें' : '⚡ Activate Alert Preferences')}</span>
              </button>
            </div>
          </form>

          {/* Quick FAQ / Official credentials */}
          <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 space-y-3 font-sans text-xs">
            <h4 className="font-extrabold text-slate-900 border-b border-slate-200 pb-1.5 uppercase tracking-wider text-[11px]">
              {isHindi ? 'भर्ती चैनलों की खास बातें (Why Join?):' : 'Channel Authenticity Guidelines:'}
            </h4>
            <ul className="space-y-2 text-slate-600 font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>{isHindi ? '100% नि:शुल्क:' : '100% Free Forever:'}</strong> {isHindi ? 'चैनल से जुड़ने और अलर्ट पाने का कोई शुल्क नहीं है।' : 'Join and follow both channels without premium restrictions.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>{isHindi ? 'प्राइवेट और सुरक्षित:' : 'Private & Secure:'}</strong> {isHindi ? 'आपका फ़ोन नंबर या नाम किसी भी सदस्य या एडमिन को कभी दिखाई नहीं देता।' : 'Your contact number is kept completely private and is never visible to others.'}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>{isHindi ? 'सीधे ऑफिशियल लिंक:' : 'Official-Only Action Links:'}</strong> {isHindi ? 'कोई भ्रामक या फेक पोस्ट नहीं, सिर्फ परीक्षा आयोजित करने वाली संस्था के डायरेक्ट लिंक।' : 'Only verified links directly navigating to official recruitment boards.'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Simulated Smartphone Screen Mock: Preview of messages */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          
          {/* Segmented Platform Selector */}
          <div className="flex bg-slate-200/80 p-1 rounded-2xl w-full max-w-[340px]">
            <button
              onClick={() => setSelectedPlatform('whatsapp')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedPlatform === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100/50'
              }`}
            >
              <span>🟢 WhatsApp Channel</span>
            </button>
            <button
              onClick={() => setSelectedPlatform('telegram')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                selectedPlatform === 'telegram'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100/50'
              }`}
            >
              <span>✈️ Telegram Channel</span>
            </button>
          </div>

          {/* Message Filter Switchers */}
          <div className="flex flex-wrap gap-1.5 justify-center w-full max-w-[340px]">
            {tabsList.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActivePreviewMsg(tab.id);
                  triggerToast(
                    isHindi 
                      ? `💬 प्रीव्यू बदला गया` 
                      : `💬 Switched Preview`
                  );
                }}
                className={`text-[9px] sm:text-[10px] font-bold px-2.5 py-1.5 rounded-full transition-all cursor-pointer truncate max-w-[140px] ${
                  activePreviewMsg === tab.id 
                    ? selectedPlatform === 'whatsapp'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Smartphone container */}
          <div className={`w-full max-w-[340px] rounded-[40px] border-[10px] border-slate-800 shadow-2xl relative overflow-hidden font-sans border-b-[14px] transition ${
            selectedPlatform === 'whatsapp' ? 'bg-emerald-900/10' : 'bg-sky-900/10'
          }`}>
            {/* Notch Speaker and Camera */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-slate-800 rounded-b-xl z-20 flex justify-center items-center gap-2">
              <div className="h-1 w-10 bg-slate-700 rounded"></div>
              <div className="h-1.5 w-1.5 bg-slate-900 rounded-full"></div>
            </div>

            {/* Simulated App Screen */}
            <div className={`${selectedPlatform === 'whatsapp' ? 'bg-[#E5DDD5]' : 'bg-[#eef2f3]'} min-h-[460px] pt-6 flex flex-col relative text-xs`}>
              
              {selectedPlatform === 'whatsapp' ? (
                /* --- WHATSAPP CHAT BAR --- */
                <div className="bg-[#075E54] text-white px-3 py-2 flex items-center justify-between shadow-xs sticky top-0 z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center text-[#075E54] font-black text-[9px] relative ring-1 ring-white">
                      SJH
                      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-white"></span>
                    </div>
                    <div>
                      <div className="font-extrabold flex items-center gap-1 text-[11px]">
                        <span>Sarkari Job Hub Updates</span>
                        <svg className="h-3 w-3 fill-emerald-400" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-[8px] text-emerald-100 font-bold tracking-widest uppercase">Verified Channel alerts • 40,220 GDS Live</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-[9px] font-bold bg-white/10 px-1.5 py-0.5 rounded-sm">FOLLOWING</span>
                  </div>
                </div>
              ) : (
                /* --- TELEGRAM CHAT BAR --- */
                <div className="bg-[#5682a3] text-white px-3 py-2 flex items-center justify-between shadow-xs sticky top-0 z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-full bg-sky-100 flex items-center justify-center text-[#5682a3] font-black text-[9px] relative ring-1 ring-white">
                      SJH
                    </div>
                    <div>
                      <div className="font-extrabold flex items-center gap-1 text-[11px]">
                        <span>Sarkari Job Hub Official</span>
                        <svg className="h-3 w-3 fill-sky-400" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <p className="text-[8px] text-sky-150 font-bold">38,420 subscribers • Channel</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-[9px] font-bold bg-white/10 px-1.5 py-0.5 rounded-sm">MUTE</span>
                  </div>
                </div>
              )}

              {/* Chat messages body area */}
              <div className="p-3 flex-1 overflow-y-auto space-y-4 font-sans text-[10px]">
                
                {/* Date Header bubble */}
                <div className="flex justify-center">
                  <span className={`${selectedPlatform === 'whatsapp' ? 'bg-white/70 text-slate-500' : 'bg-slate-400/30 text-slate-700'} px-2 py-0.5 rounded-md text-[8px] font-sans shadow-xs font-bold uppercase`}>
                    Today
                  </span>
                </div>

                {/* Main dynamic generated message bubble */}
                <div className="mx-auto w-full space-y-2">
                  <div className={`p-3 text-slate-800 rounded-2xl shadow-sm border relative max-w-[96%] text-left ${
                    selectedPlatform === 'whatsapp' 
                      ? 'bg-[#d9fdd3] border-[#cbd8c5]/40 rounded-tr-none ml-auto' 
                      : 'bg-white border-slate-200 rounded-tl-none mr-auto'
                  }`}>
                    
                    {/* Header line inside chat bubble */}
                    <p className={`text-[10px] font-sans font-black mb-1.5 border-b border-dashed pb-1 flex items-center justify-between ${
                      selectedPlatform === 'whatsapp' ? 'text-[#075E54] border-emerald-100' : 'text-sky-700 border-sky-100'
                    }`}>
                      <span className="flex items-center gap-1">
                        {activeMsgData?.isCustom && <Sparkles className="h-3 w-3 text-amber-500 animate-pulse" />}
                        {activeMsgData?.title}
                      </span>
                      <span className="text-[8px] text-slate-400 font-normal shrink-0">{activeMsgData?.time}</span>
                    </p>

                    {/* Preformatted text with line breaks */}
                    <div className="font-sans text-[10px] text-slate-750 whitespace-pre-wrap leading-relaxed select-text">
                      {activeMsgData?.body?.split('\n').map((line: string, idx: number) => {
                        let formatted = line;
                        // Replace *bold* with <strong>
                        formatted = formatted.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
                        // Replace _italic_ with <em>
                        formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>");
                        return (
                          <div key={idx} className="min-h-[1em]">
                            <span dangerouslySetInnerHTML={{ __html: formatted }} />
                          </div>
                        );
                      })}
                    </div>

                    {/* Appended Link Cards or Attachment simulation */}
                    <div className={`mt-3 rounded-xl p-2.5 border text-[9.5px] space-y-1 ${
                      selectedPlatform === 'whatsapp' 
                        ? 'bg-emerald-50/80 border-emerald-100' 
                        : 'bg-sky-50/80 border-sky-100'
                    }`}>
                      <p className={`font-sans font-black ${selectedPlatform === 'whatsapp' ? 'text-[#075E54]' : 'text-sky-800'}`}>
                        🎯 Fast Apply Live Portal
                      </p>
                      <p className="font-sans text-[8.5px] text-slate-500 leading-normal">
                        Apply fast on mobile, view official registration circular instantly with zero popups or advertising delays.
                      </p>
                      <div className="text-blue-600 font-mono text-[8.5px] flex items-center justify-between bg-white rounded-lg p-1.5 border border-slate-200 mt-1">
                        <span>sarkari-hub.web.app/?tab=jobs</span>
                        <ExternalLink className="h-3 w-3 shrink-0 text-blue-500" />
                      </div>
                    </div>

                    {/* Views & Double-check/Tick footer info */}
                    <div className="flex justify-end items-center gap-1 text-[8px] text-slate-400 mt-2 select-none">
                      {selectedPlatform === 'telegram' && (
                        <span className="mr-1">👁️ 14.8K views</span>
                      )}
                      <span>{activeMsgData?.time}</span>
                      {selectedPlatform === 'whatsapp' && (
                        <span className="text-sky-500 font-black leading-none">✓✓</span>
                      )}
                    </div>

                  </div>
                </div>

              </div>

              {/* Bottom Join bar simulate */}
              <div className="bg-white border-t border-slate-200 p-2.5 flex items-center justify-between text-slate-800 font-sans sticky bottom-0">
                <span className="text-[9px] sm:text-[9.5px] font-bold text-slate-500 flex items-center gap-1.5">
                  <Users className={`h-3.5 w-3.5 ${selectedPlatform === 'whatsapp' ? 'text-emerald-600' : 'text-sky-600'}`} />
                  <span>
                    {selectedPlatform === 'whatsapp' 
                      ? '45K+ subscribers follow' 
                      : '38K+ subscribers follow'}
                  </span>
                </span>
                
                {selectedPlatform === 'whatsapp' ? (
                  <a
                    href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#075E54] hover:bg-[#128C7E] text-white px-3 py-1 rounded-full font-black text-[9.5px] tracking-wide flex items-center gap-1 shadow-xs transition"
                  >
                    <span>JOIN</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                ) : (
                  <a
                    href="https://t.me/JobSarkariHubOfficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2b96cc] hover:bg-[#2081b3] text-white px-3 py-1 rounded-full font-black text-[9.5px] tracking-wide flex items-center gap-1 shadow-xs transition"
                  >
                    <span>JOIN</span>
                    <ExternalLink className="h-3 w-3 shrink-0" />
                  </a>
                )}
              </div>

            </div>
          </div>

          <p className="text-[10px] font-sans text-slate-400 font-bold mt-2 flex items-center gap-1 justify-center">
            <span>ℹ️ Click tabs above to see custom alert messages instantly in feed mockup</span>
          </p>

        </div>

      </div>

      {/* Trust banner */}
      <div className="mt-8 border-t border-slate-200 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { title: isHindi ? '95K+ कुल सब्सक्राइबर्स' : '85K+ Active Subscribers', desc: isHindi ? 'व्हाट्सएप और टेलीग्राम दोनों पर' : 'Combined WA & TG members' },
          { title: isHindi ? 'प्राइवेट और सुरक्षित' : 'Privacy Assured', desc: isHindi ? 'आपका नंबर पूरी तरह छुपा रहता है' : 'Mobile numbers hidden entirely' },
          { title: isHindi ? '100% विज्ञापन-मुक्त' : 'Zero Spam / Ad-Free', desc: isHindi ? 'सिर्फ असली और काम की सरकारी अपडेट' : 'Strictly official notification feeds' },
          { title: isHindi ? 'हिंदी एवं इंग्लिश मिक्स' : 'Hindi & Regional', desc: isHindi ? 'तुरंत समझने योग्य आसान भाषा' : 'Direct easy-to-read alerts' }
        ].map((stat, idx) => (
          <div key={idx} className="p-3 bg-white border border-slate-200/60 rounded-xl rounded-b-md shadow-xs">
            <h5 className="font-sans text-xs sm:text-sm font-black text-slate-900">{stat.title}</h5>
            <p className="font-sans text-[10px] text-slate-500 mt-0.5">{stat.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
