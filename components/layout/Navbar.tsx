"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Sun, Moon, BookOpen, Command } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useTheme } from "@/lib/hooks/useTheme";
import { useBreakpoint } from "@/lib/hooks/useMediaQuery";
import { useSearch } from "@/components/providers/SearchProvider";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Frontend", href: "/categories/frontend" },
  { label: "Backend", href: "/categories/backend" },
  { label: "Shared", href: "/categories/shared" },
  { label: "Advanced", href: "/categories/advanced" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { toggleTheme, isDark } = useTheme();
  const { isMobile } = useBreakpoint();
  const { openSearch } = useSearch();

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-bold"
            onClick={closeMobileMenu}
          >
            <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <span className="hidden sm:inline">NFR Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg",
                  "transition-colors duration-200",
                  isActive(link.href)
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                )}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 dark:bg-primary-400"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <button
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] bg-white dark:bg-gray-800 hover:bg-[var(--muted)] transition-colors text-sm text-[var(--muted-foreground)]"
              aria-label="Search NFRs"
            >
              <Search className="w-4 h-4" />
              <span>Search NFRs...</span>
              <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 text-xs bg-[var(--muted)] rounded">
                <Command className="w-3 h-3" />K
              </kbd>
            </button>

            {/* Mobile search icon */}
            <button
              onClick={openSearch}
              className="sm:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-[var(--border)]"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-lg",
                      "transition-colors duration-200",
                      isActive(link.href)
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950"
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
