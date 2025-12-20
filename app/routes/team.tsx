import { useState, useEffect } from "react";
import { Hero, Section, TeamMemberCard } from "~/components";
import { getCurrentMembers, getAlumni } from "~/lib/contentful";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

export function meta() {
  return [
    { title: "Team | Mercer Lab" },
    {
      name: "description",
      content:
        "Meet the researchers and staff of the Mercer Lab, dedicated to advancing prion science.",
    },
  ];
}

export default function Team() {
  const [principalInvestigator, setPrincipalInvestigator] = useState<any>(null);
  const [currentMembers, setCurrentMembers] = useState<any[]>([]);
  const [alumni, setAlumni] = useState<any[]>([]);

  useEffect(() => {
    const env = {
      CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    };

    Promise.all([
      getCurrentMembers(env),
      getAlumni(env),
    ]).then(([members, alumniData]) => {
      const sortedMembers = [...members].sort(
        (a, b) => (a.fields.order || 999) - (b.fields.order || 999)
      );
      const featuredMember = sortedMembers.find((member) => member.fields.order === 1);
      const otherMembers = sortedMembers.filter((member) => member.fields.order !== 1);

      setPrincipalInvestigator(featuredMember);
      setCurrentMembers(otherMembers);
      setAlumni([...alumniData].sort((a, b) => (a.fields.order || 999) - (b.fields.order || 999)));
    });
  }, []);

  return (
    <>
      <Hero
        size="medium"
        subtitle="Our People"
        title="Meet the Team"
        description="Our diverse team of researchers brings together expertise in biochemistry, cell biology, structural biology, and computational science to tackle the challenges of prion diseases."
      />

      {/* Principal Investigator */}
      {principalInvestigator && (
        <Section background="white" subtitle="Lab Director" title="Principal Investigator">
          <TeamMemberCard
            variant="featured"
            name={principalInvestigator.fields.name}
            role={principalInvestigator.fields.role}
            bio={
              principalInvestigator.fields.bio
                ? documentToPlainTextString(principalInvestigator.fields.bio)
                : undefined
            }
            photoUrl={principalInvestigator.fields.photo?.fields?.file?.url}
            email={principalInvestigator.fields.email}
            links={principalInvestigator.fields.links}
          />
        </Section>
      )}

      {/* Current Members */}
      {currentMembers.length > 0 && (
        <Section
          background="gray"
          subtitle="Lab Members"
          title="Current Team"
          description="Our talented team of scientists, postdocs, and students working together to advance prion research."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentMembers.map((member) => (
              <TeamMemberCard
                key={member.sys.id}
                name={member.fields.name}
                role={member.fields.role}
                bio={
                  member.fields.bio
                    ? documentToPlainTextString(member.fields.bio)
                    : undefined
                }
                photoUrl={member.fields.photo?.fields?.file?.url}
                email={member.fields.email}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Alumni */}
      {alumni.length > 0 && (
        <Section
          background="white"
          subtitle="Where Are They Now?"
          title="Lab Alumni"
          description="Our former lab members have gone on to successful careers in academia and industry."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {alumni.map((alum) => (
              <div
                key={alum.sys.id}
                className="bg-gray-50 rounded-lg p-4 border border-gray-100"
              >
                <h3 className="font-medium text-navy-500">{alum.fields.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{alum.fields.role}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Join CTA */}
      <Section background="navy">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-navy-100 mb-8">
            We're always looking for motivated researchers who are passionate
            about understanding and combating prion diseases. Whether you're a
            prospective graduate student, postdoc, or visiting scientist, we'd
            love to hear from you.
          </p>
          <a
            href="/join-us"
            className="inline-flex items-center px-6 py-3 bg-gold-500 text-navy-900 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
          >
            View Open Positions
          </a>
        </div>
      </Section>
    </>
  );
}
