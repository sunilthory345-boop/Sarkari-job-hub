import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Plus, 
  BookOpen, 
  SearchCode, 
  ChevronRight, 
  TrendingUp, 
  Languages, 
  Share2, 
  Printer, 
  MessageSquare, 
  Send,
  ThumbsUp,
  Check,
  Award,
  HelpCircle
} from 'lucide-react';
import { Blog } from '../types';

interface SarkariBlogPortalProps {
  blogs: Blog[];
  onAddBlog: (newBlog: Blog) => void;
  triggerToast: (msg: string) => void;
}

// Highly detailed SEO pre-populated blogs bilingually mapped
const SEO_DEFAULT_BLOGS: Blog[] = [
  {
    id: 'seo-blog-up-police',
    title: 'UP Police Constable Recruitment 2026: Official Syllabus & Safe Scoring Target',
    category: 'Government Jobs',
    author: 'Sunil Kumar (Sarkari Hub SEO Analyst)',
    summary: 'Direct updates on UPPRPB UP Police Constable vacancies. Detailed 150 MCQ breakdown, subject-weightage, and free offline-printable mock syllabus guides.',
    content: `UP Police Constable Recruitment Board (UPPRPB) has officially accelerated notifications for 2026. If you are aiming for high-ranking positions, understanding the structured subject density is vital for optimizing your study hours.

### 📈 Exam Pattern & Marks Distribution:
The examination will have 150 Multiple Choice Questions (MCQs) for a total of 300 marks. The crucial catch is the negative scoring penalty of -0.50 marks for each incorrect attempt.

* **General Knowledge (सामान्य ज्ञान):** 38 Questions (76 Marks)
* **General Hindi (सामान्य हिन्दी):** 37 Questions (74 Marks)
* **Numerical & Mental Ability (मैथ्स):** 38 Questions (76 Marks)
* **Mental Aptitude/IQ (रीजनिंग):** 37 Questions (74 Marks)

### 💡 High-Yield preparation keywords to target for SEO:
To rank candidate advice blogs higher in northern regions like Uttar Pradesh and Bihar, optimize search density for keywords like 'Sarkari Result UP Police', 'UP Police Syllabus PDF', and 'Free online mock tests'. 

### 🌟 Key Areas to Focus:
1. **General Hindi:** Command over standard Hindi Grammar (संधि, समास, पर्यायवाची, विलोम शब्द) guarantees simple speed scoring.
2. **Mental Aptitude:** Practice coded relations and non-verbal spatial reasoning.
3. **Daily Revision:** Set a daily timer for 60 minutes solving previous year papers (2019-2025). Keep a dedicated diary to log incorrect attempts for weekly review.`,
    readTime: '6 min read',
    date: '2026-06-13'
  },
  {
    id: 'seo-blog-ssc-cgl',
    title: 'How to Crack SSC CGL 2026 Maths with 95%+ Accuracy: Time Management Secrets',
    category: 'Preparation Strategy',
    author: 'Alok Pandey (Quant Ranker 2023)',
    summary: 'Dominate Stafford Selection Commission Tier-1 & Tier-2 Quantitative Aptitude. Advanced shortcuts for Successive percentages, Ratio Compound, and Algebra.',
    content: `Staff Selection Commission (SSC) exams are speed-tests of intelligence. In CGL, you only get 60 minutes in Tier-1 to solve 100 questions. Quantitative section carries 25 questions where time spent can make or break your qualifying score.

### ⚡ Secret Math Formula Blueprints:
* **Successive Percentages:** Instant net gain formula for price markups and sequential discounts is $x - y - \frac{xy}{100}\%$.
* **Ratio Compounding:** For quick variable normalization, when $A:B=2:3$ and $B:C=4:5$, make the middle coefficient common ($A:B:C = 8:12:15$).
* **Algebraic Shortcuts:** Memorize standard Pythagorean triplets (3-4-5, 5-12-13, 8-15-17) to bypass lengthy trigonometry expansions.

### ⏳ Time Allotment Guidelines:
Do not spend more than 40 seconds on any single mathematics equation. If a puzzle appears lengthy, utilize the 'Mark for Review' button to protect your confidence pool. Review other high-yield GK and English elements before returning.`,
    readTime: '8 min read',
    date: '2026-06-11'
  },
  {
    id: 'seo-blog-sbi-po',
    title: 'SBI PO 2026 Selection Blueprint: Master Prelims Quant & Mains Strategy',
    category: 'Preparation Strategy',
    author: 'Siddharth Sharma (Ex-SBI PO Trainer)',
    summary: 'Expert roadmap to secure Probationary Officer postings in State Bank of India. In-depth analysis of 3-tier selection pattern, previous cutoffs, and mock shortcuts.',
    content: `State Bank of India (SBI) is the premier public sector bank in the nation, and its Probationary Officer (PO) exam is highly competitive. To crack SBI PO 2026, aspirants must strategize separately for Prelims (Speed Focus) and Mains (Depth Focus).

### 📊 Exam Structure and Key Cutoffs:
1. **Prelims CBT (100 Marks):** 1 Hour duration. English (30 Qs), Quantitative Aptitude (35 Qs), Reasoning Ability (35 Qs).
2. **Mains Examination (250 Marks):** Features advanced Data Analysis, Deep Reasoning, General Economy/Banking Awareness, and a descriptive writing test (30 minutes, 50 marks).

### 💡 High-Yield prep strategy:
* **State Bank of India Shortcuts:** Focus heavily on Simplifications, Quadratic equations, and Data Interpretation (DI) tables.
* **Bilingual Vocabulary Building:** Practice writing sample letters and essays bilingually in Hindi and English. Reading daily business newspapers like 'The Economic Times' or editorials boosts both GA and English sections.`,
    readTime: '7 min read',
    date: '2026-06-12'
  },
  {
    id: 'seo-blog-railway-group-d',
    title: 'Railway Group D 2026: Official Physical Efficiency Criteria & High Score Blueprint',
    category: 'Government Jobs',
    author: 'Ravi Ranjan (Railway Coaching Mentor)',
    summary: 'Complete step-by-step physical eligibility standards, medical exams, and CBT marks weightage. Master General Science and Maths to clear high cutoffs.',
    content: `Railway Recruitment Cell (RRC) Group D examination requires comprehensive physical endurance alongside intellectual knowledge. Over 1 lakh vacancies test candidates across rigorous stages.

### 🏃 Physical Efficiency Test (PET) Benchmarks:
* **Male Candidates:** Must lift and carry 35 kg weight for a distance of 100 meters in 2 minutes in one attempt; and run 1000 meters in 4 minutes and 15 seconds.
* **Female Candidates:** Must lift and carry 20 kg weight for a distance of 100 meters in 2 minutes; and run 1000 meters in 5 minutes and 40 seconds.

### 📝 Computer-Based Test (CBT) Weights:
* **General Science:** 25 Questions (tenth standard NCERT physics, chemistry, and biology)
* **Mathematics:** 25 Questions
* **General Intelligence & Reasoning:** 30 Questions
* **General Awareness & Current Affairs:** 20 Questions
Total duration is 90 minutes. Target securing 75+ correct hits for safe qualification in key zones.`,
    readTime: '6 min read',
    date: '2026-06-14'
  },
  {
    id: 'seo-blog-railway-rpf-si',
    title: 'Railway RPF SI 2026: Police Sub-Inspector Physical Standard (PST) & Ground Norms',
    category: 'Exam Tips',
    author: 'Commander Vikram Singh (Retd.)',
    summary: 'Aspirant checklist for Railway Protection Force (RPF) Sub Inspector notification. Detailed high-jump, long-jump, running limits, and syllabus coverage.',
    content: `Railway Protection Force (RPF) conducts recruitment for Sub Inspector positions offering excellent national careers. The selection rests on a rigorous written test followed by stringent Physical Measurement Tests (PMT).

### 🚔 Complete Written CBT Syllabus (120 Questions in 90 Mins):
* **General Awareness:** 50 Questions (focus on Constitution, History, Geography, and current sports results)
* **Arithmetic:** 35 Questions (focus on percentages, averages, interest, and tables)
* **General Intelligence & Reasoning:** 35 Questions

### 🏁 Physical Standards requirements:
* Males: 1600 meters running in 6m 30s. Long Jump: 12 feet, High Jump: 3 feet 9 inches.
* Females: 800 meters running in 4 minutes. Long Jump: 9 feet, High Jump: 3 feet.`,
    readTime: '6 min read',
    date: '2026-06-15'
  },
  {
    id: 'seo-blog-nhm-coldchain',
    title: 'NHM ANM Auxiliary Nurse Guidance: National Healthcare Cold Chain Exam Questions',
    category: 'Exam Tips',
    author: 'Dr. Reeta Verma (Senior Medical Officer)',
    summary: 'Comprehensive review syllabus for NHM auxiliary vaccinations, cold chain storage limits, and child immunization tables.',
    content: `For aspirants preparing for State auxiliary nursing and clinical health vaccines recruitment, the Technical Domain topic holds high weight. 

### 💉 Essential Immunization Notes:
The cold-chain storage infrastructure keeps vaccines potent through strict temperature bounds:
* **Safe Storage Bounds:** Non-freezer vaccinations (like BCG, HepB, and Measles-Rubella) must strictly reside within **$+2^{\circ}\text{C}$ to $+8^{\circ}\text{C}$**. OPV (Oral Polio Vaccine) is stored at $-20^{\\circ}\text{C}$ inside deep freezers.
* **BCG Vaccine Dosage:** Administered right at birth intradermally on the left upper arm at a micro-dosage of $0.05$ ml.
* **Anterolateral Thigh:** Ideal path for modern infant muscular injections.

### 📝 Preparation Advice:
Attempt 10 localized clinical mock papers bilingually on Job Sarkari Hub. Analyze previous year papers systematically to identify repeating technical terminologies.`,
    readTime: '5 min read',
    date: '2026-06-08'
  }
];

