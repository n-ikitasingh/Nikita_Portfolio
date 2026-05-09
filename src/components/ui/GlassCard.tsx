import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const GlassCard = ({ children, className = "", hover = true, onClick }: GlassCardProps) => {
  return (
    <motion.div
      className={`glass-card dark-glow-border ${className}`}
      onClick={onClick}
      whileHover={hover ? { 
        y: -8, 
        rotateX: 2,
        rotateY: -2,
        transition: { duration: 0.3 }
      } : {}}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
    >
      {children}
      {hover && (
        <motion.div
          className="absolute inset-0 rounded-lg opacity-0 pointer-events-none"
          style={{
            background: "linear-gradient(135deg, hsl(var(--neon-cyan) / 0.1), transparent)",
            boxShadow: "var(--shadow-neon)",
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};
