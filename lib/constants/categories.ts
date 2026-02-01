// Category Definitions

import type { NFRCategory } from "@/types/nfr";

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  nfrCount: number;
  featured: boolean;
  subcategories: string[];
}

export const CATEGORIES: Record<NFRCategory, CategoryInfo> = {
  frontend: {
    id: "frontend",
    name: "Frontend",
    slug: "frontend",
    description:
      "Client-side performance, accessibility, and user experience requirements",
    longDescription:
      "Non-functional requirements focused on the client-side experience, including page load performance, Core Web Vitals, accessibility compliance, responsive design, offline capabilities, and browser compatibility.",
    icon: "Monitor",
    color: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    borderColor: "border-blue-200 dark:border-blue-800",
    nfrCount: 30,
    featured: true,
    subcategories: [
      "Performance",
      "Accessibility",
      "SEO",
      "PWA",
      "Responsive Design",
      "Browser Support",
    ],
  },
  backend: {
    id: "backend",
    name: "Backend",
    slug: "backend",
    description:
      "Server-side scalability, reliability, and security requirements",
    longDescription:
      "Non-functional requirements for server-side systems, covering scalability strategies, database optimization, API design, caching, message queues, microservices architecture, and infrastructure reliability.",
    icon: "Server",
    color: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-100 dark:bg-green-900/40",
    borderColor: "border-green-200 dark:border-green-800",
    nfrCount: 30,
    featured: true,
    subcategories: [
      "Scalability",
      "Database",
      "API Design",
      "Caching",
      "Security",
      "Microservices",
    ],
  },
  shared: {
    id: "shared",
    name: "Shared",
    slug: "shared",
    description: "Cross-cutting concerns spanning frontend and backend systems",
    longDescription:
      "Non-functional requirements that apply across the entire stack, including end-to-end performance budgets, security practices, logging and monitoring, CI/CD pipelines, and development workflows.",
    icon: "Share2",
    color: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-100 dark:bg-purple-900/40",
    borderColor: "border-purple-200 dark:border-purple-800",
    nfrCount: 15,
    featured: true,
    subcategories: [
      "Testing",
      "CI/CD",
      "Monitoring",
      "Logging",
      "Documentation",
      "DevOps",
    ],
  },
  advanced: {
    id: "advanced",
    name: "Advanced",
    slug: "advanced",
    description: "Complex architectural patterns and optimization techniques",
    longDescription:
      "Advanced non-functional requirements covering complex topics like memory management, garbage collection tuning, distributed systems patterns, consensus algorithms, and performance profiling at scale.",
    icon: "Cpu",
    color: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-100 dark:bg-orange-900/40",
    borderColor: "border-orange-200 dark:border-orange-800",
    nfrCount: 10,
    featured: false,
    subcategories: [
      "Memory Management",
      "Distributed Systems",
      "Performance Tuning",
      "Architecture",
    ],
  },
};

export const getCategoryBySlug = (slug: string): CategoryInfo | undefined => {
  return CATEGORIES[slug as NFRCategory];
};

export const getCategoryById = (id: string): CategoryInfo | undefined => {
  return CATEGORIES[id as NFRCategory];
};

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as NFRCategory[];
