"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface ScrollState {
  x: number;
  y: number;
  direction: "up" | "down" | null;
  isScrolling: boolean;
  isAtTop: boolean;
  isAtBottom: boolean;
  progress: number;
}

/**
 * Hook to track scroll position and state
 */
export function useScroll(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    x: 0,
    y: 0,
    direction: null,
    isScrolling: false,
    isAtTop: true,
    isAtBottom: false,
    progress: 0,
  });

  const lastY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const y = window.scrollY;
      const x = window.scrollX;
      const direction = y > lastY.current ? "down" : y < lastY.current ? "up" : null;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? y / maxScroll : 0;

      setState({
        x,
        y,
        direction,
        isScrolling: true,
        isAtTop: y <= 0,
        isAtBottom: y >= maxScroll - 10,
        progress: Math.min(1, Math.max(0, progress)),
      });

      lastY.current = y;

      // Reset isScrolling after scroll ends
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setState((prev) => ({ ...prev, isScrolling: false }));
      }, 150);
    };

    // Initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return state;
}

/**
 * Hook to detect when an element is in viewport
 */
export function useInView(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
}

/**
 * Hook to trigger callback when scrolling to a threshold
 */
export function useScrollThreshold(
  threshold: number,
  callback: (isPastThreshold: boolean) => void
): void {
  const { y } = useScroll();
  const wasPastThreshold = useRef(false);

  useEffect(() => {
    const isPastThreshold = y > threshold;

    if (isPastThreshold !== wasPastThreshold.current) {
      wasPastThreshold.current = isPastThreshold;
      callback(isPastThreshold);
    }
  }, [y, threshold, callback]);
}

/**
 * Hook to scroll to element or position
 */
export function useScrollTo() {
  const scrollToTop = useCallback((behavior: ScrollBehavior = "smooth") => {
    window.scrollTo({ top: 0, behavior });
  }, []);

  const scrollToElement = useCallback(
    (element: HTMLElement | string, offset: number = 0) => {
      const target =
        typeof element === "string" ? document.querySelector(element) : element;

      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    []
  );

  const scrollToPosition = useCallback(
    (position: number, behavior: ScrollBehavior = "smooth") => {
      window.scrollTo({ top: position, behavior });
    },
    []
  );

  return {
    scrollToTop,
    scrollToElement,
    scrollToPosition,
  };
}
