import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { Section } from "~/components";
import { getNewsPostBySlug } from "~/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export function meta() {
  return [{ title: "News | Mercer Lab" }];
}

export default function NewsPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null)

;

  useEffect(() => {
    if (!slug) return;

    const env = {
      CONTENTFUL_SPACE_ID: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    };

    getNewsPostBySlug(env, slug).then((fetchedPost) => {
      setPost(fetchedPost);
    });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const formattedDate = new Date(post.fields.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Rich text rendering options
  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
        <p className="text-gray-700 mb-4">{children}</p>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: any) => (
        <h2 className="text-xl font-bold text-navy-500 mt-8 mb-4">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node: any, children: any) => (
        <h3 className="text-lg font-semibold text-navy-500 mt-6 mb-3">{children}</h3>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: any) => (
        <ul className="space-y-2 my-4 list-disc list-inside">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: any) => (
        <ol className="space-y-2 my-4 list-decimal list-inside">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: any) => (
        <li className="text-gray-700">{children}</li>
      ),
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a
          href={node.data.uri}
          className="text-navy-500 hover:text-navy-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <article>
      {/* Header */}
      <div className="bg-navy-500 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-navy-200 hover:text-white mb-6 text-sm"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to News
          </Link>
          <time className="text-gold-400 font-medium">{formattedDate}</time>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            {post.fields.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <Section background="white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-navy max-w-none">
            {documentToReactComponents(post.fields.body, renderOptions)}
          </div>
        </div>
      </Section>
    </article>
  );
}
