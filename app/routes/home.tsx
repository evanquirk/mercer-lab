import { useState, useEffect } from "react";
import { Hero, Section, ResearchProjectCard, NewsCard } from "~/components";
import { getActiveProjects, getRecentNews } from "~/lib/contentful";

export function meta() {
  return [
    { title: "Mercer Lab | Prion Research Laboratory" },
    {
      name: "description",
      content:
        "The Mercer Lab is dedicated to advancing our understanding of prion biology and developing novel therapeutic approaches for prion diseases.",
    },
  ];
}

export default function Home() {
  const [featuredResearch, setFeaturedResearch] = useState<any[]>([]);
  const [recentNews, setRecentNews] = useState<any[]>([]);

  useEffect(() => {
    const env = {
      CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    };

    Promise.all([
      getActiveProjects(env),
      getRecentNews(env, 3),
    ]).then(([projects, news]) => {
      setFeaturedResearch(projects.slice(0, 3));
      setRecentNews(news);
    });
  }, []);

  return (
    <>
      <Hero
        subtitle="Our Mission"
        title="Understanding Prion Biology"
        description="Prion diseases are a group of rare and invariably fatal protein misfolding neurodegenerative diseases that include Creutzfeldt-Jakob disease (CJD) of humans, bovine spongiform encephalopathy (BSE or “mad cow disease”) of cattle, and chronic wasting disease (CWD) of deer, elk, and moose. Although they affect different species, these diseases share a key molecular event: the conversion of the normally soluble prion protein (PrP<sup>C</sup>) into a misfolded, disease-causing conformation (PrP<sup>Sc</sup>) that is rich in β-sheet structure, insoluble, and resistant to proteolytic degradation. Our laboratory is interested in the molecular and cellular underpinnings of this spread, and how similar “prion-like” mechanisms are at play in more common diseases like Alzheimer’s, Parkinson’s, and frontotemporal dementia. Our work has been supported by the National Institutes of Health, the United States Department of Defense, the United States Department of Agriculture, and the Creutzfeldt-Jakob Disease Foundation."
      />


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
      <Section background="gray">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <img
              src="/logo-sm.png"
              alt="Mercer Lab"
              className="h-32 md:h-40 w-auto mx-auto"
            />
          </div>
          <p className="text-navy-500 text-lg leading-relaxed">
            Advancing our understanding of prion biology through innovative
            research. Our lab focuses on the molecular mechanisms of prion
            diseases and the development of novel therapeutic approaches.
          </p>
        </div>
      </Section>
    </>
  );
}
