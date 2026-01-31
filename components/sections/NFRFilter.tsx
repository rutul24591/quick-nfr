"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";
import { SearchBox } from "@/components/ui/SearchBox";
import { CategoryBadge, DifficultyBadge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/lib/constants/categories";
import type { NFRCategory, NFRDifficulty } from "@/types/nfr";

interface NFRFilterProps {
  selectedCategories: NFRCategory[];
  selectedDifficulties: NFRDifficulty[];
  selectedTags: string[];
  searchQuery: string;
  sortBy: "id" | "title" | "difficulty" | "readTime";
  sortOrder: "asc" | "desc";
  availableTags: string[];
  onCategoriesChange: (categories: NFRCategory[]) => void;
  onDifficultiesChange: (difficulties: NFRDifficulty[]) => void;
  onTagsChange: (tags: string[]) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  onClearAll: () => void;
  className?: string;
}

const difficulties: NFRDifficulty[] = ["beginner", "intermediate", "advanced"];
const sortOptions = [
  { value: "id", label: "NFR Number" },
  { value: "title", label: "Title" },
  { value: "difficulty", label: "Difficulty" },
  { value: "readTime", label: "Read Time" },
];

export function NFRFilter({
  selectedCategories,
  selectedDifficulties,
  selectedTags,
  searchQuery,
  sortBy,
  sortOrder,
  availableTags,
  onCategoriesChange,
  onDifficultiesChange,
  onTagsChange,
  onSearchChange,
  onSortChange,
  onClearAll,
  className,
}: NFRFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedDifficulties.length > 0 ||
    selectedTags.length > 0 ||
    searchQuery.length > 0;

  const toggleCategory = (category: NFRCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const toggleDifficulty = (difficulty: NFRDifficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      onDifficultiesChange(selectedDifficulties.filter((d) => d !== difficulty));
    } else {
      onDifficultiesChange([...selectedDifficulties, difficulty]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main filter bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <SearchBox
            value={searchQuery}
            onSearch={onSearchChange}
            placeholder="Search NFRs..."
            className="w-full"
          />
        </div>

        {/* Filter toggle and sort */}
        <div className="flex items-center gap-2">
          <Button
            variant={showFilters ? "primary" : "outline"}
            size="md"
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                {selectedCategories.length +
                  selectedDifficulties.length +
                  selectedTags.length}
              </span>
            )}
          </Button>

          {/* Sort dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              Sort
              <ChevronDown
                className={cn(
                  "w-4 h-4 ml-2 transition-transform",
                  showSortDropdown && "rotate-180"
                )}
              />
            </Button>

            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-[var(--border)] z-50"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        const newOrder =
                          sortBy === option.value && sortOrder === "asc"
                            ? "desc"
                            : "asc";
                        onSortChange(option.value, newOrder);
                        setShowSortDropdown(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left text-sm hover:bg-[var(--muted)] transition-colors",
                        "first:rounded-t-lg last:rounded-b-lg",
                        sortBy === option.value &&
                          "bg-primary-50 dark:bg-primary-900/30"
                      )}
                    >
                      <span className="flex items-center justify-between">
                        {option.label}
                        {sortBy === option.value && (
                          <span className="text-xs text-[var(--muted-foreground)]">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Expanded filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-[var(--muted)]/50 rounded-lg space-y-4">
              {/* Categories */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(CATEGORIES).map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category as NFRCategory)}
                      className={cn(
                        "transition-all",
                        selectedCategories.includes(category as NFRCategory)
                          ? "ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900"
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <CategoryBadge category={category as NFRCategory} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => toggleDifficulty(difficulty)}
                      className={cn(
                        "transition-all",
                        selectedDifficulties.includes(difficulty)
                          ? "ring-2 ring-primary-500 ring-offset-2 dark:ring-offset-gray-900"
                          : "opacity-70 hover:opacity-100"
                      )}
                    >
                      <DifficultyBadge difficulty={difficulty} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {availableTags.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.slice(0, 12).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          "px-3 py-1 text-sm rounded-full border transition-all",
                          selectedTags.includes(tag)
                            ? "bg-primary-100 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300"
                            : "bg-white dark:bg-gray-800 border-[var(--border)] hover:border-primary-300"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear all */}
              {hasActiveFilters && (
                <div className="pt-2 border-t border-[var(--border)]">
                  <Button variant="ghost" size="sm" onClick={onClearAll}>
                    <X className="w-4 h-4 mr-2" />
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filters display */}
      {hasActiveFilters && !showFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[var(--muted-foreground)]">
            Active filters:
          </span>
          {selectedCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className="inline-flex items-center gap-1"
            >
              <CategoryBadge category={category} size="sm" />
              <X className="w-3 h-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)]" />
            </button>
          ))}
          {selectedDifficulties.map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => toggleDifficulty(difficulty)}
              className="inline-flex items-center gap-1"
            >
              <DifficultyBadge difficulty={difficulty} size="sm" />
              <X className="w-3 h-3 text-[var(--muted-foreground)] hover:text-[var(--foreground)]" />
            </button>
          ))}
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-[var(--muted)] hover:bg-[var(--muted)]/80"
            >
              {tag}
              <X className="w-3 h-3" />
            </button>
          ))}
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
