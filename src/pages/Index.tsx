import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PublicationsSection } from "@/components/sections/PublicationsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CursorBackground } from "@/components/ui/CursorBackground";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { AIAssistant } from "@/components/ui/AIAssistant";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return true;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen"
        >
          {/* Layered ambient backgrounds */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <ParticleBackground isDark={isDark} />
          </div>
          <CursorBackground isDark={isDark} />

          {/* Overlays (dark mode only) */}
          {isDark && <div className="noise-overlay" />}
          {isDark && <div className="scanline-overlay" />}

          {/* Navigation */}
          <Navbar isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

          {/* Main Content */}
          <main className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <PublicationsSection />
            <ExperienceSection />
            <AchievementsSection />
            <CertificationsSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />

          {/* Back to Top */}
          <BackToTop />

          {/* AI Assistant */}
          <AIAssistant />
        </motion.div>
      )}
    </>
  );
};

export default Index;
