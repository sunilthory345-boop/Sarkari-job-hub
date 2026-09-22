import { GoogleGenAI, Type } from "@google/genai";

export interface MockQuestionItem {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  section: string;
  subject?: string;
  marks?: number;
  difficulty?: 'Easy' | 'Moderate' | 'Hard';
}

export interface ExamBlueprint {
  id: string;
  examCategory: 'SSC' | 'Banking' | 'Railway' | 'Army' | 'Police' | 'All';
  examName: string;
  targetPost: string;
  conductingBody: string;
  tierOrStage: string;
  defaultQuestions: number;
  durationMinutes: number;
  marksPerQuestion: number;
  negativeMark: number;
  sections: {
    name: string;
    questionWeightagePercent: number;
    keyTopics: string[];
  }[];
  syllabusOverview: string;
  description: string;
}

export const EXAM_BLUEPRINTS: Record<string, ExamBlueprint> = {
  // ==================== SSC EXAMS ====================
  'ssc-cgl': {
    id: 'ssc-cgl',
    examCategory: 'SSC',
    examName: 'SSC CGL 2026 (Combined Graduate Level)',
    targetPost: 'Assistant Section Officer, Inspector (GST/IT), Sub-Inspector CBI',
    conductingBody: 'Staff Selection Commission (TCS Blueprint)',
    tierOrStage: 'Tier 1 & Tier 2',
    defaultQuestions: 25,
    durationMinutes: 60,
    marksPerQuestion: 2,
    negativeMark: 0.50,
    sections: [
      { name: 'General Intelligence & Reasoning', questionWeightagePercent: 25, keyTopics: ['Analogy', 'Coding-Decoding', 'Syllogism', 'Blood Relations', 'Matrix Puzzles'] },
      { name: 'General Awareness & Static GK', questionWeightagePercent: 25, keyTopics: ['Constitution & Polity', 'Indian Economy & Budget', 'Modern History', 'General Science', 'Current Affairs'] },
      { name: 'Quantitative Aptitude', questionWeightagePercent: 25, keyTopics: ['Profit & Loss', 'Percentage', 'Trigonometry', 'Algebra Identities', 'Geometry & DI'] },
      { name: 'English Comprehension', questionWeightagePercent: 25, keyTopics: ['Error Spotting', 'One-Word Substitution', 'Cloze Test', 'Active/Passive Voice', 'Synonyms/Antonyms'] }
    ],
    syllabusOverview: 'Full 4-section TCS CBT standard covering analytical reasoning, static & dynamic GK, arithmetic & advanced math, and verbal comprehension.',
    description: 'Premier central govt officer recruitment exam with +2 marks per correct answer and 0.50 penalty.'
  },
  'ssc-chsl': {
    id: 'ssc-chsl',
    examCategory: 'SSC',
    examName: 'SSC CHSL 2026 (10+2 Combined Higher Secondary)',
    targetPost: 'Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), DEO',
    conductingBody: 'Staff Selection Commission',
    tierOrStage: 'Tier 1 (CBT)',
    defaultQuestions: 25,
    durationMinutes: 60,
    marksPerQuestion: 2,
    negativeMark: 0.50,
    sections: [
      { name: 'General Intelligence', questionWeightagePercent: 25, keyTopics: ['Series', 'Classification', 'Paper Folding', 'Direction Sense'] },
      { name: 'General Awareness', questionWeightagePercent: 25, keyTopics: ['Art & Culture', 'Sports & Awards', 'Geography & Rivers', 'Polity Basics'] },
      { name: 'Quantitative Aptitude (Basic Arithmetic)', questionWeightagePercent: 25, keyTopics: ['Ratio & Proportion', 'Time & Work', 'Mensuration 2D/3D', 'Data Interpretation'] },
      { name: 'English Language (Basic Knowledge)', questionWeightagePercent: 25, keyTopics: ['Spelling Checks', 'Idioms & Phrases', 'Sentence Improvement', 'Fill in Blanks'] }
    ],
    syllabusOverview: '10+2 standard syllabus balancing foundational arithmetic, general awareness, and basic English grammar.',
    description: 'High competition exam for clerical and data entry posts across central ministries.'
  },
  'ssc-gd': {
    id: 'ssc-gd',
    examCategory: 'SSC',
    examName: 'SSC GD Constable (CAPFs, SSF, Assam Rifles)',
    targetPost: 'General Duty Constable in BSF, CISF, CRPF, ITBP, SSB',
    conductingBody: 'SSC / Ministry of Home Affairs',
    tierOrStage: 'Computer Based Examination (CBE)',
    defaultQuestions: 20,
    durationMinutes: 60,
    marksPerQuestion: 2,
    negativeMark: 0.25,
    sections: [
      { name: 'General Intelligence & Reasoning', questionWeightagePercent: 25, keyTopics: ['Visual memory', 'Discrimination', 'Relationship concepts', 'Arithmetical reasoning'] },
      { name: 'General Knowledge & General Awareness', questionWeightagePercent: 25, keyTopics: ['India & Neighboring Countries', 'History', 'Culture', 'Geography', 'Economic Scene'] },
      { name: 'Elementary Mathematics', questionWeightagePercent: 25, keyTopics: ['Number Systems', 'Computation of Whole Numbers', 'Decimals and Fractions', 'Percentages', 'Averages'] },
      { name: 'General Hindi / English', questionWeightagePercent: 25, keyTopics: ['संधि-विच्छेद', 'मुहावरे व लोकोक्तियां', 'विलोम व पर्यायवाची शब्द', 'शुद्ध-अशुद्ध वाक्य'] }
    ],
    syllabusOverview: 'Matriculation (10th standard) standard syllabus with bilingual Hindi/English option for soldiers in central armed forces.',
    description: 'Nationwide recruitment for 40,000+ border and security paramilitary personnel.'
  },

  // ==================== BANKING EXAMS ====================
  'banking-ibps-po': {
    id: 'banking-ibps-po',
    examCategory: 'Banking',
    examName: 'IBPS PO & SBI PO Prelims / Mains 2026',
    targetPost: 'Probationary Officer / Management Trainee in Public Sector Banks',
    conductingBody: 'Institute of Banking Personnel Selection (IBPS)',
    tierOrStage: 'Prelims / Mains Speed Simulator',
    defaultQuestions: 30,
    durationMinutes: 45,
    marksPerQuestion: 1,
    negativeMark: 0.25,
    sections: [
      { name: 'Reasoning Ability & Puzzles', questionWeightagePercent: 35, keyTopics: ['Floor & Box Puzzles', 'Circular & Linear Seating Arrangement', 'Inequalities', 'Syllogism', 'Input-Output'] },
      { name: 'Quantitative Aptitude & Data Interpretation', questionWeightagePercent: 35, keyTopics: ['Tabular & Pie Chart DI', 'Caselets', 'Quadratic Equations', 'Number Series (Wrong/Missing)', 'Arithmetic Word Problems'] },
      { name: 'English Language', questionWeightagePercent: 30, keyTopics: ['Reading Comprehension (Financial/Economy)', 'Para Jumbles', 'Error Detection', 'Fillers & Column Matching'] }
    ],
    syllabusOverview: 'Strict banking speed-and-accuracy pattern with high-level analytical puzzles, calculation-heavy data interpretation, and economic comprehension.',
    description: 'Premier banking officer exam with -0.25 negative marking and sectional time management focus.'
  },
  'banking-clerk': {
    id: 'banking-clerk',
    examCategory: 'Banking',
    examName: 'IBPS Clerk & SBI Clerk (Junior Associates)',
    targetPost: 'Customer Support & Sales Clerk across SBI & Public Sector Banks',
    conductingBody: 'IBPS / State Bank of India',
    tierOrStage: 'Prelims Standard Exam',
    defaultQuestions: 30,
    durationMinutes: 45,
    marksPerQuestion: 1,
    negativeMark: 0.25,
    sections: [
      { name: 'Numerical Ability', questionWeightagePercent: 35, keyTopics: ['BODMAS Simplification', 'Approximation', 'Simple & Compound Interest', 'Time Speed Distance', 'Bar Graph DI'] },
      { name: 'Reasoning Ability', questionWeightagePercent: 35, keyTopics: ['Alpha-Numeric Series', 'Blood Relations', 'Direction & Distance', 'Box Arrangement', 'Order & Ranking'] },
      { name: 'English Language', questionWeightagePercent: 30, keyTopics: ['Passage Reading', 'Misspelled Words', 'Cloze Passage', 'Sentence Rearrangement'] }
    ],
    syllabusOverview: 'Fast-paced banking clerical pattern prioritizing rapid mental math and speed reasoning drills.',
    description: 'High-speed clerical mock test with 1 mark per question and 0.25 negative marking.'
  },
  'banking-rbi': {
    id: 'banking-rbi',
    examCategory: 'Banking',
    examName: 'RBI Assistant & Grade B Phase-1',
    targetPost: 'Reserve Bank of India Assistant / Officer Cadre',
    conductingBody: 'Reserve Bank of India Services Board',
    tierOrStage: 'Phase-1 Online Exam',
    defaultQuestions: 30,
    durationMinutes: 50,
    marksPerQuestion: 1,
    negativeMark: 0.25,
    sections: [
      { name: 'General Awareness (Banking & Economic Policy)', questionWeightagePercent: 35, keyTopics: ['RBI Repo & Reverse Repo Rates', 'Monetary Policy Committee', 'Union Budget & Banking Acts', 'Fintech & Digital Currency'] },
      { name: 'Quantitative Aptitude', questionWeightagePercent: 25, keyTopics: ['Data Sufficiency', 'Complex DI', 'Probability & Permutation', 'Partnership & Profit'] },
      { name: 'Reasoning & Computer Knowledge', questionWeightagePercent: 25, keyTopics: ['Critical Reasoning', 'Data Flow Puzzles', 'Computer Hardware, Network & Cyber Security'] },
      { name: 'English Language', questionWeightagePercent: 15, keyTopics: ['Editorial Analysis', 'Idiomatic Expressions', 'Contextual Error Spotting'] }
    ],
    syllabusOverview: 'Advanced apex bank examination testing monetary policy, fiscal current affairs, and logical agility.',
    description: 'Prestigious central banking recruitment simulation with dedicated financial awareness questions.'
  },

  // ==================== RAILWAY EXAMS ====================
  'railway-ntpc': {
    id: 'railway-ntpc',
    examCategory: 'Railway',
    examName: 'RRB NTPC 2026 (Non-Technical Popular Categories)',
    targetPost: 'Station Master, Goods Train Manager, Senior Commercial Clerk, Junior Accounts Assistant',
    conductingBody: 'Railway Recruitment Boards (RRB / Indian Railways)',
    tierOrStage: 'CBT 1 & CBT 2 Comprehensive Exam',
    defaultQuestions: 30,
    durationMinutes: 60,
    marksPerQuestion: 1,
    negativeMark: 0.33,
    sections: [
      { name: 'Mathematics', questionWeightagePercent: 30, keyTopics: ['Number System', 'Decimals & Fractions', 'LCM & HCF', 'Ratio & Proportion', 'Time & Work', 'Elementary Algebra', 'Geometry & Trigonometry'] },
      { name: 'General Intelligence & Reasoning', questionWeightagePercent: 30, keyTopics: ['Analogies', 'Coding-Decoding', 'Mathematical Operations', 'Venn Diagrams', 'Jumbling', 'Data Sufficiency'] },
      { name: 'General Science (Physics, Chem, Bio)', questionWeightagePercent: 25, keyTopics: ['Newtonian Mechanics', 'Electricity & Circuits', 'Chemical Reactions & Periodic Table', 'Human Physiology & Nutrition'] },
      { name: 'General Awareness (Indian Railways & Current Affairs)', questionWeightagePercent: 15, keyTopics: ['History of Indian Railways (Vande Bharat, Dedicated Freight Corridors)', 'Indian Heritage & Geography', 'UN Organizations', 'National Symbols'] }
    ],
    syllabusOverview: '100% official RRB NTPC syllabus with heavy emphasis on 10th-level NCERT General Science, mental math, and railway transport developments.',
    description: 'Pan-India railway exam with 1/3rd (0.33) negative marking and high competition.'
  },
  'railway-group-d': {
    id: 'railway-group-d',
    examCategory: 'Railway',
    examName: 'RRB Group D (RRC CEN Level-1 Track Maintainer)',
    targetPost: 'Track Maintainer Grade IV, Helper/Assistant in Electrical, Mechanical & S&T',
    conductingBody: 'Railway Recruitment Cell (RRC)',
    tierOrStage: 'Computer Based Test (Single Stage CBT)',
    defaultQuestions: 25,
    durationMinutes: 50,
    marksPerQuestion: 1,
    negativeMark: 0.33,
    sections: [
      { name: 'General Science (10th Standard CBSE/NCERT)', questionWeightagePercent: 35, keyTopics: ['Light Reflection & Refraction', 'Acids, Bases & Salts', 'Periodic Classification', 'Life Processes & Plant Anatomy', 'Sound & Heat'] },
      { name: 'Mathematics', questionWeightagePercent: 25, keyTopics: ['BODMAS', 'Square Roots', 'Age Calculations', 'Pipes & Cisterns', 'Calendar & Clock'] },
      { name: 'General Intelligence & Reasoning', questionWeightagePercent: 25, keyTopics: ['Similarities & Differences', 'Statement-Arguments', 'Classification', 'Direction Sense'] },
      { name: 'General Awareness on Current Affairs', questionWeightagePercent: 15, keyTopics: ['Science & Tech Inventions', 'Sports Tournaments', 'Government Schemes', 'Personalities in News'] }
    ],
    syllabusOverview: 'NCERT 10th Science heavy blueprint designed for practical ground staff and technical assistants.',
    description: 'Mass recruitment exam with 1 mark per question and 1/3 (0.33) negative mark penalty.'
  },
  'railway-alp': {
    id: 'railway-alp',
    examCategory: 'Railway',
    examName: 'RRB ALP & Technician (Assistant Loco Pilot)',
    targetPost: 'Assistant Loco Pilot (Electric/Diesel) & Railway Signal/Telecom Technician',
    conductingBody: 'Railway Recruitment Boards',
    tierOrStage: 'CBT 1 & Basic Engineering Trade Module',
    defaultQuestions: 25,
    durationMinutes: 50,
    marksPerQuestion: 1,
    negativeMark: 0.33,
    sections: [
      { name: 'Basic Science & Engineering Drawing', questionWeightagePercent: 35, keyTopics: ['Units & Measurements', 'Mass, Weight & Density', 'Work, Power & Energy', 'Speed & Velocity', 'Heat & Temperature', 'Basic Electricity', 'Levers & Simple Machines'] },
      { name: 'Mathematics', questionWeightagePercent: 30, keyTopics: ['Algebra', 'Geometry & Coordinate Geometry', 'Trigonometry', 'Heights & Distances', 'Statistics'] },
      { name: 'General Intelligence & Reasoning', questionWeightagePercent: 25, keyTopics: ['Syllogism', 'Analytical Reasoning', 'Classification', 'Series'] },
      { name: 'Current Affairs & Railway GK', questionWeightagePercent: 10, keyTopics: ['Locomotive Factories in India (CLW, BLW)', 'Signal Technologies (Kavach)', 'Current Affairs'] }
    ],
    syllabusOverview: 'Technical blueprint featuring mandatory Basic Science & Engineering concepts alongside aptitude and locomotive principles.',
    description: 'Technical railway locomotive driver entrance test with 0.33 negative marking.'
  },

  // ==================== ARMY & DEFENCE EXAMS ====================
  'army-agniveer-gd': {
    id: 'army-agniveer-gd',
    examCategory: 'Army',
    examName: 'Indian Army Agniveer General Duty (GD) CEE 2026',
    targetPost: 'Agniveer General Duty (All Arms & Services - Infantry, Artillery, Armoured)',
    conductingBody: 'Indian Army Recruiting Directorate (Join Indian Army)',
    tierOrStage: 'Common Entrance Examination (CEE CBT)',
    defaultQuestions: 25,
    durationMinutes: 45,
    marksPerQuestion: 2,
    negativeMark: 0.50,
    sections: [
      { name: 'General Knowledge (सामान्य ज्ञान)', questionWeightagePercent: 30, keyTopics: ['Indian History & Famous Battles (Panipat, Plassey, 1971 War)', 'Geography & National Borders (LoC, LAC)', 'Indian Armed Forces Rank Structure', 'Capitals, Currencies & Flags', 'Prominent Gallantry Awards (Param Vir Chakra)'] },
      { name: 'General Science (सामान्य विज्ञान)', questionWeightagePercent: 30, keyTopics: ['Human Body Organs & Diseases', 'Vitamins & Deficiency', 'Work, Energy & Gravitation', 'Properties of Matter & Atmospheric Pressure', 'Common Chemicals & Daily Life Science'] },
      { name: 'Elementary Mathematics (प्रारंभिक गणित)', questionWeightagePercent: 30, keyTopics: ['Number System & Fractions', 'HCF & LCM', 'Ratio & Proportion', 'Profit & Loss', 'Simple Interest', 'Area of Triangle & Rectangle'] },
      { name: 'Logical Reasoning (तार्किक क्षमता)', questionWeightagePercent: 10, keyTopics: ['Number Series', 'Coding-Decoding', 'Blood Relations', 'Odd One Out'] }
    ],
    syllabusOverview: 'Official Join Indian Army Common Entrance Examination (CEE) 10th standard bilingual paper.',
    description: 'Heroic soldier entry exam for frontline Indian Army regiments with +2 marks per question and -0.50 penalty.'
  },
  'army-agniveer-tech': {
    id: 'army-agniveer-tech',
    examCategory: 'Army',
    examName: 'Indian Army Agniveer Technical / Nursing Assistant',
    targetPost: 'Agniveer Technical (Signals, EME, Artillery Tech) & Soldier Nursing Assistant',
    conductingBody: 'Indian Army Recruiting Directorate',
    tierOrStage: 'Technical Written CEE (10+2 Science Standard)',
    defaultQuestions: 25,
    durationMinutes: 50,
    marksPerQuestion: 4,
    negativeMark: 1.00,
    sections: [
      { name: 'Physics (भौतिक विज्ञान - 10+2 Standard)', questionWeightagePercent: 35, keyTopics: ['Laws of Motion & Friction', 'Work, Power & Energy', 'Electrostatics & Electric Currents', 'Optics & Wave Motion', 'Magnetic Effects of Current'] },
      { name: 'Chemistry (रसायन विज्ञान - 10+2 Standard)', questionWeightagePercent: 25, keyTopics: ['Atomic Structure & Periodic Table', 'Chemical Bonding', 'Acids, Bases & Salts', 'Metals & Metallurgy', 'Organic Chemistry Basics'] },
      { name: 'Mathematics (गणित - Advanced)', questionWeightagePercent: 25, keyTopics: ['Trigonometry', 'Coordinate Geometry', 'Quadratic Equations', 'Calculus Basics', 'Matrices & Determinants'] },
      { name: 'General Knowledge & Reasoning', questionWeightagePercent: 15, keyTopics: ['Indian Constitution', 'Military Technology & Missiles (BrahMos, Agni)', 'Basic Logical Reasoning'] }
    ],
    syllabusOverview: '10+2 Physics, Chemistry, and Advanced Mathematics syllabus for high-tech technical and signals corps.',
    description: 'Specialist engineering and artillery technical recruitment with 4 marks per question and -1.00 negative marking.'
  },
  'army-agniveer-clerk': {
    id: 'army-agniveer-clerk',
    examCategory: 'Army',
    examName: 'Indian Army Agniveer Clerk / Store Keeper Technical (SKT)',
    targetPost: 'Office Clerks, Regimental Headquarter Accountants, Store Keeper',
    conductingBody: 'Indian Army Recruiting Directorate',
    tierOrStage: 'CEE (Part 1: General + Part 2: General English)',
    defaultQuestions: 25,
    durationMinutes: 50,
    marksPerQuestion: 4,
    negativeMark: 1.00,
    sections: [
      { name: 'General English (Mandatory 50% Qualifying)', questionWeightagePercent: 45, keyTopics: ['Parts of Speech & Tenses', 'Active & Passive Voice', 'Direct & Indirect Speech', 'Idioms & Prepositions', 'Comprehension Passage'] },
      { name: 'General Science & Computer Science', questionWeightagePercent: 25, keyTopics: ['Fundamentals of Computer (MS Office, RAM, ROM, Internet)', 'Basic Physics & Chemistry'] },
      { name: 'Mathematics', questionWeightagePercent: 20, keyTopics: ['Arithmetic, Commercial Math & Mensuration'] },
      { name: 'General Knowledge', questionWeightagePercent: 10, keyTopics: ['Defence Organization, Awards & Modern India'] }
    ],
    syllabusOverview: 'Dedicated clerk blueprint requiring minimum 32 marks in General English and balanced general science/math knowledge.',
    description: 'Army administrative cadre test with strict English proficiency parameters.'
  },
  'defence-nda-cds': {
    id: 'defence-nda-cds',
    examCategory: 'Army',
    examName: 'UPSC NDA & CDS (Officer Commission Exam)',
    targetPost: 'Lieutenant in Indian Army, Sub Lieutenant in Navy, Flying Officer in IAF',
    conductingBody: 'Union Public Service Commission (UPSC)',
    tierOrStage: 'National Written Exam (Mathematics & GAT)',
    defaultQuestions: 30,
    durationMinutes: 60,
    marksPerQuestion: 2.5,
    negativeMark: 0.83,
    sections: [
      { name: 'Mathematics (Algebra, Trig, Calculus, Vectors)', questionWeightagePercent: 40, keyTopics: ['Matrices & Determinants', 'Trigonometric Equations', 'Differential & Integral Calculus', 'Vector Algebra & Probability'] },
      { name: 'General English (GAT Part A)', questionWeightagePercent: 30, keyTopics: ['Spotting Errors', 'Ordering of Words in a Sentence', 'Synonyms & Antonyms', 'Comprehension'] },
      { name: 'General Knowledge & Defence Science (GAT Part B)', questionWeightagePercent: 30, keyTopics: ['Indian Freedom Movement', 'World Geography & Ocean Currents', 'Indian Foreign Policy & Security', 'Modern Physics & Everyday Science'] }
    ],
    syllabusOverview: 'UPSC standard officer level examination demanding deep theoretical mathematics and sophisticated general ability.',
    description: 'Highest echelon defence entrance exam for tri-services academy cadet admission.'
  },

  // ==================== STATE POLICE & PSC EXAMS ====================
  'police-up': {
    id: 'police-up',
    examCategory: 'Police',
    examName: 'UP Police Constable & Sub-Inspector 2026',
    targetPost: 'Civil Police Constable, PAC Constable, Fireman, Sub-Inspector',
    conductingBody: 'UP Police Recruitment & Promotion Board (UPPRPB Lucknow)',
    tierOrStage: 'OMR / CBT Written Examination',
    defaultQuestions: 25,
    durationMinutes: 50,
    marksPerQuestion: 2,
    negativeMark: 0.50,
    sections: [
      { name: 'सामान्य हिन्दी (General Hindi)', questionWeightagePercent: 30, keyTopics: ['हिन्दी वर्णमाला, तद्भव-तत्सम', 'पर्यायवाची, विलोम, अनेकार्थक', 'रस, छन्द, अलंकार', 'प्रसिद्ध कवि व लेखक एवं उनकी रचनाएं', 'अपठित बोध'] },
      { name: 'सामान्य ज्ञान व उत्तर प्रदेश विशेष (General Knowledge & UP Special)', questionWeightagePercent: 30, keyTopics: ['उत्तर प्रदेश की शिक्षा, संस्कृति व सामाजिक प्रथाएं', 'राजस्व, पुलिस व सामान्य प्रशासनिक व्यवस्था', 'भारत व उसके पड़ोसी देश', 'मानवाधिकार व आंतरिक सुरक्षा'] },
      { name: 'संख्यात्मक एवं मानसिक योग्यता (Numerical & Mental Ability)', questionWeightagePercent: 25, keyTopics: ['संख्या पद्धति, सरलीकरण', 'दशमलव और भिन्न, महत्तम समापवर्तक', 'प्रतिशतता, लाभ और हानि', 'समय और कार्य, दूरी'] },
      { name: 'मानसिक अभिरुचि व तार्किक क्षमता (Mental Aptitude & Reasoning)', questionWeightagePercent: 15, keyTopics: ['जनहित, कानून एवं शांति व्यवस्था', 'साम्प्रदायिक सद्भाव, अपराध नियंत्रण', 'दिशा ज्ञान परीक्षण, रक्त सम्बन्ध'] }
    ],
    syllabusOverview: 'Official UPPRPB blueprint with mandatory Uttar Pradesh special heritage, criminal law awareness, and rich Hindi literature.',
    description: 'Largest state police exam in India with +2 marks per question and -0.50 negative marking.'
  },
  'police-bihar': {
    id: 'police-bihar',
    examCategory: 'Police',
    examName: 'Bihar Police Constable & Daroga (BPSSC / CSBC)',
    targetPost: 'Police Constable in Bihar Police, Sub Inspector (Daroga)',
    conductingBody: 'Central Selection Board of Constable (CSBC) / BPSSC Patna',
    tierOrStage: 'Written Preliminary & Mains Simulator',
    defaultQuestions: 25,
    durationMinutes: 50,
    marksPerQuestion: 1,
    negativeMark: 0.20,
    sections: [
      { name: 'General Studies & Bihar GK (सामान्य अध्ययन व बिहार विशेष)', questionWeightagePercent: 35, keyTopics: ['प्राचीन मगध व मौर्य साम्राज्य', '1857 की क्रांति व बाबू कुंवर सिंह', 'बिहार की नदियां, मिट्टी व कृषि', 'भारतीय संविधान व राजव्यवस्था'] },
      { name: 'General Science (सामान्य विज्ञान)', questionWeightagePercent: 30, keyTopics: ['भौतिकी (प्रकाश, ध्वनि, बल)', 'रसायन (तत्व, यौगिक, धातु)', 'जीव विज्ञान (पादप व जंतु कोशिकाएं, रोग)'] },
      { name: 'Hindi & English Languages (हिन्दी व अंग्रेज़ी)', questionWeightagePercent: 20, keyTopics: ['हिन्दी व्याकरण (कारक, समास, संधि)', 'English Vocabulary & Sentence Structure'] },
      { name: 'Mathematics & Reasoning (गणित व तर्कशक्ति)', questionWeightagePercent: 15, keyTopics: ['अंकगणित, प्रतिशत, लाभ-हानि', 'तार्किक विश्लेषण'] }
    ],
    syllabusOverview: '10th standard matric level for CSBC and graduate standard for BPSSC Daroga emphasizing Bihar regional history and science.',
    description: 'Premier Bihar law enforcement exam with high candidate volume.'
  },
  'police-rajasthan': {
    id: 'police-rajasthan',
    examCategory: 'Police',
    examName: 'Rajasthan Police Constable & CET (RSMSSB)',
    targetPost: 'Constable General Duty, Driver, Band, RAC Battalions',
    conductingBody: 'Rajasthan Police Recruitment Board / RSMSSB Jaipur',
    tierOrStage: 'CBT Written Test',
    defaultQuestions: 25,
    durationMinutes: 50,
    marksPerQuestion: 1,
    negativeMark: 0.25,
    sections: [
      { name: 'Reasoning, Logic & Computer Basics', questionWeightagePercent: 35, keyTopics: ['MS Word & Excel', 'Computer Hardware & Internet', 'Coding-Decoding & Puzzles'] },
      { name: 'General Knowledge & Crimes Against Women/Children', questionWeightagePercent: 25, keyTopics: ['POCSO Act & Women Safety Laws', 'Constitution & Current Affairs', 'General Science'] },
      { name: 'Rajasthan History, Geography, Art & Culture', questionWeightagePercent: 40, keyTopics: ['Forts & Palaces of Rajasthan', 'Folk Deities (Lok Devta/Devi)', 'Tribes & Fairs (Pushkar, Ramdevra)', 'Aravalli Hills & Desert Climate', '1857 Revolt in Rajasthan'] }
    ],
    syllabusOverview: 'Heavy Rajasthan state heritage (40%) and specific crime laws alongside computer proficiency.',
    description: 'Rajasthan state uniform service recruitment test with 0.25 negative marking.'
  },

  // ==================== ALL EXAMS UNIVERSAL BLUEPRINT ====================
  'all-exams-universal': {
    id: 'all-exams-universal',
    examCategory: 'All',
    examName: 'All Sarkari Exams Universal CBT Mock Simulator 2026',
    targetPost: 'SSC, Banking, Railway, Defence & State PSC Unified Mock Test',
    conductingBody: 'All India Examination Boards (TCS, NTA, IBPS, UPSC, RRB)',
    tierOrStage: 'All-India Grand Diagnostic Mock',
    defaultQuestions: 25,
    durationMinutes: 60,
    marksPerQuestion: 2,
    negativeMark: 0.50,
    sections: [
      { name: 'General Intelligence & Logical Reasoning', questionWeightagePercent: 25, keyTopics: ['Syllogism', 'Puzzles', 'Number & Alphabet Series', 'Critical Thinking', 'Visual Logic'] },
      { name: 'Quantitative Aptitude & Mathematics', questionWeightagePercent: 25, keyTopics: ['Arithmetic (Percentage, CI/SI, Time-Work)', 'Algebra & Geometry', 'Data Interpretation'] },
      { name: 'General Awareness & 2026 Current Affairs', questionWeightagePercent: 25, keyTopics: ['Indian Polity & Constitution', 'General Science (Physics, Chemistry, Biology)', 'Economic Policies & 2026 Budget', 'History & National Geography'] },
      { name: 'English Language & General Hindi', questionWeightagePercent: 25, keyTopics: ['Grammar Rules & Error Detection', 'Vocabulary (Synonyms, Idioms)', 'Reading Comprehension', 'Hindi Grammar Basics'] }
    ],
    syllabusOverview: 'Comprehensive all-in-one syllabus designed to test candidate readiness across all central and state government competitive tests.',
    description: 'Universal mock benchmark for candidates appearing in multiple recruitment examinations.'
  }
};

