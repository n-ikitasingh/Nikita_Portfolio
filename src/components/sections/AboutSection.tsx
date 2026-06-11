import { useState } from "react";
import { motion } from "framer-motion";
import { User, MapPin, GraduationCap, Target, TrendingUp, Brain } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";
import { CognitiveMapModal } from "../ui/CognitiveMapModal";

const dossier = {
  fullName: "Nikita Singh",
  designation: "AI Systems Engineer · ML Engineer",
  location: "India",
  education: "B.Tech Computer Science · AI/ML Specialization",
  focus: "AI Systems · NLP · Explainable AI · Production ML",
  story: `I treat AI problems as system problems — designing inference pipelines, orchestration layers, evaluation logic, and deployable interfaces around models rather than treating models as the endpoint.

My work spans NLP systems, explainability, agent workflows, and applied computer vision, with a focus on engineering for real-world constraints: latency, interpretability, evaluation reliability, and integration into existing software.`,
};

const tags = [
  "AI Systems",
  "ML Engineering",
  "NLP",
  "Explainable AI",
  "Agent Workflows",
  "PyTorch",
  "Transformers",
  "FastAPI",
  "Production ML",
  "Research",
];

const metrics = [
  { label: "CGPA", value: "8.7", note: "B.Tech CSE (AI/ML)" },
  { label: "Dice Score", value: "0.91", note: "U-Net · Liver Tumor Segmentation" },
  { label: "Pipeline Speed-up", value: "~60%", note: "Legal NLP Summarization" },
  { label: "IEEE Publications", value: "3", note: "Incl. Best Paper Award" },
];

export const AboutSection = () => {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <SectionWrapper id="about" title="Subject Dossier" subtitle="// PROFILE · AI SYSTEMS ENGINEER">
      <div className="grid lg:grid-cols-5 gap-8">
        <ScrollReveal className="lg:col-span-3">
          <GlassCard className="p-8" hover={false}>
            <div className="flex items-start justify-between gap-6 mb-6 pb-6 border-b border-border">
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-2">
                  / Subject Dossier
                </p>
                <h3 className="text-3xl font-display font-bold text-foreground leading-tight">
                  {dossier.fullName}
                </h3>
                <p className="text-foreground/80 mt-1.5 text-sm md:text-base font-medium">
                  {dossier.designation}
                </p>
              </div>
              
                <motion.div
  className="group relative w-24 h-24 rounded-xl overflow-hidden border border-primary/20 shrink-0"
  whileHover={{ y: -2 }}
  transition={{ type: "spring", stiffness: 220, damping: 18 }}
>
  {/* Profile Image */}
  <img
    src="/nikita-profile.jpeg"
    alt="Nikita Singh"
    
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
  />

  {/* Hover glow */}
  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

  {/* Scan line */}
  <motion.div
    className="absolute inset-x-0 h-px bg-primary/60"
    initial={{ opacity: 0, top: "10%" }}
    whileHover={{ opacity: 1 }}
    animate={{ top: ["10%", "90%", "10%"] }}
    transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
  />

  {/* Status label */}
  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm font-mono text-[8px] uppercase tracking-[0.18em] text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
    Active
  </div>
</motion.div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground uppercase">Location</p>
                  <p className="text-foreground">{dossier.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground uppercase">Education</p>
                  <p className="text-foreground text-sm">{dossier.education}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-primary" />
                <p className="font-mono text-xs text-primary uppercase tracking-wider">Focus Areas</p>
              </div>
              <p className="text-foreground/90">{dossier.focus}</p>
            </div>

            <div>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Background
              </p>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm mb-5">
                {dossier.story}
              </div>
              <button
                onClick={() => setMapOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-[11px] uppercase tracking-wider border border-primary/30 bg-primary/5 text-primary hover:bg-primary/15 hover:border-primary/60 transition-colors"
              >
                <Brain className="w-3.5 h-3.5" />
                View Cognitive Map
              </button>
            </div>
          </GlassCard>
        </ScrollReveal>

        <ScrollReveal className="lg:col-span-2" delay={0.2}>
          <div className="space-y-6 h-full flex flex-col">
            <GlassCard className="p-6" hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-primary" />
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Key Metrics
                </p>
              </div>
              <div className="space-y-4">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-baseline justify-between gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="text-sm text-foreground font-medium">{m.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{m.note}</p>
                    </div>
                    <span className="font-mono text-lg text-primary font-bold dark-glow-text shrink-0">
                      {m.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6 flex-1" hover={false}>
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-4">
                Core Keywords
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="badge-chip-active"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>
      </div>
      <CognitiveMapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </SectionWrapper>
  );
};
