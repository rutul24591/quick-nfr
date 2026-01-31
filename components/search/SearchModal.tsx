"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowRight,
  Clock,
  Hash,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CategoryBadge, DifficultyBadge } from "@/components/ui/Badge";
import { NFR_METADATA } from "@/lib/constants/nfr-data";
import type { NFRMetadata } from "@/types/nfr";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("nfr-recent-searches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Save search to recent
  const saveToRecent = useCallback((searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const updated = [trimmed, ...prev.filter((s) => s !== trimmed)].slice(
        0,
        5
      );
      localStorage.setItem("nfr-recent-searches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Search results
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerms = query.toLowerCase().split(" ").filter(Boolean);

    return NFR_METADATA.filter((nfr) => {
      const searchableText = [
        nfr.title,
        nfr.tldr,
        nfr.category,
        ...nfr.tags,
        `#${nfr.id}`,
        `nfr ${nfr.id}`,
      ]
        .join(" ")
        .toLowerCase();

      return searchTerms.every((term) => searchableText.includes(term));
    }).slice(0, 10);
  }, [query]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            saveToRecent(query);
            const nfr = results[selectedIndex];
            window.location.href = `/categories/${nfr.category}/${nfr.slug}`;
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, query, saveToRecent, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-[var(--border)] overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
                <Search className="w-5 h-5 text-[var(--muted-foreground)]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search NFRs... (e.g., performance, #1, security)"
                  className="flex-1 bg-transparent outline-none text-lg placeholder:text-[var(--muted-foreground)]"
                  autoFocus
                />
                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-mono bg-[var(--muted)] rounded">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim() ? (
                  results.length > 0 ? (
                    <ul className="py-2">
                      {results.map((nfr, index) => (
                        <SearchResult
                          key={nfr.id}
                          nfr={nfr}
                          isSelected={index === selectedIndex}
                          onClick={() => {
                            saveToRecent(query);
                            onClose();
                          }}
                        />
                      ))}
                    </ul>
                  ) : (
                    <div className="p-8 text-center text-[var(--muted-foreground)]">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-1">No results found</p>
                      <p className="text-sm">
                        Try searching for different keywords or NFR numbers
                      </p>
                    </div>
                  )
                ) : (
                  <div className="p-4">
                    {/* Recent searches */}
                    {recentSearches.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                          Recent Searches
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((search) => (
                            <button
                              key={search}
                              onClick={() => setQuery(search)}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--muted)] hover:bg-[var(--muted)]/80 text-sm transition-colors"
                            >
                              <Clock className="w-3 h-3" />
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick links */}
                    <div>
                      <h3 className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider mb-2">
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "performance",
                          "security",
                          "accessibility",
                          "scalability",
                          "caching",
                        ].map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                          >
                            <Hash className="w-3 h-3" />
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)] bg-[var(--muted)]/30 text-xs text-[var(--muted-foreground)]">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-[var(--muted)] rounded">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-[var(--muted)] rounded">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-[var(--muted)] rounded">↵</kbd>
                    to select
                  </span>
                </div>
                <span>
                  {results.length} result{results.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface SearchResultProps {
  nfr: NFRMetadata;
  isSelected: boolean;
  onClick: () => void;
}

function SearchResult({ nfr, isSelected, onClick }: SearchResultProps) {
  return (
    <li>
      <Link
        href={`/categories/${nfr.category}/${nfr.slug}`}
        onClick={onClick}
        className={cn(
          "flex items-start gap-4 px-4 py-3 transition-colors",
          isSelected
            ? "bg-primary-50 dark:bg-primary-900/20"
            : "hover:bg-[var(--muted)]/50"
        )}
      >
        {/* NFR number */}
        <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center font-mono text-sm font-medium">
          #{nfr.id}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{nfr.title}</span>
            <CategoryBadge category={nfr.category} size="sm" />
          </div>
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-1">
            {nfr.tldr}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <DifficultyBadge difficulty={nfr.difficulty} size="sm" />
            <span className="text-xs text-[var(--muted-foreground)]">
              {nfr.readTime} min read
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight
          className={cn(
            "w-5 h-5 flex-shrink-0 transition-opacity",
            isSelected ? "opacity-100" : "opacity-0"
          )}
        />
      </Link>
    </li>
  );
}

// Search trigger button for use in Navbar
export function SearchTrigger({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)]",
        "bg-white dark:bg-gray-800 hover:bg-[var(--muted)] transition-colors",
        "text-sm text-[var(--muted-foreground)]",
        className
      )}
    >
      <Search className="w-4 h-4" />
      <span className="hidden sm:inline">Search NFRs...</span>
      <kbd className="hidden md:flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-[var(--muted)] rounded">
        <Command className="w-3 h-3" />K
      </kbd>
    </button>
  );
}
