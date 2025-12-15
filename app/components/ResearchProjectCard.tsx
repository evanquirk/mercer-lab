import { Link } from "react-router";

interface ResearchProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  status: "active" | "completed" | "upcoming";
  slug?: string;
}

export function ResearchProjectCard({
  title,
  description,
  imageUrl,
  status,
  slug,
}: ResearchProjectCardProps) {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-green-100 text-green-700",
    },
    completed: {
      label: "Completed",
      className: "bg-gray-100 text-gray-600",
    },
    upcoming: {
      label: "Upcoming",
      className: "bg-gold-100 text-gold-700",
    },
  };

  const content = (
    <article className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-navy-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[status].className}`}
          >
            {statusConfig[status].label}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-navy-500 mb-2 group-hover:text-navy-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
      </div>
    </article>
  );

  if (slug) {
    return <Link to={`/research/${slug}`}>{content}</Link>;
  }

  return content;
}
