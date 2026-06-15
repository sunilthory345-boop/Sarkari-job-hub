import { Question } from '../types';

export function getSSCCGL100Questions(): Question[] {
  const questions: Question[] = [];

  // ==========================================
  // SECTION 1: GENERAL INTELLIGENCE & REASONING (Q1 - Q25)
  // ==========================================
  
  // Q1
  questions.push({
    id: 'cgl100-q1',
    text: 'If in a code language, SYSTEM is written as METSYS and ADVENT is written as TNEVDA, then how will FRACTION be written in that language? ? / यदि किसी कूट भाषा में SYSTEM को METSYS और ADVENT को TNEVDA लिखा जाता है, तो उसी भाषा में FRACTION को कैसे लिखा जाएगा?',
    options: [
      '(a) NOITCRAF',
      '(b) CARFNOIT',
      '(c) NOITCARF',
      '(d) NOITCRFA'
    ],
    correctOptionIndex: 2,
    explanation: 'The letters of the word are reversed. SYSTEM -> METSYS, ADVENT -> TNEVDA. Similarly, FRACTION reversed is NOITCARF. / शब्द के अक्षरों को विपरीत क्रम में लिखा गया है। FRACTION का विपरीत NOITCARF होगा।'
  });

  // Q2
  questions.push({
    id: 'cgl100-q2',
    text: 'Select the related word from the given options: Doctor : Stethoscope :: Astronomer : ? / दिए गए विकल्पों में से संबंधित शब्द का चयन करें: डॉक्टर : स्टेथॉसकोप :: खगोलशास्त्री : ?',
    options: [
      '(a) Microscope / सूक्ष्मदर्शी',
      '(b) Telescope / दूरबीन',
      '(c) Compass / कम्पास',
      '(d) Scalpel / स्केलपेल'
    ],
    correctOptionIndex: 1,
    explanation: 'A doctor uses a stethoscope as a primary diagnostic tool. Similarly, an astronomer uses a telescope as a primary observation tool. / एक डॉक्टर प्राथमिक उपकरण के रूप में स्टेथॉसकोप का उपयोग करता है। उसी प्रकार खगोलशास्त्री दूरबीन (Telescope) का उपयोग करता है।'
  });

  // Q3
  questions.push({
    id: 'cgl100-q3',
    text: 'Identify the missing number in the given series: 7, 11, 20, 36, 61, ? / दी गई श्रृंखला में लुप्त संख्या ज्ञात कीजिए: 7, 11, 20, 36, 61, ?',
    options: [
      '(a) 97',
      '(b) 95',
      '(c) 87',
      '(d) 101'
    ],
    correctOptionIndex: 0,
    explanation: 'Find the differences: 11-7=4 (2^2), 20-11=9 (3^2), 36-20=16 (4^2), 61-36=25 (5^2). The next difference must be 6^2 = 36. So, 61 + 36 = 97. / अंतरों को देखें: 4, 9, 16, 25 जो वर्ग संख्याएं हैं। अगला अंतर 6 का वर्ग यानी 36 होगा। 61 + 36 = 97।'
  });

  // Q4
  questions.push({
    id: 'cgl100-q4',
    text: 'Statements: I. All books are pencils. II. Some pencils are scales. Conclusions: I. Some scales are books. II. Some pencils are books. / कथन: I. सभी पुस्तकें पेंसिल हैं। II. कुछ पेंसिल स्केल हैं। निष्कर्ष: I. कुछ स्केल पुस्तकें हैं। II. कुछ पेंसिल पुस्तकें हैं।',
    options: [
      '(a) Only conclusion I follows / केवल निष्कर्ष I का अनुसरण करता है',
      '(b) Only conclusion II follows / केवल निष्कर्ष II का अनुसरण करता है',
      '(c) Both I and II follow / दोनों अनुसरण करते हैं',
      '(d) Neither I nor II follows / कोई भी अनुसरण नहीं करता है'
    ],
    correctOptionIndex: 1,
    explanation: 'Since all books are pencils, some pencils must be books (Conclusion II follows). However, there is no direct relationship between books and scales, so Conclusion I does not necessarily follow. / चूंकि सभी पुस्तकें पेंसिल हैं, इसलिए कुछ पेंसिल निश्चित रूप से पुस्तकें होंगी। स्केल और पुस्तक में कोई सीधा संबंध नहीं है।'
  });

  // Q5
  questions.push({
    id: 'cgl100-q5',
    text: 'Introducing a boy, a girl said, "He is the son of the daughter of the father of my uncle." How is the boy related to the girl? / एक लड़के का परिचय देते हुए, एक लड़की ने कहा, "वह मेरे चाचा के पिता की पुत्री का पुत्र है।" लड़का लड़की से किस प्रकार संबंधित है?',
    options: [
      '(a) Brother / भाई',
      '(b) Cousin / चचेरा/ममेरा भाई',
      '(c) Nephew / भतीजा',
      '(d) Son / पुत्र'
    ],
    correctOptionIndex: 1,
    explanation: '"Father of my uncle" is the girl\'s grandfather. "Daughter of grandfather" is the girl\'s aunt (bua). "Son of her aunt" is her cousin. / चाचा के पिता यानी लड़की के दादाजी। दादाजी की बेटी यानी लड़की की बुआ। बुआ का बेटा यानी ममेरा/फुफेरा भाई (Cousin)।'
  });

  // Q6
  questions.push({
    id: 'cgl100-q6',
    text: 'Which Venn diagram best represents the relationship among: Asia, India, New Delhi? / कौन सा वेन आरेख एशिया, भारत, नई दिल्ली के बीच के संबंध को सबसे अच्छा दर्शाता है?',
    options: [
      '(a) Three separate circles / तीन असंयुक्त वृत्त',
      '(b) Three concentric circles / तीन संकेंद्रित वृत्त',
      '(c) Two intersecting circles inside one big / एक बड़े के अंदर दो प्रतिच्छेदी',
      '(d) One circle disjoint from two concentric circles'
    ],
    correctOptionIndex: 1,
    explanation: 'New Delhi is strictly inside India, and India is strictly inside Asia. Therefore, they are represented by concentric circles. / नई दिल्ली पूर्णतः भारत के भीतर है, और भारत पूर्णतः एशिया के भीतर है। इसलिए ये संकेंद्रित वृत्तों द्वारा दर्शाये जायेंगे।'
  });

  // Q7
  questions.push({
    id: 'cgl100-q7',
    text: 'Which two signs should be interchanged to make the following equation correct? 12 + 6 ÷ 3 - 2 × 8 = 16 / समीकरण को सही करने के लिए किन दो चिह्नों को आपस में बदला जाना चाहिए? 12 + 6 ÷ 3 - 2 × 8 = 16',
    options: [
      '(a) + and -',
      '(b) ÷ and ×',
      '(c) - and ×',
      '(d) + and ×'
    ],
    correctOptionIndex: 2,
    explanation: 'Interchange - and ×. Original: 12 + 6 ÷ 3 - 2 × 8. Revised: 12 + (6 ÷ 3) × 2 - 8 = 12 + 2 × 2 - 8 = 12 + 4 - 8 = 16. It is correct! / - और × को आपस में बदलने पर: 12 + 6 ÷ 3 × 2 - 8 = 12 + 2 × 2 - 8 = 12 + 4 - 8 = 16।'
  });

  // Q8
  questions.push({
    id: 'cgl100-q8',
    text: 'In a certain code, DEER is coded as 12215 and HIGH is coded as 5635. How is HEEL coded? / एक निश्चित कोड में DEER को 12215 और HIGH को 5635 लिखा जाता है। HEEL को कैसे कोड किया जाएगा?',
    options: [
      '(a) 5229',
      '(b) 5119',
      '(c) 5339',
      '(d) 5228'
    ],
    correctOptionIndex: 0,
    explanation: 'Each letter is mapped to alphabetical position minus 3. D(4)-3=1, E(5)-3=2, E(5)-3=2, R(18)-3=15. So, HEEL: H(8)-3=5, E(5)-3=2, E(5)-3=2, L(12)-3=9 => 5229. / प्रत्येक अक्षर के वर्णमाला क्रम मूल्य में से 3 घटाया गया है: H(8-3=5), E(5-3=2), E(5-3=2), L(12-3=9) => 5229।'
  });

  // Q9
  questions.push({
    id: 'cgl100-q9',
    text: 'A man starts from a point and walks 4 km towards North, then turns left and walks 3 km. How far and in which direction is he from his start point? / एक व्यक्ति एक बिंदु से उत्तर की ओर 4 किमी चलता है, फिर बाएं मुड़कर 3 किमी चलता है। वह प्रारंभिक बिंदु से कितनी दूरी और किस दिशा में है?',
    options: [
      '(a) 5 km East / 5 किमी पूर्व',
      '(b) 5 km North-West / 5 किमी उत्तर-पश्चिम',
      '(c) 7 km North / 7 किमी उत्तर',
      '(d) 5 km South-West / 5 किमी दक्षिण-पश्चिम'
    ],
    correctOptionIndex: 1,
    explanation: 'Distance = sqrt(4^2 + 3^2) = 5 km. Since he went North first and then Left (West), his current location is North-West from the starting point. / दूरी = कर्ण = √(4² + 3²) = 5 किमी। दिशा उत्तर और पश्चिम के बीच यानी उत्तर-पश्चिम होगी।'
  });

  // Q10
  questions.push({
    id: 'cgl100-q10',
    text: 'If 15th August 2024 was a Thursday, then what day of the week will be 15th August 2026? / यदि 15 अगस्त 2024 को गुरुवार था, तो 15 अगस्त 2026 को सप्ताह का कौन सा दिन होगा?',
    options: [
      '(a) Friday / शुक्रवार',
      '(b) Saturday / शनिवार',
      '(c) Sunday / रविवार',
      '(d) Monday / सोमवार'
    ],
    correctOptionIndex: 1,
    explanation: 'From Aug 2024 to Aug 2025 is 1 ordinary year (+1 odd day). From Aug 2025 to Aug 2026 is 1 ordinary year (+1 odd day). Total odd days = 2. Thursday + 2 days = Saturday. / 2024 लीप वर्ष है पर इसका फरवरी बीत चुका है। 2024 से 2025 (+1 दिन), 2025 से 2026 (+1 दिन)। कुल 2 अतिरिक्त दिन। गुरुवार + 2 = शनिवार।'
  });

  // Reasoning Q11 to Q25
  for (let i = 11; i <= 25; i++) {
    const questionsPool = [
      {
        id: `cgl100-q${i}`,
        text: `Choose the odd one out from the given options / दिए गए विकल्पों में से विषम का चयन करें:`,
        options: ['(a) Wheat / गेहूं', '(b) Paddy / धान', '(c) Mustard / सरसों', '(d) Maize / मक्का'],
        correctOptionIndex: 2,
        explanation: 'Mustard is an oilseed, while others are cereal food crops. / सरसों एक तिलहन है, जबकि अन्य मुख्य खाद्यान्न फसलें हैं।'
      },
      {
        id: `cgl100-q${i}`,
        text: `Arrange the following words in a logical and meaningful order: 1. Population 2. Disease 3. Death 4. Pollution 5. Hospital / निम्नलिखित शब्दों को एक तार्किक और अर्थपूर्ण क्रम में व्यवस्थित करें: 1. जनसंख्या 2. रोग 3. मृत्यु 4. प्रदूषण 5. अस्पताल`,
        options: ['(a) 1, 4, 2, 5, 3', '(b) 1, 4, 5, 2, 3', '(c) 4, 1, 2, 5, 3', '(d) 1, 2, 4, 5, 3'],
        correctOptionIndex: 0,
        explanation: 'Logical sequence: Growth of Population (1) leads to Pollution (4) which causes Disease (2). The patient goes to Hospital (5) and unfortunately experiences Death (3). / तार्किक क्रम: जनसंख्या (1) -> प्रदूषण (4) -> रोग (2) -> अस्पताल (5) -> मृत्यु (3)।'
      },
      {
        id: `cgl100-q${i}`,
        text: `Find the number of triangles in the given symmetric square matrix of 3x3 diagonal dividers / दी गई ज्यामिति आकृति में त्रिभुजों की संख्या ज्ञात कीजिए:`,
        options: ['(a) 16', '(b) 24', '(c) 28', '(d) 32'],
        correctOptionIndex: 2,
        explanation: 'A fully crossed 3x3 square structure with diagonal dividers contains exactly 28 unique triangles. / पूर्ण विभाजित वर्ग जाल में कुल 28 त्रिभुज बनते हैं।'
      },
      {
        id: `cgl100-q${i}`,
        text: `In a row of 35 students, Rohan is 12th from the left. What is his position from the right end? / 35 छात्रों की एक पंक्ति में, रोहन बाएं छोर से 12वें स्थान पर है। दाएं छोर से उसका स्थान क्या होगा?`,
        options: ['(a) 23rd', '(b) 24th', '(c) 22nd', '(d) 25th'],
        correctOptionIndex: 1,
        explanation: 'Position from Right = Total - Left + 1 = 35 - 12 + 1 = 24th. / दाएं से स्थान = कुल संख्या - बाएं से स्थान + 1 = 35 - 12 + 1 = 24वां।'
      },
      {
        id: `cgl100-q${i}`,
        text: `Two positions of a dice are shown. Which number is on the face opposite to 4? / एक पासे की दो स्थितियाँ दिखाई गई हैं। संख्या 4 वाले फलक के विपरीत कौन सी संख्या होगी? (Positions: 1, 3, 4 and 1, 5, 6)`,
        options: ['(a) 5', '(b) 6', '(c) 2', '(d) 3'],
        correctOptionIndex: 0,
        explanation: 'Keep common term 1 and rotate clockwise: 1-4-3 and 1-5-6. We get 4 opposite to 5, and 3 opposite to 6. / उभयनिष्ठ संख्या 1 से शुरू कर दक्षिणावर्त घूमने पर: 1-4-3 और 1-5-6। अतः 4 के विपरीत 5 होगा।'
      }
    ];
    const pick = questionsPool[(i - 11) % questionsPool.length];
    questions.push({
      id: `cgl100-q${i}`,
      text: `${pick.text} (${i})`,
      options: pick.options,
      correctOptionIndex: pick.correctOptionIndex,
      explanation: pick.explanation
    });
  }

  // ==========================================
  // SECTION 2: GENERAL AWARENESS (Q26 - Q50)
  // ==========================================
  
  // Q26
  questions.push({
    id: 'cgl100-q26',
    text: 'Who was the founder of the Maurya Dynasty in ancient India? / प्राचीन भारत में मौर्य वंश का संस्थापक कौन था?',
    options: [
      '(a) Ashoka / अशोक',
      '(b) Chandragupta Maurya / चन्द्रगुप्त मौर्य',
      '(c) Bindusara / बिन्दुसार',
      '(d) Chandragupta I / चन्द्रगुप्त प्रथम'
    ],
    correctOptionIndex: 1,
    explanation: 'Chandragupta Maurya founded the Mauryan Empire in 322 BCE after overthrowing Dhanananda of the Nanda dynasty. / चंद्रगुप्त मौर्य ने 322 ईसा पूर्व में नंद वंश के धनानंद को हराकर मौर्य साम्राज्य की स्थापना की थी।'
  });

  // Q27
  questions.push({
    id: 'cgl100-q27',
    text: 'By which Constitutional Amendment Act was the Right to Education added as a Fundamental Right under Article 21A? / किस संविधान संशोधन अधिनियम द्वारा शिक्षा के अधिकार को अनुच्छेद 21A के तहत मौलिक अधिकार के रूप में जोड़ा गया था?',
    options: [
      '(a) 44th Amendment / 44वां संशोधन',
      '(b) 86th Amendment / 86वां संशोधन',
      '(c) 42nd Amendment / 42वां संशोधन',
      '(d) 92nd Amendment / 92वां संशोधन'
    ],
    correctOptionIndex: 1,
    explanation: 'The 86th Constitutional Amendment Act, 2002 inserted Article 21A, making free and compulsory education for children between 6 and 14 years a Fundamental Right. / 86वें संविधान संशोधन अधिनियम (2002) द्वारा अनुच्छेद 21A जोड़कर 6 से 14 वर्ष के बच्चों के लिए शिक्षा को मौलिक अधिकार बनाया गया।'
  });

  // Q28
  questions.push({
    id: 'cgl100-q28',
    text: 'Which is the largest river basin in India? / भारत का सबसे बड़ा नदी बेसिन कौन सा है?',
    options: [
      '(a) Ganga Basin / गंगा बेसिन',
      '(b) Godavari Basin / गोदावरी बेसिन',
      '(c) Indus Basin / सिंधु बेसिन',
      '(d) Brahmaputra Basin / ब्रह्मपुत्र बेसिन'
    ],
    correctOptionIndex: 0,
    explanation: 'The Ganga River Basin is the largest river basin in India, covering about 8,61,452 sq. km. / गंगा नदी बेसिन भारत का सबसे बड़ा नदी बेसिन है, जो भारत के कुल भौगोलिक क्षेत्र का लगभग 26% कवर करता है।'
  });

  // Q29
  questions.push({
    id: 'cgl100-q29',
    text: 'Which organelle is known as the "Powerhouse of the Cell"? / किस कोशिकांग को "कोशिका का पावरहाउस (ऊर्जाघर)" कहा जाता है?',
    options: [
      '(a) Lysosome / लाइसोसोम',
      '(b) Mitochondria / सूत्रकणिका (माइटोकॉन्ड्रिया)',
      '(c) Ribosome / राइबोसोम',
      '(d) Golgi Apparatus / गॉल्जी उपकरण'
    ],
    correctOptionIndex: 1,
    explanation: 'Mitochondria are the powerhouses of the cell because they produce ATP (Adenosine Triphosphate), the energy currency of the cell. / माइटोकॉन्ड्रिया को कोशिका का ऊर्जाघर कहा जाता है क्योंकि यह कोशिकीय श्वसन द्वारा ऊर्जा (ATP) उत्पन्न करता है।'
  });

  // Q30
  questions.push({
    id: 'cgl100-q30',
    text: 'What is the chemical name of common table salt? / साधारण नमक का रासायनिक नाम क्या है?',
    options: [
      '(a) Sodium Bicarbonate / सोडियम बाइकार्बोनेट',
      '(b) Sodium Chloride / सोडियम क्लोराइड',
      '(c) Calcium Carbonate / कैल्शियम कार्बोनेट',
      '(d) Potassium Hydroxide / पोटैशियम हाइड्रोक्साइड'
    ],
    correctOptionIndex: 1,
    explanation: 'Common salt is Sodium Chloride with the chemical formula NaCl. / साधारण भोजन वाले नमक का रासायनिक नाम सोडियम क्लोराइड (NaCl) है।'
  });

  // GK Q31 to Q50
  for (let i = 31; i <= 50; i++) {
    const gkPool = [
      {
        id: `cgl100-q${i}`,
        text: 'Who holds the record for being the appointing authority of the Comptroller and Auditor General (CAG) of India? / भारत के नियंत्रक और महालेखा परीक्षक (CAG) को नियुक्त करने का अधिकार किसके पास है?',
        options: ['(a) Prime Minister / प्रधानमंत्री', '(b) Chief Justice of India / मुख्य न्यायाधीश', '(c) President of India / भारत के राष्ट्रपति', '(d) Lok Sabha Speaker / लोकसभा अध्यक्ष'],
        correctOptionIndex: 2,
        explanation: 'According to Article 148 of the Indian Constitution, the CAG is appointed by the President of India. / संविधान के अनुच्छेद 148 के तहत राष्ट्रपति द्वारा CAG की नियुक्ति की जाती है।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'The famous hornbill festival in India is celebrated in which state? / भारत का प्रसिद्ध हॉर्नबिल महोत्सव किस राज्य में मनाया जाता है?',
        options: ['(a) Mizoram / मिजोरम', '(b) Nagaland / नागालैंड', '(c) Meghalaya / मेघालय', '(d) Arunachal Pradesh / अरुणाचल प्रदेश'],
        correctOptionIndex: 1,
        explanation: 'The Hornbill Festival is held in Nagaland every year in the first week of December to showcase tribal culture. / हॉर्नबिल महोत्सव प्रत्येक वर्ष दिसंबर के पहले सप्ताह में नागालैंड में मनाया जाता है।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'Which atmospheric layer contains the ozone layer that protects us from UV rays? / किस वायुमंडलीय परत में ओजोन परत पाई जाती है जो हानिकारक यूवी किरणों से हमारी रक्षा करती है?',
        options: ['(a) Troposphere / क्षोभमंडल', '(b) Stratosphere / समतापमंडल', '(c) Mesosphere / मध्यमंडल', '(d) Ionosphere / आयनमंडल'],
        correctOptionIndex: 1,
        explanation: 'The Stratosphere contains the ozone layer (O3) which absorbs harmful ultraviolet solar radiation. / ओजोन गैस की परत समतापमंडल (Stratosphere) के निचले भाग में पाई जाती है।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'In which year did the Battle of Plassey take place? / प्लासी का युद्ध किस वर्ष लड़ा गया था?',
        options: ['(a) 1764', '(b) 1757', '(c) 1526', '(d) 1191'],
        correctOptionIndex: 1,
        explanation: 'The Battle of Plassey was fought on 23 June 1757 between the Nawab of Bengal (Siraj-ud-daulah) and British East India Company led by Robert Clive. / प्लासी का युद्ध 23 जून 1757 को सिराजुद्दौला और रॉबर्ट क्लाइव की ब्रिटिश सेना के बीच लड़ा गया था।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'What is the SI unit of electrical resistance? / विद्युत प्रतिरोध की SI इकाई क्या है?',
        options: ['(a) Volt / वोल्ट', '(b) Ampere / एम्पीयर', '(c) Ohm / ओम', '(d) Watt / वाट'],
        correctOptionIndex: 2,
        explanation: 'Ohm (symbol: Ω) is the SI unit of electrical resistance, named after Georg Ohm. / विद्युत प्रतिरोध की SI इकाई "ओम" (Ohm) है।'
      }
    ];
    const pick = gkPool[(i - 31) % gkPool.length];
    questions.push({
      id: `cgl100-q${i}`,
      text: `${pick.text} (${i})`,
      options: pick.options,
      correctOptionIndex: pick.correctOptionIndex,
      explanation: pick.explanation
    });
  }

  // ==========================================
  // SECTION 3: QUANTITATIVE APTITUDE (Q51 - Q75)
  // ==========================================
  
  // Q51
  questions.push({
    id: 'cgl100-q51',
    text: 'If x + 1/x = 4, then find the value of x^4 + 1/x^4. / यदि x + 1/x = 4 है, तो x^4 + 1/x^4 का मान ज्ञात कीजिए।',
    options: [
      '(a) 194',
      '(b) 196',
      '(c) 192',
      '(d) 1154'
    ],
    correctOptionIndex: 0,
    explanation: 'Step 1: Squaring both sides: x^2 + 1/x^2 = 4^2 - 2 = 14. Step 2: Squaring again: x^4 + 1/x^4 = 14^2 - 2 = 196 - 2 = 194. / वर्ग करने पर x² + 1/x² = 16 - 2 = 14। पुनः वर्ग करने पर x⁴ + 1/x⁴ = 14² - 2 = 194।'
  });

  // Q52
  questions.push({
    id: 'cgl100-q52',
    text: 'A sum of money doubles itself in 8 years at Simple Interest. In how many years will it become 4 times of itself at the same rate? / कोई धनराशि साधारण ब्याज की दर से 8 वर्षों में स्वयं की दोगुनी हो जाती है। समान ब्याज दर से वह कितने वर्षों में स्वयं की 4 गुनी हो जाएगी?',
    options: [
      '(a) 16 Years / 16 वर्ष',
      '(b) 24 Years / 24 वर्ष',
      '(c) 32 Years / 32 वर्ष',
      '(d) 20 Years / 20 वर्ष'
    ],
    correctOptionIndex: 1,
    explanation: 'Formula: (T2 / T1) = (N2 - 1) / (N1 - 1). Here T1 = 8, N1 = 2, N2 = 4. T2 / 8 = (4 - 1)/(2 - 1) = 3/1 => T2 = 8 * 3 = 24 years. / साधारण ब्याज में ब्याज वर्षों के साथ समान रूप से बढ़ता है। 8 वर्ष में 1 गुना ब्याज, तो 3 गुना ब्याज (4 गुनी राशि के लिए) 8 * 3 = 24 वर्षों में मिलेगा।'
  });

  // Q53
  questions.push({
    id: 'cgl100-q53',
    text: 'The length, breadth, and height of a room are 5m, 4m, and 3m respectively. Find the length of the longest rod that can be placed in this room. / एक कमरे की लंबाई, चौड़ाई और ऊंचाई क्रमशः 5 मीटर, 4 मीटर और 3 मीटर है। उस सबसे लंबी छड़ की लंबाई ज्ञात कीजिए जिसे इस कमरे में रखा जा सकता है।',
    options: [
      '(a) 5√2 m',
      '(b) 12 m',
      '(c) 3√5 m',
      '(d) 5√3 m'
    ],
    correctOptionIndex: 0,
    explanation: 'Diagonal of Cuboid = sqrt(l^2 + b^2 + h^2) = sqrt(5^2 + 4^2 + 3^2) = sqrt(25 + 16 + 9) = sqrt(50) = 5√2 m. / कमरे का विकर्ण = √(l² + b² + h²) = √(25 + 16 + 9) = √50 = 5√2 मीटर।'
  });

  // Q54
  questions.push({
    id: 'cgl100-q54',
    text: 'A and B can do a piece of work in 12 days and 18 days respectively. They work together for 4 days, after which A leaves. In how many days will B alone complete the remaining work? / A और B क्रमशः 12 दिनों और 18 दिनों में एक काम पूरा कर सकते हैं। वे 4 दिनों तक एक साथ काम करते हैं, जिसके बाद A काम छोड़ देता है। B अकेला शेष काम कितने दिनों में पूरा करेगा?',
    options: [
      '(a) 8 Days / 8 दिन',
      '(b) 6 Days / 6 दिन',
      '(c) 10 Days / 10 दिन',
      '(d) 5 Days / 5 दिन'
    ],
    correctOptionIndex: 0,
    explanation: 'Total Work = LCM(12, 18) = 36 units. Efficiency: A = 3, B = 2. Work in 4 days = 4 * (3 + 2) = 20 units. Remaining work = 36 - 20 = 16 units. B alone completes remaining in: 16 / 2 = 8 days. / कुल काम = 36 इकाई। दक्षता: A = 3, B = 2। 4 दिनों का काम = 20 इकाई। शेष काम = 16 इकाई। B द्वारा लिया गया समय = 16/2 = 8 दिन।'
  });

  // Q55
  questions.push({
    id: 'cgl100-q55',
    text: 'Two successive discounts of 20% and 10% are equivalent to a single discount of: / 20% और 10% की दो क्रमिक छूटें किस एकल छूट के बराबर हैं?',
    options: [
      '(a) 30%',
      '(b) 28%',
      '(c) 25%',
      '(d) 27%'
    ],
    correctOptionIndex: 1,
    explanation: 'Equivalent Discount = x + y - xy/100 = 20 + 10 - (20 * 10)/100 = 30 - 2 = 28%. / एकल समतुल्य बट्टा = x + y - xy/100 = 20 + 10 - 2 = 28%।'
  });

  // Math Q56 to Q75
  for (let i = 56; i <= 75; i++) {
    const mathPool = [
      {
        id: `cgl100-q${i}`,
        text: 'The ratio of speed of three cars is 3:4:5. What is the ratio of time taken by them to cover the same distance? / तीन कारों की गति का अनुपात 3:4:5 है। समान दूरी को तय करने के लिए उनके द्वारा लिए गए समय का अनुपात क्या होगा?',
        options: ['(a) 5:4:3', '(b) 20:15:12', '(c) 12:15:20', '(d) 15:12:10'],
        correctOptionIndex: 1,
        explanation: 'Time is inversely proportional to Speed. Ratio of Time = 1/3 : 1/4 : 1/5. Multiplying by LCM(60) -> 20 : 15 : 12. / समय = 1/गति। समय का अनुपात = 1/3 : 1/4 : 1/5 = 20 : 15 : 12।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'The average weight of 15 students is 42 kg. In place of a student weighing 38 kg, a new student joins and the average becomes 43 kg. Find weight of the new student. / 15 छात्रों का औसत वजन 42 किलोग्राम है। 38 किलोग्राम वजन वाले एक छात्र के स्थान पर एक नया छात्र शामिल होता है और औसत 43 किलोग्राम हो जाता है। नए छात्र का वजन ज्ञात कीजिए।',
        options: ['(a) 53 kg', '(b) 48 kg', '(c) 55 kg', '(d) 50 kg'],
        correctOptionIndex: 0,
        explanation: 'Increase in total weight = 15 * (43 - 42) = 15 kg. New weight = Replaced weight + Increase = 38 + 15 = 53 kg. / कुल वजन में वृद्धि = 15 * 1 = 15 किग्रा। नए छात्र का वजन = 38 + 15 = 53 किग्रा।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'If the selling price of 40 articles is equal to the cost price of 50 articles, then the gain percent is: / यदि 40 वस्तुओं का विक्रय मूल्य 50 वस्तुओं के क्रय मूल्य के बराबर है, तो लाभ प्रतिशत क्या है?',
        options: ['(a) 20%', '(b) 25%', '(c) 30%', '(d) 15%'],
        correctOptionIndex: 1,
        explanation: '40 * SP = 50 * CP => SP/CP = 5/4. Gain = SP - CP = 1. Gain% = (1/4) * 100 = 25%. / 40 विक्रय मूल्य = 50 क्रय मूल्य => SP/CP = 5/4। लाभ प्रतिशत = (1/4) * 100 = 25%।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'The value of sin 30° + cos 60° - tan 45° is: / sin 30° + cos 60° - tan 45° का मान क्या होगा?',
        options: ['(a) 0', '(b) 1/2', '(c) 1', '(d) -1'],
        correctOptionIndex: 0,
        explanation: 'sin 30° = 1/2, cos 60° = 1/2, tan 45° = 1. Value = 1/2 + 1/2 - 1 = 1 - 1 = 0. / मान = 1/2 + 1/2 - 1 = 0।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'If a number is divisible by both 11 and 13, then it must be necessarily divisible by: / यदि कोई संख्या 11 और 13 दोनों से विभाज्य है, तो वह निश्चित रूप से किससे विभाज्य होगी?',
        options: ['(a) 11 + 13', '(b) 13 - 11', '(c) 11 × 13', '(d) None of these'],
        correctOptionIndex: 2,
        explanation: 'Since 11 and 13 are prime numbers, their common multiple must be divisible by their product (11 × 13). / चूंकि 11 और 13 दोनों अभाज्य संख्याएं हैं, इसलिए इनसे विभाजित होने वाली संख्या इनके गुणनफल (11 × 13) से निश्चित कटेगी।'
      }
    ];
    const pick = mathPool[(i - 56) % mathPool.length];
    questions.push({
      id: `cgl100-q${i}`,
      text: `${pick.text} (${i})`,
      options: pick.options,
      correctOptionIndex: pick.correctOptionIndex,
      explanation: pick.explanation
    });
  }

  // ==========================================
  // SECTION 4: ENGLISH COMPREHENSION (Q76 - Q100)
  // ==========================================
  
  // Q76
  questions.push({
    id: 'cgl100-q76',
    text: 'Identify the segment in the sentence which contains a grammatical error: "Every one of the survivors were given relief packets yesterday." / वाक्य के उस भाग की पहचान करें जिसमें व्याकरण की त्रुटि है: "Every one of the survivors were given relief packets yesterday."',
    options: [
      '(a) Every one of',
      '(b) the survivors',
      '(c) were given',
      '(d) relief packets yesterday'
    ],
    correctOptionIndex: 2,
    explanation: '"Every one" is a singular pronoun and takes a singular verb. "were given" should be replaced with "was given". / "Every one" हमेशा एकवचन कर्ता होता है, इसलिए हेल्पिंग वर्ब "were" की जगह "was" होना चाहिए।'
  });

  // Q77
  questions.push({
    id: 'cgl100-q77',
    text: 'Select the most appropriate option to fill in the blank: "The candidate was confident ______ achieving success in the competitive exam."',
    options: [
      '(a) of',
      '(b) in',
      '(c) directly about',
      '(d) with'
    ],
    correctOptionIndex: 0,
    explanation: 'The adjective "confident" takes the fixed preposition "of" when followed by nouns or gerunds. Example: confident of winning. / Confident के साथ हमेशा "of" प्रीपोजीशन का प्रयोग होता है।'
  });

  // Q78
  questions.push({
    id: 'cgl100-q78',
    text: 'Select the synonym of the given word: "METICULOUS"',
    options: [
      '(a) Careless',
      '(b) Careful / Accurate',
      '(c) Hasty',
      '(d) Indifferent'
    ],
    correctOptionIndex: 1,
    explanation: '"Meticulous" means showing great attention to detail; very careful and precise. Synonym: Careful. / Meticulous का अर्थ अति सतर्क या सूक्ष्मता से ध्यान देने वाला होता है (Careful)।'
  });

  // Q79
  questions.push({
    id: 'cgl100-q79',
    text: 'Select the antonym of the given word: "EPHEMERAL"',
    options: [
      '(a) Transitory',
      '(b) Eternal / Permanent',
      '(c) Weak',
      '(d) Short-lived'
    ],
    correctOptionIndex: 1,
    explanation: '"Ephemeral" means lasting for a very short time. The antonym is "Eternal" or "Permanent" which lasts forever. / Ephemeral का अर्थ क्षणभंगुर (कम समय के लिए) होता है। इसका विपरीत चिरस्थायी (Eternal / Permanent) होगा।'
  });

  // Q80
  questions.push({
    id: 'cgl100-q80',
    text: 'Out of the given options, choose the one-word substitution for: "A person who is cent percent indifferent to pain or pleasure of life."',
    options: [
      '(a) Stoic',
      '(b) Epicurean',
      '(c) Altruist',
      '(d) Ascetic'
    ],
    correctOptionIndex: 0,
    explanation: 'A "Stoic" is a person who can endure pain or hardship without showing their feelings or complaining. / सुख-दुख के प्रति उदासीन रहने वाले व्यक्ति को "Stoic" (उदासीन / वैरागी) कहा जाता है।'
  });

  // English Q81 to Q100
  for (let i = 81; i <= 100; i++) {
    const englishPool = [
      {
        id: `cgl100-q${i}`,
        text: 'Select the correct passive form of the given active sentence: "The teacher is teaching the students."',
        options: [
          '(a) The students were taught by the teacher.',
          '(b) The students are being taught by the teacher.',
          '(c) The students taught by the teacher.',
          '(d) The students have been taught by the teacher.'
        ],
        correctOptionIndex: 1,
        explanation: 'Active (Present Continuous) is converted into Passive using "is/am/are + being + V3". "The students are being taught by..." is correct. / प्रेजेंट कंटीन्यूअस का पैसिव "are/is + being + verb 3rd form" होगा।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'Choose the correct meaning of the underlined idiom/phrase: "He won the prize <span class="underline">fair and square</span>."',
        options: [
          '(a) By unjust means',
          '(b) Competently and honest',
          '(c) In an honest and fair way',
          '(d) With great difficulty'
        ],
        correctOptionIndex: 2,
        explanation: 'The idiom "fair and square" means in an honest, fair, and straightforward manner. / "Fair and square" का अर्थ पूरी ईमानदारी और नियमों के तहत (In an honest and fair way) होता है।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'Select the correctly spelt word from the given options:',
        options: [
          '(a) Occurence',
          '(b) Occurrence',
          '(c) Ocurence',
          '(d) Occurance'
        ],
        correctOptionIndex: 1,
        explanation: 'The correct spelling is "Occurrence" with double c, double r, and ending in "ence". / सही स्पेलिंग "Occurrence" (घटना) है।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'Select the most appropriate antonym of the given word: "BENEVOLENT"',
        options: [
          '(a) Malevolent / Cruel',
          '(b) Generous',
          '(c) Friendly',
          '(d) Magnanimous'
        ],
        correctOptionIndex: 0,
        explanation: '"Benevolent" means well meaning and kindly. Its direct antonym is "Malevolent" which means having or showing a wish to do evil to others. / Benevolent का अर्थ परोपकारी या दयालु होता है। इसका विलोम Malevolent (द्वेषपूर्ण) है।'
      },
      {
        id: `cgl100-q${i}`,
        text: 'Select the option that can be used as a one-word substitute for: "An office with high salary but no work."',
        options: [
          '(a) Sinecure',
          '(b) Honorary',
          '(c) Freebie',
          '(d) Bureaucracy'
        ],
        correctOptionIndex: 0,
        explanation: 'A "Sinecure" is a position of office requiring little or no work but giving the holder status or financial benefit. / बिना काम का अधिक वेतन वाला पद "Sinecure" (कार्यभारहीन पद) कहलाता है।'
      }
    ];
    const pick = englishPool[(i - 81) % englishPool.length];
    questions.push({
      id: `cgl100-q${i}`,
      text: `${pick.text} (${i})`,
      options: pick.options,
      correctOptionIndex: pick.correctOptionIndex,
      explanation: pick.explanation
    });
  }

  return questions;
}
