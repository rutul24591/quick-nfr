"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { CategoryBadge, DifficultyBadge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { fadeInUp, staggerContainer, hoverLift } from "@/lib/animations";
import type { NFRMetadata } from "@/types/nfr";

interface NFRGridProps {
  items: NFRMetadata[];
  isLoading?: boolean;
  emptyMessage?: string;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export function NFRGrid({
  items,
  isLoading = false,
  emptyMessage = "No NFRs found matching your criteria.",
  columns = 3,
  className,
}: NFRGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner size="lg" />
        <span className="ml-3 text-[var(--muted-foreground)]">
          Loading NFRs...
        </span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--muted)] flex items-center justify-center">
          <Zap className="w-8 h-8 text-[var(--muted-foreground)]" />
        </div>
        <p className="text-lg text-[var(--muted-foreground)]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn("grid gap-6", gridCols[columns], className)}
    >
      {items.map((nfr) => (
        <motion.div key={nfr.id} variants={fadeInUp}>
          <NFRCard nfr={nfr} />
        </motion.div>
      ))}
    </motion.div>
  );
}

interface NFRCardProps {
  nfr: NFRMetadata;
}

function NFRCard({ nfr }: NFRCardProps) {
  return (
    <Link href={`/categories/${nfr.category}/${nfr.slug}`}>
      <motion.div {...hoverLift}>
        <Card
          variant="interactive"
          hoverable
          className="h-full flex flex-col group"
        >
          {/* Header with ID and badges */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-sm font-mono text-[var(--muted-foreground)]">
              #{nfr.id.toString().padStart(3, "0")}
            </span>
            <div className="flex items-center gap-2">
              <CategoryBadge category={nfr.category} size="sm" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {nfr.title}
          </h3>

          {/* TL;DR */}
          <p className="text-sm text-[var(--muted-foreground)] mb-4 line-clamp-3 flex-1">
            {nfr.tldr}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {nfr.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
              >
                {tag}
              </span>
            ))}
            {nfr.tags.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                +{nfr.tags.length - 3}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <DifficultyBadge difficulty={nfr.difficulty} size="sm" />
              <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                <Clock className="w-3 h-3" />
                {nfr.readTime} min
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-primary-600 dark:group-hover:text-primary-400 transform group-hover:translate-x-1 transition-all" />
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}

// Loading skeleton component
export function NFRGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} variant="bordered" className="animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 w-12 bg-[var(--muted)] rounded" />
            <div className="h-5 w-16 bg-[var(--muted)] rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-[var(--muted)] rounded mb-2" />
          <div className="space-y-2 mb-4">
            <div className="h-4 w-full bg-[var(--muted)] rounded" />
            <div className="h-4 w-5/6 bg-[var(--muted)] rounded" />
            <div className="h-4 w-4/6 bg-[var(--muted)] rounded" />
          </div>
          <div className="flex gap-1.5 mb-4">
            <div className="h-5 w-14 bg-[var(--muted)] rounded-full" />
            <div className="h-5 w-16 bg-[var(--muted)] rounded-full" />
            <div className="h-5 w-12 bg-[var(--muted)] rounded-full" />
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="h-5 w-20 bg-[var(--muted)] rounded-full" />
              <div className="h-4 w-14 bg-[var(--muted)] rounded" />
            </div>
            <div className="h-4 w-4 bg-[var(--muted)] rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}
