import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Check, 
  Bell, 
  ExternalLink, 
  Sparkles, 
  Heart, 
  Send, 
  Share2, 
  X, 
  Newspaper,
  CheckCircle2,
  Users
} from 'lucide-react';

interface FollowCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFollowed: boolean;
  onToggleFollow: () => void;
  followerCount: number;
  triggerToast: (msg: string) => void;
  locale?: string;
}

export default function FollowCommunityModal({
  isOpen,
  onClose,
  isFollowed,
  onToggleFollow,
  followerCount,
  triggerToast,
  locale = 'hi'
}: FollowCommunityModalProps) {
  const isHindi = locale === 'hi';
  const [copiedLink, setCopiedLink] = useState(false);

  const channels = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Channel',
      hindiName: 'व्हाट्सएप चैनल',
      handle: 'Job Sarkari Hub Verified',
      members: '1,25,000+ Followers',
      color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: '🟢',
      url: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U',
      actionText: isHindi ? 'फ़ॉलो करें' : 'Follow',
      description: isHindi ? 'ताज़ा सरकारी नौकरी, एडमिट कार्ड व रिजल्ट की तुरंत सूचना' : 'Instant updates for Latest Vacancies, Admit Cards & Results'
    },
    {
      id: 'telegram',
      name: 'Telegram Channel',
      hindiName: 'टेलीग्राम चैनल',
      handle: '@JobSarkariHub',
      members: '85,400+ Members',
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: '✈️',
      url: 'https://t.me/JobSarkariHub',
      actionText: isHindi ? 'जॉइन करें' : 'Join',
      description: isHindi ? 'मुफ्त सिलेबस, पिछले वर्ष के प्रश्न पत्र और मॉडल पेपर पीडीएफ' : 'Free Syllabus, PYQ Question Papers & CBT Mock PDFs'
    },
    {
      id: 'googlenews',
      name: 'Google News',
      hindiName: 'गूगल न्यूज़',
      handle: 'Job Sarkari Hub Publication',
      members: '40,000+ Readers',
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: '📰',
      url: 'https://news.google.com/search?q=Job+Sarkari+Hub',
      actionText: isHindi ? 'स्टार दबाएं' : 'Star / Follow',
      description: isHindi ? 'गूगल ऐप और सर्च में सबसे पहले जॉब अलर्ट प्राप्त करें' : 'Get Top Sarkari Result alerts directly on your Google Feed'
    },
    {
      id: 'youtube',
      name: 'YouTube Community',
      hindiName: 'यूट्यूब चैनल',
      handle: '@JobSarkariHubLive',
      members: '45,200+ Subscribers',
      color: 'bg-red-600 hover:bg-red-700 text-white',
      badgeBg: 'bg-red-50 text-red-700 border-red-200',
      icon: '▶️',
      url: 'https://youtube.com',
      actionText: isHindi ? 'सब्सक्राइब करें' : 'Subscribe',
      description: isHindi ? 'परीक्षा विश्लेषण, कटऑफ चर्चा और टाइपिंग टेस्ट लाइव डेमो' : 'Exam analysis, expected cut-offs & live typing demo'
    },
    {
      id: 'instagram',
      name: 'Instagram Hub',
      hindiName: 'इंस्टाग्राम',
      handle: '@JobSarkariHubOfficial',
      members: '32,800+ Aspirants',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white',
      badgeBg: 'bg-pink-50 text-pink-700 border-pink-200',
      icon: '📸',
      url: 'https://instagram.com',
      actionText: isHindi ? 'फ़ॉलो करें' : 'Follow',
      description: isHindi ? 'दैनिक जीके इन्फोग्राफिक्स, क्विज पोल्स और महत्वपूर्ण तिथियां' : 'Daily GK Infographics, micro-quiz polls & important dates'
    }
  ];

  const handleCopyLink = () => {
    const url = 'https://sarkari-job-hub-v595.onrender.com';
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    triggerToast('🔗 Portal link copied to clipboard! Share with friends.');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs text-left animate-fade-in font-sans">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl relative flex flex-col max-h-[92vh] border border-slate-200 overflow-hidden">
        
        {/* Header Banner */}
        <div className="relative p-6 bg-gradient-to-br from-[#1E3A8A] via-blue-900 to-indigo-950 text-white text-left overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg shrink-0">
              <div className="h-full w-full rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                JS
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  Job Sarkari Hub
                </h3>
                <span className="bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 fill-emerald-400 text-slate-950" />
                  VERIFIED HUB
                </span>
              </div>
              <p className="text-xs text-blue-200">
                {isHindi 
                  ? 'भारत का सबसे भरोसेमंद सरकारी नौकरी, एडमिट कार्ड व रिजल्ट पोर्टल' 
                  : 'India\'s #1 Trusted Sarkari Job, Admit Card & Result Portal'}
              </p>
            </div>
          </div>

          {/* Follow Stats & Quick Follow Button */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Users className="h-4 w-4 text-amber-300" />
              <span className="font-bold text-white text-sm">
                {followerCount.toLocaleString()}
              </span>
              <span className="text-blue-300">
                {isHindi ? 'अभ्यर्थी जुड़े हैं' : 'Active Followers'}
              </span>
            </div>

            {/* Main Toggle Follow Button */}
            <button
              type="button"
              onClick={() => {
                onToggleFollow();
                if (!isFollowed) {
                  triggerToast('🎉 You are now following Job Sarkari Hub! Notifications enabled.');
                } else {
                  triggerToast('Unfollowed Job Sarkari Hub.');
                }
              }}
              className={`px-5 py-2.5 rounded-2xl font-black text-xs transition cursor-pointer flex items-center gap-2 shadow-lg ${
                isFollowed
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 ring-2 ring-emerald-300/40'
                  : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-amber-400/25 ring-2 ring-amber-300/50 active:scale-95 animate-pulse'
              }`}
            >
              {isFollowed ? (
                <>
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>{isHindi ? 'Following (फॉलो किया)' : '✓ Following'}</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 stroke-[2.5]" />
                  <span>{isHindi ? '+ Follow करें' : '+ Follow Job Hub'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Channels List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3 bg-slate-50/70">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-black text-slate-700 uppercase font-mono tracking-wider">
              {isHindi ? '📢 आधिकारिक सोशल चैनल्स (Official Channels)' : '📢 Official Community Channels'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">1-Click Join</span>
          </div>

          {channels.map((ch) => (
            <div 
              key={ch.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 p-1">{ch.icon}</span>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {isHindi ? ch.hindiName : ch.name}
                    </h4>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${ch.badgeBg}`}>
                      {ch.members}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {ch.description}
                  </p>
                </div>
              </div>

              <a
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerToast(`🚀 Opening official ${ch.name}...`)}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-center whitespace-nowrap transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${ch.color}`}
              >
                <span>{ch.actionText}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}

          {/* Browser Notification Fast Enable Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 p-4 rounded-2xl flex items-center justify-between gap-3 mt-4 text-left">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Bell className="h-4.5 w-4.5 animate-bounce" />
              </div>
              <div>
                <h5 className="text-xs font-black text-slate-900">
                  {isHindi ? 'वेबसाइट पुश नोटिफिकेशन्स' : 'Instant Web Notifications'}
                </h5>
                <p className="text-[10.5px] text-slate-600">
                  {isHindi ? 'ब्राउज़र में नए एडमिट कार्ड व रिजल्ट का नोटिफिकेशन पाएं' : 'Get notified immediately when new Sarkari Results are declared'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                if ('Notification' in window) {
                  Notification.requestPermission().then((perm) => {
                    if (perm === 'granted') {
                      triggerToast('🔔 Notifications granted! You will receive live alerts.');
                    } else {
                      triggerToast('⚠️ Notification permission was not granted.');
                    }
                  });
                } else {
                  triggerToast('🔔 Instant notification alerts enabled for this device!');
                }
              }}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer whitespace-nowrap"
            >
              {isHindi ? 'ऑन करें' : 'Turn On'}
            </button>
          </div>
        </div>

        {/* Footer with Share Link */}
        <div className="p-4 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>2.8 Lakh+ Students trust Job Sarkari Hub</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copiedLink ? (isHindi ? 'कॉपी हुआ!' : 'Copied!') : (isHindi ? 'लिंक शेयर करें' : 'Share Portal')}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
            >
              {isHindi ? 'बंद करें' : 'Done'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