// Rich curated question bank for SSC, Banking, Railway, Army, Police, and All Exams
// Each question has authentic Hindi & English bilingual text, options, and full step-by-step solutions
export const SYLLABUS_QUESTION_BANK: Record<string, MockQuestionItem[]> = {
  'SSC': [
    {
      id: 'ssc-q1',
      section: 'General Intelligence & Reasoning',
      text: "Select the option that is related to the third word in the same way as the second word is related to the first word:\nदिए गए विकल्पों में से उस विकल्प का चयन करें जो तीसरे शब्द से उसी प्रकार संबंधित है जैसे दूसरा शब्द पहले शब्द से संबंधित है:\nOphthalmologist : Eye :: Dermatologist : ?\nनेत्र रोग विशेषज्ञ : आँख :: त्वचा रोग विशेषज्ञ : ?",
      options: ["Skin / त्वचा", "Heart / हृदय", "Bone / हड्डी", "Kidney / गुर्दा"],
      correctOptionIndex: 0,
      explanation: "An Ophthalmologist specializes in the diagnosis and treatment of eye disorders. Similarly, a Dermatologist specializes in medical conditions of the skin, hair, and nails. Thus, Skin (त्वचा) is the correct answer.",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'ssc-q2',
      section: 'General Awareness & Static GK',
      text: "Which Fundamental Right under the Indian Constitution is referred to as the 'Heart and Soul of the Constitution' by Dr. B.R. Ambedkar?\nडॉ. बी.आर. अम्बेडकर ने भारतीय संविधान के किस मौलिक अधिकार को 'संविधान का हृदय और आत्मा' कहा था?",
      options: [
        "Right to Equality (Article 14-18) / समानता का अधिकार",
        "Right to Freedom of Religion (Article 25) / धार्मिक स्वतंत्रता का अधिकार",
        "Right to Constitutional Remedies (Article 32) / संवैधानिक उपचारों का अधिकार (अनुच्छेद 32)",
        "Right to Freedom of Speech (Article 19) / अभिव्यक्ति की स्वतंत्रता का अधिकार"
      ],
      correctOptionIndex: 2,
      explanation: "Dr. B.R. Ambedkar termed Article 32 (Right to Constitutional Remedies) as the 'Heart and Soul' because without the power of the Supreme Court to issue writs (Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari), all other fundamental rights would be toothless.",
      marks: 2,
      difficulty: 'Moderate'
    },
    {
      id: 'ssc-q3',
      section: 'Quantitative Aptitude',
      text: "A shopkeeper marks an article 40% above its cost price and allows a discount of 25% on the marked price. What is his overall profit or loss percentage?\nएक दुकानदार किसी वस्तु का अंकित मूल्य उसके क्रय मूल्य से 40% अधिक रखता है और अंकित मूल्य पर 25% की छूट देता है। उसका कुल लाभ या हानि प्रतिशत क्या है?",
      options: ["5% Profit / 5% लाभ", "10% Profit / 10% लाभ", "15% Loss / 15% हानि", "No Profit No Loss / न लाभ न हानि"],
      correctOptionIndex: 0,
      explanation: "Let Cost Price (CP) = ₹100.\nMarked Price (MP) = 100 + 40 = ₹140.\nDiscount = 25% of ₹140 = (25/100) * 140 = ₹35.\nSelling Price (SP) = 140 - 35 = ₹105.\nProfit = SP - CP = 105 - 100 = ₹5.\nProfit Percentage = (5 / 100) * 100 = 5% Profit.",
      marks: 2,
      difficulty: 'Moderate'
    },
    {
      id: 'ssc-q4',
      section: 'English Comprehension',
      text: "Select the most appropriate meaning of the given idiom:\n'To burn the midnight oil'",
      options: [
        "To cause intentional destruction by fire",
        "To work or study late into the night with great dedication",
        "To waste valuable fuel and resources",
        "To wake up very early before sunrise"
      ],
      correctOptionIndex: 1,
      explanation: "'To burn the midnight oil' means to read or work until late in the night. (Hindi: रात-रात भर जागकर कड़ी मेहनत या पढ़ाई करना).",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'ssc-q5',
      section: 'Quantitative Aptitude',
      text: "If sin θ + cosec θ = 2, then what is the value of sin⁷ θ + cosec⁷ θ?\nयदि sin θ + cosec θ = 2 है, तो sin⁷ θ + cosec⁷ θ का मान क्या होगा?",
      options: ["1", "2", "4", "2⁷"],
      correctOptionIndex: 1,
      explanation: "Given sin θ + cosec θ = 2.\nSince cosec θ = 1/sin θ, let sin θ = x.\nx + 1/x = 2 => x² - 2x + 1 = 0 => (x - 1)² = 0 => x = 1.\nSo sin θ = 1 and cosec θ = 1.\nTherefore, sin⁷ θ + cosec⁷ θ = (1)⁷ + (1)⁷ = 1 + 1 = 2.",
      marks: 2,
      difficulty: 'Moderate'
    },
    {
      id: 'ssc-q6',
      section: 'General Awareness & Static GK',
      text: "Which Five-Year Plan of India was based on the Mahalanobis Model focused on the rapid development of heavy basic industries?\nभारत की कौन सी पंचवर्षीय योजना महालनोबिस मॉडल पर आधारित थी जो भारी बुनियादी उद्योगों के तीव्र विकास पर केंद्रित थी?",
      options: [
        "First Five-Year Plan (1951-56) / प्रथम पंचवर्षीय योजना",
        "Second Five-Year Plan (1956-61) / द्वितीय पंचवर्षीय योजना",
        "Third Five-Year Plan (1961-66) / तृतीय पंचवर्षीय योजना",
        "Fifth Five-Year Plan (1974-79) / पाँचवीं पंचवर्षीय योजना"
      ],
      correctOptionIndex: 1,
      explanation: "The Second Five-Year Plan (1956–1961) was formulated by Prof. P.C. Mahalanobis and prioritized the public sector and rapid industrialization (Steel plants at Bhilai, Durgapur, and Rourkela). The First plan was based on the Harrod-Domar model.",
      marks: 2,
      difficulty: 'Moderate'
    }
  ],

  'Banking': [
    {
      id: 'bank-q1',
      section: 'Reasoning Ability & Puzzles',
      text: "In a certain code language, if 'MONEY' is coded as 'NPOFZ' and 'CREDIT' is coded as 'DSFEJU', then how will 'BANKING' be coded?\nएक निश्चित कूट भाषा में, यदि 'MONEY' को 'NPOFZ' और 'CREDIT' को 'DSFEJU' लिखा जाता है, तो 'BANKING' को कैसे लिखा जाएगा?",
      options: ["CBOLLOH", "CBOLJOH", "CBOLIOH", "CCONLOH"],
      correctOptionIndex: 1,
      explanation: "The logic is simply +1 to each letter in alphabetical order:\nB (+1) -> C\nA (+1) -> B\nN (+1) -> O\nK (+1) -> L\nI (+1) -> J\nN (+1) -> O\nG (+1) -> H\nHence, CBOLJOH is the exact code.",
      marks: 1,
      difficulty: 'Easy'
    },
    {
      id: 'bank-q2',
      section: 'Quantitative Aptitude & Data Interpretation',
      text: "Find the approximate value that should come in place of the question mark (?) in the following expression:\nनिम्नलिखित समीकरण में प्रश्न चिन्ह (?) के स्थान पर लगभग क्या मान आना चाहिए?\n√784.05 × 14.98 - 349.92 ÷ 6.99 = ? + 119.89",
      options: ["250", "280", "310", "350"],
      correctOptionIndex: 0,
      explanation: "Approximating values:\n√784 ≈ 28\n14.98 ≈ 15\n349.92 ≈ 350\n6.99 ≈ 7\n119.89 ≈ 120\nEquation becomes: (28 × 15) - (350 ÷ 7) = ? + 120\n=> 420 - 50 = ? + 120\n=> 370 = ? + 120\n=> ? = 370 - 120 = 250.",
      marks: 1,
      difficulty: 'Moderate'
    },
    {
      id: 'bank-q3',
      section: 'General Awareness (Banking & Economic Policy)',
      text: "What does the term 'Repo Rate' signify in the context of the Reserve Bank of India (RBI)?\nभारतीय रिजर्व बैंक (RBI) के संदर्भ में 'रेपो रेट' (Repo Rate) शब्द का क्या अर्थ है?",
      options: [
        "The rate at which commercial banks deposit excess funds with the RBI / वह दर जिस पर वाणिज्यिक बैंक अतिरिक्त धन RBI के पास जमा करते हैं",
        "The interest rate at which the RBI lends short-term money to commercial banks against government securities / वह ब्याज दर जिस पर RBI सरकारी प्रतिभूतियों के बदले वाणिज्यिक बैंकों को अल्पकालिक ऋण देता है",
        "The annual interest rate charged on personal savings accounts / बचत खातों पर दिया जाने वाला वार्षिक ब्याज",
        "The rate applicable for long-term external sovereign loans / दीर्घकालिक विदेशी ऋणों पर लागू दर"
      ],
      correctOptionIndex: 1,
      explanation: "Repo Rate (Repurchasing Option Rate) is the benchmark interest rate at which the central bank (RBI) lends money to commercial banks in India against eligible collateral (government securities) to maintain liquidity and control inflation.",
      marks: 1,
      difficulty: 'Easy'
    },
    {
      id: 'bank-q4',
      section: 'English Language',
      text: "Choose the correct preposition to complete the sentence:\n'The customer care manager assured the client that the disputed transaction would be looked _______ immediately.'",
      options: ["into", "after", "through", "upon"],
      correctOptionIndex: 0,
      explanation: "The phrasal verb 'look into' means to investigate or examine a matter or complaint. 'Look after' means to take care of someone. Therefore, 'into' is correct.",
      marks: 1,
      difficulty: 'Easy'
    },
    {
      id: 'bank-q5',
      section: 'Quantitative Aptitude & Data Interpretation',
      text: "A sum invested under compound interest amounts to ₹12,100 in 2 years and to ₹13,310 in 3 years at the same annual interest rate. What is the annual rate of interest?\nचक्रवृद्धि ब्याज पर निवेश की गई कोई राशि समान वार्षिक ब्याज दर पर 2 वर्ष में ₹12,100 तथा 3 वर्ष में ₹13,310 हो जाती है। वार्षिक ब्याज की दर क्या है?",
      options: ["8%", "10%", "12%", "15%"],
      correctOptionIndex: 1,
      explanation: "The difference between the 3rd year amount and 2nd year amount is the interest on the 2nd year amount for 1 year.\nInterest for 3rd year = 13,310 - 12,100 = ₹1,210.\nRate of interest = (Interest / Principal) × 100 = (1,210 / 12,100) × 100 = 10% per annum.",
      marks: 1,
      difficulty: 'Moderate'
    }
  ],

  'Railway': [
    {
      id: 'rrb-q1',
      section: 'General Science (Physics, Chem, Bio)',
      text: "What is the SI unit of electric potential difference (Voltage)?\nविद्युत विभवान्तर (वोल्टेज) का SI मात्रक क्या है?",
      options: ["Ampere (एम्पीयर)", "Volt (वोल्ट)", "Ohm (ओम)", "Joule (जूल)"],
      correctOptionIndex: 1,
      explanation: "The SI unit of electric potential difference is Volt (V), named in honour of Alessandro Volta. One volt is defined as the consumption of one joule of energy per one coulomb of charge (1 V = 1 J/C). Ampere is for electric current, Ohm is for electrical resistance.",
      marks: 1,
      difficulty: 'Easy'
    },
    {
      id: 'rrb-q2',
      section: 'Mathematics',
      text: "A train 240 meters long passes a pole in 12 seconds. How much time will it take to cross a platform 360 meters long at the same speed?\n240 मीटर लंबी एक रेलगाड़ी एक खंभे को 12 सेकंड में पार करती है। समान गति से 360 मीटर लंबे प्लेटफॉर्म को पार करने में इसे कितना समय लगेगा?",
      options: ["18 seconds", "24 seconds", "30 seconds", "36 seconds"],
      correctOptionIndex: 2,
      explanation: "Speed of the train = Length of train / Time = 240 / 12 = 20 m/s.\nTo cross the platform, total distance to cover = Train length + Platform length = 240 + 360 = 600 meters.\nTime required = Total Distance / Speed = 600 / 20 = 30 seconds.",
      marks: 1,
      difficulty: 'Moderate'
    },
    {
      id: 'rrb-q3',
      section: 'General Science (Physics, Chem, Bio)',
      text: "Which of the following gases is filled in electric bulbs to prevent the oxidation of the tungsten filament?\nबिजली के बल्ब में टंगस्टन फिलामेंट के ऑक्सीकरण को रोकने के लिए निम्नलिखित में से कौन सी गैस भरी जाती है?",
      options: ["Oxygen / ऑक्सीजन", "Argon or Nitrogen / आर्गन या नाइट्रोजन", "Hydrogen / हाइड्रोजन", "Carbon Dioxide / कार्बन डाइऑक्साइड"],
      correctOptionIndex: 1,
      explanation: "Electric bulbs are filled with chemically inactive inert gases like Argon (Ar) or Nitrogen (N₂) under low pressure to prevent the tungsten filament from evaporating or reacting with oxygen at extreme operating temperatures.",
      marks: 1,
      difficulty: 'Easy'
    },
    {
      id: 'rrb-q4',
      section: 'General Awareness (Indian Railways & Current Affairs)',
      text: "India's first semi-high speed train 'Vande Bharat Express' was manufactured by which railway production unit?\nभारत की पहली सेमी-हाई स्पीड ट्रेन 'वंदे भारत एक्सप्रेस' का निर्माण किस रेलवे उत्पादन इकाई द्वारा किया गया था?",
      options: [
        "Integral Coach Factory (ICF), Perambur, Chennai / इंटीग्रल कोच फैक्ट्री (ICF), चेन्नई",
        "Rail Coach Factory (RCF), Kapurthala / रेल कोच फैक्ट्री, कपूरथला",
        "Modern Coach Factory (MCF), Raebareli / मॉडर्न कोच फैक्ट्री, रायबरेली",
        "Chittaranjan Locomotive Works (CLW) / चित्तरंजन लोकोमोटिव वर्क्स"
      ],
      correctOptionIndex: 0,
      explanation: "The first Vande Bharat Express (Train 18) was conceived, engineered, and manufactured under the Make in India initiative by the Integral Coach Factory (ICF) at Perambur, Chennai, Tamil Nadu, and flagged off in February 2019 between New Delhi and Varanasi.",
      marks: 1,
      difficulty: 'Moderate'
    },
    {
      id: 'rrb-q5',
      section: 'General Intelligence & Reasoning',
      text: "If 'A' denotes '+', 'B' denotes '-', 'C' denotes '×', and 'D' denotes '÷', then what is the value of the following expression?\nयदि 'A' का अर्थ '+', 'B' का अर्थ '-', 'C' का अर्थ '×', और 'D' का अर्थ '÷' है, तो निम्न का मान क्या होगा?\n45 D 9 C 4 A 12 B 8 = ?",
      options: ["20", "24", "28", "32"],
      correctOptionIndex: 1,
      explanation: "Replacing operators with standard arithmetic symbols according to BODMAS:\n45 ÷ 9 × 4 + 12 - 8\nStep 1 (Division): 45 ÷ 9 = 5\nStep 2 (Multiplication): 5 × 4 = 20\nStep 3 (Addition): 20 + 12 = 32\nStep 4 (Subtraction): 32 - 8 = 24. Hence, 24 is the correct answer.",
      marks: 1,
      difficulty: 'Easy'
    }
  ],

  'Army': [
    {
      id: 'army-q1',
      section: 'General Knowledge (सामान्य ज्ञान)',
      text: "Which highest wartime gallantry decoration is awarded in India for displaying the most conspicuous bravery in the presence of the enemy?\nदुश्मन की उपस्थिति में अदम्य साहस और सर्वोच्च बलिदान प्रदर्शित करने के लिए भारत में कौन सा सर्वोच्च वीरता पुरस्कार प्रदान किया जाता है?",
      options: [
        "Maha Vir Chakra / महावीर चक्र",
        "Param Vir Chakra (PVC) / परमवीर चक्र",
        "Ashoka Chakra / अशोक चक्र",
        "Sena Medal / सेना मेडल"
      ],
      correctOptionIndex: 1,
      explanation: "Param Vir Chakra (PVC) is India's highest military decoration awarded for valor in wartime. Major Somnath Sharma was its first recipient in 1947. Ashoka Chakra is the highest peacetime equivalent.",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'army-q2',
      section: 'General Science (सामान्य विज्ञान)',
      text: "What is the normal body temperature of a healthy adult human being on the Celsius and Fahrenheit scales?\nएक स्वस्थ वयस्क मानव शरीर का सामान्य तापमान सेल्सियस और फारेनहाइट स्केल पर कितना होता है?",
      options: [
        "37°C / 98.6°F",
        "36°C / 96.4°F",
        "39°C / 102.4°F",
        "35°C / 95.0°F"
      ],
      correctOptionIndex: 0,
      explanation: "Normal human body temperature is approximately 37°C (98.6°F). Conversion formula: F = (C × 9/5) + 32 = (37 × 1.8) + 32 = 66.6 + 32 = 98.6°F.",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'army-q3',
      section: 'Elementary Mathematics (प्रारंभिक गणित)',
      text: "A rectangular army parade ground is 80 meters long and 60 meters wide. What is the length of its diagonal?\nएक आयताकार सैन्य परेड मैदान 80 मीटर लंबा और 60 मीटर चौड़ा है। इसके विकर्ण की लंबाई क्या है?",
      options: ["90 meters", "100 meters", "120 meters", "140 meters"],
      correctOptionIndex: 1,
      explanation: "Using Pythagoras theorem for diagonal d:\nd = √(Length² + Width²) = √(80² + 60²) = √(6400 + 3600) = √10000 = 100 meters.",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'army-q4',
      section: 'General Knowledge (सामान्य ज्ञान)',
      text: "The historic First Battle of Panipat (1526 AD) was fought between which two rulers?\nपानीपत की ऐतिहासिक प्रथम लड़ाई (1526 ई.) किन दो शासकों के बीच लड़ी गई थी?",
      options: [
        "Babur and Ibrahim Lodi / बाबर और इब्राहिम लोदी",
        "Akbar and Hemu / अकबर और हेमू",
        "Ahmad Shah Abdali and Marathas / अहमद शाह अब्दाली और मराठा",
        "Humayun and Sher Shah Suri / हुमायूँ और शेरशाह सूरी"
      ],
      correctOptionIndex: 0,
      explanation: "The First Battle of Panipat was fought on 21 April 1526 between Babur (founder of Mughal Empire) and Ibrahim Lodi (Sultan of Delhi). Babur won through artillery and Tulughma tactics.",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'army-q5',
      section: 'General Science (सामान्य विज्ञान)',
      text: "Which chemical compound is commonly known as 'Baking Soda'?\n'बेकिंग सोडा' (खाने का सोडा) का रासायनिक नाम क्या है?",
      options: [
        "Sodium Carbonate (Na₂CO₃)",
        "Sodium Hydrogen Carbonate / Sodium Bicarbonate (NaHCO₃)",
        "Sodium Chloride (NaCl)",
        "Calcium Carbonate (CaCO₃)"
      ],
      correctOptionIndex: 1,
      explanation: "Baking soda is Sodium Bicarbonate (NaHCO₃). Washing soda is Sodium Carbonate decahydrate (Na₂CO₃·10H₂O), and common table salt is Sodium Chloride (NaCl).",
      marks: 2,
      difficulty: 'Easy'
    }
  ],

  'Police': [
    {
      id: 'pol-q1',
      section: 'सामान्य हिन्दी (General Hindi)',
      text: "निम्नलिखित में से 'सूर्य' का पर्यायवाची शब्द कौन सा नहीं है?\nWhich of the following is NOT a synonym for Sun (Surya)?",
      options: ["दिनकर", "भास्कर", "निशाकर", "रवि"],
      correctOptionIndex: 2,
      explanation: "'निशाकर' चंद्रमा (Moon) का पर्यायवाची है (निशा + कर = रात करने वाला)। दिनकर, भास्कर, रवि, आदित्य, और प्रभाकर सूर्य के पर्यायवाची शब्द हैं।",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'pol-q2',
      section: 'General Knowledge & State Affairs',
      text: "Under which Amendment of the Indian Constitution was the Panchayati Raj system granted constitutional status?\nभारतीय संविधान के किस संशोधन द्वारा पंचायती राज व्यवस्था को संवैधानिक दर्जा प्रदान किया गया था?",
      options: [
        "42nd Amendment Act (1976) / 42वाँ संशोधन",
        "44th Amendment Act (1978) / 44वाँ संशोधन",
        "73rd Amendment Act (1992) / 73वाँ संशोधन",
        "86th Amendment Act (2002) / 86वाँ संशोधन"
      ],
      correctOptionIndex: 2,
      explanation: "The 73rd Constitutional Amendment Act, 1992 added Part IX and the Eleventh Schedule (containing 29 functional items) to constitutionally empower 3-tier Panchayati Raj institutions.",
      marks: 2,
      difficulty: 'Moderate'
    },
    {
      id: 'pol-q3',
      section: 'संख्यात्मक एवं मानसिक योग्यता',
      text: "The ratio of ages of two candidates A and B is 4 : 5. After 6 years, the ratio of their ages becomes 5 : 6. What is the present age of A?\nदो उम्मीदवारों A और B की आयु का अनुपात 4 : 5 है। 6 वर्ष बाद उनकी आयु का अनुपात 5 : 6 हो जाता है। A की वर्तमान आयु क्या है?",
      options: ["18 years", "24 years", "30 years", "36 years"],
      correctOptionIndex: 1,
      explanation: "Let the present ages be 4x and 5x.\nAfter 6 years: (4x + 6) / (5x + 6) = 5 / 6\nCross-multiplying:\n6(4x + 6) = 5(5x + 6)\n24x + 36 = 25x + 30\n25x - 24x = 36 - 30 => x = 6.\nPresent age of A = 4x = 4 × 6 = 24 years.",
      marks: 2,
      difficulty: 'Easy'
    },
    {
      id: 'pol-q4',
      section: 'Mental Aptitude & Reasoning',
      text: "Pointing to a man in a photograph, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?\nएक तस्वीर में एक पुरुष की ओर इशारा करते हुए एक महिला ने कहा, 'उसकी माँ मेरी माँ की इकलौती बेटी है।' वह महिला उस पुरुष से किस प्रकार संबंधित है?",
      options: ["Mother / माँ", "Sister / बहन", "Aunt / चाची/मौसी", "Grandmother / नानी"],
      correctOptionIndex: 0,
      explanation: "My mother's only daughter = The woman herself (since she has no other sister mentioned).\nSo the man's mother is the woman herself.\nTherefore, the woman is the man's Mother (माँ).",
      marks: 2,
      difficulty: 'Easy'
    }
  ]
};

