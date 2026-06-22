import { GovJob, AdmitCard, JobResult, MockTest, CurrentAffair, Blog, AnswerKey } from '../types';
import { getSSCCGL100Questions } from '../utils/cglMockGenerator';
import { generateAllExtendedMocks } from '../utils/examMockGenerator';

export const INITIAL_JOBS: GovJob[] = [
  {
    id: 'aai-junior-executive-recruitment-2026',
    title: 'AAI Junior Executive (Air Traffic Control & Information Tech) Recruitment 2026',
    org: 'Airport Authority of India (AAI)',
    category: 'Others',
    qualification: 'Graduate',
    ageLimit: '18 - 27 Years',
    salary: '₹40,000 — ₹1,40,000 / Month',
    fees: {
      General: '₹1000',
      OBC: '₹1000',
      SC_ST_Female: 'Nil'
    },
    totalPosts: 996,
    applyUrl: 'https://aai.aero',
    pdfUrl: 'https://aai.aero',
    officialWebsite: 'https://aai.aero',
    postedDate: '2026-06-21',
    lastDate: '2026-07-25',
    importantDates: {
      applyStart: '2026-06-22',
      applyEnd: '2026-07-25',
      examDate: 'August 2026',
      admitCardRelease: 'To be notified'
    },
    selectionProcess: [
      'Online Written Test (CBT - no negative marking)',
      'Voice Test & Application Verification',
      'Psychoactive Substances Testing & Medical check'
    ],
    location: 'All India',
    description: '✈️ AIRPORT AUTHORITY OF INDIA (AAI) JUNIOR EXECUTIVE 2026. Recruitment announced for 996 Junior Executive post in Air Traffic Control (ATC) and Information Technology branches. Qualification: Graduate (B.Sc with Physics/Maths or B.E/B.Tech). Apply online immediately!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'india-post-gds-recruitment-2026',
    title: 'India Post Gramin Dak Sevak (GDS) Recruitment 2026',
    org: 'Department of Posts, India',
    category: 'Others',
    qualification: '10th Pass',
    ageLimit: '18 - 40 Years',
    salary: '₹12,000 — ₹29,380 / Month',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: 'Nil'
    },
    totalPosts: 40220,
    applyUrl: 'https://indiapostgdsonline.gov.in',
    pdfUrl: 'https://indiapostgdsonline.gov.in',
    officialWebsite: 'https://indiapostgdsonline.gov.in',
    postedDate: '2026-06-17',
    lastDate: '2026-07-17',
    importantDates: {
      applyStart: '2026-06-17',
      applyEnd: '2026-07-17',
      examDate: 'No Exam (Merit List Based)',
      admitCardRelease: 'N/A'
    },
    selectionProcess: [
      'Shortlisting based on Class 10th Marks',
      'Document Verification',
      'Direct Circle Joining / Appointment'
    ],
    location: 'All India',
    description: '📬 INDIA POST GDS RECRUITMENT 2026. India Post has announced a massive 40,220 vacancies for Gramin Dak Sevak (GDS), Branch Postmaster (BPM), and Assistant Branch Postmaster (ABPM) posts across all circles. No examination is conducted; selection is purely based on the Class 10th merit list score. Apply online today!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'idbi-bank-executive-recruitment-2026',
    title: 'IDBI Bank Executive (On Contract) Recruitment 2026',
    org: 'IDBI Bank',
    category: 'Bank',
    qualification: 'Graduate',
    ageLimit: '20 - 25 Years',
    salary: '₹29,000 — ₹31,000 / Month',
    fees: {
      General: '₹1000',
      OBC: '₹1000',
      SC_ST_Female: '₹200'
    },
    totalPosts: 1300,
    applyUrl: 'https://www.idbibank.in',
    pdfUrl: 'https://www.idbibank.in',
    officialWebsite: 'https://www.idbibank.in',
    postedDate: '2026-06-17',
    lastDate: '2026-07-08',
    importantDates: {
      applyStart: '2026-06-17',
      applyEnd: '2026-07-08',
      examDate: 'July 2026',
      admitCardRelease: 'July 2026'
    },
    selectionProcess: [
      'Online Written Test (CBT)',
      'Document Verification (DV)',
      'Pre-Recruitment Medical Examination'
    ],
    location: 'All India',
    description: '💼 IDBI BANK EXECUTIVE RECRUITMENT 2026. IDBI Bank has announced 1,300 contract Executive positions. Stipend starts at ₹29,000 in Year 1 to ₹31,000 in Year 2. Graduation degree required. Apply now!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'gsrtc-driver-conductor-recruitment-2026',
    title: 'GSRTC Driver & Conductor Recruitment 2026',
    org: 'Gujarat State Road Transport Corporation (GSRTC)',
    category: 'Others',
    qualification: '12th Pass',
    ageLimit: '18 - 34 Years',
    salary: '₹18,500 / Month',
    fees: {
      General: '₹250',
      OBC: '₹250',
      SC_ST_Female: '₹100'
    },
    totalPosts: 8917,
    applyUrl: 'https://gsrtc.in',
    pdfUrl: 'https://gsrtc.in',
    officialWebsite: 'https://gsrtc.in',
    postedDate: '2026-06-16',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-16',
      applyEnd: '2026-07-15',
      examDate: 'To be notified',
      admitCardRelease: 'To be notified'
    },
    selectionProcess: [
      'Written OMR Test / CBT',
      'Driving Skill Test (for Drivers)',
      'Document Verification',
      'Medical Examination'
    ],
    location: 'Gujarat',
    description: '🚌 GSRTC DRIVER/CONDUCTOR RECRUITMENT 2026. Gujarat State Road Transport Corporation has announced 8,917 vacancies for Driver and Conductor positions. Qualification: 10th / 12th Pass, Apply online!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'apmsrb-staff-nurse-recruitment-2026',
    title: 'APMSRB Staff Nurse Recruitment 2026',
    org: 'Andhra Pradesh Medical Services Recruitment Board (APMSRB)',
    category: 'Others',
    qualification: 'B.Sc',
    ageLimit: '18 - 42 Years',
    salary: '₹29,200 — ₹92,300 / Month',
    fees: {
      General: '₹500',
      OBC: '₹500',
      SC_ST_Female: '₹300'
    },
    totalPosts: 529,
    applyUrl: 'https://apmsrb.ap.gov.in',
    pdfUrl: 'https://apmsrb.ap.gov.in',
    officialWebsite: 'https://apmsrb.ap.gov.in',
    postedDate: '2026-06-16',
    lastDate: '2026-07-10',
    importantDates: {
      applyStart: '2026-06-16',
      applyEnd: '2026-07-10',
      examDate: 'To be notified',
      admitCardRelease: 'To be notified'
    },
    selectionProcess: [
      'Merit-Based Sorting (GNM/B.Sc score)',
      'Government Contract weightage marks',
      'Document Verification'
    ],
    location: 'Andhra Pradesh',
    description: '⚕️ APMSRB STAFF NURSE RECRUITMENT 2026. Andhra Pradesh Medical Services Recruitment Board (APMSRB) has announced 529 vacancies for Staff Nurse. Qualification: B.Sc Nursing / GNM, Apply today!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'nbems-group-abc-recruitment-2026',
    title: 'NBEMS Group A, B, & C Recruitment 2026',
    org: 'National Board of Examinations in Medical Sciences (NBEMS)',
    category: 'Others',
    qualification: 'Graduate',
    ageLimit: '18 - 35 Years',
    salary: '₹19,900 — ₹1,12,400 / Month (Based on Group Level)',
    fees: {
      General: '₹1500 (plus 18% GST)',
      OBC: '₹1500 (plus 18% GST)',
      SC_ST_Female: 'Nil'
    },
    totalPosts: 53,
    applyUrl: 'https://natboard.edu.in',
    pdfUrl: 'https://natboard.edu.in',
    officialWebsite: 'https://natboard.edu.in',
    postedDate: '2026-06-16',
    lastDate: '2026-07-16',
    importantDates: {
      applyStart: '2026-06-16',
      applyEnd: '2026-07-16',
      examDate: 'To be notified',
      admitCardRelease: 'To be notified'
    },
    selectionProcess: [
      'Computer Based Test (CBT)',
      'Skill Test & Descriptive Paper (where applicable)',
      'Document Verification'
    ],
    location: 'All India',
    description: '🏢 NBEMS GROUP A/B/C RECRUITMENT 2026. National Board of Examinations in Medical Sciences has announced 53 vacancies for Group A, B, and C positions (Junior Assistant, Senior Assistant, etc.). Qualification: Graduate, Apply online today!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'pspcl-assistant-lineman-recruitment-2026',
    title: 'PSPCL Assistant Lineman (ALM) Recruitment 2026',
    org: 'Punjab State Power Corporation Limited (PSPCL)',
    category: 'Others',
    qualification: 'ITI',
    ageLimit: '18 - 37 Years',
    salary: '₹19,900 / Month',
    fees: {
      General: '₹944 (including GST)',
      OBC: '₹944 (including GST)',
      SC_ST_Female: '₹590 (including GST)'
    },
    totalPosts: 6289,
    applyUrl: 'https://pspcl.in',
    pdfUrl: 'https://pspcl.in',
    officialWebsite: 'https://pspcl.in',
    postedDate: '2026-06-16',
    lastDate: '2026-07-09',
    importantDates: {
      applyStart: '2026-06-15',
      applyEnd: '2026-07-09',
      examDate: 'To be notified',
      admitCardRelease: 'To be notified'
    },
    selectionProcess: [
      'Online Written Test (CBT)',
      'Document Verification',
      'Pre-Appointment Medical Examination'
    ],
    location: 'Punjab',
    description: '⚡ PSPCL ASSISTANT LINEMAN 2026 🏢 Punjab State Power Corporation 👥 Posts: 6,289 Total (NAC Category: 3,289 Posts, ITI Category: 3,000 Posts) 💰 Salary: ₹19,900/month 📅 Last Date: 6-9 July 2026 🎓 Qualification: 10th + ITI. Eligible candidates apply online today!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'sbi-apprentice-recruitment-2026',
    title: 'State Bank of India (SBI) Apprentice Recruitment 2026',
    org: 'State Bank of India',
    category: 'Bank',
    qualification: 'Graduate',
    ageLimit: '20 - 28 Years',
    salary: '₹15,000 / Month (Stipend)',
    fees: {
      General: '₹300',
      OBC: '₹300',
      SC_ST_Female: 'Nil'
    },
    totalPosts: 7150,
    applyUrl: 'https://sbi.co.in/web/careers',
    pdfUrl: 'https://sbi.co.in/web/careers',
    officialWebsite: 'https://sbi.co.in',
    postedDate: '2026-06-15',
    lastDate: '2026-06-15',
    importantDates: {
      applyStart: '2026-06-01',
      applyEnd: '2026-06-15',
      examDate: 'June 2026',
      admitCardRelease: 'Released'
    },
    selectionProcess: [
      'Online Written Test',
      'Test of Local Language',
      'Medical Examination'
    ],
    location: 'All India',
    description: '🚨 SBI APPRENTICE 2026 — Apply Now! 🚨 State Bank of India has announced 7,150 vacancies for Apprentice posts. Stipend: ₹15,000/month, Qualification: Graduate. Last Date: 15 June 2026 (Apply immediately as today is the last date!).',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'rrb-technician-recruitment-2026',
    title: 'Railway RRB Technician (Grade I & III) Recruitment 2026',
    org: 'Railway Recruitment Board',
    category: 'Railway',
    qualification: 'ITI',
    ageLimit: '18 - 33 Years (Grade III), 18 - 36 Years (Grade I)',
    salary: '₹19,900 — ₹29,200 / Month',
    fees: {
      General: '₹500 (₹400 Refundable after CBT)',
      OBC: '₹500 (₹400 Refundable after CBT)',
      SC_ST_Female: '₹250 (Full ₹250 Refundable)'
    },
    totalPosts: 6565,
    applyUrl: 'https://www.rrbcdg.gov.in',
    pdfUrl: 'https://www.rrbcdg.gov.in',
    officialWebsite: 'https://www.rrbcdg.gov.in',
    postedDate: '2026-06-16',
    lastDate: '2026-07-20',
    importantDates: {
      applyStart: '2026-06-16',
      applyEnd: '2026-07-20',
      examDate: 'August/September 2026',
      admitCardRelease: 'To be notified'
    },
    selectionProcess: [
      'Computer Based Test (CBT)',
      'Document Verification (DV)',
      'Medical Examination'
    ],
    location: 'All India',
    description: '🚂 RRB TECHNICIAN RECRUITMENT 2026. Railway Recruitment Board has announced 6,565 vacancies for Grade I & III post. Qualification: ITI / Diploma, Apply online today!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'bob-apprentice-recruitment-2026',
    title: 'Bank of Baroda (BOB) Apprentice Recruitment 2026',
    org: 'Bank of Baroda',
    category: 'Bank',
    qualification: 'Graduate',
    ageLimit: '18 - 28 Years',
    salary: '₹15,000 / Month (Stipend)',
    fees: {
      General: '₹450',
      OBC: '₹450',
      SC_ST_Female: '₹100'
    },
    totalPosts: 5000,
    applyUrl: 'https://www.bankofbaroda.in/careers',
    pdfUrl: 'https://www.bankofbaroda.in/details-advertisement-apprentice-2026.pdf',
    officialWebsite: 'https://www.bankofbaroda.in',
    postedDate: '2026-06-15',
    lastDate: '2026-06-15',
    importantDates: {
      applyStart: '2026-06-01',
      applyEnd: '2026-06-15',
      examDate: 'June 2026',
      admitCardRelease: 'Released'
    },
    selectionProcess: [
      'Online Written Examination (MCQs)',
      'Local Language Proficiency Test',
      'Document Verification & Medical Check'
    ],
    location: 'All India',
    description: '🚨 BANK OF BARODA APPRENTICE 2026 🚨 Stipend: ₹15,000/month, Posts: 5000, Qualification: Graduate. Last Date: 15 June 2026 (Contact immediately as time is short/limited).',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'rrb-ntpc-recruitment-2026',
    title: 'Railway RRB NTPC Non-Technical Popular Categories (Graduate & Under Graduate) Recruitment 2026',
    org: 'Railway Recruitment Boards (RRB)',
    category: 'Railway',
    qualification: 'Graduate',
    ageLimit: '18 - 36 Years (Age relaxation applicable)',
    salary: 'Rs. 19,900 - Rs. 35,400 (Initial Pay Scale)',
    fees: {
      General: '₹500 (₹400 Refundable after CBT-1)',
      OBC: '₹500 (₹400 Refundable after CBT-1)',
      SC_ST_Female: '₹250 (Full ₹250 Refundable)'
    },
    totalPosts: 11558,
    applyUrl: 'https://www.rrbcdg.gov.in',
    pdfUrl: 'https://rrbcdg.gov.in/CEN_03_2026_NTPC_Official_Note.pdf',
    officialWebsite: 'https://www.rrbcdg.gov.in',
    postedDate: '2026-06-15',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-15',
      applyEnd: '2026-07-15',
      examDate: '2026-10-10',
      admitCardRelease: '2026-09-30'
    },
    selectionProcess: [
      'Computer Based Test Stage-I (CBT-1 Screening)',
      'Computer Based Test Stage-II (CBT-2 Merit scoring)',
      'Computer Based Aptitude Test (CBAT) or typing skills matches (where applicable)',
      'Zonal Medical Exam and Complete Document Matching Verification'
    ],
    location: 'All India Zonal Railways',
    description: 'Massive recruitment notification issued by Railway Recruitment Boards for Clerk, Typist, Station Master, Goods Manager, Ticket Clerk, Apprentice, etc. Online registration starts today!',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'ibps-rrb-xv-2026',
    title: 'IBPS CRP RRB XV Group A Officers (Scale I, II, III) & Group B Office Assistant Online Form 2026',
    org: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Bank',
    qualification: 'Graduate',
    ageLimit: '18 - 40 Years (Depending on post Scale)',
    salary: 'Rs. 25,000 - Rs. 75,000 (Based on pay-scale rules)',
    fees: {
      General: '₹850',
      OBC: '₹850',
      SC_ST_Female: '₹175 (Reserved Categories)'
    },
    totalPosts: 9923,
    applyUrl: 'https://ibps.in',
    pdfUrl: 'https://ibps.in/crp-rrb-xv-notification-details-2026.pdf',
    officialWebsite: 'https://ibps.in',
    postedDate: '2026-06-15',
    lastDate: '2026-07-10',
    importantDates: {
      applyStart: '2026-06-15',
      applyEnd: '2026-07-10',
      examDate: '2026-08-15',
      admitCardRelease: '2026-08-05'
    },
    selectionProcess: [
      'Preliminary Examination CBT (For Officers Scale-I & Office Assistant)',
      'Mains Comprehensive Examination CBT Mode',
      'Personal Interview Session (Only Scale I, II, III Officer entries)',
      'Document Matching Verification & Direct Biometrics'
    ],
    location: 'All India Banks (Regional Rural Banks)',
    description: 'IBPS common recruitment process (CRP) RRB XV invites applications bilingually for Officers Scale I, II, III and Office Assistant (Multipurpose) in Rural Banks across India.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'upprpb-si-recruitment-2026',
    title: 'UP Police Sub Inspector SI (Executive & Platoon Commander) Vacancies 2026',
    org: 'Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)',
    category: 'Police',
    qualification: 'Graduate',
    ageLimit: '21 - 28 Years',
    salary: 'Rs. 35,400 - Rs. 1,12,400 (Pay Matrix Level 6)',
    fees: {
      General: '₹400',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 9124,
    applyUrl: 'https://uppbpb.gov.in',
    pdfUrl: 'https://uppbpb.gov.in/notifications/Sub_Inspector_Detailed_Advt_2026.pdf',
    officialWebsite: 'https://uppbpb.gov.in',
    postedDate: '2026-06-15',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-15',
      applyEnd: '2026-07-15',
      examDate: '2026-11-05',
      admitCardRelease: '2026-10-25'
    },
    selectionProcess: [
      'Online CBT Written Examination (400 Marks, 160 Questions)',
      'Physical Standards Check (PST- Height, Chest eligibility)',
      'Physical Efficiency Test (Run 4.8km inside 28 min for Men, 2.4km for Women)',
      'Medical Checkup at District Level Hospitals & Document Check'
    ],
    location: 'Uttar Pradesh',
    description: 'UPPRPB has launched a grand recruitment campaign for eligible graduates to apply for Sub Inspector (Civil Police) and Platoon Commander posts in Uttar Pradesh Police Force.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'bpsc-71st-cce-2026',
    title: 'Bihar BPSC 71st Combined Competitive Prelims Exam Online Form 2026',
    org: 'Bihar Public Service Commission (BPSC)',
    category: 'State PSC',
    qualification: 'Graduate',
    ageLimit: '20 - 37 Years (Relaxation as per Bihar classification rules)',
    salary: 'Rs. 56,100 - Rs. 1,77,500 (Pay Level 9 General Admin)',
    fees: {
      General: '₹600',
      OBC: '₹600',
      SC_ST_Female: '₹150 (Bihar Domicile Reserved / PwD / Residents Women)'
    },
    totalPosts: 1024,
    applyUrl: 'https://bpsc.bih.nic.in',
    pdfUrl: 'https://bpsc.bih.nic.in/Advt/71st_CCE_Official_Notification_2026.pdf',
    officialWebsite: 'https://bpsc.bih.nic.in',
    postedDate: '2026-06-15',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-15',
      applyEnd: '2026-07-15',
      examDate: '2026-09-30',
      admitCardRelease: '2026-09-15'
    },
    selectionProcess: [
      'Preliminary Screening OMR Examination (150 Marks, 1/3 Negative marks)',
      'Main Descriptive Written Examinations (General Hindi + GS Papers + Essay)',
      'Personal Personality Evaluation Interview round (120 Marks)',
      'Document Matching Verification & State Health Panel Medical'
    ],
    location: 'Bihar',
    description: 'Bihar Public Service Commission issued the official brochure and opened registration portals for the 71st Combined Competitive Screening entry for sub-divisional officers, DSPs, etc.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'hssc-constable-2026',
    title: 'Haryana HSSC Male & Female Police Constable Recruitment 2026',
    org: 'Haryana Staff Selection Commission (HSSC)',
    category: 'Police',
    qualification: '12th Pass',
    ageLimit: '18 - 25 Years (Relaxation Applicable)',
    salary: 'Rs. 21,700 - Rs. 69,100 (Level 3 Pay Scale)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Haryana Female & Reserved Category Exempt)'
    },
    totalPosts: 5600,
    applyUrl: 'https://hssc.gov.in',
    pdfUrl: 'https://hssc.gov.in/notifications/HSSC_Advt_Police_Constable_2026.pdf',
    officialWebsite: 'https://hssc.gov.in',
    postedDate: '2026-06-15',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-15',
      applyEnd: '2026-07-15',
      examDate: '2026-09-10',
      admitCardRelease: '2026-08-30'
    },
    selectionProcess: [
      'Physical Measurement Test (PMT - Height & Chest eligibility)',
      'Physical Screening Test (PST - Run 2.5km for Men / 1.0km for Women)',
      'Knowledge Written Examination (90% weightage index)',
      'Socio-Economic Criteria evaluation & Additional Qualification weights'
    ],
    location: 'Haryana',
    description: 'Haryana Staff Selection Commission is conducting a major recruitment drive of 5,600 Male and Female Police Constables in Haryana Police. Apply links are officially active from today, June 15, 2026.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'bpsc-bho-horticulture-2026',
    title: 'Bihar BPSC Block Horticulture Officer (BHO) Vacancies 2026',
    org: 'Bihar Public Service Commission (BPSC)',
    category: 'Others',
    qualification: 'B.Sc',
    ageLimit: '21 - 37 Years (Male), 21 - 40 Years (Female)',
    salary: 'Rs. 35,400 - Rs. 1,12,400 (Level 6 Pay Scale)',
    fees: {
      General: '₹750',
      OBC: '₹750',
      SC_ST_Female: '₹200 (For SC, ST and Resident Women of Bihar status)'
    },
    totalPosts: 318,
    applyUrl: 'https://bpsc.bih.nic.in',
    pdfUrl: 'https://bpsc.bih.nic.in/Advt/BHO_Reopened_Advt_2026.pdf',
    officialWebsite: 'https://bpsc.bih.nic.in',
    postedDate: '2026-06-15',
    lastDate: '2026-06-30',
    importantDates: {
      applyStart: '2026-06-15',
      applyEnd: '2026-06-30',
      examDate: '2026-08-22',
      admitCardRelease: '2026-08-12'
    },
    selectionProcess: [
      'Written Examination (General Hindi, GS papers, Agriculture/Horticulture)',
      'Personal Interview round (50 Marks evaluative index)',
      'Document Verification & Merit classification list'
    ],
    location: 'Bihar',
    description: 'BPSC has officially reopened the online application portal for recruitment of Block Horticulture Officer (BHO) inside Government of Bihar Agriculture Department.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'india-post-gds-2026',
    title: 'India Post Gramin Dak Sevak (GDS) Recruitment 2026',
    org: 'Department of Posts, India Post',
    category: 'Others',
    qualification: '10th Pass',
    ageLimit: '18 - 40 Years (Relaxation Applicable)',
    salary: 'Rs. 12,000 - Rs. 29,380 (BPM / ABPM)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Free)'
    },
    totalPosts: 44228,
    applyUrl: 'https://indiapostgdsonline.gov.in',
    pdfUrl: 'https://indiapostgdsonline.gov.in/documents/GDS_Notifications_2026.pdf',
    officialWebsite: 'https://indiapostgdsonline.gov.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-15',
      examDate: 'No Written Exam (Merit Based)',
      admitCardRelease: 'Direct Merit List Release'
    },
    selectionProcess: [
      'Automatic Merit List based on Class 10th Marks',
      'Original Certificates Matching Verification',
      'Local Language Proficiency Proof'
    ],
    location: 'All India (Various Circles)',
    description: 'Direct engagement of Branch Postmaster (BPM) and Assistant Branch Postmaster (ABPM) / Dak Sevaks. No written examinations. Selection purely on 10th class Board percentage.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'airforce-agniveer-vayu-022026',
    title: 'Indian Air Force Agniveer Vayu Intake 02/2026',
    org: 'Indian Air Force (भारतीय वायु सेना)',
    category: 'Defence',
    qualification: '12th Pass',
    ageLimit: 'Born between 27 June 2005 and 27 December 2009',
    salary: 'Rs. 30,000 (1st Yr) to Rs. 40,000 (4th Yr) + Agniveer Scheme perks',
    fees: {
      General: '₹550 + GST',
      OBC: '₹550 + GST',
      SC_ST_Female: '₹550 + GST'
    },
    totalPosts: 3500,
    applyUrl: 'https://agnipathvayu.cdac.in',
    pdfUrl: 'https://agnipathvayu.cdac.in/AV/img/detailed_advt_02_2026.pdf',
    officialWebsite: 'https://agnipathvayu.cdac.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-05',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-05',
      examDate: '2026-08-18',
      admitCardRelease: '2026-08-10'
    },
    selectionProcess: [
      'Phase-I Online Written Computer Testing (Science & Other subjects)',
      'Phase-II Physical Fitness Test (PFT-1 & PFT-2) & Adaptability Test',
      'Phase-III Comprehensive Medical Examination'
    ],
    location: 'All India IAF Stations',
    description: 'Hiring of courageous airmen as Agniveer Vayu for technical and non-technical fields. Fully structured mock question papers and sample templates updated directly in our WhatsApp/Telegram channels.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'up-police-constable-2026',
    title: 'UP Police Constable Civil Police Recruitment 2026',
    org: 'Uttar Pradesh Police Recruitment & Promotion Board (UPPRPB)',
    category: 'Police',
    qualification: '12th Pass',
    ageLimit: '18 - 25 Years (Relaxation extended for State Reserv.)',
    salary: 'Rs. 21,700 - Rs. 69,100 (Grade Pay 2000)',
    fees: {
      General: '₹400',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 60244,
    applyUrl: 'https://uppbpb.gov.in',
    pdfUrl: 'https://uppbpb.gov.in/notifications/constable_civil_police_2026.pdf',
    officialWebsite: 'https://uppbpb.gov.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-30',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-30',
      examDate: '2026-10-05',
      admitCardRelease: '2026-09-25'
    },
    selectionProcess: [
      'Offline OMR-based Written Exam (300 Marks, 150 Questions)',
      'Document Matching Verification (DV) & Physical Measurement Test (PMT)',
      'Physical Efficiency Test (PET - Run 4.8 km for Men / 2.4 km for Women)'
    ],
    location: 'Uttar Pradesh',
    description: 'Mega Recruitment drive for Civil Police Constable in Uttar Pradesh. Dynamic preparation packages, previous year solved keys, and daily general knowledge capsules added for aspirants.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'bihar-police-constable-2026',
    title: 'Bihar Police Sipahi (Constable) Recruitment 2026',
    org: 'Central Selection Board of Constables (CSBC Bihar)',
    category: 'Police',
    qualification: '12th Pass',
    ageLimit: '18 - 25 Years',
    salary: 'Rs. 21,700 - Rs. 69,100 (Pay Level 3)',
    fees: {
      General: '₹675',
      OBC: '₹675',
      SC_ST_Female: '₹180 (All Resident Sisters / Reserv.)'
    },
    totalPosts: 21391,
    applyUrl: 'https://csbc.bih.nic.in',
    pdfUrl: 'https://csbc.bih.nic.in/Advt/CSBC_01_2026_Constable.pdf',
    officialWebsite: 'https://csbc.bih.nic.in',
    postedDate: '2026-06-13',
    lastDate: '2026-07-25',
    importantDates: {
      applyStart: '2026-06-13',
      applyEnd: '2026-07-25',
      examDate: '2026-09-18',
      admitCardRelease: '2026-09-02'
    },
    selectionProcess: [
      'Written CBT Screening Test (100 Marks, Minimum 30% Pass)',
      'Physical Efficiency Test (PET - High Jump, Shot Put & Run)',
      'Final Merit ranking based entirely on PET total score'
    ],
    location: 'Bihar',
    description: 'Sipahi recruitment for District Police, Bihar Special Armed Police (BSAP) and other units. Ensure high physical fitness score as final rank doesn\'t depend on the written exam.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'rrb-group-d-2026',
    title: 'Railway RRB Group-D (Level-1 Trackman & Assistants) 2026',
    org: 'Railway Recruitment Boards (RRB)',
    category: 'Railway',
    qualification: '10th Pass',
    ageLimit: '18 - 33 Years (Relaxations as according)',
    salary: 'Rs. 18,000 + allowances (7th CPC Pay Matrix level-1)',
    fees: {
      General: '₹500 (₹400 Refundable)',
      OBC: '₹500',
      SC_ST_Female: '₹250 (₹250 Refunded)'
    },
    totalPosts: 103769,
    applyUrl: 'https://rrbcdg.gov.in',
    pdfUrl: 'https://rrbcdg.gov.in/CEN_Level_1_Detailed_Notifications.pdf',
    officialWebsite: 'https://rrbcdg.gov.in',
    postedDate: '2026-06-14',
    lastDate: '2026-08-10',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-08-10',
      examDate: '2026-11-20',
      admitCardRelease: '2026-11-10'
    },
    selectionProcess: [
      'Computer Based Test CBT (General Science, Maths, Reasoning)',
      'Physical Efficiency Test (PET - Weight carrying 35kg/20kg & Running)',
      'Verification of documents & medical fitness tests'
    ],
    location: 'All India (Various Zonal Railways)',
    description: 'Massive level 1 posts recruitment across all Indian Railway zones including Central, Northern, Western, and Southern Railways for matriculates and ITI holders.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'ctet-july-2026',
    title: 'Central Teacher Eligibility Test (CTET) July 2026',
    org: 'Central Board of Secondary Education (CBSE)',
    category: 'Teaching',
    qualification: 'Graduate',
    ageLimit: 'Minimum 17 Years (No Maximum Age Limit)',
    salary: 'Eligibility Certificate (Life-time validity)',
    fees: {
      General: '₹1000 (Single Paper) / ₹1200 (Both)',
      OBC: '₹1000 (Single Paper) / ₹1200 (Both)',
      SC_ST_Female: '₹500 (Single Paper) / ₹600 (Both)'
    },
    totalPosts: 25000,
    applyUrl: 'https://ctet.nic.in',
    pdfUrl: 'https://ctet.nic.in/webinfo/ctet_information_bulletin_july_2026.pdf',
    officialWebsite: 'https://ctet.nic.in',
    postedDate: '2026-06-12',
    lastDate: '2026-07-02',
    importantDates: {
      applyStart: '2026-06-12',
      applyEnd: '2026-07-02',
      examDate: '2026-07-19',
      admitCardRelease: '2026-07-10'
    },
    selectionProcess: [
      'Paper I offline central testing (Primary Stage: Classes I-V)',
      'Paper II offline central testing (Elementary Stage: Classes VI-VIII)',
      'Issuance of DigiLocker Digital Certificate'
    ],
    location: 'All India',
    description: 'CBSE Teacher Eligibility exam standard to qualify for Central School KVS, NVS, Army, and elite state board teacher recruitments. Live model answers uploaded on active release day.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'csir-ugc-net-2026',
    title: 'CSIR UGC NET Examination June 2026',
    org: 'National Testing Agency (NTA)',
    category: 'Teaching',
    qualification: 'Post Graduate',
    ageLimit: 'JRF: max 30 Years | Assistant Professor: No limit',
    salary: 'Junior Research Fellowship (JRF) Stipends / Lecturer position',
    fees: {
      General: '₹1150',
      OBC: '₹600 (EWS/NCL)',
      SC_ST_Female: '₹325 (Third-gender separate)'
    },
    totalPosts: 4500,
    applyUrl: 'https://csirnet.nta.ac.in',
    pdfUrl: 'https://csirnet.nta.ac.in/csir_net_nta_information_bulletin_june_2026.pdf',
    officialWebsite: 'https://csirnet.nta.ac.in',
    postedDate: '2026-06-13',
    lastDate: '2026-07-10',
    importantDates: {
      applyStart: '2026-06-13',
      applyEnd: '2026-07-10',
      examDate: '2026-08-25',
      admitCardRelease: '2026-08-15'
    },
    selectionProcess: [
      'Computer Based Test (CBT - Subject Specific Part A, B, C)',
      'Final Joint JRF Merit cutoff calculation list',
      'Eligibility certificates dispatching'
    ],
    location: 'All India',
    description: 'National determination of JRF Eligibility & Assistant Professor placements in Chemicals, Earth, Life, Mathematical & Physical science streams.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'cisf-constable-fire-2026',
    title: 'CISF Constable Fire (Male Only) Recruitment 2026',
    org: 'Central Industrial Security Force (CISF)',
    category: 'Defence',
    qualification: '12th Pass',
    ageLimit: '18 - 23 Years',
    salary: 'Rs. 21,700 - Rs. 69,100 (Pay Level 3)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0'
    },
    totalPosts: 1130,
    applyUrl: 'https://cisfrectt.cisf.gov.in',
    pdfUrl: 'https://cisfrectt.cisf.gov.in/notifications/constable_fire_recruitment_2026.pdf',
    officialWebsite: 'https://cisfrectt.cisf.gov.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-15',
      examDate: '2026-09-12',
      admitCardRelease: '2026-08-28'
    },
    selectionProcess: [
      'Physical Efficiency Test (PET - Run 5km in 24 minutes)',
      'Computer Based examination CBT (General GK, Maths, Hindi-English)',
      'Document Matching & Detailed Medical round (DME)'
    ],
    location: 'All India (Various State Units)',
    description: 'Special paramilitary recruitment for brave male science candidates who want to join Central Force protection teams in CISF.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'ssc-chsl-2026',
    title: 'SSC CHSL (10+2) LDC, JSA & DEO Recruitment 2026',
    org: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    qualification: '12th Pass',
    ageLimit: '18 - 27 Years',
    salary: 'Rs. 19,900 - Rs. 81,100 (Level 2/4 depends on post)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Free)'
    },
    totalPosts: 3712,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notifications/chsl_official_notif_2026.pdf',
    officialWebsite: 'https://ssc.gov.in',
    postedDate: '2026-06-11',
    lastDate: '2026-07-05',
    importantDates: {
      applyStart: '2026-06-11',
      applyEnd: '2026-07-05',
      examDate: '2026-08-20',
      admitCardRelease: '2026-08-05'
    },
    selectionProcess: [
      'Tier-1 Online computer based screening exam',
      'Tier-2 Advanced comprehensive testing & Skill/Typing speed test',
      'Original paperwork checks & final allotment list'
    ],
    location: 'All India Offices',
    description: 'Hiring for Lower Divisional Clerk (LDC), Junior Secretariat Assistant (JSA), and Data Entry Operator (DEO) in prominent Central Government Ministries & Commissions.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'ibps-rrb-crp-xv-2026',
    title: 'IBPS RRB CRP-XV Office Assistant & Officers Recruitment 2026',
    org: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Bank',
    qualification: 'Graduate',
    ageLimit: '18 - 28 Years (Office Assistant), 18 - 30 Years (Scale-I)',
    salary: 'Rs. 25,000 - Rs. 45,000 (Varies by Officers Grade)',
    fees: {
      General: '₹850',
      OBC: '₹850',
      SC_ST_Female: '₹175'
    },
    totalPosts: 9815,
    applyUrl: 'https://www.ibps.in',
    pdfUrl: 'https://www.ibps.in/wp-content/uploads/rrb_xv_detailed_advt.pdf',
    officialWebsite: 'https://www.ibps.in',
    postedDate: '2026-06-14',
    lastDate: '2026-06-27',
    importantDates: {
      applyStart: '2026-06-07',
      applyEnd: '2026-06-27',
      examDate: '2026-08-01',
      admitCardRelease: '2026-07-20'
    },
    selectionProcess: [
      'Preliminary CBT Examination',
      'Main Examination (Office Assistants & Scale-I)',
      'Interview (Senior Scale-I, II, III Officers)',
      'Provisional Bank Allocation List'
    ],
    location: 'All India Regional Rural Banks (Gramin Bank)',
    description: 'CRP RRBs XV Recruitment of Group "A"-Officers (Scale-I, II & III) and Group "B"-Office Assistants (Multipurpose) across multiple Regional Rural Banks (Gramin Banks) of India.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'ssc-mts-havaldar-2026',
    title: 'SSC Multi Tasking Staff (MTS) & Havaldar Bharti 2026',
    org: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    qualification: '10th Pass',
    ageLimit: '18 - 25 Years & 18 - 27 Years',
    salary: 'Rs. 18,000 - Rs. 22,000 + allowances (Pay Level 1)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 8430,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notifications/ssc_mts_havaldar_detailed_2026.pdf',
    officialWebsite: 'https://ssc.gov.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-14',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-14',
      examDate: '2026-10-15',
      admitCardRelease: '2026-10-01'
    },
    selectionProcess: [
      'Computer Based examination (CBT, Bilingual in Hindi/English)',
      'Physical Efficiency Test (PET) / Physical Standard Test (PST) (For Havaldar Only)',
      'Document Matching Verification'
    ],
    location: 'All India',
    description: 'Hiring for Multi Tasking Staff (MTS), a non-technical General Central Service Group "C" Non-Gazetted, Non-Ministerial post in various Ministries/Departments/Offices, and Havaldar in CBIC & CBN.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'upsc-capf-ac-2026',
    title: 'UPSC Central Armed Police Forces (CAPF) Assistant Commandants 2026',
    org: 'Union Public Service Commission (UPSC)',
    category: 'Defence',
    qualification: 'Graduate',
    ageLimit: '20 - 25 Years',
    salary: 'Rs. 56,100 - Rs. 1,77,500 (Pay level-10)',
    fees: {
      General: '₹200',
      OBC: '₹200',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 506,
    applyUrl: 'https://upsconline.nic.in',
    pdfUrl: 'https://upsc.gov.in/sites/default/files/Exam-Notif-CAPF-2026-Engl.pdf',
    officialWebsite: 'https://upsc.gov.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-05',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-05',
      examDate: '2026-08-02',
      admitCardRelease: '2026-07-18'
    },
    selectionProcess: [
      'Written Examination (Paper I & II)',
      'Physical Standards/Physical Efficiency Tests and Medical Standards Tests',
      'Interview / Personality Test (150 Marks)'
    ],
    location: 'All India / BSF, CRPF, CISF, ITBP, SSB bases',
    description: 'Group-A Gazetted Officer recruitment through Union Public Service Commission in BSF, CRPF, CISF, ITBP, and SSB forces.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'delhi-police-constable-2526',
    title: 'Delhi Police Executive Constable Recruitment 2026',
    org: 'Staff Selection Commission & Delhi Police (SSC)',
    category: 'Police',
    qualification: '12th Pass',
    ageLimit: '18 - 25 Years',
    salary: 'Rs. 21,700 - Rs. 69,100 (Pay Level-3)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 7547,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notifications/delhi_police_const_2026.pdf',
    officialWebsite: 'https://ssc.gov.in',
    postedDate: '2026-06-12',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-12',
      applyEnd: '2026-07-15',
      examDate: '2026-09-10',
      admitCardRelease: '2026-08-25'
    },
    selectionProcess: [
      'Written Computer Based Test (CBT)',
      'Physical Endurance & Measurement Test (PE&MT)',
      'Medical Examination & Document Verification'
    ],
    location: 'Delhi NCR / All India',
    description: 'Direct recruitment of Male and Female Constables in Delhi Police through SSC. Complete syllabus download, previous cut-offs, and free interactive online study practices inside parents portal.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'isro-tech-assistant-2026',
    title: 'ISRO Technical Assistant & Technician-B Recruits 2026',
    org: 'Indian Space Research Organisation (ISRO)',
    category: 'Others',
    qualification: 'Diploma',
    ageLimit: '18 - 35 Years',
    salary: 'Rs. 44,900 - Rs. 1,42,400 (Level 7 / Level 3)',
    fees: {
      General: '₹250',
      OBC: '₹250',
      SC_ST_Female: '₹0 (Full Refund after CBT exam)'
    },
    totalPosts: 224,
    applyUrl: 'https://www.isro.gov.in/Careers.html',
    pdfUrl: 'https://www.isro.gov.in/media_isro/careers/isro_tech_assist_advt_2026.pdf',
    officialWebsite: 'https://isro.gov.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-10',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-10',
      examDate: '2026-09-05',
      admitCardRelease: '2026-08-20'
    },
    selectionProcess: [
      'Written Test (80 MCQs, 90 Minutes)',
      'Skill Test / Trade Test (Go/No-Go Basis)',
      'Document Matching Verification'
    ],
    location: 'All India',
    description: 'Exciting opportunity for Engineering Diploma holders (Mechanical, Electronics, Computer Science, Electrical) and ITI certificate holders to join India\'s apex space research agency.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'ssc-je-civil-mech-2026',
    title: 'SSC Junior Engineer (JE) Civil, Mechanical & Electrical 2026',
    org: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    qualification: 'Diploma',
    ageLimit: 'Up to 30/32 Years (Post specific)',
    salary: 'Rs. 35,400 - Rs. 1,12,400 (Level 6)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 1988,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notifications/je_advt_detailed_2026.pdf',
    officialWebsite: 'https://ssc.gov.in',
    postedDate: '2026-06-11',
    lastDate: '2026-07-08',
    importantDates: {
      applyStart: '2026-06-11',
      applyEnd: '2026-07-08',
      examDate: '2026-10-02',
      admitCardRelease: '2026-09-18'
    },
    selectionProcess: [
      'Paper-I online computer based testing (Objective type)',
      'Paper-II online computer based testing (Subject Depth/Multiple Choice)',
      'Medical round & original certificates matching verification'
    ],
    location: 'All India',
    description: 'Group \'B\' Non-Gazetted hiring for CPWD, MES, Farakka Barrage, Central Water Commission, and border roads organization. Complete notification distributed first inside Sarkari update feed.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'rsmssb-cho-bharti-2026',
    title: 'Rajasthan Community Health Officer (CHO) Bharti 2026',
    org: 'RSMSSB Rajasthan (कर्मचारी चयन बोर्ड)',
    category: 'State PSC',
    qualification: 'Graduate',
    ageLimit: '21 - 40 Years (Relaxation for Category)',
    salary: 'Rs. 25,000 (Consolidated monthly honorarium)',
    fees: {
      General: '₹600',
      OBC: '₹400 (Non-Creamy Layer)',
      SC_ST_Female: '₹400'
    },
    totalPosts: 3531,
    applyUrl: 'https://sso.rajasthan.gov.in',
    pdfUrl: 'https://rsmssb.rajasthan.gov.in/Static/files/CHO_Advt2026_Details.pdf',
    officialWebsite: 'https://rsmssb.rajasthan.gov.in',
    postedDate: '2026-06-13',
    lastDate: '2026-07-20',
    importantDates: {
      applyStart: '2026-06-13',
      applyEnd: '2026-07-20',
      examDate: '2026-11-12',
      admitCardRelease: '2026-11-01'
    },
    selectionProcess: [
      'Offline OMR-Based Screening Exam',
      'Contractual bridge training selection check',
      'Double Document Verification'
    ],
    location: 'Rajasthan',
    description: 'Contractual posting for Community Health Officers under National Health Mission (NHM) Rajasthan. Exclusive detailed preparation mock tests and solutions released instantly in WhatsApp stream.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'navy-agniveer-ssr-2526',
    title: 'Indian Navy Agniveer (SSR & MR) - 01/2026 Batch',
    org: 'Indian Navy (भारतीय नौसेना)',
    category: 'Defence',
    qualification: '12th Pass',
    ageLimit: 'Born between 01 Nov 2005 and 30 Apr 2009',
    salary: 'Rs. 30,000 - Rs. 40,000 (Seva Nidhi Package extra)',
    fees: {
      General: '₹550 + GST',
      OBC: '₹550 + GST',
      SC_ST_Female: '₹550 + GST'
    },
    totalPosts: 1400,
    applyUrl: 'https://joinindiannavy.gov.in',
    pdfUrl: 'https://joinindiannavy.gov.in/ssr_mr_detailed_instructions_01_2026.pdf',
    officialWebsite: 'https://joinindiannavy.gov.in',
    postedDate: '2026-06-08',
    lastDate: '2026-06-28',
    importantDates: {
      applyStart: '2026-06-08',
      applyEnd: '2026-06-28',
      examDate: '2026-08-16',
      admitCardRelease: '2026-08-04'
    },
    selectionProcess: [
      'Stage-I Indian Navy Entrance Test (INET - Computer Based)',
      'Stage-II Physical Fitness Test (PFT), Written test and medical eligibility',
      'Final Induction Training at INS Chilka'
    ],
    location: 'All India (Navy bases)',
    description: 'Sailors recruitment for SSR (Senior Secondary Recruit) and MR (Matric Recruit) under the Agniveer scheme. Full list of qualifying heights, weight limits, and running laps details attached.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'anganwadi-supervisor-2026',
    title: 'Anganwadi Supervisor (महिला सुपरवाइजर) & Workers 2026',
    org: 'Integrated Child Development Services (ICDS)',
    category: 'Others',
    qualification: '10th Pass',
    ageLimit: '18 - 45 Years',
    salary: 'Rs. 18,200 - Rs. 56,900 (Stipends model separate)',
    fees: {
      General: '₹0 (Free Application)',
      OBC: '₹0',
      SC_ST_Female: '₹0'
    },
    totalPosts: 5200,
    applyUrl: 'https://wcd.nic.in',
    pdfUrl: 'https://wcd.nic.in/anganwadi_job_circular_2026.pdf',
    officialWebsite: 'https://wcd.nic.in',
    postedDate: '2026-06-14',
    lastDate: '2026-07-30',
    importantDates: {
      applyStart: '2026-06-14',
      applyEnd: '2026-07-30',
      examDate: '2026-09-30',
      admitCardRelease: '2026-09-15'
    },
    selectionProcess: [
      'Merit scoring based on Class 10/12 final percentages',
      'Local residency check and interview verification',
      'Final community order induction list'
    ],
    location: 'All India (State-wise districts)',
    description: 'ICDS notification alerts published for Anganwadi Workers, Helpers, and Mini-worker assistants. Get district-wise selection tables instantly within our official WhatsApp updates community channel.',
    isWhatsAppAlert: true,
    whatsAppUrl: 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'
  },
  {
    id: 'ssc-cgl-2026',
    title: 'SSC CGL Recruitment 2026',
    org: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    qualification: 'Graduate',
    ageLimit: '18 - 32 Years',
    salary: 'Rs. 44,900 - Rs. 1,42,400 (Level 7)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 17727,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notifications/cgl_2026_detailed_advt.pdf',
    officialWebsite: 'https://ssc.gov.in',
    postedDate: '2026-06-10',
    lastDate: '2026-07-25',
    importantDates: {
      applyStart: '2026-06-10',
      applyEnd: '2026-07-25',
      examDate: '2026-10-15',
      admitCardRelease: '2026-10-01'
    },
    selectionProcess: [
      'Tier-I Computer Based Examination (Qualifying)',
      'Tier-II Computer Based Examination (Merit)',
      'Document Verification & Medical Test'
    ],
    location: 'All India',
    description: 'Staff Selection Commission will hold the Common Graduate Level Exam for recruitment to Group B and Group C posts in various Ministries, Departments and Organizations of the Government of India.'
  },
  {
    id: 'upsc-cse-2026',
    title: 'UPSC Civil Services Examination 2026',
    org: 'Union Public Service Commission (UPSC)',
    category: 'UPSC',
    qualification: 'Graduate',
    ageLimit: '21 - 32 Years (Relaxation as per Rules)',
    salary: 'Rs. 56,100 - Rs. 2,50,000 (IAS/IFS Pay Matrix)',
    fees: {
      General: '₹200',
      OBC: '₹200',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 1056,
    applyUrl: 'https://upsconline.nic.in',
    pdfUrl: 'https://upsc.gov.in/sites/default/files/Notification-IAS-German-2026.pdf',
    officialWebsite: 'https://upsc.gov.in',
    postedDate: '2026-06-01',
    lastDate: '2026-06-30',
    importantDates: {
      applyStart: '2026-06-01',
      applyEnd: '2026-06-30',
      examDate: '2026-09-20',
      admitCardRelease: '2026-09-05'
    },
    selectionProcess: [
      'Civil Services Prelims Exam (Objective)',
      'Civil Services Mains Exam (Descriptive)',
      'Personality Test (Interview)'
    ],
    location: 'All India',
    description: 'The UPSC CSE recruits for elite administrative posts such as Indian Administrative Service (IAS), Indian Police Service (IPS), and Indian Foreign Service (IFS) among others.'
  },
  {
    id: 'rrb-ntpc-2026',
    title: 'RRB NTPC Grad & Undergrad Recruitment 2026',
    org: 'Railway Recruitment Board (RRB)',
    category: 'Railway',
    qualification: '12th Pass',
    ageLimit: '18 - 30 Years (Undergrad), 18-33 Years (Grad)',
    salary: 'Rs. 19,900 - Rs. 35,400 per month',
    fees: {
      General: '₹500 (Refundable after CBT-1)',
      OBC: '₹500',
      SC_ST_Female: '₹250 (Full Refundable)'
    },
    totalPosts: 11558,
    applyUrl: 'https://rrbapply.gov.in',
    pdfUrl: 'https://www.rrbcdg.gov.in/CEN_03_2026_NTPC.pdf',
    officialWebsite: 'https://www.rrbcdg.gov.in',
    postedDate: '2026-06-11',
    lastDate: '2026-07-28',
    importantDates: {
      applyStart: '2026-06-11',
      applyEnd: '2026-07-28',
      examDate: '2026-11-20',
      admitCardRelease: '2026-11-10'
    },
    selectionProcess: [
      '1st Stage Computer Based Test (CBT-1)',
      '2nd Stage Computer Based Test (CBT-2)',
      'Typing Skill Test / Computer Based Aptitude Test (as per post)',
      'Document Verification & Medical Exam'
    ],
    location: 'All India',
    description: 'Railways invites recruitment for Non-Technical Popular Categories (NTPC) accounts clerk, commercial cum ticket clerk, goods guard, senior clerk, traffic assistant, station master, etc.'
  },
  {
    id: 'ibps-po-2026',
    title: 'IBPS PO/MT Exam XVI 2026',
    org: 'Institute of Banking Personnel Selection (IBPS)',
    category: 'Bank',
    qualification: 'Graduate',
    ageLimit: '20 - 30 Years',
    salary: 'Rs. 52,000 - Rs. 57,000 (Starting Salary Package)',
    fees: {
      General: '₹850',
      OBC: '₹850',
      SC_ST_Female: '₹175'
    },
    totalPosts: 4455,
    applyUrl: 'https://ibps.in',
    pdfUrl: 'https://ibps.in/crp-po-mt-xvi-advt.pdf',
    officialWebsite: 'https://ibps.in',
    postedDate: '2026-06-08',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-08',
      applyEnd: '2026-07-15',
      examDate: '2026-09-30',
      admitCardRelease: '2026-09-18'
    },
    selectionProcess: [
      'Preliminary Examination (Objective)',
      'Main Examination (Objective + Descriptive)',
      'Common Interview Phase'
    ],
    location: 'All India',
    description: 'IBPS CRP PO/MT recruitment conducts selection for Probationary Officers and Management Trainees in nationalized public banks in India.'
  },
  {
    id: 'army-agniveer-2026',
    title: 'Indian Army Agniveer Rally 2026',
    org: 'Indian Army',
    category: 'Defence',
    qualification: '10th Pass',
    ageLimit: '17.5 - 21 Years',
    salary: 'Rs. 30,000 - Rs. 40,000 + Seva Nidhi Package',
    fees: {
      General: '₹250',
      OBC: '₹250',
      SC_ST_Female: '₹250'
    },
    totalPosts: 25000,
    applyUrl: 'https://joinindianarmy.nic.in',
    pdfUrl: 'https://joinindianarmy.nic.in/agniveer_2026_eligibility.pdf',
    officialWebsite: 'https://joinindianarmy.nic.in',
    postedDate: '2026-06-05',
    lastDate: '2026-07-10',
    importantDates: {
      applyStart: '2026-06-05',
      applyEnd: '2026-07-10',
      examDate: '2026-09-10',
      admitCardRelease: '2026-08-28'
    },
    selectionProcess: [
      'Online Common Entrance Exam (CEE)',
      'Physical Fitness Test (PFT) & Physical Measurement',
      'Medical Evaluation & Merit List Preparation'
    ],
    location: 'State Wise Rally Centres',
    description: 'Indian Army Agniveer scheme is for the recruitment of soldiers into General Duty, Technical, Clerk, Store Keeper, and Tradesmen positions for a period of 4 years.'
  },
  {
    id: 'drdo-scientist-2026',
    title: 'DRDO Scientist B Recruitment 2026',
    org: 'DRDO Recruitment & Assessment Centre (RAC)',
    category: 'Defence',
    qualification: 'B.Tech',
    ageLimit: 'Up to 28 Years (UR)',
    salary: 'Rs. 56,100 + Allowances (approx. ₹1,00,000+/mo)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Exempt)'
    },
    totalPosts: 620,
    applyUrl: 'https://rac.gov.in',
    pdfUrl: 'https://rac.gov.in/notifications/scientist_b_detailed_desc_2026.pdf',
    officialWebsite: 'https://rac.gov.in',
    postedDate: '2026-06-12',
    lastDate: '2026-07-31',
    importantDates: {
      applyStart: '2026-06-12',
      applyEnd: '2026-07-31',
      examDate: '2026-11-15',
      admitCardRelease: '2026-11-01'
    },
    selectionProcess: [
      'Valid GATE Score Screening',
      'Written Examination (Descriptive Paper)',
      'Personal Interview in New Delhi'
    ],
    location: 'Pan India Labs',
    description: 'Defense Research and Development Organisation (DRDO) Scientist B positions are designed for engineering graduates to engage in state-of-the-art national defense research.'
  },
  {
    id: 'rpsc-ras-2026',
    title: 'RPSC Rajasthan Administrative Services (RAS/RTS) 2026',
    org: 'Rajasthan Public Service Commission (RPSC)',
    category: 'State PSC',
    qualification: 'Graduate',
    ageLimit: '21 - 40 Years (Age relaxations applicable)',
    salary: 'Pay Matrix Level-14 (Grade Pay Rs. 5400)',
    fees: {
      General: '₹600',
      OBC: '₹400',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 905,
    applyUrl: 'https://rpsc.rajasthan.gov.in',
    pdfUrl: 'https://rpsc.rajasthan.gov.in/Static/Files/RAS_Advt_2026.pdf',
    officialWebsite: 'https://rpsc.rajasthan.gov.in',
    postedDate: '2026-06-10',
    lastDate: '2026-07-28',
    importantDates: {
      applyStart: '2026-06-10',
      applyEnd: '2026-07-28',
      examDate: '2026-10-18',
      admitCardRelease: '2026-10-05'
    },
    selectionProcess: [
      'RAS Preliminary Examination (Objective, 200 Marks)',
      'RAS Mains Written Examination (Descriptive, 4 Papers)',
      'Personality Test & Viva-voce / Interview (100 Marks)'
    ],
    location: 'Rajasthan',
    description: 'The RPSC RAS recruits administrative officers for state civil services post classifications including Rajasthan Administrative Service (RAS), Rajasthan Police Service (RPS), and Rajasthan Accounts Service.'
  },
  {
    id: 'rsmssb-ldc-2026',
    title: 'RSMSSB Rajasthan LDC / Clerk Grade-II Recruitment 2026',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    category: 'State PSC',
    qualification: '12th Pass',
    ageLimit: '18 - 40 Years',
    salary: 'Pay Matrix Level-5 (Grade Pay Rs. 2400)',
    fees: {
      General: '₹600',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 4197,
    applyUrl: 'https://rsmssb.rajasthan.gov.in',
    pdfUrl: 'https://rsmssb.rajasthan.gov.in/Static/Files/LDC_Advt_Detailed_2026.pdf',
    officialWebsite: 'https://rsmssb.rajasthan.gov.in',
    postedDate: '2026-06-13',
    lastDate: '2026-08-10',
    importantDates: {
      applyStart: '2026-06-13',
      applyEnd: '2026-08-10',
      examDate: '2026-11-15',
      admitCardRelease: '2026-11-01'
    },
    selectionProcess: [
      'Phase I - Written Exam (Paper-I GK & Math, Paper-II Hindi & English)',
      'Phase II - Computer Skill & Typing Test (Speed & Efficiency)',
      'Document Verification & Merit Allotment'
    ],
    location: 'Rajasthan',
    description: 'RSMSSB invites online applications to fill 4,197 vacancies of Lower Division Clerk (LDC) / Junior Assistants across various government office departments in Rajasthan.'
  },
  {
    id: 'rsmssb-pashu-paricharak-2026',
    title: 'RSMSSB Rajasthan Animal Attendant (पशु परिचारक) Bharti 2026',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    category: 'State PSC',
    qualification: '10th Pass',
    ageLimit: '18 - 40 Years',
    salary: 'Pay Matrix Level L-1 Scale as per rules',
    fees: {
      General: '₹600',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 5934,
    applyUrl: 'https://rsmssb.rajasthan.gov.in',
    pdfUrl: 'https://rsmssb.rajasthan.gov.in/Static/Files/PashuParicharak_Advt_2026.pdf',
    officialWebsite: 'https://rsmssb.rajasthan.gov.in',
    postedDate: '2026-06-13',
    lastDate: '2026-08-15',
    importantDates: {
      applyStart: '2026-06-13',
      applyEnd: '2026-08-15',
      examDate: '2026-12-05',
      admitCardRelease: '2026-11-20'
    },
    selectionProcess: [
      'Single Session Objective Written Exam',
      'Document Merit Check & Rating Verification',
      'Medical Check-up'
    ],
    location: 'Rajasthan',
    description: 'A major direct recruitment opportunity for 10th pass candidates to serve as Animal Attendant (पशु परिचारक) in Animal Husbandry Department of Rajasthan.'
  },
  {
    id: 'rsmssb-accountant-2026',
    title: 'RSMSSB Junior Accountant & Tehsil Revenue Accountant 2026',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    category: 'State PSC',
    qualification: 'Graduate',
    ageLimit: '21 - 40 Years',
    salary: 'Pay Matrix L-10 (Grade Pay Rs. 3600)',
    fees: {
      General: '₹600',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 5388,
    applyUrl: 'https://rsmssb.rajasthan.gov.in',
    pdfUrl: 'https://rsmssb.rajasthan.gov.in/Static/Files/Jr_Accountant_detailed_2026.pdf',
    officialWebsite: 'https://rsmssb.rajasthan.gov.in',
    postedDate: '2026-06-11',
    lastDate: '2026-07-30',
    importantDates: {
      applyStart: '2026-06-11',
      applyEnd: '2026-07-30',
      examDate: '2026-09-12',
      admitCardRelease: '2026-09-01'
    },
    selectionProcess: [
      'CET Graduation Level Merit Screening',
      'Written Examination (Paper-I Language & Paper-II Commerce Arithmetic)',
      'Document Merit Final Verification'
    ],
    location: 'Rajasthan',
    description: 'State Board notification inviting online applications for Junior Accountant and Tehsil Revenue Accountant across state finance departments.'
  },
  {
    id: 'raj-police-constable-2026',
    title: 'Rajasthan Police Constable Recruitment 2026',
    org: 'Rajasthan Police Department',
    category: 'Police',
    qualification: '12th Pass',
    ageLimit: '18 - 25 Years (Male), 18 - 30 Years (Female)',
    salary: 'Rs. 14,600 (Probation period), then Pay Matrix L-5 Scale',
    fees: {
      General: '₹600',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 3578,
    applyUrl: 'https://police.rajasthan.gov.in',
    pdfUrl: 'https://police.rajasthan.gov.in/Static/Files/Constable_Recruitment_2026.pdf',
    officialWebsite: 'https://police.rajasthan.gov.in',
    postedDate: '2026-06-12',
    lastDate: '2026-07-20',
    importantDates: {
      applyStart: '2026-06-12',
      applyEnd: '2026-07-20',
      examDate: '2026-09-25',
      admitCardRelease: '2026-09-15'
    },
    selectionProcess: [
      'Physical Efficiency Test (PET) & Physical Standard Test (PST)',
      'Computer Based Test (CBT - 150 marks)',
      'Proficiency Test (applicable only on Driver/Band/Mounted positions)'
    ],
    location: 'Rajasthan',
    description: 'Rajasthan Police invites applications for Constables (General Duty, Telecommunication, Mounted, Driver, and Band) across state districts.'
  },
  {
    id: 'army-tes-2026',
    title: 'Indian Army Technical Entry Scheme (TES 55) 2026',
    org: 'Indian Army (Major Recruitment Wing)',
    category: 'Defence',
    qualification: '12th Pass',
    ageLimit: '16.5 - 19.5 Years',
    salary: 'Rs. 56,100 starting basic (Lieutenant Cadet Pay Matrix)',
    fees: {
      General: '₹0 (Exempted)',
      OBC: '₹0 (Exempted)',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 90,
    applyUrl: 'https://joinindianarmy.nic.in',
    pdfUrl: 'https://joinindianarmy.nic.in/pdf/TES_55_Notification.pdf',
    officialWebsite: 'https://joinindianarmy.nic.in',
    postedDate: '2026-06-12',
    lastDate: '2026-07-15',
    importantDates: {
      applyStart: '2026-06-12',
      applyEnd: '2026-07-15',
      examDate: '2026-09-01',
      admitCardRelease: '2026-08-20'
    },
    selectionProcess: [
      'Shortlisting based on JEE Main & 10+2 PCM Scores',
      '5-Day Service Selection Board (SSB) Interview Process',
      'Medical Tests & Cadet Training'
    ],
    location: 'Pan India Centres',
    description: 'Direct entry commission in the Indian Army as Lieutenant officers for class 12th PCM Science students without written NDA exam.'
  },
  {
    id: 'rpsc-reet-2026',
    title: 'RPSC REET Senior Teacher Grade-II Recruitment 2026',
    org: 'Rajasthan Educator Eligibility Test Board',
    category: 'Teaching',
    qualification: 'Graduate',
    ageLimit: '18 - 40 Years',
    salary: 'Level 11 Pay Matrix (Grade Pay ₹4200)',
    fees: {
      General: '₹600',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 12400,
    applyUrl: 'https://rpsc.rajasthan.gov.in',
    pdfUrl: 'https://rpsc.rajasthan.gov.in/notifications/reet_gr2_rect_2026.pdf',
    officialWebsite: 'https://rpsc.rajasthan.gov.in',
    postedDate: '2026-06-11',
    lastDate: '2026-07-31',
    importantDates: {
      applyStart: '2026-06-11',
      applyEnd: '2026-07-31',
      examDate: '2026-11-10',
      admitCardRelease: '2026-11-01'
    },
    selectionProcess: [
      'Paper 1 - General Studies & Rajasthan GK (200 Marks)',
      'Paper 2 - Specialised Subjects Core (300 Marks)',
      'Final Verified Merit Cutoff List'
    ],
    location: 'Rajasthan',
    description: 'Massive recruitment notification for recruitment of Senior School Teachers for primary, upper primary and middle level state government schools in Rajasthan.'
  },
  {
    id: 'rsmssb-patwari-2026',
    title: 'RSMSSB Rajasthan Patwari Exam Notification 2026',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    category: 'State PSC',
    qualification: 'Graduate',
    ageLimit: '18 - 40 Years',
    salary: 'Pay Level L-5 (Grade Pay ₹2400)',
    fees: {
      General: '₹600',
      OBC: '₹400',
      SC_ST_Female: '₹400'
    },
    totalPosts: 2998,
    applyUrl: 'https://rsmssb.rajasthan.gov.in',
    pdfUrl: 'https://rsmssb.rajasthan.gov.in/Static/Files/Patwari_Advertisement_2026.pdf',
    officialWebsite: 'https://rsmssb.rajasthan.gov.in',
    postedDate: '2026-06-12',
    lastDate: '2026-07-28',
    importantDates: {
      applyStart: '2026-06-12',
      applyEnd: '2026-07-28',
      examDate: '2026-11-05',
      admitCardRelease: '2026-10-25'
    },
    selectionProcess: [
      'Single Tier Written Examination (GK, Math, Computer, Hindi, English)',
      'Document Verification Protocol',
      'Mandatory Land Revenue Training Session'
    ],
    location: 'Rajasthan Support Blocks',
    description: 'RSMSSB invites local state aspirants to fill Patwari vacancies across revenue division blocks in the state of Rajasthan.'
  },
  {
    id: 'uppcs-gen-2026',
    title: 'UPPCS Uttar Pradesh State Civil Services Prelims 2026',
    org: 'Uttar Pradesh Public Service Commission (UPPSC)',
    category: 'State PSC',
    qualification: 'Graduate',
    ageLimit: '21 - 40 Years',
    salary: 'Rs. 9,300 - Rs. 39,100 (Grade Pay Rs. 5400)',
    fees: {
      General: '₹125',
      OBC: '₹125',
      SC_ST_Female: '₹65'
    },
    totalPosts: 450,
    applyUrl: 'https://uppsc.up.nic.in',
    pdfUrl: 'https://uppsc.up.nic.in/notifications/pcs_2026_combined_state.pdf',
    officialWebsite: 'https://uppsc.up.nic.in',
    postedDate: '2026-06-10',
    lastDate: '2026-07-20',
    importantDates: {
      applyStart: '2026-06-10',
      applyEnd: '2026-07-20',
      examDate: '2026-10-04',
      admitCardRelease: '2026-09-22'
    },
    selectionProcess: [
      'Combined State Prelims Written Exam (GS I & CSAT)',
      'Provincial Mains Written Descriptive Exam (8 Papers)',
      'Personality Board Interview'
    ],
    location: 'Uttar Pradesh (All Districts)',
    description: 'UPPSC recruits qualified graduates for high profile administrative posts including Sub Divisional Magistrate (SDM), Deputy SP, Treasury Officer, and Block Development Officers.'
  },
  {
    id: 'bpsc-civil-2026',
    title: 'BPSC Integrated 71st Combined State Services 2026',
    org: 'Bihar Public Service Commission (BPSC)',
    category: 'State PSC',
    qualification: 'Graduate',
    ageLimit: '20 - 37 Years (UR Male)',
    salary: 'Pay Level 9 Matrix (With high state allowances)',
    fees: {
      General: '₹600',
      OBC: '₹600',
      SC_ST_Female: '₹150'
    },
    totalPosts: 380,
    applyUrl: 'https://bpsc.bih.nic.in',
    pdfUrl: 'https://bpsc.bih.nic.in/Combined_71st_Notification.pdf',
    officialWebsite: 'https://bpsc.bih.nic.in',
    postedDate: '2026-06-09',
    lastDate: '2026-07-18',
    importantDates: {
      applyStart: '2026-06-09',
      applyEnd: '2026-07-18',
      examDate: '2026-10-12',
      admitCardRelease: '2026-10-01'
    },
    selectionProcess: [
      'BPSC Preliminary MCQ Examination (With negative marking)',
      'BPSC Mains Essay & GS Written Subjective Papers',
      'State Personality Panel Assessment'
    ],
    location: 'Bihar Districts',
    description: 'Executive service recruitment for high level state cadre positions including DSP, Block Minority Officers, Revenue Officers, and District Audit officers.'
  },
  {
    id: 'ssc-gd-constable-2026',
    title: 'SSC GD Constable (CAPFs, SSF, Rifles) Recruitment 2026',
    org: 'Staff Selection Commission (SSC)',
    category: 'SSC',
    qualification: '10th Pass',
    ageLimit: '18 - 23 Years',
    salary: 'Rs. 21,700 - Rs. 69,100 (Pay Level 3)',
    fees: {
      General: '₹100',
      OBC: '₹100',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 39481,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/advt/gd_constable_detailed_advt_26.pdf',
    officialWebsite: 'https://ssc.gov.in',
    postedDate: '2026-06-08',
    lastDate: '2026-07-29',
    importantDates: {
      applyStart: '2026-06-08',
      applyEnd: '2026-07-29',
      examDate: '2026-11-15',
      admitCardRelease: '2026-11-01'
    },
    selectionProcess: [
      'Computer Based examination (CBE) (GK, Math, Hindi/English, Reasoning)',
      'Physical Efficiency Test (PET) & Physical Standard Test (PST)',
      'Detailed Medical Examination (DME)'
    ],
    location: 'All India Deployment',
    description: 'Sought-after post for class 10th pass candidates. General Duty constables are deployed across federal border forces including BSF, CISF, CRPF, ITBP, SSB, and AR.'
  },
  {
    id: 'sbi-po-2026',
    title: 'SBI Probationary Officers (PO) Recruitment 2026',
    org: 'State Bank of India (SBI)',
    category: 'Bank',
    qualification: 'Graduate',
    ageLimit: '21 - 30 Years',
    salary: 'Rs. 41,960 (With 4 advance increments) plus high special allowance',
    fees: {
      General: '₹750',
      OBC: '₹750',
      SC_ST_Female: '₹0 (Exempted)'
    },
    totalPosts: 2000,
    applyUrl: 'https://sbi.co.in/careers',
    pdfUrl: 'https://sbi.co.in/careers/detailed_po_advertisement_2026.pdf',
    officialWebsite: 'https://sbi.co.in',
    postedDate: '2026-06-11',
    lastDate: '2026-07-22',
    importantDates: {
      applyStart: '2026-06-11',
      applyEnd: '2026-07-22',
      examDate: '2026-10-09',
      admitCardRelease: '2026-09-28'
    },
    selectionProcess: [
      'Phase I - Preliminary Exam (English, Quant, Reasoning)',
      'Phase II - Mains Objective & Descriptive Paper',
      'Phase III - Psychometric Test & Personal Interview Group Exercise'
    ],
    location: 'All India Branches',
    description: 'SBI PO selection invites eligible graduates to work at prestigious state-owned corporate and retail banking positions across urban & rural areas.'
  },
  {
    id: 'rrb-rpf-si-2026',
    title: 'Railway RPF Sub-Inspector & Constable Bharti 2026',
    org: 'Railway Recruitment Board (RRB)',
    category: 'Railway',
    qualification: 'Graduate',
    ageLimit: '20 - 28 Years',
    salary: 'Rs. 35,400 per month (Level 6 Pay Band)',
    fees: {
      General: '₹500',
      OBC: '₹500',
      SC_ST_Female: '₹250'
    },
    totalPosts: 4208,
    applyUrl: 'https://rrbapply.gov.in',
    pdfUrl: 'https://rrbcdg.gov.in/notice/rpf_si_constable_02_2026.pdf',
    officialWebsite: 'https://rrbcdg.gov.in',
    postedDate: '2026-06-12',
    lastDate: '2026-07-30',
    importantDates: {
      applyStart: '2026-06-12',
      applyEnd: '2026-07-30',
      examDate: '2026-11-12',
      admitCardRelease: '2026-11-01'
    },
    selectionProcess: [
      'Computer Based examination (CBE) (Arithmetics, Reasoning, GK)',
      'Physical Efficiency Test (PET Run, High Jump, Long Jump)',
      'Physical Standards Check (PST) and Medical Fitness Record'
    ],
    location: 'Indian Railway Divisions',
    description: 'RPF protection branch starts a fresh recruitment campaign for Sub-Inspectors to manage law & order across dynamic train routes and public platforms.'
  }
];

export const INITIAL_ADMIT_CARDS: AdmitCard[] = [
  {
    id: 'idbi-bank-executive-admit-card-2026',
    title: 'IDBI Bank Executive (On Contract) Exam Admit Card & Call Letter 2026',
    org: 'IDBI Bank',
    examDate: '2026-07-02 to 2026-07-05',
    examCity: 'Check Detailed CBT Venue & Shift details',
    downloadUrl: 'https://www.idbibank.in',
    officialLink: 'https://www.idbibank.in',
    addedDate: '2026-06-21'
  },
  {
    id: 'csir-ugc-net-june-admit-2026',
    title: 'CSIR UGC NET June 2026 Exam City Slip / Hall Ticket',
    org: 'National Testing Agency (NTA)',
    examDate: '2026-06-25 to 2026-06-27',
    examCity: 'Check Allotted Specialized Online Exam Venues',
    downloadUrl: 'https://csirnet.nta.ac.in',
    officialLink: 'https://csirnet.nta.ac.in',
    addedDate: '2026-06-17'
  },
  {
    id: 'ibps-rrb-pet-admit-2026',
    title: 'IBPS RRB XV Clerk & PO Pre-Exam Training Call Letter 2026',
    org: 'Institute of Banking Personnel Selection (IBPS)',
    examDate: '2026-07-10 to 2026-07-15',
    examCity: 'Check Detailed PET Centers list with Call Letter',
    downloadUrl: 'https://www.ibps.in',
    officialLink: 'https://www.ibps.in',
    addedDate: '2026-06-17'
  },
  {
    id: 'ssc-chsl-tier1-admit-2026',
    title: 'SSC CHSL (10+2) Tier-I Exam Status & e-Admit Card 2026',
    org: 'Staff Selection Commission (SSC)',
    examDate: '2026-06-25 to 2026-07-05',
    examCity: 'All Regional Headquarters Portals Active',
    downloadUrl: 'https://ssc.gov.in/admit-card',
    officialLink: 'https://ssc.gov.in',
    addedDate: '2026-06-15'
  },
  {
    id: 'navy-agniveer-ssr-mr-admit-2026',
    title: 'Indian Navy Agniveer (SSR & MR) - 02/2026 Batch Admit Card',
    org: 'Indian Navy (भारतीय नौसेना)',
    examDate: '2026-07-08 to 2026-07-15',
    examCity: 'Check Allocated Online CBT Venues status',
    downloadUrl: 'https://joinindiannavy.gov.in',
    officialLink: 'https://joinindiannavy.gov.in',
    addedDate: '2026-06-15'
  },
  {
    id: 'upsc-cse-admit-2026',
    title: 'UPSC Civil Services (IAS/IFS) Prelims e-Admit Card 2026',
    org: 'Union Public Service Commission (UPSC)',
    examDate: '2026-06-21',
    examCity: 'All India Authorized Center Cities (As in Admit Card)',
    downloadUrl: 'https://upsconline.nic.in/eadmitcard/subsession.php',
    officialLink: 'https://upsc.gov.in',
    addedDate: '2026-06-15'
  },
  {
    id: 'nta-neet-ug-reexam-admit-2026',
    title: 'NTA NEET UG Re-Exam Admit Card 2026 (For Affected Aspirants)',
    org: 'National Testing Agency (NTA)',
    examDate: '2026-06-23',
    examCity: 'Allotted Specially Setup Exam Center Halls',
    downloadUrl: 'https://exams.nta.ac.in/NEET/',
    officialLink: 'https://nta.ac.in',
    addedDate: '2026-06-15'
  },
  {
    id: 'ssc-phase12-admit-2026',
    title: 'SSC Selection Post Phase XII Call Letter & Region-wise Status 2026',
    org: 'Staff Selection Commission (SSC)',
    examDate: '2026-06-20 to 2026-06-26',
    examCity: 'Download Region-wise (NR, CR, WR, SR, ER, MPR, KKR)',
    downloadUrl: 'https://ssc.gov.in/admit-card',
    officialLink: 'https://ssc.gov.in',
    addedDate: '2026-06-15'
  },
  {
    id: 'ssc-chsl-admit-2026',
    title: 'SSC CHSL (10+2) Tier-I Admit Card 2026',
    org: 'Staff Selection Commission (SSC)',
    examDate: '2026-06-25 to 2026-07-05',
    examCity: 'Check Status / Download Regional Portals',
    downloadUrl: 'https://ssc.gov.in/admit-card-chsl-2026',
    officialLink: 'https://ssc.gov.in',
    addedDate: '2026-06-12'
  },
  {
    id: 'rsmssb-ldc-admit-2026',
    title: 'RSMSSB Rajasthan LDC / Clerk Grade-II Admit Card 2026',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    examDate: '2026-11-15',
    examCity: 'Jaipur, Jodhpur, Udaipur, Ajmer Centres',
    downloadUrl: 'https://rsmssb.rajasthan.gov.in/admit-card-ldc-2026',
    officialLink: 'https://rsmssb.rajasthan.gov.in',
    addedDate: '2026-06-13'
  },
  {
    id: 'rsmssb-pashu-paricharak-admit-2026',
    title: 'RSMSSB Rajasthan Animal Attendant (पशु परिचारक) Exam Admit Card 2526',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    examDate: '2026-12-05',
    examCity: 'Allotted Regional Headquarters (Rajasthan)',
    downloadUrl: 'https://rsmssb.rajasthan.gov.in/admit-card-pashu-paricharak',
    officialLink: 'https://rsmssb.rajasthan.gov.in',
    addedDate: '2026-06-13'
  },
  {
    id: 'rpsc-ras-admit-2026',
    title: 'RPSC Rajasthan RAS/RTS Prelims Admit Card 2026',
    org: 'Rajasthan Public Service Commission (RPSC)',
    examDate: '2026-09-12',
    examCity: 'All 33 District HQ Centres of Rajasthan',
    downloadUrl: 'https://rpsc.rajasthan.gov.in/admit_card',
    officialLink: 'https://rpsc.rajasthan.gov.in',
    addedDate: '2026-06-13'
  },
  {
    id: 'rajasthan-constable-admit-2026',
    title: 'Rajasthan Police Constable Physical (PET/PST) Admit Card 2026',
    org: 'Rajasthan Police Department',
    examDate: '2026-07-20 to 2026-07-26',
    examCity: 'Range-wise Stadiums (Jaipur, Jodhpur, Kota)',
    downloadUrl: 'https://police.rajasthan.gov.in/constable-admit-card-2026',
    officialLink: 'https://police.rajasthan.gov.in',
    addedDate: '2026-06-13'
  },
  {
    id: 'rsmssb-patwari-admit-2026',
    title: 'RSMSSB Rajasthan Patwari Exam Admit Card 2026',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    examDate: '2026-10-18',
    examCity: 'District HQ School/College Venues',
    downloadUrl: 'https://rsmssb.rajasthan.gov.in/admit-card-patwari',
    officialLink: 'https://rsmssb.rajasthan.gov.in',
    addedDate: '2026-06-13'
  },
  {
    id: 'sbi-clerk-admit-2026',
    title: 'SBI Junior Associates (Clerk) Main Exam Admit Card',
    org: 'State Bank of India (SBI)',
    examDate: '2026-06-28',
    examCity: 'Allotted State Exam Centres',
    downloadUrl: 'https://sbi.co.in/careers/clerk-main-admit-card',
    officialLink: 'https://sbi.co.in',
    addedDate: '2026-06-11'
  },
  {
    id: 'rpsc-eo-ao-admit-2026',
    title: 'RPSC EO/RO Exam e-Admit Card 2026',
    org: 'Rajasthan Public Service Commission (RPSC)',
    examDate: '2026-06-29',
    examCity: 'Jaipur, Jodhpur, Ajmer, Udaipur Head Centres',
    downloadUrl: 'https://rpsc.rajasthan.gov.in/admit_card',
    officialLink: 'https://rpsc.rajasthan.gov.in',
    addedDate: '2026-06-12'
  },
  {
    id: 'upsc-nda-admit-2026',
    title: 'UPSC NDA & NA (I) Exam Admit Card 2026',
    org: 'Union Public Service Commission (UPSC)',
    examDate: '2026-06-30',
    examCity: 'Check in e-Admit Card PDF',
    downloadUrl: 'https://upsconline.nic.in/eadmitcard',
    officialLink: 'https://upsc.gov.in',
    addedDate: '2026-06-10'
  }
];

export const INITIAL_RESULTS: JobResult[] = [
  {
    id: 'india-post-gds-first-merit-list-2026',
    title: 'India Post GDS 2026 Circle Wise First Merit List & Cutoff Marks',
    org: 'Department of Posts, India',
    meritListUrl: 'https://indiapostgdsonline.gov.in',
    scoreCardUrl: 'https://indiapostgdsonline.gov.in',
    cutOff: {
      UR: '96.8% Average Circle Cutoff',
      OBC: '95.4% Circle Cutoff',
      SC: '91.2% Circle Cutoff',
      ST: '88.6% Circle Cutoff'
    },
    downloadUrl: 'https://indiapostgdsonline.gov.in',
    releaseDate: '2026-06-21'
  },
  {
    id: 'jee-advanced-result-2026',
    title: 'JEE Advanced 2026 Final Score Card, Cut Off & Rank Merit List',
    org: 'IIT Delhi (Organizing Body)',
    meritListUrl: 'https://jeeadv.ac.in',
    scoreCardUrl: 'https://jeeadv.ac.in',
    cutOff: {
      UR: '109 Marks Aggregate Cutoff',
      OBC: '98 Marks Cutoff',
      SC: '54 Marks Cutoff',
      ST: '54 Marks Cutoff'
    },
    downloadUrl: 'https://jeeadv.ac.in',
    releaseDate: '2026-06-17'
  },
  {
    id: 'ssc-cgl-2025-final-result',
    title: 'SSC CGL 2025 Final Merit & Rank Select List (Out Today)',
    org: 'Staff Selection Commission (SSC)',
    meritListUrl: 'https://ssc.gov.in',
    scoreCardUrl: 'https://ssc.gov.in',
    cutOff: {
      UR: '312.5 Marks (Assistant Section Officer)',
      OBC: '304.0 Marks (Tax Assistant)',
      SC: '286.0 Marks',
      ST: '277.5 Marks'
    },
    downloadUrl: 'https://ssc.gov.in',
    releaseDate: '2026-06-17'
  },
  {
    id: 'upsc-prelims-cse-result-2026',
    title: 'UPSC Civil Services (IAS / IFS) Preliminary Exam 2026 Roll Number Merit List',
    org: 'Union Public Service Commission (UPSC)',
    meritListUrl: 'https://upsc.gov.in/sites/default/files/UPSC-Prelims-2026-Result.pdf',
    scoreCardUrl: 'https://upsc.gov.in/scorecard-prelims-2026',
    cutOff: {
      UR: '92.5 Marks (Estimated general index)',
      OBC: '89.2 Marks',
      SC: '78.5 Marks',
      ST: '75.2 Marks'
    },
    downloadUrl: 'https://upsc.gov.in',
    releaseDate: '2026-06-15'
  },
  {
    id: 'upsssc-junior-assistant-result-2026',
    title: 'UPSSSC Junior Assistant 1262 Posts Merit List & Typing Stage Qualification Status',
    org: 'Uttar Pradesh Subordinate Services Selection Commission (UPSSSC)',
    meritListUrl: 'https://upsssc.gov.in/Results/JA-1262-Selected-List.pdf',
    scoreCardUrl: 'https://upsssc.gov.in/check_scores',
    cutOff: {
      UR: '48.25 Marks',
      OBC: '48.25 Marks',
      SC: '41.50 Marks',
      ST: '38.25 Marks'
    },
    downloadUrl: 'https://upsssc.gov.in',
    releaseDate: '2026-06-15'
  },
  {
    id: 'nta-neet-ug-final-res-2026',
    title: 'NTA NEET UG 2026 Scorecard, Revised Rank List & All India Cutoffs',
    org: 'National Testing Agency (NTA)',
    meritListUrl: 'https://exams.nta.ac.in/NEET/',
    scoreCardUrl: 'https://exams.nta.ac.in/NEET/check_score',
    cutOff: {
      UR: '164 Marks (50th percentile index)',
      OBC: '129 Marks (40th percentile index)',
      SC: '129 Marks',
      ST: '129 Marks'
    },
    downloadUrl: 'https://exams.nta.ac.in/NEET/',
    releaseDate: '2026-06-15'
  },
  {
    id: 'ssc-gd-constable-res-2026',
    title: 'SSC GD Constable 2026 CBT Written Test Result & PET/PST Qualifier List',
    org: 'Staff Selection Commission (SSC)',
    meritListUrl: 'https://ssc.gov.in/GD_Constable_2026_Qualified_List.pdf',
    scoreCardUrl: 'https://ssc.gov.in/gd_scores',
    cutOff: {
      UR: '138.5 Marks (General ground)',
      OBC: '135.2 Marks',
      SC: '122.6 Marks',
      ST: '118.4 Marks'
    },
    downloadUrl: 'https://ssc.gov.in',
    releaseDate: '2026-06-15'
  },
  {
    id: 'rsmssb-ldc-result-2026',
    title: 'RSMSSB Rajasthan LDC / Clerk Grade-II Written Result 2026',
    org: 'Rajasthan Staff Selection Board (RSMSSB)',
    meritListUrl: 'https://rsmssb.rajasthan.gov.in/Static/Files/LDC_Written_MeritList_2026.pdf',
    scoreCardUrl: 'https://rsmssb.rajasthan.gov.in/ldc_scores',
    cutOff: {
      UR: '72.4%',
      OBC: '68.5%',
      SC: '58.1%',
      ST: '54.5%'
    },
    downloadUrl: 'https://rsmssb.rajasthan.gov.in',
    releaseDate: '2026-06-13'
  },
  {
    id: 'rpsc-ras-prelims-result-2026',
    title: 'RPSC Rajasthan RAS/RTS Prelims Exam Cutoff & Qualifier List 2026',
    org: 'Rajasthan Public Service Commission (RPSC)',
    meritListUrl: 'https://rpsc.rajasthan.gov.in/Static/Files/RAS_Prelims_Qualified_List_2026.pdf',
    scoreCardUrl: 'https://rpsc.rajasthan.gov.in/ras_prelims_scores',
    cutOff: {
      UR: '84.72 Marks',
      OBC: '84.72 Marks',
      SC: '71.32 Marks',
      ST: '76.24 Marks'
    },
    downloadUrl: 'https://rpsc.rajasthan.gov.in',
    releaseDate: '2026-06-13'
  },
  {
    id: 'raj-police-constable-res-2026',
    title: 'Rajasthan Police Constable Written selection List 2026',
    org: 'Rajasthan Police Department',
    meritListUrl: 'https://police.rajasthan.gov.in/Static/Files/Constable_MeritList_2026.pdf',
    scoreCardUrl: 'https://police.rajasthan.gov.in/scores',
    cutOff: {
      UR: '154 Marks',
      OBC: '148 Marks',
      SC: '136 Marks',
      ST: '130 Marks'
    },
    downloadUrl: 'https://police.rajasthan.gov.in',
    releaseDate: '2026-06-12'
  },
  {
    id: 'rpsc-grade1-result-2026',
    title: 'RPSC School Lecturer (Grade-I) 2025 Final Result & Merit',
    org: 'Rajasthan Public Service Commission (RPSC)',
    meritListUrl: 'https://rpsc.rajasthan.gov.in/final_results/school_lecturer_2025.pdf',
    scoreCardUrl: 'https://rpsc.rajasthan.gov.in/scorecard',
    cutOff: {
      UR: '298.5 Marks',
      OBC: '286.0 Marks',
      SC: '254.3 Marks',
      ST: '242.1 Marks'
    },
    downloadUrl: 'https://rpsc.rajasthan.gov.in',
    releaseDate: '2026-06-11'
  },
  {
    id: 'upsc-cse-final-res',
    title: 'UPSC Civil Services 2025 Final Final Result & Merit List',
    org: 'Union Public Service Commission',
    meritListUrl: 'https://upsc.gov.in/sites/default/files/Merit-List-IAS-2025.pdf',
    scoreCardUrl: 'https://upsc.gov.in/scorecard-ias-2025',
    cutOff: {
      UR: '953 Marks',
      OBC: '919 Marks',
      SC: '890 Marks',
      ST: '891 Marks'
    },
    downloadUrl: 'https://upsc.gov.in/final-results',
    releaseDate: '2026-06-05'
  },
  {
    id: 'rrb-alp-cbt2-res',
    title: 'RRB Assistant Loco Pilot (CEN 01/2025) CBT-2 Result',
    org: 'Railway Recruitment Boards',
    meritListUrl: 'https://www.rrbcdg.gov.in/ALP-cbt2-qualified-candidates.pdf',
    scoreCardUrl: 'https://rrbapply.gov.in/check-alp-score-card',
    cutOff: {
      UR: '68.5%',
      OBC: '62.0%',
      SC: '51.3%',
      ST: '47.8%'
    },
    downloadUrl: 'https://rrbcdg.gov.in',
    releaseDate: '2026-06-09'
  }
];

export const INITIAL_ANSWER_KEYS: AnswerKey[] = [
  { id: 'ssc-phase-12-answer-key-2026', title: 'SSC Selection Post Phase XII Official Answer Key with Candidate Response Sheets', org: 'Staff Selection Commission (SSC)', released: '2026-06-15', objectionsLimit: '2026-06-20', pdfUrl: 'https://ssc.gov.in/phase-12-response-key-link' },
  { id: 'ugc-net-june-key-2026', title: 'UGC NET June 2026 Provisional Solved Keys (Paper 1 & Paper 2)', org: 'National Testing Agency (NTA)', released: '2026-06-15', objectionsLimit: '2026-06-25', pdfUrl: 'https://ugcnet.nta.ac.in/provisional_key_june_2026.pdf' },
  { id: 'up-bed-jee-key-2026', title: 'UP Joint B.Ed Entrance Exam (JEE) 2026 Official Solved Answer Key', org: 'Bundelkhand University, Jhansi', released: '2026-06-15', objectionsLimit: '2026-06-22', pdfUrl: 'https://bujhansi.ac.in/up-bed-2026-solved-sheet.pdf' },
  { id: 'rsmssb-ldc-key-2026', title: 'RSMSSB Rajasthan LDC / Clerk Grade-II 2026 Provisional Key', org: 'RSMSSB Rajasthan', released: '2026-11-20', objectionsLimit: '2026-11-30', pdfUrl: 'https://rsmssb.rajasthan.gov.in/ldc_provisional_key.pdf' },
  { id: 'rsmssb-pashu-key-2526', title: 'RSMSSB Rajasthan Animal Attendant (पशु परिचारक) Solved OMR Key', org: 'RSMSSB Rajasthan', released: '2026-12-10', objectionsLimit: '2026-12-20', pdfUrl: 'https://rsmssb.rajasthan.gov.in/pashu_paricharak_key.pdf' },
  { id: 'rpsc-ras-key-2026', title: 'RPSC Rajasthan RAS/RTS Prelims GS Solved Answer Booklets', org: 'RPSC Rajasthan', released: '2026-09-18', objectionsLimit: '2026-09-28', pdfUrl: 'https://rpsc.rajasthan.gov.in/ras_prelims_key_2026.pdf' },
  { id: 'raj-constable-key-2026', title: 'Rajasthan Police Constable Written Exam Set A-B-C-D Answers', org: 'Rajasthan Police Department', released: '2026-08-01', objectionsLimit: '2026-08-10', pdfUrl: 'https://police.rajasthan.gov.in/constable_keys.pdf' },
  { id: 'ssc-mts-key-2026', title: 'SSC MTS Math/General English 2026 Shift Answer Sheet', org: 'SSC', released: '2026-06-08', objectionsLimit: '2026-06-18', pdfUrl: 'https://ssc.gov.in/mts_answer_sheet_2026.pdf' },
  { id: 'rrb-alp-key-2026', title: 'RRB ALP General Science Provisional Solved Keys', org: 'RRB Railways', released: '2026-06-05', objectionsLimit: '2026-06-15', pdfUrl: 'https://rrbcdg.gov.in/alp_provisional_keys.pdf' },
  { id: 'upsc-cse-key-2026', title: 'UPSC Civil Services CSE Prelims GS Booklet Correct Keys', org: 'UPSC', released: '2026-06-01', objectionsLimit: '2026-06-11', pdfUrl: 'https://upsc.gov.in/cse_prelims_key_2026.pdf' }
];

const ALL_MOCK_TESTS: MockTest[] = [
  {
    id: 'ssc-cgl-tier1-100q-grand-mock',
    title: 'SSC CGL Tier-1 100-Question Grand Mock (वास्तविक परीक्षा CBT इंटरफेस)',
    category: 'SSC CGL Exam Prep',
    durationMinutes: 60,
    questions: getSSCCGL100Questions(),
    totalMarks: 200,
    negativeMark: 0.50
  },
  {
    id: 'ssc-cgl-tier1-full-spec-1',
    title: 'SSC CGL Tier-1 High-Quality Mock Test (Tier-1 विशेष परीक्षा)',
    category: 'SSC CGL Exam Prep',
    durationMinutes: 15,
    questions: [
      {
        id: 'cgl-t1-q1',
        text: 'The compound interest on a sum of ₹12,000 for 1 year at 10% per annum, compounded half-yearly is: / 10% वार्षिक ब्याज की दर से 1 वर्ष के लिए ₹12,000 की राशि पर चक्रवृद्धि ब्याज क्या होगा, यदि ब्याज अर्ध-वार्षिक रूप से संयोजित होता है?',
        options: ['(a) ₹1,230', '(b) ₹1,200', '(c) ₹1,260', '(d) ₹1,300'],
        correctOptionIndex: 0,
        explanation: 'For half-yearly compounding: Rate = 10% / 2 = 5% per half-year, Time = 2 half-years. Amount = 12000 * (1 + 5/100)^2 = 12000 * (21/20)^2 = 12000 * 441 / 400 = 30 * 441 = ₹13,230. Compound Interest = Amount - Principal = 13230 - 12000 = ₹1,230.'
      },
      {
        id: 'cgl-t1-q2',
        text: 'In a code language, if "SARKARI" is written as "TBSCBSJ", how is "STUDENT" written in that language? / एक कूट भाषा में, यदि "SARKARI" को "TBSCBSJ" लिखा जाता है, तो उसी भाषा में "STUDENT" को कैसे लिखा जाएगा?',
        options: ['(a) TUVFEOU', '(b) TVUEFOU', '(c) TTVEFOU', '(d) TVVEFOU'],
        correctOptionIndex: 1,
        explanation: 'The pattern is +1 for each letter: S(+1)=T, T(+1)=U, U(+1)=V, D(+1)=E, E(+1)=F, N(+1)=O, T(+1)=U. Therefore, "STUDENT" becomes "TVUEFOU".'
      },
      {
        id: 'cgl-t1-q3',
        text: 'Select the synonym of the given word: "OBSTINATE" / दिए गए शब्द का पर्यायवाची चुनिए: "OBSTINATE"',
        options: ['(a) Docile', '(b) Stubborn', '(c) Flexible', '(d) Obedient'],
        correctOptionIndex: 1,
        explanation: '"Obstinate" means stubbornly refusing to change one\'s opinion or chosen course of action. Therefore, "Stubborn" is the correct synonym.'
      },
      {
        id: 'cgl-t1-q4',
        text: 'Which Indian classical dance form originates from the state of Andhra Pradesh? / कौन सा भारतीय शास्त्रीय नृत्य आंध्र प्रदेश राज्य से उत्पन्न हुआ है?',
        options: ['(a) Kathakali', '(b) Bharatanatyam', '(c) Kuchipudi', '(d) Kathak'],
        correctOptionIndex: 2,
        explanation: 'Kuchipudi is one of the major Indian classical dances that originated in a village named Kuchipudi in Andhra Pradesh.'
      },
      {
        id: 'cgl-t1-q5',
        text: 'If x + 1/x = 5, then the value of x^2 + 1/x^2 is: / यदि x + 1/x = 5 है, तो x^2 + 1/x^2 का मान क्या होगा?',
        options: ['(a) 23', '(b) 25', '(c) 27', '(d) 21'],
        correctOptionIndex: 0,
        explanation: 'Squaring both sides: (x + 1/x)^2 = 5^2 => x^2 + 2(x)(1/x) + 1/x^2 = 25 => x^2 + 2 + 1/x^2 = 25 => x^2 + 1/x^2 = 25 - 2 = 23.'
      },
      {
        id: 'cgl-t1-q6',
        text: 'Who has the authority to call a joint sitting of both Houses of Parliament in India? / भारत में संसद के दोनों सदनों की संयुक्त बैठक बुलाने का अधिकार किसके पास है?',
        options: ['(a) Prime Minister', '(b) Speaker of Lok Sabha', '(c) President of India', '(d) Vice-President'],
        correctOptionIndex: 2,
        explanation: 'According to Article 108 of the Indian Constitution, the President of India has the authority to summon a joint sitting of both houses of Parliament.'
      },
      {
        id: 'cgl-t1-q7',
        text: 'Select the correctly spelt word from the options / दिए गए विकल्पों में से सही वर्तनी वाले शब्द का चयन करें:',
        options: ['(a) Committe', '(b) Committee', '(c) Commitee', '(d) Commitey'],
        correctOptionIndex: 1,
        explanation: 'The correct spelling is "Committee" which has double m, double t, and double e.'
      },
      {
        id: 'cgl-t1-q8',
        text: 'Pointing to a lady in a photograph, Sunil said, "Her father-in-law\'s only son is my father." How is Sunil related to the lady? / एक तस्वीर में एक महिला की ओर इशारा करते हुए सुनील ने कहा, "उसके ससुर का इकलौता बेटा मेरे पिता हैं।" सुनील का उस महिला से क्या संबंध है?',
        options: ['(a) Brother', '(b) Son', '(c) Nephew', '(d) Cousin'],
        correctOptionIndex: 1,
        explanation: 'The lady\'s father-in-law\'s only son is her husband. If the lady\'s husband is Sunil\'s father, then Sunil is the son of that lady.'
      },
      {
        id: 'cgl-t1-q9',
        text: 'Swaraj is my birthright and I shall have it! Who gave this slogan? / "स्वराज मेरा जन्मसिद्ध अधिकार है और मैं इसे लेकर रहूँगा!" यह नारा किसने दिया था?',
        options: ['(a) Bal Gangadhar Tilak', '(b) Subhash Chandra Bose', '(c) Bhagat Singh', '(d) Mahatma Gandhi'],
        correctOptionIndex: 0,
        explanation: 'Bal Gangadhar Tilak coined and popularised this famous slogan to inspire nationalist devotion during the Indian freedom struggle.'
      },
      {
        id: 'cgl-t1-q10',
        text: 'The ratio of the speed of three cars is 2:3:4. What is the ratio of time taken by these cars to travel the same distance? / तीन कारों की गति का अनुपात 2:3:4 है। समान दूरी तय करने के लिए इन कारों द्वारा लिए गए समय का अनुपात क्या होगा?',
        options: ['(a) 2:3:4', '(b) 4:3:2', '(c) 6:4:3', '(d) 12:8:6'],
        correctOptionIndex: 2,
        explanation: 'Time is inversely proportional to Speed when distance is constant. So, Ratio of Time = 1/2 : 1/3 : 1/4 = 12/2 : 12/3 : 12/4 = 6 : 4 : 3.'
      }
    ],
    totalMarks: 20,
    negativeMark: 0.50
  },
  {
    id: 'upsc-gs-1',
    title: 'UPSC Civil Services General Studies Paper I Prelims Mock',
    category: 'UPSC Civil Services Prep',
    durationMinutes: 15,
    questions: [
      {
        id: 'q4',
        text: 'Which Article of the Constitution of India provides for the "Abolition of Untouchability"?',
        options: ['Article 14', 'Article 17', 'Article 19', 'Article 21'],
        correctOptionIndex: 1,
        explanation: 'Article 17 of the Indian Constitution declares "Untouchability is abolished and its practice in any form is forbidden".'
      },
      {
        id: 'q5',
        text: 'Consider the following about the Indus Valley Civilization: 1. Harappa was situated on the banks of river Ravi. 2. Great Bath was discovered at Mohenjo-daro. Which statement is/are correct?',
        options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
        correctOptionIndex: 2,
        explanation: 'Both statements are true. Harappa stands near the Ravi river, and the Great Bath structure was excavated at Mohenjo-daro.'
      },
      {
        id: 'q6',
        text: 'Which Indian state shares the longest land border with Bangladesh?',
        options: ['West Bengal', 'Assam', 'Meghalaya', 'Tripura'],
        correctOptionIndex: 0,
        explanation: 'West Bengal shares the longest absolute border length with neighboring Bangladesh, spanning approximately 2,217 kilometers.'
      }
    ],
    totalMarks: 6,
    negativeMark: 0.66
  },
  {
    id: 'ssc-cgl-science-mock-1',
    title: 'SSC CGL General Science Official Exam Mock (Clean Layout)',
    category: 'SSC CGL Exam Prep',
    durationMinutes: 20,
    questions: [
      {
        id: 'sc-q1',
        text: 'Q1. Who is the author of the book \'Wise and Otherwise: A Salute to Life\'? / \'वाइज एंड अदरवाइज: ए सैल्यूट टू लाइफ\' पुस्तक के लेखक कौन हैं?',
        options: ['(a) Amrita Pritam', '(b) Zoya Hasan', '(c) Kiran Desai', '(d) Sudha Murthy'],
        correctOptionIndex: 3,
        explanation: 'Sudha Murthy is the author of the book \'Wise and Otherwise: A Salute to Life\'. She is the chairperson of the Infosys Foundation and a prominent philanthropist.'
      },
      {
        id: 'sc-q2',
        text: 'Q2. The Indian National Congress session of September 1920 was held at / सितंबर 1920 का भारतीय राष्ट्रीय कांग्रेस अधिवेशन आयोजन _____ में किया गया था',
        options: ['(a) Lucknow', '(b) Nagpur', '(c) Calcutta', '(d) Madras'],
        correctOptionIndex: 2,
        explanation: 'The special session of the Indian National Congress in September 1920 was held in Calcutta under the presidentship of Lala Lajpat Rai to pass the Non-Cooperation resolution.'
      },
      {
        id: 'sc-q3',
        text: 'Q3. Which of the following monasteries is located in Sikkim? / सिक्किम में निम्नलिखित में से कौन सा मठ स्थित है?',
        options: ['(a) Tabo', '(b) Kye', '(c) Rumtek', '(d) Hemis'],
        correctOptionIndex: 2,
        explanation: 'Rumtek Monastery, also called the Dharmachakra Centre, is a prominent gompa located near Gangtok, Sikkim.'
      },
      {
        id: 'sc-q4',
        text: 'Q4. Select the correct pair of dance form and its state. / नृत्य शैली और उसके राज्य की सही युग्म का चयन करें।',
        options: ['(a) Thang Ta - Bihar', '(b) Dalkhai - Karnataka', '(c) Kalbelia - Himachal Pradesh', '(d) Padayani - Kerala'],
        correctOptionIndex: 3,
        explanation: 'Padayani is a traditional ritualistic folk dance form from Central Kerala. Other pairings are incorrect: Thang Ta is from Manipur, Dalkhai is from Odisha, and Kalbelia is from Rajasthan.'
      },
      {
        id: 'sc-q5',
        text: 'Q5. The Pritzker prize is an international award given to recognise contribution in the field of _____. / प्रित्जकर पुरस्कार एक अंतरराष्ट्रीय पुरस्कार है जिसे ______ क्षेत्र में योगदान को मान्यता देने के लिए दिया जाता है',
        options: ['(a) literature', '(b) mathematics', '(c) architecture', '(d) medicine'],
        correctOptionIndex: 2,
        explanation: 'The Pritzker Architecture Prize is awarded annually to honor a living architect or architects whose built work demonstrates significant talent, vision, and commitment.'
      },
      {
        id: 'sc-q6',
        text: 'Q6. Which Indian male cricketer won the BCCI CK Nayudu Lifetime Achievement Award for the year 2019? / किस भारतीय पुरुष क्रिकेटर ने वर्ष 2019 का बी.सी.सी.आई. सी.के नायडू लाइफटाइम अचीवमेंट पुरस्कार जीता?',
        options: ['(a) Sachin Tendulkar', '(b) Rahul Dravid', '(c) K Srikanth', '(d) Sunil Gavaskar'],
        correctOptionIndex: 2,
        explanation: 'Former Indian cricket captain Krishnamachari Srikkanth (K Srikanth) was awarded the prestigious BCCI CK Nayudu Lifetime Achievement Award for 2019.'
      },
      {
        id: 'sc-q7',
        text: 'Q7. With reference to the Vedangas, which of the following terms denotes \'Ritual\'? / वेदांगों के संदर्भ में, निम्नलिखित में से कौन सा शब्द \'अनुष्ठान\' को दर्शाता है?',
        options: ['(a) Shiksha', '(b) Kalpa', '(c) Vyakarana', '(d) Chanda'],
        correctOptionIndex: 1,
        explanation: 'Kalpa Vedanga denotes sacred rituals, ceremonies and rules. It includes Shrautasutras, Grihyasutras, and Dharmasutras.'
      },
      {
        id: 'sc-q8',
        text: 'Q8. In December 2019, the Rohtang passageway in Himachal Pradesh was renamed as: / दिसंबर 2019 में, हिमाचल प्रदेश में रोहतांग गलियारे (दर्रे) का नाम बदलकर क्या रखा गया:',
        options: ['(a) Bose Tunnel', '(b) Atal Tunnel', '(c) Mukherjee Tunnel', '(d) Swaraj Tunnel'],
        correctOptionIndex: 1,
        explanation: 'The Rohtang Tunnel in Himachal Pradesh was renamed as the Atal Tunnel to honor former Prime Minister Atal Bihari Vajpayee.'
      },
      {
        id: 'sc-q9',
        text: 'Q9. Which among the following has its refractive index closest to that of crown glass? / निम्नलिखित में से कौन सा अपवर्तनांक सूचकांक क्राउन ग्लास के निकटतम है?',
        options: ['(a) Canada balsam', '(b) Ruby', '(c) Sapphire', '(d) Diamond'],
        correctOptionIndex: 0,
        explanation: 'Canada balsam has a refractive index of approximately 1.55, which is closest to that of crown glass (1.50 - 1.60).'
      },
      {
        id: 'sc-q10',
        text: 'Q10. The scientific study of a cell is called: / सेल के वैज्ञानिक अध्ययन को कहा जाता है:',
        options: ['(a) taxonomy', '(b) physiology', '(c) histology', '(d) cytology'],
        correctOptionIndex: 3,
        explanation: 'Cytology (also known as cell biology) is the scientific study of cells, their structures, function, and chemistry.'
      },
      {
        id: 'sc-q11',
        text: 'Q11. The Council of Ministers during the time of Shivaji Maharaj was known as: / शिवाजी महाराज के शासन-काल में मंत्रिपरिषद को किस नाम से जाना जाता था:',
        options: ['(a) Ashta Diggajas', '(b) Navaratnas', '(c) Ashta Pradhan', '(d) Agraharam'],
        correctOptionIndex: 2,
        explanation: 'The council of eight ministers that administered the Maratha empire during Chhatrapati Shivaji Maharaj\'s reign was called the Ashta Pradhan.'
      },
      {
        id: 'sc-q12',
        text: 'Q12. The power of a lens is -2.0 D. Here \'D\' stands for: / एक लेंस की प्रकाशीय शक्ति (पावर) -2.0 D है यहां \'D\' का क्या अर्थ है?',
        options: ['(a) degree', '(b) distance', '(c) dioptre', '(d) dilation'],
        correctOptionIndex: 2,
        explanation: 'Here, \'D\' stands for Dioptre, which is the unit of measurement of the optical power of a lens or curved mirror, equal to the reciprocal of the focal length in meters.'
      },
      {
        id: 'sc-q13',
        text: 'Q13. Which among the following is NOT an insulator? / निम्नलिखित में से कौन एक इन्सुलेटर नहीं है?',
        options: ['(a) Glass', '(b) Dry Paper', '(c) Mercury', '(d) Ebonite'],
        correctOptionIndex: 2,
        explanation: 'Mercury is a heavy, liquid metal. It is a good conductor of electricity, meaning it is NOT an insulator.'
      },
      {
        id: 'sc-q14',
        text: 'Q14. Pradhan Mantri Jeevan Jyoti Bima Yojana offers a protection term insurance cover of ____ to the insurer. / प्रधानमंत्री जीवन ज्योति बीमा योजना बीमाकर्ता को _____ का सुरक्षा बीमा रक्षण प्रदान करती है।',
        options: ['(a) 3 Lakh', '(b) 4 Lakh', '(c) 2 Lakh', '(d) 5 Lakh'],
        correctOptionIndex: 2,
        explanation: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) offers a renewable one-year life insurance cover of Rs. 2 Lakh in case of death due to any cause.'
      },
      {
        id: 'sc-q15',
        text: 'Q15. For which game has the Father of Leander Paes been a member of the Indian National Team? / लिएंडर पेस के पिता किस खेल के लिए भारतीय राष्ट्रीय टीम के सदस्य रहे हैं?',
        options: ['(a) Basketball', '(b) Tennis', '(c) Hockey', '(d) Badminton'],
        correctOptionIndex: 2,
        explanation: 'Leander Paes\' father Vece Paes was a member of the Indian field hockey team that won the bronze medal at the 1972 Munich Olympics.'
      },
      {
        id: 'sc-q16',
        text: 'Q16. Pravasi Bharatiya Divas is celebrated on: / प्रवासी भारतीय दिवस कब मनाया जाता है:',
        options: ['(a) 9th January', '(b) 1st January', '(c) 2nd January', '(d) 8th January'],
        correctOptionIndex: 0,
        explanation: 'Pravasi Bharatiya Divas is celebrated on 9th January to mark the contribution of the overseas Indian community and commemoration of Mahatma Gandhi\'s return from South Africa in 1915.'
      },
      {
        id: 'sc-q17',
        text: 'Q17. Where is the Dharmraja Ratha monument located? / धर्मराज रथ स्मारक कहाँ स्थित है?',
        options: ['(a) Mahabalipuram', '(b) Suchindram', '(c) Khajuraho', '(d) Kanchipuram'],
        correctOptionIndex: 0,
        explanation: 'Dharmaraja Ratha is one of the monolithic rock-cut Ratha monuments located at Mahabalipuram (Mamallapuram) in Tamil Nadu, India.'
      },
      {
        id: 'sc-q18',
        text: 'Q18. Which among the following is a cation? / निम्नलिखित में से क्या एक धनायन (कैशन) है?',
        options: ['(a) Iodide', '(b) Ammonium', '(c) Fluoride', '(d) Chloride'],
        correctOptionIndex: 1,
        explanation: 'Ammonium (NH4+) is a positively charged polyatomic ion, which makes it a cation. Iodide, fluoride, and chloride are anions.'
      },
      {
        id: 'sc-q19',
        text: 'Q19. Which of the following Articles of the Constitution of India guarantees the Right to Freedom of Religion? / भारत के संविधान के निम्नलिखित में से कौन सा अनुच्छेद धार्मिक स्वतंत्रता के अधिकार की गारंटी देता है?',
        options: ['(a) Articles 13-14', '(b) Articles 19-22', '(c) Articles 23-24', '(d) Articles 25-28'],
        correctOptionIndex: 3,
        explanation: 'Articles 25 to 28 of the Indian Constitution guarantee the Right to Freedom of Religion to all citizens and residents of India.'
      },
      {
        id: 'sc-q20',
        text: 'Q20. In which year was the first amendment to the Constitution of India made? / भारत के संविधान में पहला संशोधन किस वर्ष किया गया था?',
        options: ['(a) 1953', '(b) 1952', '(c) 1951', '(d) 1950'],
        correctOptionIndex: 2,
        explanation: 'The first amendment to the Indian Constitution was passed in 1951. It introduced several articles and created the Ninth Schedule to protect land reform laws.'
      },
      {
        id: 'sc-q21',
        text: 'Q21. Who was appointed as brand ambassador of Visa - the payment technology company in 2019? / 2019 में, किसे भुगतान प्रौद्योगिकी कंपनी - वीजा का ब्रांड एंबेसडर नियुक्त किया गया था?',
        options: ['(a) PT Usha', '(b) Dutee Chand', '(c) Sania Mirza', '(d) P.V. Sindhu'],
        correctOptionIndex: 3,
        explanation: 'In 2019, world badminton champion P.V. Sindhu was appointed as the brand ambassador of Visa.'
      },
      {
        id: 'sc-q22',
        text: 'Q22. Which of the following states does NOT share its boundary with Bangladesh? / निम्नलिखित में से कौन सा राज्य बांग्लादेश के साथ अपनी सीमा साझा नहीं करता है?',
        options: ['(a) Assam', '(b) Manipur', '(c) Tripura', '(d) Meghalaya'],
        correctOptionIndex: 1,
        explanation: 'Manipur shares its standard boundary with Myanmar and other states but does NOT border Bangladesh.'
      },
      {
        id: 'sc-q23',
        text: 'Q23. Which of the following rivers forms the Dhuandhar waterfall near Jabalpur? / निम्नलिखित नदियों में से कौन सी नदी जबलपुर के पास धुआँधार जल-प्रपात का निर्माण करती है?',
        options: ['(a) Narmada', '(b) Luni', '(c) Tapi', '(d) Tungabhadra'],
        correctOptionIndex: 0,
        explanation: 'The Narmada River forms the gorgeous Dhuandhar Falls in Bhedaghat near Jabalpur in Madhya Pradesh.'
      },
      {
        id: 'sc-q24',
        text: 'Q24. What does \'T\' stand for in ATM? / ATM में \'T\' का क्या अर्थ है?',
        options: ['(a) Transfer', '(b) Trunk', '(c) Transaction', '(d) Teller'],
        correctOptionIndex: 3,
        explanation: 'In ATM, \'T\' stands for Teller. The full acronym stands for Automated Teller Machine.'
      },
      {
        id: 'sc-q25',
        text: 'Q25. Which of the following pairs is CORRECT with reference to mountain passes? / निम्नलिखित में से कौन सा युग्म पहाड़ी दर्रों के संदर्भ में सही है?',
        options: ['(a) Rohtang - Sikkim', '(b) Lipulekh - Uttarakhand', '(c) Bomdila - Himachal Pradesh', '(d) Nathula - Arunachal Pradesh'],
        correctOptionIndex: 1,
        explanation: 'Lipulekh - Uttarakhand is the correct pair. Rohtang pass is in Himachal Pradesh, Bomdila pass is in Arunachal Pradesh, and Nathula pass is in Sikkim.'
      }
    ],
    totalMarks: 50,
    negativeMark: 0.50
  }
];

const ALL_MOCK_TESTS_WITH_EXTENDED = [
  ...ALL_MOCK_TESTS.filter(t => t.id !== 'upsc-gs-1' && t.id !== 'ssc-cgl-science-mock-1' && t.id !== 'ssc-cgl-tier1-full-spec-1'),
  ...generateAllExtendedMocks()
];

export const INITIAL_MOCK_TESTS: MockTest[] = ALL_MOCK_TESTS_WITH_EXTENDED;

export const INITIAL_CURRENT_AFFAIRS: CurrentAffair[] = [
  {
    id: 'ca-1',
    title: 'G7 Summit 2026: Major Green Finance Partnerships Signed',
    date: '2026-06-12',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/G7_Summit_2026_Analysis.pdf',
    content: 'The 52nd G7 summit convened with significant emphasis on renewable energy infrastructure. A joint $120 Billion sovereign-backed clean energy funding framework was signed to assist developing nations in transitioning away from fossil fuel reliant power plants.'
  },
  {
    id: 'ca-2',
    title: 'Ministry of IT Launches "Vidyut AI" for Rural Education',
    date: '2026-06-11',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Vidyut_AI_Rural_Scheme.pdf',
    content: 'The Indian Ministry of Electronics & IT introduced Vidyut AI, an offline-compatible server that helps deliver real-time interactive multilingual educational support in areas experiencing low internet connectivity.'
  },
  {
    id: 'ca-3',
    title: 'Indian Cricket Team Sweeps Bilateral Series in Australia',
    date: '2026-06-09',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Sports_Roundup_June_2026.pdf',
    content: 'The Indian cricket team concluded a historic clean sweep against Australia in Sydney, winning all three ODI fixtures. A young squad led by captain Shubman Gill secured the series trophy.'
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-1',
    title: 'How to Crack SBI Clerk on First Attempt: Ultimate Guide',
    category: 'Career Guidance',
    author: 'Sunil Kumar (Sarkari Hub Expert)',
    summary: 'Master clerical exams with a proven study routine. This guide details key concepts, recommended books, and essential timing exercises.',
    content: 'Starting exam prep for banking requires systematic effort. Banks appreciate accuracy, calculation speed, and precise grammar skills. 1) Direct your energy to foundational simplification, number series tables, and quadratics which hold significant weight. 2) Practice reading long financial editorials to boost comprehension efficiency. 3) Dedicate time to online sectional mock exams with strict digital countdowns to acclimatize yourself to immediate decision making pressure.',
    readTime: '5 min read',
    date: '2026-06-12'
  },
  {
    id: 'blog-2',
    title: 'UPSC CSE Prelims Last Month Revision Blueprint',
    category: 'Preparation Strategy',
    author: 'Deepika Sen (IAS Academy Mentor)',
    summary: 'The final thirty days of UPSC preparation can elevate your outcome. Learn how to allocate mock review hours, memorize crucial polity articles, and brush up on economics curves.',
    content: 'Candidate success relies heavily on consolidated review rather than onboarding new material at the very end of their cycle. Prioritize the core subjects: Modern History, Fundamental Rights, Ecology indicators, and basic Balance of Payments concepts. Revisit high-yield past questions to identify recurring traps or semantic cues, ensuring confidence on the actual exam morning.',
    readTime: '7 min read',
    date: '2026-06-10'
  }
];
