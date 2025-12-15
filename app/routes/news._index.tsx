import type { Route } from "./+types/news._index";
import { Hero, Section, NewsCard } from "~/components";
import { getNewsPosts } from "~/lib/contentful.server";

export async function loader({ context }: Route.LoaderArgs) {
  const env = (context as any)?.cloudflare?.env || {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
  };

  const newsPosts = await getNewsPosts(env);
  return { newsPosts };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "News | Mercer Lab" },
    {
      name: "description",
      content:
        "Stay up to date with the latest news, publications, and events from the Mercer Lab.",
    },
  ];
}

export default function NewsIndex({ loaderData }: Route.ComponentProps) {
  const { newsPosts } = loaderData;

  return (
    <>
      <Hero
        size="medium"
        subtitle="Latest Updates"
        title="News & Announcements"
        description="Stay informed about our latest research breakthroughs, publications, awards, and lab events."
      />

      <Section background="white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsPosts.map((post) => (
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
    </>
  );
}
