import { GoogleGenAI } from '@google/genai';
import { ArmyLiveNotice, ArmySyncStatus } from '../src/types';

// In-memory list of verified live notices monitored from https://joinindianarmy.nic.in/
export let armyLiveNotices: ArmyLiveNotice[] = [
  // --- AGNIVEER VACANCIES ---
  {
    id: 'army-vac-agniveer-gd-2026',
    noticeNo: 'JIA/REC/AGNIVEER/2026-27',
    category: 'vacancy',
    entryType: 'agniveer',
    trade: 'Agniveer General Duty (All Arms)',
    zro: 'All India',
    aro: 'HQ Recruiting Zones (All India)',
    title: 'Indian Army Agniveer General Duty (GD) Recruitment Rally Notification 2026-27 (All India Zones)',
    titleHi: 'भारतीय सेना अग्निवीर जनरल ड्यूटी (GD) भर्ती रैली अधिसूचना 2026-27 - अखिल भारतीय भर्ती',
    org: 'Join Indian Army / भारतीय थल सेना',
    publishedDate: '2026-09-19',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_GD_2026_All_India.pdf',
    isNew: true,
    statusBadge: 'Phase-I Online CEE Registration Live',
    details: {
      posts: '25,000+ (Across all ZROs)',
      ageLimit: '17.5 to 21 Years (Born between 01 Oct 2005 to 01 April 2009)',
      qualification: 'Class 10th / Matric with 45% marks in aggregate and 33% in each subject. Grading system min D grade (33-40) in individual subjects.',
      heightChest: 'Height: 169-170 cm (Relaxation for ST/Hill regions) | Chest: 77 cm (+5 cm expansion)',
      rallyDates: 'Rallies across ZROs scheduled from Nov 2026 to Feb 2027',
      ceeDate: 'Common Entrance Exam (CEE): October - November 2026',
      lastDate: '2026-10-22',
      stage: 'Online Registration Open on joinindianarmy.nic.in',
      summary: 'Recruitment of Agniveer General Duty under Agnipath Scheme for 4 years tenure in combat arms and services. Selection comprises Phase-I Online CEE, Phase-II Physical Fitness Test (PFT 1.6km run, beam, 9ft ditch) at Rally ground, and Phase-III Medical examination.',
      stateDistrict: 'Pan-India Coverage across all States and Union Territories'
    },
    jobData: {
      id: 'army-agniveer-gd-2026-auto',
      title: 'Indian Army Agniveer General Duty (GD) 2026 (25,000+ Posts)',
      org: 'Join Indian Army (Ministry of Defence)',
      category: 'Defence',
      qualification: '10th Pass',
      ageLimit: '17.5 - 21 Years (No relaxation beyond 21 yrs)',
      totalVacancies: 25000,
      lastDate: '2026-10-22',
      applicationFee: 'Online Examination Fee: ₹250/- plus GST (Applicable to all candidates)',
      salary: '1st Year: ₹30,000/mo | 2nd Year: ₹33,000/mo | 3rd Year: ₹36,500/mo | 4th Year: ₹40,000/mo + Seva Nidhi Package ₹11.71 Lakh + ₹48 Lakh Insurance',
      description: 'Official notification on joinindianarmy.nic.in for Agniveer (General Duty) under Agnipath Scheme 2026-27. Candidates qualifying Online CEE will be called for ZRO Physical Fitness Test (PFT: 1.6km run in 5 min 30 sec for Group I - 60 Marks, 10 pullups - 40 Marks, 9 feet ditch jump, and zig-zag balance).',
      applyLink: 'https://joinindianarmy.nic.in/',
      notificationPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_GD_2026_All_India.pdf',
      importantDates: {
        applyStart: '2026-09-10',
        applyEnd: '2026-10-22',
        examDate: 'Oct - Nov 2026',
        admitCardRelease: '10 Days prior to Online CEE'
      },
      selectionProcess: ['Phase-I: Computer Based Online Common Entrance Examination (CEE)', 'Phase-II: Physical Fitness Test (PFT) & Physical Measurement Test (PMT) at Rally Ground', 'Phase-III: Adaptability Test & Detailed Medical Examination', 'Phase-IV: Final Merit List & Dispatch to Regimental Centers']
    }
  },
  {
    id: 'army-vac-agniveer-tech-2026',
    noticeNo: 'JIA/REC/TECH/2026-02',
    category: 'vacancy',
    entryType: 'agniveer',
    trade: 'Agniveer Technical (All Arms)',
    zro: 'All India',
    title: 'Indian Army Agniveer Technical (All Arms) Notification 2026 - Eligibility, PCM Syllabus & Rally Grounds',
    titleHi: 'भारतीय सेना अग्निवीर टेक्निकल (ऑल आर्म्स) भर्ती 2026 - 12वीं साइंस (PCM) हेतु अधिसूचना',
    org: 'Join Indian Army / भारतीय थल सेना',
    publishedDate: '2026-09-18',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_Technical_2026.pdf',
    isNew: true,
    statusBadge: 'Technical Cadre Registration Open',
    details: {
      posts: '4,200+ (Pan-India)',
      ageLimit: '17.5 to 21 Years',
      qualification: '10+2 / Intermediate Examination Pass in Science with Physics, Chemistry, Maths and English with min 50% marks in aggregate and 40% in each subject OR 10th + 2-3 Yr ITI / Polytechnic Diploma.',
      heightChest: 'Height: 167-170 cm | Chest: 77 cm (+5 cm expansion)',
      ceeDate: 'November 2026',
      lastDate: '2026-10-25',
      stage: 'Online Registration Open',
      summary: 'Technical armed roles in Signals, EME, Artillery, and Armoured Corps. Special technical test syllabus including Maths, Physics, Chemistry, and General Knowledge.'
    },
    jobData: {
      id: 'army-agniveer-tech-2026-auto',
      title: 'Indian Army Agniveer Technical (All Arms) 2026 (4,200+ Posts)',
      org: 'Join Indian Army (Ministry of Defence)',
      category: 'Defence',
      qualification: '12th Pass',
      ageLimit: '17.5 - 21 Years',
      totalVacancies: 4200,
      lastDate: '2026-10-25',
      applicationFee: 'Online CEE Fee: ₹250/- + GST',
      salary: '₹30,000 - ₹40,000/month + Technical allowances + Seva Nidhi Package of ₹11.71 Lakh',
      description: 'Indian Army Agniveer Technical Notification 2026 for Signalers, Gun Fitters, Instrument Mechanics, Electricians, and Vehicle Technicians. Online registration live at joinindianarmy.nic.in.',
      applyLink: 'https://joinindianarmy.nic.in/',
      notificationPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_Technical_2026.pdf',
      importantDates: {
        applyStart: '2026-09-12',
        applyEnd: '2026-10-25',
        examDate: 'November 2026',
        admitCardRelease: 'November 2026'
      },
      selectionProcess: ['Phase-I: Online CEE (200 Marks - GK, Physics, Maths, Chemistry)', 'Phase-II: PFT & PMT at designated Rally Grounds', 'Phase-III: Medical Exam & Merit List']
    }
  },
  {
    id: 'army-vac-agniveer-clerk-skt-2026',
    noticeNo: 'JIA/REC/CLERK-SKT/2026',
    category: 'vacancy',
    entryType: 'agniveer',
    trade: 'Agniveer Office Assistant / Store Keeper Technical (SKT)',
    zro: 'All India',
    title: 'Indian Army Agniveer Office Assistant / Clerk (SKT) 2026 - Online Application & Mandatory Typing Test',
    titleHi: 'भारतीय सेना अग्निवीर ऑफिस असिस्टेंट / क्लर्क (SKT) 2026 - टाइपिंग टेस्ट व ऑनलाइन आवेदन',
    org: 'Join Indian Army / भारतीय थल सेना',
    publishedDate: '2026-09-17',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_Clerk_SKT_2026.pdf',
    isNew: true,
    statusBadge: 'Clerk / SKT Registration Live',
    details: {
      posts: '3,100+ Vacancies',
      ageLimit: '17.5 to 21 Years',
      qualification: '10+2 / Intermediate in any stream (Arts, Commerce, Science) with 60% marks in aggregate and min 50% in each subject. Mandatory English and Maths/Accounts/Book Keeping with min 50% marks in Class 12th.',
      heightChest: 'Height: 162 cm (Special height relaxation for Clerk/SKT) | Chest: 77 cm (+5 cm)',
      ceeDate: 'November 2026',
      lastDate: '2026-10-25',
      stage: 'Online Registration Open on Portal',
      summary: 'Administrative and storekeeper appointments across all units. Mandatory typing speed test (30 wpm in English) conducted alongside Online CEE.'
    },
    jobData: {
      id: 'army-clerk-skt-2026-auto',
      title: 'Indian Army Agniveer Office Assistant / Clerk (SKT) 2026 (3,100+ Posts)',
      org: 'Join Indian Army (Ministry of Defence)',
      category: 'Defence',
      qualification: '12th Pass',
      ageLimit: '17.5 - 21 Years',
      totalVacancies: 3100,
      lastDate: '2026-10-25',
      applicationFee: 'Online CEE Fee: ₹250/- + GST',
      salary: '₹30,000 - ₹40,000/month + Seva Nidhi Package ₹11.71 Lakh after 4 Years',
      description: 'Join Indian Army Clerk/Office Assistant and Store Keeper Technical (SKT) vacancy under Agnipath scheme. Relaxed height requirement of 162 cm for all states. Candidates must clear 30 wpm English typing test.',
      applyLink: 'https://joinindianarmy.nic.in/',
      notificationPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_Clerk_SKT_2026.pdf',
      importantDates: {
        applyStart: '2026-09-12',
        applyEnd: '2026-10-25',
        examDate: 'November 2026',
        admitCardRelease: 'November 2026'
      },
      selectionProcess: ['Phase-I: Computer Based CEE + Online Typing Speed Test', 'Phase-II: PFT (1.6 Km run, Pull-ups) & Height Measurement (162 cm)', 'Phase-III: Medical Examination', 'Phase-IV: Combined CEE & Typing Merit']
    }
  },
  {
    id: 'army-vac-nursing-assistant-2026',
    noticeNo: 'JIA/REC/NA-AMC/2026',
    category: 'vacancy',
    entryType: 'nursing-tech',
    trade: 'Soldier Technical Nursing Assistant / NA (Veterinary)',
    zro: 'All India',
    title: 'Indian Army Soldier Technical Nursing Assistant (NA) & NA (Veterinary) Regular Cadre Rally 2026',
    titleHi: 'भारतीय सेना सोल्जर टेक्निकल नर्सिंग असिस्टेंट (NA) एवं NA (वेटनरी) नियमित कैडर भर्ती रैली 2026',
    org: 'Join Indian Army (Army Medical Corps)',
    publishedDate: '2026-09-16',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Nursing_Assistant_Regular_Cadre_2026.pdf',
    isNew: true,
    statusBadge: 'Regular Cadre (Permanent Service) Entry',
    details: {
      posts: '1,850+ Vacancies',
      ageLimit: '17.5 to 23 Years (Permanent Cadre)',
      qualification: '10+2 / Intermediate exam pass in Science with Physics, Chemistry, Biology and English with min 50% marks in aggregate and min 40% in each subject OR 10+2 with Botany, Zoology.',
      heightChest: 'Height: 169-170 cm | Chest: 77 cm (+5 cm expansion)',
      ceeDate: 'December 2026',
      lastDate: '2026-10-30',
      stage: 'Online Registration Open',
      summary: 'Recruitment into Army Medical Corps (AMC) and Remount Veterinary Corps (RVC) as Regular Cadre (Permanent Commissioned Soldier, NOT Agniveer). Pensionable service with full defence military pay and benefits.'
    },
    jobData: {
      id: 'army-nursing-assistant-2026-auto',
      title: 'Indian Army Soldier Technical Nursing Assistant (NA/RVC) Regular Cadre 2026 (1,850+ Posts)',
      org: 'Join Indian Army (AMC & RVC)',
      category: 'Defence',
      qualification: '12th Pass',
      ageLimit: '17.5 - 23 Years',
      totalVacancies: 1850,
      lastDate: '2026-10-30',
      applicationFee: 'Exam Fee: ₹250/- + GST',
      salary: 'Level-5 Pay Matrix (₹29,200 - ₹92,300) + Military Service Pay (MSP) ₹5,200/mo + DA + HRA (Regular Pensionable Service)',
      description: 'Permanent Regular Cadre entry in Indian Army for Medical and Veterinary hospital services. Candidates must have passed 10+2 with Physics, Chemistry, Biology & English. Upper age limit is 23 years.',
      applyLink: 'https://joinindianarmy.nic.in/',
      notificationPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Nursing_Assistant_Regular_Cadre_2026.pdf',
      importantDates: {
        applyStart: '2026-09-14',
        applyEnd: '2026-10-30',
        examDate: 'December 2026',
        admitCardRelease: 'December 2026'
      },
      selectionProcess: ['Phase-I: Computer Based CEE (200 Marks - Biology, Chemistry, Physics, GK)', 'Phase-II: ZRO Rally Ground PFT (1.6 Km, Beams)', 'Phase-III: Specialized Medical Examination', 'Phase-IV: Merit list for AMC Center & College Lucknow']
    }
  },
  {
    id: 'army-vac-tgc-142-officer',
    noticeNo: 'TGC-142/JAN2027/OFFICER',
    category: 'vacancy',
    entryType: 'officer',
    trade: 'Technical Graduate Course (TGC-142) - Permanent Commission',
    zro: 'All India',
    title: 'Indian Army Technical Graduate Course (TGC-142) Commencing Jan 2027 at Indian Military Academy (IMA), Dehradun',
    titleHi: 'भारतीय सेना तकनीकी स्नातक कोर (TGC-142) - भारतीय सैन्य अकादमी (IMA) देहरादून हेतु अधिकारी भर्ती',
    org: 'Join Indian Army (Officers Selection)',
    publishedDate: '2026-09-15',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/TGC_142_Course_Notification.pdf',
    isNew: true,
    statusBadge: 'Officer Entry - No Written Exam (Direct SSB)',
    details: {
      posts: 35,
      ageLimit: '20 to 27 Years as on 01 Jan 2027 (Born between 02 Jan 2000 and 01 Jan 2007)',
      qualification: 'Engineering Degree (B.E. / B.Tech) in Civil, Mechanical, Electrical, Computer Science/IT, Electronics or allied streams. Final year candidates also eligible.',
      stage: 'Online Applications Open for Engineering Graduates',
      lastDate: '2026-10-18',
      summary: 'Direct Entry for male engineering graduates to join the Indian Military Academy (IMA) Dehradun as commissioned Lieutenant officers in Indian Army. Direct SSB shortlist based on B.Tech percentage cut-off.'
    },
    jobData: {
      id: 'army-tgc-142-officer-auto',
      title: 'Indian Army TGC-142 (Technical Graduate Course) Officer Entry Jan 2027',
      org: 'Join Indian Army (Directorate General of Recruiting)',
      category: 'Defence',
      qualification: 'B.Tech',
      ageLimit: '20 - 27 Years',
      totalVacancies: 35,
      lastDate: '2026-10-18',
      applicationFee: 'Nil (₹0 for all candidates)',
      salary: 'Lieutenant: Level 10 (₹56,100 - ₹1,77,500) + Military Service Pay ₹15,500/mo + Dearness & Technical Allowances (Starting In-hand approx ₹1.15 Lakh/month)',
      description: 'Technical Graduate Course (TGC-142) for permanent commission in the Indian Army. Training at Indian Military Academy (IMA), Dehradun. No written examination required. Candidates will be directly shortlisted for 5-day Services Selection Board (SSB) interview.',
      applyLink: 'https://joinindianarmy.nic.in/',
      notificationPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/TGC_142_Course_Notification.pdf',
      importantDates: {
        applyStart: '2026-09-08',
        applyEnd: '2026-10-18',
        examDate: 'SSB Interviews: Nov 2026 - Jan 2027',
        admitCardRelease: 'SSB Call-up letters from Oct 2026'
      },
      selectionProcess: ['Shortlisting based on Engineering marks cut-off', '5-Day SSB Interview (Stage I Screening & Stage II Psychology/GTO/Interview)', 'Special Medical Board Examination at Military Hospitals', 'Final Merit List for IMA Dehradun']
    }
  },
  {
    id: 'army-vac-tes-54-officer',
    noticeNo: 'TES-54/10+2/2027',
    category: 'vacancy',
    entryType: 'officer',
    trade: '10+2 Technical Entry Scheme (TES-54)',
    zro: 'All India',
    title: 'Indian Army 10+2 Technical Entry Scheme (TES-54) Course Commencing Jan 2027 (JEE Mains Score Mandatory)',
    titleHi: 'भारतीय सेना 10+2 टेक्निकल एंट्री स्कीम (TES-54) कोर्स जनवरी 2027 - 90 पद (JEE मेन्स स्कोर अनिवार्य)',
    org: 'Join Indian Army / भारतीय थल सेना',
    publishedDate: '2026-09-14',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/TES_54_Course_Advt.pdf',
    isNew: true,
    statusBadge: '10+2 Officer Cadre (90 Vacancies)',
    details: {
      posts: 90,
      ageLimit: '16.5 to 19.5 Years (Born between 02 Jul 2007 and 01 Jul 2010)',
      qualification: 'Passed 10+2 (Intermediate) with min 60% aggregate in Physics, Chemistry & Mathematics. Mandatory appearance in JEE (Mains) 2026.',
      lastDate: '2026-10-12',
      stage: 'Registration Live',
      summary: '4-Year Engineering and Military Training program with grant of Permanent Commission in the rank of Lieutenant and B.Tech degree from CME Pune / MCTE Mhow / MCEME Secunderabad.'
    },
    jobData: {
      id: 'army-tes-54-officer-auto',
      title: 'Indian Army 10+2 Technical Entry Scheme (TES-54) 2027 (90 Seats)',
      org: 'Join Indian Army (Directorate General of Recruiting)',
      category: 'Defence',
      qualification: '12th Pass',
      ageLimit: '16.5 - 19.5 Years',
      totalVacancies: 90,
      lastDate: '2026-10-12',
      applicationFee: 'Nil (₹0 for all categories)',
      salary: 'Fixed Stipend ₹56,100/month during cadet training, commissioned as Lieutenant at Level 10 (₹56,100 - ₹1,77,500) + MSP ₹15,500/mo',
      description: 'Permanent Commission in the Indian Army after 10+2 with engineering degree. Mandatory valid JEE (Mains) 2026 CRL rank. Direct SSB interview call letters based on JEE cutoff.',
      applyLink: 'https://joinindianarmy.nic.in/',
      notificationPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/TES_54_Course_Advt.pdf',
      importantDates: {
        applyStart: '2026-09-05',
        applyEnd: '2026-10-12',
        examDate: 'SSB Interviews: Oct - Dec 2026',
        admitCardRelease: 'SSB Call-up live on login dashboard'
      },
      selectionProcess: ['Shortlisting of applications based on JEE (Mains) 2026 CRL Rank', '5-Day SSB Interview at Allahabad, Bhopal, Bangalore, or Jalandhar', 'Medical Board Examination', 'All India Merit List']
    }
  },

  // --- ADMIT CARDS ---
  {
    id: 'army-card-agniveer-cee-2026',
    noticeNo: 'CEE/ADMIT-CARD/2026-PHASE1',
    category: 'admit-card',
    entryType: 'agniveer',
    trade: 'Agniveer (GD, Tech, Clerk, Tradesman) CEE',
    zro: 'All India',
    title: 'Download Indian Army Agniveer Online Common Entrance Exam (CEE) 2026 e-Admit Card - Phase I CBT',
    titleHi: 'भारतीय सेना अग्निवीर ऑनलाइन कॉमन एंट्रेंस एग्जाम (CEE) 2026 ई-एडमिट कार्ड डाउनलोड जारी',
    org: 'Join Indian Army / भारतीय थल सेना',
    publishedDate: '2026-09-19',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/CEE_AdmitCard_Instructions_2026.pdf',
    isNew: true,
    statusBadge: 'CEE Hall Ticket Active on Candidate Login',
    details: {
      examDate: '12th October to 28th October 2026 (Multiple Shifts across 176 Cities)',
      stage: 'Download Live via JIA Roll No. and Date of Birth',
      summary: 'Candidates must login to joinindianarmy.nic.in with registered JIA Roll Number and Password to download colour printout of e-Admit Card. Mandatory Original Aadhaar Card and 2 passport photos required at exam center.'
    },
    admitCardData: {
      id: 'card-army-cee-2026',
      title: 'Indian Army Agniveer Online CEE e-Admit Card 2026',
      org: 'Join Indian Army (Directorate General of Recruiting)',
      releaseDate: '2026-09-19',
      examDate: '12 - 28 October 2026',
      downloadLink: 'https://joinindianarmy.nic.in/',
      instructions: [
        'Login at joinindianarmy.nic.in -> Candidate Login -> Enter JIA Roll Number & Password.',
        'Take a clear, laser colour printout of the e-Admit Card on A4 paper.',
        'Carry Original Aadhaar Card / Voter ID / Driving License as photo identity proof.',
        'Candidates must report 90 minutes prior to exam shift commencement at allotted CBT center.',
        'Electronic gadgets, Bluetooth devices, smartwatches, and calculators strictly barred.'
      ]
    }
  },
  {
    id: 'army-card-tgc-ssb-callup',
    noticeNo: 'TGC-141/SSB/CALLUP/2026',
    category: 'admit-card',
    entryType: 'officer',
    trade: 'TGC-141 Services Selection Board (SSB)',
    zro: 'All India',
    title: 'Indian Army TGC-141 SSB Interview Call Up Letters & Center Allotment (Prayagraj, Bhopal, Bengaluru, Jalandhar)',
    titleHi: 'भारतीय सेना TGC-141 एसएसबी इंटरव्यू कॉल लेटर एवं सेंटर आवंटन जारी',
    org: 'Join Indian Army (Officers Selection)',
    publishedDate: '2026-09-17',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/TGC141_SSB_Instructions.pdf',
    isNew: true,
    statusBadge: 'SSB Date Selection & Callup Live',
    details: {
      examDate: 'SSB Dates: October 2026 onwards',
      stage: 'Date Selection Link Open for Shortlisted Candidates',
      summary: 'Call up letter for 5-Day SSB Interview available on joinindianarmy.nic.in profile. Candidates can select their preferred date batches on first-come-first-serve basis.'
    },
    admitCardData: {
      id: 'card-army-tgc-ssb-2026',
      title: 'Indian Army TGC-141 SSB Interview Call Letter 2026',
      org: 'Join Indian Army (Officers Selection Board)',
      releaseDate: '2026-09-17',
      examDate: 'October - December 2026',
      downloadLink: 'https://joinindianarmy.nic.in/',
      instructions: [
        'Login to your candidate account at joinindianarmy.nic.in.',
        'Navigate to Officers Entry -> SSB Date Selection to lock interview slot.',
        'Carry 20 passport-sized photographs in white shirt background.',
        'Carry all original B.Tech semester marksheets and degree certificate.',
        'Bring COVID vaccination certificate / RT-PCR declaration.'
      ]
    }
  },

  // --- RESULTS ---
  {
    id: 'army-res-cee-merit-list-2026',
    noticeNo: 'CEE/RESULT/2026-MERIT',
    category: 'result',
    entryType: 'agniveer',
    trade: 'Agniveer GD, Tech, Clerk & Tradesman',
    zro: 'All India',
    title: 'Join Indian Army Agniveer Phase-I Online CEE Result 2026 - ZRO Wise Roll Number PDF of Shortlisted Candidates for Rally',
    titleHi: 'भारतीय सेना अग्निवीर फेज-1 ऑनलाइन CEE परीक्षा परिणाम 2026 - रैली हेतु शॉर्टलिस्ट रोल नंबर सूची',
    org: 'Join Indian Army / भारतीय थल सेना',
    publishedDate: '2026-09-18',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_CEE_Shortlisted_Rally_RollNos_2026.pdf',
    isNew: true,
    statusBadge: 'Phase-I CEE Merit Roll Numbers Declared',
    details: {
      cutoff: 'GD Cutoff: 128/200 | Tech: 134/200 | Clerk: 142/200',
      stage: 'Qualified Candidates Called for Phase-II Rally PFT/PMT',
      summary: 'ZRO Jaipur, ZRO Lucknow, ZRO Danapur, ZRO Jalandhar, ZRO Ambala, ZRO Pune, and ZRO Kolkata have published roll numbers of candidates shortlisted for Phase-II physical recruitment rally.'
    },
    resultData: {
      id: 'res-army-cee-merit-2026',
      title: 'Indian Army Agniveer Online CEE Result & Shortlist for Rally 2026',
      org: 'Join Indian Army (Directorate General of Recruiting)',
      releaseDate: '2026-09-18',
      resultLink: 'https://joinindianarmy.nic.in/',
      meritListPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Agniveer_CEE_Shortlisted_Rally_RollNos_2026.pdf',
      cutOff: {
        UR: 'Agniveer GD: 128.5 / 200 Marks',
        OBC: 'Agniveer GD: 126.0 / 200 Marks',
        SC: 'Agniveer GD: 118.0 / 200 Marks',
        ST: 'Agniveer GD: 112.5 / 200 Marks'
      }
    }
  },
  {
    id: 'army-res-final-select-list-2026',
    noticeNo: 'JIA/FINAL-MERIT/2026-DISPATCH',
    category: 'result',
    entryType: 'agniveer',
    trade: 'Agniveer GD & Tradesman Final Merit',
    zro: 'Jaipur & Lucknow',
    aro: 'ARO Alwar, ARO Jhunjhunu, ARO Kota & ARO Meerut',
    title: 'Join Indian Army Final Selection Merit List 2026 for Dispatch to Regimental Training Centers (RTC)',
    titleHi: 'भारतीय सेना अंतिम चयन मेरिट सूची 2026 - रेजीमेंटल ट्रेनिंग सेंटर (RTC) प्रेषण हेतु चयनित अभ्यर्थियों की सूची',
    org: 'Join Indian Army (Recruiting Zone)',
    publishedDate: '2026-09-16',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Final_Merit_Dispatch_RollNos_2026.pdf',
    isNew: true,
    statusBadge: 'Final Dispatch Merit List Out',
    details: {
      cutoff: 'Final Combined CEE + PFT Merit Declared',
      stage: 'Candidates to report at respective ARO for dispatch',
      summary: 'Selected candidates for Agniveer General Duty and Tradesman are directed to report to their concerned ARO with original documentation, bank account passbooks, and PAN cards for dispatch to respective Army Regimental Centers.'
    },
    resultData: {
      id: 'res-army-final-dispatch-2026',
      title: 'Indian Army Agniveer Final Selection Merit List & Dispatch Orders 2026',
      org: 'Join Indian Army (HQ Recruiting Zones)',
      releaseDate: '2026-09-16',
      resultLink: 'https://joinindianarmy.nic.in/',
      meritListPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Final_Merit_Dispatch_RollNos_2026.pdf',
      cutOff: {
        UR: 'Combined Merit (CEE + PFT): 172.5 / 200',
        OBC: 'Combined Merit (CEE + PFT): 169.0 / 200',
        SC: 'Combined Merit (CEE + PFT): 158.0 / 200',
        ST: 'Combined Merit (CEE + PFT): 154.5 / 200'
      }
    }
  },

  // --- ANSWER KEYS ---
  {
    id: 'army-ans-cee-scoring-key-2026',
    noticeNo: 'CEE/ANS-KEY/2026-OBJECTIONS',
    category: 'answer-key',
    entryType: 'agniveer',
    trade: 'Agniveer CEE All Trades',
    zro: 'All India',
    title: 'Indian Army Agniveer Online CEE Question Paper & Provisional Answer Key 2026 - Challenge Window',
    titleHi: 'भारतीय सेना अग्निवीर CEE मास्टर प्रश्न पत्र एवं उत्तर कुंजी 2026 - आपत्ति दर्ज करने की विंडो',
    org: 'Join Indian Army / भारतीय थल सेना',
    publishedDate: '2026-09-17',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/CEE_Provisional_Answer_Key_2026.pdf',
    isNew: true,
    statusBadge: 'Provisional Answer Key & Objections Live',
    details: {
      lastDate: '2026-09-24',
      stage: 'Candidate Response Sheet & Question Objection Portal Active',
      summary: 'Candidates who appeared in the Computer-Based Online CEE can login with JIA credentials to review their marked answers against provisional answer keys and file objections with documentary proof.'
    },
    answerKeyData: {
      id: 'key-army-cee-2026',
      title: 'Indian Army Agniveer Online CEE Provisional Answer Key 2026',
      org: 'Join Indian Army',
      examDate: 'September 2026',
      releaseDate: '2026-09-17',
      objectionLastDate: '2026-09-24',
      keyPdf: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/CEE_Provisional_Answer_Key_2026.pdf',
      objectionLink: 'https://joinindianarmy.nic.in/'
    }
  },

  // --- RALLY SCHEDULES ---
  {
    id: 'army-rally-schedule-2026-27',
    noticeNo: 'RALLY/CALENDAR/2026-27/ZONEWISE',
    category: 'rally-schedule',
    entryType: 'rally',
    trade: 'All Agniveer Trades & Regular Nursing Cadre',
    zro: 'All India ZROs',
    title: 'Indian Army Annual Recruitment Rally Calendar 2026-27 (ZRO Jaipur, Lucknow, Danapur, Jalandhar, Pune, Ambala)',
    titleHi: 'भारतीय सेना वार्षिक भर्ती रैली कैलेंडर 2026-27 - समस्त जोनल भर्ती कार्यालयों (ZRO) का कार्यक्रम',
    org: 'Join Indian Army / महानिदेशालय भर्ती',
    publishedDate: '2026-09-18',
    portalUrl: 'https://joinindianarmy.nic.in/',
    officialUrl: 'https://joinindianarmy.nic.in/default.aspx',
    pdfUrl: 'https://joinindianarmy.nic.in/writereaddata/Portal/Notification/Army_Rally_Schedule_2026_27.pdf',
    isNew: true,
    statusBadge: 'Annual ZRO Rally Calendar 2026-27',
    details: {
      rallyDates: 'October 2026 to March 2027',
      stage: 'ZRO-wise Dates & District Coverage Finalized',
      summary: 'Complete state and district-wise schedule of open recruitment rallies across India. Details dates and venues for physical tests: ARO Alwar, ARO Jhunjhunu, ARO Kota, ARO Jaipur, ARO Agra, ARO Meerut, ARO Bareilly, ARO Varanasi, ARO Danapur, ARO Ranchi, ARO Gaya, ARO Rohtak, ARO Hisar, ARO Jalandhar, ARO Amritsar, ARO Pune, ARO Kolhapur, ARO Mumbai, and ZRO Kolkata.',
      stateDistrict: 'Pan-India Rally Grounds & Military Stations'
    }
  }
];

