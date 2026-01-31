"use client";

import { Fragment } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { BreadcrumbItem, BreadcrumbProps } from "@/types/ui";

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)}>
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {/* Home link */}
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.label}>
              <li className="flex items-center text-[var(--muted-foreground)]">
                <ChevronRight className="w-4 h-4 mx-1" />
              </li>
              <li className="flex items-center">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      isLast
                        ? "font-medium text-[var(--foreground)]"
                        : "text-[var(--muted-foreground)]"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

// Helper function to generate breadcrumb items from pathname
export function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [];

  let currentPath = "";

  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Format segment for display (capitalize, replace hyphens)
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    items.push({
      label,
      href: currentPath,
    });
  }

  return items;
}

// Specialized breadcrumb for NFR pages
export interface NFRBreadcrumbProps {
  categoryName: string;
  categorySlug: string;
  nfrTitle?: string;
  className?: string;
}

export function NFRBreadcrumb({
  categoryName,
  categorySlug,
  nfrTitle,
  className,
}: NFRBreadcrumbProps) {
  const items: BreadcrumbItem[] = [
    { label: "Categories", href: "/categories" },
    { label: categoryName, href: `/categories/${categorySlug}` },
  ];

  if (nfrTitle) {
    items.push({ label: nfrTitle });
  }

  return <Breadcrumb items={items} className={className} />;
}
