import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Briefcase, Calendar, ChevronRight, ChevronDown } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";

interface Experience {
  title: string;
  company: string;
  duration: string;
  summary: string;
  work: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: "Machine Learning Research Intern",
    company: "Sun Pharma",
    duration: "Research Engagement",
    summary:
      "Engineered an explainable ML pipeline for Adverse Drug Reaction (ADR) prediction targeting clinician trust.",
    work: [
      "Designed end-to-end ML pipeline: preprocessing, feature engineering, evaluation",
      "Implemented Decision Tree, Random Forest, and Voting Classifier ensembles",
      "Integrated SHAP and LIME to surface per-prediction attributions",
      "Validated outputs against domain-expert review and refined feature pipeline",
    ],
    technologies: ["Python", "scikit-learn", "Random Forest", "SHAP", "LIME", "XAI"],
  },
  {
    title: "AI Developer Intern",
    company: "EnviroVision",
    duration: "Internship",
    summary:
      "Designed and deployed a smart waste-segregation system combining deep learning with embedded sensor integration.",
    work: [
      "Implemented MobileNetV2 classifier reaching ~97–98% accuracy on test set",
      "Integrated Raspberry Pi with ultrasonic and inductive sensors for hardware-in-the-loop inference",
      "Optimized model and pipeline for on-device latency and reliability under real-world conditions",
    ],
    technologies: ["Python", "TensorFlow", "MobileNetV2", "OpenCV", "Raspberry Pi", "Edge AI"],
  },
];

const ExperienceCard = ({ exp, idx }: { exp: Experience; idx: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative pl-16">
      <motion.div
        className="absolute left-[18px] top-8"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="timeline-dot" />
      </motion.div>

      <GlassCard className="overflow-hidden" hover={false}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 hover:bg-primary/[0.03] transition-colors"
          aria-expanded={open}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="font-mono text-xs text-primary uppercase tracking-wider">
                Operation #{String(idx + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-foreground">
              {exp.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {exp.company} · <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.duration}</span>
            </p>
            <p className="text-foreground/80 mt-2 text-sm leading-relaxed">
              {exp.summary}
            </p>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 md:px-6 pb-6 pt-2 border-t border-border/50">
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3 mt-4">
                  Key Work
                </p>
                <ul className="space-y-2 mb-5">
                  {exp.work.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 text-foreground/90"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <ChevronRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="badge-chip-active">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
};

export const ExperienceSection = () => {
  return (
    <SectionWrapper id="experience" title="Operations // Experience" subtitle="// FIELD OPERATIONS · TAP TO OPEN">
      <div className="relative max-w-3xl mx-auto">
        <div className="timeline-line" />
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <ScrollReveal key={exp.title} delay={idx * 0.1}>
              <ExperienceCard exp={exp} idx={idx} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
