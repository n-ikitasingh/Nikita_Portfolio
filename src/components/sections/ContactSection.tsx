import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Copy, Check, Download } from "lucide-react";
import { useState } from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";
import { useToast } from "@/hooks/use-toast";

const EMAIL = "nikitasingh.uks@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/its-nikita-singh/";
const GITHUB = "https://github.com/n-ikitasingh";
const RESUME_URL = "/Nikita_Resume.pdf";

const channels = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Linkedin, label: "LinkedIn", value: "/in/its-nikita-singh", href: LINKEDIN },
  { icon: Github, label: "GitHub", value: "@n-ikitasingh", href: GITHUB },
];

export const ContactSection = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    toast({ title: "Email copied", description: EMAIL });
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <SectionWrapper
      id="contact"
      title="Turning AI research into deployable intelligent systems."
      subtitle="// SIGNAL · OPEN TO ROLES"
      titleClassName="text-2xl md:text-3xl lg:text-4xl max-w-3xl mx-auto"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <GlassCard className="p-10 md:p-14" hover={false}>
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary mb-6">
                / CLOSING TRANSMISSION
              </p>
              <blockquote className="font-display text-xl md:text-2xl text-foreground/90 leading-relaxed italic mb-10">
                “Good systems don’t just predict — they explain, adapt, and earn trust.”
              </blockquote>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-neon"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy Email"}
                </button>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider border border-border bg-muted/40 text-foreground hover:border-primary/40 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Mail App
                </a>
                <a
                href={RESUME_URL}
                download="Nikita_Singh_AI_ML_Engineer_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-xs uppercase tracking-wider border border-primary/40 bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Resume
                  </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-12 pt-8 border-t border-border/60">
              {channels.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -2 }}
                    className="rounded-md border border-border bg-background/40 p-4 text-left hover:border-primary/40 transition-colors flex items-center gap-3"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</p>
                      <p className="text-sm text-foreground truncate">{c.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </SectionWrapper>
  );
};
