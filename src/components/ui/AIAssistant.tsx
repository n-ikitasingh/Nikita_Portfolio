import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, Bot, Loader2, Maximize2, Minimize2, Send, Sparkles, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "assistant" | "user"; content: string; cta?: { label: string; section: string }[] };

interface QuickAction {
  id: string;
  label: string;
  query: string;
}

const quickActions: QuickAction[] = [
  { id: "best", label: "Strongest system built", query: "Walk me through Nikita's strongest engineered system and the design decisions behind it." },
  { id: "research", label: "Research contributions", query: "Summarize Nikita's research contributions and their real-world relevance." },
  { id: "skills", label: "Capability overview", query: "Give a structured overview of Nikita's AI engineering capabilities by layer." },
  { id: "hire", label: "Why hire Nikita", query: "Why is Nikita a strong hire for an ML / AI Systems Engineering role?" },
  { id: "arch", label: "Explain architecture", query: "Explain how Nikita designs end-to-end intelligent systems, from data to deployment." },
  { id: "fit", label: "Best role fit", query: "Which AI/ML roles is Nikita the best fit for and why?" },
];

const sectionMap = [
  { match: /(project|nexus|case file|demo)/i, label: "Open projects", section: "projects" },
  { match: /(research|paper|publication|ieee|scholar)/i, label: "Open research", section: "publications" },
  { match: /(skill|stack|tool|technology|tech)/i, label: "Open skills", section: "skills" },
  { match: /(hire|contact|email|recruit|connect)/i, label: "Open contact", section: "contact" },
  { match: /(experience|intern|sun pharma|envirovision)/i, label: "Open experience", section: "experience" },
  { match: /(award|achievement|cognizance|contest)/i, label: "Open awards", section: "achievements" },
];

const fallbackAnswer = (query: string) => {
  if (/hi|hello|hey/i.test(query)) {
    return "Hello. I can brief you on Nikita’s projects, research, technical stack, experience, or hiring fit. Ask directly — I will keep it concise.";
  }
  return "I can answer portfolio and technical-fit questions about Nikita. The live AI channel is unavailable for a moment, but you can still ask about projects, research, skills, experience, awards, or hiring fit.";
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const getCtas = (text: string) =>
  sectionMap.filter((item) => item.match.test(text)).slice(0, 2).map(({ label, section }) => ({ label, section }));

export const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("ns-assistant-history");
        if (stored) {
          const parsed = JSON.parse(stored) as Msg[];
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch {}
    }
    return [{ role: "assistant", content: "System online. Ask anything about Nikita's projects, research, capabilities, or engineering fit." }];
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem("ns-assistant-history", JSON.stringify(messages.slice(-30)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  const panelSize = useMemo(
    () => expanded
      ? "fixed inset-3 md:inset-auto md:right-6 md:bottom-24 md:w-[min(760px,calc(100vw-3rem))] md:h-[min(720px,calc(100vh-8rem))]"
      : "fixed bottom-24 right-4 md:right-6 w-[min(520px,calc(100vw-2rem))] h-[min(620px,calc(100vh-8rem))]",
    [expanded]
  );

  const send = async (text: string) => {
    const query = text.trim();
    if (!query || loading) return;

    const userMessage: Msg = { role: "user", content: query };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("portfolio-chat", {
        body: {
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        },
      });

      if (error) throw error;
      const reply = typeof data?.reply === "string" ? data.reply : fallbackAnswer(query);
      setMessages((prev) => [...prev, { role: "assistant", content: reply, cta: getCtas(`${query} ${reply}`) }]);
    } catch (error) {
      console.error("Assistant request failed", error);
      setMessages((prev) => [...prev, { role: "assistant", content: fallbackAnswer(query), cta: getCtas(query) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center bg-background/85 backdrop-blur-md border border-primary/45 text-primary shadow-[0_0_22px_hsl(var(--neon-cyan)/0.28)] hover:shadow-[0_0_34px_hsl(var(--neon-cyan)/0.42)] transition-shadow"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 220 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI assistant"
      >
        <motion.span className="absolute inset-0 rounded-full border border-primary/30" animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }} />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Bot className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className={`${panelSize} z-40 rounded-lg overflow-hidden bg-card/95 backdrop-blur-xl border border-border dark:border-primary/25 shadow-2xl dark:shadow-[0_0_55px_hsl(var(--neon-cyan)/0.16)] flex flex-col`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-2.5 h-2.5 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-primary" />
                  <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">System · Portfolio Intelligence</p>
                  <p className="text-[11px] text-muted-foreground truncate">Ask anything about Nikita’s work, stack, research, or fit.</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setExpanded((value) => !value)} className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Resize assistant">
                  {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Close assistant">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 md:px-5 space-y-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div className={`max-w-[92%] rounded-lg px-3.5 py-3 text-sm leading-relaxed border ${message.role === "user" ? "bg-primary/15 border-primary/25 text-foreground font-mono" : "bg-background/55 border-border text-foreground/90"}`}>
                    {message.role === "assistant" && (
                      <p className="font-mono text-[9px] uppercase tracking-wider text-primary mb-1.5">▸ system</p>
                    )}
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-2 prose-li:my-0 text-inherit prose-strong:text-foreground prose-code:text-primary">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                    </div>
                    {message.cta && message.cta.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {message.cta.map((cta) => (
                          <button
                            key={cta.section}
                            onClick={() => {
                              scrollTo(cta.section);
                              setOpen(false);
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {cta.label}
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/55 px-3.5 py-3 text-sm text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    Analyzing query…
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 md:px-5 pb-3 grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button key={action.id} onClick={() => send(action.query)} className="px-3 py-2 rounded-md text-left text-[10px] font-mono uppercase tracking-wider bg-muted/55 border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors">
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {messages.length > 1 && (
              <div className="px-4 md:px-5 pb-2 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Session memory active</span>
                <button
                  onClick={() => setMessages([{ role: "assistant", content: "Session reset. Ask anything." }])}
                  className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  Reset
                </button>
              </div>
            )}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 px-3 py-3 border-t border-border bg-muted/20"
            >
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about projects, skills, research, fit…"
                className="flex-1 min-w-0 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground/70 text-foreground"
              />
              <button type="submit" disabled={!input.trim() || loading} className="p-2 rounded-md text-primary hover:bg-primary/10 disabled:opacity-30 transition-colors" aria-label="Send message">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};