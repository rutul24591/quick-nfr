// Fuzzy search implementation

import type { NFRMetadata, NFRSearchResult } from "@/types/nfr";

/**
 * Simple fuzzy search scoring
 * Returns a score between 0 and 1, where 1 is an exact match
 */
export function fuzzyScore(text: string, query: string): number {
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  // Exact match
  if (normalizedText === normalizedQuery) return 1;

  // Contains exact query
  if (normalizedText.includes(normalizedQuery)) {
    // Higher score if query appears at the start
    if (normalizedText.startsWith(normalizedQuery)) {
      return 0.9;
    }
    // Score based on position
    const position = normalizedText.indexOf(normalizedQuery);
    return 0.8 - position * 0.01;
  }

  // Word match
  const words = normalizedText.split(/\s+/);
  const queryWords = normalizedQuery.split(/\s+/);
  let matchedWords = 0;

  for (const queryWord of queryWords) {
    if (words.some((word) => word.includes(queryWord))) {
      matchedWords++;
    }
  }

  if (matchedWords > 0) {
    return (matchedWords / queryWords.length) * 0.7;
  }

  // Character-level fuzzy match
  let score = 0;
  let lastIndex = -1;
  let consecutiveBonus = 0;

  for (const char of normalizedQuery) {
    const index = normalizedText.indexOf(char, lastIndex + 1);
    if (index === -1) continue;

    // Bonus for consecutive matches
    if (index === lastIndex + 1) {
      consecutiveBonus += 0.1;
    } else {
      consecutiveBonus = 0;
    }

    score += 1 + consecutiveBonus;
    lastIndex = index;
  }

  // Normalize score
  const maxScore = normalizedQuery.length * 2;
  return Math.min((score / maxScore) * 0.5, 0.5);
}

/**
 * Search NFRs by query
 */
export function searchNFRs(
  nfrs: NFRMetadata[],
  query: string,
  options: {
    limit?: number;
    minScore?: number;
  } = {}
): NFRSearchResult[] {
  const { limit = 10, minScore = 0.2 } = options;

  if (!query.trim()) return [];

  const results: NFRSearchResult[] = [];

  for (const nfr of nfrs) {
    // Score title matches (highest weight)
    const titleScore = fuzzyScore(nfr.title, query) * 1.5;

    // Score TL;DR matches
    const tldrScore = fuzzyScore(nfr.tldr, query) * 1.0;

    // Score tag matches
    const tagScores = nfr.tags.map((tag) => fuzzyScore(tag, query));
    const maxTagScore = Math.max(0, ...tagScores) * 0.8;

    // Determine best match field
    let matchedField: "title" | "content" | "tags" = "content";
    let bestScore = tldrScore;

    if (titleScore >= bestScore) {
      matchedField = "title";
      bestScore = titleScore;
    }

    if (maxTagScore >= bestScore) {
      matchedField = "tags";
      bestScore = maxTagScore;
    }

    // Combined score
    const score = Math.max(titleScore, tldrScore, maxTagScore);

    if (score >= minScore) {
      results.push({
        id: nfr.id,
        title: nfr.title,
        slug: nfr.slug,
        category: nfr.category,
        matchedField,
        score,
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

/**
 * Filter NFRs by category
 */
export function filterByCategory(
  nfrs: NFRMetadata[],
  category: string | null
): NFRMetadata[] {
  if (!category) return nfrs;
  return nfrs.filter((nfr) => nfr.category === category);
}

/**
 * Filter NFRs by difficulty
 */
export function filterByDifficulty(
  nfrs: NFRMetadata[],
  difficulty: string | null
): NFRMetadata[] {
  if (!difficulty) return nfrs;
  return nfrs.filter((nfr) => nfr.difficulty === difficulty);
}

/**
 * Filter NFRs by tags
 */
export function filterByTags(
  nfrs: NFRMetadata[],
  tags: string[]
): NFRMetadata[] {
  if (tags.length === 0) return nfrs;
  return nfrs.filter((nfr) => tags.some((tag) => nfr.tags.includes(tag)));
}

/**
 * Sort NFRs
 */
export type SortOption = "id" | "title" | "difficulty" | "readTime";

export function sortNFRs(
  nfrs: NFRMetadata[],
  sortBy: SortOption,
  order: "asc" | "desc" = "asc"
): NFRMetadata[] {
  const sorted = [...nfrs].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "id":
        comparison = a.id - b.id;
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "difficulty": {
        const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        break;
      }
      case "readTime":
        comparison = a.readTime - b.readTime;
        break;
    }

    return order === "asc" ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Combined filter and search
 */
export function filterAndSearchNFRs(
  nfrs: NFRMetadata[],
  options: {
    query?: string;
    category?: string | null;
    difficulty?: string | null;
    tags?: string[];
    sortBy?: SortOption;
    sortOrder?: "asc" | "desc";
  }
): NFRMetadata[] {
  let result = nfrs;

  // Apply category filter
  if (options.category) {
    result = filterByCategory(result, options.category);
  }

  // Apply difficulty filter
  if (options.difficulty) {
    result = filterByDifficulty(result, options.difficulty);
  }

  // Apply tags filter
  if (options.tags && options.tags.length > 0) {
    result = filterByTags(result, options.tags);
  }

  // Apply search
  if (options.query && options.query.trim()) {
    const searchResults = searchNFRs(result, options.query);
    const searchIds = new Set(searchResults.map((r) => r.id));
    result = result.filter((nfr) => searchIds.has(nfr.id));

    // Sort by search relevance
    const scoreMap = new Map(searchResults.map((r) => [r.id, r.score]));
    result.sort((a, b) => (scoreMap.get(b.id) || 0) - (scoreMap.get(a.id) || 0));
  } else if (options.sortBy) {
    // Apply sorting
    result = sortNFRs(result, options.sortBy, options.sortOrder);
  }

  return result;
}
