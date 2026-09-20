import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, ExternalLink, ShieldCheck, Bell, ChevronRight, CheckCircle } from 'lucide-react';
import { SscLiveNotice } from '../types';

interface SscLiveSyncBarProps {
  locale?: string;
  onOpenHub: () => void;
  onQuickSync: () => void;
  isSyncing?: boolean;
  latestNotice?: SscLiveNotice | null;
  unreadCount?: number;
}

export default function SscLiveSyncBar({
  locale = 'en',
  onOpenHub,
  onQuickSync,
  isSyncing = false,
  latestNotice,
  unreadCount = 0
}: SscLiveSyncBarProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(45);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 45 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-950 via-[#1E3A8A] to-indigo-950 text-white border-b border-blue-800/80 shadow-md py-2 px-4">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        
        {/* Left: Indicator & Source */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wide shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 -ml-3"></span>
            <span>SSC.GOV.IN LIVE</span>
          </div>

          <span className="hidden sm:inline text-blue-200 text-[11px]">
            {locale === 'hi' ? 'आधिकारिक स्रोत:' : 'Official Source:'} <strong className="text-white hover:underline cursor-pointer"><a href="https://ssc.gov.in/" target="_blank" rel="noopener noreferrer">https://ssc.gov.in/</a></strong>
          </span>

          {/* Quick Notice Headline */}
          {latestNotice && (
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-amber-200 border-l border-blue-700/60 pl-2.5 max-w-xl truncate">
              <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase">
                {latestNotice.category}
              </span>
              <span className="truncate">{latestNotice.title}</span>
            </div>
          )}
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-blue-300 hidden md:inline">
            Auto-Sync in: <strong className="text-amber-300">{secondsRemaining}s</strong>
          </span>

          <button
            onClick={onQuickSync}
            disabled={isSyncing}
            className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Check https://ssc.gov.in/ for new vacancies, admit cards, results, and answer keys"
          >
            <RefreshCw className={`h-3 w-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{locale === 'hi' ? '⚡ तुरंत अपडेट करें' : '⚡ Sync Now'}</span>
          </button>

          <button
            onClick={onOpenHub}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-white/20 cursor-pointer"
          >
            <span>{locale === 'hi' ? 'SSC हब खोलें' : 'SSC Live Monitor'}</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
