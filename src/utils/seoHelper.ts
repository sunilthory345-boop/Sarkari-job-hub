import { LocaleType } from './lang';

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
}

const SEO_MAP: Record<LocaleType, Record<string, SEOMetadata>> = {
  en: {
    home: {
      title: "Job Sarkari Hub — Latest Sarkari Results, Admit Cards & Syllabus Guides",
      description: "India's secure, bilingual government job portal. Access instant, verified Sarkari results, hall tickets, exam syllabus PDF downloads, and premium mocks.",
      keywords: "Sarkari Result 2026, Sarkari Exam, Government Jobs India, Latest Jobs, Admit Card, Exam Syllabus, State PSC Prep, SSC CGL mock simulator"
    },
    jobs: {
      title: "Latest Government Vacancies 2026 — Verified Sarkari Job Notification Alerts",
      description: "Explore the newest vacancies in defense, UPSC, SSC, teaching, banking, and state-level recruitment. Filter postings by qualifying degree.",
      keywords: "Latest Sarkari vacancy, government job recruitment, notifications 2026, SSC jobs, bank exams, qualification filter, defense vacancy"
    },
    calendar: {
      title: "Sarkari Exam Calendar 2026 — Key Dates, Syllabus Deadlines & Form Timelines",
      description: "Never miss a government recruitment key date. Check upcoming registration lines, preliminary examination dates, and scorecard schedules.",
      keywords: "Sarkari exam dates, test calendar 2026, registration deadline, UPSC schedule, SSC schedule, exam timelines"
    },
    'admit-cards': {
      title: "Sarkari Admit Cards 2026 — Download Hall Tickets & Exam Call Letters",
      description: "Direct official download corridors for your central and state-level entrance exam call letters. Download verified hall tickets safely.",
      keywords: "Download admit card, Sarkari admit card, hall ticket, call letter, up police admit card, ssc admit card online"
    },
    results: {
      title: "Sarkari Result 2026 — Check Merit Lists, Score Cards & Verified Cut-offs",
      description: "Fastest publishing node for school, state agency, state PSC, and SSC exam results. Verify candidate score cards and official merit ranks.",
      keywords: "Sarkari Result 2026, official exam results, check merit list, board results, cut off marks, scorecard check, qualify list"
    },
    'answer-key': {
      title: "Exam Answer Keys 2026 — Official Question Solved Sheets & Solution PDFs",
      description: "Cross-verify your answers with official answer key sets and previous exam solved answer guidelines before cut-off checks.",
      keywords: "Official answer key, exam keys 2026, question sheets solver, exam paper solutions, direct key pdf"
    },
    'mock-tests': {
      title: "Bilingual Free Mock Tests — Live Exam Simulator for UPSC, SSC & State Exams",
      description: "High-fidelity exam preparation suites with dynamic score feedback. Try interactive simulation tests bilingually with time limits.",
      keywords: "Free mock test, online test series, sarkari mock, ssc cgl mock bilingual, high-contrast mock, live test simulator"
    },
    dashboard: {
      title: "Candidate Performance Dashboard — Analytics & Mock Score Card tracker",
      description: "Monitor your study metrics, daily mock scorecard progress, completed categories, and analytics to boost your competitive edge.",
      keywords: "Aspirant dashboard, candidate analytics, study metrics, check preparation rank, mock test scores tracker"
    },
    syllabus: {
      title: "Official Exam Syllabus PDF — Detailed Subject-wise Curated Guidelines",
      description: "Download verified PDFs for UPSC Civil Services, Staff Selection, banks, and rail board exam syllabus guidelines. Plan bilingually.",
      keywords: "Sarkari Syllabus PDF, download official syllabus, exam syllabus 25/26, UPSC complete pattern, SSC syllabus keys"
    },
    pyqs: {
      title: "Previous Year Question Papers (PYQs) — Solved Exam PDFs & Booklets",
      description: "Complete database of previous year question papers mapped with fully worked-out step answers. Download revision packets securely.",
      keywords: "Sarkari PYQs download, solved papers, previous exam question booklets, SSC solved questions, UPSC pyqs"
    },
    uploads: {
      title: "Sarkari Document Upload Vault — Highly Encrypted Candidate Locker",
      description: "Digitally secure locker compliant with Section 43A of the Indian IT Act. Save hall tickets and syllabus checklists privately.",
      keywords: "Admit card locker, document vault, safe candidate storage, sarkari upload sandbox, IT act compliance"
    },
    'current-affairs': {
      title: "Daily Current Affairs 2026 — Hourly National & General Knowledge Blasts",
      description: "Stay ahead in competitive exams with bilingual daily news digests, custom monthly compilations, and dynamic GK questions.",
      keywords: "Daily current affairs, GK mcqs 2026, general knowledge, national news bulletin, exam GK capsule"
    },
    blog: {
      title: "Sarkari Success Blogs — Preparation Strategies & Toppers Mock Routines",
      description: "Master level guidelines and preparation strategies curated from successful administrative officers and competitive exam veterans.",
      keywords: "Sarkari blogs, topper strategies, government preparation guide, how to crack civil services, IAS tips"
    },
    premium: {
      title: "Unlock Sarkari Premium Member Zone — Google Gemini Doubt Guru",
      description: "Gain access to an ad-free premium environment featuring the advanced server-side Gemini AI Doubt Guru & immediate solved sheets.",
      keywords: "Sarkari premium, AI doubt solver, Gemini exam tutor, ad-free exam guide, best study preparation"
    },
    contact: {
      title: "Contact Official Support Helpdesk — Candidate Ticket Resolution",
      description: "Need help? File structural preparation feedback, premium account assistance, or platform bug tickets. Our officers are active.",
      keywords: "Sarkari query contact, customer help desk, support tickets, file feedback, student resolution panel"
    }
  },
  hi: {
    home: {
      title: "जॉब सरकारी हब — सरकारी परिणाम (Sarkari Result), एडमिट कार्ड और सरकारी नौकरी सिलेबस",
      description: "भारत का अग्रणी दुभाषी सरकारी नौकरी पोर्टल। वास्तविक समय में परीक्षा परिणाम, एडमिट कार्ड और आधिकारिक सिलेबस पीडीएफ डाउनलोड प्राप्त करें।",
      keywords: "सरकारी रिजल्ट 2026, सरकारी परीक्षा, सरकारी नौकरी अलर्ट, प्रवेश पत्र, परीक्षा का पाठ्यक्रम, एसएससी मॉक टेस्ट हिन्दी, यूपीएससी तैयारी"
    },
    jobs: {
      title: "नवीनतम सरकारी नौकरियां 2026 — सत्यापित वैकेंसी गजट और नोटिफिकेशन",
      description: "रक्षा, यूपीएससी, बैंक, रेलवे और राज्यीय स्तर के विभागों में नवीनतम वैकेंसियों की जांच करें। अपने डिग्री स्तर के अनुसार छांटें।",
      keywords: "नवीनतम सरकारी नौकरी, वैकेंसी नोटिफिकेशन 2026, सरकारी भर्ती, यूपी पुलिस जॉब वैकेंसी, योग्यता अनुसार नौकरियां"
    },
    calendar: {
      title: "परीक्षा कैलेंडर 2026 — महत्वपूर्ण तिथियां, आवेदन अंतिम तारीख और परीक्षा समय",
      description: "किसी भी भर्ती की मुख्य तिथि न चूकें। आगामी पंजीकरण, प्रारंभिक और मुख्य परीक्षा की समय सारणी यहां सत्यापित करें।",
      keywords: "परीक्षा कैलेंडर 2026, सरकारी एग्जाम तारीख, आवेदन समय सूची, यूपीपीएससी कैलेंडर, परीक्षा अनुसूची"
    },
    'admit-cards': {
      title: "एडमिट कार्ड 25/26 — परीक्षा प्रवेश पत्र और परीक्षा केंद्र कॉल लेटर्स",
      description: "विभिन्न केंद्रीय और राज्य स्तरीय परीक्षाओं के सत्यापित एडमिट कार्ड सीधे और सुरक्षित रूप से डाउनलोड करें।",
      keywords: "एडमिट कार्ड डाउनलोड, सरकारी प्रवेश पत्र, परीक्षा कॉल लेटर, हाल टिकट, एडमिट कार्ड ऑनलाइन लिंक"
    },
    results: {
      title: "सरकारी परीक्षा परिणाम 2026 — मैरिट लिस्ट, प्राप्तांक और आधिकारिक कट-ऑफ",
      description: "सभी सरकारी और राज्य भर्ती आयोगों के परिणाम सबसे तेज पाने का विश्वसनीय स्थान। अपने स्कोर कार्ड और कट-ऑफ अंक देखें।",
      keywords: "सरकारी परीक्षा परिणाम 2026, रिजल्ट चेक, मैरिट लिस्ट स्कोर, कट ऑफ नंबर, बोर्ड एग्जाम रिजल्ट, स्कोरकार्ड डाउनलोड"
    },
    'answer-key': {
      title: "उत्तर कुंजी 2026 — परीक्षा हल प्रश्न पत्र और आंसर-की सोल्यूशन शीट",
      description: "परीक्षा परिणाम से पहले बोर्ड द्वारा जारी आधिकारिक उत्तर कुंजियों से अपने प्रश्नों का मिलान करें और पीडीएफ डाउनलोड करें।",
      keywords: "परीक्षा उत्तर कुंजी, ऑफिशियल आंसर की, साल्व्ड पेपर शीट, परीक्षा हल पीडीऍफ़, डायरेक्ट आंसर-की डाउनलोड"
    },
    'mock-tests': {
      title: "निःशुल्क दुभाषी मॉक टेस्ट — एसएससी, यूपीएससी, रेलवे परीक्षा लाइव सिम्युलेटर",
      description: "समय सीमा और वास्तविक स्कोरकार्ड विश्लेषण के साथ भारत के चुनिंदा मॉक टेस्ट हल करें। हिन्दी और अंग्रेजी में पूर्ण रूप से उपलब्ध।",
      keywords: "निःशुल्क मॉक टेस्ट, ऑनलाइन परीक्षा सीरीज, परीक्षा अभ्यास पत्र, हिंदी इंग्लिश मॉक टेस्ट, एसएससी सीजीएल हिंदी मॉक"
    },
    dashboard: {
      title: "आकांक्षी प्रगति डैशबोर्ड — तैयारी ट्रैकर और मॉक स्कोर कार्ड रिपोर्ट",
      description: "अपने अध्ययन समय, साप्ताहिक मॉक टेस्ट स्कोरकार्ड्स और पूर्ण किए गए विषयों के ग्राफिकल विश्लेषण की जांच खुद करें।",
      keywords: "विद्यार्थी डैशबोर्ड, तैयारी का ग्राफ, मॉक टेस्ट परिणाम विवरण, प्रोग्रेस ट्रैकर"
    },
    syllabus: {
      title: "आधिकारिक परीक्षा पाठ्यक्रम पीडीऍफ़ — सिलेबस डाउनलोड गाइड",
      description: "यूपीएससी सिविल सेवा, एसएससी, रेलवे और राज्य पीएससी परीक्षाओं के सटीक और आधिकारिक नवीनतम सिलेबस पीडीएफ डाउनलोड करें।",
      keywords: "सरकारी सिलेबस डाउनलोड, एग्जाम पाठ्यक्रम पीडीएफ, नया सिलेबस, यूपीएससी मुख्य परीक्षा पैटर्न, एसएससी सिलेबस"
    },
    pyqs: {
      title: "विगत वर्षों के साल्व्ड प्रश्न पत्र (PYQs) — हल प्रश्न पत्र और उत्तर",
      description: "पिछले वर्षों के प्रश्न पत्रों का हल सहित पूरा डेटाबेस। अपनी तैयारी मजबूत करने हेतु पीडीएफ फाइल्स सुरक्षित डाउनलोड करें।",
      keywords: "पुराने पेपर्स डाउनलोड, विगत वर्ष प्रश्न पत्र, सॉल्व्ड पेपर्स, सरकारी परीक्षा ओल्ड पेपर पीडीऍफ़"
    },
    uploads: {
      title: "दस्तावेज़ सुरक्षित अपलोड वॉल्ट — डिजिटली एन्क्रिप्टेड लॉकर",
      description: "आईटी एक्ट की धारा 43ए के तहत सुरक्षित सैंडबॉक्स लॉकर। अपने प्रवेश पत्र और तैयारी चेकलिस्ट को पूरी गोपनीयता संग सहेजें।",
      keywords: "एडमिट कार्ड लॉकर, सुरक्षित स्टूडेंट क्लाउड, सरकारी डॉक्युमेंट अपलोड, स्टूडेंट फाइल सैंडबॉक्स"
    },
    'current-affairs': {
      title: "दैनिक करंट अफेयर्स 2026 — हिंदी एवं इंग्लिश जीके बुलेटिन",
      description: "प्रतियोगी परीक्षाओं की तैयारी हेतु दैनिक सामान्य ज्ञान समाचार कैप्सूल, मासिक पत्रिका और लाइव जीके क्विज़ प्रश्नोत्तरी।",
      keywords: "दैनिक करंट अफेयर्स, हिंदी जीके एमसीक्यू 2026, सामान्य ज्ञान बुलेटिन, समाचार विश्लेषण"
    },
    blog: {
      title: "सफलता के ब्लॉग — प्रशासनिक अधिकारी और टॉपर्स की तैयारी रणनीतियाँ",
      description: "यूपीएससी, राज्य पीएससी और एसएससी परीक्षाओं में शीर्ष रैंक हासिल करने वाले मार्गदर्शकों के लेख और विशेष टाइम-टेबल्स।",
      keywords: "सरकारी ब्लॉग, टॉपर्स रणनीति, परीक्षा की तैयारी कैसे करें, आईएएस बनने के टिप्स, सरकारी जॉब गाइड"
    },
    premium: {
      title: "सरकारी प्रीमियम मेम्बरशिप — गूगल जेमिनी एआई डाउट गुरु",
      description: "प्रीमियम विज्ञापन-रहित तैयारी पोर्टल। अपने किसी भी संदेह और कठिन प्रश्न का तत्काल जेमिनी एआई द्वारा हल पाएं।",
      keywords: "सरकारी प्रीमियम, एआई डाउट सॉल्वर, जेमिनी परीक्षा ट्यूटर, एड-फ्री एग्जाम गाइड"
    },
    contact: {
      title: "सहायता केंद्र संपर्क — उम्मीदवार समस्या निवारण कक्ष",
      description: "क्या आपको तैयारी में सहायता या प्रीमियम शिकायत है? तुरंत टिकट दर्ज करें। हमारी समर्पित फैकल्टी सहयोग करेगी।",
      keywords: "सहायता संपर्क, टिकट दर्ज करें, स्टूडेंट हेल्प डेस्क, शिकायत निवारण, सरकारी हब सपोर्ट"
    }
  },
  mr: {
    home: {
      title: "जॉब सरकारी हब — सरकारी निकाल, प्रवेशपत्र आणि अभ्यासक्रम डाऊनलोड",
      description: "महाराष्ट्रातील विद्यार्थ्यांसाठी द्विभाषिक नोकरी भरती पोर्टल. त्वरित निकाल, प्रवेशपत्र आणि परिपूर्ण अभ्यासक्रम मिळवा.",
      keywords: "सरकारी निकाल, सरकारी नोकरी, एमपीएससी २०२६, नवीन जाहिराती, अभ्यासक्रम, मॉक टेस्ट"
    }
  },
  rj: {
    home: {
      title: "जॉब सरकारी हब — सरकारी नौकरी रो नतीजो, प्रवेश पत्र अर एकदम साचो सिलेबस",
      description: "राजस्थान रो सबसूं भलो और सुरक्षित नौकरी परीक्षा पोर्टल। आरपीएससी, पटवार परीक्षा री सटीक खबरें साचे मन सूं देखो।",
      keywords: "सरकारी नतीजो, परीक्षा सिलेबस आरपीएससी, पटवार भर्ती, राजस्थान पुलिस प्रवेश पत्र"
    }
  }
};

