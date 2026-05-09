import { motion } from "framer-motion";
import { Award, Trophy, FileText, Zap, Medal } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";

interface Commendation {
  icon: typeof Trophy;
  title: string;
  detail: string;
  tag: string;
}

const commendations: Commendation[] = [
  {
    icon: Award,
    title: "Best Paper Award · DAL-GAN-PS",
    detail: "iCONECCT 2025 — international peer-reviewed venue on emerging compute systems",
    tag: "AWARD",
  },
  {
    icon: FileText,
    title: "IEEE Publication",
    detail: "Legal Document Analysis & Summarization — domain-adapted NLP pipeline",
    tag: "PUBLISHED",
  },
  {
    icon: FileText,
    title: "IEEE Accepted (Camera Ready)",
    detail: "Visual Trajectory Fields — explainability research on deep vision models",
    tag: "ACCEPTED",
  },
  {
    icon: Trophy,
    title: "1st Rank — Snap Syntax",
    detail: "IIT Roorkee · Cognizance — algorithmic problem-solving competition",
    tag: "WINNER",
  },
  {
    icon: Medal,
    title: "2nd — International Coding Contest",
    detail: "ICC — global field, multi-round competitive programming",
    tag: "RUNNER-UP",
  },
  {
    icon: Medal,
    title: "Runner-up — Bit by Bit",
    detail: "Full-stack engineering challenge · IIT Roorkee Cognizance 2026",
    tag: "RUNNER-UP",
  },
  {
    icon: Medal,
    title: "3rd Rank — Spectral Bridge",
    detail: "IIT Roorkee — interdisciplinary signal-processing challenge",
    tag: "PODIUM",
  },
  {
    icon: Zap,
    title: "88+ Hackathons · Top 5% finishes",
    detail: "Sustained performance across IIT Roorkee, IIT Kanpur and national venues",
    tag: "TRACK RECORD",
  },
];

export const AchievementsSection = () => {
  return (
    <SectionWrapper id="achievements" title="Commendations" subtitle="// AWARDS · WINS · TRACK RECORD">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {commendations.map((c, index) => (
          <ScrollReveal key={c.title} delay={index * 0.08}>
            <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              <GlassCard className="p-5 h-full">
                <div className="flex items-start justify-between mb-3">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <c.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="badge-chip text-[9px]">{c.tag}</span>
                </div>
                <h3 className="text-sm font-display font-bold text-foreground mb-1 leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
              </GlassCard>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
};
