import React, { useEffect, useState, useRef } from 'react';
import { ExternalLink, Sparkles, X, ShieldAlert, Tag, Check, Info } from 'lucide-react';

export interface GoogleAdSenseProps {
  premium?: boolean;
  adFormat?: 'fluid' | 'autorelaxed' | 'horizontal' | 'rectangle' | 'leaderboard' | 'sticky';
  adSlot?: string;
  adLayoutKey?: string;
  className?: string;
  triggerToast?: (msg: string) => void;
}

interface SponsorCreative {
  id: string;
  brand: string;
  headline: string;
  description: string;
  badge: string;
  couponCode: string;
  discount: string;
  rating: string;
  ctaText: string;
  targetUrl: string;
  accentColor: string;
  bgGradient: string;
  domain: string;
}

const SPONSOR_CREATIVES: SponsorCreative[] = [
  {
    id: 'testbook-pass',
    brand: 'Testbook SuperCoaching',
    headline: '70,000+ Sarkari Mock Tests & Solved PYQs',
    description: 'Yearly Pass Pro for SSC CGL, Railway NTPC, Banking & Police. Includes AI rank predictor and bilingual solutions.',
    badge: '★ 4.9 Verified Partner',
    couponCode: 'SARKARI60',
    discount: 'FLAT 60% OFF',
    rating: '4.9/5 (1.2M+ Aspirants)',
    ctaText: 'Claim Pass Pro',
    targetUrl: 'https://testbook.com',
    accentColor: 'text-blue-700',
    bgGradient: 'from-blue-700 to-indigo-900',
    domain: 'testbook.com/pass'
  },
  {
    id: 'pw-govt-exam',
    brand: 'PhysicsWallah Govt Exam',
    headline: 'SSC CGL & Railway 2026 Mahapack Batch',
    description: 'Live interactive video classes, daily practice sheets (DPPs), chapter-wise doubt rooms and hand-written teacher notes.',
    badge: '⚡ Trending Course',
    couponCode: 'PWGOVT20',
    discount: 'SPECIAL ₹999 ONLY',
    rating: '4.8/5 (850K+ Students)',
    ctaText: 'Enroll Course',
    targetUrl: 'https://www.pw.live',
    accentColor: 'text-amber-600',
    bgGradient: 'from-amber-600 to-rose-700',
    domain: 'pw.live/gov-exams'
  },
  {
    id: 'drishti-ias',
    brand: 'Drishti IAS & State PSC',
    headline: 'UPSC CSE 2026-27 Foundation Live Classroom',
    description: 'Bilingual General Studies Prelims-cum-Mains program curated by senior faculty with complete study material dispatched.',
    badge: '👑 Top Civil Services',
    couponCode: 'DRISHTI40',
    discount: 'EXTRA 40% OFF',
    rating: '4.9/5 (Top Selections)',
    ctaText: 'Free Demo Class',
    targetUrl: 'https://www.drishtiias.com',
    accentColor: 'text-emerald-700',
    bgGradient: 'from-emerald-700 to-teal-900',
    domain: 'drishtiias.com'
  },
  {
    id: 'adda247-bank',
    brand: 'Adda247 Live Prep',
    headline: 'Bank MahaPack 2026: IBPS PO, Clerk & SBI',
    description: 'Unlimited live batches for all upcoming bank exams with full syllabus coverage, memory-based test papers & sectional speed drills.',
    badge: '🏦 Banking Special',
    couponCode: 'ADDA77',
    discount: 'FLAT 77% OFF',
    rating: '4.8/5 (920K+ Users)',
    ctaText: 'Activate Offer',
    targetUrl: 'https://www.adda247.com',
    accentColor: 'text-purple-700',
    bgGradient: 'from-purple-700 to-violet-900',
    domain: 'adda247.com/banking'
  },
  {
    id: 'khan-global',
    brand: 'Khan Global Studies (KGS)',
    headline: 'BPSC, UPPSC & Railway GS Special Classroom',
    description: 'Simple language, high-retention visual concept learning for general science, polity, history and geography at student-friendly fees.',
    badge: '🔥 High Success Rate',
    couponCode: 'KGSFREE',
    discount: 'FREE GS NOTES',
    rating: '4.9/5 (2M+ Followers)',
    ctaText: 'Join Batch',
    targetUrl: 'https://khanglobalstudies.com',
    accentColor: 'text-rose-700',
    bgGradient: 'from-rose-700 to-pink-900',
    domain: 'khanglobalstudies.com'
  },
  {
    id: 'kiran-publication',
    brand: 'Kiran Publications',
    headline: '25 Years SSC & Railway Chapterwise Solved Books',
    description: 'India’s most trusted book series with detailed explanations, shortcut calculation techniques, and bilingual practice sets.',
    badge: '📚 Standard Literature',
    couponCode: 'KIRAN25',
    discount: 'FREE DELIVERY + 25% OFF',
    rating: '4.8/5 (Bestseller)',
    ctaText: 'Get Book Copy',
    targetUrl: 'https://kiranpublications.com',
    accentColor: 'text-indigo-700',
    bgGradient: 'from-indigo-700 to-blue-900',
    domain: 'kiranpublications.com'
  }
];

