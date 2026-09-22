import React, { useState } from 'react';
import { 
  X, Megaphone, CheckCircle2, TrendingUp, Users, Target, 
  Send, Sparkles, Phone, Mail, Building, Calculator, DollarSign, 
  ExternalLink, Layers, ShieldCheck
} from 'lucide-react';

interface AdvertiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerToast?: (msg: string) => void;
}

export default function AdvertiseModal({
  isOpen,
  onClose,
  triggerToast
}: AdvertiseModalProps) {
  const [advertiserName, setAdvertiserName] = useState('');
  const [instituteOrBrand, setInstituteOrBrand] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState<'leaderboard' | 'infeed' | 'sticky' | 'whatsapp'>('infeed');
  const [selectedDuration, setSelectedDuration] = useState<'7' | '15' | '30'>('30');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Pricing calculator estimate
  const baseRates = {
    leaderboard: 14999, // ₹14,999 / month
    infeed: 11999,      // ₹11,999 / month
    sticky: 18999,      // ₹18,999 / month
    whatsapp: 7999      // ₹7,999 / broadcast
  };

  const durationMultiplier = selectedDuration === '7' ? 0.35 : selectedDuration === '15' ? 0.65 : 1;
  const estimatedCost = Math.round(baseRates[selectedPlacement] * durationMultiplier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instituteOrBrand.trim() || !contactNumber.trim()) {
      if (triggerToast) triggerToast('⚠️ Please enter your institute name and contact phone number.');
      return;
    }
    setSubmitted(true);
    if (triggerToast) {
      triggerToast('🎉 Advertising inquiry received! Our ad desk will contact you within 2 hours.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto font-sans">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 text-left space-y-6">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-linear-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-900/15">
              <Megaphone className="h-6 w-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Sarkari Ads Network • विज्ञापन डेस्क
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight mt-0.5">
                Advertise on Job Sarkari Hub
              </h3>
              <p className="text-xs text-slate-500">
                Reach over 1.2+ Million verified government exam candidates across India every month.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-full transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-scale-up">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md shadow-emerald-500/15">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h4 className="text-xl font-black text-slate-900">Inquiry Submitted Successfully!</h4>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{advertiserName || instituteOrBrand}</strong>. Our official advertising operations team will review your creative specifications and call your phone at <strong className="text-blue-700 font-mono">{contactNumber}</strong>.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1 max-w-md mx-auto">
              <p><strong>Selected Slot:</strong> {selectedPlacement.toUpperCase()}</p>
              <p><strong>Duration:</strong> {selectedDuration} Days</p>
              <p><strong>Estimated Campaign Package:</strong> ₹{estimatedCost.toLocaleString()} + GST</p>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Submit Another Campaign
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#1E3A8A] text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition cursor-pointer"
              >
                Back to Portal
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Monthly Visitors</span>
                <strong className="text-sm font-black text-blue-900">1.24 Million+</strong>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Audience Profile</span>
                <strong className="text-sm font-black text-emerald-700">18-32 Yrs Aspirants</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Avg. CTR Performance</span>
                <strong className="text-sm font-black text-amber-700">4.8% High Action</strong>
              </div>
            </div>

            {/* Campaign Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">
                    Your Name / Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={advertiserName}
                    onChange={(e) => setAdvertiserName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma (Marketing Head)"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-600 text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">
                    Coaching Institute / Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={instituteOrBrand}
                    onChange={(e) => setInstituteOrBrand(e.target.value)}
                    placeholder="e.g. Drishti Academy / Testbook Pro"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-600 text-slate-800 font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-600 text-slate-800 font-medium font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-extrabold text-slate-700 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="contact@coachingacademy.com"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-600 text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Slot Selection */}
              <div className="space-y-1.5 pt-1">
                <label className="font-extrabold text-slate-700 block">
                  Select Ad Format / Placement
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'leaderboard', name: 'Top Leaderboard', desc: '728x90 Header Bar' },
                    { id: 'infeed', name: 'In-Feed Vacancy Card', desc: 'Native in Job Grid' },
                    { id: 'sticky', name: 'Bottom Sticky Anchor', desc: '100% Screen Vis.' },
                    { id: 'whatsapp', name: 'WhatsApp Channel', desc: 'Direct Push Alert' }
                  ].map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setSelectedPlacement(slot.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                        selectedPlacement === slot.id
                          ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <strong className="block text-[11px] font-black">{slot.name}</strong>
                      <span className="text-[9.5px] text-slate-450 block">{slot.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration and Budget Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-1 bg-amber-50/70 border border-amber-200 p-3 rounded-2xl">
                <div>
                  <span className="text-[10px] text-amber-900 font-bold block uppercase">Campaign Duration:</span>
                  <div className="flex gap-2 mt-1">
                    {(['7', '15', '30'] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setSelectedDuration(d)}
                        className={`px-3 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                          selectedDuration === d
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 border border-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        {d} Days
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-right sm:text-right">
                  <span className="text-[10px] text-slate-500 font-bold block">Estimated Package:</span>
                  <strong className="text-base sm:text-lg font-black text-slate-900">
                    ₹{estimatedCost.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">(approx)</span>
                  </strong>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-slate-700 block">
                  Campaign Target / Target Exams (Optional)
                </label>
                <textarea
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="e.g. We want to promote our SSC CGL 2026 Live Batch to candidates in UP, Bihar, and Rajasthan..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-blue-600 text-slate-800 font-medium"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-[#1E3A8A] hover:bg-blue-800 text-white rounded-xl font-black shadow-md shadow-blue-900/15 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Campaign Booking</span>
                </button>
              </div>
            </form>
          </>
        )}

      </div>
    </div>
  );
}