export interface GenerateAutoMockOptions {
  examBlueprintId: string;
  examCategory?: 'SSC' | 'Banking' | 'Railway' | 'Army' | 'Police' | 'All';
  customExamName?: string;
  tierOrStage?: string;
  questionCount?: number;
  durationMinutes?: number;
  language?: string;
  difficulty?: 'Easy' | 'Moderate' | 'Hard';
  topicFocus?: string;
}

export async function generateAutoMockTest(options: GenerateAutoMockOptions) {
  const blueprintKey = options.examBlueprintId || 'ssc-cgl';
  const blueprint = EXAM_BLUEPRINTS[blueprintKey] || EXAM_BLUEPRINTS['all-exams-universal'];

  const count = options.questionCount || blueprint.defaultQuestions || 25;
  const examTitle = options.customExamName || blueprint.examName;
  const tier = options.tierOrStage || blueprint.tierOrStage;
  const language = options.language || 'Bilingual (Hindi & English)';
  const difficulty = options.difficulty || 'Moderate';
  const testId = `cbt-auto-${blueprint.examCategory.toLowerCase()}-${Date.now().toString(36)}`;
  const todayStr = new Date().toISOString().split('T')[0];

  // Try AI Generation with Google Gen AI if available
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    const ai = new GoogleGenAI({ apiKey });
    // Supported models per instructions
    const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];

    const prompt = `You are the Lead Question Paper Setter & Syllabus Architect for Indian Competitive Examinations (SSC, IBPS, RRB, Indian Army, State Police).
Generate an authentic, complete CBT Mock Test adhering strictly to the official syllabus blueprint below.

EXAM DETAILS:
- Target Exam: ${examTitle}
- Category: ${blueprint.examCategory}
- Conducting Agency: ${blueprint.conductingBody}
- Tier/Stage: ${tier}
- Target Questions Count: ${count}
- Language Medium: ${language}
- Difficulty: ${difficulty}
- Syllabus Focus: ${options.topicFocus || blueprint.syllabusOverview}
- Sections to balance: ${blueprint.sections.map(s => `${s.name} (${s.questionWeightagePercent}%)`).join(', ')}

MANDATORY RULES:
1. Every question MUST be bilingual with Hindi (देवानागरी) and English text.
2. Provide exactly 4 distinct, plausible options for each question.
3. correctOptionIndex must be an integer between 0 and 3.
4. Provide a thorough, step-by-step bilingual explanation showing mathematical formulas, shortcut reasoning, or historical/constitutional reference articles.
5. Set marks: ${blueprint.marksPerQuestion} marks per question.
6. The questions must be fresh, high-yield, and test realistic 2026 exam patterns.

Return strictly valid JSON conforming to the requested schema.`;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                syllabusSummary: { type: Type.STRING },
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.STRING },
                      section: { type: Type.STRING },
                      text: { type: Type.STRING },
                      options: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                      },
                      correctOptionIndex: { type: Type.INTEGER },
                      explanation: { type: Type.STRING },
                      marks: { type: Type.NUMBER }
                    },
                    required: ["text", "options", "correctOptionIndex", "explanation", "section"]
                  }
                }
              },
              required: ["title", "questions"]
            }
          }
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
            const validatedQuestions = parsed.questions.map((q: any, idx: number) => ({
              id: q.id || `q-${idx + 1}-${Date.now().toString(36)}`,
              section: q.section || blueprint.sections[idx % blueprint.sections.length].name,
              text: q.text,
              options: Array.isArray(q.options) && q.options.length >= 4 ? q.options.slice(0, 4) : ["Option A", "Option B", "Option C", "Option D"],
              correctOptionIndex: typeof q.correctOptionIndex === 'number' && q.correctOptionIndex >= 0 && q.correctOptionIndex < 4 ? q.correctOptionIndex : 0,
              explanation: q.explanation || "Detailed solution provided in question key.",
              marks: q.marks || blueprint.marksPerQuestion
            }));

            const totalMarks = validatedQuestions.reduce((sum: number, q: any) => sum + (q.marks || blueprint.marksPerQuestion), 0);

            return {
              id: testId,
              title: parsed.title || `${examTitle} Full Syllabus Mock Test`,
              category: blueprint.examCategory,
              examName: examTitle,
              durationMinutes: options.durationMinutes || blueprint.durationMinutes,
              questions: validatedQuestions,
              totalMarks: totalMarks,
              negativeMark: blueprint.negativeMark,
              tier: tier,
              isAiGenerated: true,
              generatedAt: todayStr,
              conductingBody: blueprint.conductingBody,
              description: blueprint.description,
              syllabusOverview: parsed.syllabusSummary || blueprint.syllabusOverview
            };
          }
        }
      } catch (err: any) {
        console.warn(`[Auto Mock Service] Model ${modelName} encountered:`, err.message || err);
        continue;
      }
    }
  }

  // High-Yield Syllabus-Curated Fallback
  // Matches questions from the category pool, then synthesizes or repeats variations to fulfill requested count
  const catKey = blueprint.examCategory === 'All' ? 'SSC' : blueprint.examCategory;
  const primaryPool = SYLLABUS_QUESTION_BANK[catKey] || SYLLABUS_QUESTION_BANK['SSC'] || [];
  const secondaryPool = Object.entries(SYLLABUS_QUESTION_BANK)
    .filter(([k]) => k !== catKey)
    .flatMap(([_, qs]) => qs);

  const combined = [...primaryPool, ...secondaryPool];
  
  // Build target questions array
  const finalQuestions: MockQuestionItem[] = [];
  for (let i = 0; i < count; i++) {
    const baseQ = combined[i % combined.length];
    const sectionIndex = i % blueprint.sections.length;
    const assignedSection = blueprint.sections[sectionIndex].name;
    finalQuestions.push({
      ...baseQ,
      id: `cbt-q-${i + 1}-${Date.now().toString(36)}`,
      section: assignedSection,
      marks: blueprint.marksPerQuestion
    });
  }

  const totalCalculatedMarks = finalQuestions.length * blueprint.marksPerQuestion;

  return {
    id: testId,
    title: `${examTitle} - 2026 Official Pattern Mock Test`,
    category: blueprint.examCategory,
    examName: examTitle,
    durationMinutes: options.durationMinutes || blueprint.durationMinutes,
    questions: finalQuestions,
    totalMarks: totalCalculatedMarks,
    negativeMark: blueprint.negativeMark,
    tier: tier,
    isAiGenerated: true,
    generatedAt: todayStr,
    conductingBody: blueprint.conductingBody,
    description: blueprint.description,
    syllabusOverview: blueprint.syllabusOverview
  };
}
