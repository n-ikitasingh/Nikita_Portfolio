import { motion } from "framer-motion";
import { Download, FolderOpen, Sparkles } from "lucide-react";
import { TypewriterText } from "../ui/TypewriterText";
import { NeonButton } from "../ui/NeonButton";
import { ScrollReveal } from "../ui/ScrollReveal";

export const HeroSection = () => {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 dark:border-primary/30 dark:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.15)] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              AI Systems Engineer · Open to ML Engineering Roles
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <TypewriterText
              text="Building deployable AI systems across NLP, explainability, agents, and intelligent workflows."
              delay={800}
              speed={30}
              className="text-foreground dark-glow-text"
            />
          </motion.h1>

          <ScrollReveal delay={2}>
            <p className="text-base md:text-lg text-muted-foreground mb-4 font-light max-w-2xl mx-auto leading-relaxed">
              Focused on scalable ML systems, interpretable AI, and production-oriented engineering — from inference pipelines and orchestration to evaluation and deployment.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2.2}>
            <p className="font-mono text-xs uppercase tracking-widest text-primary/80 mb-8">
              Nikita Singh · AI Systems Engineer · ML Engineer · NLP &amp; Explainable AI
            </p>
          </ScrollReveal>

          <ScrollReveal delay={2.4}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {["NLP Systems", "Explainable AI", "Agent Workflows", "PyTorch", "FastAPI", "Production ML"].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="badge-chip"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.5 + index * 0.08 }}
                  whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={2.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <NeonButton
                variant="primary"
                size="lg"
                onClick={scrollToProjects}
                icon={<FolderOpen className="w-5 h-5" />}
              >
                Explore Projects
              </NeonButton>
              <NeonButton
                variant="secondary"
                size="lg"
                href="/Nikita_Resume.pdf"
                icon={<Download className="w-5 h-5" />}
              >
                View Resume
              </NeonButton>
            </div>
          </ScrollReveal>

          <motion.div
            className="absolute -bottom-20 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-muted-foreground"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="font-mono text-xs uppercase tracking-wider">Scroll to Investigate</span>
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute top-20 left-10 font-mono text-xs text-muted-foreground/30 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div>LOCATION: INDIA</div>
        <div>STATUS: ACTIVE</div>
      </motion.div>

      <motion.div
        className="absolute top-20 right-10 font-mono text-xs text-muted-foreground/30 hidden lg:block text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div>SUBJECT: NIKITA SINGH</div>
        <div>FOCUS: AI SYSTEMS</div>
      </motion.div>
    </section>
  );
};
