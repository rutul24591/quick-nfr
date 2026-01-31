import Link from "next/link";
import {
  Monitor,
  Server,
  Share2,
  Cpu,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { getAllNFRMetadata } from "@/lib/nfr";
import { CATEGORIES } from "@/lib/constants/categories";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import type { NFRCategory } from "@/types/nfr";

const categoryIcons: Record<NFRCategory, React.ReactNode> = {
  frontend: <Monitor className="w-8 h-8" />,
  backend: <Server className="w-8 h-8" />,
  shared: <Share2 className="w-8 h-8" />,
  advanced: <Cpu className="w-8 h-8" />,
};

const categoryColors: Record<NFRCategory, string> = {
  frontend: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
  backend:
    "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
  shared:
    "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30",
  advanced:
    "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30",
};

export default function CategoriesPage() {
  const allNFRs = getAllNFRMetadata();

  // Count NFRs per category
  const nfrCounts = allNFRs.reduce(
    (acc, nfr) => {
      acc[nfr.category] = (acc[nfr.category] || 0) + 1;
      return acc;
    },
    {} as Record<NFRCategory, number>
  );

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold">All Categories</h1>
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">
          Explore non-functional requirements organized by domain. Choose a
          category to dive deeper into specific topics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card variant="bordered" padding="md" className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {allNFRs.length}
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">Total NFRs</div>
        </Card>
        <Card variant="bordered" padding="md" className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            4
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">Categories</div>
        </Card>
        <Card variant="bordered" padding="md" className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            200+
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">
            Code Examples
          </div>
        </Card>
        <Card variant="bordered" padding="md" className="text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            500+
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">
            Best Practices
          </div>
        </Card>
      </div>

      {/* Category cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(CATEGORIES).map(([key, category]) => {
          const categoryKey = key as NFRCategory;
          const count = nfrCounts[categoryKey] || 0;

          return (
            <Link key={key} href={`/categories/${key}`}>
              <Card
                variant="interactive"
                hoverable
                padding="lg"
                className="h-full group transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-xl ${categoryColors[categoryKey]} transition-transform group-hover:scale-110`}
                  >
                    {categoryIcons[categoryKey]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h2>
                      <span className="text-sm font-medium text-[var(--muted-foreground)]">
                        {count} NFRs
                      </span>
                    </div>

                    <p className="text-[var(--muted-foreground)] mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    {/* Subcategories preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {category.subcategories.slice(0, 4).map((sub) => (
                        <span
                          key={sub}
                          className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
                        >
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 4 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                          +{category.subcategories.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* View link */}
                    <div className="flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
                      Explore {category.name}
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
