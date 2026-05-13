export interface ProjectViewContent {
  problem: string;
  approach: string;
  architecture: string;
  result: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  technologies: string[];
  status: string;
  stats: ProjectStat[];
  simple: ProjectViewContent;
  technical: ProjectViewContent;
  demoUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Nexus — Autonomous AI Freelance Escrow",
    codename: "NEXUS",
    tagline: "Autonomous AI system managing scoping, evaluation, and payments end-to-end.",
    description:
      "An autonomous platform that converts unstructured client briefs into structured, time-bound milestones, holds funds in escrow, evaluates submissions via LLMs, and triggers payout, partial payment, or refund decisions — without manual intervention.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Groq", "LLaMA 3", "LangChain", "FastAPI"],
    status: "ACTIVE",
    stats: [
      { label: "Agents", value: "4" },
      { label: "Decision Loop", value: "Brief → Payout" },
      { label: "Stack", value: "LLaMA 3 · Supabase" },
    ],
    simple: {
      problem: "Freelance work breaks down because scope is unclear, delivery proof is subjective, and payment release depends on trust.",
      approach: "An AI agent reads the brief, writes the contract, checks the work, and releases the money — without anyone in the middle.",
      architecture: "A simple flow: client posts a brief → AI breaks it into milestones → freelancer submits work → AI verifies → payment released.",
      result: "No more chasing payments or arguing over deliverables. Trust is replaced with verifiable evidence.",
    },
    technical: {
      problem: "Scope drift, ambiguous acceptance criteria, and trust-dependent payment release create friction across freelance engagements with no verifiable evaluation layer.",
      approach: "An LLM-backed pipeline parses unstructured briefs into time-bound milestones, locks funds in an escrow ledger, and routes submissions through an evaluation engine grounded in acceptance criteria.",
      architecture: "Brief-to-milestone parser → escrow ledger with row-level security → LLM evaluation pipeline (LLaMA 3 via Groq) → decision engine → payout/partial/refund flows. Reputation tracked via Professional Fidelity Index.",
      result: "End-to-end autonomous contract execution with measurable evaluation, secure data boundaries, and zero-trust payment release.",
    },
    demoUrl: "https://nexus-escrow.netlify.app/",
    githubUrl: "https://github.com/n-ikitasingh/Nexus-escrow",
  },
  {
  id: 2,
  title: "RosterIQ — Memory-Driven Analytics Copilot",
  codename: "ROSTERIQ",
  tagline: "Agentic analytics system with conversational querying, semantic memory, and real-time data reasoning.",
  description:
    "An AI-powered analytics copilot that transforms raw datasets into actionable insights through conversational workflows, memory-aware reasoning, SQL generation, and interactive data exploration.",

  technologies: [
    "React",
    "TypeScript",
    "TanStack Start",
    "Supabase",
    "Cloudflare Workers",
    "TailwindCSS",
    "Vite"
  ],

  status: "ACTIVE",

  stats: [
    { label: "Deployment", value: "Cloudflare" },
    { label: "Architecture", value: "Agentic AI" },
    { label: "Memory Layers", value: "3" },
  ],

  simple: {
    problem:
      "Business datasets are difficult to explore for non-technical users, especially when insights require SQL knowledge or memory of previous analysis.",
      
    approach:
      "RosterIQ lets users ask questions in plain English while the AI handles query planning, reasoning, and contextual memory automatically.",

    architecture:
      "Conversational UI → reasoning engine → SQL generation → Supabase execution → memory-aware analytics pipeline.",

    result:
      "Users can explore structured datasets conversationally without writing SQL or navigating complex dashboards.",
  },

  technical: {
    problem:
      "Traditional BI dashboards lack adaptive reasoning, conversational interfaces, and persistent memory across analytical workflows.",

    approach:
      "Built a memory-driven analytics copilot using TanStack Start, Supabase, and Cloudflare Workers with support for semantic recall, conversational querying, and agentic reasoning traces.",

    architecture:
      "Frontend built with React + TanStack Start. Backend integrates Supabase for structured querying and Cloudflare Workers for deployment/runtime orchestration. Includes semantic memory layers, replayable reasoning traces, and modular analytics workflows.",

    result:
      "Created a deployable AI-native analytics platform capable of conversational data exploration, contextual reasoning, and scalable cloud deployment.",
  },

  demoUrl: "https://rosteriq-ai.vercel.app/",
  githubUrl: "https://github.com/n-ikitasingh/RosterIQ",
},
  {
    id: 3,
    title: "Aurelius — Legal Document Summarization System",
    codename: "AURELIUS",
    tagline: "Explainable legal NLP pipeline for rhetorical analysis and structured summarization.",
    description:
      "A Legal-BERT–based pipeline that processes complex legal documents, identifies rhetorical structure, and produces interpretable abstractive summaries with model explanations.",
    technologies: ["Python", "Legal-BERT", "Transformers", "SHAP", "Hugging Face", "PyTorch"],
    status: "PUBLISHED · IEEE",
    stats: [
      { label: "Efficiency Gain", value: "~60%" },
      { label: "Model", value: "Legal-BERT" },
      { label: "Output", value: "Structured Summary" },
    ],
    simple: {
      problem: "Legal documents are long, dense, and easy to misread — important details get buried across pages.",
      approach: "An AI trained on legal language reads the document, finds the important parts, and writes a clean summary you can trust.",
      architecture: "The document goes through a legal-aware language model that labels sections (facts, arguments, judgment) and writes a structured summary with highlighted evidence.",
      result: "Lawyers and analysts get accurate summaries in seconds instead of hours, with proof of where each conclusion came from.",
    },
    technical: {
      problem: "General-purpose summarization fails on legal corpora due to dense rhetorical structure, long-range dependencies, and the cost of unfaithful summaries in legal review.",
      approach: "A domain-adapted pipeline using Legal-BERT embeddings, rhetorical role labeling, controlled abstractive summarization, and SHAP-driven explainability for evidence-aware outputs.",
      architecture: "Legal-BERT contextual encoder → Rhetorical Role Labeling head → constrained abstractive decoder with faithfulness regularization → SHAP attribution layer surfacing evidence spans.",
      result: "Published IEEE work showing ~60% improvement in document processing efficiency and interpretable, structured summaries for legal review.",
    },
    demoUrl: "https://aurelius-legal-ai.vercel.app/",
    githubUrl: "https://github.com/n-ikitasingh/Aurelius-AI",
  },
   {
    id: 4,
    title: "MindAura — Context-Aware Conversational AI",
    codename: "MIND-AURA",
    tagline: "Conversational AI for structured emotional interaction and context.",
    description:
      "Dialog system that maintains conversational context across turns and structures emotional responses.",
    technologies: ["Dialogflow", "NLP", "JavaScript"],
    status: "COMPLETED",
    stats: [
      { label: "Turns Tracked", value: "Multi" },
      { label: "Engine", value: "Dialogflow" },
      { label: "Mode", value: "Guided" },
    ],
    simple: {
      problem: "Most chatbots forget what you said two messages ago and respond like a generic FAQ — that doesn't work for emotional support.",
      approach: "Build a chatbot that actually remembers context and replies with the right tone for each emotional state.",
      architecture: "User message → intent recognition → context tracking across turns → structured, tone-aware response.",
      result: "A focused prototype that holds a real conversation and feels supportive, not robotic.",
    },
    technical: {
      problem: "Supportive conversational systems fail when context decays across turns and responses lose tonal consistency under emotionally complex inputs.",
      approach: "Dialogflow intents combined with multi-turn slot tracking and response structuring for tone continuity.",
      architecture: "Intent classifier (Dialogflow) → multi-turn context manager with slot tracking → response template engine with tone constraints → conversation state persistence.",
      result: "Maintains coherent multi-turn dialog with controlled tone, suitable for guided emotional support workflows.",
    },
    demoUrl: "https://mind-aura-two.vercel.app/",
    githubUrl: "https://github.com/n-ikitasingh/Mind-Aura",
  },
  {
    id: 5,
    title: "Gesture-Based Cursor & Text Editor",
    codename: "VISION-CTRL",
    tagline: "Real-time CV system for touchless cursor control and text interaction.",
    description:
      "Computer vision pipeline that maps hand landmarks to cursor and editor commands in real time.",
    technologies: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
    status: "COMPLETED",
    stats: [
      { label: "Latency", value: "Real-time" },
      { label: "Keypoints", value: "21" },
      { label: "Input", value: "Webcam" },
    ],
    simple: {
      problem: "Some people can't comfortably use a mouse and keyboard — they need a hands-free way to control a computer.",
      approach: "Use a webcam to track hand movements and turn them into cursor actions and typing — no extra hardware needed.",
      architecture: "Webcam feed → hand tracking → smoothing filters → mapped to cursor moves, clicks, drags, and text commands in real time.",
      result: "A working touchless interface that feels responsive and usable, not gimmicky.",
    },
    technical: {
      problem: "Hands-free interaction needs low-latency, jitter-free gesture recognition with enough precision to support meaningful UI control.",
      approach: "MediaPipe landmark extraction feeds an OpenCV pipeline with motion smoothing, debouncing, and gesture-to-command mapping.",
      architecture: "MediaPipe hand-landmark detector (21 keypoints) → OpenCV frame pipeline → exponential smoothing + jitter filters → gesture state machine → OS-level cursor and text actions.",
      result: "Real-time, low-latency interaction on commodity webcams enabling fully touchless cursor and text control.",
    },
    demoUrl: "#",
    githubUrl: "#",
  },
  {
    id: 6,
    title: "Liver Tumor Segmentation",
    codename: "MED-SEG",
    tagline: "U-Net based segmentation system for tumor regions in CT imaging.",
    description:
      "Medical imaging system that segments tumor regions from CT scans with clinically usable precision.",
    technologies: ["Python", "TensorFlow", "Keras", "U-Net", "OpenCV", "CNNs"],
    status: "COMPLETED",
    stats: [
      { label: "Dice Score", value: "0.91" },
      { label: "Modality", value: "CT" },
      { label: "Architecture", value: "U-Net" },
    ],
    simple: {
      problem: "Doctors need accurate tumor outlines from CT scans, but doing it manually is slow and inconsistent.",
      approach: "A deep-learning model learns from labeled scans and outlines tumors automatically with high precision.",
      architecture: "CT scans get preprocessed → fed into a U-Net model → output is a clean tumor mask, ready for clinical review.",
      result: "Tumor regions are detected accurately enough to support real medical decisions.",
    },
    technical: {
      problem: "Tumor boundaries in CT scans require pixel-level precision; weak segmentation reduces clinical usefulness and downstream radiomic reliability.",
      approach: "A U-Net pipeline with HU windowing, normalization, augmentation, Dice+BCE optimization, and boundary-focused post-processing.",
      architecture: "Preprocessing (HU windowing, normalization, augmentation) → U-Net with skip connections → composite Dice + BCE loss → morphological post-processing for boundary refinement and FP suppression.",
      result: "Achieved 0.91 Dice score on validation, demonstrating strong localization quality suitable for clinical decision support.",
    },
    demoUrl: "#",
    githubUrl: "#",
  },
   
];
