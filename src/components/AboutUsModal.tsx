import React from 'react';
import { 
  Users, Target, Award, ShieldCheck, Heart, 
  MapPin, CheckCircle2, Sparkles, Globe, X,
  TrendingUp, BookOpen, Coffee
} from 'lucide-react';

interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs overflow-y-auto animate-fade-in" id="about-us-modal">
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative max-w-2xl w-full text-slate-700 max-h-[90vh] flex flex-col font-sans">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-4">
          <div className="text-left space-y-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-550/10 px-2.5 py-0.5 text-[9px] font-mono font-black text-emerald-800 uppercase tracking-wider">
              <Sparkles className="h-3 w-3 text-emerald-600 animate-spin" /> Aspirant Empowerment Portal
            </span>
            <h3 className="font-sans text-lg font-black text-slate-900 tracking-tight">
              About Job Sarkari Hub / हमारे बारे में
            </h3>
            <p className="text-[10px] text-slate-505 font-mono">
              Empowering 10 Lakh+ Aspirants with Accurate Job Feeds & Smart Diagnostics Study Systems
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

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-6 text-xs text-slate-600 leading-relaxed text-left pr-2 scrollbar-thin">
          
          {/* Main Elevator Pitch */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-800 leading-normal">
              Welcome to <strong>Job Sarkari Hub</strong> – India’s fastest-growing digital mentorship gateway and mock exam companion built strictly for dedicated government job seekers.
            </p>
            <p className="text-slate-600">
              We bridge the massive information gap between complex government notifications, deep syllabus layouts, and actual student selection. Built by a passionate team of previous exam rankers and software developers, our web portal simulates high-fidelity exam patterns, provides real-time AI doubt solving, organizes preparation plans, and tracks candidate scores with surgical precision.
            </p>
          </div>

          {/* Core Highlights Stats Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-slate-200/50 p-3.5 rounded-2xl text-center space-y-1">
              <Users className="h-5 w-5 text-blue-600 mx-auto" />
              <div className="text-base font-black text-slate-900 font-mono">10 Lakh +</div>
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider font-mono">Aspirants Reached</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/50 p-3.5 rounded-2xl text-center space-y-1">
              <Award className="h-5 w-5 text-amber-500 mx-auto" />
              <div className="text-base font-black text-slate-900 font-mono">5,000 +</div>
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider font-mono">Verified Selections</div>
            </div>
            <div className="bg-slate-50 border border-slate-200/50 p-3.5 rounded-2xl text-center col-span-2 sm:col-span-1 space-y-1">
              <TrendingUp className="h-5 w-5 text-emerald-500 mx-auto" />
              <div className="text-base font-black text-slate-900 font-mono">98.4 %</div>
              <div className="text-[9px] text-slate-400 uppercase font-bold tracking-wider font-mono">Syllabus Coverage</div>
            </div>
          </div>

          {/* Bilingual Vision Accordion-style layout */}
          <div className="border border-slate-200/60 rounded-2xl overflow-hidden">
            <div className="bg-slate-50 p-3.5 border-b border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] font-black uppercase text-slate-800 tracking-wider flex items-center gap-1 font-mono">
                <Target className="h-4 w-4 text-emerald-600" /> Our Mission & Vision / हमारा मिशन
              </span>
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase font-mono">Core Values</span>
            </div>
            <div className="p-4 space-y-4 text-[10.5px]">
              <div className="space-y-1.5">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> English Charter: Accuracy & Speed
                </h5>
                <p className="text-slate-500 pl-5">
                  Our mission is to replace "government job info clutter" with a clean, high-speed, advertisement-balanced roadmap. We strive to give candidates premium-grade mock materials, immediate AI coaching (Doubt-Solver), and fully detailed previous year questions (PYQs) absolutely cataloged without predatory pricing schemas.
                </p>
              </div>

              <div className="border-t border-slate-150 pt-3 space-y-1.5">
                <h5 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> हिंदी घोषणापत्र: ग्रामीण छात्र सशक्तिकरण
                </h5>
                <p className="text-slate-500 pl-5">
                  हमारा प्रमुख लक्ष्य ग्रामीण और अर्ध-शहरी क्षेत्रों के विद्यार्थियों तक गुणवत्तापूर्ण अध्ययन सामग्री और लाइव अपडेट्स पहुंचाना है। हमारा उद्देश्य है कि आर्थिक तंगी या भाषा की बाधा किसी भी होनहार छात्र के सरकारी सेवा में चयनित होने के सपने को न रोके।
                </p>
              </div>
            </div>
          </div>

          {/* Section: Who We Serve */}
          <div className="space-y-2.5">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-indigo-600" /> 
              <span>What We Offer / हम क्या प्रदान करते हैं</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-3 text-slate-600 text-[10.5px]">
              <div className="p-3 bg-indigo-50/30 border border-indigo-100 rounded-xl space-y-1">
                <span className="font-bold text-indigo-950 block">🚀 Real-time Info Bulletins</span>
                <p className="text-slate-500">Live notifications for UP Police, SSC, railways, defense, banking, and civil state level vacancies bilingually.</p>
              </div>

              <div className="p-3 bg-emerald-50/30 border border-emerald-100 rounded-xl space-y-1">
                <span className="font-bold text-emerald-950 block">🎯 Smart MCQ Sandbox</span>
                <p className="text-slate-500">Highly customized mock exam suites, bilingual revision booklets, subject analytics boards, and printable syllabus planners.</p>
              </div>

              <div className="p-3 bg-amber-50/30 border border-amber-100 rounded-xl space-y-1">
                <span className="font-bold text-amber-950 block">🤖 Server-Side AI Doubt Guru</span>
                <p className="text-slate-500">Instant quantum doubts resolution powered securely by Google Gemini, maintaining strict private client boundaries.</p>
              </div>

              <div className="p-3 bg-pink-50/30 border border-pink-100 rounded-xl space-y-1">
                <span className="font-bold text-pink-950 block">📂 Upload Vault Integration</span>
                <p className="text-slate-500">Secure digital locker keeping your selected call letters and mock checklists safe using high encryption routines of IT Act.</p>
              </div>
            </div>
          </div>

          {/* Compliance & Affiliation Warning */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex gap-3 text-slate-700 text-[10.5px]">
            <ShieldCheck className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-left">
              <strong className="text-rose-950 font-bold block uppercase tracking-wide font-mono text-[9px]">Official Representation Warning & Disclaimer:</strong>
              <p className="leading-relaxed">
                Job Sarkari Hub is an independent, non-governmental, educational simulation platform designed for mock tests and informational study curation. This application does not represent, is not allied with, and is not authorized to act on behalf of the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Railway Board, or any state or federal governmental entity. Please match our alerts against verified notices directly published on standard ministerial portals (e.g. <em>civilservices.gov.in</em> or <em>ssc.gov.in</em>).
              </p>
            </div>
          </div>

        </div>

        {/* Footer actions inside modal */}
        <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 p-4 rounded-b-3xl -mx-6 -mb-6 md:-mx-8 md:-mb-8">
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500 shrink-0" />
            <span>Empowering future officers of our great nation with sincerity.</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer hover:shadow-md uppercase tracking-wider active:scale-95 text-center font-mono"
          >
            Aspirant Salute / बंद करें
          </button>
        </div>

      </div>
    </div>
  );
}
