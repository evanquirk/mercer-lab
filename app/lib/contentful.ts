import { createClient, type EntryCollection } from "contentful";
import type {
  SiteSettingsSkeleton,
  LabMemberSkeleton,
  PublicationSkeleton,
  ResearchProjectSkeleton,
  NewsPostSkeleton,
  PageSkeleton,
  LayoutSettingsSkeleton,
  ApplicationStepSkeleton,
  JobPositionSkeleton,
  SiteSettings,
  LabMember,
  Publication,
  ResearchProject,
  NewsPost,
  Page,
  LayoutSettings,
  ApplicationStep,
  JobPosition,
} from "~/types/contentful";

export interface Env {
  CONTENTFUL_SPACE_ID: string;
  CONTENTFUL_ACCESS_TOKEN: string;
}

function getClient(env: Env) {
  return createClient({
    space: env.CONTENTFUL_SPACE_ID,
    accessToken: env.CONTENTFUL_ACCESS_TOKEN,
  });
}

// Type for Contentful query with dynamic fields
type ContentfulQuery = Record<string, unknown>;

// Lab Members
export async function getLabMembers(env: Env): Promise<LabMember[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "labMember",
  } as ContentfulQuery) as EntryCollection<LabMemberSkeleton, undefined, string>;
  return response.items;
}

export async function getCurrentMembers(env: Env): Promise<LabMember[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "labMember",
    "fields.isAlumni": false,
    include: 2, // Include linked assets (photos)
  } as ContentfulQuery) as EntryCollection<LabMemberSkeleton, undefined, string>;
  return response.items;
}

export async function getAlumni(env: Env): Promise<LabMember[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "labMember",
    "fields.isAlumni": true,
    include: 2, // Include linked assets (photos)
  } as ContentfulQuery) as EntryCollection<LabMemberSkeleton, undefined, string>;
  return response.items;
}

// Publications
export async function getPublications(env: Env): Promise<Publication[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "publication",
    order: ["-sys.createdAt"],
    include: 2, // Include linked assets (photos, PDFs, etc.)
  } as ContentfulQuery) as EntryCollection<PublicationSkeleton, undefined, string>;
  return response.items;
}

export async function getPublicationsByYear(
  env: Env,
  year: number
): Promise<Publication[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "publication",
    "fields.year": year,
  } as ContentfulQuery) as EntryCollection<PublicationSkeleton, undefined, string>;
  return response.items;
}

// Research Projects
export async function getResearchProjects(env: Env): Promise<ResearchProject[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "researchProject",
  } as ContentfulQuery) as EntryCollection<ResearchProjectSkeleton, undefined, string>;
  return response.items;
}

export async function getActiveProjects(env: Env): Promise<ResearchProject[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "researchProject",
    "fields.status": "active",
  } as ContentfulQuery) as EntryCollection<ResearchProjectSkeleton, undefined, string>;
  return response.items;
}

// News Posts
export async function getNewsPosts(env: Env): Promise<NewsPost[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "newsPost",
    order: ["-sys.createdAt"],
  } as ContentfulQuery) as EntryCollection<NewsPostSkeleton, undefined, string>;
  return response.items;
}

export async function getNewsPostBySlug(
  env: Env,
  slug: string
): Promise<NewsPost | undefined> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "newsPost",
    "fields.slug": slug,
    limit: 1,
  } as ContentfulQuery) as EntryCollection<NewsPostSkeleton, undefined, string>;
  return response.items[0];
}

export async function getRecentNews(
  env: Env,
  limit: number = 3
): Promise<NewsPost[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "newsPost",
    order: ["-sys.createdAt"],
    limit,
  } as ContentfulQuery) as EntryCollection<NewsPostSkeleton, undefined, string>;
  return response.items;
}

// Pages
export async function getPageBySlug(
  env: Env,
  slug: string
): Promise<Page | undefined> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "page",
    "fields.slug": slug,
    limit: 1,
  } as ContentfulQuery) as EntryCollection<PageSkeleton, undefined, string>;
  return response.items[0];
}

// Site Settings (singleton)
export async function getSiteSettings(env: Env): Promise<SiteSettings | undefined> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "siteSettings",
    limit: 1,
  } as ContentfulQuery) as EntryCollection<SiteSettingsSkeleton, undefined, string>;
  return response.items[0];
}

// Layout Settings (singleton - controls navigation)
export async function getLayoutSettings(env: Env): Promise<LayoutSettings | undefined> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "layout",
    limit: 1,
  } as ContentfulQuery) as EntryCollection<LayoutSettingsSkeleton, undefined, string>;
  return response.items[0];
}

// Application Steps (for Join Us page)
export async function getApplicationSteps(env: Env): Promise<ApplicationStep[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "applicationStep",
    order: ["fields.order"],
    include: 2, // Include any linked content
  } as ContentfulQuery) as EntryCollection<ApplicationStepSkeleton, undefined, string>;
  return response.items;
}

// Job Positions (for Join Us page)
export async function getJobPositions(env: Env): Promise<JobPosition[]> {
  const client = getClient(env);
  const response = await client.getEntries({
    content_type: "jobPosition",
    "fields.isActive": true,
    order: ["fields.order"],
  } as ContentfulQuery) as EntryCollection<JobPositionSkeleton, undefined, string>;
  return response.items;
}
