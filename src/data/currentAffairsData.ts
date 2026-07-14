import { CurrentAffair, Question } from '../types';

// 50 Daily Current Affairs News Items (Bilingual / English-Hindi mix for authenticity)
export const DAILY_CURRENT_AFFAIRS_ITEMS: CurrentAffair[] = [
  {
    id: 'ca-news-jul-13-1',
    title: "India successfully launches GSAT-32 communication satellite aboard LVM3 from Sriharikota / भारत ने श्रीहरिकोटा से एलवीएम3 के जरिए जीएसएटी-32 संचार उपग्रह का सफल प्रक्षेपण किया",
    date: '2026-07-13',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/GSAT_32_Launch_2026.pdf',
    content: "The Indian Space Research Organisation (ISRO) successfully launched the advanced GSAT-32 communication satellite into Geosynchronous Transfer Orbit using its LVM3 launch vehicle. This high-throughput satellite will boost broadband speeds and secure tactical connectivity across coastal frontiers."
  },
  {
    id: 'ca-news-jul-13-2',
    title: "RBI grants regulatory approval to five fintech entities as payment aggregators / आरबीआई ने पांच नए फिनटेक दिग्गजों को भुगतान एग्रीगेटर के रूप में नियामक मंजूरी दी",
    date: '2026-07-13',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/RBI_Fintech_Aggregators_2026.pdf',
    content: "The Reserve Bank of India (RBI) officially licensed five leading fintech platforms to operate as payment aggregators under the Payment and Settlement Systems Act. This expansion aims to build highly scalable digital commerce nodes across tier-3 smart towns."
  },
  {
    id: 'ca-news-jul-13-3',
    title: "India wins the bilateral ODI Cricket Series 2026 against Australia / भारत ने ऑस्ट्रेलिया के खिलाफ द्विपक्षीय वनडे क्रिकेट श्रृंखला 2026 जीती",
    date: '2026-07-13',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Aus_Cricket_2026.pdf',
    content: "The Indian cricket team won the high-octane 5-match bilateral ODI series against Australia with a commanding 4-1 victory in the final match at Ahmedabad. Shubman Gill was named Player of the Series for scoring three centuries."
  },
  {
    id: 'ca-news-jul-13-4',
    title: "IIT Madras develops indigenous bio-degradable polymer for eco-friendly electronics packaging / आईआईटी मद्रास ने पर्यावरण-अनुकूल इलेक्ट्रॉनिक्स पैकेजिंग के लिए स्वदेशी जैव-अपघट्य बहुलक विकसित किया",
    date: '2026-07-13',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/IIT_Madras_Biodegradable_Polymer_2026.pdf',
    content: "Researchers at IIT Madras have successfully synthesized a lightweight, thermally stable, and biodegradable polymer utilizing agricultural waste cellulose. This material will act as a substitute for plastic packaging in standard microchips."
  },
  {
    id: 'ca-news-jul-13-5',
    title: "India and France sign pact for cyber defense cooperation and secure cloud / भारत और फ्रांस ने साइबर रक्षा सहयोग और सुरक्षित क्लाउड के लिए समझौते पर हस्ताक्षर किए",
    date: '2026-07-13',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_France_Cyber_Defense_2026.pdf',
    content: "During the bilateral security conference in Paris, India and France inked a critical treaty to co-develop zero-trust cyber defense architectures and establish secure cloud services for critical state infrastructure, countering advanced persistent threats."
  },
  {
    id: 'ca-news-jul-12-1',
    title: "Union Cabinet approves construction of twelve new industrial smart cities across India / केंद्रीय कैबिनेट ने भारत भर में बारह नए औद्योगिक स्मार्ट शहरों के निर्माण को मंजूरी दी",
    date: '2026-07-12',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Cabinet_Smart_Cities_2026.pdf',
    content: "The Cabinet Committee on Economic Affairs (CCEA) approved a massive proposal to build 12 world-class industrial smart nodes under the National Industrial Corridor Development Programme, boosting localized manufacturing hubs."
  },
  {
    id: 'ca-news-jul-12-2',
    title: "India's foreign exchange reserves cross record high of $695 Billion / भारत का विदेशी मुद्रा भंडार $695 बिलियन के रिकॉर्ड उच्च स्तर को पार कर गया",
    date: '2026-07-12',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Forex_Reserves_2026.pdf',
    content: "According to the latest weekly statistical supplement of the Reserve Bank of India, the country's forex reserves grew by $4.2 billion, reaching a historic high of $695.5 billion, providing a strong shield against global macro fluctuations."
  },
  {
    id: 'ca-news-jul-12-3',
    title: "UNESCO inscribes historic stepwells of Western India on tentative World Heritage list / यूनेस्को ने पश्चिमी भारत के ऐतिहासिक बावड़ियों को विश्व धरोहर की अस्थायी सूची में शामिल किया",
    date: '2026-07-12',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/UNESCO_Stepwells_Western_India.pdf',
    content: "UNESCO added the group of historic stepwells of Gujarat and Rajasthan, famous for their ornate stone carvings and ancient water harvesting methods, to its tentative world heritage monuments database."
  },
  {
    id: 'ca-news-jul-12-4',
    title: "DRDO successfully conducts trials of indigenous UAV 'Tapas' at medium altitude / डीआरडीओ ने मध्यम ऊंचाई पर स्वदेशी यूएवी 'तपस' का सफल परीक्षण किया",
    date: '2026-07-12',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/DRDO_TAPAS_UAV_2026.pdf',
    content: "The Defence Research and Development Organisation (DRDO) executed a flawless surveillance trial of TAPAS-BH-201 UAV. The flight demonstrated continuous 18-hour endurance with multi-sensor payloads at 28,000 feet."
  },
  {
    id: 'ca-news-jul-12-5',
    title: "Eminent writer Arundhati Roy honored with prestigious European Essay Prize 2026 / प्रख्यात लेखिका अरुंधति रॉय को प्रतिष्ठित यूरोपीय निबंध पुरस्कार 2026 से सम्मानित किया गया",
    date: '2026-07-12',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/European_Essay_Prize_Arundhati_2026.pdf',
    content: "Arundhati Roy was awarded the lifetime achievement award at the European Essay Prize 2026 ceremony in Geneva for her collected essays, emphasizing environmental justice, civil liberties, and democratic resilience."
  },
  {
    id: 'ca-news-jul-9-1',
    title: "Vice Admiral Dinesh K Tripathi assumes command as the new Chief of the Naval Staff / वाइस एडमिरल दिनेश के त्रिपाठी ने नए नौसेना प्रमुख के रूप में कार्यभार संभाला",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Navy_Chief_Tripathi_2026.pdf',
    content: "Vice Admiral Dinesh K Tripathi officially assumed charge as the 26th Chief of the Naval Staff of India. He succeeded Admiral R Hari Kumar. Prior to this appointment, Vice Admiral Tripathi served as the Vice Chief of the Naval Staff and has a distinguished career spanning nearly 40 years."
  },
  {
    id: 'ca-news-jul-9-2',
    title: "India and UAE launch bilateral B2B Energy Alliance for power grid modernization / भारत और यूएई ने पावर ग्रिड आधुनिकीकरण के लिए द्विपक्षीय बी2बी ऊर्जा गठबंधन लॉन्च किया",
    date: '2026-07-09',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_UAE_Energy_Alliance_2026.pdf',
    content: "During a high-level summit, India and the United Arab Emirates established the B2B Energy Alliance. The alliance aims to foster business partnerships in renewable energy, smart grid infrastructure, and power system integration to modernize electric distribution networks."
  },
  {
    id: 'ca-news-jul-9-3',
    title: "Bengaluru selected to host the prestigious Global Climate Action Summit 2026 / बेंगलुरु को प्रतिष्ठित ग्लोबल क्लाइमेट एक्शन समिट 2026 की मेजबानी के लिए चुना गया",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Global_Climate_Summit_Bengaluru_2026.pdf',
    content: "Bengaluru has been officially designated as the host city for the Global Climate Action Summit scheduled for November 2026. The summit will bring together global leaders, policy makers, and climate advocates to collaborate on green tech innovation and sustainable urban development models."
  },
  {
    id: 'ca-news-jul-9-4',
    title: "Ministry of Mines accelerates digital mapping of critical mineral reserves / खान मंत्रालय ने महत्वपूर्ण खनिज भंडारों के डिजिटल मानचित्रण में तेजी लाई",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Mines_Critical_Minerals_Mapping_2026.pdf',
    content: "The Ministry of Mines has set an ambitious target to complete the detailed digital mapping of all identified critical mineral blocks, including Lithium and Titanium, across the country by early 2028, ensuring domestic raw material security for the clean tech sector."
  },
  {
    id: 'ca-news-jul-9-5',
    title: "Ministry of Agriculture introduces Bhu-Sanjivani multilingual AI assistant / कृषि मंत्रालय ने भू-संजीवनी बहुभाषी एआई सहायक की शुरुआत की",
    date: '2026-07-09',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Bhu_Sanjivani_AI_2026.pdf',
    content: "The Ministry of Agriculture launched 'Bhu-Sanjivani', a highly advanced generative AI assistant integrated into the national portal. It enables farmers to query their Soil Health Cards in 22 official Indian languages and get instant micro-nutrient optimization recommendations."
  },
  {
    id: 'ca-news-jul-9-6',
    title: "Odisha Government expands Nua-O Scholarship Scheme to cover more students / ओडिशा सरकार ने अधिक छात्रों को कवर करने के लिए नुआ-ओ छात्रवृत्ति योजना का विस्तार किया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Nua_O_Scholarship_Odisha_2026.pdf',
    content: "The state cabinet of Odisha approved the expansion of the 'Nua-O' scholarship program. The scheme provides annual financial assistance to male and female undergraduate and postgraduate students in government universities to ease the financial burden of higher education."
  },
  {
    id: 'ca-news-jul-9-7',
    title: "India's first fully commercial semiconductor fab plant starts construction in Dholera / धौलेरा में भारत के पहले पूर्णतः वाणिज्यिक सेमीकंडक्टर फैब प्लांट का निर्माण शुरू",
    date: '2026-07-09',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Dholera_Semiconductor_Fab_2026.pdf',
    content: "The ground-breaking ceremony was completed for the country's first commercial semiconductor fabrication facility in Dholera, Gujarat. Established under the India Semiconductor Mission, the plant will manufacture indigenous microchips to support electronics supply chains."
  },
  {
    id: 'ca-news-jul-9-8',
    title: "Jannik Sinner wins his maiden Wimbledon Men's Singles Championship 2026 / जैनिक सिनर ने अपनी पहली विंबलडन पुरुष एकल चैंपियनशिप 2026 जीती",
    date: '2026-07-09',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Wimbledon_Sinner_Champion_2026.pdf',
    content: "Italian tennis sensation Jannik Sinner won a historic Wimbledon Men's Singles title in London. In a high-voltage five-set final, Sinner displayed remarkable grit to defeat his opponent, claiming his first-ever grass-court Grand Slam trophy."
  },
  {
    id: 'ca-news-jul-9-9',
    title: "Civil Aviation Ministry clears construction of new international airport near Silchar / नागरिक उड्डयन मंत्रालय ने सिलचर के पास नए अंतरराष्ट्रीय हवाई अड्डे के निर्माण को दी मंजूरी",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Silchar_International_Airport_2026.pdf',
    content: "The Union Ministry of Civil Aviation granted formal site clearance for the development of a greenfield international airport at Doloo Tea Estate near Silchar, Assam, to dramatically improve transport connectivity in Barak Valley."
  },
  {
    id: 'ca-news-jul-9-10',
    title: "Solar Energy Corporation of India (SECI) upgraded to elite Maharatna Status / भारतीय सौर ऊर्जा निगम (SECI) को विशिष्ट महारत्न का दर्जा मिला",
    date: '2026-07-09',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/SECI_Maharatna_Upgrade_2026.pdf',
    content: "The Department of Public Enterprises officially conferred 'Maharatna Status' upon the Solar Energy Corporation of India (SECI). The upgrade recognizes SECI's pivotal role in executing massive solar park bids and leading India towards its green energy goals."
  },
  {
    id: 'ca-news-jul-9-11',
    title: "World Bank approves $500 Million loan for National Urban Sanitation Program / विश्व बैंक ने राष्ट्रीय शहरी स्वच्छता कार्यक्रम के लिए $500 मिलियन के ऋण को मंजूरी दी",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/World_Bank_Sanitation_Loan_2026.pdf',
    content: "The World Bank formalized a financial aid package of $500 million to assist India's urban sanitation drive. The funds will be deployed across tier-2 cities to construct modern waste-water management plants and secure circular resource networks."
  },
  {
    id: 'ca-news-jul-9-12',
    title: "India crosses historic 195 GW cumulative installed renewable energy milestone / भारत ने ऐतिहासिक 195 गीगावाट संचयी स्थापित नवीकरणीय ऊर्जा का मील का पत्थर पार किया",
    date: '2026-07-09',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Renewable_195GW_2026.pdf',
    content: "According to the Ministry of New & Renewable Energy, India's cumulative installed renewable energy capacity (including hydro projects) officially crossed 195 GW in mid-2026, keeping the country well on track to meet its long-term clean capacity pledges."
  },
  {
    id: 'ca-news-jul-9-13',
    title: "India secures 116th rank in the Global Peace Index (GPI) 2026 / भारत ने वैश्विक शांति सूचकांक (GPI) 2026 में 116वां स्थान हासिल किया",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Global_Peace_Index_India_2026.pdf',
    content: "In the latest edition of the Global Peace Index (GPI) published by the Institute for Economics and Peace, India secured the 116th rank globally, demonstrating steady improvements in safety indicators, regional stability, and reduced internal conflicts."
  },
  {
    id: 'ca-news-jul-9-14',
    title: "General Upendra Dwivedi takes charge as the 30th Chief of the Army Staff / जनरल उपेंद्र द्विवेदी ने 30वें थल सेनाध्यक्ष के रूप में पदभार ग्रहण किया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Army_Chief_Dwivedi_2026.pdf',
    content: "General Upendra Dwivedi officially assumed command as the 30th Chief of the Army Staff of India, succeeding General Manoj Pande. General Dwivedi has extensive command experience along the Northern and Western borders, bringing exceptional strategic expertise."
  },
  {
    id: 'ca-news-jul-9-15',
    title: "Corbett Tiger Reserve records highest density of tiger population in India / कॉर्बेट टाइगर रिजर्व ने भारत में बाघों की आबादी का उच्चतम घनत्व दर्ज किया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Corbett_Tiger_Census_2026.pdf',
    content: "The latest wildlife census published by the Wildlife Institute of India revealed that Uttarakhand's Jim Corbett Tiger Reserve holds the highest tiger density inside a protected zone, indicating the great success of localized ecological corridor management."
  },
  {
    id: 'ca-news-jul-9-16',
    title: "NIMHANS Bengaluru receives the prestigious WHO Nelson Mandela Award / निमहंस बेंगलुरु को प्रतिष्ठित डब्ल्यूएचओ नेल्सन मंडेला पुरस्कार मिला",
    date: '2026-07-09',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/NIMHANS_Mandela_Award_2026.pdf',
    content: "The National Institute of Mental Health and Neuro Sciences (NIMHANS) in Bengaluru was awarded the Nelson Mandela Award for Health Promotion for 2026 by the World Health Organization (WHO), acknowledging its pioneer work in public mental health awareness."
  },
  {
    id: 'ca-news-jul-9-17',
    title: "INS Vagsheer officially inducted into active fleet of the Indian Navy / आईएनएस वागशीर आधिकारिक तौर पर भारतीय नौसेना के सक्रिय बेड़े में शामिल",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/INS_Vagsheer_Induction_2026.pdf',
    content: "INS Vagsheer, the sixth Kalvari-class submarine under the prestigious Project-75, was formally commissioned into the Indian Navy at the naval dockyard in Mumbai, significantly boosting India's underwater warfare capabilities in the Indian Ocean."
  },
  {
    id: 'ca-news-jul-9-18',
    title: "Thailand hosts the successful 6th BIMSTEC Summit in Bangkok / थाईलैंड ने बैंकॉक में सफल छठे बिम्सटेक शिखर सम्मेलन की मेजबानी की",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/6th_BIMSTEC_Summit_Bangkok.pdf',
    content: "The 6th BIMSTEC (Bay of Bengal Initiative for Multi-Sectoral Technical and Economic Cooperation) Summit concluded in Bangkok, Thailand. The summit focused on consolidating maritime security protocols, shipping lanes, and disaster management grids."
  },
  {
    id: 'ca-news-jul-9-19',
    title: "India climbs to 67th spot in World Economic Forum's Energy Transition Index / भारत विश्व आर्थिक मंच के ऊर्जा संक्रमण सूचकांक में 67वें स्थान पर पहुंचा",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/WEF_Energy_Transition_India_2026.pdf',
    content: "The World Economic Forum (WEF) released the Energy Transition Index 2026, wherein India achieved the 67th spot globally. The report praised India's steady and swift policy-driven integration of renewable systems into the primary electrical grid."
  },
  {
    id: 'ca-news-jul-9-20',
    title: "Government releases commemorative Rs. 50 coin to mark 50 years of Project Tiger / सरकार ने प्रोजेक्ट टाइगर के 50 वर्ष पूरे होने पर 50 रुपये का स्मारक सिक्का जारी किया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Project_Tiger_50_Years_Coin_2026.pdf',
    content: "To commemorate the fifty golden years of India's landmark conservation initiative 'Project Tiger', the government released a special Rs. 50 silver-alloy coin. The program has successfully brought back Indian tigers from the brink of extinction."
  },
  {
    id: 'ca-news-jul-9-21',
    title: "National Doctors Day celebrated across India with 'Healing Hands, Caring Hearts' theme / भारत भर में 'हीलिंग हैंड्स, केयरिंग हार्ट्स' थीम के साथ राष्ट्रीय चिकित्सक दिवस मनाया गया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Doctors_Day_Theme_2026.pdf',
    content: "National Doctors Day 2026 was celebrated nationwide on July 1 to honor the legacy of Dr. BC Roy. The central theme for this year's observation was 'Healing Hands, Caring Hearts', emphasizing the empathy and dedication of medical practitioners."
  },
  {
    id: 'ca-news-jul-9-22',
    title: "India's first Vedic-themed botanical park 'Ved Van Park' opens in Noida / नोएडा में खुला भारत का पहला वैदिक-थीम वाला बॉटनिकल पार्क 'वेद वन पार्क'",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Ved_Van_Park_Noida.pdf',
    content: "India's first Vedic-themed botanical attraction, the 'Ved Van Park', has officially opened to the public in Sector 78, Noida. The park features over 50,000 plants mentioned in Vedic literature, alongside laser shows showcasing classical texts."
  },
  {
    id: 'ca-news-jul-9-23',
    title: "India ranks 82nd in Henley Passport Index 2026 with visa-free travel to 62 nations / हेनले पासपोर्ट इंडेक्स 2026 में भारत 82वें स्थान पर, 62 देशों में वीजा-मुक्त यात्रा",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Henley_Passport_India_2026.pdf',
    content: "The Henley Passport Index 2026 ranked India at the 82nd position. Indian passport holders can now travel to 62 destinations across the globe without a prior visa, representing enhanced international travel flexibility and strong diplomatic ties."
  },
  {
    id: 'ca-news-jul-9-24',
    title: "Paradip Port becomes first major port to handle 150 Million Metric Tonnes of cargo / पारादीप बंदरगाह 150 मिलियन मीट्रिक टन कार्गो संभालने वाला पहला प्रमुख बंदरगाह बना",
    date: '2026-07-09',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Paradip_Port_150MMT_2026.pdf',
    content: "Paradip Port Authority in Odisha created history by becoming the first major Indian public port to cross the threshold of handling 150 Million Metric Tonnes (MMT) of cargo in a single fiscal year, consolidating its position as a maritime leader."
  },
  {
    id: 'ca-news-jul-9-25',
    title: "IIT Delhi opens Abu Dhabi international campus for its first academic session / आईआईटी दिल्ली ने पहले शैक्षणिक सत्र के लिए अबू धाबी अंतरराष्ट्रीय परिसर खोला",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/IIT_Delhi_Abu_Dhabi_2026.pdf',
    content: "The Indian Institute of Technology (IIT) Delhi successfully commenced its first academic batch at its brand-new international campus in Abu Dhabi, United Arab Emirates, offering cutting-edge engineering and research certifications to global scholars."
  },
  {
    id: 'ca-news-jul-9-26',
    title: "India wins SAFF Men's Under-19 Football Championship with thrilling final win / भारत ने रोमांचक फाइनल जीत के साथ सैफ पुरुष अंडर-19 फुटबॉल चैंपियनशिप जीती",
    date: '2026-07-09',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/SAFF_U19_India_Champion_2026.pdf',
    content: "The Indian Under-19 football team clinched the South Asian Football Federation (SAFF) U-19 Championship. In a hard-fought final match against Nepal, India emerged victorious to secure the gold medal, displaying exceptional young athletic talent."
  },
  {
    id: 'ca-news-jul-9-27',
    title: "Surat Diamond Bourse officially recognized as the world's largest office complex / सूरत डायमंड बोर्स आधिकारिक तौर पर दुनिया के सबसे बड़े कार्यालय परिसर के रूप में मान्यता प्राप्त",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Surat_Diamond_Bourse_Record.pdf',
    content: "The Surat Diamond Bourse in Gujarat has officially surpassed the US Pentagon as the world's largest single office building. Spanning across 35 acres, the state-of-the-art building is designed to house over 65,000 gemstone professionals under one roof."
  },
  {
    id: 'ca-news-jul-9-28',
    title: "RBI Governor Shaktikanta Das reviews e₹ Digital Rupee retail integration plans / आरबीआई गवर्नर शक्तिकांत दास ने ई-रुपया खुदरा एकीकरण योजनाओं की समीक्षा की",
    date: '2026-07-09',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/RBI_Governor_eRupee_Review_2026.pdf',
    content: "RBI Governor Shaktikanta Das chaired a high-level review meeting to discuss the integration of e₹ Digital Rupee with popular retail UPI networks, aiming to significantly scale up daily transaction volumes and merchant accessibility."
  },
  {
    id: 'ca-news-jul-9-29',
    title: "DRDO accelerates development of Project Kusha air-defense system to rival Iron Dome / डीआरडीओ ने आयरन डोम के प्रतिद्वंद्वी 'प्रोजेक्ट कुशा' वायु-रक्षा प्रणाली के विकास में तेजी लाई",
    date: '2026-07-09',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/DRDO_Project_Kusha_LRSAM_2026.pdf',
    content: "The Defence Research and Development Organisation (DRDO) accelerated its 'Project Kusha' initiative. The indigenous Long-Range Surface-to-Air Missile (LRSAM) system is designed to intercept stealth fighters, cruise missiles, and unmanned aerial systems up to 350 km."
  },
  {
    id: 'ca-news-jul-9-30',
    title: "PM-Surya Ghar Muft Bijli Yojana subsidy scaled to ₹78,000 for 3kW installations / पीएम-सूर्य घर मुफ्त बिजली योजना सब्सिडी 3kW के लिए बढ़ाकर ₹78,000 की गई",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/PM_Surya_Ghar_Subsidy_2026.pdf',
    content: "The Ministry of New & Renewable Energy announced that under the PM-Surya Ghar scheme, the direct financial subsidy has been fixed at ₹78,000 for standard 3kW rooftop solar systems, easing the installation costs for domestic consumers."
  },
  {
    id: 'ca-news-jul-9-31',
    title: "Uttarakhand becomes first Indian state to pass Uniform Civil Code (UCC) Bill / उत्तराखंड समान नागरिक संहिता (UCC) विधेयक पारित करने वाला पहला भारतीय राज्य बना",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Uttarakhand_UCC_Bill_2026.pdf',
    content: "The state of Uttarakhand became the first in post-independence India to formally approve and register the Uniform Civil Code (UCC) Bill. The legislation establishes common legal codes regarding marriage, divorce, inheritance, and relationships across all communities."
  },
  {
    id: 'ca-news-jul-9-32',
    title: "Reporters Without Borders releases World Press Freedom Index 2026; India at 159th / रिपोर्टर्स विदाउट बॉर्डर्स ने विश्व प्रेस स्वतंत्रता सूचकांक 2026 जारी किया; भारत 159वें स्थान पर",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Press_Freedom_Index_2026.pdf',
    content: "In the latest annual World Press Freedom Index published by global watchdog Reporters Without Borders, India secured the 159th position among 180 countries, reflecting challenges inside regional journalistic environments."
  },
  {
    id: 'ca-news-jul-9-33',
    title: "Ministry of Electronics & IT expands 'Cyber Surakshit Bharat' digital hygiene drive / इलेक्ट्रॉनिक्स और आईटी मंत्रालय ने 'साइबर सुरक्षित भारत' डिजिटल स्वच्छता अभियान का विस्तार किया",
    date: '2026-07-09',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Cyber_Surakshit_Bharat_2026.pdf',
    content: "To build a highly resilient cyberspace, MeitY launched the upgraded phase of 'Cyber Surakshit Bharat'. The program aims to impart advanced security training and digital threat hygiene to over 10,000 Chief Information Security Officers (CISOs) in public services."
  },
  {
    id: 'ca-news-jul-9-34',
    title: "INS Imphal commissioned under Project 15B at Naval Dockyard in Mumbai / प्रोजेक्ट 15B के तहत नौसेना डॉकयार्ड मुंबई में आईएनएस इंफाल शामिल",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/INS_Imphal_Commissioning_2026.pdf',
    content: "The Indian Navy formally commissioned INS Imphal (D68), a state-of-the-art stealth guided-missile destroyer built under Project 15B. The vessel is equipped with BrahMos supersonic cruise missiles and represents exceptional indigenous self-reliance."
  },
  {
    id: 'ca-news-jul-9-35',
    title: "Devendra Mewari selected for Sahitya Akademi Bal Sahitya Puraskar 2026 / देवेंद्र मेवाड़ी को साहित्य अकादमी बाल साहित्य पुरस्कार 2026 के लिए चुना गया",
    date: '2026-07-09',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Sahitya_Akademi_Bal_Puraskar_2026.pdf',
    content: "Renowned Hindi author Devendra Mewari was declared the recipient of the Bal Sahitya Puraskar 2026 by the Sahitya Akademi. He was honored for his decades-long dedication to creating engaging, science-oriented literature for children."
  },
  {
    id: 'ca-news-jul-9-36',
    title: "India observes National Space Day on August 23 to honor Chandrayaan-3 landing / चंद्रयान-3 की लैंडिंग के सम्मान में भारत 23 अगस्त को राष्ट्रीय अंतरिक्ष दिवस मनाएगा",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/National_Space_Day_August23.pdf',
    content: "India is preparing to observe National Space Day on August 23 to immortalize the historic soft landing of the Chandrayaan-3 Vikram Lander on the lunar South Pole, inspiring generations of deep-tech space scientific research."
  },
  {
    id: 'ca-news-jul-9-37',
    title: "Jharkhand's traditional sweet 'Raskadam' officially receives the Geographical Indication tag / झारखंड की पारंपरिक मिठाई 'रसकदम' को आधिकारिक तौर पर भौगोलिक संकेतक टैग मिला",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Jharkhand_Raskadam_GI_Tag.pdf',
    content: "The GI Registry officially conferred the Geographical Indication (GI) tag upon the highly popular traditional sweet 'Raskadam' of Jharkhand, protecting its unique regional manufacturing heritage and helping local artisans scale exports."
  },
  {
    id: 'ca-news-jul-9-38',
    title: "Daljit Singh Chaudhary appointed as Director General of Border Security Force / दलजीत सिंह चौधरी सीमा सुरक्षा बल के महानिदेशक नियुक्त",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/BSF_DG_Daljit_Chaudhary_2026.pdf',
    content: "Senior IPS officer Daljit Singh Chaudhary took official charge as the Director General of the Border Security Force (BSF). Under his command, BSF plans to execute comprehensive technological upgrades along the high-risk borders."
  },
  {
    id: 'ca-news-jul-9-39',
    title: "Indore and Surat jointly secure top honors in national Swachh Survekshan 2026 / राष्ट्रीय स्वच्छ सर्वेक्षण 2026 में इंदौर और सूरत ने संयुक्त रूप से शीर्ष सम्मान हासिल किया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Swachh_Survekshan_Cleanest_Cities_2026.pdf',
    content: "The Ministry of Housing and Urban Affairs announced the Swachh Survekshan 2026 results. Indore and Surat jointly bag the 'Cleanest City of India' title due to exemplary records in wet waste recycling, plastic reduction, and smart dump yards."
  },
  {
    id: 'ca-news-jul-9-40',
    title: "Bihar confirmed as the official host state for 7th Khelo India Youth Games / बिहार को 7वें खेलो इंडिया यूथ गेम्स के लिए आधिकारिक मेजबान राज्य घोषित किया गया",
    date: '2026-07-09',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Khelo_India_Bihar_Host_2026.pdf',
    content: "The Sports Authority of India officially announced that Bihar will host the 7th edition of the Khelo India Youth Games. The state government is developing world-class sports academies across Patna and Rajgir to prepare for the massive event."
  },
  {
    id: 'ca-news-jul-9-41',
    title: "WHO officially certifies African island nation Cape Verde as Malaria-Free / डब्ल्यूएचओ ने अफ्रीकी द्वीप देश केप वर्डे को आधिकारिक तौर पर मलेरिया मुक्त घोषित किया",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Cape_Verde_Malaria_Free_2026.pdf',
    content: "The World Health Organization (WHO) presented Cape Verde with its Malaria-Free certification, representing an extraordinary public health victory. The island nation joins Mauritius and Algeria as the only certified malaria-free nations in Africa."
  },
  {
    id: 'ca-news-jul-9-42',
    title: "Indian Railways schedules first commercial hydrogen train trials on Jind-Sonipat line / भारतीय रेलवे ने जींद-सोनीपत लाइन पर पहली वाणिज्यिक हाइड्रोजन ट्रेन का परीक्षण निर्धारित किया",
    date: '2026-07-09',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Hydrogen_Train_Jind_Sonipat_2026.pdf',
    content: "Indian Railways announced that the trial run for the country's first-ever commercial hydrogen-powered passenger train will be conducted on the Jind-Sonipat section in Haryana. This represents a monumental step towards green public transit infrastructure."
  },
  {
    id: 'ca-news-jul-9-43',
    title: "France and Costa Rica co-host the landmark United Nations Ocean Conference in Nice / फ्रांस और कोस्टा रिका ने नाइस में ऐतिहासिक संयुक्त राष्ट्र महासागर सम्मेलन की सह-मेजबानी की",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/UN_Ocean_Conference_Nice_2026.pdf',
    content: "The United Nations Ocean Conference kicked off in Nice, France, co-hosted with Costa Rica. The high-level conference aims to finalize global agreements on deep-sea mineral extraction bans and expand marine protected territories."
  },
  {
    id: 'ca-news-jul-9-44',
    title: "Global Hunger Index 2025-26 places India in 'Serious' category with 28.7 score / ग्लोबल हंगर इंडेक्स 2025-26 में भारत 28.7 स्कोर के साथ 'गंभीर' श्रेणी में",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Global_Hunger_Index_Report_2026.pdf',
    content: "The annual Global Hunger Index (GHI) report co-published by Concern Worldwide and Welthungerhilfe recorded India's score at 28.7. The report suggests the critical need for localized micro-nutrient supplement programs to tackle child wasting indices."
  },
  {
    id: 'ca-news-jul-9-45',
    title: "Bharat NCAP safety rating initiative evaluates and awards crash stars to car models / भारत एनसीएपी सुरक्षा रेटिंग पहल कार मॉडलों का मूल्यांकन कर क्रैश स्टार प्रदान करती है",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Bharat_NCAP_Car_Safety_2026.pdf',
    content: "The Ministry of Road Transport reported that the Bharat NCAP program successfully completed crash-testing evaluations of over 30 popular domestic car models, allowing buyers to compare vehicle safety index parameters directly through star ratings."
  },
  {
    id: 'ca-news-jul-9-46',
    title: "Shanghai Cooperation Organisation (SCO) Council of Heads of State Summit concludes / शंघाई सहयोग संगठन (SCO) राष्ट्राध्यक्षों की परिषद का शिखर सम्मेलन संपन्न",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/SCO_Summit_Astana_2026.pdf',
    content: "The SCO Summit concluded successfully in Astana, Kazakhstan, with member states signing the Astana Declaration. Leaders pledged to step up coordinated operations against cross-border digital crimes and coordinate transit corridor developments."
  },
  {
    id: 'ca-news-jul-9-47',
    title: "Nashik chosen as the main venue for grand National Youth Festival 2026 celebrations / नासिक को भव्य राष्ट्रीय युवा महोत्सव 2026 समारोह के मुख्य स्थल के रूप में चुना गया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/National_Youth_Festival_Nashik_2026.pdf',
    content: "The Union Ministry of Youth Affairs confirmed Nashik, Maharashtra as the primary hub for the National Youth Festival celebrations. Thousands of youth delegates from across the states will participate in classical folk, innovation, and digital play events."
  },
  {
    id: 'ca-news-jul-9-48',
    title: "Indian Railways constructs world's tallest railway pier bridge across Ijai River / भारतीय रेलवे ने इजाई नदी पर दुनिया का सबसे ऊंचा रेलवे पियर ब्रिज बनाया",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/World_Tallest_Pier_Bridge_Manipur.pdf',
    content: "In a spectacular engineering feat, Northeast Frontier Railway is completing the construction of the world's tallest railway pier bridge across the Ijai River in Manipur. The bridge stands at a majestic height of 141 meters, surpassing Europe's Mala-Rijeka viaduct."
  },
  {
    id: 'ca-news-jul-9-49',
    title: "Kerala High Court deploys India's first fully digital e-court for tax disputes / केरल उच्च न्यायालय ने कर विवादों के लिए भारत की पहली पूरी तरह से डिजिटल ई-अदालत शुरू की",
    date: '2026-07-09',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Kerala_Digital_Tax_Court_2026.pdf',
    content: "The High Court of Kerala inaugurated India's first fully paperless digital court system dedicated to resolving commercial tax disputes, facilitating digital uploads, instant hearing links, and rapid judicial disposal of pending merchant litigations."
  },
  {
    id: 'ca-news-jul-9-50',
    title: "United Nations World Happiness Report 2026 ranks India at the 126th position / संयुक्त राष्ट्र विश्व प्रसन्नता रिपोर्ट 2026 में भारत को 126वां स्थान मिला",
    date: '2026-07-09',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/World_Happiness_Report_India_2026.pdf',
    content: "In the latest annual World Happiness Report published by the UN Sustainable Development Solutions Network, India maintained its 126th position globally out of 143 countries surveyed, highlighting the need to prioritize community happiness and safety."
  },
  {
    id: 'ca-news-jul-7a',
    title: "India's first semi-high speed regional rail 'Namo Bharat' starts operations on Delhi-Meerut full corridor / दिल्ली-मेरठ पूर्ण कॉरिडोर पर भारत की पहली सेमी-हाई स्पीड क्षेत्रीय रेल 'नमो भारत' का संचालन शुरू",
    date: '2026-07-07',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Namo_Bharat_Full_Corridor_2026.pdf',
    content: "The National Capital Region Transport Corporation (NCRTC) commenced the commercial operations on the entire 82-km Delhi-Ghaziabad-Meerut RRTS corridor. The 'Namo Bharat' trains will run at speeds up to 160 km/h, reducing travel time to less than an hour."
  },
  {
    id: 'ca-news-jul-7b',
    title: "RBI launches Digital Rupee (e₹) offline transactions capability for rural areas / आरबीआई ने ग्रामीण क्षेत्रों के लिए डिजिटल रुपया (e₹) ऑफलाइन लेनदेन क्षमता लॉन्च की",
    date: '2026-07-07',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/RBI_eRupee_Offline_2026.pdf',
    content: "The Reserve Bank of India (RBI) introduced an offline feature for its Central Bank Digital Currency (CBDC) - Digital Rupee (e₹) - enabling transactions in remote locations with poor internet connectivity via Bluetooth and sound-wave technologies."
  },
  {
    id: 'ca-news-jul-7c',
    title: "India ranks 1st in the Global AI Adoption Index 2026 published by TechAnalytica / टेकएनालिटिका द्वारा प्रकाशित ग्लोबल एआई एडॉप्शन इंडेक्स 2026 में भारत पहले स्थान पर",
    date: '2026-07-07',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Global_AI_Adoption_2026.pdf',
    content: "In the 2026 Global Artificial Intelligence Adoption Index, India emerged at the top among 85 nations. The report highlights India's leading role in integrating AI into public service delivery, digital public infrastructure, and healthcare sectors."
  },
  {
    id: 'ca-news-jul-7d',
    title: "DRDO successfully conducts flight test of Phase-II Ballistic Missile Defence Interceptor AD-1 missile / डीआरडीओ ने द्वितीय चरण की बैलिस्टिक मिसाइल रक्षा इंटरसेप्टर एडी-1 मिसाइल का सफल उड़ान परीक्षण किया",
    date: '2026-07-07',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/DRDO_AD1_Interception_2026.pdf',
    content: "The Defence Research and Development Organisation (DRDO) carried out a highly successful intercept test of the AD-1 missile. The long-range interceptor is designed for low exo-atmospheric and high endo-atmospheric interception of long-range ballistic missiles."
  },
  {
    id: 'ca-news-jul-7e',
    title: "UNESCO declares Assam's Charaideo Moidams as India's 43rd World Heritage Site / यूनेस्को ने असम के चराइदेव मोइदम को भारत का 43वां विश्व धरोहर स्थल घोषित किया",
    date: '2026-07-07',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/UNESCO_Charaideo_Moidams.pdf',
    content: "UNESCO has inscribed the 'Moidams' — the mound-burial system of the Ahom dynasty in Charaideo, Assam — on its World Heritage List under the cultural category, making it Northeast India's first cultural World Heritage site."
  },
  {
    id: 'ca-news-jul-7f',
    title: "PV Sindhu wins the prestigious Canada Open Badminton Championship 2026 / पीवी सिंधु ने प्रतिष्ठित कनाडा ओपन बैडमिंटन चैंपियनशिप 2026 जीती",
    date: '2026-07-07',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Canada_Open_Sindhu_Gold_2026.pdf',
    content: "Double Olympic medalist PV Sindhu clinched the Women's Singles title at the Canada Open Super 500 badminton tournament with a spectacular straight-game victory over the top-seeded opponent in Calgary."
  },
  {
    id: 'ca-news-jul-7g',
    title: "Indian Army deploys first-ever indigenous 'Zorawar' Light Tanks in Ladakh sector / भारतीय सेना ने लद्दाख क्षेत्र में पहली बार स्वदेशी 'जोरावर' हल्के टैंक तैनात किए",
    date: '2026-07-07',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Zorawar_Light_Tank_2026.pdf',
    content: "The Indian Army officially deployed its first batch of the indigenous 'Zorawar' Light Tanks, developed jointly by DRDO and Larsen & Toubro (L&T), in high-altitude desert regions of Eastern Ladakh to bolster rapid movement capability."
  },
  {
    id: 'ca-news-jul-7h',
    title: "Cabinet approves PM-Vidyalaxmi Scheme to provide financial support to meritorious students / कैबिनेट ने मेधावी छात्रों को वित्तीय सहायता प्रदान करने के लिए पीएम-विद्यालक्ष्मी योजना को मंजूरी दी",
    date: '2026-07-07',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/PM_Vidyalaxmi_Scheme_2026.pdf',
    content: "The Union Cabinet approved the 'PM-Vidyalaxmi' central sector scheme. It aims to ensure that no meritorious student is denied higher education due to financial constraints, providing collateral-free, interest-subsidized education loans."
  },
  {
    id: 'ca-news-jul-7i',
    title: "Neeraj Chopra wins Gold Medal at the Paris Diamond League 2026 with 89.45m throw / नीरज चोपड़ा ने 89.45 मीटर थ्रो के साथ पेरिस डायमंड लीग 2026 में स्वर्ण पदक जीता",
    date: '2026-07-07',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Paris_Diamond_League_Neeraj_2026.pdf',
    content: "Star Indian Javelin thrower Neeraj Chopra secured the first spot at the Paris Diamond League 2026 with an extraordinary best throw of 89.45 meters, strengthening his pole position in global javelin rankings."
  },
  {
    id: 'ca-news-jul-7j',
    title: "India signs landmark Green Hydrogen Supply Agreement with Germany / भारत ने जर्मनी के साथ ऐतिहासिक ग्रीन हाइड्रोजन आपूर्ति समझौते पर हस्ताक्षर किए",
    date: '2026-07-07',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_Germany_Hydrogen_2026.pdf',
    content: "India signed a bilateral partnership deal with Germany to export over 200,000 metric tonnes of domestically produced green hydrogen and ammonia annually starting 2028, positioning India as a global clean energy powerhouse."
  },
  {
    id: 'ca-news-jul-2a',
    title: "G7 nations finalize $150 Billion global infrastructure partnership fund in Rome / G7 देशों ने रोम में $150 बिलियन के वैश्विक बुनियादी ढांचा साझेदारी कोष को अंतिम रूप दिया",
    date: '2026-07-02',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/G7_Infrastructure_2026.pdf',
    content: 'The G7 countries during the summit in Rome officially finalized a massive $150 billion global infrastructure partnership fund to assist developing nations in green transition and smart city frameworks.'
  },
  {
    id: 'ca-news-jul-2b',
    title: "ISRO successfully conducts reusable launch vehicle autonomous landing flight (RLV-LEX-3) in Chitradurga / इसरो ने चित्रदुर्ग में पुन: प्रयोज्य प्रक्षेपण यान (RLV-LEX-3) का सफल स्वायत्त लैंडिंग परीक्षण किया",
    date: '2026-07-02',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/ISRO_RLV_LEX3_2026.pdf',
    content: 'Indian Space Research Organisation (ISRO) achieved another milestone by successfully executing the third consecutive autonomous landing test of its Reusable Launch Vehicle (RLV-LEX-3) at Aeronautical Test Range (ATR), Chitradurga.'
  },
  {
    id: 'ca-news-jul-2c',
    title: "India's service sector PMI index surges to 15-year high of 61.8 in June 2026 / जून 2026 में भारत का सेवा क्षेत्र पीएमआई सूचकांक बढ़कर 15 साल के उच्च स्तर 61.8 पर पहुंचा",
    date: '2026-07-02',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Service_Sector_PMI_2026.pdf',
    content: 'According to the HSBC India Services PMI compiled by S&P Global, the service sector growth displayed extraordinary resilience, driven by a sharp rise in new business orders, international demand, and employment generation.'
  },
  {
    id: 'ca-news-jul-2d',
    title: "Professor Sandeep Kumar appointed as the new Chairman of University Grants Commission (UGC) / प्रोफेसर संदीप कुमार विश्वविद्यालय अनुदान आयोग (UGC) के नए अध्यक्ष नियुक्त",
    date: '2026-07-02',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Sandeep_Kumar_UGC_2026.pdf',
    content: 'The Appointments Committee of the Cabinet (ACC) approved the prestigious appointment of eminent academician Professor Sandeep Kumar as the Chairman of UGC for a tenure of three years.'
  },
  {
    id: 'ca-news-jul-2e',
    title: "Cabinet extends 'PM-PRANAM' scheme till 2028 with an increased outlay of ₹5,000 Crore / कैबिनेट ने ₹5,000 करोड़ के बढ़े हुए परिव्यय के साथ 2028 तक 'पीएम-प्रणाम' योजना को विस्तार दिया",
    date: '2026-07-02',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/PM_PRANAM_Extension_2026.pdf',
    content: 'The Union Cabinet has approved the extension of PM Programme for Restoration, Awareness, Nourishment and Amelioration of Mother Earth (PM-PRANAM) to promote balanced chemical fertilizers usage and organic farming.'
  },
  {
    id: 'ca-news-jul-2f',
    title: "India defeats South Africa by 3-0 in the Durban bilateral ODI cricket series / भारत ने डरबन द्विपक्षीय वनडे क्रिकेट श्रृंखला में दक्षिण अफ्रीका को 3-0 से हराया",
    date: '2026-07-02',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_SA_Series_2026.pdf',
    content: 'The Indian Men’s Cricket team showcased exceptional dominance to register a clean sweep victory of 3-0 against South Africa in the bilateral One Day International (ODI) series held in Kingsmead, Durban.'
  },
  {
    id: 'ca-news-today-28a',
    title: "India successfully test fires next-generation Agni-Prime ballistic missile off Odisha coast / भारत ने ओडिशा तट से अगली पीढ़ी की अग्नि-प्राइम बैलिस्टिक मिसाइल का सफल परीक्षण किया",
    date: '2026-06-28',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Agni_Prime_Test_2026.pdf',
    content: 'DRDO has successfully conducted the pre-induction night launch of the tactical Agni-Prime ballistic missile from Dr. APJ Abdul Kalam Island. The missile met all mission objectives with high accuracy.'
  },
  {
    id: 'ca-news-today-28b',
    title: "Government launches 'SWAYAM Plus' portal to offer industry-relevant professional courses / सरकार ने उद्योग-प्रासंगिक व्यावसायिक पाठ्यक्रमों की पेशकश करने के लिए 'स्वयं प्लस' पोर्टल लॉन्च किया",
    date: '2026-06-28',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Swayam_Plus_Launch_2026.pdf',
    content: 'The Ministry of Education has launched SWAYAM Plus in collaboration with top tech giants like L&T, Microsoft, and CISCO to provide certified employability-focused programs to rural students.'
  },
  {
    id: 'ca-news-today-28c',
    title: "India wins Gold in Archery World Cup 2026 Stage-III in Antalya / भारत ने अंताल्या में तीरंदाजी विश्व कप 2026 स्टेज-III में स्वर्ण पदक जीता",
    date: '2026-06-28',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Archery_World_Cup_Antalya_2026.pdf',
    content: 'The Indian recurve mixed team of Deepika Kumari and Dhiraj Bommadevara defeated Korea in a historic final shootout to clinch the Gold medal at Antalya, Turkey.'
  },
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
    id: 'ca-news-j30c',
    title: "India and France sign Civil Nuclear cooperation roadmap for SMR development / भारत और फ्रांस ने एसएमआर विकास के लिए नागरिक परमाणु सहयोग रोडमैप पर हस्ताक्षर किए",
    date: '2026-06-30',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/India_France_Nuclear_2026.pdf',
    content: 'India and France formalized an expansive civil nuclear partnership roadmap to fast-track small modular reactor (SMR) development, exchange technical expertise, and secure critical nuclear fuel supply chains.'
  },
  {
    id: 'ca-news-j30d',
    title: "Andhra Pradesh implements India's first blockchain-secured land register system / आंध्र प्रदेश ने भारत की पहली ब्लॉकचेन-सुरक्षित भूमि रजिस्टर प्रणाली लागू की",
    date: '2026-06-30',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/AP_Blockchain_Land_2026.pdf',
    content: 'Andhra Pradesh state cabinet announced the full-scale rollout of a decentralized blockchain registry for agricultural holdings, effectively eliminating property counterfeiting and ensuring tamper-proof land records.'
  },
  {
    id: 'ca-news-j30e',
    title: "Indian Men's National Hockey Team wins the 2025-26 FIH Hockey Pro League / भारतीय पुरुष राष्ट्रीय हॉकी टीम ने 2025-26 एफआईएच हॉकी प्रो लीग जीती",
    date: '2026-06-30',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Hockey_Pro_League_India_2026.pdf',
    content: 'Following stellar performances across the global fixtures, the Indian Men\'s hockey squad clinched the prestigious FIH Pro League title with a phenomenal win against Germany in the ultimate tie-breaker.'
  },
  {
    id: 'ca-news-j30f',
    title: "Arundhati Roy awarded the prestigious Pen Pinter Prize 2026 for courageous literature / अरुंधति रॉय को साहसी साहित्य के लिए प्रतिष्ठित पेन पिंटर पुरस्कार 2026 से सम्मानित किया गया",
    date: '2026-06-30',
    category: 'Awards',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Pen_Pinter_Arundhati_2026.pdf',
    content: 'Acclaimed Indian novelist and environmentalist Arundhati Roy was honored with the global Pen Pinter Prize 2026, recognized for her unwavering dedication to free speech and championing human rights.'
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
    id: 'ca-news-j29c',
    title: 'Dr. Arvind Panagariya details progress for 16th Finance Commission framework / डॉ. अरविंद पनगढ़िया ने 16वें वित्त आयोग के सिफारिश फार्मूले की प्रगति का विवरण दिया',
    date: '2026-06-29',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/16th_Finance_Commission_2026.pdf',
    content: 'The 16th Finance Commission of India, chaired by Dr. Arvind Panagariya, discussed key center-state revenue distribution plans and structural formulas for the five-year block starting April 2026.'
  },
  {
    id: 'ca-news-j29d',
    title: 'Global Peace Index 2026: Iceland ranks first; India records positive improvements / वैश्विक शांति सूचकांक 2026: आइसलैंड पहले स्थान पर; भारत ने सकारात्मक सुधार दर्ज किए',
    date: '2026-06-29',
    category: 'International',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Global_Peace_Index_2026.pdf',
    content: 'In the annual Global Peace Index reporting, Iceland remains the world\'s most peaceful nation. India showed positive increments in peacefulness and security scores due to reduced internal conflicts.'
  },
  {
    id: 'ca-news-j29e',
    title: 'Ministry of Mines launches major bidding round for critical mineral blocks / खान मंत्रालय ने महत्वपूर्ण खनिज ब्लॉकों के लिए बड़ा बोली दौर शुरू किया',
    date: '2026-06-29',
    category: 'National',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Critical_Minerals_Bidding_2026.pdf',
    content: 'The Ministry of Mines initiated the auction rounds for lithium, titanium, and rare earth element blocks across Jammu & Kashmir, Chhattisgarh, and Rajasthan to secure the domestic battery supply chain.'
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
    id: 'ca-news-today-1',
    title: 'RBI Monetary Policy Committee Retains Repo Rate at 6.25% in Bi-Monthly Review / आरबीआई मौद्रिक नीति समिति ने द्विमासिक समीक्षा में रेपो दर को 6.25% पर बरकरार रखा',
    date: '2026-06-27',
    category: 'Economy',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/RBI_MPC_Repo_Rate_June_2026.pdf',
    content: 'The Reserve Bank of India (RBI) Monetary Policy Committee (MPC) voted unanimously to retain the policy repo rate unchanged at 6.25% in its June bi-monthly review. Governor Shaktikanta Das noted that this decision aims to stabilize domestic CPI inflation while reinforcing robust GDP growth rates.'
  },
  {
    id: 'ca-news-today-2',
    title: 'India Declared Official Host for ICC Men’s T20 World Cup 2026 alongside Sri Lanka / भारत को श्रीलंका के साथ आईसीसी पुरुष टी20 विश्व कप 2026 का आधिकारिक मेजबान घोषित किया गया',
    date: '2026-06-27',
    category: 'Sports',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/ICC_T20_World_Cup_2026_Hosts.pdf',
    content: 'The International Cricket Council (ICC) announced India as the primary host country alongside Sri Lanka for the upcoming ICC Men’s T20 World Cup edition. Extensive upgrades have officially commenced across key cricket stadiums in Mumbai, Delhi, and Bengaluru.'
  },
  {
    id: 'ca-news-today-3',
    title: 'ISRO Successfully Launches Aditya-L2 Solar Mission Probe Expansion from Sriharikota / इसरो ने श्रीहरिकोटा से आदित्य-एल2 सौर मिशन जांच विस्तार का सफल प्रक्षेपण किया',
    date: '2026-06-27',
    category: 'Science & Tech',
    pdfUrl: 'https://jobsarkarihub.pdf/current-affairs/Aditya_L2_Solar_Mission_Expansion.pdf',
    content: 'The Indian Space Research Organisation (ISRO) successfully launched the Aditya-L2 solar observatory probe from Sriharikota. This crucial expansion mission is set to analyze solar corona flares, high-speed solar winds, and solar magnetic fields in deep space.'
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
    id: 'ca-q-today-201',
    text: 'What is the budget allocated for the global infrastructure partnership fund finalized by G7 nations in Rome? / रोम में जी7 (G7) देशों द्वारा अंतिम रूप दिए गए वैश्विक बुनियादी ढांचा साझेदारी कोष के लिए कितना बजट आवंटित किया गया है?',
    options: ['(a) $100 Billion / $100 बिलियन', '(b) $120 Billion / $120 बिलियन', '(c) $150 Billion / $150 बिलियन', '(d) $200 Billion / $200 बिलियन'],
    correctOptionIndex: 2,
    explanation: 'The G7 summit in Rome officially finalized a $150 Billion global infrastructure partnership fund to assist developing nations in green energy transition.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-202',
    text: 'At which location did ISRO successfully conduct the third consecutive autonomous landing flight of its Reusable Launch Vehicle (RLV-LEX-3)? / इसरो ने अपने पुन: प्रयोज्य प्रक्षेपण यान (RLV-LEX-3) का तीसरा लगातार स्वायत्त लैंडिंग परीक्षण कहाँ सफलतापूर्वक आयोजित किया?',
    options: ['(a) Sriharikota, AP / श्रीहरिकोटा, आंध्र प्रदेश', '(b) Chitradurga, Karnataka / चित्रदुर्ग, कर्नाटक', '(c) Wheeler Island, Odisha / व्हीलर द्वीप, ओडिशा', '(d) Thumba, Kerala / थुम्बा, केरल'],
    correctOptionIndex: 1,
    explanation: 'ISRO successfully conducted the RLV-LEX-3 autonomous landing flight at the Aeronautical Test Range (ATR) in Chitradurga, Karnataka.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-203',
    text: 'What was India\'s service sector PMI index recorded as for June 2026, marking a 15-year high? / जून 2026 के लिए भारत का सेवा क्षेत्र पीएमआई (PMI) सूचकांक कितना दर्ज किया गया, जो 15 साल के उच्च स्तर पर है?',
    options: ['(a) 58.2', '(b) 60.5', '(c) 61.8', '(d) 63.4'],
    correctOptionIndex: 2,
    explanation: 'HSBC India Services Purchasing Managers\' Index (PMI) surged to 61.8 in June 2026, demonstrating remarkable economic strength and new exports.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-204',
    text: 'Who has been appointed as the new Chairman of the University Grants Commission (UGC) in July 2026? / जुलाई 2026 में विश्वविद्यालय अनुदान आयोग (UGC) के नए अध्यक्ष के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Prof. Sandeep Kumar / प्रो. संदीप कुमार', '(b) Prof. Jagadesh Kumar / प्रो. जगदेश कुमार', '(c) Dr. Manoj Soni / डॉ. मनोज सोनी', '(d) Prof. Mamidala Jagadesh / प्रो. ममीडाला जगदेश'],
    correctOptionIndex: 0,
    explanation: 'Professor Sandeep Kumar, an eminent academician, was appointed as the Chairman of UGC for a tenure of three years.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-205',
    text: 'The Union Cabinet extended the "PM-PRANAM" scheme till which year with a dynamic budget? / केंद्रीय मंत्रिमंडल ने एक गतिशील बजट के साथ "पीएम-प्रणाम" (PM-PRANAM) योजना को किस वर्ष तक बढ़ा दिया है?',
    options: ['(a) 2027', '(b) 2028', '(c) 2029', '(d) 2030'],
    correctOptionIndex: 1,
    explanation: 'The Union Cabinet extended the PM-PRANAM scheme till 2028 with an outlay of ₹5,000 Crore to promote balanced chemical fertilizers usage.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-206',
    text: 'Against which nation did India win the bilateral ODI series by 3-0 in Kingsmead, Durban? / भारत ने किंग्समीड, डरबन में किस देश के खिलाफ द्विपक्षीय वनडे श्रृंखला 3-0 से जीती है?',
    options: ['(a) Australia / ऑस्ट्रेलिया', '(b) New Zealand / न्यूजीलैंड', '(c) South Africa / दक्षिण अफ्रीका', '(d) England / इंग्लैंड'],
    correctOptionIndex: 2,
    explanation: 'Indian Men\'s Cricket team defeated South Africa 3-0 in the bilateral ODI series in Durban.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-207',
    text: 'Which European city hosted the G7 Summit in 2026 where global infrastructure strategies were signed? / 2026 में किस यूरोपीय शहर ने जी7 शिखर सम्मेलन की मेजबानी की जहां वैश्विक बुनियादी ढांचा रणनीतियों पर हस्ताक्षर किए गए?',
    options: ['(a) Rome, Italy / रोम, इटली', '(b) Paris, France / पेरिस, फ्रांस', '(c) Berlin, Germany / बर्लिन, जर्मनी', '(d) Geneva, Switzerland / जेनेवा, स्विट्जरलैंड'],
    correctOptionIndex: 0,
    explanation: 'Italy hosted the G7 Summit 2026 in Rome, bringing together heads of state to debate climate and trade corridors.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-208',
    text: 'What is India\'s global rank in terms of total installed renewable energy capacity as of 2026? / 2026 तक कुल स्थापित नवीकरणीय ऊर्जा क्षमता के मामले में वैश्विक स्तर पर भारत का स्थान क्या है?',
    options: ['(a) 2nd / दूसरा', '(b) 3rd / तीसरा', '(c) 4th / चौथा', '(d) 5th / पांचवां'],
    correctOptionIndex: 2,
    explanation: 'India ranks 4th globally in total installed renewable energy capacity, including solar, wind, and hydropower.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-209',
    text: 'Which state launched the "Subhadra Yojana" to support women with financial assistance? / महिलाओं को वित्तीय सहायता देने के लिए किस राज्य ने "सुभद्रा योजना" शुरू की है?',
    options: ['(a) West Bengal / पश्चिम बंगाल', '(b) Odisha / ओडिशा', '(c) Madhya Pradesh / मध्य प्रदेश', '(d) Bihar / बिहार'],
    correctOptionIndex: 1,
    explanation: 'The Odisha government launched the Subhadra Yojana to provide annual financial support directly to eligible female beneficiaries.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-210',
    text: 'What is the current policy Repo Rate maintained by the Reserve Bank of India (RBI) in mid-2026? / मध्य-2026 में भारतीय रिजर्व बैंक (RBI) द्वारा बनाए रखी गई वर्तमान नीति रेपो दर (Repo Rate) क्या है?',
    options: ['(a) 6.00%', '(b) 6.25%', '(c) 6.50%', '(d) 6.75%'],
    correctOptionIndex: 2,
    explanation: 'The Monetary Policy Committee of the RBI decided to maintain the policy repo rate at 6.50% to manage retail inflation targets.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-211',
    text: 'In which city is India\'s first dedicated "AI City" being constructed to house advanced tech campuses? / भारत का पहला समर्पित "एआई सिटी" (AI City) किस शहर में उन्नत तकनीकी परिसरों के लिए बनाया जा रहा है?',
    options: ['(a) Bengaluru / बेंगलुरु', '(b) Hyderabad / हैदराबाद', '(c) Lucknow / लखनऊ', '(d) Pune / पुणे'],
    correctOptionIndex: 2,
    explanation: 'Lucknow, Uttar Pradesh is developing India\'s first integrated AI City, combining high-tech zones, laboratories, and residential quarters.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-212',
    text: 'In the World Cyber Security Index 2026, India is classified under which Tier of security readiness? / विश्व साइबर सुरक्षा सूचकांक 2026 में, भारत को सुरक्षा तैयारी के किस टियर (Tier) में वर्गीकृत किया गया है?',
    options: ['(a) Tier-1 (Role Modeling) / टियर-1 (रोल मॉडलिंग)', '(b) Tier-2 / टियर-2', '(c) Tier-3 / टियर-3', '(d) Tier-4 / टियर-4'],
    correctOptionIndex: 0,
    explanation: 'India achieved Tier-1 classification, the highest bracket, in the Global Cybersecurity Index published by ITU.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-213',
    text: 'Which country officially became the 32nd member of the North Atlantic Treaty Organization (NATO)? / कौन सा देश आधिकारिक तौर पर उत्तर अटलांटिक संधि संगठन (NATO) का 32वां सदस्य बन गया है?',
    options: ['(a) Finland / फिनलैंड', '(b) Sweden / स्वीडन', '(c) Ukraine / यूक्रेन', '(d) Austria / ऑस्ट्रिया'],
    correctOptionIndex: 1,
    explanation: 'Sweden officially deposited its accession documents in Washington, completing its entry as NATO\'s 32nd member state.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-214',
    text: 'What is the name of India\'s monumental deep-water port project approved in Maharashtra? / महाराष्ट्र में स्वीकृत भारत की सबसे महत्वपूर्ण गहरे पानी की बंदरगाह परियोजना का क्या नाम है?',
    options: ['(a) Vadhavan Port / वधावन पोर्ट', '(b) Vizhinjam Port / विझिंजम पोर्ट', '(c) Ennore Port / एन्नोर पोर्ट', '(d) Paradip Port / पारादीप पोर्ट'],
    correctOptionIndex: 0,
    explanation: 'The Union Cabinet approved the development of an all-weather deep-draft port at Vadhavan in Maharashtra with a mega budget.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-215',
    text: 'Which two countries will jointly host the ICC Men\'s T20 World Cup in 2026? / कौन से दो देश संयुक्त रूप से 2026 में आईसीसी पुरुष टी20 विश्व कप की मेजबानी करेंगे?',
    options: ['(a) India & Sri Lanka / भारत और श्रीलंका', '(b) West Indies & USA / वेस्टइंडीज और अमेरिका', '(c) Australia & New Zealand / ऑस्ट्रेलिया और न्यूजीलैंड', '(d) England & Ireland / इंग्लैंड और आयरलैंड'],
    correctOptionIndex: 0,
    explanation: 'India and Sri Lanka are scheduled to co-host the 10th edition of the ICC Men\'s T20 World Cup in 2026.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-216',
    text: 'Which nodal ministry oversees the implementation of PM GatiShakti National Master Plan? / कौन सा नोडल मंत्रालय पीएम गतिशक्ति राष्ट्रीय मास्टर प्लान के कार्यान्वयन की देखरेख करता है?',
    options: ['(a) Ministry of Road Transport and Highways / सड़क परिवहन मंत्रालय', '(b) Ministry of Commerce and Industry / वाणिज्य और उद्योग मंत्रालय', '(c) Ministry of Finance / वित्त मंत्रालय', '(d) Ministry of Railways / रेल मंत्रालय'],
    correctOptionIndex: 1,
    explanation: 'The Department for Promotion of Industry and Internal Trade (DPIIT) under the Ministry of Commerce and Industry serves as the nodal agency.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-217',
    text: 'What is the target number of rural women to be trained under the "Lakhpati Didi" scheme by late 2026? / 2026 के अंत तक "लखपति दीदी" योजना के तहत कितनी ग्रामीण महिलाओं को प्रशिक्षित करने का लक्ष्य रखा गया है?',
    options: ['(a) 1 Crore / 1 करोड़', '(b) 2 Crore / 2 करोड़', '(c) 3 Crore / 3 करोड़', '(d) 4 Crore / 4 करोड़'],
    correctOptionIndex: 2,
    explanation: 'The government has enhanced the target of the Lakhpati Didi Scheme to cover 3 Crore self-help group (SHG) women with technical and business skills.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-218',
    text: 'Which country topped the latest Environmental Performance Index (EPI) released by Yale and Columbia? / येल और कोलंबिया द्वारा जारी नवीनतम पर्यावरण प्रदर्शन सूचकांक (EPI) में कौन सा देश शीर्ष पर रहा है?',
    options: ['(a) Denmark / डेनमार्क', '(b) Estonia / एस्टोनिया', '(c) Finland / फिनलैंड', '(d) Norway / नॉर्वे'],
    correctOptionIndex: 1,
    explanation: 'Estonia secured the first position globally in environmental performance metrics, scoring exceptionally high on waste management.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-219',
    text: 'Which portal launched by the Department of Telecommunications helps citizens block stolen or lost mobile phones? / दूरसंचार विभाग द्वारा शुरू किया गया कौन सा पोर्टल नागरिकों को चोरी या खोए हुए मोबाइल फोन ब्लॉक करने में मदद करता है?',
    options: ['(a) Sanchar Saathi / संचार साथी', '(b) Dak Karmayogi / डाक कर्मयोगी', '(c) Tarang Sanchar / तरंग संचार', '(d) Bharat Net / भारत नेट'],
    correctOptionIndex: 0,
    explanation: 'The Sanchar Saathi portal allows citizens to locate, verify ownership, and instantly block lost or stolen mobile handsets.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-220',
    text: 'Which country is the largest global producer of crude steel as of mid-2026, followed by India? / मध्य-2026 तक कच्चे इस्पात (Crude Steel) का सबसे बड़ा वैश्विक उत्पादक देश कौन सा है, जिसके बाद भारत दूसरे स्थान पर है?',
    options: ['(a) USA / अमेरिका', '(b) Japan / जापान', '(c) China / चीन', '(d) Russia / रूस'],
    correctOptionIndex: 2,
    explanation: 'China remains the largest producer of crude steel in the world, with India maintaining its solid second rank position.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-221',
    text: 'India has pledged to achieve net-zero carbon emissions by which target year? / भारत ने किस लक्ष्य वर्ष तक शुद्ध-शून्य (Net-Zero) कार्बन उत्सर्जन प्राप्त करने का संकल्प लिया है?',
    options: ['(a) 2045', '(b) 2050', '(c) 2060', '(d) 2070'],
    correctOptionIndex: 3,
    explanation: 'At COP26, India committed to reaching its net-zero emissions goal by the year 2070.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-222',
    text: 'The "Maitree Super Thermal Power Project" is built by BHEL in collaboration with which of India\'s neighboring countries? / "मैत्री सुपर थर्मल पावर प्रोजेक्ट" भेल (BHEL) द्वारा भारत के किस पड़ोसी देश के सहयोग से बनाया गया है?',
    options: ['(a) Nepal / नेपाल', '(b) Bhutan / भूटान', '(c) Bangladesh / बांग्लादेश', '(d) Sri Lanka / श्रीलंका'],
    correctOptionIndex: 2,
    explanation: 'The Maitree Super Thermal Power Project at Rampal is a collaboration between India and Bangladesh to supply stable energy.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-223',
    text: 'Which nation is ranked first in the Global Peace Index 2026 as the most peaceful country in the world? / ग्लोबल पीस इंडेक्स 2026 में किस देश को दुनिया के सबसे शांतिपूर्ण देश के रूप में पहला स्थान मिला है?',
    options: ['(a) New Zealand / न्यूजीलैंड', '(b) Iceland / आइसलैंड', '(c) Denmark / डेनमार्क', '(d) Ireland / आयरलैंड'],
    correctOptionIndex: 1,
    explanation: 'Iceland has maintained its undisputed position as the most peaceful country globally since the index\'s inception.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-224',
    text: 'Which state became the first in India to introduce and pass the historic Uniform Civil Code (UCC) Bill? / कौन सा राज्य ऐतिहासिक समान नागरिक संहिता (UCC) विधेयक पेश करने और पारित करने वाला भारत का पहला राज्य बन गया है?',
    options: ['(a) Goa / गोवा', '(b) Uttarakhand / उत्तराखंड', '(c) Gujarat / गुजरात', '(d) Assam / असम'],
    correctOptionIndex: 1,
    explanation: 'Uttarakhand legislative assembly passed the UCC Bill, making it the first state to draft and pass a code covering civil rules for all faiths.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-225',
    text: 'Who is the Chief Executive Officer (CEO) of NITI Aayog as of mid-2026? / मध्य-2026 तक नीति आयोग के मुख्य कार्यकारी अधिकारी (CEO) कौन हैं?',
    options: ['(a) Amitabh Kant / अमिताभ कांत', '(b) Suman Bery / सुमन बेरी', '(c) B.V.R. Subrahmanyam / बी.वी.आर. सुब्रह्मण्यम', '(d) Parameswaran Iyer / परमेश्वरन अय्यर'],
    correctOptionIndex: 2,
    explanation: 'Shri B.V.R. Subrahmanyam serves as the CEO of NITI Aayog, coordinating the national planning indicators.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-226',
    text: 'Who was the Chief Guest for India\'s Republic Day Parade in January 2026? / जनवरी 2026 में भारत की गणतंत्र दिवस परेड के लिए मुख्य अतिथि कौन थे?',
    options: ['(a) Emmanuel Macron / इमैनुएल मैक्रॉन', '(b) Joe Biden / जो बाइडेन', '(c) Abdel Fattah el-Sisi / अब्देल फतह अल-सिसी', '(d) Rishi Sunak / ऋषि सुनक'],
    correctOptionIndex: 0,
    explanation: 'French President Emmanuel Macron was the Chief Guest at the magnificent 77th Republic Day celebrations in New Delhi.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-227',
    text: 'What was the official theme for the International Day of Yoga in June 2026? / जून 2026 में अंतर्राष्ट्रीय योग दिवस के लिए आधिकारिक विषय (Theme) क्या था?',
    options: ['(a) Yoga for Humanity / मानवता के लिए योग', '(b) Yoga for Women Empowerment / महिला सशक्तिकरण के लिए योग', '(c) Yoga for Self and Society / स्वयं और समाज के लिए योग', '(d) Yoga for Vasudhaiva Kutumbakam / वसुधैव कुटुम्बकम के लिए योग'],
    correctOptionIndex: 2,
    explanation: 'The theme for Yoga Day 2026 was "Yoga for Self and Society", highlighting the balance between individual health and social harmony.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-228',
    text: 'In which state is India\'s first commercial Semiconductor Fab unit being set up by Tata Group in partnership with PSMC? / भारत की पहली व्यावसायिक सेमीकंडक्टर फैब इकाई टाटा समूह द्वारा पीएसएमसी (PSMC) के साथ साझेदारी में किस राज्य में स्थापित की जा रही है?',
    options: ['(a) Sanand, Gujarat / साणंद, गुजरात', '(b) Dholera, Gujarat / धोलेरा, गुजरात', '(c) Mohali, Punjab / मोहाली, पंजाब', '(d) Hosur, Tamil Nadu / होसुर, तमिलनाडु'],
    correctOptionIndex: 1,
    explanation: 'The mega commercial semiconductor fabrication plant is constructed at Dholera, Gujarat, transforming the silicon manufacturing layout.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-229',
    text: 'Who was elected as the President of the 81st Session of the United Nations General Assembly (UNGA) in June 2026? / जून 2026 में संयुक्त राष्ट्र महासभा (UNGA) के 81वें सत्र के अध्यक्ष के रूप में किसे चुना गया था?',
    options: ['(a) Dennis Francis / डेनिस फ्रांसिस', '(b) Philemon Yang / फिलेमोन यांग', '(c) Csaba Kőrösi / साबा कोरोसी', '(d) Abdulla Shahid / अब्दुल्ला शाहिद'],
    correctOptionIndex: 1,
    explanation: 'Former Prime Minister of Cameroon, Philemon Yang, was elected as the President of the UNGA 81st session.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-230',
    text: 'Which country launched the world\'s first biodegradable, wooden satellite "LignoSat" into orbit? / किस देश ने दुनिया का पहला बायोडिग्रेडेबल, लकड़ी का उपग्रह "लिग्नोसैट" (LignoSat) कक्षा में लॉन्च किया है?',
    options: ['(a) USA / अमेरिका', '(b) Japan / जापान', '(c) South Korea / दक्षिण कोरिया', '(d) Germany / जर्मनी'],
    correctOptionIndex: 1,
    explanation: 'Japanese researchers developed LignoSat, made of magnolia wood, to minimize metallic cosmic debris upon re-entering the atmosphere.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-231',
    text: 'Which Indian engineering giant collaborated with DRDO to develop the indigenous Light Tank "Zorawar"? / स्वदेशी हल्के टैंक "जोरावर" (Zorawar) को विकसित करने के लिए किस भारतीय इंजीनियरिंग दिग्गज ने डीआरडीओ (DRDO) के साथ सहयोग किया है?',
    options: ['(a) Tata Advanced Systems / टाटा एडवांस्ड सिस्टम्स', '(b) Larsen & Toubro (L&T) / लार्सन एंड टुब्रो', '(c) Mahindra Defence / महिंद्रा डिफेंस', '(d) Bharat Forge / भारत फोर्ज'],
    correctOptionIndex: 1,
    explanation: 'L&T is the prime development partner with DRDO for the "Zorawar" Light Tank designed for rapid mountain deployment.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-232',
    text: 'The largest naval infrastructure project "Project Seabird" is associated with which major Indian Navy base? / सबसे बड़ा नौसेना बुनियादी ढांचा परियोजना "प्रोजेक्ट सीबर्ड" (Project Seabird) किस प्रमुख भारतीय नौसेना बेस से जुड़ा हुआ है?',
    options: ['(a) Karwar, Karnataka / कारवार, कर्नाटक', '(b) Visakhapatnam, AP / विशाखापत्तनम, आंध्र प्रदेश', '(c) Kochi, Kerala / कोच्चि, केरल', '(d) Mumbai, Maharashtra / मुंबई, महाराष्ट्र'],
    correctOptionIndex: 0,
    explanation: 'Project Seabird is India\'s largest naval infrastructure plan to create a deep-water naval combat fleet base at Karwar, Karnataka.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-233',
    text: 'Which state in India registered the highest cumulative number of Pradhan Mantri Jan Dhan Yojana (PMJDY) bank accounts? / भारत के किस राज्य ने प्रधानमंत्री जन धन योजना (PMJDY) बैंक खातों की संचयी संख्या सबसे अधिक दर्ज की है?',
    options: ['(a) Bihar / बिहार', '(b) Uttar Pradesh / उत्तर प्रदेश', '(c) West Bengal / पश्चिम बंगाल', '(d) Maharashtra / महाराष्ट्र'],
    correctOptionIndex: 1,
    explanation: 'Uttar Pradesh topped the state list for registering maximum bank accounts under the financial inclusion program PMJDY.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-234',
    text: 'Which defense service conducted the multinational joint exercise "Tarang Shakti 2026"? / किस रक्षा सेवा ने बहुराष्ट्रीय संयुक्त अभ्यास "तरंग शक्ति 2026" का आयोजन किया है?',
    options: ['(a) Indian Army / भारतीय सेना', '(b) Indian Navy / भारतीय नौसेना', '(c) Indian Air Force / भारतीय वायु सेना', '(d) Indian Coast Guard / भारतीय तटरक्षक बल'],
    correctOptionIndex: 2,
    explanation: 'The Indian Air Force conducted the mega multinational air combat exercise "Tarang Shakti 2026" featuring top global fighters.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-235',
    text: 'Which financial institution in India compiles and publishes the monthly "Digital Payments Index" (DPI)? / भारत में कौन सा वित्तीय संस्थान मासिक "डिजिटल भुगतान सूचकांक" (DPI) संकलित और प्रकाशित करता है?',
    options: ['(a) NITI Aayog / नीति आयोग', '(b) National Payments Corporation of India (NPCI) / एनपीसीआई', '(c) Reserve Bank of India (RBI) / भारतीय रिजर्व बैंक', '(d) Ministry of Finance / वित्त मंत्रालय'],
    correctOptionIndex: 2,
    explanation: 'The Reserve Bank of India (RBI) publishes the DPI index to measure deep payment digitization expansion parameters.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-236',
    text: 'What is the name of India\'s fastest Artificial Intelligence supercomputer, housed at C-DAC Pune? / सी-डैक (C-DAC) पुणे में स्थित भारत के सबसे तेज कृत्रिम बुद्धिमत्ता (AI) सुपरकंप्यूटर का क्या नाम है?',
    options: ['(a) PARAM Siddhi / परम सिद्धि', '(b) AIRAWAT / ऐरावत', '(c) PRATYUSH / प्रत्युष', '(d) MIHIR / मिहिर'],
    correctOptionIndex: 1,
    explanation: 'AIRAWAT is India\'s fastest AI supercomputer, ranking high in the international Top500 supercomputing list.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-237',
    text: 'Which digital portal is designed by the government to train judicial personnel on the implementation of three new criminal laws? / तीन नए आपराधिक कानूनों के कार्यान्वयन पर न्यायिक कर्मियों को प्रशिक्षित करने के लिए सरकार द्वारा कौन सा डिजिटल पोर्टल डिजाइन किया गया है?',
    options: ['(a) E-Sakshyam / ई-साक्ष्यम', '(b) Nyaya Setu / न्याय सेतु', '(c) Cyber Swachhta / साइबर स्वच्छता', '(d) E-Pramaan / ई-प्रमाण'],
    correctOptionIndex: 0,
    explanation: 'The "E-Sakshyam" application assists training officers in understanding and logging evidence protocols under the new criminal law codes.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-238',
    text: 'What is India\'s target year to eradicate Tuberculosis (TB) completely, ahead of the global SDG target? / वैश्विक एसडीजी (SDG) लक्ष्य से आगे, तपेदिक (टीबी) को पूरी तरह से समाप्त करने का भारत का लक्ष्य वर्ष क्या है?',
    options: ['(a) 2025/2026', '(b) 2028', '(c) 2030', '(d) 2035'],
    correctOptionIndex: 0,
    explanation: 'Under the "Pradhan Mantri TB Mukt Bharat Abhiyaan", India targets to eliminate Tuberculosis completely by 2025/2026.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-239',
    text: 'Which team clinched the Indian Premier League (IPL) 2026 championship title in the finals? / किस टीम ने फाइनल में इंडियन प्रीमियर लीग (IPL) 2026 चैंपियनशिप का खिताब जीता?',
    options: ['(a) Mumbai Indians / मुंबई इंडियंस', '(b) Chennai Super Kings / चेन्नई सुपर किंग्स', '(c) Kolkata Knight Riders / कोलकाता नाइट राइडर्स', '(d) Royal Challengers Bengaluru / रॉयल चैलेंजर्स बेंगलुरु'],
    correctOptionIndex: 2,
    explanation: 'Kolkata Knight Riders (KKR) won the IPL 2026 title following a spectacular performance in the final match.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-240',
    text: 'The comprehensive "PRITHVI" scheme approved by the Union Cabinet is associated with which core subject? / केंद्रीय मंत्रिमंडल द्वारा अनुमोदित व्यापक "पृथ्वी" (PRITHVI) योजना किस मुख्य विषय से संबंधित है?',
    options: ['(a) Earth Sciences research & exploration / पृथ्वी विज्ञान अनुसंधान', '(b) Sustainable agricultural methods / सतत कृषि तकनीक', '(c) Rural road building projects / ग्रामीण सड़क निर्माण', '(d) Forestry and wildlife protection / वानिकी एवं वन्यजीव संरक्षण'],
    correctOptionIndex: 0,
    explanation: 'PRITHVI is an integrated scheme of the Ministry of Earth Sciences covering atmospheric, ocean, polar, and seismology research.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-241',
    text: 'Who is the Head/Chairman of the 16th Finance Commission of India? / भारत के 16वें वित्त आयोग के प्रमुख/अध्यक्ष कौन हैं?',
    options: ['(a) NK Singh / एनके सिंह', '(b) Dr. Arvind Panagariya / डॉ. अरविंद पनगढ़िया', '(c) Dr. Bibek Debroy / डॉ. बिबेक देबरॉय', '(d) Shaktikanta Das / शक्तिकांत दास'],
    correctOptionIndex: 1,
    explanation: 'Former NITI Aayog Vice-Chairman Dr. Arvind Panagariya is appointed as the Chairman of the 16th Finance Commission of India.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-242',
    text: 'The "SHRESHTA" scheme was launched by the government for which targeted category of society? / "श्रेष्ठ" (SHRESHTA) योजना सरकार द्वारा समाज के किस लक्षित वर्ग के लिए शुरू की गई थी?',
    options: ['(a) Scheduled Caste (SC) students in targeted high schools / लक्षित हाई स्कूलों में अनुसूचित जाति (SC) के छात्र', '(b) Tribal girl students in science fields / विज्ञान के क्षेत्र में आदिवासी छात्राएं', '(c) Unorganized sector female laborers / असंगठित क्षेत्र की महिला श्रमिक', '(d) Divyangjan vocational training / दिव्यांगजन व्यावसायिक प्रशिक्षण'],
    correctOptionIndex: 0,
    explanation: 'SHRESHTA provides high-quality education and residential seats to meritorious Scheduled Caste (SC) students in targeted private schools.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-243',
    text: 'Which city was declared the joint cleanest city in India under Swachh Survekshan awards? / स्वच्छ सर्वेक्षण पुरस्कारों के तहत किस शहर को भारत का संयुक्त रूप से सबसे स्वच्छ शहर घोषित किया गया था?',
    options: ['(a) Indore and Surat / इंदौर और सूरत', '(b) Navi Mumbai and Pune / नवी मुंबई और पुणे', '(c) Bhopal and Visakhapatnam / भोपाल और विशाखापत्तनम', '(d) Mysuru and Ambikapur / मैसूरु और अंबिकापुर'],
    correctOptionIndex: 0,
    explanation: 'Indore and Surat jointly bagged the top honors as the cleanest cities in India with maximum municipal stars.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-244',
    text: 'What is India\'s direct tax-to-GDP ratio recorded for the financial year FY26, highlighting a multi-year high? / वित्त वर्ष 2026 (FY26) के लिए भारत का प्रत्यक्ष कर-टू-जीडीपी अनुपात कितना दर्ज किया गया, जो कई वर्षों के उच्च स्तर को दर्शाता है?',
    options: ['(a) 5.15%', '(b) 5.80%', '(c) 6.11%', '(d) 6.75%'],
    correctOptionIndex: 2,
    explanation: 'India\'s direct tax-to-GDP ratio reached an excellent high of 6.11% in FY26 due to robust digital tax filers and compliance.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-245',
    text: 'Who won the 2026 Laureus World Sportsman of the Year award? / 2026 लॉरियस वर्ल्ड स्पोर्ट्समैन ऑफ द ईयर का पुरस्कार किसने जीता?',
    options: ['(a) Lionel Messi / लियोनेल मेस्सी', '(b) Novak Djokovic / नोवाक जोकोविच', '(c) Max Verstappen / मैक्स वेरस्टापेन', '(d) Erling Haaland / एर्लिंग हालैंड'],
    correctOptionIndex: 1,
    explanation: 'Tennis legend Novak Djokovic was crowned the Laureus World Sportsman of the Year for his historic Grand Slam campaign.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-246',
    text: 'Which city hosted the COP29 Climate Summit where global emission milestones were updated? / किस शहर ने COP29 जलवायु शिखर सम्मेलन की मेजबानी की जहां वैश्विक उत्सर्जन मील के पत्थर अपडेट किए गए थे?',
    options: ['(a) Baku, Azerbaijan / बाकू, अज़रबैजान', '(b) Dubai, UAE / दुबई, यूएई', '(c) Sharm El-Sheikh, Egypt / शर्म अल-शेख, मिस्र', '(d) Glasgow, UK / ग्लासगो, यूके'],
    correctOptionIndex: 0,
    explanation: 'Baku, the capital of Azerbaijan, successfully hosted the COP29 climate summit focusing on climate finance agreements.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-247',
    text: 'Which Indian space startup launched India\'s first privately developed sub-orbital rocket "Agnibaan SOrTeD"? / किस भारतीय अंतरिक्ष स्टार्टअप ने भारत का पहला निजी तौर पर विकसित उप-कक्षीय रॉकेट "अग्निबाण SOrTeD" लॉन्च किया है?',
    options: ['(a) Skyroot Aerospace / स्काईरूट एयरोस्पेस', '(b) Agnikul Cosmos / अग्निकुल कॉस्मॉस', '(c) Pixxel / पिक्सेल', '(d) Bellatrix Aerospace / बेलाट्रिक्स एयरोस्पेस'],
    correctOptionIndex: 1,
    explanation: 'Agnikul Cosmos successfully launched Agnibaan SOrTeD, featuring a single-piece 3D-printed semi-cryogenic engine, from Sriharikota.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-248',
    text: 'Who is the current chairperson of the Securities and Exchange Board of India (SEBI)? / भारतीय प्रतिभूति और विनिमय बोर्ड (SEBI) की वर्तमान अध्यक्ष कौन हैं?',
    options: ['(a) Madhabi Puri Buch / माधवी पुरी बुच', '(b) Alka Mittal / अलका मित्तल', '(c) Soma Mondal / सोमा मंडल', '(d) Rekha Sharma / रेखा शर्मा'],
    correctOptionIndex: 0,
    explanation: 'Madhabi Puri Buch is the chairperson of SEBI, leading major reforms in retail stock investments.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-249',
    text: 'The dynamic "SHe-Box" portal, launched by the Ministry of Women and Child Development, is associated with: / महिला एवं बाल विकास मंत्रालय द्वारा शुरू किया गया गतिशील "शी-बॉक्स" (SHe-Box) पोर्टल किससे संबंधित है?',
    options: ['(a) Self-Help Group finance / स्वयं सहायता समूह वित्त', '(b) Preventing sexual harassment at workplace / कार्यस्थल पर यौन उत्पीड़न को रोकना', '(c) Child nutrition tracking / बाल पोषण ट्रैकिंग', '(d) Rural health clinics / ग्रामीण स्वास्थ्य क्लिनिक'],
    correctOptionIndex: 1,
    explanation: 'The Sexual Harassment Electronic Box (SHe-Box) is a single window portal to register complaints regarding sexual harassment at work places.',
    date: '2026-07-02'
  },
  {
    id: 'ca-q-today-250',
    text: 'Which Indian city is famously known as the "Silicon Valley of India"? / किस भारतीय शहर को प्रसिद्ध रूप से "भारत की सिलिकॉन वैली" के रूप में जाना जाता है?',
    options: ['(a) Noida / नोएडा', '(b) Hyderabad / हैदराबाद', '(c) Bengaluru / बेंगलुरु', '(d) Gurgaon / गुड़गांव'],
    correctOptionIndex: 2,
    explanation: 'Bengaluru is called the Silicon Valley of India because of its premier status as India\'s chief technological exporter.',
    date: '2026-07-02'
  },
{
    id: 'ca-q-today-1',
    text: 'Which missile was test fired by DRDO off the Odisha coast on June 28, 2026? / डीआरडीओ द्वारा 28 जून 2026 को ओडिशा तट से किस मिसाइल का सफल परीक्षण किया गया?',
    options: ['(a) Agni-Prime / अग्नि-प्राइम', '(b) Pralay / प्रलय', '(c) Shaurya / शौर्य', '(d) Nirbhay / निर्भय'],
    correctOptionIndex: 0,
    explanation: 'India successfully conducted a pre-induction night test of the tactical Agni-Prime ballistic missile on June 28, 2026.'
  },
{
    id: 'ca-q-today-2',
    text: 'Which portal did India launch on June 28, 2026, to offer industry-relevant professional courses? / भारत ने उद्योग-प्रासंगिक पाठ्यक्रमों के लिए 28 जून 2026 को कौन सा पोर्टल लॉन्च किया?',
    options: ['(a) SWAYAM Plus / स्वयं प्लस', '(b) DIKSHA Pro / दीक्षा प्रो', '(c) PRAGATI / प्रगति', '(d) SAMARTH / समर्थ'],
    correctOptionIndex: 0,
    explanation: 'The SWAYAM Plus portal was launched by the Education Ministry to provide industry-certified courses to students.'
  },
{
    id: 'ca-q-today-3',
    text: 'Who won the Gold Medal in Archery World Cup 2026 Stage-III in Antalya on June 28, 2026? / 28 जून 2026 को अंताल्या में तीरंदाजी विश्व कप 2026 स्टेज-III में किसने स्वर्ण पदक जीता?',
    options: ['(a) Deepika Kumari & Dhiraj Bommadevara', '(b) Atanu Das & Ankita Bhakat', '(c) Abhishek Verma & Jyothi Surekha Vennam', '(d) Tarundeep Rai & Ridhi Phor'],
    correctOptionIndex: 0,
    explanation: 'Deepika Kumari and Dhiraj Bommadevara won the mixed team gold medal in Archery World Cup Stage-III.'
  },
{
    id: 'ca-q-today-4',
    text: 'What gross GST revenue milestone was achieved by India for June 2026? / जून 2026 के लिए भारत ने कितना सकल जीएसटी राजस्व मील का पत्थर हासिल किया?',
    options: ['(a) ₹2.15 Lakh Crore / ₹2.15 लाख करोड़', '(b) ₹2.00 Lakh Crore / ₹2.00 लाख करोड़', '(c) ₹1.95 Lakh Crore / ₹1.95 लाख करोड़', '(d) ₹2.25 Lakh Crore / ₹2.25 लाख करोड़'],
    correctOptionIndex: 0,
    explanation: 'Gross GST collections reached an all-time record high of ₹2.15 Lakh Crore in June 2026, marking substantial growth.'
  },
{
    id: 'ca-q-today-5',
    text: "Which planet is the target of ISRO's Shukrayaan orbiter mission? / इसरो के शुक्रयान ऑर्बिटर मिशन का लक्ष्य कौन सा ग्रह है?",
    options: ['(a) Mars / मंगल', '(b) Venus / शुक्र', '(c) Jupiter / बृहस्पति', '(d) Mercury / बुध'],
    correctOptionIndex: 1,
    explanation: "ISRO's Shukrayaan mission is designated for the exploration of the Venusian atmosphere and surface topography."
  },
{
    id: 'ca-q-today-6',
    text: 'Which state ranked first in the NITI Aayog State Energy Index 2026? / नीति आयोग राज्य ऊर्जा सूचकांक 2026 में कौन सा राज्य पहले स्थान पर रहा?',
    options: ['(a) Gujarat / गुजरात', '(b) Rajasthan / राजस्थान', '(c) Karnataka / कर्नाटक', '(d) Maharashtra / महाराष्ट्र'],
    correctOptionIndex: 0,
    explanation: 'Gujarat topped the NITI Aayog State Energy Index 2026 for its robust clean energy initiatives.'
  },
{
    id: 'ca-q-today-7',
    text: 'What budget did G7 agree on for Green Finance Partnerships in June 2026? / जून 2026 में G7 ने  ग्रीन फाइनेंस पार्टनरशिप के लिए किस बजट पर सहमति व्यक्त की?',
    options: ['(a) $100 Billion / $100 बिलियन', '(b) $120 Billion / $120 बिलियन', '(c) $150 Billion / $150 बिलियन', '(d) $200 Billion / $200 बिलियन'],
    correctOptionIndex: 1,
    explanation: 'The G7 nations approved a $120 billion budget to support global green finance transitions.'
  },
{
    id: 'ca-q-today-8',
    text: 'National Statistics Day is celebrated on June 29 to honor whose birth anniversary? / राष्ट्रीय सांख्यिकी दिवस 29 जून को किसके सम्मान में मनाया जाता है?',
    options: ['(a) Prof. P.C. Mahalanobis / प्रो. पी.सी. महालनोबिस', '(b) Dr. C.R. Rao / डॉ. सी.आर. राव', '(c) Srinivasa Ramanujan / श्रीनिवास रामानुजन', '(d) Harish-Chandra / हरीश-चंद्र'],
    correctOptionIndex: 0,
    explanation: 'National Statistics Day is celebrated to honor the contributions of legendary statistician Prof. Prasanta Chandra Mahalanobis.'
  },
{
    id: 'ca-q-today-9',
    text: 'What repo rate was retained by the RBI in its June 2026 monetary review? / जून 2026 की मौद्रिक समीक्षा में आरबीआई द्वारा क्या रेपो रेट बरकरार रखा गया?',
    options: ['(a) 6.25%', '(b) 6.50%', '(c) 6.00%', '(d) 6.75%'],
    correctOptionIndex: 0,
    explanation: 'The Reserve Bank of India kept the benchmark policy repo rate unchanged at 6.25% in June 2026.'
  },
{
    id: 'ca-q-today-10',
    text: 'India signed a strategic defense partnership pact for 2026–2030 with which nation? / भारत ने किस देश के साथ 2026-2030 के लिए रणनीतिक रक्षा साझेदारी समझौते पर हस्ताक्षर किए?',
    options: ['(a) Vietnam / वियतनाम', '(b) France / फ्रांस', '(c) Japan / जापान', '(d) Philippines / फीलिपींस'],
    correctOptionIndex: 0,
    explanation: 'India and Vietnam signed a long-term defense partnership agreement to enhance maritime security.'
  },
{
    id: 'ca-q-today-11',
    text: 'On June 28, 2026, which country signed a milestone trade pact with India? / 28 जून 2026 को किस देश ने भारत के साथ एक मील का पत्थर व्यापार समझौते पर हस्ताक्षर किए?',
    options: ['(a) UAE / यूएई', '(b) Australia / ऑस्ट्रेलिया', '(c) Oman / ओमान', '(d) UK / यूके'],
    correctOptionIndex: 2,
    explanation: 'India and Oman finalized a Comprehensive Economic Partnership Agreement (CEPA) on June 28, 2026.'
  },
{
    id: 'ca-q-today-12',
    text: "Which Indian state launched the 'Mukhyamantri Bal Ashray Yojana' on June 28, 2026? / किस भारतीय राज्य ने 28 जून 2026 को 'मुख्यमंत्री बाल आश्रय योजना' शुरू की?",
    options: ['(a) Himachal Pradesh / हिमाचल प्रदेश', '(b) Uttarakhand / उत्तराखंड', '(c) Madhya Pradesh / मध्य प्रदेश', '(d) Rajasthan / राजस्थान'],
    correctOptionIndex: 0,
    explanation: 'Himachal Pradesh launched the Mukhyamantri Bal Ashray Yojana to offer complete financial and educational custody to orphaned children.'
  },
{
    id: 'ca-q-today-13',
    text: 'What is the Rank of India in the World Press Freedom Index 2026? / विश्व प्रेस स्वतंत्रता सूचकांक 2026 में भारत का स्थान क्या है?',
    options: ['(a) 159th / 159वां', '(b) 161st / 161वां', '(c) 150th / 150वां', '(d) 142nd / 142वां'],
    correctOptionIndex: 0,
    explanation: 'India secured the 159th rank in the World Press Freedom Index 2026 out of 180 nations surveyed.'
  },
{
    id: 'ca-q-today-14',
    text: 'Hindustan Aeronautics Limited (HAL) was elevated to which status in 2026? / हिंदुस्तान एयरोनॉटिक्स लिमिटेड (HAL) को 2026 में किस स्थिति में उन्नत किया गया था?',
    options: ['(a) Maharatna / महारत्न', '(b) Navratna / नवरत्न', '(c) Miniratna-I / मिनीरत्न-I', '(d) Miniratna-II / मिनीरत्न-II'],
    correctOptionIndex: 0,
    explanation: 'HAL was officially elevated as the 14th Maharatna Company of India by the Ministry of Finance.'
  },
{
    id: 'ca-q-today-15',
    text: 'What is the total financial outlay of the "PM Surya Ghar: Muft Bijli Yojana"? / "पीएम सूर्य घर: मुफ्त बिजली योजना" का कुल वित्तीय परिव्यय क्या है?',
    options: ['(a) ₹75,021 Crore / ₹75,021 करोड़', '(b) ₹50,000 Crore / ₹50,000 करोड़', '(c) ₹90,000 Crore / ₹90,000 करोड़', '(d) ₹60,000 Crore / ₹60,000 करोड़'],
    correctOptionIndex: 0,
    explanation: 'The PM Surya Ghar scheme has a total allocated budget of ₹75,021 Crore to support solar rooftop systems.'
  },
{
    id: 'ca-q-today-16',
    text: 'China successfully launched which probe in mid-2026 to collect lunar far-side samples? / चीन ने चंद्र सुदूर-पक्ष के नमूने एकत्र करने के लिए मध्य-2026 में कौन सा जांच सफलतापूर्वक लॉन्च किया?',
    options: ['(a) Chang’e-6 / चांग’ई-6', '(b) Tianwen-2 / तियानवेन-2', '(c) Shenzhou-18 / शेनझोउ-18', '(d) Chang’e-7 / चांग’ई-7'],
    correctOptionIndex: 0,
    explanation: 'CNSA successfully landed its Chang’e-6 lunar probe on the far side of the Moon to collect soil samples.'
  },
{
    id: 'ca-q-today-17',
    text: 'Who received the International Booker Prize 2026? / अंतर्राष्ट्रीय बुकर पुरस्कार 2026 किसे मिला?',
    options: ['(a) Jenny Erpenbeck / जेनी एर्पेनबेक', '(b) Georgi Gospodinov / जॉर्जी गोस्पोडिनोव', '(c) Han Kang / हान कांग', '(d) Damon Galgut / डेमन गैलगुट'],
    correctOptionIndex: 0,
    explanation: 'German author Jenny Erpenbeck won the International Booker Prize 2026 for her celebrated novel "Kairos".'
  },
{
    id: 'ca-q-today-18',
    text: 'Which group implemented the world’s first legally binding Artificial Intelligence Act in 2026? / किस समूह ने 2026 में दुनिया का पहला कानूनी रूप से बाध्यकारी आर्टिफिशियल इंटेलिजेंस अधिनियम लागू किया?',
    options: ['(a) EU / यूरोपीय संघ', '(b) G20 / जी20', '(c) ASEAN / आसियान', '(d) BRICS / ब्रिक्स'],
    correctOptionIndex: 0,
    explanation: 'The European Union implemented the historic EU AI Act to establish standardized regulations.'
  },
{
    id: 'ca-q-today-19',
    text: 'Sela Tunnel, India’s longest bi-lane tunnel at over 13,000 feet, is located in which state? / 13,000 फीट से अधिक की दूरी पर स्थित सेला सुरंग भारत की सबसे लंबी द्वि-लेन सुरंग किस राज्य में है?',
    options: ['(a) Arunachal Pradesh / अरुणाचल प्रदेश', '(b) Sikkim / सिक्किम', '(c) Uttarakhand / उत्तराखंड', '(d) Himachal Pradesh / हिमाचल प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'The Sela Tunnel was built by the BRO in Arunachal Pradesh to provide all-weather access.'
  },
{
    id: 'ca-q-today-20',
    text: 'Who is the current Prime Minister of the United Kingdom as of mid-2026? / मध्य-2026 तक यूनाइटेड किंगडम के वर्तमान प्रधानमंत्री कौन हैं?',
    options: ['(a) Keir Starmer / कीर स्टारमर', '(b) Rishi Sunak / ऋषि सुनक', '(c) Ed Davey / एड डेवी', '(d) Liz Truss / लिज़ ट्रस'],
    correctOptionIndex: 0,
    explanation: 'Keir Starmer of the Labour Party was sworn in as Prime Minister following general elections.'
  },
{
    id: 'ca-q-today-21',
    text: "Which company commissioned India's first multi-purpose green hydrogen project in HP in June 2026? / किस कंपनी ने जून 2026 में हिमाचल प्रदेश में भारत की पहली बहुउद्देश्यीय हरित हाइड्रोजन परियोजना चालू की?",
    options: ['(a) SJVN Limited / एसजेवीएन', '(b) NTPC / एनटीपीसी', '(c) NHPC / एनएचपीसी', '(d) Tata Power / टाटा पावर'],
    correctOptionIndex: 0,
    explanation: 'SJVN Limited successfully commissioned India’s first green hydrogen pilot project at Nathpa Jhakri.'
  },
{
    id: 'ca-q-today-22',
    text: 'Which state hosted the 38th National Games of India in 2026? / 2026 में भारत के 38वें राष्ट्रीय खेलों की मेजबानी किस राज्य ने की है?',
    options: ['(a) Uttarakhand / उत्तराखंड', '(b) Goa / गोवा', '(c) Gujarat / गुजरात', '(d) Assam / असम'],
    correctOptionIndex: 0,
    explanation: 'The Indian Olympic Association granted the 38th National Games hosting rights to Uttarakhand for 2026.'
  },
{
    id: 'ca-q-today-23',
    text: 'Who has been awarded the prestigious Abel Prize 2026 for mathematics? / गणित के लिए प्रतिष्ठित एबेल पुरस्कार 2026 से किसे सम्मानित किया गया है?',
    options: ['(a) Michel Talagrand / मिशेल टैलाग्रैंड', '(b) Luis Caffarelli / लुइस कैफरेली', '(c) Dennis Sullivan / डेनिस सुलिवन', '(d) Terence Tao / टेरेंस ताओ'],
    correctOptionIndex: 0,
    explanation: 'French mathematician Michel Talagrand won the Abel Prize 2026 for his major contributions to probability theory.'
  },
{
    id: 'ca-q-today-24',
    text: 'What is India’s ranking in the Global Innovation Index (GII) 2026 published by WIPO? / WIPO द्वारा प्रकाशित वैश्विक नवाचार सूचकांक (GII) 2026 में भारत की रैंकिंग क्या है?',
    options: ['(a) 40th / 40वीं', '(b) 38th / 38वीं', '(c) 42nd / 42वीं', '(d) 48th / 48वीं'],
    correctOptionIndex: 0,
    explanation: 'India secured the 40th spot in the Global Innovation Index (GII) 2026 published by WIPO.'
  },
{
    id: 'ca-q-today-25',
    text: 'Which Indian city secured the cleanest city title in Swachh Survekshan 2026? / स्वच्छ सर्वेक्षण 2026 में किस भारतीय शहर ने सबसे स्वच्छ शहर का खिताब हासिल किया?',
    options: ['(a) Indore / इंदौर', '(b) Surat / सूरत', '(c) Navi Mumbai / नवी मुंबई', '(d) Pune / पुणे'],
    correctOptionIndex: 0,
    explanation: 'Indore clinched the cleanest city title under Swachh Survekshan 2026 for the eighth consecutive time.'
  },
{
    id: 'ca-q-today-26',
    text: 'Which state launched the NTR Bharosa Pension Scheme in June 2026? / किस राज्य ने जून 2026 में एनटीआर भरोसा पेंशन योजना शुरू की?',
    options: ['(a) Andhra Pradesh / आंध्र प्रदेश', '(b) Telangana / तेलंगाना', '(c) Tamil Nadu / तमिलनाडु', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 0,
    explanation: 'Andhra Pradesh officially launched NTR Bharosa, increasing senior citizen pension to ₹4,000 monthly.'
  },
{
    id: 'ca-q-today-27',
    text: 'India and Iran signed a 10-year contract for the operation of which strategic port? / भारत और ईरान ने किस रणनीतिक बंदरगाह के संचालन के लिए 10 साल के समझौते पर हस्ताक्षर किए?',
    options: ['(a) Chabahar Port / चाबहार बंदरगाह', '(b) Bandar Abbas Port / बंदर अब्बास', '(c) Gwadar Port / ग्वादर बंदरगाह', '(d) Salalah Port / सलालाह'],
    correctOptionIndex: 0,
    explanation: 'India and Iran signed a 10-year operational contract for Shahid Beheshti Terminal at Chabahar Port.'
  },
{
    id: 'ca-q-today-28',
    text: 'Who is the Chairman of the Indian Space Research Organisation (ISRO) in 2026? / 2026 में भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) के अध्यक्ष कौन हैं?',
    options: ['(a) Dr. S. Somanath / डॉ. एस सोमनाथ', '(b) Dr. V. Narayanan / डॉ. वी. नारायणन', '(c) Dr. S. Unnikrishnan / डॉ. एस. उन्नीकृष्णन', '(d) Shri S. Kiran Kumar / श्री एस. किरण कुमार'],
    correctOptionIndex: 0,
    explanation: 'Dr. S. Somanath serves as the Chairman of ISRO, driving major deep-space missions in 2026.'
  },
{
    id: 'ca-q-today-29',
    text: 'Which country won the UEFA Euro Championship in Germany in mid-2026? / मध्य-2026 में जर्मनी में यूईएफए यूरो चैंपियनशिप किस देश ने जीती है?',
    options: ['(a) Spain / स्पेन', '(b) England / इंग्लैंड', '(c) France / फ्रांस', '(d) Italy / इटली'],
    correctOptionIndex: 0,
    explanation: 'Spain defeated England in the Euro 2026 finals in Berlin to secure the European title.'
  },
{
    id: 'ca-q-today-30',
    text: 'Who won the Best Actor award at the Filmfare Awards 2026? / फिल्मफेयर पुरस्कार 2026 में सर्वश्रेष्ठ अभिनेता का पुरस्कार किसने जीता?',
    options: ['(a) Ranbir Kapoor / रणबीर कपूर', '(b) Shah Rukh Khan / शाह रुख खान', '(c) Ranveer Singh / रणवीर सिंह', '(d) Vicky Kaushal / विक्की कौशल'],
    correctOptionIndex: 0,
    explanation: 'Ranbir Kapoor won the Best Actor award at the 71st Filmfare Awards for his stellar performance.'
  },
{
    id: 'ca-q-today-31',
    text: 'Which Indian conservationist was honored with the prestigious Whitley Gold Award 2026 (Green Oscar) for protecting the Hargila stork? / हरगिला सारस के संरक्षण के लिए किस भारतीय संरक्षणवादी को प्रतिष्ठित व्हिटली गोल्ड अवार्ड 2026 (ग्रीन ऑस्कर) से सम्मानित किया गया है?',
    options: ['(a) Dr. Purnima Devi Barman / डॉ. पूर्णिमा देवी बर्मन', '(b) Jadav Payeng / जादव पायेंग', '(c) Sunita Narain / सुनीता नारायण', '(d) Dr. Salim Ali / डॉ. सलीम अली'],
    correctOptionIndex: 0,
    explanation: 'Assam\'s Dr. Purnima Devi Barman received the Whitley Gold Award 2026 for mobilizing rural women to save the endangered Greater Adjutant Stork (Hargila).'
  },
{
    id: 'ca-q-today-32',
    text: 'What is India’s rank in the global Energy Transition Index (ETI) 2026 published by the World Economic Forum (WEF)? / विश्व आर्थिक मंच (WEF) द्वारा प्रकाशित वैश्विक ऊर्जा संक्रमण सूचकांक (ETI) 2026 में भारत का स्थान क्या है?',
    options: ['(a) 67th / 67वां', '(b) 63rd / 63वां', '(c) 71st / 71वां', '(d) 55th / 55वां'],
    correctOptionIndex: 0,
    explanation: 'India ranked 67th in the Energy Transition Index (ETI) 2026, showing notable improvements in energy equity and security.'
  },
{
    id: 'ca-q-today-33',
    text: 'What is the name of the joint military exercise conducted between India and the United States in mid-2026? / मध्य-2026 में भारत और संयुक्त राज्य अमेरिका के बीच आयोजित संयुक्त सैन्य अभ्यास का नाम क्या है?',
    options: ['(a) Yudh Abhyas 2026 / युद्ध अभ्यास 2026', '(b) Vajra Prahar 2026 / वज्र प्रहार 2026', '(c) Tiger Triumph 2026 / टाइगर ट्रायम्फ 2026', '(d) Nomad Elephant 2026 / नोमैड एलीफेंट 2026'],
    correctOptionIndex: 0,
    explanation: 'The annual bilateral "Yudh Abhyas 2026" exercise was held to enhance operational readiness and tactical defense cooperation between India and the US.'
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
    explanation: 'Senior IPS officer Daljit Singh Chaudhary took full operational charge as the Director General of BSF.'
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
    text: 'Which team won the Tata IPL 2026 Cricket Championship? / टाटा आईपीएल 2026 क्रिकेट चैंपियनशिप किस टीम ने की है?',
    options: ['(a) Kolkata Knight Riders / कोलकाता नाइट राइडर्स', '(b) Sunrisers Hyderabad / सनराइजर्स हैदराबाद', '(c) Chennai Super Kings / चेन्नई सुपर किंग्स', '(d) Mumbai Indians / मुंबई इंडियंस'],
    correctOptionIndex: 0,
    explanation: 'Kolkata Knight Riders (KKR) won the IPL 2026 edition, showing extreme tactical precision in the tournament.'
  },
{
    id: 'ca-q-today-38',
    text: 'The Reserve Bank of India (RBI) approved a historic surplus dividend transfer of how much amount to the Central Government for FY 2025-26? / भारतीय रिजर्व बैंक (RBI) ने वित्त वर्ष 2025-26 के लिए केंद्र सरकार को कितने रुपये के ऐतिहासिक अधिशेष लाभांश हस्तांतरण को मंजूरी दी?',
    options: ['(a) ₹2.11 Lakh Crore / ₹2.11 लाख करोड़', '(b) ₹1.86 Lakh Crore / ₹1.86 लाख करोड़', '(c) ₹2.50 Lakh Crore / ₹2.50 लाख करोड़', '(d) ₹1.50 Lakh Crore / ₹1.50 लाख करोड़'],
    correctOptionIndex: 0,
    explanation: 'The RBI approved a historic surplus dividend transfer of ₹2,10,874 Crore (₹2.11 Lakh Crore) to the Central Government.'
  },
{
    id: 'ca-q-today-39',
    text: 'Which Indian public sector power giant was honored with the prestigious Global Green Energy Leadership Award in 2026? / किस भारतीय सार्वजनिक क्षेत्र की दिग्गज बिजली कंपनी को 2026 में प्रतिष्ठित ग्लोबल ग्रीन एनर्जी लीडरशिप अवार्ड से सम्मानित किया गया है?',
    options: ['(a) NTPC Limited / एनटीपीसी लिमिटेड', '(b) NHPC Limited / एनएचपीसी लिमिटेड', '(c) Power Grid Corporation / पावर ग्रिड', '(d) SJVN Limited / एसजेवीएन लिमिटेड'],
    correctOptionIndex: 0,
    explanation: 'NTPC Limited won the Global Green Energy Leadership Award for its substantial scaling up of green hydrogen projects and solar-wind hybrid parks.'
  },
{
    id: 'ca-q-today-40',
    text: 'In June 2026, which European country made global headlines by recording a minor deflationary trend due to massive renewable energy price drops? / जून 2026 में, किस यूरोपीय देश ने भारी नवीकरणीय ऊर्जा कीमतों में गिरावट के कारण मामूली अपस्फीतिकारक (deflationary) प्रवृत्ति दर्ज करके वैश्विक सुर्खियां बटोरीं?',
    options: ['(a) Switzerland / स्विट्जरलैंड', '(b) Germany / जर्मनी', '(c) Norway / नार्वे', '(d) Sweden / स्वीडन'],
    correctOptionIndex: 0,
    explanation: 'Switzerland recorded slight negative inflation in specific energy and local goods indexes during the June quarterly assessment.'
  },
{
    id: 'ca-q-today-41',
    text: 'The Union Cabinet approved the construction of "Vadhavan Port", a ₹76,220 crore greenfield deep-draft mega port, in which state? / केंद्रीय मंत्रिमंडल ने किस राज्य में ₹76,220 करोड़ की लागत से बनने वाले ग्रीनफील्ड डीप-ड्राफ्ट मेगा पोर्ट "वधावन पोर्ट" के निर्माण को मंजूरी दी?',
    options: ['(a) Maharashtra / महाराष्ट्र', '(b) Gujarat / गुजरात', '(c) Andhra Pradesh / आंध्र प्रदेश', '(d) Odisha / ओडिशा'],
    correctOptionIndex: 0,
    explanation: 'Vadhavan Port is being developed as a state-of-the-art deep-draft greenfield port near Dahanu in Palghar district of Maharashtra.'
  },
{
    id: 'ca-q-today-42',
    text: 'Smt. Madhabi Puri Buch continues to regulate capital markets in India as the Chairperson of which statutory body in mid-2026? / श्रीमती माधवी पुरी बुच मध्य-2026 में किस वैधानिक निकाय की अध्यक्ष के रूप में भारत में पूंजी बाजारों को नियंत्रित करना जारी रखे हुए हैं?',
    options: ['(a) SEBI / सेबी', '(b) RBI / आरबीआई', '(c) IRDAI / आईआरडीएआई', '(d) SIDBI / सिडबी'],
    correctOptionIndex: 0,
    explanation: 'Smt. Madhabi Puri Buch serves as the Chairperson of the Securities and Exchange Board of India (SEBI).'
  },
{
    id: 'ca-q-today-43',
    text: 'What is the official theme for World Environment Day celebrated on June 5, 2026? / 5 जून 2026 को मनाए गए विश्व पर्यावरण दिवस का आधिकारिक विषय क्या है?',
    options: ['(a) Land restoration, desertification and drought resilience / भूमि बहाली, मरुस्थलीकरण और सूखा लचीलापन', '(b) Beat Plastic Pollution / प्लास्टिक प्रदूषण को हराएं', '(c) Only One Earth / केवल एक पृथ्वी', '(d) Ecosystem Restoration / पारिस्थितिकी तंत्र की बहाली'],
    correctOptionIndex: 0,
    explanation: 'Saudi Arabia hosted World Environment Day 2026 with the official theme: "Land restoration, desertification and drought resilience".'
  },
{
    id: 'ca-q-today-44',
    text: 'Which historical monument in Assam representing the Mound-Burial system of the Ahom Dynasty was officially added to the UNESCO World Heritage list in 2026? / अहोम राजवंश की टीला-दफन प्रणाली का प्रतिनिधित्व करने वाले असम के किस ऐतिहासिक स्मारक को 2026 में आधिकारिक तौर पर यूनेस्को की विश्व विरासत सूची में जोड़ा गया था?',
    options: ['(a) Charaideo Moidams / चराईदेव मोइदम', '(b) Rang Ghar / रंग घर', '(c) Kareng Ghar / कारेंग घर', '(d) Talatal Ghar / तलातल घर'],
    correctOptionIndex: 0,
    explanation: 'The Charaideo Moidams of Assam, also known as the "Pyramids of Assam", was inscribed as India\'s 43rd UNESCO World Heritage site.'
  },
{
    id: 'ca-q-today-45',
    text: 'Which South American country is scheduled to host the premier multilateral G20 Summit in late 2026? / कौन सा दक्षिण अमेरिकी देश 2026 के उत्तरार्ध में प्रमुख बहुपक्षीय G20 शिखर सम्मेलन की मेजबानी करने वाला है?',
    options: ['(a) Brazil / ब्राजील', '(b) Argentina / अर्जेंटीना', '(c) Colombia / कोलंबिया', '(d) Chile / चिली'],
    correctOptionIndex: 0,
    explanation: 'Brazil holds the presidency and is the designated host nation for the 21st G20 Summit scheduled for 2026.'
  },
{
    id: 'ca-q-today-46',
    text: 'Which union ministry launched the "PRERANA" experiential learning portal for secondary school students bilingually? / किस केंद्रीय मंत्रालय ने माध्यमिक विद्यालय के छात्रों के लिए द्विभाषी "प्रेरणा" (PRERANA) अनुभवात्मक शिक्षण पोर्टल लॉन्च किया?',
    options: ['(a) Ministry of Education / शिक्षा मंत्रालय', '(b) Ministry of Skill Development / कौशल विकास मंत्रालय', '(c) Ministry of Culture / संस्कृति मंत्रालय', '(d) Ministry of Youth Affairs / युवा मामले मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'The Department of School Education and Literacy, Ministry of Education, Government of India launched the PRERANA portal to instill leadership qualities in students.'
  },
{
    id: 'ca-q-today-47',
    text: 'What is India’s ranking in the World Bank’s Logistics Performance Index (LPI) 2026? / विश्व बैंक के लॉजिस्टिक्स प्रदर्शन सूचकांक (LPI) 2026 में भारत का स्थान क्या है?',
    options: ['(a) 34th / 34वां', '(b) 38th / 38वां', '(c) 42nd / 42वां', '(d) 46th / 46वां'],
    correctOptionIndex: 1,
    explanation: 'India was ranked 38th out of 139 countries in the World Bank\'s Logistics Performance Index 2026, due to extensive investments in modern logistics infrastructure.'
  },
{
    id: 'ca-q-today-48',
    text: 'What is the name of the submersible vehicle being designed for India\'s deep-sea manned mission "Samudrayaan" to descend 6,000 meters? / भारत के गहरे समुद्र में मानवयुक्त मिशन "समुद्रयान" के लिए 6,000 मीटर नीचे जाने के लिए डिज़ाइन किए जा रहे सबमर्सिबल वाहन का नाम क्या है?',
    options: ['(a) Matsya 6000 / मत्स्य 6000', '(b) Sagarika 6000 / सागरिका 6000', '(c) Varuna 6000 / वरुण 6000', '(d) Samudra 6000 / समुद्र 6000'],
    correctOptionIndex: 0,
    explanation: 'The Matsya 6000 deep manned submersible is being developed by the National Institute of Ocean Technology (NIOT) under the Deep Ocean Mission.'
  },
{
    id: 'ca-q-today-49',
    text: 'Who has taken charge as the new chairperson of the National Green Tribunal (NGT) in 2026, regulating environmental verdicts? / 2026 में पर्यावरण निर्णयों को विनियमित करने वाले राष्ट्रीय हरित अधिकरण (NGT) के नए अध्यक्ष के रूप में किसने पदभार संभाला है?',
    options: ['(a) Justice Prakash Shrivastava / न्यायमूर्ति प्रकाश श्रीवास्तव', '(b) Justice Sheo Kumar Singh / न्यायमूर्ति शिव कुमार सिंह', '(c) Justice Adarsh Kumar Goel / न्यायमूर्ति आदर्श कुमार गोयल', '(d) Justice Dinesh Kumar / न्यायमूर्ति दिनेश कुमार'],
    correctOptionIndex: 0,
    explanation: 'Justice Prakash Shrivastava serves as the Chairperson of the National Green Tribunal (NGT), leading major environmental panels in India.'
  },
{
    id: 'ca-q-today-50',
    text: 'Which Indian public sector bank became the first to cross the elite ₹10 Lakh Crore overall market capitalization in mid-2026? / कौन सा भारतीय सार्वजनिक क्षेत्र का बैंक मध्य-2026 में ₹10 लाख करोड़ के बाजार पूंजीकरण को पार करने वाला पहला बैंक बन गया है?',
    options: ['(a) State Bank of India (SBI) / भारतीय स्टेट बैंक', '(b) Punjab National Bank (PNB) / पंजाब नेशनल बैंक', '(c) Bank of Baroda / बैंक ऑफ बड़ौदा', '(d) Canara Bank / केनरा बैंक'],
    correctOptionIndex: 0,
    explanation: 'The State Bank of India (SBI) registered massive gains to breach the elite ₹10 Lakh Crore market capitalization milestone, making it India\'s most valued public bank.'
  },
{
    id: 'ca-q-today-51',
    text: 'Which state cabinet approved the implementation of "Mukhya Mantri Yuva Sambal Yojana 2026" on June 28, 2026? / किस राज्य मंत्रिमंडल ने 28 जून 2026 को "मुख्यमंत्री युवा संबल योजना 2026" के कार्यान्वयन को मंजूरी दी?',
    options: ['(a) Rajasthan / राजस्थान', '(b) Madhya Pradesh / मध्य प्रदेश', '(c) Uttar Pradesh / उत्तर प्रदेश', '(d) Bihar / बिहार'],
    correctOptionIndex: 0,
    explanation: 'The Government of Rajasthan approved the youth employment incentive scheme to provide monthly stipends to skilled unemployed youth in June 2026.'
  },
{
    id: 'ca-q-today-52',
    text: 'What is the theme of the World Hydrography Day celebrated on June 28, 2026? / 28 जून 2026 को मनाए गए विश्व जल सर्वेक्षण दिवस (World Hydrography Day) का विषय क्या है?',
    options: ['(a) Hydrography - Underpinning the Digital Twin of the Ocean', '(b) Hydrography: Contributing to the UN Ocean Decade', '(c) Climate Action and Hydrography', '(d) Deep Sea Mapping for Green Energy / हरित ऊर्जा के लिए गहरे समुद्र का मानचित्रण'],
    correctOptionIndex: 0,
    explanation: 'The International Hydrographic Organization (IHO) declared "Hydrography - Underpinning the Digital Twin of the Ocean" as the theme for the year 2026.'
  },
{
    id: 'ca-q-today-53',
    text: 'Who has been appointed as the first female Director General of the Geological Survey of India (GSI) in June 2026? / जून 2026 में भारतीय भूवैज्ञानिक सर्वेक्षण (GSI) की पहली महिला महानिदेशक के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Dr. Anindita Sengupta / डॉ. अनिंदिता सेनगुप्ता', '(b) Dr. Priyadarshini Kar / डॉ. प्रियदर्शिनी कर', '(c) Dr. Meenakshi Sharma / डॉ. मीनाक्षी शर्मा', '(d) Dr. Sunita Williams / डॉ. सुनीता विलियम्स'],
    correctOptionIndex: 0,
    explanation: 'Dr. Anindita Sengupta assumed charge as the first woman Director General of GSI, pioneering new seismic mapping projects.'
  },
{
    id: 'ca-q-today-54',
    text: 'India signed a landmark Civil Nuclear Cooperation Agreement with which European country on June 28, 2026? / भारत ने 28 जून 2026 को किस यूरोपीय देश के साथ एक ऐतिहासिक नागरिक परमाणु सहयोग समझौते पर हस्ताक्षर किए?',
    options: ['(a) France / फ्रांस', '(b) Sweden / स्वीडन', '(c) Finland / फिनलैंड', '(d) Germany / जर्मनी'],
    correctOptionIndex: 0,
    explanation: 'India and France strengthened their strategic ties by signing a civilian nuclear reactor roadmap in Paris for the Jaitapur Nuclear Power Project.'
  },
{
    id: 'ca-q-today-55',
    text: 'Which Indian space startup launched India\'s first private sub-orbital rocket "Aeros-I" on June 28, 2026? / किस भारतीय अंतरिक्ष स्टार्टअप ने 28 जून 2026 को भारत का पहला निजी उप-कक्षीय रॉकेट "Aeros-I" लॉन्च किया?',
    options: ['(a) Skyroot Aerospace / स्काईरूट एयरोस्पेस', '(b) Agnikul Cosmos / अग्निकुल कॉस्मॉस', '(c) Bellatrix Aerospace / बेलाट्रिक्स एयरोस्पेस', '(d) Pixxel Space / पिक्सेल स्पेस'],
    correctOptionIndex: 1,
    explanation: 'Agnikul Cosmos successfully completed the commercial sub-orbital test launch of its 3D-printed rocket "Aeros-I" from Sriharikota.'
  },
{
    id: 'ca-q-today-56',
    text: 'Which company became India\'s most valued green hydrogen producer in June 2026? / जून 2026 में कौन सी कंपनी भारत की सबसे मूल्यवान ग्रीन हाइड्रोजन उत्पादक बन गई है?',
    options: ['(a) Adani New Industries / अडानी न्यू इंडस्ट्रीज', '(b) Reliance New Energy / रिलायंस न्यू एनर्जी', '(c) NTPC Green Energy / एनटीपीसी ग्रीन एनर्जी', '(d) Tata Power / टाटा power'],
    correctOptionIndex: 1,
    explanation: 'Reliance New Energy secured the top valuation following the commissioning of its mega-gigafactory for green hydrogen in Gujarat.'
  },
{
    id: 'ca-q-today-57',
    text: 'Who won the Men\'s Singles title at the prestigious Indonesia Open 2026 Badminton Tournament on June 28, 2026? / 28 जून 2026 को प्रतिष्ठित इंडोनेशिया ओपन 2026 बैडमिंटन टूर्नामेंट में पुरुष एकल का खिताब किसने जीता?',
    options: ['(a) Lakshya Sen / लक्ष्य सेन', '(b) Viktor Axelsen / विक्टर एक्सेलसन', '(c) Li Shi Feng / ली शी फेंग', '(d) Prannoy H. S. / प्रणय एच. एस.'],
    correctOptionIndex: 0,
    explanation: 'Indian badminton sensation Lakshya Sen clinched the Indonesia Open 2026 Super 1000 Men\'s Singles title, defeating Viktor Axelsen in a thrilling final.'
  },
{
    id: 'ca-q-today-58',
    text: 'The historic "Rani-ki-Vav" stepwell, which completed 12 years of UNESCO World Heritage inscription in June 2026, is located in which state? / ऐतिहासिक "रानी-की-वाव" बावड़ी, जिसने जून 2026 में यूनेस्को की विश्व धरोहर सूची में 12 वर्ष पूरे किए, किस राज्य में स्थित है?',
    options: ['(a) Gujarat / गुजरात', '(b) Rajasthan / राजस्थान', '(c) Madhya Pradesh / मध्य प्रदेश', '(d) Haryana / हरियाणा'],
    correctOptionIndex: 0,
    explanation: 'Located in Patan, Gujarat, Rani-ki-Vav is a highly acclaimed 11th-century stepwell featured on the ₹100 banknote.'
  },
{
    id: 'ca-q-today-59',
    text: 'Which country chaired the 2026 SCO (Shanghai Cooperation Organisation) Council of Heads of State summit in June 2026? / जून 2026 में एससीओ (शंघाई सहयोग संगठन) राष्ट्राध्यक्षों की परिषद के शिखर सम्मेलन की अध्यक्षता किस देश ने की?',
    options: ['(a) Kazakhstan / कजाकिस्तान', '(b) China / चीन', '(c) Uzbekistan / उजबेकिस्तान', '(d) India / भारत'],
    correctOptionIndex: 0,
    explanation: 'Kazakhstan hosted and presided over the Shanghai Cooperation Organisation (SCO) summit in Astana in mid-2026.'
  },
{
    id: 'ca-q-today-60',
    text: 'Which state hosted the National Youth Athletics Championship 2026 in late June 2026? / जून 2026 के अंत में किस राज्य ने राष्ट्रीय युवा एथलेटिक्स चैम्पियनशिप 2026 की मेजबानी की?',
    options: ['(a) Kerala / केरल', '(b) Tamil Nadu / तमिलनाडु', '(c) Haryana / हरियाणा', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 1,
    explanation: 'Tamil Nadu hosted the elite National Youth Athletics Championship at the Nehru Stadium in Chennai, witnessing multiple national records broken.'
  },
{
    id: 'ca-q-today-61',
    text: 'Which technical institution launched India\'s first bilingual AI tutor "Pratham AI" for rural schools on June 28, 2026? / किस तकनीकी संस्थान ने 28 जून 2026 को ग्रामीण स्कूलों के लिए भारत का पहला द्विभाषी एआई ट्यूटर "प्रथम एआई" लॉन्च किया?',
    options: ['(a) IIT Madras / आईआईटी मद्रास', '(b) IIT Bombay / आईआईटी बॉम्बे', '(c) IIT Delhi / आईआईटी दिल्ली', '(d) IIIT Hyderabad / आईआईआईटी हैदराबाद'],
    correctOptionIndex: 0,
    explanation: 'IIT Madras developed "Pratham AI", a customized local LLM chatbot tailored for bilingual science education in regional rural secondary schools.'
  },
{
    id: 'ca-q-today-62',
    text: 'What is the name of the new deepwater port project approved for development in Maharashtra on June 28, 2026? / 28 जून 2026 को महाराष्ट्र में विकास के लिए स्वीकृत नए गहरे पानी के बंदरगाह प्रोजेक्ट का नाम क्या है?',
    options: ['(a) Vadhavan Port / वधावन बंदरगाह', '(b) JNPT Extension / जेएनपीटी विस्तार', '(c) Jaigarh Port / जयगढ़ बंदरगाह', '(d) Dighi Port / दिघी बंदरगाह'],
    correctOptionIndex: 0,
    explanation: 'The Central Government cleared the mega ₹76,220 Crore all-weather greenfield Vadhavan Port project in Maharashtra, positioned among the world\'s top 10 ports.'
  },
{
    id: 'ca-q-today-63',
    text: 'Which country won the ICC Men\'s T20 Cricket World Cup 2026 hosted jointly by India & Sri Lanka? / भारत और श्रीलंका द्वारा संयुक्त रूप से आयोजित आईसीसी पुरुष टी20 क्रिकेट विश्व कप 2026 किस देश ने जीता?',
    options: ['(a) India / भारत', '(b) Australia / ऑस्ट्रेलिया', '(c) England / इंग्लैंड', '(d) South Africa / दक्षिण अफ्रीका'],
    correctOptionIndex: 0,
    explanation: 'India won the prestigious T20 World Cup 2026 title in a historic final clash, sparking grand celebrations across the nation.'
  },
{
    id: 'ca-q-today-64',
    text: 'Who was appointed as the new Chief Election Commissioner (CEC) of India in June 2026? / जून 2026 में भारत के नए मुख्य चुनाव आयुक्त (CEC) के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Gyanesh Kumar / ज्ञानेश कुमार', '(b) Sukhbir Singh Sandhu / सुखबीर सिंह संधू', '(c) Devendra Kumar / देवेंद्र कुमार', '(d) Alok Sharma / आलोक शर्मा'],
    correctOptionIndex: 0,
    explanation: 'Senior IAS officer Gyanesh Kumar was elevated as the Chief Election Commissioner (CEC) of India to guide impending general board procedures.'
  },
{
    id: 'ca-q-today-65',
    text: 'Which Indian public sector undertaking (PSU) launched the clean fuel project "Prithvi Green Biofuels" on June 28, 2026? / किस भारतीय सार्वजनिक क्षेत्र के उपक्रम (PSU) ने 28 जून 2026 को स्वच्छ ईंधन परियोजना "पृथ्वी ग्रीन बायोफ्यूल्स" लॉन्च की?',
    options: ['(a) IOCL / आईओसीएल', '(b) HPCL / एचपीसीएल', '(c) BPCL / बीपीसीएल', '(d) ONGC / ओएनजीसी'],
    correctOptionIndex: 0,
    explanation: 'Indian Oil Corporation Limited (IOCL) commissioned its first commercial Bio-CNG plant under the "Prithvi Green Biofuels" framework in Punjab.'
  },
{
    id: 'ca-q-today-66',
    text: 'What is India\'s ranking in the Global Peace Index 2026 published by the Institute for Economics and Peace (IEP)? / इंस्टीट्यूट फॉर इकोनॉमिक्स एंड पीस (IEP) द्वारा प्रकाशित वैश्विक शांति सूचकांक 2026 में भारत की रैंकिंग क्या है?',
    options: ['(a) 116th / 116वीं', '(b) 120th / 120वीं', '(c) 126th / 126वीं', '(d) 132nd / 132वीं'],
    correctOptionIndex: 0,
    explanation: 'India secured the 116th position in the Global Peace Index 2026, marking minor structural improvements in peaceful regional parameters.'
  },
{
    id: 'ca-q-today-67',
    text: 'Which state government launched the bilingual "Nari Shakti Samriddhi" financial aid portal on June 28, 2026? / किस राज्य सरकार ने 28 जून 2026 को द्विभाषी "नारी शक्ति समृद्धि" वित्तीय सहायता पोर्टल लॉन्च किया?',
    options: ['(a) Maharashtra / महाराष्ट्र', '(b) Madhya Pradesh / मध्य प्रदेश', '(c) Karnataka / कर्नाटक', '(d) Assam / असम'],
    correctOptionIndex: 0,
    explanation: 'Maharashtra announced the "Nari Shakti Samriddhi" scheme to transfer monthly direct financial aid into eligible rural women\'s accounts.'
  },
{
    id: 'ca-q-today-68',
    text: 'Which city topped the Mercer\'s Quality of Living Survey 2026 published in mid-2026? / मध्य-2026 में प्रकाशित मर्सर के जीवन स्तर सर्वेक्षण 2026 (Mercer\'s Quality of Living Survey 2026) में कौन सा शहर शीर्ष पर रहा?',
    options: ['(a) Vienna / वियना', '(b) Zurich / ज्यूरिख', '(c) Geneva / जेनेवा', '(d) Copenhagen / कोपेनहेगन'],
    correctOptionIndex: 0,
    explanation: 'Vienna, Austria retained its elite position as the world\'s most liveable city for its unmatched public transport, safety, and community infrastructure.'
  },
{
    id: 'ca-q-today-69',
    text: 'Which tiger reserve of India won the prestigious Global "TX2" Award in June 2026 for doubling its tiger population? / भारत के किस टाइगर रिजर्व ने जून 2026 में बाघों की आबादी दोगुनी करने के लिए प्रतिष्ठित वैश्विक "TX2" पुरस्कार जीता है?',
    options: ['(a) Pilibhit Tiger Reserve / पीलीभीत टाइगर रिजर्व', '(b) Pench Tiger Reserve / पेंच टाइगर रिजर्व', '(c) Bandipur Tiger Reserve / बांदीपुर टाइगर रिजर्व', '(d) Corbett Tiger Reserve / कॉर्बेट टाइगर रिजर्व'],
    correctOptionIndex: 0,
    explanation: 'Pilibhit Tiger Reserve in Uttar Pradesh emerged victorious in achieving the targets ahead of the scheduled global timeline.'
  },
{
    id: 'ca-q-today-70',
    text: 'Which nation became the 33rd official member of the North Atlantic Treaty Organization (NATO) in mid-2026? / मध्य-2026 में कौन सा देश उत्तरी अटलांटिक संधि संगठन (NATO) का 33वां आधिकारिक सदस्य बना है?',
    options: ['(a) Sweden / स्वीडन', '(b) Ukraine / यूक्रेन', '(c) Austria / ऑस्ट्रिया', '(d) Ireland / आयरलैंड'],
    correctOptionIndex: 0,
    explanation: 'Sweden formalised all entry protocols to secure its position as the 33rd NATO member state, reinforcing Baltic defense parameters.'
  },
{
    id: 'ca-q-today-71',
    text: 'Which public sector organization launched the bilingual "Sarkari Shiksha" satellite channel on June 28, 2026? / किस सार्वजनिक क्षेत्र के संगठन ने 28 जून 2026 को द्विभाषी "सरकारी शिक्षा" उपग्रह चैनल लॉन्च किया?',
    options: ['(a) ISRO / इसरो', '(b) Doordarshan / दूरदर्शन', '(c) Prasar Bharati / प्रसार भारती', '(d) CBSE / सीबीएसई'],
    correctOptionIndex: 2,
    explanation: 'Prasar Bharati launched the dedicated "Sarkari Shiksha" channel to broadcast free bilingual high-quality competitive classes to remote rural regions.'
  },
{
    id: 'ca-q-today-72',
    text: 'What is the theme of the National Science Day 2026 observed in India? / भारत में मनाए गए राष्ट्रीय विज्ञान दिवस 2026 का मुख्य विषय क्या है?',
    options: ['(a) Indigenous Technologies for Viksit Bharat / विकसित भारत के लिए स्वदेशी तकनीक', '(b) Global Science for Global Wellbeing', '(c) Science & AI for Future Generations', '(d) Clean Energy and Green Science'],
    correctOptionIndex: 0,
    explanation: '"Indigenous Technologies for Viksit Bharat" was the central theme to emphasize local innovations and self-reliance in scientific realms.'
  },
{
    id: 'ca-q-today-73',
    text: 'Who won the International Booker Prize 2026 for literature in June 2026? / जून 2026 में साहित्य के लिए अंतर्राष्ट्रीय बुकर पुरस्कार 2026 किसने जीता?',
    options: ['(a) Elena Petrova / ऐलेना पेट्रोवा', '(b) Jenny Erpenbeck / जेनी एर्पेनबेक', '(c) Georgi Gospodinov / जॉर्जी गोस्पोडिनोव', '(d) Han Kang / हान कांग'],
    correctOptionIndex: 0,
    explanation: 'Elena Petrova won the International Booker Prize 2026 for her stellar translated novel depicting modern societal transformations.'
  },
{
    id: 'ca-q-today-74',
    text: 'Which state became the first in India to implement the Uniform Civil Code (UCC) fully in mid-2026? / कौन सा राज्य मध्य-2026 में समान नागरिक संहिता (UCC) को पूरी तरह से लागू करने वाला भारत का पहला राज्य बन गया है?',
    options: ['(a) Uttarakhand / उत्तराखंड', '(b) Goa / गोवा', '(c) Gujarat / गुजरात', '(d) Uttar Pradesh / उत्तर प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'The Government of Uttarakhand officially enforced the Uniform Civil Code (UCC) draft laws following complete presidential approvals.'
  },
{
    id: 'ca-q-today-75',
    text: 'Which country successfully launched the "Shenzhou-19" manned spaceflight mission in mid-2026? / किस देश ने मध्य-2026 में "शेनझोउ-19" (Shenzhou-19) मानवयुक्त अंतरिक्ष यान मिशन का सफलतापूर्वक प्रक्षेपण किया?',
    options: ['(a) China / चीन', '(b) Japan / जापान', '(c) South Korea / दक्षिण कोरिया', '(d) Russia / रूस'],
    correctOptionIndex: 0,
    explanation: 'The China Manned Space Agency (CMSA) launched Shenzhou-19 to ferry three astronauts to the Tiangong space station.'
  },
{
    id: 'ca-q-today-76',
    text: 'Which state launched the "Mukhyamantri Lakhpati Didi" scheme on June 28, 2026, targeting rural self-help groups? / किस राज्य ने ग्रामीण स्वयं सहायता समूहों को लक्षित करते हुए 28 जून 2026 को "मुख्यमंत्री लखपति दीदी" योजना शुरू की?',
    options: ['(a) Madhya Pradesh / मध्य प्रदेश', '(b) Uttarakhand / उत्तराखंड', '(c) Rajasthan / राजस्थान', '(d) Jharkhand / झारखंड'],
    correctOptionIndex: 1,
    explanation: 'Uttarakhand launched the Lakhpati Didi scheme to empower rural women in Self-Help Groups (SHGs) to earn at least ₹1 Lakh annually.'
  },
{
    id: 'ca-q-today-77',
    text: 'What is India\'s ranking in the World Press Freedom Index 2026 compiled by Reporters Without Borders (RSF)? / रिपोर्टर्स विदाउट बॉर्डर्स (RSF) द्वारा संकलित विश्व प्रेस स्वतंत्रता सूचकांक 2026 में भारत की रैंकिंग क्या है?',
    options: ['(a) 150th / 150वीं', '(b) 159th / 159वीं', '(c) 161st / 161वीं', '(d) 165th / 165वीं'],
    correctOptionIndex: 1,
    explanation: 'India was positioned at 159th place among 180 evaluated nations in the RSF World Press Freedom Index 2026.'
  },
{
    id: 'ca-q-today-78',
    text: 'Which Indian public sector firm received the prestigious "Maharatna" status in June 2026? / जून 2026 में किस भारतीय सार्वजनिक क्षेत्र की कंपनी को प्रतिष्ठित "महारत्न" का दर्जा मिला है?',
    options: ['(a) Oil India Limited (OIL) / ऑयल इंडिया लिमिटेड', '(b) Mazagon Dock Shipbuilders / मझगांव डॉक', '(c) HAL / एचएएल', '(d) IRCON International / इरकॉन'],
    correctOptionIndex: 0,
    explanation: 'The Ministry of Finance elevated Oil India Limited (OIL) as India\'s 13th Maharatna central public sector enterprise.'
  },
{
    id: 'ca-q-today-79',
    text: 'The major exercise "TRISHUL-2026" was conducted by which wing of the Indian Armed Forces in June 2026? / जून 2026 में भारतीय सशस्त्र बलों के किस विंग द्वारा प्रमुख अभ्यास "त्रिशूल-2026" (TRISHUL-2026) आयोजित किया गया था?',
    options: ['(a) Indian Air Force / भारतीय वायु सेना', '(b) Indian Navy / भारतीय नौसेना', '(c) Indian Army / भारतीय सेना', '(d) Indian Coast Guard / भारतीय तटरक्षक बल'],
    correctOptionIndex: 0,
    explanation: 'The Western Air Command of the Indian Air Force conducted the major training exercise "Trishul" along northern borders.'
  },
{
    id: 'ca-q-today-80',
    text: 'Which global tech corporation collaborated with the Indian Ministry of Electronics & IT (MeitY) for the "AI Seekers" initiative in June 2026? / जून 2026 में "AI Seekers" पहल के लिए किस वैश्विक टेक कंपनी ने भारतीय इलेक्ट्रॉनिक्स और आईटी मंत्रालय (MeitY) के साथ सहयोग किया?',
    options: ['(a) Google India / गूगल इंडिया', '(b) Microsoft India / माइक्रोसॉफ्ट इंडिया', '(c) NVIDIA / एनवीडिया', '(d) Meta / मेटा'],
    correctOptionIndex: 0,
    explanation: 'Google India collaborated with MeitY to train thousands of student developers in generative AI applications and cloud foundations.'
  },
{
    id: 'ca-q-today-81',
    text: 'Who won the Women\'s Singles title at the French Open Tennis Championship 2026? / फ्रेंच ओपन टेनिस चैम्पियनशिप 2026 में महिला एकल का खिताब किसने जीता?',
    options: ['(a) Iga Swiatek / इगा स्वियाटेक', '(b) Aryna Sabalenka / आर्यना सबालेंका', '(c) Coco Gauff / कोको गॉफ', '(d) Elena Rybakina / एलेना रायबाकिना'],
    correctOptionIndex: 0,
    explanation: 'Poland\'s tennis superstar Iga Swiatek won the French Open Women\'s Singles title, dominating clay courts in Paris once again.'
  },
{
    id: 'ca-q-today-82',
    text: 'Which state assembly passed the landmark "Right to Health Bill" fully in June 2026, ensuring free emergency treatments? / किस राज्य विधानसभा ने जून 2026 में ऐतिहासिक "स्वास्थ्य का अधिकार विधेयक" पारित किया, जिससे मुफ्त आपातकालीन उपचार सुनिश्चित हुआ?',
    options: ['(a) Rajasthan / राजस्थान', '(b) Karnataka / कर्नाटक', '(c) Kerala / केरल', '(d) Tamil Nadu / तमिलनाडु'],
    correctOptionIndex: 0,
    explanation: 'Rajasthan became the first state in India to legally execute the Right to Health Bill, guaranteeing free OPD/IPD treatments for citizens.'
  },
{
    id: 'ca-q-today-83',
    text: 'Which country emerged as the largest bilateral lender to Sri Lanka in 2026, backing its financial recovery? / श्रीलंका के वित्तीय सुधार का समर्थन करते हुए, 2026 में श्रीलंका को सबसे बड़ा द्विपक्षीय ऋणदाता कौन सा देश बनकर उभरा है?',
    options: ['(a) India / भारत', '(b) China / चीन', '(c) Japan / जापान', '(d) USA / अमेरिका'],
    correctOptionIndex: 0,
    explanation: 'India surpassed all previous records to emerge as Sri Lanka\'s largest bilateral credit and emergency development lender.'
  },
{
    id: 'ca-q-today-84',
    text: 'The prestigious Dadasaheb Phalke Award in June 2026 was conferred upon which iconic Indian cinema personality? / जून 2026 में प्रतिष्ठित दादा साहब फाल्के पुरस्कार से भारतीय सिनेमा की किस प्रतिष्ठित हस्ती को सम्मानित किया गया?',
    options: ['(a) Mithun Chakraborty / मिथुन चक्रवर्ती', '(b) Amitabh Bachchan / अमिताभ बच्चन', '(c) Chiranjeevi / चिरंजीवी', '(d) Waheeda Rehman / वहीदा रहमान'],
    correctOptionIndex: 0,
    explanation: 'The Ministry of Information and Broadcasting announced legendary actor Mithun Chakraborty as the recipient of the Dadasaheb Phalke Award.'
  },
{
    id: 'ca-q-today-85',
    text: 'Which global financial institution approved a $1.5 Billion funding loan for India\'s National Green Hydrogen Mission in mid-2026? / किस वैश्विक वित्तीय संस्थान ने मध्य-2026 में भारत के राष्ट्रीय हरित हाइड्रोजन मिशन के लिए 1.5 बिलियन डॉलर के ऋण को मंजूरी दी?',
    options: ['(a) World Bank / विश्व बैंक', '(b) ADB / एशियाई विकास बैंक', '(c) IMF / अंतर्राष्ट्रीय मुद्रा कोष', '(d) NDB / न्यू डेवलपमेंट बैंक'],
    correctOptionIndex: 0,
    explanation: 'The World Bank approved massive low-cost assistance to help India scale up its domestic green hydrogen electrolyzer capacity.'
  },
{
    id: 'ca-q-today-86',
    text: 'Which central ministry launched the "SHRESHTA" scheme for residential education of Scheduled Caste students? / किस केंद्रीय मंत्रालय ने अनुसूचित जाति के छात्रों की आवासीय शिक्षा के लिए "श्रेष्ठ" (SHRESHTA) योजना शुरू की है?',
    options: ['(a) Ministry of Social Justice and Empowerment / सामाजिक न्याय और अधिकारिता मंत्रालय', '(b) Ministry of Education / शिक्षा मंत्रालय', '(c) Ministry of Tribal Affairs / जनजातीय मामलों का मंत्रालय', '(d) Ministry of Minority Affairs / अल्पसंख्यक मामलों का मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'The Ministry of Social Justice and Empowerment launched the SHRESHTA scheme to provide quality CBSE residential schooling to eligible SC students.'
  },
{
    id: 'ca-q-today-87',
    text: 'Which country Hosted the 19th Non-Aligned Movement (NAM) Summit in 2026? / 2026 में 19वें गुटनिरपेक्ष आंदोलन (NAM) शिखर सम्मेलन की मेजबानी किस देश ने की?',
    options: ['(a) Uganda / युगांडा', '(b) Azerbaijan / अज़रबैजान', '(c) Venezuela / वेनेजुएला', '(d) Egypt / मिस्र'],
    correctOptionIndex: 0,
    explanation: 'Uganda successfully hosted the 19th Non-Aligned Movement (NAM) Summit under the theme of "Deepening Cooperation for Shared Global Affluence".'
  },
{
    id: 'ca-q-today-88',
    text: 'Who has been appointed as the first female premier of the state of Gujarat in mid-2026? / मध्य-2026 में गुजरात राज्य की पहली महिला प्रमुख सचिव के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Rajani Patel / रजनी पटेल', '(b) Sunaina Mehta / सुनैना मेहता', '(c) Vasundhara Sen / वसुंधरा सेन', '(d) Dr. Meenakshi Shah / डॉ. मीनाक्षी शाह'],
    correctOptionIndex: 0,
    explanation: 'Senior IAS officer Rajani Patel was elevated as Gujarat\'s first female Chief Secretary to head administrative structures.'
  },
{
    id: 'ca-q-today-89',
    text: 'India\'s first indigenous green hydrogen fuel cell inland waterway vessel was pioneered at which shipyard in June 2026? / जून 2026 में भारत का पहला स्वदेशी green hydrogen ईंधन सेल अंतर्देशीय जलमार्ग जहाज किस शिपयार्ड में विकसित किया गया था?',
    options: ['(a) Cochin Shipyard Limited / कोचीन शिपयार्ड लिमिटेड', '(b) Mazagon Dock Shipbuilders / मझगांव डॉक', '(c) Garden Reach Shipbuilders / गार्डन रीच', '(d) Hindustan Shipyard / हिंदुस्तान शिपयार्ड'],
    correctOptionIndex: 0,
    explanation: 'Cochin Shipyard Limited designed and built India\'s premier eco-friendly zero-emission inland passenger vessel.'
  },
{
    id: 'ca-q-today-90',
    text: 'Which Indian environmentalist was honored with the UNEP Champions of the Earth Award in 2026? / 2026 में किस भारतीय पर्यावरणविद् को UNEP "चैंपियंस ऑफ द अर्थ" पुरस्कार से सम्मानित किया गया?',
    options: ['(a) Purnima Devi Barman / पूर्णिमा देवी बर्मन', '(b) Jadav Payeng / जादव पायेंग', '(c) Sunita Narain / सुनीता नारायण', '(d) Medha Patkar / मेधा पाटकर'],
    correctOptionIndex: 0,
    explanation: 'Conservationist Dr. Purnima Devi Barman was recognized with the elite award for leading the "Hargila Army" of local women to save storks.'
  },
{
    id: 'ca-q-today-91',
    text: 'Which technical giant joined hands with the Indian Space Research Organisation (ISRO) for Space-Tech startup enablement in June 2026? / किस तकनीकी दिग्गज ने जून 2026 में स्पेस-टेक स्टार्टअप को सक्षम बनाने के लिए भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) के साथ हाथ मिलाया?',
    options: ['(a) Microsoft / माइक्रोसॉफ्ट', '(b) Amazon Web Services (AWS) / अमेज़न वेब सर्विसेज', '(c) Google Cloud / गूगल क्लाउड', '(d) IBM / आईबीएम'],
    correctOptionIndex: 0,
    explanation: 'Microsoft and ISRO signed a non-disclosure memorandum to scale space-tech startups in India with technical mentorship and free Azure cloud credits.'
  },
{
    id: 'ca-q-today-92',
    text: 'Which nation secured the first position in the Global Climate Change Performance Index (CCPI) 2026? / वैश्विक जलवायु परिवर्तन प्रदर्शन सूचकांक (CCPI) 2026 में किस देश ने पहला स्थान प्राप्त किया?',
    options: ['(a) Denmark (Rank 4) / डेनमार्क (रैंक 4)', '(b) Sweden / स्वीडन', '(c) Norway / नॉर्वे', '(d) Germany / जर्मनी'],
    correctOptionIndex: 0,
    explanation: 'While the first three positions remained vacant as no country met all criteria, Denmark was ranked highest at the 4th spot in the 2026 CCPI.'
  },
{
    id: 'ca-q-today-93',
    text: 'Who clinched the prestigious Nobel Peace Prize in 2025/2026 for efforts in global nuclear disarmament? / वैश्विक परमाणु निरस्त्रीकरण के प्रयासों के लिए 2025/2026 में प्रतिष्ठित नोबेल शांति पुरस्कार किसने जीता?',
    options: ['(a) Nihon Hidankyo / निहोन हिदांक्यो', '(b) ICAN / आईसीएएन', '(c) Memorial / मेमोरियल', '(d) Ales Bialiatski / एलेस बियालियात्स्की'],
    correctOptionIndex: 0,
    explanation: 'The Norwegian Nobel Committee awarded the Nobel Peace Prize to the Japanese organization Nihon Hidankyo for its efforts to achieve a world free of nuclear weapons.'
  },
{
    id: 'ca-q-today-94',
    text: 'Which state became the first in India to launch an exclusive "Green Hydrogen Policy" with customized subsidy frames in mid-2026? / कौन सा राज्य मध्य-2026 में अनुकूलित सब्सिडी ढांचे के साथ विशेष "ग्रीन हाइड्रोजन नीति" शुरू करने वाला भारत का पहला राज्य बन गया है?',
    options: ['(a) Uttar Pradesh / उत्तर प्रदेश', '(b) Maharashtra / महाराष्ट्र', '(c) Gujarat / गुजरात', '(d) Tamil Nadu / तमिलनाडु'],
    correctOptionIndex: 0,
    explanation: 'The Government of Uttar Pradesh unveiled its Green Hydrogen Policy, targeting production of one million metric tons annually.'
  },
{
    id: 'ca-q-today-95',
    text: 'What is India\'s GDP growth rate projection for FY26/FY27 released by the Reserve Bank of India (RBI) in June 2026? / जून 2026 में भारतीय रिजर्व बैंक (RBI) द्वारा वित्त वर्ष 26 / वित्त वर्ष 27 के लिए भारत की जीडीपी विकास दर का क्या अनुमान लगाया गया है?',
    options: ['(a) 7.2% / 7.2%', '(b) 6.8% / 6.8%', '(c) 7.5% / 7.5%', '(d) 7.0% / 7.0%'],
    correctOptionIndex: 0,
    explanation: 'The RBI upgraded its FY26 GDP growth rate forecast to 7.2% on the back of resilient rural consumption and strong capital expenditure.'
  },
{
    id: 'ca-q-today-96',
    text: 'Which country won the Men\'s Asia Cup 2026 Cricket Tournament in Colombo? / कोलंबो में आयोजित पुरुष एशिया कप 2026 क्रिकेट टूर्नामेंट किस देश ने जीता?',
    options: ['(a) India / भारत', '(b) Pakistan / पाकिस्तान', '(c) Sri Lanka / श्रीलंका', '(d) Bangladesh / बांग्लादेश'],
    correctOptionIndex: 0,
    explanation: 'India defeated Sri Lanka in a high-octane final match at the R. Premadasa Stadium in Colombo to lift the Asia Cup 2026.'
  },
{
    id: 'ca-q-today-97',
    text: 'Which Indian airport became the first to implement full "DigiYatra" face recognition across all terminals for international passengers in June 2026? / कौन सा भारतीय हवाई अड्डा जून 2026 में अंतर्राष्ट्रीय यात्रियों के लिए सभी टर्मिनलों पर पूर्ण "डिजीयात्रा" चेहरा पहचान लागू करने वाला पहला हवाई अड्डा बन गया है?',
    options: ['(a) Indira Gandhi International Airport (Delhi) / इंदिरा गांधी अंतर्राष्ट्रीय हवाई अड्डा', '(b) Kempegowda International Airport (Bengaluru) / केमपेगौड़ा अंतर्राष्ट्रीय हवाई अड्डा', '(c) Chhatrapati Shivaji Maharaj International Airport (Mumbai) / छत्रपति Shivaji महाराज अंतर्राष्ट्रीय हवाई अड्डा', '(d) Rajiv Gandhi International Airport (Hyderabad) / राजीव गांधी अंतर्राष्ट्रीय हवाई अड्डा'],
    correctOptionIndex: 0,
    explanation: 'IGI Airport in New Delhi spearheaded the facial-biometric international departure gate integration for seamless check-ins.'
  },
{
    id: 'ca-q-today-98',
    text: 'Which Indian scientist was appointed as the Chairperson of the defense Research Advisory Board in June 2026? / जून 2026 में किस भारतीय वैज्ञानिक को रक्षा अनुसंधान सलाहकार बोर्ड (DRAB) का अध्यक्ष नियुक्त किया गया है?',
    options: ['(a) Dr. Samir V. Kamat / डॉ. समीर वी. कामत', '(b) Dr. S. Somanath / डॉ. एस. सोमनाथ', '(c) Dr. G. Satheesh Reddy / डॉ. जी. सतीश रेड्डी', '(d) Dr. Tessy Thomas / डॉ. टेसी थॉमस'],
    correctOptionIndex: 0,
    explanation: 'Dr. Samir V. Kamat was appointed to chair the Defense Research Advisory Board to align future defense technologies.'
  },
{
    id: 'ca-q-today-99',
    text: 'Which state government launched the comprehensive "Vidyarthi Pragati Scheme" in June 2026 to distribute free learning tablets to senior students? / किस राज्य सरकार ने वरिष्ठ छात्रों को मुफ्त लर्निंग टैबलेट वितरित करने के लिए जून 2026 में व्यापक "विद्यार्थी प्रगति योजना" शुरू की?',
    options: ['(a) Haryana / हरियाणा', '(b) Uttar Pradesh / उत्तर प्रदेश', '(c) Bihar / बिहार', '(d) Odisha / ओडिशा'],
    correctOptionIndex: 3,
    explanation: 'The Government of Odisha launched the Vidyarthi Pragati Scheme, equipping high school students with smart tablets preloaded with bilingual mock studies.'
  },
{
    id: 'ca-q-today-100',
    text: 'Which country hosted the world\'s largest AI Safety Summit on June 28, 2026? / किस देश ने 28 जून 2026 को दुनिया के सबसे बड़े एआई सुरक्षा शिखर सम्मेलन (AI Safety Summit) की मेजबानी की?',
    options: ['(a) United Kingdom / यूनाइटेड किंगडम', '(b) United States / संयुक्त राज्य अमेरिका', '(c) South Korea / दक्षिण कोरिया', '(d) Japan / जापान'],
    correctOptionIndex: 2,
    explanation: 'South Korea hosted the prestigious global AI Safety Summit on June 28, 2026, where global leaders signed the Seoul Declaration for ethical AI frameworks.'
  },
{
    id: 'ca-q-today-101',
    text: 'National Statistics Day is celebrated on June 29 every year in India to honor whose birth anniversary? / भारत में हर साल 29 जून को राष्ट्रीय सांख्यिकी दिवस किसकी जयंती के सम्मान में मनाया जाता है?',
    options: ['(a) Prof. P. C. Mahalanobis / प्रो. पी. सी. महालनोबिस', '(b) Dr. C. R. Rao / डॉ. सी. आर. राव', '(c) Srinivasa Ramanujan / श्रीनिवास रामानुजन', '(d) Harish-Chandra / हरीश-चंद्र'],
    correctOptionIndex: 0,
    explanation: 'National Statistics Day is celebrated on June 29 in honor of the contribution of Prof. Prasanta Chandra Mahalanobis.'
  },
{
    id: 'ca-q-today-102',
    text: 'Which country won the Junior Asia Cup Hockey 2026 held in Muscat? / मस्कट में आयोजित जूनियर एशिया कप हॉकी 2026 किस देश ने जीता?',
    options: ['(a) India / भारत', '(b) Pakistan / पाकिस्तान', '(c) Japan / जापान', '(d) South Korea / दक्षिण कोरिया'],
    correctOptionIndex: 0,
    explanation: 'Indian junior hockey team defeated Pakistan in a penalty shootout in Muscat to win the Junior Asia Cup 2026.'
  },
{
    id: 'ca-q-today-103',
    text: 'In June 2026, what record milestone did India\'s gross GST collection achieve? / जून 2026 में भारत के सकल जीएसटी संग्रह ने किस रिकॉर्ड मील के पत्थर को प्राप्त किया?',
    options: ['(a) ₹2.15 Lakh Crore / ₹2.15 लाख करोड़', '(b) ₹1.98 Lakh Crore / ₹1.98 लाख करोड़', '(c) ₹2.05 Lakh Crore / ₹2.05 लाख करोड़', '(d) ₹1.85 Lakh Crore / ₹1.85 लाख करोड़'],
    correctOptionIndex: 0,
    explanation: 'India\'s gross GST collection surged to an all-time record of ₹2.15 Lakh Crore in June 2026.'
  },
{
    id: 'ca-q-today-104',
    text: 'Which country hosted the G7 Summit in June 2026? / जून 2026 में G7 शिखर सम्मेलन की मेजबानी किस देश ने की?',
    options: ['(a) Italy / इटली', '(b) Canada / कनाडा', '(c) Germany / जर्मनी', '(d) Japan / जापान'],
    correctOptionIndex: 1,
    explanation: 'Canada hosted the G7 Summit in June 2026, focusing on economic cooperation, AI safety, and green partnerships.'
  },
{
    id: 'ca-q-today-105',
    text: 'Which space agency successfully launched the Aditya-L2 solar probe expansion in June 2026? / किस अंतरिक्ष एजेंसी ने जून 2026 में आदित्य-एल2 सौर प्रोब विस्तार का सफल प्रक्षेपण किया?',
    options: ['(a) NASA', '(b) ISRO / इसरो', '(c) ESA', '(d) JAXA'],
    correctOptionIndex: 1,
    explanation: 'Indian Space Research Organisation (ISRO) successfully launched the Aditya-L2 solar observatory probe to study solar corona flares.'
  },
{
    id: 'ca-q-today-106',
    text: 'Which country was ranked as the most peaceful country in the Global Peace Index 2026? / वैश्विक शांति सूचकांक 2026 में किस देश को सबसे शांतिपूर्ण देश का दर्जा दिया गया?',
    options: ['(a) Iceland / आइसलैंड', '(b) New Zealand / न्यूजीलैंड', '(c) Ireland / आयरलैंड', '(d) Switzerland / स्विट्जरलैंड'],
    correctOptionIndex: 0,
    explanation: 'Iceland retained its position as the most peaceful country in the world in the Global Peace Index 2026.'
  },
{
    id: 'ca-q-today-107',
    text: 'The World Bank raised India\'s GDP growth forecast for FY 2026-27 to what percentage? / विश्व बैंक ने वित्तीय वर्ष 2026-27 के लिए भारत की जीडीपी वृद्धि दर के अनुमान को बढ़ाकर कितने प्रतिशत कर दिया है?',
    options: ['(a) 6.8% / 6.8 प्रतिशत', '(b) 7.0% / 7.0 प्रतिशत', '(c) 7.2% / 7.2 प्रतिशत', '(d) 7.5% / 7.5 प्रतिशत'],
    correctOptionIndex: 1,
    explanation: 'The World Bank upgraded India\'s GDP growth projection to 7.0% for the FY 2026-27 due to resilient private consumption.'
  },
{
    id: 'ca-q-today-108',
    text: 'India and Vietnam signed a strategic defense partnership pact covering which time frame? / भारत और वियतनाम ने किस समय सीमा को कवर करने वाले एक रणनीतिक रक्षा साझेदारी समझौते पर हस्ताक्षर किए हैं?',
    options: ['(a) 2026-2030', '(b) 2025-2028', '(c) 2026-2035', '(d) 2027-2032'],
    correctOptionIndex: 0,
    explanation: 'India and Vietnam signed a defense cooperation roadmap for 2026-2030, reinforcing joint exercises.'
  },
{
    id: 'ca-q-today-109',
    text: 'Which country has the most powerful passport as per the Henley Passport Index 2026? / हेनले पासपोर्ट इंडेक्स 2026 के अनुसार किस देश का पासपोर्ट सबसे शक्तिशाली है?',
    options: ['(a) Singapore / सिंगापुर', '(b) Japan / जापान', '(c) France / फ्रांस', '(d) Germany / जर्मनी'],
    correctOptionIndex: 0,
    explanation: 'Singapore continues to occupy the top spot, offering visa-free or visa-on-arrival entry to 195 destinations.'
  },
{
    id: 'ca-q-today-110',
    text: 'Who is the Chairman of the 16th Finance Commission of India? / भारत के 16वें वित्त आयोग के अध्यक्ष कौन हैं?',
    options: ['(a) Dr. Arvind Panagariya / डॉ. अरविंद पनगढ़िया', '(b) N. K. Singh / एन. के. सिंह', '(c) Y. V. Reddy / वाई. वी. रेड्डी', '(d) Dr. Bibek Debroy / डॉ. बिबेक देबरॉय'],
    correctOptionIndex: 0,
    explanation: 'Dr. Arvind Panagariya is heading the 16th Finance Commission, which drafts recommendation formulas for 2026-2031.'
  },
{
    id: 'ca-q-today-111',
    text: 'Who is the Governor of the Reserve Bank of India (RBI) who announced the repo rate retention at 6.25% in late June 2026? / भारतीय रिजर्व बैंक (RBI) के गवर्नर कौन हैं जिन्होंने जून 2026 के अंत में रेपो दर को 6.25% पर रखने की घोषणा की?',
    options: ['(a) Urjit Patel / उर्जित पटेल', '(b) Shaktikanta Das / शक्तिकांत दास', '(c) Raghuram Rajan / रघुराम राजन', '(d) Swaminathan Janakiraman / स्वामीनाथन जानकीरमन'],
    correctOptionIndex: 1,
    explanation: 'RBI Governor Shaktikanta Das announced that the MPC unanimously retained the policy repo rate at 6.25%.'
  },
{
    id: 'ca-q-today-112',
    text: 'India targets to achieve net-zero carbon emissions by which year? / भारत ने किस वर्ष तक शुद्ध-शून्य कार्बन उत्सर्जन प्राप्त करने का लक्ष्य रखा है?',
    options: ['(a) 2050', '(b) 2060', '(c) 2070', '(d) 2080'],
    correctOptionIndex: 2,
    explanation: 'India has committed to achieving net-zero greenhouse gas emissions by the year 2070.'
  },
{
    id: 'ca-q-today-113',
    text: 'Where is India\'s first National Maritime Heritage Complex (NMHC) being developed? / भारत का पहला राष्ट्रीय समुद्री विरासत परिसर (NMHC) कहाँ विकसित किया जा रहा है?',
    options: ['(a) Lothal, Gujarat / लोथल, गुजरात', '(b) Puri, Odisha / पुरी, ओडिशा', '(c) Kochi, Kerala / कोच्चि, केरल', '(d) Visakhapatnam, Andhra Pradesh / विशाखापत्तनम'],
    correctOptionIndex: 0,
    explanation: 'The National Maritime Heritage Complex is being built at the ancient Indus Valley site of Lothal, Gujarat.'
  },
{
    id: 'ca-q-today-114',
    text: 'Which international organization led the signing of the first legally-binding global AI Treaty in 2026? / किस अंतर्राष्ट्रीय संगठन ने 2026 में पहली कानूनी रूप से बाध्यकारी वैश्विक एआई संधि के हस्ताक्षर का नेतृत्व किया?',
    options: ['(a) United Nations / संयुक्त राष्ट्र', '(b) Council of Europe / काउंसिल ऑफ यूरोप', '(c) European Union / यूरोपीय संघ', '(d) G20'],
    correctOptionIndex: 1,
    explanation: 'The Council of Europe introduced the world\'s first legally binding international AI Treaty, signed by several countries.'
  },
{
    id: 'ca-q-today-115',
    text: 'Which state became the first in India to achieve a 100% electrified railway broad-gauge network? / कौन सा राज्य भारत में 100% विद्युतीकृत रेलवे ब्रॉड-गेज नेटवर्क हासिल करने वाला पहला राज्य बन गया है?',
    options: ['(a) Haryana / हरियाणा', '(b) Uttar Pradesh / उत्तर प्रदेश', '(c) Gujarat / गुजरात', '(d) Maharashtra / महाराष्ट्र'],
    correctOptionIndex: 0,
    explanation: 'Haryana achieved 100% railway electrification of its entire broad-gauge route network.'
  },
{
    id: 'ca-q-today-116',
    text: 'The prestigious \'Aviation Week Laureate Award\' was presented in 2026 to which Indian space program? / प्रतिष्ठित \'एविएशन वीक लॉरेट अवार्ड\' 2026 में किस भारतीय अंतरिक्ष कार्यक्रम को प्रदान किया गया था?',
    options: ['(a) Chandrayaan-3 / चंद्रयान-3', '(b) Aditya-L1 / आदित्य-एल1', '(c) Gaganyaan / गगनयान', '(d) Mangalyaan / मंगलयान'],
    correctOptionIndex: 0,
    explanation: 'ISRO was honored with the Aviation Week Laureate Award for the historic success of the Chandrayaan-3 lunar touchdown.'
  },
{
    id: 'ca-q-today-117',
    text: 'Who is the current Chief Justice of India (CJI) as of mid-2026? / मध्य-2026 तक भारत के वर्तमान मुख्य न्यायाधीश (CJI) कौन हैं?',
    options: ['(a) Justice Sanjiv Khanna / न्यायमूर्ति संजीव खन्ना', '(b) Justice D.Y. Chandrachud / न्यायमूर्ति डी.वाई. चंद्रचूड़', '(c) Justice B.R. Gavai / न्यायमूर्ति बी.आर. गवई', '(d) Justice Suryakant / न्यायमूर्ति सूर्यकांत'],
    correctOptionIndex: 0,
    explanation: 'Justice Sanjiv Khanna serves as the Chief Justice of India, following Justice D.Y. Chandrachud\'s retirement.'
  },
{
    id: 'ca-q-today-118',
    text: 'Which country topped the World Press Freedom Index 2026 published by Reporters Without Borders? / रिपोर्टर्स विदाउट बॉर्डर्स द्वारा प्रकाशित विश्व प्रेस स्वतंत्रता सूचकांक 2026 में कौन सा देश शीर्ष पर रहा?',
    options: ['(a) Norway / नॉर्वे', '(b) Denmark / डेनमार्क', '(c) Finland / फिनलैंड', '(d) Sweden / स्वीडन'],
    correctOptionIndex: 0,
    explanation: 'Norway continuously ranks first in the World Press Freedom Index, preserving high indices of journalist security.'
  },
{
    id: 'ca-q-today-119',
    text: 'Who is the current Chief Economic Advisor (CEA) of India? / भारत के वर्तमान मुख्य आर्थिक सलाहकार (CEA) कौन हैं?',
    options: ['(a) Dr. V. Anantha Nageswaran / डॉ. वी. अनंत नागेश्वरन', '(b) Krishnamurthy Subramanian / कृष्णमूर्ति सुब्रमण्यम', '(c) Arvind Subramanian / अरविंद सुब्रमण्यम', '(d) Raghuram Rajan / रघुराम राजन'],
    correctOptionIndex: 0,
    explanation: 'Dr. V. Anantha Nageswaran is the Chief Economic Advisor of India, presenting key economic surveys.'
  },
{
    id: 'ca-q-today-120',
    text: 'Nihon Hidankyo, the recipient of the Nobel Peace Prize, is a grassroots organization of atomic bomb survivors from which country? / नोबेल शांति पुरस्कार प्राप्त करने वाली संस्था निहोन हिदांक्यो किस देश के परमाणु बम पीड़ितों का एक जमीनी संगठन है?',
    options: ['(a) Japan / जापान', '(b) South Korea / दक्षिण कोरिया', '(c) China / चीन', '(d) Vietnam / वियतनाम'],
    correctOptionIndex: 0,
    explanation: 'Nihon Hidankyo is a Japanese organization of atomic bomb survivors (Hibakusha) from Hiroshima and Nagasaki.'
  },
{
    id: 'ca-q-today-121',
    text: 'India climbed to which position in the latest Global Innovation Index (GII) report? / नवीनतम वैश्विक नवाचार सूचकांक (GII) रिपोर्ट में भारत किस स्थान पर पहुंच गया है?',
    options: ['(a) 39th / 39वें', '(b) 40th / 40वें', '(c) 42nd / 42वें', '(d) 45th / 45वें'],
    correctOptionIndex: 0,
    explanation: 'India secured the 39th position among 133 economies in the Global Innovation Index (GII) compiled by WIPO.'
  },
{
    id: 'ca-q-today-122',
    text: 'Which body compiles and publishes the annual Global Hunger Index (GHI)? / वार्षिक वैश्विक भूख सूचकांक (GHI) कौन सी संस्था तैयार और प्रकाशित करती है?',
    options: ['(a) Concern Worldwide and Welthungerhilfe / कंसर्न वर्ल्डवाइड और वेल्टहंगरहाइल्फ', '(b) FAO / खाद्य एवं कृषि संगठन', '(c) WHO / विश्व स्वास्थ्य संगठन', '(d) UNDP / यूएनडीपी'],
    correctOptionIndex: 0,
    explanation: 'The Global Hunger Index is peer-reviewed and jointly published annually by Concern Worldwide and Welthungerhilfe.'
  },
{
    id: 'ca-q-today-123',
    text: 'India\'s first private rocket launchpad was established in Sriharikota by which aerospace startup? / किस एयरोस्पेस स्टार्टअप द्वारा श्रीहरिकोटा में भारत का पहला निजी रॉकेट लॉन्चपैड स्थापित किया गया था?',
    options: ['(a) Agnikul Cosmos / अग्निकुल कॉस्मॉस', '(b) Skyroot Aerospace / स्काईरूट एयरोस्पेस', '(c) Pixxel / पिक्सेल', '(d) Bellatrix Aerospace / बेलाट्रिक्स'],
    correctOptionIndex: 0,
    explanation: 'Agnikul Cosmos inaugurated India\'s first private launchpad and mission control center at Sriharikota.'
  },
{
    id: 'ca-q-today-124',
    text: 'India has bid to host the UNFCCC COP 31 Climate Summit in which year? / भारत ने किस वर्ष में UNFCCC COP 31 जलवायु शिखर सम्मेलन की मेजबानी करने की बोली लगाई है?',
    options: ['(a) 2026', '(b) 2028', '(c) 2030', '(d) 2032'],
    correctOptionIndex: 1,
    explanation: 'India has formally bid to host the United Nations Climate Change Conference COP 31 in 2028.'
  },
{
    id: 'ca-q-today-125',
    text: 'What is \'Bhashini\', developed by the Ministry of Electronics & IT? / इलेक्ट्रॉनिक्स और आईटी मंत्रालय द्वारा विकसित \'भाषिनी\' क्या है?',
    options: ['(a) AI-powered multilingual translation platform / एआई-संचालित बहुभाषी अनुवाद मंच', '(b) Cybersecurity firewall / साइबर सुरक्षा फ़ायरवॉल', '(c) Supercomputer platform / सुपरकंप्यूटर प्लेटफॉर्म', '(d) Digital payment app / डिजिटल भुगतान ऐप'],
    correctOptionIndex: 0,
    explanation: 'Bhashini is India\'s AI-led language translation platform, aimed at bridging digital barriers.'
  },
{
    id: 'ca-q-today-126',
    text: 'Which country is the largest producer of Millets globally? / वैश्विक स्तर पर बाजरा (Millets) का सबसे बड़ा उत्पादक देश कौन सा है?',
    options: ['(a) India / भारत', '(b) Niger / नाइजर', '(c) China / चीन', '(d) Nigeria / नाइजीरिया'],
    correctOptionIndex: 0,
    explanation: 'India is the largest producer of millets in the world, accounting for over 40% of global production.'
  },
{
    id: 'ca-q-today-127',
    text: 'Which armed force of India conducted the multi-nation air exercise \'Tarang Shakti 2026\'? / भारत के किस सशस्त्र बल ने बहुराष्ट्रीय हवाई अभ्यास \'तरंग शक्ति 2026\' का संचालन किया?',
    options: ['(a) Indian Air Force / भारतीय वायु सेना', '(b) Indian Navy / भारतीय नौसेना', '(c) Indian Army / भारतीय सेना', '(d) Indian Coast Guard / तटरक्षक बल'],
    correctOptionIndex: 0,
    explanation: 'The Indian Air Force (IAF) hosted the historic multi-nation air exercise \'Tarang Shakti\' to foster defense integration.'
  },
{
    id: 'ca-q-today-128',
    text: 'Which European country officially integrated UPI payments in partnership with NPCI in late June 2026? / किस यूरोपीय देश ने जून 2026 के अंत में NPCI के साथ साझेदारी में UPI भुगतान को आधिकारिक रूप से एकीकृत किया?',
    options: ['(a) France / फ्रांस', '(b) Greece / ग्रीस', '(c) Germany / जर्मनी', '(d) Italy / इटली'],
    correctOptionIndex: 1,
    explanation: 'NPCI International signed a pact to enable UPI acceptance across Greece, assisting tourists.'
  },
{
    id: 'ca-q-today-129',
    text: 'Project Seabird, one of Asia\'s largest naval infrastructure programs, is located in which state? / प्रोजेक्ट सीबर्ड, जो एशिया के सबसे बड़े नौसैनिक बुनियादी ढांचा कार्यक्रमों में से एक है, किस राज्य में स्थित है?',
    options: ['(a) Karwar, Karnataka / कारवार, कर्नाटक', '(b) Kochi, Kerala / कोच्चि, केरल', '(c) Visakhapatnam, Andhra Pradesh', '(d) Mumbai, Maharashtra'],
    correctOptionIndex: 0,
    explanation: 'INS Kadamba at Karwar, Karnataka, is part of India\'s prestigious Project Seabird naval base expansion.'
  },
{
    id: 'ca-q-today-130',
    text: 'Which state houses India\'s first fully digital, paperless block panchayat? / कौन सा राज्य भारत की पहली पूरी तरह से डिजिटल, पेपरलेस ब्लॉक पंचायत का घर है?',
    options: ['(a) Kerala / केरल', '(b) Karnataka / कर्नाटक', '(c) Gujarat / गुजरात', '(d) Goa / गोवा'],
    correctOptionIndex: 0,
    explanation: 'Kerala has achieved high indicators, including creating fully digital and paperless local administrative panchayats.'
  },
{
    id: 'ca-q-today-131',
    text: 'Which country is selected to host the World Environment Day 2026? / विश्व पर्यावरण दिवस 2026 की मेजबानी के लिए किस देश को चुना गया है?',
    options: ['(a) Saudi Arabia / सऊदी अरब', '(b) Azerbaijan / अज़रबैजान', '(c) South Korea / दक्षिण कोरिया', '(d) Brazil / ब्राजील'],
    correctOptionIndex: 3,
    explanation: 'Brazil is selected as the global host for World Environment Day 2026 with a focus on forest restoration.'
  },
{
    id: 'ca-q-today-132',
    text: 'India has announced its candidacy for non-permanent membership of the United Nations Security Council (UNSC) for which term? / भारत ने किस कार्यकाल के लिए संयुक्त राष्ट्र सुरक्षा परिषद (UNSC) के अस्थायी सदस्य के लिए अपनी उम्मीदवारी की घोषणा की है?',
    options: ['(a) 2028-29', '(b) 2026-27', '(c) 2030-31', '(d) 2027-28'],
    correctOptionIndex: 0,
    explanation: 'India has formally submitted its bid for a non-permanent seat at the UNSC for the 2028-2029 term.'
  },
{
    id: 'ca-q-today-133',
    text: 'India\'s first indigenous hydrogen-powered train is scheduled to run on which heritage route? / भारत की पहली स्वदेशी हाइड्रोजन-संचालित ट्रेन किस हेरिटेज रूट पर चलने वाली है?',
    options: ['(a) Kalka-Shimla Route / कालका-शिमला रूट', '(b) Darjeeling Himalayan Route', '(c) Nilgiri Mountain Route', '(d) Matheran Hill Route'],
    correctOptionIndex: 0,
    explanation: 'Indian Railways is conducting trials to roll out India\'s first hydrogen train on the Kalka-Shimla heritage circuit.'
  },
{
    id: 'ca-q-today-134',
    text: 'Who was awarded the prestigious Saraswati Samman for outstanding literature? / उत्कृष्ट साहित्य के लिए प्रतिष्ठित सरस्वती सम्मान से किसे सम्मानित किया गया था?',
    options: ['(a) Prabha Varma / प्रभा वर्मा', '(b) Sivasankari / शिवशंकरी', '(c) Ramdarash Mishra / रामदरश मिश्र', '(d) Sharan Kumar Limbale / शरण कुमार लिम्बाले'],
    correctOptionIndex: 0,
    explanation: 'Renowned poet Prabha Varma was chosen for the prestigious Saraswati Samman award for his novel \'Raudra Satwikam\'.'
  },
{
    id: 'ca-q-today-135',
    text: 'World Oceans Day is observed globally on which date every year? / विश्व महासागर दिवस हर साल दुनिया भर में किस तारीख को मनाया जाता है?',
    options: ['(a) June 8 / 8 जून', '(b) June 5 / 5 जून', '(c) June 12 / 12 जून', '(d) June 21 / 21 जून'],
    correctOptionIndex: 0,
    explanation: 'World Oceans Day is observed on June 8 to raise awareness about the vital role of oceans.'
  },
{
    id: 'ca-q-today-136',
    text: 'Which state government launched the \'Lakhpati Didi\' scheme to empower rural self-help group women? / किस राज्य सरकार ने ग्रामीण स्वयं सहायता समूह की महिलाओं को सशक्त बनाने के लिए \'लखपति दीदी\' योजना शुरू की?',
    options: ['(a) Uttarakhand / उत्तराखंड', '(b) Maharashtra / महाराष्ट्र', '(c) Rajasthan / राजस्थान', '(d) Uttar Pradesh / उत्तर प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'The Lakhpati Didi initiative is aggressively executed across states like Uttarakhand and Rajasthan to boost rural incomes.'
  },
{
    id: 'ca-q-today-137',
    text: 'The PM-PRANAM scheme is aimed at achieving which of the following objectives? / पीएम-प्रणाम (PM-PRANAM) योजना का उद्देश्य निम्नलिखित में से क्या है?',
    options: ['(a) Reducing chemical fertilizer usage / रासायनिक उर्वरकों के उपयोग को कम करना', '(b) Promoting digital education / डिजिटल शिक्षा को बढ़ावा देना', '(c) Assisting organic sericulture / जैविक रेशम उत्पादन में सहायता', '(d) Reclaiming fallow lands / परती भूमि का पुनरुद्धार'],
    correctOptionIndex: 0,
    explanation: 'PM-PRANAM is aimed at incentivizing states to reduce the consumption of chemical fertilizers.'
  },
{
    id: 'ca-q-today-138',
    text: 'What is the official helpline number of the Indian Cyber Crime Coordination Centre (I4C) for reporting digital fraud? / डिजिटल धोखाधड़ी की रिपोर्ट करने के लिए भारतीय साइबर अपराध समन्वय केंद्र (I4C) का आधिकारिक हेल्पलाइन नंबर क्या है?',
    options: ['(a) 1930', '(b) 112', '(c) 1091', '(d) 100'],
    correctOptionIndex: 0,
    explanation: 'Dialing 1930 connects citizens to the National Cyber Crime Helpline portal to report financial frauds instantly.'
  },
{
    id: 'ca-q-today-139',
    text: 'Which ministry of India oversaw the country\'s first-ever auction of critical minerals like lithium and graphite? / भारत के किस मंत्रालय ने लिथियम और ग्रेफाइट जैसे महत्वपूर्ण खनिजों की देश की पहली नीलामी की देखरेख की?',
    options: ['(a) Ministry of Mines / खान मंत्रालय', '(b) Ministry of Power / विद्युत मंत्रालय', '(c) Ministry of Commerce / वाणिज्य मंत्रालय', '(d) Ministry of Environment / पर्यावरण मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'The Ministry of Mines successfully managed the commercial bidding rounds for critical mineral concessions.'
  },
{
    id: 'ca-q-today-140',
    text: 'Which regional group became a permanent member of the G20 during India\'s presidency? / भारत की अध्यक्षता के दौरान कौन सा क्षेत्रीय समूह G20 का स्थायी सदस्य बना?',
    options: ['(a) African Union / अफ्रीकी संघ', '(b) European Union / यूरोपीय संघ', '(c) ASEAN / आसियान', '(d) OPEC'],
    correctOptionIndex: 0,
    explanation: 'The African Union was formally inducted as a permanent member of the G20 under India\'s G20 presidency.'
  },
{
    id: 'ca-q-today-141',
    text: 'Project \'Udbhav\', recently seen in news, is an initiative of which Indian institution? / हाल ही में खबरों में रहा प्रोजेक्ट \'उद्भव\' (Project Udbhav) किस भारतीय संस्थान की एक पहल है?',
    options: ['(a) Indian Army / भारतीय सेना', '(b) ISRO / इसरो', '(c) DRDO / डीआरडीओ', '(d) Ministry of Culture / संस्कृति मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'Project Udbhav is an initiative of the Indian Army to synthesize ancient Indian statecraft and military wisdom with modern security.'
  },
{
    id: 'ca-q-today-142',
    text: 'In which state/UT is India constructing the world\'s tallest railway pier bridge across the Iring river? / भारत इयरिंग नदी पर दुनिया का सबसे ऊंचा रेलवे पियर ब्रिज (रेलवे घाट पुल) किस राज्य/केंद्र शासित प्रदेश में बना रहा है?',
    options: ['(a) Manipur / मणिपुर', '(b) Jammu & Kashmir / जम्मू और कश्मीर', '(c) Himachal Pradesh / हिमाचल प्रदेश', '(d) Arunachal Pradesh'],
    correctOptionIndex: 0,
    explanation: 'The spectacular Indian Railways bridge project is situated in Manipur, standing at a pier height of 141 meters.'
  },
{
    id: 'ca-q-today-143',
    text: 'According to latest Global Unicorn Index rankings, what is India\'s position in terms of unicorn startups? / नवीनतम ग्लोबल यूनिकॉर्न इंडेक्स रैंकिंग के अनुसार, यूनिकॉर्न स्टार्टअप्स के मामले में भारत का क्या स्थान है?',
    options: ['(a) 3rd / तीसरा', '(b) 2nd / दूसरा', '(c) 4th / चौथा', '(d) 5th / पांचवां'],
    correctOptionIndex: 0,
    explanation: 'India maintains its position as the third-largest startup ecosystem in the world with over 110 unicorns.'
  },
{
    id: 'ca-q-today-144',
    text: 'The Lemru Elephant Reserve, which is aimed at managing human-wildlife encounters, is located in which state? / लेमरू हाथी रिजर्व, जिसका उद्देश्य मानव-वन्यजीव मुठभेड़ों को प्रबंधित करना है, किस राज्य में स्थित है?',
    options: ['(a) Chhattisgarh / छत्तीसगढ़', '(b) Jharkhand / झारखंड', '(c) Odisha / ओडिशा', '(d) Assam / असम'],
    correctOptionIndex: 0,
    explanation: 'The Lemru Elephant Reserve is situated in Chhattisgarh, established to protect elephant habitats.'
  },
{
    id: 'ca-q-today-145',
    text: 'The famous \'Cuttack Silver Filigree\' (Rupa Tarakasi) which recently received a GI Tag belongs to which state? / प्रसिद्ध \'कटक सिल्वर फिलीग्री\' (रूपा तारकशी) जिसे हाल ही में जीआई टैग प्राप्त हुआ है, किस राज्य से संबंधित है?',
    options: ['(a) Odisha / ओडिशा', '(b) Bihar / बिहार', '(c) West Bengal / पश्चिम बंगाल', '(d) Rajasthan / राजस्थान'],
    correctOptionIndex: 0,
    explanation: 'Odisha\'s exquisite silver filigree handicraft from Cuttack was awarded the Geographical Indication (GI) status.'
  },
{
    id: 'ca-q-today-146',
    text: 'Which state became the first in independent India to pass and implement a Uniform Civil Code (UCC) Bill? / स्वतंत्र भारत में समान नागरिक संहिता (UCC) विधेयक पारित और लागू करने वाला पहला राज्य कौन सा बना है?',
    options: ['(a) Uttarakhand / उत्तराखंड', '(b) Goa / गोवा', '(c) Gujarat / गुजरात', '(d) Assam / असम'],
    correctOptionIndex: 0,
    explanation: 'Uttarakhand became the first state in independent India to pass a comprehensive Uniform Civil Code bill.'
  },
{
    id: 'ca-q-today-147',
    text: 'The \'Mera Yuva Bharat\' (MY Bharat) portal launched by India targets which of the following youth groups? / भारत द्वारा शुरू किया गया \'मेरा युवा भारत\' (MY Bharat) पोर्टल निम्नलिखित में से किस युवा समूह को लक्षित करता है?',
    options: ['(a) Youth aged 15-29 years / 15-29 वर्ष के युवा', '(b) Youth aged 18-35 years / 18-35 वर्ष के युवा', '(c) School students only / केवल स्कूली छात्र', '(d) Engineering graduates only / केवल इंजीनियरिंग स्नातक'],
    correctOptionIndex: 0,
    explanation: 'MY Bharat is a technology-driven platform dedicated to empowering youths aged 15-29.'
  },
{
    id: 'ca-q-today-148',
    text: 'The United Nations Sustainable Development Goal (SDG) 6 is dedicated to which of the following? / संयुक्त राष्ट्र का सतत विकास लक्ष्य (SDG) 6 निम्नलिखित में से किससे संबंधित है?',
    options: ['(a) Clean Water and Sanitation / स्वच्छ जल और स्वच्छता', '(b) Quality Education / गुणवत्तापूर्ण शिक्षा', '(c) Affordable and Clean Energy / सस्ती और स्वच्छ ऊर्जा', '(d) Zero Hunger / शून्य भुखमरी'],
    correctOptionIndex: 0,
    explanation: 'SDG 6 targets universal and equitable access to safe and affordable drinking water and sanitation for all.'
  },
{
    id: 'ca-q-today-149',
    text: 'The headquarters of the International Solar Alliance (ISA) is situated in which city? / अंतर्राष्ट्रीय सौर गठबंधन (ISA) का मुख्यालय किस शहर में स्थित है?',
    options: ['(a) Gurugram, India / गुरुग्राम, भारत', '(b) Paris, France / पेरिस, फ्रांस', '(c) Geneva, Switzerland / जिनेवा, स्विट्जरलैंड', '(d) New Delhi, India / नई दिल्ली, भारत'],
    correctOptionIndex: 0,
    explanation: 'The ISA is co-founded by India and France, with its central headquarters situated in Gurugram, Haryana.'
  },
{
    id: 'ca-q-today-150',
    text: 'The joint military exercise \'Nomadic Elephant\' is conducted between India and which country? / संयुक्त सैन्य अभ्यास \'नोमैडिक एलीफेंट\' भारत और किस देश के बीच आयोजित किया जाता है?',
    options: ['(a) Mongolia / मंगोलिया', '(b) Kazakhstan / कजाकिस्तान', '(c) Kyrgyzstan / किर्गिस्तान', '(d) Oman / ओमान'],
    correctOptionIndex: 0,
    explanation: 'Nomadic Elephant is an annual bilateral training exercise between the armies of India and Mongolia.'
  },

{
    id: 'ca-q-today-150',
    text: 'The joint military exercise \'Nomadic Elephant\' is conducted between India and which country? / संयुक्त सैन्य अभ्यास \'नोमैडिक एलीफेंट\' भारत और किस देश के बीच आयोजित किया जाता है?',
    options: ['(a) Mongolia / मंगोलिया', '(b) Kazakhstan / कजाकिस्तान', '(c) Kyrgyzstan / किर्गिस्तान', '(d) Oman / ओमान'],
    correctOptionIndex: 0,
    explanation: 'Nomadic Elephant is an annual bilateral training exercise between the armies of India and Mongolia.'
  },
{
    id: 'ca-q-today-151',
    text: 'Which space agency launched the Shukrayaan Venus orbiter mission assembly phase in late June 2026? / जून 2026 के अंत में किस अंतरिक्ष एजेंसी ने शुक्रयान वीनस ऑर्बिटर मिशन असेंबली चरण शुरू किया?',
    options: ['(a) ISRO / इसरो', '(b) NASA / नासा', '(c) JAXA / जाक्सा', '(d) ESA / ईएसए'],
    correctOptionIndex: 0,
    explanation: 'The Indian Space Research Organisation (ISRO) officially commenced planetary payload assembly of Shukrayaan Venus Orbiter at UR Rao Satellite Centre in June 2026.'
  },
{
    id: 'ca-q-today-152',
    text: 'What was the gross GST revenue collection of India in June 2026? / जून 2026 में भारत का कुल सकल जीएसटी राजस्व संग्रह कितना रहा?',
    options: ['(a) ₹2.15 Lakh Crore / ₹2.15 लाख करोड़', '(b) ₹1.90 Lakh Crore / ₹1.90 लाख करोड़', '(c) ₹1.80 Lakh Crore / ₹1.80 लाख करोड़', '(d) ₹2.30 Lakh Crore / ₹2.30 लाख करोड़'],
    correctOptionIndex: 0,
    explanation: 'India\'s gross GST collections reached a monumental, all-time record high of ₹2.15 Lakh Crore in June 2026, marking a robust 14% year-on-year growth.'
  },
{
    id: 'ca-q-today-153',
    text: 'In June 2026, which country successfully launched its eco-friendly hydrogen-powered train trial run? / जून 2026 में, किस देश ने अपने पर्यावरण अनुकूल हाइड्रोजन संचालित ट्रेन परीक्षण का सफलतापूर्वक संचालन किया?',
    options: ['(a) Germany / जर्मनी', '(b) Japan / जापान', '(c) India / भारत', '(d) South Korea / दक्षिण कोरिया'],
    correctOptionIndex: 2,
    explanation: 'India successfully launched its first commercial-scale environment-friendly hydrogen-powered train trial run in June 2026 as part of its Net-Zero railway targets.'
  },
{
    id: 'ca-q-today-154',
    text: 'Who took oath as the new Chief Justice of India (CJI) in June 2026? / जून 2026 में भारत के नए मुख्य न्यायाधीश (CJI) के रूप में किसने शपथ ली?',
    options: ['(a) Justice Sanjiv Khanna / न्यायमूर्ति संजीव खन्ना', '(b) Justice B. R. Gavai / न्यायमूर्ति बी. आर. गवई', '(c) Justice Surya Kant / न्यायमूर्ति सूर्यकांत', '(d) Justice Hrishikesh Roy / न्यायमूर्ति ऋषिकेश रॉय'],
    correctOptionIndex: 1,
    explanation: 'Justice B. R. Gavai officially took oath as the next Chief Justice of India (CJI) in late June 2026, succeeding the previous CJI.'
  },
{
    id: 'ca-q-today-155',
    text: 'Which state became the first in India to implement a fully digitized land-holding register using blockchain technology in 2026? / कौन सा राज्य 2026 में ब्लॉकचेन तकनीक का उपयोग करके पूरी तरह से डिजिटल लैंड-होल्डिंग रजिस्टर लागू करने वाला भारत का पहला राज्य बन गया?',
    options: ['(a) Telangana / तेलंगाना', '(b) Andhra Pradesh / आंध्र प्रदेश', '(c) Maharashtra / महाराष्ट्र', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 1,
    explanation: 'Andhra Pradesh implemented India\'s first blockchain-secured digital land register to eliminate fraudulent property disputes and double registrations.'
  },
{
    id: 'ca-q-today-156',
    text: 'India signed a civil nuclear cooperation agreement with which European nation in June 2026? / भारत ने जून 2026 में किस यूरोपीय राष्ट्र के साथ नागरिक परमाणु सहयोग समझौते पर हस्ताक्षर किए?',
    options: ['(a) France / फ्रांस', '(b) Hungary / हंगरी', '(c) Spain / स्पेन', '(d) Poland / पोलैंड'],
    correctOptionIndex: 0,
    explanation: 'India and France formalized an expansive civil nuclear partnership roadmap to fast-track small modular reactor (SMR) development and secure fuel supplies.'
  },
{
    id: 'ca-q-today-157',
    text: 'Which city hosted the 2026 SCO (Shanghai Cooperation Organisation) Summit? / किस शहर ने 2026 एससीओ (शंघाई सहयोग संगठन) शिखर सम्मेलन की मेजबानी की?',
    options: ['(a) Tashkent / ताशकंद', '(b) Beijing / बीजिंग', '(c) New Delhi / नई दिल्ली', '(d) Astana / अस्ताना'],
    correctOptionIndex: 3,
    explanation: 'The 2026 Shanghai Cooperation Organisation (SCO) Council of Heads of State summit was hosted under the presidency of Kazakhstan in Astana.'
  },
{
    id: 'ca-q-today-158',
    text: 'What is the rank of India in the World Press Freedom Index 2026? / विश्व प्रेस स्वतंत्रता सूचकांक 2026 में भारत का स्थान क्या है?',
    options: ['(a) 150th / 150वां', '(b) 142nd / 142वां', '(c) 138th / 138वां', '(d) 144th / 144वां'],
    correctOptionIndex: 2,
    explanation: 'India moved up slightly to the 138th position in the latest World Press Freedom Index 2026 published by Reporters Without Borders.'
  },
{
    id: 'ca-q-today-159',
    text: 'Which country won the Men\'s Hockey Pro League 2025-2026 title? / पुरुषों की हॉकी प्रो लीग 2025-2026 का खिताब किस देश ने जीता?',
    options: ['(a) Netherlands / नीदरलैंड', '(b) India / भारत', '(c) Australia / ऑस्ट्रेलिया', '(d) Germany / जर्मनी'],
    correctOptionIndex: 1,
    explanation: 'Indian Men\'s National Hockey Team clinched the prestigious Hockey Pro League 2025-2026 title after a brilliant victory over Germany in the ultimate tie.'
  },
{
    id: 'ca-q-today-160',
    text: 'Which Indian airport was voted the \'Best Regional Airport in India & South Asia\' at the 2026 Skytrax World Airport Awards? / 2026 स्काईट्रैक्स वर्ल्ड एयरपोर्ट अवार्ड्स में किस भारतीय हवाई अड्डे को \'भारत और दक्षिण एशिया का सर्वश्रेष्ठ क्षेत्रीय हवाई अड्डा\' चुना गया?',
    options: ['(a) Kempegowda International Airport (Bengaluru) / केम्पेगौड़ा अंतर्राष्ट्रीय हवाई अड्डा', '(b) Rajiv Gandhi International Airport (Hyderabad) / राजीव गांधी अंतर्राष्ट्रीय हवाई अड्डा', '(c) Indira Gandhi International Airport (Delhi) / इंदिरा गांधी अंतर्राष्ट्रीय हवाई अड्डा', '(d) Chhatrapati Shivaji Maharaj International Airport (Mumbai) / छत्रपति शिवाजी महाराज अंतर्राष्ट्रीय हवाई अड्डा'],
    correctOptionIndex: 1,
    explanation: 'Rajiv Gandhi International Airport (GMR Hyderabad) was recognized as the best regional airport in India & South Asia at the Skytrax Awards.'
  },
{
    id: 'ca-q-today-161',
    text: 'The global agreement on "Biodiversity Beyond National Jurisdiction" (BBNJ), also known as the High Seas Treaty, was ratified by India in June 2026. Which organization drafted this treaty? / राष्ट्रीय अधिकार क्षेत्र से परे जैव विविधता (BBNJ) पर वैश्विक समझौते, जिसे हाई सीज़ ट्रीटी भी कहा जाता है, को जून 2026 में भारत द्वारा अनुमोदित किया गया। यह संधि किस संगठन द्वारा तैयार की गई थी?',
    options: ['(a) IUCN / आईयूसीएन', '(b) United Nations (UN) / संयुक्त राष्ट्र', '(c) World Bank / विश्व बैंक', '(d) WEF / विश्व आर्थिक मंच'],
    correctOptionIndex: 1,
    explanation: 'The High Seas Treaty was drafted and passed under the United Nations (UN) to ensure ocean protection in international waters covering nearly half of Earth\'s surface.'
  },
{
    id: 'ca-q-today-162',
    text: 'In June 2026, the Union Government approved the development of a mega greenfield port at Vadhavan. In which state is Vadhavan located? / जून 2026 में, केंद्र सरकार ने वधावन में एक मेगा ग्रीनफील्ड बंदरगाह के विकास को मंजूरी दी। वधावन किस राज्य में स्थित है?',
    options: ['(a) Gujarat / गुजरात', '(b) Maharashtra / महाराष्ट्र', '(c) Tamil Nadu / तमिलनाडु', '(d) Odisha / ओडिशा'],
    correctOptionIndex: 1,
    explanation: 'The Union Cabinet approved the mega greenfield port project at Vadhavan in Maharashtra with an investment exceeding ₹76,000 crores.'
  },
{
    id: 'ca-q-today-163',
    text: 'Who won the 2026 French Open Men\'s Singles title? / 2026 फ्रेंच ओपन पुरुष एकल का खिताब किसने जीता?',
    options: ['(a) Carlos Alcaraz / कार्लोस अल्कराज', '(b) Jannik Sinner / जानिक सिनर', '(c) Novak Djokovic / नोवाक जोकोविच', '(d) Alexander Zverev / अलेक्जेंडर ज्वेरेव'],
    correctOptionIndex: 1,
    explanation: 'Jannik Sinner of Italy played a brilliant baseline game to secure his maiden French Open Clay Court crown in the 2026 edition.'
  },
{
    id: 'ca-q-today-164',
    text: 'What is the primary objective of the newly launched \'PRERANA\' program by the Ministry of Education? / शिक्षा मंत्रालय द्वारा हाल ही में शुरू किए गए \'प्रेरणा\' (PRERANA) कार्यक्रम का प्राथमिक उद्देश्य क्या है?',
    options: ['(a) Skill development / कौशल विकास', '(b) Experiential leadership learning / अनुभवात्मक नेतृत्व शिक्षा', '(c) Digital literacy / डिजिटल साक्षरता', '(d) Women empowerment / महिला सशक्तिकरण'],
    correctOptionIndex: 1,
    explanation: 'PRERANA is a residential, experiential week-long leadership program for selected school students focusing on patriotic and civic values.'
  },
{
    id: 'ca-q-today-165',
    text: 'India\'s first high-speed AI supercomputer "PARAM Rudra" was dedicated to the nation recently. Where was it developed? / भारत का पहला हाई-स्पीड एआई सुपरकंप्यूटर "परम रुद्र" हाल ही में राष्ट्र को समर्पित किया गया। इसे कहाँ विकसित किया गया था?',
    options: ['(a) IIT Madras / आईआईटी मद्रास', '(b) C-DAC Pune / सी-डैक पुणे', '(c) IISc Bangalore / आईआईएससी बैंगलोर', '(d) IIT Bombay / आईआईटी बॉम्बे'],
    correctOptionIndex: 1,
    explanation: 'PARAM Rudra supercomputers have been indigenously developed by the Centre for Development of Advanced Computing (C-DAC) in Pune under the National Supercomputing Mission.'
  },
{
    id: 'ca-q-today-166',
    text: 'Which country launched the world\'s first wood-based satellite \'LignoSat\' into space in collaboration with NASA? / नासा के सहयोग से किस देश ने दुनिया का पहला लकड़ी आधारित उपग्रह \'लिग्नोसैट\' (LignoSat) अंतरिक्ष में लॉन्च किया?',
    options: ['(a) Japan / जापान', '(b) Germany / जर्मनी', '(c) United States / संयुक्त राज्य अमेरिका', '(d) India / भारत'],
    correctOptionIndex: 0,
    explanation: 'Japanese researchers from Kyoto University, in cooperation with NASA, launched LignoSat, a wooden satellite designed to test sustainable alternative outer shells in space.'
  },
{
    id: 'ca-q-today-167',
    text: 'The NITI Aayog has launched the \'SAMPPOORNA\' initiative in collaboration with which organization? / नीति आयोग ने किस संगठन के सहयोग से \'सम्पूर्ण\' (SAMPPOORNA) पहल शुरू की है?',
    options: ['(a) SIDBI / सिडबी', '(b) NABARD / नाबार्ड', '(c) World Bank / विश्व बैंक', '(d) UNDP / यूएनडीपी'],
    correctOptionIndex: 0,
    explanation: 'The NITI Aayog partnered with SIDBI (Small Industries Development Bank of India) to accelerate developmental parameters in Aspirational Districts and Blocks under the Sampoorna initiative.'
  },
{
    id: 'ca-q-today-168',
    text: 'Which state government announced the "Mukhya Mantri Nijut Moina Scheme" in June 2026 to fight child marriage and promote girl education? / किस राज्य सरकार ने बाल विवाह से लड़ने और लड़कियों की शिक्षा को बढ़ावा देने के लिए जून 2026 में "मुख्यमंत्री निजुत मोइना योजना" की घोषणा की?',
    options: ['(a) Assam / असम', '(b) Odisha / ओडिशा', '(c) Bihar / बिहार', '(d) Madhya Pradesh / मध्य प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'The Assam Cabinet approved the Mukhya Mantri Nijut Moina Scheme, which provides monthly financial stipends to girl students starting from higher secondary level to post-graduation.'
  },
{
    id: 'ca-q-today-169',
    text: 'What was the theme of International Yoga Day celebrated on June 21, 2026? / 21 जून 2026 को मनाए गए अंतर्राष्ट्रीय योग दिवस का विषय (थीम) क्या था?',
    options: ['(a) Yoga for Women Empowerment / महिला सशक्तिकरण के लिए योग', '(b) Yoga for Self and Society / स्वयं और समाज के लिए योग', '(c) Yoga for Humanity / मानवता के लिए योग', '(d) Yoga for Well-being / कल्याण के लिए योग'],
    correctOptionIndex: 1,
    explanation: 'International Day of Yoga 2026 was celebrated worldwide under the official central theme "Yoga for Self and Society" to emphasize personal health and global harmony.'
  },
{
    id: 'ca-q-today-170',
    text: 'India\'s first integrated Heliport was inaugurated recently in which city? / भारत के पहले एकीकृत हेलीपोर्ट (Integrated Heliport) का उद्घाटन हाल ही में किस शहर में किया गया?',
    options: ['(a) Rohini, Delhi / रोहिणी, दिल्ली', '(b) Noida / नोएडा', '(c) Gurugram / गुरुग्राम', '(d) Mumbai / मुंबई'],
    correctOptionIndex: 0,
    explanation: 'The Ministry of Civil Aviation inaugurated India\'s first state-of-the-art integrated heliport built by Pawan Hans at Rohini, Delhi.'
  },
{
    id: 'ca-q-today-171',
    text: 'Who won the prestigious Pen Pinter Prize 2026? / प्रतिष्ठित पेन पिंटर पुरस्कार 2026 किसने जीता?',
    options: ['(a) Arundhati Roy / अरुंधति रॉय', '(b) Salman Rushdie / सलमान रुश्दी', '(c) Margaret Atwood / मार्गरेट एटवुड', '(d) Amitav Ghosh / अमिताव घोष'],
    correctOptionIndex: 0,
    explanation: 'Renowned Indian author and activist Arundhati Roy was awarded the prestigious Pen Pinter Prize for her courage and literary defense of human rights.'
  },
{
    id: 'ca-q-today-172',
    text: 'Which country ranked 1st in the World Economic Forum\'s Energy Transition Index 2026? / विश्व आर्थिक मंच के ऊर्जा संक्रमण सूचकांक 2026 में कौन सा देश पहले स्थान पर रहा?',
    options: ['(a) Sweden / स्वीडन', '(b) Denmark / डेनमार्क', '(c) Finland / फिनलैंड', '(d) Norway / नॉर्वे'],
    correctOptionIndex: 0,
    explanation: 'Sweden secured the top position in the Energy Transition Index 2026, followed closely by Denmark and Finland.'
  },
{
    id: 'ca-q-today-173',
    text: 'The government has launched "e-Sankalp" portal for which of the following purposes? / सरकार ने निम्नलिखित में से किस उद्देश्य के लिए "ई-संकल्प" (e-Sankalp) पोर्टल लॉन्च किया है?',
    options: ['(a) Online legal aid / ऑनलाइन कानूनी सहायता', '(b) Digital repository of administrative reforms / प्रशासनिक सुधारों का डिजिटल भंडार', '(c) Farmers pension tracking / किसान पेंशन ट्रैकिंग', '(d) MSME loans approval / एमएसएमई ऋण स्वीकृति'],
    correctOptionIndex: 1,
    explanation: 'The Department of Administrative Reforms and Public Grievances (DARPG) launched the e-Sankalp portal to serve as a digital repository for administrative reforms.'
  },
{
    id: 'ca-q-today-174',
    text: 'In June 2026, India\'s first tribal-dominated district Mandla became fully functionally literate. In which state is Mandla located? / जून 2026 में, भारत का पहला आदिवासी बहुल जिला मंडला पूरी तरह से कार्यात्मक रूप से साक्षर हो गया। मंडला किस राज्य में स्थित है?',
    options: ['(a) Jharkhand / झारखंड', '(b) Madhya Pradesh / मध्य प्रदेश', '(c) Chhattisgarh / छत्तीसगढ़', '(d) Odisha / ओडिशा'],
    correctOptionIndex: 1,
    explanation: 'Mandla district in Madhya Pradesh successfully achieved functional literacy, with all adults being able to write their names and perform basic arithmetic calculations.'
  },
{
    id: 'ca-q-today-175',
    text: 'Who has been appointed as the Director General of the National Testing Agency (NTA) in June 2026? / जून 2026 में राष्ट्रीय परीक्षण एजेंसी (NTA) के महानिदेशक के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Pradeep Singh Kharola / प्रदीप सिंह खरोला', '(b) Subodh Kumar Singh / सुबोध कुमार सिंह', '(c) Vineet Joshi / विनीत जोशी', '(d) Sanjay Murthy / संजय मूर्ति'],
    correctOptionIndex: 0,
    explanation: 'Senior bureaucrat Pradeep Singh Kharola was appointed as the Director General of the National Testing Agency (NTA) to oversee exam reforms.'
  },
{
    id: 'ca-q-today-176',
    text: 'What is the name of the central scheme launched to set up 12 modern industrial smart cities across India? / भारत भर में 12 आधुनिक औद्योगिक स्मार्ट शहरों को स्थापित करने के लिए शुरू की गई केंद्रीय योजना का नाम क्या है?',
    options: ['(a) NICDP / एनआईसीडीपी', '(b) PM-MITRA / पीएम-मित्र', '(c) AMRUT 2.0 / अमृत 2.0', '(d) SHRESHTA / श्रेष्ठ'],
    correctOptionIndex: 0,
    explanation: 'The Union Cabinet approved the National Industrial Corridor Development Programme (NICDP) to build 12 smart industrial cities across India.'
  },
{
    id: 'ca-q-today-177',
    text: 'India successfully operationalized its first deep-water transshipment port at Vizhinjam. In which state is it located? / भारत ने विझिनजम में अपना पहला गहरे पानी का ट्रांसशिपमेंट पोर्ट सफलतापूर्वक संचालित किया। यह किस राज्य में स्थित है?',
    options: ['(a) Kerala / केरल', '(b) Tamil Nadu / तमिलनाडु', '(c) Andhra Pradesh / आंध्र प्रदेश', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 0,
    explanation: 'Vizhinjam International Seaport, India\'s first deep-water transshipment container terminal, is located near Thiruvananthapuram in Kerala.'
  },
{
    id: 'ca-q-today-178',
    text: 'The central government introduced the "BHASKAR" portal to support which group of stakeholders? / केंद्र सरकार ने किस हितधारक समूह का समर्थन करने के लिए "भास्कर" (BHASKAR) पोर्टल पेश किया?',
    options: ['(a) Startups / स्टार्टअप', '(b) Senior citizens / वरिष्ठ नागरिक', '(c) Handicraft artisans / हस्तशिल्प कारीगर', '(d) Agri-exporters / कृषि निर्यातक'],
    correctOptionIndex: 0,
    explanation: 'The Bharat Startup Knowledge Access Registry (BHASKAR) portal was introduced to streamline startup networking, mentoring, and support.'
  },
{
    id: 'ca-q-today-179',
    text: 'In June 2026, which state cabinet approved the proposal to establish the state\'s first Elephant Reserve? / जून 2026 में, किस राज्य कैबिनेट ने राज्य के पहले हाथी रिजर्व को स्थापित करने के प्रस्ताव को मंजूरी दी?',
    options: ['(a) Bihar / बिहार', '(b) Madhya Pradesh / मध्य प्रदेश', '(c) Rajasthan / राजस्थान', '(d) Punjab / पंजाब'],
    correctOptionIndex: 0,
    explanation: 'The Bihar State Cabinet approved the creation of the state\'s first Elephant Reserve in Jamui forest division to provide safe habitat for migratory herds.'
  },
{
    id: 'ca-q-today-180',
    text: 'Which country emerged as India\'s largest trading partner in the fiscal year 2025-2026? / वित्तीय वर्ष 2025-2026 में कौन सा देश भारत का सबसे बड़ा व्यापारिक भागीदार बनकर उभरा है?',
    options: ['(a) United States / संयुक्त राज्य अमेरिका', '(b) China / चीन', '(c) UAE / यूएई', '(d) Russia / रूस'],
    correctOptionIndex: 1,
    explanation: 'China surpassed the United States to emerge as India\'s largest trading partner in the fiscal year 2025-26, followed closely by the US and UAE.'
  },
{
    id: 'ca-q-today-181',
    text: 'India\'s first semi-high speed regional rail service, Namo Bharat, currently operates on which corridor? / भारत की पहली सेमी-हाई स्पीड क्षेत्रीय रेल सेवा, नमो भारत, वर्तमान में किस कॉरिडोर पर संचालित होती है?',
    options: ['(a) Delhi-Meerut / दिल्ली-मेरठ', '(b) Mumbai-Pune / मुंबई-पुणे', '(c) Bengaluru-Mysuru / बेंगलुरु-मैसूरु', '(d) Ahmedabad-Vadodara / अहमदाबाद-वडोदरा'],
    correctOptionIndex: 0,
    explanation: 'Namo Bharat, India\'s pioneering RRTS rail service, is operational on the Delhi-Ghaziabad-Meerut regional corridor.'
  },
{
    id: 'ca-q-today-182',
    text: 'Who is the author of the recently released book "The Golden Road", which details India\'s ancient trade and cultural influence? / हाल ही में जारी पुस्तक "द गोल्डन रोड" के लेखक कौन हैं, जो भारत के प्राचीन व्यापार और सांस्कृतिक प्रभाव का विवरण देती है?',
    options: ['(a) William Dalrymple / विलियम डेलरिम्पल', '(b) Shashi Tharoor / शशि थरूर', '(c) Amitav Ghosh / अमिताव घोष', '(d) Vikram Seth / विक्रम सेठ'],
    correctOptionIndex: 0,
    explanation: 'Acclaimed historian William Dalrymple wrote "The Golden Road: How Ancient India Transformed the World," detailing ancient trading tracks.'
  },
{
    id: 'ca-q-today-183',
    text: 'In June 2026, which national park in India welcomed new cheetah cubs under Project Cheetah? / जून 2026 में, प्रोजेक्ट चीता के तहत भारत के किस राष्ट्रीय उद्यान में नए चीता शावकों का स्वागत किया गया?',
    options: ['(a) Kuno National Park / कूनो राष्ट्रीय उद्यान', '(b) Ranthambore National Park / रणथंभौर राष्ट्रीय उद्यान', '(c) Jim Corbett National Park / जिम कॉर्बेट राष्ट्रीय उद्यान', '(d) Kaziranga National Park / काजीरंगा राष्ट्रीय उद्यान'],
    correctOptionIndex: 0,
    explanation: 'Kuno National Park in Madhya Pradesh reported the safe birth of multiple cheetah cubs under the ongoing species reintroduction project.'
  },
{
    id: 'ca-q-today-184',
    text: 'Who won the 2026 Men\'s T20 Cricket World Cup held in West Indies & USA? / वेस्टइंडीज और यूएसए में आयोजित 2026 पुरुष टी20 क्रिकेट विश्व कप किसने जीता?',
    options: ['(a) India / भारत', '(b) South Africa / दक्षिण अफ्रीका', '(c) Australia / ऑस्ट्रेलिया', '(d) England / इंग्लैंड'],
    correctOptionIndex: 0,
    explanation: 'The Indian Men\'s Cricket Team won the ICC T20 World Cup with a historic victory in the finals over South Africa.'
  },
{
    id: 'ca-q-today-185',
    text: 'The "PM-SURYAGHAR: Muft Bijli Yojana" aims to install rooftop solar panels on how many households across India? / "पीएम-सूर्यघर: मुफ्त बिजली योजना" का उद्देश्य भारत भर में कितने घरों पर रूफटॉप सोलर पैनल स्थापित करना है?',
    options: ['(a) 1 Crore / 1 करोड़', '(b) 50 Lakh / 50 लाख', '(c) 2 Crore / 2 करोड़', '(d) 5 Crore / 5 करोड़'],
    correctOptionIndex: 0,
    explanation: 'The central government approved PM-Suryaghar scheme to provide up to 300 units of free electricity by equipping 1 Crore households with solar setups.'
  },
{
    id: 'ca-q-today-186',
    text: 'The world\'s tallest railway arch bridge, the Chenab Bridge, is located in which Indian State/UT? / दुनिया का सबसे ऊंचा रेलवे आर्च ब्रिज, चिनाब ब्रिज, किस भारतीय राज्य/केंद्र शासित प्रदेश में स्थित है?',
    options: ['(a) Jammu & Kashmir / जम्मू और कश्मीर', '(b) Himachal Pradesh / हिमाचल प्रदेश', '(c) Uttarakhand / उत्तराखंड', '(d) Ladakh / लद्दाख'],
    correctOptionIndex: 0,
    explanation: 'The massive steel arch Chenab Bridge, which stands 359 meters above the river bed, is located in the Reasi district of Jammu & Kashmir.'
  },
{
    id: 'ca-q-today-187',
    text: 'Which state government launched the "NTR Bharosa" pension scheme in June 2026 to increase welfare payouts for senior citizens? / किस राज्य सरकार ने जून 2026 में वरिष्ठ नागरिकों के लिए कल्याणकारी भुगतान बढ़ाने के लिए "एनटीआर भरोसा" पेंशन योजना शुरू की?',
    options: ['(a) Andhra Pradesh / आंध्र प्रदेश', '(b) Telangana / तेलंगाना', '(c) Karnataka / कर्नाटक', '(d) Tamil Nadu / तमिलनाडु'],
    correctOptionIndex: 0,
    explanation: 'The Government of Andhra Pradesh officially re-launched the NTR Bharosa pension scheme, raising benefits for eligible senior citizens to ₹4,000 monthly.'
  },
{
    id: 'ca-q-today-188',
    text: 'Who has been re-appointed as the National Security Advisor (NSA) of India in June 2026? / जून 2026 में भारत के राष्ट्रीय सुरक्षा सलाहकार (NSA) के रूप में किसे फिर से नियुक्त किया गया है?',
    options: ['(a) Ajit Doval / अजीत डोभाल', '(b) Pankaj Kumar Singh / पंकज कुमार सिंह', '(c) Taranjit Singh Sandhu / तरनजीत सिंह संधू', '(d) Sanjay Kumar / संजय कुमार'],
    correctOptionIndex: 0,
    explanation: 'Ajit Doval was officially re-appointed as the National Security Advisor (NSA) of India, continuing his strategic security leadership.'
  },
{
    id: 'ca-q-today-189',
    text: 'India successfully conducted a test flight of "Abhyas" recently. What is Abhyas? / भारत ने हाल ही में "अभ्यास" (Abhyas) का सफल परीक्षण उड़ान आयोजित किया। अभ्यास क्या है?',
    options: ['(a) High-speed Expendable Aerial Target (HEAT) / हाई-स्पीड एक्सपेंडेबल एरियल टारगेट', '(b) Main Battle Tank / मुख्य युद्धक टैंक', '(c) Anti-submarine Missile / एंटी-सबमरीन मिसाइल', '(d) Spy Drone / जासूसी ड्रोन'],
    correctOptionIndex: 0,
    explanation: 'Abhyas is an indigenous High-speed Expendable Aerial Target (HEAT) designed by DRDO to simulate target fighter jets for missile training.'
  },
{
    id: 'ca-q-today-190',
    text: 'What is the name of the newly built terminal of Port Blair Airport, which was inaugurated recently? / पोर्ट ब्लेयर हवाई अड्डे के नवनिर्मित टर्मिनल का नाम क्या है, जिसका उद्घाटन हाल ही में किया गया था?',
    options: ['(a) Veer Savarkar International Airport Terminal / वीर सावरकर अंतर्राष्ट्रीय हवाई अड्डा टर्मिनल', '(b) Netaji Subhas Chandra Bose Terminal / नेताजी सुभाष चंद्र बोस टर्मिनल', '(c) Shaheed Dweep Terminal / शहीद द्वीप टर्मिनल', '(d) Swaraj Terminal / स्वराज टर्मिनल'],
    correctOptionIndex: 0,
    explanation: 'The newly constructed Integrated Terminal Building at Veer Savarkar International Airport, Port Blair, was opened to enhance regional connectivity.'
  },
{
    id: 'ca-q-today-191',
    text: 'Which country officially launched its digital nomad visa program in 2026 to attract tech talent from India? / किस देश ने भारत से तकनीकी प्रतिभाओं को आकर्षित करने के लिए 2026 में आधिकारिक तौर पर अपना डिजिटल नोमैड वीज़ा कार्यक्रम शुरू किया?',
    options: ['(a) Japan / जापान', '(b) South Korea / दक्षिण कोरिया', '(c) Indonesia / इंडोनेशिया', '(d) Thailand / थाईलैंड'],
    correctOptionIndex: 0,
    explanation: 'Japan initiated its new six-month digital nomad visa track in 2026 targeting IT specialists and creators earning over 10 million yen annually.'
  },
{
    id: 'ca-q-today-192',
    text: 'What is India\'s target year to eliminate Lymphatic Filariasis (Elephantiasis), ahead of the global target? / वैश्विक लक्ष्य से पहले, लिंफैटिक फाइलेरिया (हाथीपांव) को समाप्त करने का भारत का लक्ष्य वर्ष क्या है?',
    options: ['(a) 2027 / 2027', '(b) 2030 / 2030', '(c) 2026 / 2026', '(d) 2035 / 2035'],
    correctOptionIndex: 0,
    explanation: 'The Government of India is committed to eliminating Lymphatic Filariasis by 2027 through mass drug administrations, ahead of the global WHO target of 2030.'
  },
{
    id: 'ca-q-today-193',
    text: 'India\'s first commercial green hydrogen blending project in piped natural gas (PNG) network was commissioned in which state? / पाइप्ड नेचुरल गैस (PNG) नेटवर्क में भारत की पहली व्यावसायिक हरित हाइड्रोजन सम्मिश्रण परियोजना किस राज्य में शुरू की गई?',
    options: ['(a) Gujarat / गुजरात', '(b) Maharashtra / महाराष्ट्र', '(c) Rajasthan / राजस्थान', '(d) Uttar Pradesh / उत्तर प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'NTPC and Gujarat Gas successfully commissioned India\'s pioneering green hydrogen natural gas blending setup at Kawas, Gujarat.'
  },
{
    id: 'ca-q-today-194',
    text: 'The historical city of "Kalki Dham", which saw a foundation stone-laying ceremony recently, is located in which district of Uttar Pradesh? / ऐतिहासिक शहर "कल्कि धाम", जिसका हाल ही में शिलान्यास किया गया था, उत्तर प्रदेश के किस जिले में स्थित है?',
    options: ['(a) Sambhal / संभल', '(b) Mathura / मथुरा', '(c) Ayodhya / अयोध्या', '(d) Varanasi / वाराणसी'],
    correctOptionIndex: 0,
    explanation: 'The foundation stone for the Shri Kalki Dham Temple was laid in Sambhal, Uttar Pradesh, in an event attended by top leaders.'
  },
{
    id: 'ca-q-today-195',
    text: 'Which Indian public sector enterprise was awarded the "President\'s Financial Excellence Trophy" in June 2026? / जून 2026 में किस भारतीय सार्वजनिक क्षेत्र के उद्यम को "राष्ट्रपति वित्तीय उत्कृष्टता ट्रॉफी" से सम्मानित किया गया?',
    options: ['(a) NTPC Limited / एनटीपीसी लिमिटेड', '(b) ONGC / ओएनजीसी', '(c) SAIL / सेल', '(d) Coal India / कोल इंडिया'],
    correctOptionIndex: 0,
    explanation: 'NTPC Limited won the coveted President\'s Financial Excellence Trophy for its record-breaking revenue generation and CSR contributions.'
  },
{
    id: 'ca-q-today-196',
    text: 'What is the name of the portal launched by the Ministry of Communications to block lost or stolen mobile phones across India? / भारत भर में खोए या चोरी हुए मोबाइल फोन को ब्लॉक करने के लिए संचार मंत्रालय द्वारा शुरू किए गए पोर्टल का नाम क्या है?',
    options: ['(a) Sanchar Saathi / संचार साथी', '(b) DigiLocker / डिजीलॉकर', '(c) Tarang Sanchar / तरंग संचार', '(d) Bharat Sanchar / भारत संचार'],
    correctOptionIndex: 0,
    explanation: 'The Sanchar Saathi portal allows citizens to block and trace their lost/stolen mobile devices instantly across national telecom grids.'
  },
{
    id: 'ca-q-today-197',
    text: 'Which film won the \'Best Picture\' award at the 2026 National Film Awards? / 2026 के राष्ट्रीय फिल्म पुरस्कारों में किस फिल्म ने \'सर्वश्रेष्ठ फिल्म\' का पुरस्कार जीता?',
    options: ['(a) Gulmohar / गुलमोहर', '(b) Ponniyin Selvan-I / पोन्नियिन सेलवन-I', '(c) Kantara / कांतारा', '(d) Brahmastra / ब्रह्मास्त्र'],
    correctOptionIndex: 2,
    explanation: 'Rishab Shetty\'s block-buster folklore drama \'Kantara\' won the Best Feature Film award at the 70th National Film Awards.'
  },
{
    id: 'ca-q-today-198',
    text: 'India\'s first indigenously designed and built nuclear power plant unit using Pressurised Heavy Water Reactor (PHWR) of 700 MW started commercial operations recently at which location? / 700 मेगावाट के प्रेशराइज्ड हैवी वाटर रिएक्टर (PHWR) का उपयोग करने वाले भारत के पहले स्वदेशी रूप से डिजाइन और निर्मित परमाणु ऊर्जा संयंत्र इकाई ने हाल ही में किस स्थान पर वाणिज्यिक परिचालन शुरू किया?',
    options: ['(a) Kakrapar, Gujarat / काकरापार, गुजरात', '(b) Tarapur, Maharashtra / तारापुर, महाराष्ट्र', '(c) Kalpakkam, Tamil Nadu / कलपक्कम, तमिलनाडु', '(d) Narora, Uttar Pradesh / नरोरा, उत्तर प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'Unit 3 of the Kakrapar Atomic Power Project (KAPP-3), India\'s first indigenously designed 700 MWe PHWR, commenced full-scale commercial operations.'
  },
{
    id: 'ca-q-today-199',
    text: 'Who was appointed as the Chairman of the 16th Finance Commission of India? / भारत के 16वें वित्त आयोग के अध्यक्ष के रूप में किसे नियुक्त किया गया था?',
    options: ['(a) Dr. Arvind Panagariya / डॉ. अरविंद पनगढ़िया', '(b) N. K. Singh / एन. के. सिंह', '(c) Dr. Y. V. Reddy / डॉ. वाई. वी. रेड्डी', '(d) Vijay Kelkar / विजय केलकर'],
    correctOptionIndex: 0,
    explanation: 'Dr. Arvind Panagariya, prominent economist and former NITI Aayog Vice-Chairman, heads the 16th Finance Commission of India.'
  },
{
    id: 'ca-q-today-200',
    text: 'The "SWATI" (Science for Women-A Technology & Innovation) portal, launched to represent women in STEM fields, is maintained by which institution? / स्टेम (STEM) क्षेत्रों में महिलाओं का प्रतिनिधित्व करने के लिए लॉन्च किया गया "स्वाति" (SWATI) पोर्टल किस संस्थान द्वारा बनाए रखा जाता है?',
    options: ['(a) NIPGR / एनआईपीजीआर', '(b) IISc / आईआईएससी', '(c) IIT Delhi / आईआईटी दिल्ली', '(d) CSIR / सीएसआईआर'],
    correctOptionIndex: 0,
    explanation: 'The SWATI portal, launched by the Principal Scientific Adviser to the Government of India, is developed and maintained by the National Institute of Plant Genome Research (NIPGR).'
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
  },
  {
    id: 'ca-q-today-301',
    text: 'What is the length of the newly operationalized Delhi-Ghaziabad-Meerut RRTS corridor? / हाल ही में संचालित दिल्ली-गाजियाबाद-मेरठ आरआरटीएस (RRTS) कॉरिडोर की कुल लंबाई कितनी है?',
    options: ['(a) 75 km / 75 किमी', '(b) 82 km / 82 किमी', '(c) 90 km / 90 किमी', '(d) 105 km / 105 किमी'],
    correctOptionIndex: 1,
    explanation: 'The National Capital Region Transport Corporation (NCRTC) operationalized the entire 82-km Delhi-Ghaziabad-Meerut RRTS corridor.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-302',
    text: 'Under what brand name do the semi-high speed regional trains on the Delhi-Meerut corridor operate? / दिल्ली-मेरठ कॉरिडोर पर चलने वाली सेमी-हाई स्पीड क्षेत्रीय ट्रेनों का क्या नाम है?',
    options: ['(a) Vande Bharat / वंदे भारत', '(b) Namo Bharat / नमो भारत', '(c) Amrit Bharat / अमृत भारत', '(d) Tejas Express / तेजस एक्सप्रेस'],
    correctOptionIndex: 1,
    explanation: 'The regional high-speed train service on the RRTS corridor is branded as Namo Bharat, running up to 160 km/h.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-303',
    text: 'Which technology has been introduced by the RBI for facilitating offline Digital Rupee (e₹) transactions? / आरबीआई द्वारा ऑफलाइन डिजिटल रुपया (e₹) लेनदेन को सक्षम करने के लिए किस तकनीक को पेश किया गया है?',
    options: ['(a) Bluetooth & Sound-wave / ब्लूटूथ और ध्वनि-तरंग', '(b) Satellite Hotspot / सैटेलाइट हॉटस्पॉट', '(c) Optical Laser Reading / ऑप्टिकल लेजर रीडिंग', '(d) NFC Card Tap only / केवल एनएफसी कार्ड टैप'],
    correctOptionIndex: 0,
    explanation: 'The RBI enabled offline transactions for Digital Rupee (e₹) in low connectivity zones using Bluetooth and sound-wave technologies.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-304',
    text: 'What is India\'s rank in the Global AI Adoption Index 2026 published by TechAnalytica? / टेकएनालिटिका द्वारा प्रकाशित ग्लोबल एआई एडॉप्शन इंडेक्स 2026 में भारत का कौन सा स्थान है?',
    options: ['(a) 1st / पहला', '(b) 3rd / तीसरा', '(c) 5th / पांचवा', '(d) 12th / बारहवां'],
    correctOptionIndex: 0,
    explanation: 'India secured the 1st rank globally out of 85 countries in the latest AI adoption report, highlighting state-level digital public infrastructure integrations.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-305',
    text: 'Which organization successfully conducted the intercept flight test of Phase-II Ballistic Missile Defence Interceptor AD-1? / किस संगठन ने द्वितीय चरण की बैलिस्टिक मिसाइल रक्षा इंटरसेप्टर एडी-1 का सफल उड़ान परीक्षण किया?',
    options: ['(a) ISRO / इसरो', '(b) DRDO / डीआरडीओ', '(c) HAL / एचएएल', '(d) BEL / बीईएल'],
    correctOptionIndex: 1,
    explanation: 'DRDO conducted a successful flight test of the Phase-II BMD Interceptor AD-1, designed for low exo-atmospheric and high endo-atmospheric interception.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-306',
    text: 'Which historical mound-burial site of Assam became Northeast India\'s first cultural World Heritage Site inscribed by UNESCO? / असम के किस ऐतिहासिक टीला-दफन स्थल को यूनेस्को द्वारा उत्तर-पूर्व भारत का पहला सांस्कृतिक विश्व धरोहर स्थल घोषित किया गया है?',
    options: ['(a) Kamakhya Temple / कामाख्या मंदिर', '(b) Charaideo Moidams / चराइदेव मोइदम', '(c) Rang Ghar / रंग घर', '(d) Sivasagar Sivadol / शिवसागर शिवडोल'],
    correctOptionIndex: 1,
    explanation: 'The mound-burial system of the Ahom dynasty known as Charaideo Moidams in Assam has been inscribed as India\'s 43rd UNESCO World Heritage Site.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-307',
    text: 'PV Sindhu clinched the Women\'s Singles title at which Super 500 Badminton tournament in Calgary? / पीवी सिंधु ने कैलगरी में किस सुपर 500 बैडमिंटन टूर्नामेंट में महिला एकल का खिताब जीता है?',
    options: ['(a) Canada Open / कनाडा ओपन', '(b) Swiss Open / स्विस ओपन', '(c) All England Open / ऑल इंग्लैंड ओपन', '(d) Singapore Open / सिंगापुर ओपन'],
    correctOptionIndex: 0,
    explanation: 'PV Sindhu registered a stellar victory to win the Women\'s Singles title at the Canada Open Super 500 badminton tournament.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-308',
    text: 'What is the name of the first indigenous Light Tank deployed by the Indian Army in high-altitude desert regions of Eastern Ladakh? / पूर्वी लद्दाख के उच्च ऊंचाई वाले रेगिस्तानी क्षेत्रों में भारतीय सेना द्वारा तैनात पहले स्वदेशी हल्के टैंक का क्या नाम है?',
    options: ['(a) Zorawar / जोरावर', '(b) Vajra / वज्र', '(c) Bhishma / भीष्म', '(d) Arjun / अर्जुन'],
    correctOptionIndex: 0,
    explanation: 'The Indian Army officially deployed its first batch of the indigenous "Zorawar" Light Tanks, jointly developed by DRDO and L&T, in Eastern Ladakh.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-309',
    text: 'What is the primary focus of the newly approved PM-Vidyalaxmi central sector scheme? / नव स्वीकृत पीएम-विद्यालक्ष्मी केंद्रीय क्षेत्र योजना का प्राथमिक फोकस क्या है?',
    options: ['(a) Secondary school mid-day meals / माध्यमिक विद्यालय मध्याह्न भोजन', '(b) Collateral-free, interest-subsidized education loans / संपार्श्विक-मुक्त, ब्याज-सब्सिडी वाले शिक्षा ऋण', '(c) Rural health insurance / ग्रामीण स्वास्थ्य बीमा', '(d) Female sports scholarships / महिला खेल छात्रवृत्ति'],
    correctOptionIndex: 1,
    explanation: 'The PM-Vidyalaxmi central sector scheme provides collateral-free and interest-subsidized higher education loans for meritorious students.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-310',
    text: 'What throw distance secured Neeraj Chopra the top spot at the Paris Diamond League 2026? / पेरिस डायमंड लीग 2026 में नीरज चोपड़ा को शीर्ष स्थान दिलाने वाला थ्रो प्रदर्शन कितना था?',
    options: ['(a) 87.58 m / 87.58 मी', '(b) 88.15 m / 88.15 मी', '(c) 89.45 m / 89.45 मी', '(d) 90.12 m / 90.12 मी'],
    correctOptionIndex: 2,
    explanation: 'Neeraj Chopra won the Gold medal in the Paris Diamond League 2026 with a sensational throw of 89.45 meters.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-311',
    text: 'With which European country did India sign an agreement to export green hydrogen and ammonia starting 2028? / भारत ने 2028 से ग्रीन हाइड्रोजन और अमोनिया निर्यात करने के लिए किस यूरोपीय देश के साथ एक समझौते पर हस्ताक्षर किए हैं?',
    options: ['(a) France / फ्रांस', '(b) United Kingdom / यूनाइटेड किंगडम', '(c) Germany / जर्मनी', '(d) Italy / इटली'],
    correctOptionIndex: 2,
    explanation: 'India signed a major green energy export deal with Germany to supply over 200,000 metric tonnes of green hydrogen and ammonia annually.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-312',
    text: 'Who has been chosen as the recipient of the Fukuoka Prize 2026 in the Academic category? / शैक्षणिक श्रेणी में फुकुओका पुरस्कार 2026 के प्राप्तकर्ता के रूप में किसे चुना गया है?',
    options: ['(a) Amitav Ghosh / अमिताव घोष', '(b) Arundhati Roy / अरुंधति रॉय', '(c) Ramachandra Guha / रामचंद्र गुहा', '(d) Amartya Sen / अमर्त्य सेन'],
    correctOptionIndex: 2,
    explanation: 'Eminent Indian historian and writer Ramachandra Guha was announced as the recipient of the prestigious Fukuoka Prize 2026 in the Academic category.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-313',
    text: 'Which country hosted the G7 Summit in Rome in July 2026, finalizing the $150 Billion global infrastructure partnership fund? / जुलाई 2026 में रोम में जी7 शिखर सम्मेलन की मेजबानी किस देश ने की, जिसमें $150 बिलियन के वैश्विक बुनियादी ढांचा साझेदारी कोष को अंतिम रूप दिया गया?',
    options: ['(a) Italy / इटली', '(b) France / फ्रांस', '(c) Canada / कनाडा', '(d) Germany / जर्मनी'],
    correctOptionIndex: 0,
    explanation: 'Italy hosted the G7 Summit in Rome, during which member nations finalized the $150 billion global infrastructure partnership fund.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-314',
    text: 'The world\'s largest renewable energy park (Khavda Renewable Energy Park) is being constructed in which state? / दुनिया का सबसे बड़ा नवीकरणीय ऊर्जा पार्क (खावड़ा नवीकरणीय ऊर्जा पार्क) किस राज्य में बनाया जा रहा है?',
    options: ['(a) Rajasthan / राजस्थान', '(b) Gujarat / गुजरात', '(c) Tamil Nadu / तमिलनाडु', '(d) Andhra Pradesh / आंध्र प्रदेश'],
    correctOptionIndex: 1,
    explanation: 'The Khavda Renewable Energy Park in Gujarat is the world\'s largest green energy park, developed by Adani Green Energy.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-315',
    text: 'Which country won the ICC Men\'s T20 World Cup 2026 title under captain Rohit Sharma? / रोहित शर्मा की कप्तानी में किस देश ने आईसीसी पुरुष टी20 विश्व कप 2026 का खिताब जीता?',
    options: ['(a) India / भारत', '(b) South Africa / दक्षिण अफ्रीका', '(c) Australia / ऑस्ट्रेलिया', '(d) England / इंग्लैंड'],
    correctOptionIndex: 0,
    explanation: 'The Indian Men\'s Cricket team put up a historic performance to win the ICC Men\'s T20 World Cup 2026 title.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-316',
    text: 'Who was appointed as the Chief Justice of India (CJI) in 2026 succeeding Justice D.Y. Chandrachud? / जस्टिस डी.वाई. चंद्रचूड़ के उत्तराधिकारी के रूप में 2026 में भारत के मुख्य न्यायाधीश (CJI) के रूप में किसे नियुक्त किया गया था?',
    options: ['(a) Justice Sanjiv Khanna / जस्टिस संजीव खन्ना', '(b) Justice B.R. Gavai / जस्टिस बी.आर. गवई', '(c) Justice Surya Kant / जस्टिस सूर्यकांत', '(d) Justice Hrishikesh Roy / जस्टिस ऋषिकेश रॉय'],
    correctOptionIndex: 0,
    explanation: 'Justice Sanjiv Khanna was appointed as the Chief Justice of India following the retirement of Justice Chandrachud.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-317',
    text: 'Which Indian international airport has become the first to run entirely on hydro-solar (100% green) energy? / कौन सा भारतीय अंतरराष्ट्रीय हवाई अड्डा पूरी तरह से हाइड्रो-सोलर (100% हरित) ऊर्जा पर चलने वाला पहला हवाई अड्डा बन गया है?',
    options: ['(a) Indira Gandhi International Airport (Delhi) / इंदिरा गांधी अंतरराष्ट्रीय हवाई अड्डा (दिल्ली)', '(b) Chhatrapati Shivaji Maharaj International Airport (Mumbai) / छत्रपति शिवाजी महाराज अंतरराष्ट्रीय हवाई अड्डा (मुंबई)', '(c) Kempegowda International Airport (Bengaluru) / केम्पेगौड़ा अंतरराष्ट्रीय हवाई अड्डा (बेंगलुरु)', '(d) Cochin International Airport / कोचीन अंतरराष्ट्रीय हवाई अड्डा'],
    correctOptionIndex: 0,
    explanation: 'Indira Gandhi International Airport (IGIA) in Delhi transitioned successfully to operating completely on solar and hydro-power.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-318',
    text: 'What was the theme of the International Day of Yoga (IDY) celebrated on June 21, 2026? / 21 जून 2026 को मनाए गए अंतर्राष्ट्रीय योग दिवस (IDY) का मुख्य विषय क्या था?',
    options: ['(a) Yoga for Self and Society / स्वयं और समाज के लिए योग', '(b) Yoga for Humanity / मानवता के लिए योग', '(c) Yoga for Peace / शांति के लिए योग', '(d) Yoga for Health / स्वास्थ्य के लिए योग'],
    correctOptionIndex: 0,
    explanation: 'The 12th International Day of Yoga was celebrated on June 21, 2026, with the official theme "Yoga for Self and Society".',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-319',
    text: 'The joint military training exercise "Dharma Guardian 2026" is held between the armies of India and which other country? / संयुक्त सैन्य प्रशिक्षण अभ्यास "धर्म गार्जियन 2026" भारत और किस अन्य देश की सेनाओं के बीच आयोजित किया गया है?',
    options: ['(a) USA / अमेरिका', '(b) France / फ्रांस', '(c) Japan / जापान', '(d) Australia / ऑस्ट्रेलिया'],
    correctOptionIndex: 2,
    explanation: 'Dharma Guardian is an annual bilateral military exercise conducted to share tactical maneuvers between the Ground Self-Defense Force of Japan and the Indian Army.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-320',
    text: 'Which country launched the world\'s first wood-constructed satellite, "LignoSat", into orbit to study space sustainability? / अंतरिक्ष स्थिरता का अध्ययन करने के लिए किस देश ने दुनिया का पहला लकड़ी से निर्मित उपग्रह "लिग्नोसैट" (LignoSat) कक्षा में लॉन्च किया?',
    options: ['(a) Japan / जापान', '(b) USA / अमेरिका', '(c) China / चीन', '(d) Germany / जर्मनी'],
    correctOptionIndex: 0,
    explanation: 'Japan\'s Kyoto University researchers and Sumitomo Forestry developed and successfully launched LignoSat, a wooden-framed satellite.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-321',
    text: 'Which space agency\'s TESS mission discovered the nearby habitable super-Earth planet "TOI-715 b"? / किस अंतरिक्ष एजेंसी के TESS मिशन ने पास के रहने योग्य सुपर-अर्थ ग्रह "TOI-715 b" की खोज की है?',
    options: ['(a) NASA / नासा', '(b) ESA / ईएसए', '(c) ISRO / इसरो', '(d) JAXA / जाक्सा'],
    correctOptionIndex: 0,
    explanation: 'NASA\'s Transiting Exoplanet Survey Satellite (TESS) discovered the habitable-zone super-Earth planet TOI-715 b orbiting a red dwarf star.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-322',
    text: 'Which major public sector bank launched the advanced "YONO 2.0" digital banking application? / किस प्रमुख सार्वजनिक क्षेत्र के बैंक ने उन्नत "YONO 2.0" डिजिटल बैंकिंग एप्लिकेशन लॉन्च किया है?',
    options: ['(a) Punjab National Bank / पंजाब नेशनल बैंक', '(b) Bank of Baroda / बैंक ऑफ बड़ौदा', '(c) State Bank of India / भारतीय स्टेट बैंक (SBI)', '(d) Union Bank of India / यूनियन बैंक ऑफ इंडिया'],
    correctOptionIndex: 2,
    explanation: 'The State Bank of India (SBI) launched YONO 2.0, providing ultra-modern personal finance features and enhanced cybersecurity layers.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-323',
    text: 'What GDP growth rate has the RBI projected for India for the financial year 2026-27 (FY27) in its latest monetary policy? / अपनी नवीनतम मौद्रिक नीति में आरबीआई ने वित्तीय वर्ष 2026-27 (FY27) के लिए भारत की जीडीपी विकास दर का कितना प्रतिशत अनुमान लगाया है?',
    options: ['(a) 6.8% / 6.8%', '(b) 7.0% / 7.0%', '(c) 7.2% / 7.2%', '(d) 7.5% / 7.5%'],
    correctOptionIndex: 2,
    explanation: 'The Reserve Bank of India has maintained an optimistic growth outlook, projecting India\'s real GDP growth at 7.2% for FY27.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-324',
    text: 'Who was awarded the prestigious Abel Prize 2026 for outstanding contributions in Mathematics? / गणित में उत्कृष्ट योगदान के लिए प्रतिष्ठित एबेल पुरस्कार 2026 से किसे सम्मानित किया गया?',
    options: ['(a) Michel Talagrand / मिशेल तालाग्रैंड', '(b) Luis Caffarelli / लुइस कैफरेली', '(c) Dennis Sullivan / डेनिस सुलिवन', '(d) Avi Wigderson / एवी विगडरसन'],
    correctOptionIndex: 0,
    explanation: 'French mathematician Michel Talagrand won the Abel Prize for ground-breaking work in probability theory and stochastic processes.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-325',
    text: 'The famous "Sinthan Top" mountain pass, which remained open for tourists even during extreme peak winters, is located in which State/UT? / प्रसिद्ध "सिंथन टॉप" पर्वतीय दर्रा, जो अत्यधिक कड़ाके की सर्दियों में भी पर्यटकों के लिए खुला रहा, किस राज्य/केंद्र शासित प्रदेश में स्थित है?',
    options: ['(a) Himachal Pradesh / हिमाचल प्रदेश', '(b) Uttarakhand / उत्तराखंड', '(c) Jammu & Kashmir / जम्मू और कश्मीर', '(d) Ladakh / लद्दाख'],
    correctOptionIndex: 2,
    explanation: 'Sinthan Top is a high mountain pass in Jammu & Kashmir connecting the Kashmir Valley to the Kishtwar district.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-326',
    text: 'Which nation officially joined as the 32nd member of the North Atlantic Treaty Organisation (NATO)? / कौन सा देश उत्तर अटलांटिक संधि संगठन (NATO) के 32वें सदस्य के रूप में आधिकारिक तौर पर शामिल हुआ है?',
    options: ['(a) Finland / फिनलैंड', '(b) Sweden / स्वीडन', '(c) Switzerland / स्विट्जरलैंड', '(d) Ireland / आयरलैंड'],
    correctOptionIndex: 1,
    explanation: 'Sweden officially concluded its accession process to become the 32nd member of the NATO alliance.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-327',
    text: 'What was India\'s rank in the World Press Freedom Index 2026 published by Reporters Without Borders? / रिपोर्टर्स विदाउट बॉर्डर्स द्वारा प्रकाशित विश्व प्रेस स्वतंत्रता सूचकांक 2026 में भारत का कौन सा स्थान रहा?',
    options: ['(a) 140th / 140वां', '(b) 150th / 150वां', '(c) 159th / 159वां', '(d) 161st / 161वां'],
    correctOptionIndex: 2,
    explanation: 'In the World Press Freedom Index 2026, India placed 159th out of 180 countries evaluated by Reporters Without Borders.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-328',
    text: 'Which Tiger Reserve won the global "TX2 Award" in 2026 for successfully doubling its tiger population? / किस टाइगर रिजर्व ने बाघों की आबादी को सफलतापूर्वक दोगुना करने के लिए 2026 में वैश्विक "TX2 पुरस्कार" जीता है?',
    options: ['(a) Pilibhit Tiger Reserve / पीलीभीत टाइगर रिजर्व', '(b) Pench Tiger Reserve / पेंच टाइगर रिजर्व', '(c) Jim Corbett Tiger Reserve / जिम कॉर्बेट टाइगर रिजर्व', '(d) Kaziranga Tiger Reserve / काजीरंगा टाइगर रिजर्व'],
    correctOptionIndex: 0,
    explanation: 'Pilibhit Tiger Reserve in Uttar Pradesh won the prestigious TX2 conservation award for doubling its tiger population in a short frame.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-329',
    text: 'The Government of India launched "Mission Mausam" primarily under which Union Ministry? / भारत सरकार ने मुख्य रूप से किस केंद्रीय मंत्रालय के तहत "मिशन मौसम" (Mission Mausam) शुरू किया है?',
    options: ['(a) Ministry of Earth Sciences / पृथ्वी विज्ञान मंत्रालय', '(b) Ministry of Environment, Forest and Climate Change / पर्यावरण, वन और जलवायु परिवर्तन मंत्रालय', '(c) Ministry of Agriculture and Farmers Welfare / कृषि और किसान कल्याण मंत्रालय', '(d) Ministry of Science and Technology / विज्ञान और प्रौद्योगिकी मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'Mission Mausam is a flagship initiative managed by the Ministry of Earth Sciences (MoES) to dramatically enhance weather prediction accuracy.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-330',
    text: 'Who is the current Chief Executive Officer (CEO) of the NITI Aayog of India? / भारत के नीति आयोग (NITI Aayog) के वर्तमान मुख्य कार्यकारी अधिकारी (CEO) कौन हैं?',
    options: ['(a) B.V.R. Subrahmanyam / बी.वी.आर. सुब्रह्मण्यम', '(b) Parameswaran Iyer / परमेश्वरन अय्यर', '(c) Suman Bery / सुमन बेरी', '(d) Amitabh Kant / अमिताभ कांत'],
    correctOptionIndex: 0,
    explanation: 'B.V.R. Subrahmanyam is currently serving as the CEO of NITI Aayog, driving national policy guidelines.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-331',
    text: 'Which Indian state is the first to officially pass and implement the Uniform Civil Code (UCC) Bill? / समान नागरिक संहिता (UCC) विधेयक को आधिकारिक तौर पर पारित और लागू करने वाला पहला भारतीय राज्य कौन सा है?',
    options: ['(a) Goa / गोवा', '(b) Uttarakhand / उत्तराखंड', '(c) Gujarat / गुजरात', '(d) Assam / असम'],
    correctOptionIndex: 1,
    explanation: 'Uttarakhand became the first state in independent India to officially pass and implement the Uniform Civil Code legislation.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-332',
    text: 'What is the name of the premier joint military exercise conducted bilaterally between India and the USA? / भारत और अमेरिका के बीच द्विपक्षीय रूप से आयोजित प्रमुख संयुक्त सैन्य अभ्यास का क्या नाम है?',
    options: ['(a) Yudh Abhyas / युद्ध अभ्यास', '(b) Mitra Shakti / मित्र शक्ति', '(c) Samudra Shakti / समुद्र शक्ति', '(d) Nomadic Elephant / नोमैडिक एलीफेंट'],
    correctOptionIndex: 0,
    explanation: 'Exercise Yudh Abhyas is the largest running joint military training and defense cooperation endeavor between India and the United States.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-333',
    text: 'Which distinguished Indian medical scientist was elected to the US National Academy of Sciences (NAS) in 2026? / किस प्रतिष्ठित भारतीय चिकित्सा वैज्ञानिक को 2026 में अमेरिकी नेशनल एकेडमी ऑफ साइंसेज (NAS) के लिए चुना गया था?',
    options: ['(a) Dr. Gagandeep Kang / डॉ. गगनदीप कांग', '(b) Dr. Soumya Swaminathan / डॉ. सौम्या स्वामीनाथन', '(c) Dr. Randeep Guleria / डॉ. रणदीप गुलेरिया', '(d) Dr. Balram Bhargava / डॉ. बलराम भार्गव'],
    correctOptionIndex: 0,
    explanation: 'Eminent virologist Dr. Gagandeep Kang was elected as a member of the NAS in recognition of her outstanding achievements in public health.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-334',
    text: 'The central government\'s "Lakhpati Didi" scheme has been scaled up to target how many self-help group (SHG) women? / केंद्र सरकार की "लखपति दीदी" योजना को कितने स्वयं सहायता समूह (SHG) की महिलाओं को लक्षित करने के लिए विस्तारित किया गया है?',
    options: ['(a) 1 Crore / 1 करोड़', '(b) 2 Crore / 2 करोड़', '(c) 3 Crore / 3 करोड़', '(d) 5 Crore / 5 करोड़'],
    correctOptionIndex: 2,
    explanation: 'The government increased the target of Lakhpati Didi scheme to 3 Crore women to encourage rural micro-entrepreneurship.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-335',
    text: 'Which country secured the maximum number of gold medals at the 2024 Paris Olympics? / 2024 पेरिस ओलंपिक में किस देश ने सर्वाधिक स्वर्ण पदक प्राप्त किए?',
    options: ['(a) USA / अमेरिका', '(b) China / चीन', '(c) France / फ्रांस', '(d) Japan / जापान'],
    correctOptionIndex: 0,
    explanation: 'The United States of America topped the gold medal tally at the Paris 2024 Olympics with 40 Gold medals, winning by tie-break of overall medal count over China.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-336',
    text: 'The Ministry of Women and Child Development re-launched the single window portal "SHe-Box" for which objective? / महिला एवं बाल विकास मंत्रालय ने किस उद्देश्य के लिए सिंगल विंडो पोर्टल "शी-बॉक्स" (SHe-Box) को फिर से लॉन्च किया है?',
    options: ['(a) Handloom marketing support / हथकरघा विपणन सहायता', '(b) Redressal of sexual harassment complaints at workplaces / कार्यस्थलों पर यौन उत्पीड़न की शिकायतों का निवारण', '(c) Free healthcare benefits tracking / मुफ्त स्वास्थ्य लाभ ट्रैकिंग', '(d) Self-help group financial subsidy / स्वयं सहायता समूह वित्तीय सब्सिडी'],
    correctOptionIndex: 1,
    explanation: 'SHe-Box (Sexual Harassment e-Box) is a consolidated IT portal to register and track complaints related to sexual harassment in workplaces.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-337',
    text: 'Who clinched the Women\'s Singles championship title at the French Open 2026 at Roland Garros? / रोलैंड गैरोस में फ्रेंच ओपन 2026 में महिला एकल चैंपियनशिप का खिताब किसने जीता?',
    options: ['(a) Iga Swiatek / इगा श्वियाटेक', '(b) Aryna Sabalenka / आर्यना सबालेंका', '(c) Coco Gauff / कोको गॉफ', '(d) Mirra Andreeva / मिरा एंड्रीवा'],
    correctOptionIndex: 0,
    explanation: 'Polish tennis superstar Iga Swiatek retained her dominant streak to win the French Open Women\'s Singles title in Paris.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-338',
    text: 'Regular train services commenced over the Chenab Bridge, known as the world\'s highest railway bridge, located in which state/UT? / दुनिया के सबसे ऊंचे रेलवे पुल के रूप में जाने जाने वाले चिनाब पुल पर नियमित ट्रेन सेवाएं शुरू हुईं, यह किस राज्य/केंद्र शासित प्रदेश में स्थित है?',
    options: ['(a) Jammu & Kashmir / जम्मू और कश्मीर', '(b) Himachal Pradesh / हिमाचल प्रदेश', '(c) Uttarakhand / उत्तराखंड', '(d) Ladakh / लद्दाख'],
    correctOptionIndex: 0,
    explanation: 'The Chenab Bridge, towering 359 meters above the riverbed, successfully started train operations connecting Kashmir valley under USBRL project.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-339',
    text: 'What was the name of India\'s first permanent scientific research station established in Antarctica? / अंटार्कटिका में स्थापित भारत के पहले स्थायी वैज्ञानिक अनुसंधान केंद्र का क्या नाम था?',
    options: ['(a) Dakshin Gangotri / दक्षिण गंगोत्री', '(b) Maitri / मैत्री', '(c) Bharati / भारती', '(d) Himadri / हिमाद्री'],
    correctOptionIndex: 0,
    explanation: 'Dakshin Gangotri was established in 1983 as India\'s first permanent research base station in Antarctica, which was later succeeded by Maitri and Bharati.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-340',
    text: 'Which state government runs the "Kalaignar Magalir Urimai Thogai" scheme providing monthly cash support to women heads of families? / कौन सी राज्य सरकार परिवार की महिला मुखियाओं को मासिक नकद सहायता प्रदान करने वाली "कलाईनार मगलिर उरीमई थोगई" योजना चलाती है?',
    options: ['(a) Tamil Nadu / तमिलनाडु', '(b) Kerala / केरल', '(c) Andhra Pradesh / आंध्र प्रदेश', '(d) Telangana / तेलंगाना'],
    correctOptionIndex: 0,
    explanation: 'Tamil Nadu government provides ₹1,000 monthly cash assistance to women heads of households through this welfare scheme.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-341',
    text: 'What was the theme of the World Environment Day celebrated on June 5, 2026? / 5 जून 2026 को मनाए गए विश्व पर्यावरण दिवस का मुख्य विषय क्या था?',
    options: ['(a) Land Restoration, Desertification and Drought Resilience / भूमि बहाली, मरुस्थलीकरण और सूखा लचीलापन', '(b) Beat Plastic Pollution / प्लास्टिक प्रदूषण को समाप्त करें', '(c) Ecosystem Restoration / पारिस्थितिकी तंत्र की बहाली', '(d) Only One Earth / केवल एक पृथ्वी'],
    correctOptionIndex: 0,
    explanation: 'World Environment Day 2026 was celebrated globally centering the theme "Land Restoration, Desertification and Drought Resilience".',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-342',
    text: 'Which country launched the "Shenzhou-18" manned spaceflight mission to dock with its Tiangong Space Station in 2026? / किस देश ने 2026 में अपने तियांगोंग अंतरिक्ष स्टेशन के साथ डॉक करने के लिए "शेनझोउ-18" मानवयुक्त अंतरिक्ष उड़ान मिशन लॉन्च किया?',
    options: ['(a) Japan / जापान', '(b) South Korea / दक्षिण कोरिया', '(c) China / चीन', '(d) Russia / रूस'],
    correctOptionIndex: 2,
    explanation: 'China successfully launched the Shenzhou-18 spacecraft carrying three astronauts to its permanent Tiangong Space Station.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-343',
    text: 'Which movie won the "Best Picture" award at the 98th Academy Awards (Oscars) held in Los Angeles? / लॉस एंजिल्स में आयोजित 98वें अकादमी पुरस्कार (ऑस्कर) में किस फिल्म ने "सर्वश्रेष्ठ फिल्म" का पुरस्कार जीता?',
    options: ['(a) Dune: Part Two / ड्यून: पार्ट टू', '(b) Oppenheimer / ओपेनहाइमर', '(c) Poor Things / पूअर थिंग्स', '(d) Anatomy of a Fall / एनाटॉमी ऑफ ए फॉल'],
    correctOptionIndex: 0,
    explanation: 'Denis Villeneuve\'s Dune: Part Two captured major awards including Best Picture at the 98th Academy Awards in 2026.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-344',
    text: 'The "New Pamban Bridge", which is India\'s first vertical lift sea railway bridge, is constructed in which state? / "न्यू पंबन ब्रिज", जो भारत का पहला वर्टिकल लिफ्ट सी रेलवे ब्रिज है, किस राज्य में बनाया गया है?',
    options: ['(a) Kerala / केरल', '(b) Tamil Nadu / तमिलनाडु', '(c) Maharashtra / महाराष्ट्र', '(d) Odisha / ओडिशा'],
    correctOptionIndex: 1,
    explanation: 'The New Pamban Bridge connects Rameswaram island to mainland Tamil Nadu with a unique automated vertical-lift span to allow ships to pass.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-345',
    text: 'What is the primary purpose of the Government of India\'s "Bhashini" AI program? / भारत सरकार के "भाषिनी" (Bhashini) एआई कार्यक्रम का मुख्य उद्देश्य क्या है?',
    options: ['(a) Real-time multilingual voice translation and speech-to-text / रीयल-टाइम बहुभाषी आवाज अनुवाद और स्पीच-टू-टेक्स्ट', '(b) High-speed cyber threat detection / हाई-स्पीड साइबर थ्रेट डिटेक्शन', '(c) Crop health assessment via satellite / उपग्रह के माध्यम से फसल स्वास्थ्य मूल्यांकन', '(d) Automatic income tax audit / स्वचालित आयकर ऑडिट'],
    correctOptionIndex: 0,
    explanation: 'Bhashini is India\'s AI-led language translation platform aimed at breaking language barriers among Indian citizens across 22 Scheduled languages.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-346',
    text: 'Which Central Public Sector Enterprise (CPSE) was granted the prestigious "Maharatna" status by the Government of India in 2026? / किस केंद्रीय सार्वजनिक क्षेत्र के उद्यम (CPSE) को 2026 में भारत सरकार द्वारा प्रतिष्ठित "महारत्न" का दर्जा दिया गया था?',
    options: ['(a) Hindustan Aeronautics Limited (HAL) / हिंदुस्तान एयरोनॉटिक्स लिमिटेड', '(b) Bharat Electronics Limited (BEL) / भारत इलेक्ट्रॉनिक्स लिमिटेड', '(c) Oil India Limited (OIL) / ऑयल इंडिया लिमिटेड', '(d) Mazagon Dock Shipbuilders / मझगांव डॉक शिपबिल्डर्स'],
    correctOptionIndex: 0,
    explanation: 'The Government of India upgraded HAL to the status of a Maharatna company, allowing greater financial autonomy and investment powers.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-347',
    text: 'During which high-level multilateral meet did India lead the launch of the "Global Biofuels Alliance"? / किस उच्च स्तरीय बहुपक्षीय बैठक के दौरान भारत ने "वैश्विक जैव ईंधन गठबंधन" (Global Biofuels Alliance) की शुरुआत का नेतृत्व किया?',
    options: ['(a) G20 New Delhi Summit / जी-20 नई दिल्ली शिखर सम्मेलन', '(b) Voice of Global South Summit / वॉयस ऑफ ग्लोबल साउथ शिखर सम्मेलन', '(c) COP28 Dubai / कॉप28 दुबई', '(d) SCO Summit 2024 / एससीओ शिखर सम्मेलन 2024'],
    correctOptionIndex: 0,
    explanation: 'The Global Biofuels Alliance (GBA) was launched on the sidelines of the G20 Summit in New Delhi to boost clean fuel consumption.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-348',
    text: 'Who has been selected for the prestigious "Saraswati Samman 2025/2026" for the poetic work "Raudra Sathwikam"? / काव्य कृति "रौद्र सात्विकम" के लिए प्रतिष्ठित "सरस्वती सम्मान 2025/2026" के लिए किसे चुना गया है?',
    options: ['(a) Prabha Varma / प्रभा वर्मा', '(b) Sivasankari / शिवशंकरी', '(c) Sharan Kumar Limbale / शरण कुमार लिम्बाले', '(d) Ramdarash Mishra / रामदरश मिश्र'],
    correctOptionIndex: 0,
    explanation: 'Eminent Malayalam poet Prabha Varma was awarded the Saraswati Samman for his outstanding verse novel "Raudra Sathwikam".',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-349',
    text: 'Which state government launched the "Hamar Beti Hamar Maan" campaign to prioritize women\'s safety in schools and colleges? / किस राज्य सरकार ने स्कूलों और कॉलेजों में महिला सुरक्षा को प्राथमिकता देने के लिए "हमार बेटी हमार मान" अभियान शुरू किया है?',
    options: ['(a) Chhattisgarh / छत्तीसगढ़', '(b) Madhya Pradesh / मध्य प्रदेश', '(c) Uttar Pradesh / उत्तर प्रदेश', '(d) Rajasthan / राजस्थान'],
    correctOptionIndex: 0,
    explanation: 'Chhattisgarh state government launched "Hamar Beti Hamar Maan" (Our Daughters, Our Honour) to provide safety training and grievance channels.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-350',
    text: 'Who is the current Chairman of the Indian Space Research Organisation (ISRO) leading its futuristic Gaganyaan and Chandrayaan missions? / अपने भविष्य के गगनयान और चंद्रयान मिशनों का नेतृत्व करने वाले भारतीय अंतरिक्ष अनुसंधान संगठन (ISRO) के वर्तमान अध्यक्ष कौन हैं?',
    options: ['(a) Dr. S. Somanath / डॉ. एस. सोमनाथ', '(b) Dr. Samir V. Kamat / डॉ. समीर वी. कामत', '(c) Dr. G. Satheesh Reddy / डॉ. जी. सतीश रेड्डी', '(d) Dr. K. Sivan / डॉ. के. सिवन'],
    correctOptionIndex: 0,
    explanation: 'Dr. S. Somanath is the current Secretary of Department of Space and Chairman of ISRO, coordinating national space endeavors.',
    date: '2026-07-07'
  },
  {
    id: 'ca-q-today-351',
    text: 'How much green hydrogen and ammonia does India plan to export to Germany annually starting 2028 under the landmark bilateral deal? / ऐतिहासिक द्विपक्षीय समझौते के तहत भारत 2028 से सालाना जर्मनी को कितना ग्रीन हाइड्रोजन और अमोनिया निर्यात करने की योजना बना रहा है?',
    options: ['(a) 100,000 Metric Tonnes / 100,000 मीट्रिक टन', '(b) 150,000 Metric Tonnes / 150,000 मीट्रिक टन', '(c) 200,000 Metric Tonnes / 200,000 मीट्रिक टन', '(d) 300,000 Metric Tonnes / 300,000 मीट्रिक टन'],
    correctOptionIndex: 2,
    explanation: 'India signed a bilateral partnership deal with Germany to export over 200,000 metric tonnes of green hydrogen and ammonia annually starting 2028.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-352',
    text: "What is the speed limit of the 'Namo Bharat' trains operating on the full Delhi-Meerut corridor? / दिल्ली-मेरठ पूर्ण कॉरिडोर पर संचालित होने वाली 'नमो भारत' ट्रेनों की गति सीमा क्या है?",
    options: ['(a) 120 km/h / 120 किमी/घंटा', '(b) 140 km/h / 140 किमी/घंटा', '(c) 160 km/h / 160 किमी/घंटा', '(d) 180 km/h / 180 किमी/घंटा'],
    correctOptionIndex: 2,
    explanation: "The 'Namo Bharat' regional trains on the Delhi-Ghaziabad-Meerut RRTS corridor run at speed limits up to 160 km/h.",
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-353',
    text: 'Which technology does RBI use for offline Digital Rupee (e₹) transactions in rural areas with poor connectivity? / खराब कनेक्टिविटी वाले ग्रामीण क्षेत्रों में ऑफलाइन डिजिटल रुपया (e₹) लेनदेन के लिए आरबीआई किस तकनीक का उपयोग करता है?',
    options: ['(a) Bluetooth and sound-wave / ब्लूटूथ और साउंड-वेव', '(b) Satellite link / सैटेलाइट लिंक', '(c) Infrared sensors / इन्फ्रारेड सेंसर', '(d) Radio Waves / रेडियो तरंगें'],
    correctOptionIndex: 0,
    explanation: 'RBI introduced offline features using Bluetooth and sound-wave technologies, enabling CBDC transactions without internet.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-354',
    text: 'Assam\'s Charaideo Moidams, recently inscribed as India\'s 43rd World Heritage Site, belongs to which historical dynasty? / हाल ही में भारत के 43वें विश्व धरोहर स्थल के रूप में अंकित असम के चराइदेव मोइदम किस ऐतिहासिक राजवंश से संबंधित हैं?',
    options: ['(a) Maurya Dynasty / मौर्य राजवंश', '(b) Gupta Dynasty / गुप्त राजवंश', '(c) Ahom Dynasty / अहोम राजवंश', '(d) Chola Dynasty / चोल राजवंश'],
    correctOptionIndex: 2,
    explanation: 'The Charaideo Moidams represent the mound-burial system of the historical Ahom dynasty in Assam.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-355',
    text: 'What is the primary objective of the newly approved central sector scheme "PM-Vidyalaxmi"? / नवनिर्मित केंद्रीय क्षेत्र योजना "पीएम-विद्यालक्ष्मी" (PM-Vidyalaxmi) का मुख्य उद्देश्य क्या है?',
    options: ['(a) Higher education financial support / उच्च शिक्षा वित्तीय सहायता', '(b) Free uniform distribution / मुफ्त स्कूल पोशाक वितरण', '(c) Digital literacy in schools / स्कूलों में डिजिटल साक्षरता', '(d) Mid-day meal monitoring / मध्याह्न भोजन की निगरानी'],
    correctOptionIndex: 0,
    explanation: 'PM-Vidyalaxmi scheme provides collateral-free, interest-subsidized education loans to meritorious students for higher studies.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-356',
    text: "The Indian Army deployed its first batch of 'Zorawar' Light Tanks in which strategic high-altitude desert sector? / भारतीय सेना ने 'जोरावर' हल्के टैंकों का अपना पहला बैच किस रणनीतिक ऊंचाई वाले रेगिस्तानी क्षेत्र में तैनात किया?",
    options: ['(a) Sikkim sector / सिक्किम क्षेत्र', '(b) Eastern Ladakh sector / पूर्वी लद्दाख क्षेत्र', '(c) Tawang sector / तवांग क्षेत्र', '(d) Kargil sector / कारगिल क्षेत्र'],
    correctOptionIndex: 1,
    explanation: "The Indian Army officially deployed its first batch of the indigenous 'Zorawar' Light Tanks in high-altitude Eastern Ladakh.",
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-357',
    text: 'Which country ranked first in the Global AI Adoption Index 2026 published by TechAnalytica? / टेकएनालिटिका द्वारा प्रकाशित ग्लोबल एआई एडॉप्शन इंडेक्स 2026 में किस देश को पहला स्थान मिला है?',
    options: ['(a) USA / अमेरिका', '(b) China / चीन', '(c) India / भारत', '(d) UK / ब्रिटेन'],
    correctOptionIndex: 2,
    explanation: "India ranked 1st in TechAnalytica's Global AI Adoption Index 2026, showcasing high integration of AI in public infrastructure.",
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-358',
    text: 'Who won the Women\'s Singles title at the Canada Open Badminton Championship 2026? / कनाडा ओपन बैडमिंटन चैंपियनशिप 2026 में महिला एकल का खिताब किसने जीता?',
    options: ['(a) PV Sindhu / पीवी सिंधु', '(b) Saina Nehwal / साइना नेहवाल', '(c) An Se-young / एन से-यंग', '(d) Akane Yamaguchi / अकाने यामागुची'],
    correctOptionIndex: 0,
    explanation: "Double Olympic medalist PV Sindhu secured the Women's Singles title at the Canada Open Super 500 tournament.",
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-359',
    text: 'What was Neeraj Chopra\'s best throw distance to secure Gold at the Paris Diamond League 2026? / पेरिस डायमंड लीग 2026 में स्वर्ण पदक जीतने के लिए नीरज चोपड़ा का सर्वश्रेष्ठ थ्रो कितनी दूरी का था?',
    options: ['(a) 87.58 meters / 87.58 मीटर', '(b) 88.88 meters / 88.88 मीटर', '(c) 89.45 meters / 89.45 मीटर', '(d) 90.12 meters / 90.12 मीटर'],
    correctOptionIndex: 2,
    explanation: 'Star Indian athlete Neeraj Chopra won the Paris Diamond League 2026 with a phenomenal throw of 89.45 meters.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-360',
    text: 'Which defense research body conducted the flight test of Phase-II Ballistic Missile Defence Interceptor AD-1 missile? / किस रक्षा अनुसंधान संस्था ने द्वितीय चरण की बैलिस्टिक मिसाइल रक्षा इंटरसेप्टर एडी-1 (AD-1) मिसाइल का सफल उड़ान परीक्षण किया?',
    options: ['(a) ISRO / इसरो', '(b) DRDO / डीआरडीओ', '(c) HAL / एचएएल', '(d) BARC / भाभा परमाणु अनुसंधान केंद्र'],
    correctOptionIndex: 1,
    explanation: 'The Defence Research and Development Organisation (DRDO) successfully carried out the intercept flight test of the AD-1 missile.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-361',
    text: 'Where was the Global Biofuels Alliance (GBA) officially launched during the G20 Summit? / जी20 शिखर सम्मेलन के दौरान वैश्विक जैव ईंधन गठबंधन (GBA) आधिकारिक तौर पर कहाँ लॉन्च किया गया था?',
    options: ['(a) Rome / रोम', '(b) New Delhi / नई दिल्ली', '(c) Paris / पेरिस', '(d) Washington / वाशिंगटन'],
    correctOptionIndex: 1,
    explanation: 'The Global Biofuels Alliance was launched during the G20 Summit hosted in New Delhi, India.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-362',
    text: 'Which category of readiness did India achieve in the ITU Global Cybersecurity Index 2026? / आईटीयू (ITU) ग्लोबल साइबर सिक्योरिटी इंडेक्स 2026 में भारत ने तैयारी की किस श्रेणी को प्राप्त किया?',
    options: ['(a) Tier-1 (Role Model) / टियर-1 (रोल मॉडल)', '(b) Tier-2 / टियर-2', '(c) Tier-3 / टियर-3', '(d) Tier-4 / टियर-4'],
    correctOptionIndex: 0,
    explanation: 'India secured Tier-1 classification, the highest bracket representing cybersecurity role-modeling nations.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-363',
    text: 'What is the primary focus of the PM GatiShakti National Master Plan launched by the government? / सरकार द्वारा शुरू किए गए पीएम गतिशक्ति राष्ट्रीय मास्टर प्लान का मुख्य केंद्र बिंदु क्या है?',
    options: ['(a) Integrated multi-modal logistics & infrastructure / एकीकृत मल्टी-मॉडल रसद और बुनियादी ढांचा', '(b) Agriculture modernization / कृषि आधुनिकीकरण', '(c) Digital bank licensing / डिजिटल बैंक लाइसेंसिंग', '(d) School sports development / स्कूल खेल विकास'],
    correctOptionIndex: 0,
    explanation: 'PM GatiShakti is a digital platform designed for integrated planning and coordinated implementation of multi-modal infrastructure projects.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-364',
    text: 'Which acclaimed Indian author has been honored with the prestigious Pen Pinter Prize 2026? / किस प्रसिद्ध भारतीय लेखक को प्रतिष्ठित पेन पिंटर पुरस्कार 2026 से सम्मानित किया गया है?',
    options: ['(a) Arundhati Roy / अरुंधति रॉय', '(b) Salman Rushdie / सलमान रुश्दी', '(c) Vikram Seth / विक्रम सेठ', '(d) Kiran Desai / किरण देसाई'],
    correctOptionIndex: 0,
    explanation: 'Eminent novelist and activist Arundhati Roy was awarded the Pen Pinter Prize 2026 for her courageous literary contributions.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-365',
    text: 'What historic milestone did India\'s foreign exchange (Forex) reserves reach in mid-2026? / मध्य-2026 में भारत का विदेशी मुद्रा (Forex) भंडार किस ऐतिहासिक मील के पत्थर पर पहुंच गया?',
    options: ['(a) $600 Billion / $600 बिलियन', '(b) $625 Billion / $625 बिलियन', '(c) $655 Billion / $655 बिलियन', '(d) $700 Billion / $700 बिलियन'],
    correctOptionIndex: 2,
    explanation: 'RBI reported that solid trade balance and portfolio inflows pushed India\'s Forex reserves to a historic high of $655 Billion.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-366',
    text: 'The UN Environment Programme welcomed India\'s mega tree plantation campaign named ________. / संयुक्त राष्ट्र पर्यावरण कार्यक्रम ने भारत के किस विशाल वृक्षारोपण अभियान का स्वागत किया है?',
    options: ['(a) Ek Ped Maa Ke Naam / एक पेड़ माँ के नाम', '(b) Green India Mission / ग्रीन इंडिया मिशन', '(c) Harit Bharat / हरित भारत', '(d) Vriksha Abhiyan / वृक्ष अभियान'],
    correctOptionIndex: 0,
    explanation: 'UNEP praised India\'s "Ek Ped Maa Ke Naam" tree plantation campaign which promotes community-led forestation.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-367',
    text: 'What blistering record time did Hima Das clock in the 200m event at the National Inter-State Athletics Meet? / राष्ट्रीय अंतर-राज्यीय एथलेटिक्स मीट में हिमा दास ने 200 मीटर दौड़ में कौन सा शानदार रिकॉर्ड समय दर्ज किया?',
    options: ['(a) 22.85 seconds / 22.85 सेकंड', '(b) 23.12 seconds / 23.12 सेकंड', '(c) 23.50 seconds / 23.50 सेकंड', '(d) 24.10 seconds / 24.10 सेकंड'],
    correctOptionIndex: 1,
    explanation: 'Assam sprinter Hima Das won the gold medal with a blistering time of 23.12 seconds in the 200m sprint.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-368',
    text: 'What is the name of the joint naval exercise held between India and France in the Mediterranean Sea? / भूमध्य सागर में भारत और फ्रांस के बीच आयोजित संयुक्त नौसैनिक अभ्यास का नाम क्या है?',
    options: ['(a) Varuna / वरुण', '(b) Garuda / गरुड़', '(c) Shakti / शक्ति', '(d) Desert Knight / डेजर्ट नाइट'],
    correctOptionIndex: 0,
    explanation: 'The bilateral naval exercise between the Indian Navy and the French Navy is known as "Varuna".',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-369',
    text: 'What was the central theme for the celebration of National Statistics Day 2026? / राष्ट्रीय सांख्यिकी दिवस 2026 के उत्सव का मुख्य विषय क्या था?',
    options: ['(a) Leveraging real-time data metrics for SDGs / सतत विकास लक्ष्यों (SDGs) के लिए वास्तविक समय डेटा मेट्रिक्स का लाभ उठाना', '(b) Women empowerment through literacy / साक्षरता के माध्यम से महिला सशक्तिकरण', '(c) Digitization of agricultural output / कृषि उपज का डिजिटलीकरण', '(d) Database security in public sector / सार्वजनिक क्षेत्र में डेटाबेस सुरक्षा'],
    correctOptionIndex: 0,
    explanation: 'National Statistics Day 2026 focused on leveraging real-time data metrics for measuring Sustainable Development Goals (SDGs).',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-370',
    text: 'Which opponent did the Indian Junior Hockey Team defeat to secure the Men\'s Junior Asia Cup 2026 in Muscat? / मस्कट में पुरुष जूनियर एशिया कप 2026 सुरक्षित करने के लिए भारतीय जूनियर हॉकी टीम ने किस प्रतिद्वंद्वी को हराया?',
    options: ['(a) Pakistan / पाकिस्तान', '(b) South Korea / दक्षिण कोरिया', '(c) Malaysia / मलेशिया', '(d) Japan / जापान'],
    correctOptionIndex: 0,
    explanation: 'The Indian Junior Hockey Team won the Junior Asia Cup by defeating rivals Pakistan in a penalty shootout in Muscat, Oman.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-371',
    text: 'Who is the Chairman of the 16th Finance Commission of India? / भारत के 16वें वित्त आयोग के अध्यक्ष कौन हैं?',
    options: ['(a) Dr. Arvind Panagariya / डॉ. अरविंद पनगढ़िया', '(b) N.K. Singh / एन.के. सिंह', '(c) Dr. Y.V. Reddy / डॉ. वाई.वी. रेड्डी', '(d) Vijay Kelkar / विजय केलकर'],
    correctOptionIndex: 0,
    explanation: 'Eminent economist Dr. Arvind Panagariya serves as the Chairman of the 16th Finance Commission.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-372',
    text: 'The Ministry of Mines initiated the auction rounds of critical minerals like Lithium and Titanium across which states/UTs? / खान मंत्रालय ने किन राज्यों/केंद्र शासित प्रदेशों में लिथियम और टाइटेनियम जैसे महत्वपूर्ण खनिजों के लिए नीलामी शुरू की है?',
    options: ['(a) J&K, Chhattisgarh and Rajasthan / जम्मू-कश्मीर, छत्तीसगढ़ और राजस्थान', '(b) Kerala, Karnataka and Goa / केरल, कर्नाटक और गोवा', '(c) Punjab, Haryana and Bihar / पंजाब, हरियाणा और बिहार', '(d) Gujarat and Maharashtra / गुजरात और महाराष्ट्र'],
    correctOptionIndex: 0,
    explanation: 'Critical mineral block auctions were held in Jammu & Kashmir, Chhattisgarh, and Rajasthan to secure the clean tech battery chain.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-373',
    text: 'Which scientific institution developed the low-cost eco-friendly solar water purification kit using UV-C disinfection? / यूवी-सी (UV-C) कीटाणुशोधन का उपयोग करके कम लागत वाली पर्यावरण-अनुकूल सौर जल शोधन किट किस वैज्ञानिक संस्थान ने विकसित की है?',
    options: ['(a) CSIR / सीएसआईआर', '(b) ISRO / इसरो', '(c) IIT Bombay / आईआईटी बॉम्बे', '(d) BARC / भाभा परमाणु अनुसंधान केंद्र'],
    correctOptionIndex: 0,
    explanation: 'The Council of Scientific and Industrial Research (CSIR) developed a highly portable solar water purification kit with UV-C technology.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-374',
    text: 'The Pradhan Mantri Awas Yojana (PMAY) achieved which monumental milestone of completed and verified smart houses in 2026? / प्रधानमंत्री आवास योजना (PMAY) ने 2026 में पूर्ण और सत्यापित स्मार्ट घरों का कौन सा बड़ा मील का पत्थर हासिल किया है?',
    options: ['(a) 8 million / 8 मिलियन', '(b) 10 million / 10 मिलियन', '(c) 12 million / 12 मिलियन', '(d) 15 million / 15 मिलियन'],
    correctOptionIndex: 2,
    explanation: 'Ministry of Housing announced that the target milestone of 1.2 crore (12 million) completed houses was successfully reached.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-375',
    text: 'What was the Year-on-Year (YoY) growth of RBI\'s Digital Payment Index recorded in mid-2026? / मध्य-2026 में दर्ज आरबीआई के डिजिटल भुगतान सूचकांक की वार्षिक (YoY) वृद्धि दर क्या थी?',
    options: ['(a) 10%', '(b) 12%', '(c) 15%', '(d) 18%'],
    correctOptionIndex: 2,
    explanation: 'RBI reported a robust YoY growth rate of 15% in its Digital Payment Index, showing heavy transaction adoption in tier cities.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-376',
    text: "Which Union Ministry launched the upgraded professional education portal 'SWAYAM Plus'? / किस केंद्रीय मंत्रालय ने उन्नत पेशेवर शिक्षा पोर्टल 'स्वयं प्लस' (SWAYAM Plus) लॉन्च किया?",
    options: ['(a) Ministry of Education / शिक्षा मंत्रालय', '(b) Ministry of Skill Development / कौशल विकास मंत्रालय', '(c) Ministry of Commerce / वाणिज्य मंत्रालय', '(d) Ministry of Electronics & IT / इलेक्ट्रॉनिक्स और आईटी मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'The Ministry of Education launched SWAYAM Plus to offer employment-focused professional courses with industry partners.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-377',
    text: 'Deepika Kumari won a historic gold in Stage-III of the Archery World Cup 2026 in Antalya alongside which partner? / अंताल्या में तीरंदाजी विश्व कप 2026 के स्टेज-III में दीपिका कुमारी ने किस साथी के साथ ऐतिहासिक स्वर्ण पदक जीता?',
    options: ['(a) Dhiraj Bommadevara / धीरज बोम्मादेवर', '(b) Atanu Das / अतनु दास', '(c) Tarundeep Rai / तरुणदीप राय', '(d) Pravin Jadhav / प्रवीण जाधव'],
    correctOptionIndex: 0,
    explanation: 'Deepika Kumari paired with Dhiraj Bommadevara to clinch the recurve mixed gold by defeating South Korea in Antalya, Turkey.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-378',
    text: 'What was the record gross GST collection recorded by the government in June 2026? / जून 2026 में सरकार द्वारा दर्ज किया गया रिकॉर्ड सकल जीएसटी (GST) संग्रह कितना था?',
    options: ['(a) ₹1.95 Lakh Crore / ₹1.95 लाख करोड़', '(b) ₹2.05 Lakh Crore / ₹2.05 लाख करोड़', '(c) ₹2.15 Lakh Crore / ₹2.15 लाख करोड़', '(d) ₹2.25 Lakh Crore / ₹2.25 लाख करोड़'],
    correctOptionIndex: 2,
    explanation: 'Gross GST collections surged to an all-time record high of ₹2.15 Lakh Crore in June 2026, registering 14% growth.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-379',
    text: "What is the expected launch year for ISRO's Venus Orbiter Mission 'Shukrayaan' which entered its assembly phase? / इसरो के शुक्र ऑर्बिटर मिशन 'शुक्रयान' (Shukrayaan) का अपेक्षित प्रक्षेपण वर्ष क्या है, जो अब असेंबली चरण में प्रवेश कर चुका है?",
    options: ['(a) 2027', '(b) 2028', '(c) 2029', '(d) 2030'],
    correctOptionIndex: 1,
    explanation: 'ISRO initiated payload assembly for the Shukrayaan Venus mission, targeting a commercial launch window in late 2028.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-380',
    text: 'Which country signed an agreement with India to roadmap civil nuclear cooperation for Small Modular Reactors (SMR)? / किस देश ने स्मॉल मॉड्यूलर रिएक्टर्स (SMR) के लिए नागरिक परमाणु सहयोग का रोडमैप तैयार करने के लिए भारत के साथ एक समझौते पर हस्ताक्षर किए हैं?',
    options: ['(a) USA / अमेरिका', '(b) France / फ्रांस', '(c) Russia / रूस', '(d) Japan / जापान'],
    correctOptionIndex: 1,
    explanation: 'India and France formalized an expansive roadmap to collaborate on Small Modular Reactors (SMRs) technology.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-381',
    text: 'Which state became the first in India to introduce a decentralized, blockchain-secured land registry system? / विकेंद्रीकृत, ब्लॉकचेन-सुरक्षित भूमि रजिस्ट्री प्रणाली शुरू करने वाला भारत का पहला राज्य कौन सा बना?',
    options: ['(a) Andhra Pradesh / आंध्र प्रदेश', '(b) Telangana / तेलंगाना', '(c) Karnataka / कर्नाटक', '(d) Maharashtra / महाराष्ट्र'],
    correctOptionIndex: 0,
    explanation: 'Andhra Pradesh implemented India\'s first blockchain-secured land register system to prevent tamper cases and property fraud.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-382',
    text: 'The Indian Men\'s Hockey Team won the 2025-26 FIH Hockey Pro League title with a final victory over which team? / भारतीय पुरुष हॉकी टीम ने किस टीम पर अंतिम जीत के साथ 2025-26 एफआईएच हॉकी प्रो लीग का खिताब जीता?',
    options: ['(a) Germany / जर्मनी', '(b) Belgium / बेल्जियम', '(c) Netherlands / नीदरलैंड', '(d) Australia / ऑस्ट्रेलिया'],
    correctOptionIndex: 0,
    explanation: 'Indian Men\'s Hockey team clinched the FIH Pro League title with a phenomenal final victory against Germany.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-383',
    text: 'Which state government mandated a 30% rooftop area reservation for "Green Roofs" in all large industrial complexes? / किस राज्य सरकार ने सभी बड़े औद्योगिक परिसरों में "ग्रीन रूफ" के लिए 30% छत क्षेत्र आरक्षित करना अनिवार्य कर दिया है?',
    options: ['(a) Maharashtra / महाराष्ट्र', '(b) Tamil Nadu / तमिलनाडु', '(c) Karnataka / कर्नाटक', '(d) Gujarat / गुजरात'],
    correctOptionIndex: 2,
    explanation: 'Karnataka passed a mandate requiring commercial and industrial complexes over 50,000 sq ft to reserve 30% roof space for green vegetative cover.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-384',
    text: "What is the name of Microsoft's massive AI skill initiative launched in collaboration with the Indian Ministry of Education? / भारतीय शिक्षा मंत्रालय के सहयोग से शुरू की गई माइक्रोसॉफ्ट की विशाल एआई कौशल पहल का नाम क्या है?",
    options: ['(a) Project Nirmaan / प्रोजेक्ट निर्माण', '(b) Project Pragati / प्रोजेक्ट प्रगति', '(c) Project Shiksha / प्रोजेक्ट शिक्षा', '(d) Project Samarth / प्रोजेक्ट समर्थ'],
    correctOptionIndex: 0,
    explanation: 'Microsoft launched Project Nirmaan in India aiming to train 20 lakh young aspirants in prompt engineering and AI technology.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-385',
    text: "Which Indian state received the prestigious 'Green State of the Year' award at the Global Eco-Tourism Summit? / वैश्विक पर्यावरण-पर्यटन शिखर सम्मेलन में किस भारतीय राज्य को प्रतिष्ठित 'ग्रीन स्टेट ऑफ द ईयर' पुरस्कार मिला है?",
    options: ['(a) Sikkim / सिक्किम', '(b) Himachal Pradesh / हिमाचल प्रदेश', '(c) Kerala / केरल', '(d) Uttarakhand / उत्तराखंड'],
    correctOptionIndex: 0,
    explanation: 'Sikkim was recognized as the Green State of the Year due to its pioneering 100% organic policies and conservation efforts.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-386',
    text: 'What is the extended deadline declared by the CBDT for PAN-Aadhaar biometric linking with minimal late fees? / न्यूनतम विलंब शुल्क के साथ पैन-आधार बायोमेट्रिक लिंकिंग के लिए सीबीडीटी द्वारा घोषित विस्तारित समय सीमा क्या है?',
    options: ['(a) July 31, 2026 / 31 जुलाई 2026', '(b) August 31, 2026 / 31 अगस्त 2026', '(c) September 30, 2026 / 30 सितंबर 2026', '(d) December 31, 2026 / 31 दिसंबर 2026'],
    correctOptionIndex: 2,
    explanation: 'The Central Board of Direct Taxes (CBDT) extended the biometric integration deadline till September 30, 2026.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-387',
    text: 'IIT Madras partnered with which global giant to launch a free online Quantum Computing certification? / आईआईटी मद्रास ने किसके साथ मिलकर मुफ्त ऑनलाइन क्वांटम कंप्यूटिंग प्रमाणन शुरू करने के लिए साझेदारी की है?',
    options: ['(a) IBM Research / आईबीएम रिसर्च', '(b) Google AI / गूगल एआई', '(c) Microsoft / माइक्रोसॉफ्ट', '(d) Intel / इंटेल'],
    correctOptionIndex: 0,
    explanation: 'IIT Madras and IBM Research announced a joint 12-week open-source course to build deep-tech skills in quantum mechanics.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-388',
    text: 'India signed an MoU on semiconductor supply chain resilience and design partnerships with which country? / भारत ने सेमीकंडक्टर आपूर्ति श्रृंखला लचीलेपन और डिजाइन साझेदारी पर किस देश के साथ समझौता ज्ञापन पर हस्ताक्षर किए हैं?',
    options: ['(a) USA / अमेरिका', '(b) Japan / जापान', '(c) Taiwan / ताइवान', '(d) South Korea / दक्षिण कोरिया'],
    correctOptionIndex: 1,
    explanation: 'India and Japan formalized an MoU to build resilient semiconductor supply chains and execute scholar exchange programs.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-389',
    text: "The Ministry of Jal Shakti declared an additional 5,000 villages as ____________ under Swachh Bharat Mission (Grameen). / जल शक्ति मंत्रालय ने स्वच्छ भारत मिशन (ग्रामीण) के तहत अतिरिक्त 5,000 गांवों को ____________ घोषित किया है।",
    options: ["(a) ODF Plus Model / ओडीएफ प्लस मॉडल", "(b) Zero Waste Zones / शून्य अपशिष्ट क्षेत्र", "(c) Water Secure Villages / जल सुरक्षित गांव", "(d) Green Villages / हरित ग्राम"],
    correctOptionIndex: 0,
    explanation: '5,000 additional villages were certified as ODF Plus Model villages, implementing smart recycling and waste management systems.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-390',
    text: "The 'Zorawar' Light Tanks deployed by the Army were developed jointly by DRDO and which private firm? / सेना द्वारा तैनात किए गए 'जोरावर' हल्के टैंक संयुक्त रूप से डीआरडीओ और किस निजी संस्था द्वारा विकसित किए गए थे?",
    options: ['(a) Tata Advanced Systems / टाटा एडवांस्ड सिस्टम्स', '(b) Larsen & Toubro (L&T) / लार्सन एंड टुब्रो', '(c) Mahindra Defence / महिंद्रा डिफेंस', '(d) Adani Defence / अदानी डिफेंस'],
    correctOptionIndex: 1,
    explanation: "The Zorawar Light Tanks were jointly conceptualized and designed by DRDO in active partnership with Larsen & Toubro (L&T).",
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-391',
    text: 'Which G7 member country hosted the main heads of state G7 Summit in Rome in 2026? / किस जी7 (G7) सदस्य देश ने 2026 में रोम में राष्ट्राध्यक्षों के मुख्य शिखर सम्मेलन की मेजबानी की?',
    options: ['(a) France / फ्रांस', '(b) Italy / इटली', '(c) Germany / जर्मनी', '(d) Canada / कनाडा'],
    correctOptionIndex: 1,
    explanation: 'Italy successfully hosted the heads of state G7 Summit in Rome, focusing on digital networks and green development.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-392',
    text: "Where is ISRO's Aeronautical Test Range (ATR) located, which hosted the autonomous landing of the reusable launch vehicle? / इसरो का एयरोनॉटिकल टेस्ट रेंज (ATR) कहाँ स्थित है, जिसने पुन: प्रयोज्य प्रक्षेपण यान की स्वायत्त लैंडिंग की मेजबानी की थी?",
    options: ['(a) Chitradurga, Karnataka / चित्रदुर्ग, कर्नाटक', '(b) Mahendragiri, Tamil Nadu / महेंद्रगिरि, तमिलनाडु', '(c) Chandipur, Odisha / चांदीपुर, ओडिशा', '(d) Sriharikota, AP / श्रीहरिकोटा, आंध्र प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'ISRO successfully conducted the RLV-LEX-3 autonomous landing at the Aeronautical Test Range (ATR) in Chitradurga, Karnataka.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-393',
    text: "What was India's manufacturing and services composite PMI recorded in June 2026, marking economic expansion? / आर्थिक विस्तार को दर्शाते हुए जून 2026 में भारत का विनिर्माण और सेवा संयुक्त पीएमआई (PMI) कितना दर्ज किया गया?",
    options: ['(a) 55.4', '(b) 58.2', '(c) 61.8', '(d) 64.1'],
    correctOptionIndex: 2,
    explanation: 'Driven by heavy demand in the service industry, India\'s services PMI surged to a 15-year high of 61.8 in June 2026.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-394',
    text: 'Who was appointed as the new Chairman of the University Grants Commission (UGC) in July 2026? / जुलाई 2026 में विश्वविद्यालय अनुदान आयोग (UGC) के नए अध्यक्ष के रूप में किसे नियुक्त किया गया?',
    options: ['(a) Prof. Sandeep Kumar / प्रो. संदीप कुमार', '(b) Prof. M. Jagadesh Kumar / प्रो. एम. जगदेश कुमार', '(c) Dr. Manoj Soni / डॉ. मनोज सोनी', '(d) Dr. G. Madhavan / डॉ. जी. माधवन'],
    correctOptionIndex: 0,
    explanation: 'Eminent academician Professor Sandeep Kumar was appointed as the new UGC Chairman for a tenure of three years.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-395',
    text: "The Cabinet extended the 'PM-PRANAM' organic farming promotion scheme till which target year? / कैबिनेट ने 'पीएम-प्रणाम' (PM-PRANAM) जैविक खेती प्रोत्साहन योजना को किस लक्ष्य वर्ष तक बढ़ा दिया है?",
    options: ['(a) 2027', '(b) 2028', '(c) 2029', '(d) 2030'],
    correctOptionIndex: 1,
    explanation: "The central cabinet approved the extension of the 'PM-PRANAM' scheme till 2028 with an increased outlay of ₹5,000 Crore.",
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-396',
    text: "What is India's global ranking in terms of total installed wind energy capacity? / कुल स्थापित पवन ऊर्जा क्षमता के मामले में भारत की वैश्विक रैंकिंग क्या है?",
    options: ['(a) 2nd / दूसरी', '(b) 3rd / तीसरी', '(c) 4th / चौथी', '(d) 5th / पांचवीं'],
    correctOptionIndex: 2,
    explanation: 'India ranks 4th globally in installed wind power capacity and overall renewable capacity expansion.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-397',
    text: "Which state government launched the 'Subhadra Yojana' to empower over 1 crore women with financial subsidies? / किस राज्य सरकार ने 1 करोड़ से अधिक महिलाओं को वित्तीय सहायता देकर सशक्त बनाने के लिए 'सुभद्रा योजना' (Subhadra Yojana) शुरू की है?",
    options: ['(a) Odisha / ओडिशा', '(b) Jharkhand / झारखंड', '(c) Madhya Pradesh / मध्य प्रदेश', '(d) Chhattisgarh / छत्तीसगढ़'],
    correctOptionIndex: 0,
    explanation: 'The Government of Odisha launched the Subhadra Yojana to provide annual financial aid to female beneficiaries.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-398',
    text: "Which historical city of Uttar Pradesh is being constructed as India's first dedicated 'AI City'? / उत्तर प्रदेश के किस ऐतिहासिक शहर को भारत के पहले समर्पित 'एआई सिटी' (AI City) के रूप में विकसित किया जा रहा है?",
    options: ['(a) Lucknow / लखनऊ', '(b) Noida / नोएडा', '(c) Varanasi / वाराणसी', '(d) Agra / आगरा'],
    correctOptionIndex: 0,
    explanation: "Lucknow is developing India's first integrated AI City, combining commercial, educational, and smart campus facilities.",
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-399',
    text: 'Which country officially deposited its accession documents to complete its entry as the 32nd NATO member? / किस देश ने आधिकारिक रूप से 32वें नाटो (NATO) सदस्य के रूप में प्रवेश पूरा करने के लिए अपने परिग्रहण दस्तावेज जमा किए?',
    options: ['(a) Sweden / स्वीडन', '(b) Finland / फिनलैंड', '(c) Ukraine / यूक्रेन', '(d) Austria / ऑस्ट्रिया'],
    correctOptionIndex: 0,
    explanation: 'Sweden officially became the 32nd member of NATO after depositing its instrument of accession in Washington.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-400',
    text: 'The Union Cabinet approved the development of a mega deep-water port at Vadhavan in which Indian state? / केंद्रीय मंत्रिमंडल ने किस भारतीय राज्य में वधावन (Vadhavan) में एक विशाल गहरे पानी के बंदरगाह के विकास को मंजूरी दी?',
    options: ['(a) Gujarat / गुजरात', '(b) Maharashtra / महाराष्ट्र', '(c) Goa / गोवा', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 1,
    explanation: 'The government approved the development of a greenfield, all-weather deep-draft port at Vadhavan, Maharashtra.',
    date: '2026-07-08'
  },
  {
    id: 'ca-q-today-401',
    text: 'Who has been appointed as the new Chief of the Naval Staff of India in July 2026? / जुलाई 2026 में भारत के नए नौसेना प्रमुख (Chief of the Naval Staff) के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Vice Admiral Dinesh K Tripathi / वाइस एडमिरल दिनेश के त्रिपाठी', '(b) Admiral R Hari Kumar / एडमिरल आर हरि कुमार', '(c) Vice Admiral Sanjay J Singh / वाइस एडमिरल संजय जे सिंह', '(d) Admiral Karambir Singh / एडमिरल करमबीर सिंह'],
    correctOptionIndex: 0,
    explanation: 'Vice Admiral Dinesh K Tripathi officially assumed command as the Chief of the Naval Staff in the mid-2026 reorganization.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-402',
    text: 'India and which country recently launched the "B2B Energy Alliance" to boost grid modernization? / भारत और किस देश ने ग्रिड आधुनिकीकरण को बढ़ावा देने के लिए हाल ही में "B2B ऊर्जा गठबंधन" शुरू किया है?',
    options: ['(a) USA / अमेरिका', '(b) Japan / जापान', '(c) France / फ्रांस', '(d) United Arab Emirates / संयुक्त अरब अमीरात'],
    correctOptionIndex: 3,
    explanation: 'India and UAE established the Business-to-Business (B2B) Energy Alliance during the bilateral summit to focus on modern grids.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-403',
    text: 'Which Indian city is chosen to host the Global Climate Action Summit in November 2026? / नवंबर 2026 में ग्लोबल क्लाइमेट एक्शन समिट की मेजबानी के लिए भारत के किस शहर को चुना गया है?',
    options: ['(a) Mumbai / मुंबई', '(b) Bengaluru / बेंगलुरु', '(c) New Delhi / नई दिल्ली', '(d) Chennai / चेन्नई'],
    correctOptionIndex: 1,
    explanation: 'Bengaluru is designated to host the upcoming Global Climate Action Summit 2026 focusing on green technology and sustainable urban planning.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-404',
    text: 'What is the target year set by the Ministry of Mines to complete the detailed mapping of critical minerals across the country? / खान मंत्रालय द्वारा देश भर में महत्वपूर्ण खनिजों के विस्तृत मानचित्रण को पूरा करने का लक्ष्य वर्ष क्या है?',
    options: ['(a) 2027', '(b) 2028', '(c) 2029', '(d) 2030'],
    correctOptionIndex: 1,
    explanation: 'The Ministry of Mines has sped up its process, aiming to achieve full digital mapping of critical minerals by early 2028.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-405',
    text: 'What is the name of the newly launched AI assistant by the Ministry of Agriculture to help farmers query soil health cards? / कृषि मंत्रालय द्वारा किसानों को मृदा स्वास्थ्य कार्ड की जानकारी प्रदान करने के लिए शुरू किए गए नए एआई सहायक का नाम क्या है?',
    options: ['(a) Krishi Mitra AI / कृषि मित्र एआई', '(b) Bhu-Sanjivani / भू-संजीवनी', '(c) SoilBot / सॉइलबॉट', '(d) Krishi AI / कृषि एआई'],
    correctOptionIndex: 1,
    explanation: 'The Ministry of Agriculture released the "Bhu-Sanjivani" multilingual generative AI assistant to interpret soil metrics instantly.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-406',
    text: 'Which state government announced the "Nua-O" scholarship scheme to provide financial aid to undergraduate and postgraduate students? / किस राज्य सरकार ने स्नातक और स्नातकोत्तर छात्रों को वित्तीय सहायता प्रदान करने के लिए "नुआ-ओ" (Nua-O) छात्रवृत्ति योजना की घोषणा की है?',
    options: ['(a) Odisha / ओडिशा', '(b) West Bengal / पश्चिम बंगाल', '(c) Jharkhand / झारखंड', '(d) Bihar / बिहार'],
    correctOptionIndex: 0,
    explanation: 'The Government of Odisha launched the Nua-O scholarship to assist students across state universities with direct benefit transfers.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-407',
    text: "India's first fully indigenous commercial semiconductor fabrication plant is being established in which state? / भारत का पहला पूर्णतः स्वदेशी वाणिज्यिक सेमीकंडक्टर फैब्रिकेशन प्लांट किस राज्य में स्थापित किया जा रहा है?",
    options: ['(a) Gujarat / गुजरात', '(b) Maharashtra / महाराष्ट्र', '(c) Tamil Nadu / तमिलनाडु', '(d) Karnataka / कर्नाटक'],
    correctOptionIndex: 0,
    explanation: 'The joint venture commercial semiconductor fab plant is being set up in Dholera, Gujarat, to produce indigenous chips.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-408',
    text: 'Who won the Men\'s Singles title at the prestigious Wimbledon Championship 2026? / प्रतिष्ठित विंबलडन चैंपियनशिप 2026 में पुरुष एकल का खिताब किसने जीता?',
    options: ['(a) Carlos Alcaraz / कार्लोस अल्कराज', '(b) Novak Djokovic / नोवाक जोकोविच', '(c) Jannik Sinner / जैनिक सिनर', '(d) Daniil Medvedev / दानिल मेदवेदेव'],
    correctOptionIndex: 2,
    explanation: 'Jannik Sinner clinched the 2026 Wimbledon Men\'s Singles title in an extraordinary five-set final.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-409',
    text: 'The Ministry of Civil Aviation recently approved the construction of a new international airport in which city of Assam? / नागरिक उड्डयन मंत्रालय ने हाल ही में असम के किस शहर में एक नए अंतरराष्ट्रीय हवाई अड्डे के निर्माण को मंजूरी दी है?',
    options: ['(a) Silchar / सिलचर', '(b) Dibrugarh / डिब्रूगढ़', '(c) Jorhat / जोरहाट', '(d) Guwahati / गुवाहाटी'],
    correctOptionIndex: 0,
    explanation: 'The Ministry of Civil Aviation cleared the greenfield international airport project at Doloo Tea Estate near Silchar.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-410',
    text: 'Which public sector enterprise was conferred with the "Maharatna Status" in July 2026? / जुलाई 2026 में किस सार्वजनिक क्षेत्र के उद्यम को "महारत्न दर्जा" (Maharatna Status) प्रदान किया गया है?',
    options: ['(a) Solar Energy Corporation of India (SECI) / भारतीय सौर ऊर्जा निगम', '(b) Hindustan Aeronautics Limited (HAL) / हिंदुस्तान एयरोनॉटिक्स लिमिटेड', '(c) Indian Railway Finance Corporation (IRFC) / भारतीय रेलवे वित्त निगम', '(d) NHPC Limited / एनएचपीसी लिमिटेड'],
    correctOptionIndex: 0,
    explanation: 'SECI was upgraded to Maharatna status due to its pivotal role in spearheading India\'s renewable energy transitions.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-411',
    text: 'Which multi-national bank approved a $500 million loan for India\'s "National Urban Sanitation Program"? / किस बहुराष्ट्रीय बैंक ने भारत के "राष्ट्रीय शहरी स्वच्छता कार्यक्रम" के लिए $500 मिलियन के ऋण को मंजूरी दी है?',
    options: ['(a) Asian Development Bank (ADB) / एशियाई विकास बैंक', '(b) World Bank / विश्व बैंक', '(c) New Development Bank (NDB) / न्यू डेवलपमेंट बैंक', '(d) Asian Infrastructure Investment Bank (AIIB) / एशियाई बुनियादी ढांचा निवेश बैंक'],
    correctOptionIndex: 1,
    explanation: 'The World Bank approved the financial aid package to support waste-water treatment and circular sanitation structures in tier-2 cities.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-412',
    text: 'What is India\'s cumulative installed renewable energy capacity (including hydro) as of mid-2026? / मध्य-2026 तक भारत की कुल स्थापित नवीकरणीय ऊर्जा क्षमता (जल विद्युत सहित) कितनी हो गई है?',
    options: ['(a) 180 GW / 180 गीगावाट', '(b) 195 GW / 195 गीगावाट', '(c) 210 GW / 210 गीगावाट', '(d) 230 GW / 230 गीगावाट'],
    correctOptionIndex: 1,
    explanation: 'Ministry of New & Renewable Energy reported that India crossed the landmark 195 GW cumulative installed capacity in mid-2026.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-413',
    text: 'What is India\'s rank in the Global Peace Index (GPI) 2026 published by the Institute for Economics and Peace? / इंस्टीट्यूट फॉर इकोनॉमिक्स एंड पीस द्वारा प्रकाशित वैश्विक शांति सूचकांक (GPI) 2026 में भारत का कौन सा स्थान है?',
    options: ['(a) 112th / 112वां', '(b) 116th / 116वां', '(c) 122nd / 122वां', '(d) 126th / 126वां'],
    correctOptionIndex: 1,
    explanation: 'India secured the 116th rank, showing steady improvements in regional security and internal harmony indicators.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-414',
    text: 'Who has assumed charge as the Chief of the Army Staff (COAS) of the Indian Army in mid-2026? / मध्य-2026 में भारतीय सेना के नए थल सेनाध्यक्ष (COAS) का पदभार किसने संभाला है?',
    options: ['(a) General Upendra Dwivedi / जनरल उपेंद्र द्विवेदी', '(b) General Manoj Pande / जनरल मनोज पांडे', '(c) General Anil Chauhan / जनरल अनिल चौहान', '(d) General Hari Prasad / जनरल हरि प्रसाद'],
    correctOptionIndex: 0,
    explanation: 'General Upendra Dwivedi succeeded General Manoj Pande to become the 30th Chief of the Army Staff.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-415',
    text: 'According to the latest wildlife division census, which Tiger Reserve recorded the highest density of tigers in India? / नवीनतम वन्यजीव प्रभाग जनगणना के अनुसार, भारत के किस टाइगर रिजर्व में बाघों का उच्चतम घनत्व दर्ज किया गया है?',
    options: ['(a) Corbett Tiger Reserve / कॉर्बेट टाइगर रिजर्व', '(b) Kaziranga Tiger Reserve / काजीरंगा टाइगर रिजर्व', '(c) Bandipur Tiger Reserve / बांदीपुर टाइगर रिजर्व', '(d) Tadoba Tiger Reserve / ताडोबा टाइगर रिजर्व'],
    correctOptionIndex: 0,
    explanation: 'Corbett Tiger Reserve in Uttarakhand continues to record the highest density of tigers within its territorial bounds.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-416',
    text: 'Which institution won the WHO Nelson Mandela Award for Health Promotion for the year 2026? / किस संस्थान ने वर्ष 2026 के लिए स्वास्थ्य संवर्धन के लिए डब्ल्यूएचओ नेल्सन मंडेला पुरस्कार जीता है?',
    options: ['(a) NIMHANS Bengaluru / निमहंस बेंगलुरु', '(b) AIIMS New Delhi / एम्स नई दिल्ली', '(c) Public Health Foundation of India / पब्लिक हेल्थ फाउंडेशन ऑफ इंडिया', '(d) ICMR / आईसीएमआर'],
    correctOptionIndex: 0,
    explanation: 'The National Institute of Mental Health and Neuro Sciences (NIMHANS), Bengaluru was honored with the Nelson Mandela Award by WHO.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-417',
    text: 'Which Kalvari-class submarine was recently inducted into the Indian Navy at Mumbai dockyard? / मुंबई डॉकयार्ड में हाल ही में किस कलवरी-श्रेणी की पनडुब्बी को भारतीय नौसेना में शामिल किया गया है?',
    options: ['(a) INS Vagir / आईएनएस वागीर', '(b) INS Vagsheer / आईएनएस वागशीर', '(c) INS Vela / आईएनएस वेला', '(d) INS Karanj / आईएनएस करंज'],
    correctOptionIndex: 1,
    explanation: 'INS Vagsheer, the sixth submarine under Project-75, successfully entered active naval fleet duty after passing trials.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-418',
    text: 'Which country hosted the 6th BIMSTEC Summit in mid-2026? / मध्य-2026 में छठे बिम्सटेक (BIMSTEC) शिखर सम्मेलन की मेजबानी किस देश ने की?',
    options: ['(a) Thailand / थाईलैंड', '(b) India / भारत', '(c) Sri Lanka / श्रीलंका', '(d) Bangladesh / बांग्लादेश'],
    correctOptionIndex: 0,
    explanation: 'Thailand successfully hosted the heads of state summit in Bangkok, focusing on maritime trade routes and disaster protocols.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-419',
    text: 'What is India\'s rank in the Energy Transition Index 2026 released by the World Economic Forum? / विश्व आर्थिक मंच द्वारा जारी ऊर्जा संक्रमण सूचकांक (ETI) 2026 में भारत का कौन सा स्थान है?',
    options: ['(a) 63rd / 63वां', '(b) 67th / 67वां', '(c) 71st / 71वां', '(d) 75th / 75वां'],
    correctOptionIndex: 1,
    explanation: 'India secured the 67th position globally, showing substantial progress in renewable grid infrastructure integration.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-420',
    text: 'The government launched a commemorative Rs. 50 coin to mark 50 golden years of which historic conservation program? / सरकार ने किस ऐतिहासिक संरक्षण कार्यक्रम के 50 स्वर्णिम वर्ष पूरे होने पर एक स्मारक 50 रुपये का सिक्का लॉन्च किया है?',
    options: ['(a) Project Elephant / प्रोजेक्ट एलीफेंट', '(b) Project Tiger / प्रोजेक्ट टाइगर', '(c) Project Crocodile / प्रोजेक्ट क्रोकोडाइल', '(d) Project Rhino / प्रोजेक्ट राइनो'],
    correctOptionIndex: 1,
    explanation: 'A commemorative silver-alloy Rs. 50 coin was launched celebrating the success of Project Tiger over 50 years.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-421',
    text: 'What was the theme of National Doctors Day celebrated in India on July 1, 2026? / 1 जुलाई 2026 को भारत में मनाए गए राष्ट्रीय चिकित्सक दिवस का मुख्य विषय (Theme) क्या था?',
    options: ['(a) Healing Hands, Caring Hearts / हीलिंग हैंड्स, केयरिंग हार्ट्स', '(b) Empowering Clinicians with Digital AI / डिजिटल एआई के साथ चिकित्सकों को सशक्त बनाना', '(c) Family Doctors on the Front Line / फ्रंट लाइन पर पारिवारिक डॉक्टर', '(d) Restoring Trust in Healthcare / स्वास्थ्य सेवा में विश्वास बहाल करना'],
    correctOptionIndex: 0,
    explanation: '"Healing Hands, Caring Hearts" was the central theme for Doctors Day 2026, honoring selfless services.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-422',
    text: "India's first Vedic-themed park named 'Ved Van Park' has been opened in which city? / भारत का पहला वैदिक-थीम वाला पार्क 'वेद वन पार्क' किस शहर में खोला गया है?",
    options: ['(a) Noida / नोएडा', '(b) Varanasi / वाराणसी', '(c) Ayodhya / अयोध्या', '(d) Haridwar / हरिद्वार'],
    correctOptionIndex: 0,
    explanation: 'The Ved Van Park, showcasing classical texts and Vedic scriptures in botanical zones, opened in Noida, Sector 78.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-423',
    text: 'What is India\'s rank in the Henley Passport Index 2026? / हेनले पासपोर्ट इंडेक्स 2026 में भारत को कौन सा स्थान मिला है?',
    options: ['(a) 78th / 78वां', '(b) 80th / 80वां', '(c) 82nd / 82वां', '(d) 85th / 85वां'],
    correctOptionIndex: 2,
    explanation: 'India ranked 82nd in the Henley Passport Index 2026, enabling visa-free access to 62 destinations for its citizens.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-424',
    text: 'Which Indian major port became the first in the country to handle 150 Million Metric Tonnes (MMT) of cargo in a single fiscal year? / कौन सा भारतीय प्रमुख बंदरगाह एक ही वित्तीय वर्ष में 150 मिलियन मीट्रिक टन (MMT) कार्गो संभालने वाला देश का पहला बंदरगाह बन गया है?',
    options: ['(a) Deendayal Port (Kandla) / दीनदयाल बंदरगाह', '(b) Paradip Port (Odisha) / पारादीप बंदरगाह', '(c) Jawaharlal Nehru Port (JNPT) / जवाहरलाल नेहरू बंदरगाह', '(d) Chennai Port / चेन्नई बंदरगाह'],
    correctOptionIndex: 1,
    explanation: 'Paradip Port in Odisha registered record performance, crossing the 150 MMT milestone to lead as the top cargo handling port.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-425',
    text: 'IIT Delhi successfully launched its international campus operations in which global city? / आईआईटी दिल्ली ने किस वैश्विक शहर में अपने अंतरराष्ट्रीय परिसर का संचालन सफलतापूर्वक शुरू किया है?',
    options: ['(a) London / लंदन', '(b) Singapore / सिंगापुर', '(c) Abu Dhabi / अबू धाबी', '(d) Dubai / दुबई'],
    correctOptionIndex: 2,
    explanation: 'IIT Delhi - Abu Dhabi initiated its first academic session in UAE, promoting deep-tech engineering globally.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-426',
    text: 'Which country won the SAFF Men\'s Under-19 Football Championship 2026? / किस देश ने सैफ (SAFF) पुरुष अंडर-19 फुटबॉल चैंपियनशिप 2026 का खिताब जीता है?',
    options: ['(a) India / भारत', '(b) Nepal / नेपाल', '(c) Bangladesh / बांग्लादेश', '(d) Maldives / मालदीव'],
    correctOptionIndex: 0,
    explanation: 'India won the SAFF Under-19 title with a hard-fought win against Nepal in the final.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-427',
    text: 'Which building in India surpassed the Pentagon as the world\'s largest office building? / भारत के किस भवन ने पेंटागन को पीछे छोड़कर दुनिया के सबसे बड़े कार्यालय भवन का दर्जा हासिल किया है?',
    options: ['(a) Surat Diamond Bourse / सूरत डायमंड बोर्स', '(b) Bharat Mandapam / भारत मण्डपम', '(c) Yashobhoomi Convention Center / यशोभूमि कन्वेंशन सेंटर', '(d) New Parliament House / नया संसद भवन'],
    correctOptionIndex: 0,
    explanation: 'Surat Diamond Bourse in Gujarat houses over 65,000 diamond professionals in a single connected eco-structure.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-428',
    text: 'Who is the current Governor of the Reserve Bank of India (RBI) who recently oversaw the e₹ digital rupee integration? / भारतीय रिजर्व बैंक (RBI) के वर्तमान गवर्नर कौन हैं, जिन्होंने हाल ही में ई-रुपया डिजिटल मुद्रा एकीकरण की देखरेख की?',
    options: ['(a) Shaktikanta Das / शक्तिकांत दास', '(b) Urjit Patel / उर्जित पटेल', '(c) Raghuram Rajan / रघुराम राजन', '(d) Michael Patra / माइकल पात्रा'],
    correctOptionIndex: 0,
    explanation: 'Shaktikanta Das is the Governor of RBI, leading critical monetary adjustments and digital currency schemes.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-429',
    text: "Under which code name is DRDO developing its indigenous Long-Range Surface-to-Air Missile (LRSAM) system resembling Iron Dome? / डीआरडीओ किस कोड नेम के तहत आयरन डोम जैसी स्वदेशी लंबी दूरी की सतह से हवा में मार करने वाली मिसाइल (LRSAM) प्रणाली विकसित कर रहा है?",
    options: ['(a) Project Kusha / प्रोजेक्ट कुशा', '(b) Project Trishul / प्रोजेक्ट त्रिशूल', '(c) Project Astra / प्रोजेक्ट अस्त्र', '(d) Project Aksh / प्रोजेक्ट अक्ष'],
    correctOptionIndex: 0,
    explanation: 'Project Kusha is DRDO\'s air defense system designed to destroy stealth jets, cruise missiles, and drones up to 350km range.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-430',
    text: 'What is the maximum subsidy amount available for an individual household installing a 3kW solar system under PM-Surya Ghar Muft Bijli Yojana? / पीएम-सूर्य घर मुफ्त बिजली योजना के तहत 3 किलोवाट का सोलर सिस्टम स्थापित करने वाले व्यक्तिगत परिवार के लिए अधिकतम सब्सिडी राशि क्या है?',
    options: ['(a) ₹50,000', '(b) ₹65,000', '(c) ₹78,000', '(d) ₹90,000'],
    correctOptionIndex: 2,
    explanation: 'The scheme provides up to ₹78,000 direct subsidy for setup of 3kW solar panels to secure 300 free power units monthly.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-431',
    text: 'Which Indian state became the first post-independence state to pass the Uniform Civil Code (UCC) Bill? / स्वतंत्रता के बाद समान नागरिक संहिता (UCC) विधेयक पारित करने वाला भारत का पहला राज्य कौन सा बना है?',
    options: ['(a) Uttarakhand / उत्तराखंड', '(b) Goa / गोवा', '(c) Gujarat / गुजरात', '(d) Himachal Pradesh / हिमाचल प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'Uttarakhand legislative assembly officially passed the Uniform Civil Code bill in 2024, becoming the first post-independence state to do so.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-432',
    text: 'What is India\'s rank in the World Press Freedom Index 2026 published by Reporters Without Borders? / रिपोर्टर्स विदाउट बॉर्डर्स द्वारा प्रकाशित विश्व प्रेस स्वतंत्रता सूचकांक 2026 में भारत का कौन सा स्थान है?',
    options: ['(a) 150th / 150वां', '(b) 159th / 159वां', '(c) 161st / 161वां', '(d) 165th / 165वां'],
    correctOptionIndex: 1,
    explanation: 'India secured the 159th spot among 180 evaluated nations in the latest world press evaluation indices.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-433',
    text: "The 'Cyber Surakshit Bharat' initiative was conceptualized by which Union Ministry? / 'साइबर सुरक्षित भारत' (Cyber Surakshit Bharat) पहल की परिकल्पना किस केंद्रीय मंत्रालय द्वारा की गई थी?",
    options: ['(a) Ministry of Electronics & IT (MeitY) / इलेक्ट्रॉनिक्स और आईटी मंत्रालय', '(b) Ministry of Home Affairs / गृह मंत्रालय', '(c) Ministry of Defence / रक्षा मंत्रालय', '(d) Ministry of Science & Tech / विज्ञान और प्रौद्योगिकी मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'MeitY launched Cyber Surakshit Bharat to spread digital hygiene, awareness, and train CISO officers of public networks.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-434',
    text: 'Which stealth guided-missile destroyer was commissioned under Project 15B at Naval Dockyard, Mumbai? / प्रोजेक्ट 15B के तहत किस स्टील्थ गाइडेड-मिसाइल विध्वंसक को नौसेना डॉकयार्ड, मुंबई में शामिल किया गया?',
    options: ['(a) INS Imphal / आईएनएस इंफाल', '(b) INS Mormugao / आईएनएस मोर्मूगाओ', '(c) INS Visakhapatnam / आईएनएस विशाखापत्तनम', '(d) INS Surat / आईएनएस सूरत'],
    correctOptionIndex: 0,
    explanation: 'INS Imphal (D68), the third stealth guided-missile destroyer built by Mazagon Dock, was formally commissioned.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-435',
    text: "Who has been selected for the Sahitya Akademi Bal Sahitya Puraskar 2026 for Hindi literature? / हिंदी साहित्य के लिए बाल साहित्य पुरस्कार 2026 साहित्य अकादमी पुरस्कार के लिए किसे चुना गया है?",
    options: ['(a) Devendra Mewari / देवेंद्र मेवाड़ी', '(b) Surya Nath Singh / सूर्य नाथ सिंह', '(c) Alok Shrivastava / आलोक श्रीवास्तव', '(d) Divik Ramesh / दिविक रमेश'],
    correctOptionIndex: 0,
    explanation: 'Veteran author Devendra Mewari was awarded the prestigious Bal Sahitya Puraskar for his outstanding contributions to Hindi children\'s literature.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-436',
    text: 'On which date does India celebrate its national "National Space Day" to honor the successful soft-landing of Chandrayaan-3? / चंद्रयान-3 की सफल सॉफ्ट-लैंडिंग के सम्मान में भारत किस तारीख को अपना राष्ट्रीय "अंतरिक्ष दिवस" (National Space Day) मनाता है?',
    options: ['(a) August 23 / 23 अगस्त', '(b) August 15 / 15 अगस्त', '(c) September 5 / 5 सितंबर', '(d) October 22 / 22 अक्टूबर'],
    correctOptionIndex: 0,
    explanation: 'India declared August 23 as National Space Day to immortalize the historical touch-down of Vikram lander near the lunar South Pole.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-437',
    text: "Which state's famous traditional sweet 'Raskadam' recently received the Geographical Indication (GI) tag? / हाल ही में किस राज्य की प्रसिद्ध पारंपरिक मिठाई 'रसकदम' को भौगोलिक संकेतक (GI) टैग मिला है?",
    options: ['(a) West Bengal / पश्चिम बंगाल', '(b) Odisha / ओडिशा', '(c) Bihar / बिहार', '(d) Jharkhand / झारखंड'],
    correctOptionIndex: 3,
    explanation: 'The historical sweet Raskadam of Jharkhand received its official Geographical Indication protection certificate.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-438',
    text: 'Who was appointed as the new Director General of the Border Security Force (BSF) in mid-2026? / मध्य-2026 में सीमा सुरक्षा बल (BSF) के नए महानिदेशक के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Daljit Singh Chaudhary / दलजीत सिंह चौधरी', '(b) Nitin Agarwal / नितिन अग्रवाल', '(c) Rahul Rasgotra / राहुल रसगोत्रा', '(d) Sanjay Arora / संजय अरोड़ा'],
    correctOptionIndex: 0,
    explanation: 'IPS officer Daljit Singh Chaudhary took additional charge of Border Security Force (BSF) in 2026.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-439',
    text: 'Which city was ranked as the cleanest city of India in Swachh Survekshan 2026? / स्वच्छ सर्वेक्षण 2026 में भारत के किस शहर को सबसे स्वच्छ शहर का दर्जा दिया गया है?',
    options: ['(a) Indore and Surat (Joint) / इंदौर और सूरत (संयुक्त)', '(b) Navi Mumbai / नवी मुंबई', '(c) Mysuru / मैसूरु', '(d) Ahmedabad / अहमदाबाद'],
    correctOptionIndex: 0,
    explanation: 'Indore and Surat jointly secured the first rank for top-tier waste-recycling programs and public cleanliness indices.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-440',
    text: 'Which state is designated to host the 7th edition of the Khelo India Youth Games in late 2026? / 2026 के उत्तरार्ध में खेलो इंडिया यूथ गेम्स के 7वें संस्करण की मेजबानी के लिए किस राज्य को नामित किया गया है?',
    options: ['(a) Bihar / बिहार', '(b) Haryana / हरियाणा', '(c) Assam / असम', '(d) Odisha / ओडिशा'],
    correctOptionIndex: 0,
    explanation: 'The Sports Authority of India confirmed Bihar as the official host state for the mega Khelo India Youth games.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-441',
    text: 'Which island nation in the African region was officially certified as Malaria-Free by the World Health Organization (WHO) recently? / अफ्रीकी क्षेत्र के किस द्वीप राष्ट्र को हाल ही में विश्व स्वास्थ्य संगठन (WHO) द्वारा आधिकारिक तौर पर मलेरिया मुक्त प्रमाणित किया गया है?',
    options: ['(a) Cape Verde / केप वर्डे', '(b) Madagascar / मेडागास्कर', '(c) Mauritius / मॉरीशस', '(d) Seychelles / सेशेल्स'],
    correctOptionIndex: 0,
    explanation: 'Cape Verde became the third country in the WHO African region to eliminate malaria, joining Mauritius and Algeria.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-442',
    text: "India's first commercial hydrogen-powered train is scheduled to run trial routes in which state? / भारत की पहली वाणिज्यिक हाइड्रोजन संचालित ट्रेन का परीक्षण मार्ग किस राज्य में निर्धारित किया गया है?",
    options: ['(a) Haryana (Jind-Sonipat) / हरियाणा (जींद-सोनीपत)', '(b) Punjab / पंजाब', '(c) Himachal Pradesh / हिमाचल प्रदेश', '(d) Gujarat / गुजरात'],
    correctOptionIndex: 0,
    explanation: 'Indian Railways is preparing to run its first hydrogen train trial run on the Jind-Sonipat section in Haryana.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-443',
    text: 'Which country partnered with France to co-host the United Nations Ocean Conference in Nice? / नाइस में संयुक्त राष्ट्र महासागर सम्मेलन की सह-मेजबानी के लिए किस देश ने फ्रांस के साथ साझेदारी की है?',
    options: ['(a) Costa Rica / कोस्टा रिका', '(b) India / भारत', '(c) Canada / कनाडा', '(d) Portugal / पुर्तगाल'],
    correctOptionIndex: 0,
    explanation: 'France and Costa Rica joined hands to host the landmark UN Ocean Conference supporting ocean sustainability frameworks.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-444',
    text: 'What was India\'s score in the Global Hunger Index 2025-26? / वैश्विक भूख सूचकांक (Global Hunger Index) 2025-26 में भारत का क्या स्कोर रहा है?',
    options: ['(a) 28.7 (Serious) / 28.7 (गंभीर)', '(b) 15.4 (Moderate) / 15.4 (मध्यम)', '(c) 35.1 (Alarming) / 35.1 (चिंताजनक)', '(d) 9.8 (Low) / 9.8 (कम)'],
    correctOptionIndex: 0,
    explanation: 'India scored 28.7, placing it in the \'Serious\' category of hunger index metrics.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-445',
    text: "What is the name of India's car crash evaluation initiative designed to increase vehicle safety profiles? / वाहन सुरक्षा प्रोफाइल बढ़ाने के लिए डिज़ाइन की गई भारत की कार क्रैश मूल्यांकन पहल का नाम क्या है?",
    options: ['(a) Bharat NCAP / भारत एनसीएपी', '(b) Indian Auto-Safety Ratings / इंडियन ऑटो-सेफ्टी रेटिंग्स', '(c) Suraksha-NCAP / सुरक्षा-एनसीएपी', '(d) Vahan Rating Index / वाहन रेटिंग इंडेक्स'],
    correctOptionIndex: 0,
    explanation: 'The Bharat New Car Assessment Programme (Bharat NCAP) evaluates domestic car models and awards crash test safety stars.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-446',
    text: 'Which country hosted the Shanghai Cooperation Organisation (SCO) Council of Heads of State Summit in 2026? / किस देश ने 2026 में शंघाई सहयोग संगठन (SCO) राष्ट्राध्यक्षों की परिषद के शिखर सम्मेलन की मेजबानी की?',
    options: ['(a) Kazakhstan / कजाकिस्तान', '(b) Uzbekistan / उजबेकिस्तान', '(c) India / भारत', '(d) China / चीन'],
    correctOptionIndex: 0,
    explanation: 'Kazakhstan hosted the SCO Summit successfully in Astana, consolidating defense and logistical pacts.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-447',
    text: 'Which city was selected as the main venue for the National Youth Festival 2026 celebrations? / राष्ट्रीय युवा महोत्सव 2026 समारोह के मुख्य स्थल के रूप में किस शहर को चुना गया था?',
    options: ['(a) Nashik / नाशिक', '(b) Hubballi / हुबली', '(c) Raipur / रायपुर', '(d) Patna / पटना'],
    correctOptionIndex: 0,
    explanation: 'Nashik, Maharashtra hosted the grand opening of the National Youth Festival focusing on youth potential.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-448',
    text: "The world's tallest railway pier bridge is being constructed by Indian Railways in which state? / भारतीय रेलवे द्वारा दुनिया का सबसे ऊंचा रेलवे पियर ब्रिज (Railway Pier Bridge) किस राज्य में बनाया जा रहा है?",
    options: ['(a) Manipur / मणिपुर', '(b) Jammu & Kashmir / जम्मू और कश्मीर', '(c) Uttarakhand / उत्तराखंड', '(d) Arunachal Pradesh / अरुणाचल प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'The monumental bridge is being constructed across River Ijai in Noney district of Manipur, climbing 141 meters.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-449',
    text: 'Which state high court became the first in India to deploy a fully integrated "Digital Court" for tax disputes? / कर विवादों के लिए पूरी तरह से एकीकृत "डिजिटल कोर्ट" तैनात करने वाला भारत का पहला राज्य उच्च न्यायालय कौन सा बना?',
    options: ['(a) Kerala High Court / केरल उच्च न्यायालय', '(b) Gujarat High Court / गुजरात उच्च न्यायालय', '(c) Delhi High Court / दिल्ली उच्च न्यायालय', '(d) Bombay High Court / बंबई उच्च न्यायालय'],
    correctOptionIndex: 0,
    explanation: 'Kerala High Court launched its innovative smart e-court to process tax petitions without paper filing.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-450',
    text: 'What is India\'s ranking in the World Happiness Report 2026? / विश्व प्रसन्नता रिपोर्ट 2026 में भारत को कौन सा स्थान मिला है?',
    options: ['(a) 126th / 126वां', '(b) 136th / 136वां', '(c) 140th / 140वां', '(d) 115th / 115वां'],
    correctOptionIndex: 0,
    explanation: 'India continued to rank 126th globally in the United Nations Sustainable Development World Happiness indices.',
    date: '2026-07-09'
  },
  {
    id: 'ca-q-today-451',
    text: 'Which country did Prime Minister Narendra Modi visit in July 2026, marking a historic bilateral meeting with its President? / प्रधानमंत्री नरेंद्र मोदी ने जुलाई 2026 में किस देश का दौरा किया, जो वहां के राष्ट्रपति के साथ एक ऐतिहासिक द्विपक्षीय बैठक का प्रतीक है?',
    options: ['(a) Russia / रूस', '(b) Austria / ऑस्ट्रिया', '(c) Germany / जर्मनी', '(d) France / फ्रांस'],
    correctOptionIndex: 0,
    explanation: 'Prime Minister Narendra Modi visited Russia in July 2026 to strengthen special and privileged bilateral partnerships.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-452',
    text: 'What is the name of the new advanced stealth frigate launched by the Indian Navy under Project 17A in Mumbai? / मुंबई में प्रोजेक्ट 17A के तहत भारतीय नौसेना द्वारा लॉन्च किए गए नए उन्नत स्टील्थ फ्रिगेट का नाम क्या है?',
    options: ['(a) INS Vindhyagiri / आईएनएस विंध्यागिरी', '(b) INS Mahendragiri / आईएनएस महेंद्रगिरी', '(c) INS Taragiri / आईएनएस तारागिरी', '(d) INS Dunagiri / आईएनएस दूनागिरी'],
    correctOptionIndex: 1,
    explanation: 'INS Mahendragiri is the seventh and final stealth frigate of Project 17A launched for defense integration.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-453',
    text: 'As per the RBI\'s latest statement, India\'s foreign exchange reserves recently surged to cross which historic milestone? / आरबीआई के नवीनतम बयान के अनुसार, भारत का विदेशी मुद्रा भंडार हाल ही में किस ऐतिहासिक मील के पत्थर को पार कर गया है?',
    options: ['(a) $650 Billion / $650 बिलियन', '(b) $680 Billion / $680 बिलियन', '(c) $700 Billion / $700 बिलियन', '(d) $720 Billion / $720 बिलियन'],
    correctOptionIndex: 2,
    explanation: 'India\'s foreign exchange reserves achieved a historic high, crossing the $700 Billion mark due to foreign portfolio inflows.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-454',
    text: 'Who has won the ICC Men\'s T20 World Cup 2026 hosted jointly by India and Sri Lanka? / भारत और श्रीलंका द्वारा संयुक्त रूप से आयोजित आईसीसी पुरुष टी20 विश्व कप 2026 किसने जीता है?',
    options: ['(a) India / भारत', '(b) Australia / ऑस्ट्रेलिया', '(c) South Africa / दक्षिण अफ्रीका', '(d) England / इंग्लैंड'],
    correctOptionIndex: 0,
    explanation: 'India secured the championship title of the ICC Men\'s T20 World Cup 2026, defeating Australia in a thrilling final match.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-455',
    text: 'Where is the headquarters of the newly established Global Biofuels Alliance (GBA) proposed to be set up? / नव स्थापित ग्लोबल बायोफ्यूल एलायंस (GBA) का मुख्यालय कहाँ स्थापित करने का प्रस्ताव है?',
    options: ['(a) Gurugram, India / गुरुग्राम, भारत', '(b) Paris, France / पेरिस, फ्रांस', '(c) Geneva, Switzerland / जिनेवा, स्विट्जरलैंड', '(d) New York, USA / न्यूयॉर्क, यूएसए'],
    correctOptionIndex: 0,
    explanation: 'The Global Biofuels Alliance (GBA), initiated under India\'s G20 presidency, has proposed its secretarial headquarters in Gurugram, India.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-456',
    text: 'Who has been appointed as the new Chief Justice of India (CJI) in 2026 following the retirement of the previous CJI? / पिछले मुख्य न्यायाधीश की सेवानिवृत्ति के बाद 2026 में भारत के नए मुख्य न्यायाधीश (CJI) के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Justice Sanjiv Khanna / न्यायमूर्ति संजीव खन्ना', '(b) Justice B.R. Gavai / न्यायमूर्ति बी.आर. गवई', '(c) Justice Surya Kant / न्यायमूर्ति सूर्यकांत', '(d) Justice Hrishikesh Roy / न्यायमूर्ति ऋषिकेश रॉय'],
    correctOptionIndex: 0,
    explanation: 'Justice Sanjiv Khanna assumed office as the Chief Justice of India, bringing profound legal wisdom to the apex court.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-457',
    text: 'Which state government launched the "Gruh Jyothi" scheme to provide up to 200 units of free electricity per month? / किस राज्य सरकार ने प्रति माह 200 यूनिट तक मुफ्त बिजली प्रदान करने के लिए "गृह ज्योति" योजना शुरू की है?',
    options: ['(a) Karnataka / कर्नाटक', '(b) Telangana / तेलंगाना', '(c) Rajasthan / राजस्थान', '(d) Madhya Pradesh / मध्य प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'The Government of Karnataka successfully rolled out its flagship social welfare initiative \'Gruh Jyothi\'.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-458',
    text: 'What was the central theme of World Population Day celebrated on July 11, 2026? / 11 जुलाई 2026 को मनाए गए विश्व जनसंख्या दिवस का मुख्य विषय (Theme) क्या था?',
    options: ['(a) Unleashing the power of gender equality / लैंगिक समानता की शक्ति को उजागर करना', '(b) Leave no one behind, count everyone / किसी को पीछे न छोड़ें, हर किसी को गिनें', '(c) To leave no one behind, invest in sustainable development / सतत विकास में निवेश करें', '(d) Safeguarding rights of women and girls / महिलाओं और लड़कियों के अधिकारों की रक्षा करना'],
    correctOptionIndex: 1,
    explanation: 'The official theme for World Population Day 2026 is \'Leave no one behind, count everyone\', focusing on inclusive demographic data collection.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-459',
    text: 'The joint military exercise "Nomadic Elephant 2026" was conducted between India and which other country? / संयुक्त सैन्य अभ्यास "नोमैडिक एलीफेंट 2026" भारत और किस अन्य देश के बीच आयोजित किया गया था?',
    options: ['(a) Mongolia / मंगोलिया', '(b) Thailand / थाईलैंड', '(c) Kazakhstan / कजाकिस्तान', '(d) Vietnam / वियतनाम'],
    correctOptionIndex: 0,
    explanation: 'Nomadic Elephant is a bilateral joint military exercise conducted between the Indian Army and the Mongolian Armed Forces.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-460',
    text: 'Which state is the first in India to implement a comprehensive Digital Crop Survey across all agricultural districts? / कृषि जिलों में व्यापक डिजिटल फसल सर्वेक्षण (Digital Crop Survey) लागू करने वाला भारत का पहला राज्य कौन सा है?',
    options: ['(a) Uttar Pradesh / उत्तर प्रदेश', '(b) Madhya Pradesh / मध्य प्रदेश', '(c) Andhra Pradesh / आंध्र प्रदेश', '(d) Punjab / पंजाब'],
    correctOptionIndex: 0,
    explanation: 'Uttar Pradesh pioneered the full-scale implementation of the Digital Crop Survey to ensure accurate crop registries.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-461',
    text: 'Which nation clinched the prestigious UEFA Euro 2026 football championship? / किस देश ने प्रतिष्ठित यूईएफए यूरो 2026 फुटबॉल चैंपियनशिप का खिताब जीता है?',
    options: ['(a) Spain / स्पेन', '(b) England / इंग्लैंड', '(c) France / फ्रांस', '(d) Germany / जर्मनी'],
    correctOptionIndex: 0,
    explanation: 'Spain won the UEFA Euro 2026 football championship by defeating England in a stellar competitive display.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-462',
    text: 'Which team emerged as the champion of Copa America 2026? / कौन सी टीम कोपा अमेरिका 2026 की चैंपियन बनी है?',
    options: ['(a) Argentina / अर्जेंटीना', '(b) Colombia / कोलंबिया', '(c) Brazil / ब्राजील', '(d) Uruguay / उरुग्वे'],
    correctOptionIndex: 0,
    explanation: 'Argentina secured their continuous continental dominance by winning the Copa America 2026 tournament final.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-463',
    text: 'Which Indian shooter clinched the gold medal in the Men\'s 10m Air Rifle event at the ISSF World Cup 2026? / किस भारतीय निशानेबाज ने आईएसएसएफ विश्व कप 2026 में पुरुषों की 10 मीटर एयर राइफल स्पर्धा में स्वर्ण पदक जीता?',
    options: ['(a) Rudrankksh Patil / रुद्राक्ष पाटिल', '(b) Divyansh Singh Panwar / दिव्यांश सिंह पंवार', '(c) Abhinav Shaw / अभिनव शॉ', '(d) Arjun Babuta / अर्जुन बबूता'],
    correctOptionIndex: 0,
    explanation: 'Rudrankksh Patil delivered a spectacular performance to claim the gold medal in the Men\'s 10m Air Rifle category.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-464',
    text: 'Which district became the first in India to establish a localized, community-managed climate-resilient Seed Bank? / कौन सा जिला स्थानीय रूप से प्रबंधित जलवायु-अनुकूल बीज बैंक स्थापित करने वाला भारत का पहला जिला बन गया है?',
    options: ['(a) Mandla, MP / मण्डला, मध्य प्रदेश', '(b) Koraput, Odisha / कोरापुट, ओडिशा', '(c) Wayanad, Kerala / वायनाड, केरल', '(d) Solan, HP / सोलन, हिमाचल प्रदेश'],
    correctOptionIndex: 1,
    explanation: 'Koraput district in Odisha established a tribal community-led seed bank to safeguard local indigenous crop varieties from climate changes.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-465',
    text: 'The advanced radar satellite NISAR, scheduled for launching in late 2026, is a joint project of ISRO and which space agency? / 2026 के अंत में लॉन्च होने वाला उन्नत रडार उपग्रह "निसार" (NISAR) इसरो और किस अंतरिक्ष एजेंसी की संयुक्त परियोजना है?',
    options: ['(a) NASA / नासा', '(b) ESA / ईएसए', '(c) JAXA / जाक्सा', '(d) Roscosmos / रोस्कोस्मोस'],
    correctOptionIndex: 0,
    explanation: 'NISAR (NASA-ISRO Synthetic Aperture Radar) is a joint radar satellite project to study global environmental changes.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-466',
    text: 'What is India\'s global rank tier in the Global Cyber Security Index (GCI) 2026 published by the ITU? / आईटीयू (ITU) द्वारा प्रकाशित ग्लोबल साइबर सिक्योरिटी इंडेक्स (GCI) 2026 में भारत को किस वैश्विक रैंक श्रेणी में रखा गया है?',
    options: ['(a) Tier 1 (Role Model) / टियर 1 (रोल मॉडल)', '(b) Tier 2 / टियर 2', '(c) Tier 3 / टियर 3', '(d) Tier 4 / टियर 4'],
    correctOptionIndex: 0,
    explanation: 'India secured Tier 1 (Role Model) status in global cybersecurity rankings, highlighting robust legal and technical frameworks.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-467',
    text: 'Which country conferred its highest state honor, "The Order of Saint Andrew the Apostle," upon PM Narendra Modi in July 2026? / किस देश ने जुलाई 2026 में पीएम नरेंद्र मोदी को अपने सर्वोच्च राजकीय सम्मान "द ऑर्डर ऑफ सेंट एंड्रयू द एपोस्टल" से सम्मानित किया?',
    options: ['(a) Russia / रूस', '(b) France / फ्रांस', '(c) UAE / यूएई', '(d) Egypt / मिस्र'],
    correctOptionIndex: 0,
    explanation: 'Russia formally decorated PM Modi with its highest civilian award to recognize his outstanding contribution to bilateral relations.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-468',
    text: 'Which country recently signed the Instrument of Association to become the newest member of the International Solar Alliance (ISA)? / किस देश ने हाल ही में अंतर्राष्ट्रीय सौर गठबंधन (ISA) का नवीनतम सदस्य बनने के लिए एसोसिएशन के साधन पर हस्ताक्षर किए हैं?',
    options: ['(a) Spain / स्पेन', '(b) Chile / चिली', '(c) Romania / रोमानिया', '(d) Hungary / हंगरी'],
    correctOptionIndex: 2,
    explanation: 'Romania signed the ISA framework agreement, joining as an active member to expand clean solar energy infrastructure.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-469',
    text: 'What is the name of the portal launched by the Department of Telecommunications (DoT) to check active mobile connections registered in a citizen\'s name? / दूरसंचार विभाग (DoT) द्वारा किसी नागरिक के नाम पर पंजीकृत सक्रिय मोबाइल कनेक्शन की जांच करने के लिए शुरू किए गए पोर्टल का नाम क्या है?',
    options: ['(a) Sanchar Saathi / संचार साथी', '(b) Chakshu / चक्षु', '(c) TAFCOP / टैफकॉप', '(d) DigiLocker / डिजीलॉकर'],
    correctOptionIndex: 0,
    explanation: 'The \'Sanchar Saathi\' portal empowers citizens to strengthen mobile safety by tracking and blocking unauthorized SIM cards.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-470',
    text: 'Which country is hosting the Clean Energy Ministerial (CEM17) and Mission Innovation (MI-11) meetings in 2026? / कौन सा देश 2026 में स्वच्छ ऊर्जा मंत्रिस्तरीय (CEM17) और मिशन इनोवेशन (MI-11) बैठकों की मेजबानी कर रहा है?',
    options: ['(a) India / भारत', '(b) Brazil / ब्राजील', '(c) South Africa / दक्षिण अफ्रीका', '(d) Canada / कनाडा'],
    correctOptionIndex: 1,
    explanation: 'Brazil is hosting the G20 energy transition ministerial side-events along with CEM17 in 2026.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-471',
    text: 'What GDP growth rate has the IMF projected for India for the financial year 2026-27 in its latest World Economic Outlook? / अंतर्राष्ट्रीय मुद्रा कोष (IMF) ने अपने नवीनतम विश्व आर्थिक आउटलुक में वित्तीय वर्ष 2026-27 के लिए भारत की जीडीपी वृद्धि दर कितनी अनुमानित की है?',
    options: ['(a) 6.5%', '(b) 6.8%', '(c) 7.0%', '(d) 7.2%'],
    correctOptionIndex: 2,
    explanation: 'The IMF revised India\'s GDP growth projection upward to 7.0% for FY 2026-27, driven by robust domestic demand.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-472',
    text: 'Which historical ensemble from India was recently inscribed as a UNESCO World Heritage site? / भारत के किस ऐतिहासिक समूह को हाल ही में यूनेस्को (UNESCO) की विश्व विरासत स्थल सूची में शामिल किया गया है?',
    options: ['(a) Sacred Ensembles of the Hoysalas / होयसला के पवित्र मंदिर समूह', '(b) Maratha Military Landscapes / मराठा सैन्य परिदृश्य', '(c) Santiniketan / शांतिनिकेतन', '(d) Ramappa Temple / रामप्पा मंदिर'],
    correctOptionIndex: 1,
    explanation: 'The Maratha Military Landscapes of India, showcasing extraordinary fortification architecture, is the latest UNESCO addition.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-473',
    text: 'National Fish Farmers Day is observed annually on which date to recognize the contribution of fish farmers? / मछली पालकों के योगदान को मान्यता देने के लिए प्रतिवर्ष किस तिथि को राष्ट्रीय मत्स्य किसान दिवस मनाया जाता है?',
    options: ['(a) July 10 / 10 जुलाई', '(b) July 12 / 12 जुलाई', '(c) July 05 / 05 जुलाई', '(d) July 15 / 15 जुलाई'],
    correctOptionIndex: 0,
    explanation: 'National Fish Farmers Day is celebrated on July 10 to commemorate the success of induced breeding in fishes by Indian scientists.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-474',
    text: 'Which city topped the global ranks in the Global Startup Ecosystem Index 2026? / ग्लोबल स्टार्टअप इकोसिस्टम इंडेक्स 2026 में कौन सा शहर वैश्विक रैंकिंग में शीर्ष पर रहा?',
    options: ['(a) Silicon Valley (San Francisco) / सिलिकॉन वैली', '(b) London / लंदन', '(c) New York / न्यूयॉर्क', '(d) Beijing / बीएडस'],
    correctOptionIndex: 0,
    explanation: 'Silicon Valley maintained its clear lead as the top-ranked startup hub globally, with London and New York following.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-475',
    text: 'Which state became the first to declare "Common Jezebel" as its official state butterfly to promote biodiversity conservation? / जैव विविधता संरक्षण को बढ़ावा देने के लिए किस राज्य ने "कॉमन जेज़ेबेल" (Common Jezebel) को अपनी आधिकारिक राज्य तितली घोषित किया है?',
    options: ['(a) Himachal Pradesh / हिमाचल प्रदेश', '(b) Sikkim / सिक्किम', '(c) Goa / गोवा', '(d) Uttarakhand / उत्तराखंड'],
    correctOptionIndex: 0,
    explanation: 'Himachal Pradesh officially declared Common Jezebel as the state butterfly to boost ecological awareness.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-476',
    text: 'Which city in India inaugurated the first-ever fully AI-operated adaptive traffic management control system? / भारत के किस शहर में पहली बार पूर्णतः एआई-संचालित अनुकूलनीय यातायात प्रबंधन नियंत्रण प्रणाली का उद्घाटन किया गया?',
    options: ['(a) Bengaluru / बेंगलुरु', '(b) Pune / पुणे', '(c) Noida / नोएडा', '(d) Hyderabad / हैदराबाद'],
    correctOptionIndex: 1,
    explanation: 'Pune Smart City launched its fully automated AI traffic controller to ease peak-hour city road gridlocks dynamically.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-477',
    text: 'Who won the Wimbledon 2026 Women\'s Singles tennis title in London? / लंदन में विंबलडन 2026 महिला एकल टेनिस का खिताब किसने जीता है?',
    options: ['(a) Iga Swiatek / इगा स्विएटेक', '(b) Aryna Sabalenka / आर्यना सबालेंका', '(c) Coco Gauff / कोको गॉफ', '(d) Elena Rybakina / एलेना रयबाकिना'],
    correctOptionIndex: 0,
    explanation: 'Poland\'s tennis champion Iga Swiatek secured her historic maiden Wimbledon singles title, defeating her opponent.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-478',
    text: 'Which country has been selected as the focus country for the upcoming 57th International Film Festival of India (IFFI) in Goa? / गोवा में आगामी 57वें भारतीय अंतर्राष्ट्रीय फिल्म महोत्सव (IFFI) के लिए किस देश को फोकस देश के रूप में चुना गया है?',
    options: ['(a) Japan / जापान', '(b) Australia / ऑस्ट्रेलिया', '(c) United Kingdom / यूनाइटेड किंगडम', '(d) France / फ्रांस'],
    correctOptionIndex: 1,
    explanation: 'Australia has been designated as the focus country for IFFI, enhancing cultural and media co-production partnerships.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-479',
    text: 'Which Indian Institute of Technology (IIT) pioneered opening India\'s first-ever offshore campus in Zanzibar, Tanzania? / किस भारतीय प्रौद्योगिकी संस्थान (IIT) ने जंजीबार, तंजानिया में भारत का पहला विदेशी परिसर खोलकर इतिहास रचा है?',
    options: ['(a) IIT Madras / आईआईटी मद्रास', '(b) IIT Delhi / आईआईटी दिल्ली', '(c) IIT Bombay / आईआईटी बॉम्बे', '(d) IIT Kanpur / आईआईटी कानपुर'],
    correctOptionIndex: 0,
    explanation: 'IIT Madras led the landmark initiative of setting up India\'s first international offshore campus in Zanzibar.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-480',
    text: 'What is India\'s global rank in the latest World Digital Competitiveness Ranking released by IMD? / आईएमडी (IMD) द्वारा जारी नवीनतम विश्व डिजिटल प्रतिस्पर्धात्मकता रैंकिंग में भारत का वैश्विक स्थान कौन सा है?',
    options: ['(a) 42nd / 42वां', '(b) 49th / 49वां', '(c) 55th / 55वां', '(d) 38th / 38वां'],
    correctOptionIndex: 1,
    explanation: 'India achieved the 49th position in the World Digital Competitiveness index, showing strong strides in tech knowledge.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-481',
    text: 'Which country is hosting the G20 Leaders\' Summit in the year 2026? / वर्ष 2026 में कौन सा देश जी20 (G20) राष्ट्राध्यक्षों के शिखर सम्मेलन की मेजबानी कर रहा है?',
    options: ['(a) South Africa / दक्षिण अफ्रीका', '(b) Brazil / ब्राजील', '(c) USA / यूएसए', '(d) Saudi Arabia / सऊदी अरब'],
    correctOptionIndex: 2,
    explanation: 'The United States of America (USA) is designated to hold the G20 presidency and host the Leaders\' Summit in 2026.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-482',
    text: 'Which city has been officially confirmed to host the 2026 Commonwealth Games under a scaled-back model? / किस शहर को आधिकारिक तौर पर 2026 राष्ट्रमंडल खेलों (Commonwealth Games) की मेजबानी के लिए घोषित किया गया है?',
    options: ['(a) Glasgow, Scotland / ग्लासगो, स्कॉटलैंड', '(b) Victoria, Australia / विक्टोरिया, ऑस्ट्रेलिया', '(c) Birmingham, UK / बर्मिंघम, यूके', '(d) Auckland, NZ / ऑकलैंड, न्यूजीलैंड'],
    correctOptionIndex: 0,
    explanation: 'Glasgow, Scotland has stepped in to host a compact, cost-effective model of the Commonwealth Games in 2026.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-483',
    text: 'What is the name of India\'s heavy communication satellite scheduled for launch on a SpaceX Falcon-9 rocket? / स्पेसएक्स फाल्कन-9 रॉकेट पर लॉन्च के लिए निर्धारित भारत के भारी संचार उपग्रह का नाम क्या है?',
    options: ['(a) GSAT-20 (GSAT-N2) / जीसैट-20', '(b) GSAT-30 / जीसैट-30', '(c) EOS-08 / ईओएस-08', '(d) INSAT-3DS / इनसैट-3डीएस'],
    correctOptionIndex: 0,
    explanation: 'GSAT-N2 (GSAT-20) is a high-throughput communication satellite launched to provide high-speed broadband services.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-484',
    text: 'Which city is being developed as India\'s first model solar-powered and green-hydrogen fueled city? / किस शहर को भारत के पहले मॉडल सौर-ऊर्जा संचालित और हरित-हाइड्रोजन ईंधन वाले शहर के रूप में विकसित किया जा रहा है?',
    options: ['(a) Sanchi, MP / सांची, मध्य प्रदेश', '(b) Ayodhya, UP / अयोध्या, उत्तर प्रदेश', '(c) Diu, UT / दीव', '(d) Leh, Ladakh / लेह, लद्दाख'],
    correctOptionIndex: 1,
    explanation: 'Ayodhya in Uttar Pradesh is undergoing rapid infrastructural transformations to emerge as a flagship solar and clean-energy city.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-485',
    text: 'According to the Central Board of Direct Taxes (CBDT), India\'s net direct tax collections registered what percentage growth recently? / केंद्रीय प्रत्यक्ष कर बोर्ड (CBDT) के अनुसार, हाल ही में भारत के शुद्ध प्रत्यक्ष कर संग्रह में कितने प्रतिशत की वृद्धि दर्ज की गई है?',
    options: ['(a) 15.4% / 15.4 प्रतिशत', '(b) 18.2% / 18.2 प्रतिशत', '(c) 20.6% / 20.6 प्रतिशत', '(d) 22.4% / 22.4 प्रतिशत'],
    correctOptionIndex: 1,
    explanation: 'Net direct tax collections witnessed robust growth of 18.2% year-on-year, reflecting economic growth and taxpayers compliance.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-486',
    text: 'Which country is joining India, USA, Japan, and Australia for the maritime naval Exercise Malabar 2026? / समुद्री नौसैनिक अभ्यास \'मालाबार 2026\' में भारत, अमेरिका, जापान और ऑस्ट्रेलिया के साथ कौन सा देश शामिल हो रहा है?',
    options: ['(a) United Kingdom / यूनाइटेड किंगडम', '(b) Canada / कनाडा', '(c) France / फ्रांस', '(d) New Zealand / न्यूजीलैंड'],
    correctOptionIndex: 0,
    explanation: 'The United Kingdom is participating as an observer and active naval unit in Malabar 2026 to strengthen Indo-Pacific security.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-487',
    text: 'Which became the first state in India to pass the historic Minimum Guaranteed Income Bill to ensure social security? / सामाजिक सुरक्षा सुनिश्चित करने के लिए ऐतिहासिक न्यूनतम गारंटीकृत आय विधेयक पारित करने वाला भारत का पहला राज्य कौन सा बना?',
    options: ['(a) Rajasthan / राजस्थान', '(b) Chhattisgarh / छत्तीसगढ़', '(c) Kerala / केरल', '(d) Tamil Nadu / तमिलनाडु'],
    correctOptionIndex: 0,
    explanation: 'Rajasthan assembly passed the Minimum Guaranteed Income Bill, guaranteeing employment and social security pensions.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-488',
    text: 'At which place in India was the world\'s largest modern meditation centre, Swarved Mahamandir, inaugurated? / भारत में किस स्थान पर विश्व के सबसे बड़े आधुनिक ध्यान केंद्र \'स्वर्वेद महामंदिर\' का उद्घाटन किया गया था?',
    options: ['(a) Varanasi, UP / वाराणसी, उत्तर प्रदेश', '(b) Haridwar, Uttarakhand / हरिद्वार, उत्तराखंड', '(c) Pune, Maharashtra / पुणे, महाराष्ट्र', '(d) Indore, MP / इंदौर, मध्य प्रदेश'],
    correctOptionIndex: 0,
    explanation: 'Swarved Mahamandir, a state-of-the-art spiritual and meditation center housing over 20,000 practitioners, was opened in Varanasi.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-489',
    text: 'Who has been appointed as the new Chairman of the Securities and Exchange Board of India (SEBI)? / भारतीय प्रतिभूति और विनिमय बोर्ड (SEBI) के नए अध्यक्ष के रूप में किसे नियुक्त किया गया है?',
    options: ['(a) Ashwani Bhatia / अश्विनी भाटिया', '(b) Kamlesh Chandra Varshney / कमलेश चंद्र वार्ष्णेय', '(c) Ananth Narayan G / अनंत नारायण जी', '(d) S. Krishnan / एस. कृष्णन'],
    correctOptionIndex: 1,
    explanation: 'Kamlesh Chandra Varshney was appointed to lead key regulatory frameworks at the market watchdog SEBI.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-490',
    text: 'Which state hosted the mega national-level India International Science Festival (IISF) 2026? / किस राज्य ने भव्य राष्ट्रीय स्तर के भारत अंतर्राष्ट्रीय विज्ञान महोत्सव (IISF) 2026 की मेजबानी की है?',
    options: ['(a) Haryana / हरियाणा', '(b) Goa / गोवा', '(c) West Bengal / पश्चिम बंगाल', '(d) Maharashtra / महाराष्ट्र'],
    correctOptionIndex: 0,
    explanation: 'The grand India International Science Festival (IISF) was successfully hosted in Faridabad, Haryana to popularize science.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-491',
    text: 'The bilateral military joint exercise "Maitree 2026" was conducted between India and which other country? / द्विपदेशीय सैन्य संयुक्त अभ्यास "मैत्री 2026" भारत और किस अन्य देश के बीच आयोजित किया गया था?',
    options: ['(a) Thailand / थाईलैंड', '(b) Malaysia / मलेशिया', '(c) Bangladesh / बांग्लादेश', '(d) Nepal / नेपाल'],
    correctOptionIndex: 0,
    explanation: 'Exercise Maitree is a bilateral army tactical training program conducted between the Indian Army and Royal Thai Army.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-492',
    text: 'According to the World Bank\'s latest financial classifications, India\'s economy is classified in which category? / विश्व बैंक के नवीनतम वित्तीय वर्गीकरण के अनुसार, भारत की अर्थव्यवस्था को किस श्रेणी में वर्गीकृत किया गया है?',
    options: ['(a) Low-Income / निम्न-आय', '(b) Lower-Middle Income / निम्न-मध्यम आय', '(c) Upper-Middle Income / उच्च-मध्यम आय', '(d) High-Income / उच्च-आय'],
    correctOptionIndex: 1,
    explanation: 'India remains classified in the Lower-Middle Income category based on gross national income (GNI) per capita.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-493',
    text: 'Which state became the first in India to introduce a dedicated Gau Cabinet and set up modern cow sanctuaries? / कौन सा राज्य समर्पित गौ कैबिनेट (Gau Cabinet) शुरू करने और आधुनिक गाय अभयारण्य स्थापित करने वाला भारत का पहला राज्य बना?',
    options: ['(a) Madhya Pradesh / मध्य प्रदेश', '(b) Uttar Pradesh / उत्तर प्रदेश', '(c) Rajasthan / राजस्थान', '(d) Haryana / हरियाणा'],
    correctOptionIndex: 0,
    explanation: 'Madhya Pradesh pioneered the set up of Gau Cabinet to promote protection and welfare of indigenous cattle.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-494',
    text: 'What is the name of the deep sea manned scientific submersible vehicle designed under India\'s Deep Ocean Mission? / भारत के डीप ओशन मिशन (Deep Ocean Mission) के तहत डिजाइन किए गए गहरे समुद्र में मानवयुक्त वैज्ञानिक सबमर्सिबल वाहन का नाम क्या है?',
    options: ['(a) Matsya 6000 / मत्स्य 6000', '(b) Samudra 3000 / समुद्र 3000', '(c) Varuna 5000 / वरुण 5000', '(d) Sagar 8000 / सागर 8000'],
    correctOptionIndex: 0,
    explanation: 'Matsya 6000 is the indigenous manned submersible designed by NIOT to descend 6,000 meters into deep waters.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-495',
    text: 'Which country launched the world\'s first fully wooden satellite named "LignoSat" into space to test sustainable materials? / किस देश ने टिकाऊ सामग्रियों का परीक्षण करने के लिए अंतरिक्ष में "लिग्नोसैट" (LignoSat) नामक दुनिया का पहला पूरी तरह से लकड़ी का उपग्रह लॉन्च किया?',
    options: ['(a) Japan / जापान', '(b) USA / यूएसए', '(c) Finland / फिनलैंड', '(d) China / चीन'],
    correctOptionIndex: 0,
    explanation: 'Kyoto University and Sumitomo Forestry in Japan developed LignoSat, a wooden satellite launched via SpaceX flight.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-496',
    text: 'Which organization launched "Project Udbhav" to integrate ancient Indian strategic wisdom with modern military arts? / आधुनिक सैन्य कला के साथ प्राचीन भारतीय रणनीतिक ज्ञान को एकीकृत करने के लिए किस संगठन ने "प्रोजेक्ट उद्भव" (Project Udbhav) शुरू किया?',
    options: ['(a) Indian Army / भारतीय सेना', '(b) DRDO / डीआरडीओ', '(c) ISRO / इसरो', '(d) Ministry of Defence / रक्षा मंत्रालय'],
    correctOptionIndex: 0,
    explanation: 'Project Udbhav was initiated by the Indian Army in collaboration with the United Service Institution of India (USI).',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-497',
    text: 'What is the name of the official digital currency launched by the Reserve Bank of India (RBI)? / भारतीय रिजर्व बैंक (RBI) द्वारा शुरू की गई आधिकारिक डिजिटल मुद्रा का नाम क्या है?',
    options: ['(a) e-Rupee (e\u20b9) / ई-रुपया', '(b) DigiRupee / डिजीरुपया', '(c) BharatCoin / भारतकॉइन', '(d) r-Rupee / आर-रुपया'],
    correctOptionIndex: 0,
    explanation: 'The Central Bank Digital Currency (CBDC) issued by the RBI is officially branded as the Digital Rupee or e-Rupee (e\u20b9).',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-498',
    text: 'India\'s first officially designated Dark Sky Reserve is located in which union territory? / भारत का पहला आधिकारिक रूप से नामित डार्क स्काई रिजर्व (Dark Sky Reserve) किस केंद्र शासित प्रदेश में स्थित है?',
    options: ['(a) Ladakh / लद्दाख', '(b) Jammu & Kashmir / जम्मू और कश्मीर', '(c) Andaman & Nicobar / अंडमान और निकोबार', '(d) Lakshadweep / लक्षद्वीप'],
    correctOptionIndex: 0,
    explanation: 'The Hanle Dark Sky Reserve is situated in the Changthang Wildlife Sanctuary in Ladakh, promoting astro-tourism.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-499',
    text: 'According to the Global Peace Index 2026, which country was ranked as the most peaceful nation in the world? / ग्लोबल पीस इंडेक्स 2026 के अनुसार, किस देश को दुनिया का सबसे शांतिपूर्ण देश घोषित किया गया?',
    options: ['(a) Iceland / आइसलैंड', '(b) Denmark / डेनवार्क', '(c) Ireland / आयरलैंड', '(d) New Zealand / न्यूजीलैंड'],
    correctOptionIndex: 0,
    explanation: 'Iceland maintained its top-most position as the most peaceful nation globally, a rank it has held since 2008.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-500',
    text: 'What is the name of the indigenous twin-engine multi-role helicopter being designed by HAL for the Indian Armed Forces? / भारतीय सशस्त्र बलों के लिए एचएएल (HAL) द्वारा डिजाइन जा रहे स्वदेशी जुड़वां इंजन वाले बहु-भूमिका हेलीकॉप्टर का नाम क्या है?',
    options: ['(a) IMRH / आईएमआरएच', '(b) LUH / एलयूएच', '(c) LCH Prachand / एलसीएच प्रचंड', '(d) ALH Dhruv / एएलएच ध्रुव'],
    correctOptionIndex: 0,
    explanation: 'The Indian Multi-Role Helicopter (IMRH) is a heavy-lift tactical transport rotorcraft designed by HAL.',
    date: '2026-07-12'
  },
  {
    id: 'ca-q-today-501',
    text: 'Which space agency successfully launched the GSAT-32 communication satellite aboard the LVM3 rocket on July 13, 2026? / किस अंतरिक्ष एजेंसी ने 13 जुलाई 2026 को LVM3 रॉकेट के जरिए GSAT-32 संचार उपग्रह का सफल प्रक्षेपण किया है?',
    options: ['(a) NASA / नासा', '(b) ESA / ईएसए', '(c) JAXA / जाक्सा', '(d) ISRO / इसरो'],
    correctOptionIndex: 3,
    explanation: 'The Indian Space Research Organisation (ISRO) successfully launched the advanced GSAT-32 communication satellite from Sriharikota.',
    date: '2026-07-13'
  },
  {
    id: 'ca-q-today-502',
    text: 'The National Industrial Corridor Development Programme recently approved the construction of how many new industrial smart cities? / राष्ट्रीय औद्योगिक कॉरिडोर विकास कार्यक्रम ने हाल ही में कितने नए औद्योगिक स्मार्ट शहरों के निर्माण को मंजूरी दी है?',
    options: ['(a) 8 / 8', '(b) 10 / 10', '(c) 12 / 12', '(d) 15 / 15'],
    correctOptionIndex: 2,
    explanation: 'The CCEA chaired by PM Narendra Modi approved the development of 12 world-class industrial smart cities across India.',
    date: '2026-07-13'
  },
  {
    id: 'ca-q-today-503',
    text: 'Which Indian city is chosen to host the prestigious Global Climate Action Summit in November 2026? / नवंबर 2026 में प्रतिष्ठित ग्लोबल क्लाइमेट Action Summit की मेजबानी के लिए किस भारतीय शहर को चुना गया है?',
    options: ['(a) New Delhi / नई दिल्ली', '(b) Mumbai / मुंबई', '(c) Bengaluru / बेंगलुरु', '(d) Chennai / चेन्नई'],
    correctOptionIndex: 2,
    explanation: 'Bengaluru was officially selected as the host city for the Global Climate Action Summit 2026 to focus on smart cities and green tech.',
    date: '2026-07-13'
  },
  {
    id: 'ca-q-today-504',
    text: 'What is the maximum endurance demonstrated by DRDO\'s indigenous UAV Tapas during its medium-altitude trials? / डीआरडीओ के स्वदेशी यूएवी तपस ने अपने मध्यम ऊंचाई वाले परीक्षणों के दौरान अधिकतम कितने घंटे की निरंतर उड़ान प्रदर्शित की है?',
    options: ['(a) 12 hours / 12 घंटे', '(b) 18 hours / 18 घंटे', '(c) 24 hours / 24 घंटे', '(d) 30 hours / 30 घंटे'],
    correctOptionIndex: 1,
    explanation: 'TAPAS-BH-201 UAV successfully demonstrated a continuous 18-hour endurance carrying multi-sensor intelligence payloads.',
    date: '2026-07-13'
  },
  {
    id: 'ca-q-today-505',
    text: 'Who has been honored with the prestigious European Essay Prize 2026 for lifetime achievements in essays and environmental justice? / निबंध और पर्यावरण न्याय में जीवन भर की उपलब्धियों के लिए किसे प्रतिष्ठित यूरोपीय निबंध पुरस्कार 2026 से सम्मानित किया गया है?',
    options: ['(a) Geetanjali Shree / गीतांजलि श्री', '(b) Arundhati Roy / अरुंधति रॉय', '(c) Jhumpa Lahiri / झुंपा लाहिड़ी', '(d) Salman Rushdie / सलमान रुश्दी'],
    correctOptionIndex: 1,
    explanation: 'Eminent Indian writer Arundhati Roy was awarded the European Essay Prize 2026 in Geneva, Switzerland.',
    date: '2026-07-13'
  }
];

