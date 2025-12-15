import { useState } from "react";
import type { Route } from "./+types/publications";
import { Hero, Section, PublicationCard } from "~/components";
import { getPublications } from "~/lib/contentful.server";

export async function loader({ context }: Route.LoaderArgs) {
  const env = (context as any)?.cloudflare?.env || {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  };

  const publications = await getPublications(env);

  // Debug: Log the first publication to see the data structure
  if (publications.length > 0) {
    console.log("First publication:", JSON.stringify(publications[0], null, 2));
    console.log("Photo field:", publications[0].fields.photo);
  }

  // Sort by year, newest first
  const sortedPublications = [...publications].sort(
    (a, b) => b.fields.year - a.fields.year
  );

  return { publications: sortedPublications };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Publications | Mercer Lab" },
    {
      name: "description",
      content:
        "Browse our peer-reviewed publications on prion biology and neurodegenerative diseases.",
    },
  ];
}

export default function Publications({ loaderData }: Route.ComponentProps) {
  const { publications } = loaderData;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const years = [...new Set(publications.map((p) => p.fields.year))].sort(
    (a, b) => b - a
  );

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      searchQuery === "" ||
      pub.fields.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.fields.authors.some((a) =>
        a.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      pub.fields.journal.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesYear = selectedYear === null || pub.fields.year === selectedYear;

    return matchesSearch && matchesYear;
  });

  return (
    <>
      <Hero
        size="medium"
        subtitle="Our Science"
        title="Publications"
        description="Explore our peer-reviewed research contributions to the field of prion biology and neurodegenerative diseases."
      />

      <Section background="white">
        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Search publications
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                id="search"
                placeholder="Search by title, author, or journal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="year" className="sr-only">
              Filter by year
            </label>
            <select
              id="year"
              value={selectedYear ?? ""}
              onChange={(e) =>
                setSelectedYear(e.target.value ? Number(e.target.value) : null)
              }
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-navy-500 bg-white"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          Showing {filteredPublications.length} of {publications.length}{" "}
          publications
        </p>

        {/* Publications list */}
        <div className="space-y-4">
          {filteredPublications.map((pub) => (
            <PublicationCard
              key={pub.sys.id}
              title={pub.fields.title}
              authors={pub.fields.authors}
              journal={pub.fields.journal}
              year={pub.fields.year}
              doi={pub.fields.doi}
              abstract={pub.fields.abstract}
              imageUrl={pub.fields.featuredImage?.fields?.file?.url}
              photos={pub.fields.photo?.map((photo) => ({
                url: photo.fields?.file?.url || '',
                title: photo.fields?.title,
              })).filter((photo) => photo.url)}
            />
          ))}
        </div>

        {filteredPublications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No publications found matching your criteria.
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
