import React, { useState } from 'react';
import { Megaphone, ExternalLink, X, ChevronDown, ChevronUp, Tag, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface StickyBottomAdProps {
  user: UserProfile;
  onGoPremium: () => void;
  triggerToast?: (msg: string) => void;
}

export default function StickyBottomAd({
  user,
  onGoPremium,
  triggerToast
}: StickyBottomAdProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // If user has premium gold, the sticky ad is completely removed
  if (user.premiumUser || isDismissed) {
    return null;
  }

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText('SARKARIFLAT40');
      setCopiedCoupon(true);
      if (triggerToast) {
        triggerToast('🎟️ Exclusive Code "SARKARIFLAT40" copied! Flat 40% Off at checkout.');
      }
      setTimeout(() => setCopiedCoupon(false), 3000);
    } catch {
      setCopiedCoupon(true);
    }
  };

  if (isCollapsed) {
    return (
      <div className="fixed bottom-2 left-4 z-40 animate-fade-in font-sans">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-1.5 bg-slate-900/90 text-amber-300 border border-amber-400/30 px-3 py-1.5 rounded-full text-xs font-black shadow-lg backdrop-blur-md hover:bg-slate-900 transition cursor-pointer"
        >
          <Megaphone className="h-3 w-3 text-amber-400 animate-bounce" />
          <span>Sponsor Deal (40% OFF)</span>
          <ChevronUp className="h-3.5 w-3.5 text-slate-300" />
        </button>
      </div>
    );
  }

  return (
    <aside 
      aria-label="Sponsored advertisement banner"
      className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-white py-2 px-3 sm:px-6 shadow-2xl animate-slide-up font-sans"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        
        {/* Left identity & headline */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded tracking-wide uppercase shrink-0">
              AD • विज्ञापन
            </span>
            <div className="h-7 w-7 rounded-lg bg-linear-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-[10px] font-black shrink-0 text-white shadow-xs">
              TS
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-100 truncate max-w-[140px] sm:max-w-none">
                  Testbook SuperCoaching Pass Pro
                </span>
                <span className="hidden md:inline text-[9px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-1.5 rounded">
                  70,000+ Mock Tests
                </span>
              </div>
              <p className="text-[10px] text-slate-400 line-clamp-1 hidden sm:block">
                All India live CBT mock series for SSC CGL, Railway NTPC, Banking & State Exams.
              </p>
            </div>
          </div>

          {/* Mobile Collapse and Close */}
          <div className="flex items-center gap-1 sm:hidden">
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Minimize advertisement"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Close advertisement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 px-2.5 py-1 text-[10.5px] font-black text-amber-300 transition cursor-pointer"
            title="Copy Discount Promo Code"
          >
            <Tag className="h-3 w-3 text-amber-400" />
            <span>{copiedCoupon ? 'COPIED!' : 'CODE: SARKARIFLAT40'}</span>
          </button>

          <a
            href="https://testbook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-black text-[11px] px-3.5 py-1.5 transition flex items-center gap-1 shadow-md shadow-orange-500/20"
          >
            <span>Claim 40% Off</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          {/* Desktop Controls */}
          <div className="hidden sm:flex items-center gap-1 ml-2 border-l border-slate-800 pl-2">
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 text-slate-400 hover:text-white rounded transition cursor-pointer"
              title="Minimize"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 text-slate-400 hover:text-white rounded transition cursor-pointer"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
}
