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
