import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Animation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="text-4xl font-mono font-bold text-primary dark-glow-text"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              NS<span className="text-muted-foreground">/</span>AI
            </motion.div>
            <motion.div
              className="absolute -inset-4 rounded-full"
              animate={{
                boxShadow: [
                  "0 0 20px hsl(var(--neon-cyan) / 0.3)",
                  "0 0 40px hsl(var(--neon-cyan) / 0.5)",
                  "0 0 20px hsl(var(--neon-cyan) / 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="font-mono text-sm text-muted-foreground mb-6 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Initializing Investigation Protocol
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-64 h-1 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Progress Percentage */}
        <motion.div
          className="mt-4 font-mono text-xs text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.min(Math.floor(progress), 100)}%
        </motion.div>

        {/* Decorative Lines */}
        <motion.div
          className="absolute top-10 left-10 font-mono text-xs text-muted-foreground/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>{">"} Loading module {i + 1}...</div>
          ))}
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10 font-mono text-xs text-muted-foreground/20 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div>SYSTEM: ONLINE</div>
          <div>STATUS: READY</div>
          <div>CLEARANCE: PUBLIC</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