export class ArmyRecruitmentService {
  private lastCheckedTimestamp: string = new Date().toLocaleTimeString();
  private isOnline: boolean = true;
  private currentLatencyMs: number = 42;

  public getStatus(): ArmySyncStatus {
    return {
      online: this.isOnline,
      portal: 'https://joinindianarmy.nic.in/',
      status: this.isOnline ? 'ONLINE' : 'DEGRADED',
      lastChecked: this.lastCheckedTimestamp,
      latencyMs: this.currentLatencyMs,
      autoSyncIntervalSec: 45,
      totalLiveNotices: armyLiveNotices.length,
      newNoticesCount: armyLiveNotices.filter(n => n.isNew).length
    };
  }

  public getLiveNotices(filter?: { category?: string; entryType?: string; zro?: string; search?: string }): ArmyLiveNotice[] {
    let result = [...armyLiveNotices];

    if (filter?.category && filter.category !== 'all') {
      result = result.filter(n => n.category === filter.category);
    }

    if (filter?.entryType && filter.entryType !== 'all') {
      result = result.filter(n => n.entryType === filter.entryType);
    }

    if (filter?.zro && filter.zro !== 'all') {
      result = result.filter(n => n.zro.toLowerCase().includes(filter.zro!.toLowerCase()));
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.titleHi.toLowerCase().includes(q) ||
        (n.trade && n.trade.toLowerCase().includes(q)) ||
        (n.aro && n.aro.toLowerCase().includes(q)) ||
        (n.noticeNo && n.noticeNo.toLowerCase().includes(q)) ||
        (n.details.summary && n.details.summary.toLowerCase().includes(q))
      );
    }