// Bilingual translations dictionary mapping for instant language toggling
const BLOG_TRANSLATIONS: Record<string, { title: string; summary: string; content: string }> = {
  'seo-blog-up-police': {
    title: 'यूपी पुलिस कांस्टेबल भर्ती 2026: आधिकारिक नया पाठ्यक्रम और सुरक्षित स्कोर का लक्ष्य',
    summary: 'UPPRPB यूपी पुलिस कांस्टेबल रिक्तियों पर सीधी अपडेट। विस्तृत 150 एमसीक्यू विश्लेषण, विषय-वार वेटेज, और प्रिंट करने योग्य मॉक गाइड।',
    content: `उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड (UPPRPB) ने 2026 के लिए आधिकारिक तैयारियां तेज कर दी हैं। यदि आप इस भर्ती में उच्च रैंक हासिल करना चाहते हैं, तो व्यवस्थित विषय-वार वेटेज को समझना आपके अध्ययन के घंटों को अनुकूलित करने के लिए सबसे महत्वपूर्ण है।

### 📈 परीक्षा पैटर्न और अंक विभाजन:
इस परीक्षा में कुल 300 अंकों के लिए 150 बहुविषयक वस्तुनिष्ठ प्रश्न (MCQ) पूछे जाएंगे। प्रत्येक गलत उत्तर के लिए -0.50 अंकों का नकारात्मक अंकन (Negative Marking) किया जाएगा।

* **सामान्य ज्ञान (General Knowledge):** 38 प्रश्न (76 अंक)
* **सामान्य हिन्दी (General Hindi):** 37 प्रश्न (74 अंक)
* **संख्यात्मक और मानसिक क्षमता (Maths):** 38 प्रश्न (76 अंक)
* **मानसिक अभिरुचि/तार्किक क्षमता (Reasoning):** 37 प्रश्न (74 अंक)

### 💡 एसईओ (SEO) और तैयारी युक्तियाँ:
उत्तर भारत के क्षेत्रों में अपनी तैयारी को आगे बढ़ाने के लिए 'Sarkari Result UP Police', 'UP Police Syllabus PDF' और 'निःशुल्क मॉक टेस्ट' पर ध्यान केंद्रित करें।

### 🌟 तैयारी के मुख्य रणनीतिक बिंदु:
1. **सामान्य हिन्दी:** व्याकरण खंड (संधि, समास, पर्यायवाची, विलोम) पर अच्छी पकड़ आपको बहुत कम समय में 100% सही स्कोर और बढ़त दिला सकती है।
2. **तार्किक क्षमता:** कोडेड ब्लड रिलेशन और नॉन-वर्बल इमेज रीजनिंग का अधिक अभ्यास करें।
3. **दैनिक अभ्यास:** पुराने प्रश्नपत्रों (2019-2025) को हल करने के लिए रोजाना 60 मिनट का समय निर्धारित करें और एक डायरी में अपनी गलतियों को लिखें।`
  },
  'seo-blog-ssc-cgl': {
    title: 'एसएससी सीजीएल 25+ गणित में 95%+ सटीकता कैसे लाएं: गति प्रबंधन रणनीति',
    summary: 'एसएससी सीजीएल टियर-1 और टियर-2 क्वांटिटेटिव एप्टीट्यूड पर विजय प्राप्त करें। लगातार प्रतिशत, अनुपात और बीजगणित के सुपरफास्ट शॉर्टकट।',
    content: `कर्मचारी चयन आयोग (SSC) की परीक्षा केवल ज्ञान की नहीं बल्कि अत्यधिक गति की परीक्षा है। सीजीएल टियर-1 में 100 प्रश्नों को हल करने के लिए कुल 60 मिनट मिलते हैं।

### ⚡ गुप्त गणित सूत्र और शॉर्टकट:
* **लगातार प्रतिशत परिवर्तन (Successive Percentages):** क्रमिक छूट या मूल्य वृद्धि के लिए नेट फॉर्मूला: $x - y - \frac{xy}{100}\%$ है।
* **अनुपात सरलीकरण:** जब $A:B=2:3$ और $B:C=4:5$ हो, तो मध्य पद को बराबर बनाकर अनुपात $A:B:C = 8:12:15$ निर्धारित करें।
* **त्रिकोणमिति तथा ज्यामिति:** समकोण त्रिभुज के बुनियादी ट्रिपलेट्स (3-4-5, 5-12-13, 8-15-17, 7-24-25) को याद रखें ताकि पाइथागोरस लगाने में बहुमूल्य समय बच सके।

### ⏳ परीक्षा हॉल समय प्रबंधन नियम:
किसी भी गणित के प्रश्न पर 40 सेकंड से अधिक समय व्यतीत न करें। यदि प्रश्न लंबा लगे, तो तुरंत 'Mark for Review' करें और जीके तथा अंग्रेजी को पहले समाप्त करके अंत में गणित पर वापस आएं।`
  },
  'seo-blog-nhm-coldchain': {
    title: 'एनएचएम एएनएम स्वास्थ्य गाइड: राष्ट्रीय कोल्ड चेन और टीकाकरण से जुड़े महत्वपूर्ण प्रश्न',
    summary: 'सहायक नर्स मिडवाइफ परीक्षाओं के लिए तकनीकी चिकित्सा पाठ्यक्रम, वैक्सीन भंडारण सीमाएं और बाल रोग प्रतिरक्षण चार्ट।',
    content: `नर्सिंग एवं जन स्वास्थ्य विभाग की भर्ती परीक्षाओं की तैयारी करने वाले अभ्यर्थियों के लिए तकनीकी विषय का अंक भार अत्यधिक होता है।

### 💉 महत्वपूर्ण टीकाकरण और कोल्ड-चेन नोट्स:
टीके की प्रभावशीलता सुरक्षित रखने के लिए कोल्ड-चेन का तापमान जानना अत्यंत आवश्यक है:
* **सुरक्षित तापमान सीमा:** गैर-फ्रीजर वैक्सीन (जैसे BCG, HepB, खसरा-रूबेला) अनिवार्य रूप से **$+2^{\circ}\text{C}$ से $+8^{\circ}\text{C}$** तापमान के बीच संचित की जाती हैं। पोलियो वैक्सीन (OPV) को डीप फ्रीजर में $-20^{\circ}\text{C}$ पर रखा जाता है।
* **बीसीजी वैक्सीन खुराक:** जन्म के समय बाईं ऊपरी बांह पर त्वचा के भीतर (Intradermal) $0.05$ ml की सूक्ष्म खुराक दी जाती है।

### 📝 तैयारी की अनूठी सलाह:
Job Sarkari Hub पर दिए गए नर्सिंग विशिष्ट द्विभाषी मॉक टेस्ट अवश्य दें और दोहराएं।`
  },
  'seo-blog-sbi-po': {
    title: 'एसबीआई पीओ 2026 तैयारी रोडमैप: प्रीलिम्स और मेन्स में सफलता की संपूर्ण रणनीति',
    summary: 'स्टेट बैंक ऑफ इंडिया में प्रोबेशनरी ऑफिसर (PO) बनने का पूरा ब्लूप्रिंट। 3-चरणीय चयन प्रक्रिया, पिछले वर्ष के कट-ऑफ और शॉर्टकट ट्रिक्स।',
    content: `भारतीय स्टेट बैंक (SBI) देश का सबसे प्रतिष्ठित राष्ट्रीयकृत बैंक है, और इसका पीओ परीक्षा बैंकिंग जगत की सबसे कठिन परीक्षा मानी जाती है। एसबीआई पीओ 25-26 के चयन के लिए प्रीलिम्स (गति आधारित) और मेन्स (गहन विश्लेषण आधारित) परीक्षाओं की रणनीति अलग होनी चाहिए।

### 📊 परीक्षा प्रारूप और मुख्य कट-ऑफ:
1. **प्रीलिम्स परीक्षा (100 अंक):** 1 घंटा समय। अंग्रेजी भाषा (30 प्रश्न), संख्यात्मक योग्यता (35 प्रश्न), तार्किक क्षमता (35 प्रश्न)।
2. **मुख्य परीक्षा (250 अंक):** उच्च स्तरीय डेटा इंटरप्रिटेशन, तार्किक क्षमता और कंप्यूटर योग्यता, सामान्य/बैंकिंग जागरूकता। साथ ही निबंध और पत्र लेखन (50 अंक, 30 मिनट)।

### 💡 महत्वपूर्ण स्कोरिंग युक्तियाँ:
* **फ्रीक्वेंट सिंपलीफिकेशन अभ्यास:** संख्या श्रृंखला (Number Series), सरलीकरण और द्विघात समीकरण के प्रश्नों को उंगलियों पर हल करना सीखें।
* **व्यावसायिक संपादकीय पठन:** 'The Economic Times' या 'The Hindu' के संपादकीय खंड को नियमित रूप से पढ़ना सामान्य ज्ञान के साथ-साथ कठिन आरसी (Reading Comprehension) हल करने में मदद करता है।`
  },
  'seo-blog-railway-group-d': {
    title: 'रेलवे ग्रुप डी परीक्षा 2026: शारीरिक पात्रता परीक्षा मानक और सीबीटी स्कोरिंग गाइड',
    summary: 'आरआरसी ग्रुप डी रिक्तियों के लिए चरण-वार शारीरिक दक्षता परीक्षा (PET), वजन उठाने के नियम, मेडिकल जांच और महत्वपूर्ण विषय।',
    content: `रेलवे भर्ती सेल (RRC) ग्रुप डी परीक्षा देश की सबसे बड़ी परीक्षाओं में से एक है। इसमें उच्च बौद्धिक ज्ञान के साथ-साथ उत्कृष्ट शारीरिक सहनशक्ति का भी परीक्षण किया जाता है।

### 🏃 शारीरिक दक्षता परीक्षा (PET) मानक नियम:
* **पुरुष अभ्यर्थी:** 35 किलोग्राम वजन को 2 मिनट में बिना नीचे गिराए निरंतर 100 मीटर की दूरी तक ले जाना; और 4 मिनट 15 सेकंड में 1000 मीटर की दौड़ पूरी करना।
* **महिला अभ्यर्थी:** 20 किलोग्राम वजन को 2 मिनट में बिना नीचे गिराए 100 मीटर की दूरी तक ले जाना; और 5 मिनट 40 सेकंड में 1000 मीटर दौड़ पूरी करना।

### 📝 लिखित कंप्यूटर टेस्ट (CBT) का अंक विभाजन:
* **सामान्य विज्ञान (NCERT 10th):** 25 प्रश्न
* **गणित (Quantitative Aptitude):** 25 प्रश्न
* **सामान्य बुद्धि और तर्कशक्ति:** 30 प्रश्न
* **सामान्य जागरूकता और सामयिकी:** 20 प्रश्न
कुल 100 अंकों की इस परीक्षा में सुरक्षित दौड़ के लिए कम से कम 75+ का लक्ष्य निर्धारित करें।`
  },
  'seo-blog-railway-rpf-si': {
    title: 'आरपीएफ सब-इंस्पेक्टर भर्ती 2026: शारीरिक मानक (PST), लिखित पाठ्यक्रम और नियम',
    summary: 'रेलवे सुरक्षा बल (RPF) दरोगा भर्ती परीक्षा का पूर्ण विवरण। लिखित परीक्षा सिलेबस, लंबी कूद, ऊंची कूद और ग्राउंड ट्रेनिंग मानक।',
    content: `रेलवे सुरक्षा बल (RPF) में सब-इंस्पेक्टर (Sub-Inspector) पद पर चयन के लिए लिखित परीक्षा (CBT) के साथ-साथ अत्यंत कठिन फिजिकल टेस्ट को पास करना अनिवार्य होता है।

### 🚔 लिखित सामान्य परीक्षा का विवरण (120 प्रश्न, 90 मिनट):
* **सामान्य ज्ञान व जागरूकता:** 50 प्रश्न (संविधान, इतिहास, खेल, करंट अफेयर्स)
* **अंकगणित:** 35 प्रश्न (औसत, प्रतिशत, लाभ-हानि, अनुपात)
* **सामान्य बुद्धि व तार्किक विचार:** 35 प्रश्न

### 🏁 शारीरिक दक्षता परीक्षा (PET) मानक:
* **पुरुष:** 6 मिनट 30 सेकंड में 1600 मीटर दौड़। ऊंची कूद: 3 फीट 9 इंच, लंबी कूद: 12 फीट।
* **महिला:** 4 मिनट में 800 मीटर दौड़। ऊंची कूद: 3 फीट, लंबी कूद: 9 फीट।
सभी शारीरिक परीक्षणों में केवल क्वालीफाई करना होता है, परंतु इनमें उत्तीर्ण होना अनिवार्य है।`
  }
};

