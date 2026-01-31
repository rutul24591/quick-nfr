"use client";

import { useState, useMemo } from "react";
import { Monitor, Server, Share2, Cpu } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { NFRFilter } from "@/components/sections/NFRFilter";
import { NFRGrid } from "@/components/sections/NFRGrid";
import type { NFRCategory, NFRDifficulty, NFRMetadata } from "@/types/nfr";
import type { CategoryInfo } from "@/lib/constants/categories";

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

interface CategoryPageClientProps {
  slug: NFRCategory;
  category: CategoryInfo;
  nfrs: NFRMetadata[];
}

export function CategoryPageClient({
  slug,
  category,
  nfrs,
}: CategoryPageClientProps) {
  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<NFRCategory[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    NFRDifficulty[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"id" | "title" | "difficulty" | "readTime">(
    "id"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Get all available tags for this category
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    nfrs.forEach((nfr) => nfr.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [nfrs]);

  // Filter and sort NFRs
  const filteredNFRs = useMemo(() => {
    let result = [...nfrs];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (nfr) =>
          nfr.title.toLowerCase().includes(query) ||
          nfr.tldr.toLowerCase().includes(query) ||
          nfr.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply difficulty filter
    if (selectedDifficulties.length > 0) {
      result = result.filter((nfr) =>
        selectedDifficulties.includes(nfr.difficulty)
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      result = result.filter((nfr) =>
        selectedTags.some((tag) => nfr.tags.includes(tag))
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "id":
          comparison = a.id - b.id;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "difficulty":
          const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
          comparison =
            difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
        case "readTime":
          comparison = a.readTime - b.readTime;
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [nfrs, searchQuery, selectedDifficulties, selectedTags, sortBy, sortOrder]);

  const handleSortChange = (
    newSortBy: string,
    newSortOrder: "asc" | "desc"
  ) => {
    setSortBy(newSortBy as typeof sortBy);
    setSortOrder(newSortOrder);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedTags([]);
    setSearchQuery("");
  };

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.name, href: `/categories/${slug}` },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} className="mb-6" />

      {/* Category header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl ${categoryColors[slug]}`}>
            {categoryIcons[slug]}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{category.name}</h1>
            <p className="text-[var(--muted-foreground)]">{nfrs.length} NFRs</p>
          </div>
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">
          {category.description}
        </p>
      </div>

      {/* Subcategories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {category.subcategories.map((sub) => (
          <span
            key={sub}
            className="px-3 py-1.5 rounded-full bg-[var(--muted)] text-sm text-[var(--muted-foreground)]"
          >
            {sub}
          </span>
        ))}
      </div>

      {/* Filter bar */}
      <NFRFilter
        selectedCategories={selectedCategories}
        selectedDifficulties={selectedDifficulties}
        selectedTags={selectedTags}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        availableTags={availableTags}
        onCategoriesChange={setSelectedCategories}
        onDifficultiesChange={setSelectedDifficulties}
        onTagsChange={setSelectedTags}
        onSearchChange={setSearchQuery}
        onSortChange={handleSortChange}
        onClearAll={handleClearAll}
        className="mb-8"
      />

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[var(--muted-foreground)]">
          Showing {filteredNFRs.length} of {nfrs.length} NFRs
        </p>
      </div>

      {/* NFR grid */}
      <NFRGrid
        items={filteredNFRs}
        emptyMessage={`No NFRs found in ${category.name} matching your criteria.`}
      />
    </div>
  );
}
