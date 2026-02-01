import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, Bookmark } from "lucide-react";
import { getAllNFRMetadata } from "@/lib/nfr";
import { getNFRBySlug as getNFRBySlugFromContent } from "@/lib/content";
import { CATEGORIES } from "@/lib/constants/categories";
import { Container } from "@/components/layout/Container";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CategoryBadge, DifficultyBadge, ImportanceBadge } from "@/components/ui/Badge";
import { MarkdownContent } from "@/components/nfr/MarkdownContent";
import type { NFRCategory } from "@/types/nfr";

interface NFRDetailPageProps {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function NFRDetailPage({ params }: NFRDetailPageProps) {
  const resolvedParams = await params;
  const { slug, id } = resolvedParams;

  // Validate category
  if (!CATEGORIES[slug as NFRCategory]) {
    notFound();
  }

  // Get NFR content from markdown file
  const nfr = getNFRBySlugFromContent(id);

  if (!nfr) {
    notFound();
  }

  // Get all NFRs for navigation
  const allNFRs = getAllNFRMetadata();
  const categoryNFRs = allNFRs
    .filter((n) => n.category === slug)
    .sort((a, b) => a.id - b.id);

  // Find current index for prev/next navigation
  const currentIndex = categoryNFRs.findIndex((n) => n.slug === id);
  const prevNFR = currentIndex > 0 ? categoryNFRs[currentIndex - 1] : null;
  const nextNFR =
    currentIndex < categoryNFRs.length - 1
      ? categoryNFRs[currentIndex + 1]
      : null;

  const category = CATEGORIES[slug as NFRCategory];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.name, href: `/categories/${slug}` },
    { label: nfr.title, href: `/categories/${slug}/${id}` },
  ];

  return (
    <div className="min-h-screen pb-16">
      <Container className="py-8">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        {/* NFR Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-lg font-mono text-[var(--muted-foreground)]">
              #{nfr.id.toString().padStart(3, "0")}
            </span>
            <CategoryBadge category={nfr.category} />
            <DifficultyBadge difficulty={nfr.difficulty} />
            <ImportanceBadge importance={nfr.importance} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{nfr.title}</h1>

          <p className="text-lg text-[var(--muted-foreground)] mb-6">
            {nfr.tldr}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--muted-foreground)]">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {nfr.readTime} min read
            </span>
            <span className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" />
              {nfr.importance} importance
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {nfr.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* NFR Markdown Content */}
        <MarkdownContent content={nfr.rawContent} />

        {/* Prev/Next Navigation */}
        <nav className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="flex justify-between items-center gap-4">
            {prevNFR ? (
              <Link
                href={`/categories/${slug}/${prevNFR.slug}`}
                className="flex-1 max-w-xs"
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                >
                  <ChevronLeft className="w-5 h-5 mr-2 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted-foreground)] mb-1">
                      Previous
                    </div>
                    <div className="font-medium truncate">
                      #{prevNFR.id} {prevNFR.title}
                    </div>
                  </div>
                </Button>
              </Link>
            ) : (
              <div className="flex-1 max-w-xs" />
            )}

            {nextNFR ? (
              <Link
                href={`/categories/${slug}/${nextNFR.slug}`}
                className="flex-1 max-w-xs"
              >
                <Button
                  variant="outline"
                  className="w-full justify-end text-right h-auto py-3"
                >
                  <div className="min-w-0">
                    <div className="text-xs text-[var(--muted-foreground)] mb-1">
                      Next
                    </div>
                    <div className="font-medium truncate">
                      #{nextNFR.id} {nextNFR.title}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 ml-2 flex-shrink-0" />
                </Button>
              </Link>
            ) : (
              <div className="flex-1 max-w-xs" />
            )}
          </div>
        </nav>
      </Container>
    </div>
  );
}

// Generate static params for all NFRs
export function generateStaticParams() {
  const allNFRs = getAllNFRMetadata();

  return allNFRs.map((nfr) => ({
    slug: nfr.category,
    id: nfr.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NFRDetailPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const nfr = getNFRBySlugFromContent(id);

  if (!nfr) {
    return {
      title: "NFR Not Found",
    };
  }

  return {
    title: `${nfr.title} | NFR #${nfr.id}`,
    description: nfr.tldr,
    keywords: nfr.tags.join(", "),
  };
}
