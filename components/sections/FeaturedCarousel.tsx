"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CategoryBadge, DifficultyBadge } from "@/components/ui/Badge";
import type { NFRMetadata } from "@/types/nfr";

interface FeaturedCarouselProps {
  items: NFRMetadata[];
  autoPlayInterval?: number;
  className?: string;
}

export function FeaturedCarousel({
  items,
  autoPlayInterval = 5000,
  className,
}: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, autoPlayInterval]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <section className={cn("py-16 bg-[var(--muted)]/30", className)}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured NFRs</h2>
            <p className="text-[var(--muted-foreground)]">
              Explore our most popular and essential non-functional requirements
            </p>
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <Link
                href={`/categories/${currentItem.category}/${currentItem.slug}`}
              >
                <Card
                  variant="interactive"
                  hoverable
                  padding="lg"
                  className="grid md:grid-cols-2 gap-8"
                >
                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-mono text-[var(--muted-foreground)]">
                        #{currentItem.id.toString().padStart(3, "0")}
                      </span>
                      <CategoryBadge category={currentItem.category} />
                      <DifficultyBadge difficulty={currentItem.difficulty} />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      {currentItem.title}
                    </h3>

                    <p className="text-lg text-[var(--muted-foreground)] mb-6">
                      {currentItem.tldr}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-sm px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)]">
                      <span>{currentItem.readTime} min read</span>
                      <span>•</span>
                      <span className="capitalize">
                        {currentItem.importance} importance
                      </span>
                    </div>
                  </div>

                  {/* Visual placeholder */}
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-full aspect-video rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary-300 dark:text-primary-700">
                        #{currentItem.id}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Mobile navigation arrows */}
          <div className="md:hidden absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
          <div className="md:hidden absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-primary-600 dark:bg-primary-400"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
