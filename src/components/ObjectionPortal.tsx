import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, FileText, AlertTriangle, Send, 
  HelpCircle, CheckCircle, Database, RefreshCw, CreditCard, Download, ExternalLink
} from 'lucide-react';
import { AnswerKey } from '../types';

interface Objection {
  id: string;
  examTitle: string;
  questionNumber: number;
  yourSuggestedOption: string;
  justification: string;
  status: 'Received' | 'In Audit Review' | 'Accepted (Refund Issued)' | 'Declined';
  dateSubmitted: string;
}

interface ObjectionPortalProps {
  triggerToast: (msg: string) => void;
  answerKeys?: AnswerKey[];
}

export default function ObjectionPortal({ triggerToast, answerKeys = [] }: ObjectionPortalProps) {
  const [objections, setObjections] = useState<Objection[]>(() => {
    const saved = localStorage.getItem('sarkari_candidate_objections');
    return saved ? JSON.parse(saved) : [
      {
        id: 'obj-1',
        examTitle: 'SSC MTS Math/General English 2026 Shift Answer Sheet',
        questionNumber: 24,
        yourSuggestedOption: 'Option C',
        justification: "According to standard NCERT Chapter 5 of Class 10 Math, the formula for Arithmetic Mean is mathematically sound. Option B listed in the key contains major printing errors.",
        status: 'In Audit Review',
        dateSubmitted: '2026-06-10'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sarkari_candidate_objections', JSON.stringify(objections));
  }, [objections]);

  const [selectedExam, setSelectedExam] = useState(() => answerKeys.length > 0 ? answerKeys[0].title : '');

  const [activeSubTab, setActiveSubTab] = useState<'browse' | 'dispute'>('browse');
  const [browseExamId, setBrowseExamId] = useState(() => answerKeys.length > 0 ? answerKeys[0].id : '');
  const selectedBrowseExam = answerKeys.find(k => k.id === browseExamId);
  const [browseDate, setBrowseDate] = useState('');
  const [browseShift, setBrowseShift] = useState('');

  useEffect(() => {
    if (selectedBrowseExam) {
      if (selectedBrowseExam.dates && selectedBrowseExam.dates.length > 0) {
        setBrowseDate(selectedBrowseExam.dates[0]);
      }
      if (selectedBrowseExam.shifts && selectedBrowseExam.shifts.length > 0) {
        setBrowseShift(selectedBrowseExam.shifts[0]);
      }
    }
  }, [browseExamId, selectedBrowseExam]);

  useEffect(() => {
    if (answerKeys.length > 0 && !selectedExam) {
      setSelectedExam(answerKeys[0].title);
    }
  }, [answerKeys, selectedExam]);
  const [questionNum, setQuestionNum] = useState<number>(1);
  const [suggestedOption, setSuggestedOption] = useState('Option A');
  const [explanationText, setExplanationText] = useState('');
  const [paymentGateway, setPaymentGateway] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  const handleSubmitObjection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanationText.trim()) {
      triggerToast("⚠️ Provide a thorough justification text prior to submitting.");
      return;
    }

    setPaymentGateway(true);
  };

  const handleSimulatedPayment = () => {
    setLoadingFile(true);
    
    setTimeout(() => {
      const newObj: Objection = {
        id: `obj-${Date.now()}`,
        examTitle: selectedExam,
        questionNumber: questionNum,
        yourSuggestedOption: suggestedOption,
        justification: explanationText,
        status: 'Received',
        dateSubmitted: new Date().toISOString().split('T')[0]
      };

      setObjections([newObj, ...objections]);
      setExplanationText('');
      setPaymentGateway(false);
      setLoadingFile(false);
      triggerToast("✅ Candidate objection filed successfully! Received confirmation receipt.");
    }, 1800);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans text-slate-800">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-4 space-y-1 text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 uppercase tracking-wider">
          ⚖️ COMMISSION DISPUTE BOARD (आपत्ति दर्ज करें)
        </span>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
          Candidate Objection Panel & Solved Keys
        </h2>
        <p className="text-xs text-slate-500">
          Disagree with any answer keys declared by the exam board? File official objections with academic justification citations.
        </p>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveSubTab('browse')}
          className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition cursor-pointer ${
            activeSubTab === 'browse'
              ? 'border-emerald-500 text-emerald-600 font-extrabold bg-emerald-50/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          🔍 View Shift & Date Wise Keys (तिथि और शिफ्ट वार उत्तर कुंजी)
        </button>
        <button
          onClick={() => setActiveSubTab('dispute')}
          className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition cursor-pointer ${
            activeSubTab === 'dispute'
              ? 'border-blue-600 text-blue-700 font-extrabold bg-blue-50/20'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          ⚖️ File Dispute / Lodge Objection (आपत्ति दर्ज करें)
        </button>
      </div>

      {/* TAB 1: BROWSE KEYS BY DATE & SHIFT */}
      {activeSubTab === 'browse' && (
        <div className="space-y-6">
          {/* selectors */}
          <div className="grid gap-4 sm:grid-cols-3 bg-slate-50 p-4 rounded-2xl border border-slate-150">
            <div className="text-left">
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <span>📋</span> Select Vacancy / Exam (भर्ती चुनें)
              </label>
              <select
                value={browseExamId}
                onChange={(e) => setBrowseExamId(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
              >
                {answerKeys.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.title.length > 55 ? k.title.substring(0, 55) + '...' : k.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-left">
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <span>📅</span> Exam Date (परीक्षा तिथि)
              </label>
              <select
                value={browseDate}
                onChange={(e) => setBrowseDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
              >
                {selectedBrowseExam?.dates?.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="text-left">
              <label className="block text-[11px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                <span>⏱️</span> Exam Shift (परीक्षा पाली / शिफ्ट)
              </label>
              <select
                value={browseShift}
                onChange={(e) => setBrowseShift(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-emerald-500"
              >
                {selectedBrowseExam?.shifts?.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* results panel */}
          <div className="grid gap-6 md:grid-cols-12 text-xs text-left">
            {/* Left Column: List of Questions & Solved Answers */}
            <div className="md:col-span-8 space-y-4">
              <div className="border border-slate-200 rounded-2xl p-4 bg-white space-y-3 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Official Solved Key Sheet
                    </h4>
                    <p className="text-slate-500 text-[10.5px]">
                      Date: <strong>{browseDate}</strong> • Shift: <strong>{browseShift}</strong>
                    </p>
                  </div>
                  {selectedBrowseExam?.pdfUrl && (
                    <a
                      href={selectedBrowseExam.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 transition text-[11px]"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Full Solved PDF
                    </a>
                  )}
                </div>

                {/* Question Key List */}
                <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
                  {selectedBrowseExam && selectedBrowseExam.questionsList && selectedBrowseExam.questionsList[`${browseDate}_${browseShift}`] ? (
                    selectedBrowseExam.questionsList[`${browseDate}_${browseShift}`].map((q) => (
                      <div key={q.qNo} className="p-3 border border-slate-100 rounded-xl bg-slate-50 hover:bg-white hover:border-emerald-200 transition space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-extrabold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[10px]">
                            Q.{q.qNo}
                          </span>
                          <p className="font-medium text-slate-800 leading-relaxed text-[11px] flex-1 text-left">
                            {q.question}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100/50">
                          <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
                            <span className="text-xs">🟢</span> Correct Answer: <span className="bg-emerald-100/70 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-800">{q.correctOption}</span>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedExam(selectedBrowseExam.title);
                              setQuestionNum(q.qNo);
                              setSuggestedOption(
                                q.correctOption.includes('Option A') ? 'Option B' :
                                q.correctOption.includes('Option B') ? 'Option A' : 'Option C'
                              );
                              setActiveSubTab('dispute');
                              triggerToast(`📍 Pre-filled Dispute Form for Question #${q.qNo}!`);
                            }}
                            className="text-[10px] text-blue-600 hover:text-blue-800 font-extrabold bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition cursor-pointer"
                          >
                            ⚠️ Raise Objection (आपत्ति)
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      No solved questions found for the selected combination.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Vacancy Details, Schedule, Help */}
            <div className="md:col-span-4 space-y-4">
              <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-2xl p-4 text-white space-y-3.5 shadow-sm text-left">
                <div className="space-y-1">
                  <span className="text-[10px] text-emerald-300 font-extrabold tracking-widest uppercase">Vacancy Org</span>
                  <h4 className="font-extrabold text-sm leading-tight text-white">
                    {selectedBrowseExam?.org}
                  </h4>
                </div>

                <div className="space-y-2 text-[11px] text-slate-200">
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span>Release Date:</span>
                    <strong className="text-white">{selectedBrowseExam?.released}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span>Objection Deadline:</span>
                    <strong className="text-amber-300">{selectedBrowseExam?.objectionsLimit}</strong>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span>Total Shifts:</span>
                    <strong className="text-white">{selectedBrowseExam?.shifts?.length || 0} Shifts</strong>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span>Exam Dates:</span>
                    <strong className="text-white text-right line-clamp-2 max-w-[150px]">{selectedBrowseExam?.dates?.join(', ')}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (selectedBrowseExam) {
                        setSelectedExam(selectedBrowseExam.title);
                      }
                      setActiveSubTab('dispute');
                    }}
                    className="w-full py-2 bg-white text-slate-900 font-extrabold rounded-xl hover:bg-emerald-50 transition text-center shadow-xs cursor-pointer"
                  >
                    ⚖️ Raise Answer Dispute
                  </button>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3 text-left">
                <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <span>ℹ️</span> Help Desk & Guidelines
                </h4>
                <ul className="space-y-2 text-[10.5px] text-slate-600 list-disc pl-4 leading-relaxed">
                  <li>Select any vacancy from the dropdown to check the respective date-wise shift answer booklet keys.</li>
                  <li>In case of a perceived printing error or wrong option assignment, click "Raise Objection" to submit textbook proof.</li>
                  <li>Double-checked keys are vetted by senior commission professors within 72 hours of submission.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ORIGINAL LODGE DISPUTE / OBJECTION FORM */}
      {activeSubTab === 'dispute' && (
        <div className="grid gap-6 md:grid-cols-12 text-xs">
          
          {/* Left Side: Objection Form */}
          <div className="md:col-span-7 bg-slate-50/50 border border-slate-150 rounded-2xl p-4 sm:p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-850 flex items-center gap-1.5 border-b border-slate-150 pb-2 text-left">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
              File New Key Dispute Form
            </h3>

            <form onSubmit={handleSubmitObjection} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Select Commission Answer Key</label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
                >
                  {answerKeys.map((keyItem, i) => (
                    <option key={i} value={keyItem.title}>{keyItem.title} ({keyItem.org})</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Question Number #</label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={questionNum}
                    onChange={(e) => setQuestionNum(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:outline-hidden"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Correct Choice is actually:</label>
                  <select
                    value={suggestedOption}
                    onChange={(e) => setSuggestedOption(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2 focus:outline-hidden"
                  >
                    <option value="Option A">Option A (विकल्प A)</option>
                    <option value="Option B">Option B (विकल्प B)</option>
                    <option value="Option C">Option C (विकल्प C)</option>
                    <option value="Option D">Option D (विकल्प D)</option>
                    <option value="None of these (प्रिंट त्रुटि)">Ambiguous Question/None of These</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Academic Justification / Textbook Citations (प्रमाण पत्र सहित)</label>
                <textarea
                  rows={4}
                  value={explanationText}
                  onChange={(e) => setExplanationText(e.target.value)}
                  placeholder="Cite specific textbook guidelines, NCERT formulas, or state gazette volumes showing why the provisional exam answer key is incorrect."
                  className="w-full rounded-lg border border-slate-200 bg-white p-3 leading-relaxed focus:outline-hidden text-slate-800 placeholder-slate-400"
                  required
                ></textarea>
              </div>

              <div className="bg-amber-100/50 border border-amber-200 rounded-xl p-3 text-[11px] text-slate-600 font-medium">
                🔔 <strong>Dispute Tariff Notice:</strong> Government commissions charge a non-refundable audit assessment fee of <strong>₹100 per question</strong> objection to avoid spam filings. Refunded automatically if the challenge is accepted.
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 shadow-md transition-all duration-150 cursor-pointer"
              >
                Verify Objection details (₹100 Fee)
              </button>
            </form>
          </div>

          {/* Right Side: Track Submitted Objections */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3.5 shadow-xs text-left">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <CheckSquare className="h-4 w-4 text-emerald-600" /> Active Provisional Solved catalog
              </h4>
              
              <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                {answerKeys.map((keyItem, i) => (
                  <div key={i} className="p-2 border border-slate-150 rounded-lg bg-slate-50 space-y-1.5 hover:border-blue-200 transition">
                    <h5 className="font-bold text-slate-800 text-[11px] leading-tight">{keyItem.title}</h5>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] text-slate-400 font-medium">Limit: {keyItem.objectionsLimit}</span>
                      <span className="text-blue-700 font-bold uppercase text-[9px]">{keyItem.org}</span>
                    </div>
                    {keyItem.pdfUrl && (
                      <div className="pt-0.5">
                        <a
                          href={keyItem.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[9.5px] font-extrabold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded px-2 py-0.5 transition"
                        >
                          <Download className="h-3 w-3" /> Download PDF Key
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs text-left">
              <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest">
                My Lodged Objections ({objections.length})
              </h4>

              {objections.length === 0 ? (
                <p className="text-[10px] text-slate-400 text-center py-4">No active objections filed in this session.</p>
              ) : (
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {objections.map((obj) => (
                    <div key={obj.id} className="p-3 border border-slate-100 rounded-xl space-y-2 bg-slate-50/50 text-left">
                      <div className="flex items-start justify-between gap-1 text-left">
                        <span className="font-bold text-[10.5px] text-slate-800 line-clamp-1 flex-1">{obj.examTitle}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-extrabold uppercase ${
                          obj.status === 'Received' 
                            ? 'bg-blue-100 text-blue-700' 
                            : obj.status === 'In Audit Review' 
                              ? 'bg-amber-100 text-amber-800 animate-pulse' 
                              : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {obj.status}
                        </span>
                      </div>

                      <div className="text-[10px] space-y-1.5 text-slate-500 text-left">
                        <p>Question: <strong>#{obj.questionNumber}</strong> • Claim: <strong>{obj.yourSuggestedOption}</strong></p>
                        <p className="italic bg-white p-1.5 rounded border border-slate-100 line-clamp-2">"{obj.justification}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Simulated Objection Payment Gateway Modal Dialog */}
      {paymentGateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs font-sans text-xs">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 max-w-sm w-full space-y-4 shadow-2xl animate-fade-in text-left">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800">Secure Objection Filing Checkout</h3>
            </div>

            <div className="space-y-2">
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Paying candidate objection processing fee for:
              </p>
              <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 space-y-1 font-sans">
                <p className="font-bold text-blue-900 truncate">{selectedExam}</p>
                <p className="text-[11px] text-slate-600 font-semibold">Question: {questionNum} ({suggestedOption})</p>
              </div>

              <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg font-mono">
                <span className="font-sans font-bold text-slate-500">Dispute Fee Total:</span>
                <span className="text-sm font-extrabold text-slate-900">₹100 INR</span>
              </div>
            </div>

            {loadingFile ? (
              <div className="py-4 flex flex-col items-center justify-center gap-2">
                <RefreshCw className="h-6 w-6 animate-spin text-blue-700" />
                <span className="font-bold text-slate-505 animate-pulse">Confirming transaction with bank...</span>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setPaymentGateway(false)}
                  className="w-1/2 rounded-xl border border-slate-200 py-2.5 text-slate-550 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSimulatedPayment}
                  className="w-1/2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 transition"
                >
                  Confirm Pay (₹100)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
