// SEO metadata helpers

import type { Metadata } from "next";
import type { NFRMetadata } from "@/types/nfr";
import type { Category } from "@/types/category";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://nfr-guide.dev";
const SITE_NAME = "NFR Guide";

/**
 * Generate metadata for the homepage
 */
export function generateHomeMetadata(): Metadata {
  return {
    title: "NFR Guide - Non-Functional Requirements Learning Platform",
    description:
      "Master 85 essential Non-Functional Requirements for building better software. Comprehensive learning platform covering frontend, backend, shared, and advanced NFRs with code examples.",
    openGraph: {
      title: "NFR Guide - Non-Functional Requirements Learning Platform",
      description:
        "Master 85 essential Non-Functional Requirements for building better software.",
      url: BASE_URL,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "NFR Guide - Non-Functional Requirements Learning Platform",
      description:
        "Master 85 essential Non-Functional Requirements for building better software.",
    },
    alternates: {
      canonical: BASE_URL,
    },
  };
}

/**
 * Generate metadata for category pages
 */
export function generateCategoryMetadata(category: Category, actualCount?: number): Metadata {
  const title = `${category.name} NFRs - ${SITE_NAME}`;
  const count = actualCount ?? category.nfrCount;
  const description = `${category.longDescription} Learn ${count} essential ${category.name.toLowerCase()} non-functional requirements.`;
  const url = `${BASE_URL}/categories/${category.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for NFR detail pages
 */
export function generateNFRMetadata(
  nfr: NFRMetadata,
  categoryName: string
): Metadata {
  const title = `${nfr.title} - ${SITE_NAME}`;
  const description = nfr.tldr;
  const url = `${BASE_URL}/categories/${nfr.category}/${nfr.slug}`;

  return {
    title,
    description,
    keywords: [
      nfr.title,
      ...nfr.tags,
      categoryName,
      "NFR",
      "non-functional requirements",
    ],
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      tags: nfr.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for categories index page
 */
export function generateCategoriesIndexMetadata(): Metadata {
  const title = `All Categories - ${SITE_NAME}`;
  const description =
    "Browse all NFR categories: Frontend, Backend, Shared, and Advanced. Find the non-functional requirements relevant to your software development needs.";
  const url = `${BASE_URL}/categories`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate JSON-LD structured data for NFR pages
 */
export function generateNFRJsonLd(nfr: NFRMetadata, categoryName: string): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: nfr.title,
    description: nfr.tldr,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/categories/${nfr.category}/${nfr.slug}`,
    },
    articleSection: categoryName,
    keywords: nfr.tags.join(", "),
    timeRequired: `PT${nfr.readTime}M`,
    educationalLevel: nfr.difficulty,
  };

  return JSON.stringify(jsonLd);
}

/**
 * Generate JSON-LD structured data for the website
 */
export function generateWebsiteJsonLd(): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Comprehensive learning platform for Non-Functional Requirements in software development.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return JSON.stringify(jsonLd);
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
): string {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return JSON.stringify(jsonLd);
}
