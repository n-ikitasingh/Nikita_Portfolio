import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BrainCircuit,
  Code2,
  DatabaseZap,
  ScanSearch,
  Wrench,
  Languages,
  X,
  FolderOpen,
  Sparkles,
  Workflow,
  Server,
} from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { projects } from "@/data/projects";

type Tier = "Core" | "Applied" | "Research" | "Familiar";

interface Skill {
  name: string;
  tier: Tier;
  aliases?: string[];
}

interface Category {
  id: string;
  label: string;
  tag: string;
  icon: typeof BrainCircuit;
  blurb: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    id: "intelligence",
    label: "Intelligence Layer",
    tag: "01 · MODELS",
    icon: BrainCircuit,
    blurb: "Model design, training, fine-tuning and applied deep learning.",
    skills: [
      { name: "PyTorch", tier: "Core" },
      { name: "Transformers", tier: "Core" },
      { name: "Deep Learning", tier: "Core" },
      { name: "CNNs", tier: "Applied" },
      { name: "Fine-tuning", tier: "Applied" },
      { name: "TensorFlow / Keras", tier: "Applied", aliases: ["TensorFlow", "Keras"] },
      { name: "Scikit-learn", tier: "Core" },
      { name: "XGBoost", tier: "Applied" },
    ],
  },
  {
    id: "language",
    label: "NLP & Language Systems",
    tag: "02 · LANGUAGE",
    icon: Languages,
    blurb: "Transformers, retrieval, agents and domain-specific language pipelines.",
    skills: [
      { name: "Hugging Face", tier: "Core" },
      { name: "Legal-BERT", tier: "Applied" },
      { name: "BERT / RoBERTa", tier: "Applied", aliases: ["BERT", "RoBERTa"] },
      { name: "LangChain", tier: "Applied" },
      { name: "RAG", tier: "Applied" },
      { name: "Prompt Engineering", tier: "Core" },
      { name: "spaCy / NLTK", tier: "Applied", aliases: ["spaCy", "NLTK"] },
      { name: "LLaMA 3 · Groq", tier: "Applied", aliases: ["Groq", "LLaMA 3"] },
    ],
  },
  {
    id: "explainability",
    label: "Explainability & Evaluation",
    tag: "03 · INTERPRETABILITY",
    icon: ScanSearch,
    blurb: "Attribution, evaluation workflows, and trust-aware ML.",
    skills: [
      { name: "SHAP", tier: "Core" },
      { name: "LIME", tier: "Core" },
      { name: "Attribution", tier: "Applied" },
      { name: "Evaluation Pipelines", tier: "Applied" },
      { name: "Interpretability", tier: "Research" },
      { name: "U-Net", tier: "Applied" },
      { name: "OpenCV", tier: "Applied" },
      { name: "MediaPipe", tier: "Applied" },
    ],
  },
  {
    id: "systems",
    label: "Systems & Orchestration",
    tag: "04 · ORCHESTRATION",
    icon: Workflow,
    blurb: "APIs, agent workflows, and backend pipelines around models.",
    skills: [
      { name: "FastAPI", tier: "Core" },
      { name: "REST APIs", tier: "Core" },
      { name: "Agent Workflows", tier: "Applied" },
      { name: "LangChain", tier: "Applied" },
      { name: "Backend Pipelines", tier: "Applied" },
      { name: "Node.js", tier: "Applied" },
      { name: "Flask", tier: "Applied" },
      { name: "Vector Databases", tier: "Familiar" },
    ],
  },
  {
    id: "deployment",
    label: "Deployment & Infrastructure",
    tag: "05 · DEPLOYMENT",
    icon: Server,
    blurb: "Shipping ML systems to production with reliable infrastructure.",
    skills: [
      { name: "Docker", tier: "Applied" },
      { name: "Git / GitHub", tier: "Core", aliases: ["Git", "GitHub"] },
      { name: "Streamlit", tier: "Applied" },
      { name: "Vercel", tier: "Applied" },
      { name: "Linux", tier: "Applied" },
      { name: "CI/CD", tier: "Familiar" },
      { name: "Supabase", tier: "Applied" },
      { name: "PostgreSQL", tier: "Applied" },
    ],
  },
  {
    id: "interface",
    label: "Frontend & Interfaces",
    tag: "06 · INTERFACE",
    icon: Code2,
    blurb: "Interactive UIs that wrap intelligent systems.",
    skills: [
      { name: "React", tier: "Core" },
      { name: "Next.js", tier: "Applied" },
      { name: "TypeScript", tier: "Applied" },
      { name: "Tailwind CSS", tier: "Core" },
      { name: "Framer Motion", tier: "Applied" },
      { name: "Python", tier: "Core" },
      { name: "C++", tier: "Familiar" },
      { name: "Java", tier: "Familiar" },
    ],
  },
];

