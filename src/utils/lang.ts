// Multi-lingual translations for Job Sarkari Hub
export type LocaleType = 'en' | 'hi' | 'mr' | 'rj';

export interface TranslationDictionary {
  brandTitle: string;
  brandSubtitle: string;
  unlockPremium: string;
  premiumActive: string;
  notificationsTitle: string;
  clearAll: string;
  noNotifications: string;
  loginButton: string;
  loggedInAs: string;
  quickAlertLabel: string;
  
  // Navigation
  home: string;
  latestJobs: string;
  examCalendar: string;
  admitCard: string;
  result: string;
  answerKey: string;
  syllabusAdmission: string;
  pyqPapers: string;
  mockTests: string;
  uploads: string;
  currentAffairs: string;
  blogsStrategies: string;
  premiumMembership: string;
  userDashboard: string;
  adminConsole: string;
  contactUs: string;
  
  // Sections
  heroTitle: string;
  heroSub: string;
  searchPlaceholder: string;
  allQualifications: string;
  filterByQual: string;
  premiumDesk: string;
  notebookSnap: string;
  notebookDesc: string;
  
  // Alerts / Toasts
  clipboardSuccess: string;
  clipboardFail: string;
  shareTitle: string;
  hallTicketDownload: string;
  meritListCheck: string;
}

export const LANGUAGES: { code: LocaleType; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'mr', label: 'मराठी (Marathi)', flag: '🚩' },
  { code: 'rj', label: 'राजस्थानी (Rajasthani)', flag: '🏰' }
];

