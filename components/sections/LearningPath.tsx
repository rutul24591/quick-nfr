"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Circle, ArrowRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/ui/Badge";
import { fadeInUp, staggerContainer } from "@/lib/animations/presets";
import type { NFRMetadata } from "@/types/nfr";

interface LearningPathProps {
  title?: string;
  description?: string;
  steps: NFRMetadata[];
  completedSteps?: number[];
  className?: string;
}

export function LearningPath({
  title = "Recommended Learning Path",
  description = "Follow this structured path to master non-functional requirements from fundamentals to advanced topics.",
  steps,
  completedSteps = [],
  className,
}: LearningPathProps) {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Structured Learning
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Learning path steps */}
        <div className="max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isLast = index === steps.length - 1;

            return (
              <motion.div key={step.id} variants={fadeInUp} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-6 top-16 w-0.5 h-full -translate-x-1/2",
                      "bg-gradient-to-b from-primary-300 to-primary-100 dark:from-primary-700 dark:to-primary-900"
                    )}
                  />
                )}

                <Link
                  href={`/categories/${step.category}/${step.slug}`}
                  className="block"
                >
                  <Card
                    variant="interactive"
                    hoverable
                    className={cn(
                      "mb-4 relative",
                      "transition-all duration-300",
                      isCompleted && "border-green-300 dark:border-green-700"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step indicator */}
                      <div className="flex-shrink-0">
                        <motion.div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center",
                            isCompleted
                              ? "bg-green-100 dark:bg-green-900/30"
                              : "bg-primary-100 dark:bg-primary-900/30"
                          )}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                          ) : (
                            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                              {index + 1}
                            </span>
                          )}
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-mono text-[var(--muted-foreground)]">
                            NFR #{step.id.toString().padStart(3, "0")}
                          </span>
                          <DifficultyBadge difficulty={step.difficulty} size="sm" />
                        </div>

                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {step.title}
                        </h3>

                        <p className="text-[var(--muted-foreground)] text-sm line-clamp-2">
                          {step.tldr}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-sm text-[var(--muted-foreground)]">
                          <span>{step.readTime} min read</span>
                          <span className="flex items-center gap-1">
                            <ArrowRight className="w-4 h-4" />
                            {isCompleted ? "Review" : "Start learning"}
                          </span>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      {isCompleted && (
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                            <CheckCircle className="w-3 h-3" />
                            Completed
                          </span>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div variants={fadeInUp} className="text-center mt-8">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
          >
            View All NFRs
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
