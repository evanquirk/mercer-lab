import type { Route } from "./+types/research";
import { Hero, Section, ResearchProjectCard } from "~/components";
import { getResearchProjects } from "~/lib/contentful.server";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export async function loader({ context }: Route.LoaderArgs) {
  const env = (context as any)?.cloudflare?.env || {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  };

  const researchProjects = await getResearchProjects(env);

  // Sort by order field
  const sortedProjects = [...researchProjects].sort(
    (a, b) => (a.fields.order || 999) - (b.fields.order || 999)
  );

  return { researchProjects: sortedProjects };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Research | Mercer Lab" },
    {
      name: "description",
      content:
        "Explore our research programs focused on understanding prion biology and developing novel therapeutic approaches.",
    },
  ];
}

export default function Research({ loaderData }: Route.ComponentProps) {
  const { researchProjects } = loaderData;
  const activeProjects = researchProjects.filter(
    (p) => p.fields.status === "active"
  );
  const completedProjects = researchProjects.filter(
    (p) => p.fields.status === "completed"
  );

  return (
    <>
      <Hero
        size="medium"
        subtitle="Our Science"
        title="Research Programs"
        description="Our research spans multiple interconnected areas, all focused on understanding and combating prion diseases. We employ cutting-edge techniques in molecular biology, structural biology, and computational biology."
      />

      <Section
        background="white"
        subtitle="Current Work"
        title="Active Research Projects"
        description="Our ongoing research initiatives address fundamental questions about prion biology and translate findings toward clinical applications."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((project) => (
            <ResearchProjectCard
              key={project.sys.id}
              title={project.fields.title}
              description={documentToPlainTextString(project.fields.description)}
              status={project.fields.status}
            />
          ))}
        </div>
      </Section>

      {completedProjects.length > 0 && (
        <Section
          background="gray"
          subtitle="Past Work"
          title="Completed Projects"
          description="Research programs that have concluded and contributed to our understanding of prion biology."
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <ResearchProjectCard
                key={project.sys.id}
                title={project.fields.title}
                description={documentToPlainTextString(project.fields.description)}
                status={project.fields.status}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Approach Section */}
      <Section background="white">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-500 mb-4">
              Our Approach
            </h2>
            <p className="text-gray-600 mb-4">
              We believe that understanding prion diseases requires an
              interdisciplinary approach. Our lab combines expertise in:
            </p>
            <ul className="space-y-3">
              {[
                "Protein biochemistry and biophysics",
                "Cell biology and neuroscience",
                "Structural biology (cryo-EM, X-ray crystallography)",
                "Computational biology and molecular dynamics",
                "Animal models of prion disease",
                "Translational medicine",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-gold-500 rounded-full flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-navy-500 rounded-xl p-8 text-white">
            <h3 className="text-xl font-semibold mb-4">Funding & Support</h3>
            <p className="text-navy-100 mb-6">
              Our research is generously supported by grants from:
            </p>
            <ul className="space-y-2 text-navy-100">
              <li>• National Institutes of Health (NIH)</li>
              <li>• National Science Foundation (NSF)</li>
              <li>• Creutzfeldt-Jakob Disease Foundation</li>
              <li>• University Research Funds</li>
            </ul>
          </div>
        </div>
      </Section>
    </>
  );
}
