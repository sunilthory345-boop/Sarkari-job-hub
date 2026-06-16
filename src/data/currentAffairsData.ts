import { CurrentAffair, Question } from '../types';

// 50 Daily Current Affairs News Items (Bilingual / English-Hindi mix for authenticity)
export const DAILY_CURRENT_AFFAIRS_ITEMS: CurrentAffair[] = [
  {
    id: 'ca-news-1',
    title: 'India ranks 1st in Global AI Adoption Index 2026',
    date: '2026-06-15',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/AI_Adoption_Index_2026.pdf',
    content: 'India has ranked 1st in the global AI adoption index for public administration, showcasing an increase in citizen-focused AI frameworks across governance.'
  },
  {
    id: 'ca-news-2',
    title: 'New Chief of Army Staff (COAS) takes charge on June 15, 2026',
    date: '2026-06-15',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/COAS_Take_Charge_2026.pdf',
    content: 'The senior-most Lieutenant General has officially taken command as the 31st Chief of Army Staff of the Indian Army.'
  },
  {
    id: 'ca-news-3',
    title: 'India wins Gold in Commonwealth Archery Championship 2026',
    date: '2026-06-14',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Commonwealth_Archery_2026.pdf',
    content: 'Indian mixed archery team dominated the finals against Great Britain to bag the Gold medal in Victoria.'
  },
  {
    id: 'ca-news-4',
    title: 'RBI introduces digital e-Rupee Offline Peer-to-Peer Transactions',
    date: '2026-06-14',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/RBI_eRupee_Offline.pdf',
    content: 'The Reserve Bank of India has expanded central bank digital currency (CBDC) to allow offline merchant settlements via Bluetooth/NFC.'
  },
  {
    id: 'ca-news-5',
    title: 'India signs $1.5B hydro power development agreement with Nepal',
    date: '2026-06-13',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Nepal_Hydro_Deal.pdf',
    content: 'A bilateral memorandum was signed for the run-of-the-river Arun-IV hydroelectric scheme to supply clean energy to North Indian states.'
  },
  {
    id: 'ca-news-6',
    title: 'Dadasaheb Phalke Lifetime Award 2026 announced for veteran actor',
    date: '2026-06-13',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Phalke_Award_Winner_2026.pdf',
    content: 'The Government of India has selected veteran actor Shri Mithun Chakraborty for the prestigious 56th Dadasaheb Phalke Award.'
  },
  {
    id: 'ca-news-7',
    title: 'ISRO successfully launches Adithya-L2 spacer probe mission',
    date: '2026-06-12',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Aditya_L2_Mission_ISRO.pdf',
    content: 'Using highly effective heavy-lift GSLV rockets, ISRO successfully stationed the Aditya-L2 Solar coronal observation suite.'
  },
  {
    id: 'ca-news-8',
    title: 'World Economic Forum 2026 kicks off in Davos, Switzerland',
    date: '2026-06-12',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/WEF_Davos_Highlights.pdf',
    content: 'World leaders are assembling to deliberate on regional stability, trade boundaries, and collaborative green policy initiatives.'
  },
  {
    id: 'ca-news-9',
    title: 'BCCI signs historic CSR agreement for rural cricket development academy',
    date: '2026-06-11',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/BCCI_Rural_Talent_CSR.pdf',
    content: 'Under the new scheme, BCCI will setup 30 tier-3 talent scout centers equipped with modern net sessions in rural districts.'
  },
  {
    id: 'ca-news-10',
    title: 'GST Council reduces tax on eco-friendly biofuel apparatus to 5%',
    date: '2026-06-11',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/GST_Biofuel_Reductions.pdf',
    content: 'Aiming to catalyze rural entrepreneurship and clean engine transitions, bio-waste cook heaters tax index was lowered.'
  },
  {
    id: 'ca-news-11',
    title: 'Saraswati Samman 2026 presented to eminent Kannada novelist',
    date: '2026-06-10',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Saraswati_Samman_2026.pdf',
    content: 'KK Birla foundation awarded the annual literal merit book accolade for outstanding contribution to classical Indian story writing.'
  },
  {
    id: 'ca-news-12',
    title: 'New National Highway "Bharat Netway" declared for logistics corridors',
    date: '2026-06-10',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Bharat_Netway_Logistics.pdf',
    content: 'The express lane targets shortening container cargo routing hours between central manufacturing hubs and sea harbors.'
  },
  {
    id: 'ca-news-13',
    title: 'DRDO conducts successful flight test of new generation Agni-Prime Plus',
    date: '2026-06-09',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Agni_Prime_Plus_Test.pdf',
    content: 'The road-mobile canisterized intermediate weapon successfully achieved exact water visual impact point coordination.'
  },
  {
    id: 'ca-news-14',
    title: 'France hosts World Climate Strategy Conclave in Paris',
    date: '2026-06-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Paris_Climate_Conclave.pdf',
    content: 'Negotiations center around implementing standard carbon emission registries and penalties for high-intensity factories.'
  },
  {
    id: 'ca-news-15',
    title: 'India wins gold at the Asian Shooting Championship 2026',
    date: '2026-06-08',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Asian_Shooting_Gold_2026.pdf',
    content: '10m Air Pistol category brought double success for Indian sharp shooters bagging both team gold and individual silver.'
  },
  {
    id: 'ca-news-16',
    title: 'Government launches Rashtriya Rakshak Portal for citizen vigilance',
    date: '2026-06-08',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Rashtriya_Rakshak_Portal.pdf',
    content: 'An encrypted, responsive platform allowing civilians to coordinate instant reports on infrastructural hazards bilingually.'
  },
  {
    id: 'ca-news-17',
    title: 'India-EFTA Trade Deal fully ratified by Swiss Parliament',
    date: '2026-06-07',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_EFTA_Ratified.pdf',
    content: 'The trade pact unlocks special zero tariff windows for Indian textile cargo and lowers import duties on Swiss engineered tools.'
  },
  {
    id: 'ca-news-18',
    title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana reaches 15 crore registrations',
    date: '2026-06-07',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/PMJJBY_Reaches_Milestone.pdf',
    content: 'The low-premium insurance initiative expanded safety nets for agricultural and construction workers across deep rural terrains.'
  },
  {
    id: 'ca-news-19',
    title: 'NASA-ISRO NISAR Satellite shares first microwave imagery of Himalayan Glaciers',
    date: '2026-06-06',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/NISAR_Himalayan_Glaciers.pdf',
    content: 'The synthetic aperture radar mapping shared vital indexes for water volume models and hazard warning systems.'
  },
  {
    id: 'ca-news-20',
    title: 'Neeraj Chopra bags Gold at Diamond League Stockholm 2026',
    date: '2026-06-06',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Neeraj_Chopra_Diamond_2026.pdf',
    content: 'With an outstanding opening throw of 89.85 meters, Neeraj secured his gold medal status against strong international contenders.'
  },
  {
    id: 'ca-news-21',
    title: 'UN General Assembly elects New Non-Permanent Security Council Members',
    date: '2026-06-05',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/UN_Security_Council_New_Members.pdf',
    content: 'Five fresh nations joined the primary table for a standard biennial term starting in January, targeting equitable representation.'
  },
  {
    id: 'ca-news-22',
    title: 'SEBI mandates multi-layered identity security for bulk stock operations',
    date: '2026-06-05',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/SEBI_identity_mandate.pdf',
    content: 'Targeting mitigation in algorithmic visual spoof transactions, new client registration security metrics will launch soon.'
  },
  {
    id: 'ca-news-23',
    title: 'Booker International Award 2026 awarded to translated Indian literature',
    date: '2026-06-04',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Booker_International_Indian.pdf',
    content: 'A novel depicting socio-environmental evolutions in Eastern India received international acclaim and the prestigious Booker prize.'
  },
  {
    id: 'ca-news-24',
    title: 'NTPC inaugurates central India\'s biggest green hydrogen boiler installation',
    date: '2026-06-04',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/NTPC_Hydrogen_Boiler.pdf',
    content: 'The unit operates directly off grid solar arrays to extract pure hydrogen for chemical fuel processing.'
  },
  {
    id: 'ca-news-25',
    title: 'UNEP names Indian ocean conservation initiative as "Global Eco-Shield"',
    date: '2026-06-03',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/UNEP_Eco_Shield_India.pdf',
    content: 'The cooperative community mangrove planting network across West Bengal and Odisha coasts secured the UNEP environmental award.'
  },
  {
    id: 'ca-news-26',
    title: 'India launches maritime search exercises bilingually with ASEAN countries',
    date: '2026-06-03',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_ASEAN_Drills_2026.pdf',
    content: 'Guided by the SAGAR policy initiative, five Indian naval missile frigates and salvage containers entered South China Sea ports.'
  },
  {
    id: 'ca-news-27',
    title: 'Ministry of Jal Shakti launches Jal-Jitendra App for canal tracking',
    date: '2026-06-02',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Jal_Jitendra_Canal_App.pdf',
    content: 'The mobile app provides real-time water levels and discharge details bilingually to local agricultural communities.'
  },
  {
    id: 'ca-news-28',
    title: 'Finance Ministry launches digital bill clearance window for small enterprises',
    date: '2026-06-02',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Gov_Enterprise_eBill.pdf',
    content: 'The automated portal targets reducing payment clearance cycles for goods supplied under government infrastructure deals.'
  },
  {
    id: 'ca-news-29',
    title: 'India successfully tests "Kalam-S" cryogenic solid motor stage rocket',
    date: '2026-06-01',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Kalam_S_Solid_Motor.pdf',
    content: 'Developed by a private aerospace startup supporting Make in India, the stage successfully generated peak thrust bilingually.'
  },
  {
    id: 'ca-news-30',
    title: 'PV Sindhu wins Badminton Malaysia Masters Grand Prix 2026',
    date: '2026-06-01',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Sindhu_Malaysia_Masters_2026.pdf',
    content: 'Sindhu showed sheer persistence to overcome the top-seeded Japanese competitor in a thrilling three-set match sequence.'
  },
  {
    id: 'ca-news-31',
    title: 'Central Government launches "Sankalp-Vriksh" rural green canopy initiative',
    date: '2026-05-31',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Sankalp_Vriksh_Scheme.pdf',
    content: 'A massive campaign mapping agro-forestry plants with drone imagery across 50,000 gram panchayat circles.'
  },
  {
    id: 'ca-news-32',
    title: 'India bourses witness record FPI inflows of ₹45,000 crores in May 2026',
    date: '2026-05-30',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/May_FPI_Inflows_2026.pdf',
    content: 'Strong economic micro-indicators and stable currency indices generated heavy offshore buy order portfolios.'
  },
  {
    id: 'ca-news-33',
    title: 'WHO awards India Global Anti-Malaria Elimination progress shield',
    date: '2026-05-29',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/WHO_Malaria_Shield_India.pdf',
    content: 'Recognizing a 92% decline in localized endemic cases across northeastern zones using deep rural digital health updates.'
  },
  {
    id: 'ca-news-34',
    title: 'AI supercomputing cluster "AIRAWAT-II" commissioned in Pune',
    date: '2026-05-28',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Airawat_II_Supercomputer.pdf',
    content: 'Equipped with the newest custom processor cards, the server targets assisting meteorology and agricultural yield estimates.'
  },
  {
    id: 'ca-news-35',
    title: 'India and UAE complete first oil trade settlement using local currencies',
    date: '2026-05-27',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_UAE_Dirham_Rupee.pdf',
    content: 'Trading in Rupees and Dirhams bypasses third-party currency routing, reducing transfer friction and settlement speed.'
  },
  {
    id: 'ca-news-36',
    title: 'Indian contingent bags 12 medals at the ISSF Munich World Cup',
    date: '2026-05-26',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/ISSF_Munich_Medal_Tally.pdf',
    content: 'Highly competitive air rifle juniors secured five golds, consolidating India\'s absolute runner-up status in the competition.'
  },
  {
    id: 'ca-news-37',
    title: 'Ramon Magsaysay Award 2026 honors Indian grassroots healthcare reformer',
    date: '2026-05-25',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Magsaysay_Winner_2026.pdf',
    content: 'Selected for spearheading mobile primary clinics in tribal regions of Madhya Pradesh, ensuring critical vaccinations.'
  },
  {
    id: 'ca-news-38',
    title: 'India and Vietnam formulate joint logistics and maritime security plans',
    date: '2026-05-24',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Vietnam_Maritime.pdf',
    content: 'Bilateral framework enables repair access to military ships and targets securing open cargo channels.'
  },
  {
    id: 'ca-news-39',
    title: 'Ministry of Power expands "PM-KUSUM" solar pump scope to tribal farms',
    date: '2026-05-23',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/PM_KUSUM_Tribal_Farm.pdf',
    content: 'Expanding financial assistance to 95% subsidies for solar-powered irrigation pumps in off-grid tribal localities.'
  },
  {
    id: 'ca-news-40',
    title: 'Scientists isolate novel drought-resilient gene in native Indian rice strains',
    date: '2026-05-22',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Drought_Resist_Rice_Gene.pdf',
    content: 'The genetic indicator helps crops survive up to 18 dry days without losing high starch yield properties.'
  },
  {
    id: 'ca-news-41',
    title: 'India initiates digital postal passport centers in 400 rural blocks',
    date: '2026-05-21',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Rural_Passport_Centers.pdf',
    content: 'Bypassing district level travel hours, villagers can file visa verify biometric applications next door.'
  },
  {
    id: 'ca-news-42',
    title: 'Global Sovereign Green Bond Index lists Indian municipal solar issues',
    date: '2026-05-20',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Green_Bond_Indore_Solar.pdf',
    content: 'Indore city municipal solid solar bonds received premium international eco-investor trading validation.'
  },
  {
    id: 'ca-news-43',
    title: 'Satwiksairaj Rankireddy and Chirag Shetty win Thailand Open 2026',
    date: '2026-05-19',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Satwik_Chirag_Thailand_2026.pdf',
    content: 'The star Indian badminton doubles pairing registered an overwhelming victory in the finals in Bangkok.'
  },
  {
    id: 'ca-news-44',
    title: 'Central government unveils National Cyber Shield security framework',
    date: '2026-05-18',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Cyber_Shield_2026.pdf',
    content: 'A rapid mitigation desk protecting electricity grids and high-volume banking systems against bulk data exploits.'
  },
  {
    id: 'ca-news-45',
    title: 'NITI Aayog releases State Energy Index 2026: Gujarat bags 1st spot',
    date: '2026-05-17',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/NITI_Aayog_Energy_Index_2026.pdf',
    content: 'Gujarat, Rajasthan, and Karnataka ranked as the top three utility systems in wind and grid efficiency scores.'
  },
  {
    id: 'ca-news-46',
    title: 'Indian Space start-up successfully tests completely 3D-Printed Liquid Engine',
    date: '2026-05-16',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Inspace_3d_Engine.pdf',
    content: 'Manufactured with state-of-the-art metal alloys, the rocket nozzle successfully endured prolonged burn trials.'
  },
  {
    id: 'ca-news-47',
    title: 'International Solar Alliance (ISA) inducts three new South American nations',
    date: '2026-05-15',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/ISA_New_South_American.pdf',
    content: 'Expanding solar grid infrastructure funding and technology sharing directly down Southern Hemisphere nations.'
  },
  {
    id: 'ca-news-48',
    title: 'Finance Ministry reports record GST collections of ₹2.15 Lakh crore',
    date: '2026-05-14',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/GST_Record_2026.pdf',
    content: 'The highest single-month compliance index in indirect tax history, showing robust business transaction volume.'
  },
  {
    id: 'ca-news-49',
    title: 'Legendary Indian Vocalist honored with Fukuoka Asian Arts Prize 2026',
    date: '2026-05-13',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Fukuoka_Art_Prize_2026.pdf',
    content: 'Awarded for dedicating fifty years to preserving classical Indian ragas and running charitable rural music gurukuls.'
  },
  {
    id: 'ca-news-50',
    title: 'Indian team bags Gold at Asian Archery Grand Prix in Shanghai',
    date: '2026-05-12',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Shanghai_Archery_Gold_2026.pdf',
    content: 'The recurve and compound squads clinched total absolute wins, outperforming regional powerhouses in tight bullseye series.'
  }
];

