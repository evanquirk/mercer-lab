import { Link } from "react-router";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    to: string;
  };
  secondaryAction?: {
    label: string;
    to: string;
  };
  backgroundImage?: string;
  size?: "small" | "medium" | "large";
}

export function Hero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  size = "large",
}: HeroProps) {
  const sizeClasses = {
    small: "py-12 md:py-16",
    medium: "py-16 md:py-24",
    large: "py-20 md:py-32",
  };

  return (
    <section
      className={`relative bg-navy-500 text-white ${sizeClasses[size]}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 51, 102, 0.85), rgba(0, 51, 102, 0.9)), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {subtitle && (
            <p className="text-gold-400 font-medium text-sm uppercase tracking-wider mb-3">
              {subtitle}
            </p>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-navy-100 leading-relaxed mb-8">
              {description}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap gap-4">
              {primaryAction && (
                <Link
                  to={primaryAction.to}
                  className="inline-flex items-center px-6 py-3 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
                >
                  {primaryAction.label}
                </Link>
              )}
              {secondaryAction && (
                <Link
                  to={secondaryAction.to}
                  className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-navy-500 transition-colors"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
