import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NeonButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
  icon?: ReactNode;
}

export const NeonButton = ({ 
  children, 
  variant = "primary", 
  size = "md",
  onClick, 
  href,
  className = "",
  icon
}: NeonButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider transition-all duration-300 overflow-hidden rounded-lg";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:shadow-neon-intense dark:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.3)] dark:hover:shadow-[0_0_40px_hsl(var(--neon-cyan)/0.5),0_0_80px_hsl(var(--neon-cyan)/0.2)]",
    secondary: "border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-neon dark:shadow-[0_0_10px_hsl(var(--neon-cyan)/0.1)] dark:hover:shadow-[0_0_25px_hsl(var(--neon-cyan)/0.3)]",
    ghost: "text-muted-foreground hover:text-primary hover:bg-primary/5",
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </Component>
  );
};
