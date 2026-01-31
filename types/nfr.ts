// NFR Type Definitions

export type NFRCategory = "frontend" | "backend" | "shared" | "advanced";

export type NFRDifficulty = "beginner" | "intermediate" | "advanced";

export interface NFRMetadata {
  id: number;
  title: string;
  slug: string;
  category: NFRCategory;
  difficulty: NFRDifficulty;
  tags: string[];
  relatedNFRs: number[];
  readTime: number; // in minutes
  importance: "critical" | "high" | "medium";
  tldr: string;
}

export interface NFRSection {
  overview: string;
  problem: string;
  solutions: string;
  examples: string;
  references: string;
}

export interface NFRContent extends NFRMetadata {
  content: NFRSection;
  rawContent: string;
}

export interface NFRCard {
  id: number;
  title: string;
  slug: string;
  category: NFRCategory;
  difficulty: NFRDifficulty;
  tldr: string;
  tags: string[];
}

export interface NFRSearchResult {
  id: number;
  title: string;
  slug: string;
  category: NFRCategory;
  matchedField: "title" | "content" | "tags";
  score: number;
}
