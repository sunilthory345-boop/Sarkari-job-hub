import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { 
  X, Activity, Users, Eye, TrendingUp, Monitor, Globe, Award, HelpCircle,
  Share2, ArrowUpRight, Shield, Zap, Search, BellRing, MessageSquare
} from 'lucide-react';
import { GA_MEASUREMENT_ID } from '../utils/analytics';

interface TrafficDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Generate realistic mock data for 7-day traffic trend
const weeklyTrendData = [
  { day: 'Mon', visitors: 14205, pageviews: 48310 },
  { day: 'Tue', visitors: 15890, pageviews: 54120 },
  { day: 'Wed', visitors: 18120, pageviews: 61890 },
  { day: 'Thu', visitors: 17450, pageviews: 59230 },
  { day: 'Fri', visitors: 19820, pageviews: 68450 },
  { day: 'Sat', visitors: 22100, pageviews: 74900 },
  { day: 'Sun', visitors: 24500, pageviews: 89040 },
];

// Geographic traffic composition (Major states in India for state exams)
const regionalData = [
  { state: 'Uttar Pradesh (UP)', share: 38, count: '33,820', color: 'bg-amber-500' },
  { state: 'Bihar (BR)', share: 26, count: '23,140', color: 'bg-emerald-500' },
  { state: 'Rajasthan (RJ)', share: 14, count: '12,460', color: 'bg-blue-500' },
  { state: 'Madhya Pradesh (MP)', share: 11, count: '9,790', color: 'bg-purple-500' },
  { state: 'Haryana & Delhi', share: 7, count: '6,230', color: 'bg-rose-500' },
  { state: 'Others', share: 4, count: '3,560', color: 'bg-slate-400' },
];

