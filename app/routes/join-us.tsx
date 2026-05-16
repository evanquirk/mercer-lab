import { useState, useEffect } from "react";
import { Hero, Section } from "~/components";
import { getJobPositions } from "~/lib/contentful";

export function meta() {
  return [
    { title: "Join Us | Mercer Lab" },
    {
      name: "description",
      content:
        "Explore opportunities to join the Mercer Lab and contribute to groundbreaking prion research.",
    },
  ];
}

export default function JoinUs() {
  const [jobPositions, setJobPositions] = useState<any[]>([]);

  useEffect(() => {
    const env = {
      CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    };

    getJobPositions(env).then((positions) => {
      setJobPositions(positions);
    });
  }, []);

  return (
    <>
      <Hero
        size="medium"
        subtitle="Open Positions"
        title="Join Our Team"
        description="We're always looking for talented and motivated individuals to join our team. Interested students should contact Dr. Mercer directly via email (<a href='mailto:rmerce@midwestern.edu' class='underline hover:text-white'>rmerce@midwestern.edu</a>) including a CV and cover letter."
      />
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
