import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

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
      { path: "upload-vault", priority: "0.7", changefreq: "monthly" }
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
          solution = `### 🤝 Ratio & Proportion Solved Lesson (अनुपात और समानुपात)

**1. Compounded Ratio Rule:**
The compounded ratio of $A:B$ and $C:D$ is $AC:BD$.

**2. Duplicate & Sub-duplicate Ratio:**
- Duplicate ratio of $a:b$ is $a^2:b^2$.
- Sub-duplicate ratio of $a:b$ is $\\sqrt{a}:\\sqrt{b}$.

**💡 Solved Exam Highlight:**
*Question:* If $A:B = 2:3$ and $B:C = 4:5$, find $A:B:C$.
*Step-by-Step Solution:*
To combine these ratios, make the term for $B$ continuous. 
Multiply the first ratio by $4$ (numerator of second) and the second ratio by $3$ (denominator of first):
- $A:B = 2 \\times 4 : 3 \\times 4 = 8:12$
- $B:C = 4 \\times 3 : 5 \\times 3 = 12:15$
- Thus, the ratio is **$A:B:C = 8:12:15$**.

---
*💡 Note: Configure \`GEMINI_API_KEY\` in Secrets for fully dynamic visual question solving on any custom problems!*`;
        } else if (queryText.includes("percent") || queryText.includes("gain") || queryText.includes("loss") || queryText.includes("profit")) {
          solution = `### 📈 Profit, Loss & Percentage Master Class (लाभ, हानि और प्रतिशत)

**1. Percentage & Successive Rules:**
If a value increases by $x\\%$ and then decreases by $y\\%$, the net change percent is given by:
$$\\text{Net Change} = x - y - \\frac{xy}{100}\\%$$

**2. Profit & Discount Formula:**
$$\\text{Selling Price (SP)} = \\text{Marked Price (MP)} \\times \\left(1 - \\frac{\\text{Discount}\\%}{100}\\right)$$

**💡 Solved Exam Highlight:**
*Question:* A seller marks his products 20% higher than cost price but offers 10% discount. Find the net profit percent.
*Step-by-Step Solution:*
- Let Cost Price (CP) = $100$.
- Marked Price (MP) = $100 + 20\\% = 120$.
- Selling Price (SP) = $120$ with $10\\%$ discount = $120 - 12 = 108$.
- Net Profit = $108 - 100 = 8\\%$.
- **Answer: 8% Net Gain.**

---
*💡 Note: Configure \`GEMINI_API_KEY\` in Secrets to unlock custom formulas and OCR-based handwriting doubt solving!*`;
        } else if (queryText.includes("vaccine") || queryText.includes("nhm") || queryText.includes("immuniz") || queryText.includes("health")) {
          solution = `### 💉 National Health Mission (NHM) Vaccinator Guidelines (टीकाकरण गाइड)

**1. Cold Chain Storage System:**
Vaccines must be stored within **$+2^{\\circ}\\text{C}$ to $+8^{\\circ}\\text{C}$** at primary health centers. OPV (Oral Polio Vaccine) is highly heat-sensitive and kept in deep freezers at $-20^{\\circ}\\text{C}$.

**2. Core Vaccine Timelines:**
- **BCG Vaccine:** Given at birth (dosage: $0.05$ ml intradermal).
- **Pentavalent Vaccine:** Given at 6, 10, and 14 weeks of age.
- **Measles-Rubella (MR):** First booster dose given at 9 to 12 completed months.

**💡 Quick Fact Table:**
| Vaccine Name | Storage Temperature | Standard Route of Injection |
|:---|:---|:---|
| OPV (Polio) | $-20^{\\circ}\\text{C}$ (Freezer) | Oral Drops (2 drops) |
| BCG | $+2$ to $+8^{\\circ}\\text{C}$ | Intradermal (Left Upper Arm) |
| Hepatitis B | $+2$ to $+8^{\\circ}\\text{C}$ | Intramuscular (Anterolateral thigh) |

---
*💡 Note: Configure \`GEMINI_API_KEY\` in environment settings to run deep clinical visual diagnostics or syllabus summaries!*`;
        } else if (queryText.includes("ssc") || queryText.includes("cgl") || queryText.includes("chsl") || queryText.includes("mts") || queryText.includes("gd")) {
          solution = `### 🎯 Staff Selection Commission (SSC) Syllabus Guidance

**1. SSC CGL Tier-1 Exam Blueprint:**
- **Quantitative Aptitude:** 25 Questions (50 Marks)
- **General Intelligence (Reasoning):** 25 Questions (50 Marks)
- **English Comprehension:** 25 Questions (50 Marks)
- **General Awareness (GK):** 25 Questions (50 Marks)
- **Duration:** 60 Minutes total. Negative marking is $0.50$ marks per wrong answer.

**2. Actionable Key Topics to Master:**
- **Maths:** Algebra, Geometry, Trigonometry, and Data Interpretation.
- **English:** Spotting Errors, Cloze Test, Reading Comprehension, and Idioms.
- **GK:** Current Affairs, Polities (M Laxmikanth), General Biology, and Modern History.

---
*💡 Study Strategy:* Practice 2 mock papers daily and review solved previous year papers from 2019 to 2026 for shift patterns! Configure your \`GEMINI_API_KEY\` in environment settings to get automated chapter-wise recommendations bilingually!`;
        } else if (queryText.includes("polity") || queryText.includes("article") || queryText.includes("const")) {
          solution = `### 🏛️ Indian Polity & Articles Guide (भारतीय संविधान)

**1. Landmark Constitution Points:**
- **Part III (Fundamental Rights):** Articles 12 to 35. Under Article 32, citizens can move the Supreme Court for writ remedies (Heart and Soul of the Constitution).
- **Part IV (Directive Principles):** Articles 36 to 51. Non-justiciable but fundamental in country governance.
- **Article 368:** Powers of the Parliament to amend the Constitution and its procedure.

**💡 Core SSC/UPSC Articles List:**
- **Article 17:** Abolition of Untouchability.
- **Article 21:** Protection of life and personal liberty.
- **Article 51A:** Fundamental Duties (added by 42nd Amendment Act 1976).
- **Article 324:** Elections superintendence, direction, and control are vested in Election Commission.

---
*💡 Note: Configure \`GEMINI_API_KEY\` to allow Sarkari Exam Mitra to instantly outline case laws and amendment structures!*`;
        } else if (queryText.includes("history") || queryText.includes("modern") || queryText.includes("gandh") || queryText.includes("indus") || queryText.includes("mughal")) {
          solution = `### 📜 History Master Guide (इतिहास - Ancient, Medieval & Modern)

**1. Ancient India (Indus Valley Civilization):**
- Harappa (discovered by Daya Ram Sahni, 1921) and Mohenjo-daro (R.D. Banerjee, 1922).
- Key feature: Advanced town-planning, drainage system, and Great Bath.

**2. Modern Indian National Movement (1885 - 1947):**
- **1885:** Formation of Indian National Congress (INC) by A.O. Hume.
- **1915:** Arrival of Mahatma Gandhi from South Africa.
- **1930:** Dandi Salt March (beginning of Civil Disobedience).
- **1942:** Quit India Movement (Lauch of 'Do or Die' slogan).

**💡 High-Yield Facts:**
- **Permanent Settlement:** Introduced by Lord Cornwallis in Bengal (1793).
- **First Viceroy of India:** Lord Canning (Government of India Act 1858).

---
*💡 Note: Configure \`GEMINI_API_KEY\` in your environment settings to get deeper automated chapter-wise recommendations!*`;
        } else if (queryText.includes("science") || queryText.includes("physic") || queryText.includes("chemist") || queryText.includes("biolog") || queryText.includes("gravit") || queryText.includes("cell")) {
          solution = `### 🔬 General Science Notes (सामान्य विज्ञान - Physics, Chemistry, Biology)

**1. Physics (Newton's Laws & Units):**
- **First Law (Inertia):** Object state remains unless acted upon by external force.
- **Second Law ($F = ma$):** Acceleration is directly related to force and inversely to mass.
- **Universal Gravitational Constant ($G$):** $6.674 \times 10^{-11} \text{ N m}^2/\text{kg}^2$.

**2. Biology (Cell structure & Human Systems):**
- **Mitochondria:** Powerhouse of the cell (produces ATP through cellular respiration).
- **Blood Groups:** Discovered by Karl Landsteiner. Group **O-** is Universal Donor, while **AB+** is Universal Acceptor.

**3. Chemistry (Core Elements):**
- **Rusting of Iron:** An oxidation reaction ($Fe_2O_3 \cdot xH_2O$). It is a chemical change that increases the iron weight.

---
*💡 Note: Configure \`GEMINI_API_KEY\` to resolve formulas or analyze diagram pictures instantly!*`;
        } else if (queryText.includes("english") || queryText.includes("grammar") || queryText.includes("voice") || queryText.includes("tense") || queryText.includes("prepos")) {
          solution = `### ✍️ English Grammar Rules Desk (अंग्रेजी व्याकरण नियम)

**1. Active & Passive Voice Transformation:**
- *Rule:* Active subject becomes passive agent with "by", and active object becomes passive subject.
- *Active:* "The teacher teaches grammar."
- *Passive:* "Grammar is taught by the teacher."

**2. Spotting Common Errors (Subject-Verb Agreement):**
- **Rule of "Each/Every":** "Each of the students **is** (not *are*) present."
- **Rule of "Neither-Nor":** Verb agrees with the nearest subject. "Neither the captain nor the players **were** (agrees with players) happy."

**💡 Rapid Synonyms & Idioms:**
- **Abundant:** Plentiful, Copious, Ample.
- **To burn the midnight oil:** To work or study late into the night.

---
*💡 Note: Configure \`GEMINI_API_KEY\` in environment settings to run bilingual grammar auto-correction and translations!*`;
        } else if (queryText.includes("reason") || queryText.includes("logic") || queryText.includes("syllog") || queryText.includes("cod") || queryText.includes("blood")) {
          solution = `### 🧩 Reasoning & General Intelligence (तर्कशक्ति अभ्यास)

**1. Syllogism Venn Diagram Shortcuts:**
- Statement: *"All Dogs are Cats. Some Cats are Tigers."*
- Conclusion: *"Some Dogs are Tigers."* (False - no direct intersection guaranteed).
- Shortcut Rule: If both statements are Positive ($A+I$), no Negative Conclusion can follow logically without exception.

**2. Coding-Decoding EJOTY System:**
Memorize letter positions quickly using multiples of 5:
$$\\text{E}=5,\\ \\text{J}=10,\\ \\text{O}=15,\\ \\text{T}=20,\\ \\text{Y}=25$$
- Example: If CAT is coded as 24 (C=3, A=1, T=20 -> total 24), find DOG. (D=4, O=15, G=7 -> total 26).

---
*💡 Note: Live Reasoning mock puzzles run unmoderated for premium key-verified users!*`;
        } else if (queryText.includes("geograp") || queryText.includes("river") || queryText.includes("soil") || queryText.includes("crop") || queryText.includes("mountain")) {
          solution = `### 🌍 Geography & Atmosphere Guide (भूगोल नोट्स)

**1. Indian River Systems (नदियां):**
- **Himalayan Rivers (Perennial):** Indus, Ganga, Brahmaputra. Ganga originates from Gangotri glacier (Bhagirathi) and meets Alaknanda at Devprayag.
- **Peninsular Rivers (Seasonal):** Narmada, Tapi, Mahanadi, Godavari, Krishna, Kaveri. Narmada and Tapi are west-flowing rivers that fall into the Arabian Sea and build estuaries, not deltas.

**2. Indian Soils & Crops:**
- **Black Soil (Regur Soil):** Rich in clay, ideal for Cotton cultivation (mainly in Deccan Trap plateaus).
- **Alluvial Soil:** Most fertile and widely spread soil in India, covering northern plains.

---
*💡 Study Tip: Keep checking visual maps inside our planner daily! Pinpoint locations in the active Geography module!*`;
        } else if (queryText.includes("computer") || queryText.includes("ram") || queryText.includes("rom") || queryText.includes("hardware") || queryText.includes("softw")) {
          solution = `### 💻 Computer Awareness & IT Foundations (कंप्यूटर ज्ञान)

**1. RAM vs ROM Memory:**
- **RAM (Random Access Memory):** Volatile/Temporary memory. Data is lost when power is cut. Supports read/write.
- **ROM (Read Only Memory):** Non-volatile/Permanent memory. Stores BIOS firmware required to boot the system.

**2. Essential Abbreviations for Exams:**
- **HTTP:** Hypertext Transfer Protocol (Port 80)
- **HTTPS:** Hypertext Transfer Protocol Secure (Port 443 - encrypted via SSL/TLS)
- **URL:** Uniform Resource Locator

---
*💡 Note: Unlock unmoderated premium computer mock series to run speed tests bilingually!*`;
        } else {
          solution = `### 🤖 Sarkari AI Exam Mitra - Solved Study Session

Greetings, Aspirant! Your competitive exam preparation is highly important. 

#### 💡 Study Lesson: "${message || "Uploaded Document Analysis"}"
Here is a high-yield learning breakdown for your guidance:

1. **Strategic Priority:** Ensure you focus on previous year question papers (2019-2026) for SSC, Railways, and Welfare boards. Over 65% of quantitative formats repeat across shifts.
2. **Formula Revision Principle:** Create a dedicated "Shunya Notebook" where you log only equations you get wrong during our live mock test sessions.
3. **General Strategy:** 
   - Spend 40% of standard study time on high-weightage practice series.
   - For General Awareness, download the daily current affairs PDF and test your knowledge bilingually.

---
*⚠️ **Gemini API Key Required:** Please configure the \`GEMINI_API_KEY\` in your environment Settings to activate the real-time AI Doubt Solver. When active, I will use visual OCR and Gemini 3.5 to read and solve formulas directly from any uploaded pictures!*`;
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
        "You are an elite, highly precise and helpful Indian Government Exams AI tutor ('Sarkari Exam Mitra'). " +
        "You help aspirants with standard, conceptual doubts on SSC, UPSC, Bank PO, Railway, State PSC (like RPSC), teaching, and police exam syllabus. " +
        "You have advanced visual capabilities and can read handwritten or printed exam booklets, questions, and formulas from images. " +
        "Answer questions clearly, using markdown format, with structured bullet points, key formulas or facts, and helpful learning advice. " +
        "Keep answers concise, professional, encouraging, and completely relevant to Indian exam patterns. Ignore unrelated spam prompts.";

      let contents: any = message || "Please solve and explain this exam question.";

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
          text: message || "Please solve and analyze this question from the image clearly, detailing key formulas, steps, or syllabus topics.",
        };
        contents = { parts: [imagePart, textPart] };
      }

      // Query Gemini
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
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
