// Content parsing and loading utilities

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { NFRMetadata, NFRContent, NFRCategory } from "@/types/nfr";

const CONTENT_DIR = path.join(process.cwd(), "content/nfr");

// Cache for parsed content
const contentCache = new Map<string, NFRContent>();

/**
 * Get all NFR markdown files from the content directory
 */
export function getNFRFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .sort();
}

/**
 * Parse a single NFR markdown file
 */
export function parseNFRFile(filename: string): NFRContent | null {
  const filePath = path.join(CONTENT_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Check cache first
  if (contentCache.has(filename)) {
    return contentCache.get(filename)!;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  // Parse sections from markdown content
  const sections = parseMarkdownSections(content);

  const nfrContent: NFRContent = {
    id: data.id,
    title: data.title,
    slug: data.slug,
    category: data.category as NFRCategory,
    difficulty: data.difficulty,
    tags: data.tags || [],
    relatedNFRs: data.relatedNFRs || [],
    readTime: data.readTime || 5,
    importance: data.importance || "medium",
    tldr: data.tldr || "",
    content: sections,
    rawContent: content,
  };

  // Cache the result
  contentCache.set(filename, nfrContent);

  return nfrContent;
}

/**
 * Parse markdown content into sections
 */
function parseMarkdownSections(content: string): NFRContent["content"] {
  const sections: NFRContent["content"] = {
    overview: "",
    problem: "",
    solutions: "",
    examples: "",
    references: "",
  };

  // Split by h2 headers
  const sectionRegex = /^## (.+)$/gm;
  const parts = content.split(sectionRegex);

  let currentSection = "";

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();

    if (!part) continue;

    // Check if this is a section header
    const sectionName = part.toLowerCase();
    if (
      sectionName === "overview" ||
      sectionName === "problem" ||
      sectionName === "solutions" ||
      sectionName === "examples" ||
      sectionName === "references"
    ) {
      currentSection = sectionName;
    } else if (currentSection) {
      sections[currentSection as keyof typeof sections] = part;
    }
  }

  return sections;
}

/**
 * Get all NFR metadata (without full content)
 */
export function getAllNFRMetadata(): NFRMetadata[] {
  const files = getNFRFiles();
  const metadata: NFRMetadata[] = [];

  for (const file of files) {
    const content = parseNFRFile(file);
    if (content) {
      const { rawContent, content: sections, ...meta } = content;
      metadata.push(meta);
    }
  }

  return metadata;
}

/**
 * Get NFR by ID
 */
export function getNFRById(id: number): NFRContent | null {
  const files = getNFRFiles();

  for (const file of files) {
    const content = parseNFRFile(file);
    if (content && content.id === id) {
      return content;
    }
  }

  return null;
}

/**
 * Get NFR by slug
 */
export function getNFRBySlug(slug: string): NFRContent | null {
  const files = getNFRFiles();

  for (const file of files) {
    const content = parseNFRFile(file);
    if (content && content.slug === slug) {
      return content;
    }
  }

  return null;
}

/**
 * Get NFRs by category
 */
export function getNFRsByCategory(category: NFRCategory): NFRMetadata[] {
  return getAllNFRMetadata().filter((nfr) => nfr.category === category);
}

/**
 * Get featured NFRs
 */
export function getFeaturedNFRs(count: number = 5): NFRMetadata[] {
  const allNFRs = getAllNFRMetadata();

  // Sort by importance (critical > high > medium) then by ID
  const sorted = allNFRs.sort((a, b) => {
    const importanceOrder = { critical: 0, high: 1, medium: 2 };
    const importanceDiff =
      importanceOrder[a.importance] - importanceOrder[b.importance];
    if (importanceDiff !== 0) return importanceDiff;
    return a.id - b.id;
  });

  return sorted.slice(0, count);
}

/**
 * Get related NFRs
 */
export function getRelatedNFRs(id: number): NFRMetadata[] {
  const nfr = getNFRById(id);
  if (!nfr) return [];

  return nfr.relatedNFRs
    .map((relatedId) => {
      const related = getNFRById(relatedId);
      if (!related) return null;
      const { rawContent, content, ...meta } = related;
      return meta;
    })
    .filter((n): n is NFRMetadata => n !== null);
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

/**
 * Clear content cache (useful for development)
 */
export function clearContentCache(): void {
  contentCache.clear();
}
