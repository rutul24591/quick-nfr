"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import type { BadgeVariant, BadgeColor } from "@/types/ui";
import type { NFRCategory, NFRDifficulty } from "@/types/nfr";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: "sm" | "md";
}

const colorStyles: Record<BadgeColor, string> = {
  gray: "bg-surface-100 text-surface-700 dark:bg-surface-800 dark:text-surface-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  green: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  red: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  purple: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  cyan: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

const sizeStyles: Record<string, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", color = "gray", size = "sm", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full",
          colorStyles[color],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// Category Badge
const categoryColors: Record<NFRCategory, BadgeColor> = {
  frontend: "blue",
  backend: "green",
  shared: "purple",
  advanced: "cyan",
};

const categoryLabels: Record<NFRCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  shared: "Shared",
  advanced: "Advanced",
};

export interface CategoryBadgeProps extends Omit<BadgeProps, "color" | "children"> {
  category: NFRCategory;
}

export const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ category, className, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        color={categoryColors[category]}
        className={cn(`badge-${category}`, className)}
        {...props}
      >
        {categoryLabels[category]}
      </Badge>
    );
  }
);

CategoryBadge.displayName = "CategoryBadge";

// Difficulty Badge
const difficultyColors: Record<NFRDifficulty, BadgeColor> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

const difficultyLabels: Record<NFRDifficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export interface DifficultyBadgeProps extends Omit<BadgeProps, "color" | "children"> {
  difficulty: NFRDifficulty;
}

export const DifficultyBadge = forwardRef<HTMLSpanElement, DifficultyBadgeProps>(
  ({ difficulty, className, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        color={difficultyColors[difficulty]}
        className={cn(
          difficulty === "advanced" ? "badge-advanced-difficulty" : `badge-${difficulty}`,
          className
        )}
        {...props}
      >
        {difficultyLabels[difficulty]}
      </Badge>
    );
  }
);

DifficultyBadge.displayName = "DifficultyBadge";

// Importance Badge
type NFRImportance = "critical" | "high" | "medium";

const importanceColors: Record<NFRImportance, BadgeColor> = {
  critical: "red",
  high: "yellow",
  medium: "gray",
};

const importanceLabels: Record<NFRImportance, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
};

export interface ImportanceBadgeProps extends Omit<BadgeProps, "color" | "children"> {
  importance: NFRImportance;
}

export const ImportanceBadge = forwardRef<HTMLSpanElement, ImportanceBadgeProps>(
  ({ importance, className, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        color={importanceColors[importance]}
        className={className}
        {...props}
      >
        {importanceLabels[importance]}
      </Badge>
    );
  }
);

ImportanceBadge.displayName = "ImportanceBadge";

// Tag Badge
export interface TagBadgeProps extends Omit<BadgeProps, "children"> {
  tag: string;
}

export const TagBadge = forwardRef<HTMLSpanElement, TagBadgeProps>(
  ({ tag, className, ...props }, ref) => {
    return (
      <Badge
        ref={ref}
        color="gray"
        size="sm"
        className={cn("font-normal", className)}
        {...props}
      >
        {tag}
      </Badge>
    );
  }
);

TagBadge.displayName = "TagBadge";
