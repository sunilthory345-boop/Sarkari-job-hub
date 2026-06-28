import React, { useState } from 'react';
import { 
  Briefcase, FileText, Award, BookOpen, Clock, 
  Sparkles, Mail, Bell, Menu, X, CheckSquare, 
  GraduationCap, MessageSquare, Download, LogIn,
  Moon, Sun, HelpCircle, FileDown, Star, Calendar, FileUp, Globe, Newspaper
} from 'lucide-react';
import { UserProfile } from '../types';
import { LANGUAGES, TRANSLATIONS, LocaleType } from '../utils/lang';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserProfile;
  setPremiumModal: (open: boolean) => void;
  notificationCount: number;
  onClearNotifications: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  locale: string;
  setLocale: (val: LocaleType) => void;
  onOpenAuthModal?: () => void;
  liveNotifications?: any[];
}

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  user, 
  setPremiumModal,
  notificationCount,
  onClearNotifications,
  isLoggedIn,
  setIsLoggedIn,
  locale,
  setLocale,
  onOpenAuthModal,
  liveNotifications = []
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const t = TRANSLATIONS[locale as LocaleType] || TRANSLATIONS['en'];

  const menuItems = [
    { id: 'home', label: t.home, icon: BookOpen, category: 'Main' },
    { id: 'jobs', label: t.latestJobs, icon: Briefcase, category: 'Main' },
    { id: 'calendar', label: t.examCalendar, icon: Calendar, category: 'Main' },
    { id: 'admit-cards', label: t.admitCard, icon: FileText, category: 'Main' },
    { id: 'results', label: t.result, icon: Award, category: 'Main' },
    { id: 'answer-key', label: t.answerKey, icon: CheckSquare, category: 'Main' },
    { id: 'whatsapp-alerts', label: t.whatsappChannel, icon: MessageSquare, category: 'Main', highlight: true },
    
    { id: 'syllabus', label: t.syllabusAdmission, icon: GraduationCap, category: 'Prep Zone' },
    { id: 'pyqs', label: t.pyqPapers, icon: FileDown, category: 'Prep Zone' },
    { id: 'mock-tests', label: t.mockTests, icon: Clock, category: 'Prep Zone' },
    { id: 'newspapers', label: locale === 'hi' ? '📰 दैनिक समाचार पत्र' : '📰 Daily Newspaper ePaper', icon: Newspaper, category: 'Prep Zone' },
    { id: 'uploads', label: t.uploads, icon: FileUp, category: 'Prep Zone' },
    { id: 'current-affairs', label: t.currentAffairs, icon: Clock, category: 'Prep Zone' },
    { id: 'blog', label: t.blogsStrategies, icon: MessageSquare, category: 'Prep Zone' },
    
    { id: 'premium', label: t.premiumMembership, icon: Sparkles, category: 'User Desk', highlight: true },
    { id: 'dashboard', label: t.userDashboard, icon: LogIn, category: 'User Desk' },
    { id: 'admin', label: t.adminConsole, icon: Star, category: 'User Desk' },
    { id: 'contact', label: t.contactUs, icon: Mail, category: 'User Desk' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Header App Bar */}
      <header id="topbar-app-header" className="sticky top-0 z-40 w-full border-b border-blue-900 bg-[#1E3A8A] text-white shadow-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <button 
              id="sidebar-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="rounded-lg p-1.5 text-blue-200 hover:bg-blue-900/60"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleTabClick('home')}>
              <div className="flex bg-white p-1 rounded text-[#1E3A8A] shadow-xs">
                <span className="font-sans font-bold text-xs tracking-tight">JS</span>
              </div>
              <div className="leading-tight">
                <h1 className="font-sans text-xs sm:text-sm font-extrabold tracking-tight text-white flex items-center gap-1">
                  {t.brandTitle}
                </h1>
                <p className="font-mono text-[8px] font-bold text-blue-300 uppercase tracking-widest flex items-center gap-1">
                  <span className="inline-block h-1 w-1 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t.brandSubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Horizontal Navigation Links (High Density Layout) */}
          <div className="hidden md:flex items-center gap-5 text-xs font-semibold">
            {menuItems.filter(item => ['home', 'jobs', 'newspapers', 'calendar', 'admit-cards', 'results', 'current-affairs', 'whatsapp-alerts', 'premium'].includes(item.id)).map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`hover:text-blue-200 transition-all cursor-pointer pb-0.5 border-b-2 ${
                    isSelected 
                      ? 'border-white text-white font-extrabold' 
                      : item.id === 'current-affairs'
                        ? 'border-transparent text-amber-300 hover:text-amber-200 font-extrabold uppercase animate-pulse'
                        : item.id === 'whatsapp-alerts' 
                          ? 'border-transparent text-emerald-400 hover:text-emerald-300 font-bold uppercase animate-pulse'
                          : item.highlight 
                            ? 'border-transparent text-yellow-300 hover:text-yellow-400 font-bold uppercase' 
                            : 'border-transparent text-blue-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop Right items */}
          <div className="flex items-center gap-3">
            
            {/* Quick Promo or Premium Badge */}
            <div className="hidden sm:flex items-center gap-2">
              {user.premiumUser ? (
                <div id="badge-pro-user" className="flex items-center gap-1 rounded bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                  <Sparkles className="h-3 w-3 animate-spin text-white" />
                  {t.premiumActive}
                </div>
              ) : (
                <button
                  id="go-premium-cta"
                  onClick={() => handleTabClick('premium')}
                  className="flex items-center gap-1 rounded bg-yellow-400 px-3 py-1 text-[10px] font-bold text-blue-900 uppercase tracking-wide hover:bg-yellow-500 transition-all shadow-xs"
                >
                  <Sparkles className="h-3 w-3 text-blue-900 fill-blue-900 animate-pulse" />
                  {t.unlockPremium} (₹99)
                </button>
              )}
            </div>

            {/* Globe Language Selector Dropdown */}
            <div className="flex items-center gap-1 bg-blue-900/60 border border-blue-700/60 rounded-xl px-2 py-1 shrink-0" id="nav-language-container">
              <Globe className="h-3.5 w-3.5 text-blue-200" />
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as LocaleType)}
                className="bg-transparent text-white font-sans text-[11px] font-bold focus:outline-hidden cursor-pointer py-0.5 pr-1 outline-none border-none"
                title="Select Language / भाषा चुनें"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="text-slate-800 text-xs font-semibold">
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Notifications Panel Trigger */}
            <div className="relative">
              <button 
                id="noti-bell-trigger"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-lg p-1.5 text-blue-100 hover:bg-blue-900/60 transition"
              >
                <Bell className="h-4.5 w-4.5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white ring-1 ring-[#1E3A8A]">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div id="notifications-box" className="absolute right-0 mt-3 w-85 rounded-xl border border-blue-200 bg-white p-3 shadow-xl ring-1 ring-blue-950/10 text-slate-800 z-50">
                  <div className="mb-2 flex items-center justify-between font-sans border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-xs text-slate-800">{t.notificationsTitle}</span>
                    {notificationCount > 0 && (
                      <button 
                        onClick={() => {
                          onClearNotifications();
                          setNotificationsOpen(false);
                        }} 
                        className="text-[10px] text-blue-600 font-bold hover:underline font-sans cursor-pointer"
                      >
                        {t.clearAll}
                      </button>
                    )}
                  </div>
                  <div className="space-y-2 font-sans text-xs max-h-80 overflow-y-auto pr-1">
                    {liveNotifications.length > 0 ? (
                      liveNotifications.map((n: any, idx: number) => {
                        let badgeBg = "bg-blue-50 text-blue-900 border border-blue-100";
                        let emoji = "🔥";
                        if (n.category === 'Admit Card') {
                          badgeBg = "bg-orange-50 text-orange-900 border border-orange-100";
                          emoji = "⏱️";
                        } else if (n.category === 'Result') {
                          badgeBg = "bg-emerald-50 text-emerald-900 border border-emerald-100";
                          emoji = "🏆";
                        } else if (n.category === 'Answer Key') {
                          badgeBg = "bg-amber-55/10 text-amber-900 border border-amber-200/50";
                          emoji = "🔑";
                        }
                        return (
                          <div 
                            key={n.id || idx} 
                            onClick={() => {
                              if (n.url) {
                                if (n.url.includes('tab=jobs')) setActiveTab('jobs');
                                else if (n.url.includes('tab=admit-cards')) setActiveTab('admit-cards');
                                else if (n.url.includes('tab=results')) setActiveTab('results');
                                else if (n.url.includes('tab=answer-key')) setActiveTab('answer-key');
                              }
                              setNotificationsOpen(false);
                            }}
                            className={`rounded-lg p-2.5 text-left cursor-pointer transition hover:bg-slate-50 ${badgeBg}`}
                          >
                            <p className="font-extrabold flex items-center gap-1.5">
                              <span>{emoji}</span>
                              <span>{n.category} Alert</span>
                              {n.timestamp && <span className="ml-auto text-[8px] font-mono text-slate-400 font-semibold">{n.timestamp}</span>}
                            </p>
                            <p className="text-[10px] text-slate-700 font-bold mt-1 leading-tight">{n.title}</p>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-900 border border-blue-100 text-left">
                          <p className="font-bold">🔥 New Jobs uploaded!</p>
                          <p className="text-[10px] text-blue-700 mt-0.5">SSC CGL Recruitment 2026 application link is now live. Apply before 25th July!</p>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-2 text-orange-900 border border-orange-100 text-left">
                          <p className="font-bold">⏱️ Admit Card Released</p>
                          <p className="text-[10px] text-orange-700 mt-0.5">SBI Junior Associates Mains e-Admit cards are available. Exam Date: 28th June.</p>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-2 text-emerald-900 border border-emerald-100 text-left">
                          <p className="font-bold">🎉 Merit List Active</p>
                          <p className="text-[10px] text-emerald-700 mt-0.5">UPSC Civil Services 2025 final scorecards and cut-off list released. Check merit rank list.</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar Desk */}
            <div className="flex items-center gap-1.5 border-l border-blue-900 pl-3">
              {isLoggedIn ? (
                <button 
                  id="avatar-quick-trigger"
                  onClick={() => handleTabClick('dashboard')}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-800 font-sans font-bold text-white ring-1 ring-blue-300 transition group-hover:bg-blue-700 text-xs shadow-xs animate-fade-in">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden text-left md:block">
                    <p className="font-sans text-[11px] font-bold text-white leading-none whitespace-nowrap">
                      {user.name || t.loggedInAs}
                    </p>
                    <p className="font-mono text-[8px] text-blue-200 mt-0.5 leading-none">
                      {user.premiumUser ? 'PREMIUM' : 'ACTIVE'}
                    </p>
                  </div>
                </button>
              ) : (
                <button 
                  id="navbar-signin-btn"
                  onClick={() => {
                    if (onOpenAuthModal) {
                      onOpenAuthModal();
                    } else {
                      handleTabClick('dashboard');
                    }
                  }}
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 px-2.5 py-1 rounded text-[10px] font-extrabold text-white transition-all shadow-xs cursor-pointer animate-pulse"
                >
                  {t.loginButton}
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Slideout Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        ></div>
      )}

      {/* Slideout Mobile Sidebar Menu Drawer */}
      <aside 
        id="mobile-navigation-sidebar"
        className={`fixed bottom-0 top-0 left-0 z-50 w-72 transform bg-white p-5 transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
                J
              </div>
              <span className="font-sans font-bold text-base text-blue-900">Sarkari Hub navigation</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-5 overflow-y-auto max-h-[70vh] pr-1">
            {['Main', 'Prep Zone', 'User Desk'].map((cat) => (
              <div key={cat} className="space-y-1.5">
                <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">
                  {cat}
                </span>
                <div className="space-y-1">
                  {menuItems.filter(item => item.category === cat).map((item) => {
                    const IconComp = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`mob-nav-${item.id}`}
                        onClick={() => handleTabClick(item.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-150 ${
                          isSelected 
                            ? 'bg-blue-50 text-blue-900' 
                            : item.highlight
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                        }`}
                      >
                        <IconComp className={`h-4.5 w-4.5 ${
                          isSelected ? 'text-blue-700' : item.highlight ? 'text-amber-500' : 'text-slate-500'
                        }`} />
                        <span>{item.label}</span>
                        {item.highlight && (
                          <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800 uppercase tracking-widest animate-pulse">
                            PRO
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="flex gap-2">
            <a 
              href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-emerald-50 text-emerald-700 font-extrabold rounded-xl hover:bg-emerald-100 border border-emerald-200 text-xs shadow-xs"
            >
              <span>🟢</span> WhatsApp
            </a>
            <a 
              href="https://t.me/JobSarkariHub" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 text-blue-700 font-extrabold rounded-xl hover:bg-blue-100 border border-blue-200 text-xs shadow-xs"
            >
              <span>✈️</span> Telegram Channel
            </a>
          </div>
          <p className="font-mono text-[9px] text-center text-slate-400 font-semibold">
            SECURE AD-FREE EXPERIENCE
          </p>
        </div>
      </aside>
    </>
  );
}
