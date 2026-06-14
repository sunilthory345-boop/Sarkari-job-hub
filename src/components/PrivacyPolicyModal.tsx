import React from 'react';
import { ShieldCheck, Eye, Lock, FileText, Globe, Key, AlertTriangle, CheckSquare, X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto animate-fade-in" id="privacy-policy-modal">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative max-w-2xl w-full text-slate-700 max-h-[90vh] flex flex-col font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="text-left space-y-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-550/10 px-2.5 py-0.5 text-[9px] font-mono font-black text-blue-800 uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3 animate-pulse" /> Security Compliance Gateway
            </span>
            <h3 className="font-sans text-lg font-black text-slate-900 tracking-tight">
              Privacy Policy & Candidate Data Protection (गोपनीयता नीति)
            </h3>
            <p className="text-[10px] text-slate-500 font-mono">
              Last Updated: June 14, 2026 • Compliant with Indian IT Act 2000 (Section 43A) & GDPR
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

        {/* Scrollable Policy Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 text-xs text-slate-600 leading-relaxed text-left pr-2 scrollbar-thin">
          
          {/* Quick Bilingual Summary */}
          <div className="bg-blue-50/40 border border-blue-100 rounded-2xl p-4 space-y-3">
            <h4 className="font-extrabold text-blue-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5 font-mono">
              <Globe className="h-4 w-4 text-blue-600" /> Bilingual Core Promise / बुनियादी वादा
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-[10.5px]">
              <div className="space-y-1">
                <strong className="text-blue-950 font-bold block">English Perspective:</strong>
                <p>
                  We securely index verified government exam notifications. Your mock test results, uploaded admit cards, and regional search parameters strictly remain in your local terminal cache unless backed up securely in the cloud.
                </p>
              </div>
              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-blue-150 sm:pl-4">
                <strong className="text-slate-900 font-bold block">हिंदी दृष्टिकोण:</strong>
                <p className="leading-normal">
                  हम प्रमाणित सरकारी नौकरी अधिसूचनाओं को सुरक्षित रूप से सूचीबद्ध करते हैं। आपकी मॉक परीक्षा परिणाम, एडमिट कार्ड और खोज पैरामीटर पूरी तरह से स्थानीय स्टोरेज में सुरक्षित रहते हैं।
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Data Collection & Processing */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Eye className="h-4 w-4 text-indigo-600" /> 
              <span>1. Information We Collect / हमारे द्वारा एकत्रित की जाने वाली जानकारी</span>
            </h4>
            <p>
              To provide mock scorecard analytics, automatic civil syllabus schedules, and verification of admit cards, we process the following parameters:
            </p>
            <ul className="list-disc pl-4 space-y-1 font-sans text-slate-500">
              <li>
                <strong>Candidate Profile Credentials:</strong> Your username, target examinations (e.g. UPSC, SSC, Bank or State PSC), local language settings, and active test durations.
              </li>
              <li>
                <strong>Sarkari Upload Vault Artifacts:</strong> PDF copies of Hall Tickets and Admit cards. These are managed inside secure sandbox storage to prevent illegal credential replication.
              </li>
              <li>
                <strong>Telemetry & Meta Keywords:</strong> Organic search queries (like "Sarkari Result 2026") used to optimize internal diagnostic search listings bilingually.
              </li>
            </ul>
          </div>

          {/* Section 2: Cookie Policy & AdSense Consent */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-600" /> 
              <span>2. Cookies & Advertising Performance / कुकीज़ और विज्ञापन</span>
            </h4>
            <p>
              To keep study tools, previous year solved papers, and syllabus updates completely free, we use programmatic marketing systems:
            </p>
            <p className="bg-slate-50 p-2.5 rounded-xl border border-slate-150 text-[10.5px] italic text-slate-500">
              <strong>Google AdSense & DoubleClick Cookie:</strong> Google uses cookies to serve customized government job banners based on candidates' previous visits to Job Sarkari Hub or other state portals. You can choose to disable localized cookies via your device's web privacy settings.
            </p>
          </div>

          {/* Section 3: Information Safeguarding & Encryption */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Key className="h-4 w-4 text-amber-600" />
              <span>3. Cryptographic Security Standards / डेटा सुरक्षा सुरक्षा कानून</span>
            </h4>
            <p>
              Our infrastructure employs standard AES-256 state-of-the-art encryption layers proxying through Cloud Run containers to keep uploaded sheets perfectly secure. We maintain offline-first isolation protocols to guarantee third parties cannot access candidate mock score sheets.
            </p>
          </div>

          {/* Section 4: Refund and Legal Clauses */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <span>4. Legal Disclaimers & Fair Use / कानूनी अस्वीकरण</span>
            </h4>
            <p className="text-slate-500">
              Job Sarkari Hub is an educational simulation assistant representing mock patterns. This portal is not official, federal, or directly affiliated with the Ministry of Personnel, SSC, UPSC, or any state recruitment departments. For verified announcements, always crosscheck standard national gazette releases directly on official governmental domains (.gov.in).
            </p>
          </div>

        </div>

        {/* Footer actions inside modal */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 p-4 rounded-b-3xl -mx-6 -mb-6 md:-mx-8 md:-mb-8">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
            <CheckSquare className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Complies with Google Safety Partner Rules (GA4 Verification)</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer hover:shadow-md uppercase tracking-wider active:scale-95 text-center font-mono"
          >
            I Accept / स्वीकार करें
          </button>
        </div>

      </div>
    </div>
  );
}