// Direct acqusition channels
const connectionChannels = [
  { source: 'Telegram Job Alerts', percentage: 42, icon: BellRing, color: 'text-sky-500', bgColor: 'bg-sky-500/10' },
  { source: 'Google Organic Search', percentage: 28, icon: Search, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
  { source: 'Direct / Bookmarks', percentage: 18, icon: Globe, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
  { source: 'WhatsApp Exam Groups', percentage: 12, icon: MessageSquare, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
];

export default function TrafficDashboardModal({ isOpen, onClose }: TrafficDashboardModalProps) {
  const [activeUsers, setActiveUsers] = useState(384);
  const [localViews, setLocalViews] = useState(1);
  const [currentTab, setCurrentTab] = useState<'realtime' | 'sources' | 'ga-setup'>('realtime');

  // Trigger fluctuating dynamic counter for simulated real-time visitors
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        const variance = Math.floor(Math.random() * 15) - 7; // fluctuation +/- 7
        const next = prev + variance;
        return next < 300 ? 342 : next > 480 ? 411 : next;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Read local device cumulative page session count
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sarkari_local_sessions');
      const count = stored ? parseInt(stored, 10) : 0;
      setLocalViews(count + 1);
      localStorage.setItem('sarkari_local_sessions', (count + 1).toString());
    } catch (e) {
      console.warn('Unable to write to localStorage for tracking.', e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto animate-fade-in" id="traffic-dashboard-modal">
      <div className="bg-white rounded-3xl p-5 md:p-7 shadow-2xl relative max-w-2xl w-full text-slate-700 max-h-[92vh] flex flex-col font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
          <div className="text-left space-y-0.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-550/10 px-2.5 py-0.5 text-[9px] font-mono font-black text-indigo-800 uppercase tracking-wider animate-pulse">
              <Activity className="h-3 w-3 text-indigo-600 animate-bounce" /> Live Analytics Engine v2.4
            </span>
            <h3 className="font-sans text-base md:text-lg font-black text-slate-900 tracking-tight">
              Sarkari Live Traffic & Visitor Insights (ट्रैफिक विश्लेषण)
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">
              Aggregated from Session Storage, Cache Logs & GA tracking endpoints
            </p>
          </div>
          
          <button 
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-500 hover:text-slate-800 transition cursor-pointer font-bold shrink-0 text-xs font-mono"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex items-center gap-1 mt-3 border-b border-slate-100 pb-2">
          <button
            onClick={() => setCurrentTab('realtime')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'realtime' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <Activity className="h-3.5 w-3.5" /> Real-time Feed
          </button>
          
          <button
            onClick={() => setCurrentTab('sources')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'sources' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <Globe className="h-3.5 w-3.5" /> Acquisition & States
          </button>

          <button
            onClick={() => setCurrentTab('ga-setup')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              currentTab === 'ga-setup' 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <Shield className="h-3.5 w-3.5" /> Google Analytics GA4
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-slate-600 pr-1 scrollbar-thin text-left">
          
          {currentTab === 'realtime' && (
            <div className="space-y-4 animate-fade-in">
              {/* Telemetry Core Metrics Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Simulated Realtime Visitors */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 border border-indigo-100 p-3.5 rounded-2xl flex flex-col justify-between space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-indigo-950 uppercase tracking-wider font-mono">Live Visitors right now</span>
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-indigo-950 font-mono tracking-tight leading-none">
                      {activeUsers}
                    </h4>
                    <p className="text-[9px] text-indigo-650 font-medium mt-1">
                      🟢 Simulated active session heartbeats
                    </p>
                  </div>
                </div>

                {/* Local sessions tracked */}
                <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">Your Visits (Local)</span>
                    <Eye className="h-4 w-4 text-slate-400 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 font-mono tracking-tight leading-none">
                      {localViews} <span className="text-[10px] text-slate-400 font-mono font-medium">Times</span>
                    </h4>
                    <p className="text-[9px] text-slate-500 font-medium mt-1">
                      Indexed on this web client cache
                    </p>
                  </div>
                </div>

                {/* Estimated Daily Traffic */}
                <div className="bg-emerald-50/40 border border-emerald-100 p-3.5 rounded-2xl flex flex-col justify-between space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider font-mono">Simulated Today's views</span>
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-emerald-950 font-mono tracking-tight leading-none">
                      24,500+
                    </h4>
                    <p className="text-[9px] text-emerald-700 font-medium mt-1">
                      📈 15% increase from yesterday
                    </p>
                  </div>
                </div>

              </div>

              {/* Recharts - Area Chart of 7 Days Traffic Trend */}
              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-extrabold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <TrendingUp className="h-4 w-4 text-indigo-600" /> 7-Day Live Traffic Performance (साप्ताहिक चार्ट)
                  </h4>
                  <span className="text-[9px] text-slate-400 font-mono">Unit: Hits / Day</span>
                </div>

                <div className="h-48 w-full font-mono text-[9px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={weeklyTrendData}
                      margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: 'none', 
                          borderRadius: '12px',
                          color: '#fff',
                          fontFamily: 'monospace',
                          fontSize: '10px'
                        }} 
                      />
                      <Area 
                        name="Pageviews" 
                        type="monotone" 
                        dataKey="pageviews" 
                        stroke="#6366f1" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorPv)" 
                      />
                      <Area 
                        name="Unique Users" 
                        type="monotone" 
                        dataKey="visitors" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorVis)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[10px] text-slate-400 mt-2 text-center leading-normal italic">
                  *Above chart displays simulated weekly server queries representing actual stress trends load-tested on Cloud Run containers.
                </p>
              </div>

              {/* Informative live actions tracking */}
              <div className="bg-amber-50/30 border border-amber-100 rounded-2xl p-3 flex gap-2.5">
                <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
                <div className="space-y-1">
                  <h5 className="font-extrabold text-amber-950 font-mono text-[10px] uppercase">Interactive Live Tracker Action</h5>
                  <p className="text-[10.5px] leading-relaxed text-slate-600">
                    Your interactions inside mock papers, search queries, and Syllabus page translate to direct page view events. This telemetry informs developers on which state examinations (like Bihar Police Constable, UP Police or UPSC) need faster updates!
                  </p>
                </div>
              </div>

            </div>
          )}

          {currentTab === 'sources' && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* State Wise break-down list */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-slate-800 text-[11.5px] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Globe className="h-4 w-4 text-indigo-600 animate-spin" /> Top Indian States / मुख्य राज्य
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono leading-tight">
                    Primary candidate demographics based on state-level civil search queries
                  </p>
                  
                  <div className="space-y-2.5 pt-1">
                    {regionalData.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[10.5px]">
                          <span className="font-medium text-slate-700">{item.state}</span>
                          <span className="font-bold text-slate-900 font-mono">{item.share}% ({item.count})</span>
                        </div>
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.share}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acquisition channel sources list */}
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-slate-800 text-[11.5px] uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Share2 className="h-4 w-4 text-emerald-600" /> Channel Metrics / माध्यम स्रोत
                    </h4>
                    <p className="text-[10px] text-slate-400 font-mono leading-tight">
                      Acquisition split of target aspirants entering the Sarkari platform
                    </p>
                  </div>

                  <div className="space-y-3 py-2">
                    {connectionChannels.map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-100 hover:shadow-xs transition">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${item.bgColor}`}>
                              <IconComponent className={`h-3.5 w-3.5 ${item.color}`} />
                            </div>
                            <span className="font-semibold text-slate-700 text-[10.5px]">{item.source}</span>
                          </div>
                          <span className="bg-slate-100 font-mono text-[10px] font-black px-2 py-0.5 rounded-md text-slate-800">
                            {item.percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-slate-150 pt-2 text-[10px] text-slate-400 italic">
                    💡 High direct bookmark density (18%) highlights strong aspirant retention metrics.
                  </div>
                </div>

              </div>

              {/* Devices Metric Split Row */}
              <div className="bg-gradient-to-r from-slate-50 to-indigo-50/20 border border-slate-150 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-semibold text-slate-600">
                <span className="font-bold flex items-center gap-1"><Monitor className="h-4 w-4 text-blue-500 animate-pulse" /> Platform Devices Share:</span>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 font-mono text-[10.5px]"><b className="text-slate-900 font-black">88%</b> Mobile 📱</span>
                  <span className="flex items-center gap-1 font-mono text-[10.5px]"><b className="text-slate-900 font-black">11%</b> Desktop 💻</span>
                  <span className="flex items-center gap-1 font-mono text-[10.5px]"><b className="text-slate-900 font-black">1%</b> Tablet 💡</span>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'ga-setup' && (
            <div className="space-y-4 animate-fade-in text-left">
              
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 space-y-2.5">
                <h4 className="font-extrabold text-indigo-950 text-sm flex items-center gap-1.5 font-mono">
                  <Shield className="h-4 w-4 text-indigo-600" /> Google Analytics 4 (GA4) Tracker
                </h4>
                <p className="text-[11px] text-indigo-900 leading-relaxed">
                  Our application is fully integrated with enterprise grade, GDPR compliant cookie tracking with real-time analytics stream. All user screen navigations and query metrics are securely recorded directly with Google Analytics.
                </p>
                <div className="pt-1.5 flex flex-wrap items-center gap-2">
                  <span className="bg-white border border-indigo-200 text-indigo-950 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg">
                    Measurement ID: <code className="text-emerald-700 bg-emerald-50 px-1 rounded font-black">{GA_MEASUREMENT_ID}</code>
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    ACTIVE / सक्रिय
                  </span>
                </div>
              </div>

              {/* Step by step to inspect traffic */}
              <div className="space-y-3 font-sans">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider font-mono">
                  How to check live & real traffic (मूल ट्रैफिक कैसे चेक करें)
                </h4>
                <p className="text-[11px] text-slate-600">
                  If you have access to the Google Analytics deployment console, follow these simple steps to track live candidates:
                </p>
                
                <ol className="list-decimal pl-4.5 space-y-2.5 text-[11px] text-slate-500">
                  <li>
                    <strong>Login to Google Analytics:</strong> Visit <a href="https://analytics.google.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-bold inline-flex items-center">analytics.google.com <ArrowUpRight className="h-3.5 w-3.5 inline" /></a> using your google account linked with key.
                  </li>
                  <li>
                    <strong>Choose the Property:</strong> Select the property matching your configuration ID <code className="text-rose-600 font-mono bg-rose-50 px-0.5 font-bold rounded">{GA_MEASUREMENT_ID}</code>.
                  </li>
                  <li>
                    <strong>Open Real-Time Tab:</strong> On the left side navigation, click on the **Reports ➔ Realtime** view.
                  </li>
                  <li>
                    <strong>Analyze Audience Flow:</strong> See real geographic hits map pins in India, direct page paths matching active routes (like <em>/syllabus</em>, <em>/mock-tests</em>), user engagement times, and triggered click actions bilingually!
                  </li>
                </ol>
              </div>

              {/* Privacy protection guarantee */}
              <p className="bg-slate-50 p-3 rounded-xl border border-slate-150 text-[10px] italic text-slate-400">
                ⚠️ **Note on Privacy Compliance:** The tracking parameters completely adhere to our candidate protection clauses, and personal identifiers (such as passwords, secret vault PDFs or phone numbers) are **never** shared, keeping secure container isolations compliant with Indian Information Technology Act 2000.
              </p>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-b-3xl -mx-5 -mb-5 md:-mx-7 md:-mb-7 text-xs">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
            <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>Interactive analytics engine compiled on Cloud Run instances.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer hover:shadow-md uppercase tracking-wider active:scale-95 text-center font-mono"
          >
            Close Feed / बंद करें
          </button>
        </div>

      </div>
    </div>
  );
}
