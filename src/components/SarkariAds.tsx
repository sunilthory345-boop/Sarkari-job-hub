import React, { useState } from 'react';
import { 
  Megaphone, ExternalLink, X, Sparkles, Percent, 
  BookOpen, Trophy, Compass, ShieldOff, Info, ArrowRight,
  Sparkle, ShoppingBag, ThumbsUp, ShieldCheck
} from 'lucide-react';
import { UserProfile } from '../types';

interface AdItem {
  id: string;
  title: string;
  sponsor: string;
  description: string;
  discountBadge?: string;
  category: 'Coaching' | 'Test Series' | 'Study Books' | 'Tech Gadgets';
  ctaText: string;
  imageColor: string; // Tailwind bg class for a neat aesthetic background
  avatarText: string;
  destUrl: string;
  rating: number;
}

interface SarkariAdsProps {
  user: UserProfile;
  onGoPremium: () => void;
  triggerToast: (msg: string) => void;
  layout?: 'banner' | 'sidebar' | 'inline';
}

const ASPIRANT_ADS: AdItem[] = [
  {
    id: 'ad-ras-upsc',
    title: "IAS & RAS 2026 Complete GS Prelims Crash Course",
    sponsor: "Drishti IAS & Rajasthan Academy",
    description: "Get daily live video tutorials by ex-bureaucrats, premium bilingual PDFs, and full syllabus covering mewar history plus national governance. 200+ aspirants selected last session.",
    discountBadge: "BOGO Flat 40% OFF",
    category: 'Coaching',
    ctaText: "Enroll Free Trial",
    imageColor: "from-blue-600 via-indigo-700 to-indigo-900",
    avatarText: "डी",
    destUrl: "https://www.drishtiias.com",
    rating: 4.8
  },
  {
    id: 'ad-maths-ssc',
    title: "SSC CGL Advanced Arithmetic Math Video Sets",
    sponsor: "Sarkari Quantitative Hub",
    description: "Master fast formula tracking, algebra shortcuts, and visual geometry tricks specifically compiled for upcoming SSC tier-1 & tier-2 selections. Live weekly doubts cleared.",
    discountBadge: "FREE PDFs Inside",
    category: 'Test Series',
    ctaText: "Claim Coupon",
    imageColor: "from-emerald-600 to-teal-800",
    avatarText: "MA",
    destUrl: "https://ssc.nic.in",
    rating: 4.9
  },
  {
    id: 'ad-gk-ledger',
    title: "10,000+ High-Yield Static GK Combined MCQ Bank",
    sponsor: "Kiran Publication House (Authorized)",
    description: "Sovereign quality practice book containing 15 years solved papers including detailed answers & footnotes. Best-suited for RPSC, Railway NTPC, Police Sub-Inspectors & Civil Services.",
    discountBadge: "Free English & Hindi Med.",
    category: 'Study Books',
    ctaText: "See Book Samples",
    imageColor: "from-amber-600 via-orange-600 to-rose-700",
    avatarText: "कि",
    destUrl: "http://kiranpublications.com",
    rating: 4.7
  },
  {
    id: 'ad-smart-calculator',
    title: "Online Exam Timer & Formula Tracker Widget",
    sponsor: "PrepTech EduTech Solutions",
    description: "Stay in-sync with standard time parameters using a browser clock containing negative marking simulation, performance tracking metrics, and study streak calendars.",
    discountBadge: "100% Free Tool",
    category: 'Tech Gadgets',
    ctaText: "Install Extension",
    imageColor: "from-purple-600 to-purple-900",
    avatarText: "PT",
    destUrl: "#",
    rating: 4.6
  }
];