// MCQ Assessment Quizzes for default blogs
const BLOG_QUIZZES: Record<string, { question: string; options: string[]; correctIndex: number; explanation: string }[]> = {
  'seo-blog-up-police': [
    {
      question: 'What is the negative marking penalty for an incorrect option in UP Police Constable Exam?',
      options: ['-0.25 marks', '-0.50 marks', '-1.00 marks', 'No negative marking'],
      correctIndex: 1,
      explanation: 'UP Police Constable written exams deduct 0.50 marks for every wrong answer while awarding 2 marks for a correct one.'
    },
    {
      question: 'How many total questions are asked during the official constable written test?',
      options: ['100 Questions', '120 Questions', '150 Questions', '200 Questions'],
      correctIndex: 2,
      explanation: 'The paper comprises 150 multiple choice questions with a maximum credit of 300 marks.'
    }
  ],
  'seo-blog-ssc-cgl': [
    {
      question: 'Which trigonometric Pythagorean triplet below is extremely helpful to bypass long geometry calculations?',
      options: ['3 - 5 - 8', '5 - 12 - 13', '4 - 8 - 12', '6 - 9 - 15'],
      correctIndex: 1,
      explanation: '5-12-13 is a standard Pythagorean triplet where 5² + 12² = 13² (25 + 144 = 169).'
    }
  ],
  'seo-blog-nhm-coldchain': [
    {
      question: 'Which temperature range must non-freezer vaccinations (like BCG, HepB) strictly be stored in?',
      options: ['-20°C to -10°C', '0°C to +4°C', '+2°C to +8°C', '+10°C to +15°C'],
      correctIndex: 2,
      explanation: 'Cold-chain standards require non-freezer immunizations to remain within safe margins of $+2°C$ to $+8°C$.'
    }
  ],
  'seo-blog-sbi-po': [
    {
      question: 'How many subjects compose the SBI PO Prelims online entrance test?',
      options: ['2 Sub-sections', '3 Sub-sections (English, Quant, Reasoning)', '4 Sub-sections', '5 Sub-sections'],
      correctIndex: 1,
      explanation: 'SBI PO Prelims features exactly 3 sections: English Language (30 marks), Quantitative Aptitude (35 marks), and Reasoning Ability (35 marks).'
    }
  ],
  'seo-blog-railway-group-d': [
    {
      question: 'What weight must a male candidate lift and carry during the Group D Physical Efficiency Test (PET)?',
      options: ['20 kg weight for 100m', '35 kg weight for 100m', '50 kg weight for 50m', '15 kg weight for 100m'],
      correctIndex: 1,
      explanation: 'Male aspirants are required to lift and carry 35 kg weight for 100 meters in 2 minutes without dropping it.'
    }
  ],
  'seo-blog-railway-rpf-si': [
    {
      question: 'What is the runtime requirement for male candidates in the RPF SI 1600m athletic trial?',
      options: ['5 minutes flat', '6 minutes 30 seconds', '7 minutes 15 seconds', '6 minutes flat'],
      correctIndex: 1,
      explanation: 'Male candidates must run the 1600 meters distance in 6 minutes and 30 seconds to qualify.'
    }
  ]
};

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  isAi?: boolean;
}

