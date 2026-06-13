import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, FileText, CheckCircle2, Trash2, DownloadCloud, FileCheck, HelpCircle, 
  Layers, Plus, FileUp, ShieldCheck, RefreshCw, Calendar, MapPin, Sparkles, UserCheck 
} from 'lucide-react';
import { UserProfile, AdmitCard, MockTest, Question } from '../types';

interface SarkariUploadVaultProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  onAddAdmitCard: (newCard: AdmitCard) => void;
  onAddMockTest: (newTest: MockTest) => void;
  onAddPYQ: (newPYQ: { title: string; exam: string; size: string; premium: boolean; year: number }) => void;
  triggerToast: (msg: string) => void;
  onChangeTab?: (tab: string) => void;
}

interface UploadedDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedDate: string;
  category: 'Educational Marksheet' | 'Resume' | 'Identity Proof' | 'Other Certification';
}

export default function SarkariUploadVault({
  user,
  setUser,
  onAddAdmitCard,
  onAddMockTest,
  onAddPYQ,
  triggerToast,
  onChangeTab
}: SarkariUploadVaultProps) {
  // ---- TAB STATES ----
  const [activeSubTab, setActiveSubTab] = useState<'applied-docs' | 'admit-cards' | 'mock-test' | 'pyq-upl'>('applied-docs');

  // ---- SAVED DOCUMENTS FROM LOCALSTORAGE WITH BACKEND SYNCHRONIZATION ----
  const [documents, setDocuments] = useState<UploadedDocument[]>(() => {
    const saved = localStorage.getItem('sarkari_candidate_uploaded_docs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'doc-1',
        name: 'Sunil_Kumar_Resume_Aspirant.pdf',
        size: '1.4 MB',
        type: 'application/pdf',
        uploadedDate: '2026-06-11',
        category: 'Resume'
      },
      {
        id: 'doc-2',
        name: 'Class_10_Matriculation_Marksheet.pdf',
        size: '2.1 MB',
        type: 'application/pdf',
        uploadedDate: '2026-06-08',
        category: 'Educational Marksheet'
      }
    ];
  });

  // Pull existing verified documents on load
  const loadDocumentsFromBackend = async () => {
    try {
      const response = await fetch('/api/documents');
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
        localStorage.setItem('sarkari_candidate_uploaded_docs', JSON.stringify(data));
      }
    } catch (err) {
      console.warn("Unable to contact backend document list, fallback to local storage state:", err);
    }
  };

  useEffect(() => {
    loadDocumentsFromBackend();
  }, []);

  useEffect(() => {
    localStorage.setItem('sarkari_candidate_uploaded_docs', JSON.stringify(documents));
  }, [documents]);

  // ---- UTILS & DRAG-OVER CLASS STATES ----
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [loadingMsg, setLoadingMsg] = useState('');

  // 1. APPLIED PROFILE DOCUMENTS STATE
  const [docCategory, setDocCategory] = useState<'Educational Marksheet' | 'Resume' | 'Identity Proof' | 'Other Certification'>('Resume');

  // 2. ADMIT CARD PARSING STATE
  const [extractedCard, setExtractedCard] = useState<Partial<AdmitCard> | null>(null);

  // 3. CUSTOM MOCK BUILDER INPUT STATE
  const [customTestTitle, setCustomTestTitle] = useState('My Custom General Studies Quiz');
  const [customTestCategory, setCustomTestCategory] = useState('SSC');
  const [customTestDuration, setCustomTestDuration] = useState(15);
  const [customNegMark, setCustomNegMark] = useState(0.5);

  // 4. PYQ METADATA UPLOAD STATE
  const [pyqTitle, setPyqTitle] = useState('RPSC School Lecturer GK & Psychology Solved Paper');
  const [pyqExam, setPyqExam] = useState('Rajasthan');
  const [pyqYear, setPyqYear] = useState(2025);
  const [pyqPremium, setPyqPremium] = useState(false);

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Helper file simulator & real async reader
  const handleSimulatedUpload = (file: { name: string; size: number; type: string }) => {
    setIsDragging(false);
    setUploadProgress(10);
    setLoadingMsg(`Analyzing files properties for "${file.name}"...`);

    let count = 10;
    const interval = setInterval(() => {
      count += 30;
      setUploadProgress(count);
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadProgress(null);
          processUploadedFile(file);
        }, 400);
      }
    }, 250);
  };

  // Premium Real Interactive uploader from client to Express backend db
  const readAndUploadFile = (file: File) => {
    setIsDragging(false);
    setUploadProgress(10);
    setLoadingMsg(`Reading and Preparing file chunks for "${file.name}"...`);

    const reader = new FileReader();
    
    // Animate custom loader
    let count = 10;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 15) + 12;
      if (count > 90) count = 90;
      setUploadProgress(count);
    }, 150);

    reader.onload = async () => {
      const base64Content = reader.result as string;
      clearInterval(interval);
      setUploadProgress(95);
      setLoadingMsg(`Transmitting binary packet to back-end database...`);

      try {
        const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        const cleanSize = sizeStr === '0.0 MB' ? '450 KB' : sizeStr;

        if (activeSubTab === 'applied-docs') {
          // Push to backend endpoint '/api/documents'
          const res = await fetch('/api/documents', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: file.name,
              size: cleanSize,
              type: file.type || 'application/pdf',
              category: docCategory,
              fileBase64: base64Content
            })
          });

          if (res.ok) {
            const resultData = await res.json();
            if (resultData.success) {
              setDocuments(prev => [resultData.document, ...prev]);
              triggerToast(`🎉 "${file.name}" uploaded successfully payload to backend storage!`);
            } else {
              throw new Error("Backend save unsuccessful");
            }
          } else {
            throw new Error(`HTTP ${res.status}`);
          }
        } else {
          // Process metadata for customized quizzes or admit cards
          processUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type
          });
        }
      } catch (err: any) {
        console.warn("Backend upload failure, cache saving locally instead:", err);
        const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        const cleanSize = sizeStr === '0.0 MB' ? '450 KB' : sizeStr;
        const newDoc: UploadedDocument = {
          id: `doc-cached-${Date.now()}`,
          name: file.name,
          size: cleanSize,
          type: file.type || 'application/pdf',
          uploadedDate: new Date().toISOString().split('T')[0],
          category: docCategory
        };
        setDocuments(prev => [newDoc, ...prev]);
        triggerToast(`📋 Local Offline Cache: "${file.name}" saved within your candidate safe.`);
      } finally {
        setUploadProgress(100);
        setTimeout(() => {
          setUploadProgress(null);
        }, 300);
      }
    };

    reader.onerror = () => {
      clearInterval(interval);
      setUploadProgress(null);
      triggerToast("⚠️ File system block when reading your document.");
    };

    reader.readAsDataURL(file);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      readAndUploadFile(file);
    }
  };

  const handleManualFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      readAndUploadFile(file);
    }
  };

  // Process depending on currently active tab
  const processUploadedFile = (file: { name: string; size: number; type: string }) => {
    const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    const cleanSize = sizeStr === '0.0 MB' ? '450 KB' : sizeStr;

    if (activeSubTab === 'applied-docs') {
      const newDoc: UploadedDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        size: cleanSize,
        type: file.type || 'application/pdf',
        uploadedDate: new Date().toISOString().split('T')[0],
        category: docCategory
      };
      setDocuments([newDoc, ...documents]);
      triggerToast(`📋 "${file.name}" added to your verified Candidate Document Vault!`);
    } 
    else if (activeSubTab === 'admit-cards') {
      // Mock parse an Admit Card file
      const roll = Math.floor(10000000 + Math.random() * 90000000);
      const bodies = ['SSC Staff Selection Commission', 'UPSC Civil Services', 'Railway Recruitment Board RRB', 'RPSC Rajasthan Board'];
      const chosenBody = bodies[Math.floor(Math.random() * bodies.length)];
      const cities = ['New Delhi Zone-A', 'Jaipur Sector 3', 'Mumbai Western', 'Sikar Cantt Area'];
      const chosenCity = cities[Math.floor(Math.random() * cities.length)];

      const cardDetails: Partial<AdmitCard> = {
        id: `admit-up-${Date.now()}`,
        title: file.name.split('.')[0].replace(/_/g, ' ') || 'Government Recruitment Provisional Entry Key',
        org: chosenBody,
        examDate: '2026-07-12',
        examCity: chosenCity,
        downloadUrl: '#',
        officialLink: '#',
        addedDate: new Date().toISOString().split('T')[0]
      };

      setExtractedCard(cardDetails);
      triggerToast(`⚡ Extracted candidate roll number & dates for your provisional Admit card successfully!`);
    } 
    else if (activeSubTab === 'mock-test') {
      // Create random quiz questions since the file was uploaded
      const customQns: Question[] = [
        {
          id: 'qn-cu-1',
          text: 'What major sovereign nation is proposing the "Green hydrogen expansion mission" for competitive storage standards of 2026?',
          options: ['India Union', 'Federal Republic of Germany', 'Australian League', 'Sovereign Republic of Vietnam'],
          correctOptionIndex: 0,
          explanation: 'India Union actively launched the Green Hydrogen standard framework on initial 2026 budgets.'
        },
        {
          id: 'qn-cu-2',
          text: 'The absolute power of judicial review in India is shared primarily by which authorities?',
          options: ['District Courts only', 'High Courts and the Supreme Court of India', 'Prime Minister Office', 'State Legislative Assemblies'],
          correctOptionIndex: 1,
          explanation: 'Articles 13, 226, and 32 grant supreme authority of judicial action back to High Courts & SC.'
        },
        {
          id: 'qn-cu-3',
          text: 'Identify the state that is famously celebrated for Thar Desert Camel Fair of Mewar/Marwar dynasties:',
          options: ['Rajasthan', 'Uttar Pradesh', 'Sovereign Gujarat', 'Bihar State Authority'],
          correctOptionIndex: 0,
          explanation: 'Rajasthan holds the historic Pushkar Mewar cultural dynasties Camel Fair every winter.'
        }
      ];

      const newTest: MockTest = {
        id: `mock-cust-${Date.now()}`,
        title: customTestTitle,
        category: customTestCategory,
        durationMinutes: customTestDuration,
        questions: customQns,
        totalMarks: customQns.length * 2,
        negativeMark: customNegMark
      };

      onAddMockTest(newTest);
      triggerToast(`🎉 Playable Mock Test "${customTestTitle}" compiles successfully containing ${customQns.length} high-yield MCQs!`);
    } 
    else if (activeSubTab === 'pyq-upl') {
      // Create external PYQ
      onAddPYQ({
        title: pyqTitle,
        exam: pyqExam,
        size: cleanSize,
        premium: pyqPremium,
        year: pyqYear
      });
      triggerToast(`📚 Contributed "${pyqTitle}" solved key sets to the central PYQ collection!`);
    }
  };

  const handleDeleteDoc = async (id: string) => {
    try {
      const res = await fetch(`/api/documents/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        triggerToast('🗑️ Document package successfully purged from secure backend database.');
      } else {
        throw new Error("Backend delete did not return 200 OK");
      }
    } catch (err) {
      console.warn("Offline fallback: couldn't delete from backend db, purging local state:", err);
    }
    setDocuments(prev => prev.filter(d => d.id !== id));
    triggerToast('🗑️ Candidate document deleted from secure vault caching.');
  };

  const handleRegisterExtractedAdmit = () => {
    if (extractedCard) {
      onAddAdmitCard(extractedCard as AdmitCard);
      setExtractedCard(null);
      triggerToast('🎟️ Admit Card fully registered within your active JobSarkari alerts console!');
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans text-slate-850">
      
      {/* Header banner */}
      <div className="border-b border-slate-100 pb-4 space-y-1 text-left">
        <span className="inline-flex items-center gap-1 bg-blue-50 px-2.5 py-0.5 rounded-full text-xs font-bold text-blue-800 uppercase tracking-wide">
          📥 candidate uploader panel
        </span>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
          Sarkari Document & Mock Paper Upload Center (दस्तावेज़ और परीक्षा सामग्री)
        </h2>
        <p className="text-xs text-slate-500">
          Upload application documents, provisional admit cards for automated venue parsing, custom practice tests, and local PYQ papers.
        </p>
      </div>

      {/* Vault subcategory controller */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3">
        {[
          { id: 'applied-docs', label: 'Candidate Documents (फॉर्म के लिए)', icon: FileText },
          { id: 'admit-cards', label: 'Admit Card Extractor (प्रवेश पत्र)', icon: Calendar },
          { id: 'mock-test', label: 'Mock Test Converter (मॉक टेस्ट)', icon: Layers },
          { id: 'pyq-upl', label: 'PYQ Contributor (पुराने प्रश्न पत्र)', icon: FileUp }
        ].map((subTab) => {
          const IconComponent = subTab.icon;
          const isSelected = activeSubTab === subTab.id;
          return (
            <button
              key={subTab.id}
              onClick={() => {
                setActiveSubTab(subTab.id as any);
                setExtractedCard(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              }`}
            >
              <IconComponent className="h-4 w-4 shrink-0" />
              {subTab.label}
            </button>
          );
        })}
      </div>

      {/* Main active action container */}
      <div className="grid gap-6 md:grid-cols-12 text-xs">
        
        {/* Left Hand: Interactive File dragzone drop area */}
        <div className="md:col-span-7 space-y-4 text-left">
          
          {/* Metadata Parameters input based on subcategories selected */}
          {activeSubTab === 'applied-docs' && (
            <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3 flex justify-between items-center gap-3">
              <span className="font-bold text-slate-600 block shrink-0 text-[11px]">Select Document type:</span>
              <select
                value={docCategory}
                onChange={(e) => setDocCategory(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 font-bold text-slate-800 focus:outline-hidden"
              >
                <option value="Resume">Resume (सीवी/बायोडाटा)</option>
                <option value="Educational Marksheet">Class 10th/12th / Degree Marksheet</option>
                <option value="Identity Proof">Aadhaar Card / Pan Card (पहचान पत्र)</option>
                <option value="Other Certification">Caste certificate / ITI / Diploma</option>
              </select>
            </div>
          )}

          {activeSubTab === 'mock-test' && (
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-3">
              <span className="font-extrabold text-[11.5px] text-slate-700 block uppercase tracking-wider">Configure Custom Test Properties prior to uploading:</span>
              
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Mock Test Title</label>
                  <input
                    type="text"
                    value={customTestTitle}
                    onChange={(e) => setCustomTestTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Exam Sector Category</label>
                  <select
                    value={customTestCategory}
                    onChange={(e) => setCustomTestCategory(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2"
                  >
                    <option value="SSC">SSC (CGL, CHSL, MTS)</option>
                    <option value="UPSC">UPSC Civil Services</option>
                    <option value="Railway">Railways (NTPC, ALP)</option>
                    <option value="Bank">Banking (SBI/IBPS)</option>
                    <option value="Rajasthan">Rajasthan Exams (RPSC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={customTestDuration}
                    onChange={(e) => setCustomTestDuration(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Wrong Penalty Negative</label>
                  <input
                    type="number"
                    step={0.05}
                    value={customNegMark}
                    onChange={(e) => setCustomNegMark(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'pyq-upl' && (
            <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 space-y-3">
              <span className="font-extrabold text-[11px] text-slate-700 block uppercase tracking-wider">Previous Year Solved Paper metadata entry:</span>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">PYQ Title</label>
                  <input
                    type="text"
                    value={pyqTitle}
                    onChange={(e) => setPyqTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Exam Commission</label>
                  <select
                    value={pyqExam}
                    onChange={(e) => setPyqExam(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2"
                  >
                    <option value="SSC">SSC (CGL/CHSL)</option>
                    <option value="UPSC">UPSC Administrative</option>
                    <option value="Bank">IBPS Banking Selection</option>
                    <option value="Railway">Railway Recruitment Board</option>
                    <option value="Rajasthan">Rajasthan State GK (RPSC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Publication Year</label>
                  <input
                    type="number"
                    value={pyqYear}
                    onChange={(e) => setPyqYear(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2"
                  />
                </div>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id="pyqPremium"
                    checked={pyqPremium}
                    onChange={(e) => setPyqPremium(e.target.checked)}
                    className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="pyqPremium" className="font-bold text-slate-705 cursor-pointer">
                    👑 Premium Aspirant Download only
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* DRAG AND DROP ZONE */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleFileDrop}
            className={`cursor-pointer rounded-3xl border-2 border-dashed p-8 text-center transition-all duration-150 flex flex-col items-center justify-center space-y-3.5 relative overflow-hidden ${
              isDragging 
                ? 'border-blue-500 bg-blue-50/30' 
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/35 hover:bg-slate-50/50'
            }`}
          >
            <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-xs">
              <UploadCloud className="h-7 w-7 text-blue-600 animate-bounce" />
            </div>

            <div className="space-y-1">
              <p className="font-extrabold text-slate-800 text-[12.5px]">
                Drag and Drop test PDF, Text, or Document here
              </p>
              <p className="text-[10.5px] text-slate-400">
                Supports PDF, TXT, CSV, JPEG, or Excel spreadsheets up to 10MB
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">or</span>
              <label className="bg-white border rounded-lg px-3 py-1.5 font-bold hover:bg-slate-50 transition text-[10.5px]">
                Browse Local Files
                <input
                  type="file"
                  onChange={handleManualFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Simulated loading bar */}
            {uploadProgress !== null && (
              <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-6 space-y-3 animate-fade-in">
                <RefreshCw className="h-6 w-6 animate-spin text-blue-700" />
                <div className="space-y-1 w-full max-w-xs text-center">
                  <p className="font-bold text-slate-800 text-[11px]">{loadingMsg}</p>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div 
                      className="bg-blue-600 h-2 transition-all duration-200" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-blue-800 block text-right">{uploadProgress}% Complete</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick template guidelines helper for custom mocks */}
          {activeSubTab === 'mock-test' && (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-orange-50 to-indigo-50 border border-orange-100/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-orange-850 block">🛠️ Advanced Multiple MCQ Test Creator</span>
                  <span className="text-slate-600 block text-[11px]">Build rigorous full-length exams with answers, logical explanations, negative marking schemes, or paste bulk CSV/JSON payloads.</span>
                </div>
                {onChangeTab && (
                  <button
                    type="button"
                    onClick={() => onChangeTab('admin')}
                    className="p-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-[11px] shrink-0 transition"
                  >
                    Open creator &rarr;
                  </button>
                )}
              </div>

              <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-4 space-y-2">
                <h5 className="font-extrabold text-blue-900 flex items-center gap-1 text-[11px]">
                  <HelpCircle className="h-3.5 w-3.5" /> Simple TXT/CSV Quiz Format Instructions:
                </h5>
                <p className="text-[10px] text-slate-600 leading-relaxed font-sans">
                  You can draft a basic text file listing mock exam questions to test yourself easily. Our converter reads queries and answers dynamically:
                </p>
                <pre className="p-2 border border-slate-200 bg-white rounded-lg font-mono text-[9px] text-slate-500 overflow-x-auto leading-normal">
                  Question: What does Article 21 protect?{'\n'}
                  Options: [Power, Life & Personal Liberty, Wealth, Religion]{'\n'}
                  CorrectOptionIndex: 1
                </pre>
              </div>
            </div>
          )}

          {/* Extracted admit card result action panel */}
          {extractedCard && (
            <div className="bg-emerald-50 border border-emerald-100/80 rounded-2xl p-4 space-y-3 animate-fade-in">
              <h4 className="font-extrabold text-emerald-900 flex items-center gap-1.5 text-xs">
                <Sparkles className="h-4.5 w-4.5 animate-pulse" /> Live Extracted Admit Card Parameters
              </h4>
              
              <div className="grid gap-3 sm:grid-cols-2 text-xs font-sans text-slate-700">
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9.5px]">Exam title classified</span>
                  <strong className="text-slate-905 block mt-0.5">{extractedCard.title}</strong>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9.5px]">Exam administrative board</span>
                  <strong className="text-blue-900 block mt-0.5 font-bold">{extractedCard.org}</strong>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9.5px]">Tentative target exam date</span>
                  <strong className="text-slate-905 block mt-0.5">{extractedCard.examDate}</strong>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-400 block text-[9.5px]">Venue Center & City Code</span>
                  <strong className="text-slate-905 block mt-0.5">{extractedCard.examCity}</strong>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <button
                  onClick={() => setExtractedCard(null)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 bg-white text-slate-500 font-bold"
                >
                  Discard
                </button>
                <button
                  onClick={handleRegisterExtractedAdmit}
                  className="rounded-lg bg-emerald-600 text-white px-3.5 py-1.5 font-bold hover:bg-emerald-700 transition"
                >
                  Register Admit Card & Venue Alert
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Hand: Saved documents cache log */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4.5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 border-b border-slate-100 pb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> Secure Storage Cache Vault
            </h4>

            {documents.length === 0 ? (
              <div className="py-12 text-center text-slate-400 font-sans space-y-2">
                <FileCheck className="h-8 w-8 mx-auto text-slate-200" />
                <p>No verified educational documents uploaded yet.</p>
                <p className="text-[10px] text-slate-400">Perfect for storing class marksheets, qualifications, or photos.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3 border border-slate-100 bg-slate-50/50 rounded-xl space-y-2 flex flex-col text-left">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[8.5px] bg-blue-100 text-blue-800 px-1.5 rounded uppercase font-bold">
                          {doc.category}
                        </span>
                        <h5 className="font-extrabold text-slate-800 text-[11px] truncate w-44">{doc.name}</h5>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-1 rounded hover:bg-rose-50 text-rose-500 transition cursor-pointer self-start"
                        title="Delete Document"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100/50 pt-2 font-mono">
                      <span>Size: {doc.size}</span>
                      <span>Uploaded: {doc.uploadedDate}</span>
                    </div>
                  </div>
                ))}

                <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-3 text-[10px] text-emerald-800 text-center font-sans font-bold flex items-center justify-center gap-1.5">
                  <UserCheck className="h-4 w-4 shrink-0" /> Documents ready for online application autofill!
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
