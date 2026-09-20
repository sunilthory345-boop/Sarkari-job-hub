export interface GovJob {
  id: string;
  title: string;
  org: string;
  category: 'SSC' | 'UPSC' | 'Railway' | 'Bank' | 'Police' | 'Teaching' | 'Defence' | 'State PSC' | 'Others';
  qualification: '8th Pass' | '10th Pass' | '12th Pass' | 'ITI' | 'Diploma' | 'Graduate' | 'B.Tech' | 'B.Sc' | 'MBA' | 'M.Tech' | 'Post Graduate';
  ageLimit: string;
  salary: string;
  fees: {
    General: string;
    OBC: string;
    SC_ST_Female: string;
  };
  totalPosts: number;
  applyUrl: string;
  pdfUrl: string;
  officialWebsite: string;
  postedDate: string;
  lastDate: string;
  importantDates: {
    applyStart: string;
    applyEnd: string;
    examDate: string;
    admitCardRelease: string;
  };
  selectionProcess: string[];
  location: string;
  description: string;
  isWhatsAppAlert?: boolean;
  whatsAppUrl?: string;
  formStatus?: 'started' | 'extended' | 'upcoming';
}

export interface AdmitCard {
  id: string;
  title: string;
  org: string;
  examDate: string;
  examCity: string;
  downloadUrl: string;
  officialLink: string;
  addedDate: string;
}

export interface JobResult {
  id: string;
  title: string;
  org: string;
  meritListUrl: string;
  scoreCardUrl: string;
  cutOff?: {
    UR?: string;
    OBC?: string;
    SC?: string;
    ST?: string;
    [key: string]: string | undefined;
  };
  downloadUrl: string;
  releaseDate: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  date?: string;
}

export interface MockTest {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  questions: Question[];
  totalMarks: number;
  negativeMark: number; // e.g. 0.25 or 0.33
}

export interface CurrentAffair {
  id: string;
  title: string;
  date: string;
  content: string;
  category: 'National' | 'International' | 'Sports' | 'Economy' | 'Science & Tech' | 'Awards' | 'Schemes' | 'Environment';
  pdfUrl: string;
}

export interface Blog {
  id: string;
  title: string;
  category: 'Exam Tips' | 'Government Jobs' | 'Career Guidance' | 'Preparation Strategy' | 'Interview Tips';
  author: string;
  summary: string;
  content: string;
  readTime: string;
  date: string;
}

export interface UserProfile {
  name: string;
  email: string;
  qualification: string;
  savedJobs: string[]; // Job IDs
  savedPDFs: string[]; // PDF titles/links
  premiumUser: boolean;
  premiumPlan?: 'Monthly' | 'Quarterly' | 'Yearly' | 'Lifetime';
  registrationDate?: string;
  testHistory: {
    id: string;
    testTitle: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeTaken: string;
    date: string;
  }[];
}

export interface AnswerKey {
  id: string;
  title: string;
  org: string;
  released: string;
  objectionsLimit: string;
  pdfUrl?: string;
  dates?: string[];
  shifts?: string[];
  questionsList?: {
    [dateShiftKey: string]: {
      qNo: number;
      question: string;
      correctOption: string;
      status?: string;
    }[];
  };
}

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Admit Card Download' | 'Mock Test & Scorecard' | 'Premium Access' | 'Vacancy Syllabus' | 'Other Inquiry';
  message: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED';
  createdDate: string;
  adminReply?: string;
  repliedDate?: string;
}

export interface Newspaper {
  id: string;
  title: string;
  date: string;
  pdfUrl: string;
  downloadCount: number;
  language: 'Hindi' | 'English' | 'Bilingual';
  category: 'National' | 'Employment' | 'Editorial' | 'Local';
  size?: string;
}

export interface SscLiveNotice {
  id: string;
  category: 'vacancy' | 'admit-card' | 'result' | 'answer-key';
  title: string;
  titleHi: string;
  org: string;
  publishedDate: string;
  officialUrl: string;
  pdfUrl?: string;
  isNew?: boolean;
  statusBadge: string;
  details: {
    posts?: number;
    examDate?: string;
    lastDate?: string;
    cutoff?: string;
    shiftOrTier?: string;
    summary?: string;
    qualification?: string;
    salary?: string;
  };
  jobData?: GovJob;
  admitCardData?: AdmitCard;
  resultData?: JobResult;
  answerKeyData?: AnswerKey;
}

export interface SscSyncStatus {
  online: boolean;
  portal: string;
  status: string;
  lastChecked: string;
  latencyMs: number;
  autoSyncIntervalSec: number;
  totalLiveNotices: number;
  newNoticesCount: number;
}

