// Page Transition Animations

import type { Variants } from "framer-motion";

// Simple fade transition
export const fadeTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

// Fade with slide up
export const fadeSlideUpTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

// Fade with slide from direction
export const fadeSlideTransition = (direction: "left" | "right" | "up" | "down"): Variants => {
  const directionMap = {
    left: { x: -30, y: 0 },
    right: { x: 30, y: 0 },
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 },
  };

  const offset = directionMap[direction];

  return {
    initial: {
      opacity: 0,
      ...offset,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    exit: {
      opacity: 0,
      ...offset,
      transition: {
        duration: 0.3,
      },
    },
  };
};

// Scale fade transition
export const scaleFadeTransition: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: 0.2,
    },
  },
};

// Shared layout transition settings
export const layoutTransition = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
};

// Route change animation wrapper config
export const routeAnimationConfig = {
  initial: "initial",
  animate: "animate",
  exit: "exit",
  mode: "wait" as const,
};