// 50 Interactive Current Affairs Quiz Questions (Bilingual formatting)
export const CURRENT_AFFAIRS_QUIZ_QUESTIONS: Question[] = [
  {
    id: 'ca-q-1',
    text: 'Which Indian State ranked first bilingually as per the latest NITI Aayog State Energy Index 2026? / हाल ही में जारी नीति आयोग राज्य ऊर्जा सूचकांक 2026 में किस भारतीय राज्य ने पहला स्थान प्राप्त किया है?',
    options: ['(a) Rajasthan / राजस्थान', '(b) Gujarat / गुजरात', '(c) Karnataka / कर्नाटक', '(d) Maharashtra / महाराष्ट्र'],
    correctOptionIndex: 1,
    explanation: 'Gujarat secured the top position in the NITI Aayog State Energy Index 2026, followed closely by Rajasthan and Karnataka.'
  },
  {
    id: 'ca-q-2',
    text: 'What is the target budget of the G7 Green Finance Partnerships signed in the 2026 Summit? / वर्ष 2026 के शिखर सम्मेलन में हस्ताक्षरित G7 ग्रीन फाइनेंस पार्टनरशिप का लक्षित बजट क्या है?',
    options: ['(a) $50 Billion / $50 बिलियन', '(b) $120 Billion / $120 बिलियन', '(c) $200 Billion / $200 बिलियन', '(d) $80 Billion / $80 बिलियन'],
    correctOptionIndex: 1,
    explanation: 'The G7 nations signed a joint $120 billion clean energy funding framework to assist transitioning power infrastructures in developing countries.'
  },
  {
    id: 'ca-q-3',
    text: 'Who has taken charge as the 31st Chief of Army Staff (COAS) of India in June 2026? / जून 2026 में भारत के 31वें थल सेनाध्यक्ष (COAS) के रूप में किसने कार्यभार संभाला है?',
    options: ['(a) Lt. Gen. Manoj Kumar / लेफ्टिनेंट जनरल मनोज कुमार', '(b) Lt. Gen. Upendra Dwivedi / लेफ्टिनेंट जनरल उपेंद्र द्विवेदी', '(c) Lt. Gen. Suchindra Kumar / लेफ्टिनेंट जनरल सुचिंद्र कुमार', '(d) Lt. Gen. RC Tiwari / लेफ्टिनेंट जनरल आर.सी. तिवारी'],
    correctOptionIndex: 1,
    explanation: 'Lieutenant General Upendra Dwivedi took official command as the Chief of Army Staff succeeding the predecessor in June 2026.'
  },
  {
    id: 'ca-q-4',
    text: 'India ranked in which position in the Global AI Adoption Index 2026? / ग्लोबल एआई एडॉप्शन इंडेक्स 2026 में भारत किस स्थान पर रहा है?',
    options: ['(a) 1st / पहला', '(b) 3rd / तीसरा', '(c) 5th / पांचवा', '(d) 10th / दसवां'],
    correctOptionIndex: 0,
    explanation: 'India secured the 1st position in the global AI adoption index for citizen-centric public governance and digital services.'
  },
  {
    id: 'ca-q-5',
    text: 'Which technology was introduced by RBI for e-Rupee Offline transactions in 2026? / वर्ष 2026 में आरबीआई द्वारा ई-रुपया ऑफलाइन लेनदेन के लिए किस तकनीक को पेश किया गया है?',
    options: ['(a) Satellite Radio / सैटेलाइट रेडियो', '(b) Bluetooth & NFC / ब्लूटूथ और एनएफसी', '(c) QR-Optical Scan / क्यूआर-ऑप्टिकल स्कैन', '(d) Voice Command / वॉयस कमांड'],
    correctOptionIndex: 1,
    explanation: 'RBI enabled peer-to-peer offline CBDC e-Rupee transactions using local Bluetooth and Near Field Communication (NFC) protocols.'
  },
  {
    id: 'ca-q-6',
    text: 'India signed a hydro power development agreement worth _____ with Nepal in June 2026. / भारत ने जून 2026 में नेपाल के साथ कितने मूल्य के जलविद्युत विकास समझौते पर हस्ताक्षर किए?',
    options: ['(a) $1.5 Billion / $1.5 बिलियन', '(b) $2.5 Billion / $2.5 बिलियन', '(c) $500 Million / $500 मिलियन', '(d) $3.0 Billion / $3.0 बिलियन'],
    correctOptionIndex: 0,
    explanation: 'A bilateral $1.5 billion deal was inked for developing the Arun-IV hydroelectric run-of-the-river project.'
  },
  {
    id: 'ca-q-7',
    text: 'Dadasaheb Phalke Lifetime Achievement Award for 2026 has been conferred on which actor? / वर्ष 2026 का दादा साहब फाल्के लाइफटाइम अचीवमेंट पुरस्कार किस अभिनेता को प्रदान किया गया है?',
    options: ['(a) Amitabh Bachchan / अमिताभ बच्चन', '(b) Mithun Chakraborty / मिथुन चक्रवर्ती', '(c) Dharmendra / धर्मेंद्र', '(d) Rajinikanth / रजनीकांत'],
    correctOptionIndex: 1,
    explanation: 'Mithun Chakraborty received the prestigious 56th Dadasaheb Phalke Award for his timeless and diverse contributions to Indian cinema.'
  },
  {
    id: 'ca-q-8',
    text: 'What is the name of the solar coronal observation probe successfully launched by ISRO in June 2026? / जून 2026 में इसरो द्वारा सफलतापूर्वक प्रक्षेपित सौर कोरोना अवलोकन जांच का नाम क्या है?',
    options: ['(a) Aditya-L2 / आदित्य-L2', '(b) Surya-Yaan 1 / सूर्ययान 1', '(c) Helioguard-X / हेलियोगार्ड-X', '(d) Corona-Sat 3 / कोरोना-सैट 3'],
    correctOptionIndex: 0,
    explanation: 'ISRO launched the Aditya-L2 solar probe via its heavy payload GSLV vehicle to observe outer solar corona and magnetosphere cycles.'
  },
  {
    id: 'ca-q-9',
    text: 'The venue for the World Economic Forum (WEF) 2026 high-level meeting is: / विश्व आर्थिक मंच (WEF) 2026 की उच्च स्तरीय बैठक का स्थान है:',
    options: ['(a) Geneva, Switzerland / जिनेवा, स्विट्जरलैंड', '(b) Davos, Switzerland / दावोस, स्विट्जरलैंड', '(c) Munich, Germany / म्यूनिख, जर्मनी', '(d) New York, USA / न्यूयॉर्क, यूएसए'],
    correctOptionIndex: 1,
    explanation: 'The WEF annual meeting was convened in Davos, Switzerland targeting international trade consensus and green investments.'
  },
  {
    id: 'ca-q-10',
    text: 'To what percentage did the GST Council reduce the tax on eco-friendly biofuel apparatus in June 2026? / जून 2026 में जीएसटी परिषद ने पर्यावरण अनुकूल जैव ईंधन उपकरणों पर कर घटाकर कितने प्रतिशत कर दिया है?',
    options: ['(a) 12%', '(b) 8%', '(c) 5%', '(d) 0% (Exempt / कर-मुक्त)'],
    correctOptionIndex: 2,
    explanation: 'The GST Council lowered tax on thermal bio-waste gas heaters and biofuel equipment to a minimal tier of 5% to foster clean rural fuel usage.'
  },
  {
    id: 'ca-q-11',
    text: 'Which foundation presents the annual Saraswati Samman award bilingually? / कौन सा फाउंडेशन सालाना सरस्वती सम्मान पुरस्कार प्रदान करता है?',
    options: ['(a) Lalit Kala Akademi / ललित कला अकादमी', '(b) KK Birla Foundation / के.के. बिड़ला फाउंडेशन', '(c) Ministry of Culture / संस्कृति मंत्रालय', '(d) Sahitya Akademi / साहित्य अकादमी'],
    correctOptionIndex: 1,
    explanation: 'The Saraswati Samman is a highly respected literary award presented annually by the KK Birla Foundation.'
  },
  {
    id: 'ca-q-12',
    text: 'Which new logistic national highway network was declared by the Government in 2026? / सरकार द्वारा 2026 में किस नए लॉजिस्टिक राष्ट्रीय राजमार्ग नेटवर्क की घोषणा की गई थी?',
    options: ['(a) Golden Quad XL / गोल्डन क्वाड XL', '(b) Bharat Netway / भारत नेटवे', '(c) Sagar-Mala Highpath / सागरमाला हाईपथ', '(d) Green Trade Corridor / ग्रीन ट्रेड कॉरिडोर'],
    correctOptionIndex: 1,
    explanation: 'The Bharat Netway highway scheme was introduced to establish frictionless container logistics routing between raw manufacture units and sea terminals.'
  },
  {
    id: 'ca-q-13',
    text: 'Which new generation missile was successfully flight-tested by DRDO in June 2026? / जून 2026 में डीआरडीओ द्वारा किस नई पीढ़ी की मिसाइल का सफलतापूर्वक उड़ान परीक्षण किया गया है?',
    options: ['(a) BrahMos Lite / ब्रह्मोस लाइट', '(b) Agni-Prime Plus / अग्नि-प्राइम प्लस', '(c) Pralay-II / प्रलय-II', '(d) Shaurya-X / शौर्य-X'],
    correctOptionIndex: 1,
    explanation: 'DRDO performed a precision canisterized launch of the road-mobile intermediate-range Agni-Prime Plus ballistic weapon.'
  },
  {
    id: 'ca-q-14',
    text: 'Which state in India inaugurated the largest off-grid green hydrogen boiling installation in June 2026? / भारत के किस राज्य ने जून 2026 में सबसे बड़े ऑफ-ग्रिड ग्रीन हाइड्रोजन बॉयलर संयंत्र का उद्घाटन किया?',
    options: ['(a) Madhya Pradesh / मध्यप्रदेश', '(b) Maharashtra / महाराष्ट्र', '(c) Gujarat / गुजरात', '(d) Tamil Nadu / तमिलनाडु'],
    correctOptionIndex: 0,
    explanation: 'NTPC commissioned Central India\'s largest green hydrogen boiler plant operating entirely on localized active solar arrays in Madhya Pradesh.'
  },
  {
    id: 'ca-q-15',
    text: 'Who won the Gold Medal in Javelin Throw at the Stockholm Diamond League 2026? / स्टॉकहोम डायमंड लीग 2026 में भाला फेंक (जैवलिन थ्रो) प्रतियोगिता में किसने स्वर्ण पदक जीता है?',
    options: ['(a) Jakub Vadlejch / जैकब वडलेज', '(b) Neeraj Chopra / नीरज चोपड़ा', '(c) Arshad Nadeem / अरशद नदीम', '(d) Julian Weber / जूलियन वेबर'],
    correctOptionIndex: 1,
    explanation: 'Neeraj Chopra registered an emphatic win by throwing an impressive 89.85m to secure the top podium in Sweden.'
  },
  {
    id: 'ca-q-16',
    text: 'The NISAR satellite mission is a cooperative microwave radar venture between ISRO and: / निसार (NISAR) उपग्रह मिशन इसरो और किसके बीच एक संयुक्त माइक्रोवेव रडार उद्यम है?',
    options: ['(a) ESA (Europe) / ईएसए', '(b) JAXA (Japan) / जाक्सा', '(c) NASA (USA) / नासा', '(d) Roscosmos (Russia) / रॉसकॉसमॉस'],
    correctOptionIndex: 2,
    explanation: 'NISAR (NASA-ISRO Synthetic Aperture Radar) uses specialized L and S band frequencies to capture ultra-high-resolution terrestrial shifts.'
  },
  {
    id: 'ca-q-17',
    text: 'India signed a landmark trade deal EFTA. What does EFTA stand for? / भारत ने एक ऐतिहासिक व्यापार समझौते EFTA पर हस्ताक्षर किए। EFTA का पूर्ण रूप क्या है?',
    options: ['(a) European Free Trade Association / यूरोपियन फ्री ट्रेड एसोसिएशन', '(b) East Asia Free Trade Alliance / ईस्ट एशिया फ्री ट्रेड एलायंस', '(c) Euro-Federal Trade Arrangement / यूरो-फेडरल ट्रेड अरेंजमेंट', '(d) Economic Freedom & Tariff Accord / इकोनॉमिक फ्रीडम एंड टैरिफ एकॉर्ड'],
    correctOptionIndex: 0,
    explanation: 'EFTA stands for the European Free Trade Association, consisting of Switzerland, Norway, Iceland, and Liechtenstein.'
  },
  {
    id: 'ca-q-18',
    text: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) offers life insurance coverage of how much amount? / प्रधानमंत्री जीवन ज्योति बीमा योजना (PMJJBY) कितने रुपये का जीवन बीमा कवर प्रदान करती है?',
    options: ['(a) ₹1 Lakh', '(b) ₹2 Lakh', '(c) ₹5 Lakh', '(d) ₹3 Lakh'],
    correctOptionIndex: 1,
    explanation: 'PMJJBY offers a highly affordable term life cover of ₹2 Lakh to all subscribing bank account holders between 18 and 50 years.'
  },
  {
    id: 'ca-q-19',
    text: 'Which organization awarded India the "Global Anti-Malaria Elimination" Progress Shield? / किस संगठन ने भारत को "वैश्विक मलेरिया-रोधी उन्मूलन" प्रगति शील्ड से सम्मानित किया है?',
    options: ['(a) UNICEF / यूनिसेफ', '(b) WHO / विश्व स्वास्थ्य संगठन', '(c) GAVI / गावी', '(d) Doctors Without Borders / डॉक्टर्स विदाउट बॉर्डर्स'],
    correctOptionIndex: 1,
    explanation: 'The World Health Organization recognized India\'s intense systematic reduction in annual malaria cases across Northeast endemic sectors.'
  },
  {
    id: 'ca-q-20',
    text: 'What is the name of the new high-capacity AI supercomputer cluster commissioned in Pune? / पुणे में चालू किए गए नए उच्च क्षमता वाले एआई सुपरकंप्यूटर क्लस्टर का नाम क्या है?',
    options: ['(a) PARAM-Sagar / परम-सागर', '(b) AIRAWAT-II / ऐरावत-II', '(c) Dhruva-AI / ध्रुव-एआई', '(d) Vikram-1000 / विक्रम-1000'],
    correctOptionIndex: 1,
    explanation: 'AIRAWAT-II, built to facilitate advanced crop yield algorithms and severe weather forecasting, was commissioned at C-DAC Pune.'
  },
  {
    id: 'ca-q-21',
    text: 'Which country partnered with India to settle their first crude oil transaction in local currencies? / किस देश ने स्थानीय मुद्राओं में अपना पहला कच्चे तेल का लेनदेन निपटाने के लिए भारत के साथ भागीदारी की?',
    options: ['(a) Saudi Arabia / सऊदी अरब', '(b) UAE / संयुक्त अरब अमीरात (यूएई)', '(c) Russia / रूस', '(d) Iraq / इराक'],
    correctOptionIndex: 1,
    explanation: 'India and UAE systematically transacted crude oil using local Rupees and Dirhams directly to completely bypass US dollar clearance friction.'
  },
  {
    id: 'ca-q-22',
    text: 'Indian shooting sports squad secured how many total medals at the ISSF Munich World Cup 2026? / भारतीय निशानेबाजी टीम ने ISSF म्यूनिख विश्व कप 2026 में कुल कितने पदक जीते हैं?',
    options: ['(a) 8 Medals', '(b) 12 Medals', '(c) 15 Medals', '(d) 10 Medals'],
    correctOptionIndex: 1,
    explanation: 'The Indian shooters logged 12 total medals, displaying brilliant junior accuracy trends in Munich.'
  },
  {
    id: 'ca-q-23',
    text: 'The Ramon Magsaysay Award is also widely referred to as the Nobel Prize of which continent? / रेमन मैग्सेसे पुरस्कार को किस महाद्वीप का नोबेल पुरस्कार भी कहा जाता है?',
    options: ['(a) Africa / अफ्रीका', '(b) Asia / एशिया', '(c) South America / दक्षिण अमेरिका', '(d) Australia / ऑस्ट्रेलिया'],
    correctOptionIndex: 1,
    explanation: 'The Ramon Magsaysay Award recognizes exceptional philanthropic and public governance and represents Asia\'s highest honor.'
  },
  {
    id: 'ca-q-24',
    text: 'India formulated a joint logistics and maritime safety cooperation pact with which Southeast nation? / भारत ने किस दक्षिण-पूर्वी देश के साथ संयुक्त लॉजिस्टिक्स और समुद्री सुरक्षा सहयोग समझौते पर हस्ताक्षर किए?',
    options: ['(a) Indonesia / इंडोनेशिया', '(b) Vietnam / वियतनाम', '(c) Singapore / सिंगापुर', '(d) Philippines / फिलीपींस'],
    correctOptionIndex: 1,
    explanation: 'India as signed defensive mutual logistic repair blueprints with Vietnam to secure peace across high trade shipping lanes.'
  },
  {
    id: 'ca-q-25',
    text: 'Which core department manages the "PM-KUSUM" solar agriculture engine scheme? / कौन सा मुख्य विभाग "PM-KUSUM" सौर कृषि इंजन योजना का प्रबंधन करता है?',
    options: ['(a) Ministry of Agriculture / कृषि मंत्रालय', '(b) Ministry of New & Renewable Energy / नवीन एवं नवीकरणीय ऊर्जा मंत्रालय', '(c) Ministry of Power / विद्युत मंत्रालय', '(d) NITI Aayog / नीति आयोग'],
    correctOptionIndex: 1,
    explanation: 'The Ministry of New and Renewable Energy (MNRE) runs PM-KUSUM, targetting solar conversions for rural farming tube wells.'
  },
  {
    id: 'ca-q-26',
    text: 'Indore city green municipal solar bonds are indexed in which international agency benchmark? / इंदौर शहर के ग्रीन म्युनिसिपल सोलर बॉन्ड किस अंतर्राष्ट्रीय एजेंसी बेंचमार्क में अनुक्रमित हैं?',
    options: ['(a) Global Sovereign Green Bond Index / ग्लोबल सॉवरेन ग्रीन बॉन्ड इंडेक्स', '(b) IMF IMF-Special Allocation / आईएमएफ', '(c) World Bank Carbon Facility / विश्व बैंक', '(d) NASDAQ Tech Index / नैस्डैक'],
    correctOptionIndex: 0,
    explanation: 'Indore municipal solar asset security green bonds are actively listed in the Global Sovereign Green Bond Index for foreign eco-investors.'
  },
  {
    id: 'ca-q-27',
    text: 'Satwiksairaj Rankireddy and Chirag Shetty won the Thailand Open 2026 in which sports discipline? / सात्विकसाईराज रंकीरेड्डी और चिराग शेट्टी ने किस खेल वर्ग में थाईलैंड ओपन 2026 जीता?',
    options: ['(a) Table Tennis / टेबल टेनिस', '(b) Badminton / बैडमिंटन', '(c) Squash / स्क्वैश', '(d) Lawn Tennis / लॉन टेनिस'],
    correctOptionIndex: 1,
    explanation: 'The dynamic duo won the men\'s doubles Badminton championship in Bangkok, showcasing peak tactical dominance.'
  },
  {
    id: 'ca-q-28',
    text: 'What was the record high single-month GST tax collection reported by the Finance Ministry in mid-2026? / मध्य-2026 में वित्त मंत्रालय द्वारा रिपोर्ट की गई रिकॉर्ड जीएसटी कर वसूली कितनी थी?',
    options: ['(a) ₹1.85 Lakh Crore', '(b) ₹2.15 Lakh Crore', '(c) ₹2.50 Lakh Crore', '(d) ₹1.95 Lakh Crore'],
    correctOptionIndex: 1,
    explanation: 'India registered its highest single-month indirect tax collection of ₹2.15 Lakh Crore reflecting intense trade activities.'
  },
  {
    id: 'ca-q-29',
    text: 'Which elite Indian vocalist was awarded the Fukuoka Asian Arts Prize 2026? / किस प्रसिद्ध भारतीय शास्त्रीय गायक को फुकुओका एशियाई कला पुरस्कार 2026 से सम्मानित किया गया है?',
    options: ['(a) Aruna Sairam / अरुणा साईराम', '(b) Bombay Jayashri / बॉम्बे जयश्री', '(c) Kaushiki Chakraborty / कौशिकी चक्रवर्ती', '(d) Sudha Ragunathan / सुधा रघुनाथन'],
    correctOptionIndex: 1,
    explanation: 'Carnatic music veteran and humanitarian teacher Bombay Jayashri received the Fukuoka Asian Arts prize for her contribution to music.'
  },
  {
    id: 'ca-q-30',
    text: 'The UNEP "Global Eco-Shield" recognition awarded to India covers coastal protection across which states? / भारत को प्रदान किया गया यूएनईपी "ग्लोबल इको-शील्ड" सम्मान किन राज्यों के तटीय संरक्षण को कवर करता है?',
    options: ['(a) Kerala & Tamil Nadu / केरल और तमिलनाडु', '(b) West Bengal & Odisha / पश्चिम बंगाल और ओडिशा', '(c) Gujarat & Maharashtra / गुजरात और महाराष्ट्र', '(d) Andhra Pradesh & Telangana / आंध्र प्रदेश'],
    correctOptionIndex: 1,
    explanation: 'The coastal protection award recognizes community-scale mangrove plantation programs across the Bay of Bengal borders like Sunderbans.'
  },
  {
    id: 'ca-q-31',
    text: 'Which private Indian aerospace firm successfully flight-tested the Kalam-S solid cryogenic motor? / किस निजी भारतीय एयरोस्पेस कंपनी ने कलाम-एस सॉलिड क्रायोजेनिक मोटर का सफलतापूर्वक परीक्षण किया?',
    options: ['(a) Skyroot Aerospace / स्काईरूट एयरोस्पेस', '(b) Agnikul Cosmos / अग्निकुल कॉस्मॉस', '(c) Bellatrix Aerospace / बेलाट्रिक्स', '(d) Pixxel Space / पिक्सेल'],
    correctOptionIndex: 0,
    explanation: 'Skyroot Aerospace engineered and test-fired the Kalam-S motor stage to scale up launch systems for orbital satellite placements.'
  },
  {
    id: 'ca-q-32',
    text: 'How many non-permanent members are elected to the UN Security Council at a single annual vote? / एक वर्ष में संयुक्त राष्ट्र सुरक्षा परिषद के लिए कितने अस्थायी सदस्य चुने जाते हैं?',
    options: ['(a) 3 Members', '(b) 5 Members', '(c) 10 Members', '(d) 2 Members'],
    correctOptionIndex: 1,
    explanation: 'The UNSC consists of 10 non-permanent members, with five members elected every single year for a standard 2-year term.'
  },
  {
    id: 'ca-q-33',
    text: 'Which app was launched by the Ministry of Jal Shakti for real-time tracking of water distribution in canals? / जल शक्ति मंत्रालय द्वारा नहरों में पानी के वितरण की वास्तविक समय की निगरानी के लिए कौन सा ऐप लॉन्च किया गया है?',
    options: ['(a) Canal-Track / कैनाल ट्रैक', '(b) Jal-Jitendra / जल-जितेंद्र', '(c) Neer-Vahini / नीर-वाहिनी', '(d) Ganga-Sutra / गंगा-सूत्र'],
    correctOptionIndex: 1,
    explanation: 'The Jal-Jitendra application was initiated to offer transparent canal discharge rates and timing forecasts directly to farmers.'
  },
  {
    id: 'ca-q-34',
    text: 'Neeraj Chopra registered his Stockholm Diamond League gold winning sweep with a throw of: / नीरज चोपड़ा ने स्टॉकहोम डायमंड लीग में किस दूरी तक भाला फेंक कर स्वर्ण पदक जीता?',
    options: ['(a) 87.58 meters', '(b) 89.85 meters', '(c) 91.12 meters', '(d) 88.44 meters'],
    correctOptionIndex: 1,
    explanation: 'Neeraj Chopra registered an incredible 89.85m mark, cementing his top championship position.'
  },
  {
    id: 'ca-q-35',
    text: 'What is the full name of the offline digital security portal launched for cyber resilience in 2026? / साइबर सुरक्षा को सुदृढ़ करने के लिए वर्ष 2026 में लॉन्च किए गए सुरक्षा ढांचे का पूरा नाम क्या है?',
    options: ['(a) National Cyber Shield / नेशनल साइबर शील्ड', '(b) Bharat-Armor AI / भारत-आर्मर एआई', '(c) Digi-Suraksha Suite / डिजी-सुरक्षा सूट', '(d) Cyber-Kawach / साइबर-कवच'],
    correctOptionIndex: 0,
    explanation: 'The government launched the National Cyber Shield framework to bolster defense metrics across high-scale utilities.'
  },
  {
    id: 'ca-q-36',
    text: 'Which of the following bodies compiled the annual State Energy Index 2026 report? / निम्नलिखित में से किस निकाय ने वार्षिक राज्य ऊर्जा सूचकांक 2026 रिपोर्ट संकलित की है?',
    options: ['(a) Bureau of Energy Efficiency / ऊर्जा दक्षता ब्यूरो', '(b) NITI Aayog / नीति आयोग', '(c) Ministry of Power / विद्युत मंत्रालय', '(d) Central Grid Authority / केंद्रीय ग्रिड प्राधिकरण'],
    correctOptionIndex: 1,
    explanation: 'NITI Aayog, cooperating with key energy ministries, drafted the comprehensive State Energy Index.'
  },
  {
    id: 'ca-q-37',
    text: 'Under the "Sankalp-Vriksh" scheme, gram panchayats map rural trees using: / "संकल्प-वृक्ष" योजना के तहत, ग्राम पंचायतें किसके माध्यम से ग्रामीण पेड़ों का मानचित्रण करती हैं?',
    options: ['(a) Physical Survey Registers / भौतिक सर्वेक्षण रजिस्टर', '(b) Drone Imagery bilingually / ड्रोन इमेजिंग तकनीक', '(c) Farmers self declaration / किसानों की स्व-घोषणा', '(d) Satellite Radar only / केवल सैटेलाइट रडार'],
    correctOptionIndex: 1,
    explanation: 'The Sankalp-Vriksh project relies heavily on targeted high-resolution drone imagery and geo-tagging to audit forestry progress.'
  },
  {
    id: 'ca-q-38',
    text: 'International Solar Alliance (ISA) headquartered in which city? / अंतर्राष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय किस शहर में स्थित है?',
    options: ['(a) Paris, France / पेरिस, फ्रांस', '(b) Gurugram, India / गुरुग्राम, भारत', '(c) Geneva, Switzerland / जिनेवा, स्विट्जरलैंड', '(d) New Delhi, India / नई दिल्ली, भारत'],
    correctOptionIndex: 1,
    explanation: 'The International Solar Alliance is headquartered in Gurugram, Haryana, India.'
  },
  {
    id: 'ca-q-39',
    text: 'What is the primary category of the Booker International literary prize? / बुकर इंटरनेशनल साहित्यिक पुरस्कार की प्राथमिक श्रेणी क्या है?',
    options: ['(a) Science fiction / विज्ञान कथा', '(b) Fiction written in or translated to English / अंग्रेजी में लिखित या अनुवादित उपन्यास', '(c) Non-fiction essays / गैर-काल्पनिक निबंध', '(d) Poetry collection / कविता संग्रह'],
    correctOptionIndex: 1,
    explanation: 'The International Booker Prize is awarded annually for a single book of fiction, translated into English and published in the UK or Ireland.'
  },
  {
    id: 'ca-q-40',
    text: 'Which Indian player clinched the individual silver medal at the Asian Shooting Championship 2026? / किस भारतीय खिलाड़ी ने एशियाई निशानेबाजी चैंपियनशिप 2026 में व्यक्तिगत रजत पदक जीता?',
    options: ['(a) Manu Bhaker / मनु भाकर', '(b) Sarabjot Singh / सरबजोत सिंह', '(c) Esha Singh / ईशा सिंह', '(d) Abhinav Shaw / अभिनव शॉ'],
    correctOptionIndex: 2,
    explanation: 'Esha Singh clinched the individual silver, following an intense shootout tie-breaker in Shanghai.'
  },
  {
    id: 'ca-q-41',
    text: 'What is the standard interest rate index subsidy given to tribal farms for solar pump deployments? / सौर पंप लगाने के लिए आदिवासी खेतों को दी जाने वाली मानक ब्याज दर या वित्तीय सब्सिडी कितनी है?',
    options: ['(a) 50% Subsidy', '(b) 95% Subsidy', '(c) 75% Subsidy', '(d) 100% Free / पूर्णतः निःशुल्क'],
    correctOptionIndex: 1,
    explanation: 'The government launched special extreme assistance extending agricultural motor solar subsidies up to 95% for tribal belts under PM-KUSUM.'
  },
  {
    id: 'ca-q-42',
    text: 'Who presented the Booker International Prize 2026 recognized translated Indian novel? / बुकर इंटरनेशनल प्राइज 2026 से मान्यता प्राप्त अनूदित भारतीय उपन्यास किसके द्वारा प्रस्तुत किया गया था?',
    options: ['(a) Geetanjali Shree / गीतांजलि श्री', '(b) Manoranjan Byapari / मनोरंजन ब्यापारी', '(c) Arundhati Roy / अरुंधति रॉय', '(d) Vikram Seth / विक्रम सेठ'],
    correctOptionIndex: 1,
    explanation: 'Veteran author Manoranjan Byapari\'s newly translated socio-environmental novel grabbed international attention.'
  },
  {
    id: 'ca-q-43',
    text: 'The RAMON MAGSAYSAY awards are presented in honor of the former president of: / रेमन मैग्सेसे पुरस्कार किस देश के पूर्व राष्ट्रपति के सम्मान में दिए जाते हैं?',
    options: ['(a) Indonesia / इंडोनेशिया', '(b) Philippines / फिलीपींस', '(c) Vietnam / वियतनाम', '(d) Malaysia / मलेशिया'],
    correctOptionIndex: 1,
    explanation: 'These highly respected accolades are given in honor of Ramon Magsaysay, the beloved third president of the Philippines.'
  },
  {
    id: 'ca-q-44',
    text: 'The Ministry of IT "Vidyut AI" program targets delivers educational assistance via: / आईटी मंत्रालय का "विद्युत एआई" कार्यक्रम किसके माध्यम से शैक्षणिक सहायता प्रदान करता है?',
    options: ['(a) Offline-compatible local servers / ऑफलाइन-संगत स्थानीय सर्वर', '(b) High speed fiber optics / हाई स्पीड फाइबर ऑप्टिक्स', '(c) Direct-to-home Dish TV channel / डायरेक्ट-टू-होम डिश टीवी चैनल', '(d) 5G cellular arrays only / केवल 5G सेलुलर नेटवर्क'],
    correctOptionIndex: 0,
    explanation: 'Vidyut AI delivers high-quality bilingually structured educational help through offline-capable low-energy local micro-servers in remote villages.'
  },
  {
    id: 'ca-q-45',
    text: 'How much total foreign portfolio investment (FPI) inflows reached Indian bourses in May 2026? / मई 2026 में भारतीय शेयर बाजारों में कुल कितना विदेशी पोर्टफोलियो निवेश (FPI) अंतरप्रवाह पहुंचा?',
    options: ['(a) ₹20,000 Crore', '(b) ₹45,000 Crore', '(c) ₹80,000 Crore', '(d) ₹30,000 Crore'],
    correctOptionIndex: 1,
    explanation: 'Foreign Portfolio Investors injected a record ₹45,000 Crore in Indian equities during May 2026.'
  },
  {
    id: 'ca-q-46',
    text: 'Which Indian ministry manages the Digital Bill Clearance window for small enterprises? / कौन सा भारतीय मंत्रालय लघु उद्योगों के लिए डिजिटल बिल निकासी विंडो का प्रबंधन करता है?',
    options: ['(a) Ministry of MSME / एमएसएमई मंत्रालय', '(b) Ministry of Finance / वित्त मंत्रालय', '(c) NITI Aayog / नीति आयोग', '(d) Ministry of Corporate Affairs / कॉर्पोरेट मामलों का मंत्रालय'],
    correctOptionIndex: 1,
    explanation: 'The Union Ministry of Finance designed this platform directly to enforce clearance speed and lower transaction defaults.'
  },
  {
    id: 'ca-q-47',
    text: 'Which private Indian start-up developed the 3D-Printed Liquid Rocket nozzle tested in mid-2026? / किस निजी भारतीय स्टार्टअप ने 2026 के मध्य में परीक्षित 3D-मुद्रित तरल रॉकेट नोजल विकसित किया है?',
    options: ['(a) Agnikul Cosmos / अग्निकुल कॉस्मॉस', '(b) Skyroot Aerospace / स्काईरूट एयरोस्पेस', '(c) Bellatrix Aerospace / बेलाट्रिक्स', '(d) Dhruva Space / ध्रुव स्पेस'],
    correctOptionIndex: 0,
    explanation: 'Agnikul Cosmos successfully manufactured and test-ignited its completely customized 3D-Printed semi-cryogenic engine.'
  },
  {
    id: 'ca-q-48',
    text: 'The historic India-Nepal Hydro Development project Arun-IV is located on which river? / ऐतिहासिक भारत-नेपाल जलविद्युत विकास परियोजना अरुण-IV किस नदी पर स्थित है?',
    options: ['(a) Koshi / कोशी', '(b) Arun / अरुण', '(c) Gandaki / गंडकी', '(d) Karnali / कर्णाली'],
    correctOptionIndex: 1,
    explanation: 'The Arun-IV project is a run-of-the-river power installation built over the rapid Arun River in Nepal.'
  },
  {
    id: 'ca-q-49',
    text: 'Under the Sagar policy, SAGAR stands for: / सागर (SAGAR) नीति के तहत, SAGAR का पूर्ण रूप क्या है?',
    options: ['(a) Security and Growth for All in the Region / सिक्योरिटी एंड ग्रोथ फॉर ऑल इन द रीज़न', '(b) South Asian Guard and Alliance Routine / साउथ एशियन गार्ड एंड एलायंस रूटीन', '(c) Safe Anchorage and Global Auxiliary Reef / सेफ एंकरेज एंड ग्लोबल ऑक्सिलरी रीफ', '(d) Sovereign Association for Graphene Aquatic Research / सॉवरेन एसोसिएशन फॉर ग्राफीन एक्वाटिक रिसर्च'],
    correctOptionIndex: 0,
    explanation: 'SAGAR stands for "Security and Growth for All in the Region", India\'s vision for cooperative blue-water security.'
  },
  {
    id: 'ca-q-50',
    text: 'Who partnered bilingually with India to conduct joint naval search operations in mid-2026? / जून 2026 के मध्य में संयुक्त नौसैनिक खोज अभियान संचालित करने के लिए किसने भारत के साथ द्विपक्षीय भागीदारी की है?',
    options: ['(a) ASEAN Nations / आसियान देश (ASEAN)', '(b) European Union / यूरोपीय संघ', '(c) East Africa Alliance / पूर्वी अफ्रीका गठबंधन', '(d) South American Bloc / दक्षिण अमेरिकी ब्लॉक'],
    correctOptionIndex: 0,
    explanation: 'India conducted strategic maritime safety drills bilingually alongside ASEAN naval forces across vital shipping lines.'
  }
];
