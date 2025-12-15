import { Link } from "react-router";

interface NewsCardProps {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  imageUrl?: string;
}

export function NewsCard({
  title,
  slug,
  date,
  excerpt,
  imageUrl,
}: NewsCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link to={`/news/${slug}`} className="group block">
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
        {imageUrl ? (
          <div className="aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gold-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
        )}
        <div className="p-5">
          <time className="text-sm text-gold-600 font-medium">
            {formattedDate}
          </time>
          <h3 className="mt-2 text-lg font-semibold text-navy-500 group-hover:text-navy-600 transition-colors line-clamp-2">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-navy-500 group-hover:text-navy-600">
            Read more
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
