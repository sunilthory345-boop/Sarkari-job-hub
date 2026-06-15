import { Question, MockTest } from '../types';

/**
 * Dynamically generates high-quality, solved MCQ questions for a specific exam category and mock test index.
 * Questions are structured based on authentic exam patterns (carrying bilingual text where relevant).
 */
export function generateMockQuestions(category: string, mockIndex: number): Question[] {
  const questions: Question[] = [];
  const cat = category.toLowerCase();

  const totalQuestions = cat.includes('rpf') ? 120 : 100;

  for (let qNum = 1; qNum <= totalQuestions; qNum++) {
    let text = '';
    let options: string[] = [];
    let correctOptionIndex = 0;
    let explanation = '';

    if (cat.includes('upsc')) {
      // ==========================================
      // UPSC CIVIL SERVICES (GS-1 PRELIMS PATTERN)
      // ==========================================
      if (qNum <= 25) {
        const historyThemes = [
          {
            text: `With reference to Gupta administration, the term 'Uparika' refers to: / गुप्त प्रशासन के संदर्भ में, 'उपरिक' शब्द का अर्थ क्या था?`,
            opts: ['(a) Royal Treasurer / शाही कोषाध्यक्ष', '(b) Provincial Governor / प्रांतीय गवर्नर', '(c) Chief Justice / मुख्य न्यायाधीश', '(d) Commander of cavalry / घुड़सवार सेना का अध्यक्ष'],
            ans: 1,
            exp: `The provincial governor in the Gupta empire administration was called an 'Uparika'. They were directly appointed by the Emperor.`
          },
          {
            text: `With reference to Buddhist history, who among the following wrote the 'Milinda Panha'? / बौद्ध इतिहास के संदर्भ में, निम्नलिखित में से किसने 'मिलिंदपञ्हो' की रचना की थी?`,
            opts: ['(a) Nagarjuna / नागार्जुन', '(b) Nagasena / नागसेन', '(c) Vasumitra / वसुमित्र', '(d) Ashvaghosa / अश्वघोष'],
            ans: 1,
            exp: `'Milinda Panha' is a famous Buddhist text consisting of dialogue between the Indo-Greek King Menander I and the sage Nagasena.`
          },
          {
            text: `Which Harappan site is famous for its unique three-tier division of the town planning, unlike other two-fold cities? / कौन सा हड़प्पाकालीन स्थल अपने विशिष्ट तीन-स्तरीय नगर नियोजन के लिए प्रसिद्ध है?`,
            opts: ['(a) Kalibangan / कालीबंगा', '(b) Lothal / लोथल', '(c) Mohenjo-daro / मोहनजोदड़ो', '(d) Dholavira / धोलावीरा'],
            ans: 3,
            exp: `Dholavira in Gujarat is divided into three distinct parts: the Citadel, the Middle Town, and the Lower Town.`
          }
        ];
        const theme = historyThemes[(qNum + mockIndex) % historyThemes.length];
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;

      } else if (qNum <= 50) {
        const geoThemes = [
          {
            text: `Which of the following ocean currents is a warm current? / निम्नलिखित समुद्री धाराओं में से कौन सी एक गर्म धारा है?`,
            opts: ['(a) Kuroshio Current / कूरेशियो धारा', '(b) Oyashio Current / ओयाशियो धारा', '(c) Canary Current / कनारी धारा', '(d) Benguela Current / बेंगुएला धारा'],
            ans: 0,
            exp: `Kuroshio is a warm ocean current flowing Northwards in the western Pacific. Oyashio, Canary, and Benguela are cold currents.`
          },
          {
            text: `Under which Wildlife Conservation schedule is the Gangetic Dolphin protected in India? / भारत में गंगा डॉल्फिन को किस वन्यजीव संरक्षण अनुसूची के तहत संरक्षित किया गया है?`,
            opts: ['(a) Schedule II / अनुसूची II', '(b) Schedule III / अनुसूची III', '(c) Schedule I / अनुसूची I', '(d) Schedule IV / अनुसूची IV'],
            ans: 2,
            exp: `The Ganges River Dolphin is protected under Schedule I of the Wildlife Protection Act, 1972.`
          }
        ];
        const theme = geoThemes[(qNum + mockIndex) % geoThemes.length];
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;

      } else if (qNum <= 75) {
        const polityThemes = [
          {
            text: `Which of the following Articles under Part III of the Constitution can NOT be suspended even during a National Emergency? / संविधान के भाग III के तहत निम्नलिखित में से कौन से अनुच्छेद राष्ट्रीय आपातकाल के दौरान भी निलंबित नहीं किए जा सकते?`,
            opts: ['(a) Articles 14 and 19 / अनुच्छेद 14 और 19', '(b) Articles 20 and 21 / अनुच्छेद 20 और 21', '(c) Articles 21 and 22 / अनुच्छेद 21 और 22', '(d) Articles 19 and 20 / अनुच्छेद 19 और 20'],
            ans: 1,
            exp: `By the 44th Amendment Act of 1978, the right to protection in respect of conviction for offenses (Article 20) and right to life & personal liberty (Article 21) cannot be suspended.`
          }
        ];
        const theme = polityThemes[(qNum + mockIndex) % polityThemes.length];
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;

      } else {
        const ecoThemes = [
          {
            text: `In India, the Base Year for calculating India's Index of Industrial Production (IIP) is currently set at: / भारत में, औद्योगिक उत्पादन सूचकांक (IIP) की गणना के लिए आधार वर्ष वर्तमान में क्या है?`,
            opts: ['(a) 2004-05', '(b) 2011-12', '(c) 2015-16', '(d) 2018-19'],
            ans: 1,
            exp: `The base year for IIP estimation was updated from 2004-05 to 2011-12.`
          }
        ];
        const theme = ecoThemes[(qNum + mockIndex) % ecoThemes.length];
        text = `[UPSC Mock-${mockIndex}] Q${qNum}. ${theme.text}`;
        options = theme.opts;
        correctOptionIndex = theme.ans;
        explanation = theme.exp;
      }

    } else if (cat.includes('sbi') && cat.includes('po')) {
      // ==========================================
      // SBI PO PRELIMS PATTERN (100 Qs)
      // Sections: English (1-30), Quantitative Aptitude (31-65), Reasoning Ability (66-100)
      // ==========================================
      if (qNum <= 30) {
        // English Language
        const englishSbi = [
          {
            text: `Select the word which is closest to the OPPOSITE in meaning of the word 'OBSTINATE': / 'OBSTINATE' शब्द के विपरीत अर्थ वाला शब्द चुनें:`,
            opts: ['(a) Stubborn / जिद्दी', '(b) Flexible / लचीला', '(c) Rigid / कठोर', '(d) Resolute / दृढ़'],
            ans: 1,
            exp: `'Obstinate' means stubborn or unyielding. Its opposite/antonym is 'Flexible'.`
          },
          {
            text: `Fill in the blank with the most appropriate preposition: "The committee agreed _________ the recommendation with minor modifications." / उपयुक्त प्रीपोज़िशन से रिक्त स्थान भरें:`,
            opts: ['(a) on', '(b) to', '(c) with', '(d) by'],
            ans: 1,
            exp: `One "agrees to" a proposal or plan, and "agrees with" a person. Therefore, "agrees to the recommendation" is correct.`
          }
        ];
        const item = englishSbi[(qNum + mockIndex) % englishSbi.length];
        text = `[SBI PO English Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 65) {
        // Quantitative Aptitude
        const r1 = 4 + (mockIndex * 2) + (qNum % 6);
        const r2 = r1 + 3;
        const totalWork = r1 * r2 * 2;
        text = `[SBI PO Quant Q${qNum}] A can complete a piece of work in ${r1} days and B can do it in ${r2} days. If they work together, how many days will they take? / A एक कार्य को ${r1} दिनों में और B उसे ${r2} दिनों में पूरा कर सकता है। यदि वे एक साथ काम करते हैं, तो उन्हें कितने दिन लगेंगे?`;
        options = [
          `(a) ${( (r1 * r2) / (r1 + r2) ).toFixed(2)} days`,
          `(b) ${(r1 + r2) / 2} days`,
          `(c) ${Math.round((r1 * r2) / (r1 + r2) + 2)} days`,
          `(d) ${r1} days`
        ];
        correctOptionIndex = 0;
        explanation = `Combined 1 day's work of A and B = (1/${r1}) + (1/${r2}) = (${r1}+${r2})/(${r1}*${r2}). Time taken together = (${r1}*${r2})/(${r1}+${r2}) days.`;
      } else {
        // Reasoning Ability
        text = `[SBI PO Reasoning Q${qNum}] Seven boxes A, B, C, D, E, F, G are stacked one above other. Box A is positioned 3rd from top. How many boxes are placed between A and G if G is at the bottom? / सात बक्से एक के ऊपर एक रखे हैं। बक्सा A ऊपर से तीसरे स्थान पर है। यदि G सबसे नीचे है, तो A और G के बीच कितने बक्से हैं?`;
        options = ['(a) One', ' (b) Two', '(c) Three', '(d) Four'],
        correctOptionIndex = 2; // positions: 1, 2, A(3), 4, 5, 6, G(7). Index between 3 and 7: 4, 5, 6 (which is 3 boxes)
        explanation = `Box positions: 1, 2, A(3rd), 4, 5, 6, G(7th / Bottom). The boxes between A and G are at positions 4, 5, and 6. This counts to exactly 3 boxes.`;
      }

    } else if (cat.includes('ibps') || cat.includes('bank')) {
      // ==========================================
      // IBPS PO PRELIMS PATTERN (100 Qs)
      // Sections: Quant (1-35), Reasoning (36-70), English (71-100)
      // ==========================================
      if (qNum <= 35) {
        const r1 = 3 + (mockIndex * 3) + (qNum % 7);
        text = `[Bank PO Q${qNum}] A sum of money invested at Simple Interest doubles itself in ${r1} years. In how many years will it become 4 times of itself at the same rate? / साधारण ब्याज पर निवेश की गई कोई राशि ${r1} वर्षों में दोगुनी हो जाती है। समान ब्याज दर पर वह कितने वर्षों में 4 गुना हो जाएगी?`;
        options = [`(a) ${3 * r1} years`, `(b) ${4 * r1} years`, `(c) ${2 * r1} years`, `(d) ${r1 + 8} years`];
        correctOptionIndex = 0;
        explanation = `If sum P becomes 2P in ${r1} years, Interest = P. To become 4P, Interest required is 3P. Since simple interest is uniform, time taken is 3 times of original = 3 * ${r1} = ${3 * r1} years.`;
      } else if (qNum <= 70) {
        text = `[Bank PO Q${qNum}] Under a syllogistic assessment: Statement: I. Some tablets are laptops. II. All laptops are servers. Conclusions: I. Some servers are tablets. II. No server is a laptop. Choose correct option.`;
        options = ['(a) Only conclusion I follows', '(b) Only conclusion II follows', '(c) Both follow', '(d) Neither follows'];
        correctOptionIndex = 0;
        explanation = 'Since some tablets are laptops and all laptops are servers, those tablets which are laptops are definitely servers. Hence some servers are tablets. Conclusion I follows.';
      } else {
        text = `[Bank PO Q${qNum}] Identify the part of sentence that contains a grammatical error: "Neither Sunil nor his friends (A) has agreed to support (B) the motion proposed in the meeting (C). No error (D)"`;
        options = ['(a) Part A', '(b) Part B', '(c) Part C', '(d) Part D (No error)'];
        correctOptionIndex = 1;
        explanation = 'With "neither... nor", the verb agrees with the closer subject. Since "his friends" is plural, the helping verb must be "have", not "has".';
      }

    } else if (cat.includes('group-d')) {
      // ==========================================
      // RAILWAY GROUP D PATTERN (100 Qs)
      // Sections: Science (1-25), Math (26-50), Reasoning (51-80), General Awareness (81-100)
      // ==========================================
      if (qNum <= 25) {
        // General Science
        const scienceGroupD = [
          {
            text: `What is the chemical formula of Washing Soda? / वाशिंग सोडा (धावन सोडा) का रासायनिक सूत्र क्या है?`,
            opts: ['(a) Na2CO3.10H2O', '(b) NaHCO3', '(c) NaOH', '(d) CaOCl2'],
            ans: 0,
            exp: `Washing soda's chemical term is sodium carbonate decahydrate (Na2CO3.10H2O).`
          },
          {
            text: `Which among the following is the SI unit of power of a lens? / लेंस की क्षमता का SI मात्रक निम्नलिखित में से क्या है?`,
            opts: ['(a) Watt / वाट', '(b) Dioptre / डायोप्टर', '(c) Lumen / ल्यूमेन', '(d) Candela / कैंडेला'],
            ans: 1,
            exp: `The SI unit of physical refractive power of an optical lens is the Dioptre (reciprocal of focal length in meters).`
          }
        ];
        const item = scienceGroupD[(qNum + mockIndex) % scienceGroupD.length];
        text = `[Group-D Science Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 50) {
        // Mathematics
        const num = 12 + (mockIndex * 4) + (qNum % 8);
        text = `[Group-D Math Q${qNum}] Solve the expression for positive square root: Find the square root of ${num * num} / ${num * num} का वर्गमूल ज्ञात कीजिए:`;
        options = [`(a) ${num}`, `(b) ${num - 2}`, `(c) ${num + 2}`, `(d) ${num * 2}`];
        correctOptionIndex = 0;
        explanation = `The square root of ${num * num} is ${num} because ${num} multiplied by ${num} is equal to ${num * num}.`;
      } else if (qNum <= 80) {
        // Reasoning
        text = `[Group-D Reasoning Q${qNum}] If '+' means '*', '-' means '+', '*' means '/' and '/' means '-', what is 10 + 5 - 12 / 6? / यदि '+' का अर्थ '*', '-' का अर्थ '+', '*' का अर्थ '/' और '/' का अर्थ '-' है, तो 10 + 5 - 12 / 6 का मान क्या होगा?`;
        options = ['(a) 56', '(b) 44', '(c) 50', '(d) 20'];
        correctOptionIndex = 0;
        explanation = `Substituting modified signs: 10 * 5 + 12 - 6 = 50 + 12 - 6 = 62 - 6 = 56.`;
      } else {
        // General Awareness & CA
        text = `[Group-D GA Q${qNum}] Where is the headquarters of the North Western Railway zone located? / उत्तर पश्चिम रेलवे जोन का मुख्यालय कहाँ स्थित है?`;
        options = ['(a) Jaipur / जयपुर', '(b) Jodhpur / जोधपुर', '(c) Ajmer / अजमेर', '(d) Bikaner / बीकानेर'];
        correctOptionIndex = 0;
        explanation = `The North Western Railway is one of the eighteen railway zones in India, headquartered at Jaipur, Rajasthan.`;
      }

    } else if (cat.includes('rpf') && cat.includes('si')) {
      // ==========================================
      // RAILWAY RPF SI PATTERN (120 Qs)
      // Sections: General Awareness (1-50), Arithmetic (51-85), Reasoning (86-120)
      // ==========================================
      if (qNum <= 50) {
        // General Awareness (History, Geography, Polity, Science)
        const gaRpf = [
          {
            text: `Who was the founder of the Slave Dynasty in India? / भारत में गुलाम वंश का संस्थापक कौन था?`,
            opts: ['(a) Iltutmish / इल्तुतमिश', '(b) Qutub-ud-din Aibak / कुतुबुद्दीन ऐबक', '(c) Balban / बलबन', '(d) Razia Sultana / रजिया सुल्तान'],
            ans: 1,
            exp: `The Slave Dynasty (Mamluk Dynasty) was founded in 1206 by Qutub-ud-din Aibak, who was a trusted general of Muhammad Ghori.`
          },
          {
            text: `Under which Constitutional Article is the President's Rule imposed in a state? / किस संवैधानिक अनुच्छेद के तहत किसी राज्य में राष्ट्रपति शासन लगाया जाता है?`,
            opts: ['(a) Article 352 / अनुच्छेद 352', '(b) Article 356 / अनुच्छेद 356', '(c) Article 360 / अनुच्छेद 360', '(d) Article 368 / अनुच्छेद 368'],
            ans: 1,
            exp: `Article 356 of the Constitution of India provides for the imposition of President's Rule in a state in case of failure of constitutional machinery.`
          }
        ];
        const item = gaRpf[(qNum + mockIndex) % gaRpf.length];
        text = `[RPF SI GA Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 85) {
        // Arithmetic
        const p = 1000 + (mockIndex * 100) + (qNum * 10);
        const r = 5;
        const speedRatio = Math.round(p * r / 100);
        text = `[RPF SI Arithmetic Q${qNum}] Find the Simple Interest on ₹${p} for 2 years at 5% per annum. / ₹${p} पर 2 वर्ष के लिए 5% वार्षिक दर से साधारण ब्याज ज्ञात कीजिए।`;
        options = [
          `(a) ₹${speedRatio * 2}`,
          `(b) ₹${speedRatio}`,
          `(c) ₹${speedRatio * 3}`,
          `(d) ₹${speedRatio + 50}`
        ];
        correctOptionIndex = 1; // SI = (P * R * T)/100 = (p * 5 * 2)/100 = p * 10 / 100 = p/10. Here, our formula calculates SI as p/10, which matches speedRatio when P=p. Let's make options mathematically correct: SI = (p * 5 * 2) / 100 = p/10. So ans should be option indexed 1: p/10.
        options = [
          `(a) ₹${Math.round(p * 0.05)}`,
          `(b) ₹${Math.round(p * 0.10)}`, // CORRECT
          `(c) ₹${Math.round(p * 0.15)}`,
          `(d) ₹${Math.round(p * 0.20)}`
        ];
        explanation = `Simple Interest = (Principal * Rate * Time) / 100 = (${p} * 5 * 2) / 100 = ₹${Math.round(p * 0.10)}.`;
      } else {
        // Reasoning
        text = `[RPF SI Reasoning Q${qNum}] Pointing to a photograph, Ram said, "Her mother's only daughter is my mother." How is Ram related to that lady in photograph? / एक तस्वीर की ओर इशारा करते हुए, राम ने कहा, "उसकी मां की इकलौती बेटी मेरी मां है।" राम का उस तस्वीर वाली महिला से क्या संबंध है?`;
        options = ['(a) Brother / भाई', '(b) Uncle / मामा', '(c) Son / बेटा', '(d) Father / पिता'];
        correctOptionIndex = 2; // Her mother's only daughter is the lady herself. The lady is Ram's mother, so Ram is her son.
        explanation = `"Her mother's only daughter" refers to the lady in the photograph herself. Since she is Ram's mother, Ram is her Son.`;
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
        explanation = `Speed in m/s = ${speedKmh} * 5/18. Time = Distance / Speed = ${lengthM} / Speed = ${timeSec} seconds.`;
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
      // Sections: Reasoning (1-25), GA (26-50), Maths (51-75), English (76-100)
      // ==========================================
      if (qNum <= 25) {
        text = `[SSC CHSL Q${qNum}] If A denotes '+', B denotes '-', C denotes '*' and D denotes '/', evaluate expression: 20 A 10 C 2 B 8 D 2 / सरल कीजिए: 20 A 10 C 2 B 8 D 2`;
        options = ['(a) 36', '(b) 32', '(c) 40', '(d) 18'];
        correctOptionIndex = 0;
        explanation = 'Substituting signs: 20 + 10 * 2 - 8 / 2 = 20 + 20 - 4 = 40 - 4 = 36.';
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
 * Returns exactly 10 comprehensive mock exam papers for each of the 8 vacancies:
 * 1. UPSC Civil Services
 * 2. SSC CGL
 * 3. IBPS PO
 * 4. RRB NTPC
 * 5. SSC CHSL
 * 6. SBI PO
 * 7. Railway Group D
 * 8. Railway RPF SI
 * 
 * Total = 80 fully functional CBT mock test papers!
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
      totalMarks: 100,
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
    },
    {
      name: 'SBI PO Exam Prep',
      titlePrefix: 'SBI Probationary Officer (PO) Prelims High-Yield Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'Railway Group-D Exam Prep',
      titlePrefix: 'Railway RRB Group-D (Level-1) CBT Complete Mock',
      duration: 90,
      totalMarks: 100,
      negative: 0.33
    },
    {
      name: 'Railway RPF SI Exam Prep',
      titlePrefix: 'RPF Sub-Inspector (SI) CBT Stage-1 All Subject Mock',
      duration: 90,
      totalMarks: 120,
      negative: 0.33
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
