"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Monitor,
  Server,
  Share2,
  Cpu,
  ArrowRight,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { CATEGORIES } from "@/lib/constants/categories";
import { fadeInUp, staggerContainer, hoverLift } from "@/lib/animations";
import type { NFRCategory } from "@/types/nfr";

interface CategoryCardsProps {
  className?: string;
  nfrCounts?: Record<NFRCategory, number>;
}

const categoryIcons: Record<NFRCategory, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  shared: Share2,
  advanced: Cpu,
};

const categoryGradients: Record<NFRCategory, string> = {
  frontend:
    "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10",
  backend:
    "from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10",
  shared:
    "from-purple-500/20 to-violet-500/20 dark:from-purple-500/10 dark:to-violet-500/10",
  advanced:
    "from-orange-500/20 to-red-500/20 dark:from-orange-500/10 dark:to-red-500/10",
};

const categoryIconColors: Record<NFRCategory, string> = {
  frontend: "text-blue-600 dark:text-blue-400",
  backend: "text-green-600 dark:text-green-400",
  shared: "text-purple-600 dark:text-purple-400",
  advanced: "text-orange-600 dark:text-orange-400",
};

export function CategoryCards({
  className,
  nfrCounts = { frontend: 30, backend: 30, shared: 15, advanced: 10 },
}: CategoryCardsProps) {
  return (
    <section className={cn("py-16", className)}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4"
      >
        {/* Section header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            Dive deep into non-functional requirements organized by domain.
            Choose your focus area and start building better software.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(CATEGORIES).map(([key, category]) => {
            const Icon = categoryIcons[key as NFRCategory];
            const count = nfrCounts[key as NFRCategory];

            return (
              <motion.div key={key} variants={fadeInUp}>
                <Link href={`/categories/${key}`}>
                  <motion.div {...hoverLift}>
                    <Card
                      variant="interactive"
                      hoverable
                      className={cn(
                        "h-full relative overflow-hidden group",
                        "border-2 border-transparent hover:border-current/10"
                      )}
                    >
                      {/* Background gradient */}
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity group-hover:opacity-100",
                          categoryGradients[key as NFRCategory]
                        )}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <div
                          className={cn(
                            "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                            "bg-white dark:bg-gray-800 shadow-sm",
                            "group-hover:scale-110 transition-transform duration-300"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-7 h-7",
                              categoryIconColors[key as NFRCategory]
                            )}
                          />
                        </div>

                        {/* Title and count */}
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">
                            {category.name}
                          </h3>
                          <span className="text-sm font-medium text-[var(--muted-foreground)]">
                            {count} NFRs
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-[var(--muted-foreground)] text-sm mb-4 line-clamp-2">
                          {category.description}
                        </p>

                        {/* Sample topics */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.subcategories.slice(0, 3).map((sub) => (
                            <span
                              key={sub}
                              className="text-xs px-2 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>

                        {/* Arrow indicator */}
                        <div className="flex items-center text-sm font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          Explore {category.name}
                          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
