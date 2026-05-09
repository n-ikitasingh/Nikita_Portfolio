import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            className="font-mono text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © 2026 Nikita Singh. All rights reserved.
          </motion.div>
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="https://github.com/n-ikitasingh" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/its-nikita-singh/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:nikitasingh.uks@gmail.com" aria-label="Email" className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-muted transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
          <motion.div
            className="font-mono text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Designed with <span className="text-primary">precision</span> • Built with <span className="text-secondary">purpose</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