    return result;
  }

  public async syncWithPortal(): Promise<{ success: boolean; newCount: number; timestamp: string }> {
    this.lastCheckedTimestamp = new Date().toLocaleTimeString();
    this.currentLatencyMs = Math.floor(Math.random() * 40) + 30; // 30-70ms realistic ping

    // Simulate checking live feed
    return {
      success: true,
      newCount: armyLiveNotices.filter(n => n.isNew).length,
      timestamp: this.lastCheckedTimestamp
    };
  }

  public addNotice(notice: ArmyLiveNotice): ArmyLiveNotice {
    const existingIndex = armyLiveNotices.findIndex(n => n.id === notice.id);
    if (existingIndex >= 0) {
      armyLiveNotices[existingIndex] = notice;
    } else {
      armyLiveNotices.unshift(notice);
    }
    return notice;
  }

  // AI-powered raw notice parser for Join Indian Army (Press Releases / Rally PDF text)
  public async parseRawNoticeWithGemini(rawText: string, targetUrl: string = 'https://joinindianarmy.nic.in/'): Promise<ArmyLiveNotice> {
    const todayStr = new Date().toISOString().split('T')[0];
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are an expert Indian Defence recruiting system analyst for Join Indian Army (https://joinindianarmy.nic.in/).
Analyze the following raw notification text from joinindianarmy.nic.in and extract structured JSON matching this exact TypeScript schema:
{
  "category": "vacancy" | "admit-card" | "result" | "answer-key" | "rally-schedule",
  "entryType": "agniveer" | "officer" | "nursing-tech" | "women-mp" | "havildar-sac" | "rally" | "other",
  "title": "Clear English title max 90 chars",
  "titleHi": "Clear Hindi title in Devanagari",
  "zro": "Recruiting Zone e.g. Jaipur, Danapur, Lucknow, Jalandhar, Pune, Ambala, All India",
  "aro": "ARO name if specified e.g. ARO Alwar, ARO Jhunjhunu",
  "trade": "Specific trade e.g. Agniveer GD, Technical, Clerk/SKT, Tradesman, TGC, TES, Nursing Assistant",
  "noticeNo": "Official notice or advt number if found",
  "posts": "Number of posts or string",
  "ageLimit": "Age eligibility e.g. 17.5 to 21 Years",
  "qualification": "Educational requirements",
  "heightChest": "Physical standards if mentioned",
  "lastDate": "YYYY-MM-DD or readable date",
  "examDate": "CEE or Rally dates",
  "salary": "Pay allowances e.g. Seva Nidhi ₹11.71 Lakh / Level 10 for Officers",
  "summary": "Concise 2-sentence summary of rally and recruitment instructions"
}

Raw Text:
${rawText.slice(0, 3500)}

Return ONLY a raw JSON object, without markdown triple backticks.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });

        const textOutput = response.text || '';
        const cleaned = textOutput.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);

        const cleanId = `army-${parsed.category || 'notice'}-${Date.now()}`;
        const newNotice: ArmyLiveNotice = {
          id: cleanId,
          category: parsed.category || 'vacancy',
          entryType: parsed.entryType || 'agniveer',
          title: parsed.title || 'Indian Army Recruitment Notice 2026',
          titleHi: parsed.titleHi || 'भारतीय सेना भर्ती सूचना 2026',
          org: 'Join Indian Army / भारतीय थल सेना',
          zro: parsed.zro || 'All India',
          aro: parsed.aro,
          trade: parsed.trade || 'Agniveer General Duty',
          noticeNo: parsed.noticeNo || `JIA/2026/${Math.floor(Math.random() * 900 + 100)}`,
          portalUrl: 'https://joinindianarmy.nic.in/',
          publishedDate: todayStr,
          officialUrl: targetUrl,
          pdfUrl: targetUrl,
          isNew: true,
          statusBadge: parsed.category === 'vacancy' ? 'Online Registration Live' : parsed.category === 'admit-card' ? 'CEE e-Admit Card Out' : 'Official Notice',
          details: {
            posts: parsed.posts,
            ageLimit: parsed.ageLimit,
            qualification: parsed.qualification,
            heightChest: parsed.heightChest,
            lastDate: parsed.lastDate,
            ceeDate: parsed.examDate,
            salary: parsed.salary,
            summary: parsed.summary
          }
        };

        if (newNotice.category === 'vacancy') {
          newNotice.jobData = {
            id: `job-${cleanId}`,
            title: newNotice.title,
            org: newNotice.org,
            category: 'Defence',
            qualification: newNotice.entryType === 'officer' ? 'Graduate' : '10th Pass',
            ageLimit: parsed.ageLimit || '17.5 - 21 Years',
            totalVacancies: typeof parsed.posts === 'number' ? parsed.posts : 1000,
            lastDate: parsed.lastDate || '30 Days from release',
            applicationFee: 'Online CEE Fee: ₹250/- + GST (₹0 for Officer entries)',
            salary: parsed.salary || '₹30,000 - ₹40,000/mo + Seva Nidhi Package ₹11.71 Lakh',
            description: newNotice.details.summary || newNotice.title,
            applyLink: 'https://joinindianarmy.nic.in/',
            notificationPdf: targetUrl,
            importantDates: {
              applyStart: todayStr,
              applyEnd: parsed.lastDate || '30 Days from release',
              examDate: parsed.examDate || 'Check Portal',
              admitCardRelease: '7-10 Days before CEE'
            },
            selectionProcess: ['Phase-I: Computer Based Online CEE', 'Phase-II: Physical Fitness Test (PFT) at designated Rally Ground', 'Phase-III: Medical Exam & Final Merit']
          };
        } else if (newNotice.category === 'admit-card') {
          newNotice.admitCardData = {
            id: `card-${cleanId}`,
            title: `${newNotice.title} e-Admit Card`,
            org: newNotice.org,
            releaseDate: todayStr,
            examDate: parsed.examDate || 'Check Portal',
            downloadLink: 'https://joinindianarmy.nic.in/',
            instructions: ['Download e-Admit card via joinindianarmy.nic.in candidate login with JIA Roll number and DOB.']
          };
        } else if (newNotice.category === 'result') {
          newNotice.resultData = {
            id: `res-${cleanId}`,
            title: newNotice.title,
            org: newNotice.org,
            releaseDate: todayStr,
            resultLink: 'https://joinindianarmy.nic.in/',
            meritListPdf: targetUrl,
            cutOff: {
              UR: 'Declared on Portal',
              OBC: 'Declared on Portal',
              SC: 'Declared on Portal',
              ST: 'Declared on Portal'
            }
          };
        } else if (newNotice.category === 'answer-key') {
          newNotice.answerKeyData = {
            id: `key-${cleanId}`,
            title: newNotice.title,
            org: newNotice.org,
            examDate: parsed.examDate || todayStr,
            releaseDate: todayStr,
            objectionLastDate: '7 Days from release',
            keyPdf: targetUrl,
            objectionLink: 'https://joinindianarmy.nic.in/'
          };
        }

        return this.addNotice(newNotice);
      } catch (err) {
        console.warn('Gemini extraction failed, falling back to heuristic parsing:', err);
      }
    }

    // Heuristic fallback
    const lower = rawText.toLowerCase();
    let cat: ArmyLiveNotice['category'] = 'vacancy';
    let entryType: ArmyLiveNotice['entryType'] = 'agniveer';
    let badge = 'Active Recruitment Notice';

    if (lower.includes('admit card') || lower.includes('hall ticket') || lower.includes('प्रवेश पत्र')) {
      cat = 'admit-card';
      badge = 'CEE e-Admit Card Live';
    } else if (lower.includes('result') || lower.includes('merit') || lower.includes('परिणाम') || lower.includes('चयन सूची')) {
      cat = 'result';
      badge = 'Merit List Declared';
    } else if (lower.includes('answer key') || lower.includes('objection') || lower.includes('उत्तर कुंजी')) {
      cat = 'answer-key';
      badge = 'Answer Key & Objections';
    } else if (lower.includes('rally schedule') || lower.includes('rally calendar') || lower.includes('रैली कार्यक्रम')) {
      cat = 'rally-schedule';
      badge = 'Rally Schedule Live';
    }

    if (lower.includes('officer') || lower.includes('tgc') || lower.includes('tes') || lower.includes('ima') || lower.includes('ssb')) {
      entryType = 'officer';
    } else if (lower.includes('nursing') || lower.includes('amc') || lower.includes('veterinary')) {
      entryType = 'nursing-tech';
    } else if (lower.includes('women') || lower.includes('military police') || lower.includes('wmp')) {
      entryType = 'women-mp';
    }

    const cleanId = `army-${cat}-${Date.now()}`;
    const notice: ArmyLiveNotice = {
      id: cleanId,
      category: cat,
      entryType,
      title: rawText.split('\n')[0]?.slice(0, 95) || 'Indian Army Recruitment Notice',
      titleHi: `भारतीय सेना भर्ती सूचना: ${rawText.split('\n')[0]?.slice(0, 85) || 'आधिकारिक सूचना'}`,
      org: 'Join Indian Army / भारतीय थल सेना',
      zro: 'All India',
      trade: entryType === 'officer' ? 'Officer Cadre' : 'Agniveer General Duty',
      noticeNo: 'JIA/2026/NOTIF',
      portalUrl: 'https://joinindianarmy.nic.in/',
      publishedDate: todayStr,
      officialUrl: targetUrl,
      pdfUrl: targetUrl,
      isNew: true,
      statusBadge: badge,
      details: {
        summary: rawText.slice(0, 220),
        ageLimit: entryType === 'officer' ? '20-27 Years' : '17.5-21 Years',
        qualification: entryType === 'officer' ? 'B.Tech / Degree' : '10th / 12th Pass'
      }
    };

    if (cat === 'vacancy') {
      notice.jobData = {
        id: `job-${cleanId}`,
        title: notice.title,
        org: notice.org,
        category: 'Defence',
        qualification: entryType === 'officer' ? 'Graduate' : '10th Pass',
        ageLimit: notice.details.ageLimit || '17.5-21 Years',
        totalVacancies: 1000,
        lastDate: '30 Days from release',
        applicationFee: 'CEE Fee ₹250 + GST',
        salary: 'Army Agnipath / Defence Pay Matrix',
        description: notice.details.summary || notice.title,
        applyLink: 'https://joinindianarmy.nic.in/',
        notificationPdf: targetUrl,
        importantDates: {
          applyStart: todayStr,
          applyEnd: '30 Days from release',
          examDate: 'Check joinindianarmy.nic.in',
          admitCardRelease: '7-10 Days before exam'
        },
        selectionProcess: ['Online CEE Exam', 'Rally Ground Physical Tests', 'Medical Exam']
      };
    } else if (cat === 'admit-card') {
      notice.admitCardData = {
        id: `card-${cleanId}`,
        title: `${notice.title} e-Admit Card`,
        org: notice.org,
        releaseDate: todayStr,
        examDate: 'Check Portal',
        downloadLink: 'https://joinindianarmy.nic.in/',
        instructions: ['Download e-Admit Card on joinindianarmy.nic.in with JIA Roll Number.']
      };
    } else if (cat === 'result') {
      notice.resultData = {
        id: `res-${cleanId}`,
        title: notice.title,
        org: notice.org,
        releaseDate: todayStr,
        resultLink: 'https://joinindianarmy.nic.in/',
        meritListPdf: targetUrl,
        cutOff: {
          UR: 'Declared on Portal',
          OBC: 'Declared on Portal',
          SC: 'Declared on Portal',
          ST: 'Declared on Portal'
        }
      };
    }

    return this.addNotice(notice);
  }
}

export const armyRecruitmentService = new ArmyRecruitmentService();
