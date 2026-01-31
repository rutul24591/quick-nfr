import Link from "next/link";
import { getAllNFRMetadata } from "@/lib/nfr";
import { Hero } from "@/components/sections/Hero";
import { CategoryCards } from "@/components/sections/CategoryCards";
import { FeaturedCarousel } from "@/components/sections/FeaturedCarousel";
import { LearningPath } from "@/components/sections/LearningPath";
import type { NFRCategory } from "@/types/nfr";

export default function HomePage() {
  // Get all NFR metadata for featured items and counts
  const allNFRs = getAllNFRMetadata();

  // Calculate NFR counts per category
  const nfrCounts = allNFRs.reduce(
    (acc, nfr) => {
      acc[nfr.category] = (acc[nfr.category] || 0) + 1;
      return acc;
    },
    {
      frontend: 0,
      backend: 0,
      shared: 0,
      advanced: 0,
    } as Record<NFRCategory, number>
  );

  // Get featured NFRs (high importance ones)
  const featuredNFRs = allNFRs
    .filter((nfr) => nfr.importance === "critical" || nfr.importance === "high")
    .slice(0, 5);

  // Get learning path (beginner-friendly order)
  const learningPathNFRs = allNFRs
    .sort((a, b) => {
      const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    })
    .slice(0, 5);

  return (
    <main>
      {/* Hero Section */}
      <Hero />

      {/* Category Cards */}
      <CategoryCards nfrCounts={nfrCounts} />

      {/* Featured Carousel */}
      {featuredNFRs.length > 0 && (
        <FeaturedCarousel items={featuredNFRs} autoPlayInterval={6000} />
      )}

      {/* Learning Path */}
      {learningPathNFRs.length > 0 && (
        <LearningPath
          steps={learningPathNFRs}
          title="Start Your Learning Journey"
          description="Follow this recommended path to build a strong foundation in non-functional requirements."
        />
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build Better Software?
          </h2>
          <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive collection of 85+ non-functional
            requirements and learn how to implement them in your projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors"
            >
              Browse All NFRs
            </Link>
            <Link
              href="/categories/frontend/001-page-load-performance"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Start with Basics
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
