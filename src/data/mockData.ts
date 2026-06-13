import { GovJob, AdmitCard, JobResult, MockTest, CurrentAffair, Blog } from '../types';

export const INITIAL_JOBS: GovJob[] = [
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

export const INITIAL_MOCK_TESTS: MockTest[] = [
  {
    id: 'ssc-cgl-quant-1',
    title: 'SSC CGL Tier-1 Quantitative Aptitude booster',
    category: 'SSC CGL Exam Prep',
    durationMinutes: 10,
    questions: [
      {
        id: 'q1',
        text: 'The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?',
        options: ['70 kg', '75 kg', '80 kg', '85 kg'],
        correctOptionIndex: 3,
        explanation: 'Increase in total weight = 8 * 2.5 = 20 kg. Since the replaced person was 65 kg, the weight of the new person = 65 + 20 = 85 kg.'
      },
      {
        id: 'q2',
        text: 'If A:B = 2:3 and B:C = 4:5, find the compounded ratio of A:C.',
        options: ['8:15', '10:12', '12:15', '3:5'],
        correctOptionIndex: 0,
        explanation: 'A/C = (A/B) * (B/C) = (2/3) * (4/5) = 8/15. So, the ratio is 8:15.'
      },
      {
        id: 'q3',
        text: 'A dealer marks his goods 20% costlier than Cost Price, but gives a 10% discount on marked price. What is his net gain or loss percent?',
        options: ['10% Gain', '8% Gain', '12% Gain', '2% Loss'],
        correctOptionIndex: 1,
        explanation: 'Let CP = 100. Marked Price (MP) = 120. Selling Price after 10% discount = 120 - 120*(10/100) = 120 - 12 = 108. Net percentage gain = 108 - 100 = 8% gain.'
      }
    ],
    totalMarks: 6,
    negativeMark: 0.5
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
  }
];

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
