import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap, ExternalLink, ShieldCheck, ChevronRight, CheckCircle, Award, Sparkles, Train, Landmark, Swords, Shield, Anchor, Siren } from 'lucide-react';
import { SscLiveNotice, UpscLiveNotice, RrbLiveNotice, IbpsLiveNotice, SbiLiveNotice, RajLiveNotice, ArmyLiveNotice, NavyLiveNotice, BtscLiveNotice, HpscLiveNotice, PgrkamLiveNotice, UppbpbLiveNotice, MpesbLiveNotice } from '../types';

interface GovPortalsSyncBarProps {
  locale?: string;
  onOpenSscHub: () => void;
  onOpenUpscHub: () => void;
  onOpenRrbHub: () => void;
  onOpenIbpsHub: () => void;
  onOpenSbiHub: () => void;
  onOpenRajHub: () => void;
  onOpenArmyHub: () => void;
  onOpenNavyHub?: () => void;
  onOpenBtscHub?: () => void;
  onOpenHpscHub?: () => void;
  onOpenPgrkamHub?: () => void;
  onOpenUppbpbHub?: () => void;
  onOpenMpesbHub?: () => void;
  onQuickSscSync: () => void;
  onQuickUpscSync: () => void;
  onQuickRrbSync: () => void;
  onQuickIbpsSync: () => void;
  onQuickSbiSync: () => void;
  onQuickRajSync: () => void;
  onQuickArmySync: () => void;
  onQuickNavySync?: () => void;
  onQuickBtscSync?: () => void;
  onQuickHpscSync?: () => void;
  onQuickPgrkamSync?: () => void;
  onQuickUppbpbSync?: () => void;
  onQuickMpesbSync?: () => void;
  onQuickSyncAll?: () => void;
  isSscSyncing?: boolean;
  isUpscSyncing?: boolean;
  isRrbSyncing?: boolean;
  isIbpsSyncing?: boolean;
  isSbiSyncing?: boolean;
  isRajSyncing?: boolean;
  isArmySyncing?: boolean;
  isNavySyncing?: boolean;
  isBtscSyncing?: boolean;
  isHpscSyncing?: boolean;
  isPgrkamSyncing?: boolean;
  isUppbpbSyncing?: boolean;
  isMpesbSyncing?: boolean;
  latestSscNotice?: SscLiveNotice | null;
  latestUpscNotice?: UpscLiveNotice | null;
  latestRrbNotice?: RrbLiveNotice | null;
  latestIbpsNotice?: IbpsLiveNotice | null;
  latestSbiNotice?: SbiLiveNotice | null;
  latestRajNotice?: RajLiveNotice | null;
  latestArmyNotice?: ArmyLiveNotice | null;
  latestNavyNotice?: NavyLiveNotice | null;
  latestBtscNotice?: BtscLiveNotice | null;
  latestHpscNotice?: HpscLiveNotice | null;
  latestPgrkamNotice?: PgrkamLiveNotice | null;
  latestUppbpbNotice?: UppbpbLiveNotice | null;
  latestMpesbNotice?: MpesbLiveNotice | null;
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
  onOpenNavyHub,
  onOpenBtscHub,
  onOpenHpscHub,
  onOpenPgrkamHub,
  onOpenUppbpbHub,
  onOpenMpesbHub,
  onQuickSscSync,
  onQuickUpscSync,
  onQuickRrbSync,
  onQuickIbpsSync,
  onQuickSbiSync,
  onQuickRajSync,
  onQuickArmySync,
  onQuickNavySync,
  onQuickBtscSync,
  onQuickHpscSync,
  onQuickPgrkamSync,
  onQuickUppbpbSync,
  onQuickMpesbSync,
  onQuickSyncAll,
  isSscSyncing = false,
  isUpscSyncing = false,
  isRrbSyncing = false,
  isIbpsSyncing = false,
  isSbiSyncing = false,
  isRajSyncing = false,
  isArmySyncing = false,
  isNavySyncing = false,
  isBtscSyncing = false,
  isHpscSyncing = false,
  isPgrkamSyncing = false,
  isUppbpbSyncing = false,
  isMpesbSyncing = false,
  latestSscNotice,
  latestUpscNotice,
  latestRrbNotice,
  latestIbpsNotice,
  latestSbiNotice,
  latestRajNotice,
  latestArmyNotice,
  latestNavyNotice,
  latestBtscNotice,
  latestHpscNotice,
  latestPgrkamNotice,
  latestUppbpbNotice,
  latestMpesbNotice
}: GovPortalsSyncBarProps) {
  const [secondsRemaining, setSecondsRemaining] = useState(40);
  const [activePortalTab, setActivePortalTab] = useState<'uppbpb' | 'mpesb' | 'pgrkam' | 'hpsc' | 'btsc' | 'navy' | 'army' | 'raj' | 'sbi' | 'ibps' | 'rrb' | 'upsc' | 'ssc'>('uppbpb');

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev <= 1 ? 40 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isSyncingAny = isSscSyncing || isUpscSyncing || isRrbSyncing || isIbpsSyncing || isSbiSyncing || isRajSyncing || isArmySyncing || isNavySyncing || isBtscSyncing || isHpscSyncing || isPgrkamSyncing || isUppbpbSyncing || isMpesbSyncing;

  return (
    <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 shadow-md py-2 px-3 sm:px-4">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2.5 text-xs font-sans">
        
        {/* Left: Portals Switcher & Live Indicator */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          
          {/* UPPBPB UP POLICE Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('uppbpb');
              if (onOpenUppbpbHub) onOpenUppbpbHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'uppbpb'
                ? 'bg-blue-900 text-blue-100 border-blue-400 shadow-xs ring-1 ring-blue-400/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-blue-400 -ml-3.5"></span>
            <Siren className="h-3 w-3 text-blue-300" />
            <span>UP POLICE LIVE</span>
          </button>

          {/* MP ESB VYAPAM Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('mpesb');
              if (onOpenMpesbHub) onOpenMpesbHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'mpesb'
                ? 'bg-teal-900 text-teal-100 border-teal-400 shadow-xs ring-1 ring-teal-400/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-teal-400 -ml-3.5"></span>
            <Landmark className="h-3 w-3 text-teal-300" />
            <span>MP ESB (व्यापम)</span>
          </button>

          {/* PGRKAM PUNJAB Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('pgrkam');
              if (onOpenPgrkamHub) onOpenPgrkamHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'pgrkam'
                ? 'bg-amber-900 text-amber-100 border-amber-400 shadow-xs ring-1 ring-amber-400/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-amber-400 -ml-3.5"></span>
            <Landmark className="h-3 w-3 text-amber-300" />
            <span>PGRKAM PUNJAB</span>
          </button>

          {/* HPSC HARYANA Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('hpsc');
              if (onOpenHpscHub) onOpenHpscHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'hpsc'
                ? 'bg-blue-800/90 text-blue-200 border-blue-400 shadow-xs ring-1 ring-blue-400/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-blue-400 -ml-3.5"></span>
            <Landmark className="h-3 w-3 text-blue-300" />
            <span>HPSC HARYANA</span>
          </button>

          {/* BTSC BIHAR Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('btsc');
              if (onOpenBtscHub) onOpenBtscHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'btsc'
                ? 'bg-emerald-800/90 text-emerald-200 border-emerald-400 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-emerald-400 -ml-3.5"></span>
            <Landmark className="h-3 w-3 text-emerald-300" />
            <span>BTSC BIHAR</span>
          </button>

          {/* JOIN INDIAN NAVY Pill Tab */}
          <button
            onClick={() => {
              setActivePortalTab('navy');
              if (onOpenNavyHub) onOpenNavyHub();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition border cursor-pointer ${
              activePortalTab === 'navy'
                ? 'bg-blue-800/80 text-cyan-200 border-cyan-400/80 shadow-xs'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 -ml-3.5"></span>
            <Anchor className="h-3 w-3 text-cyan-300" />
            <span>NAVY</span>
          </button>

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
            <span>ARMY</span>
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
            <span>RAJASTHAN</span>
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
            <span>SBI</span>
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
            <span>IBPS</span>
          </button>

          {/* Bank of Baroda Career Pill Link */}
          <a
            href="https://bankofbaroda.bank.in/career"
            target="_blank"
            rel="noopener noreferrer"
            title="Bank of Baroda Careers (bankofbaroda.bank.in/career)"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/50 hover:bg-amber-500/30 transition"
          >
            <Landmark className="h-3 w-3 text-amber-400" />
            <span>BOB CAREER</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-70" />
          </a>

          {/* Punjab National Bank Recruitment Pill Link */}
          <a
            href="https://pnb.bank.in/Recruitments.aspx"
            target="_blank"
            rel="noopener noreferrer"
            title="Punjab National Bank Recruitments (pnb.bank.in/Recruitments.aspx)"
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/50 hover:bg-rose-500/30 transition"
          >
            <Landmark className="h-3 w-3 text-rose-400" />
            <span>PNB RECRUIT</span>
            <ExternalLink className="h-2.5 w-2.5 opacity-70" />
          </a>

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
            {activePortalTab === 'uppbpb' ? (
              latestUppbpbNotice ? (
                <div className="flex items-center gap-1.5 truncate text-blue-200">
                  <span className="bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    UPPBPB {latestUppbpbNotice.advtNo || latestUppbpbNotice.postType || latestUppbpbNotice.category}
                  </span>
                  <span className="truncate">{latestUppbpbNotice.title}</span>
                </div>
              ) : (
                <span className="text-blue-200/90 truncate">
                  {locale === 'hi' ? '🚨 उत्तर प्रदेश पुलिस भर्ती बोर्ड (uppbpb.gov.in) लाइव मॉनिटर सक्रिय' : '🚨 UP Police Board (uppbpb.gov.in) live monitor active'}
                </span>
              )
            ) : activePortalTab === 'mpesb' ? (
              latestMpesbNotice ? (
                <div className="flex items-center gap-1.5 truncate text-teal-200">
                  <span className="bg-teal-500/20 text-teal-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    MP ESB {latestMpesbNotice.advtNo || latestMpesbNotice.postType || latestMpesbNotice.category}
                  </span>
                  <span className="truncate">{latestMpesbNotice.title}</span>
                </div>
              ) : (
                <span className="text-teal-200/90 truncate">
                  {locale === 'hi' ? '🏛️ मध्य प्रदेश कर्मचारी चयन मंडल (esb.mponline.gov.in) लाइव' : '🏛️ MP ESB Vyapam (esb.mponline.gov.in) live monitor'}
                </span>
              )
            ) : activePortalTab === 'pgrkam' ? (
              latestPgrkamNotice ? (
                <div className="flex items-center gap-1.5 truncate text-amber-200">
                  <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    PGRKAM {latestPgrkamNotice.advtNo || latestPgrkamNotice.postType || latestPgrkamNotice.category}
                  </span>
                  <span className="truncate">{latestPgrkamNotice.title}</span>
                </div>
              ) : (
                <span className="text-amber-200/90 truncate">
                  {locale === 'hi' ? '🏛️ पंजाब घर-घर रोज़गार मिशन (pgrkam.com) लाइव मॉनिटर' : '🏛️ Punjab Rozgar Mission (pgrkam.com) live monitor'}
                </span>
              )
            ) : activePortalTab === 'hpsc' ? (
              latestHpscNotice ? (
                <div className="flex items-center gap-1.5 truncate text-blue-200">
                  <span className="bg-blue-500/20 text-blue-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    HPSC {latestHpscNotice.advtNo || latestHpscNotice.postType || latestHpscNotice.category}
                  </span>
                  <span className="truncate">{latestHpscNotice.title}</span>
                </div>
              ) : (
                <span className="text-blue-200/90 truncate">
                  {locale === 'hi' ? '🏛️ हरियाणा लोक सेवा आयोग (hpsc.gov.in) लाइव मॉनिटर सक्रिय' : '🏛️ HPSC Haryana (hpsc.gov.in) live monitor active'}
                </span>
              )
            ) : activePortalTab === 'btsc' ? (
              latestBtscNotice ? (
                <div className="flex items-center gap-1.5 truncate text-emerald-200">
                  <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    BTSC {latestBtscNotice.advtNo || latestBtscNotice.postType || latestBtscNotice.category}
                  </span>
                  <span className="truncate">{latestBtscNotice.title}</span>
                </div>
              ) : (
                <span className="text-emerald-200/90 truncate">
                  {locale === 'hi' ? '🏛️ बिहार तकनीकी सेवा आयोग (btsc.bihar.gov.in) लाइव मॉनिटर सक्रिय' : '🏛️ BTSC Bihar (btsc.bihar.gov.in) live monitor active'}
                </span>
              )
            ) : activePortalTab === 'navy' ? (
              latestNavyNotice ? (
                <div className="flex items-center gap-1.5 truncate text-cyan-200">
                  <span className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.2 rounded font-mono font-bold text-[9px] uppercase shrink-0">
                    NAVY {latestNavyNotice.batch || latestNavyNotice.entryType || latestNavyNotice.category}
                  </span>
                  <span className="truncate">{latestNavyNotice.title}</span>
                </div>
              ) : (
                <span className="text-cyan-200/90 truncate">
                  {locale === 'hi' ? '⚓ भारतीय नौसेना (joinindiannavy.gov.in) लाइव मॉनिटर सक्रिय' : '⚓ Join Indian Navy (joinindiannavy.gov.in) live monitor active'}
                </span>
              )
            ) : activePortalTab === 'army' ? (
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
                    {latestIbpsNotice.org?.includes('Baroda') ? 'BOB CAREER' : latestIbpsNotice.org?.includes('Punjab') ? 'PNB RECRUIT' : `IBPS ${latestIbpsNotice.crpCode || latestIbpsNotice.cadre || latestIbpsNotice.category}`}
                  </span>
                  <span className="truncate">{latestIbpsNotice.title}</span>
                </div>
              ) : (
                <span className="text-slate-400 truncate">
                  {locale === 'hi' ? '🏦 IBPS, Bank of Baroda (BOB) व PNB लाइव मॉनिटर सक्रिय' : '🏦 IBPS, Bank of Baroda & PNB live auto-monitor active'}
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
            Auto-Sync: <strong className="text-emerald-400">{secondsRemaining}s</strong>
          </span>

          {/* Quick Sync UP Police Button */}
          {onQuickUppbpbSync && (
            <button
              onClick={onQuickUppbpbSync}
              disabled={isUppbpbSyncing}
              className="flex items-center gap-1 bg-blue-800 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75 border border-blue-400/40"
              title="Sync latest UP Police releases from https://uppbpb.gov.in/"
            >
              <RefreshCw className={`h-3 w-3 ${isUppbpbSyncing ? 'animate-spin' : ''}`} />
              <span>{locale === 'hi' ? '🚨 UP पुलिस' : '🚨 UP POLICE'}</span>
            </button>
          )}

          {/* Quick Sync MP ESB Button */}
          {onQuickMpesbSync && (
            <button
              onClick={onQuickMpesbSync}
              disabled={isMpesbSyncing}
              className="flex items-center gap-1 bg-teal-800 hover:bg-teal-700 text-teal-100 font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75 border border-teal-400/40"
              title="Sync latest MP ESB Vyapam releases from https://esb.mponline.gov.in/"
            >
              <RefreshCw className={`h-3 w-3 ${isMpesbSyncing ? 'animate-spin' : ''}`} />
              <span>{locale === 'hi' ? '🏛️ MP ESB' : '🏛️ MP ESB'}</span>
            </button>
          )}

          {/* Quick Sync PGRKAM Punjab Button */}
          {onQuickPgrkamSync && (
            <button
              onClick={onQuickPgrkamSync}
              disabled={isPgrkamSyncing}
              className="flex items-center gap-1 bg-amber-800 hover:bg-amber-700 text-amber-100 font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75 border border-amber-400/40"
              title="Sync latest Punjab Rozgar releases from https://www.pgrkam.com/"
            >
              <RefreshCw className={`h-3 w-3 ${isPgrkamSyncing ? 'animate-spin' : ''}`} />
              <span>{locale === 'hi' ? '🏛️ पंजाब PGRKAM' : '🏛️ PGRKAM'}</span>
            </button>
          )}

          {/* Quick Sync HPSC Haryana Button */}
          {onQuickHpscSync && (
            <button
              onClick={onQuickHpscSync}
              disabled={isHpscSyncing}
              className="flex items-center gap-1 bg-blue-700 hover:bg-blue-600 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75 border border-blue-400/40"
              title="Sync latest Haryana HPSC releases from https://hpsc.gov.in/"
            >
              <RefreshCw className={`h-3 w-3 ${isHpscSyncing ? 'animate-spin' : ''}`} />
              <span>{locale === 'hi' ? '🏛️ HPSC' : '🏛️ HPSC'}</span>
            </button>
          )}

          {/* Quick Sync BTSC Bihar Button */}
          {onQuickBtscSync && (
            <button
              onClick={onQuickBtscSync}
              disabled={isBtscSyncing}
              className="flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold px-2.5 py-1 rounded-lg text-[11px] transition shadow-xs cursor-pointer active:scale-95 disabled:opacity-75 border border-emerald-500/40"
              title="Sync latest Bihar BTSC releases from https://btsc.bihar.gov.in/hi/recruitment"
            >
              <RefreshCw className={`h-3 w-3 ${isBtscSyncing ? 'animate-spin' : ''}`} />
              <span>{locale === 'hi' ? '🏛️ BTSC' : '🏛️ BTSC'}</span>
            </button>
          )}

          {/* Direct Link to UPPBPB Hub */}
          {onOpenUppbpbHub && (
            <button
              onClick={onOpenUppbpbHub}
              className="flex items-center gap-1 bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-blue-400/50 cursor-pointer"
            >
              <span>{locale === 'hi' ? 'UP पुलिस हब' : 'UP Police'}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          )}

          {/* Direct Link to MP ESB Hub */}
          {onOpenMpesbHub && (
            <button
              onClick={onOpenMpesbHub}
              className="flex items-center gap-1 bg-teal-900/60 hover:bg-teal-800/80 text-teal-200 font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-teal-400/50 cursor-pointer"
            >
              <span>{locale === 'hi' ? 'MP व्यापम हब' : 'MP ESB'}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          )}

          {/* Direct Link to PGRKAM Hub */}
          {onOpenPgrkamHub && (
            <button
              onClick={onOpenPgrkamHub}
              className="flex items-center gap-1 bg-amber-900/60 hover:bg-amber-800/80 text-amber-200 font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-amber-400/50 cursor-pointer"
            >
              <span>{locale === 'hi' ? 'पंजाब हब' : 'PGRKAM'}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          )}

          {/* Direct Link to HPSC Hub */}
          {onOpenHpscHub && (
            <button
              onClick={onOpenHpscHub}
              className="flex items-center gap-1 bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 font-bold px-2.5 py-1 rounded-lg text-[11px] transition border border-blue-400/50 cursor-pointer"
            >
              <span>{locale === 'hi' ? 'HPSC' : 'HPSC'}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

