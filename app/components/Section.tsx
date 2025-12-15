import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  background?: "white" | "gray" | "navy";
  className?: string;
}

export function Section({
  children,
  title,
  subtitle,
  description,
  background = "white",
  className = "",
}: SectionProps) {
  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    navy: "bg-navy-500 text-white",
  };

  const titleClasses = {
    white: "text-navy-500",
    gray: "text-navy-500",
    navy: "text-white",
  };

  const subtitleClasses = {
    white: "text-gold-600",
    gray: "text-gold-600",
    navy: "text-gold-400",
  };

  const descriptionClasses = {
    white: "text-gray-600",
    gray: "text-gray-600",
    navy: "text-navy-100",
  };

  return (
    <section className={`py-16 md:py-24 ${backgroundClasses[background]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || description) && (
          <div className="max-w-3xl mb-12">
            {subtitle && (
              <p
                className={`text-sm font-semibold uppercase tracking-wider mb-2 ${subtitleClasses[background]}`}
              >
                {subtitle}
              </p>
            )}
            {title && (
              <h2
                className={`text-2xl md:text-3xl font-bold mb-4 ${titleClasses[background]}`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={`text-lg leading-relaxed ${descriptionClasses[background]}`}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
