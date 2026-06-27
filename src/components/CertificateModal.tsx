import React, { useRef } from 'react';
import { X, Award, Printer, ShieldCheck, Download, Star } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateName: string;
  candidateEmail: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: string;
  date: string;
}

export default function CertificateModal({
  isOpen,
  onClose,
  candidateName,
  candidateEmail,
  testTitle,
  score,
  totalQuestions,
  correctAnswers,
  timeTaken,
  date
}: CertificateModalProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    const printContent = certificateRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Create a temporary iframe or window to print only the certificate cleanly
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Job Sarkari Hub - Achievement Scorecard Certificate</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print {
                  body { margin: 0; padding: 20px; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body class="bg-white text-slate-800 font-sans">
              <div class="max-w-4xl mx-auto my-10">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  // Generate a mock authentic certification number
  const hashSum = (candidateName + testTitle + score).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const certNumber = `JSH-CERT-2026-${10000 + (hashSum % 90000)}`;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs font-sans animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-550 rounded-3xl border border-slate-700 p-1 sm:p-2 shadow-2xl flex flex-col max-h-[95vh] overflow-y-auto">
        
        {/* Modal Toolbar Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700 bg-slate-900 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">
              Verified Achievement Score Card & Certificate
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="h-3.5 w-3.5" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE CONTAINER */}
        <div className="bg-slate-100 p-4 sm:p-8 flex-1 overflow-x-auto">
          <div 
            ref={certificateRef}
            className="mx-auto min-w-[700px] max-w-[850px] bg-white border-8 border-double border-slate-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-md font-sans text-slate-800"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(248,250,252,0.6) 0%, rgba(255,255,255,1) 100%)' }}
          >
            {/* Elegant Corner Decorative Accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-slate-800"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-slate-800"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-slate-800"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-slate-800"></div>

            {/* Subtle Watermark Logo */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <Award className="w-[450px] h-[450px] text-slate-900" />
            </div>

            {/* Top Branding Section */}
            <div className="space-y-1 relative z-10">
              <div className="flex justify-center items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-black text-slate-900 tracking-wider">
                  JOB SARKARI HUB
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 tracking-widest uppercase">
                India's Premium Educational Assessment & Career Gateway
              </p>
              <div className="h-0.5 w-40 bg-slate-300 mx-auto my-2"></div>
            </div>

            {/* Certificate Title */}
            <div className="my-6 space-y-1.5 relative z-10">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold italic text-slate-800 uppercase tracking-wide">
                Certificate of Merit
              </h1>
              <h2 className="font-sans text-xs sm:text-sm font-extrabold text-blue-900 uppercase tracking-widest">
                योग्यता प्रमाण पत्र (Sarkari Mock Score Card)
              </h2>
            </div>

            {/* Recipient Text */}
            <div className="my-4 space-y-1 relative z-10">
              <p className="text-xs text-slate-400 font-medium italic">
                This is to officially certify that the candidate
              </p>
              <h3 className="text-xl sm:text-2xl font-sans font-black text-slate-900 border-b-2 border-dashed border-slate-300 inline-block px-10 py-1 font-serif">
                {candidateName}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono mt-1">
                Candidate Registered Email: {candidateEmail}
              </p>
            </div>

            {/* Achievement details */}
            <div className="my-6 px-4 sm:px-12 text-center relative z-10">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
                has successfully appeared, assessed, and mastered the Computer-Based Test (CBT) simulation of the federal examination guidelines for:
              </p>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mt-2 tracking-tight bg-slate-50 border border-slate-200 py-2 px-4 rounded-xl max-w-2xl mx-auto leading-snug">
                {testTitle}
              </h4>
            </div>

            {/* Statistics Matrix */}
            <div className="grid grid-cols-4 gap-2 my-6 max-w-2xl mx-auto bg-slate-50 p-4 rounded-2xl border border-slate-200 relative z-10 font-mono">
              <div className="text-center">
                <span className="block text-[9px] font-bold text-slate-400 uppercase">Score Achieved</span>
                <span className="text-sm sm:text-base font-black text-blue-900 mt-0.5 block">{score} Marks</span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="block text-[9px] font-bold text-slate-400 uppercase">Correct Solved</span>
                <span className="text-sm sm:text-base font-black text-emerald-600 mt-0.5 block">{correctAnswers} / {totalQuestions}</span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="block text-[9px] font-bold text-slate-400 uppercase">Accur. Rating</span>
                <span className="text-sm sm:text-base font-black text-indigo-700 mt-0.5 block">{percentage}%</span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="block text-[9px] font-bold text-slate-400 uppercase">Time Duration</span>
                <span className="text-sm sm:text-base font-black text-slate-700 mt-0.5 block">{timeTaken}</span>
              </div>
            </div>

            {/* Validation / Footer Section */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-slate-100 pt-6 relative z-10">
              {/* Seal */}
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center h-16 w-16 rounded-full border-4 border-dashed border-amber-500 bg-amber-50 shrink-0">
                  <Award className="h-8 w-8 text-amber-600 fill-amber-100/50" />
                  {/* Outer circle spin effect */}
                  <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-spin opacity-40" style={{ animationDuration: '8s' }}></div>
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest block">
                    OFFICIAL SIMULATION SEAL
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono block">
                    ID: {certNumber}
                  </span>
                  <span className="text-[9px] text-slate-400 block font-semibold">
                    Date of Assessment: {date}
                  </span>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="flex flex-col items-center sm:items-end">
                <div className="flex items-end gap-[1px] h-6 bg-white px-2">
                  <div className="w-[1px] h-full bg-slate-900"></div>
                  <div className="w-[2px] h-full bg-slate-900"></div>
                  <div className="w-[1px] h-full bg-slate-900"></div>
                  <div className="w-[3px] h-full bg-slate-900"></div>
                  <div className="w-[1px] h-full bg-slate-900"></div>
                  <div className="w-[2px] h-full bg-slate-900"></div>
                  <div className="w-[1px] h-full bg-slate-900"></div>
                  <div className="w-[4px] h-full bg-slate-900"></div>
                  <div className="w-[1px] h-full bg-slate-900"></div>
                  <div className="w-[2px] h-full bg-slate-900"></div>
                  <div className="w-[1px] h-full bg-slate-900"></div>
                </div>
                <span className="text-[8px] text-slate-400 font-mono tracking-widest mt-1">
                  SECURE CERTIFICATE DIGITAL KEY
                </span>
              </div>

              {/* Digital Signatures */}
              <div className="text-center sm:text-right">
                <div className="font-serif italic text-sm text-slate-800 font-bold tracking-tight">
                  Sarkari Mitra AI
                </div>
                <div className="h-px w-28 bg-slate-400 my-1 ml-auto"></div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">
                  Registrar / परीक्षा नियंत्रक
                </span>
                <span className="text-[8px] text-blue-600 font-bold flex items-center gap-0.5 justify-end mt-0.5">
                  <ShieldCheck className="h-3 w-3" /> Verified Secure
                </span>
              </div>
            </div>

            {/* Standard educational disclaimer */}
            <p className="text-[8px] text-slate-400 text-center mt-8 pt-4 border-t border-slate-100 font-sans leading-relaxed">
              *Disclaimer: This certificate verifies score accomplishments achieved strictly on the Job Sarkari Hub prep platform. This is an independent exam preparation sandbox and does not constitute official recruitment credentials from any federal board.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
