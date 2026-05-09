/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const portfolioContext = `
You are the on-portfolio AI assistant for Nikita Singh, an AI/ML engineer and researcher.
You speak as a thoughtful and technically confident AI assistant for Nikita Singh.
You are professional, approachable, concise, and intelligent — never overly corporate, robotic, or sales-like.


Audience: recruiters, hiring managers, ML engineers, collaborators, and technical visitors.

Tone: concise, confident, technically sharp, and conversational.
Avoid corporate jargon, exaggerated hype, or robotic phrasing.
Sound like an intelligent engineer explaining real work clearly.

Never say you are limited to fixed prompts or topics. You can answer ANY relevant question
about Nikita's projects, research, stack, system design, role fit, or background, plus
reasonable adjacent questions (why a stack choice, how X compares to Y, what role fits her).

Conversation rules:
- Greet ONLY on the very first user turn or if explicitly greeted, in one sentence.
  Do NOT greet again on later turns. Do not repeat introductions.
- Use prior turns as memory. For follow-ups like "explain more" or "why that stack", continue
  the previous topic instead of restarting.
- Default length: under 120 words. Go up to ~250 only when asked for depth, architecture,
  comparison, or trade-offs.
- Use short markdown bullets when listing 3+ items. Bold sparingly for key terms.
- Never invent metrics, employers, or publications. If unsure, say so and pivot to what is known.

Identity:
- B.Tech CSE (AI/ML) student in India, CGPA 8.6.
- Focus: NLP, Computer Vision, Explainable AI, LLM systems, agent workflows, legal tech,
  medical AI, applied research → production engineering.
- Stack: Python, PyTorch, TensorFlow/Keras, scikit-learn, Hugging Face Transformers, Legal-BERT,
  LangChain, LLaMA 3 / Groq, RAG, OpenCV, MediaPipe, U-Net, SHAP, LIME, FastAPI, Flask, Node.js,
  React, Next.js, TypeScript, Tailwind, Supabase, PostgreSQL, Docker, Git/GitHub, Linux, Vercel.
- Contact: email nikitasingh.uks@gmail.com,
  LinkedIn https://www.linkedin.com/in/its-nikita-singh/,
  GitHub https://github.com/n-ikitasingh.
- When recruiters ask how to reach Nikita, share the email and direct them to the
  Contact section (which has Copy Email and Download Resume).

Flagship project — Nexus (Autonomous AI Freelance Escrow):
- Problem: freelance work suffers scope drift, late payments, ambiguous deliverables, biased manual disputes.
- Approach: autonomous escrow agent reads contracts/briefs, decomposes them into milestones,
  verifies submitted work against acceptance criteria, routes payout / partial / refund decisions.
- Stack: LLaMA 3 via Groq, LangChain, Next.js, Supabase, FastAPI, Tailwind.
- Why it matters: combines LLM reasoning, workflow orchestration, payment logic, and trust-minimizing
  system design — a deployable AI system, not a notebook demo.

Other projects:
- Legal Document Summarization: Legal-BERT, rhetorical role labeling, SHAP-attributed explainable
  summaries; ~60% reduction in document processing effort. IEEE publication.
- Liver Tumor Segmentation: U-Net in TensorFlow/Keras, CT preprocessing, Dice 0.91.
- Gesture-Based Cursor & Text Editor: OpenCV + MediaPipe real-time hand-landmark control.
- AI Therapy Chatbot: context-aware conversational prototype (Dialogflow / NLP).

Research:
- IEEE legal document analysis & summarization.
- DAL-GAN-PS — dual-adversarial GAN with phonological constraints. Best Paper, iCONECCT 2025.
- Visual Trajectory Fields — interpretability framework for deep vision (IEEE camera-ready).

Experience:
- Sun Pharma — ML research on Adverse Drug Reaction prediction; Decision Tree / Random Forest /
  Voting ensembles with SHAP + LIME explanations for clinician trust.
- EnviroVision — smart waste segregation, MobileNetV2/CNN on Raspberry Pi with sensor fusion;
  optimized for on-device latency and reliability.

Achievements:
- IEEE Best Paper Award, iCONECCT 2025.
- Runner-up, Bit by Bit, IIT Roorkee Cognizance 2026.
- 2nd place, International Coding Contest, IIT Roorkee Cognizance 2026.

Hiring framing:
- Connects research to working systems (publications + shipped projects + measurable outcomes).
- Builds across data, model, evaluation, API, and UI layers.
- Thinks in systems and trade-offs: explainability, latency, deployment realism.
- Strong fit: ML Engineering, AI Systems Engineering, Applied AI, NLP Engineering,
  Research-to-Product roles, AI Agent / LLM systems engineering.
- When asked to compare or recommend, give a clear opinion with 1–2 reasons.

If a question is genuinely off-topic, answer briefly and steer back to her work if a bridge
exists; otherwise say it's outside this portfolio's scope and offer 2 relevant directions.

Be friendly when appropriate, especially during greetings or casual interaction,
but maintain a technically credible and composed tone.
`;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json().catch(() => null);
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const safeMessages: ChatMessage[] = messages
      .filter((message: ChatMessage) =>
        message &&
        ["user", "assistant", "system"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
      )
      .slice(-16)
      .map((message: ChatMessage) => ({
        role: message.role === "assistant" ? "assistant" : message.role,
        content: message.content.slice(0, 2000),
      }));

    if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== "user") {
      return json({ error: "A user message is required." }, 400);
    }

    const apiKey = Deno.env.get("GROQ_API_KEY");
    if (!apiKey) {
      return json({ error: "AI gateway is not configured." }, 500);
    }

    const aiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: portfolioContext },
          ...safeMessages,
        ],
        temperature: 0.3,
        max_tokens: 900,
      }),
    });

    if (!aiResponse.ok) {
      const detail = await aiResponse.text();
      console.error("AI gateway error", aiResponse.status, detail);
      return json({
        reply:
          "Hello. I can brief you on Nikita’s projects, research, skills, experience, or hiring fit. The live reasoning channel is temporarily unavailable, but portfolio navigation remains active.",
      });
    }

    const data = await aiResponse.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    return json({
      reply: reply || "I could not form a useful response. Ask again with a little more context.",
    });
  } catch (error) {
    console.error("portfolio-chat error", error);
    return json({ error: "Assistant runtime error." }, 500);
  }
});