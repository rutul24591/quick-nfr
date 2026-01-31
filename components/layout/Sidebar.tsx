"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Server,
  Share2,
  Cpu,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CATEGORIES } from "@/lib/constants/categories";
import { NFR_METADATA } from "@/lib/constants/nfr-data";
import { slideLeftVariants } from "@/lib/animations/presets";
import type { Category } from "@/types/category";
import type { NFRCategory } from "@/types/nfr";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Server,
  Share2,
  Cpu,
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export function Sidebar({ isOpen = true, onClose, isMobile = false }: SidebarProps) {
  const pathname = usePathname();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Calculate actual NFR counts from data
  const nfrCounts = useMemo(() => {
    return NFR_METADATA.reduce(
      (acc, nfr) => {
        acc[nfr.category] = (acc[nfr.category] || 0) + 1;
        return acc;
      },
      { frontend: 0, backend: 0, shared: 0, advanced: 0 } as Record<NFRCategory, number>
    );
  }, []);

  const isActive = (slug: string) => {
    return pathname.includes(`/categories/${slug}`);
  };

  const content = (
    <nav className="p-4 space-y-2">
      <div className="mb-4">
        <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Categories
        </h2>
      </div>

      {Object.values(CATEGORIES).map((category) => {
        const Icon = iconMap[category.icon] || Monitor;
        const active = isActive(category.slug);

        return (
          <div key={category.id}>
            <Link
              href={`/categories/${category.slug}`}
              onClick={isMobile ? onClose : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "transition-colors duration-200",
                active
                  ? `${category.bgColor} ${category.color} font-medium`
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{category.name}</span>
              <span className="text-xs opacity-60">{nfrCounts[category.slug as NFRCategory]}</span>
            </Link>
          </div>
        );
      })}

      {/* Quick links */}
      <div className="pt-6 mt-6 border-t border-[var(--border)]">
        <h2 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
          Quick Links
        </h2>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
        >
          <span>Home</span>
        </Link>
        <Link
          href="/categories"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
        >
          <span>All Categories</span>
        </Link>
      </div>
    </nav>
  );

  // Mobile sidebar (drawer)
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              variants={slideLeftVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 z-50 w-72 bg-[var(--background)] border-r border-[var(--border)] lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                <h2 className="font-semibold">Navigation</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                  aria-label="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto h-[calc(100vh-65px)]">{content}</div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-[var(--border)] bg-[var(--background)]">
      <div className="sticky top-16 overflow-y-auto h-[calc(100vh-64px)]">
        {content}
      </div>
    </aside>
  );
}

// Category nav item component
interface CategoryNavItemProps {
  category: Category;
  isActive: boolean;
  onClick?: () => void;
}

export function CategoryNavItem({ category, isActive, onClick }: CategoryNavItemProps) {
  const Icon = iconMap[category.icon] || Monitor;

  return (
    <Link
      href={`/categories/${category.slug}`}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg",
        "transition-colors duration-200",
        isActive
          ? `${category.bgColor} ${category.color} font-medium`
          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="flex-1">{category.name}</span>
      <ChevronRight className="w-4 h-4 opacity-50" />
    </Link>
  );
}
