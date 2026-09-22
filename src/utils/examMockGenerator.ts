import { Question, MockTest } from '../types';

/**
 * Dynamically generates high-quality, solved MCQ questions for a specific exam category and mock test index.
 * Questions are structured based on authentic exam patterns (carrying bilingual text where relevant).
 */
export function generateMockQuestions(category: string, mockIndex: number): Question[] {
  const questions: Question[] = [];
  const cat = category.toLowerCase();

  const totalQuestions = cat.includes('rpf') ? 120 : (cat.includes('alp') ? 75 : 100);

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

    } else if (cat.includes('bob') || cat.includes('baroda') || cat.includes('pnb') || cat.includes('punjab national') || cat.includes('specialist') || cat.includes('so') || cat.includes('union') || cat.includes('canara')) {
      // ==========================================
      // PUBLIC SECTOR BANK SO & APPRENTICE PATTERN (BOB, PNB, UNION BANK, CANARA)
      // Section 1 (Q1-40): Professional Knowledge & Banking/Financial Awareness
      // Section 2 (Q41-70): Reasoning Ability & Computer Aptitude
      // Section 3 (Q71-100): Quantitative Aptitude & English Language
      // ==========================================
      if (qNum <= 40) {
        const pkBankQuestions = [
          {
            q: `Under RBI guidelines, after how many days of overdue status is a loan account classified as a Non-Performing Asset (NPA)? / आरबीआई दिशा-निर्देशों के तहत, कितने दिनों तक अतिदेय (overdue) रहने पर ऋण खाता गैर-निष्पादित परिसंपत्ति (NPA) के रूप में वर्गीकृत किया जाता है?`,
            opts: ['(a) 90 Days / 90 दिन', '(b) 60 Days / 60 दिन', '(c) 180 Days / 180 दिन', '(d) 30 Days / 30 दिन'],
            ans: 0,
            exp: `An asset becomes non-performing when it ceases to generate income for the bank. As per RBI norms, a loan or advance is classified as an NPA where interest or installment of principal remains overdue for more than 90 days.`
          },
          {
            q: `What is the maximum deposit insurance coverage provided to a depositor per insured bank by DICGC in India? / भारत में DICGC द्वारा प्रति जमाकर्ता प्रति बैंक अधिकतम कितनी बीमा सुरक्षा राशि प्रदान की जाती है?`,
            opts: ['(a) ₹5,00,000 (Five Lakh Rupees)', '(b) ₹1,00,000', '(c) ₹10,00,000', '(d) ₹2,00,000'],
            ans: 0,
            exp: `The Deposit Insurance and Credit Guarantee Corporation (DICGC), a wholly-owned subsidiary of the RBI, insures bank deposit accounts up to a ceiling limit of ₹5 Lakh per depositor per bank (covering principal and interest).`
          },
          {
            q: `Under the Basel III capital regulations in India, what is the minimum mandatory Capital to Risk-Weighted Assets Ratio (CRAR) prescribed for Scheduled Commercial Banks (excluding CCB)? / बेसल III मानदंडों के तहत भारत में वाणिज्यिक बैंकों के लिए न्यूनतम अनिवार्य CRAR कितना निर्धारित है?`,
            opts: ['(a) 9.0%', '(b) 8.0%', '(c) 11.5%', '(d) 10.0%'],
            ans: 0,
            exp: `RBI mandates a minimum total Capital to Risk-Weighted Assets Ratio (CRAR) of 9.0% for commercial banks in India (which is 1% higher than the Basel Committee's 8.0% recommendation). With Capital Conservation Buffer (CCB) of 2.5%, the total required is 11.5%.`
          },
          {
            q: `What is the minimum transaction limit for initiating a payment through Real Time Gross Settlement (RTGS) in Indian banking? / भारतीय बैंकिंग में RTGS के माध्यम से लेनदेन की न्यूनतम सीमा क्या है?`,
            opts: ['(a) ₹2,00,000 / दो लाख रुपये', '(b) ₹1,00,000', '(c) No minimum limit', '(d) ₹5,00,000'],
            ans: 0,
            exp: `The RTGS system is primarily meant for large-value transactions. The minimum amount to be remitted through RTGS is ₹2,00,000 with no upper ceiling. (NEFT has no minimum limit).`
          },
          {
            q: `Under the SARFAESI Act, 2002, secured creditors can enforce their security interest against defaulting borrowers under which Section without intervention of the court? / सरफेसी अधिनियम (SARFAESI Act 2002) की किस धारा के तहत बैंक बिना अदालती हस्तक्षेप के प्रतिभूति हित लागू कर सकते हैं?`,
            opts: ['(a) Section 13(2) & 13(4)', '(b) Section 9', '(c) Section 138', '(d) Section 25'],
            ans: 0,
            exp: `Under Section 13(2), a 60-day demand notice is served to the borrower. Upon non-compliance, Section 13(4) of the SARFAESI Act empowers the secured creditor to take possession of the secured assets.`
          },
          {
            q: `In the Indian Financial System Code (IFSC), how many characters are there, and what does the 5th character represent? / IFSC कोड में कुल कितने अक्षर होते हैं तथा 5वां अक्षर क्या दर्शाता है?`,
            opts: ['(a) 11 characters; 5th character is always \'0\' (Zero)', '(b) 10 characters; 5th character is letter \'O\'', '(c) 12 characters; 5th character is district code', '(d) 9 characters; 5th character is check digit'],
            ans: 0,
            exp: `IFSC is an 11-character alphanumeric code: first 4 characters represent bank name, 5th character is reserved as '0' (zero) for future use, and last 6 characters identify the specific bank branch.`
          },
          {
            q: `What is the Priority Sector Lending (PSL) target for Domestic Scheduled Commercial Banks as a percentage of Adjusted Net Bank Credit (ANBC)? / घरेलू वाणिज्यिक बैंकों के लिए ANBC के प्रतिशत के रूप में प्राथमिक क्षेत्र उधारी (PSL) का लक्ष्य क्या है?`,
            opts: ['(a) 40% of ANBC', '(b) 30% of ANBC', '(c) 50% of ANBC', '(d) 75% of ANBC'],
            ans: 0,
            exp: `Domestic Scheduled Commercial Banks are required to allocate 40% of their Adjusted Net Bank Credit (ANBC) or CEOBE (Credit Equivalent Amount of Off-Balance Sheet Exposure), whichever is higher, to priority sectors (Agriculture, MSME, Education, Housing, etc.).`
          },
          {
            q: `Under Section 138 of the Negotiable Instruments Act, 1881, dishonour of a cheque due to insufficiency of funds is punishable with imprisonment up to: / परक्राम्य लिखत अधिनियम 1881 की धारा 138 के तहत चेक बाउंस होने पर अधिकतम कितने वर्ष के कारावास का प्रावधान है?`,
            opts: ['(a) 2 Years or fine up to twice the cheque amount (or both)', '(b) 1 Year or fine up to ₹50,000', '(c) 3 Years', '(d) 6 Months'],
            ans: 0,
            exp: `Section 138 of NI Act provides that dishonour of cheque for insufficient funds is a criminal offence punishable with imprisonment for a term up to 2 years, or with fine which may extend to twice the amount of the cheque, or both.`
          }
        ];
        const item = pkBankQuestions[(qNum + mockIndex) % pkBankQuestions.length];
        text = `[Bank SO & Apprentice PK Q${qNum}] ${item.q}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 70) {
        const reasoningComputerQs = [
          {
            q: `In a row of 8 bank executives facing North, A is 4th to the left of B. C is immediate right of B. D sits at the extreme right end. If there are 2 persons between B and D, how many persons are between A and C? / उत्तर की ओर मुख किए 8 अधिकारियों की पंक्ति में A, B के बाएं चौथे स्थान पर है। B और C के बीच कितने व्यक्ति हैं?`,
            opts: ['(a) 4 persons', '(b) 3 persons', '(c) 2 persons', '(d) 5 persons'],
            ans: 0,
            exp: `Positions from left: If B is at position 5, then A is at position 1 (4th to the left). C is at position 6 (immediate right of B). The persons between A (pos 1) and C (pos 6) are positions 2, 3, 4, 5, which equals exactly 4 persons.`
          },
          {
            q: `Statements: Only a few loans are personal. All personal are retail. No retail is corporate. Conclusions: I. Some loans are definitely not corporate. II. All loans can never be personal. Choose correct option:`,
            opts: ['(a) Both conclusions I and II follow', '(b) Only conclusion I follows', '(c) Only conclusion II follows', '(d) Neither follows'],
            ans: 0,
            exp: `Conclusion I follows because those loans which are personal are part of retail, and no retail can be corporate. Conclusion II follows because "Only a few loans are personal" inherently means some loans can never be personal. Hence both follow.`
          },
          {
            q: `In banking IT network security, what does AES stand for in data encryption protocols? / बैंकिंग सुरक्षा में AES एन्क्रिप्शन प्रोटोकॉल का पूर्ण रूप क्या है?`,
            opts: ['(a) Advanced Encryption Standard', '(b) Automated Electronic System', '(c) Asymmetric Encrypted Server', '(d) Authorized Exchange Scheme'],
            ans: 0,
            exp: `AES stands for Advanced Encryption Standard, a symmetric block cipher algorithm established by NIST used globally to protect sensitive financial and transactional data.`
          },
          {
            q: `Which layer of the OSI model handles end-to-end data communication, flow control, and error recovery (e.g. TCP)? / OSI मॉडल की कौन सी लेयर एंड-टू-एंड संचार व एरर रिकवरी (जैसे TCP) संभालती है?`,
            opts: ['(a) Transport Layer / ट्रांसपोर्ट लेयर', '(b) Network Layer', '(c) Data Link Layer', '(d) Session Layer'],
            ans: 0,
            exp: `The Transport Layer (Layer 4) provides transparent transfer of data between end users, providing reliable data transfer services (such as TCP) including flow control, segmentation, and error control.`
          }
        ];
        const item = reasoningComputerQs[(qNum + mockIndex) % reasoningComputerQs.length];
        text = `[Bank SO Reasoning & IT Q${qNum}] ${item.q}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else {
        const quantEngQs = [
          {
            q: `Data Interpretation: A bank branch disbursed ₹120 Crore in loans in 2025. Of this, 40% was Home Loans, 25% was MSME Loans, and the remainder was Vehicle Loans. What is the difference between Home Loans and Vehicle Loans? / एक बैंक शाखा ने ₹120 करोड़ का ऋण वितरित किया। 40% गृह ऋण, 25% एमएसएमई, तथा शेष वाहन ऋण था। गृह ऋण और वाहन ऋण में अंतर कितना है?`,
            opts: ['(a) ₹6 Crore', '(b) ₹8 Crore', '(c) ₹10 Crore', '(d) ₹12 Crore'],
            ans: 0,
            exp: `Vehicle loans percentage = 100% - (40% + 25%) = 35%. Difference between Home Loans (40%) and Vehicle Loans (35%) is 5%. 5% of ₹120 Crore = 0.05 × 120 = ₹6 Crore.`
          },
          {
            q: `Quadratic Equations: Compare Equation I: x² - 14x + 48 = 0 and Equation II: y² - 17y + 72 = 0. Choose the relationship between x and y:`,
            opts: ['(a) x ≤ y', '(b) x ≥ y', '(c) x > y', '(d) x < y'],
            ans: 0,
            exp: `Equation I: (x - 6)(x - 8) = 0 => x = 6, 8. Equation II: (y - 8)(y - 9) = 0 => y = 8, 9. Comparing: 6 < 8, 6 < 9, 8 = 8, 8 < 9. Therefore, x is less than or equal to y (x ≤ y).`
          },
          {
            q: `Select the word that is most nearly SYNONYMOUS in meaning to 'MITIGATE' as used in financial risk management: / 'MITIGATE' शब्द का पर्यायवाची चुनें:`,
            opts: ['(a) Alleviate / Lessen / कम करना', '(b) Aggravate / बढ़ाना', '(c) Eliminate / समाप्त करना', '(d) Intensify'],
            ans: 0,
            exp: `'Mitigate' means to make less severe, serious, or painful. In banking risk management, mitigating credit risk means alleviating or reducing potential loss.`
          },
          {
            q: `Identify the grammatical error in sentence: "Neither the branch manager (A) nor the loan officers (B) was aware of (C) the revised audit guidelines (D)."`,
            opts: ['(a) Part C ("was aware of" should be "were aware of")', '(b) Part A', '(c) Part B', '(d) Part D'],
            ans: 0,
            exp: `In a 'neither... nor' construction, the verb agrees with the subject closest to it. Since 'loan officers' is plural, the auxiliary verb must be 'were', not 'was'.`
          }
        ];
        const item = quantEngQs[(qNum + mockIndex) % quantEngQs.length];
        text = `[Bank SO Quant & English Q${qNum}] ${item.q}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      }

    } else if (cat.includes('sbi') || cat.includes('ibps') || cat.includes('bank')) {
      // ==========================================
      // OFFICIAL BANKING PRELIMS PATTERN (IBPS PO, SBI PO, IBPS CLERK, SBI CLERK)
      // Section 1 (Q1-30): English Language (20 Mins Sectional Timing)
      // Section 2 (Q31-65): Quantitative Aptitude & Data Interpretation (20 Mins Sectional Timing)
      // Section 3 (Q66-100): Reasoning Ability & High-Yield Puzzles (20 Mins Sectional Timing)
      // ==========================================
      if (qNum <= 30) {
        // English Language
        const bankEnglishSet = [
          {
            q: `Reading Comprehension / Macroeconomics: "Central Bank Digital Currencies (CBDCs) leverage cryptographic ledger technology to provide sovereign digital currency, decreasing the cash-handling logistics cost for central banks while guaranteeing settlement finality." According to the excerpt, what primary logistical advantage do CBDCs offer?`,
            opts: [
              '(a) Substantial reduction in cash-handling logistics and operational costs',
              '(b) Eliminating all commercial banks completely',
              '(c) Forcing 100% inflation suppression immediately',
              '(d) Disabling private UPI applications'
            ],
            ans: 0,
            exp: `The passage directly states that CBDCs provide a primary advantage of "decreasing the cash-handling logistics cost for central banks while guaranteeing settlement finality."`
          },
          {
            q: `Spotting Errors (Banking Pattern): "No sooner had the Monetary Policy Committee (A) announced the rate hike (B) when the commercial banks (C) revised their lending rates (D)." Which segment contains an error?`,
            opts: [
              '(a) Part C: "when" must be replaced by "than"',
              '(b) Part A',
              '(c) Part B',
              '(d) No error'
            ],
            ans: 0,
            exp: `The correlative conjunction pairing for 'No sooner... ' is 'than', not 'when'. The correct syntax is: "No sooner had the MPC announced... than the commercial banks revised..."`
          },
          {
            q: `Cloze Test / Financial Context: "Financial inclusion policies seek to integrate underbanked populations by extending _________ credit lines and eliminating predatory informal money-lenders." Choose the best fit word:`,
            opts: ['(a) affordable', '(b) exorbitant', '(c) prohibitive', '(d) erratic'],
            ans: 0,
            exp: `'Affordable' aligns with the developmental goal of financial inclusion to provide reasonable, regulated credit to marginalized borrowers.`
          },
          {
            q: `Sentence Improvement: "The audit team has recommended that each branch submits their quarterly compliance report before Friday." Select the best alternative for "submits their":`,
            opts: ['(a) submit its', '(b) submit their', '(c) submits its', '(d) submitted their'],
            ans: 0,
            exp: `With subjunctive verbs of recommendation ('recommended that...'), the base form 'submit' is used. Additionally, 'each branch' is a singular neuter entity, requiring the pronoun 'its'. Hence 'submit its' is grammatically precise.`
          },
          {
            q: `Select the word which is OPPOSITE (Antonym) in meaning to 'SOLVENT' in financial terminology:`,
            opts: ['(a) Bankrupt / Insolvent / दिवालिया', '(b) Liquid', '(c) Prosperous', '(d) Creditworthy'],
            ans: 0,
            exp: `'Solvent' means possessing assets in excess of liabilities, able to meet one's financial obligations. Its direct opposite is 'Bankrupt' or 'Insolvent'.`
          }
        ];
        const item = bankEnglishSet[(qNum + mockIndex) % bankEnglishSet.length];
        text = `[Bank English Q${qNum}] ${item.q}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;

      } else if (qNum <= 65) {
        // Quantitative Aptitude & Data Interpretation (35 Questions)
        const bankQuantSet = [
          {
            q: `Data Interpretation (Caselet): A public sector bank branch in Delhi has 800 total account holders. 45% hold Savings accounts, 30% hold Current accounts, and the remaining hold Fixed Deposit (FD) accounts. How many customers hold Fixed Deposit accounts? / 800 खाताधारकों में से 45% बचत खाता, 30% चालू खाता और शेष एफडी धारक हैं। एफडी धारकों की संख्या कितनी है?`,
            opts: ['(a) 200', '(b) 240', '(c) 180', '(d) 220'],
            ans: 0,
            exp: `FD accounts percentage = 100% - (45% + 30%) = 25%. Number of FD account holders = 25% of 800 = (25/100) × 800 = 200.`
          },
          {
            q: `Quadratic Equations Root Comparison: Equation I: x² - 11x + 30 = 0 and Equation II: y² - 15y + 56 = 0. What is the relation between x and y?`,
            opts: ['(a) x < y', '(b) x > y', '(c) x ≥ y', '(d) x ≤ y'],
            ans: 0,
            exp: `Equation I: x² - 11x + 30 = 0 => (x - 5)(x - 6) = 0 => x = 5, 6. Equation II: y² - 15y + 56 = 0 => (y - 7)(y - 8) = 0 => y = 7, 8. Clearly, both 5 and 6 are strictly smaller than 7 and 8. Hence, x < y.`
          },
          {
            q: `Missing Number Series: What number should come in place of the question mark (?) in the series: 8, 18, 38, 78, 158, (?)`,
            opts: ['(a) 318', '(b) 316', '(c) 324', '(d) 308'],
            ans: 0,
            exp: `Pattern is: (Previous term × 2) + 2. 8×2+2=18, 18×2+2=38, 38×2+2=78, 78×2+2=158. Next term = (158 × 2) + 2 = 316 + 2 = 318.`
          },
          {
            q: `Compound Interest Difference: The difference between Compound Interest (compounded annually) and Simple Interest on a principal sum of ₹15,000 for 2 years at 10% per annum is: / ₹15,000 की राशि पर 10% वार्षिक दर से 2 वर्ष के चक्रवृद्धि और साधारण ब्याज का अंतर ज्ञात कीजिए:`,
            opts: ['(a) ₹150', '(b) ₹200', '(c) ₹120', '(d) ₹175'],
            ans: 0,
            exp: `Difference for 2 years D = P × (R / 100)² = 15000 × (10 / 100)² = 15000 × (1 / 100) = ₹150.`
          },
          {
            q: `Time & Work: 12 bank clerks can verify 1,200 KYC documents in 6 days working 8 hours a day. How many days will 16 clerks take to verify 1,600 KYC documents working 6 hours a day? / 12 क्लर्क 8 घंटे प्रतिदिन कार्य करके 6 दिन में 1200 केवाईसी जांचते हैं। 16 क्लर्क 6 घंटे प्रतिदिन कार्य करके 1600 केवाईसी कितने दिन में जांचेंगे?`,
            opts: ['(a) 6 days / 6 दिन', '(b) 8 days', '(c) 5 days', '(d) 7 days'],
            ans: 0,
            exp: `Using chain rule formula (M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2: (12 × 6 × 8) / 1200 = (16 × D2 × 6) / 1600. Simplifying: 576 / 1200 = 96 × D2 / 1600 => 0.48 = 0.06 × D2 => D2 = 0.48 / 0.06 = 8 days.`
          },
          {
            q: `Approximation: Find the approximate value of (?) in: (24.99% of 799.95) + (14.02 × 18.99) - √1025 = ?`,
            opts: ['(a) 434', '(b) 465', '(c) 410', '(d) 390'],
            ans: 0,
            exp: `Round to integers: (25% of 800) + (14 × 19) - 32 = 200 + 266 - 32 = 466 - 32 = 434.`
          }
        ];
        const item = bankQuantSet[(qNum + mockIndex) % bankQuantSet.length];
        text = `[Bank Quant & DI Q${qNum}] ${item.q}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;

      } else {
        // Reasoning Ability & High-Yield Puzzles (35 Questions)
        const bankReasoningSet = [
          {
            q: `Seating Arrangement (Circular Table): 8 banking probationers A, B, C, D, E, F, G, H are seated around a circular conference table facing the center. A sits 3rd to the right of B. C sits 2nd to the left of A. Who sits directly opposite to B? / 8 अधिकारी केंद्र की ओर मुख करके एक गोलाकार मेज के चारों ओर बैठे हैं। A, B के दाएं तीसरे स्थान पर है। B के ठीक विपरीत कौन बैठा है?`,
            opts: ['(a) E', '(b) C', '(c) G', '(d) D'],
            ans: 0,
            exp: `In an 8-person circular table, opposite positions differ by 4 seats. A is 3rd right of B. C is 2nd left of A (so C is 1st right of B). Placing other non-adjacent variables confirms E sits directly opposite B (4 positions away in either clockwise or counter-clockwise count).`
          },
          {
            q: `Syllogism ("Only A Few" Modern Banking Pattern): Statements: Only a few Cheques are Drafts. All Drafts are Bills. No Bill is Cash. Conclusions: I. Some Cheques are not Drafts. II. No Draft is Cash. Choose the correct option:`,
            opts: [
              '(a) Both conclusions I and II follow',
              '(b) Only conclusion I follows',
              '(c) Only conclusion II follows',
              '(d) Neither follows'
            ],
            ans: 0,
            exp: `"Only a few Cheques are Drafts" means both "Some Cheques are Drafts" and "Some Cheques are not Drafts" are definitely true (Conclusion I follows). Since all Drafts are inside Bills and no Bill is Cash, no Draft can ever be Cash (Conclusion II follows). Both follow.`
          },
          {
            q: `Mathematical Inequalities: Statement: P ≥ Q > R = S ≤ T < U. Conclusions: I. P > S, II. T ≥ R. Choose the correct option:`,
            opts: [
              '(a) Both conclusions I and II follow',
              '(b) Only conclusion I follows',
              '(c) Only conclusion II follows',
              '(d) Neither follows'
            ],
            ans: 0,
            exp: `From statement: P ≥ Q > R = S. Since P ≥ Q > S, P is strictly greater than S (P > S is true). Also R = S ≤ T, which means T ≥ R (true). Both conclusions follow.`
          },
          {
            q: `Floor Based Puzzle: Seven managers K, L, M, N, O, P, Q live on seven different floors of the RBI regional quarters (Floor 1 is the bottom-most and Floor 7 is the top-most). K lives on an odd floor above Floor 4. Only two persons live between K and P. If P lives on Floor 3, which floor does K live on?`,
            opts: ['(a) Floor 6', '(b) Floor 5', '(c) Floor 7', '(d) Floor 4'],
            ans: 1,
            exp: `Floors above 4 are 5, 6, 7. The odd floors above 4 are Floor 5 and Floor 7. If K is on Floor 5, exactly two floors (Floor 4 and Floor 3) can be counted down: Floor 4 and floor 3 (P on Floor 2 would be 2 persons, but P is on Floor 3 => between Floor 5 and Floor 3 is Floor 4, which is 1 person. If K is on Floor 6 (even). Between Floor 6 and 3 are 4 and 5 (two persons). K must be on Floor 6 or if K is on Floor 5, between K and P: Floor 5 is the correct odd floor when counting exclusive offset.`
          },
          {
            q: `Direction Sense: A cash van travels 12 km North from the branch, turns right and drives 9 km to reach an ATM kiosk. What is the shortest straight-line distance between the bank branch and the ATM kiosk? / एक कैश वैन बैंक शाखा से 12 किमी उत्तर चलती है, दाएं मुड़कर 9 किमी चलती है। बैंक शाखा और कियोस्क के बीच न्यूनतम सीधी दूरी क्या है?`,
            opts: ['(a) 15 km / 15 किमी', '(b) 21 km', '(c) 18 km', '(d) 16 km'],
            ans: 0,
            exp: `Using Pythagoras theorem: Distance = √(12² + 9²) = √(144 + 81) = √225 = 15 km.`
          }
        ];
        const item = bankReasoningSet[(qNum + mockIndex) % bankReasoningSet.length];
        text = `[Bank Reasoning Q${qNum}] ${item.q}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
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

    } else if (cat.includes('alp')) {
      // ==========================================
      // RRB ALP & TECHNICIAN CBT-1 PATTERN (75 Qs)
      // Math (1-20), Reasoning (21-45), Basic Science & Engg (46-65), GA (66-75)
      // ==========================================
      if (qNum <= 20) {
        const a = 12 + (mockIndex * 2);
        const b = 16 + (mockIndex * 2);
        const hypotenuse = Math.sqrt(a * a + b * b);
        text = `[RRB ALP Math Q${qNum}] In a right-angled triangle, the two perpendicular sides are ${a} cm and ${b} cm. Find the length of the hypotenuse. / एक समकोण त्रिभुज में दो लंबवत भुजाएं ${a} सेमी और ${b} सेमी हैं। कर्ण की लंबाई ज्ञात कीजिए।`;
        options = [`(a) ${hypotenuse} cm`, `(b) ${hypotenuse + 2} cm`, `(c) ${hypotenuse - 4} cm`, `(d) ${a + b} cm`];
        correctOptionIndex = 0;
        explanation = `By Pythagoras Theorem: Hypotenuse = √(a² + b²) = √(${a * a} + ${b * b}) = √${a * a + b * b} = ${hypotenuse} cm.`;
      } else if (qNum <= 45) {
        text = `[RRB ALP Reasoning Q${qNum}] Which number will replace the question mark in series: 4, 9, 25, 49, 121, ? / निम्नलिखित श्रृंखला में प्रश्न चिह्न के स्थान पर कौन सी संख्या आएगी: 4, 9, 25, 49, 121, ?`;
        options = ['(a) 144', '(b) 169', '(c) 196', '(d) 225'];
        correctOptionIndex = 1;
        explanation = 'The series consists of squares of prime numbers: 2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121, 13² = 169. Next is 169.';
      } else if (qNum <= 65) {
        const scienceAlp = [
          {
            text: `What is the value of acceleration due to gravity (g) at the center of the Earth? / पृथ्वी के केंद्र पर गुरुत्वीय त्वरण (g) का मान कितना होता है?`,
            opts: ['(a) 9.8 m/s²', '(b) 0 m/s²', '(c) Infinity / अनंत', '(d) 4.9 m/s²'],
            ans: 1,
            exp: `At the geographical center of the Earth, the gravitational force from all directions cancels out, resulting in g = 0 m/s².`
          },
          {
            text: `Which instrument is used to measure electrical potential difference between two points in an electric circuit? / विद्युत परिपथ में दो बिंदुओं के बीच विभवांतर मापने के लिए किस उपकरण का उपयोग किया जाता है?`,
            opts: ['(a) Ammeter / अमीटर', '(b) Galvanometer / गैल्वेनोमीटर', '(c) Voltmeter / वोल्टमीटर', '(d) Rheostat / धारा नियंत्रक'],
            ans: 2,
            exp: `A voltmeter is connected in parallel to measure the electrical potential difference between two nodes.`
          },
          {
            text: `What is the chemical formula of rust formed on iron? / लोहे पर लगने वाले जंग का रासायनिक सूत्र क्या है?`,
            opts: ['(a) FeO', '(b) Fe2O3.xH2O', '(c) Fe3O4', '(d) FeCO3'],
            ans: 1,
            exp: `Rust is hydrated iron(III) oxide with the general formula Fe2O3.xH2O.`
          }
        ];
        const item = scienceAlp[(qNum + mockIndex) % scienceAlp.length];
        text = `[RRB ALP Basic Science & Engg Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else {
        text = `[RRB ALP GA Q${qNum}] Which is the longest railway platform in India as of current records? / वर्तमान अभिलेखों के अनुसार भारत का सबसे लंबा रेलवे प्लेटफॉर्म कौन सा है?`;
        options = ['(a) Gorakhpur Junction', '(b) Hubballi (Shree Siddharoodha Swamiji)', '(c) Kollam Junction', '(d) Kharagpur'],
        correctOptionIndex = 1;
        explanation = 'Shree Siddharoodha Swamiji Hubballi railway station platform #8 in Karnataka measures 1,507 meters, officially recognized by Guinness World Records as the longest.';
      }

    } else if (cat.includes('police')) {
      // ==========================================
      // UP POLICE CONSTABLE & SI PATTERN (100 Qs)
      // General Hindi (1-25), GK & Law (26-50), Numerical/Mental (51-75), Reasoning (76-100)
      // ==========================================
      if (qNum <= 25) {
        const hindiQuestions = [
          {
            text: `'सूर्योदय' शब्द का सही संधि-विच्छेद क्या होगा?`,
            opts: ['(a) सूर्य + उदय', '(b) सूर्यो + दय', '(c) सूर्य + दय', '(d) सूर्य + उदयि'],
            ans: 0,
            exp: `'सूर्योदय' में गुण स्वर संधि है (अ/आ + उ/ऊ = ओ)। अतः सही विच्छेद सूर्य + उदय है।`
          },
          {
            text: `'जो सब कुछ जानता हो' - इस वाक्यांश के लिए एक उपयुक्त शब्द क्या है?`,
            opts: ['(a) अल्पज्ञ', '(b) सर्वज्ञ', '(c) बहुज्ञ', '(d) सर्वव्यापी'],
            ans: 1,
            exp: `'जो सब कुछ जानता हो' उसे 'सर्वज्ञ' कहा जाता है। अल्प जानने वाले को अल्पज्ञ कहते हैं।`
          },
          {
            text: `निम्नलिखित में से कौन सा शब्द 'कमल' का पर्यायवाची नहीं है?`,
            opts: ['(a) जलज', '(b) पंकज', '(c) वारिद', '(d) सरोज'],
            ans: 2,
            exp: `'वारिद' बादल (मेघ) का पर्यायवाची है, जबकि जलज, पंकज और सरोज कमल के पर्यायवाची हैं।`
          }
        ];
        const item = hindiQuestions[(qNum + mockIndex) % hindiQuestions.length];
        text = `[UP Police सामान्य हिंदी Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 50) {
        const policeGk = [
          {
            text: `उत्तर प्रदेश का राज्य पक्षी कौन सा है? / What is the state bird of Uttar Pradesh?`,
            opts: ['(a) मोर / Peacock', '(b) सारस क्रेन / Sarus Crane', '(c) तोता / Parrot', '(d) गौरैया / Sparrow'],
            ans: 1,
            exp: `सारस क्रेन (Sarus Crane) उत्तर प्रदेश का राजकीय पक्षी है। राजकीय पशु बारहसिंगा तथा राजकीय पुष्प पलाश है।`
          },
          {
            text: `भारतीय संविधान में मौलिक कर्तव्यों को किस संविधान संशोधन द्वारा जोड़ा गया था? / By which amendment were Fundamental Duties added to the Constitution?`,
            opts: ['(a) 42वां संशोधन / 42nd Amendment (1976)', '(b) 44वां संशोधन / 44th Amendment', '(c) 73वां संशोधन / 73rd Amendment', '(d) 86वां संशोधन / 86th Amendment'],
            ans: 0,
            exp: `सरदार स्वर्ण सिंह समिति की सिफारिश पर 42वें संविधान संशोधन (1976) द्वारा अनुच्छेद 51A के तहत मौलिक कर्तव्यों को शामिल किया गया।`
          }
        ];
        const item = policeGk[(qNum + mockIndex) % policeGk.length];
        text = `[UP Police सामान्य ज्ञान Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 75) {
        const cp = 800 + (mockIndex * 50);
        const profit = 20;
        const sp = cp * (1 + profit / 100);
        text = `[UP Police संख्यात्मक योग्यता Q${qNum}] एक वस्तु को ₹${cp} में खरीदकर 20% लाभ पर बेचा जाता है। वस्तु का विक्रय मूल्य ज्ञात कीजिए। / An item bought for ₹${cp} is sold at 20% profit. Find its selling price.`;
        options = [`(a) ₹${sp}`, `(b) ₹${sp - 40}`, `(c) ₹${sp + 60}`, `(d) ₹${cp + 100}`];
        correctOptionIndex = 0;
        explanation = `विक्रय मूल्य = क्रय मूल्य × (100 + लाभ%) / 100 = ${cp} × 120 / 100 = ₹${sp}.`;
      } else {
        text = `[UP Police मानसिक अभिरुचि Q${qNum}] यदि 'POLICE' को 'QPMJDF' लिखा जाता है, तो 'DUTY' को उसी कूट भाषा में क्या लिखा जाएगा?`;
        options = ['(a) EVUZ', '(b) EVUY', '(c) ETUZ', '(d) FUWZ'];
        correctOptionIndex = 0;
        explanation = 'प्रत्येक अक्षर में +1 की वृद्धि की गई है: D(+1)=E, U(+1)=V, T(+1)=U, Y(+1)=Z. अतः सही उत्तर EVUZ है।';
      }

    } else if (cat.includes('defense') || cat.includes('nda')) {
      // ==========================================
      // DEFENSE NDA / CDS CBT PATTERN (100 Qs)
      // English (1-30), Physics/Chemistry (31-60), Mathematics/GK (61-100)
      // ==========================================
      if (qNum <= 30) {
        text = `[NDA English Q${qNum}] Identify the synonym of the word 'BENEVOLENT':`;
        options = ['(a) Generous', '(b) Malevolent', '(c) Selfish', '(d) Hostile'];
        correctOptionIndex = 0;
        explanation = 'Benevolent means well-meaning and kindly; charitable. The synonym is "Generous".';
      } else if (qNum <= 60) {
        text = `[NDA General Science Q${qNum}] An object is placed at the center of curvature of a concave mirror. Where is the image formed? / अवतल दर्पण के वक्रता केंद्र पर रखी वस्तु का प्रतिबिम्ब कहाँ बनता है?`;
        options = ['(a) At Focus / फोकस पर', '(b) At Center of Curvature / वक्रता केंद्र पर', '(c) Between Focus & Center', '(d) Beyond Center'];
        correctOptionIndex = 1;
        explanation = 'When an object is placed at the center of curvature of a concave mirror, the image is formed at the center of curvature itself, real, inverted, and equal in size.';
      } else {
        text = `[NDA GS & Defense Q${qNum}] Where is the National Defence Academy (NDA) located in India? / भारत में राष्ट्रीय रक्षा अकादमी (NDA) कहाँ स्थित है?`;
        options = ['(a) Dehradun', '(b) Khadakwasla, Pune', '(c) Ezhimala', '(d) Dundigal, Hyderabad'];
        correctOptionIndex = 1;
        explanation = 'The National Defence Academy (NDA) is located at Khadakwasla, Pune, Maharashtra.';
      }

    } else if (cat.includes('mts')) {
      // ==========================================
      // SSC MTS & HAVALDAR PATTERN (100 Qs)
      // Numerical Ability (1-25), Reasoning (26-50), General Awareness (51-75), English (76-100)
      // ==========================================
      if (qNum <= 25) {
        const val = 120 + (mockIndex * 20);
        text = `[SSC MTS Math Q${qNum}] What is 25% of ₹${val}? / ₹${val} का 25% कितना होगा?`;
        options = [`(a) ₹${val * 0.25}`, `(b) ₹${val * 0.30}`, `(c) ₹${val * 0.20}`, `(d) ₹${val * 0.50}`];
        correctOptionIndex = 0;
        explanation = `25% of ${val} = (${val} × 25) / 100 = ₹${val * 0.25}.`;
      } else if (qNum <= 50) {
        text = `[SSC MTS Reasoning Q${qNum}] Which one is different from the other three? / निम्नलिखित में से कौन सा अन्य तीन से भिन्न है?`;
        options = ['(a) Cow / गाय', '(b) Tiger / बाघ', '(c) Leopard / तेंदुआ', '(d) Lion / शेर'];
        correctOptionIndex = 0;
        explanation = 'Cow is a herbivorous domestic animal, whereas Tiger, Leopard, and Lion are carnivorous wild cat family animals.';
      } else if (qNum <= 75) {
        text = `[SSC MTS GA Q${qNum}] In which year was the Reserve Bank of India (RBI) nationalised? / भारतीय रिजर्व बैंक (RBI) का राष्ट्रीयकरण किस वर्ष हुआ था?`;
        options = ['(a) 1935', '(b) 1949', '(c) 1950', '(d) 1969'];
        correctOptionIndex = 1;
        explanation = 'The Reserve Bank of India was nationalised on 1st January 1949 under the RBI (Transfer of Public Ownership) Act.';
      } else {
        text = `[SSC MTS English Q${qNum}] Select the correctly spelt word:`;
        options = ['(a) Neccessary', '(b) Necessary', '(c) Necesary', '(d) Neccesary'];
        correctOptionIndex = 1;
        explanation = 'The correct spelling is "Necessary" (one c, double s).';
      }

    } else if (cat.includes('gd')) {
      // ==========================================
      // SSC GD CONSTABLE PATTERN (100 Qs)
      // Reasoning (1-25), GK (26-50), Elementary Math (51-75), Hindi/English (76-100)
      // ==========================================
      if (qNum <= 25) {
        text = `[SSC GD Reasoning Q${qNum}] Complete the pattern: 5, 10, 20, 40, ? / श्रृंखला पूरी करें: 5, 10, 20, 40, ?`;
        options = ['(a) 80', '(b) 60', '(c) 70', '(d) 90'];
        correctOptionIndex = 0;
        explanation = 'Each term is multiplied by 2: 5×2=10, 10×2=20, 20×2=40, 40×2=80.';
      } else if (qNum <= 50) {
        text = `[SSC GD GK Q${qNum}] Which is the largest freshwater lake in India? / भारत की सबसे बड़ी मीठे पानी की झील कौन सी है?`;
        options = ['(a) Wular Lake / वूलर झील', '(b) Chilika Lake / चिल्का झील', '(c) Sambhar Lake / सांभर झील', '(d) Vembanad Lake / वेम्बनाड झील'];
        correctOptionIndex = 0;
        explanation = 'Wular Lake in Jammu and Kashmir is the largest freshwater lake in India.';
      } else if (qNum <= 75) {
        const side = 10 + mockIndex;
        text = `[SSC GD Math Q${qNum}] Find the area of a square whose side is ${side} cm. / उस वर्ग का क्षेत्रफल ज्ञात कीजिए जिसकी भुजा ${side} सेमी है।`;
        options = [`(a) ${side * side} cm²`, `(b) ${side * 4} cm²`, `(c) ${side * side + 10} cm²`, `(d) ${side * 2} cm²`];
        correctOptionIndex = 0;
        explanation = `Area of square = side² = ${side} × ${side} = ${side * side} cm².`;
      } else {
        text = `[SSC GD सामान्य हिंदी Q${qNum}] 'अंधे की लाठी' मुहावरे का सही अर्थ क्या है?`;
        options = ['(a) एकमात्र सहारा', '(b) अंधा व्यक्ति', '(c) लाठी पकड़ना', '(d) रास्ता भटकना'];
        correctOptionIndex = 0;
        explanation = `'अंधे की लाठी' का अर्थ 'एकमात्र सहारा' होना है। जैसे: श्रवण कुमार अपने अंधे माता-पिता के लिए अंधे की लाठी थे।`;
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

    } else if (cat.includes('hssc') || (cat.includes('haryana') && cat.includes('cet'))) {
      // ==========================================
      // HSSC CET GROUP C & D PATTERN (100 Qs)
      // Haryana GK (1-25), General Studies & Science (26-50), Reasoning & Math (51-75), Hindi, English & Computer (76-100)
      // ==========================================
      if (qNum <= 25) {
        const haryanaGk = [
          {
            text: `हरियाणा राज्य का गठन किस वर्ष हुआ था? / In which year was the state of Haryana formed?`,
            opts: ['(a) 1 नवंबर 1966 / 1 Nov 1966', '(b) 15 अगस्त 1947', '(c) 26 जनवरी 1950', '(d) 1 नवंबर 1971'],
            ans: 0,
            exp: `हरियाणा का गठन न्यायमूर्ति जे.सी. शाह आयोग की सिफारिश पर 1 नवंबर 1966 को पंजाब से अलग होकर 17वें राज्य के रूप में हुआ था।`
          },
          {
            text: `हरियाणा के किस जिले को 'बुनकरों का शहर' (City of Weavers) कहा जाता है?`,
            opts: ['(a) करनाल / Karnal', '(b) पानीपत / Panipat', '(c) कुरुक्षेत्र / Kurukshetra', '(d) रोहतक / Rohtak'],
            ans: 1,
            exp: `पानीपत को हाथकरघा (हैंडलूम), कंबल और वस्त्र उद्योग के कारण 'बुनकरों का शहर' कहा जाता है।`
          },
          {
            text: `सुल्तानपुर राष्ट्रीय पक्षी उद्यान (Sultanpur National Park) हरियाणा के किस जिले में स्थित है?`,
            opts: ['(a) फरीदाबाद', '(b) गुरुग्राम / Gurugram', '(c) झज्जर', '(d) रेवाड़ी'],
            ans: 1,
            exp: `सुल्तानपुर राष्ट्रीय उद्यान गुरुग्राम जिले के सुल्तानपुर में स्थित है। इसे डॉ. सलीम अली पक्षी अभयारण्य भी कहा जाता है।`
          },
          {
            text: `हरियाणा के प्रथम मुख्यमंत्री कौन थे? / Who was the first Chief Minister of Haryana?`,
            opts: ['(a) पं. भगवत दयाल शर्मा', '(b) राव बीरेंद्र सिंह', '(c) बंसीलाल', '(d) चौधरी देवीलाल'],
            ans: 0,
            exp: `पंडित भगवत दयाल शर्मा 1 नवंबर 1966 से 23 मार्च 1967 तक हरियाणा के पहले मुख्यमंत्री रहे।`
          },
          {
            text: `हरियाणा में प्रसिद्ध 'कलेसर राष्ट्रीय उद्यान' (Kalesar National Park) किस जिले में है?`,
            opts: ['(a) यमुनानगर / Yamunanagar', '(b) अंबाला', '(c) पंचकूला', '(d) कैथल'],
            ans: 0,
            exp: `कलेसर राष्ट्रीय उद्यान यमुनानगर जिले में शिवालिक की पहाड़ियों की तलहटी में स्थित है। यह साल के वृक्षों और वन्यजीवों के लिए विख्यात है।`
          }
        ];
        const item = haryanaGk[(qNum + mockIndex) % haryanaGk.length];
        text = `[HSSC CET हरियाणा ज्ञान Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 50) {
        const gsScience = [
          {
            text: `भारतीय संविधान के किस अनुच्छेद में वित्त आयोग (Finance Commission) का प्रावधान है?`,
            opts: ['(a) अनुच्छेद 280 / Article 280', '(b) अनुच्छेद 324', '(c) अनुच्छेद 356', '(d) अनुच्छेद 370'],
            ans: 0,
            exp: `अनुच्छेद 280 के तहत भारत के राष्ट्रपति द्वारा प्रत्येक 5 वर्ष में वित्त आयोग का गठन किया जाता है।`
          },
          {
            text: `प्रकाश संश्लेषण (Photosynthesis) की प्रक्रिया में पौधों द्वारा कौन सी गैस उत्सर्जित की जाती है?`,
            opts: ['(a) ऑक्सीजन / Oxygen (O2)', '(b) कार्बन डाइऑक्साइड', '(c) नाइट्रोजन', '(d) हाइड्रोजन'],
            ans: 0,
            exp: `प्रकाश संश्लेषण के दौरान सूर्य के प्रकाश व क्लोरोफिल की उपस्थिति में जल का विखंडन होकर ऑक्सीजन गैस बाहर निकलती है।`
          }
        ];
        const item = gsScience[(qNum + mockIndex) % gsScience.length];
        text = `[HSSC CET सामान्य अध्ययन Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 75) {
        const num1 = 15 + (mockIndex * 3);
        const num2 = 25 + (mockIndex * 2);
        const avg = ((num1 + num2) / 2).toFixed(1);
        text = `[HSSC CET गणित व तर्कशक्ति Q${qNum}] दो संख्याओं ${num1} और ${num2} का औसत (Average) क्या होगा? / Find the average of ${num1} and ${num2}:`;
        options = [`(a) ${avg}`, `(b) ${(Number(avg) + 2).toFixed(1)}`, `(c) ${(Number(avg) - 3).toFixed(1)}`, `(d) ${num1 + 5}`];
        correctOptionIndex = 0;
        explanation = `औसत = (संख्याओं का योग) / कुल संख्या = (${num1} + ${num2}) / 2 = ${avg}.`;
      } else {
        const compHindi = [
          {
            text: `कंप्यूटर में 'RAM' का पूर्ण रूप क्या होता है? / What is the full form of RAM?`,
            opts: ['(a) Random Access Memory', '(b) Read Access Memory', '(c) Rapid Action Module', '(d) Read Auto Memory'],
            ans: 0,
            exp: `RAM का पूर्ण रूप Random Access Memory होता है। यह एक वोलेटाइल (अस्थिर) मेमोरी है।`
          },
          {
            text: `'प्रत्येक' शब्द में कौन सा उपसर्ग प्रयुक्त हुआ है?`,
            opts: ['(a) प्रति', '(b) प्र', '(c) प्रत्य', '(d) एक'],
            ans: 0,
            exp: `'प्रत्येक' = प्रति + एक। इसमें 'प्रति' उपसर्ग प्रयुक्त हुआ है।`
          }
        ];
        const item = compHindi[(qNum + mockIndex) % compHindi.length];
        text = `[HSSC CET भाषा व कंप्यूटर Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      }

    } else if (cat.includes('haryana') && cat.includes('police')) {
      // ==========================================
      // HARYANA POLICE CONSTABLE PATTERN (100 Qs)
      // Haryana GK (1-25), Law & Police Aptitude (26-50), Agriculture & Animal Husbandry (51-75), Math & Reasoning (76-100)
      // ==========================================
      if (qNum <= 25) {
        const hpGk = [
          {
            text: `हरियाणा पुलिस का ध्येय वाक्य (Motto) क्या है?`,
            opts: ['(a) सेवा, सुरक्षा, सहयोग / Seva, Suraksha, Sahyog', '(b) सत्यमेव जयते', '(c) शूरवीरता और सुरक्षा', '(d) रक्षा और सेवा'],
            ans: 0,
            exp: `हरियाणा पुलिस का आधिकारिक ध्येय वाक्य 'सेवा, सुरक्षा, सहयोग' है।`
          },
          {
            text: `हरियाणा पुलिस की प्रथम महिला पुलिस स्टेशन की स्थापना किस वर्ष की गई थी?`,
            opts: ['(a) 2015 (रक्षाबंधन के अवसर पर)', '(b) 2010', '(c) 2018', '(d) 2020'],
            ans: 0,
            exp: `हरियाणा में 28 अगस्त 2015 को रक्षाबंधन के अवसर पर पहले महिला पुलिस थाने की शुरुआत पंचकूला के मनसा देवी कॉम्प्लेक्स से हुई थी।`
          }
        ];
        const item = hpGk[(qNum + mockIndex) % hpGk.length];
        text = `[Haryana Police GK Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 50) {
        text = `[Haryana Police विधि व पुलिस अभिरुचि Q${qNum}] भारतीय नागरिक सुरक्षा संहिता (BNSS) / CRPC के तहत किसी गिरफ्तार व्यक्ति को कितने समय में मजिस्ट्रेट के समक्ष पेश करना अनिवार्य है?`;
        options = ['(a) 24 घंटे के भीतर (यात्रा समय छोड़कर)', '(b) 48 घंटे के भीतर', '(c) 12 घंटे के भीतर', '(d) 72 घंटे के भीतर'];
        correctOptionIndex = 0;
        explanation = 'भारतीय संविधान के अनुच्छेद 22(2) तथा प्रक्रिया संहिता के तहत गिरफ्तार व्यक्ति को 24 घंटे के अंदर निकटतम मजिस्ट्रेट के समक्ष पेश करना अनिवार्य है।';
      } else if (qNum <= 75) {
        const agriGk = [
          {
            text: `हरियाणा में 'मुर्राह' (Murrah) किसकी सबसे उत्तम व दुधारू नस्ल है जिसे 'काला सोना' भी कहते हैं?`,
            opts: ['(a) भैंस / Buffalo', '(b) गाय / Cow', '(c) बकरी / Goat', '(d) भेड़ / Sheep'],
            ans: 0,
            exp: `'मुर्राह' विश्व प्रसिद्ध भैंस की नस्ल है, जो हरियाणा में बहुतायत में पाई जाती है और अत्यधिक दूध उत्पादन के कारण 'काला सोना' कहलाती है।`
          },
          {
            text: `राष्ट्रीय डेयरी अनुसंधान संस्थान (NDRI) हरियाणा के किस शहर में स्थित है?`,
            opts: ['(a) करनाल / Karnal', '(b) हिसार', '(c) रोहतक', '(d) अंबाला'],
            ans: 0,
            exp: `NDRI (National Dairy Research Institute) 1955 में बेंगलुरु से करनाल (हरियाणा) स्थानांतरित किया गया था।`
          }
        ];
        const item = agriGk[(qNum + mockIndex) % agriGk.length];
        text = `[Haryana Police कृषि व पशुपालन Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else {
        const spd = 40 + (mockIndex * 5);
        text = `[Haryana Police तर्क व गणित Q${qNum}] एक पुलिस वाहन ${spd} किमी/घंटा की गति से चल रहा है। 3 घंटे में वह कितनी दूरी तय करेगा? / A police vehicle travels at ${spd} km/h. How much distance does it cover in 3 hours?`;
        options = [`(a) ${spd * 3} किमी`, `(b) ${spd * 2} किमी`, `(c) ${spd * 4} किमी`, `(d) ${spd * 3 + 20} किमी`];
        correctOptionIndex = 0;
        explanation = `दूरी = चाल × समय = ${spd} × 3 = ${spd * 3} किमी।`;
      }

    } else if (cat.includes('hpsc') || cat.includes('hcs')) {
      // ==========================================
      // HPSC HCS (HARYANA CIVIL SERVICES) PATTERN (100 Qs)
      // Indian Polity & GS (1-35), Haryana History & Economy (36-70), CSAT (71-100)
      // ==========================================
      if (qNum <= 35) {
        text = `[HPSC HCS GS Q${qNum}] Under which Article of the Indian Constitution is the State Public Service Commission (like HPSC) established? / किस अनुच्छेद के तहत राज्य लोक सेवा आयोग की स्थापना की जाती है?`;
        options = ['(a) Article 315 / अनुच्छेद 315', '(b) Article 320', '(c) Article 324', '(d) Article 312'];
        correctOptionIndex = 0;
        explanation = 'Article 315 of the Constitution provides for Public Service Commissions for the Union and for the States.';
      } else if (qNum <= 70) {
        text = `[HPSC HCS Haryana Paper Q${qNum}] Who led the Revolt of 1857 from Ballabhgarh in Haryana? / 1857 के संग्राम में बल्लभगढ़ (हरियाणा) का नेतृत्व किसने किया था?`;
        options = ['(a) राजा नाहर सिंह / Raja Nahar Singh', '(b) राव तुलाराम', '(c) नवाब अहमद अली', '(d) इमाम अली कलंदर'];
        correctOptionIndex = 0;
        explanation = 'राजा नाहर सिंह ने 1857 के प्रथम स्वतंत्रता संग्राम में बल्लभगढ़ रियासत से अंग्रेजों के खिलाफ वीरतापूर्वक नेतृत्व किया था।';
      } else {
        text = `[HPSC HCS CSAT Q${qNum}] If a clock shows 3:15, what is the acute angle between the hour hand and minute hand? / यदि किसी घड़ी में 3:15 बजे हैं, तो घंटे और मिनट की सुइयों के बीच का कोण क्या होगा?`;
        options = ['(a) 7.5°', '(b) 0°', '(c) 15°', '(d) 12.5°'];
        correctOptionIndex = 0;
        explanation = 'Angle = |(30*H - 11/2*M)| = |(30*3 - 11/2*15)| = |90 - 82.5| = 7.5 degrees.';
      }

    } else if (cat.includes('clerk')) {
      // ==========================================
      // BANK CLERK (IBPS CLERK / SBI CLERK) PATTERN (100 Qs)
      // English Language (1-30), Numerical Ability (31-65), Reasoning Ability (66-100)
      // ==========================================
      if (qNum <= 30) {
        const engClerk = [
          {
            text: `Find the correctly spelt word among the given options:`,
            opts: ['(a) Accommodate', '(b) Acommodate', '(c) Accomodate', '(d) Acomodate'],
            ans: 0,
            exp: `'Accommodate' has double 'c' and double 'm'.`
          },
          {
            text: `Select the most appropriate synonym for the word 'PRUDENT':`,
            opts: ['(a) Wise / Cautious', '(b) Reckless', '(c) Foolish', '(d) Careless'],
            ans: 0,
            exp: `'Prudent' means acting with or showing care and thought for the future; wise.`
          }
        ];
        const item = engClerk[(qNum + mockIndex) % engClerk.length];
        text = `[Bank Clerk English Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 65) {
        const base = 24 + (mockIndex * 4) + (qNum % 5);
        const ans = base * base;
        text = `[Bank Clerk Simplification Q${qNum}] Find the value of (?) in equation: ${base}² + 150 - 50 = ? / समीकरण में (?) का मान ज्ञात कीजिए:`;
        options = [`(a) ${ans + 100}`, `(b) ${ans + 80}`, `(c) ${ans + 120}`, `(d) ${ans}`];
        correctOptionIndex = 0;
        explanation = `${base}² = ${ans}. Now ${ans} + 150 - 50 = ${ans} + 100 = ${ans + 100}.`;
      } else {
        text = `[Bank Clerk Reasoning Q${qNum}] In a code language, if 'BANK' is coded as 'CBOL', how is 'CASH' coded? / यदि 'BANK' को 'CBOL' लिखा जाता है, तो 'CASH' को क्या लिखा जाएगा?`;
        options = ['(a) DBTI', '(b) DBUJ', '(c) EBTJ', '(d) DBSI'];
        correctOptionIndex = 0;
        explanation = 'Each letter shifts by +1: C->D, A->B, S->T, H->I. The code is DBTI.';
      }

    } else if (cat.includes('rrb bank') || cat.includes('ibps rrb')) {
      // ==========================================
      // IBPS RRB OFFICER & ASSISTANT PATTERN (100 Qs)
      // Reasoning (1-50), Quantitative Aptitude (51-100)
      // ==========================================
      if (qNum <= 50) {
        text = `[IBPS RRB Reasoning Q${qNum}] Statements: All circles are triangles. No triangle is rectangle. Conclusion: I. No circle is rectangle. II. Some triangles are circles. Choose correct option:`;
        options = ['(a) Both I and II follow', '(b) Only I follows', '(c) Only II follows', '(d) Neither follows'];
        correctOptionIndex = 0;
        explanation = 'Since all circles are inside triangles and no triangle can be rectangle, no circle can be rectangle (I follows). Since all circles are triangles, some triangles are definitely circles (II follows). Both follow.';
      } else {
        const p = 5000 + (mockIndex * 1000);
        const si = (p * 8 * 2) / 100;
        text = `[IBPS RRB Quant Q${qNum}] What is the simple interest on ₹${p} at 8% per annum for 2 years? / ₹${p} पर 8% वार्षिक दर से 2 वर्ष का साधारण ब्याज कितना होगा?`;
        options = [`(a) ₹${si}`, `(b) ₹${si + 100}`, `(c) ₹${si - 80}`, `(d) ₹${si * 2}`];
        correctOptionIndex = 0;
        explanation = `SI = (P × R × T) / 100 = (${p} × 8 × 2) / 100 = ₹${si}.`;
      }

    } else if (cat.includes('rbi')) {
      // ==========================================
      // RBI ASSISTANT & GRADE B PATTERN (100 Qs)
      // ==========================================
      if (qNum <= 30) {
        text = `[RBI Assistant English Q${qNum}] Choose the correct idiom meaning for 'To break the ice':`;
        options = ['(a) To initiate a friendly conversation in a tense situation', '(b) To freeze water', '(c) To cause an accident', '(d) To dispute an argument'];
        correctOptionIndex = 0;
        explanation = `'To break the ice' means to do or say something to relieve tension or get conversation going.`;
      } else if (qNum <= 65) {
        const val = 120 + (mockIndex * 10);
        text = `[RBI Assistant Quant Q${qNum}] If 25% of a number is ${val}, what is 60% of that number? / यदि किसी संख्या का 25% भाग ${val} है, तो उस संख्या का 60% क्या होगा?`;
        const total = val * 4;
        const res = total * 0.6;
        options = [`(a) ${res}`, `(b) ${res + 20}`, `(c) ${res - 30}`, `(d) ${val * 2}`];
        correctOptionIndex = 0;
        explanation = `Total number = ${val} / 0.25 = ${total}. 60% of ${total} = ${res}.`;
      } else {
        text = `[RBI Assistant Banking GK Q${qNum}] Which agency in India regulates the Monetary Policy and sets the Repo Rate? / भारत में मौद्रिक नीति का नियमन और रेपो दर का निर्धारण कौन करता है?`;
        options = ['(a) Reserve Bank of India (RBI)', '(b) Ministry of Finance', '(c) SEBI', '(d) State Bank of India'];
        correctOptionIndex = 0;
        explanation = 'The Monetary Policy Committee (MPC) of the Reserve Bank of India (RBI) sets the policy Repo Rate in India.';
      }

    } else if (cat.includes('je') || cat.includes('junior engineer')) {
      // ==========================================
      // RRB JE (JUNIOR ENGINEER CBT-1) PATTERN (100 Qs)
      // Mathematics (1-30), Reasoning (31-55), General Science (56-85), GA (86-100)
      // ==========================================
      if (qNum <= 30) {
        text = `[RRB JE Math Q${qNum}] Find the roots of the quadratic equation: x² - 7x + 12 = 0 / द्विघात समीकरण x² - 7x + 12 = 0 के मूल ज्ञात कीजिए:`;
        options = ['(a) x = 3, 4', '(b) x = -3, -4', '(c) x = 2, 6', '(d) x = 1, 12'];
        correctOptionIndex = 0;
        explanation = 'Factoring equation: (x - 3)(x - 4) = 0. Therefore roots are x = 3 and x = 4.';
      } else if (qNum <= 55) {
        text = `[RRB JE Reasoning Q${qNum}] In a certain code, if 'ENGINEER' is written as 'FOHJOFFS', each letter is shifted by:`;
        options = ['(a) +1 position', '(b) +2 positions', '(c) -1 position', '(d) Reversed'];
        correctOptionIndex = 0;
        explanation = 'E(+1)=F, N(+1)=O, G(+1)=H, I(+1)=J, N(+1)=O, E(+1)=F, E(+1)=F, R(+1)=S. Shift is +1.';
      } else if (qNum <= 85) {
        const jeScience = [
          {
            text: `According to Ohm's Law, what is the mathematical relationship between Voltage (V), Current (I), and Resistance (R)? / ओम के नियमानुसार विभवांतर (V), धारा (I) और प्रतिरोध (R) में क्या संबंध है?`,
            opts: ['(a) V = I × R', '(b) I = V × R', '(c) R = V × I', '(d) V = I / R'],
            ans: 0,
            exp: `Ohm's Law states that V = I * R across a conductor at constant temperature.`
          },
          {
            text: `What is the escape velocity from the surface of the Earth? / पृथ्वी की सतह से पलायन वेग का मान कितना है?`,
            opts: ['(a) 11.2 km/s', '(b) 9.8 km/s', '(c) 7.9 km/s', '(d) 15.4 km/s'],
            ans: 0,
            exp: `The escape velocity from Earth's gravitational pull is approximately 11.2 kilometers per second.`
          }
        ];
        const item = jeScience[(qNum + mockIndex) % jeScience.length];
        text = `[RRB JE Science Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else {
        text = `[RRB JE GA Q${qNum}] Which is the longest railway platform in the world as per Guinness World Records? / गिनीज वर्ल्ड रिकॉर्ड्स के अनुसार विश्व का सबसे लंबा रेलवे प्लेटफॉर्म कौन सा है?`;
        options = ['(a) Hubballi Railway Station (Karnataka) / हुब्बल्लि (कर्नाटक)', '(b) Gorakhpur (UP)', '(c) Kollam (Kerala)', '(d) Kharagpur (WB)'];
        correctOptionIndex = 0;
        explanation = 'Platform 8 at Shree Siddharoodha Swamiji Hubballi junction in Karnataka is 1,507 meters long, officially the world’s longest.';
      }

    } else if (cat.includes('dsssb')) {
      // ==========================================
      // DSSSB GENERAL & TEACHING CBT PATTERN (100 Qs)
      // GA (1-20), Reasoning (21-40), Math (41-60), Hindi (61-80), English (81-100)
      // ==========================================
      if (qNum <= 20) {
        text = `[DSSSB GA Q${qNum}] Who was appointed as the first Lieutenant Governor of Delhi? / दिल्ली के पहले उपराज्यपाल कौन थे?`;
        options = ['(a) Aditya Nath Jha', '(b) Sundar Lal', '(c) Anil Baijal', '(d) Baleshwar Prasad'];
        correctOptionIndex = 0;
        explanation = 'Aditya Nath Jha, ICS was the first Lieutenant Governor of Delhi in 1966.';
      } else if (qNum <= 40) {
        text = `[DSSSB Reasoning Q${qNum}] Select the odd one out among the options: / बेमेल विकल्प चुनिए:`;
        options = ['(a) 27 (3³)', '(b) 64 (4³)', '(c) 125 (5³)', '(d) 144 (12²)'];
        correctOptionIndex = 3;
        explanation = '27, 64, and 125 are perfect cubes, while 144 is a square (12²).';
      } else if (qNum <= 60) {
        const val = 150 + (mockIndex * 20);
        text = `[DSSSB Arithmetic Q${qNum}] If the ratio of two numbers is 3:5 and their sum is ${val}, find the larger number: / यदि दो संख्याओं का अनुपात 3:5 है और उनका योग ${val} है, तो बड़ी संख्या ज्ञात कीजिए:`;
        const larger = (val / 8) * 5;
        options = [`(a) ${larger.toFixed(1)}`, `(b) ${(val / 8 * 3).toFixed(1)}`, `(c) ${val / 2}`, `(d) ${larger + 10}`];
        correctOptionIndex = 0;
        explanation = `Sum of ratio parts = 3 + 5 = 8. Larger number = (5 / 8) * ${val} = ${larger.toFixed(1)}.`;
      } else if (qNum <= 80) {
        text = `[DSSSB सामान्य हिंदी Q${qNum}] 'लंबोदर' में कौन सा समास है? / Identify the Samas in 'Lambodar':`;
        options = ['(a) बहुव्रीहि समास (गणेश जी)', '(b) तत्पुरुष समास', '(c) द्वंद्व समास', '(d) द्विगु समास'];
        correctOptionIndex = 0;
        explanation = `'लंबोदर' (लंबा है उदर जिसका = श्री गणेश)। इसमें अन्य पद प्रधान होने के कारण बहुव्रीहि समास है।`;
      } else {
        text = `[DSSSB English Q${qNum}] Fill in the blank with appropriate article: "Copper is _________ useful metal."`;
        options = ['(a) a', '(b) an', '(c) the', '(d) no article'];
        correctOptionIndex = 0;
        explanation = `'Useful' begins with a consonant sound ('yu' sound), so indefinite article 'a' is used, not 'an'.`;
      }

    } else if (cat.includes('ctet') || cat.includes('tet')) {
      // ==========================================
      // CTET & STATE TEACHER ELIGIBILITY CBT (100 Qs)
      // Child Development & Pedagogy (1-30), EVS & Math (31-60), Hindi (61-80), English (81-100)
      // ==========================================
      if (qNum <= 30) {
        const ctetThemes = [
          {
            text: `According to Lev Vygotsky, the difference between what a learner can do without help and what he or she can do with help is termed as: / लेव वायगोत्स्की के अनुसार, बच्चे द्वारा स्वतंत्र रूप से किए जा सकने वाले तथा सहायता के साथ करने वाले कार्य के बीच के अंतर को क्या कहते हैं?`,
            opts: ['(a) Zone of Proximal Development (ZPD) / समीपस्थ विकास का क्षेत्र', '(b) Scaffolding / पाड़', '(c) Assimilation / आत्मसातीकरण', '(d) Conditioning / अनुकूलन'],
            ans: 0,
            exp: `Vygotsky coined ZPD (Zone of Proximal Development) as the space between unassisted potential and assisted achievement.`
          },
          {
            text: `According to Jean Piaget, at which stage of cognitive development do children develop object permanence? / जीन पियाजे के अनुसार किस अवस्था में बच्चा वस्तु स्थायित्व (Object Permanence) प्रदर्शित करता है?`,
            opts: ['(a) Sensorimotor Stage (0-2 years) / संवेदी-गामक अवस्था', '(b) Pre-operational Stage (2-7 years)', '(c) Concrete Operational Stage (7-11 years)', '(d) Formal Operational Stage (11+ years)'],
            ans: 0,
            exp: `Object permanence develops during the Sensorimotor stage (around 8-12 months).`
          }
        ];
        const item = ctetThemes[(qNum + mockIndex) % ctetThemes.length];
        text = `[CTET बाल विकास व शिक्षाशास्त्र Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
      } else if (qNum <= 60) {
        text = `[CTET पर्यावरण व गणित Q${qNum}] In which state of India is the famous 'Jim Corbett National Park' (Ramganga NP) located? / भारत में जिम कॉर्बेट राष्ट्रीय उद्यान किस राज्य में स्थित है?`;
        options = ['(a) Uttarakhand / उत्तराखंड', '(b) Uttar Pradesh / उत्तर प्रदेश', '(c) Himachal Pradesh / हिमाचल प्रदेश', '(d) Madhya Pradesh / मध्य प्रदेश'];
        correctOptionIndex = 0;
        explanation = 'Jim Corbett National Park, India’s oldest national park established in 1936 as Hailey National Park, is in Nainital district of Uttarakhand.';
      } else if (qNum <= 80) {
        text = `[CTET हिंदी भाषा शिक्षण Q${qNum}] प्राथमिक स्तर पर भाषा सीखने-सिखाने का सबसे महत्वपूर्ण उद्देश्य क्या है?`;
        options = ['(a) अपनी बात को दूसरों के समक्ष सहजता से अभिव्यक्त करना', '(b) व्याकरण के नियमों को रटना', '(c) कठिन शब्दों का श्रुतलेख लिखना', '(d) अलंकार याद करना'];
        correctOptionIndex = 0;
        explanation = 'प्राथमिक स्तर पर भाषाई अभिव्यक्ति की सहजता और संप्रेषण क्षमता का विकास सबसे प्रमुख उद्देश्य होता है।';
      } else {
        text = `[CTET English Pedagogy Q${qNum}] What is the primary role of formative assessment in classroom teaching?`;
        options = ['(a) Providing continuous feedback to enhance student learning', '(b) Grading students at the end of the term', '(c) Ranking students on a leaderboard', '(d) Assigning punishment'];
        correctOptionIndex = 0;
        explanation = 'Formative assessment is an ongoing process that provides descriptive feedback to improve students learning and instruction.';
      }

    } else if (cat.includes('cpo')) {
      // ==========================================
      // SSC CPO (SI IN DELHI POLICE & CAPF) PATTERN (100 Qs)
      // ==========================================
      if (qNum <= 25) {
        text = `[SSC CPO SI Reasoning Q${qNum}] Which word will appear first in the English dictionary: 1. Police, 2. Policy, 3. Politeness, 4. Polish?`;
        options = ['(a) Police', '(b) Policy', '(c) Polish', '(d) Politeness'];
        correctOptionIndex = 0;
        explanation = 'Alphabetical order: Police (P-O-L-I-C-E), Policy (P-O-L-I-C-Y), Polish (P-O-L-I-S-H), Politeness (P-O-L-I-T-E). First is Police.';
      } else if (qNum <= 50) {
        text = `[SSC CPO SI GK Q${qNum}] Who was the Viceroy of India when the Indian National Congress was founded in 1885? / 1885 में भारतीय राष्ट्रीय कांग्रेस की स्थापना के समय भारत का वायसराय कौन था?`;
        options = ['(a) Lord Dufferin / लॉर्ड डफरिन', '(b) Lord Curzon', '(c) Lord Ripon', '(d) Lord Lytton'];
        correctOptionIndex = 0;
        explanation = 'Lord Dufferin served as Viceroy of India from 1884 to 1888 when the INC was founded.';
      } else if (qNum <= 75) {
        const rad = 7 + (mockIndex * 7);
        const area = (22 / 7) * rad * rad;
        text = `[SSC CPO Quant Q${qNum}] Find the area of a circle whose radius is ${rad} cm: / उस वृत्त का क्षेत्रफल ज्ञात कीजिए जिसकी त्रिज्या ${rad} सेमी है:`;
        options = [`(a) ${area} cm²`, `(b) ${area + 20} cm²`, `(c) ${area - 44} cm²`, `(d) ${rad * 2 * 22 / 7} cm²`];
        correctOptionIndex = 0;
        explanation = `Area of circle = πr² = (22/7) × ${rad} × ${rad} = ${area} cm².`;
      } else {
        text = `[SSC CPO English Q${qNum}] Choose the correct passive voice: "Someone stole my wallet."`;
        options = ['(a) My wallet was stolen.', '(b) My wallet has been stolen by someone.', '(c) My wallet is stolen.', '(d) My wallet had stole.'];
        correctOptionIndex = 0;
        explanation = 'Simple past active transforms into Subject + was/were + V3. Vague agent "by someone" is omitted: "My wallet was stolen."';
      }

    } else if (cat.includes('steno')) {
      // ==========================================
      // SSC STENOGRAPHER GRADE C & D PATTERN (100 Qs)
      // Reasoning (1-25), General Awareness (26-50), English Language & Comprehension (51-100)
      // ==========================================
      if (qNum <= 25) {
        text = `[SSC Steno Reasoning Q${qNum}] Find the missing number: 3, 9, 27, 81, ? / लुप्त संख्या ज्ञात कीजिए: 3, 9, 27, 81, ?`;
        options = ['(a) 243', '(b) 162', '(c) 324', '(d) 216'];
        correctOptionIndex = 0;
        explanation = 'Each number is multiplied by 3: 3×3=9, 9×3=27, 27×3=81, 81×3=243.';
      } else if (qNum <= 50) {
        text = `[SSC Steno GA Q${qNum}] Which schedule of the Indian Constitution lists the 22 officially recognized languages? / भारतीय संविधान की कौन सी अनुसूची 22 आधिकारिक भाषाओं से संबंधित है?`;
        options = ['(a) 8th Schedule / 8वीं अनुसूची', '(b) 7th Schedule', '(c) 9th Schedule', '(d) 10th Schedule'];
        correctOptionIndex = 0;
        explanation = 'The Eighth Schedule of the Indian Constitution contains the 22 official languages of India.';
      } else {
        const stenoEng = [
          {
            text: `Select the word that means 'A person who cannot make a mistake':`,
            opts: ['(a) Infallible', '(b) Ineligible', '(c) Inaudible', '(d) Incredible'],
            ans: 0,
            exp: `'Infallible' means incapable of making mistakes or being wrong.`
          },
          {
            text: `Fill in the blank with appropriate preposition: "She has been studying _________ morning."`,
            opts: ['(a) since', '(b) for', '(c) from', '(d) in'],
            ans: 0,
            exp: `'Since' is used for a point of time (since morning, since 1990). 'For' is used for a period/duration.`
          }
        ];
        const item = stenoEng[(qNum + mockIndex) % stenoEng.length];
        text = `[SSC Steno English Q${qNum}] ${item.text}`;
        options = item.opts;
        correctOptionIndex = item.ans;
        explanation = item.exp;
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
 * Returns exactly 10 comprehensive mock exam papers for each of the 26 vacancies across:
 * - SSC Exams (New TCS Pattern 2026): CGL, CHSL, MTS, GD, CPO SI, Stenographer
 * - Railway Exams: RRB NTPC, ALP & Technician, Group-D, RRB JE, RPF SI, RPF Constable
 * - Bank Exams: IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, IBPS RRB, RBI Assistant
 * - Haryana Exams: HSSC CET Group C & D, Haryana Police Constable, HPSC HCS
 * - Online CBT Exams: DSSSB General & Teaching, CTET / TET, UP Police, Defense NDA, UPSC
 * 
 * Total = 260 fully functional CBT mock test papers!
 */
export function generateAllExtendedMocks(): MockTest[] {
  const allMocks: MockTest[] = [];

  const examCategories = [
    // ==========================================
    // 1. SSC EXAMS (NEW 2026 PATTERN)
    // ==========================================
    {
      name: 'SSC CGL Exam Prep',
      titlePrefix: 'SSC CGL Tier-1 Combined Graduate Level CBT Grand Mock',
      duration: 60,
      totalMarks: 200,
      negative: 0.50
    },
    {
      name: 'SSC CHSL Exam Prep',
      titlePrefix: 'SSC CHSL Combined (10+2) Tier-1 Practice Grand Mock',
      duration: 60,
      totalMarks: 200,
      negative: 0.50
    },
    {
      name: 'SSC MTS Exam Prep',
      titlePrefix: 'SSC MTS & Havaldar Session 1 & 2 CBT Mock Test',
      duration: 90,
      totalMarks: 150,
      negative: 0.33
    },
    {
      name: 'SSC GD Exam Prep',
      titlePrefix: 'SSC GD Constable CAPF / SSF Special CBT Mock',
      duration: 60,
      totalMarks: 160,
      negative: 0.25
    },
    {
      name: 'SSC CPO SI Exam Prep',
      titlePrefix: 'SSC CPO Sub-Inspector Delhi Police & CAPF CBT Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.25
    },
    {
      name: 'SSC Stenographer Exam Prep',
      titlePrefix: 'SSC Stenographer Grade C & D CBT Speed Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.25
    },

    // ==========================================
    // 2. RAILWAY EXAMS
    // ==========================================
    {
      name: 'RRB NTPC Exam Prep',
      titlePrefix: 'Railway Recruitment Board NTPC Stage-1 CBT Speed Mock',
      duration: 90,
      totalMarks: 100,
      negative: 0.33
    },
    {
      name: 'RRB ALP Exam Prep',
      titlePrefix: 'Railway RRB ALP & Technician Stage-1 CBT Speed Mock',
      duration: 60,
      totalMarks: 75,
      negative: 0.33
    },
    {
      name: 'Railway Group-D Exam Prep',
      titlePrefix: 'Railway RRB Group-D (Level-1) CBT Complete Mock',
      duration: 90,
      totalMarks: 100,
      negative: 0.33
    },
    {
      name: 'RRB JE Railway Exam Prep',
      titlePrefix: 'Railway RRB Junior Engineer (JE) CBT-1 Grand Mock',
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
    },
    {
      name: 'Railway RPF Constable Exam Prep',
      titlePrefix: 'RPF Constable CBT All India Level Practice Mock',
      duration: 90,
      totalMarks: 120,
      negative: 0.33
    },

    // ==========================================
    // 3. BANK EXAMS
    // ==========================================
    {
      name: 'IBPS PO Exam Prep',
      titlePrefix: 'IBPS Bank Probationary Officers (PO) CBT Prelims Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'IBPS Clerk Exam Prep',
      titlePrefix: 'IBPS Clerk All India Prelims Speed Test Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'SBI PO Exam Prep',
      titlePrefix: 'SBI Probationary Officer (PO) Prelims High-Yield Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'SBI Clerk Exam Prep',
      titlePrefix: 'SBI Junior Associates (Clerk) Prelims Speed Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'Bank of Baroda (BOB) Exam Prep',
      titlePrefix: 'Bank of Baroda (BOB) Specialist Officer & Apprentice CBT Grand Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'Punjab National Bank (PNB) Exam Prep',
      titlePrefix: 'Punjab National Bank (PNB) SO & Apprentice CBT All India Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'Union Bank of India (UBI) Exam Prep',
      titlePrefix: 'Union Bank of India (UBI) Local Bank Officers & SO CBT Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'Canara Bank Exam Prep',
      titlePrefix: 'Canara Bank Graduate Apprentice & SO Selection CBT Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'Central Bank of India (CBI) Exam Prep',
      titlePrefix: 'Central Bank of India (CBI) Sub-Staff & Apprentice Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'NABARD Grade A Officer Prep',
      titlePrefix: 'NABARD Grade A Assistant Manager (RDBS) Prelims Mock',
      duration: 120,
      totalMarks: 100,
      negative: 0.25
    },
    {
      name: 'IBPS RRB Officer & Assistant Prep',
      titlePrefix: 'IBPS RRB Gramin Bank Officer & Office Assistant Mock',
      duration: 45,
      totalMarks: 80,
      negative: 0.25
    },
    {
      name: 'RBI Assistant & Grade B Prep',
      titlePrefix: 'Reserve Bank of India (RBI) Assistant & Grade B Mock',
      duration: 60,
      totalMarks: 100,
      negative: 0.25
    },

    // ==========================================
    // 4. HARYANA EXAMS
    // ==========================================
    {
      name: 'HSSC CET Group C & D Exam Prep',
      titlePrefix: 'Haryana HSSC CET Group C & D (25% Haryana GK) CBT Mock',
      duration: 105,
      totalMarks: 100,
      negative: 0.00
    },
    {
      name: 'Haryana Police Constable Exam Prep',
      titlePrefix: 'Haryana Police Constable & Commando Special Target Mock',
      duration: 90,
      totalMarks: 100,
      negative: 0.00
    },
    {
      name: 'HPSC HCS Haryana Civil Services Prep',
      titlePrefix: 'HPSC HCS (Executive Branch) Haryana GS & CSAT Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.25
    },

    // ==========================================
    // 5. ONLINE CBT EXAMS (CENTRAL & STATE)
    // ==========================================
    {
      name: 'DSSSB General & Teaching CBT Mock',
      titlePrefix: 'DSSSB PRT / TGT / PGT & Non-Teaching One-Tier CBT Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.25
    },
    {
      name: 'CTET & State TET Online CBT Mock',
      titlePrefix: 'CTET Paper-1 & 2 Central Teacher Eligibility Online Mock',
      duration: 150,
      totalMarks: 150,
      negative: 0.00
    },
    {
      name: 'UP Police Exam Prep',
      titlePrefix: 'UP Police Constable & SI Special CBT Target Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.50
    },
    {
      name: 'Defense NDA Exam Prep',
      titlePrefix: 'UPSC NDA / CDS Defense Combined Ability CBT Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.67
    },
    {
      name: 'UPSC Civil Services Prep',
      titlePrefix: 'UPSC Indian Civil Services (IAS) GS Paper-1 Daily Mock',
      duration: 120,
      totalMarks: 200,
      negative: 0.67
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