export interface UpscLiveNotice {
  id: string;
  category: 'vacancy' | 'admit-card' | 'result' | 'answer-key';
  title: string;
  titleHi: string;
  org: string;
  publishedDate: string;
  officialUrl: string;
  pdfUrl?: string;
  isNew?: boolean;
  statusBadge: string;
  details: {
    posts?: number;
    examDate?: string;
    lastDate?: string;
    cutoff?: string;
    stage?: string;
    summary?: string;
    qualification?: string;
    salary?: string;
  };
  jobData?: GovJob;
  admitCardData?: AdmitCard;
  resultData?: JobResult;
  answerKeyData?: AnswerKey;
}

export interface UpscSyncStatus {
  online: boolean;
  portal: string;
  status: string;
  lastChecked: string;
  latencyMs: number;
  autoSyncIntervalSec: number;
  totalLiveNotices: number;
  newNoticesCount: number;
}

export interface RrbLiveNotice {
  id: string;
  category: 'vacancy' | 'admit-card' | 'result' | 'answer-key';
  title: string;
  titleHi: string;
  org: string;
  cenNumber?: string; // e.g. CEN 01/2026, CEN 05/2026
  publishedDate: string;
  officialUrl: string;
  pdfUrl?: string;
  isNew?: boolean;
  statusBadge: string;
  details: {
    posts?: number;
    examDate?: string;
    lastDate?: string;
    cutoff?: string;
    stage?: string;
    summary?: string;
    qualification?: string;
    salary?: string;
    cityIntimationDate?: string;
  };
  jobData?: GovJob;
  admitCardData?: AdmitCard;
  resultData?: JobResult;
  answerKeyData?: AnswerKey;
}

export interface RrbSyncStatus {
  online: boolean;
  portal: string;
  status: string;
  lastChecked: string;
  latencyMs: number;
  autoSyncIntervalSec: number;
  totalLiveNotices: number;
  newNoticesCount: number;
}

export interface IbpsLiveNotice {
  id: string;
  category: 'vacancy' | 'admit-card' | 'result' | 'answer-key';
  title: string;
  titleHi: string;
  org: string;
  crpCode?: string; // e.g. CRP PO/MT-XVI, CRP CLERK-XVI, CRP RRBs-XV, CRP SPL-XVI
  cadre?: 'PO' | 'Clerk' | 'SO' | 'RRB' | 'Specialist';
  publishedDate: string;
  officialUrl: string;
  pdfUrl?: string;
  isNew?: boolean;
  statusBadge: string;
  details: {
    posts?: number;
    examDate?: string;
    lastDate?: string;
    cutoff?: string;
    stage?: string; // Prelims / Mains / Interview / Final Allotment
    summary?: string;
    qualification?: string;
    salary?: string;
    participatingBanks?: string[];
  };
  jobData?: GovJob;
  admitCardData?: AdmitCard;
  resultData?: JobResult;
  answerKeyData?: AnswerKey;
}

export interface IbpsSyncStatus {
  online: boolean;
  portal: string;
  status: string;
  lastChecked: string;
  latencyMs: number;
  autoSyncIntervalSec: number;
  totalLiveNotices: number;
  newNoticesCount: number;
}

export interface SbiLiveNotice {
  id: string;
  category: 'vacancy' | 'admit-card' | 'result' | 'answer-key';
  title: string;
  titleHi: string;
  org: string;
  advtNo?: string; // e.g. CRPD/PO/2026-27/01, CRPD/CR/2026-27/02, CRPD/CBO/2026-27/03
  cadre?: 'PO' | 'Clerk' | 'CBO' | 'SCO' | 'Apprentice';
  publishedDate: string;
  officialUrl: string;
  pdfUrl?: string;
  isNew?: boolean;
  statusBadge: string;
  details: {
    posts?: number;
    examDate?: string;
    lastDate?: string;
    cutoff?: string;
    stage?: string; // Prelims / Mains / Interview / Final Merit List
    summary?: string;
    qualification?: string;
    salary?: string;
    circles?: string[];
  };
  jobData?: GovJob;
  admitCardData?: AdmitCard;
  resultData?: JobResult;
  answerKeyData?: AnswerKey;
}

export interface SbiSyncStatus {
  online: boolean;
  portal: string;
  status: string;
  lastChecked: string;
  latencyMs: number;
  autoSyncIntervalSec: number;
  totalLiveNotices: number;
  newNoticesCount: number;
}