export const TRANSLATIONS: Record<LocaleType, TranslationDictionary> = {
  en: {
    brandTitle: "Job Sarkari Hub",
    brandSubtitle: "Updates Portal",
    unlockPremium: "Unlock Premium",
    premiumActive: "Premium Active",
    notificationsTitle: "Latest Alerts",
    clearAll: "Clear All",
    noNotifications: "No unread notifications",
    loginButton: "🔑 Log In / Join",
    loggedInAs: "Sarkari Aspirant",
    quickAlertLabel: "SECURE AD-FREE EXPERIENCE",
    
    home: "Home",
    latestJobs: "Latest Jobs",
    examCalendar: "Exam Calendar",
    admitCard: "Admit Card",
    result: "Result",
    answerKey: "Answer Key",
    syllabusAdmission: "Syllabus & Admission",
    pyqPapers: "Previous Year Papers",
    mockTests: "Mock Tests & Quizzes",
    uploads: "Aspirant Uploads (अपलोड)",
    currentAffairs: "Current Affairs",
    blogsStrategies: "Blogs & Strategies",
    premiumMembership: "Premium Membership",
    userDashboard: "User Dashboard",
    adminConsole: "Admin Console",
    contactUs: "Contact Us",
    
    heroTitle: "India's #1 Secure Sarkari Updates & Exam Prep Portal",
    heroSub: "Real-time updates on Rajya Sabha, Lok Sabha, SSC CGL, UPSC Civil Services, RPSC, Teaching, and Banking exams under secure sandbox guidelines.",
    searchPlaceholder: "Search jobs, syllabus, admit cards, or results...",
    allQualifications: "All Qualifications",
    filterByQual: "Filter by Qualification",
    premiumDesk: "Sarkari Premium Exam Mitra Desk",
    notebookSnap: "Notebook Snapshot Loaded",
    notebookDesc: "Ready to solve upon premium activation",
    
    clipboardSuccess: "🏆 Payment Link successfully copied!",
    clipboardFail: "🚫 Failed to copy link.",
    shareTitle: "🎉 Thank you for sharing Job Sarkari Hub!",
    hallTicketDownload: "📥 Hall ticket download initiated for ",
    meritListCheck: "🔍 Complete merit list & scorecard verification for "
  },
  hi: {
    brandTitle: "जॉब सरकारी हब",
    brandSubtitle: "अपडेट्स पोर्टल",
    unlockPremium: "प्रीमियम अनलॉक करें",
    premiumActive: "प्रीमियम सक्रिय है",
    notificationsTitle: "नवीनतम सूचनाएं",
    clearAll: "सभी साफ करें",
    noNotifications: "कोई नई सूचना नहीं है",
    loginButton: "🔑 लॉग इन / शामिल हों",
    loggedInAs: "सरकारी आकांक्षी",
    quickAlertLabel: "सुरक्षित विज्ञापन-मुक्त अनुभव",
    
    home: "मुख्य पृष्ठ",
    latestJobs: "नवीनतम नौकरियां",
    examCalendar: "परीक्षा कैलेंडर",
    admitCard: "प्रवेश पत्र (Admit Card)",
    result: "परीक्षा परिणाम",
    answerKey: "उत्तर कुंजी (Answer Key)",
    syllabusAdmission: "पाठ्यक्रम एवं प्रवेश",
    pyqPapers: "पुराने प्रश्न पत्र (PYQs)",
    mockTests: "मॉक टेस्ट और क्विज़",
    uploads: "आकांक्षी अपलोड",
    currentAffairs: "करंट अफेयर्स",
    blogsStrategies: "ब्लॉग और रणनीतियाँ",
    premiumMembership: "प्रीमियम सदस्यता",
    userDashboard: "यूज़र डैशबोर्ड",
    adminConsole: "एडमिन कंसोल",
    contactUs: "संपर्क करें",
    
    heroTitle: "भारत का #1 सुरक्षित सरकारी अपडेट और परीक्षा तैयारी पोर्टल",
    heroSub: "राज्यसभा, लोकसभा, एसएससी सीजीएल, यूपीएससी सिविल सेवा, आरपीएससी, शिक्षण और बैंकिंग परीक्षाओं की वास्तविक समय पर सुरक्षित अपडेट।",
    searchPlaceholder: "नौकरियां, पाठ्यक्रम, प्रवेश पत्र या परिणाम खोजें...",
    allQualifications: "सभी योग्यताएं",
    filterByQual: "योग्यता के अनुसार फ़िल्टर करें",
    premiumDesk: "सरकारी प्रीमियम परीक्षा मित्र डेस्क",
    notebookSnap: "नोटबुक स्नैपशॉट लोड हो गया",
    notebookDesc: "प्रीमियम सक्रिय होने पर समाधान के लिए तैयार",
    
    clipboardSuccess: "🏆 भुगतान लिंक सफलतापूर्वक कॉपी हो गया!",
    clipboardFail: "🚫 लिंक कॉपी करने में असमर्थ।",
    shareTitle: "🎉 जॉब सरकारी हब साझा करने के लिए धन्यवाद!",
    hallTicketDownload: "📥 प्रवेश पत्र डाउनलोड शुरू हुआ: ",
    meritListCheck: "🔍 योग्यता सूची और स्कोरकार्ड की जांच करें: "
  },
  mr: {
    brandTitle: "जॉब सरकारी हब",
    brandSubtitle: "अपडेट्स पोर्टल",
    unlockPremium: "प्रीमियम मिळवा",
    premiumActive: "प्रीमियम सक्रिय",
    notificationsTitle: "नवीनतम सूचना",
    clearAll: "सर्व साफ करा",
    noNotifications: "कोणतीही नवीन सूचना नाही",
    loginButton: "🔑 लॉग इन / सामील व्हा",
    loggedInAs: "सरकारी उमेदवार",
    quickAlertLabel: "सुरक्षित जाहिरात-मुक्त अनुभव",
    
    home: "मुख्य पान",
    latestJobs: "नवीनतम नोकऱ्या",
    examCalendar: "परीक्षा वेळापत्रक",
    admitCard: "प्रवेशपत्र (Admit Card)",
    result: "निकाल (Result)",
    answerKey: "उत्तरतालिका (Answer Key)",
    syllabusAdmission: "अभ्यासक्रम आणि प्रवेश",
    pyqPapers: "मागील वर्षांचे पेपर्स",
    mockTests: "मॉक टेस्ट आणि क्विझ",
    uploads: "विद्यार्थी अपलोड",
    currentAffairs: "चालू घडामोडी",
    blogsStrategies: "ब्लॉग आणि रणनीती",
    premiumMembership: "प्रीमियम सदस्यता",
    userDashboard: "वापरकर्ता डॅशबोर्ड",
    adminConsole: "अ‍ॅडमिन कंसोल",
    contactUs: "संपर्क साधा",
    
    heroTitle: "भारतातील #1 सुरक्षित सरकारी नोकरी आणि परीक्षा तयारी पोर्टल",
    heroSub: "एसएससी सीजीएल, यूपीएससी, एमपीएससी, रेल्वे आणि बँकिंग परीक्षांच्या नवीनतम घडामोडी आणि अधिकृत अभ्यासक्रम थेट मिळवा.",
    searchPlaceholder: "नोकरी, अभ्यासक्रम, प्रवेशपत्र किंवा निकाल शोधा...",
    allQualifications: "सर्व पात्रता",
    filterByQual: "पात्रतेनुसार शोधा",
    premiumDesk: "सरकारी प्रीमियम परीक्षा मित्र डेस्क",
    notebookSnap: "नोटबुक फोटो यशस्वीरित्या लोड झाला",
    notebookDesc: "प्रीमियम सुरू झाल्यावर तात्काळ उत्तर मिळवण्यासाठी तयार",
    
    clipboardSuccess: "🏆 पेमेंट लिंक यशस्वीरित्या कॉपी केली गेली!",
    clipboardFail: "🚫 लिंक कॉपी करण्यात त्रुटी.",
    shareTitle: "🎉 जॉब सरकारी हब शेअर केल्याबद्दल धन्यवाद!",
    hallTicketDownload: "📥 प्रवेशपत्र डाउनलोड सुरू झाले: ",
    meritListCheck: "🔍 संपूर्ण गुणवत्ता यादी आणि निकालची पडताळणी: "
  },
  rj: {
    brandTitle: "जॉब सरकारी हब",
    brandSubtitle: "अपडेट्स धोरो रे देस",
    unlockPremium: "प्रीमियम खातो खोलो",
    premiumActive: "प्रीमियम चालू है",
    notificationsTitle: "नया समाचार",
    clearAll: "सगळा साफ करो",
    noNotifications: "कोई नया समाचार कोनी",
    loginButton: "🔑 खातो खोलो / जुड़ो",
    loggedInAs: "सरकारी तैयारी वालो",
    quickAlertLabel: "बिना विज्ञापन सुरक्षित तैयारी",
    
    home: "पेहलो पान",
    latestJobs: "नयी भर्तियां (Jobs)",
    examCalendar: "परीक्षा री तारीखें",
    admitCard: "प्रवेश पत्र (Admit Card)",
    result: "परीक्षा रो नतीजो (Result)",
    answerKey: "उत्तर कुंजी (Answer Key)",
    syllabusAdmission: "सिलेबस अर एडमीशन",
    pyqPapers: "पुराणा पेपर हल समेत",
    mockTests: "मॉक टेस्ट अर क्विज़",
    uploads: "टाबरां री फाइलें",
    currentAffairs: "आज री खास खबरें",
    blogsStrategies: "टॉपर री रणनीतियां",
    premiumMembership: "प्रीमियम मैम्बरशिप",
    userDashboard: "म्हारो डैशबोर्ड",
    adminConsole: "प्रशासक री कुर्सी",
    contactUs: "म्हाने खबर करो (Contact)",
    
    heroTitle: "धरती धोरां री सबसूं सुरक्षित सरकारी नौकरिया री वेबसाइट",
    heroSub: "आरपीएससी, यूपीएससी, एसएससी, पटवार, ग्राम सेवक री पल-पल री सची जानकारी एकदम सुरक्षित तरीके सूं मिले।",
    searchPlaceholder: "भर्तियां, सिलेबस, प्रवेश पत्र या नतीजो खोजो सा...",
    allQualifications: "सगळी डिग्रियां",
    filterByQual: "डिग्री रे हिसाब सूं देखो",
    premiumDesk: "सरकारी प्रीमियम परीक्षा मित्र डेस्क",
    notebookSnap: "कागद रो फोटो लोड होग्यो सा",
    notebookDesc: "प्रीमियम चालू हुवता ही सगळो जवाब मिल जासी",
    
    clipboardSuccess: "🏆 पेमेंट रो लिंक कॉपी होग्यो सा!",
    clipboardFail: "🚫 लिंक कॉपी कोनी होयो सा।",
    shareTitle: "🎉 जॉब सरकारी हब ने सगळा साथियां ने शेयर करण वास्ते धन्यवाद सा!",
    hallTicketDownload: "📥 प्रवेश पत्र डाउनलोड सुरु होग्यो सा: ",
    meritListCheck: "🔍 मैरिट री लिस्ट अर नम्बर जाचो सा: "
  }
};
