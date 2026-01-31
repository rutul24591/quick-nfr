"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useColorSchemePreference } from "./useMediaQuery";

export type Theme = "light" | "dark" | "system";

/**
 * Hook to manage dark mode state
 * Supports system preference and user override
 */
export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");
  const systemPreference = useColorSchemePreference();
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Resolve actual theme based on preference
  useEffect(() => {
    if (theme === "system") {
      setResolvedTheme(systemPreference === "dark" ? "dark" : "light");
    } else {
      setResolvedTheme(theme);
    }
  }, [theme, systemPreference]);

  // Apply theme to document
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  // Toggle between light and dark (ignoring system)
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      if (prev === "system") {
        return resolvedTheme === "dark" ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  }, [setTheme, resolvedTheme]);

  // Set specific theme
  const setThemePreference = useCallback(
    (newTheme: Theme) => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  return {
    theme,
    resolvedTheme,
    setTheme: setThemePreference,
    toggleTheme,
    isDark: resolvedTheme === "dark",
    isLight: resolvedTheme === "light",
    isSystem: theme === "system",
  };
}
