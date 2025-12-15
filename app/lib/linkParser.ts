export interface ParsedLink {
  url: string;
  displayName: string;
  platform: string;
}

/**
 * Parses a URL and determines the platform/service to provide appropriate display text
 */
export function parseLink(url: string): ParsedLink {
  // Ensure URL has protocol
  let fullUrl = url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    fullUrl = `https://${url}`;
  }

  try {
    const urlObj = new URL(fullUrl);
    const hostname = urlObj.hostname.toLowerCase();
    const path = urlObj.pathname.toLowerCase();

    // Google Scholar
    if (hostname.includes("scholar.google")) {
      return {
        url: fullUrl,
        displayName: "Google Scholar",
        platform: "scholar",
      };
    }

    // ORCID
    if (hostname.includes("orcid.org")) {
      return {
        url: fullUrl,
        displayName: "ORCID",
        platform: "orcid",
      };
    }

    // ResearchGate
    if (hostname.includes("researchgate.net")) {
      return {
        url: fullUrl,
        displayName: "ResearchGate",
        platform: "researchgate",
      };
    }

    // LinkedIn
    if (hostname.includes("linkedin.com")) {
      return {
        url: fullUrl,
        displayName: "LinkedIn",
        platform: "linkedin",
      };
    }

    // Twitter/X
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return {
        url: fullUrl,
        displayName: "Twitter",
        platform: "twitter",
      };
    }

    // GitHub
    if (hostname.includes("github.com")) {
      return {
        url: fullUrl,
        displayName: "GitHub",
        platform: "github",
      };
    }

    // Instagram
    if (hostname.includes("instagram.com")) {
      return {
        url: fullUrl,
        displayName: "Instagram",
        platform: "instagram",
      };
    }

    // Facebook
    if (hostname.includes("facebook.com")) {
      return {
        url: fullUrl,
        displayName: "Facebook",
        platform: "facebook",
      };
    }

    // PubMed
    if (hostname.includes("pubmed.ncbi.nlm.nih.gov") || hostname.includes("ncbi.nlm.nih.gov")) {
      return {
        url: fullUrl,
        displayName: "PubMed",
        platform: "pubmed",
      };
    }

    // Personal website / Other
    // If it's a generic domain, try to extract a readable name from the domain
    const domainParts = hostname.replace("www.", "").split(".");
    const baseDomain = domainParts.length > 1
      ? domainParts[domainParts.length - 2]
      : domainParts[0];

    // Capitalize first letter
    const displayName = baseDomain.charAt(0).toUpperCase() + baseDomain.slice(1);

    return {
      url: fullUrl,
      displayName: displayName || "Website",
      platform: "other",
    };
  } catch (error) {
    // If URL parsing fails, return generic link
    return {
      url: fullUrl,
      displayName: "Link",
      platform: "unknown",
    };
  }
}

/**
 * Parse multiple links at once
 */
export function parseLinks(urls: string[]): ParsedLink[] {
  return urls.map(parseLink);
}