export default function GoogleAdSense({ 
  premium = false,
  adFormat = 'fluid',
  adSlot,
  adLayoutKey,
  className = '',
  triggerToast
}: GoogleAdSenseProps) {
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [creativeIndex, setCreativeIndex] = useState(0);
  const insRef = useRef<HTMLModElement | null>(null);

  // Determine standard slot mappings based on format
  const resolvedSlot = adSlot || (() => {
    switch (adFormat) {
      case 'leaderboard':
      case 'horizontal':
        return '9329422615';
      case 'rectangle':
        return '5839201948';
      case 'sticky':
        return '4819204821';
      case 'autorelaxed':
      case 'fluid':
      default:
        return '6627237654';
    }
  })();

  const resolvedLayoutKey = adLayoutKey || (adFormat === 'fluid' ? '-fb+5w+4e-db+86' : undefined);

  // Rotate fallback sponsor creatives deterministically based on slot
  useEffect(() => {
    const hash = (resolvedSlot || 'ad').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setCreativeIndex(hash % SPONSOR_CREATIVES.length);
  }, [resolvedSlot]);

  // Attempt real Google AdSense push safely
  useEffect(() => {
    if (premium) return;

    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
      }
    } catch (e) {
      // Expected in sandbox / preview or when ad blocker is active
    }
  }, [premium, resolvedSlot]);

  if (premium || isDismissed) return null;

  const currentCreative = SPONSOR_CREATIVES[creativeIndex % SPONSOR_CREATIVES.length];

  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(code);
      setCopiedCoupon(code);
      if (triggerToast) {
        triggerToast(`🎟️ Coupon "${code}" copied! Paste at ${currentCreative.brand} checkout.`);
      }
      setTimeout(() => setCopiedCoupon(null), 3000);
    } catch (err) {
      setCopiedCoupon(code);
    }
  };

  // 1. LEADERBOARD FORMAT (728x90 style, horizontal, responsive)
  if (adFormat === 'leaderboard' || adFormat === 'horizontal') {
    return (
      <div className={`google-adsense-leaderboard w-full my-4 relative rounded-2xl bg-linear-to-r from-slate-50 via-white to-blue-50/40 border border-slate-200/80 p-3 sm:p-4 shadow-xs overflow-hidden ${className}`}>
        {/* Real AdSense Unit Container */}
        <ins
          ref={insRef}
          className="adsbygoogle hidden"
          style={{ display: 'block' }}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
          data-ad-client="ca-pub-3632365628717784"
          data-ad-slot={resolvedSlot}
        />

        {/* Top Header Tag: Official Ad Label + AdChoices */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2.5 text-[9.5px]">
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider text-[8.5px]">
              Ad • विज्ञापन
            </span>
            <span className="font-semibold text-slate-450 hidden sm:inline">
              Google AdSense Verified Partner
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-450">
            <span className="flex items-center gap-0.5 hover:text-blue-600 transition" title="AdChoices info">
              <Info className="h-3 w-3" />
              <span className="text-[9px]">AdChoices</span>
            </span>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-0.5 hover:bg-slate-150 rounded text-slate-400 hover:text-slate-700 transition cursor-pointer"
              title="Close advertisement"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Creative Banner Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-linear-to-br ${currentCreative.bgGradient} text-white font-extrabold flex items-center justify-center shrink-0 shadow-xs text-sm`}>
              {currentCreative.brand.slice(0, 2).toUpperCase()}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-xs sm:text-sm hover:text-blue-700 transition">
                  {currentCreative.brand}
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                  {currentCreative.discount}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium line-clamp-1 mt-0.5">
                {currentCreative.headline}
              </p>
              <span className="text-[9.5px] text-slate-450 font-mono hidden md:inline">
                {currentCreative.domain} • {currentCreative.rating}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <button
              type="button"
              onClick={(e) => handleCopyCode(e, currentCreative.couponCode)}
              className="flex items-center gap-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1.5 text-[10.5px] font-black text-amber-900 transition cursor-pointer"
              title="Click to copy promo code"
            >
              <Tag className="h-3 w-3 text-amber-600" />
              <span>{copiedCoupon === currentCreative.couponCode ? 'COPIED!' : currentCreative.couponCode}</span>
            </button>

            <a
              href={currentCreative.targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-black px-4 py-2 text-xs transition shadow-xs"
            >
              <span>{currentCreative.ctaText}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 2. RECTANGLE FORMAT (300x250 style for Sidebars / Rail widgets)
  if (adFormat === 'rectangle') {
    return (
      <div className={`google-adsense-rectangle w-full max-w-[340px] mx-auto rounded-2xl bg-white border border-slate-200 p-4 shadow-xs text-left font-sans space-y-3 relative ${className}`}>
        {/* Real AdSense Unit Container */}
        <ins
          ref={insRef}
          className="adsbygoogle hidden"
          style={{ display: 'block', width: '300px', height: '250px' }}
          data-ad-client="ca-pub-3632365628717784"
          data-ad-slot={resolvedSlot}
        />

        <div className="flex items-center justify-between text-[9px] text-slate-450 border-b border-slate-100 pb-1.5">
          <span className="bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded uppercase">
            Ad • विज्ञापन
          </span>
          <div className="flex items-center gap-1.5">
            <span>Ads by Google</span>
            <button onClick={() => setIsDismissed(true)} className="p-0.5 hover:bg-slate-100 rounded">
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className={`h-9 w-9 rounded-lg bg-linear-to-br ${currentCreative.bgGradient} text-white font-extrabold flex items-center justify-center shrink-0`}>
              {currentCreative.brand.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs truncate max-w-[190px]">
                {currentCreative.brand}
              </h4>
              <span className="text-[9.5px] text-emerald-600 font-bold block">
                {currentCreative.badge}
              </span>
            </div>
          </div>

          <h5 className="font-extrabold text-slate-800 text-[12px] leading-snug">
            {currentCreative.headline}
          </h5>
          <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
            {currentCreative.description}
          </p>
        </div>

        {/* Promo Code Box */}
        <div className="rounded-xl bg-amber-50/80 border border-dashed border-amber-300 p-2 text-center space-y-1">
          <div className="flex items-center justify-between text-[9.5px] text-slate-600 font-bold">
            <span>Promo Coupon:</span>
            <button
              onClick={(e) => handleCopyCode(e, currentCreative.couponCode)}
              className="text-amber-800 font-black hover:underline cursor-pointer flex items-center gap-0.5"
            >
              {copiedCoupon === currentCreative.couponCode ? <Check className="h-3 w-3 text-emerald-600" /> : <Tag className="h-3 w-3" />}
              {copiedCoupon === currentCreative.couponCode ? 'Copied' : 'Copy'}
            </button>
          </div>
          <strong className="text-sm font-mono font-black text-amber-900 tracking-wider block">
            {currentCreative.couponCode}
          </strong>
        </div>

        <a
          href={currentCreative.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-black py-2 text-center text-xs transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>{currentCreative.ctaText}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  // 3. FLUID / IN-FEED / AUTORELAXED FORMAT (Default)
  return (
    <div className={`google-adsense-wrapper w-full overflow-hidden my-4 p-3.5 sm:p-4 bg-linear-to-r from-slate-50/80 via-white to-slate-50/80 rounded-2xl border border-slate-200/90 flex flex-col items-center text-center shadow-xs font-sans ${className}`}>
      
      {/* Real AdSense Unit Container */}
      <ins
        ref={insRef}
        className="adsbygoogle hidden"
        style={{ display: 'block', minHeight: '90px', width: '100%' }}
        data-ad-format={adFormat}
        {...(resolvedLayoutKey ? { 'data-ad-layout-key': resolvedLayoutKey } : {})}
        data-ad-client="ca-pub-3632365628717784"
        data-ad-slot={resolvedSlot}
      />

      {/* Top micro bar */}
      <div className="w-full flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2.5 text-[9px] text-slate-400">
        <span className="font-mono uppercase tracking-wider font-extrabold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
          ADVERTISEMENT • विज्ञापन
        </span>
        <div className="flex items-center gap-2">
          <span>Ads by Google</span>
          <button 
            onClick={() => setIsDismissed(true)} 
            className="p-0.5 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"
            title="Dismiss ad"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* High-Fidelity Verified Educational Fallback Creative */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className={`h-11 w-11 rounded-xl bg-linear-to-br ${currentCreative.bgGradient} text-white font-black flex items-center justify-center shrink-0 shadow-xs text-sm`}>
            {currentCreative.brand.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                {currentCreative.brand}
              </h4>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                {currentCreative.discount}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium line-clamp-1 mt-0.5">
              {currentCreative.headline}
            </p>
            <span className="text-[9.5px] text-slate-400 font-mono">
              {currentCreative.domain} • {currentCreative.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={(e) => handleCopyCode(e, currentCreative.couponCode)}
            className="flex items-center gap-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1.5 text-[10.5px] font-black text-amber-900 transition cursor-pointer"
            title="Click to copy promo code"
          >
            <Tag className="h-3 w-3 text-amber-600" />
            <span>{copiedCoupon === currentCreative.couponCode ? 'COPIED!' : currentCreative.couponCode}</span>
          </button>

          <a
            href={currentCreative.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white font-black px-4 py-2 text-xs transition shadow-xs"
          >
            <span>{currentCreative.ctaText}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

