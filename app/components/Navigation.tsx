import { useState } from "react";
import { Link, NavLink } from "react-router";

interface NavigationSettings {
  home?: boolean;
  research?: boolean;
  team?: boolean;
  publications?: boolean;
  news?: boolean;
  joinUs?: boolean;
  contact?: boolean;
}

interface NavigationProps {
  navigation?: NavigationSettings;
}

const allNavLinks = [
  { to: "/", label: "Home", key: "home" as const },
  { to: "/research", label: "Research", key: "research" as const },
  { to: "/team", label: "Team", key: "team" as const },
  { to: "/publications", label: "Publications", key: "publications" as const },
  { to: "/news", label: "News", key: "news" as const },
  { to: "/join-us", label: "Join Us", key: "joinUs" as const },
  { to: "/contact", label: "Contact", key: "contact" as const },
];

export function Navigation({ navigation }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Filter links based on navigation settings
  const navLinks = allNavLinks.filter(
    (link) => navigation?.[link.key] !== false
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] relative">
      {/* Gold gradient bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 md:h-28">
          {/* Logo */}
          <Link to="/" className="py-1">
            {/* Square logo for mobile */}
            <img
              src="/500.png"
              alt="Mercer Lab"
              className="h-[88px] w-auto md:hidden"
              style={{ imageRendering: 'auto', WebkitFontSmoothing: 'antialiased' }}
            />
            {/* Full logo for desktop */}
            <img
              src="/logo-sm.png"
              alt="Mercer Lab"
              className="hidden md:block h-[104px] w-auto"
              style={{ imageRendering: 'auto', WebkitFontSmoothing: 'antialiased' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-navy-500 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-navy-500"
                      : "text-gray-600 hover:text-navy-500 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-0.5 hover:after:bg-gold-500"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-navy-500 hover:bg-gray-50"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gold-200">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium transition-colors border-l-2 ${
                      isActive
                        ? "text-navy-500 border-navy-500"
                        : "text-gray-600 border-transparent hover:text-navy-500 hover:border-gold-500"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
