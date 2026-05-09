import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search } from "lucide-react";
import { CommandPalette } from "@/components/ui/CommandPalette";

const navItems = [
  { id: "about", label: "Dossier", full: "Dossier // Profile" },
  { id: "skills", label: "Intel", full: "Intel // Capabilities" },
  { id: "projects", label: "Case Files", full: "Case Files // Systems" },
  { id: "publications", label: "Investigations", full: "Investigations // Research" },
  { id: "experience", label: "Operations", full: "Operations // Experience" },
  { id: "achievements", label: "Awards", full: "Awards" },
  { id: "certifications", label: "Credentials", full: "Credentials" },
  { id: "contact", label: "Contact", full: "Contact" },
];

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar = ({ isDark, onToggleTheme }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "glass-card border-b border-border/50 dark:border-primary/10 dark:shadow-[0_0_30px_hsl(var(--neon-cyan)/0.08)]" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="font-mono text-sm uppercase tracking-[0.28em] text-primary dark-glow-text shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              NIKITA
            </motion.button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  title={item.full}
                  className={`relative px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] rounded-md transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10 dark:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.2)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Right cluster: search + theme + mobile menu */}
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                onClick={() => setPaletteOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="hidden sm:inline-flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-md bg-muted/60 border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open AI navigator"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Navigate</span>
                <kbd className="font-mono text-[9px] border border-border px-1 py-0.5 rounded bg-background/40">
                  ⌘K
                </kbd>
              </motion.button>

              <motion.button
                onClick={onToggleTheme}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "moon" : "sun"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>

              <motion.button
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label="Open menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-lg" />
            <motion.div
              className="relative flex flex-col items-center justify-center h-full gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-mono text-base uppercase tracking-widest ${
                    activeSection === item.id ? "text-primary" : "text-muted-foreground"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => setPaletteOpen(true), 150);
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary border border-primary/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Search className="w-3.5 h-3.5" />
                <span className="font-mono text-xs uppercase tracking-wider">AI Navigator</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
};
