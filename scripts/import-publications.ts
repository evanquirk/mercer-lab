/**
 * Import publications from ORCID to Contentful
 *
 * Usage:
 *   ORCID_ID=0000-0001-2345-6789 npm run import-publications
 *
 * Or set ORCID_ID in your .env file
 */

import contentfulManagement from "contentful-management";
import "dotenv/config";

const ORCID_ID = process.env.ORCID_ID;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const CONTENTFUL_ENVIRONMENT = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!ORCID_ID) {
  console.error("❌ Please set ORCID_ID environment variable");
  console.log("   Example: ORCID_ID=0000-0001-2345-6789 npm run import-publications");
  process.exit(1);
}

if (!CONTENTFUL_MANAGEMENT_TOKEN) {
  console.error("❌ Please set CONTENTFUL_MANAGEMENT_TOKEN environment variable");
  console.log("   You can get this from: https://app.contentful.com/account/profile/cma_tokens");
  process.exit(1);
}

interface OrcidWork {
  title?: {
    title?: {
      value: string;
    };
  };
  "journal-title"?: {
    value: string;
  };
  "publication-date"?: {
    year?: {
      value: string;
    };
  };
  "external-ids"?: {
    "external-id": Array<{
      "external-id-type": string;
      "external-id-value": string;
    }>;
  };
  contributors?: {
    contributor: Array<{
      "credit-name"?: {
        value: string;
      };
    }>;
  };
  "short-description"?: string;
}

async function fetchOrcidPublications(orcidId: string): Promise<OrcidWork[]> {
  console.log(`📚 Fetching publications for ORCID ${orcidId}...`);

  const response = await fetch(
    `https://pub.orcid.org/v3.0/${orcidId}/works`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`ORCID API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const works = data.group || [];

  console.log(`✅ Found ${works.length} publications`);

  // Fetch detailed info for each work
  const detailedWorks: OrcidWork[] = [];
  for (const work of works) {
    const putCode = work["work-summary"]?.[0]?.["put-code"];
    if (!putCode) continue;

    const detailResponse = await fetch(
      `https://pub.orcid.org/v3.0/${orcidId}/work/${putCode}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (detailResponse.ok) {
      const detail = await detailResponse.json();
      detailedWorks.push(detail);
    }

    // Rate limiting - be nice to ORCID API
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return detailedWorks;
}

function extractDOI(work: OrcidWork): string | undefined {
  const externalIds = work["external-ids"]?.["external-id"] || [];
  const doi = externalIds.find((id) => id["external-id-type"] === "doi");
  return doi?.["external-id-value"];
}

function extractAuthors(work: OrcidWork): string[] {
  const contributors = work.contributors?.contributor || [];
  return contributors
    .map((c) => c["credit-name"]?.value)
    .filter((name): name is string => !!name);
}

async function importToContentful(works: OrcidWork[]) {
  console.log("\n📝 Importing to Contentful...");

  const client = contentfulManagement.createClient({
    accessToken: CONTENTFUL_MANAGEMENT_TOKEN!,
  });

  const space = await client.getSpace(CONTENTFUL_SPACE_ID!);
  const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT);

  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const work of works) {
    const title = work.title?.title?.value;
    if (!title) {
      skipped++;
      continue;
    }

    const journal = work["journal-title"]?.value || "Unknown Journal";
    const year = parseInt(work["publication-date"]?.year?.value || "0");
    const doi = extractDOI(work);
    const authors = extractAuthors(work);
    const abstract = work["short-description"];

    try {
      // Check if publication already exists by DOI or title
      const existingEntries = await environment.getEntries({
        content_type: "publication",
        "fields.title[match]": title,
        limit: 1,
      });

      if (existingEntries.items.length > 0) {
        console.log(`⏭️  Skipping "${title}" (already exists)`);
        skipped++;
        continue;
      }

      // Create new publication entry
      const entry = await environment.createEntry("publication", {
        fields: {
          title: {
            "en-US": title,
          },
          authors: {
            "en-US": authors.length > 0 ? authors : ["Unknown Authors"],
          },
          journal: {
            "en-US": journal,
          },
          year: {
            "en-US": year || new Date().getFullYear(),
          },
          ...(doi && {
            doi: {
              "en-US": doi,
            },
          }),
          ...(doi && {
            url: {
              "en-US": `https://doi.org/${doi}`,
            },
          }),
          ...(abstract && {
            abstract: {
              "en-US": abstract,
            },
          }),
        },
      });

      // Publish the entry
      await entry.publish();

      console.log(`✅ Imported: "${title}" (${year})`);
      imported++;
    } catch (error) {
      console.error(`❌ Error importing "${title}":`, error);
      errors++;
    }

    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log(`\n📊 Import Summary:`);
  console.log(`   ✅ Imported: ${imported}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log(`   ❌ Errors: ${errors}`);
}

async function main() {
  try {
    const works = await fetchOrcidPublications(ORCID_ID!);
    await importToContentful(works);
    console.log("\n🎉 Import complete!");
  } catch (error) {
    console.error("❌ Import failed:", error);
    process.exit(1);
  }
}

main();
