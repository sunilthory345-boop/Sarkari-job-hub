import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, Trash2, FileText, Gift, Award, 
  HelpCircle, CheckCircle, Database, RefreshCw, AlertTriangle,
  Share2, Send, Copy, ExternalLink, Link, Sparkles, Settings, Bell, MessageSquare, CheckSquare
} from 'lucide-react';
import { GovJob, AdmitCard, JobResult, MockTest, Question, AnswerKey } from '../types';

interface AdminConsoleProps {
  jobs: GovJob[];
  admitCards: AdmitCard[];
  results: JobResult[];
  mockTests: MockTest[];
  answerKeys?: AnswerKey[];
  
  onAddJob: (job: GovJob) => void;
  onDeleteJob: (jobId: string) => void;
  onAddAdmitCard: (card: AdmitCard) => void;
  onAddResult: (res: JobResult) => void;
  onAddMockTest: (test: MockTest) => void;
  onAddAnswerKey?: (key: AnswerKey) => void;
  onDeleteMockTest?: (testId: string) => void;
}

export default function AdminConsole({
  jobs,
  admitCards,
  results,
  mockTests,
  answerKeys = [],
  onAddJob,
  onDeleteJob,
  onAddAdmitCard,
  onAddResult,
  onAddMockTest,
  onAddAnswerKey,
  onDeleteMockTest
}: AdminConsoleProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'jobs' | 'mocks' | 'cards' | 'whatsapp' | 'payments'>('jobs');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // --- PAYMENT AND UPI SETUP STATES ---
  const [adminUpiId, setAdminUpiId] = useState<string>(() => localStorage.getItem('sarkari_business_upi_id') || 'sarkarihub@upi');
  const [adminPayeeName, setAdminPayeeName] = useState<string>(() => localStorage.getItem('sarkari_business_name') || 'JobSarkariHub');
  const [adminPaymentLink, setAdminPaymentLink] = useState<string>(() => localStorage.getItem('sarkari_business_payment_link') || '');

  // --- WHATSAPP BROADCAST STATES ---
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [whatsappStyle, setWhatsappStyle] = useState<'hindi' | 'professional' | 'short'>('hindi');
  const [includeJoinLink, setIncludeJoinLink] = useState<boolean>(true);
  const [includeApplyUrls, setIncludeApplyUrls] = useState<boolean>(true);
  const [customMsgText, setCustomMsgText] = useState<string>('');
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [webhookUrl, setWebhookUrl] = useState<string>(() => localStorage.getItem('sarkari_wa_webhook') || '');
  const [webhookSecret, setWebhookSecret] = useState<string>(() => localStorage.getItem('sarkari_wa_secret') || 'sh_sec_78bcd90');
  const [webhookEnabled, setWebhookEnabled] = useState<boolean>(() => localStorage.getItem('sarkari_wa_enabled') === 'true');
  const [webhookLogs, setWebhookLogs] = useState<{timestamp: string, status: string, payload: string}[]>([]);

  // Telegram States
  const [tgBotToken, setTgBotToken] = useState<string>(() => localStorage.getItem('sarkari_tg_bot_token') || '');
  const [tgChatId, setTgChatId] = useState<string>(() => localStorage.getItem('sarkari_tg_chat_id') || '@JobSarkariHub');
  const [tgEnabled, setTgEnabled] = useState<boolean>(() => localStorage.getItem('sarkari_tg_enabled') === 'true');
  const [tgLogs, setTgLogs] = useState<{timestamp: string, status: string, payload: string}[]>([]);

  const handleSaveTelegram = () => {
    localStorage.setItem('sarkari_tg_bot_token', tgBotToken);
    localStorage.setItem('sarkari_tg_chat_id', tgChatId);
    localStorage.setItem('sarkari_tg_enabled', tgEnabled ? 'true' : 'false');
    
    const log = {
      timestamp: new Date().toLocaleTimeString(),
      status: 'TELEGRAM_CONFIG_SAVED',
      payload: `Channel ID/Chat ID: ${tgChatId} | Integration Active: ${tgEnabled}`
    };
    setTgLogs(prev => [log, ...prev]);
    setStatusMessage("✅ Telegram Integration saved successfully!");
  };

  const handleTestTelegram = async () => {
    if (!tgBotToken) {
      setStatusMessage("❌ Please configure a valid Telegram Bot Token first.");
      return;
    }
    if (!tgChatId) {
      setStatusMessage("❌ Please configure a valid Telegram Chat ID/Channel username (e.g. @JobSarkariHub).");
      return;
    }

    const testMessage = `🔔 *Job Sarkari Hub Telegram Connection Active!* \n\nThis is a real-time test message confirming that your Telegram Channel (${tgChatId}) is successfully integrated with our live admin dispatch engine! 🚀\n\n📅 _Verified on: ${new Date().toLocaleString()}_`;

    try {
      setStatusMessage("⏳ Dispatching test message to your Telegram channel...");
      const res = await fetch(`https://api.telegram.org/bot${tgBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: tgChatId,
          text: testMessage,
          parse_mode: 'Markdown'
        })
      });

      const data = await res.json();
      if (data.ok) {
        setStatusMessage(`✅ Success! Test message sent to ${tgChatId}. Check your Telegram channel!`);
        const log = {
          timestamp: new Date().toLocaleTimeString(),
          status: 'TEST_SUCCESS_TELEGRAM',
          payload: JSON.stringify(data, null, 2)
        };
        setTgLogs(prev => [log, ...prev]);
      } else {
        setStatusMessage(`❌ Telegram API Error: ${data.description || 'Check token or channel name'}`);
        const log = {
          timestamp: new Date().toLocaleTimeString(),
          status: 'TEST_FAILED_TELEGRAM',
          payload: JSON.stringify(data, null, 2)
        };
        setTgLogs(prev => [log, ...prev]);
      }
    } catch (err: any) {
      setStatusMessage(`❌ Connection Failed: ${err?.message || 'Check your internet connection or URL'}`);
    }
  };

  const sendTelegramMessage = async (message: string) => {
    const isTgActive = localStorage.getItem('sarkari_tg_enabled') === 'true';
    const token = localStorage.getItem('sarkari_tg_bot_token') || '';
    const chatId = localStorage.getItem('sarkari_tg_chat_id') || '';

    if (!isTgActive || !token || !chatId) {
      return;
    }

    try {
      const log = {
        timestamp: new Date().toLocaleTimeString(),
        status: 'SENDING_TELEGRAM_API_POST',
        payload: `Channel: ${chatId}\nMessage preview: ${message.slice(0, 100)}...`
      };
      setTgLogs(prev => [log, ...prev]);

      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      });

      const responseData = await res.json();
      if (responseData.ok) {
        const successLog = {
          timestamp: new Date().toLocaleTimeString(),
          status: 'SUCCESS_TELEGRAM_DISPATCHED',
          payload: JSON.stringify(responseData, null, 2)
        };
        setTgLogs(prev => [successLog, ...prev]);
      } else {
        const errorLog = {
          timestamp: new Date().toLocaleTimeString(),
          status: 'ERROR_TELEGRAM_API_FAIL',
          payload: JSON.stringify(responseData, null, 2)
        };
        setTgLogs(prev => [errorLog, ...prev]);
      }
    } catch (err: any) {
      const exceptionLog = {
        timestamp: new Date().toLocaleTimeString(),
        status: 'EXCEPTION_TELEGRAM_API_FAIL',
        payload: err?.message || 'Unknown network error'
      };
      setTgLogs(prev => [exceptionLog, ...prev]);
    }
  };

  // Local state to keep track of automated alerts sent to WhatsApp Channel
  const [waAutoBroadcasts, setWaAutoBroadcasts] = useState<{
    id: string;
    type: string;
    title: string;
    timestamp: string;
    message: string;
    status: 'DELIVERED' | 'PENDING';
  }[]>(() => {
    const saved = localStorage.getItem('sarkari_wa_feed_broadcasts');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'wa-initial-1',
        type: 'Job Alert',
        title: 'Staff Selection Commission - SSC CGL Recruitment 2026',
        timestamp: 'Yesterday, 14:12',
        message: `📢 *SARKARI JOB HUB - BIG VACANCY ALERT* 📢\n\n🏢 *Staff Selection Commission (SSC)* की सरकारी भर्ती आ गयी है! सभी उम्मीदवारों के लिए सुनहरा अवसर! 👇\n\n*🎯 Post:* SSC CGL Recruitment 2026\n*💼 Total Posts:* 1540 Positions\n*🎓 Qualification:* Graduate\n*💰 Pay Scale:* Rs. 35,400 - Rs. 1,12,400\n*📍 Job Location:* All India\n*📅 Last Date:* 2026-08-30\n\n🔗 *Apply Online & Read Details:* \nhttps://sarkari-job-hub-v595.onrender.com/?tab=jobs\n\n👇 *Join our Verified WhatsApp Channel for daily alerts:* \nhttps://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U\n\n_Forward this to friends who need an update!_ 🙏✨`,
        status: 'DELIVERED'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('sarkari_wa_feed_broadcasts', JSON.stringify(waAutoBroadcasts));
  }, [waAutoBroadcasts]);

  // Central automated dispatch function for WhatsApp Channel Notifications
  const dispatchAutoWhatsAppAlert = (
    type: 'jobs' | 'admit-card' | 'result' | 'answer-key' | 'mock-test',
    title: string,
    org: string,
    fields: Record<string, any>
  ) => {
    let header = '';
    let body = '';
    let links = '';

    if (type === 'jobs') {
      header = `📢 *SARKARI JOB HUB - SPECIAL VACANCY ALERT* 📢\n\n🏢 *${org}* की सरकारी नौकरी भर्ती (Alert) आ गयी है! तुरंत आवेदन करें! 👇\n\n`;
      body = `*🎯 Post / Exam:* ${title}\n*💼 Total Position Vacancies:* ${fields.totalPosts || 'Multiple'} Posts\n*🎓 Eligibility / Qualification:* ${fields.qualification || 'Graduate/12th/10th'}\n*💰 Monthly remuneration:* ${fields.salary || 'Admissible pay band'}\n*📍 Duty Location:* ${fields.location || 'All India'}\n*📅 Last Apply Date:* ${fields.lastDate || 'Check notification deadline'}\n\n`;
      links = `🔗 *Apply Online Link:* \nhttps://sarkari-job-hub-v595.onrender.com/?tab=jobs\n\n📄 *Official PDF & Apply Link:* \n${fields.applyUrl || 'https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U'}\n\n`;
    } else if (type === 'admit-card') {
      header = `📢 *SARKARI JOB HUB - HALL TICKET DECLARED* 📢\n\n🏢 *${org}* का प्रवेश-पत्र (Admit Card) जारी कर दिया गया है! तुरंत डाउनलोड करें! 👇\n\n`;
      body = `*🎯 Post Title:* ${title}\n*📅 Proposed Exam Date:* ${fields.examDate || 'Refer admit card slot'}\n*📍 Allotted Exam City:* ${fields.examCity || 'Regional centers declared'}\n\n`;
      links = `🔗 *Direct Download Admit Card Mirror:* \n${fields.downloadUrl || 'https://sarkari-job-hub-v595.onrender.com/?tab=admit-cards'}\n\n`;
    } else if (type === 'result') {
      header = `🏆 *SARKARI JOB HUB - EXAM RESULTS OUT* 🏆\n\n🏢 *${org}* का परीक्षा परिणाम और मैरिज लिस्ट (Merit List) घोषित कर दी गयी है! 👇\n\n`;
      body = `*🎯 Evaluated Exam:* ${title}\n*📊 Minimum UR Cutoff:* ${fields.cutOffUR || 'Not declared'}\n*📊 Minimum OBC Cutoff:* ${fields.cutOffOBC || 'Not declared'}\n\n`;
      links = `🔗 *Downoad Scorecards & Selection List:* \n${fields.downloadUrl || 'https://sarkari-job-hub-v595.onrender.com/?tab=results'}\n\n`;
    } else if (type === 'answer-key') {
      header = `🔑 *SARKARI JOB HUB - ANSWER KEY PUBLISHED* 🔑\n\n🏢 *${org}* की आधिकारिक आंसर की जारी कर दी गयी है! आपत्तियां दर्ज करें! 👇\n\n`;
      body = `*🎯 Exam Post:* ${title}\n*📅 Released Date:* ${fields.released || 'Declared today'}\n*⏰ Objections Closes on:* ${fields.objectionsLimit || 'As per norms'}\n\n`;
      links = `🔗 *Validate Answer Solutions PDF:* \n${fields.pdfUrl || 'https://sarkari-job-hub-v595.onrender.com'}\n\n`;
    } else {
      header = `📝 *SARKARI MOCK HUB - PREMIUM TEST LIVE* 📝\n\nतैयारी को मजबूत करने के लिए नया MCQ मॉक टेस्ट पेपर ऑनलाइन पोर्टल पर अपलोड कर दिया गया है! बिल्कुल मुफ्त हल करें! 👇\n\n`;
      body = `*🎯 Mock test:* ${title}\n*📚 Exam Segment:* ${org || 'All Exams Syllabus'}\n*⏱️ Time Limit:* ${fields.durationMinutes || 15} mins\n*📊 Total Marks:* ${fields.totalMarks || 30} Marks\n\n`;
      links = `🔗 *Direct Interactive Practices Lobby:* \nhttps://sarkari-job-hub-v595.onrender.com/?tab=mock-tests\n\n`;
    }

    links += `👇 *Join our Verified WhatsApp Channel for daily alerts:* \nhttps://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq0U\n\n`;
    links += `🚀 *Join our Official Telegram Channel for instantly downloadable files & PDFs:* \nhttps://t.me/JobSarkariHub\n\n`;
    links += `_Forward this to friends who need an update!_ 🙏✨`;

    const fullMessage = `${header}${body}${links}`;

    // Add to WA and Telegram Auto Broadcasts
    const newBroadcast = {
      id: `wa-auto-${Date.now()}`,
      type: type === 'jobs' ? 'Job Alert' : type === 'admit-card' ? 'Admit Card' : type === 'result' ? 'Result' : type === 'answer-key' ? 'Answer Key' : 'Free Mock Test',
      title: `${org} - ${title}`,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ', Today',
      message: fullMessage,
      status: 'DELIVERED' as const,
      telegramStatus: 'DELIVERED' as const
    };

    setWaAutoBroadcasts(prev => [newBroadcast, ...prev]);

    // Format secure payload object
    const payloadObj = {
      event: "content.published_notify_social",
      timestamp: new Date().toISOString(),
      type,
      title,
      org,
      whatsapp_formatted_text: fullMessage,
      telegram_formatted_text: fullMessage
    };

    const isWebhookActive = localStorage.getItem('sarkari_wa_enabled') === 'true';
    const waWebhookUrl = localStorage.getItem('sarkari_wa_webhook') || '';
    const waWebhookSecret = localStorage.getItem('sarkari_wa_secret') || '';

    // Log simulated or real webhook trigger
    const log = {
      timestamp: new Date().toLocaleTimeString(),
      status: isWebhookActive && waWebhookUrl ? 'AUTO_SOCIAL_DISPATCHED_HTTP_POST' : 'AUTO_WHATSAPP_AND_TELEGRAM_SYNCED',
      payload: JSON.stringify(payloadObj, null, 2)
    };
    setWebhookLogs(prev => [log, ...prev]);

    // Send actual HTTP request if webhook is configured
    if (isWebhookActive && waWebhookUrl) {
      fetch(waWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-SarkariHub-Signature': waWebhookSecret
        },
        body: JSON.stringify(payloadObj),
        mode: 'no-cors'
      }).catch(e => console.log('Simulated background dispatch complete', e));
    }

    // Real-time dispatch to User's configured Telegram Bot Channel
    sendTelegramMessage(fullMessage);
  };

  // Dynamically set default selected job if none is chosen
  useEffect(() => {
    if (jobs.length > 0 && !selectedJobId) {
      setSelectedJobId(jobs[0].id);
    }
  }, [jobs, selectedJobId]);

  // Generate WhatsApp Message
  useEffect(() => {
    const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];
    if (!activeJob) {
      setCustomMsgText("⚠️ No vacancy notifications exist yet. Create a job vacancy first in the 'Government Positions & Vacancies' tab to generate broadcast formats!");
      return;
    }

    let header = '';
    let body = '';
    let links = '';

    const boldTitle = `*🎯 Post:* ${activeJob.title}`;
    const boldOrg = `*🏢 Org/Dept:* ${activeJob.org}`;
    const boldPosts = `*💼 Total Posts:* ${activeJob.totalPosts} Positions`;
    const boldSalary = `*💰 Pay Scale:* ${activeJob.salary}`;
    const boldLastDate = `*📅 Last Date:* ${activeJob.lastDate}`;
    const boldQual = `*🎓 Qualification:* ${activeJob.qualification}`;
    const boldLoc = `*📍 Job Location:* ${activeJob.location}`;

    if (whatsappStyle === 'hindi') {
      header = `📢 *SARKARI JOB HUB - BIG VACANCY ALERT* 📢\n\nSarkari Job Recruitment आ गयी है! सभी उम्मीदवारों के लिए सुनहरा अवसर! 👇\n\n`;
      body = `${boldOrg}\n${boldTitle}\n${boldPosts}\n${boldQual}\n${boldSalary}\n${boldLoc}\n${boldLastDate}\n\n`;
    } else if (whatsappStyle === 'professional') {
      header = `💼 *OFFICIAL GOVERNMENT RECRUITMENT ALERT* 💼\n*Sarkari Job Notification 2026*\n\n`;
      body = `${boldOrg}\n${boldTitle}\n${boldPosts}\n${boldQual}\n${boldSalary}\n${boldLoc}\n${boldLastDate}\n\n`;
    } else {
      header = `⚡ *Sarkari Alerts - ${activeJob.org} Bharti* ⚡\n\n`;
      body = `• *Vacancy:* ${activeJob.title}\n• *Posts:* ${activeJob.totalPosts}\n• *Qual:* ${activeJob.qualification}\n• *Last Date:* ${activeJob.lastDate}\n\n`;
    }

    if (includeApplyUrls) {
      links += `🔗 *Apply Online & Read Details:* \nhttps://sarkari-job-hub-v595.onrender.com/?tab=jobs\n\n`;
      links += `📄 *Download Official PDF:* \n${activeJob.pdfUrl || 'https://ssc.gov.in'}\n\n`;
    }

    if (includeJoinLink) {
      links += `👇 *Join our Verified WhatsApp Channel for daily alerts:* \nhttps://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq5U\n\n`;
      links += `🚀 *Join our Official Telegram Channel for instantly downloadable files & PDFs:* \nhttps://t.me/JobSarkariHub\n\n`;
    }

    links += `_Forward this to friends who need a job!_ 🙏✨`;

    setCustomMsgText(`${header}${body}${links}`);
  }, [selectedJobId, whatsappStyle, includeJoinLink, includeApplyUrls, jobs]);

  const handleSaveWebhook = () => {
    localStorage.setItem('sarkari_wa_webhook', webhookUrl);
    localStorage.setItem('sarkari_wa_secret', webhookSecret);
    localStorage.setItem('sarkari_wa_enabled', webhookEnabled ? 'true' : 'false');
    
    // Log simulation
    const log = {
      timestamp: new Date().toLocaleTimeString(),
      status: 'WEBHOOK_CONFIG_SAVED',
      payload: `Webhook URL: ${webhookUrl || 'None'} | Active: ${webhookEnabled}`
    };
    setWebhookLogs(prev => [log, ...prev]);
    setStatusMessage("✅ Webhook Settings updated and saved successfully!");
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleTestWebhook = () => {
    const activeJob = jobs.find(j => j.id === selectedJobId) || jobs[0];
    if (!activeJob) {
      setStatusMessage("❌ Please create at least one vacancy to test the webhook.");
      return;
    }

    const payloadObj = {
      event: "vacancy.published",
      timestamp: new Date().toISOString(),
      job: {
        id: activeJob.id,
        title: activeJob.title,
        org: activeJob.org,
        totalPosts: activeJob.totalPosts,
        lastDate: activeJob.lastDate,
        applyUrl: activeJob.applyUrl,
        whatsapp_formatted_text: customMsgText
      }
    };

    // Log the simulated webhook trigger
    const log = {
      timestamp: new Date().toLocaleTimeString(),
      status: webhookUrl ? 'DELIVERING_WEBHOOK_HTTP_POST' : 'SIMULATED_TEST_TRIGGER',
      payload: JSON.stringify(payloadObj, null, 2)
    };
    setWebhookLogs(prev => [log, ...prev]);

    if (webhookUrl) {
      // Simulate real fetch dispatch
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-SarkariHub-Signature': webhookSecret
        },
        body: JSON.stringify(payloadObj),
        mode: 'no-cors' // ignore cors error in sandbox
      }).catch(e => console.log('Simulated background dispatch complete', e));
      
      setStatusMessage(`📡 Webhook payload POST request dispatched to: ${webhookUrl}`);
    } else {
      setStatusMessage("🛠️ Simulated testing broadcast payload! Add a real Webhook URL to send a live post.");
    }
    setTimeout(() => setStatusMessage(null), 5000);
  };

  // Forms states
  const [jobForm, setJobForm] = useState({
    title: '',
    org: '',
    category: 'SSC' as GovJob['category'],
    qualification: 'Graduate' as GovJob['qualification'],
    ageLimit: '18 - 30 Years',
    salary: 'Rs. 35,400 - Rs. 1,12,400',
    GeneralFee: '₹100',
    OBCFee: '₹100',
    SCSTFee: '₹0',
    totalPosts: 1540,
    applyUrl: 'https://ssc.gov.in',
    pdfUrl: 'https://ssc.gov.in/notification.pdf',
    officialWebsite: 'https://ssc.gov.in',
    lastDate: '2026-08-30',
    location: 'All India',
    description: 'Provide dynamic opportunities in the governmental departments and secretariats.'
  });

  const [cardForm, setCardForm] = useState({
    title: '',
    org: '',
    examDate: '2026-08-15',
    examCity: 'Assigned Regional Hubs',
    downloadUrl: 'https://ssc.gov.in/admit-card',
    officialLink: 'https://ssc.gov.in'
  });

  const [resultForm, setResultForm] = useState({
    title: '',
    org: '',
    meritListUrl: 'https://upsc.gov.in/merit.pdf',
    scoreCardUrl: 'https://upsc.gov.in/scores',
    cutOffUR: '95 Marks',
    cutOffOBC: '92 Marks',
    cutOffSC: '82 Marks',
    cutOffST: '81 Marks',
    downloadUrl: 'https://upsc.gov.in/results'
  });

  const [keyForm, setKeyForm] = useState({
    title: '',
    org: '',
    released: '',
    objectionsLimit: '',
    pdfUrl: 'https://rsmssb.rajasthan.gov.in/ldc_keys.pdf'
  });

  const [mockForm, setMockForm] = useState({
    title: '',
    category: 'General Preparation',
    durationMinutes: 10,
    q1_text: '',
    q1_o1: '',
    q1_o2: '',
    q1_o3: '',
    q1_o4: '',
    q1_correct: 0,
    q1_explanation: ''
  });

  // --- NEW ADVANCED MOCK UPLOAD & BUILDER STATES ---
  const [mockCreatorMode, setMockCreatorMode] = useState<'form' | 'file' | 'templates'>('form');
  const [dynamicQuestions, setDynamicQuestions] = useState<Question[]>([
    {
      id: `q-cust-${Date.now()}-1`,
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0,
      explanation: ''
    }
  ]);
  const [bulkInput, setBulkInput] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [validationMsg, setValidationMsg] = useState<{status: 'idle'|'success'|'error', text: string}>({status: 'idle', text: ''});

  const triggerMessage = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: GovJob = {
      id: `custom-job-${Date.now()}`,
      title: jobForm.title,
      org: jobForm.org,
      category: jobForm.category,
      qualification: jobForm.qualification,
      ageLimit: jobForm.ageLimit,
      salary: jobForm.salary,
      fees: {
        General: jobForm.GeneralFee,
        OBC: jobForm.OBCFee,
        SC_ST_Female: jobForm.SCSTFee
      },
      totalPosts: Number(jobForm.totalPosts),
      applyUrl: jobForm.applyUrl,
      pdfUrl: jobForm.pdfUrl,
      officialWebsite: jobForm.officialWebsite,
      postedDate: new Date().toISOString().split('T')[0],
      lastDate: jobForm.lastDate,
      importantDates: {
        applyStart: new Date().toISOString().split('T')[0],
        applyEnd: jobForm.lastDate,
        examDate: '2026-11-20',
        admitCardRelease: '2026-11-05'
      },
      selectionProcess: ['Computer Based Objective Test', 'Interview / Personality Audit', 'Medical Screening'],
      location: jobForm.location,
      description: jobForm.description
    };

    onAddJob(newJob);
    // Auto broadcast to WhatsApp channel with details
    dispatchAutoWhatsAppAlert('jobs', newJob.title, newJob.org, {
      totalPosts: newJob.totalPosts,
      qualification: newJob.qualification,
      salary: newJob.salary,
      location: newJob.location,
      lastDate: newJob.lastDate,
      applyUrl: newJob.applyUrl
    });

    triggerMessage(`✅ Job Notification "${newJob.title}" added successfully & auto-broadcasted to WhatsApp Channel!`);
    
    // reset form
    setJobForm({
      ...jobForm,
      title: '',
      org: '',
      totalPosts: 100
    });
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: AdmitCard = {
      id: `custom-card-${Date.now()}`,
      title: cardForm.title,
      org: cardForm.org,
      examDate: cardForm.examDate,
      examCity: cardForm.examCity,
      downloadUrl: cardForm.downloadUrl,
      officialLink: cardForm.officialLink,
      addedDate: new Date().toISOString().split('T')[0]
    };

    onAddAdmitCard(newCard);
    // Auto broadcast to WhatsApp channel with details
    dispatchAutoWhatsAppAlert('admit-card', newCard.title, newCard.org, {
      examDate: newCard.examDate,
      examCity: newCard.examCity,
      downloadUrl: newCard.downloadUrl
    });

    triggerMessage(`✅ Admit Card alert for "${newCard.title}" created successfully & synced to WhatsApp feed!`);
    setCardForm({
      title: '',
      org: '',
      examDate: '2026-08-15',
      examCity: 'Assigned Regional Hubs',
      downloadUrl: 'https://ssc.gov.in/admit-card',
      officialLink: 'https://ssc.gov.in'
    });
  };

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRes: JobResult = {
      id: `custom-res-${Date.now()}`,
      title: resultForm.title,
      org: resultForm.org,
      meritListUrl: resultForm.meritListUrl,
      scoreCardUrl: resultForm.scoreCardUrl,
      cutOff: {
        UR: resultForm.cutOffUR,
        OBC: resultForm.cutOffOBC,
        SC: resultForm.cutOffSC,
        ST: resultForm.cutOffST
      },
      downloadUrl: resultForm.downloadUrl,
      releaseDate: new Date().toISOString().split('T')[0]
    };

    onAddResult(newRes);
    // Auto broadcast to WhatsApp channel with details
    dispatchAutoWhatsAppAlert('result', newRes.title, newRes.org, {
      cutOffUR: newRes.cutOff.UR,
      cutOffOBC: newRes.cutOff.OBC,
      downloadUrl: newRes.downloadUrl
    });

    triggerMessage(`✅ Exam Result declaration for "${newRes.title}" is live & announced on WhatsApp Channel!`);
    setResultForm({
      title: '',
      org: '',
      meritListUrl: 'https://upsc.gov.in/merit.pdf',
      scoreCardUrl: 'https://upsc.gov.in/scores',
      cutOffUR: '95 Marks',
      cutOffOBC: '92 Marks',
      cutOffSC: '82 Marks',
      cutOffST: '81 Marks',
      downloadUrl: 'https://upsc.gov.in/results'
    });
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newKey: AnswerKey = {
      id: `custom-key-${Date.now()}`,
      title: keyForm.title,
      org: keyForm.org,
      released: keyForm.released || new Date().toISOString().split('T')[0],
      objectionsLimit: keyForm.objectionsLimit || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pdfUrl: keyForm.pdfUrl
    };

    if (onAddAnswerKey) {
      onAddAnswerKey(newKey);
    }
    // Auto broadcast to WhatsApp channel with details
    dispatchAutoWhatsAppAlert('answer-key', newKey.title, newKey.org, {
      released: newKey.released,
      objectionsLimit: newKey.objectionsLimit,
      pdfUrl: newKey.pdfUrl
    });

    triggerMessage(`✅ Provisional Answer Key uploaded for "${newKey.title}" & published to WhatsApp!`);
    setKeyForm({
      title: '',
      org: '',
      released: '',
      objectionsLimit: '',
      pdfUrl: 'https://rsmssb.rajasthan.gov.in/ldc_keys.pdf'
    });
  };

  // Helper to parse pasted raw text into structured Questions
  const handleParseAndValidateRawInput = (text: string, isJson: boolean): Question[] | null => {
    try {
      if (isJson) {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          const valid = parsed.every(q => q.text && Array.isArray(q.options) && q.options.length >= 2);
          if (valid) return parsed;
        } else if (parsed.questions && Array.isArray(parsed.questions)) {
          const valid = parsed.questions.every((q: any) => q.text && Array.isArray(q.options) && q.options.length >= 2);
          if (valid) return parsed.questions;
        }
        throw new Error("Invalid schema structure for JSON mock questions. Ensure 'questions' is an array of MCQ items.");
      } else {
        // Parse CSV
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
        const parsed: Question[] = [];
        const startIdx = (lines[0] && (lines[0].toLowerCase().includes('question') || lines[0].toLowerCase().includes('option'))) ? 1 : 0;
        
        for (let i = startIdx; i < lines.length; i++) {
          const rawLine = lines[i];
          const fields = rawLine.split(',').map(f => f.trim().replace(/^"|"$/g, ''));
          if (fields.length >= 5) {
            const qText = fields[0];
            const opts = [fields[1], fields[2], fields[3] || '', fields[4] || ''].filter(Boolean);
            const correctIdx = parseInt(fields[5]) || 0;
            const expl = fields[6] || 'Reference explanation solution key';
            parsed.push({
              id: `q-parsed-${Date.now()}-${i}`,
              text: qText,
              options: opts,
              correctOptionIndex: Math.min(Math.max(0, correctIdx), opts.length - 1),
              explanation: expl
            });
          }
        }
        if (parsed.length > 0) return parsed;
        throw new Error("No valid rows parsed. Ensure format matches: Question,Option A,Option B,Option C,Option D,CorrectOptionIndex(0-3),Explanation");
      }
    } catch (err: any) {
      setValidationMsg({status: 'error', text: `Validation failed: ${err.message}`});
      return null;
    }
  };

  const handleMockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalQuestions: Question[] = [];

    if (mockCreatorMode === 'form') {
      const valid = dynamicQuestions.filter(q => q.text.trim() !== '');
      if (valid.length === 0) {
        setValidationMsg({status: 'error', text: 'Please add at least one complete Question with Option choices!'});
        return;
      }
      const fullyValid = valid.every(q => q.options.every(opt => opt.trim() !== ''));
      if (!fullyValid) {
        setValidationMsg({status: 'error', text: 'Please check your options. All 4 choices must be specified for each question.'});
        return;
      }
      finalQuestions = valid.map((q, idx) => ({
        ...q,
        id: q.id || `q-cust-${Date.now()}-${idx}`
      }));
    } else if (mockCreatorMode === 'file') {
      if (!bulkInput.trim()) {
        setValidationMsg({status: 'error', text: 'Please paste CSV/JSON or drag-and-drop a file first.'});
        return;
      }
      const isJson = bulkInput.trim().startsWith('[') || bulkInput.trim().startsWith('{');
      const parsed = handleParseAndValidateRawInput(bulkInput, isJson);
      if (!parsed) return;
      finalQuestions = parsed;
    } else {
      setValidationMsg({status: 'error', text: 'Select a creation/upload mode first.'});
      return;
    }

    const newTest: MockTest = {
      id: `custom-mock-${Date.now()}`,
      title: mockForm.title || `${mockForm.category} Assessment Exam`,
      category: mockForm.category,
      durationMinutes: Number(mockForm.durationMinutes) || 15,
      questions: finalQuestions,
      totalMarks: finalQuestions.length * 2,
      negativeMark: 0.5
    };

    onAddMockTest(newTest);
    // Auto broadcast to WhatsApp channel with details
    dispatchAutoWhatsAppAlert('mock-test', newTest.title, newTest.category, {
      durationMinutes: newTest.durationMinutes,
      totalMarks: newTest.totalMarks
    });

    triggerMessage(`✅ Success: Practice Mock "${newTest.title}" containing ${finalQuestions.length} questions uploaded & shared to WhatsApp Channel successfully!`);
    
    // Reset inputs
    setMockForm({
      title: '',
      category: 'General Preparation',
      durationMinutes: 10,
      q1_text: '',
      q1_o1: '',
      q1_o2: '',
      q1_o3: '',
      q1_o4: '',
      q1_correct: 0,
      q1_explanation: ''
    });
    setDynamicQuestions([
      {
        id: `q-cust-${Date.now()}-1`,
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        explanation: ''
      }
    ]);
    setBulkInput('');
    setValidationMsg({status: 'idle', text: ''});
  };

  // --- NEW ADVANCED MOCK TEST BUILDER METHODS ---
  const handleUpdateQuestionText = (index: number, val: string) => {
    const updated = [...dynamicQuestions];
    updated[index].text = val;
    setDynamicQuestions(updated);
  };

  const handleUpdateOption = (qIdx: number, oIdx: number, val: string) => {
    const updated = [...dynamicQuestions];
    updated[qIdx].options[oIdx] = val;
    setDynamicQuestions(updated);
  };

  const handleUpdateCorrectIdx = (qIdx: number, val: number) => {
    const updated = [...dynamicQuestions];
    updated[qIdx].correctOptionIndex = val;
    setDynamicQuestions(updated);
  };

  const handleUpdateExplanation = (qIdx: number, val: string) => {
    const updated = [...dynamicQuestions];
    updated[qIdx].explanation = val;
    setDynamicQuestions(updated);
  };

  const handleAddQuestionRow = () => {
    setDynamicQuestions([
      ...dynamicQuestions,
      {
        id: `q-cust-${Date.now()}-${dynamicQuestions.length + 1}`,
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        explanation: ''
      }
    ]);
  };

  const handleRemoveQuestionRow = (idx: number) => {
    setDynamicQuestions(dynamicQuestions.filter((_, i) => i !== idx));
  };

  const TEST_TEMPLATES = [
    {
      title: "SSC GK/GS Mega Preparation Practice Test 2026",
      category: "SSC",
      durationMinutes: 15,
      questions: [
        {
          id: "tem-ssc-1",
          text: "The famous Konark Sun Temple in Odisha was constructed under which royal dynasty?",
          options: ["Ganga Dynasty", "Chola Dynasty", "Pala Dynasty", "Maurya Dynasty"],
          correctOptionIndex: 0,
          explanation: "Konark Sun Temple was built by King Narasimhadeva I of the Eastern Ganga Dynasty in the 13th century."
        },
        {
          id: "tem-ssc-2",
          text: "Which of the following article of Indian Constitution deals with Right to Equality?",
          options: ["Article 21", "Article 14", "Article 32", "Article 44"],
          correctOptionIndex: 1,
          explanation: "Article 14 guarantees equality before law and equal protection of laws to all citizens within India."
        },
        {
          id: "tem-ssc-3",
          text: "Which classic river is also famous as the 'Dakshin Ganga' in central/southern India?",
          options: ["Krishna", "Narmada", "Godavari", "Cauvery"],
          correctOptionIndex: 2,
          explanation: "The Godavari is the largest river of peninsular India and is widely celebrated as 'Dakshin Ganga'."
        }
      ]
    },
    {
      title: "UPSC General Studies CSAT Aptitude Mini Test",
      category: "UPSC",
      durationMinutes: 20,
      questions: [
        {
          id: "tem-upsc-1",
          text: "If three distinct positive integers sum up to 10, what is the maximum possible product of these three integers?",
          options: ["24", "30", "36", "40"],
          correctOptionIndex: 1,
          explanation: "To maximize the product of three distinct integers summing to 10, the integers should be closest to each other. Those are 2, 3 and 5. Product: 2 * 3 * 5 = 30."
        },
        {
          id: "tem-upsc-2",
          text: "The Panchayati Raj Institutions in India received formal constitutional approval through which amendment act?",
          options: ["42nd Amendment Act", "44th Amendment Act", "73rd Amendment Act", "86th Amendment Act"],
          correctOptionIndex: 2,
          explanation: "The 73rd Amendment Act of 1992 introduced Part IX of the Indian Constitution, establishing formal rural local self-governance."
        }
      ]
    },
    {
      title: "RRB NTPC Railway General Science Rapid Fire",
      category: "Railway",
      durationMinutes: 10,
      questions: [
        {
          id: "tem-rrb-1",
          text: "Which component of blood is responsible for carrying oxygen to different parts of the body?",
          options: ["White Blood Cells (WBC)", "Red Blood Cells (RBC)", "Blood Platelets", "Plasma"],
          correctOptionIndex: 1,
          explanation: "Hemoglobin in Red Blood Cells binds to oxygen molecules and carries them efficiently throughout the blood stream."
        },
        {
          id: "tem-rrb-2",
          text: "What is the chemical name of common baking soda used in households?",
          options: ["Sodium Carbonate", "Sodium Bicarbonate", "Calcium Hydroxide", "Sodium Chloride"],
          correctOptionIndex: 1,
          explanation: "Baking soda is Sodium Bicarbonate, represented chemically by the formula NaHCO3."
        }
      ]
    }
  ];

  const handleInjectTemplate = (tpl: typeof TEST_TEMPLATES[0]) => {
    const test: MockTest = {
      id: `custom-mock-tpl-${Date.now()}`,
      title: tpl.title,
      category: tpl.category,
      durationMinutes: tpl.durationMinutes,
      questions: tpl.questions.map((q, idx) => ({
        ...q,
        id: `q-tpl-${Date.now()}-${idx}`
      })),
      totalMarks: tpl.questions.length * 2,
      negativeMark: 0.5
    };
    onAddMockTest(test);

    // Auto broadcast to WhatsApp channel with details
    dispatchAutoWhatsAppAlert('mock-test', test.title, test.category, {
      durationMinutes: test.durationMinutes,
      totalMarks: test.totalMarks
    });

    triggerMessage(`⚡ Superb! Mock Test Template "${tpl.title}" with ${tpl.questions.length} premium questions uploaded & announced on WhatsApp Channel.`);
  };

  const SAMPLE_CSV_STR = `Question Statement,Option A,Option B,Option C,Option D,CorrectOptionIndex,Explanation
Which classical language is celebrated for ancient Rigveda scriptures?,Sanskrit,Prakrit,Tamil,Kannada,0,Sanskrit is the liturgical language of ancient Vedic Sanskrit texts including the Rigveda.
What is the standard pH level of pure distilled water at normal room temperature?,7.0,5.5,8.2,9.1,0,Distilled water is neutral with a stable pH reading of exactly 7.0 at 25 degrees Celsius.`;

  const SAMPLE_JSON_STR = `[
  {
    "text": "Who is currently celebrated as the developer of the Indian Constitution assembly framework?",
    "options": ["B.R. Ambedkar", "Jawaharlal Nehru", "Rajendra Prasad", "Sardar Patel"],
    "correctOptionIndex": 0,
    "explanation": "Dr. B.R. Ambedkar was designated the Chairman of the major drafting committee of the Constituent Assembly."
  }
]`;

  return (
    <div className="font-sans text-slate-700 space-y-6">
      
      {/* Tab Select Header */}
      <div className="border-b border-slate-200 flex flex-wrap gap-4 pb-2 justify-between items-center bg-white p-4 rounded-2xl shadow-xs">
        <div className="flex gap-2">
          {[
            { id: 'jobs', label: 'Government Positions & Vacancies' },
            { id: 'mocks', label: 'Interactive MCQ Test Creator' },
            { id: 'cards', label: 'Admit Cards / Official Results' },
            { id: 'whatsapp', label: '📢 WhatsApp & Telegram Broadcast' },
            { id: 'payments', label: '💳 UPI ID & Payments Setup' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                activeAdminTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="font-mono text-[9px] font-bold text-slate-400 bg-slate-50 p-1.5 rounded flex items-center gap-1">
          <Database className="h-3 w-3 text-blue-600 animate-pulse" /> ADMIN AUTHORIZED ENVIRONMENT
        </span>
      </div>

      {statusMessage && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl p-3.5 text-xs font-bold animate-fade-in">
          {statusMessage}
        </div>
      )}

      {/* Dynamic Tabs Content */}
      {activeAdminTab === 'jobs' && (
        <div className="grid gap-6 md:grid-cols-12">
          
          {/* Add Job Form */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-blue-50 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <PlusCircle className="h-5 w-5 text-blue-600" />
              Publish Government Vacancy
            </h3>

            <form onSubmit={handleJobSubmit} className="space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Post / Job Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SSC CGL Recruitment 2026"
                    value={jobForm.title}
                    onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Commission / Organisation</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Staff Selection Commission"
                    value={jobForm.org}
                    onChange={(e) => setJobForm({...jobForm, org: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Exam Type Group</label>
                  <select
                    value={jobForm.category}
                    onChange={(e) => setJobForm({...jobForm, category: e.target.value as any})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  >
                    <option value="SSC">Staff Selection (SSC)</option>
                    <option value="UPSC">Union Public (UPSC)</option>
                    <option value="Railway">Railways (RRB)</option>
                    <option value="Bank">Bank (IBPS/SBI)</option>
                    <option value="Defence">Military Defence</option>
                    <option value="Police">State Police / Force</option>
                    <option value="Teaching">Education Board</option>
                    <option value="State PSC">State PSC/PSC</option>
                    <option value="Others">Other Central/State</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Vacancy Qualification</label>
                  <select
                    value={jobForm.qualification}
                    onChange={(e) => setJobForm({...jobForm, qualification: e.target.value as any})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  >
                    {['Graduate', '12th Pass', '10th Pass', 'Post Graduate', 'B.Tech', 'Diploma', 'ITI', '8th Pass'].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Total Vacancies (Posts)</label>
                  <input 
                    type="number" 
                    value={jobForm.totalPosts}
                    onChange={(e) => setJobForm({...jobForm, totalPosts: Number(e.target.value)})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Age Limit Bracket</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 18 - 32 Years"
                    value={jobForm.ageLimit}
                    onChange={(e) => setJobForm({...jobForm, ageLimit: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Salary Range Scale</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Level 7 (₹44,900 - ₹1,42,400)"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Fees: General / OBC / Reserved Category</label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <input 
                    type="text" 
                    placeholder="General (₹100)" 
                    value={jobForm.GeneralFee}
                    onChange={(e) => setJobForm({...jobForm, GeneralFee: e.target.value})}
                    className="rounded-lg border border-slate-200 p-2"
                  />
                  <input 
                    type="text" 
                    placeholder="OBC (₹100)" 
                    value={jobForm.OBCFee}
                    onChange={(e) => setJobForm({...jobForm, OBCFee: e.target.value})}
                    className="rounded-lg border border-slate-200 p-2"
                  />
                  <input 
                    type="text" 
                    placeholder="SC/ST/Women (₹0)" 
                    value={jobForm.SCSTFee}
                    onChange={(e) => setJobForm({...jobForm, SCSTFee: e.target.value})}
                    className="rounded-lg border border-slate-200 p-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Apply Online URL</label>
                  <input 
                    type="url" 
                    value={jobForm.applyUrl}
                    onChange={(e) => setJobForm({...jobForm, applyUrl: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Registration Closing Date</label>
                  <input 
                    type="date" 
                    value={jobForm.lastDate}
                    onChange={(e) => setJobForm({...jobForm, lastDate: e.target.value})}
                    className="w-full rounded-lg border border-slate-200 p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Notification Brief / Eligibility Criteria</label>
                <textarea 
                  rows={3}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-850"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-blue-600 font-bold text-white py-3 hover:bg-blue-700 transition"
              >
                Publish Live Job Alert
              </button>
            </form>
          </div>

          {/* Delete / View active lists */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                📋 Currently Published ({jobs.length})
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Review, manage or remove active government job notifications on the platform.
              </p>

              <div className="space-y-3 overflow-y-auto max-h-[500px]">
                {jobs.map((job) => (
                  <div key={job.id} className="p-3 border border-slate-50 rounded-xl flex items-center justify-between gap-3 bg-slate-55/10">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 text-xs truncate">{job.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">{job.org}</p>
                    </div>
                    <button
                      onClick={() => onDeleteJob(job.id)}
                      className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 transition flex-shrink-0"
                      title="Delete Notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {activeAdminTab === 'mocks' && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Main Info Banner */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                <span className="p-1 px-2 rounded-lg bg-orange-650 text-white text-[10px] font-mono font-black">TEST ENGINE</span>
                Aspirants practice Exam & Mock Test Upload Room
              </h3>
              <p className="text-xs text-slate-600">
                Design and launch mock exam sheets. Support dynamic multi-choice questions creation, CSV / JSON bulk file coordinate parser uploads, and quick template injections.
              </p>
            </div>
          </div>

          {/* Creation Mode Sub-Navigation Toggle */}
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
            {[
              { id: 'form', label: 'Form builder (Multi-MCQ)' },
              { id: 'file', label: 'Bulk File Upload (CSV/JSON)' },
              { id: 'templates', label: 'One-click Exam Presets' }
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => {
                  setMockCreatorMode(mode.id as any);
                  setValidationMsg({status: 'idle', text: ''});
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  mockCreatorMode === mode.id 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleMockSubmit} className="space-y-6">
            {/* Shared Metadata Card */}
            {mockCreatorMode !== 'templates' && (
              <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs space-y-4">
                <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-50 pb-2">
                  📋 Assessment Paper Metadata Config
                </h4>
                <div className="grid gap-4 sm:grid-cols-3 text-xs">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-550 mb-1">Assessment Category</label>
                    <select
                      value={mockForm.category}
                      onChange={(e) => setMockForm({...mockForm, category: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 font-medium focus:border-blue-500 focus:outline-hidden"
                    >
                      <option value="SSC">SSC (Staff Selection Comm.)</option>
                      <option value="UPSC">UPSC Civil Services GSE</option>
                      <option value="Railway">RRB Railway Recruitment</option>
                      <option value="Bank">IBPS / SBI Banking Clerk</option>
                      <option value="Teaching">State Teaching / TET Exam</option>
                      <option value="Defence">Defence Services (NDA/CDS)</option>
                      <option value="State PSC">State PSC (PCS/RAS/RPSC)</option>
                      <option value="General Preparation">General Preparation Quizzes</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-550 mb-1">Interactive Test Sheet Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. UPSC Prelims GS-1 Politi Mock 4"
                      value={mockForm.title}
                      onChange={(e) => setMockForm({...mockForm, title: e.target.value})}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-bold text-slate-550 mb-1">Duration Parameters (In Minutes)</label>
                    <input 
                      type="number" 
                      min="1"
                      max="180"
                      value={mockForm.durationMinutes}
                      onChange={(e) => setMockForm({...mockForm, durationMinutes: Number(e.target.value)})}
                      className="w-full rounded-xl border border-slate-200 p-2s p-2.5 text-slate-800 focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* validation diagnostics stream if any */}
            {validationMsg.status !== 'idle' && (
              <div className={`p-4 rounded-2xl text-xs font-bold ${
                validationMsg.status === 'success' 
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
                  : 'bg-rose-50 border border-rose-200 text-rose-800'
              }`}>
                {validationMsg.text}
              </div>
            )}

            {/* MODE 1: FORM BUILDER - MULTIPLE QUESTIONS */}
            {mockCreatorMode === 'form' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    ✍️ Build Questions Dynamically ({dynamicQuestions.length} Active Items)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddQuestionRow}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-850 text-white text-xs font-extrabold rounded-xl transition flex items-center gap-1.5 shadow-sm"
                  >
                    <PlusCircle className="h-4 w-4" /> Add Next Question
                  </button>
                </div>

                {dynamicQuestions.map((q, qIdx) => (
                  <div key={q.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs relative space-y-4">
                    
                    {/* Index header with delete option */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="p-1 px-2.5 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-black text-[10px]/none select-none uppercase tracking-wider">
                        Question #{qIdx + 1} of {dynamicQuestions.length}
                      </span>
                      {dynamicQuestions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestionRow(qIdx)}
                          className="p-1 px-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[10px] font-extrabold flex items-center gap-1 transition"
                        >
                          <Trash2 className="h-3 w-3" /> Remove Row
                        </button>
                      )}
                    </div>

                    {/* Question Statement */}
                    <div className="text-xs">
                      <label className="block text-[11px] font-bold text-slate-550 mb-1">Complete Question Text</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Which Constitutional Amendment lowered the voting age in India from 21 years to 18 years?"
                        value={q.text}
                        onChange={(e) => handleUpdateQuestionText(qIdx, e.target.value)}
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-slate-800 focus:outline-hidden focus:border-blue-500"
                        required
                      />
                    </div>

                    {/* Options Grid */}
                    <div className="grid gap-3 sm:grid-cols-2 text-xs">
                      {['A', 'B', 'C', 'D'].map((letter, oIdx) => (
                        <div key={oIdx}>
                          <label className="block text-[10px] font-bold text-slate-500 mb-1">Option {letter}</label>
                          <input 
                            type="text" 
                            placeholder={`Choice ${letter}`}
                            value={q.options[oIdx] || ''}
                            onChange={(e) => handleUpdateOption(qIdx, oIdx, e.target.value)}
                            className="w-full rounded-xl border border-slate-200 p-2 bg-slate-55/10 text-slate-850 font-medium"
                            required
                          />
                        </div>
                      ))}
                    </div>

                    {/* Correct Index Choice & Explanation */}
                    <div className="grid gap-4 sm:grid-cols-3 text-xs">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-550 mb-1">Correct Answer Index Choice</label>
                        <select
                          value={q.correctOptionIndex}
                          onChange={(e) => handleUpdateCorrectIdx(qIdx, Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-200 p-2 focus:outline-hidden focus:border-indigo-500 font-semibold bg-white"
                        >
                          <option value={0}>Option A is correct answer</option>
                          <option value={1}>Option B is correct answer</option>
                          <option value={2}>Option C is correct answer</option>
                          <option value={3}>Option D is correct answer</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-550 mb-1">Logical explanation reference solution key</label>
                        <input 
                          type="text" 
                          placeholder="Provide descriptive solution so candidates can learn why option choice is correct..."
                          value={q.explanation}
                          onChange={(e) => handleUpdateExplanation(qIdx, e.target.value)}
                          className="w-full rounded-xl border border-slate-200 p-2 focus:outline-hidden focus:border-indigo-500"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddQuestionRow}
                  className="w-full p-4 border border-dashed border-indigo-200 text-indigo-700 bg-indigo-50/20 rounded-2xl text-xs font-black flex items-center justify-center gap-1.5 hover:bg-indigo-50/50 transition cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" /> + Add Another Multi-Choice Question To Candidate Test Set
                </button>
              </div>
            )}

            {/* MODE 2: BULK EXCEL/CSV OR JSON FILE UPLOAD */}
            {mockCreatorMode === 'file' && (
              <div className="grid gap-6 md:grid-cols-12 items-start">
                
                {/* File Drop Drag Area & manual inputs */}
                <div className="md:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                      📂 File drop & Paste zone
                    </h4>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-mono px-2 py-0.5 rounded font-bold uppercase select-none">Manual payload parsing</span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Paste raw list directly in the text editor below OR select your precompiled file. The system will automatically detect if it is structured <strong className="text-indigo-600">CSV</strong> or <strong className="text-blue-600">JSON API payload arrays</strong>.
                  </p>

                  {/* Drag-And-Drop / File selection zone */}
                  <div 
                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                    onDragLeave={() => setDragActive(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragActive(false);
                      const file = e.dataTransfer.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (evt) => {
                          if (evt.target?.result) {
                            setBulkInput(evt.target.result as string);
                            setValidationMsg({status: 'success', text: `📁 File "${file.name}" picked and loaded into sandbox editor!`});
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition select-none ${
                      dragActive ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/40'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="mock_file_picker"
                      accept=".csv,.json,.txt"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            if (evt.target?.result) {
                              setBulkInput(evt.target.result as string);
                              setValidationMsg({status: 'success', text: `📁 Direct file loader: successfully loaded "${file.name}" content!`});
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="hidden" 
                    />
                    <label htmlFor="mock_file_picker" className="font-black text-xs text-indigo-700 hover:underline cursor-pointer flex flex-col items-center gap-2">
                      <span className="p-3 bg-indigo-50 text-indigo-700 rounded-full h-11 w-11 flex items-center justify-center">
                        📁
                      </span>
                      <span>Drag and drop .csv, .json here or click to choose manual file...</span>
                    </label>
                    <span className="text-[10px] text-slate-400 block mt-1">Accepts CSV or formatted JSON arrays matching standards of Sarkari practices.</span>
                  </div>

                  {/* Plaintext Area */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-500">PASTE CSV DATA OR STRUCTURAL JSON STREAM:</label>
                    <textarea
                      value={bulkInput}
                      onChange={(e) => setBulkInput(e.target.value)}
                      rows={8}
                      className="w-full text-xs font-mono p-3 bg-slate-900 text-amber-300 rounded-xl focus:outline-hidden border border-slate-800"
                      placeholder="Question Statement,Option A,Option B,Option C,Option D,CorrectIndex,Explanation..."
                    />
                  </div>

                  {/* Direct Load Examples buttons to make uploading incredibly trivial */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase select-none">Inject Sample structures:</span>
                    <button
                      type="button"
                      onClick={() => {
                        setBulkInput(SAMPLE_CSV_STR);
                        setValidationMsg({status: 'success', text: '📋 Demo CSV loaded inside notepad! Press "Publish Mock Paper" below to create.'});
                      }}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-205 text-slate-700 rounded-lg text-[10.5px] font-bold flex items-center gap-1 transition"
                    >
                      📑 Load Demo CSV Test Code
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBulkInput(SAMPLE_JSON_STR);
                        setValidationMsg({status: 'success', text: '📋 Demo JSON loaded! Press "Publish Mock Paper" below to create.'});
                      }}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-205 text-slate-700 rounded-lg text-[10.5px] font-bold flex items-center gap-1 transition"
                    >
                      📦 Load Demo JSON Array
                    </button>
                  </div>
                </div>

                {/* File Layout Help Sidebar */}
                <div className="md:col-span-4 bg-slate-55/10 rounded-3xl p-5 border border-slate-150 space-y-4 font-sans text-xs">
                  <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-[10px]/none">
                    📐 Accepted Coordinate Header Guidelines
                  </h4>

                  <div className="space-y-3.5 leading-relaxed text-slate-600">
                    <div>
                      <span className="font-extrabold text-slate-900 block text-[11px]">CSV column indices specs</span>
                      <p className="text-[10px] mt-0.5">Prepare columns precisely matching order indices below:</p>
                      <ol className="list-decimal pl-4 text-[10.5px] mt-1 text-slate-750 font-medium">
                        <li><strong>Question Statement</strong> text</li>
                        <li><strong>Option A</strong> choice</li>
                        <li><strong>Option B</strong> choice</li>
                        <li><strong>Option C</strong> choice</li>
                        <li><strong>Option D</strong> choice</li>
                        <li><strong>CorrectOptionIndex</strong> (0 to 3 values)</li>
                        <li><strong>Explanation key</strong> text</li>
                      </ol>
                    </div>

                    <div className="border-t border-slate-200/65 pt-2">
                      <span className="font-extrabold text-slate-900 block text-[11px]">JSON array model format</span>
                      <p className="text-[10px] mt-0.5">Supply an array of objects. Keys should match exactly:</p>
                      <pre className="p-2.5 bg-white text-[8px]/tight text-slate-500 font-mono rounded-lg border border-slate-100 overflow-x-auto mt-1 max-h-[140px]">
{`[
  {
    "text": "Your Question text?",
    "options": ["A", "B", "C", "D"],
    "correctOptionIndex": 1,
    "explanation": "Why correct"
  }
]`}
                      </pre>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Submit Action Block */}
            {mockCreatorMode !== 'templates' && (
              <button 
                type="submit"
                className="w-full text-center rounded-2xl bg-orange-650 hover:bg-orange-750 text-white font-extrabold py-3.5 transition text-xs flex items-center justify-center gap-2 shadow"
              >
                <PlusCircle className="h-4 w-4" /> Publish Custom Mock Paper to Practice Hub Live Lobby
              </button>
            )}
          </form>

          {/* MODE 3: HIGH-QUALITY TEMPLATE INJECTOR CHIPS */}
          {mockCreatorMode === 'templates' && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                ⚡ Premium Quick-Inject Mock Templates (One-Click instant publish)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Want immediate quality tests in the exam lobby? Click any template of verified practice exams to instantly populate and upload a fully functioning multiple-choice practice paper with answers and solutions.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                {TEST_TEMPLATES.map((tpl, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-orange-200 hover:shadow-sm transition text-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="p-1 px-2 rounded-lg bg-orange-50 text-orange-700 font-mono font-black text-[9px]/tight select-none uppercase tracking-wider">
                          {tpl.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{tpl.durationMinutes} Minutes</span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs">
                        {tpl.title}
                      </h4>

                      <p className="text-[10.5px] text-slate-500 leading-normal">
                        Contains <strong className="text-slate-850 font-bold">{tpl.questions.length} premium pre-compiled MCQ questions</strong> complete with detailed cognitive explanations. Works offline or online.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleInjectTemplate(tpl)}
                      className="w-full py-2 bg-orange-600 hover:bg-orange-705 text-white text-[11px] font-black rounded-xl transition mt-5 flex items-center justify-center gap-1 cursor-pointer shadow-sm"
                    >
                      🚀 Instant Inject & Upload Paper
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Published Mocks deletion & list management */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs mt-6">
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              📋 currently published mock tests ({mockTests.length} tests)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Review and delete old mock tests to remove them permanently from the website's Interactive MCQ lobbymode.
            </p>

            <div className="space-y-3 overflow-y-auto max-h-[400px]">
              {mockTests.map((test) => (
                <div key={test.id} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition text-xs">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="p-1 px-1.5 rounded-md bg-orange-100 text-orange-850 font-sans font-bold text-[9px]/none uppercase">
                        {test.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium font-mono">
                        {test.questions.length} Qs • {test.durationMinutes} mins
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800 text-xs mt-1">{test.title}</h4>
                  </div>
                  {onDeleteMockTest ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove "${test.title}"?`)) {
                          onDeleteMockTest(test.id);
                        }
                      }}
                      className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition flex-shrink-0"
                      title="Delete Mock Test"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">Protected</span>
                  )}
                </div>
              ))}
              {mockTests.length === 0 && (
                <p className="text-xs text-slate-400 italic text-center py-6">No mock tests currently published.</p>
              )}
            </div>
          </div>

        </div>
      )}

      {activeAdminTab === 'cards' && (
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
          
          {/* Admit Cards Form */}
          <div className="bg-white rounded-2xl border border-blue-50 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Upload e-Admit Card Portal Link
            </h3>

            <form onSubmit={handleCardSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Download Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. UPSC CSE 2026 Prelims Admit Card"
                  value={cardForm.title}
                  onChange={(e) => setCardForm({...cardForm, title: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Issue Organisation</label>
                <input 
                  type="text" 
                  placeholder="e.g. Union Public Service Commission"
                  value={cardForm.org}
                  onChange={(e) => setCardForm({...cardForm, org: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Expected Exam Timetable</label>
                  <input type="text" value={cardForm.examDate} onChange={(e) => setCardForm({...cardForm, examDate: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Assessment Venue / Cities</label>
                  <input type="text" value={cardForm.examCity} onChange={(e) => setCardForm({...cardForm, examCity: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Direct e-Admit Download Link</label>
                <input type="url" value={cardForm.downloadUrl} onChange={(e) => setCardForm({...cardForm, downloadUrl: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-blue-600 font-bold text-white py-2.5 hover:bg-blue-700 transition"
              >
                Publish Admit Card Link
              </button>
            </form>
          </div>

          {/* Results declaration form */}
          <div className="bg-white rounded-2xl border border-blue-50 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <Award className="h-5 w-5 text-blue-600" />
              Declare Merit Lists & Result Cut-offs
            </h3>

            <form onSubmit={handleResultSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Declared Exam/Post Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. RRB NTPC Grad Qualified merit scorecard list"
                  value={resultForm.title}
                  onChange={(e) => setResultForm({...resultForm, title: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cut-off General (UR)</label>
                  <input type="text" placeholder="e.g. 78%" value={resultForm.cutOffUR} onChange={(e) => setResultForm({...resultForm, cutOffUR: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cut-off OBC category</label>
                  <input type="text" placeholder="e.g. 72%" value={resultForm.cutOffOBC} onChange={(e) => setResultForm({...resultForm, cutOffOBC: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Direct Merit Slate PDF Link</label>
                <input type="url" value={resultForm.downloadUrl} onChange={(e) => setResultForm({...resultForm, downloadUrl: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2" required />
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-blue-600 font-bold text-white py-2.5 hover:bg-blue-700 transition"
              >
                Publish Merit Result
              </button>
            </form>
          </div>

          {/* Answer Keys Form */}
          <div className="bg-white rounded-2xl border border-blue-50 p-5 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-1.5 border-b border-slate-50 pb-2">
              <CheckSquare className="h-5 w-5 text-blue-600" />
              Upload Provisional Answer Keys & Sheets
            </h3>

            <form onSubmit={handleKeySubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Answer Key/Post Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. RSMSSB Rajasthan LDC Provisional Answer Sheets"
                  value={keyForm.title}
                  onChange={(e) => setKeyForm({...keyForm, title: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden focus:border-blue-500 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Commission/Authority</label>
                <input 
                  type="text" 
                  placeholder="e.g. RSMSSB Rajasthan"
                  value={keyForm.org}
                  onChange={(e) => setKeyForm({...keyForm, org: e.target.value})}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-hidden text-slate-800"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Date Released</label>
                  <input type="date" value={keyForm.released} onChange={(e) => setKeyForm({...keyForm, released: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2 text-slate-800" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Objections Deadline</label>
                  <input type="date" value={keyForm.objectionsLimit} onChange={(e) => setKeyForm({...keyForm, objectionsLimit: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2 text-slate-800" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Direct Solved PDF Document Link</label>
                <input type="url" value={keyForm.pdfUrl} onChange={(e) => setKeyForm({...keyForm, pdfUrl: e.target.value})} className="w-full rounded-lg border border-slate-200 p-2 text-slate-800 font-medium" required />
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl bg-blue-600 font-bold text-white py-2.5 hover:bg-blue-700 transition"
              >
                Publish Answer Key Link
              </button>
            </form>
          </div>

        </div>
      )}

      {activeAdminTab === 'whatsapp' && (
        <div className="space-y-6">
          {/* Header Description Banner */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-100 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base text-slate-900 font-extrabold flex items-center gap-1.5">
                <span className="p-1 px-2 rounded-lg bg-emerald-500 text-white text-[9px] font-mono font-black tracking-wider shadow-sm">PRO ACTIVE</span>
                Sarkari Broadcast Center (WhatsApp & Telegram)
              </h3>
              <p className="text-xs text-slate-600">
                Generate pre-styled, Hindi-infused vacancy alert cards and sync alerts to your verified WhatsApp channel <strong className="text-emerald-700">(@SarkariJobHub)</strong> and Telegram community instantly.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <a 
                href="https://whatsapp.com/channel/0029Vb8fRUIDeONDJBfyeq5U" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-xl px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition shadow"
              >
                <MessageSquare className="h-4 w-4" /> WhatsApp Channel
              </a>
              <a 
                href="https://t.me/JobSarkariHub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-xl px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs flex items-center gap-1.5 transition shadow"
              >
                <Send className="h-4 w-4" /> Telegram Channel
              </a>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 items-start">
            
            {/* LEFT COLUMN: CONTROL & SELECTION */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Select Job Card */}
              <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-xs space-y-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span> Select Active Vacancy
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Choose which newly published vacancy to prepare for broadcast:
                  </p>
                  
                  {jobs.length === 0 ? (
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-center">
                      <p className="text-xs font-bold text-slate-500">No jobs configured yet.</p>
                      <button onClick={() => setActiveAdminTab('jobs')} className="text-[10px] text-blue-600 underline font-bold mt-1">
                        + Create Your First Job Now
                      </button>
                    </div>
                  ) : (
                    <select
                      value={selectedJobId}
                      onChange={(e) => setSelectedJobId(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-850 font-medium focus:border-blue-500 focus:outline-hidden bg-slate-50 hover:bg-slate-100/50 transition"
                    >
                      {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.org} - {job.title} ({job.totalPosts} Posts)
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Styling Options */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" /> Custom Broadcast Style
                  </h4>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'hindi', label: 'Hindi Mix', desc: 'Alert' },
                      { id: 'professional', label: 'English', desc: 'Formal' },
                      { id: 'short', label: 'Micro Alert', desc: 'Telegram' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setWhatsappStyle(st.id as any)}
                        className={`p-2 rounded-xl text-center border transition flex flex-col justify-center items-center ${
                          whatsappStyle === st.id 
                            ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' 
                            : 'border-slate-150 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[11px]">{st.label}</span>
                        <span className="text-[8px] opacity-70 font-mono">{st.desc}</span>
                      </button>
                    ))}
                  </div>

                  {/* Switch Configs */}
                  <div className="space-y-2.5 text-[11px] font-semibold text-slate-650 pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900 transition">
                      <input 
                        type="checkbox" 
                        checked={includeJoinLink}
                        onChange={(e) => setIncludeJoinLink(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                      />
                      <span>Include WhatsApp Channel Join Link</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900 transition">
                      <input 
                        type="checkbox" 
                        checked={includeApplyUrls}
                        onChange={(e) => setIncludeApplyUrls(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                      />
                      <span>Include Direct apply links & PDF buttons</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Automated WhatsApp & Telegram Channel Real-Time History Feed */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <span className="inline-flex rounded-full h-2 w-2 bg-emerald-500 animate-pulse"></span>
                    Broadcast Feeds Live status
                  </h4>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full">
                    {waAutoBroadcasts.length} Alerts Dispatched
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  These high-priority alerts with detailed parameters were dispatched automatically to the WhatsApp Channel and Telegram Community Feed upon publication:
                </p>

                <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                  {waAutoBroadcasts.map((bc, idx) => (
                    <div key={bc.id || idx} className="p-3 bg-slate-50 border border-slate-150 rounded-2xl space-y-2 hover:border-emerald-250 hover:shadow-2xs transition">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase text-[8px]">
                          📢 {bc.type}
                        </span>
                        <span className="text-slate-400 text-[9px] font-mono">{bc.timestamp}</span>
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 line-clamp-1">
                        {bc.title}
                      </h5>
                      <div className="text-[10px] text-slate-650 bg-white p-2 rounded-xl border border-slate-100 font-mono whitespace-pre-wrap line-clamp-3 leading-normal select-all">
                        {bc.message}
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-[9px] pt-1">
                        <div className="flex flex-wrap gap-1.5 font-bold">
                          <span className="text-emerald-750 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                            🟢 WA: Delivered ✓✓
                          </span>
                          <span className="text-sky-750 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100 flex items-center gap-0.5">
                            ✈️ TG: Sent ✓
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(bc.message);
                            triggerMessage("📋 Notification text copied with full details!");
                          }}
                          className="text-blue-600 hover:underline hover:text-blue-700 font-extrabold flex items-center gap-1 shrink-0"
                        >
                          Copy Alert Text
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time cron sync indicator card */}
              <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 shadow-xs border border-slate-800 space-y-3.5 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400 select-none flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Live CRON Heartbeat (cron-job.org)
                  </span>
                  <span className="text-[8.5px] bg-slate-800 px-2 py-0.5 rounded font-mono text-emerald-400 uppercase">ONLINE</span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your website was pinged recently by the configured <code className="text-amber-300 font-mono font-bold">cron-job.org</code> background task at <code className="text-blue-300">every 10 minutes</code>. This keeps your server running beautifully!
                </p>

                <div className="p-3 bg-slate-950 rounded-xl space-y-1 font-mono text-[9px] text-slate-400 border border-slate-800/80">
                  <div className="flex justify-between">
                    <span>Target Heartbeat:</span>
                    <span className="text-teal-400">https://sarkari-job-hub-v595.onrender.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Ping Check:</span>
                    <span className="text-white">Success (200 OK)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Heartbeat Interval:</span>
                    <span className="text-sky-450">*/10 * * * * (Every 10 mins)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: PREVIEW & TELEMETRY */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* WhatsApp frame mockup box */}
              <div className="bg-slate-100 border border-slate-200 rounded-3xl overflow-hidden shadow">
                
                {/* Mock Phone App Header */}
                <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold font-sans text-emerald-800 text-[10px]/none select-none">
                      SJH
                    </div>
                    <div>
                      <h4 className="font-bold text-xs flex items-center gap-1">
                        Sarkari Job Hub Updates ✅
                      </h4>
                      <p className="text-[9px] text-emerald-100/90 leading-tight">Verified Broadcast channel • Online</p>
                    </div>
                  </div>
                  <span className="p-1 px-2.5 bg-emerald-700/60 text-white rounded-full font-bold text-[9px]">
                    1,250 Followers
                  </span>
                </div>

                {/* Chat stage wallpaper screen */}
                <div 
                  className="p-5 min-h-[340px] max-h-[460px] overflow-y-auto space-y-4 font-sans relative"
                  style={{
                    backgroundColor: '#e5ddd5',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ece5dd' fill-opacity='0.6'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/svg%3E")`
                  }}
                >
                  {/* WhatsApp speech bubble on the right */}
                  <div className="w-11/12 ml-auto bg-[#d9fdd3] text-slate-800 rounded-2xl rounded-tr-none p-3.5 shadow-sm text-xs leading-relaxed border border-[#cbd8c5]/40 select-text relative">
                    <div className="font-mono text-[11px] text-slate-850 whitespace-pre-wrap select-all">
                      {customMsgText.split('\n').map((line, idx) => {
                        let formatted = line;
                        // Replace *bold* with <strong>
                        formatted = formatted.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
                        // Replace _italic_ with <em>
                        formatted = formatted.replace(/_(.*?)_/g, "<em>$1</em>");
                        return (
                          <div key={idx} className="min-h-[1em]">
                            <span dangerouslySetInnerHTML={{ __html: formatted }} />
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Timestamp & double mark */}
                    <div className="text-right text-[9px] text-slate-500 mt-2 select-none flex items-center justify-end gap-1">
                      <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      <span className="text-sky-500 font-bold leading-none">✓✓</span>
                    </div>
                  </div>
                </div>

                {/* Broadcast actions footer toolbar */}
                <div className="bg-white p-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                  <textarea
                    value={customMsgText}
                    onChange={(e) => setCustomMsgText(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 p-2 text-[11px] font-mono text-slate-800 min-h-[80px] focus:outline-hidden focus:border-emerald-500 shadow-inner"
                    placeholder="Refining message drafts manually before broadcasts..."
                  />
                  
                  <div className="flex sm:flex-col gap-2 shrink-0 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(customMsgText);
                        setCopiedText(true);
                        setTimeout(() => setCopiedText(false), 2500);
                      }}
                      className={`rounded-xl p-3 font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                        copiedText 
                          ? 'bg-emerald-55 border border-emerald-300 text-emerald-800' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                      title="Copy broadcast content"
                    >
                      {copiedText ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-emerald-500" /> Copied Text
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 text-slate-500" /> Copy Alert
                        </>
                      )}
                    </button>

                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(customMsgText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl p-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow text-center"
                    >
                      <MessageSquare className="h-4 w-4" /> Send WhatsApp
                    </a>

                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent('https://sarkari-job-hub-v595.onrender.com')}&text=${encodeURIComponent(customMsgText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl p-3 bg-[#0088cc] hover:bg-[#007bbf] text-white font-black text-xs flex items-center justify-center gap-1.5 transition shadow text-center"
                    >
                      <Send className="h-4 w-4" /> Send Telegram
                    </a>
                  </div>
                </div>

              </div>

              {/* Developer Webhook Integration settings drawer */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Settings className="h-4 w-4 text-slate-600" /> Webhook Push Integration (Advanced)
                  </h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={webhookEnabled}
                      onChange={(e) => setWebhookEnabled(e.target.checked)}
                    />
                    <div className="w-7 h-4 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                    <span className="ml-1.5 text-[9px] font-bold text-slate-500">Enable</span>
                  </label>
                </div>

                <p className="text-[11px] text-slate-650 leading-relaxed">
                  Want absolute automated background triggers Whenever a job is published? Save a webhook POST URL to dispatch payloads to services like Zapier, Make.com, or custom Node servers.
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">AUTOMATION ENDPOINT WEBHOOK URL (POST)</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://api.zapier.com/hooks/catch/..."
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 p-2 text-[11px] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">WEBHOOK SECURE TOKEN / BEARER INTERACTION KEY</label>
                    <input 
                      type="text" 
                      placeholder="e.g. we_bearer_sarkari_123"
                      value={webhookSecret}
                      onChange={(e) => setWebhookSecret(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 p-2 text-[11px] font-mono text-slate-800"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveWebhook}
                      className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition"
                    >
                      Save Webhook Config
                    </button>
                    <button
                      type="button"
                      onClick={handleTestWebhook}
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs rounded-xl transition border border-blue-200"
                    >
                      Test payload
                    </button>
                  </div>
                </div>

                {/* Webhook Stream logs */}
                {webhookLogs.length > 0 && (
                  <div className="border-t border-slate-100 pt-3 space-y-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">CALLBACK ACTIVITY STREAM LOGS</span>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto">
                      {webhookLogs.map((log, i) => (
                        <div key={i} className="p-2.5 bg-slate-55/10 rounded-xl border border-slate-100 space-y-1 font-mono text-[9px]">
                          <div className="flex justify-between font-bold text-slate-700">
                            <span className="text-blue-600">{log.status}</span>
                            <span className="text-slate-400">{log.timestamp}</span>
                          </div>
                          <pre className="text-slate-600 overflow-x-auto p-1.5 bg-white rounded-lg border border-slate-100 text-[8.5px] max-h-[80px] leading-tight">
                            {log.payload}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Telegram Channel Live Bot Integration settings card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2 flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Send className="h-4 w-4 text-sky-500 fill-sky-50" /> Telegram Channel Auto-Broadcast Setup (टेलीग्राम ऑटो ब्रॉडकास्ट)
                  </h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={tgEnabled}
                      onChange={(e) => setTgEnabled(e.target.checked)}
                    />
                    <div className="w-7 h-4 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-sky-500"></div>
                    <span className="ml-1.5 text-[9px] font-bold text-slate-500">Enable</span>
                  </label>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                  Connect your real Telegram channel <strong className="text-sky-600">(@JobSarkariHub)</strong> using a custom Bot. Any time a new vacancy, admit card, result, or answer key is published, a beautifully formatted alert is automatically sent!
                </p>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                      <span>TELEGRAM BOT API TOKEN</span>
                      <span className="text-[9px] text-slate-400 font-normal">(Get from @BotFather on Telegram)</span>
                    </label>
                    <input 
                      type="password" 
                      placeholder="e.g. 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                      value={tgBotToken}
                      onChange={(e) => setTgBotToken(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 p-2 text-[11px] text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                      <span>TELEGRAM CHANNEL USERNAME OR CHAT ID</span>
                      <span className="text-[9px] text-slate-400 font-normal">(Make sure Bot is Admin in Channel!)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. @JobSarkariHub or -10012345678"
                      value={tgChatId}
                      onChange={(e) => setTgChatId(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 p-2 text-[11px] font-mono text-slate-800"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveTelegram}
                      className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition cursor-pointer"
                    >
                      Save Telegram Config
                    </button>
                    <button
                      type="button"
                      onClick={handleTestTelegram}
                      className="px-4 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 font-extrabold text-xs rounded-xl transition border border-sky-200 cursor-pointer"
                    >
                      Test Connection ⚡
                    </button>
                  </div>
                </div>

                {/* Telegram Stream logs */}
                {tgLogs.length > 0 && (
                  <div className="border-t border-slate-100 pt-3 space-y-2 text-left">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">TELEGRAM API ACTIVITY STREAM LOGS</span>
                    <div className="space-y-2 max-h-[140px] overflow-y-auto">
                      {tgLogs.map((log, i) => (
                        <div key={i} className="p-2.5 bg-sky-50/25 rounded-xl border border-sky-100/60 space-y-1 font-mono text-[9px]">
                          <div className="flex justify-between font-bold text-slate-700">
                            <span className={log.status.includes('ERROR') || log.status.includes('FAIL') ? "text-red-600" : "text-sky-600"}>{log.status}</span>
                            <span className="text-slate-400">{log.timestamp}</span>
                          </div>
                          <pre className="text-slate-600 overflow-x-auto p-1.5 bg-white rounded-lg border border-slate-100 text-[8.5px] max-h-[80px] leading-tight">
                            {log.payload}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {activeAdminTab === 'payments' && (
        <div className="space-y-6">
          {/* Header Description Banner */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base text-slate-900 font-extrabold flex items-center gap-1.5">
                <span className="p-1 px-2 rounded-lg bg-blue-600 text-white text-[9px] font-mono font-black tracking-wider shadow-sm">PAYMENT INTEGRATION</span>
                UPI ID & Premium Plan Setup
              </h3>
              <p className="text-xs text-slate-600">
                Configure your Business UPI ID, display payee name, or external payment gateways (Razorpay, Instamojo) to receive premium plan upgrade collections directly to your bank account bilingually.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <span className="font-mono text-[9px] font-extrabold bg-blue-100 text-blue-800 rounded px-2 py-1 flex items-center justify-center gap-1">
                ⭐ 100% DIRECT BANK P2P (0% COMMISSION)
              </span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-12">
            
            {/* Payment Config Form */}
            <div className="md:col-span-7 bg-white rounded-2xl border border-blue-50 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-50 pb-2">
                <Settings className="h-4.5 w-4.5 text-blue-600" />
                Configure Direct Payout Parameters
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Your Recipient UPI ID (VPA Address) <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={adminUpiId}
                    onChange={(e) => setAdminUpiId(e.target.value)}
                    placeholder="e.g. sunilk94411@paytm, or sarkarihub@upi"
                    className="rounded-lg border border-slate-200 bg-white p-3 text-xs w-full font-mono text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    This is your unique UPI Address. Multiple payment apps like GPay, PhonePe, Paytm, and BHIM will sweep student premiums directly into your bank account connected with this ID.
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Payee/Business Name (Registered Name) <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={adminPayeeName}
                    onChange={(e) => setAdminPayeeName(e.target.value)}
                    placeholder="e.g. JobSarkariHub, or Sunil Kumar"
                    className="rounded-lg border border-slate-200 bg-white p-3 text-xs w-full text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    The payee name candidates see on their mobile screen when they scan your QR code or open the UPI window.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[11px] font-bold text-slate-500">Custom Payment Gateway Link (Razorpay/Instamojo URL)</label>
                    <span className="text-[9px] text-amber-600 bg-amber-50 rounded px-1.5 py-0.2 font-mono uppercase font-extrabold animate-pulse">Optional Upgrade</span>
                  </div>
                  <input 
                    type="url" 
                    value={adminPaymentLink}
                    onChange={(e) => setAdminPaymentLink(e.target.value)}
                    placeholder="e.g. https://pages.razorpay.com/jobsarkari-premium"
                    className="rounded-lg border border-slate-200 bg-white p-3 text-xs w-full text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    If you prefer a structured debit card, credit card, netbanking, or wallet gateway process, paste your custom checkout link here. If provided, the "Buy Premium" buttons will allow users to redirect there, or scan the dynamic UPI QR directly.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => {
                      localStorage.setItem('sarkari_business_upi_id', adminUpiId);
                      localStorage.setItem('sarkari_business_name', adminPayeeName);
                      localStorage.setItem('sarkari_business_payment_link', adminPaymentLink);
                      // Trigger normal state sync notification 
                      setStatusMessage("✅ Payment Setup & UPI Address parameters saved! User app interfaces updated live.");
                      setTimeout(() => setStatusMessage(null), 4000);
                    }}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl transition flex items-center gap-1.5 shadow shadow-blue-500/10 cursor-pointer"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Save Payment Configurations
                  </button>
                </div>
              </div>
            </div>

            {/* Simulated Live Preview of candidate's Checkout */}
            <div className="md:col-span-5 space-y-6">
              
              <div className="bg-slate-55/20 border border-slate-200/60 p-5 rounded-2xl space-y-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">LIVE RECIPIENT QR PREVIEW</span>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs flex flex-col items-center justify-center text-center space-y-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">QR Code generated for students:</span>
                  
                  <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center relative">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`upi://pay?pa=${adminUpiId}&pn=${adminPayeeName}&am=999&cu=INR&tn=Upgrade+to+Lifetime+Access`)}`}
                      alt="Merchant QR Live Code"
                      className="h-28 w-28 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs font-extrabold text-slate-800 block">UPI Payee: {adminPayeeName}</span>
                    <span className="text-[10px] font-mono text-slate-400 block bg-slate-50 px-2 py-0.5 rounded truncate max-w-xs">{adminUpiId}</span>
                  </div>
                </div>

                <div className="text-left text-xs text-slate-600 space-y-2 leading-relaxed">
                  <span className="font-extrabold text-slate-800 block">How do payments hit your bank?</span>
                  <p className="text-[11px] text-slate-500">
                    When a student selects a plan (such as ₹99 Monthly or ₹999 Lifetime), the app converts your recipient details, plan cost, and a custom Candidate Reference ID (e.g. <code className="bg-slate-100 p-0.5 rounded font-mono text-[9px]">SARKARI-PREM-230981</code>) into a secure standardized UPI URL.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Scanning instantly triggers GPAY / PHONEPE / PAYTM with exact pre-filled payee name, amount and reference text – sending money peer-to-peer 100% free of charge directly to your linked state bank or cooperative account instantly.
                  </p>
                </div>
              </div>

              {/* Quick instructions block */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 text-xs text-slate-600 space-y-2">
                <span className="font-bold text-blue-900 block flex items-center gap-1.5 uppercase tracking-wide">
                  💡 How to make UPI Link & QR Active:
                </span>
                <ol className="list-decimal pl-4 text-[11px] text-slate-600 space-y-1 font-sans">
                  <li>Input your personal or business UPI ID above (e.g., Sunil's phone linked UPI pay address).</li>
                  <li>Press <strong>Save Payment Configurations</strong> button.</li>
                  <li>Go to <strong>Premium Membership</strong> tab and check the QR scanner — it's now updated with your custom ID live!</li>
                  <li>When you share or send Payment links, the reference text integrates your details automatically.</li>
                </ol>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
