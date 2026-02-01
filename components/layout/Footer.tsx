"use client";

import Link from "next/link";
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";
import { Container } from "./Container";
import { CATEGORIES } from "@/lib/constants/categories";

const footerLinks = {
  categories: Object.values(CATEGORIES).map((cat) => ({
    label: cat.name,
    href: `/categories/${cat.slug}`,
  })),
  resources: [
    { label: "All NFRs", href: "/categories" },
    { label: "Getting Started", href: "/" },
    { label: "Search", href: "/" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]/30">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <BookOpen className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <span className="font-heading text-lg font-bold">NFR Guide</span>
              </Link>
              <p className="text-sm text-[var(--muted-foreground)] mb-4">
                A comprehensive learning platform for Non-Functional Requirements.
                Master 85 essential NFRs for building better software.
              </p>
              {/* Social links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-[var(--foreground)] opacity-60 hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {footerLinks.categories.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--foreground)] opacity-60 hover:opacity-100 transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-[var(--border)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--muted-foreground)]">
              &copy; {currentYear} NFR Guide. All rights reserved.
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              Built with Next.js, React, and Tailwind CSS
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
