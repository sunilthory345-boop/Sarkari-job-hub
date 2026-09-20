import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, ExternalLink, ShieldCheck, ChevronRight, CheckCircle, Award, Sparkles, Train, Landmark, Swords, Shield } from 'lucide-react';
import { SscLiveNotice, UpscLiveNotice, RrbLiveNotice, IbpsLiveNotice, SbiLiveNotice, RajLiveNotice, ArmyLiveNotice } from '../types';

interface GovPortalsSyncBarProps {
  locale?: string;
  onOpenSscHub: () => void;
  onOpenUpscHub: () => void;
  onOpenRrbHub: () => void;
  onOpenIbpsHub: () => void;
  onOpenSbiHub: () => void;
  onOpenRajHub: () => void;
  onOpenArmyHub: () => void;
  onQuickSscSync: () => void;
  onQuickUpscSync: () => void;
  onQuickRrbSync: () => void;
  onQuickIbpsSync: () => void;
  onQuickSbiSync: () => void;
  onQuickRajSync: () => void;
  onQuickArmySync: () => void;
  onQuickSyncAll?: () => void;
  isSscSyncing?: boolean;
  isUpscSyncing?: boolean;
  isRrbSyncing?: boolean;
  isIbpsSyncing?: boolean;
  isSbiSyncing?: boolean;
  isRajSyncing?: boolean;
  isArmySyncing?: boolean;
  latestSscNotice?: SscLiveNotice | null;
  latestUpscNotice?: UpscLiveNotice | null;
  latestRrbNotice?: RrbLiveNotice | null;
  latestIbpsNotice?: IbpsLiveNotice | null;
  latestSbiNotice?: SbiLiveNotice | null;
  latestRajNotice?: RajLiveNotice | null;
  latestArmyNotice?: ArmyLiveNotice | null;
}

