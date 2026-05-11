import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Cog,
  ExternalLink,
  Folder,
  Github,
  Network,
  Sparkles,
  X,
} from "lucide-react";
import type { Project } from "../sections/ProjectsSection";

interface CaseFileModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

type Mode = "simple" | "technical";

export const CaseFileModal = ({ project, isOpen, onClose }: CaseFileModalProps) => {
  const [mode, setMode] = useState<Mode>("simple");

  useEffect(() => {
    if (isOpen) setMode("simple");
  }, [isOpen, project?.id]);

  if (!project) return null;

  const view = mode === "simple" ? project.simple : project.technical;

  const cards = [
    { key: "problem", label: "Problem", icon: AlertCircle, body: view.problem, accent: "text-primary/80" },
    { key: "approach", label: "Approach", icon: Sparkles, body: view.approach, accent: "text-primary" },
    { key: "architecture", label: "Architecture", icon: Network, body: view.architecture, accent: "text-primary" },
    { key: "result", label: "Result", icon: CheckCircle2, body: view.result, accent: "text-primary" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-background/92 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-3 md:inset-8 xl:inset-14 z-50 overflow-auto"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
          >
            <div className="relative min-h-full overflow-hidden rounded-lg border border-border bg-card/90 backdrop-blur-xl shadow-2xl">
              <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_35%),radial-gradient(circle_at_90%_90%,hsl(var(--primary)/0.08),transparent_35%)]" />

              <div className="relative z-10 px-5 pb-5 pt-20 md:px-8 md:pb-8 md:pt-16 lg:px-10 lg:pb-10 lg:pt-12">
                <header className="flex items-start justify-between gap-4 pb-6 border-b border-border">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="font-mono text-[10px] text-muted-foreground tracking-[0.2em]">
                        CASE {String(project.id).padStart(3, "0")}
                      </span>
                      <Folder className="w-4 h-4 text-primary" />
                      <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em]">
                        {project.codename}
                      </span>
                      <span className="badge-chip-active text-[10px]">{project.status}</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground leading-tight max-w-4xl">
                      {project.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-3xl">
                      {project.tagline}
                    </p>
                  </div>
                  <motion.button
                    onClick={onClose}
                    className="p-2 rounded-md border border-border bg-background/50 hover:bg-muted transition-colors shrink-0"
                    whileHover={{ scale: 1.06, rotate: 90 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label="Close case file"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </header>

                {/* View toggle */}
                <div className="flex items-center justify-between flex-wrap gap-3 mt-6">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="badge-chip text-[10px]">{tech}</span>
                    ))}
                  </div>
                  <div className="relative inline-flex p-1 rounded-full border border-border bg-background/60 backdrop-blur">
                    {(["simple", "technical"] as Mode[]).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`relative z-10 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-colors ${
                          mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {mode === m && (
                          <motion.span
                            layoutId="modeToggle"
                            className="absolute inset-0 rounded-full bg-primary shadow-neon"
                            transition={{ type: "spring", damping: 22, stiffness: 280 }}
                          />
                        )}
                        <span className="relative">{m === "simple" ? "Simple View" : "Technical View"}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid sm:grid-cols-3 gap-3 mt-6">
                  {project.stats.map((s) => (
                    <div key={s.label} className="rounded-lg border border-border bg-background/45 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">{s.label}</p>
                      <p className="font-display text-lg text-primary">{s.value}</p>
                    </div>
                  ))}
                </div>

                {/* Cards: Problem / Approach / Architecture / Result */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="grid md:grid-cols-2 gap-4 mt-6"
                  >
                    {cards.map((c, i) => {
                      const Icon = c.icon;
                      return (
                        <motion.div
                          key={c.key}
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 + i * 0.07 }}
                          className="rounded-lg border border-border bg-background/50 p-5 hover:border-primary/40 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-md border border-border bg-card/60 flex items-center justify-center">
                              <Icon className={`w-4 h-4 ${c.accent}`} />
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                              / {c.label}
                            </p>
                          </div>
                          <p className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">
                            {c.body}
                          </p>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
                      <ExternalLink className="w-4 h-4" /> Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs uppercase tracking-wider border border-border bg-muted/60 text-foreground hover:border-primary/40 transition-colors">
                      <Github className="w-4 h-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
