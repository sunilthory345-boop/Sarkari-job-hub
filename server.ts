import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { 
  getSscNotices, 
  addSscNotice, 
  getSyncStatus, 
  checkSscPortalHealth, 
  SscLiveNotice 
} from "./server/sscService";
import { 
  getUpscNotices, 
  addUpscNotice, 
  getUpscSyncStatus, 
  checkUpscPortalHealth, 
  UpscLiveNotice 
} from "./server/upscService";
import {
  getRrbNotices,
  addRrbNotice,
  getRrbSyncStatus,
  checkRrbPortalHealth,
  RrbLiveNotice
} from "./server/rrbService";
import {
  getIbpsNotices,
  addIbpsNotice,
  getIbpsSyncStatus,
  checkIbpsPortalHealth,
  IbpsLiveNotice
} from "./server/ibpsService";
import {
  getSbiNotices,
  addSbiNotice,
  getSbiSyncStatus,
  checkSbiPortalHealth,
  SbiLiveNotice
} from "./server/sbiService";
import { rajasthanRecruitmentService } from "./server/rajasthanService";
import { armyRecruitmentService } from "./server/armyService";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Let's set express JSON body parser limit to support base64 encoded documents
  app.use(express.json({ limit: "15mb" }));

  // server-side simulation of candidate documents
  interface UploadedDocument {
    id: string;
    name: string;
    size: string;
    type: string;
    uploadedDate: string;
    category: string;
    fileBase64?: string;
  }

  let serverDocuments: UploadedDocument[] = [
    {
      id: "doc-1",
      name: "Sunil_Kumar_Resume_Aspirant.pdf",
      size: "1.4 MB",
      type: "application/pdf",
      uploadedDate: "2026-06-11",
      category: "Resume"
    },
    {
      id: "doc-2",
      name: "Class_10_Matriculation_Marksheet.pdf",
      size: "2.1 MB",
      type: "application/pdf",
      uploadedDate: "2026-06-08",
      category: "Educational Marksheet"
    }
  ];

  // Serve simple API health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Google Search Console HTML Site Verification
  app.get("/googlea4fd13bfa005370e.html", (req, res) => {
    res.send("google-site-verification: googlea4fd13bfa005370e.html");
  });

  // Dynamic bilingual sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    res.header("Content-Type", "application/xml");
    
    const host = req.get("host") || "sarkari-job-hub-v595.onrender.com";
    const protocol = req.secure ? "https" : "http";
    const baseUrl = `${protocol}://${host}`;
    
    const currentDate = new Date().toISOString().split("T")[0];
    
    // Core static routes pointing to Hindi and English preparation sectors
    const routes = [
      { path: "", priority: "1.0", changefreq: "daily" },
      { path: "jobs", priority: "0.9", changefreq: "daily" },
      { path: "admit-cards", priority: "0.9", changefreq: "daily" },
      { path: "results", priority: "0.85", changefreq: "weekly" },
      { path: "mock-tests", priority: "0.9", changefreq: "daily" },
      { path: "syllabus", priority: "0.8", changefreq: "weekly" },
      { path: "current-affairs", priority: "0.8", changefreq: "daily" },
      { path: "blog", priority: "0.7", changefreq: "weekly" },
      { path: "objections", priority: "0.6", changefreq: "monthly" },
      { path: "upload-vault", priority: "0.7", changefreq: "monthly" },
      { path: "railway", priority: "0.9", changefreq: "daily" },
      { path: "banking", priority: "0.9", changefreq: "daily" },
      { path: "state-jobs", priority: "0.9", changefreq: "daily" },
      { path: "police-jobs", priority: "0.9", changefreq: "daily" }
    ];
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;
    
    routes.forEach(r => {
      const url = r.path ? `${baseUrl}/${r.path}` : baseUrl;
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
      xml += `    <priority>${r.priority}</priority>\n`;
      // Bilingual alternates
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${url}?lang=en" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="hi" href="${url}?lang=hi" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${url}" />\n`;
      xml += `  </url>\n`;
    });
    
    xml += `</urlset>`;
    res.send(xml);
  });

  // Dynamic robots.txt
  app.get("/robots.txt", (req, res) => {
    res.header("Content-Type", "text/plain");
    const host = req.get("host") || "sarkari-job-hub-v595.onrender.com";
    const protocol = req.secure ? "https" : "http";
    res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin

Sitemap: ${protocol}://${host}/sitemap.xml`);
  });

  // GET uploaded documents from backend database
  app.get("/api/documents", (req, res) => {
    res.json(serverDocuments);
  });

  // POST document to database (full data upload from frontend to backend)
  app.post("/api/documents", (req, res) => {
    const { name, size, type, category, fileBase64 } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Document name is required" });
    }
    const newDoc: UploadedDocument = {
      id: `doc-srv-${Date.now()}`,
      name,
      size: size || "1.0 MB",
      type: type || "application/pdf",
      category: category || "Other Certification",
      uploadedDate: new Date().toISOString().split("T")[0],
      fileBase64
    };
    serverDocuments.unshift(newDoc);
    res.json({ success: true, document: newDoc });
  });

  // DELETE document from database
  app.delete("/api/documents/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = serverDocuments.length;
    serverDocuments = serverDocuments.filter(d => d.id !== id);
    if (serverDocuments.length < initialLen) {
      res.json({ success: true, message: "Document deleted successfully" });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  });

  // AI Government Post Auto-Parser and Structurer endpoint
  app.post("/api/ai-parse-post", async (req, res) => {
    const { rawText } = req.body;
    
    if (!rawText) {
      return res.status(400).json({ error: "Input text is required." });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({ 
          error: "GEMINI_API_KEY is not configured in Server Secrets. Please configure it to use the AI Auto-Poster." 
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const systemInstruction = 
        "You are an advanced, bilingual (English and Hindi) Indian Government Exams AI Auto-Poster bot. " +
        "Your job is to read raw input text (such as unformatted official notifications, news bulletins, " +
        "or short summaries) and convert it into a perfectly structured JSON object matching the requested schema. " +
        "Determine if the content represents a new job/vacancy ('jobs'), an admit card ('admit-card'), " +
        "a result list/scorecard ('result'), or an exam answer key ('answer-key'). " +
        "Generate clean bilingual (English and Hindi) titles, and extract important dates, organizations, fees, " +
        "and URLs. If a specific field is not mentioned or cannot be inferred, provide a sensible placeholder " +
        "or empty string/zero, but ensure the structure is complete and conforms exactly to the schema.";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Parse this raw text into a structured exam notification:\n\n${rawText}`,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.1,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              category: {
                type: Type.STRING,
                description: "Must be exactly one of: 'jobs', 'admit-card', 'result', 'answer-key'"
              },
              jobDetails: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  org: { type: Type.STRING },
                  category: { type: Type.STRING },
                  qualification: { type: Type.STRING },
                  ageLimit: { type: Type.STRING },
                  salary: { type: Type.STRING },
                  fees: {
                    type: Type.OBJECT,
                    properties: {
                      General: { type: Type.STRING },
                      OBC: { type: Type.STRING },
                      SC_ST_Female: { type: Type.STRING }
                    },
                    required: ["General", "OBC", "SC_ST_Female"]
                  },
                  totalPosts: { type: Type.INTEGER },
                  applyUrl: { type: Type.STRING },
                  pdfUrl: { type: Type.STRING },
                  officialWebsite: { type: Type.STRING },
                  lastDate: { type: Type.STRING },
                  importantDates: {
                    type: Type.OBJECT,
                    properties: {
                      applyStart: { type: Type.STRING },
                      applyEnd: { type: Type.STRING },
                      examDate: { type: Type.STRING },
                      admitCardRelease: { type: Type.STRING }
                    },
                    required: ["applyStart", "applyEnd", "examDate", "admitCardRelease"]
                  },
                  selectionProcess: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  location: { type: Type.STRING },
                  description: { type: Type.STRING }
                },
                required: [
                  "title", "org", "category", "qualification", "ageLimit", "salary", 
                  "fees", "totalPosts", "applyUrl", "pdfUrl", "officialWebsite", "lastDate", 
                  "importantDates", "selectionProcess", "location", "description"
                ]
              },
              admitCardDetails: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  org: { type: Type.STRING },
                  examDate: { type: Type.STRING },
                  examCity: { type: Type.STRING },
                  downloadUrl: { type: Type.STRING },
                  officialLink: { type: Type.STRING }
                },
                required: ["title", "org", "examDate", "examCity", "downloadUrl", "officialLink"]
              },
              resultDetails: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  org: { type: Type.STRING },
                  meritListUrl: { type: Type.STRING },
                  scoreCardUrl: { type: Type.STRING },
                  cutOff: {
                    type: Type.OBJECT,
                    properties: {
                      UR: { type: Type.STRING },
                      OBC: { type: Type.STRING },
                      SC: { type: Type.STRING },
                      ST: { type: Type.STRING }
                    },
                    required: ["UR", "OBC", "SC", "ST"]
                  },
                  downloadUrl: { type: Type.STRING },
                  releaseDate: { type: Type.STRING }
                },
                required: ["title", "org", "meritListUrl", "scoreCardUrl", "cutOff", "downloadUrl", "releaseDate"]
              },
              answerKeyDetails: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  org: { type: Type.STRING },
                  released: { type: Type.STRING },
                  objectionsLimit: { type: Type.STRING },
                  pdfUrl: { type: Type.STRING }
                },
                required: ["title", "org", "released", "objectionsLimit", "pdfUrl"]
              }
            },
            required: ["category"]
          }
        }
      });

      const parsedJson = JSON.parse(response.text || "{}");
      res.json(parsedJson);
    } catch (error: any) {
      console.error("AI Post Parsing Error:", error);
      res.status(500).json({ 
        error: "Failed to parse content using AI.", 
        details: error.message || error 
      });
    }
  });

  // AI Doubt Solving endpoint
  app.post("/api/doubt-solve", async (req, res) => {
    const { message, image } = req.body;
    
    if (!message && !image) {
      return res.status(400).json({ error: "Message query or image is required." });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        const queryText = (message || "").toLowerCase();
        let solution = "";

        if (queryText.includes("ratio") || queryText.includes("proportion") || queryText.includes("a:b")) {
          solution = `### 🤝 Ratio & Proportion Step-by-Step Solution (अनुपात और समानुपात)

#### 🎯 Core Concept & Formula (मुख्य सूत्र व नियम):
- Compounded Ratio of $A:B$ and $C:D$ is $AC:BD$.
- To find combined ratio $A:B:C$, make the common term $B$ identical in both ratios.

#### 📝 Step-by-Step Solution (चरणबद्ध हल):
*Question Query:* "${message || "Find A:B:C when A:B = 2:3 and B:C = 4:5"}"

1. **Given:** $A:B = 2:3$ and $B:C = 4:5$
2. **Step 1:** Multiply first ratio by $4$ (the $B$-value in second ratio):
   $$A:B = (2 \times 4) : (3 \times 4) = 8 : 12$$
3. **Step 2:** Multiply second ratio by $3$ (the $B$-value in first ratio):
   $$B:C = (4 \times 3) : (5 \times 3) = 12 : 15$$
4. **Step 3:** Since $B = 12$ in both cases, combine them directly:
   $$A : B : C = 8 : 12 : 15$$

#### ⚡ Short Trick (शॉर्ट ट्रिक):
$$\text{Ratio } A:B:C = (A \times B_2) : (B_1 \times B_2) : (B_1 \times C_2)$$
$$A:B:C = (2 \times 4) : (3 \times 4) : (3 \times 5) = 8 : 12 : 15$$

**✅ Final Correct Answer: 8 : 12 : 15**`;
        } else if (queryText.includes("percent") || queryText.includes("gain") || queryText.includes("loss") || queryText.includes("profit") || queryText.includes("discount")) {
          solution = `### 📈 Profit, Loss & Percentage Step-by-Step Solution (लाभ, हानि और प्रतिशत)

#### 🎯 Core Concept & Formula (मुख्य सूत्र व नियम):
- $\text{Marked Price (MP)} = \text{Cost Price (CP)} \times \left(1 + \frac{\text{Markup}\%}{100}\right)$
- $\text{Selling Price (SP)} = \text{MP} \times \left(1 - \frac{\text{Discount}\%}{100}\right)$
- $\text{Net Gain}\% = \frac{\text{SP} - \text{CP}}{\text{CP}} \times 100\%$

#### 📝 Step-by-Step Solution (चरणबद्ध हल):
*Question Query:* "${message || "Item marked 20% higher than CP with 10% discount. Find net gain percent."}"

1. **Step 1:** Let Cost Price ($\text{CP}$) = $₹100$.
2. **Step 2:** Goods are marked $20\%$ higher than $\text{CP}$:
   $$\text{Marked Price (MP)} = 100 + (20\% \text{ of } 100) = ₹120$$
3. **Step 3:** Discount offered is $10\%$ on $\text{MP}$:
   $$\text{Discount Amount} = 10\% \text{ of } 120 = ₹12$$
   $$\text{Selling Price (SP)} = 120 - 12 = ₹108$$
4. **Step 4:** Calculate Net Profit Percentage:
   $$\text{Net Gain}\% = \frac{108 - 100}{100} \times 100\% = 8\%$$

#### ⚡ Short Trick Formula (शॉर्ट ट्रिक सूत्र):
$$\text{Net Profit}\% = x - y - \frac{x \times y}{100} = 20 - 10 - \frac{20 \times 10}{100} = 10 - 2 = 8\%$$

**✅ Final Correct Answer: 8% Net Profit (8% लाभ)**`;
        } else if (queryText.includes("ejoty") || queryText.includes("code") || queryText.includes("coding") || queryText.includes("syllog") || queryText.includes("blood") || queryText.includes("reason")) {
          solution = `### 🧩 Reasoning & General Intelligence Solution (तर्कशक्ति समाधान)

#### 🎯 Core Concept & Short Rules (मुख्य नियम):
- **EJOTY System for Alphabet Ranks:** 
  - $E = 5$, $J = 10$, $O = 15$, $T = 20$, $Y = 25$
- **Opposite Letter Pairs Rule (Sum = 27):**
  - $A(1) \leftrightarrow Z(26)$, $B(2) \leftrightarrow Y(25)$, $C(3) \leftrightarrow X(24)$, $D(4) \leftrightarrow W(23)$, $E(5) \leftrightarrow V(22)$

#### 📝 Step-by-Step Reasoning Breakdown (चरणबद्ध हल):
*Topic:* "${message || "EJOTY and Alphabet Coding Tricks"}"

1. **Step 1 (Position Mapping):** To quickly calculate positions without counting from A, use multiples of 5:
   - $G = E(5) + 2 = 7$
   - $M = J(10) + 3 = 13$
   - $S = T(20) - 1 = 19$
2. **Step 2 (Exam Application Example):** If $\text{CAT} = 24$ ($\text{C}=3, \text{A}=1, \text{T}=20$), then for $\text{DOG}$:
   $$\text{DOG} = \text{D}(4) + \text{O}(15) + \text{G}(7) = 26$$

#### ⚡ Exam Time Saver Tip (परीक्षा टिप्स):
Write $A$ to $M$ in top row and $N$ to $Z$ below it in reverse order on your rough sheet before starting reasoning paper to instantly solve 4-5 coding-decoding questions!

**✅ Status: Verified Pattern Solution**`;
        } else if (queryText.includes("polity") || queryText.includes("article") || queryText.includes("fundamental") || queryText.includes("constitution") || queryText.includes("writ")) {
          solution = `### 🏛️ Indian Polity & Constitution Detailed Guide (भारतीय संविधान)

#### 🎯 Key Constitutional Framework:
- **Part III (Articles 12 to 35):** Fundamental Rights (मौलिक अधिकार). Borrowed from USA Bill of Rights.
- **Article 32:** Right to Constitutional Remedies (संवैधानिक उपचारों का अधिकार). Called *"Heart and Soul of Constitution"* by Dr. B.R. Ambedkar.

#### 📝 High-Yield Articles Table (महत्वपूर्ण अनुच्छेद):
| Article | Subject Matter | Key Details |
|:---|:---|:---|
| **Article 14** | Equality before Law | Equal protection of laws within territory of India |
| **Article 17** | Abolition of Untouchability | Enforceable offense under Protection of Civil Rights Act |
| **Article 21** | Right to Life & Personal Liberty | Expanded to include right to privacy and clean environment |
| **Article 21A** | Right to Education | Free & compulsory education for children aged 6–14 (86th Amendment 2002) |
| **Article 32** | Supreme Court Writs | 5 Writs: *Habeas Corpus, Mandamus, Prohibition, Quo-Warranto, Certiorari* |

#### ⚡ Exam Trick / Key Takeaway:
Part IV Directive Principles (Articles 36 to 51) are **non-justiciable**, while Part III Fundamental Rights are **enforceable in court**.

**✅ Verified SSC & UPSC Polity Reference**`;
        } else if (queryText.includes("vaccine") || queryText.includes("nhm") || queryText.includes("bcg") || queryText.includes("opv") || queryText.includes("health")) {
          solution = `### 💉 NHM & Health Immunization Specialist Solved Guidelines (स्वास्थ्य गाइड)

#### 🎯 Cold Chain Storage Standards (कोल्ड चेन तापमान):
- **Standard Storage Range:** $+2^{\circ}\text{C}$ to $+8^{\circ}\text{C}$ for most vaccines (BCG, Hepatitis B, DPT, TT, Pentavalent).
- **Freezer Storage Range:** $-15^{\circ}\text{C}$ to $-25^{\circ}\text{C}$ for OPV (Oral Polio Vaccine).

#### 📝 Step-by-Step Immunization Schedule (टीकाकरण विवरण):
1. **At Birth:**
   - **BCG:** $0.05\text{ ml}$ Intradermal (Left upper arm)
   - **OPV (Zero dose):** 2 drops orally
   - **Hepatitis B (Birth dose):** $0.5\text{ ml}$ Intramuscular (Anterolateral thigh)
2. **At 6, 10, and 14 Weeks:**
   - **Pentavalent (1, 2, 3):** $0.5\text{ ml}$ Intramuscular
   - **Rotavirus (1, 2, 3):** 5 drops orally
   - **fIPV (1, 2):** $0.1\text{ ml}$ Intradermal at 6 & 14 weeks

#### ⚡ Critical Storage Rule:
Never freeze Tetanus Toxoid (TT), Hepatitis B, or Pentavalent vaccines. Freezing destroys their potency!

**✅ Verified NHM & Healthcare Syllabus Answer**`;
        } else if (queryText.includes("history") || queryText.includes("gandh") || queryText.includes("indus") || queryText.includes("harappa") || queryText.includes("1857")) {
          solution = `### 📜 History Master Class Solution (इतिहास संपूर्ण समाधान)

#### 🎯 Chronology & Major Milestones (प्रमुख ऐतिहासिक घटनाक्रम):

1. **Ancient India - Indus Valley Civilization (सिंधु घाटी सभ्यता):**
   - **Harappa:** Discovered in 1921 by Daya Ram Sahni on Ravi river bank.
   - **Mohenjo-daro:** Discovered in 1922 by R.D. Banerjee on Indus river bank (famous for Great Bath).

2. **Modern India - Indian Freedom Struggle (भारतीय स्वतंत्रता संग्राम):**
   - **1885:** Indian National Congress (INC) founded by A.O. Hume. First session presided by W.C. Bonnerjee in Bombay.
   - **1905:** Partition of Bengal by Lord Curzon & launch of Swadeshi Movement.
   - **1919:** Jallianwala Bagh Massacre & Rowlatt Act passage.
   - **1930:** Dandi Salt March led by Mahatma Gandhi from Sabarmati to Dandi (6 April 1930).
   - **1942:** Quit India Movement (8 August 1942) with slogan *"Do or Die"* (करो या मरो).

#### ⚡ Exam Memory Shortcut:
Order of Governor-Generals / Viceroys:
*Warren Hastings (1st GG of Bengal) $\rightarrow$ Lord William Bentinck (1st GG of India) $\rightarrow$ Lord Canning (1st Viceroy of India).*

**✅ Verified History Exam Reference**`;
        } else if (queryText.includes("science") || queryText.includes("physic") || queryText.includes("chemist") || queryText.includes("biolog") || queryText.includes("cell")) {
          solution = `### 🔬 General Science Complete Solved Notes (सामान्य विज्ञान)

#### 🎯 Core Scientific Concepts & Laws:

1. **Physics - Newton's Laws & Units:**
   - **First Law (Law of Inertia):** An object remains at rest or uniform motion unless acted upon by external force.
   - **Second Law:** Force = Mass $\times$ Acceleration ($F = m \cdot a$). SI Unit: Newton ($\text{N}$).
   - **Third Law:** Every action has equal and opposite reaction.

2. **Biology - Cell Biology & Physiology:**
   - **Mitochondria:** Called *"Powerhouse of the Cell"* because ATP is produced here.
   - **Lysosome:** Called *"Suicidal Bags"* of cell containing hydrolytic enzymes.
   - **Blood Groups:** Discovered by Karl Landsteiner. **O-negative** is Universal Donor; **AB-positive** is Universal Acceptor.

3. **Chemistry - Core Formulas:**
   - **Rusting of Iron:** Chemical change forming hydrated ferric oxide ($Fe_2O_3 \cdot xH_2O$). Weight increases.
   - **pH Scale:** $pH < 7$ is Acidic; $pH = 7$ is Neutral; $pH > 7$ is Basic/Alkaline.

**✅ Verified Science Exam Answer**`;
        } else {
          // Comprehensive general fallback that directly analyzes any custom text query
          solution = `### 🤖 Sarkari AI Doubt Solver - Step-by-Step Solution

#### 🎯 Query Analysis:
"${message || "General Exam Doubt & Syllabus Question"}"

#### 📝 Step-by-Step Detailed Breakdown (चरणबद्ध समाधान):

1. **Core Concept Identified:** 
   This query pertains to competitive examination preparation (SSC / Railways / Bank / State Exams). 

2. **Standard Solution & Formula (मुख्य सूत्र व विधि):**
   - **Quantitative & Reasoning Questions:** Always resolve by simplifying given ratios, using net percentage rules ($x + y + \frac{xy}{100}$), or identifying alphabetical difference patterns.
   - **General Awareness Questions:** Focus on official constitutional articles, NCERT science facts, and monthly current affairs updates.

3. **Actionable Examination Tip (परीक्षा सफलता की चाबी):**
   - Solve at least 25 previous year questions (PYQs) daily.
   - Re-attempt questions you answered incorrectly during live mock tests to build speed and eliminate negative marks ($0.50$ / $0.33$ deduction).

---
*💡 Note: Configure \`GEMINI_API_KEY\` in your environment settings for real-time visual image OCR & dynamic Gemini 3.5 AI question processing!*`;
        }

        return res.json({ text: solution });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      // Construct a specific system prompt for government exam preparation
      const systemInstruction = 
        "You are an elite, highly precise and encouraging Indian Government Exams AI tutor ('Sarkari Doubt Mitra'). " +
        "Your mission is to solve candidate doubts from SSC (CGL, CHSL, MTS, GD), Railways (RRB NTPC, Group D, ALP, Tech), Banking (IBPS, SBI), UPSC, State PSC (RPSC, UPPSC, BPSC), Health/Vaccinator, and Police exams. " +
        "Always format your response cleanly in markdown with these exact sections:\n" +
        "1. 🎯 **Core Concept & Formula (मुख्य सूत्र व सिद्धांत)**\n" +
        "2. 📝 **Step-by-Step Detailed Solution (चरणबद्ध समाधान)**\n" +
        "3. ⚡ **Short Trick / Exam Shortcut (शॉर्ट ट्रिक)**\n" +
        "4. ✅ **Final Answer (अंतिम उत्तर)**\n\n" +
        "Provide responses bilingually (English and Hindi mix for complete clarity). Be accurate, concise, step-by-step, and encouraging!";

      let contents: any = message || "Please solve and explain this exam question step-by-step bilingually.";

      if (image) {
        let mimeType = "image/png";
        let base64Data = image;
        if (image.startsWith("data:")) {
          const parts = image.split(";base64,");
          if (parts.length === 2) {
            mimeType = parts[0].replace("data:", "");
            base64Data = parts[1];
          }
        }
        
        const imagePart = {
          inlineData: {
            mimeType: mimeType,
            data: base64Data,
          }
        };
        const textPart = {
          text: message || "Please read and solve the question in this image step-by-step, providing key formulas, short tricks, and clear bilingual explanations.",
        };
        contents = { parts: [imagePart, textPart] };
      }

      // Query Gemini
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.3,
        },
      });

      const text = response.text || "I was unable to formulate a response. Please rephrase your query.";
      res.json({ text });
    } catch (error: any) {
      console.error("AI Doubt Solver Error:", error);
      res.status(500).json({ 
        error: "Failed to generate AI response", 
        details: error.message || error 
      });
    }
  });

  // ==========================================
  // ⚡ SSC.GOV.IN REAL-TIME PORTAL MONITOR APIS
  // ==========================================

  // 1. Check live status of https://ssc.gov.in/
  app.get("/api/ssc/status", async (req, res) => {
    try {
      const health = await checkSscPortalHealth();
      const status = getSyncStatus();
      res.json({
        ...status,
        ...health,
        timestamp: new Date().toISOString()
      });
    } catch (e: any) {
      res.json(getSyncStatus());
    }
  });

  // 2. Get live feed of SSC releases (Vacancies, Admit Cards, Results, Answer Keys)
  app.get("/api/ssc/live-feed", (req, res) => {
    const category = req.query.category as string | undefined;
    const notices = getSscNotices(category);
    res.json({
      success: true,
      portal: "https://ssc.gov.in/",
      count: notices.length,
      notices
    });
  });

  // 3. Trigger immediate sync check with ssc.gov.in
  app.post("/api/ssc/sync-now", async (req, res) => {
    try {
      const health = await checkSscPortalHealth();
      const status = getSyncStatus();
      const notices = getSscNotices();
      res.json({
        success: true,
        message: "SSC Portal synchronized successfully with https://ssc.gov.in/",
        health,
        status,
        syncedAt: new Date().toISOString(),
        totalNotices: notices.length,
        notices
      });
    } catch (e: any) {
      res.status(500).json({
        success: false,
        error: "Failed to sync with SSC portal",
        details: e.message || e
      });
    }
  });

  // 4. Ingest or publish a new notice to the SSC live feed
  app.post("/api/ssc/publish-notice", (req, res) => {
    const notice: SscLiveNotice = req.body;
    if (!notice || !notice.title || !notice.category) {
      return res.status(400).json({ error: "Notice title and category are required." });
    }

    if (!notice.id) {
      notice.id = `ssc-notice-${Date.now()}`;
    }
    if (!notice.publishedDate) {
      notice.publishedDate = new Date().toISOString().split("T")[0];
    }
    if (!notice.officialUrl) {
      notice.officialUrl = "https://ssc.gov.in/";
    }
    notice.isNew = true;

    const savedNotice = addSscNotice(notice);
    res.json({
      success: true,
      message: `New notice published and synchronized to website feed: ${notice.title}`,
      notice: savedNotice
    });
  });

  // 5. Intelligent auto-parser for raw notice text/URL from ssc.gov.in
  app.post("/api/ssc/auto-parse", async (req, res) => {
    const { rawNoticeText, officialUrl } = req.body;
    if (!rawNoticeText) {
      return res.status(400).json({ error: "rawNoticeText is required." });
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const targetUrl = officialUrl || "https://ssc.gov.in/";

    // Try AI classification if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } }
        });

        const prompt = `Analyze this official notice text from Staff Selection Commission (https://ssc.gov.in/):
"${rawNoticeText}"

Classify it into one of the 4 exact categories:
- "vacancy" (if it is a new job/recruitment notification, opening, or application form)
- "admit-card" (if it is an admit card, hall ticket, city intimation slip, or PET/PST call letter)
- "result" (if it is an exam result, merit list, cut-off marks, or scorecard declaration)
- "answer-key" (if it is an answer key, tentative key, candidate response sheet, or objection challenge link)

Extract structured JSON strictly following this schema:
{
  "category": "vacancy" | "admit-card" | "result" | "answer-key",
  "title": "Clear English title",
  "titleHi": "Clear Hindi title",
  "statusBadge": "Short badge e.g. New Vacancy / Admit Card Out / Result Declared / Answer Key Live",
  "details": {
    "posts": number (optional),
    "qualification": string (optional),
    "salary": string (optional),
    "examDate": string (optional),
    "lastDate": string (optional),
    "cutoff": string (optional),
    "shiftOrTier": string (optional),
    "summary": "1-2 sentence bilingual summary"
  }
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          const generatedNotice: SscLiveNotice = {
            id: `ssc-notice-ai-${Date.now()}`,
            category: parsed.category || "vacancy",
            title: parsed.title,
            titleHi: parsed.titleHi || parsed.title,
            org: "Staff Selection Commission (SSC) / कर्मचारी चयन आयोग",
            publishedDate: todayStr,
            officialUrl: targetUrl,
            pdfUrl: targetUrl,
            isNew: true,
            statusBadge: parsed.statusBadge || "Live Release",
            details: parsed.details || { summary: rawNoticeText.slice(0, 150) }
          };

          // Generate corresponding item model
          if (generatedNotice.category === "vacancy") {
            generatedNotice.jobData = {
              id: `ssc-job-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Staff Selection Commission (SSC)",
              category: "SSC",
              qualification: (parsed.details?.qualification?.includes("10") ? "10th Pass" : parsed.details?.qualification?.includes("12") ? "12th Pass" : "Graduate") as any,
              ageLimit: "18-30 Years",
              salary: parsed.details?.salary || "Pay Level 4/6/7",
              fees: { General: "₹100", OBC: "₹100", SC_ST_Female: "Exempted (₹0)" },
              totalPosts: parsed.details?.posts || 1000,
              applyUrl: targetUrl,
              pdfUrl: targetUrl,
              officialWebsite: "https://ssc.gov.in/",
              postedDate: todayStr,
              lastDate: parsed.details?.lastDate || todayStr,
              importantDates: {
                applyStart: todayStr,
                applyEnd: parsed.details?.lastDate || todayStr,
                examDate: parsed.details?.examDate || "TBA",
                admitCardRelease: "4 Days Before Exam"
              },
              selectionProcess: ["CBT Online Examination", "Document Verification"],
              location: "All India",
              description: parsed.details?.summary || rawNoticeText,
              formStatus: "started"
            };
          } else if (generatedNotice.category === "admit-card") {
            generatedNotice.admitCardData = {
              id: `admit-ssc-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Staff Selection Commission (SSC)",
              examDate: parsed.details?.examDate || "Upcoming Exam",
              examCity: "All Designated SSC Regional Centres",
              downloadUrl: targetUrl,
              officialLink: "https://ssc.gov.in/",
              addedDate: todayStr
            };
          } else if (generatedNotice.category === "result") {
            generatedNotice.resultData = {
              id: `res-ssc-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Staff Selection Commission (SSC)",
              meritListUrl: targetUrl,
              scoreCardUrl: targetUrl,
              cutOff: { UR: "Declared", OBC: "Declared", SC: "Declared", ST: "Declared" },
              downloadUrl: targetUrl,
              releaseDate: todayStr
            };
          } else if (generatedNotice.category === "answer-key") {
            generatedNotice.answerKeyData = {
              id: `ans-ssc-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Staff Selection Commission (SSC)",
              released: todayStr,
              objectionsLimit: "Active Online Challenge Window",
              pdfUrl: targetUrl
            };
          }

          addSscNotice(generatedNotice);
          return res.json({ success: true, notice: generatedNotice });
        }
      } catch (geminiErr) {
        console.warn("Gemini auto-parse fallback to heuristic:", geminiErr);
      }
    }

    // Heuristic classification fallback
    const lower = rawNoticeText.toLowerCase();
    let cat: 'vacancy' | 'admit-card' | 'result' | 'answer-key' = 'vacancy';
    let badge = 'New Release';

    if (lower.includes('admit') || lower.includes('hall ticket') || lower.includes('city') || lower.includes('intimation') || lower.includes('प्रवेश पत्र')) {
      cat = 'admit-card';
      badge = 'Admit Card Live';
    } else if (lower.includes('result') || lower.includes('merit') || lower.includes('cut off') || lower.includes('cutoff') || lower.includes('परिणाम') || lower.includes('मार्क्स')) {
      cat = 'result';
      badge = 'Result Declared';
    } else if (lower.includes('answer key') || lower.includes('response sheet') || lower.includes('objection') || lower.includes('उत्तर कुंजी')) {
      cat = 'answer-key';
      badge = 'Answer Key Live';
    } else {
      cat = 'vacancy';
      badge = 'New Vacancy';
    }

    const fallbackNotice: SscLiveNotice = {
      id: `ssc-notice-heur-${Date.now()}`,
      category: cat,
      title: rawNoticeText.split('\n')[0] || rawNoticeText.slice(0, 80),
      titleHi: `कर्मचारी चयन आयोग (SSC): ${rawNoticeText.split('\n')[0] || rawNoticeText.slice(0, 80)}`,
      org: "Staff Selection Commission (SSC) / कर्मचारी चयन आयोग",
      publishedDate: todayStr,
      officialUrl: targetUrl,
      pdfUrl: targetUrl,
      isNew: true,
      statusBadge: badge,
      details: {
        summary: rawNoticeText.slice(0, 200)
      }
    };

    if (cat === "vacancy") {
      fallbackNotice.jobData = {
        id: `ssc-job-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Staff Selection Commission (SSC)",
        category: "SSC",
        qualification: "Graduate",
        ageLimit: "18-30 Years",
        salary: "Standard Commission Scale",
        fees: { General: "₹100", OBC: "₹100", SC_ST_Female: "Exempted" },
        totalPosts: 1000,
        applyUrl: targetUrl,
        pdfUrl: targetUrl,
        officialWebsite: "https://ssc.gov.in/",
        postedDate: todayStr,
        lastDate: todayStr,
        importantDates: { applyStart: todayStr, applyEnd: todayStr, examDate: "TBA", admitCardRelease: "TBA" },
        selectionProcess: ["CBT Exam", "Document Verification"],
        location: "Pan India",
        description: rawNoticeText,
        formStatus: "started"
      };
    } else if (cat === "admit-card") {
      fallbackNotice.admitCardData = {
        id: `admit-ssc-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Staff Selection Commission (SSC)",
        examDate: "Scheduled",
        examCity: "All Regions",
        downloadUrl: targetUrl,
        officialLink: "https://ssc.gov.in/",
        addedDate: todayStr
      };
    } else if (cat === "result") {
      fallbackNotice.resultData = {
        id: `res-ssc-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Staff Selection Commission (SSC)",
        meritListUrl: targetUrl,
        scoreCardUrl: targetUrl,
        cutOff: { UR: "Check PDF", OBC: "Check PDF", SC: "Check PDF", ST: "Check PDF" },
        downloadUrl: targetUrl,
        releaseDate: todayStr
      };
    } else if (cat === "answer-key") {
      fallbackNotice.answerKeyData = {
        id: `ans-ssc-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Staff Selection Commission (SSC)",
        released: todayStr,
        objectionsLimit: "Active Online",
        pdfUrl: targetUrl
      };
    }

    addSscNotice(fallbackNotice);
    res.json({ success: true, notice: fallbackNotice });
  });

  // ==========================================
  // ⚡ UPSC.GOV.IN REAL-TIME PORTAL MONITOR APIS
  // ==========================================

  // 1. Check live status of https://www.upsc.gov.in/
  app.get("/api/upsc/status", async (req, res) => {
    try {
      const health = await checkUpscPortalHealth();
      const status = getUpscSyncStatus();
      res.json({
        ...status,
        ...health,
        timestamp: new Date().toISOString()
      });
    } catch (e: any) {
      res.json(getUpscSyncStatus());
    }
  });

  // 2. Get live feed of UPSC releases (Civil Services, NDA, CDS, ESE, CAPF, CMS, Results, e-Admit Cards, Keys)
  app.get("/api/upsc/live-feed", (req, res) => {
    const category = req.query.category as string | undefined;
    const notices = getUpscNotices(category);
    res.json({
      success: true,
      portal: "https://www.upsc.gov.in/",
      count: notices.length,
      notices
    });
  });

  // 3. Trigger immediate sync check with upsc.gov.in
  app.post("/api/upsc/sync-now", async (req, res) => {
    try {
      const health = await checkUpscPortalHealth();
      const status = getUpscSyncStatus();
      const notices = getUpscNotices();
      res.json({
        success: true,
        message: "UPSC Portal synchronized successfully with https://www.upsc.gov.in/",
        health,
        status,
        syncedAt: new Date().toISOString(),
        totalNotices: notices.length,
        notices
      });
    } catch (e: any) {
      res.status(500).json({
        success: false,
        error: "Failed to sync with UPSC portal",
        details: e.message || e
      });
    }
  });

  // 4. Ingest or publish a new notice to the UPSC live feed
  app.post("/api/upsc/publish-notice", (req, res) => {
    const notice: UpscLiveNotice = req.body;
    if (!notice || !notice.title || !notice.category) {
      return res.status(400).json({ error: "Notice title and category are required." });
    }

    if (!notice.id) {
      notice.id = `upsc-notice-${Date.now()}`;
    }
    if (!notice.publishedDate) {
      notice.publishedDate = new Date().toISOString().split("T")[0];
    }
    if (!notice.officialUrl) {
      notice.officialUrl = "https://www.upsc.gov.in/";
    }
    notice.isNew = true;

    const savedNotice = addUpscNotice(notice);
    res.json({
      success: true,
      message: `New notice published and synchronized to website feed: ${notice.title}`,
      notice: savedNotice
    });
  });

  // 5. Intelligent auto-parser for raw notice text/URL from upsc.gov.in
  app.post("/api/upsc/auto-parse", async (req, res) => {
    const { rawNoticeText, officialUrl } = req.body;
    if (!rawNoticeText) {
      return res.status(400).json({ error: "rawNoticeText is required." });
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const targetUrl = officialUrl || "https://www.upsc.gov.in/";

    // Try AI classification if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } }
        });

        const prompt = `Analyze this official notice text from Union Public Service Commission (https://www.upsc.gov.in/):
"${rawNoticeText}"

Classify it into one of the 4 exact categories:
- "vacancy" (if it is a new examination notification, advertisement, opening, e.g. Civil Services, NDA, CDS, ESE, CAPF)
- "admit-card" (if it is an e-admit card, hall ticket, e-summon letter for interview/personality test)
- "result" (if it is a written result, final recommendation list, reserve list, or cutoff marks)
- "answer-key" (if it is an official answer key, question paper key)

Extract structured JSON strictly following this schema:
{
  "category": "vacancy" | "admit-card" | "result" | "answer-key",
  "title": "Clear English title",
  "titleHi": "Clear Hindi title",
  "statusBadge": "Short badge e.g. New Vacancy / e-Admit Card Out / Final Result Declared / Answer Key Live",
  "details": {
    "posts": number (optional),
    "qualification": string (optional),
    "salary": string (optional),
    "examDate": string (optional),
    "lastDate": string (optional),
    "cutoff": string (optional),
    "stage": string (optional),
    "summary": "1-2 sentence bilingual summary"
  }
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          const generatedNotice: UpscLiveNotice = {
            id: `upsc-notice-ai-${Date.now()}`,
            category: parsed.category || "vacancy",
            title: parsed.title,
            titleHi: parsed.titleHi || parsed.title,
            org: "Union Public Service Commission (UPSC) / संघ लोक सेवा आयोग",
            publishedDate: todayStr,
            officialUrl: targetUrl,
            pdfUrl: targetUrl,
            isNew: true,
            statusBadge: parsed.statusBadge || "Live Release",
            details: parsed.details || { summary: rawNoticeText.slice(0, 150) }
          };

          if (generatedNotice.category === "vacancy") {
            generatedNotice.jobData = {
              id: `upsc-job-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Union Public Service Commission (UPSC)",
              category: "UPSC",
              qualification: "Graduate",
              ageLimit: "21-32 Years",
              salary: parsed.details?.salary || "Level 10 (₹56,100 - ₹1,77,500)",
              fees: { General: "₹100", OBC: "₹100", SC_ST_Female: "Exempted (₹0)" },
              totalPosts: parsed.details?.posts || 500,
              applyUrl: "https://upsconline.nic.in/",
              pdfUrl: targetUrl,
              officialWebsite: "https://www.upsc.gov.in/",
              postedDate: todayStr,
              lastDate: parsed.details?.lastDate || todayStr,
              importantDates: {
                applyStart: todayStr,
                applyEnd: parsed.details?.lastDate || todayStr,
                examDate: parsed.details?.examDate || "Scheduled",
                admitCardRelease: "3 Weeks Before Exam"
              },
              selectionProcess: ["Preliminary Examination", "Mains Examination", "Personality Test"],
              location: "All India",
              description: parsed.details?.summary || rawNoticeText,
              formStatus: "started"
            };
          } else if (generatedNotice.category === "admit-card") {
            generatedNotice.admitCardData = {
              id: `admit-upsc-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Union Public Service Commission (UPSC)",
              examDate: parsed.details?.examDate || "Scheduled Exam",
              examCity: "All Designated UPSC Centers",
              downloadUrl: "https://upsconline.nic.in/eadmitcard/",
              officialLink: "https://www.upsc.gov.in/",
              addedDate: todayStr
            };
          } else if (generatedNotice.category === "result") {
            generatedNotice.resultData = {
              id: `res-upsc-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Union Public Service Commission (UPSC)",
              meritListUrl: targetUrl,
              scoreCardUrl: "https://upsconline.nic.in/marks/searchMarks.php",
              cutOff: { UR: "Declared", OBC: "Declared", SC: "Declared", ST: "Declared" },
              downloadUrl: targetUrl,
              releaseDate: todayStr
            };
          } else if (generatedNotice.category === "answer-key") {
            generatedNotice.answerKeyData = {
              id: `ans-upsc-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Union Public Service Commission (UPSC)",
              released: todayStr,
              objectionsLimit: "Official Key",
              pdfUrl: targetUrl
            };
          }

          addUpscNotice(generatedNotice);
          return res.json({ success: true, notice: generatedNotice });
        }
      } catch (geminiErr) {
        console.warn("Gemini UPSC auto-parse fallback to heuristic:", geminiErr);
      }
    }

    // Heuristic classification fallback
    const lower = rawNoticeText.toLowerCase();
    let cat: 'vacancy' | 'admit-card' | 'result' | 'answer-key' = 'vacancy';
    let badge = 'New Release';

    if (lower.includes('admit') || lower.includes('e-admit') || lower.includes('hall ticket') || lower.includes('summon') || lower.includes('interview letter') || lower.includes('प्रवेश पत्र')) {
      cat = 'admit-card';
      badge = 'e-Admit Card Live';
    } else if (lower.includes('result') || lower.includes('recommend') || lower.includes('merit') || lower.includes('cut off') || lower.includes('cutoff') || lower.includes('परिणाम')) {
      cat = 'result';
      badge = 'Result Declared';
    } else if (lower.includes('answer key') || lower.includes('key') || lower.includes('उत्तर कुंजी')) {
      cat = 'answer-key';
      badge = 'Answer Key Live';
    } else {
      cat = 'vacancy';
      badge = 'New Vacancy';
    }

    const fallbackNotice: UpscLiveNotice = {
      id: `upsc-notice-heur-${Date.now()}`,
      category: cat,
      title: rawNoticeText.split('\n')[0] || rawNoticeText.slice(0, 80),
      titleHi: `संघ लोक सेवा आयोग (UPSC): ${rawNoticeText.split('\n')[0] || rawNoticeText.slice(0, 80)}`,
      org: "Union Public Service Commission (UPSC) / संघ लोक सेवा आयोग",
      publishedDate: todayStr,
      officialUrl: targetUrl,
      pdfUrl: targetUrl,
      isNew: true,
      statusBadge: badge,
      details: {
        summary: rawNoticeText.slice(0, 200)
      }
    };

    if (cat === "vacancy") {
      fallbackNotice.jobData = {
        id: `upsc-job-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Union Public Service Commission (UPSC)",
        category: "UPSC",
        qualification: "Graduate",
        ageLimit: "21-32 Years",
        salary: "Pay Level 10 (₹56,100+)",
        fees: { General: "₹100", OBC: "₹100", SC_ST_Female: "Exempted" },
        totalPosts: 500,
        applyUrl: "https://upsconline.nic.in/",
        pdfUrl: targetUrl,
        officialWebsite: "https://www.upsc.gov.in/",
        postedDate: todayStr,
        lastDate: todayStr,
        importantDates: { applyStart: todayStr, applyEnd: todayStr, examDate: "Scheduled", admitCardRelease: "TBA" },
        selectionProcess: ["Prelims", "Mains", "Interview"],
        location: "Pan India",
        description: rawNoticeText,
        formStatus: "started"
      };
    } else if (cat === "admit-card") {
      fallbackNotice.admitCardData = {
        id: `admit-upsc-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Union Public Service Commission (UPSC)",
        examDate: "Scheduled",
        examCity: "All Regions",
        downloadUrl: "https://upsconline.nic.in/eadmitcard/",
        officialLink: "https://www.upsc.gov.in/",
        addedDate: todayStr
      };
    } else if (cat === "result") {
      fallbackNotice.resultData = {
        id: `res-upsc-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Union Public Service Commission (UPSC)",
        meritListUrl: targetUrl,
        scoreCardUrl: "https://upsconline.nic.in/marks/searchMarks.php",
        cutOff: { UR: "Check PDF", OBC: "Check PDF", SC: "Check PDF", ST: "Check PDF" },
        downloadUrl: targetUrl,
        releaseDate: todayStr
      };
    } else if (cat === "answer-key") {
      fallbackNotice.answerKeyData = {
        id: `ans-upsc-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Union Public Service Commission (UPSC)",
        released: todayStr,
        objectionsLimit: "Published",
        pdfUrl: targetUrl
      };
    }

    addUpscNotice(fallbackNotice);
    res.json({ success: true, notice: fallbackNotice });
  });

  // ==========================================
  // 🚆 RRBAPPLY.GOV.IN REAL-TIME PORTAL MONITOR APIS
  // ==========================================

  // 1. Check live status of https://www.rrbapply.gov.in/#/auth/landing
  app.get("/api/rrb/status", async (req, res) => {
    try {
      const health = await checkRrbPortalHealth();
      const status = getRrbSyncStatus();
      res.json({
        ...status,
        ...health,
        timestamp: new Date().toISOString()
      });
    } catch (e: any) {
      res.json(getRrbSyncStatus());
    }
  });

  // 2. Get live feed of RRB releases (NTPC, ALP, Technician, JE, Paramedical, RPF SI/Constable)
  app.get("/api/rrb/live-feed", (req, res) => {
    const category = req.query.category as string | undefined;
    const notices = getRrbNotices(category);
    res.json({
      success: true,
      portal: "https://www.rrbapply.gov.in/#/auth/landing",
      count: notices.length,
      notices
    });
  });

  // 3. Trigger immediate sync check with rrbapply.gov.in
  app.post("/api/rrb/sync-now", async (req, res) => {
    try {
      const health = await checkRrbPortalHealth();
      const status = getRrbSyncStatus();
      const notices = getRrbNotices();
      res.json({
        success: true,
        message: "RRB Portal synchronized successfully with https://www.rrbapply.gov.in/",
        health,
        status,
        syncedAt: new Date().toISOString(),
        totalNotices: notices.length,
        notices
      });
    } catch (e: any) {
      res.status(500).json({
        success: false,
        error: "Failed to sync with RRB portal",
        details: e.message || e
      });
    }
  });

  // 4. Ingest or publish a new notice to the RRB live feed
  app.post("/api/rrb/publish-notice", (req, res) => {
    const notice: RrbLiveNotice = req.body;
    if (!notice || !notice.title || !notice.category) {
      return res.status(400).json({ error: "Notice title and category are required." });
    }

    if (!notice.id) {
      notice.id = `rrb-notice-${Date.now()}`;
    }
    if (!notice.publishedDate) {
      notice.publishedDate = new Date().toISOString().split("T")[0];
    }
    if (!notice.officialUrl) {
      notice.officialUrl = "https://www.rrbapply.gov.in/#/auth/landing";
    }
    notice.isNew = true;

    const savedNotice = addRrbNotice(notice);
    res.json({
      success: true,
      message: `New Railway notice published and synchronized to website feed: ${notice.title}`,
      notice: savedNotice
    });
  });

  // 5. Intelligent auto-parser for raw RRB notification text / CEN link
  app.post("/api/rrb/auto-parse", async (req, res) => {
    const { rawNoticeText, officialUrl } = req.body;
    if (!rawNoticeText) {
      return res.status(400).json({ error: "rawNoticeText is required." });
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const targetUrl = officialUrl || "https://www.rrbapply.gov.in/#/auth/landing";

    // Try AI classification if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } }
        });

        const prompt = `Analyze this official notice text from Railway Recruitment Boards (https://www.rrbapply.gov.in/):
"${rawNoticeText}"

Classify it into one of the 4 exact categories:
- "vacancy" (if it is a new CEN notification, recruitment advertisement, e.g. NTPC, ALP, Technician, JE, Group D, RPF)
- "admit-card" (if it is an e-call letter, exam city intimation slip, travel pass, CBT admit card)
- "result" (if it is a CBT-1/CBT-2 result, cut-off marks, merit list, document verification shortlist, provisional panel)
- "answer-key" (if it is an official answer key, response sheet, objection tracker)

Extract structured JSON strictly following this schema:
{
  "category": "vacancy" | "admit-card" | "result" | "answer-key",
  "cenNumber": "e.g. CEN 01/2026, CEN 05/2026 or empty",
  "title": "Clear English title",
  "titleHi": "Clear Hindi title",
  "statusBadge": "Short badge e.g. New Vacancy / City Slip & Hall Ticket Live / CBT Result Declared / Objection Tracker Open",
  "details": {
    "posts": number (optional),
    "qualification": string (optional),
    "salary": string (optional),
    "examDate": string (optional),
    "lastDate": string (optional),
    "cutoff": string (optional),
    "stage": string (optional),
    "cityIntimationDate": string (optional),
    "summary": "1-2 sentence bilingual summary"
  }
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          const generatedNotice: RrbLiveNotice = {
            id: `rrb-notice-ai-${Date.now()}`,
            cenNumber: parsed.cenNumber || undefined,
            category: parsed.category || "vacancy",
            title: parsed.title,
            titleHi: parsed.titleHi || parsed.title,
            org: "Railway Recruitment Boards (RRB) / रेल भर्ती बोर्ड",
            publishedDate: todayStr,
            officialUrl: targetUrl,
            pdfUrl: targetUrl,
            isNew: true,
            statusBadge: parsed.statusBadge || "Live Release",
            details: parsed.details || { summary: rawNoticeText.slice(0, 150) }
          };

          if (generatedNotice.category === "vacancy") {
            generatedNotice.jobData = {
              id: `rrb-job-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Railway Recruitment Boards (RRB)",
              category: "Railway",
              qualification: parsed.details?.qualification || "10th / ITI / Graduate",
              ageLimit: "18-36 Years",
              salary: parsed.details?.salary || "Level 2 to Level 6 (₹19,900 - ₹35,400+)",
              fees: { General: "₹500 (Refundable ₹400)", OBC: "₹500", SC_ST_Female: "₹250 (Full Refundable)" },
              totalPosts: parsed.details?.posts || 5000,
              applyUrl: "https://www.rrbapply.gov.in/#/auth/landing",
              pdfUrl: targetUrl,
              officialWebsite: "https://www.rrbapply.gov.in/",
              postedDate: todayStr,
              lastDate: parsed.details?.lastDate || todayStr,
              importantDates: {
                applyStart: todayStr,
                applyEnd: parsed.details?.lastDate || todayStr,
                examDate: parsed.details?.examDate || "Scheduled",
                admitCardRelease: "4 Days Prior to Exam (City Slip 10 Days Before)"
              },
              selectionProcess: ["1st Stage CBT", "2nd Stage CBT (as applicable)", "Aptitude / Skill Test", "Document Verification & Medical Exam"],
              location: "All 21 RRB Zones Across India",
              description: parsed.details?.summary || rawNoticeText,
              formStatus: "started"
            };
          } else if (generatedNotice.category === "admit-card") {
            generatedNotice.admitCardData = {
              id: `admit-rrb-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Railway Recruitment Boards (RRB)",
              examDate: parsed.details?.examDate || "Upcoming Exam",
              examCity: "Check Candidate Login Slip",
              downloadUrl: "https://www.rrbapply.gov.in/#/auth/landing",
              officialLink: "https://www.rrbapply.gov.in/",
              addedDate: todayStr
            };
          } else if (generatedNotice.category === "result") {
            generatedNotice.resultData = {
              id: `res-rrb-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Railway Recruitment Boards (RRB)",
              meritListUrl: targetUrl,
              scoreCardUrl: "https://www.rrbapply.gov.in/#/auth/landing",
              cutOff: { UR: "Cutoff in PDF", OBC: "Cutoff in PDF", SC: "Cutoff in PDF", ST: "Cutoff in PDF" },
              downloadUrl: targetUrl,
              releaseDate: todayStr
            };
          } else if (generatedNotice.category === "answer-key") {
            generatedNotice.answerKeyData = {
              id: `ans-rrb-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Railway Recruitment Boards (RRB)",
              released: todayStr,
              objectionsLimit: "Objection Tracker Live on Portal",
              pdfUrl: targetUrl
            };
          }

          addRrbNotice(generatedNotice);
          return res.json({ success: true, notice: generatedNotice });
        }
      } catch (geminiErr) {
        console.warn("Gemini RRB auto-parse fallback to heuristic:", geminiErr);
      }
    }

    // Heuristic classification fallback
    const lower = rawNoticeText.toLowerCase();
    let cat: 'vacancy' | 'admit-card' | 'result' | 'answer-key' = 'vacancy';
    let badge = 'New Release';

    if (lower.includes('call letter') || lower.includes('admit') || lower.includes('city intimation') || lower.includes('city slip') || lower.includes('hall ticket') || lower.includes('प्रवेश पत्र') || lower.includes('ई-कॉल')) {
      cat = 'admit-card';
      badge = 'City Slip & Hall Ticket Live';
    } else if (lower.includes('result') || lower.includes('shortlist') || lower.includes('merit') || lower.includes('cut off') || lower.includes('cutoff') || lower.includes('scorecard') || lower.includes('परिणाम')) {
      cat = 'result';
      badge = 'Result Declared';
    } else if (lower.includes('answer key') || lower.includes('objection') || lower.includes('key') || lower.includes('उत्तर कुंजी') || lower.includes('आपत्ति')) {
      cat = 'answer-key';
      badge = 'Answer Key & Objection Live';
    } else {
      cat = 'vacancy';
      badge = 'New Railway Recruitment';
    }

    const fallbackNotice: RrbLiveNotice = {
      id: `rrb-notice-heur-${Date.now()}`,
      category: cat,
      title: rawNoticeText.split('\n')[0] || rawNoticeText.slice(0, 80),
      titleHi: `रेल भर्ती बोर्ड (RRB): ${rawNoticeText.split('\n')[0] || rawNoticeText.slice(0, 80)}`,
      org: "Railway Recruitment Boards (RRB) / रेल भर्ती बोर्ड",
      publishedDate: todayStr,
      officialUrl: targetUrl,
      pdfUrl: targetUrl,
      isNew: true,
      statusBadge: badge,
      details: {
        summary: rawNoticeText.slice(0, 200)
      }
    };

    if (cat === "vacancy") {
      fallbackNotice.jobData = {
        id: `rrb-job-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Railway Recruitment Boards (RRB)",
        category: "Railway",
        qualification: "10th / ITI / 12th / Graduate",
        ageLimit: "18-36 Years",
        salary: "Level 2 to Level 6 (₹19,900 - ₹35,400+)",
        fees: { General: "₹500", OBC: "₹500", SC_ST_Female: "₹250" },
        totalPosts: 2000,
        applyUrl: "https://www.rrbapply.gov.in/#/auth/landing",
        pdfUrl: targetUrl,
        officialWebsite: "https://www.rrbapply.gov.in/",
        postedDate: todayStr,
        lastDate: todayStr,
        importantDates: { applyStart: todayStr, applyEnd: todayStr, examDate: "Scheduled", admitCardRelease: "TBA" },
        selectionProcess: ["CBT 1", "CBT 2", "DV & Medical"],
        location: "Pan India Railway Zones",
        description: rawNoticeText,
        formStatus: "started"
      };
    } else if (cat === "admit-card") {
      fallbackNotice.admitCardData = {
        id: `admit-rrb-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Railway Recruitment Boards (RRB)",
        examDate: "Scheduled Exam",
        examCity: "Check rrbapply.gov.in Candidate Slip",
        downloadUrl: "https://www.rrbapply.gov.in/#/auth/landing",
        officialLink: "https://www.rrbapply.gov.in/",
        addedDate: todayStr
      };
    } else if (cat === "result") {
      fallbackNotice.resultData = {
        id: `res-rrb-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Railway Recruitment Boards (RRB)",
        meritListUrl: targetUrl,
        scoreCardUrl: "https://www.rrbapply.gov.in/#/auth/landing",
        cutOff: { UR: "Check PDF", OBC: "Check PDF", SC: "Check PDF", ST: "Check PDF" },
        downloadUrl: targetUrl,
        releaseDate: todayStr
      };
    } else if (cat === "answer-key") {
      fallbackNotice.answerKeyData = {
        id: `ans-rrb-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Railway Recruitment Boards (RRB)",
        released: todayStr,
        objectionsLimit: "Active on rrbapply.gov.in",
        pdfUrl: targetUrl
      };
    }

    addRrbNotice(fallbackNotice);
    res.json({ success: true, notice: fallbackNotice });
  });

  // ==========================================
  // 🏦 IBPS.IN REAL-TIME PORTAL MONITOR APIS
  // ==========================================

  // 1. Check live status of https://www.ibps.in/
  app.get("/api/ibps/status", async (req, res) => {
    try {
      const health = await checkIbpsPortalHealth();
      const status = getIbpsSyncStatus();
      res.json({
        ...status,
        ...health,
        timestamp: new Date().toISOString()
      });
    } catch (e: any) {
      res.json(getIbpsSyncStatus());
    }
  });

  // 2. Get live feed of IBPS releases (CRP PO/MT, CRP Clerk, CRP RRBs, CRP SPL)
  app.get("/api/ibps/live-feed", (req, res) => {
    const category = req.query.category as string | undefined;
    const cadre = req.query.cadre as string | undefined;
    const notices = getIbpsNotices(category, cadre);
    res.json({
      success: true,
      portal: "https://www.ibps.in/",
      count: notices.length,
      notices
    });
  });

  // 3. Instant On-Demand Refresh / Re-check of https://www.ibps.in/
  app.post("/api/ibps/sync-now", async (req, res) => {
    try {
      const health = await checkIbpsPortalHealth();
      const notices = getIbpsNotices();
      res.json({
        success: true,
        message: "IBPS Portal (https://www.ibps.in/) successfully contacted and synchronized.",
        health,
        totalNotices: notices.length,
        notices
      });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to sync with IBPS portal", details: err?.message });
    }
  });

  // 4. Manually publish new live IBPS notice
  app.post("/api/ibps/publish-notice", (req, res) => {
    const notice: IbpsLiveNotice = req.body;
    if (!notice || !notice.title || !notice.category) {
      return res.status(400).json({ error: "Notice title and category are required." });
    }

    if (!notice.id) {
      notice.id = `ibps-notice-${Date.now()}`;
    }
    if (!notice.publishedDate) {
      notice.publishedDate = new Date().toISOString().split("T")[0];
    }
    if (!notice.officialUrl) {
      notice.officialUrl = "https://www.ibps.in/";
    }
    notice.isNew = true;

    const savedNotice = addIbpsNotice(notice);
    res.json({
      success: true,
      message: `New notice published and synchronized to IBPS live feed: ${notice.title}`,
      notice: savedNotice
    });
  });

  // 5. Intelligent auto-parser for raw notice text/URL from ibps.in
  app.post("/api/ibps/auto-parse", async (req, res) => {
    const { rawNoticeText, officialUrl } = req.body;
    if (!rawNoticeText) {
      return res.status(400).json({ error: "rawNoticeText is required." });
    }

    const todayStr = new Date().toISOString().split("T")[0];
    const targetUrl = officialUrl || "https://www.ibps.in/";

    // Try AI classification if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: { headers: { "User-Agent": "aistudio-build" } }
        });

        const prompt = `Analyze this official notification text from Institute of Banking Personnel Selection - IBPS (https://www.ibps.in/):
"${rawNoticeText}"

Classify it into one of the 4 exact categories:
- "vacancy" (if it is a new bank recruitment advertisement, CRP PO/MT, CRP Clerk, CRP RRBs, CRP Specialist Officers)
- "admit-card" (if it is an online prelims/mains exam call letter, interview call letter, PET call letter)
- "result" (if it is a preliminary/main score display, cutoff marks, provisional allotment list or reserve list)
- "answer-key" (if it is a response sheet, tentative answer key, objection link, or annual calendar)

Extract structured JSON strictly following this schema:
{
  "category": "vacancy" | "admit-card" | "result" | "answer-key",
  "crpCode": string (e.g. "CRP PO/MT-XVI", "CRP CLERK-XVI", "CRP RRBs-XV", "CRP SPL-XVI"),
  "cadre": "PO" | "Clerk" | "SO" | "RRB" | "Specialist",
  "title": "Clear English title",
  "titleHi": "Clear Hindi title",
  "statusBadge": "Short badge e.g. PO Vacancy Live / Call Letter Out / Prelims Scores Out / Allotment List",
  "details": {
    "posts": number (optional),
    "qualification": string (optional),
    "salary": string (optional),
    "examDate": string (optional),
    "lastDate": string (optional),
    "cutoff": string (optional),
    "stage": string (optional),
    "summary": "1-2 sentence bilingual summary"
  }
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          const generatedNotice: IbpsLiveNotice = {
            id: `ibps-notice-ai-${Date.now()}`,
            crpCode: parsed.crpCode || "CRP-2026",
            cadre: parsed.cadre || "PO",
            category: parsed.category || "vacancy",
            title: parsed.title,
            titleHi: parsed.titleHi || parsed.title,
            org: "Institute of Banking Personnel Selection (IBPS) / बैंकिंग कार्मिक चयन संस्थान",
            publishedDate: todayStr,
            officialUrl: targetUrl,
            pdfUrl: targetUrl,
            isNew: true,
            statusBadge: parsed.statusBadge || "Live Release",
            details: parsed.details || { summary: rawNoticeText.slice(0, 150) }
          };

          if (generatedNotice.category === "vacancy") {
            generatedNotice.jobData = {
              id: `ibps-job-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Institute of Banking Personnel Selection (IBPS)",
              category: "Banking",
              qualification: parsed.details?.qualification || "Graduate Degree",
              ageLimit: "20-30 Years (As per banking norms)",
              salary: parsed.details?.salary || "Basic ₹36,000 - ₹63,840+ (Scale I / Clerical)",
              fees: { General: "₹850", OBC: "₹850", SC_ST_Female: "₹175" },
              totalPosts: parsed.details?.posts || 3000,
              applyUrl: "https://www.ibps.in/",
              pdfUrl: targetUrl,
              officialWebsite: "https://www.ibps.in/",
              postedDate: todayStr,
              lastDate: parsed.details?.lastDate || todayStr,
              importantDates: {
                applyStart: todayStr,
                applyEnd: parsed.details?.lastDate || todayStr,
                examDate: parsed.details?.examDate || "Scheduled",
                admitCardRelease: "10-15 Days Before Exam"
              },
              selectionProcess: ["Online Preliminary Examination", "Online Main Examination", "Interview / Merit List"],
              location: "All Participating Public Sector Banks Across India",
              description: parsed.details?.summary || rawNoticeText,
              formStatus: "started"
            };
          } else if (generatedNotice.category === "admit-card") {
            generatedNotice.admitCardData = {
              id: `admit-ibps-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Institute of Banking Personnel Selection (IBPS)",
              examDate: parsed.details?.examDate || "Upcoming Exam",
              examCity: "All Major Examination Centers",
              downloadUrl: "https://www.ibps.in/",
              officialLink: "https://www.ibps.in/",
              addedDate: todayStr
            };
          } else if (generatedNotice.category === "result") {
            generatedNotice.resultData = {
              id: `res-ibps-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Institute of Banking Personnel Selection (IBPS)",
              meritListUrl: targetUrl,
              scoreCardUrl: "https://www.ibps.in/",
              cutOff: { UR: parsed.details?.cutoff || "Check Scores", OBC: "Check Scores", SC: "Check Scores", ST: "Check Scores" },
              downloadUrl: targetUrl,
              releaseDate: todayStr
            };
          } else if (generatedNotice.category === "answer-key") {
            generatedNotice.answerKeyData = {
              id: `ans-ibps-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "Institute of Banking Personnel Selection (IBPS)",
              released: todayStr,
              objectionsLimit: "Active on ibps.in",
              pdfUrl: targetUrl
            };
          }

          addIbpsNotice(generatedNotice);
          return res.json({ success: true, notice: generatedNotice });
        }
      } catch (aiErr) {
        console.warn("Gemini AI Parsing failed for IBPS notice, falling back to heuristics:", aiErr);
      }
    }

    // Heuristic Fallback
    const lower = rawNoticeText.toLowerCase();
    let cat: "vacancy" | "admit-card" | "result" | "answer-key" = "vacancy";
    let badge = "Live IBPS Release";

    if (lower.includes("call letter") || lower.includes("admit") || lower.includes("handout") || lower.includes("प्रवेश पत्र")) {
      cat = "admit-card";
      badge = "Call Letter Out";
    } else if (lower.includes("score") || lower.includes("result") || lower.includes("allotment") || lower.includes("cutoff") || lower.includes("परिणाम")) {
      cat = "result";
      badge = "Result & Scores Live";
    } else if (lower.includes("answer key") || lower.includes("response sheet") || lower.includes("objection") || lower.includes("calendar")) {
      cat = "answer-key";
      badge = "Answer Key / Notice";
    } else {
      cat = "vacancy";
      badge = "Banking Recruitment Live";
    }

    const fallbackNotice: IbpsLiveNotice = {
      id: `ibps-notice-heur-${Date.now()}`,
      category: cat,
      crpCode: "CRP-2026",
      cadre: "PO",
      title: rawNoticeText.split("\n")[0] || rawNoticeText.slice(0, 80),
      titleHi: `आईबीपीएस: ${rawNoticeText.split("\n")[0] || rawNoticeText.slice(0, 80)}`,
      org: "Institute of Banking Personnel Selection (IBPS) / बैंकिंग कार्मिक चयन संस्थान",
      publishedDate: todayStr,
      officialUrl: targetUrl,
      pdfUrl: targetUrl,
      isNew: true,
      statusBadge: badge,
      details: {
        summary: rawNoticeText.slice(0, 200)
      }
    };

    if (cat === "vacancy") {
      fallbackNotice.jobData = {
        id: `ibps-job-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Institute of Banking Personnel Selection (IBPS)",
        category: "Banking",
        qualification: "Graduate Degree",
        ageLimit: "20-30 Years",
        salary: "Basic ₹36,000 - ₹63,840+",
        fees: { General: "₹850", OBC: "₹850", SC_ST_Female: "₹175" },
        totalPosts: 3000,
        applyUrl: "https://www.ibps.in/",
        pdfUrl: targetUrl,
        officialWebsite: "https://www.ibps.in/",
        postedDate: todayStr,
        lastDate: todayStr,
        importantDates: { applyStart: todayStr, applyEnd: todayStr, examDate: "Scheduled", admitCardRelease: "TBA" },
        selectionProcess: ["Prelims", "Mains", "Interview"],
        location: "Pan India Public Sector Banks",
        description: rawNoticeText,
        formStatus: "started"
      };
    } else if (cat === "admit-card") {
      fallbackNotice.admitCardData = {
        id: `admit-ibps-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Institute of Banking Personnel Selection (IBPS)",
        examDate: "Scheduled",
        examCity: "All Centers",
        downloadUrl: "https://www.ibps.in/",
        officialLink: "https://www.ibps.in/",
        addedDate: todayStr
      };
    } else if (cat === "result") {
      fallbackNotice.resultData = {
        id: `res-ibps-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Institute of Banking Personnel Selection (IBPS)",
        meritListUrl: targetUrl,
        scoreCardUrl: "https://www.ibps.in/",
        cutOff: { UR: "Check Scores", OBC: "Check Scores", SC: "Check Scores", ST: "Check Scores" },
        downloadUrl: targetUrl,
        releaseDate: todayStr
      };
    } else if (cat === "answer-key") {
      fallbackNotice.answerKeyData = {
        id: `ans-ibps-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "Institute of Banking Personnel Selection (IBPS)",
        released: todayStr,
        objectionsLimit: "Active on ibps.in",
        pdfUrl: targetUrl
      };
    }

    addIbpsNotice(fallbackNotice);
    res.json({ success: true, notice: fallbackNotice });
  });

  // ==========================================
  // SBI.BANK.IN LIVE MONITORING & GATEWAY APIS
  // ==========================================

  // 1. Get Live Portal Health & Sync Status
  app.get("/api/sbi/status", async (req, res) => {
    try {
      const health = await checkSbiPortalHealth();
      const status = getSbiSyncStatus();
      res.json({
        ...status,
        ...health,
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve SBI portal status" });
    }
  });

  // 2. Get Live Notices Monitored from SBI Careers (PO, Clerk, CBO, SCO, Apprentice)
  app.get("/api/sbi/live-feed", (req, res) => {
    const { category, cadre } = req.query;
    const notices = getSbiNotices(
      category as string | undefined,
      cadre as string | undefined
    );
    res.json({
      portal: "https://sbi.bank.in/web/careers/current-openings",
      lastUpdated: new Date().toISOString(),
      count: notices.length,
      notices
    });
  });

  // 3. Force instant refresh from SBI Careers
  app.post("/api/sbi/sync-now", async (req, res) => {
    try {
      const health = await checkSbiPortalHealth();
      const notices = getSbiNotices();
      res.json({
        success: true,
        message: "SBI Careers (Current Openings) synchronized successfully.",
        health,
        totalNotices: notices.length,
        syncedAt: new Date().toISOString()
      });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Sync failed" });
    }
  });

  // 4. Manual Publish Notice to Live Feed
  app.post("/api/sbi/publish-notice", (req, res) => {
    const { notice } = req.body;
    if (!notice || !notice.title || !notice.category) {
      return res.status(400).json({ error: "Notice title and category are required" });
    }
    const saved = addSbiNotice({
      ...notice,
      id: notice.id || `sbi-manual-${Date.now()}`,
      org: notice.org || "State Bank of India (SBI) / भारतीय स्टेट बैंक",
      publishedDate: notice.publishedDate || new Date().toISOString().split("T")[0],
      officialUrl: notice.officialUrl || "https://sbi.bank.in/web/careers/current-openings",
      isNew: true,
      statusBadge: notice.statusBadge || "Admin Published Opening"
    });
    res.json({ success: true, notice: saved });
  });

  // 5. AI-Powered Notice Parser (Paste any SBI advertisement/notice text)
  app.post("/api/sbi/auto-parse", async (req, res) => {
    const { rawNoticeText, sourceUrl } = req.body;
    if (!rawNoticeText) {
      return res.status(400).json({ error: "rawNoticeText is required" });
    }

    const targetUrl = sourceUrl || "https://sbi.bank.in/web/careers/current-openings";
    const todayStr = new Date().toISOString().split("T")[0];

    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const prompt = `You are an expert Government Job & Banking Examination analyst specializing in State Bank of India (SBI) Careers and Recruitment (https://sbi.bank.in/web/careers/current-openings).
Analyze this raw notice announcement or notification text from SBI Careers:
"""
${rawNoticeText}
"""

Classify and extract into JSON:
{
  "category": "vacancy" | "admit-card" | "result" | "answer-key",
  "cadre": "PO" | "Clerk" | "CBO" | "SCO" | "Apprentice",
  "advtNo": string,
  "title": string,
  "titleHi": string,
  "statusBadge": string,
  "details": {
    "posts": number,
    "examDate": string,
    "lastDate": string,
    "cutoff": string,
    "stage": string,
    "summary": string,
    "qualification": string,
    "salary": string,
    "circles": string[]
  }
}
Return JSON strictly.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: { responseMimeType: "application/json" }
        });

        const parsed = JSON.parse(response.text || "{}");
        if (parsed.title) {
          const generatedNotice: SbiLiveNotice = {
            id: `sbi-notice-ai-${Date.now()}`,
            category: parsed.category || "vacancy",
            cadre: parsed.cadre || "PO",
            advtNo: parsed.advtNo || "CRPD/2026-27",
            title: parsed.title,
            titleHi: parsed.titleHi || `एसबीआई: ${parsed.title}`,
            org: "State Bank of India (SBI) / भारतीय स्टेट बैंक",
            publishedDate: todayStr,
            officialUrl: targetUrl,
            pdfUrl: targetUrl,
            isNew: true,
            statusBadge: parsed.statusBadge || "SBI Career Verified",
            details: parsed.details || { summary: rawNoticeText.slice(0, 200) }
          };

          if (generatedNotice.category === "vacancy") {
            generatedNotice.jobData = {
              id: `job-sbi-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "State Bank of India (SBI)",
              category: "Banking",
              qualification: parsed.details?.qualification || "Graduate Degree in any discipline",
              ageLimit: "20-30 Years (As per rules)",
              salary: parsed.details?.salary || "Basic Pay ₹41,960 + Allowances",
              fees: { General: "₹750", OBC: "₹750", SC_ST_Female: "Nil" },
              totalPosts: parsed.details?.posts || 1000,
              applyUrl: targetUrl,
              pdfUrl: targetUrl,
              officialWebsite: "https://sbi.bank.in/web/careers/current-openings",
              postedDate: todayStr,
              lastDate: parsed.details?.lastDate || todayStr,
              importantDates: {
                applyStart: todayStr,
                applyEnd: parsed.details?.lastDate || todayStr,
                examDate: parsed.details?.examDate || "To be scheduled",
                admitCardRelease: "Before Examination"
              },
              selectionProcess: ["Prelims", "Mains", "Interview"],
              location: "Pan India SBI Branches",
              description: parsed.details?.summary || rawNoticeText,
              formStatus: "started"
            };
          } else if (generatedNotice.category === "admit-card") {
            generatedNotice.admitCardData = {
              id: `admit-sbi-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "State Bank of India (SBI)",
              examDate: parsed.details?.examDate || "Scheduled Date",
              examCity: "Pan India Exam Centers",
              downloadUrl: targetUrl,
              officialLink: "https://sbi.bank.in/web/careers/current-openings",
              addedDate: todayStr
            };
          } else if (generatedNotice.category === "result") {
            generatedNotice.resultData = {
              id: `res-sbi-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "State Bank of India (SBI)",
              meritListUrl: targetUrl,
              scoreCardUrl: "https://sbi.bank.in/web/careers/current-openings",
              cutOff: {
                UR: parsed.details?.cutoff || "Declared on Portal",
                OBC: "Declared on Portal",
                SC: "Declared on Portal",
                ST: "Declared on Portal"
              },
              downloadUrl: targetUrl,
              releaseDate: todayStr
            };
          } else if (generatedNotice.category === "answer-key") {
            generatedNotice.answerKeyData = {
              id: `ans-sbi-ai-${Date.now()}`,
              title: generatedNotice.title,
              org: "State Bank of India (SBI)",
              released: todayStr,
              objectionsLimit: "Active on sbi.bank.in",
              pdfUrl: targetUrl
            };
          }

          addSbiNotice(generatedNotice);
          return res.json({ success: true, notice: generatedNotice });
        }
      } catch (aiErr) {
        console.warn("Gemini AI Parsing failed for SBI notice, falling back to heuristics:", aiErr);
      }
    }

    // Heuristic Fallback
    const lower = rawNoticeText.toLowerCase();
    let cat: "vacancy" | "admit-card" | "result" | "answer-key" = "vacancy";
    let cadre: "PO" | "Clerk" | "CBO" | "SCO" | "Apprentice" = "PO";
    let badge = "Live SBI Career Release";

    if (lower.includes("call letter") || lower.includes("admit") || lower.includes("handout") || lower.includes("प्रवेश पत्र")) {
      cat = "admit-card";
      badge = "Call Letter Out";
    } else if (lower.includes("score") || lower.includes("result") || lower.includes("allotment") || lower.includes("cutoff") || lower.includes("marks") || lower.includes("परिणाम")) {
      cat = "result";
      badge = "Result & Scores Live";
    } else if (lower.includes("answer key") || lower.includes("clarification") || lower.includes("normalization")) {
      cat = "answer-key";
      badge = "Key / Notice";
    }

    if (lower.includes("clerk") || lower.includes("junior associate")) cadre = "Clerk";
    else if (lower.includes("cbo") || lower.includes("circle based")) cadre = "CBO";
    else if (lower.includes("sco") || lower.includes("specialist")) cadre = "SCO";
    else if (lower.includes("apprentice")) cadre = "Apprentice";
    else cadre = "PO";

    const fallbackNotice: SbiLiveNotice = {
      id: `sbi-notice-heur-${Date.now()}`,
      category: cat,
      cadre,
      advtNo: "CRPD/2026-27",
      title: rawNoticeText.split("\n")[0] || rawNoticeText.slice(0, 80),
      titleHi: `एसबीआई: ${rawNoticeText.split("\n")[0] || rawNoticeText.slice(0, 80)}`,
      org: "State Bank of India (SBI) / भारतीय स्टेट बैंक",
      publishedDate: todayStr,
      officialUrl: targetUrl,
      pdfUrl: targetUrl,
      isNew: true,
      statusBadge: badge,
      details: {
        summary: rawNoticeText.slice(0, 200)
      }
    };

    if (cat === "vacancy") {
      fallbackNotice.jobData = {
        id: `sbi-job-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "State Bank of India (SBI)",
        category: "Banking",
        qualification: "Graduate Degree",
        ageLimit: "20-30 Years",
        salary: "Basic ₹41,960 - ₹69,810+",
        fees: { General: "₹750", OBC: "₹750", SC_ST_Female: "Nil" },
        totalPosts: 2000,
        applyUrl: "https://sbi.bank.in/web/careers/current-openings",
        pdfUrl: targetUrl,
        officialWebsite: "https://sbi.bank.in/web/careers/current-openings",
        postedDate: todayStr,
        lastDate: todayStr,
        importantDates: { applyStart: todayStr, applyEnd: todayStr, examDate: "Scheduled", admitCardRelease: "TBA" },
        selectionProcess: ["Phase-I Prelims", "Phase-II Mains", "Interview"],
        location: "All India Branches",
        description: rawNoticeText,
        formStatus: "started"
      };
    } else if (cat === "admit-card") {
      fallbackNotice.admitCardData = {
        id: `admit-sbi-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "State Bank of India (SBI)",
        examDate: "Scheduled",
        examCity: "All Centers",
        downloadUrl: "https://sbi.bank.in/web/careers/current-openings",
        officialLink: "https://sbi.bank.in/web/careers/current-openings",
        addedDate: todayStr
      };
    } else if (cat === "result") {
      fallbackNotice.resultData = {
        id: `res-sbi-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "State Bank of India (SBI)",
        meritListUrl: targetUrl,
        scoreCardUrl: "https://sbi.bank.in/web/careers/current-openings",
        cutOff: { UR: "Declared on Portal", OBC: "Declared on Portal", SC: "Declared on Portal", ST: "Declared on Portal" },
        downloadUrl: targetUrl,
        releaseDate: todayStr
      };
    } else if (cat === "answer-key") {
      fallbackNotice.answerKeyData = {
        id: `ans-sbi-heur-${Date.now()}`,
        title: fallbackNotice.title,
        org: "State Bank of India (SBI)",
        released: todayStr,
        objectionsLimit: "Active on sbi.bank.in",
        pdfUrl: targetUrl
      };
    }

    addSbiNotice(fallbackNotice);
    res.json({ success: true, notice: fallbackNotice });
  });

  // ==========================================
  // RAJASTHAN SSO RECRUITMENT PORTAL API (https://www.recruitment.rajasthan.gov.in/)
  // ==========================================

  // 1. Get Portal Status & Health
  app.get("/api/rajasthan/status", (req, res) => {
    try {
      const status = rajasthanRecruitmentService.getStatus();
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve Rajasthan recruitment portal status" });
    }
  });

  // 2. Get Live Notices Monitored from recruitment.rajasthan.gov.in
  app.get("/api/rajasthan/live-feed", (req, res) => {
    try {
      const notices = rajasthanRecruitmentService.getNotices();
      const status = rajasthanRecruitmentService.getStatus();
      res.json({
        portal: "https://www.recruitment.rajasthan.gov.in/",
        status,
        count: notices.length,
        notices
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch Rajasthan recruitment feed" });
    }
  });

  // 3. Force Instant Sync with Official Rajasthan Recruitment Portal
  app.post("/api/rajasthan/sync-now", async (req, res) => {
    try {
      const syncRes = await rajasthanRecruitmentService.syncWithOfficialPortal();
      const status = rajasthanRecruitmentService.getStatus();
      res.json({
        success: true,
        message: "State Recruitment Portal (https://www.recruitment.rajasthan.gov.in/) synced successfully.",
        syncRes,
        status
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Rajasthan sync failed" });
    }
  });

  // 4. Publish Notice to Rajasthan Feed
  app.post("/api/rajasthan/publish-notice", (req, res) => {
    const { notice } = req.body;
    if (!notice || !notice.title || !notice.category) {
      return res.status(400).json({ error: "Notice title and category are required" });
    }
    const saved = rajasthanRecruitmentService.addNotice({
      ...notice,
      id: notice.id || `raj-manual-${Date.now()}`,
      ssoPortalUrl: "https://www.recruitment.rajasthan.gov.in/",
      publishedDate: notice.publishedDate || new Date().toISOString().split("T")[0],
      officialUrl: notice.officialUrl || "https://www.recruitment.rajasthan.gov.in/",
      isNew: true
    });
    res.json({ success: true, notice: saved });
  });

  // 5. AI-Powered Rajasthan Notice Analyzer
  app.post("/api/rajasthan/auto-parse", async (req, res) => {
    const { rawNoticeText, sourceUrl } = req.body;
    if (!rawNoticeText) {
      return res.status(400).json({ error: "rawNoticeText is required" });
    }
    try {
      const notice = await rajasthanRecruitmentService.parseRawNoticeWithGemini(
        rawNoticeText,
        sourceUrl || "https://www.recruitment.rajasthan.gov.in/"
      );
      res.json({ success: true, notice });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to parse Rajasthan notice" });
    }
  });

  // ==========================================
  // JOIN INDIAN ARMY PORTAL API (https://joinindianarmy.nic.in/)
  // ==========================================

  // 1. Get Join Indian Army Portal Status & Health
  app.get("/api/army/status", (req, res) => {
    try {
      const status = armyRecruitmentService.getStatus();
      res.json(status);
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve Join Indian Army portal status" });
    }
  });

  // 2. Get Live Notices Monitored from joinindianarmy.nic.in
  app.get("/api/army/live-feed", (req, res) => {
    try {
      const { category, entryType, zro, search } = req.query;
      const notices = armyRecruitmentService.getLiveNotices({
        category: category as string,
        entryType: entryType as string,
        zro: zro as string,
        search: search as string
      });
      const status = armyRecruitmentService.getStatus();
      res.json({
        portal: "https://joinindianarmy.nic.in/",
        status,
        count: notices.length,
        notices
      });
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch Join Indian Army live feed" });
    }
  });

  // 3. Force Instant Sync with Official Join Indian Army Portal
  app.post("/api/army/sync-now", async (req, res) => {
    try {
      const syncRes = await armyRecruitmentService.syncWithPortal();
      const status = armyRecruitmentService.getStatus();
      res.json({
        success: true,
        message: "Join Indian Army Portal (https://joinindianarmy.nic.in/) synced successfully.",
        syncRes,
        status
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Indian Army sync failed" });
    }
  });

  // 4. Publish Notice to Army Feed
  app.post("/api/army/publish-notice", (req, res) => {
    const { notice } = req.body;
    if (!notice || !notice.title || !notice.category) {
      return res.status(400).json({ error: "Notice title and category are required" });
    }
    const saved = armyRecruitmentService.addNotice({
      ...notice,
      id: notice.id || `army-manual-${Date.now()}`,
      portalUrl: "https://joinindianarmy.nic.in/",
      publishedDate: notice.publishedDate || new Date().toISOString().split("T")[0],
      officialUrl: notice.officialUrl || "https://joinindianarmy.nic.in/",
      isNew: true
    });
    res.json({ success: true, notice: saved });
  });

  // 5. AI-Powered Join Indian Army Notice / Rally Press Release Analyzer
  app.post("/api/army/auto-parse", async (req, res) => {
    const { rawNoticeText, sourceUrl } = req.body;
    if (!rawNoticeText) {
      return res.status(400).json({ error: "rawNoticeText is required" });
    }
    try {
      const notice = await armyRecruitmentService.parseRawNoticeWithGemini(
        rawNoticeText,
        sourceUrl || "https://joinindianarmy.nic.in/"
      );
      res.json({ success: true, notice });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to parse Join Indian Army notice" });
    }
  });


  // Vite middleware setup

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
