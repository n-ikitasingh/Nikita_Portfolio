import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight, Bot, FolderOpen, Award, FileText, Briefcase, Mail, User, Brain, BadgeCheck } from "lucide-react";

interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  section: string;
  icon: typeof Search;
  keywords: string;
}

const items: PaletteItem[] = [
  { id: "about", label: "Dossier", hint: "About Nikita", section: "about", icon: User, keywords: "about bio profile aiml engineer" },
  { id: "skills", label: "Intel", hint: "Skills & competencies", section: "skills", icon: Brain, keywords: "skills python pytorch tensorflow nlp cv ml" },
  { id: "projects", label: "Case Files", hint: "Selected projects", section: "projects", icon: FolderOpen, keywords: "projects nexus lexis medseg vision mind" },
  { id: "publications", label: "Research", hint: "IEEE publications", section: "publications", icon: FileText, keywords: "publications papers ieee research scholar" },
  { id: "experience", label: "Field Operations", hint: "Internships & roles", section: "experience", icon: Briefcase, keywords: "experience internships sun pharma envirovision work" },
  { id: "achievements", label: "Commendations", hint: "Awards & wins", section: "achievements", icon: Award, keywords: "awards hackathons wins cognizance" },
  { id: "certifications", label: "Credentials", hint: "Certifications", section: "certifications", icon: BadgeCheck, keywords: "certifications deeplearning aws tensorflow coursera" },
  { id: "contact", label: "Contact", hint: "Get in touch", section: "contact", icon: Mail, keywords: "contact email hire reach out message" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette = ({ open, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q) ||
        i.keywords.includes(q) ||
        i.keywords.split(" ").some((k) => k.startsWith(q))
    );
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[active]) go(filtered[active].section);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-label="Quick navigator"
            className="relative w-full max-w-xl glass-card dark-glow-border overflow-hidden"
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Bot className="w-4 h-4 text-primary shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask the AI navigator… try 'projects', 'awards', 'NLP'"
                className="flex-1 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground text-foreground"
              />
              <kbd className="hidden sm:inline font-mono text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground font-mono">
                  No matches. Try "projects" or "research".
                </p>
              )}
              {filtered.map((item, idx) => {
                const Icon = item.icon;
                const isActive = idx === active;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.section)}
                    onMouseEnter={() => setActive(idx)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
                      isActive
                        ? "bg-primary/10 text-foreground"
                        : "hover:bg-muted/60 text-foreground/80"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${
                        isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-[11px] text-muted-foreground font-mono">{item.hint}</p>
                    </div>
                    {isActive && <ArrowRight className="w-4 h-4 text-primary" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                AI Navigator
              </p>
              <p className="text-[10px] font-mono text-muted-foreground">
                ↑↓ navigate · ↵ go
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
