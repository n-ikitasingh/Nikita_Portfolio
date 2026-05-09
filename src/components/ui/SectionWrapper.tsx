import { ReactNode } from "react";
import { ScrollReveal } from "./ScrollReveal";

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
}

export const SectionWrapper = ({ id, title, subtitle, children, className = "", titleClassName = "" }: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-20 md:py-32 relative ${className}`}>
      <div className="container mx-auto px-6">
        {(title || subtitle) && (
          <ScrollReveal className="mb-12 md:mb-16">
            {subtitle && (
              <p className="section-title">{subtitle}</p>
            )}
            {title && (
              <h2 className={`section-heading text-gradient dark-glow-text ${titleClassName}`}>{title}</h2>
            )}
          </ScrollReveal>
        )}
        {children}
      </div>
    </section>
  );
};
