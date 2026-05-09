import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface InvestigationModeToggleProps {
  isActive: boolean;
  onToggle: () => void;
}

export const InvestigationModeToggle = ({ isActive, onToggle }: InvestigationModeToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg glass-card border border-border hover:border-primary/50 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
    >
      <motion.div
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isActive ? (
          <Eye className="w-4 h-4 text-primary" />
        ) : (
          <EyeOff className="w-4 h-4 text-muted-foreground" />
        )}
      </motion.div>
      <span className="font-mono text-xs uppercase tracking-wider">
        {isActive ? "Investigation" : "Normal"}
      </span>
      <motion.div
        className="w-2 h-2 rounded-full"
        animate={{
          backgroundColor: isActive ? "hsl(var(--neon-cyan))" : "hsl(var(--muted-foreground))",
          boxShadow: isActive ? "0 0 10px hsl(var(--neon-cyan))" : "none",
        }}
      />
    </motion.button>
  );
};
