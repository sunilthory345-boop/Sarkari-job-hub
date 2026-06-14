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
  cutOff: {
    UR: string;
    OBC: string;
    SC: string;
    ST: string;
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
  category: 'National' | 'International' | 'Sports' | 'Economy' | 'Science & Tech' | 'Awards';
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
}

