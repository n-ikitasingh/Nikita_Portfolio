import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { ScrollReveal } from "../ui/ScrollReveal";
import { GlassCard } from "../ui/GlassCard";

interface Certification {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

const certifications: Certification[] = [
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI · Coursera",
    year: "2024",
    url: "#",
  },
  {
    title: "Machine Learning",
    issuer: "Stanford / Coursera",
    year: "2023",
    url: "#",
  },
  {
    title: "TensorFlow Developer",
    issuer: "Google",
    year: "2024",
    url: "#",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
    url: "#",
  },
  {
    title: "NLP Specialization",
    issuer: "DeepLearning.AI",
    year: "2024",
    url: "#",
  },
  {
    title: "Generative AI with LLMs",
    issuer: "AWS · DeepLearning.AI",
    year: "2025",
    url: "#",
  },
];

export const CertificationsSection = () => {
  return (
    <SectionWrapper id="certifications" title="Credentials" subtitle="// CERTIFICATIONS">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, i) => (
          <ScrollReveal key={cert.title} delay={i * 0.06}>
            <motion.a
              href={cert.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="block h-full"
            >
              <GlassCard className="p-5 h-full" hover={false}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                        {cert.year}
                      </span>
                      {cert.url && (
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                    <h4 className="text-sm font-display font-bold text-foreground leading-snug mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.a>
          </ScrollReveal>
        ))}
      </div>
    </SectionWrapper>
  );
};
