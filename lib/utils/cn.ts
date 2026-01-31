// Tailwind class merging utility
// Combines clsx for conditional classes with tailwind-merge for deduplication

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with proper deduplication
 * Uses clsx for conditional class handling and tailwind-merge for conflict resolution
 *
 * @example
 * cn("px-4 py-2", "px-6") // Returns "px-6 py-2"
 * cn("text-red-500", condition && "text-blue-500") // Conditional classes
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