const tierStyles: Record<Tier, string> = {
  Core: "bg-primary/15 border-primary/40 text-primary",
  Applied: "bg-accent/10 border-accent/40 text-accent",
  Research: "bg-secondary/15 border-secondary/40 text-secondary",
  Familiar: "bg-muted/40 border-border text-muted-foreground",
};

const tierTooltips: Record<Tier, string> = {
  Core: "Core — daily-driver, deep proficiency across multiple shipped systems.",
  Applied: "Applied — used in implementation and production projects.",
  Research: "Research — explored in research work and publications.",
  Familiar: "Familiar — working knowledge from coursework or supporting use.",
};

const findRelatedProjects = (skill: Skill) => {
  const needles = [skill.name, ...(skill.aliases ?? [])].map((n) => n.toLowerCase());
  return projects.filter((p) =>
    p.technologies.some((t) =>
      needles.some((n) => t.toLowerCase().includes(n) || n.includes(t.toLowerCase()))
    )
  );
};

export const SkillsSection = () => {
  const [active, setActive] = useState<string>(categories[0].id);
  const [openSkill, setOpenSkill] = useState<Skill | null>(null);
  const current = categories.find((c) => c.id === active)!;
  const ActiveIcon = current.icon;

  const related = useMemo(
    () => (openSkill ? findRelatedProjects(openSkill) : []),
    [openSkill]
  );

  return (
    <SectionWrapper id="skills" title="Capability Architecture" subtitle="// 03 · INTEL · CAPABILITIES">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <ScrollReveal>
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = cat.id === active;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActive(cat.id)}
                  className={`shrink-0 lg:shrink text-left rounded-md border px-4 py-3 transition-colors w-full ${
                    isActive
                      ? "border-primary bg-primary/10 text-foreground shadow-neon"
                      : "border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]">{cat.tag}</span>
                  </div>
                  <p className="font-display text-base">{cat.label}</p>
                </button>
              );
            })}
          </div>

        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-lg border border-border bg-card/55 backdrop-blur-xl p-6 md:p-8 shadow-card"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
                  {current.tag}
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-foreground">{current.label}</h3>
                <p className="text-sm text-foreground/70 mt-2 max-w-xl">{current.blurb}</p>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  Tap any capability to inspect linked systems.
                </p>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="w-12 h-12 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center">
                  <ActiveIcon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {current.skills.map((skill, i) => (
                <motion.button
                  key={skill.name}
                  type="button"
                  onClick={() => setOpenSkill(skill)}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.025 }}
                  whileHover={{ y: -2 }}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/45 pl-3 pr-2 py-1.5 hover:border-primary/50 hover:bg-background/65 transition-colors"
                  title={tierTooltips[skill.tier]}
                >
                  <span className="font-mono text-xs text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono uppercase tracking-wider ${tierStyles[skill.tier]}`}>
                    {skill.tier}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>
      </div>

      <SkillNetworkDialog
        skill={openSkill}
        related={related}
        onClose={() => setOpenSkill(null)}
      />
    </SectionWrapper>
  );
};

interface DialogProps {
  skill: Skill | null;
  related: typeof projects;
  onClose: () => void;
}

const SkillNetworkDialog = ({ skill, related, onClose }: DialogProps) => {
  return (
    <AnimatePresence>
      {skill && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-4 md:inset-16 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
              className="pointer-events-auto w-full max-w-3xl max-h-[88vh] overflow-auto rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl"
            >
              <div className="relative p-6 md:p-8">
                <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_30%_10%,hsl(var(--primary)/0.18),transparent_40%),radial-gradient(circle_at_80%_90%,hsl(var(--accent)/0.16),transparent_38%)]" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">
                        / CAPABILITY NODE
                      </p>
                      <h3 className="font-display text-3xl md:text-4xl text-foreground">{skill.name}</h3>
                      <span className={`mt-3 inline-block px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${tierStyles[skill.tier]}`}>
                        {skill.tier}
                      </span>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-md border border-border bg-background/50 hover:bg-muted transition-colors"
                      aria-label="Close skill node"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                      / LINKED SYSTEMS · {related.length}
                    </p>
                    {related.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border bg-background/40 p-6 text-center text-sm text-muted-foreground">
                        Used across coursework, internal tooling, and supporting infrastructure rather than a public case file.
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="flex justify-center mb-6">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-14 h-14 rounded-full border border-primary bg-primary/15 flex items-center justify-center shadow-neon"
                          >
                            <Sparkles className="w-5 h-5 text-primary" />
                            <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                          </motion.div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {related.map((p, i) => (
                            <motion.div
                              key={p.id}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 + i * 0.06 }}
                              className="relative rounded-lg border border-border bg-background/55 p-4 hover:border-primary/50 transition-colors"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <FolderOpen className="w-4 h-4 text-primary" />
                                <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                                  {p.codename}
                                </span>
                              </div>
                              <p className="font-display text-base text-foreground mb-1">{p.title}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{p.tagline}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
