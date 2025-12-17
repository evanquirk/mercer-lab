import type { Asset, Entry, EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

// Asset helper type
export type ContentfulAsset = Asset<undefined, string>;

// Rich Text document type (from Contentful)
export type RichTextDocument = Document;

// Site Settings (singleton - for global contact info, social links, etc.)
export interface SiteSettingsFields {
  labName: string;
  email: string;
  phone?: string;
  address: string;
  twitterUrl?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  googleScholarUrl?: string;
  googleMapsEmbedUrl?: string;
}

export interface SiteSettingsSkeleton extends EntrySkeletonType {
  contentTypeId: "siteSettings";
  fields: SiteSettingsFields;
}

export type SiteSettings = Entry<SiteSettingsSkeleton, undefined, string>;

// Lab Member
export interface LabMemberFields {
  name: string;
  role: string;
  bio?: RichTextDocument; // Rich Text for formatted bios
  photo?: ContentfulAsset; // Recommended: 400x400 to 2000x2000px, square aspect ratio
  email?: string;
  links?: string[];
  isAlumni: boolean;
  order?: number;
}

export interface LabMemberSkeleton extends EntrySkeletonType {
  contentTypeId: "labMember";
  fields: LabMemberFields;
}

export type LabMember = Entry<LabMemberSkeleton, undefined, string>;

// Publication
export interface PublicationFields {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  url?: string; // External link to publication
  abstract?: string; // Plain text is fine for abstracts
  pdf?: ContentfulAsset;
  featuredImage?: ContentfulAsset; // Optional image for the publication
  keywords?: string[]; // Keywords for matching images automatically
  photo?: ContentfulAsset[]; // Multiple photos for carousel (field ID is 'photo')
}

export interface PublicationSkeleton extends EntrySkeletonType {
  contentTypeId: "publication";
  fields: PublicationFields;
}

export type Publication = Entry<PublicationSkeleton, undefined, string>;

// Research Project
export interface ResearchProjectFields {
  title: string;
  description: RichTextDocument; // Rich Text for formatted descriptions
  image?: ContentfulAsset; // Recommended: 1200x675px (16:9 aspect ratio)
  status: "active" | "completed" | "upcoming";
  order?: number;
}

export interface ResearchProjectSkeleton extends EntrySkeletonType {
  contentTypeId: "researchProject";
  fields: ResearchProjectFields;
}

export type ResearchProject = Entry<ResearchProjectSkeleton, undefined, string>;

// News Post
export interface NewsPostFields {
  title: string;
  slug: string;
  date: string;
  body: RichTextDocument; // Rich Text for full article content
  featuredImage?: ContentfulAsset; // Recommended: 1200x675px (16:9 aspect ratio)
  excerpt?: string; // Plain text summary for cards/previews
}

export interface NewsPostSkeleton extends EntrySkeletonType {
  contentTypeId: "newsPost";
  fields: NewsPostFields;
}

export type NewsPost = Entry<NewsPostSkeleton, undefined, string>;

// Page (for custom pages like About, Facilities, etc.)
export interface PageFields {
  slug: string;
  title: string;
  heroText?: string;
  heroImage?: ContentfulAsset; // Recommended: 1920x600px or similar wide aspect ratio
  content?: RichTextDocument; // Rich Text for page body
}

export interface PageSkeleton extends EntrySkeletonType {
  contentTypeId: "page";
  fields: PageFields;
}

export type Page = Entry<PageSkeleton, undefined, string>;

// Layout Settings (singleton - controls navigation visibility)
export interface LayoutSettingsFields {
  home: boolean;
  research: boolean;
  team: boolean;
  publications: boolean;
  news: boolean;
  joinUs: boolean;
  contact: boolean;
}

export interface LayoutSettingsSkeleton extends EntrySkeletonType {
  contentTypeId: "layout";
  fields: LayoutSettingsFields;
}

export type LayoutSettings = Entry<LayoutSettingsSkeleton, undefined, string>;

// Application Step (for Join Us page)
export interface ApplicationStepFields {
  stepNumber: number;
  title: string;
  description: RichTextDocument; // Rich Text for formatted descriptions with links
  order?: number;
}

export interface ApplicationStepSkeleton extends EntrySkeletonType {
  contentTypeId: "applicationStep";
  fields: ApplicationStepFields;
}

export type ApplicationStep = Entry<ApplicationStepSkeleton, undefined, string>;

// Job Position (for Join Us page)
export interface JobPositionFields {
  title: string;
  positionType: string; // e.g., "Postdoc", "Graduate", "Staff", "Undergraduate", "Visiting Scholar"
  description: string;
  requirements: string[]; // Array of requirement strings
  isActive: boolean;
  order?: number;
}

export interface JobPositionSkeleton extends EntrySkeletonType {
  contentTypeId: "jobPosition";
  fields: JobPositionFields;
}

export type JobPosition = Entry<JobPositionSkeleton, undefined, string>;

// Helper type to extract fields from Entry
export type ExtractFields<T> = T extends Entry<infer S, undefined, string>
  ? S extends EntrySkeletonType
    ? S["fields"]
    : never
  : never;
