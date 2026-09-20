import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, ExternalLink, ShieldCheck, ChevronRight, CheckCircle, Award, Sparkles } from 'lucide-react';
import { SscLiveNotice, UpscLiveNotice } from '../types';

interface GovPortalsSyncBarProps {
  locale?: string;
  onOpenSscHub: () => void;
  onOpenUpscHub: () => void;
  onQuickSscSync: () => void;
  onQuickUpscSync: () => void;
  onQuickSyncAll?: () => void;
  isSscSyncing?: boolean;
  isUpscSyncing?: boolean;
  latestSscNotice?: SscLiveNotice | null;
  latestUpscNotice?: UpscLiveNotice | null;
}

export default function GovPortalsSyncBar({
  locale = 'en',
  onOpenSscHub,
  onOpenUpscHub,
  onQuickSscSync,
  onQuickUpscSync,
  onQuickSyncAll,
  isSscSyncing = false,
  isUpscSyncing = false,
  latestSscNotice,
  latestUpscNotice
}: GovPortalsSyncBarProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(45);
  const [activePortalTab, setActivePortalTab] = useState<'upsc' | 'ssc'>('upsc');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 45 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isSyncingAny = isSscSyncing || isUpscSyncing;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 shadow-md py-2 px-3 sm:px-4">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans">
        
        {/* Left: Portals Switcher & Live Indicator */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* UPSC Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('upsc');
              onOpenUpscHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'upsc'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-amber-400 -ml-3.5"></span>
            <span>UPSC.GOV.IN LIVE</span>
          </button>

          {/* SSC Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('ssc');
              onOpenSscHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'ssc'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/40 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SSC.GOV.IN LIVE</span>
          </button>

          {/* Active Ticker */}
          <div className="hidden md:flex items-center gap-1.5 text-[11px] border-l border-slate-700 pl-2.5 max-w-lg lg:max-w-xl truncate">
            {activePortalTab === 'upsc' ? (
              latestUpscNotice ? (
                <div className="flex items-center gap-1.5 truncate text-amber-200">
                  <span className="bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    UPSC {latestUpscNotice.category}
                  </span>
                  <span className="truncate">{latestUpscNotice.title}</span>
                </div>
              ) : (
                <span className="text-slate-400 truncate">
                  {locale === 'hi' ? '🏛️ संघ लोक सेवा आयोग (UPSC) लाइव मॉनिटर सक्रिय' : '🏛️ Union Public Service Commission live auto-monitor active'}
                </span>
              )
            ) : (
              latestSscNotice ? (
                <div className="flex items-center gap-1.5 truncate text-blue-200">
                  <span className="bg-blue-400/20 text-blue-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    SSC {latestSscNotice.category}
                  </span>
                  <span className="truncate">{latestSscNotice.title}</span>
                </div>
              ) : (
                <span className="text-slate-400 truncate">
                  {locale === 'hi' ? '⚡ कर्मचारी चयन आयोग (SSC) लाइव मॉनिटर सक्रिय' : '⚡ Staff Selection Commission live auto-monitor active'}
                </span>
              )
            )}
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
            Auto-Sync in: <strong className="text-amber-300">{secondsRemaining}s</strong>
          </span>

          {/* Quick Sync UPSC Button */}
          <button
            onClick={onQuickUpscSync}
            disabled={isUpscSyncing}
            className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest from https://www.upsc.gov.in/"
          >
            <RefreshCw className={`h-3 w-3 ${isUpscSyncing ? 'animate-spin' : ''}`} />
            <span>{locale === 'hi' ? '⚡ UPSC सिंक' : '⚡ Sync UPSC'}</span>
          </button>

          {/* Quick Sync SSC Button */}
          <button
            onClick={onQuickSscSync}
            disabled={isSscSyncing}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-bold px-2 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest from https://ssc.gov.in/"
          >
            <RefreshCw className={`h-3 w-3 ${isSscSyncing ? 'animate-spin' : ''}`} />
            <span>SSC</span>
          </button>

          {/* Direct Link to Hubs */}
          <button
            onClick={onOpenUpscHub}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-white/15 cursor-pointer"
          >
            <span>{locale === 'hi' ? 'UPSC हब' : 'UPSC Hub'}</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
