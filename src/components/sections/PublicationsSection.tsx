import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FileText, ExternalLink, Github, BookOpen, ChevronDown } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";

interface Publication {
  title: string;
  venue: string;
  summary: string;
  problem: string;
  contribution: string;
  impact: string;
  tag: string;
  paperUrl?: string;
  githubUrl?: string;
  demoUrl?: string;
}

const publications: Publication[] = [
  {
    title: "Legal Document Analysis & Summarization",
    venue: "IEEE",
    tag: "PUBLISHED",
    summary: "Explainable Legal-BERT pipeline for structured summarization of long legal corpora.",
    problem: "Legal corpora are long, dense, and unreliable to summarize with general-purpose models.",
    contribution: "Legal-BERT pipeline with rhetorical role labeling and constrained abstractive summarization, plus SHAP attributions for evidence-aware outputs.",
    impact: "~60% reduction in document processing effort with interpretable, structured summaries usable in legal review.",
    paperUrl: "https://ieeexplore.ieee.org/document/11411272",
    githubUrl: "https://github.com/n-ikitasingh/Aurelius-AI",
    demoUrl: "https://aurelius-legal-ai.vercel.app/",
  },
  {
    title: "DAL-GAN-PS",
    venue: "IEEE · iCONECCT 2025 · Best Paper",
    tag: "AWARD",
    summary: "Dual-adversarial GAN with phonological constraint conditioning.",
    problem: "Structured generation tasks degrade when linguistic and phonological constraints are not modeled jointly.",
    contribution: "Dual-adversarial linguistic GAN with phonological constraint conditioning across paired discriminators.",
    impact: "Best Paper Award; demonstrated improved structural fidelity over baseline GAN variants.",
    paperUrl: "https://ieeexplore.ieee.org/document/11469818",
    githubUrl: "#",
  },
  {
    title: "Visual Trajectory Fields",
    venue: "IEEE",
    tag: "PUBLISHED",
    summary: "Trajectory-field framework for interpretable deep vision representations.",
    problem: "Deep vision models behave as black boxes when reasoning over perceptual dynamics.",
    contribution: "Trajectory-field framework analyzing how representations evolve across spatial inputs.",
    impact: "Camera-ready acceptance; produces interpretable views into model perception suitable for explainability tooling.",
    paperUrl: "https://ieeexplore.ieee.org/document/11536040",
    githubUrl: "#",
  },
];

const PublicationCard = ({ pub }: { pub: Publication }) => {
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className="p-6 h-full flex flex-col" hover={false}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <span className="badge-chip-active text-[10px]">{pub.tag}</span>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-2">
        {pub.venue}
      </p>
      <h4 className="text-foreground font-display font-bold mb-2 leading-snug">
        {pub.title}
      </h4>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        {pub.summary}
      </p>

      {/* Always-visible action row */}
      <div className="mt-auto flex flex-wrap gap-2 pt-3 border-t border-border/60">
        {pub.paperUrl && (
          <a href={pub.paperUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
            <ExternalLink className="w-3 h-3" /> Paper
          </a>
        )}
        {pub.demoUrl && (
          <a href={pub.demoUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-muted/60 text-foreground border border-border hover:border-primary/40 transition-colors">
            <ExternalLink className="w-3 h-3" /> Demo
          </a>
        )}
        {pub.githubUrl && (
          <a href={pub.githubUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-muted/60 text-foreground border border-border hover:border-primary/40 transition-colors">
            <Github className="w-3 h-3" /> Code
          </a>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-wider bg-transparent text-muted-foreground border border-transparent hover:text-primary hover:border-primary/30 transition-colors"
          aria-expanded={open}
        >
          <span>{open ? "Hide details" : "Read details"}</span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="w-3 h-3" />
          </motion.span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-3">
              {[
                { label: "Problem", body: pub.problem },
                { label: "Contribution", body: pub.contribution },
                { label: "Impact", body: pub.impact },
              ].map((row) => (
                <div key={row.label}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground mb-1">/ {row.label}</p>
                  <p className="text-xs text-foreground/85 leading-relaxed">{row.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

export const PublicationsSection = () => {
  return (
    <SectionWrapper id="publications" title="Investigations // Research" subtitle="// PUBLICATIONS · CONTRIBUTIONS">
      <div className="flex justify-end mb-6">
        <a
          href="https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=4lb-8WgAAAAJ"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Google Scholar
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {publications.map((pub, i) => (
          <ScrollReveal key={pub.title} delay={i * 0.08}>
            <PublicationCard pub={pub} />
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
};
