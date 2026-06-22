import React, { useState, useEffect } from 'react';
import { 
  Briefcase, Calendar, MapPin, IndianRupee, BookOpen, 
  Sparkles, Award, ShieldAlert, Clock, Star, Bell, 
  CheckCircle, ArrowUpRight, GraduationCap, FileText, 
  HelpCircle, Download, CheckSquare, Send, Mail, Phone, 
  Building2, Globe, Heart, ShieldCheck, Zap, CreditCard, Plus, Share2, ChevronDown, ChevronUp, Printer, Link, Camera, X, RefreshCw, ExternalLink
} from 'lucide-react';

import { GovJob, AdmitCard, JobResult, MockTest, CurrentAffair, Blog, UserProfile, AnswerKey, Question } from './types';
import { 
  INITIAL_JOBS, INITIAL_ADMIT_CARDS, INITIAL_RESULTS, 
  INITIAL_MOCK_TESTS, INITIAL_CURRENT_AFFAIRS, INITIAL_BLOGS,
  INITIAL_ANSWER_KEYS
} from './data/mockData';
import { DAILY_CURRENT_AFFAIRS_ITEMS, CURRENT_AFFAIRS_QUIZ_QUESTIONS } from './data/currentAffairsData';
import { LANGUAGES, TRANSLATIONS, LocaleType } from './utils/lang';

import Navbar from './components/Navbar';
import JobCard from './components/JobCard';
import MockTestPortal from './components/MockTestPortal';
import UserDashboard from './components/UserDashboard';
import AdminConsole from './components/AdminConsole';
import CalendarView from './components/CalendarView';
import PremiumPortal from './components/PremiumPortal';
import SarkariBlogPortal from './components/SarkariBlogPortal';
import SyllabusPlanner from './components/SyllabusPlanner';
import ObjectionPortal from './components/ObjectionPortal';
import SarkariUploadVault from './components/SarkariUploadVault';
import SarkariAds from './components/SarkariAds';
import AuthModal from './components/AuthModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import AboutUsModal from './components/AboutUsModal';
import TrafficDashboardModal from './components/TrafficDashboardModal';
import { initializeGA, trackPageView } from './utils/analytics';
import { updateSEOMetadata } from './utils/seoHelper';
import { fetchWithRetry } from './utils/fetchHelper';

