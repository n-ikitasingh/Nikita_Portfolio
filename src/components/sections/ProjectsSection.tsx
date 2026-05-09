import { useState } from "react";
import { motion } from "framer-motion";
import { FolderOpen, ExternalLink, Github, ChevronRight } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";
import { CaseFileModal } from "../ui/CaseFileModal";
import { projects, type Project } from "@/data/projects";

export type { Project };

const stopBubble = (e: React.MouseEvent) => e.stopPropagation();

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCaseFile = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <SectionWrapper id="projects" title="Case Files // Systems" subtitle="// SELECTED SYSTEMS · ENGINEERED END-TO-END">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.08}>
            <motion.div
              onClick={() => openCaseFile(project)}
              className="cursor-pointer group h-full"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <GlassCard className="p-6 h-full relative overflow-hidden flex flex-col">
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--neon-cyan) / 0.1), transparent 60%)",
                    boxShadow: "inset 0 0 60px hsl(var(--neon-cyan) / 0.1)",
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-primary" />
                      <span className="font-mono text-xs text-primary uppercase tracking-wider">
                        Case #{String(project.id).padStart(3, "0")}
                      </span>
                    </div>
                    <span className="badge-chip-active text-[10px]">{project.status}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground mb-3">
                    Codename: {project.codename}
                  </p>
                  <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="badge-chip text-[10px]">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="badge-chip text-[10px]">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4 border-t border-border">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={stopBubble}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={stopBubble}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider bg-muted/60 text-foreground border border-border hover:border-primary/40 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Open Case File
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>

      <CaseFileModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionWrapper>
  );
};
