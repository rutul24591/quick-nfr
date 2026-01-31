"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { spinnerVariants } from "@/lib/animations/presets";
import type { SpinnerProps } from "@/types/ui";

const sizeStyles: Record<string, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const colorStyles: Record<string, string> = {
  primary: "text-primary-600 dark:text-primary-400",
  white: "text-white",
  gray: "text-[var(--muted-foreground)]",
};

export function Spinner({
  size = "md",
  color = "primary",
  className,
}: SpinnerProps & { className?: string }) {
  return (
    <motion.svg
      variants={spinnerVariants}
      animate="spin"
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeStyles[size], colorStyles[color], className)}
      aria-label="Loading"
      role="status"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </motion.svg>
  );
}

// Loading overlay with spinner
export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  className?: string;
}

export function LoadingOverlay({ isLoading, message, className }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "bg-[var(--background)]/80 backdrop-blur-sm",
        "z-10",
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        {message && (
          <p className="text-sm text-[var(--muted-foreground)]">{message}</p>
        )}
      </div>
    </div>
  );
}

// Skeleton loader
export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

export function Skeleton({
  className,
  width,
  height,
  rounded = "md",
}: SkeletonProps) {
  const roundedStyles: Record<string, string> = {
    none: "rounded-none",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--muted)]",
        roundedStyles[rounded],
        className
      )}
      style={{ width, height }}
    />
  );
}

// Text skeleton
export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={16}
          className={i === lines - 1 ? "w-3/4" : "w-full"}
        />
      ))}
    </div>
  );
}

// Card skeleton
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border border-[var(--border)] space-y-3",
        className
      )}
    >
      <Skeleton height={20} className="w-3/4" />
      <SkeletonText lines={2} />
      <div className="flex gap-2 pt-2">
        <Skeleton height={24} width={60} rounded="full" />
        <Skeleton height={24} width={80} rounded="full" />
      </div>
    </div>
  );
}