export default function GovPortalsSyncBar({
  locale = 'en',
  onOpenSscHub,
  onOpenUpscHub,
  onOpenRrbHub,
  onOpenIbpsHub,
  onOpenSbiHub,
  onOpenRajHub,
  onOpenArmyHub,
  onQuickSscSync,
  onQuickUpscSync,
  onQuickRrbSync,
  onQuickIbpsSync,
  onQuickSbiSync,
  onQuickRajSync,
  onQuickArmySync,
  onQuickSyncAll,
  isSscSyncing = false,
  isUpscSyncing = false,
  isRrbSyncing = false,
  isIbpsSyncing = false,
  isSbiSyncing = false,
  isRajSyncing = false,
  isArmySyncing = false,
  latestSscNotice,
  latestUpscNotice,
  latestRrbNotice,
  latestIbpsNotice,
  latestSbiNotice,
  latestRajNotice,
  latestArmyNotice
}: GovPortalsSyncBarProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(45);
  const [activePortalTab, setActivePortalTab] = useState<'army' | 'raj' | 'sbi' | 'ibps' | 'rrb' | 'upsc' | 'ssc'>('army');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 45 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isSyncingAny = isSscSyncing || isUpscSyncing || isRrbSyncing || isIbpsSyncing || isSbiSyncing || isRajSyncing || isArmySyncing;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 shadow-md py-2 px-3 sm:px-4">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans">
        
        {/* Left: Portals Switcher & Live Indicator */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* JOIN INDIAN ARMY Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('army');
              onOpenArmyHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'army'
                ? 'bg-emerald-700/60 text-emerald-200 border-emerald-400/80 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 -ml-3.5"></span>
            <Swords className="h-3 w-3 text-amber-400" />
            <span>ARMY LIVE</span>
          </button>

          {/* RAJASTHAN SSO RECRUITMENT Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('raj');
              onOpenRajHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'raj'
                ? 'bg-amber-600/40 text-amber-300 border-amber-400/70 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-amber-400 -ml-3.5"></span>
            <Landmark className="h-3 w-3 text-amber-400" />
            <span>RAJASTHAN SSO LIVE</span>
          </button>

          {/* SBI.BANK.IN Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('sbi');
              onOpenSbiHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'sbi'
                ? 'bg-sky-600/30 text-sky-300 border-sky-400/60 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
            <Landmark className="h-3 w-3 text-sky-400" />
            <span>SBI.BANK.IN</span>
          </button>

          {/* IBPS Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('ibps');
              onOpenIbpsHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'ibps'
                ? 'bg-blue-600/30 text-blue-300 border-blue-400/60 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
            <Landmark className="h-3 w-3 text-blue-400" />
            <span>IBPS.IN</span>
          </button>

          {/* RRB Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('rrb');
              onOpenRrbHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'rrb'
                ? 'bg-red-600/30 text-red-300 border-red-500/50 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
            <Train className="h-3 w-3 text-red-400" />
            <span>RRB</span>
          </button>

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
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>UPSC</span>
          </button>

          {/* SSC Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('ssc');
              onOpenSscHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'ssc'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SSC</span>
          </button>

          {/* Active Ticker */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] border-l border-slate-700 pl-2.5 max-w-sm 2xl:max-w-md truncate">
            {activePortalTab === 'army' ? (
              latestArmyNotice ? (
                <div className="flex items-center gap-1.5 truncate text-emerald-200">
                  <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    ARMY {latestArmyNotice.trade || latestArmyNotice.category}
                  </span>
                  <span className="truncate">{latestArmyNotice.title}</span>
                </div>
              ) : (
                <span className="text-emerald-200/80 truncate">
                  {locale === 'hi' ? '⚔️ भारतीय सेना (joinindianarmy.nic.in) लाइव मॉनिटर सक्रिय' : '⚔️ Join Indian Army (joinindianarmy.nic.in) live monitor active'}
                </span>
              )
            ) : activePortalTab === 'raj' ? (
              latestRajNotice ? (
                <div className="flex items-center gap-1.5 truncate text-amber-200">
                  <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    RAJ {latestRajNotice.board || latestRajNotice.category}
                  </span>
                  <span className="truncate">{latestRajNotice.title}</span>
                </div>
              ) : (
                <span className="text-amber-200/80 truncate">
                  {locale === 'hi' ? '🏛️ राजस्थान स्टेट रिक्रूटमेंट पोर्टल (recruitment.rajasthan.gov.in) लाइव सक्रिय' : '🏛️ Rajasthan State Recruitment Portal (recruitment.rajasthan.gov.in) live'}
                </span>
              )
            ) : activePortalTab === 'sbi' ? (
              latestSbiNotice ? (
                <div className="flex items-center gap-1.5 truncate text-sky-200">
                  <span className="bg-sky-500/20 text-sky-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    SBI {latestSbiNotice.cadre || latestSbiNotice.category}
                  </span>
                  <span className="truncate">{latestSbiNotice.title}</span>
                </div>
              ) : (
                <span className="text-slate-400 truncate">
                  {locale === 'hi' ? '🏛️ भारतीय स्टेट बैंक (SBI Careers) लाइव मॉनिटर सक्रिय' : '🏛️ State Bank of India (sbi.bank.in) live auto-monitor active'}
                </span>
              )
            ) : activePortalTab === 'ibps' ? (
              latestIbpsNotice ? (
                <div className="flex items-center gap-1.5 truncate text-blue-200">
                  <span className="bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    IBPS {latestIbpsNotice.crpCode || latestIbpsNotice.cadre || latestIbpsNotice.category}
                  </span>
                  <span className="truncate">{latestIbpsNotice.title}</span>
                </div>
              ) : (
                <span className="text-slate-400 truncate">
                  {locale === 'hi' ? '🏦 बैंकिंग कार्मिक चयन संस्थान (IBPS) लाइव मॉनिटर सक्रिय' : '🏦 Banking Personnel Selection (ibps.in) live auto-monitor active'}
                </span>
              )
            ) : activePortalTab === 'rrb' ? (
              latestRrbNotice ? (
                <div className="flex items-center gap-1.5 truncate text-red-200">
                  <span className="bg-red-500/20 text-red-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    RRB {latestRrbNotice.cenNumber || latestRrbNotice.category}
                  </span>
                  <span className="truncate">{latestRrbNotice.title}</span>
                </div>
              ) : (
                <span className="text-slate-400 truncate">
                  {locale === 'hi' ? '🚆 रेलवे भर्ती बोर्ड (RRB) लाइव मॉनिटर सक्रिय' : '🚆 Railway Recruitment Boards live auto-monitor active'}
                </span>
              )
            ) : activePortalTab === 'upsc' ? (
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
                <div className="flex items-center gap-1.5 truncate text-emerald-200">
                  <span className="bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
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
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-[10px] font-mono text-slate-400 hidden lg:inline">
            Auto-Sync: <strong className="text-amber-400">{secondsRemaining}s</strong>
          </span>

          {/* Quick Sync Army Button */}
          <button
            onClick={onQuickArmySync}
            disabled={isArmySyncing}
            className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest Join Indian Army releases from https://joinindianarmy.nic.in/"
          >
            <RefreshCw className={`h-3 w-3 ${isArmySyncing ? 'animate-spin' : ''}`} />
            <span>{locale === 'hi' ? '⚔️ सेना' : '⚔️ ARMY'}</span>
          </button>

          {/* Quick Sync Rajasthan SSO Button */}
          <button
            onClick={onQuickRajSync}
            disabled={isRajSyncing}
            className="flex items-center gap-1 bg-amber-600 hover:bg-amber-500 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest Rajasthan notices from https://www.recruitment.rajasthan.gov.in/"
          >
            <RefreshCw className={`h-3 w-3 ${isRajSyncing ? 'animate-spin' : ''}`} />
            <span>{locale === 'hi' ? '🏛️ राजस्थान' : '🏛️ RAJ SSO'}</span>
          </button>

          {/* Quick Sync SBI Button */}
          <button
            onClick={onQuickSbiSync}
            disabled={isSbiSyncing}
            className="flex items-center gap-1 bg-sky-600 hover:bg-sky-500 text-white font-bold px-2 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest SBI career notices from https://sbi.bank.in/web/careers/current-openings"
          >
            <RefreshCw className={`h-3 w-3 ${isSbiSyncing ? 'animate-spin' : ''}`} />
            <span>SBI</span>
          </button>

          {/* Quick Sync IBPS Button */}
          <button
            onClick={onQuickIbpsSync}
            disabled={isIbpsSyncing}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white font-bold px-2 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest banking notices from https://www.ibps.in/"
          >
            <RefreshCw className={`h-3 w-3 ${isIbpsSyncing ? 'animate-spin' : ''}`} />
            <span>IBPS</span>
          </button>

          {/* Quick Sync RRB Button */}
          <button
            onClick={onQuickRrbSync}
            disabled={isRrbSyncing}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white font-bold px-2 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest from https://www.rrbapply.gov.in/#/auth/landing"
          >
            <RefreshCw className={`h-3 w-3 ${isRrbSyncing ? 'animate-spin' : ''}`} />
            <span>RRB</span>
          </button>

          {/* Quick Sync UPSC Button */}
          <button
            onClick={onQuickUpscSync}
            disabled={isUpscSyncing}
            className="flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest from https://www.upsc.gov.in/"
          >
            <RefreshCw className={`h-3 w-3 ${isUpscSyncing ? 'animate-spin' : ''}`} />
            <span>UPSC</span>
          </button>

          {/* Quick Sync SSC Button */}
          <button
            onClick={onQuickSscSync}
            disabled={isSscSyncing}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75"
            title="Sync latest from https://ssc.gov.in/"
          >
            <RefreshCw className={`h-3 w-3 ${isSscSyncing ? 'animate-spin' : ''}`} />
            <span>SSC</span>
          </button>

          {/* Direct Link to Army Hub */}
          <button
            onClick={onOpenArmyHub}
            className="flex items-center gap-1 bg-emerald-700/30 hover:bg-emerald-700/50 text-emerald-200 font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-emerald-400/40 cursor-pointer"
          >
            <span>{locale === 'hi' ? 'भारतीय सेना हब' : 'Army Hub'}</span>
            <ChevronRight className="h-3 w-3" />
          </button>

          {/* Direct Link to Rajasthan Hub */}
          <button
            onClick={onOpenRajHub}
            className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-amber-400/40 cursor-pointer"
          >
            <span>{locale === 'hi' ? 'राजस्थान पोर्टल' : 'Rajasthan SSO Hub'}</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

      </div>
    </div>
  );
}
