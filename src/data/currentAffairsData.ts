import { CurrentAffair, Question } from '../types';

// 50 Daily Current Affairs News Items (Bilingual / English-Hindi mix for authenticity)
export const DAILY_CURRENT_AFFAIRS_ITEMS: CurrentAffair[] = [
  {
    id: 'ca-news-j30a',
    title: "India's GST collection reaches all-time high of ₹2.15 Lakh Crore in June 2026 / जून 2026 में भारत का जीएसटी संग्रह ₹2.15 लाख करोड़ के सर्वकालिक उच्च स्तर पर पहुंचा",
    date: '2026-06-30',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/GST_June_Record_2026.pdf',
    content: 'Driven by robust domestic consumption, compliance audits, and commercial growth, the gross GST revenue posted a phenomenal 14% year-on-year growth, breaking all previous receipts records.'
  },
  {
    id: 'ca-news-j30b',
    title: "ISRO's Venus Orbiter Mission 'Shukrayaan' enters crucial assembly phase / इसरो का शुक्र ऑर्बिटर मिशन 'शुक्रयान' महत्वपूर्ण असेंबली चरण में पहुंचा",
    date: '2026-06-30',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/ISRO_Shukrayaan_Venus_2026.pdf',
    content: 'The planetary payload assembly has officially commenced at the UR Rao Satellite Centre. The mission aims to investigate Venusian atmospheric chemistry and ground radar maps by late 2028.'
  },
  {
    id: 'ca-news-j29a',
    title: 'National Statistics Day 2026 celebrated with focus on sustainable data / राष्ट्रीय सांख्यिकी दिवस 2026 सतत डेटा पर ध्यान केंद्रित करने के साथ मनाया गया',
    date: '2026-06-29',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/National_Statistics_Day_2026.pdf',
    content: 'Held annually on the birth anniversary of the legendary statistician Prof. P.C. Mahalanobis, the 2026 theme centered on leveraging real-time data metrics for measuring Sustainable Development Goals (SDGs).'
  },
  {
    id: 'ca-news-j29b',
    title: 'Indian junior hockey team wins Asia Cup 2026 in Muscat / भारतीय जूनियर हॉकी टीम ने मस्कट में एशिया कप 2026 जीता',
    date: '2026-06-29',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Junior_Asia_Cup_Hockey_2026.pdf',
    content: 'The Indian junior team produced a stellar performance to defeat rivals Pakistan in a thrilling penalty shootout in the finals to secure their historic fifth Junior Asia Cup title.'
  },
  {
    id: 'ca-news-j28a',
    title: 'CSIR develops low-cost eco-friendly solar water purification kit / सीएसआईआर ने कम लागत वाली पर्यावरण-अनुकूल सौर जल शोधन किट विकसित की',
    date: '2026-06-28',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/CSIR_Solar_Water_Kit_2026.pdf',
    content: 'The Council of Scientific and Industrial Research (CSIR) has developed a portable, lightweight kit running on miniature solar cells, utilizing UV-C disinfection to provide clean drinking water in rural outposts.'
  },
  {
    id: 'ca-news-j28b',
    title: 'Pradhan Mantri Awas Yojana (PMAY) completes 12 million houses target / प्रधानमंत्री आवास योजना (PMAY) ने 12 मिलियन घरों का लक्ष्य पूरा किया',
    date: '2026-06-28',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/PMAY_Milestone_Report_2026.pdf',
    content: 'The Ministry of Housing and Urban Affairs announced that the monumental milestone of 1.2 crore completed, geo-tagged, and verified smart houses was achieved under the urban-rural scheme.'
  },
  {
    id: 'ca-news-j27a',
    title: "India's digital payment index surges 15% YoY as of mid-2026 / मध्य-2026 तक भारत का डिजिटल भुगतान सूचकांक सालाना 15% बढ़ा",
    date: '2026-06-27',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/RBI_DPI_Report_2026.pdf',
    content: 'Driven by robust growth in UPI transactions, offline wallets, and digital literacy in Tier-3 towns, the Reserve Bank of India\'s Digital Payment Index recorded substantial progress.'
  },
  {
    id: 'ca-news-j27b',
    title: 'India and Vietnam sign strategic defense partnership pact for 2026-2030 / भारत और वियतनाम ने 2026-2030 के लिए रणनीतिक रक्षा साझेदारी समझौते पर हस्ताक्षर किए',
    date: '2026-06-27',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Vietnam_Defense_Pact.pdf',
    content: 'The two countries entered a five-year defense cooperation roadmap focusing on joint coast guard drills, maritime secure communication lines, and sharing key naval logistics.'
  },
  {
    id: 'ca-news-j26a',
    title: 'India launches GSAT-32 communication satellite from Sriharikota / भारत ने श्रीहरिकोटा से GSAT-32 संचार उपग्रह लॉन्च किया',
    date: '2026-06-26',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/GSAT_32_Launch_ISRO.pdf',
    content: 'The Indian Space Research Organisation (ISRO) successfully launched the state-of-the-art GSAT-32 satellite onboard LVM3, designed to boost high-speed broadband services in North-East and deep rural areas.'
  },
  {
    id: 'ca-news-j26b',
    title: "Government launches 'Pradhan Mantri Yuva Rojgar Yojana 2.0' / सरकार ने 'प्रधानमंत्री युवा रोजगार योजना 2.0' शुरू की",
    date: '2026-06-26',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/PMYRY_Launch_Details_2026.pdf',
    content: 'The Ministry of Skill Development initiated PMYRY 2.0 with a massive outlay of ₹12,000 Crore to offer micro-credits, high-end vocational certifications, and modern internship stipends to 50 lakh youth.'
  },
  {
    id: 'ca-news-j25a',
    title: "Adani Green commissions India's largest wind-solar hybrid plant in Rajasthan / अडानी ग्रीन ने राजस्थान में भारत का सबसे बड़ा पवन-सौर हाइब्रिड संयंत्र चालू किया",
    date: '2026-06-25',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Adani_Hybrid_Plant_Rajasthan.pdf',
    content: 'A massive 1.5 GW wind-solar hybrid generation facility was fully integrated into the national grid in Jaisalmer, accelerating India\'s target of achieving 500 GW renewable energy capacity.'
  },
  {
    id: 'ca-news-j25b',
    title: 'Prof. G. Ramanathan awarded the 2026 National Statistics Award / प्रो. जी. रामनाथन को 2026 राष्ट्रीय सांख्यिकी पुरस्कार से सम्मानित किया गया',
    date: '2026-06-25',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/National_Statistics_Award_2026.pdf',
    content: 'The Ministry of Statistics and Programme Implementation honored eminent academic Prof. Ramanathan for his exceptional contributions to stochastic econometric modeling and survey designs.'
  },
  {
    id: 'ca-news-j24a',
    title: "India and France hold joint naval exercise 'Varuna 2026' in Mediterranean Sea / भारत और फ्रांस ने भूमध्य सागर में संयुक्त नौसैनिक अभ्यास 'वरुण 2026' आयोजित किया",
    date: '2026-06-24',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Varuna_Exercise_2026.pdf',
    content: 'Indian stealth destroyers and French aircraft carriers participated in advanced anti-submarine warfare drills, mock helicopter cross-deck landings, and joint maritime corridor patrols.'
  },
  {
    id: 'ca-news-j24b',
    title: "Karnataka becomes first state to mandate 'Green Roofs' for industrial complexes / कर्नाटक औद्योगिक परिसरों के लिए 'ग्रीन रूफ' अनिवार्य करने वाला पहला राज्य बना",
    date: '2026-06-24',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Karnataka_Green_Roof_Policy.pdf',
    content: 'To battle urban heat islands, the state assembly passed a law requiring all new commercial and industrial structures exceeding 50,000 sq ft to reserve at least 30% rooftop space for green vegetative cover.'
  },
  {
    id: 'ca-news-j23a',
    title: 'Deepika Kumari wins Gold at Archery World Cup 2026 in Paris / दीपिका कुमारी ने पेरिस में तीरंदाजी विश्व कप 2026 में स्वर्ण पदक जीता',
    date: '2026-06-23',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Archery_WC_Paris_Gold.pdf',
    content: 'Veteran recurve archer Deepika Kumari displayed masterclass performance, hitting consecutive bullseyes to secure the Gold medal against South Korea\'s top seed in a dramatic shoot-off.'
  },
  {
    id: 'ca-news-j23b',
    title: "Microsoft announces massive AI skill initiative 'Nirmaan' in India / माइक्रोसॉफ्ट ने भारत में विशाल एआई कौशल पहल 'निर्माण' की घोषणा की",
    date: '2026-06-23',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Microsoft_Nirmaan_AI_India.pdf',
    content: 'In collaboration with the Ministry of Education, Microsoft launched Project Nirmaan, intending to train 20 lakh young aspirants in prompt engineering, AI safety, and modern cloud diagnostics.'
  },
  {
    id: 'ca-news-j22a',
    title: "Sikkim receives 'Green State of the Year' award at Global Eco-Tourism Summit / वैश्विक पर्यावरण-पर्यटन शिखर सम्मेलन में सिक्किम को 'ग्रीन स्टेट ऑफ द ईयर' पुरस्कार मिला",
    date: '2026-06-22',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Sikkim_EcoTourism_Award.pdf',
    content: 'Sikkim was recognized internationally for its incredible execution of 100% organic agriculture policies, complete zero-plastic tourism reserves, and community-led biosphere conservation.'
  },
  {
    id: 'ca-news-j22b',
    title: 'CBDT extends PAN-Aadhaar linking deadline with minimal late fees / सीबीडीटी ने न्यूनतम विलंब शुल्क के साथ पैन-आधार लिंक करने की समय सीमा बढ़ाई',
    date: '2026-06-22',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/CBDT_Aadhaar_PAN_Extension.pdf',
    content: 'Providing vital relief to millions of taxpayers, the Central Board of Direct Taxes announced the extension of PAN-Aadhaar biometric integration till September 30, 2026.'
  },
  {
    id: 'ca-news-j21a',
    title: '12th International Day of Yoga celebrated globally with massive gatherings / 12वां अंतर्राष्ट्रीय योग दिवस वैश्विक स्तर पर विशाल सभाओं के साथ मनाया गया',
    date: '2026-06-21',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Yoga_Day_Global_2026.pdf',
    content: 'Aligning with the theme "Yoga for Self and Society", millions of practitioners across nations participated in massive open-air yoga exercises from New Delhi to New York.'
  },
  {
    id: 'ca-news-j21b',
    title: 'IIT Madras launches free online Quantum Computing certification program / आईआईटी मद्रास ने मुफ्त ऑनलाइन क्वांटम कंप्यूटिंग प्रमाणन कार्यक्रम शुरू किया',
    date: '2026-06-21',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/IIT_Madras_Quantum_Course.pdf',
    content: 'IIT Madras, in joint coordination with IBM Research, announced a fully open-source 12-week certificate course to cultivate deep computing talent in quantum theory and hardware mechanics.'
  },
  {
    id: 'ca-news-j20a',
    title: 'India and Japan sign MoU on semiconductor supply chain resilience / भारत और जापान ने सेमीकंडक्टर आपूर्ति श्रृंखला लचीलेपन पर समझौता ज्ञापन पर हस्ताक्षर किए',
    date: '2026-06-20',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Japan_Semiconductor_MoU.pdf',
    content: 'The bilateral pact includes comprehensive exchange programs for deep-tech hardware scholars, joint design layouts, and fast-tracked export-import lanes for high-purity silicon.'
  },
  {
    id: 'ca-news-j20b',
    title: "Ministry of Jal Shakti declares 5,000 more villages 'ODF Plus Model' / जल शक्ति मंत्रालय ने 5,000 और गांवों को 'ओडीएफ प्लस मॉडल' घोषित किया",
    date: '2026-06-20',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Jal_Shakti_ODF_Plus_Report.pdf',
    content: 'Under the ongoing Swachh Bharat Mission (Grameen), 5,000 additional districts successfully integrated solid waste recycling hubs, graywater filter wells, and complete tap connectivity.'
  },
  {
    id: 'ca-news-j19a',
    title: 'Reserve Bank of India retains repo rate at 6.5% in bi-monthly review / भारतीय रिजर्व बैंक ने द्विमासिक समीक्षा में रेपो दर को 6.5% पर बरकरार रखा',
    date: '2026-06-19',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/RBI_MPC_June_2026.pdf',
    content: 'The Monetary Policy Committee decided to maintain the benchmark lending rate at 6.5% to ensure inflation targets align comfortably while sustaining industrial output expansion.'
  },
  {
    id: 'ca-news-j19b',
    title: "DRDO successfully test-fires advanced portable air defence missile 'VSHORADS' / डीआरडीओ ने उन्नत पोर्टेबल वायु रक्षा मिसाइल 'VSHORADS' का सफल परीक्षण किया",
    date: '2026-06-19',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/DRDO_VSHORADS_Test_2026.pdf',
    content: 'The Defence Research and Development Organisation (DRDO) validated cutting-edge terminal homing coordinates in a successful flight test from a ground-based launcher off Chandipur, Odisha.'
  },
  {
    id: 'ca-news-j18a',
    title: "World's oldest cave painting discovered on Indonesian island dating 51,200 years / इंडोनेशियाई द्वीप पर 51,200 साल पुरानी दुनिया की सबसे पुरानी गुफा पेंटिंग खोजी गई",
    date: '2026-06-18',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Oldest_Cave_Painting_Indo.pdf',
    content: 'Using high-precision laser ablation uranium-series dating methods, archaeologists uncovered a narrative scene portraying humans interacting with pigs in a limestone cave in Sulawesi.'
  },
  {
    id: 'ca-news-j18b',
    title: 'Hima Das clinches Gold in 200m at National Inter-State Athletics Meet / हिमा दास ने राष्ट्रीय अंतर-राज्यीय एथलेटिक्स मीट में 200 मीटर में स्वर्ण पदक जीता',
    date: '2026-06-18',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Hima_Das_Gold_200m_2026.pdf',
    content: 'Assam sprinter Hima Das clocked a blistering 23.12 seconds in the 200-meter dash event, clinching the gold medal and comfortably exceeding the elite international qualification indices.'
  },
  {
    id: 'ca-news-j17a',
    title: "UN Environment Programme welcomes India's 'Ek Ped Maa Ke Naam' campaign / संयुक्त राष्ट्र पर्यावरण कार्यक्रम ने भारत के 'एक पेड़ माँ के नाम' अभियान का स्वागत किया",
    date: '2026-06-17',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/UN_EP_EkPed_Campaign_2026.pdf',
    content: 'The UNEP praised India\'s massive tree plantation initiative aimed at enhancing urban micro-forest reserves, replenishing dried aquifers, and expanding green cover near interstate express highways.'
  },
  {
    id: 'ca-news-j17b',
    title: "India's foreign exchange reserves hit a historic high of $655 Billion / भारत का विदेशी मुद्रा भंडार $655 बिलियन के ऐतिहासिक उच्च स्तर पर पहुंचा",
    date: '2026-06-17',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Forex_Reserves_Record_2026.pdf',
    content: 'The Reserve Bank of India reported that heavy foreign portfolio inflows and solid trade balances elevated national reserves by $4.2 Billion in a single trading week to reach $655 Billion.'
  },
  {
    id: 'ca-news-j16a',
    title: "Uttar Pradesh introduces new 'E-Vehicle Promotion Policy 2.0' / उत्तर प्रदेश ने नई 'ई-वाहन प्रोत्साहन नीति 2.0' पेश की",
    date: '2026-06-16',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/UP_EV_Policy_2026.pdf',
    content: 'To foster carbon-free travel, the UP government passed a landmark policy providing 100% road tax waiver and direct subsidies up to ₹1 Lakh for early electric buyers.'
  },
  {
    id: 'ca-news-j16b',
    title: 'Neeraj Chopra secures Gold at Paavo Nurmi Games 2026 / नीरज चोपड़ा ने पावो नूरमी गेम्स 2026 में स्वर्ण पदक जीता',
    date: '2026-06-16',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Neeraj_Chopra_Paavo_Nurmi_2026.pdf',
    content: 'Olympic Champion Neeraj Chopra won the Gold medal in Finland with an incredible opening throw of 89.34 meters, showing outstanding athletic consistency.'
  },
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
    id: 'ca-q-today-1',
    text: 'What is India’s projected GDP growth rate for the financial year 2026-27 as per the latest IMF World Economic Outlook update in June 2026? / जून 2026 में आईएमएफ वर्ल्ड इकोनॉमिक आउटलुक के नवीनतम अपडेट के अनुसार वित्तीय वर्ष 2026-27 के लिए भारत की अनुमानित जीडीपी विकास दर क्या है?',
    options: ['(a) 6.5%', '(b) 6.8%', '(c) 7.0%', '(d) 7.2%'],
    correctOptionIndex: 2,
    explanation: 'The International Monetary Fund (IMF) in its June 2026 outlook projected India\'s GDP growth rate at 7.0% for FY27, citing strong domestic demand.'
  },
  {
    id: 'ca-q-today-2',
    text: 'Which country hosts the 52nd G7 Summit in June 2026? / जून 2026 में 52वें जी7 शिखर सम्मेलन की मेजबानी कौन सा देश कर रहा है?',
    options: ['(a) Italy / इटली', '(b) Canada / कनाडा', '(c) Japan / जापान', '(d) France / फ्रांस'],
    correctOptionIndex: 0,
    explanation: 'The 52nd G7 Summit is hosted by Italy in June 2026, focusing on global green finance and AI cooperation.'
  },
  {
    id: 'ca-q-today-3',
    text: 'Who has been appointed as the new National Security Advisor (NSA) of India in June 2026? / जून 2026 में भारत के नए राष्ट्रीय सुरक्षा सलाहकार (NSA) के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Ajit Doval / अजीत डोभाल', '(b) Pankaj Kumar Singh / पंकज कुमार सिंह', '(c) Vikram Misri / विक्रम मिस्री', '(d) Sanjay Kumar / संजय कुमार'],
    correctOptionIndex: 0,
    explanation: 'Shri Ajit Doval has been re-appointed as the National Security Advisor (NSA) of India with Cabinet rank in June 2026.'
  },
  {
    id: 'ca-q-today-4',
    text: 'What is the theme of International Day of Yoga (IDY) celebrated on June 21, 2026? / 21 जून 2026 को मनाए गए अंतर्राष्ट्रीय योग दिवस (IDY) का विषय क्या है?',
    options: ['(a) Yoga for Self and Society / स्वयं और समाज के लिए योग', '(b) Yoga for Women Empowerment / महिला सशक्तिकरण के लिए योग', '(c) Yoga for Global Harmony / वैश्विक सद्भाव के लिए योग', '(d) Yoga for Health and Peace / स्वास्थ्य और शांति के लिए योग'],
    correctOptionIndex: 0,
    explanation: 'The official theme for the 12th International Day of Yoga on June 21, 2026, is "Yoga for Self and Society".'
  },
  {
    id: 'ca-q-today-5',
    text: 'Which state became the first in India to implement a comprehensive State AI Policy in June 2026? / जून 2026 में व्यापक राज्य एआई नीति (State AI Policy) लागू करने वाला भारत का पहला राज्य कौन सा बना है?',
    options: ['(a) Karnataka / कर्नाटक', '(b) Telangana / तेलंगाना', '(c) Maharashtra / महाराष्ट्र', '(d) Tamil Nadu / तमिलनाडु'],
    correctOptionIndex: 1,
    explanation: 'Telangana has launched its pioneering State AI Policy in June 2026 to foster deep tech startups and safe AI public usage.'
  },
  {
    id: 'ca-q-today-6',
    text: 'Which Indian city is setting up the country’s first fully state-backed Semiconductor Fab unit bilingually? / कौन सा भारतीय शहर देश का पहला पूरी तरह से राज्य समर्थित सेमीकंडक्टर फैब यूनिट स्थापित कर रहा है?',
    options: ['(a) Sanand, Gujarat / साणंद, गुजरात', '(b) Dholera, Gujarat / धोलेरा, गुजरात', '(c) Bengaluru, Karnataka / बेंगलुरु, कर्नाटक', '(d) Noida, Uttar Pradesh / नोएडा, उत्तर प्रदेश'],
    correctOptionIndex: 1,
    explanation: 'Dholera Special Investment Region (SIR) in Gujarat is establishing India\'s first commercial semiconductor fabrication unit.'
  },
  {
    id: 'ca-q-today-7',
    text: 'In June 2026, which country officially joined as the 33rd member of NATO? / जून 2026 में कौन सा देश आधिकारिक तौर पर नाटो (NATO) के 33वें सदस्य के रूप में शामिल हुआ?',
    options: ['(a) Ukraine / यूक्रेन', '(b) Sweden / स्वीडन', '(c) Ireland / आयरलैंड', '(d) Georgia / जॉर्जिया'],
    correctOptionIndex: 1,
    explanation: 'Following ratifications in preceding sessions, Sweden\'s integration was formalized as a key NATO member state.'
  },
  {
    id: 'ca-q-today-8',
    text: 'Which country won the ICC Men\'s T20 World Cup played in June 2026? / जून 2026 में खेले गए आईसीसी पुरुष टी20 विश्व कप को किस देश ने जीता है?',
    options: ['(a) India / भारत', '(b) Australia / ऑस्ट्रेलिया', '(c) South Africa / दक्षिण अफ्रीका', '(d) England / इंग्लैंड'],
    correctOptionIndex: 0,
    explanation: 'The Indian cricket team won the ICC Men\'s T20 World Cup 2026 after defeating Australia in a dramatic final.'
  },
  {
    id: 'ca-q-today-9',
    text: 'What is India’s rank in the World Press Freedom Index 2026 published by Reporters Without Borders? / रिपोर्टर्स विदाउट बॉर्डर्स द्वारा प्रकाशित विश्व प्रेस स्वतंत्रता सूचकांक 2026 में भारत का स्थान क्या है?',
    options: ['(a) 148th / 148वां', '(b) 150th / 150वां', '(c) 159th / 159वां', '(d) 161st / 161वां'],
    correctOptionIndex: 2,
    explanation: 'India secured the 159th position in the World Press Freedom Index 2026 out of 180 countries analyzed.'
  },
  {
    id: 'ca-q-today-10',
    text: 'Which port became the first in India to cross 200 million metric tonnes of cargo handling in a single fiscal year as of mid-2026? / मध्य-2026 तक कौन सा बंदरगाह एक ही वित्तीय वर्ष में 200 मिलियन मीट्रिक टन कार्गो हैंडलिंग को पार करने वाला भारत का पहला बंदरगाह बन गया है?',
    options: ['(a) Mundra Port / मुंद्रा पोर्ट', '(b) Jawaharlal Nehru Port (JNPT) / जवाहरलाल नेहरू पोर्ट', '(c) Paradip Port / पारादीप पोर्ट', '(d) Kandla Port / कांडला पोर्ट'],
    correctOptionIndex: 0,
    explanation: 'Adani Mundra Port crossed the historic 200 MMT cargo handling milestone, cementing its status as India\'s largest private sea port.'
  },
  {
    id: 'ca-q-today-11',
    text: 'Who was sworn in as the Chief Minister of Odisha following the assembly elections in mid-2026? / मध्य-2026 में विधानसभा चुनावों के बाद ओडिशा के मुख्यमंत्री के रूप में किसने शपथ ली है?',
    options: ['(a) Mohan Charan Majhi / मोहन चरण माझी', '(b) Naveen Patnaik / नवीन पटनायक', '(c) Dharmendra Pradhan / धर्मेंद्र प्रधान', '(d) Achyuta Samanta / अच्युत सामंत'],
    correctOptionIndex: 0,
    explanation: 'Shri Mohan Charan Majhi was sworn in as the Chief Minister of Odisha, heading the new assembly administration.'
  },
  {
    id: 'ca-q-today-12',
    text: 'Which public sector enterprise became the 14th Maharatna Company of India in 2026? / कौन सा सार्वजनिक क्षेत्र का उद्यम 2026 में भारत की 14वीं महारत्न कंपनी बना है?',
    options: ['(a) Oil India Limited (OIL) / ऑयल इंडिया लिमिटेड', '(b) Hindustan Aeronautics Limited (HAL) / हिंदुस्तान एयरोनॉटिक्स लिमिटेड', '(c) Bharat Electronics Limited (BEL) / भारत इलेक्ट्रॉनिक्स लिमिटेड', '(d) IRCON International / इरकॉन इंटरनेशनल'],
    correctOptionIndex: 1,
    explanation: 'Hindustan Aeronautics Limited (HAL) was elevated to the prestigious Maharatna Status in 2026.'
  },
  {
    id: 'ca-q-today-13',
    text: 'What is the budget allocation for the "PM Surya Ghar: Muft Bijli Yojana" announced for solar rooftops? / रूफटॉप सोलर के लिए घोषित "पीएम सूर्य घर: मुफ्त बिजली योजना" के लिए बजट आवंटन कितना है?',
    options: ['(a) ₹50,000 Crore', '(b) ₹75,021 Crore', '(c) ₹90,000 Crore', '(d) ₹60,000 Crore'],
    correctOptionIndex: 1,
    explanation: 'The Central Government approved ₹75,021 Crore for the PM Surya Ghar Scheme, targeting 1 crore households with 300 units free solar power monthly.'
  },
  {
    id: 'ca-q-today-14',
    text: 'Which Indian space startup launched the world’s first 3D-printed semi-cryogenic engine rocket called "Agnibaan SOrTeD"? / किस भारतीय अंतरिक्ष स्टार्टअप ने "अग्निबाण सॉर्टेड" नामक दुनिया का पहला 3D-मुद्रित सेमी-क्रायोजेनिक इंजन रॉकेट लॉन्च किया है?',
    options: ['(a) Skyroot Aerospace / स्काईरूट एयरोस्पेस', '(b) Agnikul Cosmos / अग्निकुल कॉस्मॉस', '(c) Bellatrix Aerospace / बेलाट्रिक्स एयरोस्पेस', '(d) Pixxel / पिक्सेल'],
    correctOptionIndex: 1,
    explanation: 'Agnikul Cosmos successfully test-launched Agnibaan SOrTeD featuring the single-piece 3D-printed engine Agnilet from Sriharikota.'
  },
  {
    id: 'ca-q-today-15',
    text: 'Which country’s space agency successfully launched the "Chang’e-6" probe to collect samples from the far side of the moon? / किस देश की अंतरिक्ष एजेंसी ने चंद्रमा के सुदूर हिस्से (फार साइड) से नमूने एकत्र करने के लिए "चांग’ई-6" मिशन को सफलतापूर्वक लॉन्च किया?',
    options: ['(a) Japan (JAXA) / जापान', '(b) China (CNSA) / चीन', '(c) USA (NASA) / यूएसए', '(d) Russia (Roscosmos) / रूस'],
    correctOptionIndex: 1,
    explanation: 'China National Space Administration (CNSA) made history by successfully landing Chang\'e-6 on the moon\'s south pole Aitken Basin.'
  },
  {
    id: 'ca-q-today-16',
    text: 'Who won the International Booker Prize 2026 for the translated novel "Kairos"? / अनूदित उपन्यास "कैरॉस" (Kairos) के लिए अंतर्राष्ट्रीय बुकर पुरस्कार 2026 किसने जीता है?',
    options: ['(a) Jenny Erpenbeck / जेनी एर्पेनबेक', '(b) Michael Hofmann / माइकल हॉफमैन', '(c) Georgi Gospodinov / जॉर्जी गोस्पोडिनोव', '(d) Salman Rushdie / सलमान रुश्दी'],
    correctOptionIndex: 0,
    explanation: 'German author Jenny Erpenbeck and translator Michael Hofmann won the International Booker Prize 2026 for her novel "Kairos".'
  },
  {
    id: 'ca-q-today-17',
    text: 'Which country became the first in the world to officially implement the European Union\'s comprehensive Artificial Intelligence Act in 2026? / 2026 में यूरोपीय संघ के व्यापक आर्टिफिशियल इंटेलिजेंस एक्ट को आधिकारिक तौर पर लागू करने वाला दुनिया का पहला क्षेत्र कौन सा है?',
    options: ['(a) European Union / यूरोपीय संघ', '(b) United States / संयुक्त राज्य अमेरिका', '(c) United Kingdom / यूनाइटेड किंगडम', '(d) Singapore / सिंगापुर'],
    correctOptionIndex: 0,
    explanation: 'The European Union began official multi-tiered implementation of its pathbreaking Artificial Intelligence (AI) Act in 2026.'
  },
  {
    id: 'ca-q-today-18',
    text: 'The newly constructed "Sela Tunnel", India\'s longest bi-lane strategic tunnel, is located in which state? / नव-निर्मित "सेला सुरंग" (Sela Tunnel), जो भारत की सबसे लंबी द्वि-लेन रणनीतिक सुरंग है, किस राज्य में स्थित है?',
    options: ['(a) Sikkim / सिक्किम', '(b) Arunachal Pradesh / अरुणाचल प्रदेश', '(c) Himachal Pradesh / हिमाचल प्रदेश', '(d) Ladakh / लद्दाख'],
    correctOptionIndex: 1,
    explanation: 'The Sela Tunnel, constructed by the Border Roads Organisation (BRO) at 13,000 feet, provides all-weather connectivity to Tawang in Arunachal Pradesh.'
  },
  {
    id: 'ca-q-today-19',
    text: 'Who has taken oath as the new Prime Minister of the United Kingdom following the general elections in mid-2026? / मध्य-2026 में आम चुनावों के बाद यूनाइटेड किंगडम के नए प्रधानमंत्री के रूप में किसने शपथ ली है?',
    options: ['(a) Rishi Sunak / ऋषि सुनक', '(b) Keir Starmer / कीर स्टारमर', '(c) Boris Johnson / बोरिस जॉनसन', '(d) David Cameron / डेविड कैमरन'],
    correctOptionIndex: 1,
    explanation: 'Keir Starmer took official charge as the Prime Minister of the United Kingdom after the Labour Party won a landslide victory.'
  },
  {
    id: 'ca-q-today-20',
    text: 'India’s first multi-purpose green hydrogen pilot project was commissioned by SJVN in which state in June 2026? / जून 2026 में एसजेवीएन (SJVN) द्वारा भारत की पहली बहुउद्देश्यीय हरित हाइड्रोजन पायलट परियोजना किस राज्य में चालू की गई?',
    options: ['(a) Himachal Pradesh / हिमाचल प्रदेश', '(b) Uttarakhand / उत्तराखंड', '(c) Jammu & Kashmir / जम्मू और कश्मीर', '(d) Gujarat / गुजरात'],
    correctOptionIndex: 0,
    explanation: 'SJVN Limited commissioned India\'s first multi-purpose green hydrogen pilot project at Nathpa Jhakri Hydro Power Station in Himachal Pradesh.'
  },
  {
    id: 'ca-q-today-21',
    text: 'Which state hosted the 38th National Games of India in 2026? / 2026 में भारत के 38वें राष्ट्रीय खेलों की मेजबानी किस राज्य ने की?',
    options: ['(a) Uttarakhand / उत्तराखंड', '(b) Goa / गोवा', '(c) Gujarat / गुजरात', '(d) Kerala / केरल'],
    correctOptionIndex: 0,
    explanation: 'Uttarakhand hosted the 38th National Games of India in 2026, showcasing modern sporting arenas across multiple districts.'
  },
  {
    id: 'ca-q-today-22',
    text: 'Who has been awarded the prestigious Abel Prize 2026 for mathematics? / गणित के लिए प्रतिष्ठित एबेल पुरस्कार 2026 से किसे सम्मानित किया गया है?',
    options: ['(a) Michel Talagrand / मिशेल टैलाग्रैंड', '(b) Luis Caffarelli / लुइस कैफरेली', '(c) Dennis Sullivan / डेनिस सुलिवन', '(d) Terence Tao / टेरेंस ताओ'],
    correctOptionIndex: 0,
    explanation: 'French mathematician Michel Talagrand was awarded the Abel Prize 2026 for his groundbreaking work in probability theory and stochastic processes.'
  },
  {
    id: 'ca-q-today-23',
    text: 'What is India’s ranking in the Global Innovation Index (GII) 2026 published by WIPO? / WIPO द्वारा प्रकाशित वैश्विक नवाचार सूचकांक (GII) 2026 में भारत की रैंकिंग क्या है?',
    options: ['(a) 38th / 38वीं', '(b) 40th / 40वीं', '(c) 42nd / 42वीं', '(d) 45th / 45वीं'],
    correctOptionIndex: 1,
    explanation: 'India secured the 40th rank in the Global Innovation Index 2026, maintaining its strong position among lower-middle-income economies.'
  },
  {
    id: 'ca-q-today-24',
    text: 'Which Indian city secured the title of the cleanest city in India for the eighth consecutive time under Swachh Survekshan 2026? / स्वच्छ सर्वेक्षण 2026 के तहत किस भारतीय शहर ने लगातार आठवीं बार भारत के सबसे स्वच्छ शहर का खिताब हासिल किया?',
    options: ['(a) Surat / सूरत', '(b) Indore / इंदौर', '(c) Navi Mumbai / नवी मुंबई', '(d) Ambikapur / अंबिकापुर'],
    correctOptionIndex: 1,
    explanation: 'Indore clinched the top spot as the cleanest city in India for the 8th consecutive time, sharing honors with Surat in specific multi-million tiers.'
  },
  {
    id: 'ca-q-today-25',
    text: 'Which state in India announced the launch of "NTR Bharosa Pension Scheme" in June 2026? / भारत के किस राज्य ने जून 2026 में "एनटीआर भरोसा पेंशन योजना" शुरू करने की घोषणा की है?',
    options: ['(a) Andhra Pradesh / आंध्र प्रदेश', '(b) Telangana / तेलंगाना', '(c) Tamil Nadu / तमिलनाडु', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 0,
    explanation: 'The newly elected Andhra Pradesh government launched the NTR Bharosa Pension Scheme, increasing monthly pensions for senior citizens.'
  },
  {
    id: 'ca-q-today-26',
    text: 'The historic "Chabahar Port" long-term operating agreement was signed between India and which nation in mid-2026? / मध्य-2026 में भारत और किस देश के बीच ऐतिहासिक "चाबहार बंदरगाह" दीर्घकालिक संचालन समझौते पर हस्ताक्षर किए गए?',
    options: ['(a) Iran / ईरान', '(b) Oman / ओमान', '(c) UAE / यूएई', '(d) Uzbekistan / उज्बेकिस्तान'],
    correctOptionIndex: 0,
    explanation: 'India and Iran signed a historic 10-year bilateral contract for the operations of Chabahar Port to boost transit trade to Central Asia.'
  },
  {
    id: 'ca-q-today-27',
    text: 'Who has been selected as the new Chairman of the Indian Space Research Organisation (ISRO) in 2026? / 2026 में भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) के नए अध्यक्ष के रूप में किसे चुना गया है?',
    options: ['(a) Dr. S. Somanath / डॉ. एस सोमनाथ', '(b) Dr. V. Narayanan / डॉ. वी. नारायणन', '(c) Dr. S. Unnikrishnan Nair / डॉ. एस. उन्नीकृष्णन नायर', '(d) Shri A. S. Kiran Kumar / श्री ए. एस. किरण कुमार'],
    correctOptionIndex: 0,
    explanation: 'Dr. S. Somanath continues to lead the space agency as Chairman guiding complex interplanetary missions.'
  },
  {
    id: 'ca-q-today-28',
    text: 'Which national team won the UEFA Euro Championship held in mid-2026? / मध्य-2026 में आयोजित यूईएफए यूरो चैंपियनशिप किस राष्ट्रीय टीम ने जीती?',
    options: ['(a) Spain / स्पेन', '(b) France / फ्रांस', '(c) Germany / जर्मनी', '(d) England / इंग्लैंड'],
    correctOptionIndex: 0,
    explanation: 'Spain played stellar attacking football to clinch the UEFA Euro 2026 championship trophy in Berlin.'
  },
  {
    id: 'ca-q-today-29',
    text: 'Who won the Best Actor award at the 71st Filmfare Awards 2026? / 71वें फिल्मफेयर पुरस्कार 2026 में सर्वश्रेष्ठ अभिनेता का पुरस्कार किसने जीता है?',
    options: ['(a) Ranbir Kapoor / रणबीर कपूर', '(b) Shah Rukh Khan / शाह रुख खान', '(c) Ranveer Singh / रणवीर सिंह', '(d) Vicky Kaushal / विक्की कौशल'],
    correctOptionIndex: 0,
    explanation: 'Ranbir Kapoor won the Best Actor category for his versatile portrayal in the blockbuster film "Animal".'
  },
  {
    id: 'ca-q-today-30',
    text: 'Which Indian conservationist has been awarded the Whitley Gold Award 2026 (Green Oscar)? / किस भारतीय संरक्षणवादी को व्हिटली गोल्ड अवार्ड 2026 (ग्रीन ऑस्कर) से सम्मानित किया गया है?',
    options: ['(a) Dr. Purnima Devi Barman / डॉ. पूर्णिमा देवी बर्मन', '(b) Jadav Payeng / जादव पायेंग', '(c) Chandi Prasad Bhatt / चंडी प्रसाद भट्ट', '(d) Sunita Narain / सुनीता नारायण'],
    correctOptionIndex: 0,
    explanation: 'Assam\'s Dr. Purnima Devi Barman received the prestigious Whitley Gold Award 2026 for her community efforts to protect the Greater Adjutant Stork (Hargila).'
  },
  {
    id: 'ca-q-today-31',
    text: 'What is India’s ranking in the Energy Transition Index 2026 published by the World Economic Forum? / विश्व आर्थिक मंच द्वारा प्रकाशित ऊर्जा संक्रमण सूचकांक 2026 में भारत का स्थान क्या है?',
    options: ['(a) 63rd / 63वां', '(b) 67th / 67वां', '(c) 71st / 71वां', '(d) 75th / 75वां'],
    correctOptionIndex: 1,
    explanation: 'India ranked 67th in the global Energy Transition Index 2026 for its steady integration of grid solar and wind power storage systems.'
  },
  {
    id: 'ca-q-today-32',
    text: 'The Reserve Bank of India (RBI) transferred a record surplus dividend of how much amount to the Central Government for FY24/25 in mid-2026? / मध्य-2026 में भारतीय रिजर्व बैंक (RBI) ने वित्तीय वर्ष 24/25 के लिए केंद्र सरकार को कितनी रिकॉर्ड अधिशेष लाभांश राशि हस्तांतरित की?',
    options: ['(a) ₹1.25 Lakh Crore', '(b) ₹1.50 Lakh Crore', '(c) ₹2.11 Lakh Crore', '(d) ₹2.85 Lakh Crore'],
    correctOptionIndex: 2,
    explanation: 'The RBI Board approved a historic surplus dividend transfer of ₹2,10,874 Crore (₹2.11 Lakh Crore) to the Central Government.'
  },
  {
    id: 'ca-q-today-33',
    text: 'Which team won the Tata IPL 2026 Cricket Championship? / टाटा आईपीएल 2026 क्रिकेट चैंपियनशिप किस टीम ने जीती है?',
    options: ['(a) Kolkata Knight Riders / कोलकाता नाइट राइडर्स', '(b) Sunrisers Hyderabad / सनराइजर्स हैदराबाद', '(c) Chennai Super Kings / चेन्नई सुपर किंग्स', '(d) Mumbai Indians / मुंबई इंडियंस'],
    correctOptionIndex: 0,
    explanation: 'Kolkata Knight Riders (KKR) won the IPL 2026 edition, showing extreme tactical precision in the playoff matches.'
  },
  {
    id: 'ca-q-today-34',
    text: 'India’s first state-of-the-art National Dolphin Research Centre (NDRC) was officially inaugurated in which city? / भारत के पहले अत्याधुनिक राष्ट्रीय डॉल्फिन अनुसंधान केंद्र (NDRC) का आधिकारिक उद्घाटन किस शहर में किया गया?',
    options: ['(a) Patna, Bihar / पटना, बिहार', '(b) Varanasi, Uttar Pradesh / वाराणसी, उत्तर प्रदेश', '(c) Guwahati, Assam / गुवाहाटी, असम', '(d) Kolkata, West Bengal / कोलकाता, पश्चिम बंगाल'],
    correctOptionIndex: 0,
    explanation: 'The National Dolphin Research Centre (NDRC) was set up on the banks of the Ganges inside Patna University campus in Bihar.'
  },
  {
    id: 'ca-q-today-35',
    text: 'Who took charge as the Director General of the Border Security Force (BSF) in mid-2026? / मध्य-2026 में सीमा सुरक्षा बल (BSF) के महानिदेशक के रूप में किसने कार्यभार संभाला है?',
    options: ['(a) Daljit Singh Chaudhary / दलजीत सिंह चौधरी', '(b) Nitin Agarwal / नितिन अग्रवाल', '(c) Rahul Rasgotra / राहुल रसगोत्र', '(d) Anish Dayal Singh / अनीश दयाल सिंह'],
    correctOptionIndex: 0,
    explanation: 'Senior IPS officer Daljit Singh Chaudhary took additional / full operational charge as the Director General of BSF.'
  },
  {
    id: 'ca-q-today-36',
    text: 'The 2026 UNESCO World Heritage Committee 46th session was hosted by which country? / 2026 यूनेस्को विश्व धरोहर समिति के 46वें सत्र की मेजबानी किस देश ने की?',
    options: ['(a) India / भारत', '(b) Saudi Arabia / सऊदी अरब', '(c) China / चीन', '(d) France / फ्रांस'],
    correctOptionIndex: 0,
    explanation: 'India proudly hosted the 46th UNESCO World Heritage Committee Session in New Delhi, highlighting cultural preservation.'
  },
  {
    id: 'ca-q-today-37',
    text: 'What is the name of the joint military exercise conducted between India and USA in June 2026? / जून 2026 में भारत और अमेरिका के बीच आयोजित संयुक्त सैन्य अभ्यास का नाम क्या है?',
    options: ['(a) Yudh Abhyas 2026 / युद्ध अभ्यास 2026', '(b) Vajra Prahar 2026 / वज्र प्रहार 2026', '(c) Tiger Triumph 2026 / टाइगर ट्रायम्फ 2026', '(d) Nomadic Elephant 2026 / नोमैडिक एलीफेंट 2026'],
    correctOptionIndex: 0,
    explanation: 'The annual bilateral "Yudh Abhyas 2026" exercise was held in Alaska, focusing on high-altitude cold weather maneuvers.'
  },
  {
    id: 'ca-q-today-38',
    text: 'Which Indian PSU was awarded the "Global Green Energy Leadership Award" in 2026? / 2026 में किस भारतीय सार्वजनिक उपक्रम को "ग्लोबल ग्रीन एनर्जी लीडरशिप अवार्ड" से सम्मानित किया गया है?',
    options: ['(a) NTPC Limited / एनटीपीसी लिमिटेड', '(b) Indian Oil Corporation / इंडियन ऑयल', '(c) GAIL India / गेल इंडिया', '(d) NHPC Limited / एनएचपीसी लिमिटेड'],
    correctOptionIndex: 0,
    explanation: 'NTPC won the leadership award for executing massive solar parks and implementing active bio-mass co-firing in coal power boilers.'
  },
  {
    id: 'ca-q-today-39',
    text: 'In June 2026, which country became the first in Europe to register a negative rate of inflation (deflation)? / जून 2026 में कौन सा देश यूरोप में नकारात्मक मुद्रास्फीति दर (अपस्फीति) दर्ज करने वाला पहला देश बना?',
    options: ['(a) Switzerland / स्विट्जरलैंड', '(b) Germany / जर्मनी', '(c) Greece / ग्रीस', '(d) Netherlands / नीदरलैंड'],
    correctOptionIndex: 0,
    explanation: 'Switzerland recorded minor negative inflation trends in specific index categories owing to heavy energy price drops.'
  },
  {
    id: 'ca-q-today-40',
    text: 'The newly approved "Vadhavan Port", a greenfield deep-draft mega port, is being constructed in which state? / नव-स्वीकृत "वधावन बंदरगाह" (Vadhavan Port), जो एक ग्रीनफील्ड डीप-ड्राफ्ट मेगा पोर्ट है, किस राज्य में बनाया जा रहा है?',
    options: ['(a) Maharashtra / महाराष्ट्र', '(b) Gujarat / गुजरात', '(c) Andhra Pradesh / आंध्र प्रदेश', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 0,
    explanation: 'The Cabinet approved the development of a mega deep-draft port at Vadhavan in Palghar district, Maharashtra, costing ₹76,220 Crore.'
  },
  {
    id: 'ca-q-today-41',
    text: 'Who has taken charge as the new Chairman of the Securities and Exchange Board of India (SEBI) in mid-2026? / मध्य-2026 में भारतीय प्रतिभूति और विनिमय बोर्ड (SEBI) के नए अध्यक्ष के रूप में किसने कार्यभार संभाला है?',
    options: ['(a) Madhabi Puri Buch / माधवी पुरी बुच', '(b) Ajay Tyagi / अजय त्यागी', '(c) Sanjay Kumar Verma / संजय कुमार वर्मा', '(d) Ashwani Bhatia / अश्वनी भाटिया'],
    correctOptionIndex: 0,
    explanation: 'Smt. Madhabi Puri Buch continues to guide capital market regulations as the Chairperson of SEBI.'
  },
  {
    id: 'ca-q-today-42',
    text: 'What is the theme of World Environment Day (WED) celebrated on June 5, 2026? / 5 जून 2026 को मनाए गए विश्व पर्यावरण दिवस (WED) का विषय क्या है?',
    options: ['(a) Land restoration, desertification and drought resilience / भूमि बहाली, मरुस्थलीकरण और सूखा लचीलापन', '(b) Beat Plastic Pollution / प्लास्टिक प्रदूषण को हराएं', '(c) Ecosystem Restoration / पारिस्थितिकी तंत्र की बहाली', '(d) Only One Earth / केवल एक पृथ्वी'],
    correctOptionIndex: 0,
    explanation: 'The official theme for World Environment Day on June 5, 2026, is "Land restoration, desertification and drought resilience".'
  },
  {
    id: 'ca-q-today-43',
    text: 'Which Indian state’s archaeological site "Moidams" (Mound-Burial System of the Ahom Dynasty) was added to the UNESCO World Heritage List in 2026? / किस भारतीय राज्य के पुरातात्विक स्थल "मोइदम" (अहोम राजवंश की टीला-दफन प्रणाली) को 2026 में यूनेस्को की विश्व विरासत सूची में जोड़ा गया था?',
    options: ['(a) Assam / असम', '(b) West Bengal / पश्चिम बंगाल', '(c) Odisha / ओडिशा', '(d) Tripura / त्रिपुरा'],
    correctOptionIndex: 0,
    explanation: 'The "Moidams" of Charaideo, Assam, representing the royal necropolis of the Ahom Kings, became a UNESCO World Heritage site.'
  },
  {
    id: 'ca-q-today-44',
    text: 'The 2026 G20 Summit is scheduled to be hosted by which South American nation? / 2026 जी20 शिखर सम्मेलन की मेजबानी किस दक्षिण अमेरिकी देश द्वारा की जानी निर्धारित है?',
    options: ['(a) Brazil / ब्राजील', '(b) Argentina / अर्जेंटीना', '(c) Chile / चिली', '(d) Colombia / कोलंबिया'],
    correctOptionIndex: 0,
    explanation: 'Following the previous presidency success, Brazil is hosting the premier multilateral G20 Summit in 2026.'
  },
  {
    id: 'ca-q-today-45',
    text: 'Which ministry launched the "PRERANA" experiential learning portal for senior secondary students? / किस मंत्रालय ने वरिष्ठ माध्यमिक छात्रों के लिए "प्रेरणा" (PRERANA) अनुभवात्मक शिक्षण पोर्टल शुरू किया है?',
    options: ['(a) Ministry of Education / शिक्षा मंत्रालय', '(b) Ministry of Skill Development / कौशल विकास मंत्रालय', '(c) Ministry of Youth Affairs / युवा मामले मंत्रालय', '(d) Ministry of Culture / संस्कृति मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'The Department of School Education under the Ministry of Education launched "PRERANA" to build leadership values.'
  },
  {
    id: 'ca-q-today-46',
    text: 'What is India’s ranking in the World Bank’s Logistics Performance Index (LPI) 2026? / विश्व बैंक के लॉजिस्टिक्स प्रदर्शन सूचकांक (LPI) 2026 में भारत का स्थान क्या है?',
    options: ['(a) 34th / 34वां', '(b) 38th / 38वां', '(c) 42nd / 42वां', '(d) 46th / 46वां'],
    correctOptionIndex: 1,
    explanation: 'India ranked 38th out of 139 nations in the Logistics Performance Index due to heavy national highway expansions and dedicated freight corridors.'
  },
  {
    id: 'ca-q-today-47',
    text: 'In June 2026, India successfully launched its first deep ocean manned scientific research submarine called: / जून 2026 में भारत ने अपनी पहली गहरे समुद्र में मानवयुक्त वैज्ञानिक अनुसंधान पनडुब्बी का सफलतापूर्वक परीक्षण किया, उसका नाम क्या है?',
    options: ['(a) Samudrayaan (Matsya 6000) / समुद्रयान (मत्स्य 6000)', '(b) Sagar-Ratna / सागर-रत्न', '(c) Deep-Diver 1 / डीप-डाइवर 1', '(d) Jal-Purush / जल-पुरुष'],
    correctOptionIndex: 0,
    explanation: 'The Samudrayaan project involves sending three scientists in the Matsya 6000 submersible vehicle 6,000 meters deep under the Indian Ocean.'
  },
  {
    id: 'ca-q-today-48',
    text: 'Who has taken charge as the new chairperson of the National Green Tribunal (NGT) in 2026? / 2026 में राष्ट्रीय हरित अधिकरण (NGT) के नए अध्यक्ष के रूप में किसने कार्यभार संभाला है?',
    options: ['(a) Justice Prakash Shrivastava / न्यायमूर्ति प्रकाश श्रीवास्तव', '(b) Justice Adarsh Kumar Goel / न्यायमूर्ति आदर्श कुमार गोयल', '(c) Justice Sheo Kumar Singh / न्यायमूर्ति शिव कुमार सिंह', '(d) Justice Lagesh Kumar / न्यायमूर्ति लाघेश कुमार'],
    correctOptionIndex: 0,
    explanation: 'Justice Prakash Shrivastava continues to lead environmental conservation verdicts as NGT Chairperson.'
  },
  {
    id: 'ca-q-today-49',
    text: 'The newly discovered active geothermal site "Puga Valley" is located in which region of India? / हाल ही में खोजा गया सक्रिय भू-तापीय स्थल "पुगा घाटी" (Puga Valley) भारत के किस क्षेत्र में स्थित है?',
    options: ['(a) Ladakh / लद्दाख', '(b) Himachal Pradesh / हिमाचल प्रदेश', '(c) Uttarakhand / उत्तराखंड', '(d) Sikkim / सिक्किम'],
    correctOptionIndex: 0,
    explanation: 'Puga Valley in eastern Ladakh is a high-potential geothermal energy site where ONGC is executing India\'s first geothermal power project.'
  },
  {
    id: 'ca-q-today-50',
    text: 'Which Indian public sector bank became the first to cross ₹10 Lakh Crore in overall market capitalization in mid-2026? / मध्य-2026 में कुल बाजार पूंजीकरण में ₹10 लाख करोड़ को पार करने वाला पहला भारतीय सार्वजनिक क्षेत्र का बैंक कौन सा बना?',
    options: ['(a) State Bank of India (SBI) / भारतीय स्टेट बैंक', '(b) Punjab National Bank (PNB) / पंजाब नेशनल बैंक', '(c) Bank of Baroda / बैंक ऑफ बड़ौदा', '(d) Canara Bank / केनरा बैंक'],
    correctOptionIndex: 0,
    explanation: 'The State Bank of India (SBI) registered massive gains to breach the elite ₹10 Lakh Crore market capitalization benchmark, making it India\'s most valued public bank.'
  },
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
  },
  {
    id: 'ca-q-51',
    text: 'Which space agency is ISRO partnering with for the Lunar Polar Exploration (LUPEX) mission slated for late 2026? / इसरो वर्ष 2026 के अंत में निर्धारित चंद्र ध्रुवीय अन्वेषण (LUPEX) मिशन के लिए किस अंतरिक्ष एजेंसी के साथ भागीदारी कर रहा है?',
    options: ['(a) NASA / नासा', '(b) JAXA / जाक्सा', '(c) ESA / ईएसए', '(d) Roscosmos / रॉसकॉसमॉस'],
    correctOptionIndex: 1,
    explanation: 'ISRO is partnering with Japan Aerospace Exploration Agency (JAXA) for the LUPEX mission, which will explore water-ice presence on the Moon.'
  },
  {
    id: 'ca-q-52',
    text: 'Which countries are co-hosting the ICC Men\'s T20 World Cup in 2026? / कौन से देश वर्ष 2026 में आईसीसी पुरुष टी20 विश्व कप की सह-मेजबानी कर रहे हैं?',
    options: ['(a) West Indies & USA / वेस्टइंडीज और यूएसए', '(b) India & Sri Lanka / भारत और श्रीलंका', '(c) Australia & New Zealand / ऑस्ट्रेलिया और न्यूजीलैंड', '(d) England & Wales / इंग्लैंड और वेल्स'],
    correctOptionIndex: 1,
    explanation: 'The 2026 ICC Men\'s T20 World Cup will be co-hosted by India and Sri Lanka.'
  },
  {
    id: 'ca-q-53',
    text: 'Which city was officially inaugurated as Indonesia\'s new capital city, replacing Jakarta in 2026? / वर्ष 2026 में जकार्ता के स्थान पर किस शहर को आधिकारिक तौर पर इंडोनेशिया की नई राजधानी के रूप में उद्घाटित किया गया है?',
    options: ['(a) Nusantara / नुसंतारा', '(b) Bandung / बांडुंग', '(c) Surabaya / सुराबाया', '(d) Bali / बाली'],
    correctOptionIndex: 0,
    explanation: 'Nusantara, located on East Kalimantan on the Bornean island, has been planned and inaugurated to replace the sinking Jakarta.'
  },
  {
    id: 'ca-q-54',
    text: 'Which country is hosting the 21st G20 Summit in 2026? / वर्ष 2026 में 21वें G-20 शिखर सम्मेलन की मेजबानी कौन सा देश कर रहा है?',
    options: ['(a) South Africa / दक्षिण अफ्रीका', '(b) Brazil / ब्राजील', '(c) United States / संयुक्त राज्य अमेरिका', '(d) India / भारत'],
    correctOptionIndex: 2,
    explanation: 'The G20 Summit of 2026 is hosted by the United States. Note that Brazil hosted in 2024, South Africa in 2025, and USA in 2026.'
  },
  {
    id: 'ca-q-55',
    text: 'Who is the Chief Justice of India (CJI) as of mid-2026? / मध्य-2026 तक भारत के मुख्य न्यायाधीश (CJI) कौन हैं?',
    options: ['(a) Justice Sanjiv Khanna / न्यायमूर्ति संजीव खन्ना', '(b) Justice B.R. Gavai / न्यायमूर्ति बी.आर. गवई', '(c) Justice Surya Kant / न्यायमूर्ति सूर्यकांत', '(d) Justice DY Chandrachud / न्यायमूर्ति डी.वाई. चंद्रचूड़'],
    correctOptionIndex: 0,
    explanation: 'Justice Sanjiv Khanna succeeded Justice DY Chandrachud as the Chief Justice of India.'
  },
  {
    id: 'ca-q-56',
    text: 'Han Kang, who won the Nobel Prize in Literature, belongs to which country? / साहित्य में नोबेल पुरस्कार जीतने वाली हान कांग किस देश से संबंधित हैं?',
    options: ['(a) Japan / जापान', '(b) South Korea / दक्षिण कोरिया', '(c) China / चीन', '(d) Singapore / सिंगापुर'],
    correctOptionIndex: 1,
    explanation: 'South Korean author Han Kang won the Nobel Prize in Literature for her intense poetic prose.'
  },
  {
    id: 'ca-q-57',
    text: 'Which city is scheduled to host the 2026 Commonwealth Games? / 2026 राष्ट्रमंडल खेलों की मेजबानी करने के लिए कौन सा शहर निर्धारित है?',
    options: ['(a) Glasgow, Scotland / ग्लासगो, स्कॉटलैंड', '(b) Victoria, Australia / विक्टोरिया, ऑस्ट्रेलिया', '(c) Birmingham, UK / बर्मिंघम, यूके', '(d) New Delhi, India / नई दिल्ली, भारत'],
    correctOptionIndex: 0,
    explanation: 'Glasgow has stepped in to host the scaled-down 2026 Commonwealth Games after Victoria (Australia) withdrew.'
  },
  {
    id: 'ca-q-58',
    text: 'Which country is selected as the global host for World Environment Day 2026? / विश्व पर्यावरण दिवस 2026 के लिए किस देश को वैश्विक मेजबान के रूप में चुना गया है?',
    options: ['(a) India / भारत', '(b) Azerbaijan / अज़रबैजान', '(c) Saudi Arabia / सऊदी अरब', '(d) Republic of Korea / दक्षिण कोरिया'],
    correctOptionIndex: 3,
    explanation: 'The Republic of Korea is selected as the global host for World Environment Day 2026 with a focus on ending plastic pollution.'
  },
  {
    id: 'ca-q-59',
    text: 'In which Indian state is India\'s first semiconductor fabrication plant (Fab) being constructed by Tata Electronics and PSMC? / टाटा इलेक्ट्रॉनिक्स और पीएसएमसी द्वारा भारत का पहला सेमीकंडक्टर फैब्रिकेशन प्लांट (Fab) किस भारतीय राज्य में बनाया जा रहा है?',
    options: ['(a) Gujarat / गुजरात', '(b) Tamil Nadu / तमिलनाडु', '(c) Maharashtra / महाराष्ट्र', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 0,
    explanation: 'Tata Electronics is setting up India\'s first semiconductor fab in Dholera, Gujarat, in partnership with Taiwan\'s Powerchip Semiconductor Manufacturing Corporation (PSMC).'
  },
  {
    id: 'ca-q-60',
    text: 'Which country is partnering with India to build the Mumbai-Ahmedabad High-Speed Rail Corridor (Bullet Train)? / मुंबई-अहमदाबाद हाई-स्पीड रेल कॉरिडोर (बुलेट ट्रेन) के निर्माण के लिए कौन सा देश भारत के साथ भागीदारी कर रहा है?',
    options: ['(a) Germany / जर्मनी', '(b) France / फ्रांस', '(c) Japan / जापान', '(d) South Korea / दक्षिण कोरिया'],
    correctOptionIndex: 2,
    explanation: 'The Mumbai-Ahmedabad High-Speed Rail project is being built with technical and financial assistance from Japan using Shinkansen technology.'
  },
  {
    id: 'ca-q-61',
    text: 'Which country has proposed to host the COP31 UN Climate Change Conference in 2026? / किस देश ने 2026 में COP31 संयुक्त राष्ट्र जलवायु परिवर्तन सम्मेलन की मेजबानी करने का प्रस्ताव दिया है?',
    options: ['(a) India / भारत', '(b) Australia / ऑस्ट्रेलिया', '(c) Brazil / ब्राजील', '(d) Switzerland / स्विट्जरलैंड'],
    correctOptionIndex: 1,
    explanation: 'Australia has officially bid to host COP31 in 2026 in partnership with Pacific Island nations.'
  },
  {
    id: 'ca-q-62',
    text: 'Which European nation became the first to accept UPI payments at the iconic Eiffel Tower? / कौन सा यूरोपीय देश प्रतिष्ठित एफिल टॉवर पर यूपीआई (UPI) भुगतान स्वीकार करने वाला पहला देश बना?',
    options: ['(a) Germany / जर्मनी', '(b) France / फ्रांस', '(c) United Kingdom / यूनाइटेड किंगडम', '(d) Italy / इटली'],
    correctOptionIndex: 1,
    explanation: 'France officially launched UPI payments at the Eiffel Tower, allowing Indian tourists to pay via scanned QR codes.'
  },
  {
    id: 'ca-q-63',
    text: 'India ranked in which position in the Global Innovation Index (GII) 2025 released by WIPO? / डब्ल्यूआईपीओ (WIPO) द्वारा जारी वैश्विक नवाचार सूचकांक (GII) 2025 में भारत किस स्थान पर रहा?',
    options: ['(a) 35th / 35वें', '(b) 39th / 39वें', '(c) 40th / 40वें', '(d) 45th / 45वें'],
    correctOptionIndex: 1,
    explanation: 'India maintained its progress to rank 39th among 133 economies in the Global Innovation Index.'
  },
  {
    id: 'ca-q-64',
    text: 'The joint military exercise \'Sada Tanseeq\' is conducted bilingually between India and which country? / संयुक्त सैन्य अभ्यास \'सदा तंसीक\' भारत और किस देश के बीच आयोजित किया जाता है?',
    options: ['(a) Oman / ओमान', '(b) Saudi Arabia / सऊदी अरब', '(c) UAE / यूएई', '(d) Qatar / कतर'],
    correctOptionIndex: 1,
    explanation: 'Sada Tanseeq is an inaugural joint military exercise conducted between the Royal Saudi Land Forces and Indian Army.'
  },
  {
    id: 'ca-q-65',
    text: 'Where will the 2026 Winter Olympics be hosted? / वर्ष 2026 के शीतकालीन ओलंपिक का आयोजन कहाँ किया जाएगा?',
    options: ['(a) Milan-Cortina, Italy / मिलान-कोर्टिना, इटली', '(b) Beijing, China / बीजिंग, चीन', '(c) Vancouver, Canada / वैंकूवर, कनाडा', '(d) Sapporo, Japan / सपोरो, जापान'],
    correctOptionIndex: 0,
    explanation: 'The XXV Olympic Winter Games will be hosted in Milan and Cortina d\'Ampezzo in Italy in February 2026.'
  },
  {
    id: 'ca-q-66',
    text: 'Who was conferred with the prestigious Dadasaheb Phalke Award for lifetime contribution to Indian cinema recently? / हाल ही में भारतीय सिनेमा में आजीवन योगदान के लिए प्रतिष्ठित दादा साहब फाल्के पुरस्कार से किसे सम्मानित किया गया है?',
    options: ['(a) Mithun Chakraborty / मिथुन चक्रवर्ती', '(b) Waheeda Rehman / वहीदा रहमान', '(c) Amitabh Bachchan / अमिताभ बच्चन', '(d) Asha Parekh / आशा पारेख'],
    correctOptionIndex: 0,
    explanation: 'Veteran actor Mithun Chakraborty was honored with the Dadasaheb Phalke Award for his outstanding contributions to Indian cinema.'
  },
  {
    id: 'ca-q-67',
    text: 'As of 2026, which state has the highest number of Ramsar (Wetland) sites in India? / वर्ष 2026 तक, भारत में किस राज्य में रामसर (आर्द्रभूमि) स्थलों की संख्या सबसे अधिक है?',
    options: ['(a) Uttar Pradesh / उत्तर प्रदेश', '(b) Tamil Nadu / तमिलनाडु', '(c) West Bengal / पश्चिम बंगाल', '(d) Kerala / केरल'],
    correctOptionIndex: 1,
    explanation: 'Tamil Nadu has the highest number of Ramsar sites in India (18 sites), followed by Uttar Pradesh (10 sites).'
  },
  {
    id: 'ca-q-68',
    text: 'Where is India\'s largest solar power park being developed by NTPC Green Energy? / एनटीपीसी ग्रीन एनर्जी द्वारा भारत का सबसे बड़ा सौर ऊर्जा पार्क कहाँ विकसित किया जा रहा है?',
    options: ['(a) Khavda, Gujarat / खावड़ा, गुजरात', '(b) Bhadla, Rajasthan / भादला, राजस्थान', '(c) Pavagada, Karnataka / पावागढ़, कर्नाटक', '(d) Rewa, Madhya Pradesh / रीवा, मध्य प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'NTPC is developing India\'s largest ultra-mega renewable energy park at Khavda in the Kutch district of Gujarat.'
  },
  {
    id: 'ca-q-69',
    text: 'Who has been selected for the prestigious 58th Jnanpith Award? / प्रतिष्ठित 58वें ज्ञानपीठ पुरस्कार के लिए किसे चुना गया है?',
    options: ['(a) Gulzar & Jagadguru Rambhadracharya / गुलज़ार और जगद्गुरु रामभद्राचार्य', '(b) Damodar Mauzo / दामोदर माऊज़ो', '(c) Nilmani Phookan / नीलमणि फूकन', '(d) Gyan Chaturvedi / ज्ञान चतुर्वेदी'],
    correctOptionIndex: 0,
    explanation: 'The 58th Jnanpith Award was conferred upon Urdu poet Gulzar and Sanskrit scholar Jagadguru Rambhadracharya.'
  },
  {
    id: 'ca-q-70',
    text: 'The recently launched "PM-E-DRIVE" scheme targets the promotion of: / हाल ही में शुरू की गई "PM-E-DRIVE" योजना का उद्देश्य किसे बढ़ावा देना है?',
    options: ['(a) Electric Vehicles (EVs) / इलेक्ट्रिक वाहन', '(b) Drone Technology / ड्रोन तकनीक', '(c) Digital Education / डिजिटल शिक्षा', '(d) Organic Farming / जैविक खेती'],
    correctOptionIndex: 0,
    explanation: 'The PM-E-DRIVE (PM Electric Drive Revolution in Innovative Vehicle Enhancement) scheme replaces the FAME scheme to accelerate EV adoption.'
  },
  {
    id: 'ca-q-71',
    text: 'Which country ranked first in the World Press Freedom Index 2025? / विश्व प्रेस स्वतंत्रता सूचकांक 2025 में किस देश ने पहला स्थान प्राप्त किया?',
    options: ['(a) Norway / नॉर्वे', '(b) Finland / फिनलैंड', '(c) Denmark / डेनमार्क', '(d) Sweden / स्वीडन'],
    correctOptionIndex: 0,
    explanation: 'Norway continued its streak at the top of the World Press Freedom Index compiled by Reporters Without Borders.'
  },
  {
    id: 'ca-q-72',
    text: 'Who was the Chief Guest at India\'s 77th Republic Day parade on 26 January 2026? / 26 जनवरी 2026 को भारत के 77वें गणतंत्र दिवस परेड में मुख्य अतिथि कौन थे?',
    options: ['(a) Keir Starmer (UK PM) / कीर स्टारमर', '(b) Emmanuel Macron (France) / इमैनुएल मैक्रॉन', '(c) Lula da Silva (Brazil) / लुला डी सिल्वा', '(d) Anthony Albanese (Australia) / एंथनी अल्बनीज'],
    correctOptionIndex: 3,
    explanation: 'Australian Prime Minister Anthony Albanese attended the spectacular 77th Republic Day Parade as chief guest celebrating bilateral and Quad ties.'
  },
  {
    id: 'ca-q-73',
    text: 'Which city inaugurated India\'s first underwater/under-river metro service? / किस शहर ने भारत की पहली अंडरवाटर/अंडर-रिवर मेट्रो सेवा का उद्घाटन किया?',
    options: ['(a) Mumbai / मुंबई', '(b) Kolkata / कोलकाता', '(c) Kochi / कोच्चि', '(d) Chennai / चेन्नई'],
    correctOptionIndex: 1,
    explanation: 'India\'s first under-river metro tunnel was built under the Hooghly River in Kolkata as part of the East-West Metro corridor.'
  },
  {
    id: 'ca-q-74',
    text: 'Who was crowned Miss Universe 2024? / मिस यूनिवर्स 2024 का ताज किसे पहनाया गया?',
    options: ['(a) Victoria Kjær Theilvig (Denmark) / विक्टोरिया कजेर थिलविग', '(b) Sheynnis Palacios (Nicaragua) / शैनिस पलासियोस', '(c) R\'Bonney Gabriel (USA) / आर\'बोनी गेब्रियल', '(d) Harnaaz Sandhu (India) / हरनाज़ संधू'],
    correctOptionIndex: 0,
    explanation: 'Victoria Kjær Theilvig of Denmark was crowned Miss Universe 2024 at the annual pageant in Mexico.'
  },
  {
    id: 'ca-q-75',
    text: 'What is the name of India\'s upcoming high-altitude research station in Antarctica? / अंटार्कटिका में भारत के आगामी उच्च ऊंचाई अनुसंधान केंद्र का नाम क्या है?',
    options: ['(a) Maitri-II / मैत्री-II', '(b) Dakshin Gangotri / दक्षिण गंगोत्री', '(c) Bharati-II / भारती-II', '(d) Sagar-I / सागर-I'],
    correctOptionIndex: 0,
    explanation: 'India is constructing Maitri-II in Antarctica to replace the aging Maitri research station established in 1989.'
  },
  {
    id: 'ca-q-76',
    text: 'Exercise \'Tarang Shakti\' is the largest multi-national air exercise hosted by which branch of India\'s armed forces? / अभ्यास \'तरंग शक्ति\' भारत के सशस्त्र बलों की किस शाखा द्वारा आयोजित सबसे बड़ा बहुराष्ट्रीय हवाई अभ्यास है?',
    options: ['(a) Indian Air Force / भारतीय वायु सेना', '(b) Indian Navy / भारतीय नौसेना', '(c) Indian Army / भारतीय सेना', '(d) Indian Coast Guard / भारतीय तटरक्षक बल'],
    correctOptionIndex: 0,
    explanation: 'The Indian Air Force hosted "Tarang Shakti", inviting air wings from dozens of friendly countries to collaborate.'
  },
  {
    id: 'ca-q-77',
    text: 'Who was awarded the prestigious Abel Prize for mathematics in 2024? / वर्ष 2024 में गणित के प्रतिष्ठित एबेल पुरस्कार से किसे सम्मानित किया गया?',
    options: ['(a) Michel Talagrand / मिशेल तालाग्रैंड', '(b) Luis Caffarelli / लुइस कैफरेली', '(c) Dennis Sullivan / डेनिस सुलिवन', '(d) Avi Wigderson / एवी विगडरसन'],
    correctOptionIndex: 0,
    explanation: 'Michel Talagrand of France was awarded the Abel Prize for his groundbreaking work in probability theory and stochastic processes.'
  },
  {
    id: 'ca-q-78',
    text: 'Who is the current Chairman of the Indian Space Research Organisation (ISRO) as of mid-2026? / मध्य-2026 तक भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) के वर्तमान अध्यक्ष कौन हैं?',
    options: ['(a) Dr. S. Somanath / डॉ. एस. सोमनाथ', '(b) Dr. K. Sivan / डॉ. के. सिवन', '(c) Dr. Sameer V. Kamat / डॉ. समीर वी. कामत', '(d) Dr. G. Satheesh Reddy / डॉ. जी. सतीश रेड्डी'],
    correctOptionIndex: 0,
    explanation: 'Dr. S. Somanath serves as the Secretary of the Department of Space and Chairman of ISRO.'
  },
  {
    id: 'ca-q-79',
    text: 'Which city was ranked cleanest in India for the 7th consecutive time in the Swachh Survekshan awards? / स्वच्छ सर्वेक्षण पुरस्कारों में किस शहर को लगातार 7वीं बार भारत का सबसे स्वच्छ शहर घोषित किया गया है?',
    options: ['(a) Surat / सूरत', '(b) Indore / इंदौर', '(c) Navi Mumbai / नवी मुंबई', '(d) Mysuru / मैसूरु'],
    correctOptionIndex: 1,
    explanation: 'Indore has consistently secured the top position as India\'s cleanest city in the Swachh Survekshan awards.'
  },
  {
    id: 'ca-q-80',
    text: 'Who is the President of the 79th session of the United Nations General Assembly (UNGA)? / संयुक्त राष्ट्र महासभा (UNGA) के 79वें सत्र के अध्यक्ष कौन हैं?',
    options: ['(a) Philemon Yang / फिलेमोन यांग', '(b) Dennis Francis / डेनिस फ्रांसिस', '(c) Csaba Kőrösi / साबा कोरोसी', '(d) Abdulla Shahid / अब्दुल्ला शाहिद'],
    correctOptionIndex: 0,
    explanation: 'Philemon Yang, former Prime Minister of Cameroon, was elected as the President of the 79th session of the UN General Assembly.'
  },
  {
    id: 'ca-q-81',
    text: 'Which Indian consortium launched the multilingual "Hanooman" GenAI model series supporting Indian languages? / किस भारतीय संघ ने भारतीय भाषाओं का समर्थन करने वाली बहुभाषी "हनुमान" (Hanooman) GenAI मॉडल श्रृंखला शुरू की है?',
    options: ['(a) BharatGPT / भारतजीपीटी', '(b) Krutrim AI / कृत्रिम एआई', '(c) Sarvam AI / सर्वम एआई', '(d) Ola Group / ओला ग्रुप'],
    correctOptionIndex: 0,
    explanation: 'BharatGPT consortium, supported by Reliance Industries and IIT Bombay, unveiled "Hanooman", a series of large language models trained in 22 Indian languages.'
  },
  {
    id: 'ca-q-82',
    text: 'Which state capital is being planned as India\'s first "AI City" to foster artificial intelligence technology ecosystems? / किस राज्य की राजधानी को कृत्रिम बुद्धिमत्ता (AI) पारिस्थितिकी प्रणालियों को बढ़ावा देने के लिए भारत के पहले "एआई सिटी" के रूप में नियोजित किया जा रहा है?',
    options: ['(a) Hyderabad / हैदराबाद', '(b) Lucknow / लखनऊ', '(c) Bengaluru / बेंगलुरु', '(d) Gandhinagar / गांधीनगर'],
    correctOptionIndex: 1,
    explanation: 'Uttar Pradesh is developing Lucknow as India\'s first AI City to aggregate research hubs, tech giants, and incubation centers.'
  },
  {
    id: 'ca-q-83',
    text: 'The "Pradhan Mantri Suryodaya Yojana" launched recently targets to install rooftop solar systems on how many households? / हाल ही में शुरू की गई "प्रधानमंत्री सूर्योदय योजना" का लक्ष्य कितने घरों पर रूफटॉप सोलर सिस्टम स्थापित करना है?',
    options: ['(a) 1 Crore households / 1 करोड़ घर', '(b) 50 Lakh households / 50 लाख घर', '(c) 2 Crore households / 2 करोड़ घर', '(d) 10 Lakh households / 10 लाख घर'],
    correctOptionIndex: 0,
    explanation: 'The PM Suryodaya Yojana aims to install rooftop solar panels for 1 crore poor and middle-income families, providing up to 300 units of free electricity monthly.'
  },
  {
    id: 'ca-q-84',
    text: 'Which country ranked first (most peaceful) in the Global Peace Index 2025? / वैश्विक शांति सूचकांक 2025 में कौन सा देश पहले स्थान पर (सबसे शांतिपूर्ण) रहा है?',
    options: ['(a) Iceland / आइसलैंड', '(b) New Zealand / न्यूजीलैंड', '(c) Ireland / आयरलैंड', '(d) Austria / ऑस्ट्रिया'],
    correctOptionIndex: 0,
    explanation: 'Iceland remains the most peaceful country in the world, a position it has held since the index was created.'
  },
  {
    id: 'ca-q-85',
    text: 'The famous "Cuttack Rupa Tarakasi" (Silver Filigree) which received a GI tag recently belongs to which state? / प्रसिद्ध "कटक रूपा तारकशी" (सिल्वर फिलीग्री) जिसे हाल ही में जीआई टैग प्राप्त हुआ है, किस राज्य से संबंधित है?',
    options: ['(a) West Bengal / पश्चिम बंगाल', '(b) Odisha / ओडिशा', '(c) Andhra Pradesh / आंध्र प्रदेश', '(d) Bihar / बिहार'],
    correctOptionIndex: 1,
    explanation: 'Odisha\'s Cuttack Rupa Tarakasi (Silver Filigree work) was awarded the Geographical Indication (GI) tag for its exquisite silver craftsmanship.'
  },
  {
    id: 'ca-q-86',
    text: 'Who is India\'s current Foreign Secretary as of mid-2026? / मध्य-2026 तक भारत के वर्तमान विदेश सचिव कौन हैं?',
    options: ['(a) Vikram Misri / विक्रम मिस्री', '(b) Vinay Mohan Kwatra / विनय मोहन क्वात्रा', '(c) Harsh Vardhan Shringla / हर्षवर्धन श्रृंगला', '(d) Dr. S. Jaishankar / डॉ. एस. जयशंकर'],
    correctOptionIndex: 0,
    explanation: 'Senior diplomat Vikram Misri succeeded Vinay Mohan Kwatra as India\'s Foreign Secretary.'
  },
  {
    id: 'ca-q-87',
    text: 'What is India\'s global rank in crude steel production as of latest reports? / नवीनतम रिपोर्टों के अनुसार कच्चे इस्पात (crude steel) उत्पादन में भारत का वैश्विक स्थान क्या है?',
    options: ['(a) 1st / पहला', '(b) 2nd / दूसरा', '(c) 3rd / तीसरा', '(d) 4th / चौथा'],
    correctOptionIndex: 1,
    explanation: 'India is the second-largest producer of crude steel in the world, with China being the largest.'
  },
  {
    id: 'ca-q-88',
    text: 'The Shinkun La Tunnel, which is set to become the world\'s highest highway tunnel, connects Ladakh with which state? / शिंकुन ला टनल, जो दुनिया की सबसे ऊंची राजमार्ग सुरंग बनने जा रही है, लद्दाख को किस राज्य से जोड़ती है?',
    options: ['(a) Himachal Pradesh / हिमाचल प्रदेश', '(b) Uttarakhand / उत्तराखंड', '(c) Jammu & Kashmir / जम्मू और कश्मीर', '(d) Punjab / पंजाब'],
    correctOptionIndex: 0,
    explanation: 'The Shinkun La Tunnel constructed by Border Roads Organisation (BRO) connects Ladakh\'s Zanskar Valley with Lahaul Valley in Himachal Pradesh.'
  },
  {
    id: 'ca-q-89',
    text: 'The joint military exercise \'Dharma Guardian\' is conducted bilingually between India and which nation? / संयुक्त सैन्य अभ्यास \'धर्म गार्जियन\' भारत और किस देश के बीच आयोजित किया जाता है?',
    options: ['(a) Japan / जापान', '(b) France / फ्रांस', '(c) USA / यूएसए', '(d) Australia / ऑस्ट्रेलिया'],
    correctOptionIndex: 0,
    explanation: 'Dharma Guardian is an annual joint military training exercise conducted bilingually between India and Japan.'
  },
  {
    id: 'ca-q-90',
    text: 'Which body confers the prestigious Sahitya Akademi Awards for outstanding literary works in Indian languages? / भारतीय भाषाओं में उत्कृष्ट साहित्यिक कार्यों के लिए प्रतिष्ठित दादा साहब फाल्के पुरस्कार कौन सी संस्था प्रदान करती है?',
    options: ['(a) Ministry of Culture / संस्कृति मंत्रालय', '(b) Sahitya Akademi / साहित्य अकादमी', '(c) Ministry of Education / शिक्षा मंत्रालय', '(d) Bharatiya Jnanpith / भारतीय ज्ञानपीठ'],
    correctOptionIndex: 1,
    explanation: 'The Sahitya Akademi, India\'s National Academy of Letters, confers these annual awards across 24 Indian languages.'
  },
  {
    id: 'ca-q-91',
    text: 'India\'s first indigenous green hydrogen fuel cell inland waterway vessel was launched in which state? / भारत का पहला स्वदेशी हरित हाइड्रोजन ईंधन सेल अंतर्देशीय जलमार्ग जहाज किस राज्य में लॉन्च किया गया?',
    options: ['(a) Tamil Nadu / तमिलनाडु', '(b) Kerala / केरल', '(c) Gujarat / गुजरात', '(d) Maharashtra / महाराष्ट्र'],
    correctOptionIndex: 0,
    explanation: 'Prime Minister Narendra Modi launched India\'s first indigenous green hydrogen fuel cell vessel at Thoothukudi, Tamil Nadu.'
  },
  {
    id: 'ca-q-92',
    text: 'Where is the annual meeting of the World Economic Forum (WEF) 2026 hosted? / विश्व आर्थिक मंच (WEF) 2026 की वार्षिक बैठक कहाँ आयोजित की गई है?',
    options: ['(a) Geneva, Switzerland / जिनेवा', '(b) Davos, Switzerland / दावोस', '(c) Zurich, Switzerland / ज़्यूरिख', '(d) Paris, France / पेरिस'],
    correctOptionIndex: 1,
    explanation: 'The World Economic Forum annual meeting takes place in Davos-Klosters, Switzerland, bringing global leaders together.'
  },
  {
    id: 'ca-q-93',
    text: 'The traditional "Majuli Masks" which received a GI tag recently belong to which state? / पारंपरिक "माजुली मास्क" (Majuli Masks) जिन्हें हाल ही में जीआई टैग प्राप्त हुआ है, किस राज्य से संबंधित हैं?',
    options: ['(a) Assam / असम', '(b) Manipur / मणिपुर', '(c) Mizoram / मिजोरम', '(d) Nagaland / नागालैंड'],
    correctOptionIndex: 0,
    explanation: 'The Majuli manuscript paintings and traditional masks of Majuli island, Assam, were awarded the Geographical Indication (GI) tag.'
  },
  {
    id: 'ca-q-94',
    text: 'Which country ranks as the world\'s most powerful passport in the Henley Passport Index 2025/2026? / दुनिया के सबसे शक्तिशाली पासपोर्ट के रूप में हेनले पासपोर्ट इंडेक्स 2025/2026 में कौन सा देश पहले स्थान पर है?',
    options: ['(a) Singapore / सिंगापुर', '(b) Japan / जापान', '(c) Germany / जर्मनी', '(d) France / फ्रांस'],
    correctOptionIndex: 0,
    explanation: 'Singapore ranks as the most powerful passport globally, allowing visa-free entry to 195 destinations.'
  },
  {
    id: 'ca-q-95',
    text: 'India ranked in which position in the latest Human Development Index (HDI) report published by UNDP? / यूएनडीपी (UNDP) द्वारा प्रकाशित नवीनतम मानव विकास सूचकांक (HDI) रिपोर्ट में भारत किस स्थान पर रहा है?',
    options: ['(a) 130th / 130वें', '(b) 132nd / 132वें', '(c) 134th / 134वें', '(d) 136th / 136वें'],
    correctOptionIndex: 2,
    explanation: 'India ranked 134th out of 193 countries in the latest UNDP Human Development Index reporting steady medium category improvements.'
  },
  {
    id: 'ca-q-96',
    text: 'Which organisation publishes the annual Global Gender Gap Report? / वार्षिक वैश्विक लैंगिक अंतराल रिपोर्ट (Global Gender Gap Report) कौन सा संगठन प्रकाशित करता है?',
    options: ['(a) World Economic Forum / विश्व आर्थिक मंच (WEF)', '(b) World Bank / विश्व बैंक', '(c) IMF / अंतर्राष्ट्रीय मुद्रा कोष', '(d) UNDP / यूएनडीपी'],
    correctOptionIndex: 0,
    explanation: 'The World Economic Forum (WEF) compiles the Global Gender Gap Index to track gender parity benchmarks globally.'
  },
  {
    id: 'ca-q-97',
    text: 'Which city features India\'s deepest metro station at Civil Court, built 108 feet below ground level? / किस शहर में सिविल कोर्ट में भारत का सबसे गहरा मेट्रो स्टेशन है, जो जमीन से 108 फीट नीचे बना है?',
    options: ['(a) New Delhi / नई दिल्ली', '(b) Pune / पुणे', '(c) Mumbai / मुंबई', '(d) Bengaluru / बेंगलुरु'],
    correctOptionIndex: 1,
    explanation: 'The Civil Court interchange station of Pune Metro is India\'s deepest metro station, reaching 33.1 meters (108.5 feet) underground.'
  },
  {
    id: 'ca-q-98',
    text: 'Which regional bloc is introducing the Carbon Border Adjustment Mechanism (CBAM) / Carbon Border Tax from 2026? / कौन सा क्षेत्रीय ब्लॉक 2026 से कार्बन बॉर्डर एडजस्टमेंट मैकेनिज्म (CBAM) / कार्बन बॉर्डर टैक्स लागू कर रहा है?',
    options: ['(a) G20 / जी-20', '(b) European Union / यूरोपीय संघ', '(c) ASEAN / आसियान', '(d) BRICS / ब्रिक्स'],
    correctOptionIndex: 1,
    explanation: 'The European Union (EU) will fully implement its Carbon Border Adjustment Mechanism (CBAM) to tax carbon-intensive imports from 2026.'
  },
  {
    id: 'ca-q-99',
    text: 'Which university clinched the overall championship title at the 4th Khelo India University Games? / चौथे खेलो इंडिया यूनिवर्सिटी गेम्स में किस विश्वविद्यालय ने समग्र चैंपियनशिप का खिताब जीता?',
    options: ['(a) Chandigarh University / चंडीगढ़ विश्वविद्यालय', '(b) Lovely Professional University / लवली प्रोफेशनल', '(c) Panjab University / पंजाब विश्वविद्यालय', '(d) Guru Nanak Dev University / गुरु नानक देव विश्वविद्यालय'],
    correctOptionIndex: 0,
    explanation: 'Chandigarh University won the Khelo India University Games overall championship title with 26 gold, 17 silver, and 28 bronze medals.'
  },
  {
    id: 'ca-q-100',
    text: 'Which ministry launched the "Cyber Surakshit Bharat" initiative to strengthen cybersecurity awareness? / साइबर सुरक्षा जागरूकता को मजबूत करने के लिए किस मंत्रालय ने "साइबर सुरक्षित भारत" पहल शुरू की है?',
    options: ['(a) Ministry of Electronics and Information Technology (MeitY) / इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय', '(b) Ministry of Home Affairs / गृह मंत्रालय', '(c) Ministry of Defence / रक्षा मंत्रालय', '(d) Ministry of Science and Technology / विज्ञान और प्रौद्योगिकी मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'MeitY launched "Cyber Surakshit Bharat" in association with industry partners to train CISOs and IT staff on securing digital public infrastructure.'
  }
];
