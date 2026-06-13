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
    
    const host = req.get("host") || "sarkari-job-hub-v55.onrender.com";
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
    const host = req.get("host") || "sarkari-job-hub-v55.onrender.com";
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
        // Return a highly intelligent and structured fallback response telling them premium AI tutor is ready
        // but needs API key activation, or act like an informational mock bot.
        const hasImageText = image ? "\n\n*Note:* It looks like you uploaded an image of a exam document. When active, I will use visual OCR to read and solve formulas directly from your uploaded picture!" : "";
        const queryText = message || "uploaded question sheet";
        const fallbackText = `⚠️ **Gemini API Key Required**\n\nPlease configure the \`GEMINI_API_KEY\` in your environment Settings to activate the real-time AI Doubt Solver.\n\n**Here is how you can resolve this:**\n1. Go to **Settings > Secrets** in AI Studio.\n2. Add \`GEMINI_API_KEY\` with your Gemini developer key.${hasImageText}\n\n*Temporary Offline AI Tutor Sandbox Answer:* For your question regarding "**${queryText}**", as an Indian Government Exam Guide, this topic belongs to the official syllabus. Once key is configured, I can instantly break down formulas, historical facts, and syllabus guides with detailed citations!`;
        return res.json({ text: fallbackText });
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