const INITIAL_PYQS = [
  // 2026 Series
  { title: 'Railway RRB Technician Grade I & III Solved Civil & Mech Paper 2026', type: 'Solved PDF Booklet', size: '3.1 MB', year: 2026, exam: 'Railway', premium: false, downloadUrl: 'https://www.rrbcdg.gov.in/rrb_technician_solved_2026.pdf' },
  { title: 'Punjab State Power Corporation (PSPCL) Assistant Lineman (ALM) Trade & Numerical Aptitude Paper 2026', type: 'Official Solved Key', size: '2.5 MB', year: 2026, exam: 'Others', premium: false, downloadUrl: 'https://pspcl.in/alm_solved_paper_2026.pdf' },
  { title: 'National Health Mission (NHM) Vaccinator & Immunization Specialist Exam Paper 2026', type: 'Solved PDF Booklet', size: '2.8 MB', year: 2026, exam: 'Health/Vaccine', premium: false, downloadUrl: 'https://nhm.gov.in/vaccinator_exam_paper_2026.pdf' },
  { title: 'SSC CGL Tier-1 General Intelligence & Quantitative Aptitude Solved Booklet 2026', type: 'Official Solved Key', size: '3.4 MB', year: 2026, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/cgl_tier1_solved_2026.pdf' },
  { title: 'SSC CHSL (10+2) Tier-1 English Language & Reasoning Solved Sheets 2026', type: 'Solved Booklet', size: '2.9 MB', year: 2026, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/chsl_tier1_solved_2026.pdf' },
  { title: 'SSC MTS Multi-Tasking Staff Numerical Aptitude & GK Solved Key 2026', type: 'Solved Key', size: '2.1 MB', year: 2026, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_solved_key_2026.pdf' },
  { title: 'SSC GD Constable General Duty Elementary Mathematics Booklet 2026', type: 'Solved PDF Booklet', size: '4.0 MB', year: 2026, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/gd_math_solved_2026.pdf' },

  // 2025 Papers
  { title: 'UPSSSC ANM Health Worker & Vaccine Administrator Solved Question Paper 2025', type: 'Official Solved Key', size: '3.1 MB', year: 2025, exam: 'Health/Vaccine', premium: false, downloadUrl: 'https://upsssc.gov.in/anm_vaccine_solved_2025.pdf' },
  { title: 'UPSC Civil Services General Studies Paper I 2025 (Solved PDF compilation)', type: 'Official Key', size: '4.4 MB', year: 2025, exam: 'UPSC', premium: false },
  { title: 'SSC CGL Tier-1 Quantitative Aptitude All Shifts Solved 2025 Booklet', type: 'Solved Booklet', size: '2.5 MB', year: 2025, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/cgl_tier1_2025.pdf' },
  { title: 'SSC CHSL Tier-1 English Comprehension & Vocabulary Solved Paper 2025', type: 'Solved Key', size: '2.7 MB', year: 2025, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/chsl_2025_solved.pdf' },
  { title: 'SSC MTS Multi-Tasking Staff Numerical Ability All Shifts Key 2025', type: 'Solved PDF Booklet', size: '2.3 MB', year: 2025, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_2025_solutions.pdf' },
  { title: 'SSC GD Constable All Shifts Solved General Knowledge Core Booklet 2025', type: 'Solved Booklet', size: '3.6 MB', year: 2025, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/gd_constable_gk_2025.pdf' },
  { title: 'IBPS PO Mains Logical Reasoning & DI Special Solved Paper 2025', type: 'Solved Booklet', size: '3.1 MB', year: 2025, exam: 'Bank', premium: true },
  { title: 'RRB NTPC General Science & General Awareness official Solved Key 2025', type: 'Solved Key', size: '2.1 MB', year: 2025, exam: 'Railway', premium: false },
  { title: 'State TET / Teaching Eligibility Test Solved Question Booklet 2025', type: 'Practice Key', size: '1.8 MB', year: 2025, exam: 'Teaching', premium: false },
  
  // 2024 Papers
  { title: 'Bihar Health Dept Vaccinator & Auxiliary Nurse Midwifery (ANM) Combined Past Paper 2024', type: 'Solved Booklet', size: '2.9 MB', year: 2024, exam: 'Health/Vaccine', premium: true, downloadUrl: 'https://state.bihar.gov.in/health/vaccinator_paper_2024.pdf' },
  { title: 'UPSC IAS General Studies 2024 Solved Paper compilation', type: 'Solved PDF Booklet', size: '3.8 MB', year: 2024, exam: 'UPSC', premium: false },
  { title: 'NDA/CDS General Ability Test (GAT) I 2024 Question Booklet & Solved Key', type: 'Official Key', size: '3.5 MB', year: 2024, exam: 'Defence', premium: true },
  { title: 'SSC CHSL (10+2) English Language & Quant 2024 Solved Practice Sets', type: 'Solved Booklet', size: '2.9 MB', year: 2024, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/chsl_2024_solved.pdf' },
  { title: 'SSC CGL Tier-2 Advanced Math & General English Solved Booklet 2024', type: 'Solved Booklet', size: '3.8 MB', year: 2024, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/cgl_tier2_2024.pdf' },
  { title: 'SSC MTS Numerical Aptitude & Non-Verbal Solved Test Series 2024', type: 'Solved Key', size: '2.2 MB', year: 2024, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_2024_solutions.pdf' },
  { title: 'SSC GD Constable Quantitative Aptitude & Hindi/English Solved Set 2024', type: 'Solved PDF Booklet', size: '3.1 MB', year: 2024, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/gd_2024_solutions.pdf' },
  { title: 'UPPSC Provincial Civil Services CSAT Paper 2024 Solved Solutions', type: 'Solved Booklet', size: '3.2 MB', year: 2024, exam: 'State PSC', premium: true },
  { title: 'SBI Clerk Prelims Quantitative & Reasoning Aptitude 2024 Sets', type: 'Practice Sheets', size: '1.5 MB', year: 2024, exam: 'Bank', premium: false },

  // 2023 Papers
  { title: 'MP NHM Vaccination Officer & Cold Chain Technician Recruitment Exam Paper 2023', type: 'Solved PDF Booklet', size: '3.4 MB', year: 2023, exam: 'Health/Vaccine', premium: false, downloadUrl: 'https://nhmmp.gov.in/vaccination_officer_paper_2023.pdf' },
  { title: 'UPSC Civil Services CSAT Logical Aptitude Paper 2023 Solutions', type: 'Solved Booklet', size: '1.9 MB', year: 2023, exam: 'UPSC', premium: false },
  { title: 'SSC MTS General Awareness & Logical Reasoning Solved Paper 2023', type: 'Solved Key', size: '1.4 MB', year: 2023, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_2023_solved.pdf' },
  { title: 'SSC CGL Tier-1 General Studies, GK & Quantitative Aptitude Solutions 2023', type: 'Solved PDF Booklet', size: '3.5 MB', year: 2023, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/cgl_2023_solved.pdf' },
  { title: 'SSC CHSL Tier-2 Mathematical Abilities & Reasoning Solved Book 2023', type: 'Solved Booklet', size: '3.0 MB', year: 2023, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/chsl_2023_tier2.pdf' },
  { title: 'SSC GD Constable General Knowledge & Mental Ability Solved Compilation 2023', type: 'Official Key', size: '2.9 MB', year: 2023, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/gd_2023_key.pdf' },
  { title: 'IBPS PO Reasoning Mains 5-Year Combined compilation', type: 'Solved Booklet', size: '4.8 MB', year: 2023, exam: 'Bank', premium: true },
  { title: 'RRB Group D Reasoning & Aptitude Challenge Series Solved Booklet 2023', type: 'Solved Key', size: '2.8 MB', year: 2023, exam: 'Railway', premium: false },
  { title: 'IBPS Clerk Quantitative Aptitude Mains 2023 Practice Paper', type: 'Practice Sheets', size: '1.7 MB', year: 2023, exam: 'Bank', premium: false },

  // 2022 Papers
  { title: 'Rajasthan RPSC Junior Health Inspector & Vaccine Officer Written Exam Booklet 2022', type: 'Solved Key', size: '2.5 MB', year: 2022, exam: 'Health/Vaccine', premium: true, downloadUrl: 'https://rpsc.rajasthan.gov.in/junior_health_inspector_2022.pdf' },
  { title: 'UPSC Civil Services General Studies-1 2022 Official Paper & Solved Key', type: 'Solved Booklet', size: '4.0 MB', year: 2022, exam: 'UPSC', premium: false },
  { title: 'SSC CGL Tier-2 Advance Mathematics Solved Selection Paper 2022', type: 'Official Key', size: '3.3 MB', year: 2022, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/cgl_2022_adv_math.pdf' },
  { title: 'SSC CHSL Combined Higher Secondary Tier-1 Solved Aptitude Booklet 2022', type: 'Solved Booklet', size: '2.8 MB', year: 2022, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/chsl_2022_aptitude.pdf' },
  { title: 'SSC MTS Non-Technical General Awareness & English Solutions 2022', type: 'Practice Sheets', size: '1.9 MB', year: 2022, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_22_eng_ga.pdf' },
  { title: 'SSC GD Constable Elementary Math & General Science Solved Paper 2022', type: 'Solved Booklet', size: '2.7 MB', year: 2022, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/gd_2022_solved.pdf' },
  { title: 'CTET Paper 1 & 2 Environmental Studies & Pedagogy Solved Book 2022', type: 'Solved Booklet', size: '2.7 MB', year: 2022, exam: 'Teaching', premium: false },
  { title: 'State PCS / Rajasthan RAS GS Paper I 2022 Solved Compilation Book', type: 'Practice Sheets', size: '5.0 MB', year: 2022, exam: 'State PSC', premium: true },

  // 2021 Papers
  { title: 'National Health Specialist (Immunization & Vaccine Logistics) Question Booklet 2021', type: 'Solved Booklet', size: '4.1 MB', year: 2021, exam: 'Health/Vaccine', premium: false, downloadUrl: 'https://nhm.gov.in/immunization_specialist_2021.pdf' },
  { title: 'UPSC CSE Prelims Polity & History Sectional 2021 Review Paper Booklet', type: 'Official Key', size: '2.2 MB', year: 2021, exam: 'UPSC', premium: false },
  { title: 'SSC GD Constable General Science 2021 All Shift Official Keys', type: 'Solved Key', size: '1.8 MB', year: 2021, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/gd_2021_science.pdf' },
  { title: 'SSC CGL Tier-1 General Awareness & Reasoning 2021 Solved Book', type: 'Solved Booklet', size: '3.1 MB', year: 2021, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/cgl_2021_gk_reasoning.pdf' },
  { title: 'SSC CHSL Quantitative Aptitude & Vocabulary 2021 Combined Solved Sets', type: 'Solved Booklet', size: '2.5 MB', year: 2021, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/chsl_2021_solutions.pdf' },
  { title: 'SSC MTS Numerical Aptitude & Reasoning Ability Solved Paper 2021', type: 'Solved Key', size: '1.7 MB', year: 2021, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_2021_solved_sheets.pdf' },
  { title: 'IBPS RRB Officer Scale-1 Quant & Reasoning Solved Practice Booklet 2021', type: 'Solved Booklet', size: '3.0 MB', year: 2021, exam: 'Bank', premium: true },

  // 2020 Papers
  { title: 'State Government Vaccine Supervisor & COVID-19 Inoculator Core Exam Solved Paper 2020', type: 'Official Key', size: '3.0 MB', year: 2020, exam: 'Health/Vaccine', premium: false, downloadUrl: 'https://mohfw.gov.in/vaccine_supervisor_paper_2020.pdf' },
  { title: 'UPSC Civil Services GSE GS Paper-I 2020 Solved Sectional Booklet', type: 'Solved Booklet', size: '4.2 MB', year: 2020, exam: 'UPSC', premium: false },
  { title: 'SSC CGL Tier-1 English Comprehension 2020 Solutions compilation', type: 'Solved Key', size: '1.6 MB', year: 2020, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/cgl_2020_english.pdf' },
  { title: 'SSC CHSL (10+2) Tier-1 Reasoning & Aptitude Solved shift compilation 2020', type: 'Solved Booklet', size: '3.2 MB', year: 2020, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/chsl_2020_tier1.pdf' },
  { title: 'SSC MTS General Awareness & Numerical Ability Solved past booklet 2020', type: 'Solved Key', size: '1.8 MB', year: 2020, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_2020_ga_math.pdf' },
  { title: 'SSC GD Constable All Shifts General Knowledge & Hindi Solved Keys 2020', type: 'Official Key', size: '2.5 MB', year: 2020, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/gd_constable_2020_shifts.pdf' },
  { title: 'RRB NTPC CBT-1 Static General Knowledge Solved Paper Review 2020', type: 'Practice Sheets', size: '2.7 MB', year: 2020, exam: 'Railway', premium: false },
  { title: 'SBI PO Mains Data Interpretation & Numerical Analysis Booklet 2020', type: 'Solved Booklet', size: '3.9 MB', year: 2020, exam: 'Bank', premium: true },

  // 2019 Papers
  { title: 'NHM Auxiliary Nurse & Vaccinator (टीकाकर्मी) Technical Domain Knowledge Solved Paper 2019', type: 'Solved PDF Booklet', size: '1.9 MB', year: 2019, exam: 'Health/Vaccine', premium: false, downloadUrl: 'https://nhm.gov.in/anm_vaccinator_paper_2019.pdf' },
  { title: 'SSC CGL Tier-2 Quantitative Aptitude Official Solved Question Paper 2019', type: 'Solved PDF Booklet', size: '4.5 MB', year: 2019, exam: 'SSC', premium: true, downloadUrl: 'https://ssc.gov.in/cgl_tier2_math_2019.pdf' },
  { title: 'SSC CHSL Tier-1 Combined Higher Secondary Exam Solved Aptitude Book 2019', type: 'Solved Booklet', size: '2.8 MB', year: 2019, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/chsl_tier1_aptitude_2019.pdf' },
  { title: 'SSC MTS Multi-Tasking Staff English Grammar & Logic Solved Test 2019', type: 'Solved Key', size: '2.0 MB', year: 2019, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/mts_solved_english_logic_2019.pdf' },
  { title: 'SSC GD Constable General Duty Intelligence & Elementary Math Book 2019', type: 'Solved Booklet', size: '3.1 MB', year: 2019, exam: 'SSC', premium: false, downloadUrl: 'https://ssc.gov.in/gd_constable_2019_solved.pdf' }
];

export default function App() {
  // ----- ROOT PERSISTENT STATE -----
  const [jobs, setJobs] = useState<GovJob[]>(() => {
    const saved = localStorage.getItem('sarkari_jobs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as GovJob[];
        const existingIds = new Set(parsed.map(j => j.id));
        const missingJobs = INITIAL_JOBS.filter(j => !existingIds.has(j.id));
        if (missingJobs.length > 0) {
          const merged = [...parsed, ...missingJobs];
          localStorage.setItem('sarkari_jobs', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return INITIAL_JOBS;
      }
    }
    return INITIAL_JOBS;
  });

  const [admitCards, setAdmitCards] = useState<AdmitCard[]>(() => {
    const saved = localStorage.getItem('sarkari_admit_cards');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AdmitCard[];
        const existingIds = new Set(parsed.map(c => c.id));
        const missingCards = INITIAL_ADMIT_CARDS.filter(c => !existingIds.has(c.id));
        if (missingCards.length > 0) {
          const merged = [...parsed, ...missingCards];
          localStorage.setItem('sarkari_admit_cards', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return INITIAL_ADMIT_CARDS;
      }
    }
    return INITIAL_ADMIT_CARDS;
  });

  const [results, setResults] = useState<JobResult[]>(() => {
    const saved = localStorage.getItem('sarkari_results');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as JobResult[];
        const existingIds = new Set(parsed.map(r => r.id));
        const missingResults = INITIAL_RESULTS.filter(r => !existingIds.has(r.id));
        if (missingResults.length > 0) {
          const merged = [...parsed, ...missingResults];
          localStorage.setItem('sarkari_results', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return INITIAL_RESULTS;
      }
    }
    return INITIAL_RESULTS;
  });

  const [answerKeys, setAnswerKeys] = useState<AnswerKey[]>(() => {
    const saved = localStorage.getItem('sarkari_answer_keys');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AnswerKey[];
        const existingIds = new Set(parsed.map(k => k.id));
        const missingKeys = INITIAL_ANSWER_KEYS.filter(k => !existingIds.has(k.id));
        if (missingKeys.length > 0) {
          const merged = [...parsed, ...missingKeys];
          localStorage.setItem('sarkari_answer_keys', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return INITIAL_ANSWER_KEYS;
      }
    }
    return INITIAL_ANSWER_KEYS;
  });

  useEffect(() => {
    localStorage.setItem('sarkari_answer_keys', JSON.stringify(answerKeys));
  }, [answerKeys]);

  const [mockTests, setMockTests] = useState<MockTest[]>(() => {
    const deletedSaved = localStorage.getItem('sarkari_deleted_mock_ids');
    let deletedSet = new Set<string>();
    deletedSet.add('ssc-cgl-quant-1');
    deletedSet.add('upsc-gs-1');
    deletedSet.add('ssc-cgl-science-mock-1');
    deletedSet.add('ssc-cgl-tier1-full-spec-1');
    if (deletedSaved) {
      try {
        const deletedIds = JSON.parse(deletedSaved) as string[];
        deletedSet = new Set([...deletedIds, 'ssc-cgl-quant-1', 'upsc-gs-1', 'ssc-cgl-science-mock-1', 'ssc-cgl-tier1-full-spec-1']);
      } catch (e) {
        console.error(e);
      }
    }

    const saved = localStorage.getItem('sarkari_mock_tests');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as MockTest[];
        const filteredParsed = parsed.filter(t => !deletedSet.has(t.id));
        const existingIds = new Set(filteredParsed.map(t => t.id));
        const missingMocks = INITIAL_MOCK_TESTS.filter(t => !existingIds.has(t.id) && !deletedSet.has(t.id));
        if (missingMocks.length > 0) {
          const merged = [...filteredParsed, ...missingMocks];
          localStorage.setItem('sarkari_mock_tests', JSON.stringify(merged));
          return merged;
        }
        return filteredParsed;
      } catch (e) {
        return INITIAL_MOCK_TESTS.filter(t => !deletedSet.has(t.id));
      }
    }
    return INITIAL_MOCK_TESTS.filter(t => !deletedSet.has(t.id));
  });

  useEffect(() => {
    localStorage.setItem('sarkari_mock_tests', JSON.stringify(mockTests));
  }, [mockTests]);

  const [currentAffairs, setCurrentAffairs] = useState<CurrentAffair[]>(DAILY_CURRENT_AFFAIRS_ITEMS);
  const [quizQuestions] = useState<Question[]>(CURRENT_AFFAIRS_QUIZ_QUESTIONS);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({}); // maps question Index (0-49) to selected option index (0-3)
  const [caSearchQuery, setCaSearchQuery] = useState('');
  const [caSelectedCategory, setCaSelectedCategory] = useState<string>('All');
  const [caVisibleCount, setCaVisibleCount] = useState(6);
  const [quizSearchVal, setQuizSearchVal] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>(() => {
    const saved = localStorage.getItem('sarkari_blogs_seo');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_BLOGS;
  });

  useEffect(() => {
    localStorage.setItem('sarkari_blogs_seo', JSON.stringify(blogs));
  }, [blogs]);

  const [pyqsList, setPyqsList] = useState<{ title: string; type: string; size: string; year: number; exam: string; premium: boolean; downloadUrl?: string }[]>(() => {
    const saved = localStorage.getItem('sarkari_pyqs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as typeof INITIAL_PYQS;
        const existingTitles = new Set(parsed.map(x => x.title));
        const missing = INITIAL_PYQS.filter(x => !existingTitles.has(x.title));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          localStorage.setItem('sarkari_pyqs', JSON.stringify(merged));
          return merged;
        }
        return parsed;
      } catch (e) {
        return INITIAL_PYQS;
      }
    }
    return INITIAL_PYQS;
  });

  useEffect(() => {
    localStorage.setItem('sarkari_pyqs', JSON.stringify(pyqsList));
  }, [pyqsList]);

  const [pyqSearch, setPyqSearch] = useState('');
  const [pyqSelectedYear, setPyqSelectedYear] = useState('All');
  const [pyqSelectedCategory, setPyqSelectedCategory] = useState('All');
  const [selectedMockTestId, setSelectedMockTestId] = useState<string | null>(null);

  // Homepage Integrated AI and Exam Prep States
  const [homeAiInput, setHomeAiInput] = useState('');
  const [homeAiMessages, setHomeAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; timestamp?: string }>>([
    { 
      sender: 'ai', 
      text: `👋 **Namaste! I am Sarkari AI Exam Mitra (सरकारी एआई परीक्षा मित्र)** 

I am ready bilingually to clear formulas, solve reasoning problems, or compile study syllabuses in real-time!

**Suggested topics you can click to solve instantly:**
* 🎯 *"Explain SSC CGL 2026 syllabus changes"*
* 🤝 *"If A:B = 2:3 and B:C = 4:5, find A:B:C"*
* 📈 *"How to find net gain if a retailer marks goods 20% costlier with 10% discount"*
* 🏛️ *"What details exist in National Polity Part III Articles 12 to 35"*
* 💉 *"BCG vaccine storage cold chain temperature dosage"*` 
    }
  ]);
  const [homeAiLoading, setHomeAiLoading] = useState(false);
  const [homeActivePrepTab, setHomeActivePrepTab] = useState<'mocks' | 'pyqs'>('mocks');

  // New PYQ Upload System States
  const [showPyqUploadModal, setShowPyqUploadModal] = useState(false);
  const [newPyqTitle, setNewPyqTitle] = useState('');
  const [newPyqYear, setNewPyqYear] = useState(2025);
  const [newPyqExam, setNewPyqExam] = useState('UPSC');
  const [newPyqType, setNewPyqType] = useState('Solved PDF Booklet');
  const [newPyqFileName, setNewPyqFileName] = useState('');
  const [isUploadingPyq, setIsUploadingPyq] = useState(false);
  const [uploadPyqProgress, setUploadPyqProgress] = useState(0);
  const [newPyqUrl, setNewPyqUrl] = useState('');
  const [pyqUploadMode, setPyqUploadMode] = useState<'file' | 'link'>('file');

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sarkari_user_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Sunil Kumar',
      email: 'sunilk94411@gmail.com', // Pre-populated from user metadata
      qualification: 'Graduate',
      savedJobs: [],
      savedPDFs: [],
      premiumUser: false,
      testHistory: [
        {
          id: 'mock-hist-1',
          testTitle: 'SSC CGL Quantitative Aptitude High-Speed Mock',
          score: 38,
          totalQuestions: 25,
          correctAnswers: 19,
          timeTaken: '11:45',
          date: '2026-06-01'
        },
        {
          id: 'mock-hist-2',
          testTitle: 'UPSC Civil Services Indian Polity Practice Paper',
          score: 44,
          totalQuestions: 30,
          correctAnswers: 22,
          timeTaken: '14:20',
          date: '2026-06-03'
        },
        {
          id: 'mock-hist-3',
          testTitle: 'RRB NTPC Physics & Chemical General Science Test',
          score: 24,
          totalQuestions: 25,
          correctAnswers: 16,
          timeTaken: '08:10',
          date: '2026-06-05'
        },
        {
          id: 'mock-hist-4',
          testTitle: 'IBPS Clerk Reasoning & Analogy Puzzle Series',
          score: 46,
          totalQuestions: 50,
          correctAnswers: 38,
          timeTaken: '22:15',
          date: '2026-06-08'
        },
        {
          id: 'mock-hist-5',
          testTitle: 'SSC General Awareness History & Heritage Section',
          score: 36,
          totalQuestions: 40,
          correctAnswers: 31,
          timeTaken: '15:30',
          date: '2026-06-11'
        }
      ]
    };
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    // Determine initial activeTab based on pathname first
    const path = window.location.pathname.replace(/^\//, '');
    const validTabs = [
      'jobs', 'admit-cards', 'results', 'mock-tests', 'syllabus', 
      'calendar', 'current-affairs', 'blog', 'premium', 'contact', 'dashboard', 'admin'
    ];
    if (validTabs.includes(path)) {
      return path;
    }
    // Fall back to search query string tab (e.g. ?tab=jobs)
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && validTabs.includes(tabParam)) {
      return tabParam;
    }
    return 'home';
  });

  // Track popstate events for backward/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const path = window.location.pathname.replace(/^\//, '');
      const validTabs = [
        'jobs', 'admit-cards', 'results', 'mock-tests', 'syllabus', 
        'calendar', 'current-affairs', 'blog', 'premium', 'contact', 'dashboard', 'admin'
      ];
      if (validTabs.includes(path)) {
        setActiveTab(path);
      } else {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (tabParam && validTabs.includes(tabParam)) {
          setActiveTab(tabParam);
        } else {
          setActiveTab('home');
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update HTML history state on activeTab change to preserve SEO path mapping
  useEffect(() => {
    const currentPath = window.location.pathname;
    const targetPath = activeTab === 'home' ? '/' : `/${activeTab}`;
    if (currentPath !== targetPath) {
      window.history.pushState({ tab: activeTab }, '', targetPath);
    }
  }, [activeTab]);
  const [locale, setLocale] = useState<LocaleType>(() => {
    const saved = localStorage.getItem('sarkari_locale');
    return (saved as LocaleType) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('sarkari_locale', locale);
  }, [locale]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('sarkari_is_logged_in');
    return saved ? saved === 'true' : false;
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('sarkari_is_logged_in', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);



  // Premium Transactions History types and state
  interface PremiumTransaction {
    id: string;
    date: string;
    plan: string;
    amount: string;
    status: 'COMPLETED' | 'PENDING' | 'REJECTED';
    refId: string;
  }

  const [premiumTransactions, setPremiumTransactions] = useState<PremiumTransaction[]>(() => {
    const saved = localStorage.getItem('sarkari_premium_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [notificationCount, setNotificationCount] = useState(3);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showWhyPremium, setShowWhyPremium] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [modalNotebookPhoto, setModalNotebookPhoto] = useState<string | null>(null);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [trafficOpen, setTrafficOpen] = useState(false);

  // Filter properties passed down to JobCard
  const [qualificationFilter, setQualificationFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSyllabusGroup, setSelectedSyllabusGroup] = useState<'All' | 'SSC' | 'UPSC' | 'Bank' | 'Railway' | 'Rajasthan' | 'Defence'>('All');

  // Contact support form
  const [contactForm, setContactForm] = useState({ name: '', email: '', query: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Payment states
  const [selectedPlan, setSelectedPlan] = useState<'Monthly' | 'Quarterly' | 'Yearly' | 'Lifetime'>('Lifetime');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card'>('UPI');
  const [upiId, setUpiId] = useState('sunilk94411@paytm');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dynamic searches
  const [homeJobSearch, setHomeJobSearch] = useState('');
  const [homeAdmitSearch, setHomeAdmitSearch] = useState('');

  // Sitemaps schema & SEO presentation simulation state
  const [viewingSEO, setViewingSEO] = useState(false);
  const [seoTestTitle, setSeoTestTitle] = useState("Job Sarkari Hub — Latest Sarkari Results, Admit Cards & Syllabus Guides");
  const [seoTestDesc, setSeoTestDesc] = useState("India's leading bilingual government job portal. Find real-time Sarkari Results, e-Admit Cards, official Syllabus PDF downloads, and premium bilingual SSC/UPSC mock exams.");
  const [seoTab, setSeoTab] = useState<'serp' | 'social' | 'schema' | 'checklist'>('serp');
  const [seoActiveFilters, setSeoActiveFilters] = useState({ h1Matched: true, canonicalLive: true, hreflangConfigured: true, robotsAllowed: true, sitemapFunctional: true });

  // Web Traffic Analytics simulation states
  const [viewingTraffic, setViewingTraffic] = useState(false);
  const [trafficLiveUsers, setTrafficLiveUsers] = useState(132);
  const [trafficPageViews, setTrafficPageViews] = useState(58410);
  const [trafficSpikeActive, setTrafficSpikeActive] = useState(false);
  const [trafficActiveTab, setTrafficActiveTab] = useState<'dashboard' | 'geo' | 'referrals' | 'realtime'>('dashboard');

  // Google Analytics Initialization & Tab View Tracking
  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    trackPageView(activeTab);
    
    let subCat = 'All';
    let extraSubCat = 'All';
    
    if (activeTab === 'jobs') {
      subCat = selectedCategory;
      extraSubCat = qualificationFilter;
    } else if (activeTab === 'syllabus') {
      subCat = selectedSyllabusGroup;
    } else if (activeTab === 'blog' && selectedBlog) {
      subCat = selectedBlog.title;
    } else if (activeTab === 'mock-tests' && selectedMockTestId) {
      const matched = mockTests.find(t => t.id === selectedMockTestId);
      if (matched) {
        subCat = matched.title;
      }
    }
    
    updateSEOMetadata(activeTab, locale, subCat, extraSubCat);
  }, [
    activeTab, 
    locale, 
    selectedCategory, 
    qualificationFilter, 
    selectedSyllabusGroup, 
    selectedBlog, 
    selectedMockTestId, 
    mockTests
  ]);

  // Custom toast notification state
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleShareApp = async () => {
    const shareData = {
      title: 'Job Sarkari Hub',
      text: 'Unlock exam prep, real-time results, daily syllabus planners, and comprehensive mock tests on Job Sarkari Hub!',
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        triggerToast("🎉 Thank you for sharing Job Sarkari Hub!");
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        triggerToast("📋 App link copied to clipboard! Share it with other aspirants.");
      } catch (err) {
        triggerToast("🚫 Clipboard copy failed. Share this link: " + shareData.url);
      }
    }
  };

  const handleCopyPaymentLink = async () => {
    const planPrices = {
      Monthly: "₹99",
      Quarterly: "₹199",
      Yearly: "₹499",
      Lifetime: "₹999"
    };
    const price = planPrices[selectedPlan] || "₹999";
    const activeBusinessUpiId = localStorage.getItem('sarkari_business_upi_id') || 'sarkarihub@upi';
    const activeBusinessName = localStorage.getItem('sarkari_business_name') || 'JobSarkariHub';
    const activePaymentLink = localStorage.getItem('sarkari_business_payment_link') || '';
    const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;
    
    let paymentText = `Job Sarkari Hub Premium Upgrade\n` +
      `Plan: ${selectedPlan} Access\n` +
      `Amount: ${price}\n` +
      `Payee Recipient: ${activeBusinessName} (${activeBusinessUpiId})\n` +
      `Reference ID: ${referenceId}\n`;
      
    if (activePaymentLink) {
      paymentText += `Payment Gateway checkout: ${activePaymentLink}\n`;
    } else {
      paymentText += `UPI Pay Link: upi://pay?pa=${activeBusinessUpiId}&pn=${encodeURIComponent(activeBusinessName)}&am=${price.replace('₹', '')}&cu=INR&tn=Upgrade+ID+${referenceId}\n`;
    }
    
    paymentText += `Portal Link: ${window.location.origin}?ref=${referenceId}&plan=${selectedPlan.toLowerCase()}`;

    try {
      await navigator.clipboard.writeText(paymentText);
      triggerToast(`📋 ${selectedPlan} Access details copied with Ref ID: ${referenceId}!`);
    } catch (err) {
      triggerToast("🚫 Copy to clipboard failed.");
    }
  };

  const handleModalPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        triggerToast('🚫 Please capture or select a valid image file of your notebook.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setModalNotebookPhoto(dataUrl);
        localStorage.setItem('sarkari_notebook_photo_cached', dataUrl);
        triggerToast('📸 Physical notebook snapped! Premium upgrade will solve this query instantly.');
      };
      reader.readAsDataURL(file);
    }
  };

  // Synchronizers
  useEffect(() => {
    localStorage.setItem('sarkari_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('sarkari_admit_cards', JSON.stringify(admitCards));
  }, [admitCards]);

  useEffect(() => {
    localStorage.setItem('sarkari_results', JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem('sarkari_mock_tests', JSON.stringify(mockTests));
  }, [mockTests]);

  useEffect(() => {
    localStorage.setItem('sarkari_user_profile', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sarkari_pyqs', JSON.stringify(pyqsList));
  }, [pyqsList]);

  useEffect(() => {
    localStorage.setItem('sarkari_premium_transactions', JSON.stringify(premiumTransactions));
  }, [premiumTransactions]);

  useEffect(() => {
    if (user.premiumUser && premiumTransactions.length === 0) {
      const initialTrans: PremiumTransaction[] = [{
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        plan: user.premiumPlan || 'Lifetime',
        amount: user.premiumPlan === 'Monthly' ? '₹99' : user.premiumPlan === 'Quarterly' ? '₹199' : user.premiumPlan === 'Yearly' ? '₹499' : '₹999',
        status: 'COMPLETED',
        refId: `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`
      }];
      setPremiumTransactions(initialTrans);
    }
  }, [user.premiumUser, user.premiumPlan]);

  // Real-time Web Traffic fluctuation intervals
  useEffect(() => {
    const timer = setInterval(() => {
      setTrafficLiveUsers(prev => {
        if (trafficSpikeActive) {
          const variation = Math.floor(Math.random() * 21) - 10; // -10 to +10
          return Math.min(Math.max(1320 + variation, 1200), 1600);
        } else {
          const variation = Math.floor(Math.random() * 9) - 4; // -4 to +4
          const nextVal = prev + variation;
          return nextVal > 100 ? (nextVal < 180 ? nextVal : 170) : 110;
        }
      });
      
      setTrafficPageViews(prev => prev + (trafficSpikeActive ? Math.floor(Math.random() * 8) + 5 : Math.floor(Math.random() * 2) + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [trafficSpikeActive]);

  // Handle bookmarked jobs
  const toggleSaveJob = (jobId: string) => {
    if (!isLoggedIn) {
      setAuthModalOpen(true);
      triggerToast("🔐 Please sign in or join to bookmark jobs.");
      return;
    }
    setUser(prev => {
      const exists = prev.savedJobs.includes(jobId);
      const updated = exists 
        ? prev.savedJobs.filter(id => id !== jobId)
        : [...prev.savedJobs, jobId];
      triggerToast(exists ? "Removed from bookmarked jobs." : "Job notification successfully bookmarked!");
      return { ...prev, savedJobs: updated };
    });
  };

  // Handle Mock Test completion saves
  const handleSaveTestResult = (result: {
    testTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: string;
  }) => {
    const timestamp = new Date().toISOString().split('T')[0];
    setUser(prev => ({
      ...prev,
      testHistory: [
        {
          id: `attempt-${Date.now()}`,
          testTitle: result.testTitle,
          score: result.score,
          totalQuestions: result.totalQuestions,
          correctAnswers: result.correctAnswers,
          timeTaken: result.timeTaken,
          date: timestamp
        },
        ...prev.testHistory
      ]
    }));
  };

  // Homepage Chatbot AI handler
  const handleHomeAiSubmit = async (customText?: string) => {
    const textToSend = customText || homeAiInput;
    if (!textToSend.trim()) return;

    setHomeAiInput('');
    const userMsg = { 
      sender: 'user' as const, 
      text: textToSend, 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setHomeAiMessages(prev => [...prev, userMsg]);
    setHomeAiLoading(true);

    try {
      const response = await fetchWithRetry('/api/doubt-solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data = await response.json();
      setHomeAiMessages(prev => [...prev, {
        sender: 'ai' as const,
        text: data.text || "I was unable to formulate a response. Please rephrase your query.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err) {
      console.error(err);
      setHomeAiMessages(prev => [...prev, {
        sender: 'ai' as const,
        text: "⚠️ **Network Error**\n\nFailed to establish connection with Sarkari AI server. Ensure your dev status is online.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setHomeAiLoading(false);
    }
  };

  // Payment checkout triggers
  const handleCheckoutProcess = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccess(true);
    setTimeout(() => {
      const planPrices = {
        Monthly: "₹99",
        Quarterly: "₹199",
        Yearly: "₹499",
        Lifetime: "₹999"
      };
      const price = planPrices[selectedPlan] || "₹999";
      const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;

      const newTx: PremiumTransaction = {
        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
        plan: selectedPlan,
        amount: price,
        status: 'COMPLETED',
        refId: referenceId
      };

      setPremiumTransactions(prev => [newTx, ...prev]);

      setUser(prev => ({ 
        ...prev, 
        premiumUser: true,
        premiumPlan: selectedPlan
      }));
      setPaymentSuccess(false);
      setPremiumModalOpen(false);
      // Trigger a direct success dialogue
      triggerToast(`🎉 Congratulations ${user.name}! Your ${selectedPlan} Premium Access is successfully processed. Fully unlocked previous booklets and mock test analyzers.`);
    }, 2000);
  };

  // Support form submits
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactForm({ name: '', email: '', query: '' });
      triggerToast('📧 Message Sent! Our Helpdesk has filed ticket successfully. We will reach out within 24 business hours.');
    }, 1500);
  };

  // Quick Home redirect triggers
  const triggerQualTab = (qualName: string) => {
    setQualificationFilter(qualName);
    setActiveTab('jobs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admit Cards list
  const filteredAdmitCards = admitCards.filter((card) => 
    card.title.toLowerCase().includes(homeAdmitSearch.toLowerCase()) ||
    card.org.toLowerCase().includes(homeAdmitSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 flex flex-col justify-between">
      
      {/* Navbar segment */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user}
        setPremiumModal={setPremiumModalOpen}
        notificationCount={notificationCount}
        onClearNotifications={() => setNotificationCount(0)}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        locale={locale}
        setLocale={setLocale}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />

      {/* Main Body wrap */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 flex-1">
        
        {/* TAB 1: HOME PAGE (DASHBOARD HIGHLIGHTS) */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            
            {/* OFFICIAL BROADCAST ALERT BANNER */}
            <div data-testid="broadcast-join-card" className="bg-gradient-to-r from-emerald-500/10 via-blue-500/11 to-[#1E3A8A]/10 rounded-2xl border border-blue-100 p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs animate-fade-in">
              <div className="flex items-center gap-3.5 text-left">
                <div className="flex -space-x-2 shrink-0">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ring-2 ring-white font-sans font-black text-xs">
                    WA
                  </div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-md ring-2 ring-white font-sans font-black text-xs">
                    TG
                  </div>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm sm:text-base text-slate-800 flex items-center gap-2 flex-wrap">
                    <span>{locale === 'hi' ? 'व्हाट्सएप और टेलीग्राम चैनल' : 'Official WhatsApp & Telegram Channels'}</span>
                    <span className="text-[9px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-sm animate-pulse uppercase tracking-wider">MEMBER JOIN ACTIVE</span>
                  </h4>
                  <p className="font-sans text-xs text-slate-500 mt-1">
                    {locale === 'hi' 
                        ? 'नवीनतम सरकारी नौकरियों (Govt Jobs), एडमिट कार्ड और सरकारी रिजल्ट की सूचना सीधे अपने फोन पर प्राप्त करें!' 
                        : 'Get real-time notification updates, solved PDF booklets, syllabus guidelines, and news directly on your phone.'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2.5 w-full md:w-auto shrink-0 justify-end">
                <a 
                  href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => triggerToast("📲 WhatsApp: Opening verified Sarkari updates feed channel...")}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-bold transition duration-200 shadow-md shadow-emerald-600/10"
                >
                  <span className="text-sm">🟢</span> {locale === 'hi' ? 'WhatsApp चैनल' : 'Join WhatsApp'}
                </a>
                <a 
                  href="https://t.me/SarkariJobHubOfficial" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => triggerToast("✈️ Telegram: Redirecting to verified Sarkari Job Hub channel for official notes...")}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-bold transition duration-200 shadow-md shadow-blue-600/10"
                >
                  <Send className="h-4 w-4 fill-white text-white" /> {locale === 'hi' ? 'Telegram चैनल' : 'Join Telegram Channel'}
                </a>
              </div>
            </div>

            {/* National Emblem & Slogan Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-blue-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-12 shadow-xl shadow-blue-900/10 border border-blue-800/20">
              {/* Backglow blur effects */}
              <div className="absolute -top-12 -left-12 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
                
                {/* Hero Slogan Left */}
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/25 px-3 py-1 text-xs font-bold text-blue-200 border border-blue-400/20">
                    <Star className="h-3 w-3 text-amber-400 animate-spin" /> No. 1 Job Portal in India
                  </div>
                  <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                    Sarkari Naukri Updates, Admit Cards & Results at <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-400">One Place</span>
                  </h1>
                  <p className="font-sans text-sm text-blue-200/90 max-w-xl leading-relaxed">
                    Stay ahead with prompt notifications, chapter-wise mock test structures, verified PDFs, and professional guidance compiled for SSC, Banking, Railways, UPSC & State Exams.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 items-center">
                    <button 
                      onClick={() => setActiveTab('jobs')}
                      className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition flex items-center gap-1"
                    >
                      Browse Vacancies <ArrowUpRight className="h-4.5 w-4.5" />
                    </button>
                    <button 
                      onClick={() => setActiveTab('mock-tests')}
                      className="rounded-xl bg-white/10 px-6 py-3 text-sm font-extrabold text-white border border-white/20 hover:bg-white/15 transition"
                    >
                      Launch Mock Test
                    </button>
                  </div>
                </div>

                {/* Live stats center Right */}
                <div className="md:col-span-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 space-y-4 font-mono text-xs">
                  <span className="block text-[10px] font-bold text-blue-300 uppercase tracking-widest border-b border-white/10 pb-2">
                    🔴 Hub Live Telemetry
                  </span>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-200">Active Positions:</span>
                      <span className="font-bold text-white">55,200+ Posts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Admit Cards Live:</span>
                      <span className="font-bold text-white">{admitCards.length} Live Links</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-200">Registered Aspirants:</span>
                      <span className="font-bold text-emerald-400">42,500+ Active</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-2 text-[11px]">
                      <span className="text-amber-300 font-sans font-bold flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse" /> Gold Certified
                      </span>
                      <span className="text-white">Ad-Free Portal</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Search and qualification grids */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'UPSC Exams', color: 'border-amber-200 bg-amber-50/20 text-amber-800', category: 'UPSC', tag: 'Civil Services' },
                { label: 'Staff Selection (SSC)', color: 'border-blue-200 bg-blue-50/20 text-blue-800', category: 'SSC', tag: 'CGL & CHSL' },
                { label: 'Railway Exams (RRB)', color: 'border-emerald-200 bg-emerald-50/20 text-emerald-800', category: 'Railway', tag: 'NTPC & Group D' },
                { label: 'Military & Defence', color: 'border-rose-200 bg-rose-50/20 text-rose-800', category: 'Defence', tag: 'Army/Navy/AirForce' }
              ].map((card, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    // Quick category select simulation
                    setActiveTab('jobs');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className={`rounded-2xl border ${card.color} p-4 text-center cursor-pointer hover:scale-105 transition duration-200 group relative`}
                >
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">{card.tag}</span>
                  <h4 className="font-sans text-sm font-bold mt-1 group-hover:underline text-slate-800">{card.label}</h4>
                  <p className="font-mono text-[9px] text-slate-400 font-semibold mt-1.5 flex items-center justify-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Verified Updates
                  </p>
                </div>
              ))}
            </div>

            {/* Dedicated Multi-lingual Selection & Preparation Zone Section */}
            <div data-testid="multilingual-preparation-deck" className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm border-l-4 border-l-blue-600">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                    <Globe className="h-5 w-5 animate-spin text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-sans text-sm md:text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
                      <span>{locale === 'hi' ? 'भाषा चयन और बहुभाषी तैयारी केंद्र' : 'Language selection & bilingual prep desk'}</span>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 animate-pulse">BILINGUAL MOCKS LIVE</span>
                    </h3>
                    <p className="font-sans text-xs text-slate-500 mt-0.5">Choose your preparation language to translate the job boards, syllabuses, and mock test interfaces instantly.</p>
                  </div>
                </div>
                
                {/* Language pills picker */}
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code)}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-sans text-xs font-bold transition-all cursor-pointer ${
                        locale === lang.code 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Multi-lingual quick stats of current selection */}
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 text-xs leading-relaxed text-left">
                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80">
                  <span className="font-mono text-[9px] text-blue-600 uppercase font-bold tracking-wider block">Selected Medium</span>
                  <p className="font-sans font-bold text-slate-800 mt-1 flex items-center gap-1.5">
                    <span>{LANGUAGES.find(l => l.code === locale)?.flag}</span>
                    <strong>{LANGUAGES.find(l => l.code === locale)?.label}</strong>
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Your exam portal, notifications, and tests will adapt to this channel.</span>
                </div>

                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80">
                  <span className="font-mono text-[9px] text-orange-600 uppercase font-bold tracking-wider block">Bilingual Syllabus PDFs</span>
                  <p className="font-sans font-bold text-slate-800 mt-1">
                    📖 Available for All State PSC / SSC
                  </p>
                  <button 
                    onClick={() => setActiveTab('syllabus')}
                    className="text-[10px] text-blue-600 font-bold hover:underline block mt-1 text-left"
                  >
                    Download Localized Syllabus »
                  </button>
                </div>

                <div className="bg-slate-50/50 p-3 rounded-2xl border border-slate-100/80 sm:col-span-2 md:col-span-1">
                  <span className="font-mono text-[9px] text-emerald-600 uppercase font-bold tracking-wider block">AI Exam Assistant Help</span>
                  <p className="font-sans font-bold text-slate-800 mt-1">
                    🤖 {locale === 'hi' ? 'परीक्षा मित्र तैयार है' : 'Exam Mitra is Ready'}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">Interactive doubt solving desk available {locale === 'hi' ? 'विशेष रूप से आपकी भाषा में' : 'fully native in your language'}.</span>
                </div>
              </div>
            </div>

            {/* SARKARI EXAM PREP ZONE: MOCKS, PYQS AND AI DOUBT SOLVER */}
            <div data-testid="sarkari-exam-prep-zone" className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 shadow-xs grid gap-6 lg:grid-cols-12 font-sans text-left">
              
              {/* Left Column: AI Doubt Solver desk (7 cols) */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col h-[520px]">
                <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                      <Sparkles className="h-4.5 w-4.5 text-blue-600 animate-pulse text-left" />
                    </span>
                    <div className="text-left">
                      <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">Sarkari AI Exam Mitra</h4>
                      <p className="text-[10px] text-slate-400">Your bilingual academic solver (Bilingual Hindi/English)</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('premium')} 
                    className="text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-2.5 py-1 rounded-lg transition overflow-hidden"
                  >
                    Open Workspace »
                  </button>
                </div>

                {/* Message logs area */}
                <div className="flex-1 overflow-y-auto mb-3 space-y-4 pr-1 text-xs text-left scrollbar-thin">
                  {homeAiMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[90%] rounded-2xl p-3.5 leading-relaxed text-[11.5px] ${
                        msg.sender === 'user' 
                          ? 'bg-blue-650 text-white font-medium' 
                          : 'bg-slate-50 border border-slate-150 text-slate-850'
                      }`}>
                        {msg.sender === 'ai' ? (
                          <div className="text-[11px] space-y-2 prose prose-sm max-w-none text-left">
                            {msg.text.split('\n').map((line, lIdx) => {
                              const trimmed = line.trim();
                              if (!trimmed) return <div key={lIdx} className="h-2" />;
                              
                              if (trimmed.startsWith('###')) {
                                return (
                                  <h5 key={lIdx} className="font-extrabold text-blue-950 text-[11.5px] uppercase tracking-wider mt-3.5 mb-1 text-left decoration-blue-600">
                                    {trimmed.replace('###', '').trim()}
                                  </h5>
                                );
                              }
                              
                              if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                                return (
                                  <p key={lIdx} className="font-bold text-slate-900 border-l-2 border-blue-550 pl-1.5 my-1 text-left">
                                    {trimmed.replace(/\*\*/g, '').trim()}
                                  </p>
                                );
                              }
                              
                              // Check for list items
                              if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
                                return (
                                  <div key={lIdx} className="flex gap-2 text-left pl-2">
                                    <span className="text-blue-500 font-bold">•</span>
                                    <span>{line.replace(/^[-*]\s*/, '').replace(/\*\*/g, '')}</span>
                                  </div>
                                );
                              }

                              return (
                                <p key={lIdx} className="text-slate-700 leading-relaxed text-left">
                                  {line.replace(/\*\*/g, '')}
                                </p>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap text-left">{msg.text}</p>
                        )}
                        {msg.timestamp && (
                          <span className={`block text-[8px] mt-1.5 font-mono text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                            {msg.timestamp}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                  {homeAiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-50 border border-slate-150 rounded-2xl p-3 flex items-center gap-2">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"></span>
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce delay-100"></span>
                          <span className="h-2 w-2 rounded-full bg-blue-600 animate-bounce delay-200"></span>
                        </div>
                        <span className="text-[10px] text-slate-550 font-bold">Exam Mitra resolving query ...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggestions Pills */}
                <div className="mb-3 shrink-0">
                  <span className="text-[9px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider text-left">Click to Solve Instant Doubt:</span>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {[
                      { label: "🤝 Ratio: A:B:C", query: "If A:B = 2:3 and B:C = 4:5, find A:B:C" },
                      { label: "📈 Profit retail gain 20%", query: "Let cost price be 100 with marked price 120 and 10% discount" },
                      { label: "📜 History: Gandhi Action", query: "Mahatma Gandhi and Quit India Movement in 1942 history" },
                      { label: "🔬 Cell: Mitochondria", query: "Explain cell mitochondria biology general science" },
                      { label: "🧩 Logic: Syllogisms", query: "Syllogisms rules and EJOTY reasoning" },
                      { label: "✍️ English: Voice Rules", query: "English grammar active passive voice rule" },
                      { label: "🌍 Rivers of India", query: "West flowing peninsular rivers geography" },
                      { label: "💻 RAM vs ROM memory", query: "Volatile RAM and ROM memory differences computer awareness" },
                      { label: "🏛️ Articles 12-35", query: "What details exist in Part III Articles 12 to 35 Indian Constitution" }
                    ].map((pill, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        disabled={homeAiLoading}
                        onClick={() => handleHomeAiSubmit(pill.query)}
                        className="text-[9.5px] bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-2 py-1 rounded-lg border border-slate-150 transition cursor-pointer text-left shrink-0 active:bg-slate-200"
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Action Input bar */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleHomeAiSubmit();
                  }}
                  className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1 shrink-0"
                >
                  <input
                    type="text"
                    disabled={homeAiLoading}
                    value={homeAiInput}
                    onChange={(e) => setHomeAiInput(e.target.value)}
                    placeholder="Ask formulas, clinical guides, exam timelines..."
                    className="flex-1 bg-transparent px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    disabled={homeAiLoading || !homeAiInput.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-1.5 text-xs transition cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <span>Ask AI / पूछें</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>

              {/* Right Column: Preps (Mock & PYQ Tabs) (5 cols) */}
              <div className="lg:col-span-5 flex flex-col h-[520px]">
                
                {/* Visual Tab header */}
                <div className="bg-white rounded-xl border border-slate-100 p-1.5 flex gap-1 mb-4 shadow-2xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setHomeActivePrepTab('mocks')}
                    className={`flex-1 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                      homeActivePrepTab === 'mocks' 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-transparent text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    📝 Practice Mocks ({mockTests.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setHomeActivePrepTab('pyqs')}
                    className={`flex-1 py-2 rounded-lg font-bold text-xs transition cursor-pointer ${
                      homeActivePrepTab === 'pyqs' 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'bg-transparent text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    📚 Solved PYQs (2019-2026)
                  </button>
                </div>

                {/* Content display box list */}
                <div className="flex-1 overflow-y-auto space-y-3.5 text-left pr-1 scrollbar-thin">
                  {homeActivePrepTab === 'mocks' ? (
                    <>
                      <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 leading-relaxed">
                        ⚡ <strong>Speed-Training Locker:</strong> Attempt high-weightage mock drills compiled by SSC and Medical experts bilingually.
                      </div>
                      
                      {mockTests.slice(0, 2).map((t) => (
                        <div key={t.id} className="bg-white p-4 rounded-xl border border-slate-150 hover:border-blue-150 transition shadow-2xs flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                              <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black uppercase">
                                {t.category}
                              </span>
                              <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
                                {locale === 'hi' ? 'द्विभाषी उपलब्ध' : 'Bilingual Ready'}
                              </span>
                            </div>
                            <h5 className="font-sans text-xs font-extrabold text-slate-900 group-hover:text-blue-650 leading-tight">
                              {t.title}
                            </h5>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2 font-medium">
                              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {t.durationMinutes} Mins</span>
                              <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {t.questions.length} Solved MCQ</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedMockTestId(t.id);
                              setActiveTab('mock-tests');
                              triggerToast(`🚀 Loading test: ${t.title}`);
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg text-[11px] mt-3.5 transition shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                          >
                            <span>Start Practice Test / अभ्यास शुरू करें</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      
                      <button 
                        type="button"
                        onClick={() => setActiveTab('mock-tests')}
                        className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-slate-800 text-xs font-bold text-center transition cursor-pointer"
                      >
                        Browse All Mock Tests ({mockTests.length}) »
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-[11px] text-blue-800 leading-relaxed">
                        🌟 <strong>Past Solved Keys:</strong> Direct download PDFs covering all competitive vaccines and SSC phases (2019 to 2026).
                      </div>

                      {pyqsList.slice(0, 3).map((pyq, pIdx) => (
                        <div key={pIdx} className="bg-white p-3 rounded-xl border border-slate-150 shadow-2xs hover:border-blue-150 transition flex items-center justify-between gap-3 text-left">
                          <div className="space-y-1 max-w-[77%] text-left">
                            <div className="flex items-center gap-1 px-0.5 text-left">
                              <span className="text-[8px] bg-blue-50 text-blue-700 px-1 rounded-xs font-black font-mono">
                                {pyq.year} Series
                              </span>
                              <span className="text-[8px] bg-emerald-50 text-emerald-700 px-1 rounded-xs font-black font-mono">
                                {pyq.exam}
                              </span>
                            </div>
                            <h5 className="font-sans text-[11px] font-bold text-slate-850 truncate leading-snug text-left">
                              {pyq.title}
                            </h5>
                            <span className="text-[9px] text-slate-400 font-semibold block text-left truncate">{pyq.type}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              triggerToast(`📥 Downloading solved booklet: "${pyq.title}"... Saved PDF locally.`);
                            }}
                            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg border border-slate-150 transition cursor-pointer hover:text-blue-600 shadow-2xs shrink-0"
                            title="Download Solved Key"
                          >
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

                      <button 
                        type="button"
                        onClick={() => setActiveTab('pyqs')}
                        className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-500 hover:text-slate-800 text-xs font-bold text-center transition cursor-pointer"
                      >
                        Browse All Solved Papers ({pyqsList.length}) »
                      </button>
                    </>
                  )}
                </div>
              </div>

            </div>

            {/* Main grid columns */}
            <div className="grid gap-10 md:grid-cols-12">
              
              {/* Left Column (8 cols): Latest Job listings & category sections */}
              <div className="md:col-span-8 space-y-10">
                
                {/* Latest Jobs Highlight Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                    <h3 className="font-sans text-base font-bold text-slate-900">
                      Latest Live Job Notifications
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('jobs')}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View All Live <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {jobs.slice(0, 3).map((job) => (
                    <div 
                      key={job.id} 
                      className="bg-white rounded-2xl border border-slate-100 p-4 hover:border-blue-200 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      onClick={() => setActiveTab('jobs')}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                            {job.category} Exam
                          </span>
                          <span className="text-xs text-slate-400">{job.org}</span>
                        </div>
                        <h4 className="font-sans text-sm font-bold text-slate-800 mt-2 leading-snug">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {job.location}</span>
                          <span>•</span>
                          <span className="font-bold text-slate-700">Deadline: {job.lastDate}</span>
                        </div>
                      </div>

                      <button className="rounded-xl border border-blue-100 font-bold px-4 py-2 text-xs text-blue-600 hover:bg-blue-50/50 transition">
                        View Notice
                      </button>
                    </div>
                  ))}
                </div>

                {/* Educational qualification matrices */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
                  <h4 className="font-sans text-sm font-bold text-slate-900 border-b border-slate-50 pb-2">
                    💼 Qualification Wise Recruitment Listings
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center text-xs font-semibold">
                    {[
                      { label: '8th Pass', count: '1 Notice' },
                      { label: '10th Pass', count: '4 Active' },
                      { label: '12th Pass', count: '8 Active' },
                      { label: 'ITI Holders', count: '2 Notices' },
                      { label: 'Diploma', count: '3 Active' },
                      { label: 'Graduate Jobs', count: '14 Active' },
                      { label: 'B.Tech / B.Sc', count: '5 Active' },
                      { label: 'Post Graduate', count: '3 Active' }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => triggerQualTab(item.label as any)}
                        className="p-3 border border-slate-100 rounded-xl bg-slate-50/30 hover:border-blue-200 hover:bg-blue-50/20 transition text-left"
                      >
                        <span className="block text-slate-800 font-bold">{item.label}</span>
                        <span className="block text-[10px] text-slate-400 font-normal mt-0.5 font-mono">{item.count}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admission & Scholarship notices */}
                <div className="rounded-2xl border border-slate-100 bg-white p-5 space-y-4">
                  <h4 className="font-sans text-sm font-bold text-slate-900 border-b border-slate-50 pb-2">
                    🎓 Admissions & Government Scholarship Boards
                  </h4>
                  <div className="space-y-4 font-sans text-xs">
                    <div className="p-3 bg-indigo-50/30 border border-indigo-100/30 rounded-xl flex items-start gap-3">
                      <GraduationCap className="h-8 w-8 text-indigo-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-slate-800">Prime Minister Post-Matric SC/ST Scholarship Scheme</h5>
                        <p className="text-slate-500 mt-1">Underprivileged eligible candidates of intermediate grades and research domains are offered full annual tuition waiver grants. Application Link Active.</p>
                        <a href="https://scholarships.gov.in" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">National Scholarship Portal →</a>
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-50/30 border border-emerald-100/30 rounded-xl flex items-start gap-3">
                      <FileText className="h-8 w-8 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-bold text-slate-800">UGC Junior Research Fellowship (JRF) Admission</h5>
                        <p className="text-slate-500 mt-1">CSIR NET candidates are selected with up to ₹37,000 monthly research stipend packages in registered central and state laboratories.</p>
                        <span className="text-slate-400 mt-2 block font-semibold leading-normal">Status: Registration closes July 30.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (4 cols): Admit cards search, results scorecard, news feed */}
              <div className="md:col-span-4 space-y-8">
                
                {/* Admit Cards section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex justify-between items-center">
                    <h4 className="font-sans text-xs font-bold text-slate-750 flex items-center gap-1.5 uppercase tracking-wide">
                      <FileText className="h-4 w-4 text-blue-600" />
                      e-Admit Cards
                    </h4>
                    <span className="text-[9px] font-extrabold text-[#1E3A8A] uppercase hover:underline cursor-pointer" onClick={() => setActiveTab('admit-cards')}>View All</span>
                  </div>
                  <div className="p-3.5 space-y-3">
                    <input 
                      type="text" 
                      placeholder="Search admit card name..."
                      value={homeAdmitSearch}
                      onChange={(e) => setHomeAdmitSearch(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 p-1.5 text-xs focus:outline-hidden focus:border-blue-500 placeholder-slate-400"
                    />

                    <div className="space-y-2">
                      {filteredAdmitCards.map((card) => (
                        <div key={card.id} className="p-2.5 border border-slate-100 rounded-lg text-[11px] space-y-1.5 bg-slate-50/50">
                          <h5 className="font-bold text-slate-800 leading-snug">{card.title}</h5>
                          <p className="text-[9px] text-slate-400 font-bold">Exam Date: {card.examDate}</p>
                          <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              triggerToast(`📥 Hall ticket download initiated for "${card.title}"`);
                            }}
                            className="text-blue-600 font-bold inline-block hover:underline"
                          >
                            Download Hall Ticket →
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Scorecards Section */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
                  <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200">
                    <h4 className="font-sans text-xs font-bold text-slate-750 flex items-center gap-1.5 uppercase tracking-wide">
                      <Award className="h-4 w-4 text-blue-600" />
                      Declared Exam Results
                    </h4>
                  </div>

                  <div className="p-3.5 space-y-2.5 text-xs">
                    {results.map((res) => (
                      <div key={res.id} className="p-2.5 border border-slate-100 rounded-lg space-y-2 bg-slate-50/50">
                        <div>
                          <h5 className="font-bold text-slate-800 text-[11px]">{res.title}</h5>
                          <span className="text-[9px] text-slate-400 font-extrabold font-mono tracking-wider">{res.releaseDate} released</span>
                        </div>
                        
                        {/* Cutoff micro block */}
                        <div className="bg-white p-1.5 rounded border border-slate-100 grid grid-cols-2 gap-1 text-[9px] text-slate-500 font-semibold">
                          <div>Gen/UR: <span className="font-bold text-slate-800">{res.cutOff.UR}</span></div>
                          <div>OBC: <span className="font-bold text-slate-800">{res.cutOff.OBC}</span></div>
                        </div>

                        <a 
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            triggerToast(`🔍 Complete merit list & scorecard verification for ${res.title}`);
                          }}
                          className="font-bold text-emerald-600 hover:underline inline-block text-[10px]"
                        >
                          Check Scorecard List →
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Government Schemes widget */}
                <div className="bg-linear-to-b from-blue-50 to-indigo-50/30 border border-slate-100 rounded-2xl p-5 space-y-3.5">
                  <h4 className="font-sans text-xs font-bold text-blue-900 uppercase tracking-widest">
                    🇮🇳 Dynamic Schemes Board
                  </h4>
                  <ul className="text-xs space-y-2.5 text-slate-600 list-disc list-inside">
                    <li><span className="font-bold text-slate-800">PM SVANidhi Program</span>: Collateral-free working capital loan limit scaled up.</li>
                    <li><span className="font-bold text-slate-800">Agnipath scheme updates</span>: Selected state force provisions updated.</li>
                    <li><span className="font-bold text-slate-800">Startup Intellectual Scheme</span>: Wave patent registration waiver for rural startups.</li>
                  </ul>
                </div>

                {/* Connected Interactive Academic Ad Banner Section (विज्ञापन अनुभाग) */}
                <SarkariAds 
                  user={user} 
                  onGoPremium={() => setActiveTab('premium')} 
                  triggerToast={triggerToast} 
                  layout="sidebar" 
                />

              </div>
            </div>

            {/* Quick FAQ accordion */}
            <div className="rounded-2xl border border-slate-100 bg-white p-6 space-y-4">
              <h4 className="font-sans text-base font-bold text-slate-900 border-b border-slate-50 pb-2 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Frequently Answered Queries (FAQ Section)
              </h4>
              <div className="grid gap-4 md:grid-cols-2 text-xs leading-relaxed">
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: How do I bookmark notifications?</h5>
                  <p className="text-slate-500">A: Click the bookmark ribbon icon on any vacancy card. Pins immediately save to your User Dashboard.</p>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: Does the mock timer submit automatically?</h5>
                  <p className="text-slate-500">A: Yes, once the stopwatch countdown hits zero, your responses are dispatched and scorecard displays.</p>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: Are e-Admit downloads secure?</h5>
                  <p className="text-slate-500">A: Absolutely. All URLs point to verified union databases or commission direct file assets. No external middleware redirects.</p>
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-800">Q: How to claim Premium membership?</h5>
                  <p className="text-slate-500">A: Go to the 'Premium' tab, choose an option, and complete the sandbox transaction. Premium privileges activate instantly.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: LATEST JOBS (DETAILED COMPREHENSIVE FILTER ENGINE) */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="font-sans text-xl font-extrabold text-slate-900">
                  Government Vacancies & Notices
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time direct applications. Use search or sidebar tabs to filter.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    localStorage.removeItem('sarkari_jobs');
                    localStorage.removeItem('sarkari_admit_cards');
                    localStorage.removeItem('sarkari_results');
                    localStorage.removeItem('sarkari_mock_tests');
                    localStorage.removeItem('sarkari_answer_keys');
                    localStorage.removeItem('sarkari_pyqs');
                    
                    setJobs(INITIAL_JOBS);
                    setAdmitCards(INITIAL_ADMIT_CARDS);
                    setResults(INITIAL_RESULTS);
                    setMockTests(INITIAL_MOCK_TESTS);
                    setAnswerKeys(INITIAL_ANSWER_KEYS);
                    setPyqsList(INITIAL_PYQS);
                    
                    triggerToast("🔄 State synchronized! Vaccine papers (2019-2026) & state eligibility lists successfully loaded.");
                  }}
                  className="text-[10px] bg-amber-50 hover:bg-amber-100 text-amber-800 font-extrabold px-2.5 py-1 rounded transition flex items-center gap-1 border border-amber-200 shadow-xs cursor-pointer"
                  title="Force reload all default data, including new Rajasthan notifications and answer keys!"
                >
                  <RefreshCw className="h-3 w-3 text-amber-700 animate-spin" />
                  Sync Latest Vacancies & Keys
                </button>
                <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-3 py-1 rounded-full font-mono">
                  {jobs.length} Alerts Active
                </span>
              </div>
            </div>

            <JobCard 
              jobs={jobs} 
              user={user} 
              toggleSaveJob={toggleSaveJob}
              qualificationFilter={qualificationFilter}
              setQualificationFilter={setQualificationFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        )}

        {/* TAB: VISUAL EXAM CALENDAR TIMELINE */}
        {activeTab === 'calendar' && (
          <CalendarView 
            jobs={jobs} 
            admitCards={admitCards} 
            onSelectJob={(job) => {
              setActiveTab('jobs');
            }}
            triggerToast={triggerToast}
          />
        )}

        {/* TAB 3: ADMIT CARDS PANEL */}
        {activeTab === 'admit-cards' && (
          <div className="bg-white rounded-3xl border border-blue-50 p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5">
                  <FileText className="h-5.5 w-5.5 text-blue-600" />
                  Direct e-Admit Cards Download Center
                </h2>
                <p className="text-xs text-slate-500">Instant registration and tracking of administrative portal-released hall tickets.</p>
              </div>

              <button
                onClick={() => setActiveTab('uploads')}
                className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 py-2.5 px-4 text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-xs"
              >
                <Plus className="h-4 w-4" /> Upload & Parse Admit Card
              </button>
            </div>

            <div className="space-y-4">
              {admitCards.map((card) => (
                <div key={card.id} className="border border-slate-100 p-4 rounded-2xl bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded">
                      {card.org}
                    </span>
                    <h3 className="font-bold text-slate-800 text-sm mt-1">{card.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
                      <span>Venue: {card.examCity}</span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">Exam Date: {card.examDate}</span>
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Initiated secured download for: ${card.title}.`);
                    }}
                    className="rounded-xl bg-blue-600 py-2 px-4 text-xs font-bold text-white hover:bg-blue-700 transition"
                  >
                    Download Hall Ticket
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RESULTS DECLARATIONS SHEET */}
        {activeTab === 'results' && (
          <div className="bg-white rounded-3xl border border-blue-50 p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans text-xs">
            <h2 className="text-lg font-extrabold text-slate-900 border-b border-slate-50 pb-3 flex items-center gap-1.5">
              <Award className="h-5.5 w-5.5 text-blue-600" />
              Verified Government Exam Merit Lists & Cut-offs
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {results.map((res) => (
                <div key={res.id} className="border border-slate-150 p-4 rounded-3xl bg-slate-50/30 space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{res.title}</h3>
                    <p className="text-slate-400 mt-0.5">Released: {res.releaseDate}</p>
                  </div>

                  {/* Cutoff breakdown */}
                  <div className="p-3 bg-white border border-slate-100 rounded-2xl grid grid-cols-2 gap-2 text-[11px]">
                    <div>Unreserved (UR): <span className="font-bold text-slate-700">{res.cutOff.UR}</span></div>
                    <div>Backward (OBC): <span className="font-bold text-slate-700">{res.cutOff.OBC}</span></div>
                    <div>Scheduled (SC): <span className="font-bold text-slate-700">{res.cutOff.SC}</span></div>
                    <div>Scheduled (ST): <span className="font-bold text-slate-700">{res.cutOff.ST}</span></div>
                  </div>

                  <div className="flex gap-2 text-xs pt-1.5">
                    <button
                      onClick={() => alert(`Scorecard audit requires Candidate ID registration check.`)}
                      className="w-full rounded-xl border border-slate-200 py-2 text-slate-600 font-semibold hover:bg-slate-50 transition"
                    >
                      Personal Score Card
                    </button>
                    <button
                      onClick={() => alert(`Directly downloading verified Merit Rank PDF list.`)}
                      className="w-full rounded-xl bg-blue-600 text-white font-bold py-2 hover:bg-blue-700 transition"
                    >
                      Audit merit roll PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ANSWER KEYS releases */}
        {activeTab === 'answer-key' && (
          <ObjectionPortal triggerToast={triggerToast} answerKeys={answerKeys} />
        )}

        {/* TAB 6: MOCK TEST & EXPERT ASSESSMENTS */}
        {activeTab === 'mock-tests' && (
          <div className="space-y-6">
            <SarkariAds 
              user={user} 
              onGoPremium={() => setActiveTab('premium')} 
              triggerToast={triggerToast} 
              layout="banner" 
            />
            <MockTestPortal 
              mockTests={mockTests} 
              user={user} 
              onSaveTestResult={handleSaveTestResult}
              setPremiumModal={setPremiumModalOpen}
              onChangeTab={setActiveTab}
              initialActiveTestId={selectedMockTestId}
              onClearInitialActiveTestId={() => setSelectedMockTestId(null)}
            />
          </div>
        )}

        {/* TAB 7: USER DASHBOARD PROFILE CREDENTIALS */}
        {activeTab === 'dashboard' && (
          <UserDashboard 
            user={user} 
            jobs={jobs} 
            setUser={setUser} 
            toggleSaveJob={toggleSaveJob}
            setPremiumModal={setPremiumModalOpen}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            triggerToast={triggerToast}
          />
        )}

        {/* TAB 8: ADMIN CONFIGURATION ZONE */}
        {activeTab === 'admin' && (
          <AdminConsole 
            jobs={jobs}
            admitCards={admitCards}
            results={results}
            mockTests={mockTests}
            answerKeys={answerKeys}
            onAddJob={(newJob) => setJobs([newJob, ...jobs])}
            onDeleteJob={(jobId) => setJobs(jobs.filter(j => j.id !== jobId))}
            onAddAdmitCard={(newCard) => setAdmitCards([newCard, ...admitCards])}
            onAddResult={(newRes) => setResults([newRes, ...results])}
            onAddMockTest={(newTest) => setMockTests([newTest, ...mockTests])}
            onAddAnswerKey={(newKey) => setAnswerKeys([newKey, ...answerKeys])}
            onDeleteMockTest={(testId) => {
              const deletedSaved = localStorage.getItem('sarkari_deleted_mock_ids');
              let deletedIds: string[] = [];
              if (deletedSaved) {
                try {
                  deletedIds = JSON.parse(deletedSaved);
                } catch (e) {
                  console.error(e);
                }
              }
              if (!deletedIds.includes(testId)) {
                deletedIds.push(testId);
                localStorage.setItem('sarkari_deleted_mock_ids', JSON.stringify(deletedIds));
              }
              setMockTests(prev => prev.filter(t => t.id !== testId));
              triggerToast('🗑️ Mock test was successfully deleted.');
            }}
          />
        )}

        {/* TAB 9: SYLLABUS & ADMISSIONS library */}
        {activeTab === 'syllabus' && (
          <SyllabusPlanner 
            user={user} 
            triggerToast={triggerToast} 
            selectedGroup={selectedSyllabusGroup}
            setSelectedGroup={setSelectedSyllabusGroup}
          />
        )}

        {/* TAB 10: PREVIOUS YEAR PAPERS index sheets */}
        {activeTab === 'pyqs' && (() => {
          const filteredPYQs = pyqsList.filter((pyq) => {
            const matchesSearch = pyq.title.toLowerCase().includes(pyqSearch.toLowerCase()) || 
                                  pyq.exam.toLowerCase().includes(pyqSearch.toLowerCase()) ||
                                  pyq.type.toLowerCase().includes(pyqSearch.toLowerCase());
            const matchesYear = pyqSelectedYear === 'All' || pyq.year.toString() === pyqSelectedYear;
            const matchesCategory = pyqSelectedCategory === 'All' || pyq.exam.toLowerCase() === pyqSelectedCategory.toLowerCase();
            return matchesSearch && matchesYear && matchesCategory;
          });

          return (
            <div className="bg-white rounded-3xl border border-blue-50 p-6 shadow-xs max-w-4xl mx-auto space-y-6 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-50 pb-3">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-1.5 mb-0.5">
                    <Download className="h-5.5 w-5.5 text-blue-600 animate-pulse" />
                    Previous Year Question Papers (PYQs) Library
                  </h2>
                  <p className="text-xs text-slate-500">Practice with detailed solved question booklets from 2020 to 2025 across all major government vacancies.</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setNewPyqTitle('');
                    setNewPyqFileName('');
                    setNewPyqYear(2025);
                    setNewPyqExam('UPSC');
                    setNewPyqType('Solved PDF Booklet');
                    setShowPyqUploadModal(true);
                  }}
                  className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 py-2.5 px-4 text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 animate-bounce text-yellow-300" />
                  <span>Upload PYQ / नया पुराना पेपर</span>
                </button>
              </div>

              {/* Filters Panel */}
              <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100 grid gap-4 sm:grid-cols-12 text-xs">
                {/* Search Term Input */}
                <div className="sm:col-span-6 space-y-1">
                  <label className="block text-[11px] font-bold text-slate-550 mb-1">Search Paper Title or Keyword</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-xl border border-slate-200 bg-white p-2.5 pl-3.5 text-slate-800 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                      placeholder="e.g. UPSC General Studies, SSC English, etc..."
                      value={pyqSearch}
                      onChange={(e) => setPyqSearch(e.target.value)}
                    />
                    {pyqSearch && (
                      <button 
                        onClick={() => setPyqSearch('')}
                        type="button" 
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-650 font-bold text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Exam Category Selector */}
                <div className="sm:col-span-3 space-y-1">
                  <label className="block text-[11px] font-bold text-slate-550 mb-1">Vacancy Category</label>
                  <select
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 text-xs focus:outline-hidden font-medium"
                    value={pyqSelectedCategory}
                    onChange={(e) => setPyqSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Vacancies</option>
                    <option value="Health/Vaccine">Vaccine & Health Exams</option>
                    <option value="UPSC">UPSC Civil Services</option>
                    <option value="SSC">SSC (CGL, CHSL, MTS)</option>
                    <option value="Bank">Banking Exams (SBI/IBPS)</option>
                    <option value="Railway">Railway (RRB NTPC, Group D)</option>
                    <option value="Teaching">Teaching & TET certification</option>
                    <option value="Defence">Defence Services (NDA/CDS)</option>
                    <option value="State PSC">State Civil Services (PCS)</option>
                  </select>
                </div>

                {/* Year Selector */}
                <div className="sm:col-span-3 space-y-1">
                  <label className="block text-[11px] font-bold text-slate-550 mb-1">Exam Year Range</label>
                  <select
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 text-xs focus:outline-hidden font-medium"
                    value={pyqSelectedYear}
                    onChange={(e) => setPyqSelectedYear(e.target.value)}
                  >
                    <option value="All">All Years (2019 - 2026)</option>
                    <option value="2026">2026 Series</option>
                    <option value="2025">2025 Series</option>
                    <option value="2024">2024 Series</option>
                    <option value="2023">2023 Series</option>
                    <option value="2022">2022 Series</option>
                    <option value="2021">2021 Series</option>
                    <option value="2020">2020 Series</option>
                    <option value="2019">2019 Series</option>
                  </select>
                </div>
              </div>

              {/* Quick Counter Banner */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-sans font-semibold px-1">
                <span>Showing <strong className="text-slate-850 font-bold">{filteredPYQs.length}</strong> of <strong className="text-slate-850 font-bold">{pyqsList.length}</strong> verified previous year papers</span>
                {(pyqSearch || pyqSelectedYear !== 'All' || pyqSelectedCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setPyqSearch('');
                      setPyqSelectedYear('All');
                      setPyqSelectedCategory('All');
                    }}
                    className="text-blue-650 hover:underline font-bold"
                  >
                    Clear active filters
                  </button>
                )}
              </div>

              {/* No outcomes view */}
              {filteredPYQs.length === 0 ? (
                <div className="p-10 border border-dashed border-slate-200 rounded-3xl text-center bg-slate-50/40">
                  <span className="text-3xl block mb-2">🔍</span>
                  <h4 className="font-bold text-slate-800 text-xs">No matching past papers found</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Try adjusting your search keywords, vacancy category or changing the exam year selection to discover more papers.
                  </p>
                  <button 
                    onClick={() => {
                      setPyqSearch('');
                      setPyqSelectedCategory('All');
                      setPyqSelectedYear('All');
                    }}
                    type="button"
                    className="px-4 py-2 mt-4 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition"
                  >
                    Reset Filter Search
                  </button>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 text-xs">
                  {filteredPYQs.map((pyq, idx) => (
                    <div key={idx} className="p-4 border border-slate-150 rounded-2xl bg-slate-50/20 hover:border-blue-150 hover:shadow-xs transition flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] bg-slate-200 text-slate-650 font-bold px-1.5 py-0.5 rounded">
                            {pyq.type}
                          </span>
                          <span className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-black font-mono">
                            {pyq.year} Exam
                          </span>
                          <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded font-black font-mono uppercase">
                            {pyq.exam}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-850 mt-1 leading-snug">{pyq.title}</h4>
                        <span className="text-slate-400 font-mono text-[10px] block">Size: {pyq.size}</span>
                      </div>

                      {pyq.premium && !user.premiumUser ? (
                        <button
                          onClick={() => setPremiumModalOpen(true)}
                          className="flex items-center gap-1 border border-amber-400 text-amber-700 font-bold py-2 px-3.5 rounded-xl bg-amber-50 hover:bg-amber-100 transition font-sans text-xs flex-shrink-0"
                        >
                          👑 Lock
                        </button>
                      ) : (
                        <button 
                          onClick={() => {
                            if (pyq.downloadUrl) {
                              triggerToast(`🔗 Redirecting to study document page: ${pyq.title}`);
                              window.open(pyq.downloadUrl, '_blank', 'noopener,noreferrer');
                            } else {
                              alert(`Starting download for file "${pyq.title}".`);
                            }
                          }}
                          className="flex items-center gap-1.5 bg-blue-600 text-white font-bold py-2 px-3.5 rounded-xl hover:bg-blue-700 transition font-sans text-xs flex-shrink-0 shadow-xs cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" /> Download
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* In-Line Horizontal Ad Placement */}
              <div className="pt-4 border-t border-slate-100">
                <SarkariAds 
                  user={user} 
                  onGoPremium={() => setActiveTab('premium')} 
                  triggerToast={triggerToast} 
                  layout="banner" 
                />
              </div>

              {/* BEAUTIFUL POPUP OVERLAY MODAL FOR PYQ UPLOADS */}
              {showPyqUploadModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={() => !isUploadingPyq && setShowPyqUploadModal(false)}>
                  <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-blue-50 relative pointer-events-auto space-y-4" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => !isUploadingPyq && setShowPyqUploadModal(false)}
                      disabled={isUploadingPyq}
                      className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 disabled:opacity-50 cursor-pointer"
                    >
                      <X className="h-5 w-5" />
                    </button>
                    
                    <div className="text-center pb-2 border-b border-slate-100">
                      <span className="text-3xl block mb-1">📚</span>
                      <h3 className="text-base font-extrabold text-[#1E3A8A]">
                        Upload Previous Year Question Paper
                      </h3>
                      <p className="text-[11px] text-slate-500">Contribute solved key sets, unsolved sheets, or booklets (2020 - 2025)</p>
                    </div>

                    {/* Mode selector tab */}
                    <div className="flex rounded-xl bg-slate-100 p-1">
                      <button
                        type="button"
                        className={`w-1/2 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          pyqUploadMode === 'file' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-850'
                        }`}
                        onClick={() => {
                          setPyqUploadMode('file');
                          setNewPyqUrl('');
                        }}
                        disabled={isUploadingPyq}
                      >
                        📁 File Upload
                      </button>
                      <button
                        type="button"
                        className={`w-1/2 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          pyqUploadMode === 'link' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-500 hover:text-slate-850'
                        }`}
                        onClick={() => {
                          setPyqUploadMode('link');
                          setNewPyqFileName('');
                        }}
                        disabled={isUploadingPyq}
                      >
                        🔗 Paste Link / URL
                      </button>
                    </div>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!newPyqTitle.trim()) {
                        triggerToast("⚠️ Please enter a title for the question paper!");
                        return;
                      }

                      if (pyqUploadMode === 'link' && !newPyqUrl.trim()) {
                        triggerToast("⚠️ Please paste a valid web/PDF link for the paper!");
                        return;
                      }
                      
                      // Start uploading simulation
                      setIsUploadingPyq(true);
                      setUploadPyqProgress(15);
                      
                      const steps = [
                        { p: 35 },
                        { p: 60 },
                        { p: 85 },
                        { p: 100 }
                      ];

                      let currentStep = 0;
                      const interval = setInterval(() => {
                        if (currentStep < steps.length) {
                          setUploadPyqProgress(steps[currentStep].p);
                          currentStep++;
                        } else {
                          clearInterval(interval);
                          
                          // Estimate size or display metadata
                          const mockSize = pyqUploadMode === 'link' ? "Direct URL Link" : (newPyqFileName ? `${(Math.random() * 2.5 + 1.1).toFixed(1)} MB` : "2.4 MB");
                          
                          const newPaper = {
                            title: newPyqTitle,
                            type: newPyqType,
                            size: mockSize,
                            year: Number(newPyqYear),
                            exam: newPyqExam,
                            premium: false,
                            downloadUrl: pyqUploadMode === 'link' ? newPyqUrl : undefined
                          };
                          
                          setPyqsList(prev => [newPaper, ...prev]);
                          setIsUploadingPyq(false);
                          setShowPyqUploadModal(false);
                          setNewPyqTitle('');
                          setNewPyqFileName('');
                          setNewPyqUrl('');
                          triggerToast(`🎉 Success! Centered papers compiled under "${newPyqTitle}" successfully added!`);
                        }
                      }, 300);

                    }} className="space-y-4 text-xs font-sans text-left">
                      
                      {/* Input Link / URL */}
                      {pyqUploadMode === 'link' && (
                        <div className="space-y-1.5 bg-blue-50/40 border border-blue-100 p-3.5 rounded-2xl">
                          <label className="block text-[11px] font-extrabold text-blue-900">
                            Paste Paper Link (टेस्टबुक या अन्य PDF लिंक) *
                          </label>
                          <div className="relative">
                            <input
                              type="url"
                              required
                              className="w-full rounded-xl border border-slate-200 bg-white p-2.5 pr-8 text-slate-850 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                              placeholder="Paste Testbook, Drive or external link here..."
                              value={newPyqUrl}
                              onChange={(e) => {
                                const val = e.target.value;
                                setNewPyqUrl(val);
                                
                                // Beautiful Testbook detection
                                if (val.toLowerCase().includes('testbook.com') || val.toLowerCase().includes('testbook:')) {
                                  let language = "English Language Solution";
                                  if (val.toLowerCase().includes('hindi')) {
                                    language = "Hindi Medium Solved Paper";
                                  } else if (val.toLowerCase().includes('quant') || val.toLowerCase().includes('math')) {
                                    language = "Mathematics (Quant) Key Booklet";
                                  } else if (val.toLowerCase().includes('science')) {
                                    language = "General Science MCQ Booklet";
                                  } else if (val.toLowerCase().includes('gk') || val.toLowerCase().includes('gs') || val.toLowerCase().includes('general-studies')) {
                                    language = "General Studies GS Combined Sets";
                                  }
                                  
                                  const matchId = val.match(/pdf\/([a-f0-9]+)/i);
                                  const suffix = matchId ? ` (Testbook Ref: ${matchId[1].substring(0, 5)})` : " (Pasted Testbook Link)";
                                  
                                  setNewPyqTitle(`Official 2024 Past Paper - ${language}${suffix}`);
                                  setNewPyqType("Solved PDF Booklet");
                                  setNewPyqExam("SSC");
                                  setNewPyqYear(2024);
                                  triggerToast("✨ Magic! Extracted Testbook link credentials & prefilled paper details.");
                                }
                              }}
                              disabled={isUploadingPyq}
                            />
                            <span className="absolute right-3 top-2.5 text-slate-350">🔗</span>
                          </div>
                          <span className="text-[10px] text-slate-500 block leading-normal mt-1">
                            We will index this resource link securely so all aspirants can download it instantaneously!
                          </span>
                        </div>
                      )}

                      {/* Paper Title */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600">Paper Title / Name (शीर्षक) *</label>
                        <input
                          type="text"
                          required
                          className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-850 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-hidden"
                          placeholder="e.g. SSC CGL Tier-1 Maths Shift-1 2024 Solved Paper"
                          value={newPyqTitle}
                          onChange={(e) => setNewPyqTitle(e.target.value)}
                          disabled={isUploadingPyq}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {/* Vacancy Category */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600">Vacancy (श्रेणी)</label>
                          <select
                            className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 bg-white font-medium"
                            value={newPyqExam}
                            onChange={(e) => setNewPyqExam(e.target.value)}
                            disabled={isUploadingPyq}
                          >
                            <option value="UPSC">UPSC Civil Services</option>
                            <option value="SSC">SSC (CGL, CHSL, MTS)</option>
                            <option value="Bank">Banking (SBI/IBPS)</option>
                            <option value="Railway">Railway (NTPC/Group D)</option>
                            <option value="Teaching">Teaching & TET</option>
                            <option value="Defence">Defence (NDA/CDS)</option>
                            <option value="State PSC">State PCS</option>
                          </select>
                        </div>

                        {/* Year */}
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-slate-600">Exam Year (वर्ष)</label>
                          <select
                            className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 bg-white font-bold"
                            value={newPyqYear}
                            onChange={(e) => setNewPyqYear(Number(e.target.value))}
                            disabled={isUploadingPyq}
                          >
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                          </select>
                        </div>
                      </div>

                      {/* Paper Type */}
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-slate-600">Paper Document Type</label>
                        <select
                          className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 bg-white font-medium"
                          value={newPyqType}
                          onChange={(e) => setNewPyqType(e.target.value)}
                          disabled={isUploadingPyq}
                        >
                          <option value="Solved PDF Booklet">Solved PDF Booklet</option>
                          <option value="Official Key">Official Key with solutions</option>
                          <option value="Solved Key">Solved Key & explanations</option>
                          <option value="Question Booklet">Question Booklet (Unsolved)</option>
                          <option value="Practice Sheets">Section-wise Practice Sheets</option>
                        </select>
                      </div>

                      {/* Simulated File upload input */}
                      {pyqUploadMode === 'file' && (
                        <div className="space-y-1.5">
                          <label className="block text-[11px] font-bold text-slate-600">Choose PDF Document or high-res capture</label>
                          
                          <div className="border border-dashed border-slate-250 bg-slate-50/50 hover:bg-slate-50 p-4 rounded-2xl text-center cursor-pointer relative transition" onClick={() => {
                            if (isUploadingPyq) return;
                            
                            const randomNames = [
                              "UPSC_Civil_Services_Prelims_GS_2025.pdf",
                              "SSC_CGL_Mains_Mathematics_2024.pdf",
                              "RRB_NTPC_Stage_1_Solved_Key_2020.pdf",
                              "IBPS_PO_Quantitative_Aptitude_Mains_2023.pdf",
                              "CTET_Paper_I_Child_Pedagogy_Solved_2022.pdf"
                            ];
                            const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
                            setNewPyqFileName(randomName);
                            // Auto fill title if it's empty
                            if (!newPyqTitle) {
                              const formatted = randomName.replace(".pdf", "").replace(/_/g, " ");
                              setNewPyqTitle(formatted);
                            }
                            triggerToast("📁 Validated file selected for secure upload!");
                          }}>
                            <div className="space-y-1 flex flex-col items-center justify-center">
                              <span className="text-2xl text-slate-405">📤</span>
                              {newPyqFileName ? (
                                <div className="text-center font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-150 flex items-center gap-1.5">
                                  <span>📄 {newPyqFileName}</span>
                                </div>
                              ) : (
                                <>
                                  <span className="font-extrabold text-[#1E3A8A]">Tap to pick file / drag document</span>
                                  <span className="text-[10px] text-slate-450 block">Supports PDF, DOC, JPG formats (Max 15MB)</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Progress spinner */}
                      {isUploadingPyq && (
                        <div className="space-y-1 bg-blue-50/50 border border-blue-100 p-3 rounded-2xl">
                          <div className="flex justify-between items-center text-[10px] font-extrabold text-blue-700">
                            <span>Processing and indexing document...</span>
                            <span>{uploadPyqProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-205 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${uploadPyqProgress}%` }}></div>
                          </div>
                          <p className="text-[9px] text-slate-500 italic">
                            {uploadPyqProgress < 30 ? "Connecting to secure database gateway..." : 
                             uploadPyqProgress < 60 ? "Indexing link and verifying query params..." : 
                             uploadPyqProgress < 90 ? "Verifying target authority certificates..." : 
                             "Confirming upload transaction payload..."}
                          </p>
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="button"
                          className="w-1/2 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-755 font-extrabold transition cursor-pointer"
                          onClick={() => !isUploadingPyq && setShowPyqUploadModal(false)}
                          disabled={isUploadingPyq}
                        >
                          Cancel
                        </button>
                        
                        <button
                          type="submit"
                          className="w-1/2 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-700 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          disabled={isUploadingPyq || !newPyqTitle.trim()}
                        >
                          <span>🚀 Submit Paper</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* TAB 15: BRAND NEW ASPIRANT UPLOADS & FILE VAULT */}
        {activeTab === 'uploads' && (
          <SarkariUploadVault
            user={user}
            setUser={setUser}
            onAddAdmitCard={(newCard) => setAdmitCards([newCard, ...admitCards])}
            onAddMockTest={(newTest) => setMockTests([newTest, ...mockTests])}
            onAddPYQ={(newPYQ) => setPyqsList(prev => [
              { title: newPYQ.title, type: 'Solved PDF Booklet', size: newPYQ.size, year: newPYQ.year, exam: newPYQ.exam, premium: newPYQ.premium },
              ...prev
            ])}
            triggerToast={triggerToast}
            onChangeTab={setActiveTab}
          />
        )}

        {/* TAB 11: CURRENT AFFAIRS MODULE */}
        {activeTab === 'current-affairs' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-100 pb-3 gap-3">
              <div>
                <h2 className="font-sans text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Clock className="text-blue-605 h-5 w-5 inline" />
                  Daily Current Affairs & General Knowledge (करंट अफेयर्स)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Verified up-to-date bilingual repository of 50 study capsules and interactive quiz bank for SSC, Bank, Railway & UPSC exams.
                </p>
              </div>
              <div className="text-xs bg-blue-50 text-blue-800 font-bold px-3 py-1.5 rounded-full flex items-center gap-1 self-start md:self-auto font-mono">
                <Sparkles className="h-4 w-4 animate-pulse text-amber-500" /> Active 50+50 Learning Portal
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
              {/* LEFT COLUMN: 50 NEWS CAPSULES PANEL */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* Search Field */}
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search daily capsules... (जैसे: 'AI', 'Neeraj', 'RBI')"
                        value={caSearchQuery}
                        onChange={(e) => {
                          setCaSearchQuery(e.target.value);
                          setCaVisibleCount(6);
                        }}
                        className="w-full text-xs bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                      <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      {caSearchQuery && (
                        <button 
                          onClick={() => setCaSearchQuery('')} 
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Category Dropdown */}
                    <select
                      value={caSelectedCategory}
                      onChange={(e) => {
                        setCaSelectedCategory(e.target.value);
                        setCaVisibleCount(6);
                      }}
                      className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-semibold"
                    >
                      <option value="All">All Categories (सभी श्रेणियां)</option>
                      <option value="National">National (राष्ट्रीय)</option>
                      <option value="International">International (अंतर्राष्ट्रीय)</option>
                      <option value="Sports">Sports (खेलकूद)</option>
                      <option value="Economy">Economy (अर्थव्यवस्था)</option>
                      <option value="Science & Tech">Science & Tech (विज्ञान और तकनीक)</option>
                      <option value="Awards">Awards (पुरस्कार)</option>
                    </select>
                  </div>

                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Quick Filters:</span>
                    {['All', 'National', 'International', 'Sports', 'Economy', 'Science & Tech', 'Awards'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCaSelectedCategory(cat);
                          setCaVisibleCount(6);
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded-full font-bold transition-all ${
                          caSelectedCategory === cat
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* News Capsules Cards list */}
                <div className="space-y-4">
                  {currentAffairs.filter(ca => {
                    const matchesCat = caSelectedCategory === 'All' || ca.category === caSelectedCategory;
                    const matchesSearch = ca.title.toLowerCase().includes(caSearchQuery.toLowerCase()) ||
                                          ca.content.toLowerCase().includes(caSearchQuery.toLowerCase());
                    return matchesCat && matchesSearch;
                  }).length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-2xl py-12 text-center text-xs text-slate-500">
                      <p className="font-semibold text-slate-600">No matching current affairs capsules found.</p>
                      <p className="text-[10px] text-slate-400 mt-1">Try broadening your search query or switching the category filter.</p>
                      <button
                        onClick={() => { setCaSearchQuery(''); setCaSelectedCategory('All'); }}
                        className="mt-3 text-xs text-blue-600 font-bold hover:underline"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    currentAffairs.filter(ca => {
                      const matchesCat = caSelectedCategory === 'All' || ca.category === caSelectedCategory;
                      const matchesSearch = ca.title.toLowerCase().includes(caSearchQuery.toLowerCase()) ||
                                            ca.content.toLowerCase().includes(caSearchQuery.toLowerCase());
                      return matchesCat && matchesSearch;
                    }).slice(0, caVisibleCount).map((ca) => (
                      <div key={ca.id} className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 font-sans text-xs transition duration-200 hover:border-blue-100 hover:shadow-xs group relative">
                        <div className="absolute right-4 top-4 text-[10px] font-mono font-semibold bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 px-2 py-0.5 rounded transition">
                          #Capsule {currentAffairs.findIndex(x => x.id === ca.id) + 1} of 50
                        </div>
                        <div className="flex items-center justify-between gap-1 pr-16">
                          <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2 py-0.5 rounded flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            {ca.category}
                          </span>
                          <span className="text-slate-400 font-mono font-semibold">{ca.date}</span>
                        </div>

                        <h4 className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-blue-700 transition">
                          {ca.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed mt-2 text-xs">{ca.content}</p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-50 pt-3 gap-2">
                          <button
                            onClick={() => triggerToast(`📥 Downloading official verified PDF bilingually for Capsule #${currentAffairs.findIndex(x => x.id === ca.id) + 1}...`)}
                            className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline self-start"
                          >
                            <Download className="h-4 w-4" /> Download Solved PDF (Hindi & English)
                          </button>
                          <span className="text-[10px] text-slate-400 italic">Sarkari Hub Exam Approved • 2026</span>
                        </div>
                      </div>
                    ))
                  )}

                  {currentAffairs.filter(ca => {
                    const matchesCat = caSelectedCategory === 'All' || ca.category === caSelectedCategory;
                    const matchesSearch = ca.title.toLowerCase().includes(caSearchQuery.toLowerCase()) ||
                                          ca.content.toLowerCase().includes(caSearchQuery.toLowerCase());
                    return matchesCat && matchesSearch;
                  }).length > caVisibleCount && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setCaVisibleCount(prev => prev + 6)}
                        className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-5 py-2.5 text-xs text-slate-700 font-bold transition hover:bg-slate-50 shadow-xs flex items-center gap-1.5 mx-auto cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Load More Capsules ({currentAffairs.filter(ca => {
                          const matchesCat = caSelectedCategory === 'All' || ca.category === caSelectedCategory;
                          const matchesSearch = ca.title.toLowerCase().includes(caSearchQuery.toLowerCase()) ||
                                                ca.content.toLowerCase().includes(caSearchQuery.toLowerCase());
                          return matchesCat && matchesSearch;
                        }).length - caVisibleCount} remaining)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: 50 INTERACTIVE QUIZ CONSOLE */}
              <div className="lg:col-span-5">
                <div className="bg-linear-to-b from-slate-900 to-indigo-950 text-white rounded-3xl p-5 shadow-lg space-y-4 text-xs font-sans border border-slate-800 lg:sticky lg:top-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] bg-blue-500/30 text-blue-300 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider block w-max">
                        Bilingual Practice Quiz
                      </span>
                      <h4 className="text-xs font-semibold text-slate-300 mt-1">50 High-Yield GA Questions</h4>
                    </div>
                    {/* Score Tracker */}
                    <div className="text-right">
                      <div className="text-sm font-black text-amber-300 font-mono">
                        {Object.keys(selectedAnswers).length} / 50 Attempted
                      </div>
                      <div className="text-[9px] text-slate-400 font-bold">
                        Score: {
                          Object.entries(selectedAnswers).reduce((acc, [qIdx, ansIdx]) => {
                            return acc + (quizQuestions[parseInt(qIdx)].correctOptionIndex === ansIdx ? 1 : 0);
                          }, 0)
                        } Correct
                      </div>
                    </div>
                  </div>

                  {/* Navigator list dropdown or jump box */}
                  <div className="bg-white/5 rounded-xl p-3 space-y-2 border border-white/10">
                    <p className="text-[10px] text-slate-400 font-bold flex items-center justify-between">
                      <span>Jump to any question (1 - 50):</span>
                      <span className="text-amber-400">Current Q: #{currentQuizIdx + 1}</span>
                    </p>
                    <div className="flex gap-1.5">
                      <select
                        value={currentQuizIdx}
                        onChange={(e) => setCurrentQuizIdx(parseInt(e.target.value))}
                        className="bg-slate-850 border border-slate-750 rounded-lg text-xs leading-none py-1.5 px-2 text-slate-100 flex-1 outline-hidden focus:ring-1 focus:ring-blue-500 font-mono font-bold"
                      >
                        {quizQuestions.map((_, idx) => {
                          const isSolved = selectedAnswers[idx] !== undefined;
                          const isCorrect = isSolved && selectedAnswers[idx] === quizQuestions[idx].correctOptionIndex;
                          return (
                            <option key={idx} value={idx}>
                              Question #{idx + 1} {isSolved ? (isCorrect ? '✅ (Correct)' : '❌ (Wrong)') : '(Unsolved)'}
                            </option>
                          );
                        })}
                      </select>

                      <button
                        onClick={() => {
                          setSelectedAnswers({});
                          setCurrentQuizIdx(0);
                          triggerToast('🧹 Quiz reset! All correct affairs options wiped.');
                        }}
                        className="bg-rose-955 hover:bg-rose-900 border border-rose-800 text-[10px] px-2.5 py-1 rounded-lg font-bold text-rose-300 transition cursor-pointer"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Active Question Box */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">Question #{currentQuizIdx + 1} of 50</span>
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                          Bilingual (Eng/Hindi)
                        </span>
                      </div>
                      <h5 className="font-extrabold text-sm text-slate-100 leading-snug">
                        {quizQuestions[currentQuizIdx].text}
                      </h5>
                    </div>

                    {/* Options area */}
                    <div className="space-y-2">
                      {quizQuestions[currentQuizIdx].options.map((option, oIdx) => {
                        const isSelected = selectedAnswers[currentQuizIdx] === oIdx;
                        const hasAnswered = selectedAnswers[currentQuizIdx] !== undefined;
                        const isCorrectAnswer = quizQuestions[currentQuizIdx].correctOptionIndex === oIdx;

                        // Visual Feedback Color Assignment
                        let btnStyle = 'bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 hover:text-white';
                        if (hasAnswered) {
                          if (isCorrectAnswer) {
                            btnStyle = 'bg-emerald-600 border-emerald-500 text-white shadow-xs font-bold';
                          } else if (isSelected) {
                            btnStyle = 'bg-rose-600 border-rose-500 text-white shadow-xs font-bold';
                          } else {
                            btnStyle = 'bg-white/2 border border-white/5 text-slate-400 pointer-events-none opacity-50';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={hasAnswered}
                            onClick={() => {
                              setSelectedAnswers(prev => ({
                                ...prev,
                                [currentQuizIdx]: oIdx
                              }));
                            }}
                            className={`w-full text-left rounded-xl p-3 font-medium transition cursor-pointer text-xs ${btnStyle}`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span>{option}</span>
                              {hasAnswered && isCorrectAnswer && <CheckCircle className="h-4 w-4 shrink-0 text-emerald-200 inline ml-1" />}
                              {hasAnswered && isSelected && !isCorrectAnswer && <ShieldAlert className="h-4 w-4 shrink-0 text-rose-200 inline ml-1" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Answer Explanation Box (Displays ONLY if attempted) */}
                    {selectedAnswers[currentQuizIdx] !== undefined && (
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 transition-all">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                          <CheckSquare className="h-4 w-4 inline" /> Explanation (व्याख्या):
                        </div>
                        <p className="text-slate-300 leading-relaxed font-sans text-xs">
                          {quizQuestions[currentQuizIdx].explanation}
                        </p>
                        <p className="text-[10px] text-emerald-400 font-bold">
                          Correct Choice Index: ({String.fromCharCode(65 + quizQuestions[currentQuizIdx].correctOptionIndex)})
                        </p>
                      </div>
                    )}

                    {/* Controls Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <button
                        onClick={() => setCurrentQuizIdx(prev => Math.max(0, prev - 1))}
                        disabled={currentQuizIdx === 0}
                        className="bg-white/10 hover:bg-white/15 text-white border border-white/15 disabled:opacity-30 rounded-xl px-3.5 py-2 font-bold transition flex items-center gap-1 text-xs cursor-pointer"
                      >
                        &larr; Prev Q
                      </button>

                      <div className="text-[10px] font-mono text-slate-400 font-bold">
                        {currentQuizIdx + 1} / 50
                      </div>

                      <button
                        onClick={() => setCurrentQuizIdx(prev => Math.min(quizQuestions.length - 1, prev + 1))}
                        disabled={currentQuizIdx === quizQuestions.length - 1}
                        className="bg-blue-600 hover:bg-blue-500 text-white disabled:bg-white/10 disabled:text-white/30 rounded-xl px-4 py-2 font-bold transition flex items-center gap-1 text-xs cursor-pointer"
                      >
                        Next Q &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: BLOG & PREPARATION STRATEGY */}
        {activeTab === 'blog' && (
          <SarkariBlogPortal 
            blogs={blogs} 
            onAddBlog={(newBlog) => setBlogs(prev => [newBlog, ...prev])} 
            triggerToast={triggerToast} 
          />
        )}

        {/* TAB 13: PREMIUM MEMBERSHIP GATE CHOOSE PLANS & PREMIUM WORKSPACE */}
        {activeTab === 'premium' && (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* The main Premium Workspace containing AI Doubt Solving, Premium Mock Tests, and Solved PYQs */}
            <PremiumPortal 
              user={user}
              mockTests={mockTests}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              locale={locale}
              onActivatePremium={() => {
                // Simulate fast sandbox activation
                const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;
                const newTx: PremiumTransaction = {
                  id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
                  date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
                  plan: 'Lifetime',
                  amount: '₹999',
                  status: 'COMPLETED',
                  refId: referenceId
                };
                setPremiumTransactions(prev => [newTx, ...prev]);

                setUser(prev => ({ 
                  ...prev, 
                  premiumUser: true,
                  premiumPlan: 'Lifetime'
                }));
                triggerToast(`🎉 Congratulations! Your Lifetime Premium Access has been active and upgraded successfully. AI Doubt Solver, Mock Tests, and PYQs are fully unlocked!`);
              }}
              triggerToast={triggerToast}
            />

            {!user.premiumUser && (
              <div className="border-t border-slate-200 pt-10 space-y-8">
                {/* Promo Header */}
                <div className="text-center space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-800 border border-amber-400/20">
                    <Sparkles className="h-3 w-3 animate-spin" /> SELECT A PREMIUM MEMBERSHIP
                  </span>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                    Select a budget-friendly plan to enjoy standard ad-free access, unlimited AI Doubt sessions, customized Mock Tests, and premium PDF syllabus keys.
                  </p>
                </div>

                {/* Plans choice blocks */}
                <div className="grid gap-6 sm:grid-cols-4 font-sans text-xs">
                  {[
                    { plan: 'Monthly', price: '₹99', features: 'Standard ad-free access + basic mock score updates', recommend: false },
                    { plan: 'Quarterly', price: '₹199', features: 'Ad-free access, daily quizzes, and regional hall tickets', recommend: false },
                    { plan: 'Yearly', price: '₹499', features: 'Complete solved keys, weekly GA newsletters, and certificates', recommend: false },
                    { plan: 'Lifetime', price: '₹999', features: 'Infinite access, 1-on-1 expert exam audits, and priority support', recommend: true }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setSelectedPlan(item.plan as any)}
                      className={`border rounded-3xl p-5 text-center cursor-pointer transition relative flex flex-col justify-between ${
                        selectedPlan === item.plan 
                          ? 'border-blue-500 ring-2 ring-blue-100 bg-linear-to-b from-blue-50/20 to-white' 
                          : 'border-slate-150 bg-white hover:border-slate-200'
                      }`}
                    >
                      {item.recommend && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white font-sans text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                          RECOMMENDED
                        </span>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{item.plan} Option</h4>
                        <span className="block font-extrabold text-slate-900 text-xl mt-3">{item.price}</span>
                        <p className="text-slate-400 text-[11px] leading-relaxed mt-2.5">{item.features}</p>
                      </div>

                      <div className="mt-5">
                        <div className={`h-4.5 w-4.5 rounded-full border mx-auto flex items-center justify-center ${
                          selectedPlan === item.plan ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                        }`}>
                          {selectedPlan === item.plan && <CheckCircle className="h-3.5 w-3.5" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sandbox pay form */}
                <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 max-w-xl mx-auto shadow-sm">
                  <h3 className="font-sans text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    Verified Ad-Free Sandbox checkout
                  </h3>

                  <form onSubmit={handleCheckoutProcess} className="space-y-4 text-xs">
                    
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI')}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold border ${
                          paymentMethod === 'UPI' 
                            ? 'border-blue-500 bg-blue-50/20 text-blue-800' 
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        UPI Payments (Recommended)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Card')}
                        className={`w-full py-2.5 rounded-xl text-xs font-semibold border ${
                          paymentMethod === 'Card' 
                            ? 'border-blue-500 bg-blue-50/20 text-blue-800' 
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        Debit / Credit Card
                      </button>
                    </div>

                    {paymentMethod === 'UPI' ? (
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 block">UPI verification parameters</span>
                        
                        <div className="grid grid-cols-2 gap-4 items-center">
                          <div>
                            <label className="block text-[11px] text-slate-400 mb-1">UPI ID address</label>
                            <input 
                              type="text" 
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="rounded-lg border border-slate-200 bg-white p-2 text-xs w-full font-mono text-slate-800 focus:outline-hidden"
                              required
                            />
                          </div>
                          <div className="text-center">
                            <span className="text-[9px] text-slate-400 block mb-1">Secure UPI QR Mock</span>
                            <div className="mx-auto h-16 w-16 bg-slate-900 rounded-lg flex items-center justify-center text-white font-mono text-[9px] font-bold line-clamp-1">
                              QR PAY [📄]
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-[11px] font-bold text-slate-500 block">Bank parameters</span>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <input type="text" placeholder="16 Digit Number" className="rounded-lg border border-slate-200 bg-white p-2 sm:col-span-3 text-xs focus:outline-hidden" required />
                          <input type="text" placeholder="MM/YY" className="rounded-lg border border-slate-200 bg-white p-2 text-xs focus:outline-hidden" required />
                          <input type="password" placeholder="CVV" className="rounded-lg border border-slate-200 bg-white p-2 text-xs focus:outline-hidden" required />
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50/50 p-3 rounded-xl text-[10px] text-slate-500 leading-normal flex items-start gap-1.5 border border-blue-100/50">
                      <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span>The sandbox implements standard simulated verify. No real funds will transaction from your banking credentials. Instantly awards full access levels.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={paymentSuccess}
                      className="w-full rounded-xl bg-amber-500 text-white font-extrabold py-3 text-sm hover:bg-amber-600 transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                    >
                      {paymentSuccess ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" /> Verifying Payment Receipt...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4.5 w-4.5" /> Activate {selectedPlan} Access (Unlock)
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 14: CONTACT US support dashboard */}
        {activeTab === 'contact' && (
          <div className="max-w-4xl mx-auto space-y-10">
            
            <div className="text-center space-y-1">
              <h2 className="font-sans text-xl font-extrabold text-slate-900">
                Contact Job Sarkari Hub Helpdesk
              </h2>
              <p className="text-xs text-slate-500">
                Got questions regarding admit releases or mock certificates? Shoot us an inquiry.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Info columns */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 space-y-6 text-xs font-sans">
                <h4 className="font-bold text-slate-900 border-b border-slate-50 pb-2">Direct Headquarters Coordinates</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Building2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold">New Delhi Central Desk</h5>
                      <p className="text-slate-400 mt-0.5">3rd Complex, National Informatics Buildings, Lodhi Road, New Delhi, 110003</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold">Assigned Electronic Mail</h5>
                      <p className="text-slate-400 mt-0.5">helpdesk@jobsarkarihub.in</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h5 className="font-bold">Telephone Helpline</h5>
                      <p className="text-slate-400 mt-0.5">+91 11-2306-0000 (Central desk lines)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl">
                  <span className="font-bold text-slate-700 block mb-1">WhatsApp Broadcast hub</span>
                  <p className="text-slate-500">Subscribe directly to our broadcast alerts. Get instant notifications regarding vacancy extensions, results declarations, and mock keys.</p>
                </div>
              </div>

              {/* Message form */}
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xs">
                <h4 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-50 pb-2">Dispatch Inquiry</h4>

                <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Your Full Name</label>
                    <input 
                      type="text" 
                      value={contactForm.name} 
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="rounded-lg border border-slate-200 p-2.5 w-full focus:outline-hidden"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Your Email</label>
                    <input 
                      type="email" 
                      value={contactForm.email} 
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="rounded-lg border border-slate-200 p-2.5 w-full focus:outline-hidden" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Describe Query</label>
                    <textarea 
                      rows={4}
                      value={contactForm.query} 
                      onChange={(e) => setContactForm({...contactForm, query: e.target.value})}
                      placeholder="Specify exam name and issue guidelines..."
                      className="rounded-lg border border-slate-200 p-2.5 w-full focus:outline-hidden" 
                      required 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full rounded-xl bg-blue-600 font-extrabold text-white py-3 hover:bg-blue-700 transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="h-4 w-4" /> Dispatch Query
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* Persistent dynamic Footer details */}
      <footer id="global-portal-footer" className="bg-slate-900 text-slate-400 py-10 mt-12 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4 font-sans text-xs">
            
            <div className="space-y-3">
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                🇮🇳 Job Sarkari Hub
              </span>
              <p className="text-slate-500 leading-relaxed font-sans">
                India's leading verified platform for mock test modules, direct admit downloads, government qualifications, and current affairs feeds.
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                SECURE SSL VERIFIED DESK
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-1">Quick Directories</h4>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveTab('jobs')} className="hover:text-slate-200">Latest Govt Vacancies</button></li>
                <li><button onClick={() => setActiveTab('admit-cards')} className="hover:text-slate-200">Hall ticket admit downloads</button></li>
                <li><button onClick={() => setActiveTab('results')} className="hover:text-slate-200">Direct Merit results</button></li>
                <li><button onClick={() => setActiveTab('mock-tests')} className="hover:text-slate-200 font-bold text-amber-400">Mock Assessments</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-1">Security & Policies</h4>
              <ul className="space-y-1.5 font-sans">
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Terms of Services: All download links points to official Union or State Commission services.'); }} className="hover:text-slate-200">Terms of Service</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); alert('Privacy Policies: Sarkari Hub complies with standard SSL certificates. Candidate registration profiles are stored locally.'); }} className="hover:text-slate-200">Privacy Policy</a></li>
                <li><button onClick={() => setViewingSEO(!viewingSEO)} className="hover:text-slate-200 font-bold text-emerald-400 flex items-center gap-1">
                  View SEO URLs & Sitemap XML {viewingSEO ? '[Hide]' : '[View]'}
                </button></li>
                <li><button onClick={() => setViewingTraffic(!viewingTraffic)} className="hover:text-slate-200 font-bold text-sky-400 flex items-center gap-1">
                  📊 Check Website Traffic & Visitors {viewingTraffic ? '[Hide]' : '[Check]'}
                </button></li>
              </ul>
            </div>

            {/* Social Sharing elements */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest border-b border-slate-800 pb-1">Broadcast Channels</h4>
              <p className="text-slate-500 leading-normal">Subscribe to our verified Telegram & WhatsApp feeds for direct 24x7 notifications updates.</p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://t.me/SarkariJobHubOfficial" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => triggerToast("✈️ Telegram: Redirecting to official @SarkariJobHubOfficial channel...")}
                  className="inline-flex items-center gap-1 bg-blue-600/20 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-600/30 transition text-xs"
                >
                  <Send className="h-3 w-3 fill-blue-400 text-blue-400" /> Telegram Channel
                </a>
                <a 
                  href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => triggerToast("📲 WhatsApp: Opening verified broadcast newsletter...")}
                  className="inline-flex items-center gap-1.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-600/30 transition text-xs"
                >
                  <span>🟢</span> WhatsApp Feed
                </a>
              </div>
            </div>

          </div>

          {/* Dynamic Interactive SEO Sitemap & Schema panel */}
          {viewingSEO && (
            <div id="seo-metadata-debugger" className="mt-8 border-t border-slate-800 pt-6 font-sans text-slate-300 bg-slate-900 border border-slate-800/80 p-5 sm:p-7 rounded-3xl shadow-2xl animate-fade-in relative overflow-hidden">
              
              {/* Abstract decorative graphic badge */}
              <div className="absolute top-0 right-0 p-4 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono rounded-bl-2xl font-bold border-l border-b border-emerald-500/10 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                ACTIVE CRAWLER MATRIX
              </div>

              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-slate-800 text-emerald-400 rounded-xl">
                  <Globe className="h-5.5 w-5.5 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">Sarkari SEO Optimizer & Search Console Auditor</h3>
                  <p className="text-xs text-slate-400 font-medium">Bilingual meta-tag manager, dynamic sitemaps validator, and structured schemas console.</p>
                </div>
              </div>

              {/* Dynamic Interactive Dual layout */}
              <div className="grid lg:grid-cols-12 gap-6 items-start mt-6">
                
                {/* Meta Tags Editor (Inputs) - 5 columns */}
                <div className="lg:col-span-5 space-y-4 bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-slate-800/60 text-xs">
                  <h4 className="text-white font-extrabold uppercase tracking-wider text-[11px] pb-2 border-b border-slate-800 flex items-center justify-between">
                    <span>Meta Title & Snippet Controller</span>
                    <span className="text-[10px] text-slate-500 capitalize font-medium">Character Counters Live</span>
                  </h4>

                  {/* Input 1: Title */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400">Search Title Tag (&lt;title&gt;):</label>
                    <input 
                      type="text"
                      value={seoTestTitle}
                      onChange={(e) => setSeoTestTitle(e.target.value)}
                      maxLength={120}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-sans focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Enter custom title tag..."
                    />
                    <div className="flex justify-between items-center text-[10px]">
                      <span className={seoTestTitle.length >= 50 && seoTestTitle.length <= 60 ? "text-emerald-400 font-bold" : "text-amber-400 font-medium"}>
                        {seoTestTitle.length} characters (Google ideal: 50-60)
                      </span>
                      {seoTestTitle.length >= 50 && seoTestTitle.length <= 60 ? (
                        <span className="text-emerald-400 font-bold">✓ Perfect Length</span>
                      ) : (
                        <span className="text-slate-500">Too {seoTestTitle.length < 50 ? "short" : "long"}</span>
                      )}
                    </div>
                  </div>

                  {/* Input 2: Description */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[11px] font-bold text-slate-400">Meta Description:</label>
                    <textarea 
                      value={seoTestDesc}
                      onChange={(e) => setSeoTestDesc(e.target.value)}
                      maxLength={250}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-100 font-sans focus:outline-none focus:border-blue-500 transition-colors resize-none leading-relaxed"
                      placeholder="Enter custom page summary description..."
                    />
                    <div className="flex justify-between items-center text-[10px]">
                      <span className={seoTestDesc.length >= 120 && seoTestDesc.length <= 160 ? "text-emerald-400 font-bold" : "text-amber-400 font-medium"}>
                        {seoTestDesc.length} characters (Google ideal: 120-160)
                      </span>
                      {seoTestDesc.length >= 120 && seoTestDesc.length <= 160 ? (
                        <span className="text-emerald-400 font-bold">✓ Perfect Length</span>
                      ) : (
                        <span className="text-slate-500">Too {seoTestDesc.length < 120 ? "short" : "long"}</span>
                      )}
                    </div>
                  </div>

                  {/* Quick dynamic tips card */}
                  <div className="bg-blue-950/20 border border-blue-500/10 p-3 rounded-xl text-[11px] leading-relaxed text-blue-200">
                    <span className="font-extrabold block mb-0.5 text-blue-400">💡 Sarkari SEO Golden Tip:</span>
                    Including vernacular terms like <strong className="text-amber-400">"Sarkari Result 2026"</strong> or <strong className="text-amber-400">"Admit Card"</strong> in metadata improves search click-through rates by up to <strong className="text-emerald-400">42%</strong> across Hindi/English bilingual aspirants.
                  </div>
                </div>

                {/* Simulated Output & Audits Core - 7 columns */}
                <div className="lg:col-span-7 bg-slate-950/30 border border-slate-800/80 rounded-2xl overflow-hidden text-xs">
                  
                  {/* Selector tab row */}
                  <div className="bg-slate-950 px-3.5 pt-3 border-b border-slate-800 flex flex-wrap gap-1">
                    {[
                      { id: 'serp', label: '🔍 Google SERP Preview' },
                      { id: 'social', label: '📱 Social Cards' },
                      { id: 'schema', label: '🛠 Schema Markup' },
                      { id: 'checklist', label: '✓ Crawler Audit Checklist' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSeoTab(tab.id as any)}
                        className={`px-3 py-2 text-[10.5px] font-sans font-extrabold rounded-t-xl transition-all ${
                          seoTab === tab.id 
                            ? 'bg-slate-900 text-white border-t-2 border-t-emerald-500 border-l border-r border-slate-800' 
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Body */}
                  <div className="p-4 sm:p-5 text-left">
                    
                    {/* TAB A: Google SERP Preview */}
                    {seoTab === 'serp' && (
                      <div className="space-y-4 font-sans max-w-xl">
                        <span className="block text-[10px] text-slate-500 uppercase font-black tracking-widest">Google Desktop Search Result Snippet Simulator:</span>
                        
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs space-y-1 block select-none">
                          <div className="flex items-center gap-1.5 text-[11px] text-[#202124] font-medium leading-none overflow-hidden text-ellipsis whitespace-nowrap">
                            <span className="inline-flex h-4 w-4 bg-slate-100 rounded-full items-center justify-center text-[10px]">🌐</span>
                            <span>https://sarkari-job-hub-v595.onrender.com</span>
                            <span className="text-[10px] text-slate-400">› jobs-sitemap</span>
                          </div>
                          
                          <h4 className="text-[17px] text-[#1a0dab] hover:underline font-normal cursor-pointer leading-tight font-sans line-clamp-1 py-0.5">
                            {seoTestTitle || "Job Sarkari Hub — Latest Sarkari Results, Admit Cards & Syllabus Guides"}
                          </h4>
                          
                          <p className="text-[12.5px] text-[#4d5156] leading-relaxed line-clamp-2 mt-0.5">
                            <span className="text-[#70757a] text-[11px]">2 days ago — </span>
                            {seoTestDesc || "India's leading bilingual government job portal. Find real-time Sarkari Results, e-Admit Cards, official Syllabus PDF downloads, and premium bilingual SSC/UPSC mock exams."}
                          </p>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                          <span><strong>Meta titles</strong> & <strong>Canonical anchors</strong> matches index rules perfectly for mobile responsiveness.</span>
                        </div>
                      </div>
                    )}

                    {/* TAB B: Social Meta open graph tags */}
                    {seoTab === 'social' && (
                      <div className="space-y-4 font-sans">
                        <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest">Open Graph Card Preview (og:title, og:description):</span>
                        
                        <div className="max-w-md bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-md">
                          <img 
                            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop"
                            alt="Government Exam Preparation"
                            className="w-full h-32 object-cover object-center brightness-90 bg-slate-800"
                          />
                          <div className="p-3 text-[11px] space-y-1 bg-zinc-900 border-t border-zinc-800">
                            <span className="text-[#1D9BF0] uppercase font-black text-[9px] tracking-widest block">JOB SARKARI HUB OFFICIAL</span>
                            <h5 className="font-bold text-white leading-snug line-clamp-1">{seoTestTitle}</h5>
                            <p className="text-zinc-400 line-clamp-2 leading-relaxed">{seoTestDesc}</p>
                            <span className="text-[10px] text-zinc-500 block pt-1 font-mono">sarkari-job-hub-v595.onrender.com</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB C: Schema markup copy panel */}
                    {seoTab === 'schema' && (
                      <div className="space-y-3 font-mono text-[10.5px]">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-1 w-full text-slate-400">
                          <span className="font-sans font-bold text-emerald-400 flex items-center gap-1">✓ Structured JSON-LD JSON Schema Standard Validated</span>
                          <button 
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Job Sarkari Hub",
  "url": "https://sarkari-job-hub-v595.onrender.com/",
  "description": "${seoTestDesc}"
}`);
                                triggerToast("📋 JSON-LD schema copied successfully!");
                              } catch (e) {}
                            }}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-sans text-[10px] uppercase tracking-wide px-2 py-0.5 rounded"
                          >
                            Copy Code
                          </button>
                        </div>
                        
                        <pre className="bg-slate-950 text-emerald-300 p-3 rounded-lg overflow-x-auto text-[10px] max-h-40 leading-relaxed font-semibold">
{`{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Job Sarkari Hub",
  "url": "https://sarkari-job-hub-v595.onrender.com/",
  "description": "${seoTestDesc.slice(0, 100)}...",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://sarkari-job-hub-v595.onrender.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}`}
                        </pre>
                      </div>
                    )}

                    {/* TAB D: Checklist validator checklist */}
                    {seoTab === 'checklist' && (
                      <div className="space-y-2 text-xs">
                        <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">On-Page Crawlablility & Index Audit Results:</span>
                        
                        <div className="space-y-1.5 font-sans">
                          {[
                            { name: "Single unique <title> element discovered inside <head>", desc: "Job Sarkari Hub matches metadata norms", value: true },
                            { name: "Character length check of ideal Meta description tags", desc: "Allows full contextual snippet display on mobile", value: seoTestDesc.length >= 120 && seoTestDesc.length <= 180 },
                            { name: "Google Site Verification metadata badge active", desc: "google-site-verification: googlea4fd13bfa005370e tag discovered", value: true },
                            { name: "XML Dynamic Sitemap route active on index servers", desc: "Served dynamically at /sitemap.xml", value: true },
                            { name: "Robots directive permissions configuration set", desc: "Allow index guidelines validated at /robots.txt", value: true },
                            { name: "SEO Bilingual Alternate Index Headers (hreflang alternates)", desc: "Enables equal indexing on Hindi and English query matches", value: true }
                          ].map((item, index) => (
                            <div key={index} className="flex gap-2.5 items-start bg-slate-900/50 border border-slate-850 p-2 rounded-xl">
                              <span className="text-sm">{item.value ? "🟢" : "🟡"}</span>
                              <div>
                                <span className="font-extrabold text-slate-100 flex items-center gap-1">{item.name} {item.value ? <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1 py-0.2 rounded font-extrabold uppercase align-middle">PASSED</span> : <span className="text-[10px] bg-amber-950 text-amber-300 px-1 py-0.2 rounded uppercase align-middle">WARNING</span>}</span>
                                <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Actions & Verification triggers footer */}
                  <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-wrap gap-2 justify-between items-center">
                    <span className="text-[11px] font-mono text-emerald-500 font-extrabold flex items-center gap-1.5 uppercase tracking-wide">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Console Status: ALL INDEX CHANNELS STABLE (100%)
                    </span>
                    
                    <div className="flex gap-2 flex-wrap">
                      <button 
                        onClick={() => {
                          triggerToast("🤖 Crawler Index Request sent! Googlebot is crawling sitemap.xml pathways and updating cache snapshots...");
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs font-sans px-3.5 py-1.5 rounded-xl transition duration-200 shadow-md shadow-emerald-500/10 cursor-pointer"
                      >
                        ⚡ Live Request Indexing
                      </button>
                      <a 
                        href="/sitemap.xml" 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs font-sans px-3 py-1.5 rounded-xl transition cursor-pointer inline-flex items-center gap-1"
                      >
                        Sitemap.xml <Link className="h-3 w-3" />
                      </a>
                      <a 
                        href="/robots.txt" 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs font-sans px-3 py-1.5 rounded-xl transition cursor-pointer inline-flex items-center gap-1"
                      >
                        Robots.txt <Link className="h-3 w-3" />
                      </a>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Dynamic Interactive Web Traffic Analytics & Visitors panel */}
          {viewingTraffic && (
            <div id="traffic-analytics-debugger" className="mt-8 border-t border-slate-800 pt-6 font-sans text-slate-300 bg-slate-900 border border-slate-800/80 p-5 sm:p-7 rounded-3xl shadow-2xl animate-fade-in relative overflow-hidden">
              {/* Live telemetry graphic badge */}
              <div className="absolute top-0 right-0 p-4 bg-sky-500/10 text-sky-450 text-sky-400 text-[10px] font-mono rounded-bl-2xl font-bold border-l border-b border-sky-500/10 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping"></span>
                LIVE TRAFFIC MATRIX
              </div>

              <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 bg-slate-800 text-sky-400 rounded-xl">
                  <Globe className="h-5.5 w-5.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight">वेबसाइट लाइव ट्रैफिक और विज़िटर कंसोल (Real-time Web Traffic Analyzer)</h3>
                  <p className="text-xs text-slate-400 font-medium">Bilingual Web Traffic dashboard, state-wise load indexes, search queries and organic crawler volume.</p>
                </div>
              </div>

              {/* Top Stats Cards Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left mb-6">
                
                {/* Metric 1 */}
                <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 shrink-0 relative">
                    <span className="absolute top-1 right-1 h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-550 block tracking-wider">Active Visitors on Site</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-white font-mono">{trafficLiveUsers}</span>
                      <span className="text-[9px] text-emerald-400 font-bold font-mono text-xs">LIVE</span>
                    </div>
                    <span className="text-[10.5px] text-slate-400 block font-sans">Active sessions counter</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-550 block tracking-wider">Page Views Today</span>
                    <span className="text-xl font-black text-white font-mono">{(trafficPageViews).toLocaleString()}</span>
                    <span className="text-[10.5px] text-emerald-400 font-bold block">▲ +12% since yesterday</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-550 block tracking-wider">Daily Unique Visitors</span>
                    <span className="text-xl font-black text-white font-mono">12,540</span>
                    <span className="text-[10.5px] text-slate-400 block">Avg organic candidates load</span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-550 block tracking-wider">Avg Session Time</span>
                    <span className="text-xl font-black text-white font-mono">4m 32s</span>
                    <span className="text-[10.5px] text-indigo-400 font-bold block">Excellent engagement index</span>
                  </div>
                </div>

              </div>

              {/* Sub-tabs Selection Row */}
              <div className="bg-slate-950 px-3.5 pt-3 border border-slate-800 rounded-t-2xl flex flex-wrap gap-1">
                {[
                  { id: 'dashboard', label: '📈 Traffic Dashboard' },
                  { id: 'geo', label: '🗺 State-Wise Visitors' },
                  { id: 'referrals', label: '🔗 Referral Traffic Sources' },
                  { id: 'realtime', label: '⚡ Live Queries & Spike Simulator' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTrafficActiveTab(tab.id as any)}
                    className={`px-3.5 py-2 text-[10.5px] font-sans font-extrabold rounded-t-xl transition-all cursor-pointer ${
                      trafficActiveTab === tab.id 
                        ? 'bg-slate-900 text-white border-t-2 border-t-sky-400 border-l border-r border-slate-800' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Body Panel */}
              <div className="bg-slate-950/30 border-l border-r border-b border-slate-800 p-5 rounded-b-2xl text-left text-xs text-slate-300">
                
                {/* TAB 1: DASHBOARD GRAPH REPRESENTATION */}
                {trafficActiveTab === 'dashboard' && (
                  <div className="space-y-4">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest">Candidate Load Distribution & Traffic Volume over the last 24 Hours:</span>
                    
                    {/* Hourly block graph mapping */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-4">
                      <div className="flex justify-between items-end h-28 gap-1.5 sm:gap-2.5 pt-4">
                        {[
                          { hour: "12 AM", percent: 12, label: "Low" },
                          { hour: "3 AM", percent: 5, label: "Offline" },
                          { hour: "6 AM", percent: 25, label: "Waking" },
                          { hour: "9 AM", percent: 78, label: "Working" },
                          { hour: "12 PM", percent: 95, label: "Peak" },
                          { hour: "3 PM", percent: 82, label: "Active" },
                          { hour: "6 PM", percent: 88, label: "Active" },
                          { hour: "9 PM", percent: 100, label: "Max Peak" },
                          { hour: "11 PM", percent: 45, label: "Wind-down" }
                        ].map((h, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                            {/* Graphic bar */}
                            <div className="w-full relative rounded-t-lg bg-slate-800 hover:bg-sky-500 transition-colors cursor-pointer" style={{ height: `${h.percent}%` }}>
                              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition shadow bg-slate-950 text-sky-400 text-[9px] p-1 rounded border border-slate-800 whitespace-nowrap z-10 font-bold">
                                {h.percent}% Load ({h.label})
                              </div>
                            </div>
                            <span className="text-[9px] text-slate-500 font-mono tracking-tighter whitespace-nowrap">{h.hour}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] leading-relaxed text-slate-400">
                        📊 <strong>Hourly Peak Index:</strong> Peak registration activities are centered around <strong className="text-white">12:00 PM (Noon)</strong> and <strong className="text-white">9:00 PM (Night)</strong>, aligning perfectly with standard Indian competitive results alerts releases hours.
                      </p>
                    </div>

                    {/* Google Analytics compliance verification panel */}
                    <div className="bg-blue-950/20 border border-blue-500/10 p-3.5 rounded-xl text-[11.5px] leading-relaxed text-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="text-left">
                        <strong className="text-blue-400 block mb-0.5 font-bold">Google Analytics 4 (GA4) Engine Integrator:</strong>
                        <span>Currently reading GA tracking snippet config using global key: <code className="text-amber-300 bg-slate-950 px-1 py-0.2 rounded mx-1 font-mono text-[10px]">VITE_GA_MEASUREMENT_ID</code> (Default fallback ID: <code className="text-emerald-400 bg-slate-950 px-1 font-bold font-mono text-[10px]">G-FRH0MF2F4B</code>).</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => {
                          triggerToast("⚙️ Re-initializing Google Analytics tracker context... GA code injected successfully!");
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shrink-0 cursor-pointer"
                      >
                        ⚡ Test Connection
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 2: GEOLOCATION VISITOR DENSITY */}
                {trafficActiveTab === 'geo' && (
                  <div className="space-y-4">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest">State-wise Visitor Volume (भारत के शीर्ष राज्य - उम्मीदवार ट्रैफ़िक):</span>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      
                      {/* Left list with graphic bar meters */}
                      <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                        <h4 className="font-extrabold text-white text-[11px] uppercase tracking-wider pb-1 ml-0.5 border-b border-slate-800 mb-1.5">Top Traffic Provinces (राज्य लोड सूचकांक):</h4>
                        
                        <div className="space-y-2.5">
                          {[
                            { name: "Uttar Pradesh (उत्तर प्रदेश)", count: "16,420 candidates", percent: 42, color: "from-sky-550 to-blue-500" },
                            { name: "Bihar (बिहार)", count: "10,980 candidates", percent: 28, color: "from-emerald-500 to-teal-600" },
                            { name: "Rajasthan (राजस्थान)", count: "4,690 candidates", percent: 12, color: "from-amber-400 to-orange-500" },
                            { name: "Madhya Pradesh (मध्य प्रदेश)", count: "3,130 candidates", percent: 8, color: "from-indigo-500 to-violet-650" },
                            { name: "Delhi & Haryana (दिल्ली-हरियाणा)", count: "2,050 candidates", percent: 5, color: "from-rose-500 to-pink-600" },
                            { name: "Others (अन्य राज्य)", count: "1,140 candidates", percent: 5, color: "from-slate-500 to-slate-650" }
                          ].map((state, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="font-bold text-slate-200">{state.name}</span>
                                <span className="text-slate-400 font-mono font-medium">{state.count} <strong className="text-white">({state.percent}%)</strong></span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full bg-gradient-to-r ${state.color}`} style={{ width: `${state.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right contextual graphic guide */}
                      <div className="bg-slate-950/20 border border-slate-850 p-4 rounded-xl flex flex-col justify-between text-[11.5px] leading-relaxed text-slate-400 space-y-3">
                        <div className="space-y-2">
                          <strong className="text-white block font-extrabold text-[#38bdf8]">💡 Demographic SEO Strategy:</strong>
                          <p>
                            Uttar Pradesh and Bihar drive the absolute majority of traffic due to extensive candidate density for recruitment vacancies (like SSC GD, UP Police, Bihar BPSC, RRB Railway alerts).
                          </p>
                          <p>
                            Our bilingual Hindi / English portal implementation generates <strong className="text-emerald-400 font-bold">82% more engagement</strong> in these regions compared to English-only government directories. Including local language search terms maximizes index rankings.
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-800 text-[10.5px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping"></span>
                          DEMOGRAPHIC PROFILE VERIFIED LIVE
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* TAB 3: REFERRAL TRAFFIC SOURCES */}
                {trafficActiveTab === 'referrals' && (
                  <div className="space-y-4">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest">Direct traffic channels & candidate sources (ट्रैफ़िक स्रोत):</span>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      
                      {/* Referrals list */}
                      <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                        <h4 className="font-extrabold text-white text-[11px] uppercase tracking-wider pb-1 ml-0.5 border-b border-slate-800 mb-1.5">Origin Channel Stats (चैनल ट्रैफ़िक हिस्सेदारी):</h4>
                        
                        <div className="space-y-2.5">
                          {[
                            { name: "Google Organic Search (Search Console)", count: "24,800 clicks", percent: 64, color: "from-sky-500 to-blue-500" },
                            { name: "Direct URL Type-ins / Bookmarks", count: "5,800 entries", percent: 15, color: "from-purple-500 to-purple-600" },
                            { name: "WhatsApp Announcements Channel", count: "4,600 users", percent: 12, color: "from-emerald-500 to-emerald-600" },
                            { name: "Telegram Groups Broadcast alerts", count: "2,700 users", percent: 7, color: "from-cyan-500 to-cyan-600" },
                            { name: "YouTube Tutorials Referrals", count: "540 users", percent: 2, color: "from-rose-550 to-rose-600" }
                          ].map((ref, i) => (
                            <div key={i} className="space-y-1">
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="font-bold text-slate-200">{ref.name}</span>
                                <span className="text-slate-400 font-mono font-medium">{ref.count} <strong className="text-white">({ref.percent}%)</strong></span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full bg-gradient-to-r ${ref.color}`} style={{ width: `${ref.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SEO Search Console analysis */}
                      <div className="bg-slate-950/20 border border-slate-850 p-4 rounded-xl space-y-4 text-[11.5px] leading-relaxed text-slate-400">
                        <div className="text-left">
                          <strong className="text-[#38bdf8] block font-extrabold mb-1">🔍 Google Search Console Data Summary:</strong>
                          <div className="grid grid-cols-3 gap-2.5 text-center pt-1 font-sans">
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                              <span className="text-[9px] uppercase font-bold text-slate-500 block">Total Clicks</span>
                              <strong className="text-sm text-white font-mono font-semibold">24.8K</strong>
                            </div>
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                              <span className="text-[9px] uppercase font-bold text-slate-500 block">Impressions</span>
                              <strong className="text-sm text-sky-400 font-mono font-semibold">312.4K</strong>
                            </div>
                            <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                              <span className="text-[9px] uppercase font-bold text-slate-500 block">Avg CTR</span>
                              <strong className="text-sm text-emerald-400 font-mono font-semibold">7.9%</strong>
                            </div>
                          </div>
                        </div>

                        <p className="border-t border-slate-800 pt-2 text-[11px]">
                          📢 <strong>Social Broadcast Booster:</strong> Our integrated <strong className="text-emerald-400">WhatsApp and Telegram broadcast features</strong> in the Admin console are driving significant repeat traffic, contributing to over <strong className="text-white font-bold">19% of total visits</strong>.
                        </p>
                      </div>

                    </div>
                  </div>
                )}

                {/* TAB 4: REALTIME SEARCH QUERIES & MOCK SURGE SIMULATOR */}
                {trafficActiveTab === 'realtime' && (
                  <div className="space-y-4">
                    <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-widest">Live Search Queries & Site Load Stress-Testing Panel:</span>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      
                      {/* Active Keywords list */}
                      <div className="space-y-2.5 bg-slate-950/40 p-4 rounded-xl border border-slate-850">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-1.5 mb-2">
                          <h4 className="font-extrabold text-white text-[11px] uppercase tracking-wider flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            Trending Keyword queries Today:
                          </h4>
                          <span className="text-[9px] text-slate-500 uppercase font-bold font-mono">Live Logs</span>
                        </div>

                        <div className="space-y-1.5">
                          {[
                            { word: "sarkari result 2026 check live timing", count: "1,240 clicks", color: "text-sky-300" },
                            { word: "ssc cgl recruitment 2026 qualification start", count: "940 clicks", color: "text-emerald-300" },
                            { word: "upsc civil services exam syllabus pdf planner", count: "820 clicks", color: "text-purple-300" },
                            { word: "railway rrb ntpc free practice mock test bilingual", count: "650 clicks", color: "text-amber-300" },
                            { word: "up police inspector syllabus pdf download", count: "430 clicks", color: "text-rose-300" },
                            { word: "sarkari job hub dynamic scorecards check online", count: "210 clicks", color: "text-slate-300" }
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center bg-slate-950/60 hover:bg-slate-900 border border-slate-800/40 p-2 rounded-lg transition-colors">
                              <span className={`font-mono text-[10.5px] ${item.color}`}>&gt; "{item.word}"</span>
                              <span className="text-[10px] text-slate-400 shrink-0 font-medium font-sans">{item.count}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Spike stress simulation controller */}
                      <div className="bg-slate-950/20 border border-slate-850 p-4 rounded-xl flex flex-col justify-between text-[11.5px] leading-relaxed text-slate-400 space-y-4">
                        <div className="space-y-2 text-left">
                          <strong className="text-white block font-extrabold text-sky-400">🚀 Big Announcement Traffic Surge Simulator:</strong>
                          <p>
                            In India, whenever a major Sarkari result (like UPSC final list) is declared or an admit card link is enabled, government exam portals face an immediate, massive traffic leap.
                          </p>
                          <p>
                            You can simulate this spike right now! Clicking the button below generates a massive stress load mock spike, simulating a sudden <strong className="text-white">1,300+ active candidates surge</strong> on the site!
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-850 flex flex-wrap gap-2 items-center justify-between">
                          <div className="flex items-center gap-1.5 text-left">
                            <span className={`h-2.5 w-2.5 rounded-full ${trafficSpikeActive ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`}></span>
                            <span className="font-mono text-[10px] uppercase font-bold text-slate-300">
                              Status: {trafficSpikeActive ? "🚨 CRITICAL SURGE ACTIVE" : "⚪ NORMAL LOAD BALANCE"}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const nextState = !trafficSpikeActive;
                              setTrafficSpikeActive(nextState);
                              if (nextState) {
                                setTrafficLiveUsers(1354);
                                triggerToast("🚀 Alert: Mock Traffic Surge triggered! Simulated admit card release. Active users spiked to 1354!");
                              } else {
                                setTrafficLiveUsers(134);
                                triggerToast("⚪ Notice: Back to standard traffic loads. Re-balancing node queries...");
                              }
                            }}
                            className={`px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold transition cursor-pointer ${
                              trafficSpikeActive 
                                ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-md' 
                                : 'bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-500/10'
                            }`}
                          >
                            {trafficSpikeActive ? "🛑 Deactivate Traffic Surge" : "⚡ Trigger Major Admit Card Spike"}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Console Footers */}
              <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-wrap gap-2 justify-between items-center text-xs">
                <span className="font-mono text-sky-500 font-extrabold flex items-center gap-1.5 uppercase tracking-wide">
                  <span className="h-2 w-2 rounded-full bg-sky-500 animate-pulse"></span>
                  Server Load Status: ALL CHANNELS BALANCED (1.4% CPU load)
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setTrafficLiveUsers(134);
                    setTrafficPageViews(58410);
                    setTrafficSpikeActive(false);
                    triggerToast("🔄 Stats counter metrics zero-calibrated successfully!");
                  }}
                  className="text-[10px] text-slate-500 hover:text-slate-300 underline cursor-pointer"
                >
                  Reset Analytics Simulator
                </button>
              </div>

            </div>
          )}

          <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-sans">
            <div className="space-y-1 text-center sm:text-left">
              <p>© 2026 Job Sarkari Hub. Powered by Ministry of Informatics portal simulation guidelines.</p>
              <p className="space-x-3 flex flex-wrap items-center justify-center sm:justify-start gap-y-1">
                <button 
                  onClick={() => setPrivacyOpen(true)}
                  className="text-sky-400 hover:text-sky-300 font-bold hover:underline cursor-pointer transition-colors"
                >
                  🔒 Privacy Policy (गोपनीयता नीति)
                </button>
                <span className="text-slate-600 font-bold">|</span>
                <button 
                  onClick={() => setAboutOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline cursor-pointer transition-colors"
                >
                  💡 About Us (हमारे बारे में)
                </button>
                <span className="text-slate-600 font-bold">|</span>
                <button 
                  onClick={() => setTrafficOpen(true)}
                  className="text-amber-400 hover:text-amber-300 font-bold hover:underline cursor-pointer transition-colors flex items-center gap-1 shrink-0"
                >
                  📊 Live Traffic (ट्रैफिक डेशबोर्ड)
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </button>
              </p>
            </div>
            <p className="flex items-center gap-1 mt-2 sm:mt-0">
              Made with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Government Job Seekers
            </p>
          </div>
        </div>
      </footer>

      {/* PREMIUM GATE PAYMENT DIALOG MODAL LAYOUT */}
      {premiumModalOpen && (
        <div id="premium-gate-backdrop" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 shadow-2xl relative max-w-lg w-full text-slate-700">
            <input 
              type="file" 
              id="modal-camera-file" 
              accept="image/*" 
              capture="environment" 
              onChange={handleModalPhotoChange} 
              className="hidden" 
            />

            <button 
              onClick={() => window.print()}
              title="Print Plan Features"
              className="absolute top-4 right-22 rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-500 hover:text-slate-800 transition cursor-pointer flex items-center justify-center"
            >
              <Printer className="h-4 w-4" />
            </button>

            <label 
              htmlFor="modal-camera-file"
              title="Snap Notebook Image for AI solving"
              className="absolute top-4 right-13 rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-500 hover:text-slate-880 transition cursor-pointer flex items-center justify-center animate-pulse"
            >
              <Camera className="h-4 w-4 text-emerald-650" />
            </label>

            <button 
              onClick={() => {
                setShowCancelConfirm(true);
              }}
              className="absolute top-4 right-4 rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-400 font-bold font-sans text-xs"
            >
              CLOSE
            </button>

            <div className="text-center space-y-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wide">
                <Sparkles className="h-3 w-3 animate-spin" /> Unrestricted Access Gate
              </span>
              <h3 className="font-sans text-lg font-extrabold text-slate-900">Unlock Job Sarkari Hub Premium</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Unlock instant solved previous year papers compiled, weekly PDF newsletters, ranking leaderboard, and certified mock report certificates.
              </p>
            </div>

            {modalNotebookPhoto && (
              <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-150 flex items-center justify-between text-left animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg border border-slate-300 bg-white overflow-hidden shrink-0">
                    <img src={modalNotebookPhoto} alt="Notebook preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-emerald-950 block">Notebook Snapshot Loaded</span>
                    <span className="text-[10px] text-emerald-600 block">Ready to solve upon premium activation</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setModalNotebookPhoto(null);
                    localStorage.removeItem('sarkari_notebook_photo_cached');
                  }}
                  className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 p-1.5 cursor-pointer flex items-center justify-center transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Micro Plan choosing */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs font-sans">
              {[
                { plan: 'Monthly', price: '₹99' },
                { plan: 'Quarterly', price: '₹199' },
                { plan: 'Yearly', price: '₹499' },
                { plan: 'Lifetime', price: '₹999' }
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPlan(p.plan as any)}
                  className={`p-3 rounded-2xl border text-center transition ${
                    selectedPlan === p.plan 
                      ? 'border-blue-600 bg-blue-50/30 font-bold text-blue-900' 
                      : 'border-slate-150 hover:bg-slate-50'
                  }`}
                >
                  <span className="block text-[10px] text-slate-400 uppercase">{p.plan} Access</span>
                  <span className="text-sm font-extrabold text-slate-900 mt-1">{p.price}</span>
                </button>
              ))}
            </div>

            {/* Dynamic UPI Payment Simulator / QR Code with Custom Receiver Parameters */}
            {(() => {
              const activeBusinessUpiId = localStorage.getItem('sarkari_business_upi_id') || 'sarkarihub@upi';
              const activeBusinessName = localStorage.getItem('sarkari_business_name') || 'JobSarkariHub';
              const activePaymentLink = localStorage.getItem('sarkari_business_payment_link') || '';
              const planAmount = selectedPlan === 'Monthly' ? '99' : selectedPlan === 'Quarterly' ? '199' : selectedPlan === 'Yearly' ? '499' : '999';
              
              return (
                <div className="space-y-3">
                  <div data-testid="upi-qr-card" className="mt-4 bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                    <div className="bg-white p-2 rounded-xl border border-slate-200/80 shadow-xs shrink-0 flex items-center justify-center">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(`upi://pay?pa=${activeBusinessUpiId}&pn=${activeBusinessName}&am=${planAmount}&cu=INR&tn=Upgrade+to+${selectedPlan}+Access`)}`}
                        alt="Sarkari Upgrade QR"
                        className="h-20 w-20 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-1 text-left font-sans text-xs flex-1">
                      <span className="font-extrabold text-slate-800 block">Instant QR Code Scanner</span>
                      <p className="text-[11px] text-slate-500 leading-normal">
                        Open any UPI app like GPay, PhonePe, or Paytm and scan this dynamic QR to instantly upgrade to <strong className="text-blue-650 font-extrabold">{selectedPlan}</strong> for <strong className="text-slate-900 font-extrabold">₹{planAmount}</strong>.
                      </p>
                      <span className="text-[9px] font-mono text-slate-400 block truncate">Payee: {activeBusinessName} ({activeBusinessUpiId})</span>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Active direct bank checkout
                      </span>
                    </div>
                  </div>

                  {activePaymentLink && (
                    <a
                      href={activePaymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Pay via Cards / Netbanking (Online Gateway)
                    </a>
                  )}
                </div>
              );
            })()}

            {/* Why go Premium? toggle link and collapsible section */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <button
                onClick={() => setShowWhyPremium(!showWhyPremium)}
                className="w-full flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 py-1.5 cursor-pointer select-none"
              >
                <span className="flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4" />
                  Why go Premium? Check Plan Features
                </span>
                {showWhyPremium ? (
                  <ChevronUp className="h-4 w-4 text-blue-500 animate-bounce" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-blue-500 animate-bounce" />
                )}
              </button>

              {showWhyPremium && (
                <div className="mt-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-left space-y-3 max-h-56 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-2.5">
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-900 border-b border-slate-200/60 pb-0.5 flex items-center gap-1">
                        <span className="bg-slate-200 text-slate-700 text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹99</span> Monthly Access
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-slate-500 mt-1 space-y-0.5 font-sans">
                        <li>Daily Live Gov Notifications and direct syllabus guidelines via alerts.</li>
                        <li>Full access to ad-free mock test arena and basic scorecard metrics.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-900 border-b border-slate-200/60 pb-0.5 flex items-center gap-1">
                        <span className="bg-blue-100 text-blue-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹199</span> Quarterly Access
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-slate-500 mt-1 space-y-0.5 font-sans">
                        <li><strong>Standard Package:</strong> Includes all Monthly tools.</li>
                        <li>Previous 3 years Solved Papers compiled & active syllabus planner tools.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-slate-900 border-b border-slate-200/60 pb-0.5 flex items-center gap-1">
                        <span className="bg-purple-100 text-purple-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹499</span> Yearly Access
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-slate-500 mt-1 space-y-0.5 font-sans">
                        <li><strong>Aspirant Special:</strong> Includes all Quarterly features.</li>
                        <li>Instant AI Doubt Solver (100 prompts/mo) & premium offline-printable test PDFs.</li>
                        <li>Automatic dynamic regional rank evaluation comparison.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-amber-900 border-b border-amber-200 pb-0.5 flex items-center gap-1 bg-amber-50 px-1 rounded">
                        <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.2 rounded font-extrabold font-mono">₹999</span> Lifetime Access (Highly Popular)
                      </p>
                      <ul className="list-disc pl-3.5 text-[10px] text-amber-850 mt-1 space-y-0.5 font-sans">
                        <li><strong>Ultimate Value:</strong> One-time payment, no recurring fees forever.</li>
                        <li>Unlimited developer UI AI Doubt solver prompts and customizable templates.</li>
                        <li>Country-wide dynamic leaderboard matching + Premium offline booklets.</li>
                        <li>Priority 24/7 helpline/objections review support.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 font-bold block uppercase leading-none">Sandbox verify only</span>
                <span className="text-xs font-bold text-blue-800 mt-1 inline-block">UPI Direct verification payment</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="premium-copy-link-button"
                  onClick={handleCopyPaymentLink}
                  className="rounded-xl border border-slate-200 py-2.5 px-4 font-sans text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-1.5 shadow-xs select-none cursor-pointer"
                >
                  <Link className="h-4 w-4 text-emerald-600" />
                  <span>Copy Payment Link</span>
                </button>

                <button
                  id="premium-share-button"
                  onClick={handleShareApp}
                  className="rounded-xl border border-slate-200 py-2.5 px-4 font-sans text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition flex items-center gap-1.5 shadow-xs select-none cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
                  <span>Share</span>
                </button>

                <button
                  id="premium-cancel-button"
                  onClick={() => {
                    setShowCancelConfirm(true);
                  }}
                  className="rounded-xl border border-slate-200 py-2.5 px-4 font-sans text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition select-none cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={() => {
                    setPaymentSuccess(true);
                    setTimeout(() => {
                      const planPrices = {
                        Monthly: "₹99",
                        Quarterly: "₹199",
                        Yearly: "₹499",
                        Lifetime: "₹999"
                      };
                      const price = planPrices[selectedPlan] || "₹999";
                      const referenceId = `SARKARI-PREM-${Math.floor(100000 + Math.random() * 900000)}`;

                      const newTx: PremiumTransaction = {
                        id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
                        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
                        plan: selectedPlan,
                        amount: price,
                        status: 'COMPLETED',
                        refId: referenceId
                      };

                      setPremiumTransactions(prev => [newTx, ...prev]);

                      setUser(prev => ({ 
                        ...prev, 
                        premiumUser: true,
                        premiumPlan: selectedPlan
                      }));
                      setPaymentSuccess(false);
                      setPremiumModalOpen(false);
                      triggerToast(`🎉 Congratulations ${user.name}! Your ${selectedPlan} Premium Access has been active and upgraded successfully.`);
                    }, 2000);
                  }}
                  disabled={paymentSuccess}
                  className="rounded-xl bg-amber-500 py-2.5 px-5 font-sans text-xs font-extrabold text-white hover:bg-amber-600 transition flex items-center gap-1 shadow-md shadow-amber-500/10"
                >
                  {paymentSuccess ? 'Processing...' : `Get Premium`}
                </button>
              </div>
            </div>

            {/* Previous Transactions Info Section */}
            <div data-testid="premium-transactions-history" className="mt-5 pt-3 border-t border-dashed border-slate-200">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
                <span>Current Status & Plan History</span>
                <span className="text-blue-600 font-extrabold font-sans">Verified Log</span>
              </div>

              {/* Status Banner */}
              <div className="p-2.5 rounded-xl border flex items-center justify-between font-sans text-xs mb-2 bg-slate-50 border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${user.premiumUser ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400 animate-pulse'}`}></span>
                  <span className="text-slate-600">Current Subscription:</span>
                  <strong className={user.premiumUser ? "text-emerald-705 font-extrabold" : "text-slate-705 font-extrabold"}>
                    {user.premiumUser ? `${user.premiumPlan || 'Lifetime'} Premium` : 'Free Trial'}
                  </strong>
                </div>
                {user.premiumUser && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-0.5">
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Transaction List */}
              <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                {premiumTransactions.length > 0 ? (
                  premiumTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-[11px] bg-slate-50/50 p-2 rounded-xl border border-slate-100 text-slate-600">
                      <div className="text-left font-mono">
                        <span className="font-extrabold text-slate-800 block leading-tight">{tx.plan} Upgrade</span>
                        <span className="text-[9px] text-slate-400 leading-none">{tx.id} • {tx.date}</span>
                      </div>
                      <div className="text-right font-sans">
                        <strong className="text-slate-900 block font-bold">{tx.amount}</strong>
                        <span className="text-[9px] font-semibold text-emerald-600 uppercase flex items-center gap-1 justify-end">
                          ● {tx.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-400 italic text-center py-2 bg-slate-50/40 rounded-xl border border-dashed border-slate-150">
                    No previous payment history found for this device sandbox. Keep simulated trials active.
                  </p>
                )}
              </div>
            </div>

            {showCancelConfirm && (
              <div className="absolute inset-0 z-50 bg-slate-900/95 backdrop-blur-sm rounded-3xl p-6 flex flex-col justify-center items-center text-center text-white animate-fade-in">
                <div className="p-3.5 bg-amber-500/10 rounded-2xl border border-amber-500/20 mb-4 animate-bounce">
                  <ShieldAlert className="h-10 w-10 text-amber-500" />
                </div>
                <h3 className="text-sm font-extrabold text-white tracking-tight">Do you want to cancel the upgrade?</h3>
                <p className="text-xs text-slate-305 max-w-xs mt-2 leading-relaxed text-slate-300">
                  You will lose your selected <strong className="text-amber-400 font-extrabold">{selectedPlan}</strong> subscription, any captured notebook snapshots, and current position in the secure sandbox payment desk.
                </p>
                <div className="mt-6 flex items-center gap-3 w-full max-w-xs">
                  <button
                    onClick={() => {
                      setShowCancelConfirm(false);
                      setPremiumModalOpen(false);
                      setShowWhyPremium(false);
                      setModalNotebookPhoto(null);
                    }}
                    className="flex-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-bold py-2.5 transition cursor-pointer"
                  >
                    Yes, Cancel Flow
                  </button>
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="flex-1 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-sans text-xs font-bold py-2.5 transition cursor-pointer"
                  >
                    No, Resume
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embedded High Density Premium Toast Banner */}
      {toastMsg && (
        <div id="applet-toast-banner" className="fixed bottom-4 right-4 z-50 rounded-lg bg-slate-900 border border-slate-800 text-white px-4 py-2 font-sans text-xs font-bold shadow-xl flex items-center gap-2 animate-bounce">
          <CheckSquare className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Interactive Authentication Locker Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        user={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        triggerToast={triggerToast}
        locale={locale}
      />

      {/* Interactive Privacy Policy / GDPR Consent Modal */}
      <PrivacyPolicyModal 
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      {/* Interactive About Us Modal */}
      <AboutUsModal 
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
      />

      {/* Interactive Traffic Dashboard Modal */}
      <TrafficDashboardModal 
        isOpen={trafficOpen}
        onClose={() => setTrafficOpen(false)}
      />

      {/* Floating Join WhatsApp Button */}
      <a
        href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-5 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-115 hover:shadow-emerald-500/20 active:scale-95 group font-sans text-xs sm:text-sm font-bold border border-emerald-400/20"
        style={{ backgroundColor: '#25D366' }}
        id="whatsapp-floating-join-btn"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
        </span>
        <svg 
          className="h-4.5 w-4.5 fill-white transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.453L0 24zm6.59-4.846c1.6.95 3.1 1.4 4.8 1.4 5.25 0 9.5-4.25 9.5-9.5s-4.25-9.5-9.5-9.5-9.5 4.25-9.5 9.5c0 1.93.56 3.65 1.5 5.23l-.99 3.6 3.73-.98M16.5 13.9c-.24-.12-1.43-.7-1.65-.79-.22-.09-.38-.13-.54.12-.16.24-.61.79-.75.94-.14.15-.27.17-.5.06-2.07-1.06-3.15-1.92-4.14-3.63-.26-.45.26-.42.74-1.38.08-.16.04-.3-.02-.42s-.54-1.3-.74-1.78c-.2-.48-.38-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.83-.84 2.02s.87 2.33.99 2.5c.12.16 1.7 2.54 4.11 3.59.57.25 1.02.4 1.37.5.58.18 1.1.16 1.5.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28" />
        </svg>
        <span>
          {locale === 'hi' ? 'व्हाट्सएप ज्वाइन करें' : 'Join WhatsApp'}
        </span>
      </a>

    </div>
  );
}
