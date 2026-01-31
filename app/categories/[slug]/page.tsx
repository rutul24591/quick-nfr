import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants/categories";
import { NFR_METADATA } from "@/lib/constants/nfr-data";
import { CategoryPageClient } from "@/components/sections/CategoryPageClient";
import type { NFRCategory } from "@/types/nfr";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Validate category
  const category = CATEGORIES[slug as NFRCategory];
  if (!category) {
    notFound();
  }

  // Get NFRs for this category
  const categoryNFRs = NFR_METADATA.filter((nfr) => nfr.category === slug);

  return (
    <CategoryPageClient
      slug={slug as NFRCategory}
      category={category}
      nfrs={categoryNFRs}
    />
  );
}

// Generate static params for all categories
export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const category = CATEGORIES[slug as NFRCategory];

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} NFRs`,
    description: category.description,
  };
}
