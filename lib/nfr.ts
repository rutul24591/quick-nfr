// NFR Data Access Layer

import { NFR_METADATA } from "./constants/nfr-data";
import { getNFRContent, getNFRContentById } from "./constants/nfr-content";
import { CATEGORIES, getCategoryBySlug, CATEGORY_SLUGS, type CategoryInfo } from "./constants/categories";
import type { NFRMetadata, NFRContent, NFRCategory, NFRSection } from "@/types/nfr";

/**
 * Get all NFR metadata
 */
export function getAllNFRMetadata(): NFRMetadata[] {
  return NFR_METADATA;
}

// Alias for backward compatibility
export const getAllNFRs = getAllNFRMetadata;

/**
 * Get NFR by ID
 */
export function getNFRById(id: number): NFRContent | null {
  const metadata = NFR_METADATA.find((nfr) => nfr.id === id);
  if (!metadata) return null;

  // Try content by ID first (from generated file), then by slug, then default
  const content = getNFRContentById(id) || getNFRContent(metadata.slug) || getDefaultSections(metadata);

  return {
    ...metadata,
    content,
    rawContent: "",
  };
}

/**
 * Get NFR by slug
 */
export function getNFRBySlug(slug: string): NFRContent | null {
  const metadata = NFR_METADATA.find((nfr) => nfr.slug === slug);
  if (!metadata) return null;

  // Try content by ID first (from generated file), then by slug, then default
  const content = getNFRContentById(metadata.id) || getNFRContent(slug) || getDefaultSections(metadata);

  return {
    ...metadata,
    content,
    rawContent: "",
  };
}

/**
 * Generate default section content based on NFR metadata
 */
function getDefaultSections(metadata: NFRMetadata): NFRSection {
  return {
    overview: `${metadata.tldr}\n\nThis NFR covers essential aspects of ${metadata.title.toLowerCase()} in software development.`,
    problem: `Understanding ${metadata.title.toLowerCase()} is crucial for building robust applications. Common issues include:\n\n- Inadequate consideration during design phase\n- Lack of proper testing and validation\n- Missing best practices implementation`,
    solutions: `### Solution 1: Best Practices Implementation\n\nImplement industry best practices for ${metadata.title.toLowerCase()}.\n\n### Solution 2: Testing and Validation\n\nEstablish comprehensive testing strategies.`,
    examples: `Practical examples demonstrating ${metadata.title.toLowerCase()} implementation patterns.`,
    references: `### External Resources\n\n- Industry best practices documentation\n- Related standards and guidelines`,
  };
}

/**
 * Get NFR metadata by slug (without full content)
 */
export function getNFRMetadataBySlug(slug: string): NFRMetadata | null {
  return NFR_METADATA.find((nfr) => nfr.slug === slug) || null;
}

/**
 * Get NFRs by category
 */
export function getNFRsByCategory(category: NFRCategory): NFRMetadata[] {
  return NFR_METADATA.filter((nfr) => nfr.category === category);
}

/**
 * Get featured NFRs for homepage
 */
export function getFeaturedNFRs(count: number = 5): NFRMetadata[] {
  // Sort by importance (critical > high > medium) then by ID
  const sorted = [...NFR_METADATA].sort((a, b) => {
    const importanceOrder = { critical: 0, high: 1, medium: 2 };
    const importanceDiff =
      importanceOrder[a.importance] - importanceOrder[b.importance];
    if (importanceDiff !== 0) return importanceDiff;
    return a.id - b.id;
  });

  return sorted.slice(0, count);
}

/**
 * Get related NFRs for a given NFR
 */
export function getRelatedNFRs(id: number): NFRMetadata[] {
  const nfr = NFR_METADATA.find((n) => n.id === id);
  if (!nfr) return [];

  return nfr.relatedNFRs
    .map((relatedId) => NFR_METADATA.find((n) => n.id === relatedId))
    .filter((n): n is NFRMetadata => n !== undefined);
}

/**
 * Get all categories with NFR counts
 */
export function getCategoriesWithCounts(): (CategoryInfo & { actualCount: number })[] {
  return CATEGORY_SLUGS.map((slug) => {
    const category = CATEGORIES[slug];
    const nfrsInCategory = NFR_METADATA.filter((nfr) => nfr.category === slug);
    return {
      ...category,
      actualCount: nfrsInCategory.length,
    };
  });
}

/**
 * Get category by slug with NFRs
 */
export function getCategoryWithNFRs(slug: string): {
  category: CategoryInfo;
  nfrs: NFRMetadata[];
} | null {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return null;
  }

  const nfrs = getNFRsByCategory(slug as NFRCategory);

  return { category, nfrs };
}

/**
 * Get all unique tags from NFRs
 */
export function getAllTags(): string[] {
  const tags = new Set<string>();

  NFR_METADATA.forEach((nfr) => {
    nfr.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Get NFRs by tag
 */
export function getNFRsByTag(tag: string): NFRMetadata[] {
  return NFR_METADATA.filter((nfr) => nfr.tags.includes(tag));
}

/**
 * Get NFRs by difficulty
 */
export function getNFRsByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): NFRMetadata[] {
  return NFR_METADATA.filter((nfr) => nfr.difficulty === difficulty);
}

/**
 * Get previous and next NFR for navigation
 */
export function getAdjacentNFRs(
  id: number,
  category?: NFRCategory
): { prev: NFRMetadata | null; next: NFRMetadata | null } {
  const nfrs = category ? getNFRsByCategory(category) : NFR_METADATA;
  const sortedNFRs = [...nfrs].sort((a, b) => a.id - b.id);

  const currentIndex = sortedNFRs.findIndex((nfr) => nfr.id === id);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? sortedNFRs[currentIndex - 1] : null,
    next: currentIndex < sortedNFRs.length - 1 ? sortedNFRs[currentIndex + 1] : null,
  };
}

/**
 * Generate static params for NFR pages
 */
export function generateNFRStaticParams(): { slug: string; id: string }[] {
  return NFR_METADATA.map((nfr) => ({
    slug: nfr.category,
    id: nfr.slug,
  }));
}

/**
 * Generate static params for category pages
 */
export function generateCategoryStaticParams(): { slug: string }[] {
  return CATEGORY_SLUGS.map((slug) => ({
    slug,
  }));
}

/**
 * Extract code blocks from markdown content
 */
export function extractCodeBlocks(
  content: string
): { language: string; code: string; editable: boolean }[] {
  const codeBlockRegex = /```(\w+)?(?::editable)?\n([\s\S]*?)```/g;
  const blocks: { language: string; code: string; editable: boolean }[] = [];

  let match;
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const language = match[1] || "text";
    const code = match[2].trim();
    const editable = fullMatch.includes(":editable");

    blocks.push({ language, code, editable });
  }

  return blocks;
}
