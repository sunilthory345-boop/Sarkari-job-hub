import { Question, MockTest } from '../types';

/**
 * Dynamically generates 100 high-quality, solved MCQ questions for a specific exam category and mock test index.
 * Questions are structured based on authentic exam patterns (carrying bilingual text where relevant).
 */
export function generateMockQuestions(category: string, mockIndex: number): Question[] {
  const questions: Question[] = [];
  const cat = category.toLowerCase();

  // Determine section division thresholds
  // 1. UPSC: 100 Questions on General Studies (History, Polity, Geography, Economy)
  // 2. SSC CGL / CHSL: Reasoning (1-25), GA (26-50), Maths (51-75), English (76-100)
  // 3. IBPS PO: Quant (1-35), Reasoning (36-70), English (71-100)
  // 4. RRB NTPC: Gen Awareness (1-40), Maths (41-70), Reasoning (71-100)

  for (let qNum = 1; qNum <= 100; qNum++) {
    let text = '';
    let options: string[] = [];
    let correctOptionIndex = 0;
    let explanation = '';

    if (cat.includes('upsc')) {
      // ==========================================
      // UPSC CIVIL SERVICES (GS-1 PRELIMS PATTERN)
      // ==========================================
      if (qNum <= 25) {
        // --- Segment 1: Indian History, Art & Culture (Q1 to Q25) ---
        const historyThemes = [
          {
            concept: 'Gupta Empire administration',
            text: `With reference to Gupta administration, the term 'Uparika' refers to: / गुप्त प्रशासन के संदर्भ में, 'उपरिक' शब्द का अर्थ क्या था?`,
            opts: ['(a) Royal Treasurer / शाही कोषाध्यक्ष', '(b) Provincial Governor / प्रांतीय गवर्नर', '(c) Chief Justice / मुख्य न्यायाधीश', '(d) Commander of cavalry / घुड़सवार सेना का अध्यक्ष'],
            ans: 1,
            exp: `The provincial governor in the Gupta empire administration was called an 'Uparika'. They were directly appointed by the Emperor. / गुप्त साम्राज्य के प्रशासन में प्रांतीय गवर्नर को 'उपरिक' कहा जाता था।`
          },
          {
            concept: 'Buddhism - School of Thought',
            text: `With reference to Buddhist history, who among the following wrote the 'Milinda Panha'? / बौद्ध इतिहास के संदर्भ में, निम्नलिखित में से किसने 'मिलिंदपञ्हो' की रचना की थी?`,
            opts: ['(a) Nagarjuna / नागार्जुन', '(b) Nagasena / नागसेन', '(c) Vasumitra / वसुमित्र', '(d) Ashvaghosa / अश्वघोष'],
            ans: 1,
            exp: `'Milinda Panha' is a famous Buddhist text consisting of dialogue between the Indo-Greek King Menander I and the sage Nagasena. / मिलिंदपञ्हो बौद्ध भिक्षु नागसेन और हिंद-यवन राजा मिलिंद (मिनैंडर) के मध्य संवाद है।`
          },
          {
            concept: 'Ancient Harappan Site layout',
            text: `Which Harappan site is famous for its unique three-tier division of the town planning, unlike other two-fold cities? / कौन सा हड़प्पाकालीन स्थल अपने विशिष्ट तीन-स्तरीय नगर नियोजन के लिए प्रसिद्ध है, जो अन्य दो-स्तरीय नगरों से भिन्न है?`,
            opts: ['(a) Kalibangan / कालीबंगा', '(b) Lothal / लोथल', '(c) Mohenjo-daro / मोहनजोदड़ो', '(d) Dholavira / धोलावीरा'],
            ans: 3,
            exp: `Dholavira in Gujarat is divided into three distinct parts: the Citadel, the Middle Town, and the Lower Town. / गुजरात में स्थित धोलावीरा नगर को तीन प्रमुख भागों में विभाजित किया गया था।`
          },
          {
            concept: 'Medieval Bhakti Movement saints',
            text: `The philosophy of 'Visishtadvaita' (Qualified Non-Dualism) was propagated by: / 'विशिष्टाद्वैत' दर्शन का प्रतिपादन किसके द्वारा किया गया था?`,
            opts: ['(a) Adi Shankaracharya / आदि शंकराचार्य', '(b) Ramanujacharya / रामानुजाचार्य', '(c) Madhvacharya / माध्वाचार्य', '(d) Nimbarkacharya / निम्बार्काचार्य'],
            ans: 1,
            exp: `Sri Ramanujacharya founded the Visishtadvaita school of Vedanta in the 11th century. / 11वीं शताब्दी में श्री रामानुजाचार्य ने विशिष्टाद्वैत मत का प्रतिपादन किया था।`
          }
        ];
        
        const theme = historyThemes[(qNum + mockIndex) % historyThemes.length];
        const year = 1800 + (mockIndex * 15) + qNum;
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text} (Ref Set-${year})`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;

      } else if (qNum <= 50) {
        // --- Segment 2: Geography & Environment (Q26 to Q50) ---
        const geoThemes = [
          {
            text: `Which of the following ocean currents is a warm current? / निम्नलिखित समुद्री धाराओं में से कौन सी एक गर्म धारा है?`,
            opts: ['(a) Kuroshio Current / कूरेशियो धारा', '(b) Oyashio Current / ओयाशियो धारा', '(c) Canary Current / कनारी धारा', '(d) Benguela Current / बेंगुएला धारा'],
            ans: 0,
            exp: `Kuroshio is a warm ocean current flowing Northwards in the western Pacific. Oyashio, Canary, and Benguela are cold currents. / कूरेशियो प्रशांत महासागर की एक गर्म धारा है।`
          },
          {
            text: `Under which Wildlife Conservation schedule is the Gangetic Dolphin protected in India? / भारत में गंगा डॉल्फिन को किस वन्यजीव संरक्षण अनुसूची के तहत संरक्षित किया गया है?`,
            opts: ['(a) Schedule II / अनुसूची II', '(b) Schedule III / अनुसूची III', '(c) Schedule I / अनुसूची I', '(d) Schedule IV / अनुसूची IV'],
            ans: 2,
            exp: `The Ganges River Dolphin is protected under Schedule I of the Wildlife Protection Act, 1972, granting it topmost priority and shielding coverage. / गंगा नदी डॉल्फिन को 1972 अधिनियम की अनुसूची I के तहत सर्वोच्च संरक्षण प्राप्त है।`
          },
          {
            text: `The layer of the atmosphere that reflects radio waves back to Earth is: / वायुमंडल की वह परत जो रेडियो तरंगों को पृथ्वी पर वापस परावर्तित करती है, कहलाती है:`,
            opts: ['(a) Stratosphere / समतापमंडल', '(b) Ionosphere / आयनमंडल', '(c) Troposphere / क्षोभमंडल', '(d) Exosphere / बाह्यमंडल'],
            ans: 1,
            exp: `The Ionosphere (part of the Thermosphere) contains free ions that reflect terrestrial radio transmissions. / आयनमंडल में आवेशित आयन तरंगों को परावर्तित करते हैं।`
          }
        ];
        const theme = geoThemes[(qNum + mockIndex) % geoThemes.length];
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;

      } else if (qNum <= 75) {
        // --- Segment 3: Indian Polity & Constitution (Q51 to Q75) ---
        const polityThemes = [
          {
            text: `Which of the following Articles under Part III of the Constitution can NOT be suspended even during a National Emergency? / संविधान के भाग III के तहत निम्नलिखित में से कौन से अनुच्छेद राष्ट्रीय आपातकाल के दौरान भी निलंबित नहीं किए जा सकते?`,
            opts: ['(a) Articles 14 and 19 / अनुच्छेद 14 और 19', '(b) Articles 20 and 21 / अनुच्छेद 20 और 21', '(c) Articles 21 and 22 / अनुच्छेद 21 और 22', '(d) Articles 19 and 20 / अनुच्छेद 19 और 20'],
            ans: 1,
            exp: `By the 44th Amendment Act of 1978, the right to protection in respect of conviction for offenses (Article 20) and right to life & personal liberty (Article 21) cannot be suspended. / 44वें संशोधन द्वारा अनुच्छेद 20 और 21 को सुरक्षित किया गया।`
          },
          {
            text: `Who presided over the Joint Sitting of both Houses of Parliament if both the Speaker and Deputy Speaker of Lok Sabha are absent? / यदि लोकसभा के अध्यक्ष और उपाध्यक्ष दोनों अनुपस्थित हों, तो संसद के दोनों सदनों की संयुक्त बैठक की अध्यक्षता कौन करता है?`,
            opts: ['(a) Chairman of Rajya Sabha / राज्यसभा के सभापति', '(b) Deputy Chairman of Rajya Sabha / राज्यसभा के उपसभापति', '(c) President of India / भारत के राष्ट्रपति', '(d) Minister of Parliamentary Affairs / संसदीय कार्य मंत्री'],
            ans: 1,
            exp: `The Deputy Chairman of Rajya Sabha presides in their absence. The Chairman of Rajya Sabha (Vice President) never presides over a joint sitting. / लोकसभा अध्यक्ष व उपाध्यक्ष के न होने पर राज्यसभा के उपसभापति पीठासीन होते हैं।`
          }
        ];
        const theme = polityThemes[(qNum + mockIndex) % polityThemes.length];
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;

      } else {
        // --- Segment 4: Economy & Development (Q76 to Q100) ---
        const ecoThemes = [
          {
            text: `In India, the Base Year for calculating India's Index of Industrial Production (IIP) is currently set at: / भारत में, औद्योगिक उत्पादन सूचकांक (IIP) की गणना के लिए आधार वर्ष वर्तमान में क्या है?`,
            opts: ['(a) 2004-05', '(b) 2011-12', '(c) 2015-16', '(d) 2018-19'],
            ans: 1,
            exp: `The base year for IIP estimation was updated from 2004-05 to 2011-12. / औद्योगिक उत्पादन मूल्य का आधार वर्ष वर्तमान में 2011-12 रखा गया है।`
          },
          {
            text: `Which among the following parameters constitutes the highest weight in India's Consumer Price Index (CPI) basket? / भारत के उपभोक्ता मूल्य सूचकांक (CPI) बास्केट में निम्नलिखित में से किस श्रेणी का भार सर्वाधिक है?`,
            opts: ['(a) Housing / आवास', '(b) Fuel and Light / ईंधन और प्रकाश', '(c) Food and Beverages / खाद्य और पेय पदार्थ', '(d) Clothing and Footwear / कपड़े और जूते'],
            ans: 2,
            exp: `Food and Beverages holds approximately 45.86% weight, which is the highest in the CPI combined calculation. / खाद्य और पेय पदार्थ श्रेणी का भार सर्वाधिक (लगभग 45.86 प्रतिशत) है।`
          }
        ];
        const theme = ecoThemes[(qNum + mockIndex) % ecoThemes.length];
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;
      }

    } else if (cat.includes('ibps') || cat.includes('bank')) {
      // ==========================================
      // IBPS PO PRELIMS PATTERN (100 Qs)
      // Sections: Quant (1-35), Reasoning (36-70), English (71-100)
      // ==========================================
      if (qNum <= 35) {
        // Quantitative Aptitude
        const r1 = 3 + (mockIndex * 3) + (qNum % 7);
        const r2 = 2 * r1 + 5;
        text = `[Bank PO Q${qNum}] A sum of money invested at Simple Interest doubles itself in ${r1} years. In how many years will it become 4 times of itself at the same rate? / साधारण ब्याज पर निवेश की गई कोई राशि ${r1} वर्षों में दोगुनी हो जाती है। समान ब्याज दर पर वह कितने वर्षों में 4 गुना हो जाएगी?`;
        options = [`(a) ${3 * r1} years`, `(b) ${4 * r1} years`, `(c) ${2 * r1} years`, `(d) ${r1 + 8} years`];
        correctOptionIndex = 0;
        explanation = `If sum P becomes 2P in ${r1} years, Interest = P. To become 4P, Interest required is 3P. Since simple interest is uniform, time taken is 3 times of original = 3 * ${r1} = ${3 * r1} years.`;
      } else if (qNum <= 70) {
        // Reasoning Ability
        text = `[Bank PO Q${qNum}] Under a syllogistic assessment: Statement: I. Some tablets are laptops. II. All laptops are servers. Conclusions: I. Some servers are tablets. II. No server is a laptop. Choose correct option.`;
        options = ['(a) Only conclusion I follows', '(b) Only conclusion II follows', '(c) Both follow', '(d) Neither follows'];
        correctOptionIndex = 0;
        explanation = 'Since some tablets are laptops and all laptops are servers, those tablets which are laptops are definitely servers. Hence some servers are tablets. Conclusion I follows.';
      } else {
        // English Language
        text = `[Bank PO Q${qNum}] Identify the part of sentence that contains a grammatical error: "Neither Sunil nor his friends (A) has agreed to support (B) the motion proposed in the meeting (C). No error (D)"`;
        options = ['(a) Part A', '(b) Part B', '(c) Part C', '(d) Part D (No error)'];
        correctOptionIndex = 1;
        explanation = 'With "neither... nor", the verb agrees with the closer subject. Since "his friends" is plural, the helping verb must be "have", not "has".';
      }

    } else if (cat.includes('ntpc') || cat.includes('railway')) {
      // ==========================================
      // RRB NTPC CODES PATTERN (100 Qs)
      // Sections: General Awareness (1-40), Math (41-70), Reasoning (71-100)
      // ==========================================
      if (qNum <= 40) {
        const gaThemes = [
          {
            text: `Under which Ministry does the Railway Board of India function? / भारतीय रेलवे बोर्ड किस मंत्रालय के अधीन कार्य करता है?`,
            opts: ['Ministry of Home Affairs', 'Ministry of Civil Aviation', 'Ministry of Railways', 'Ministry of Heavy Industries'],
            ans: 2,
            exp: `The Railway Board is the supreme apex governing setup of Indian Railways working directly registered under the Ministry of Railways.`
          },
          {
            text: `Who designed the periodic table of elements originally based on atomic weight? / परमाणु भार के आधार पर तत्वों की आवर्त सारणी मूल रूप से किसने डिजाइन की थी?`,
            opts: ['Dmitri Mendeleev', 'Henry Moseley', 'Robert Boyle', 'John Dalton'],
            ans: 0,
            exp: `Dmitri Mendeleev published the earliest periodic table in 1869 grouping elements on atomic masses.`
          }
        ];
        const theme = gaThemes[(qNum + mockIndex) % gaThemes.length];
        text = `[RRB NTPC Q${qNum}] ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;
      } else if (qNum <= 70) {
        // Maths
        const speedKmh = 60 + (mockIndex * 5) + (qNum % 10);
        const lengthM = 150 + (mockIndex * 20);
        const timeSec = (lengthM / (speedKmh * 1000 / 3600)).toFixed(1);
        text = `[RRB NTPC Q${qNum}] A train of length ${lengthM} meters passes a standing pole in how much time if its speed is ${speedKmh} km/h? / ${lengthM} मीटर लंबी एक ट्रेन एक खंभे को कितने समय में पार करेगी यदि कडी की रफ्तार ${speedKmh} किमी/घंटा है?`;
        options = [`(a) ${timeSec} seconds`, `(b) 12 seconds`, `(c) 8.5 seconds`, `(d) 15 seconds`];
        correctOptionIndex = 0;
        explanation = `Speed in m/s = ${speedKmh} * 5/18 = ${(speedKmh * 5 / 18).toFixed(2)} m/s. Time = Distance / Speed = ${lengthM} / ${(speedKmh * 5 / 18).toFixed(2)} = ${timeSec} seconds.`;
      } else {
        // Reasoning
         text = `[RRB NTPC Q${qNum}] Choose the correct alphanumeric sequence next in progress: B4, D8, F12, H16, ? / दी गई श्रृंखला के आगे क्या आएगा: B4, D8, F12, H16, ?`;
         options = ['(a) J20', '(b) K20', '(c) I18', '(d) J18'];
         correctOptionIndex = 0;
         explanation = 'The alphabet advances by +2: B->D->F->H->J. The number advances by multiples of 4: 4->8->12->16->20. Answer is J20.';
      }

    } else if (cat.includes('chsl')) {
      // ==========================================
      // SSC CHSL (10+2) TIER-1 PATTERN
      // Sections: Reasoning (100 Qs: 25 items each)
      // ==========================================
      if (qNum <= 25) {
        text = `[SSC CHSL Q${qNum}] If A denotes '+', B denotes '-', C denotes '*' and D denotes '/', evaluate expression: 20 A 10 C 2 B 8 D 2 / सरल कीजिए: 20 A 10 C 2 B 8 D 2`;
        options = ['(a) 36', '(b) 32', '(c) 40', '(d) 18'];
        correctOptionIndex = 0;
        explanation: 'Substituting signs: 20 + 10 * 2 - 8 / 2 = 20 + 20 - 4 = 40 - 4 = 36.';
      } else if (qNum <= 50) {
        text = `[SSC CHSL Q${qNum}] Which chemical substance gives green firework bursts? / आतिशबाजी में हरा रंग किसकी उपस्थिति के कारण दिखाई देता है?`;
        options = ['(a) Barium / बेरियम', '(b) Strontium / स्ट्रोंटियम', '(c) Sodium / सोडियम', '(d) Copper / तांबा'];
        correctOptionIndex = 0;
        explanation = 'Barium chloride salts produce brilliant apple green flare displays when combusted. / बेरियम लवण की वजह से आतिशबाजी में हरा रंग दिखता है।';
      } else if (qNum <= 75) {
        const value = 200 + (mockIndex * 50) + (qNum * 2);
        const sp = Math.round(value * 0.85);
        text = `[SSC CHSL Q${qNum}] An item marked ₹${value} is sold at a 15% discount. What is the final sales amount? / ₹${value} अंकित मूल्य वाली एक वस्तु 15% छूट पर बेची जाती है, विक्रय मूल्य क्या है?`;
        options = [`(a) ₹${sp}`, `(b) ₹${Math.round(value * 0.90)}`, `(c) ₹${sp + 10}`, `(d) ₹${sp - 20}`];
        correctOptionIndex = 0;
        explanation = `Discount amount = 15% of ${value} = ${value * 0.15}. Sales amount = ${value} - ${value * 0.15} = ₹${sp}.`;
      } else {
        text = `[SSC CHSL Q${qNum}] Select the antonym of the underlined word in context: "The candidate was very *modest* during interviews."`;
        options = ['(a) Humble', '(b) Arrogant', '(c) Polite', '(d) Silent'];
        correctOptionIndex = 1;
        explanation = 'Modest means self-effacing, humble, or unassuming. The antonym is "Arrogant" (boastful or insolent).';
      }

    } else {
      // ==========================================
      // SSC CGL TIER-1 PRACTICE HUBS (100 Qs: 25 items each)
      // ==========================================
      if (qNum <= 25) {
        // Reasoning
        text = `[SSC CGL Mock-${mockIndex}] Q${qNum}. Find the related pair: Square : 4 :: Hexagon : ? / वर्ग : 4 :: षटकोणीय : ?`;
        options = ['(a) 5', '(b) 6', '(c) 8', '(d) 7'];
        correctOptionIndex = 1;
        explanation = 'A square has 4 boundaries/vertices. Similarly, a hexagon has exactly 6 vertices/sides.';
      } else if (qNum <= 50) {
        // General Awareness
        const gaScience = [
          { text: 'Which chemical element has atomic number 6? / किस तत्व का परमाणु क्रमांक 6 है?', options: ['(a) Nitrogen', '(b) Oxygen', '(c) Carbon', '(d) Helium'], ans: 2, exp: 'Carbon holds Atomic Number 6.' },
          { text: 'Swaraj Party was founded in which year? / स्वराज पार्टी की स्थापना किस वर्ष हुई थी?', options: ['(a) 1920', '(b) 1923', '(c) 1925', '(d) 1919'], ans: 1, exp: 'The Swaraj Party was established by CR Das and Motilal Nehru in January 1923.' }
        ];
        const item = gaScience[(qNum + mockIndex) % gaScience.length];
        text = `[SSC CGL Mock-${mockIndex}] Q${qNum}. ${item.text}`;
        options = item.options;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 75) {
        // Quantitative Aptitude
        const rFactor = 2 + (mockIndex % 4);
        text = `[SSC CGL Mock-${mockIndex}] Q${qNum}. If x:y = 3:4, find value of (${rFactor}x + y) : (3x - ${rFactor}y)? / यदि x:y = 3:4 है, तो व्यंजक का मान क्या होगा?`;
        options = [`(a) ${3 * rFactor + 4} : ${9 - 4 * rFactor}`, `(b) 10 : 3`, `(c) 5 : 7`, `(d) 15 : 19`];
        correctOptionIndex = 0;
        explanation = `Substitute x=3 and y=4 inside: (${rFactor}*3 + 4) : (3*3 - ${rFactor}*4) = (${rFactor * 3 + 4}) : (${9 - 4 * rFactor}).`;
      } else {
        // English
        text = `[SSC CGL Mock-${mockIndex}] Q${qNum}. Select the correct active voice conversion: "The letter was typed by Deepika."`;
        options = ['(a) Deepika typed the letter.', '(b) Deepika types the letter.', '(c) Deepika was typing.', '(d) Letter typed Deepika.'];
        correctOptionIndex = 0;
        explanation = 'The passive sentence is in Simple Past (was + V3). The active voice form is Deepika (Subject) + typed (V2) + the letter (Object).';
      }
    }

    questions.push({
      id: `${category.replace(/\s+/g, '-').toLowerCase()}-m${mockIndex}-q${qNum}`,
      text,
      options,
      correctOptionIndex,
      explanation
    });
  }

  return questions;
}

/**
 * Returns exactly 10 comprehensive 100-Question mock exam papers for each of the 5 vacancies:
 * 1. UPSC Civil Services
 * 2. SSC CGL
 * 3. IBPS PO
 * 4. RRB NTPC
 * 5. SSC CHSL
 * 
 * Total = 50 fully functional CBT mock test papers!
 */
export function generateAllExtendedMocks(): MockTest[] {
  const allMocks: MockTest[] = [];

  const examCategories = [
    {
      name: 'UPSC Civil Services Prep',
      titlePrefix: 'UPSC Indian Civil Services (IAS) GS Paper-1 Daily Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.67
    },
    {
      name: 'SSC CGL Exam Prep',
      titlePrefix: 'SSC CGL Tier-1 Combined Graduate Level CBT Grand Mock',
      duration: 60,
      totalMarks: 200,
      negative: 0.50
    },
    {
      name: 'IBPS PO Exam Prep',
      titlePrefix: 'IBPS Bank Probationary Officers (PO) CBT Prelims Mock',
      duration: 60,
      totalMarks: 105,
      negative: 0.25
    },
    {
      name: 'RRB NTPC Exam Prep',
      titlePrefix: 'Railway Recruitment Board NTPC Stage-1 CBT Speed Mock',
      duration: 90,
      totalMarks: 100,
      negative: 0.33
    },
    {
      name: 'SSC CHSL Exam Prep',
      titlePrefix: 'SSC CHSL Combined (10+2) Tier-1 Practice Grand Mock',
      duration: 60,
      totalMarks: 200,
      negative: 0.50
    }
  ];

  for (const cat of examCategories) {
    for (let testIndex = 1; testIndex <= 10; testIndex++) {
      allMocks.push({
        id: `${cat.name.replace(/\s+/g, '-').toLowerCase()}-mock-series-${testIndex}`,
        title: `${cat.titlePrefix} #${testIndex} (वास्तविक परीक्षा CBT स्तर)`,
        category: cat.name,
        durationMinutes: cat.duration,
        totalMarks: cat.totalMarks,
        negativeMark: cat.negative,
        questions: generateMockQuestions(cat.name, testIndex)
      });
    }
  }

  return allMocks;
}
