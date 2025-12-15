# Mercer Lab Website

A professional academic research lab website built with React Router v7 (formerly Remix), Tailwind CSS, and Contentful CMS, deployed on Cloudflare Pages.

## Tech Stack

- **Framework**: React Router v7 with Vite
- **Styling**: Tailwind CSS v4
- **CMS**: Contentful
- **Deployment**: Cloudflare Pages
- **Language**: TypeScript

## Features

- Clean, professional academic lab aesthetic
- Navy blue (#003366) and gold (#C4A35A) color scheme
- Responsive, mobile-friendly design
- Server-side rendering
- Contentful CMS integration for dynamic content
- Searchable/filterable publications

## Pages

- **Home** - Lab mission, featured research, recent news
- **Research** - Research projects grid
- **Team** - Principal Investigator, current members, alumni
- **Publications** - Searchable publication list
- **News** - Blog-style posts with detail pages
- **Join Us** - Open positions and application info
- **Contact** - Location, map, contact form

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Contentful account (for CMS)
- Cloudflare account (for deployment)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.dev.vars` file for local development:

```
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Contentful Setup

Create the following content models in Contentful:

### Field Type Reference

**Long Text vs Rich Text:**
- **Long Text**: Plain text field, good for simple unformatted content like abstracts or excerpts
- **Rich Text**: Structured JSON with formatting support (bold, italic, links, headings, lists, embedded assets). Use for content that needs formatting like bios, descriptions, and article bodies

**Media Size Recommendations:**
- **Profile photos** (labMember.photo): 400x400 to 2000x2000px, square aspect ratio (1:1)
- **Featured images** (newsPost.featuredImage, researchProject.image): 1200x675px, landscape aspect ratio (16:9)
- **PDFs** (publication.pdf): No specific size limit, keep reasonable for web delivery

---

### siteSettings (Singleton)
Global site configuration for contact information and social links. Create only ONE entry.

- `labName` (Short text) - Required
- `email` (Short text) - Required
- `phone` (Short text)
- `address` (Long text) - Required
- `twitterUrl` (Short text)
- `githubUrl` (Short text)
- `linkedInUrl` (Short text)
- `googleScholarUrl` (Short text)
- `googleMapsEmbedUrl` (Short text) - Google Maps embed URL for the location map

### labMember
- `name` (Short text) - Required
- `role` (Short text) - Required
- `bio` (Rich Text) - Formatted biography with links, lists, etc.
- `photo` (Media) - Square image, 400-2000px
- `email` (Short text)
- `links` (Short text, list) - Personal website, Google Scholar, etc.
- `isAlumni` (Boolean) - Required
- `order` (Integer) - For custom sorting

### publication
- `title` (Short text) - Required
- `authors` (Short text, list) - Required
- `journal` (Short text) - Required
- `year` (Integer) - Required
- `doi` (Short text)
- `url` (Short text) - External link to publication (journal page, PubMed, etc.)
- `abstract` (Long text) - Plain text summary
- `pdf` (Media)

### researchProject
- `title` (Short text) - Required
- `description` (Rich Text) - Required, formatted project description
- `image` (Media) - 16:9 aspect ratio recommended
- `status` (Short text) - "active", "completed", or "upcoming"
- `order` (Integer) - For custom sorting

### newsPost
- `title` (Short text) - Required
- `slug` (Short text) - Required, unique URL slug
- `date` (Date) - Required
- `body` (Rich Text) - Required, full article content with formatting
- `featuredImage` (Media) - 16:9 aspect ratio recommended
- `excerpt` (Short text) - Plain text summary for cards/previews

### page
Custom pages for additional content like "About", "Facilities", "Resources", etc.

- `slug` (Short text) - Required, URL path (e.g., "about", "facilities")
- `title` (Short text) - Required
- `heroText` (Short text) - Optional subtitle for the hero section
- `heroImage` (Media) - Hero background image, wide aspect ratio (e.g., 1920x600px)
- `content` (Rich Text) - Page body content with full formatting support

## Cloudflare Pages Deployment

### Initial Setup

1. Push your code to a Git repository (GitHub, GitLab, etc.)

2. In the Cloudflare Dashboard:
   - Go to Pages > Create a project
   - Connect to your Git repository
   - Configure build settings:
     - Build command: `npm run build`
     - Build output directory: `build/client`

3. Add environment variables in Cloudflare Pages settings:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`

### Manual Deployment

```bash
npm run deploy
```

This will build the project and deploy to Cloudflare Pages using Wrangler.

## Project Structure

```
app/
├── routes/
│   ├── home.tsx           # Home page
│   ├── research.tsx       # Research page
│   ├── team.tsx           # Team page
│   ├── publications.tsx   # Publications page
│   ├── news._index.tsx    # News listing
│   ├── news.$slug.tsx     # News detail
│   ├── join-us.tsx        # Join Us page
│   └── contact.tsx        # Contact page
├── components/
│   ├── Navigation.tsx     # Site header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── Section.tsx        # Content section wrapper
│   ├── TeamMemberCard.tsx # Team member display
│   ├── PublicationCard.tsx# Publication display
│   ├── ResearchProjectCard.tsx
│   └── NewsCard.tsx       # News post preview
├── lib/
│   └── contentful.server.ts  # Contentful API client
├── types/
│   └── contentful.ts      # TypeScript types for Contentful
├── root.tsx               # Root layout
└── app.css                # Global styles with Tailwind
```

## Customization

### Colors

The color scheme is defined in `app/app.css` using Tailwind CSS v4 theme variables:

- `--color-navy-*` - Primary brand color (navy blue)
- `--color-gold-*` - Accent color (gold/tan)

### Typography

The site uses Inter as the primary font, loaded from Google Fonts.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run typecheck` - Run TypeScript type checking
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Cloudflare Pages

## License

All rights reserved. This website is built for Mercer Lab.
