import { useState } from "react";

interface PublicationCardProps {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  abstract?: string;
  pdfUrl?: string;
  imageUrl?: string;
  photos?: Array<{ url: string; title?: string }>;
}

export function PublicationCard({
  title,
  authors,
  journal,
  year,
  doi,
  abstract,
  pdfUrl,
  imageUrl,
  photos,
}: PublicationCardProps) {
  const formattedAuthors = authors.join(", ");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Use photos array if available, otherwise fall back to single imageUrl
  const displayPhotos = photos && photos.length > 0
    ? photos
    : imageUrl
    ? [{ url: imageUrl, title }]
    : [];

  const hasPhotos = displayPhotos.length > 0;
  const hasMultiplePhotos = displayPhotos.length > 1;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % displayPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      prev === 0 ? displayPhotos.length - 1 : prev - 1
    );
  };

  return (
    <article className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-navy-200 transition-colors">
      <div className="md:flex md:min-h-[280px]">
        {/* Photo Section - Fixed width on desktop */}
        {hasPhotos && (
          <div className="relative md:w-80 md:flex-shrink-0 h-64 md:h-auto bg-gray-100">
            <img
              src={displayPhotos[currentPhotoIndex].url}
              alt={displayPhotos[currentPhotoIndex].title || title}
              className="w-full h-full object-cover"
            />

            {/* Carousel Controls */}
            {hasMultiplePhotos && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Previous photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  aria-label="Next photo"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Photo Indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {displayPhotos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhotoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentPhotoIndex
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-auto">
            <div className="flex-1">
              <h3 className="font-semibold text-navy-500 mb-2 leading-snug">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{formattedAuthors}</p>
              <p className="text-sm">
                <span className="text-gray-500 italic">{journal}</span>
                <span className="text-gray-400 mx-2">·</span>
                <span className="text-gold-600 font-medium">{year}</span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-navy-50 text-navy-600 rounded-full">
                {year}
              </span>
            </div>
          </div>

          {abstract && (
            <p className="mt-4 text-sm text-gray-600 line-clamp-3">{abstract}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3">
        {doi && (
          <a
            href={`https://doi.org/${doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-600 font-medium"
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
            DOI
          </a>
        )}
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy-600 font-medium"
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            PDF
          </a>
        )}
          </div>
        </div>
      </div>
    </article>
  );
}
