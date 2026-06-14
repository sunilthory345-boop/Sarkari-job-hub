import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  Eye, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Plus, 
  FileText, 
  BookOpen, 
  SearchCode, 
  Check, 
  BookOpenCheck,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { Blog } from '../types';

interface SarkariBlogPortalProps {
  blogs: Blog[];
  onAddBlog: (newBlog: Blog) => void;
  triggerToast: (msg: string) => void;
}

// Highly detailed SEO pre-populated blogs for Sarkari Hub
const SEO_DEFAULT_BLOGS: Blog[] = [
  {
    id: 'seo-blog-up-police',
    title: 'UP Police Constable Recruitment 2026: Official Syllabus & Safe Scoring Target',
    category: 'Government Jobs',
    author: 'Sunil Kumar (Sarkari Hub SEO Analyst)',
    summary: 'Direct updates on UPPRPB UP Police Constable vacancies. Detailed 150 MCQ breakdown, subject-weightage, and free offline-printable mock syllabus guides.',
    content: `UP Police Constable Recruitment Board (UPPRPB) has officially accelerated notifications for 2026. If you are aiming for high-ranking positions, understanding the structured subject density is vital for optimizing your study hours.

### 📈 Exam Pattern & Marks Distribution:
The examination will have 150 Multiple Choice Questions (MCQs) for a total of 300 marks. The crucial catch is the negative scoring penalty of -0.50 marks for each incorrect attempt.

* **General Knowledge (सामान्य ज्ञान):** 38 Questions (76 Marks)
* **General Hindi (सामान्य हिन्दी):** 37 Questions (74 Marks)
* **Numerical & Mental Ability (मैथ्स):** 38 Questions (76 Marks)
* **Mental Aptitude/IQ (रीजनिंग):** 37 Questions (74 Marks)

### 💡 High-Yield preparation keywords to target for SEO:
To rank candidate advice blogs higher in northern regions like Uttar Pradesh and Bihar, optimize search density for keywords like 'Sarkari Result UP Police', 'UP Police Syllabus PDF', and 'Free online mock tests'. 

### 🌟 Key Areas to Focus:
1. **General Hindi:** Command over standard Hindi Grammar (संधि, समास, पर्यायवाची, विलोम शब्द) guarantees simple speed scoring.
2. **Mental Aptitude:** Practice coded relations and non-verbal spatial reasoning.
3. **Daily Revision:** Set a daily timer for 60 minutes solving previous year papers (2019-2025). Keep a dedicated Shunya notebook to log incorrect attempts for weekly review.`,
    readTime: '6 min read',
    date: '2026-06-13'
  },
  {
    id: 'seo-blog-ssc-cgl',
    title: 'How to Crack SSC CGL 2026 Maths with 95%+ Accuracy: Time Management Secrets',
    category: 'Preparation Strategy',
    author: 'Alok Pandey (Quant Ranker 2023)',
    summary: 'Dominate Stafford Selection Commission Tier-1 & Tier-2 Quantitative Aptitude. Advanced shortcuts for Successive percentages, Ratio Compound, and Algebra.',
    content: `Staff Selection Commission (SSC) exams are speed-tests of intelligence. In CGL, you only get 60 minutes in Tier-1 to solve 100 questions. Quantitative section carries 25 questions where time spent can make or break your qualifying score.

### ⚡ Secret Math Formula Blueprints:
* **Successive Percentages:** Instant net gain formula for price markups and sequential discounts is $x - y - \\frac{xy}{100}\\%$.
* **Ratio Compounding:** For quick variable normalization, when $A:B=2:3$ and $B:C=4:5$, make the middle coefficient common ($A:B:C = 8:12:15$).
* **Algebraic Shortcuts:** Memorize standard Pythagorean triplets (3-4-5, 5-12-13, 8-15-17) to bypass lengthy trigonometry expansions.

### ⏳ Time Allotment Guidelines:
Do not spend more than 40 seconds on any single mathematics equation. If a puzzle appears lengthy, utilize the 'Mark for Review' button to protect your confidence pool. Review other high-yield GK and English elements before returning.`,
    readTime: '8 min read',
    date: '2026-06-11'
  },
  {
    id: 'seo-blog-nhm-coldchain',
    title: 'NHM ANM Auxiliary Nurse Guidance: National Healthcare Cold Chain Exam Questions',
    category: 'Exam Tips',
    author: 'Dr. Reeta Verma (Senior Medical Officer)',
    summary: 'Comprehensive review syllabus for NHM auxiliary vaccinations, cold chain storage limits, and child immunization tables.',
    content: `For aspirants preparing for State auxiliary nursing and clinical health vaccines recruitment, the Technical Domain topic holds high weight. 

### 💉 Essential Immunization Notes:
The cold-chain storage infrastructure keeps vaccines potent through strict temperature bounds:
* **Safe Storage Bounds:** Non-freezer vaccinations (like BCG, HepB, and Measles-Rubella) must strictly reside within **$+2^{\\circ}\\text{C}$ to $+8^{\\circ}\\text{C}$**. OPV (Oral Polio Vaccine) is stored at $-20^{\\circ}\\text{C}$ inside deep freezers.
* **BCG Vaccine Dosage:** Administered right at birth intradermally on the left upper arm at a micro-dosage of $0.05$ ml.
* **Anterolateral Thigh:** Ideal path for modern infant muscular injections.

### 📝 Preparation Advice:
Attempt 10 localized clinical mock papers bilingually on Job Sarkari Hub. Analyze previous year papers systematically to identify repeating technical terminologies.`,
    readTime: '5 min read',
    date: '2026-06-08'
  }
];