export default function SarkariAds({
  user,
  onGoPremium,
  triggerToast,
  layout = 'banner'
}: SarkariAdsProps) {
  
  const [activeAdIndex, setActiveAdIndex] = useState(0);
  const [hiddenAdIds, setHiddenAdIds] = useState<string[]>([]);
  const [showReportModal, setShowReportModal] = useState<string | null>(null);
  const [showOfferModal, setShowOfferModal] = useState<AdItem | null>(null);

  // If user is premium, we show a highly satisfying Ad-blocker visual instead of active ads!
  if (user.premiumUser) {
    if (layout === 'sidebar') {
      return (
        <div className="bg-slate-900 text-white rounded-2xl border border-emerald-500/30 p-4.5 space-y-3 relative overflow-hidden self-start font-sans text-xs shadow-md">
          <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 opacity-10 pointer-events-none">
            <ShieldCheck className="h-28 w-28 text-emerald-400 rotate-12" />
          </div>
          
          <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold uppercase tracking-wider text-[10px]">
            <Sparkles className="h-4 w-4 animate-pulse text-amber-400" />
            Ad-Free Candidate Experience
          </div>
          
          <div className="space-y-1 text-left">
            <h4 className="font-extrabold text-slate-100 text-[12.5px]">Sarkari AdBlocker Active</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Congratulations **{user.name || 'Aspirant'}**! As a Premium Gold user, all promotional campaigns, e-coaching spam, and side-banners are completely hidden to maximize focus.
            </p>
          </div>

          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-full rounded-full"></div>
          </div>
          
          <div className="text-[9.5px] text-emerald-300 font-bold block text-center">
            🔒 100% Focus Mode Active • Zero Ads
          </div>
        </div>
      );
    }

    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-left animate-fade-in shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 text-white rounded-xl">
            <ShieldCheck className="h-5 w-5 animate-bounce" />
          </div>
          <div>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[9.5px] font-extrabold uppercase font-mono">
              JobSarkari VIP Shield
            </span>
            <h4 className="font-extrabold text-slate-850 text-[13px] mt-1">Premium Ad-Blocker Activated</h4>
            <p className="text-slate-500 text-[11px] mt-0.5">
              Enjoy 100% uninterrupted study. All banner advertisements and video pitch integrations are blocked on your account (**{user.email}**).
            </p>
          </div>
        </div>

        <button 
          onClick={() => triggerToast("💖 Thank you for supporting the JobSarkari mission as a VIP Gold member!")}
          className="bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-[11px] px-3.5 py-2 rounded-xl transition shadow-xs cursor-pointer"
        >
          Manage VIP Settings
        </button>
      </div>
    );
  }

  // Filter out any hidden ads
  const visibleAds = ASPIRANT_ADS.filter(ad => !hiddenAdIds.includes(ad.id));

  if (visibleAds.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 text-center text-xs text-slate-500 font-sans">
        <p className="font-bold">You have dismissed all ongoing educational advertisements.</p>
        <button 
          onClick={() => {
            setHiddenAdIds([]);
            triggerToast("🔁 Revitalized local sponsorship feed. Thank you!");
          }} 
          className="text-blue-600 underline font-extrabold mt-1.5 focus:outline-hidden block mx-auto hover:text-blue-800"
        >
          Reset and show sponsors
        </button>
      </div>
    );
  }

  const currentAd = visibleAds[activeAdIndex % visibleAds.length];

  const handleNextAd = () => {
    setActiveAdIndex(prev => prev + 1);
  };

  const handleDismissAd = (adId: string) => {
    setHiddenAdIds(prev => [...prev, adId]);
    triggerToast("✨ Advertisement dismissed. We will try showing alternative sponsors.");
  };

  const handleReportCategory = (adId: string, reason: string) => {
    setHiddenAdIds(prev => [...prev, adId]);
    setShowReportModal(null);
    triggerToast(`🚫 Ad blocked. Feedback received: "${reason}". Updates applied.`);
  };

  const handleClaimOffer = (ad: AdItem) => {
    setShowOfferModal(ad);
    triggerToast(`🎟️ VIP Promo for "${ad.sponsor}" opened! Claim details below.`);
  };

  // RENDER CORRESPONDING LAYOUT
  if (layout === 'sidebar') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-4.5 space-y-4 shadow-xs text-left text-xs font-sans relative">
        <span className="absolute right-3 top-3 text-[9px] bg-slate-100 text-slate-450 font-mono tracking-widest px-1.5 py-0.5 rounded font-extrabold uppercase">
          Sponsored Ad
        </span>

        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${currentAd.imageColor} text-white font-extrabold flex items-center justify-center`}>
              {currentAd.avatarText}
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-700 block truncate max-w-[130px]">{currentAd.sponsor}</span>
              <span className="text-[9px] text-[#1E3A8A] font-extrabold flex items-center gap-0.5">
                ★ {currentAd.rating} Verified Partner
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {currentAd.discountBadge && (
            <span className="inline-block bg-orange-50 border border-orange-200 text-orange-700 px-2 py-0.5 rounded font-extrabold text-[9.5px]">
              🔥 {currentAd.discountBadge}
            </span>
          )}
          <h4 className="font-extrabold text-slate-900 leading-snug text-xs hover:text-[#1E3A8A] transition">
            {currentAd.title}
          </h4>
          <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-3">
            {currentAd.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowReportModal(currentAd.id)}
            className="text-slate-400 hover:text-slate-600 font-bold transition flex items-center justify-center gap-0.5 py-1.5 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            Hide Sponsor
          </button>
          
          <button
            onClick={() => handleClaimOffer(currentAd)}
            className="bg-[#1E3A8A] hover:bg-blue-800 text-white font-bold py-1.5 px-2.5 rounded-lg text-center transition flex items-center justify-center gap-1 cursor-pointer"
          >
            {currentAd.ctaText}
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Info Line prompting for premium */}
        <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-100 text-center space-y-1.5">
          <p className="text-[9.5px] text-amber-800 leading-normal font-semibold">
            Tired of study distractions? Upgrading clears all local academy banners instantly.
          </p>
          <button
            onClick={onGoPremium}
            className="text-[9.5px] font-extrabold text-[#1E3A8A] hover:underline flex items-center gap-1 justify-center block mx-auto cursor-pointer"
          >
            Upgrade to Ad-Free Premium <Sparkle className="h-3 w-3 text-amber-500 animate-pulse" />
          </button>
        </div>

        {/* Ad report modal simulator inside card */}
        {showReportModal === currentAd.id && (
          <div className="absolute inset-x-0 bottom-0 bg-white border-t border-slate-200 p-3 rounded-b-2xl space-y-2 animate-slide-in">
            <div className="flex justify-between items-center pb-1 border-b border-slate-100">
              <strong className="text-slate-705 text-[10.5px]">Why block this partner?</strong>
              <button onClick={() => setShowReportModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-1 text-[10px]">
              {['Not relevant to my current exam', 'Already purchased this course', 'Too intrusive banner'].map((reason) => (
                <button
                  key={reason}
                  onClick={() => handleReportCategory(currentAd.id, reason)}
                  className="w-full text-left p-1.5 hover:bg-slate-50 rounded text-slate-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  🚫 {reason}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Claim Reward Popup Modal inside card */}
        {showOfferModal && (
          <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-100">
              <div className="flex justify-between items-start">
                <div className="p-2.5 bg-blue-50 text-blue-800 rounded-xl">
                  <Megaphone className="h-5 w-5 animate-bounce" />
                </div>
                <button onClick={() => setShowOfferModal(null)} className="p-1.5 hover:bg-slate-100 rounded-full cursor-pointer">
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div className="space-y-1.5 text-left">
                <span className="text-[9px] bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded uppercase">Verified Sponsor Package</span>
                <h3 className="font-extrabold text-slate-900 text-base leading-snug">{showOfferModal.title}</h3>
                <p className="text-slate-400 text-[10.5px] font-mono">By {showOfferModal.sponsor}</p>
                <p className="text-slate-600 text-[11.5px] leading-relaxed mt-1.5">{showOfferModal.description}</p>
              </div>

              <div className="bg-amber-500/10 border border-dashed border-amber-400/40 rounded-xl p-3 text-center space-y-1">
                <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Your Exclusive coupon code:</span>
                <strong className="text-orange-700 font-mono text-base tracking-widest block font-extrabold">SARKARIVIP25</strong>
                <span className="text-[9px] text-slate-400 block font-semibold">Copy and paste during payment at sponsor portal for Flat 25% off + Free PYQ mock booklets</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowOfferModal(null)}
                  className="w-full rounded-xl border border-slate-200 py-2 font-bold text-slate-500 text-[11px] hover:bg-slate-50 transition"
                >
                  Close Window
                </button>
                <a
                  href={showOfferModal.destUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-extrabold py-2 text-center text-[11px] transition flex items-center justify-center gap-1"
                >
                  Visit Sponsor <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    // DEFAULT: HERO BANNER / INLINE AD (WIDE)
    <div className="bg-white rounded-3xl border border-slate-200 p-4.5 sm:p-5 shadow-xs text-left max-w-4xl mx-auto space-y-4 font-sans text-xs relative overflow-hidden">
      
      {/* Absolute top badge indicators */}
      <div className="flex justify-between items-center gap-4 pb-2 border-b border-slate-100">
        <span className="inline-flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md text-[10px] font-extrabold text-amber-800 uppercase tracking-widest border border-amber-200">
          <Megaphone className="h-3.5 w-3.5" /> Special Sponsor Content (एकेडमी स्पॉन्सरशिप)
        </span>

        <div className="flex items-center gap-2">
          {/* Ad carousel switchers */}
          <button 
            onClick={handleNextAd} 
            className="text-[10.5px] font-bold text-[#1E3A8A] hover:underline focus:outline-hidden cursor-pointer"
            title="Next offer"
          >
            Next Sponsor →
          </button>
          
          <button 
            onClick={() => setShowReportModal(currentAd.id)} 
            className="p-1 hover:bg-slate-50 text-slate-400 hover:text-slate-700 rounded transition cursor-pointer"
            title="Hide this category"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-12 items-center">
        
        {/* Banner graphics box */}
        <div className="md:col-span-3">
          <div className={`rounded-2xl p-4 bg-gradient-to-br ${currentAd.imageColor} text-white space-y-3 shadow-xs flex flex-col justify-between h-32`}>
            <div className="flex justify-between items-start">
              <span className="bg-white/20 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase backdrop-blur-xs">
                {currentAd.category}
              </span>
              <span className="text-white/80 text-[10px] font-bold">★ {currentAd.rating}</span>
            </div>
            
            <div className="space-y-0.5">
              <h5 className="font-extrabold text-[12px] truncate">{currentAd.sponsor}</h5>
              <p className="text-[9px] text-slate-150 uppercase tracking-wider font-extrabold">{currentAd.discountBadge || 'Pre-Verified'}</p>
            </div>
          </div>
        </div>

        {/* Sponsor written offer texts */}
        <div className="md:col-span-6 space-y-1 text-left">
          <div className="flex items-center gap-1.5">
            <span className="bg-red-50 text-red-700 text-[9px] font-extrabold px-1.5 rounded">WEEKLY HOT</span>
            <h4 className="font-extrabold text-slate-900 text-sm">{currentAd.title}</h4>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            {currentAd.description}
          </p>
          <span className="text-[10px] text-slate-400 block font-medium">Verified sponsor partner of Indian JobSarkari Portals • {currentAd.destUrl}</span>
        </div>

        {/* CTA triggers */}
        <div className="md:col-span-3 space-y-2 flex flex-col justify-center">
          <button 
            onClick={() => handleClaimOffer(currentAd)}
            className="w-full bg-[#1E3A8A] hover:bg-blue-800 text-white font-extrabold py-2 px-4 rounded-xl text-center transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/10 cursor-pointer"
          >
            {currentAd.ctaText}
            <ExternalLink className="h-3.5 w-3.5" />
          </button>

          <button 
            onClick={onGoPremium}
            className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border border-slate-200 py-1.5 px-3 rounded-xl transition text-[10.5px] font-semibold text-center cursor-pointer flex items-center justify-center gap-1"
          >
            🌟 Remove All Ads
          </button>
        </div>

      </div>

      {/* Footer promotion disclaimer */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10.5px] text-slate-400">
        <span>Ads by JobSarkari is trusted by 5M+ candidates nationwide as non-intrusive material updates.</span>
        <button 
          onClick={onGoPremium}
          className="text-[#1E3A8A] font-extrabold hover:underline cursor-pointer"
        >
          Premium members search and study with 100% Zero-Ad interruption screen. Learn More
        </button>
      </div>

      {/* Ad report modal */}
      {showReportModal === currentAd.id && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 animate-fade-in z-30">
          <div className="space-y-4 max-w-sm text-center">
            <h4 className="font-extrabold text-[#1E3A8A] text-sm">Tell us why we shouldn't show this ad category?</h4>
            <p className="text-slate-400 text-[11px]">We are dedicated to presenting high-quality content that improves your study cycles.</p>
            
            <div className="flex flex-col gap-2 font-bold text-[11px]">
              {[
                { label: 'Irrelevant coaching / I am prepping other exams', reason: 'irrelevant' },
                { label: 'Intrusive layout or distracting animation text', reason: 'distracting' },
                { label: 'Already enrolled in similar state selection courses', reason: 'purchased' }
              ].map((opt) => (
                <button
                  key={opt.reason}
                  onClick={() => handleReportCategory(currentAd.id, opt.label)}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 py-2 px-3 rounded-xl text-slate-700 text-left transition"
                >
                  🚫 {opt.label}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowReportModal(null)} 
              className="text-slate-400 hover:text-slate-600 font-extrabold text-[10.5px] mt-2 block mx-auto hover:underline"
            >
              Cancel Block
            </button>
          </div>
        </div>
      )}

      {/* Claim Offer popup */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-slate-900/55 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-100 animate-scale-up">
            <div className="flex justify-between items-start">
              <div className="p-2.5 bg-blue-50 text-blue-800 rounded-xl">
                <Megaphone className="h-5 w-5 animate-bounce" />
              </div>
              <button onClick={() => setShowOfferModal(null)} className="p-1.5 hover:bg-slate-100 rounded-full cursor-pointer">
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            <div className="space-y-1.5 text-left">
              <span className="text-[9px] bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded uppercase">Verified Study Partner</span>
              <h3 className="font-extrabold text-slate-900 text-base leading-snug">{showOfferModal.title}</h3>
              <p className="text-slate-400 text-[10.5px] font-mono">Sponsored by {showOfferModal.sponsor}</p>
              <p className="text-slate-600 text-[11.5px] leading-relaxed mt-1.5">{showOfferModal.description}</p>
            </div>

            <div className="bg-amber-500/10 border border-dashed border-amber-400/40 rounded-xl p-3 text-center space-y-1">
              <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Your Exclusive coupon code:</span>
              <strong className="text-orange-700 font-mono text-base tracking-widest block font-extrabold">SARKARIVIP25</strong>
              <span className="text-[9px] text-slate-400 block font-semibold">Copy and paste during payment at partner checkout for Flat 25% discount plus bonus books</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowOfferModal(null)}
                className="w-full rounded-xl border border-slate-200 py-2.5 font-bold text-slate-500 text-[11px] hover:bg-slate-50 transition"
              >
                Go Back
              </button>
              <a
                href={showOfferModal.destUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-extrabold py-2.5 text-center text-[11px] transition flex items-center justify-center gap-1"
              >
                Visit Site <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
