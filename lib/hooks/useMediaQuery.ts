"use client";

import { useState, useEffect } from "react";
import { BREAKPOINTS } from "@/lib/constants/ui";

/**
 * Hook to detect if a media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", handler);

    // Cleanup
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint() {
  const isSm = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
  const isLg = useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isXl = useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
  const is2xl = useMediaQuery(`(min-width: ${BREAKPOINTS["2xl"]}px)`);

  const current = is2xl
    ? "2xl"
    : isXl
      ? "xl"
      : isLg
        ? "lg"
        : isMd
          ? "md"
          : isSm
            ? "sm"
            : "xs";

  return {
    current,
    isMobile: !isMd,
    isTablet: isMd && !isLg,
    isDesktop: isLg,
    isWideDesktop: isXl,
    breakpoints: { isSm, isMd, isLg, isXl, is2xl },
  };
}

/**
 * Hook to detect reduced motion preference
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Hook to detect color scheme preference
 */
export function useColorSchemePreference(): "light" | "dark" | null {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersLight = useMediaQuery("(prefers-color-scheme: light)");

  if (prefersDark) return "dark";
  if (prefersLight) return "light";
  return null;
}