export default function SarkariBlogPortal({ blogs, onAddBlog, triggerToast }: SarkariBlogPortalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<Blog | null>(null);
  
  // Custom SEO Tool States
  const [activeSeoTab, setActiveSeoTab] = useState<'serp' | 'onpage' | 'schema'>('serp');
  const [seoSearchTerm, setSeoSearchTerm] = useState('Sarkari Result 2026');
  
  // New Blog Creator States
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Exam Tips' | 'Government Jobs' | 'Career Guidance' | 'Preparation Strategy' | 'Interview Tips'>('Exam Tips');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('Candidate Expert');
  const [newMetaKeywords, setNewMetaKeywords] = useState('Sarkari Result, Mock test, Syllabus PDF');

  // Combine standard mock blogs + default rich SEO ones
  const allBlogsList = useMemo(() => {
    // filter duplicates
    const existingIds = new Set(blogs.map(b => b.id));
    const uniqueDefaults = SEO_DEFAULT_BLOGS.filter(b => !existingIds.has(b.id));
    return [...blogs, ...uniqueDefaults];
  }, [blogs]);

  // Filtered post selector
  const filteredBlogs = useMemo(() => {
    return allBlogsList.filter(blog => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = blog.title.toLowerCase().includes(q) || 
                            blog.summary.toLowerCase().includes(q) || 
                            blog.content.toLowerCase().includes(q) ||
                            blog.author.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allBlogsList, searchQuery, selectedCategory]);

  const blogCategories = ['All', 'Exam Tips', 'Government Jobs', 'Career Guidance', 'Preparation Strategy', 'Interview Tips'];

  // Real-time On-page SEO metrics calculator helper
  const onPageSeoScore = (title: string, summary: string, content: string, keywordsStr: string) => {
    let score = 0;
    const feedback: string[] = [];

    // 1. Title optimization
    const tLength = title.length;
    if (tLength >= 45 && tLength <= 65) {
      score += 25;
      feedback.push("✅ PERFECT: Meta Title length is highly optimized for Google SERP display (45-65 chars).");
    } else if (tLength > 0) {
      score += 12;
      feedback.push(`⚠️ Title stands at ${tLength} chars. Real-world Google displays truncate titles above 65 chars, and devalue titles under 40.`);
    } else {
      feedback.push("❌ Enter article title to compute Google Meta weight.");
    }

    // 2. Meta description / summary optimization
    const sLength = summary.length;
    if (sLength >= 110 && sLength <= 160) {
      score += 25;
      feedback.push("✅ PERFECT: Meta Description matches perfect search view limits (110-160 chars).");
    } else if (sLength > 0) {
      score += 10;
      feedback.push(`⚠️ Meta summary has ${sLength} chars. Keep it between 110-160 to avoid Google Search snippet clipping.`);
    } else {
      feedback.push("❌ Enter summary / snippet to evaluate description potential.");
    }

    // 3. Keyword density check
    const keywords = keywordsStr.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
    if (keywords.length > 0 && content.length > 10) {
      let foundKeywords = 0;
      keywords.forEach(keyword => {
        if (content.toLowerCase().includes(keyword)) {
          foundKeywords++;
        }
      });
      const ratio = foundKeywords / keywords.length;
      if (ratio >= 0.7) {
        score += 25;
        feedback.push(`✅ BROAD INDEXING: ${foundKeywords}/${keywords.length} of your focus SEO keywords are nested inside the body content.`);
      } else if (foundKeywords > 0) {
        score += 15;
        feedback.push(`⚠️ Content incorporates only ${foundKeywords}/${keywords.length} target keywords. Add key phrases like "${keywords.find(k => !content.toLowerCase().includes(k)) || 'Sarkari'}" to body sentences!`);
      } else {
        feedback.push("❌ Keywords declared are absent in content text body. Search bots can ignore mismatched metadata.");
      }
    } else {
      feedback.push("❌ Provide focus keywords and text body to score organic index ratio.");
    }

    // 4. Content depth
    const wordsCount = content.split(/\s+/).filter(Boolean).length;
    if (wordsCount >= 180) {
      score += 25;
      feedback.push("✅ HIGH DEPTH: Article word count is rich (>180 words) and informative for crawl engines.");
    } else if (wordsCount > 0) {
      score += 12;
      feedback.push(`⚠️ Soft article length (${wordsCount} words). Add detailed paragraphs or lists to elevate authority metrics above competitors.`);
    } else {
      feedback.push("❌ Write content draft to begin crawling audit.");
    }

    return { score, feedback, wordsCount };
  };

  const activePostSeo = useMemo(() => {
    if (!selectedPost) return null;
    return onPageSeoScore(
      selectedPost.title,
      selectedPost.summary,
      selectedPost.content,
      "Sarkari Result, UP Police, SSC CGL, mock papers, admit card, government"
    );
  }, [selectedPost]);

  const creatorPostSeo = useMemo(() => {
    return onPageSeoScore(newTitle, newSummary, newContent, newMetaKeywords);
  }, [newTitle, newSummary, newContent, newMetaKeywords]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      triggerToast("⚠️ Title and content body are required to index post!");
      return;
    }

    const words = newContent.split(/\s+/).filter(Boolean).length;
    const estRead = `${Math.max(1, Math.ceil(words / 150))} min read`;

    const newBlogObj: Blog = {
      id: `custom-blog-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: newAuthor || "Staff Contributor",
      summary: newSummary || newContent.substring(0, 130) + '...',
      content: newContent,
      readTime: estRead,
      date: new Date().toISOString().split('T')[0]
    };

    onAddBlog(newBlogObj);
    triggerToast("🎉 Professional Sarkari Hub Blog Post published successfully! Meta tags auto-configured for SEO.");
    
    // reset states
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setNewMetaKeywords('Sarkari Result, Mock test, Syllabus PDF');
    setIsCreatorOpen(false);
    setSelectedPost(newBlogObj); // auto read
  };

  // Generate copyable JSON-LD Structured Data Schema.org representation
  const generateSchemaMarkup = (blog: Blog) => {
    const struct = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.summary,
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Job Sarkari Hub",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ais-pre-h4okrkbotbq7upa2tac5om.run.app/favicon.ico"
        }
      },
      "datePublished": blog.date,
      "articleBody": blog.content,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://sarkari-hub.org/blog/${blog.id}`
      }
    };
    return JSON.stringify(struct, null, 2);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerToast(`📋 ${label} copied to clipboard successfully!`);
  };

  return (
    <div className="space-y-8" id="sarkari-seo-blog">
      
      {/* Blog and SEO Dashboard Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200/50 pb-4 gap-4 text-left">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.5 bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider font-mono">
              Job Sarkari Hub SEO Core
            </span>
            <span className="text-slate-400 font-bold">•</span>
            <span className="text-[10px] font-mono text-emerald-600 font-black tracking-wide flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> GOOGLE SEARCH INDEX OPTIMIZED
            </span>
          </div>
          <h2 className="font-sans text-xl font-extrabold text-slate-900 tracking-tight">
            SEO Master Blog & Aspirant Strategy Center
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Highly optimized competitive strategies and news briefs designed bilingually (हिंदी & English) with structured metadata schema to boost biological reach across search engines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreatorOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-md shadow-blue-500/15 flex items-center gap-1.5 self-start md:self-auto active:scale-95 text-left"
        >
          <Plus className="h-4 w-4" />
          <span>Write SEO Article / ब्लॉग लिखें</span>
        </button>
      </div>

      {/* Main Content Splitting */}
      <div className="grid gap-8 lg:grid-cols-12 text-left">
        
        {/* Left Column: Blog Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Feed Filter Panel */}
          <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl space-y-3 shadow-3xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search articles, topics, high-yield keys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-450 focus:ring-1 focus:ring-blue-450 font-sans"
              />
            </div>

            {/* Category Select Pillbox */}
            <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 px-3 py-2 cursor-pointer focus:outline-hidden focus:border-blue-500"
              >
                {blogCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? '📁 All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards Display */}
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-150 p-12 text-center space-y-2">
              <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl inline-block">
                <Search className="h-6 w-6" />
              </div>
              <p className="text-xs font-bold text-slate-700">No matched SEO exam guides found.</p>
              <p className="text-[10px] text-slate-400">Try adjusting your keywords or write your own custom indexed article!</p>
            </div>
          ) : (
            <div className="grid gap-5">
              {filteredBlogs.map((post) => {
                const isActive = selectedPost?.id === post.id;
                return (
                  <div 
                    key={post.id} 
                    onClick={() => setSelectedPost(post)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden group ${
                      isActive 
                        ? 'border-blue-500 bg-blue-50/15 shadow-xs' 
                        : 'border-slate-150 bg-white hover:border-slate-350 hover:shadow-2xs'
                    }`}
                  >
                    {/* Tag badge */}
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                      <span className="text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md font-mono">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold font-mono">
                        <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5"><Calendar className="h-3 w-3" /> {post.date}</span>
                      </div>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm group-hover:text-blue-600 transition truncate-wide">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-1.5 leading-normal line-clamp-2">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[10px]">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <User className="h-3 w-3 text-slate-400 shrink-0" />
                        <span>By: <strong className="text-slate-600">{post.author}</strong></span>
                      </span>

                      <span className="text-blue-600 font-extrabold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>Read Study Key</span>
                        <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>

                    {/* SEO rating indicator strip */}
                    <div className="absolute top-0 right-0 left-0 h-0.5 bg-slate-100">
                      <div className="h-full bg-emerald-500 w-[95%]"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Right Column: Active SEO analysis workspace, live post view, metadata audit */}
        <div className="lg:col-span-5 space-y-6">
          
          {selectedPost ? (
            <div className="space-y-6">
              
              {/* Active Post Details Sheet */}
              <div className="bg-white rounded-3xl border border-slate-150 p-5 space-y-4 shadow-3xs">
                <div className="flex items-center justify-between shrink-0">
                  <span className="text-[9px] bg-emerald-50 text-emerald-800 font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider font-mono">
                    📘 Now Reading / अध्ययन रत
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(null)}
                    className="text-[9px] font-black text-slate-400 hover:text-slate-700 uppercase font-mono tracking-wider bg-slate-100 px-2 py-0.5 rounded"
                  >
                    Deselect
                  </button>
                </div>

                <div className="space-y-1.5 text-left">
                  <h3 className="font-sans text-base font-black text-slate-900 leading-tight">
                    {selectedPost.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 font-bold font-mono pt-1.5">
                    <span>By {selectedPost.author}</span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span className="text-indigo-600">{selectedPost.readTime}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-4 rounded-2xl border border-slate-150/60 whitespace-pre-line max-h-96 overflow-y-auto scrollbar-thin">
                  {selectedPost.content}
                </div>
              </div>

              {/* SEO Interactive Workbench Panel for target blog */}
              <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 space-y-4 shadow-sm border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5">
                    <SearchCode className="h-4.5 w-4.5 text-blue-400 animate-pulse" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-white font-mono">
                      Organic SEO Audit Desk
                    </h4>
                  </div>
                  
                  {/* Score pill */}
                  <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-black font-mono">
                    🏆 SCORE: {activePostSeo?.score || 95}/100
                  </div>
                </div>

                {/* Sub tabs for SEO: SERP, On-page, Schema */}
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1 text-[10.5px]">
                  <button
                    type="button"
                    onClick={() => setActiveSeoTab('serp')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold text-center transition cursor-pointer ${
                      activeSeoTab === 'serp' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🔍 Google Snippet
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSeoTab('onpage')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold text-center transition cursor-pointer ${
                      activeSeoTab === 'onpage' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🛠️ Audit Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSeoTab('schema')}
                    className={`flex-1 py-1 px-2 rounded-lg font-bold text-center transition cursor-pointer ${
                      activeSeoTab === 'schema' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    📝 JSON-LD Structured
                  </button>
                </div>

                {/* Tab content display */}
                {activeSeoTab === 'serp' && (
                  <div className="space-y-3 font-sans">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold tracking-widest">GOOGLE SERP PREVIEW:</span>
                    
                    {/* Simulated Google Search result card */}
                    <div className="bg-white text-slate-900 p-4 rounded-xl border border-slate-200 text-xs text-left shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-600 truncate font-mono">
                        <span className="bg-slate-100 rounded-full h-4 w-4 flex items-center justify-center text-[8px] font-black text-slate-700">G</span>
                        <span>https://jobsarkarihub.org/blog/{selectedPost.id}</span>
                      </div>
                      <h4 className="text-blue-800 font-semibold text-[13px] leading-tight hover:underline cursor-pointer">
                        {selectedPost.title}
                      </h4>
                      <p className="text-slate-600 text-[10.5px] leading-normal line-clamp-2">
                        <span className="text-slate-400 font-mono text-[9px] bg-slate-100 px-1 rounded mr-1">Meta</span>
                        {selectedPost.summary}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10.5px] text-slate-350 leading-relaxed space-y-1">
                      <p>✨ <strong>SEO Analyst Recommendation:</strong> This post is structured as an authoritative guide. It contains localized recruitment phrases which rank incredibly well in search bots under <em>"Sarkari Result UP Police CGL syllabus"</em> questions.</p>
                    </div>
                  </div>
                )}

                {/* Audit checklist */}
                {activeSeoTab === 'onpage' && (
                  <div className="space-y-3 text-xs text-left">
                    <span className="text-[9px] text-slate-400 block uppercase font-mono font-bold tracking-widest">ON-PAGE ELEMENT SCORE AUDIT:</span>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {activePostSeo?.feedback.map((item, idx) => (
                        <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[10.5px] text-slate-300 leading-normal flex gap-2">
                          <span className="mt-0.5 shrink-0">
                            {item.includes('✅') ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            )}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 flex items-center justify-between text-[10px] font-mono">
                      <span>Draft Word Count: <strong>{activePostSeo?.wordsCount || 0} words</strong></span>
                      <span className="text-blue-400">Target Range: &gt; 150 words</span>
                    </div>
                  </div>
                )}

                {/* JSON LD code */}
                {activeSeoTab === 'schema' && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-slate-400 uppercase font-mono font-bold tracking-widest">SCHEMA.ORG METADATA FOR BOT CRAWLING:</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(generateSchemaMarkup(selectedPost), "Schema.org JSON-LD")}
                        className="text-[9px] bg-slate-800 text-slate-200 hover:bg-slate-700 px-2 py-0.5 rounded flex items-center gap-0.5 font-bold transition cursor-pointer"
                      >
                        <Copy className="h-3 w-3" /> Copy JSON
                      </button>
                    </div>

                    <pre className="p-3 bg-slate-950 rounded-lg text-[9.5px] font-mono text-cyan-400 overflow-x-auto border border-blue-900/30 max-h-48 scrollbar-thin text-left">
                      {generateSchemaMarkup(selectedPost)}
                    </pre>
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-8 py-16 text-center space-y-4">
              <div className="p-3.5 bg-white text-blue-600 rounded-2xl inline-block border border-slate-150 shadow-2xs">
                <BookOpenCheck className="h-6 w-6" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest font-mono">Select Active Strategy Post</h4>
                <p className="text-[10.5px] text-slate-500 leading-normal">
                  Click on any prep strategy block on the left feed to access detailed notes, audit search term densities, or visually extract schema scripts!
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Write SEO Article / blog creator Modal window */}
      {isCreatorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs text-left animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-3xl">
              <div className="text-left">
                <h3 className="font-sans text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
                  <span>Sarkari Publisher Studio (SEO Auditing)</span>
                </h3>
                <p className="text-[10px] text-slate-500">Produce optimized articles to rank higher for exam searches.</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsCreatorOpen(false)}
                className="bg-slate-200 hover:bg-slate-300 rounded-full p-2 text-slate-600 text-[10px] font-black font-mono tracking-wider cursor-pointer transition"
              >
                CLOSE
              </button>
            </div>

            {/* Modal Body scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 font-sans">
              
              {/* Form elements */}
              <form onSubmit={handlePostSubmit} className="grid md:grid-cols-2 gap-4">
                
                {/* Left Inputs */}
                <div className="space-y-3.5 text-left">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Title / शीर्षक (Target 45-65 Characters)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UP Police Constable Exam 2026 Shift timing & Admit guide"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 mt-1 font-mono">
                      <span>Current: <strong>{newTitle.length} characters</strong></span>
                      <span className={newTitle.length >= 45 && newTitle.length <= 65 ? 'text-emerald-600 font-bold' : 'text-amber-500'}>Optimal: 45 - 65</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Category / श्रेणी</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                    >
                      <option value="Exam Tips">📁 Exam Tips</option>
                      <option value="Government Jobs">💼 Government Jobs</option>
                      <option value="Career Guidance">🎓 Career Guidance</option>
                      <option value="Preparation Strategy">🎯 Preparation Strategy</option>
                      <option value="Interview Tips">🗣️ Interview Tips</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Meta Description Summary / संक्षिप्त विवरण (110-160 Chars)</label>
                    <textarea
                      required
                      rows={3}
                      value={newSummary}
                      onChange={(e) => setNewSummary(e.target.value)}
                      placeholder="Enter a brief summarized Google search Snippet explaining the post core guidelines..."
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-sans"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 mt-0.5 font-mono">
                      <span>Current: <strong>{newSummary.length} characters</strong></span>
                      <span className={newSummary.length >= 110 && newSummary.length <= 160 ? 'text-emerald-600 font-bold' : 'text-amber-500'}>Optimal: 110 - 160</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase">Author / लेखक</label>
                      <input
                        type="text"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-1.5 text-xs text-slate-800 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 mb-1 uppercase">SEO Keywords (Comma delimited)</label>
                      <input
                        type="text"
                        value={newMetaKeywords}
                        onChange={(e) => setNewMetaKeywords(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden text-left"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Area: Large content edit block and live scoring report */}
                <div className="space-y-3.5 flex flex-col justify-between text-left">
                  <div>
                    <label className="block text-[10px] font-black text-slate-500 mb-1.5 uppercase">Article Body Content / मुख्य लेखन (Min 150 words)</label>
                    <textarea
                      required
                      rows={7}
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Write your comprehensive study plan, exam details, syllabus notes here. Utilize markdown or bullet points to layout clean steps bilingually..."
                      className="w-full bg-slate-50 border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 scrollbar-thin"
                    />
                    <span className="block text-[8px] text-slate-400 mt-1 font-mono text-right">
                      Word Count: <strong>{newContent.split(/\s+/).filter(Boolean).length} words</strong> (Recommended &gt; 150)
                    </span>
                  </div>

                  {/* Realtime SEO Scoring Monitor inside create model */}
                  <div className="bg-slate-900 rounded-2xl p-3.5 space-y-2.5 border border-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                      <span className="text-[9px] font-black text-slate-350 uppercase tracking-widest font-mono">Real-time SEO Score Audit</span>
                      <span className={`text-[10px] font-mono font-black border px-2.5 py-0.5 rounded-lg ${
                        creatorPostSeo.score >= 70 
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        Score: {creatorPostSeo.score}/100
                      </span>
                    </div>

                    <div className="max-h-24 overflow-y-auto space-y-1 scrollbar-thin">
                      {creatorPostSeo.feedback.slice(0, 3).map((fb, fIdx) => (
                        <div key={fIdx} className="text-[9.5px] text-slate-350 leading-relaxed font-sans flex gap-1 items-start text-left">
                          <span>•</span>
                          <span>{fb}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 rounded-xl transition cursor-pointer text-center shadow-md shadow-blue-500/15"
                  >
                    🚀 Publish & Google Index Core (ब्लॉग पोस्ट प्रकाशित करें)
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
