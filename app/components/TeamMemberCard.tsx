import { parseLinks } from "~/lib/linkParser";

interface TeamMemberCardProps {
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  email?: string;
  links?: string[];
  variant?: "default" | "featured";
}

export function TeamMemberCard({
  name,
  role,
  bio,
  photoUrl,
  email,
  links,
  variant = "default",
}: TeamMemberCardProps) {
  const parsedLinks = links ? parseLinks(links) : [];

  if (variant === "featured") {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-64 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-full bg-navy-100 flex items-center justify-center">
                <span className="text-4xl font-bold text-navy-300">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="md:w-2/3 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-navy-500 mb-1">{name}</h3>
            <p className="text-gold-600 font-medium mb-4">{role}</p>
            {bio && (
              <p className="text-gray-600 leading-relaxed mb-4">{bio}</p>
            )}
            <div className="flex flex-wrap gap-3">
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
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-navy-100 flex items-center justify-center">
          <span className="text-3xl font-bold text-navy-300">
            {name.charAt(0)}
          </span>
        </div>
      )}
      <div className="p-5">
        <h3 className="font-semibold text-navy-500 mb-1">{name}</h3>
        <p className="text-sm text-gold-600 mb-3">{role}</p>
        {bio && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-3">{bio}</p>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="text-sm text-navy-500 hover:text-navy-600"
          >
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