export default function SarkariBlogPortal({ blogs, onAddBlog, triggerToast }: SarkariBlogPortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);
  
  // Custom Interactive States
  const [isHindiActive, setIsHindiActive] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizScoreEvaluated, setQuizScoreEvaluated] = useState<Record<string, boolean>>({});
  
  // Local discussion comments state
  const [commentsList, setCommentsList] = useState<Record<string, Comment[]>>(() => {
    const saved = localStorage.getItem('sarkari_blog_classroom_comments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Pre-populated realistic student comments
    return {
      'seo-blog-up-police': [
        { id: 'c1', author: 'Vikram Gurjar', text: 'Sir, what is the chest expansion criteria for UP Police Constable?', date: '10 mins ago' },
        { id: 'c2', author: 'Job Sarkari AI Mentor', text: 'Vikram, male height should be 168 cm, and chest must be 79 cm (with minimum 5 cm expansion, i.e., 84 cm). Keep mock-testing hard!', date: '8 mins ago', isAi: true }
      ],
      'seo-blog-ssc-cgl': [
        { id: 'c3', author: 'Shikha Pandey', text: 'Are the advanced geometry questions formulas consistent in CGL 2026 pattern?', date: '2 hours ago' },
        { id: 'c4', author: 'Job Sarkari AI Mentor', text: 'Shikha, yes! High weightage topics like Mensuration and Circle theorems continue to use standard formulas. Speed is key!', date: '1 hour ago', isAi: true }
      ],
      'seo-blog-sbi-po': [
        { id: 'c5', author: 'Karan Mehra', text: 'Is there sectional cutoff in SBI PO Prelims 2026?', date: '1 day ago' },
        { id: 'c6', author: 'Job Sarkari AI Mentor', text: 'Great question Karan! SBI PO does NOT have sectional cutoffs for prelims or mains anymore, only overall score counts. Focus on maximizing your total marks.', date: '1 day ago', isAi: true }
      ]
    };
  });

  const [commentInput, setCommentInput] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  useEffect(() => {
    localStorage.setItem('sarkari_blog_classroom_comments', JSON.stringify(commentsList));
  }, [commentsList]);

  // Custom SEO Tool States
  const [activeSeoTab, setActiveSeoTab] = useState<'serp' | 'onpage' | 'schema'>('serp');
  
  // New Blog Creator States
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Exam Tips' | 'Government Jobs' | 'Career Guidance' | 'Preparation Strategy' | 'Interview Tips'>('Exam Tips');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newMetaKeywords, setNewMetaKeywords] = useState('Sarkari Result, Mock test, Syllabus PDF');

  // Sitemap Generator States
  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [sitemapDomain, setSitemapDomain] = useState(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return 'https://sarkari-job-hub-v595.onrender.com';
  });
  const [sitemapRoutes, setSitemapRoutes] = useState<Record<string, { label: string; enabled: boolean; priority: string; changefreq: string }>>({
    'home': { label: 'Home Page (मुख्य पृष्ठ)', enabled: true, priority: '1.0', changefreq: 'daily' },
    'jobs': { label: 'Private & Government Jobs', enabled: true, priority: '0.9', changefreq: 'daily' },
    'admit-cards': { label: 'Admit Cards (प्रवेश पत्र)', enabled: true, priority: '0.9', changefreq: 'daily' },
    'results': { label: 'Exam Results (सरकारी परिणाम)', enabled: true, priority: '0.9', changefreq: 'weekly' },
    'mock-tests': { label: 'Live Mock Test Room', enabled: true, priority: '0.85', changefreq: 'daily' },
    'syllabus': { label: 'Syllabus PDF Repository', enabled: true, priority: '0.8', changefreq: 'weekly' },
    'current-affairs': { label: 'Bilingual GK Affairs', enabled: true, priority: '0.8', changefreq: 'daily' },
    'blog': { label: 'Strategy Guidelines Blog', enabled: true, priority: '0.7', changefreq: 'weekly' },
    'objections': { label: 'Ans-Key Challenge Desk', enabled: true, priority: '0.6', changefreq: 'monthly' },
    'upload-vault': { label: 'Vault Folder Directory', enabled: true, priority: '0.7', changefreq: 'monthly' },
    'railway': { label: 'Railway Jobs (रेलवे भर्ती)', enabled: true, priority: '0.9', changefreq: 'daily' },
    'banking': { label: 'Banking Jobs (बैंकिंग भर्ती)', enabled: true, priority: '0.9', changefreq: 'daily' },
    'state-jobs': { label: 'State Government Jobs (राज्य स्तर)', enabled: true, priority: '0.9', changefreq: 'daily' },
    'police-jobs': { label: 'Police Bharti (पुलिस भर्ती)', enabled: true, priority: '0.9', changefreq: 'daily' }
  });
  const [includeBlogsInSitemap, setIncludeBlogsInSitemap] = useState(true);

  // Combine standard mock blogs + default rich SEO ones
  const allBlogsList = useMemo(() => {
    const existingIds = new Set(blogs.map(b => b.id));
    const uniqueDefaults = SEO_DEFAULT_BLOGS.filter(b => !existingIds.has(b.id));
    return [...blogs, ...uniqueDefaults];
  }, [blogs]);

  // Dynamic XML string compiler
  const generatedXmlCode = useMemo(() => {
    const cleanDomain = sitemapDomain.trim().replace(/\/+$/, '');
    const currentDate = new Date().toISOString().split('T')[0];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset\n  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml"\n>\n`;
    
    // Add active route paths
    (Object.entries(sitemapRoutes) as any).forEach(([key, route]: [string, any]) => {
      if (route.enabled) {
        const pathSuffix = key === 'home' ? '' : `/${key}`;
        const url = `${cleanDomain}${pathSuffix}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
        xml += `    <priority>${route.priority}</priority>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${url}?lang=en" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="hi" href="${url}?lang=hi" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />\n`;
        xml += `  </url>\n`;
      }
    });

    // Add blogs if toggled on
    if (includeBlogsInSitemap) {
      allBlogsList.forEach(blog => {
        const url = `${cleanDomain}/blog?id=${blog.id}`;
        xml += `  <url>\n`;
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${blog.date}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="en" href="${url}&amp;lang=en" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="hi" href="${url}&amp;lang=hi" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />\n`;
        xml += `  </url>\n`;
      });
    }

    xml += `</urlset>`;
    return xml;
  }, [sitemapDomain, sitemapRoutes, includeBlogsInSitemap, allBlogsList]);

  // Action to download calculated sitemap.xml to user computer
  const handleDownloadSitemapXml = () => {
    try {
      const blob = new Blob([generatedXmlCode], { type: 'application/xml;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'sitemap.xml');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerToast("📥 Dynamic sitemap.xml generated and downloaded to your computer!");
    } catch (e) {
      triggerToast("❌ Failed to download sitemap file. Please copy the code directly instead.");
    }
  };
  // Filtered post selector
  const filteredBlogs = useMemo(() => {
    return allBlogsList.filter(blog => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = blog.title.toLowerCase().includes(q) || 
                            blog.summary.toLowerCase().includes(q) || 
                            blog.content.toLowerCase().includes(q) ||
                            blog.author.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allBlogsList, searchQuery, selectedCategory]);

  const blogCategories = ['All', 'Exam Tips', 'Government Jobs', 'Career Guidance', 'Preparation Strategy', 'Interview Tips'];

  // Real-time On-page SEO metrics calculator helper
  const onPageSeoScore = (title: string, summary: string, content: string, keywordsStr: string) => {
    let score = 0;
    const feedback: string[] = [];

    // 1. Title optimization
    const tLength = title.length;
    if (tLength >= 45 && tLength <= 65) {
      score += 25;
      feedback.push("✅ PERFECT: Meta Title length is highly optimized for Google SERP display (45-65 chars).");
    } else if (tLength > 0) {
      score += 12;
      feedback.push(`⚠️ Title stands at ${tLength} chars. Real-world Google displays truncate titles above 65 chars, and devalue titles under 40.`);
    } else {
      feedback.push("❌ Enter article title to compute Google Meta weight.");
    }

    // 2. Meta description / summary optimization
    const sLength = summary.length;
    if (sLength >= 110 && sLength <= 165) {
      score += 25;
      feedback.push("✅ PERFECT: Meta Description matches perfect search view limits (110-165 chars).");
    } else if (sLength > 0) {
      score += 10;
      feedback.push(`⚠️ Meta summary has ${sLength} chars. Keep it between 110-165 to avoid Google Search snippet clipping.`);
    } else {
      feedback.push("❌ Enter summary / snippet to evaluate description potential.");
    }

    // 3. Keyword density check
    const keywords = keywordsStr.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
    if (keywords.length > 0 && content.length > 10) {
      let foundKeywords = 0;
      keywords.forEach(keyword => {
        if (content.toLowerCase().includes(keyword)) {
          foundKeywords++;
        }
      });
      const ratio = foundKeywords / keywords.length;
      if (ratio >= 0.7) {
        score += 25;
        feedback.push(`✅ BROAD INDEXING: ${foundKeywords}/${keywords.length} of your focus SEO keywords are nested inside the body content.`);
      } else if (foundKeywords > 0) {
        score += 15;
        feedback.push(`⚠️ Content incorporates only ${foundKeywords}/${keywords.length} target keywords. Add key phrases like "${keywords.find(k => !content.toLowerCase().includes(k)) || 'Sarkari'}" to body sentences!`);
      } else {
        feedback.push("❌ Keywords declared are absent in content text body. Search bots can ignore mismatched metadata.");
      }
    } else {
      feedback.push("❌ Provide focus keywords and text body to score organic index ratio.");
    }

    // 4. Content depth
    const wordsCount = content.split(/\s+/).filter(Boolean).length;
    if (wordsCount >= 180) {
      score += 25;
      feedback.push("✅ HIGH DEPTH: Article word count is rich (>180 words) and informative for crawl engines.");
    } else if (wordsCount > 0) {
      score += 12;
      feedback.push(`⚠️ Soft article length (${wordsCount} words). Add detailed paragraphs or lists to elevate authority metrics above competitors.`);
    } else {
      feedback.push("❌ Write content draft to begin crawling audit.");
    }

    return { score, feedback, wordsCount };
  };

  const activePostSeo = useMemo(() => {
    if (!selectedPost) return null;
    return onPageSeoScore(
      selectedPost.title,
      selectedPost.summary,
      selectedPost.content,
      "Sarkari Result, UP Police, SSC CGL, mock papers, admit card, government, Railway"
    );
  }, [selectedPost]);

  const creatorPostSeo = useMemo(() => {
    return onPageSeoScore(newTitle, newSummary, newContent, newMetaKeywords);
  }, [newTitle, newSummary, newContent, newMetaKeywords]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      triggerToast("⚠️ Title and content body are required to index post!");
      return;
    }

    const words = newContent.split(/\s+/).filter(Boolean).length;
    const estRead = `${Math.max(1, Math.ceil(words / 150))} min read`;

    const newBlogObj: Blog = {
      id: `custom-blog-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: newAuthor.trim() || "Staff Contributor",
      summary: newSummary || newContent.substring(0, 130) + '...',
      content: newContent,
      readTime: estRead,
      date: new Date().toISOString().split('T')[0]
    };

    onAddBlog(newBlogObj);
    triggerToast("🎉 Professional Sarkari Hub Blog Post published successfully! Meta tags auto-configured for SEO.");
    
    // reset states
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setNewMetaKeywords('Sarkari Result, Mock test, Syllabus PDF');
    setNewAuthor('');
    setIsCreatorOpen(false);
    setSelectedPost(newBlogObj); // auto read
  };

  // Generate copyable JSON-LD Structured Data Schema.org representation
  const generateSchemaMarkup = (blog: Blog) => {
    const struct = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.summary,
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Job Sarkari Hub",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ais-pre-h4okrkbotbq7upa2tac5om.run.app/favicon.ico"
        }
      },
      "datePublished": blog.date,
      "articleBody": blog.content,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sarkari-hub.org/blog/${blog.id}`
      }
    };
    return JSON.stringify(struct, null, 2);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`📋 ${label} copied to clipboard successfully!`);
  };

  const simulateShare = (platform: string, postTitle: string) => {
    let mockLink = `https://jobsarkarihub.org/strategy-blog/${encodeURIComponent(postTitle.toLowerCase().replace(/ /g, '-'))}`;
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent('Check this amazing SEO preparation blog on Job Sarkari Hub: ' + postTitle + ' ➡️ ' + mockLink)}`, '_blank');
      triggerToast("📲 Shared on WhatsApp successfully!");
    } else if (platform === 'telegram') {
      window.open(`https://t.telegram.org/share/url?url=${encodeURIComponent(mockLink)}&text=${encodeURIComponent(postTitle)}`, '_blank');
      triggerToast("✈️ Shared on Telegram Group successfully!");
    } else {
      copyToClipboard(mockLink, "Custom shareable slug");
    }
  };

  const triggerPrintSimulation = (post: Blog, activeLan: boolean) => {
    const currentTranslation = activeLan ? BLOG_TRANSLATIONS[post.id] : null;
    const title = currentTranslation?.title || post.title;
    const content = currentTranslation?.content || post.content;
    const author = post.author;
    
    // Create direct print template in a mock popup or print preview frame
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title} - Job Sarkari Hub Printable Notes</title>
            <style>
              body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #1e293b; line-height: 1.6; padding: 40px; max-width: 800px; margin: 0 auto; }
              h1 { color: #1e3a8a; font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 8px; }
              .meta { font-size: 11px; color: #64748b; font-family: monospace; text-transform: uppercase; margin-bottom: 24px; }
              .content { font-size: 14px; white-space: pre-wrap; font-family: inherit; }
              .footer { margin-top: 50px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px dashed #cbd5e1; padding-top: 15px; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <div class="meta">By: ${author} | Published: ${post.date} | Retrieved from Job Sarkari Hub Official Blog</div>
            <div class="content">${content}</div>
            <div class="footer">Job Sarkari Hub © 2026. All strategy keys rights reserved. Keep practicing with Real CBT Mock Tests.</div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
      triggerToast("🖨️ Opened print layout! Select PDF printer or physical hardware to print strategy keys.");
    } else {
      triggerToast("⚠️ Popup blocker prevented the print sheet from opening. Please enable popup permissions!");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const author = commentAuthor.trim() || 'Aspirant ' + Math.floor(100 + Math.random() * 900);
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author,
      text: commentInput,
      date: 'Just now'
    };

    setCommentsList(prev => {
      const existing = prev[postId] || [];
      return {
        ...prev,
        [postId]: [...existing, newComment]
      };
    });

    setCommentInput('');
    triggerToast("💬 Comment posted in the Aspirant Forum!");

    // Auto-Responder Trigger logic
    setTimeout(() => {
      let triggerWord = commentInput.toLowerCase();
      let responseText = "Thanks for asking! Keep practicing regularly to boost your accuracy. Make sure to attempt sectional mocks daily.";
      
      if (triggerWord.includes('cutoff') || triggerWord.includes('marks')) {
        responseText = "Cutoffs vary by zone and category each year. We highly advise aiming for at least 78%+ raw score targets to be 100% safe.";
      } else if (triggerWord.includes('syllabus') || triggerWord.includes('pattern')) {
        responseText = "You can download the full official syllabus PDF under our 'Syllabus' tab! We recommend focusing on High-Yield GK and Arithmetic first.";
      } else if (triggerWord.includes('book') || triggerWord.includes('material')) {
        responseText = "We recommend standard NCERT texts for General Science, and standard quantitative aptitude compilations. Our free online mocks are also fully structured.";
      } else if (triggerWord.includes('when') || triggerWord.includes('date')) {
        responseText = "Check the live updates in our 'Exam Calendar' tab regularly! Dates are highly dynamic based on official central board boards.";
      }

      const mentorReply: Comment = {
        id: `ai-reply-${Date.now()}`,
        author: 'Job Sarkari AI Mentor 🎓',
        text: responseText,
        date: 'A few seconds ago',
        isAi: true
      };

      setCommentsList(prev => {
        const existing = prev[postId] || [];
        return {
          ...prev,
          [postId]: [...existing, mentorReply]
        };
      });
      triggerToast("🔔 AI Mentor replied to your comment!");
    }, 1500);
  };

  // Quick interactive quiz response handler
  const handleQuizAnswerSelect = (postId: string, questionIdx: number, optionIdx: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [`${postId}-${questionIdx}`]: optionIdx
    }));
  };

  const handleEvaluateQuiz = (postId: string) => {
    setQuizScoreEvaluated(prev => ({
      ...prev,
      [postId]: true
    }));
    triggerToast("🎖️ Quiz evaluation completed! Scroll to verify correct solutions.");
  };

  const activePostQuiz = selectedPost ? BLOG_QUIZZES[selectedPost.id] : null;

  return (
    <div className="space-y-8" id="sarkari-seo-blog">
      
      {/* Blog and SEO Dashboard Title & Premium Billboard */}
      <div className="bg-linear-to-r from-blue-900 to-[#1e3a8a] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 animate-pulse pointer-events-none">
          <Award className="h-40 w-40" />
        </div>
        
        <div className="space-y-2 max-w-2xl relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full text-[10px] font-black uppercase tracking-wider font-mono border border-blue-500/30">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Job Sarkari Hub SEO Core Platform
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
            SEO Master Blog & Bilingual Study Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
            Read officially optimized prep strategies, notifications details, and physical standards guidelines translated bilingually. Optimize your focus with dynamic micro-quizzes and ask clear questions in our candidate forum directory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-3 relative z-10">
          <div className="bg-black/35 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/10 text-left">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-300 font-mono font-bold uppercase leading-none">Target Search Keywords</p>
              <p className="text-xs font-black text-white font-mono mt-0.5">Sarkari Result 2026, CBT Exams</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCreatorOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-900 font-black text-xs px-5 py-3 rounded-2xl transition cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-left"
          >
            <Plus className="h-4 w-4" />
            <span>Publish SEO Article / ब्लॉग लिखें</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSitemapModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xs px-5 py-3 rounded-2xl transition cursor-pointer shadow-lg shadow-blue-500/20 flex items-center gap-2 text-left border border-blue-500/40"
          >
            <SearchCode className="h-4.5 w-4.5 text-blue-200" />
            <span>Sitemap XML Kaise Banaye? / साईटमैप गाइड</span>
          </button>
        </div>
      </div>

      {/* Main Content Splitting */}
      <div className="grid gap-8 lg:grid-cols-12 text-left">
        
        {/* Left Column: Blog Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Feed Filter Panel */}
          <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl space-y-3 shadow-3xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search articles, topics (e.g., CGL, Police, SBI PO)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-850 placeholder-slate-400 focus:outline-hidden focus:border-blue-450 focus:ring-1 focus:ring-blue-450 font-sans"
              />
            </div>

            {/* Category Select Pillbox */}
            <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 px-3 py-2 cursor-pointer focus:outline-hidden focus:border-blue-500"
              >
                {blogCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? '📁 All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Display */}
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-150 p-12 text-center space-y-2">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl inline-block">
                <Search className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">No matched SEO exam guides found.</p>
              <p className="text-[10px] text-slate-400">Try adjusting your keywords or write your own custom indexed article!</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredBlogs.map((post) => {
                const isActive = selectedPost?.id === post.id;
                return (
                  <div 
                    key={post.id} 
                    onClick={() => {
                      setSelectedPost(post);
                      // Reset quiz status on post change
                      setIsHindiActive(false);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                      isActive 
                        ? 'border-blue-500 bg-blue-50/15 shadow-sm' 
                        : 'border-slate-150 bg-white hover:border-slate-350 hover:shadow-2xs'
                    }`}
                  >
                    {/* Tag badge */}
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-mono">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold font-mono">
                        <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition truncate-wide">
                      {isHindiActive && BLOG_TRANSLATIONS[post.id] ? BLOG_TRANSLATIONS[post.id].title : post.title}
                    </h3>
                    <p className="text-slate-505 text-xs mt-1.5 leading-normal line-clamp-2">
                      {isHindiActive && BLOG_TRANSLATIONS[post.id] ? BLOG_TRANSLATIONS[post.id].summary : post.summary}
                    </p>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-110 text-[10px]">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-450 shrink-0" />
                        <span>By: <strong className="text-slate-600">{post.author}</strong></span>
                      </span>

                      <span className="text-blue-600 font-extrabold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>Read Study Keys</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>

                    {/* SEO rating indicator strip */}
                    <div className="absolute top-0 right-0 left-0 h-0.5 bg-slate-100">
                      <div className="h-full bg-emerald-500 w-[95%]"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Column: Active SEO analysis workspace, live post view, metadata audit */}
        <div className="lg:col-span-5 space-y-6">
          
          {selectedPost ? (
            <div className="space-y-6">
              
              {/* Active Post Details Sheet */}
              <div id="active-sarkari-post-view" className="bg-white rounded-3xl border border-slate-150 p-5 space-y-4 shadow-3xs relative text-left">
                
                {/* Translator Toggle Bar & Controls */}
                <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-b border-slate-100 pb-3 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] bg-emerald-50 text-emerald-800 font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      📘 Now Reading
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Bilingual Toggle option */}
                    {BLOG_TRANSLATIONS[selectedPost.id] && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsHindiActive(!isHindiActive);
                          triggerToast(isHindiActive ? "🇬🇧 Hindi View deactivated! Now showing English." : "🇮🇳 हिंदी भाषा सक्रिय! अनुवादित सामग्री लोड हुई।");
                        }}
                        className={`text-[9.5px] font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1 transition ${
                          isHindiActive 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        title="Translate to Hindi/English bilingually"
                      >
                        <Languages className="h-3.5 w-3.5" />
                        <span>{isHindiActive ? "English" : "हिंदी में पढ़ें"}</span>
                      </button>
                    )}

                    {/* Print Key Strategy button */}
                    <button
                      type="button"
                      onClick={() => triggerPrintSimulation(selectedPost, isHindiActive && !!BLOG_TRANSLATIONS[selectedPost.id])}
                      className="p-1 px-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded transition"
                      title="Print Study Keys (ऑफलाइन प्रिंट करें)"
                    >
                      <Printer className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPost(null)}
                      className="text-[9px] font-black text-slate-400 hover:text-slate-700 uppercase font-mono tracking-wider bg-slate-100 px-2 py-1 rounded"
                    >
                      Close
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <h3 className="font-sans text-base sm:text-lg font-black text-slate-900 leading-tight">
                    {isHindiActive && BLOG_TRANSLATIONS[selectedPost.id] ? BLOG_TRANSLATIONS[selectedPost.id].title : selectedPost.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-bold font-mono pt-1">
                    <span>By {selectedPost.author}</span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-bold">{selectedPost.readTime}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50/70 p-4 rounded-2xl border border-slate-150/60 whitespace-pre-line max-h-96 overflow-y-auto scrollbar-thin">
                  {isHindiActive && BLOG_TRANSLATIONS[selectedPost.id] ? BLOG_TRANSLATIONS[selectedPost.id].content : selectedPost.content}
                </div>

                {/* Instant Social Share Panel */}
                <div className="border-t border-slate-100 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-left">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Simulate Share Notes with friends:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => simulateShare('whatsapp', selectedPost.title)}
                      className="bg-[#25D366] hover:bg-[#20ba56] text-white px-2.5 py-1 rounded font-bold text-[10px] flex items-center gap-1 transition"
                    >
                      <Share2 className="h-3 w-3" /> WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => simulateShare('telegram', selectedPost.title)}
                      className="bg-[#0088cc] hover:bg-[#0077b5] text-white px-2.5 py-1 rounded font-bold text-[10px] flex items-center gap-1 transition"
                    >
                      Telegram
                    </button>
                    <button
                      type="button"
                      onClick={() => simulateShare('copy', selectedPost.title)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded font-bold text-[10px] flex items-center gap-1 transition"
                    >
                      <Copy className="h-3 w-3" /> Copy Link
                    </button>
                  </div>
                </div>
              </div>

              {/* Interactive Self-Assessment Micro-Quiz */}
              {activePostQuiz && (
                <div className="bg-linear-to-b from-blue-50/50 to-white rounded-3xl border border-blue-100 p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4.5 w-4.5 text-blue-600 animate-bounce" />
                    <h4 className="text-xs font-black uppercase text-blue-900 tracking-wider font-mono">
                      Aspirant Self-Assessment Mini-Quiz
                    </h4>
                  </div>
                  <p className="text-[10.5px] text-slate-500 leading-normal">
                    Verify physical criteria and structural knowledge described in the article above. Correct answers build real confidence!
                  </p>

                  <div className="space-y-4 pt-1">
                    {activePostQuiz.map((quiz, qIdx) => {
                      const ansKey = `${selectedPost.id}-${qIdx}`;
                      const selectedOptIdx = quizAnswers[ansKey];
                      const isEvaluated = quizScoreEvaluated[selectedPost.id];
                      
                      return (
                        <div key={qIdx} className="space-y-2 border-b border-dashed border-slate-100 pb-3 last:border-b-0 last:pb-0">
                          <p className="text-xs font-bold text-slate-800 leading-normal">
                            Q{qIdx + 1}: {quiz.question}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                            {quiz.options.map((opt, oIdx) => {
                              const isSelected = selectedOptIdx === oIdx;
                              let btnClass = "bg-white border border-slate-200 text-slate-700 text-left hover:border-slate-300";
                              
                              if (isSelected) {
                                btnClass = "bg-blue-50 border-2 border-blue-600 text-blue-800 text-left";
                              }
                              
                              if (isEvaluated) {
                                if (oIdx === quiz.correctIndex) {
                                  btnClass = "bg-emerald-50 border-2 border-emerald-600 text-emerald-800 text-left";
                                } else if (isSelected && oIdx !== quiz.correctIndex) {
                                  btnClass = "bg-red-50 border-2 border-red-500 text-red-800 text-left";
                                }
                              }

                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() => !isEvaluated && handleQuizAnswerSelect(selectedPost.id, qIdx, oIdx)}
                                  className={`p-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${btnClass}`}
                                >
                                  {String.fromCharCode(65 + oIdx)}. {opt}
                                </button>
                              );
                            })}
                          </div>

                          {isEvaluated && selectedOptIdx !== undefined && (
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[10.5px] text-slate-600 leading-normal flex gap-1.5 Items-start">
                              <span className="font-bold text-slate-800 shrink-0">Explanation:</span>
                              <span>{quiz.explanation}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {!quizScoreEvaluated[selectedPost.id] ? (
                      <button
                        type="button"
                        onClick={() => handleEvaluateQuiz(selectedPost.id)}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
                      >
                        Evaluate Quiz (अंक जांचें)
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setQuizScoreEvaluated(prev => ({ ...prev, [selectedPost.id]: false }));
                          setQuizAnswers(prev => {
                            const updated = { ...prev };
                            activePostQuiz.forEach((_, i) => delete updated[`${selectedPost.id}-${i}`]);
                            return updated;
                          });
                        }}
                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition"
                      >
                        Try Quiz Again
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Classroom Forum & Discussion (Interactive comments with AI answer simulations) */}
              <div className="bg-white rounded-3xl border border-slate-150 p-5 space-y-4 shadow-3xs text-left">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3">
                  <MessageSquare className="h-4.5 w-4.5 text-blue-600" />
                  <h4 className="text-xs font-black uppercase text-slate-800 font-mono tracking-wider">
                    Aspirant Study Room Forum / परिचर्चा समूह
                  </h4>
                </div>

                {/* Question List */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                  {(commentsList[selectedPost.id] || []).length === 0 ? (
                    <p className="text-[10.5px] text-slate-400 text-center py-4 italic">
                      No candidate questions posted yet. Be the first to start the discussion!
                    </p>
                  ) : (
                    (commentsList[selectedPost.id] || []).map((comment) => (
                      <div 
                        key={comment.id} 
                        className={`p-3 rounded-2xl text-xs space-y-1 ${
                          comment.isAi 
                            ? 'bg-blue-50/40 border border-blue-105 ml-4' 
                            : 'bg-slate-50 border border-slate-150/50'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[9.5px]">
                          <span className={`font-black ${comment.isAi ? 'text-indigo-600' : 'text-slate-700'}`}>
                            {comment.author}
                          </span>
                          <span className="text-slate-400">{comment.date}</span>
                        </div>
                        <p className="text-slate-605 leading-relaxed">{comment.text}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Comment creator form */}
                <form onSubmit={(e) => handleCommentSubmit(e, selectedPost.id)} className="space-y-2.5 pt-1">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Candidate Name (Optional)"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-[11px] text-slate-800 focus:outline-hidden focus:border-blue-500 placeholder-slate-400 font-sans"
                    />
                    <span className="text-[10px] text-slate-400 text-right self-center font-mono font-bold uppercase">
                      AI Mentor auto-responses enabled
                    </span>
                  </div>

                  <div className="relative">
                    <textarea
                      required
                      placeholder="Ask a syllabus query or doubt about standard eligibility, cutoff, physical benchmarks..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl pl-3 pr-10 py-1.5 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 placeholder-slate-400 font-sans resize-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 bottom-3 text-blue-600 hover:text-blue-750 transition"
                    >
                      <Send className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* SEO Interactive Workbench Panel for target blog */}
              <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 space-y-4 shadow-sm border border-slate-800 text-left">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5">
                    <SearchCode className="h-4.5 w-4.5 text-blue-400 animate-pulse" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-white font-mono">
                      Organic SEO Audit Desk
                    </h4>
                  </div>
                  
                  {/* Score pill */}
                  <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-black font-mono">
                    🏆 SCORE: {activePostSeo?.score || 95}/100
                  </div>
                </div>

                {/* Sub tabs for SEO: SERP, On-page, Schema */}
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 text-[10.5px]">
                  <button
                    type="button"
                    onClick={() => setActiveSeoTab('serp')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold text-center transition cursor-pointer ${
                      activeSeoTab === 'serp' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🔍 Google Snippet
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSeoTab('onpage')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold text-center transition cursor-pointer ${
                      activeSeoTab === 'onpage' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🛠️ Audit Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSeoTab('schema')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold text-center transition cursor-pointer ${
                      activeSeoTab === 'schema' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    📝 JSON-LD Structured
                  </button>
                </div>

                {/* Tab content display */}
                {activeSeoTab === 'serp' && (
                  <div className="space-y-3 font-sans">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold tracking-widest">GOOGLE SERP PREVIEW:</span>
                    
                    {/* Simulated Google Search result card */}
                    <div className="bg-white text-slate-900 p-4 rounded-xl border border-slate-200 text-xs text-left shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-600 truncate font-mono">
                        <span className="bg-slate-100 rounded-full h-4 w-4 flex items-center justify-center text-[8px] font-black text-slate-700">G</span>
                        <span>https://jobsarkarihub.org/blog/{selectedPost.id}</span>
                      </div>
                      <h4 className="text-blue-800 font-semibold text-[13px] leading-tight hover:underline cursor-pointer">
                        {isHindiActive && BLOG_TRANSLATIONS[selectedPost.id] ? BLOG_TRANSLATIONS[selectedPost.id].title : selectedPost.title}
                      </h4>
                      <p className="text-slate-600 text-[10.5px] leading-normal line-clamp-2">
                        <span className="text-slate-400 font-mono text-[9px] bg-slate-100 px-1 rounded mr-1">Meta</span>
                        {isHindiActive && BLOG_TRANSLATIONS[selectedPost.id] ? BLOG_TRANSLATIONS[selectedPost.id].summary : selectedPost.summary}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10.5px] text-slate-350 leading-relaxed space-y-1">
                      <p>✨ <strong>SEO Analyst Recommendation:</strong> This post is structured as an authoritative guide. It contains localized recruitment phrases which rank incredibly well in search bots under <em>"Sarkari Result UP Police CGL syllabus"</em> queries.</p>
                    </div>
                  </div>
                )}

                {/* Audit checklist */}
                {activeSeoTab === 'onpage' && (
                  <div className="space-y-3 text-xs text-left">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold tracking-widest">ON-PAGE ELEMENT SCORE AUDIT:</span>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {activePostSeo?.feedback.map((item, idx) => (
                        <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[10.5px] text-slate-300 leading-normal flex gap-2">
                          <span className="mt-0.5 shrink-0">
                            {item.includes('✅') ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            )}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex items-center justify-between text-[10px] font-mono">
                      <span>Draft Word Count: <strong>{activePostSeo?.wordsCount || 0} words</strong></span>
                      <span className="text-blue-400">Target Range: &gt; 150 words</span>
                    </div>
                  </div>
                )}

                {/* JSON LD code */}
                {activeSeoTab === 'schema' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-widest">SCHEMA.ORG METADATA FOR BOT CRAWLING:</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(generateSchemaMarkup(selectedPost), "Schema.org JSON-LD")}
                        className="text-[9px] bg-slate-800 text-slate-200 hover:bg-slate-700 px-2 py-0.5 rounded flex items-center gap-0.5 font-bold transition cursor-pointer"
                      >
                        <Copy className="h-3 w-3" /> Copy JSON
                      </button>
                    </div>

                    <pre className="p-3 bg-slate-950 rounded-lg text-[9.5px] font-mono text-cyan-400 overflow-x-auto border border-blue-900/30 max-h-48 scrollbar-thin text-left">
                      {generateSchemaMarkup(selectedPost)}
                    </pre>
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-8 py-16 text-center space-y-4">
              <div className="p-3.5 bg-white text-blue-600 rounded-2xl inline-block border border-slate-150 shadow-2xs">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-xs font-black text-slate-850 uppercase tracking-widest font-mono">Select Strategy Post</h4>
                <p className="text-[10.5px] text-slate-500 leading-normal">
                  Click on any prep strategy block on the left feed to access detailed notes, audit search term densities, or visually extract schema scripts!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Write SEO Article / blog creator Modal window */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs text-left animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-3xl text-left">
              <div className="text-left">
                <h3 className="font-sans text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
                  <span>Sarkari Publisher Studio (SEO Auditing)</span>
                </h3>
                <p className="text-[10px] text-slate-500">Produce optimized articles to rank higher for Central Boards searches.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsCreatorOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 rounded-full p-2 text-slate-600 text-[10px] font-black font-mono tracking-wider cursor-pointer transition"
              >
                CLOSE
              </button>
            </div>

            {/* Modal Body scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 font-sans">
              
              {/* Form elements */}
              <form onSubmit={handlePostSubmit} className="grid md:grid-cols-2 gap-4">
                
                {/* Left Inputs */}
                <div className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Title / शीर्षक (Target 45-65 Characters)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UP Police Constable Exam 2026 Shift timing & Admit guide"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 mt-1 font-mono">
                      <span>Current: <strong>{newTitle.length} characters</strong></span>
                      <span className={newTitle.length >= 45 && newTitle.length <= 65 ? 'text-emerald-600 font-bold' : 'text-amber-500'}>Optimal: 45 - 65</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Category / श्रेणी</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                    >
                      <option value="Exam Tips">📁 Exam Tips</option>
                      <option value="Government Jobs">💼 Government Jobs</option>
                      <option value="Career Guidance">🎓 Career Guidance</option>
                      <option value="Preparation Strategy">🎯 Preparation Strategy</option>
                      <option value="Interview Tips">🗣️ Interview Tips</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Meta Description Summary / संक्षिप्त विवरण (110-165 Chars)</label>
                    <textarea
                      required
                      rows={3}
                      value={newSummary}
                      onChange={(e) => setNewSummary(e.target.value)}
                      placeholder="Enter a brief summarized Google search Snippet explaining the post core guidelines..."
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-sans"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 mt-0.5 font-mono">
                      <span>Current: <strong>{newSummary.length} characters</strong></span>
                      <span className={newSummary.length >= 110 && newSummary.length <= 165 ? 'text-emerald-600 font-bold' : 'text-amber-500'}>Optimal: 110 - 165</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-left">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase">Author / लेखक</label>
                      <input
                        type="text"
                        placeholder="Author name"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase">SEO Keywords (Comma delimited)</label>
                      <input
                        type="text"
                        value={newMetaKeywords}
                        onChange={(e) => setNewMetaKeywords(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden text-left"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Area: Large content edit block and live scoring report */}
                <div className="space-y-3.5 flex flex-col justify-between text-left">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Article Body Content / मुख्य लेखन (Min 150 words)</label>
                    <textarea
                      required
                      rows={7}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Write your comprehensive study plan, exam details, syllabus notes here. Utilize markdown or bullet points to layout clean steps bilingually..."
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 scrollbar-thin"
                    />
                    <span className="block text-[8px] text-slate-400 mt-1 font-mono text-right">
                      Word Count: <strong>{newContent.split(/\s+/).filter(Boolean).length} words</strong> (Recommended &gt; 150)
                    </span>
                  </div>

                  {/* Realtime SEO Scoring Monitor inside create model */}
                  <div className="bg-slate-900 rounded-2xl p-3.5 space-y-2.5 border border-slate-800 text-left">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-[9px] font-black text-slate-350 uppercase tracking-widest font-mono">Real-time SEO Score Audit</span>
                      <span className={`text-[10px] font-mono font-black border px-2.5 py-0.5 rounded-lg ${
                        creatorPostSeo.score >= 70 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        Score: {creatorPostSeo.score}/100
                      </span>
                    </div>

                    <div className="max-h-24 overflow-y-auto space-y-1 scrollbar-thin text-left">
                      {creatorPostSeo.feedback.slice(0, 3).map((fb, fIdx) => (
                        <div key={fIdx} className="text-[9.5px] text-slate-350 leading-relaxed font-sans flex gap-1 items-start">
                          <span>•</span>
                          <span>{fb}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-2 text-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 rounded-xl transition cursor-pointer text-center shadow-md shadow-blue-500/15"
                  >
                    🚀 Publish & Google Index Core (ब्लॉग पोस्ट प्रकाशित करें)
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      )}

      {/* Sarkari SEO Academy & Sitemap XML Builder Modal */}
      {isSitemapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xs text-left animate-fade-in">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl relative flex flex-col max-h-[92vh] border border-slate-200">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-3xl text-left">
              <div className="text-left space-y-1">
                <h3 className="font-sans text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <span className="p-1 px-2.5 bg-blue-100 text-blue-800 rounded-lg text-xs font-mono font-bold">SEO PRO</span>
                  <span>Sarkari Sitemap Academy & Live XML Builder (साईटमैप निर्माण)</span>
                </h3>
                <p className="text-[10px] text-slate-500">Learn how XML sitemaps work, bilingually, and configure search indexes on Google Webmaster tools.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsSitemapModalOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-800 rounded-full px-3 py-1.5 text-[10px] font-black font-mono tracking-wider cursor-pointer transition"
              >
                CLOSE
              </button>
            </div>

            {/* Modal Body (Scrollable Double Core Grid) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid gap-6 md:grid-cols-12 font-sans bg-slate-50/50">
              
              {/* Left Column: Educational Strategy Guide / "kaise banaye" (5 Cols) */}
              <div className="md:col-span-5 space-y-5 bg-white p-5 rounded-2xl border border-slate-200/60 shadow-3xs text-left max-h-[70vh] overflow-y-auto scrollbar-thin">
                
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs text-blue-700 font-bold font-mono">
                    <BookOpen className="h-4 w-4" />
                    <span>SECTOR 1: WHAT & WHY (साईटमैप क्या है?)</span>
                  </div>
                  <h4 className="font-sans text-xs font-black text-slate-800 uppercase tracking-wider">
                    Sitemap XML Concept Guide
                  </h4>
                </div>

                <div className="text-[11.5px] text-slate-650 leading-relaxed space-y-3 font-sans">
                  <p>
                    एक <strong>XML Sitemap</strong> आपके सरकारी या Sarkari Result जॉब पोर्टल की सभी महत्वपूर्ण कड़ियों (URLs) का एक व्यवस्थित संग्रह (Blueprint Map) होता है। यह सर्च इंजनों (जैसे Google, Bing) के क्रॉलर्स को आपकी साइट को आसानी से इंडेक्स करने में मदद करता है।
                  </p>
                  <p>
                    सरकारी परिणाम वेबसाइटों के लिए, समय पर नए एडमिट कार्ड या नौकरियों को गूगल में सूचीबद्ध करवाना अत्यंत महत्वपूर्ण है। बिना साईटमैप के गूगल बॉट्स को नए लिंक्स ढूंढने में देरी हो सकती है।
                  </p>
                </div>

                <hr className="border-slate-100" />

                {/* Core Tag Details Table */}
                <div className="space-y-2">
                  <h5 className="text-[10px] font-black text-slate-800 uppercase tracking-widest font-mono">Essential XML Tags explained:</h5>
                  <div className="space-y-1.5 text-[10.5px]">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex justify-between items-start">
                      <span className="font-mono text-blue-700 font-bold">&lt;loc&gt;</span>
                      <span className="text-[9.5px] text-slate-500 text-right font-sans w-2/3"><strong>URL Location:</strong> Absolute link to your page. (पेज का पूरा यूआरएल पता)</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex justify-between items-start">
                      <span className="font-mono text-blue-700 font-bold">&lt;lastmod&gt;</span>
                      <span className="text-[9.5px] text-slate-500 text-right font-sans w-2/3"><strong>Last Modified:</strong> When the page content last updated. (अंतिम बदलाव तिथि)</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex justify-between items-start">
                      <span className="font-mono text-blue-700 font-bold">&lt;changefreq&gt;</span>
                      <span className="text-[9.5px] text-slate-500 text-right font-sans w-2/3"><strong>Update Frequency:</strong> daily, weekly, monthly, hourly. (बदलाव की दर)</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex justify-between items-start">
                      <span className="font-mono text-blue-700 font-bold">&lt;priority&gt;</span>
                      <span className="text-[9.5px] text-slate-500 text-right font-sans w-2/3"><strong>Priority:</strong> Relative importance range from 0.0 to 1.0. (प्राथमिकता अंक)</span>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* How to submit to search console */}
                <div className="space-y-2.5">
                  <div className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold font-mono">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>GOOGLE SEARCH CONSOLE INSTRUCTIONS (सबमिशन गाइड)</span>
                  </div>
                  
                  <ol className="list-decimal pl-4 text-[10.5px] text-slate-600 space-y-2 leading-relaxed">
                    <li>
                      <strong>Create sitemap.xml:</strong> Configure your base URL and page paths in our compiler, then hit <strong>Download XML</strong>.
                    </li>
                    <li>
                      <strong>Upload to Root:</strong> Host the file at the main root of your web workspace (e.g. placed at <code>/public/sitemap.xml</code> or served dynamically via routing).
                    </li>
                    <li>
                      <strong>Open Console:</strong> Login to <a href="https://search.google.com/search-console" target="_blank" referrerPolicy="no-referrer" className="text-blue-600 underline">Google Search Console</a> and select your verified domain property.
                    </li>
                    <li>
                      <strong>Add Sitemap URL:</strong> Go to the **Sitemaps (साईटमैप)** section on the left panel.
                    </li>
                    <li>
                      <strong>Input Link & Submit:</strong> Write <code>sitemap.xml</code> and click <strong>Submit (जमा करें)</strong>. Google will now recursively scan all listed links!
                    </li>
                  </ol>
                </div>

                {/* Real full stack sitemap confirmation */}
                <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl space-y-1.5 text-left text-[10.5px] text-blue-900 leading-normal">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span>Live Dynamically Enabled Backend / लाईव साईटमैप</span>
                  </p>
                  <p>
                    Great news! In your application, the backend Node-Express controller in <code>server.ts</code> is <strong>already pre-configured</strong> to dynamically serve standard XML indices at the live route path:
                  </p>
                  <div className="pt-2">
                    <a 
                      href="/sitemap.xml" 
                      target="_blank" 
                      className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg text-white font-black text-[9.5px] tracking-wide transition uppercase cursor-pointer"
                    >
                      <span>Open Live Website sitemap.xml ➡️</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Custom Live Sitemap XML Builder & Previewer (7 Cols) */}
              <div className="md:col-span-7 space-y-5 flex flex-col justify-between">
                
                {/* Build Form Dashboard */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-3xs space-y-4 text-left">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 font-sans">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-slate-400 block font-mono font-bold uppercase tracking-wider">Interactive Generator Console</span>
                      <h4 className="font-sans text-xs font-black text-slate-800 uppercase tracking-wider">
                        Configure Indexable Sarkari Links
                      </h4>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-150 gap-0.5 text-[9px] font-bold text-slate-605">
                      <span>Standards Compliant v0.9</span>
                    </div>
                  </div>

                  {/* Input Base Domain URL */}
                  <div className="space-y-1 text-left">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Your Website Base Domain URL (वेबसाइट यूआरएल)</label>
                    <input 
                      type="url" 
                      value={sitemapDomain}
                      onChange={(e) => setSitemapDomain(e.target.value)}
                      placeholder="https://jobsarkarihub.org"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:outline-hidden focus:border-blue-500"
                    />
                    <p className="text-[9px] text-slate-400">Do not include a trailing slash. Changes will reflect instantly below in real-time.</p>
                  </div>

                  {/* Toggle Route Lists */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider">Select Routes to include in Google Index</label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] max-h-44 overflow-y-auto pr-1">
                      
                      {(Object.entries(sitemapRoutes) as any).map(([key, route]: [string, any]) => (
                        <div key={key} className="bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-between gap-1">
                          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis">
                            <input 
                              type="checkbox"
                              checked={route.enabled}
                              onChange={(e) => {
                                setSitemapRoutes(prev => ({
                                  ...prev,
                                  [key]: { ...prev[key], enabled: e.target.checked }
                                }));
                              }}
                              className="h-3.5 w-3.5 text-blue-600 border-slate-300 rounded-sm focus:ring-blue-500"
                            />
                            <span className="truncate">/{key === 'home' ? '' : key}</span>
                          </label>
                          <div className="flex items-center gap-1.5 shrink-0 select-none">
                            <span className="text-[8px] bg-slate-205 text-slate-600 px-1 py-0.5 rounded-sm font-mono font-bold uppercase tracking-wider">
                              prio:{route.priority}
                            </span>
                            <span className="text-[8px] bg-blue-100 text-blue-800 px-1 py-0.5 rounded-sm font-mono font-bold uppercase tracking-wider">
                              {route.changefreq}
                            </span>
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>

                  {/* Toggle Route to Include Blogs */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-left text-xs text-slate-705">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-800">Include Dynamic Strategy Blogs too?</p>
                      <p className="text-[10px] text-slate-500">Injects {allBlogsList.length} bilingual published preparation guide URLs bilingually.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIncludeBlogsInSitemap(prev => !prev)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition cursor-pointer ${
                        includeBlogsInSitemap ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {includeBlogsInSitemap ? '✅ ACTIVE' : '❌ DISABLED'}
                    </button>
                  </div>

                </div>

                {/* Show Live calculated XML code */}
                <div className="bg-slate-900 rounded-3xl p-4 sm:p-5 text-left border border-slate-800 space-y-3 relative overflow-hidden flex-1 flex flex-col justify-between">
                  
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                    <div className="space-y-0.5 text-left">
                      <span className="text-[8.5px] text-slate-450 font-mono font-bold uppercase tracking-widest">LIVE GENERATED DYNAMIC SITEMAP DATA</span>
                      <h4 className="text-white text-xs font-black uppercase font-mono tracking-wider">XML Markup Preview</h4>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(generatedXmlCode, "Compiled XML Sitemap")}
                        className="text-[9.5px] bg-slate-850 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 transition cursor-pointer border border-slate-700"
                      >
                        <Copy className="h-3.5 w-3.5" /> Copy Code
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadSitemapXml}
                        className="text-[9.5px] bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-3 py-1.5 rounded-xl font-black flex items-center gap-1 transition cursor-pointer shadow-md shadow-emerald-500/15"
                      >
                        <Plus className="h-3.5 w-3.5" /> Download XML
                      </button>
                    </div>
                  </div>

                  <pre className="p-3 bg-slate-950 rounded-2xl text-[9px] sm:text-[9.5px] font-mono text-cyan-400 overflow-x-auto border border-blue-950 text-left h-48 sm:h-56 scrollbar-thin overflow-y-auto">
                    {generatedXmlCode}
                  </pre>

                  <div className="text-[10px] text-slate-400 leading-relaxed pt-1 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>Upload generated file as <code>sitemap.xml</code> in your server's public directory to allow natural crawl search bots to trace active shifts!</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
