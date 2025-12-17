import type { Route } from "./+types/join-us";
import { Hero, Section } from "~/components";
import { getJobPositions } from "~/lib/contentful.server";

export async function loader({ context }: Route.LoaderArgs) {
  // Access env from context (Cloudflare) or process.env (dev mode)
  const env = (context as any)?.cloudflare?.env || {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  };

  const jobPositions = await getJobPositions(env);

  return {
    jobPositions,
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Join Us | Mercer Lab" },
    {
      name: "description",
      content:
        "Explore opportunities to join the Mercer Lab and contribute to groundbreaking prion research.",
    },
  ];
}

export default function JoinUs({ loaderData }: Route.ComponentProps) {
  const { jobPositions } = loaderData;

  return (
    <>
      <Hero
        size="medium"
        subtitle="Careers"
        title="Join Our Team"
        description="We're always looking for talented and motivated individuals to join our research team. Explore current opportunities and learn how to apply."
      />

      {/* Why Join Us */}
      <Section background="white" subtitle="Why Mercer Lab?" title="What We Offer">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Cutting-Edge Research",
              description:
                "Work on impactful research using state-of-the-art techniques and equipment.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              ),
            },
            {
              title: "Collaborative Environment",
              description:
                "Join a supportive team that values collaboration and open scientific discussion.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              ),
            },
            {
              title: "Career Development",
              description:
                "Access mentoring, professional development, and networking opportunities.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              ),
            },
            {
              title: "Great Location",
              description:
                "Our lab is located in a vibrant academic community with excellent resources.",
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 border border-gray-100"
            >
              <div className="w-12 h-12 bg-navy-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-navy-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-semibold text-navy-500 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Open Positions */}
      <Section
        background="gray"
        subtitle="Current Openings"
        title="Open Positions"
        description="Explore our current job openings and find the right opportunity for you."
      >
        {jobPositions.length > 0 ? (
          <div className="space-y-6">
            {jobPositions.map((position) => (
              <div
                key={position.sys.id}
                className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-gold-100 text-gold-700 rounded-full mb-2">
                      {position.fields.positionType}
                    </span>
                    <h3 className="text-xl font-semibold text-navy-500">
                      {position.fields.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{position.fields.description}</p>
                <div>
                  <h4 className="font-medium text-navy-500 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {position.fields.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center px-4 py-2 bg-navy-500 text-white font-medium rounded-lg hover:bg-navy-600 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="max-w-2xl mx-auto px-4">
              <h3 className="text-xl font-semibold text-navy-500 mb-3">
                No Current Openings
              </h3>
              <p className="text-gray-600 mb-6">
                We don't have any open positions at the moment, but we're always interested
                in hearing from talented researchers. Check back later for new opportunities,
                or feel free to reach out with a general inquiry.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-navy-500 text-white font-medium rounded-lg hover:bg-navy-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </Section>

      {/* How to Apply */}
      <Section background="white" subtitle="Application Process" title="How to Apply">
        <div className="max-w-3xl">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-navy-500 text-white rounded-full flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-navy-500 mb-1">
                  Review Open Positions
                </h3>
                <p className="text-gray-600">
                  Browse our current openings above and find a position that
                  matches your interests and qualifications.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-navy-500 text-white rounded-full flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-navy-500 mb-1">
                  Prepare Your Application
                </h3>
                <p className="text-gray-600">
                  Gather your CV/resume, cover letter, and any other required
                  materials. For postdoc positions, please include a research
                  statement and contact information for three references.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-navy-500 text-white rounded-full flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-navy-500 mb-1">
                  Submit Your Application
                </h3>
                <p className="text-gray-600">
                  Send your application materials to Dr. Robert CC Mercer at{" "}
                  <a
                    href="mailto:rmercer@midwestern.edu"
                    className="text-navy-500 hover:text-navy-600 underline"
                  >
                    rmercer@midwestern.edu
                  </a>
                  . Please include the position title in the subject line.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-navy-500 text-white rounded-full flex items-center justify-center font-semibold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-navy-500 mb-1">
                  Interview Process
                </h3>
                <p className="text-gray-600">
                  Selected candidates will be contacted for interviews. The
                  process typically includes virtual interviews followed by an
                  on-site visit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have Questions?
          </h2>
          <p className="text-navy-100 mb-8">
            If you have any questions about our lab or the application process,
            don't hesitate to reach out. We're happy to discuss opportunities
            and answer any questions you may have.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </Section>
    </>
  );
}