/**
 * Dynamically updates primary SEO Meta elements in the header based on active tab and language locale.
 */
export function updateSEOMetadata(
  activeTab: string, 
  locale: LocaleType = 'en', 
  subCategory?: string,
  extraSubCategory?: string
) {
  try {
    // Falls back to EN if MR/RJ map is missing or doesn't have the key
    const localeMap = SEO_MAP[locale] || SEO_MAP.en;
    const tabSEO = localeMap[activeTab] || SEO_MAP.en[activeTab] || SEO_MAP.en.home;

    const currentTitle = tabSEO.title;
    const currentDesc = tabSEO.description;
    const currentKeywords = tabSEO.keywords;

    // 1. Update Title
    document.title = currentTitle;

    // 2. Update Primary Description
    let checkDescMeta = document.querySelector('meta[name="description"]');
    if (!checkDescMeta) {
      checkDescMeta = document.createElement('meta');
      checkDescMeta.setAttribute('name', 'description');
      document.head.appendChild(checkDescMeta);
    }
    checkDescMeta.setAttribute('content', currentDesc);

    // 3. Update Primary Keywords
    let checkKeywordsMeta = document.querySelector('meta[name="keywords"]');
    if (!checkKeywordsMeta) {
      checkKeywordsMeta = document.createElement('meta');
      checkKeywordsMeta.setAttribute('name', 'keywords');
      document.head.appendChild(checkKeywordsMeta);
    }
    checkKeywordsMeta.setAttribute('content', currentKeywords);

    const baseUrl = "https://sarkari-job-hub-v595.onrender.com";
    const currentUrl = baseUrl + (activeTab === 'home' ? '/' : `/${activeTab}`);

    // 5. Update Open Graph (OG) tags
    const ogProperties = {
      'og:title': currentTitle,
      'og:description': currentDesc,
    };

    Object.entries(ogProperties).forEach(([prop, val]) => {
      let ogMeta = document.querySelector(`meta[property="${prop}"]`);
      if (!ogMeta) {
        ogMeta = document.createElement('meta');
        ogMeta.setAttribute('property', prop);
        document.head.appendChild(ogMeta);
      }
      ogMeta.setAttribute('content', val);
    });

    // 5.5 Update Twitter Meta tags
    const twitterProperties = {
      'twitter:title': currentTitle,
      'twitter:description': currentDesc,
    };

    Object.entries(twitterProperties).forEach(([name, val]) => {
      let twMeta = document.querySelector(`meta[name="${name}"]`);
      if (!twMeta) {
        twMeta = document.createElement('meta');
        twMeta.setAttribute('name', name);
        document.head.appendChild(twMeta);
      }
      twMeta.setAttribute('content', val);
    });

    // 6. Inject or Dynamic Refresh JSON-LD Breadcrumb / Schema Structured Object
    let schemaScript = document.getElementById('sarkari-dynamic-seo-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('id', 'sarkari-dynamic-seo-schema');
      schemaScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(schemaScript);
    }

    const breadcrumbList = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'hi' ? "मुख्य पृष्ठ" : "Home",
        "item": baseUrl + "/"
      }
    ];

    if (activeTab !== 'home') {
      const parentName = activeTab === 'admit-cards' ? (locale === 'hi' ? "प्रवेश पत्र" : "Admit Cards") : 
                         activeTab === 'results' ? (locale === 'hi' ? "परीक्षा परिणाम" : "Results") :
                         activeTab === 'mock-tests' ? (locale === 'hi' ? "मॉक टेस्ट" : "Mock Tests") :
                         activeTab === 'syllabus' ? (locale === 'hi' ? "पाठ्यक्रम" : "Syllabus") :
                         activeTab === 'jobs' ? (locale === 'hi' ? "सरकारी नौकरियां" : "Jobs") :
                         activeTab === 'calendar' ? (locale === 'hi' ? "परीक्षा कैलेंडर" : "Exam Calendar") :
                         activeTab === 'current-affairs' ? (locale === 'hi' ? "करंट अफेयर्स" : "Current Affairs") :
                         activeTab === 'blog' ? (locale === 'hi' ? "ब्लॉग" : "Blogs") :
                         activeTab === 'premium' ? (locale === 'hi' ? "प्रीमियम" : "Premium") :
                         activeTab === 'contact' ? (locale === 'hi' ? "संपर्क" : "Contact") :
                         activeTab === 'dashboard' ? (locale === 'hi' ? "डैशबोर्ड" : "Dashboard") :
                         activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ');

      breadcrumbList.push({
        "@type": "ListItem",
        "position": 2,
        "name": parentName,
        "item": baseUrl + `/${activeTab}`
      });

      if (subCategory && subCategory !== 'All') {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 3,
          "name": subCategory,
          "item": baseUrl + `/${activeTab}?category=${encodeURIComponent(subCategory.toLowerCase())}`
        });

        if (extraSubCategory && extraSubCategory !== 'All') {
          breadcrumbList.push({
            "@type": "ListItem",
            "position": 4,
            "name": extraSubCategory,
            "item": baseUrl + `/${activeTab}?category=${encodeURIComponent(subCategory.toLowerCase())}&filter=${encodeURIComponent(extraSubCategory.toLowerCase())}`
          });
        }
      } else if (extraSubCategory && extraSubCategory !== 'All') {
        breadcrumbList.push({
          "@type": "ListItem",
          "position": 3,
          "name": extraSubCategory,
          "item": baseUrl + `/${activeTab}?filter=${encodeURIComponent(extraSubCategory.toLowerCase())}`
        });
      }
    }

    const jsonLdMarkup = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": currentTitle,
      "description": currentDesc,
      "url": currentUrl,
      "genre": "Educational Portal",
      "audience": {
        "@type": "Audience",
        "audienceType": "Indian Competitive Government Exam Aspirants"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbList
      }
    };

    schemaScript.innerHTML = JSON.stringify(jsonLdMarkup, null, 2);

  } catch (error) {
    console.error("SEO Metadata dynamic update failed:", error);
  }
}
