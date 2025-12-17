import type { Route } from "./+types/home";
import { Hero, Section, ResearchProjectCard, NewsCard } from "~/components";
import { getActiveProjects, getRecentNews } from "~/lib/contentful.server";

export async function loader({ context }: Route.LoaderArgs) {
  // Access env from context (Cloudflare) or process.env (dev mode)
  const env = (context as any)?.cloudflare?.env || {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  };

  const [featuredResearch, recentNews] = await Promise.all([
    getActiveProjects(env),
    getRecentNews(env, 3),
  ]);

  return {
    featuredResearch: featuredResearch.slice(0, 3),
    recentNews,
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mercer Lab | Prion Research Laboratory" },
    {
      name: "description",
      content:
        "The Mercer Lab is dedicated to advancing our understanding of prion biology and developing novel therapeutic approaches for prion diseases.",
    },
  ];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { featuredResearch, recentNews } = loaderData;

  return (
    <>
      <Hero
        subtitle="Prion Research Laboratory"
        title="Advancing the Frontier of Prion Science"
        description="Our lab is dedicated to understanding the molecular mechanisms of prion diseases and developing innovative therapeutic strategies to combat these devastating neurodegenerative conditions."
        primaryAction={{ label: "Our Research", to: "/research" }}
        secondaryAction={{ label: "Join Our Team", to: "/join-us" }}
      />

      {/* Mission Section */}
      <Section
        background="white"
        subtitle="Our Mission"
        title="Understanding Prion Biology"
        description="We combine cutting-edge molecular biology, structural biology, and computational approaches to unravel the mysteries of prion diseases. Our ultimate goal is to translate our findings into effective treatments for patients."
      >
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-navy-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-navy-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-navy-500 mb-2">Discovery</h3>
            <p className="text-gray-600 text-sm">
              Pushing the boundaries of our understanding of prion protein
              structure and function.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-navy-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-navy-500"
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
            <h3 className="font-semibold text-navy-500 mb-2">Innovation</h3>
            <p className="text-gray-600 text-sm">
              Developing novel experimental approaches and therapeutic
              strategies.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-navy-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-navy-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-navy-500 mb-2">Collaboration</h3>
            <p className="text-gray-600 text-sm">
              Working with researchers worldwide to accelerate scientific
              progress.
            </p>
          </div>
        </div>
      </Section>

      {/* Featured Research - Only show if there are projects */}
      {featuredResearch.length > 0 && (
        <Section
          background="gray"
          subtitle="Research Focus"
          title="Current Research Projects"
          description="Explore our ongoing research initiatives aimed at understanding and combating prion diseases."
        >
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResearch.map((project) => (
              <ResearchProjectCard
                key={project.sys.id}
                title={project.fields.title}
                description={project.fields.description}
                status={project.fields.status}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Recent News - Only show if there are news posts */}
      {recentNews.length > 0 && (
        <Section
          background="white"
          subtitle="Latest Updates"
          title="News & Announcements"
          description="Stay up to date with the latest developments from the Mercer Lab."
        >
          <div className="grid md:grid-cols-3 gap-6">
            {recentNews.map((post) => (
              <NewsCard
                key={post.sys.id}
                title={post.fields.title}
                slug={post.fields.slug}
                date={post.fields.date}
                excerpt={post.fields.excerpt}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Lab Info */}
      <Section background="navy">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <img
              src="/logo-sm.png"
              alt="Mercer Lab"
              className="h-32 md:h-40 w-auto mx-auto brightness-0 invert"
            />
          </div>
          <p className="text-navy-100 text-lg leading-relaxed">
            Advancing our understanding of prion biology through innovative
            research. Our lab focuses on the molecular mechanisms of prion
            diseases and the development of novel therapeutic approaches.
          </p>
        </div>
      </Section>
    </>
  );
}
