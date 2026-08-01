import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { parseLinks } from "~/lib/linkParser";

interface TeamMemberModalProps {
  name: string;
  role: string;
  /** Contentful rich text document for the full bio */
  bio?: any;
  photoUrl?: string;
  email?: string;
  links?: string[];
  onClose: () => void;
}

export function TeamMemberModal({
  name,
  role,
  bio,
  photoUrl,
  email,
  links,
  onClose,
}: TeamMemberModalProps) {
  const parsedLinks = links ? parseLinks(links) : [];
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-navy-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="md:flex">
          <div className="md:w-1/3 md:shrink-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-64 md:h-full object-cover md:rounded-l-xl rounded-t-xl md:rounded-tr-none"
              />
            ) : (
              <div className="w-full h-64 md:h-full bg-navy-100 flex items-center justify-center md:rounded-l-xl rounded-t-xl md:rounded-tr-none">
                <span className="text-4xl font-bold text-navy-300">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          <div className="md:w-2/3 p-6 md:p-8">
            <h3
              id={titleId}
              className="text-2xl font-bold text-navy-500 mb-1 pr-10"
            >
              {name}
            </h3>
            <p className="text-gold-600 font-medium mb-4">{role}</p>

            {bio && (
              <div className="prose prose-navy max-w-none text-gray-600 leading-relaxed mb-6">
                {documentToReactComponents(bio)}
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 text-sm text-navy-500 hover:text-navy-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {email}
                </a>
              )}
              {parsedLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-navy-500 hover:text-navy-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  {link.displayName}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
