"use client";

import { useMemo } from "react";
import { useReducedMotion } from "./useMediaQuery";
import type { Variants, Transition, TargetAndTransition } from "framer-motion";

// Animation presets
export type AnimationPreset =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleIn"
  | "slideInLeft"
  | "slideInRight"
  | "slideInUp"
  | "slideInDown"
  | "none";

export interface AnimationConfig {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: Transition;
}

// Base animation configurations
const animations: Record<AnimationPreset, AnimationConfig> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  slideInLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  slideInRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  slideInUp: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  slideInDown: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
    transition: { duration: 0 },
  },
};

// No-motion fallback
const noMotion: AnimationConfig = {
  initial: {},
  animate: {},
  exit: {},
  transition: { duration: 0 },
};

/**
 * Hook to get animation configuration based on preset
 * Automatically respects reduced motion preference
 */
export function useAnimation(
  preset: AnimationPreset,
  options: {
    delay?: number;
    duration?: number;
    stagger?: number;
    once?: boolean;
  } = {}
): AnimationConfig {
  const reducedMotion = useReducedMotion();

  return useMemo(() => {
    if (reducedMotion || preset === "none") {
      return noMotion;
    }

    const config = animations[preset];
    const transition: Transition = { ...config.transition };

    if (options.delay) {
      (transition as { delay?: number }).delay = options.delay;
    }

    if (options.duration) {
      (transition as { duration?: number }).duration = options.duration;
    }

    return {
      ...config,
      transition,
    };
  }, [preset, reducedMotion, options.delay, options.duration]);
}

/**
 * Get staggered animation variants for parent container
 */
export function useStaggerAnimation(options: {
  staggerChildren?: number;
  delayChildren?: number;
}): Variants {
  const reducedMotion = useReducedMotion();

  return useMemo(() => {
    if (reducedMotion) {
      return {
        hidden: {},
        visible: {},
      };
    }

    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: options.staggerChildren || 0.1,
          delayChildren: options.delayChildren || 0,
        },
      },
    };
  }, [reducedMotion, options.staggerChildren, options.delayChildren]);
}

/**
 * Get staggered child animation variants
 */
export function useStaggerChildAnimation(preset: AnimationPreset = "fadeInUp"): Variants {
  const reducedMotion = useReducedMotion();

  return useMemo(() => {
    if (reducedMotion || preset === "none") {
      return {
        hidden: {},
        visible: {},
      };
    }

    const config = animations[preset];

    return {
      hidden: config.initial,
      visible: {
        ...config.animate,
        transition: config.transition,
      },
    };
  }, [preset, reducedMotion]);
}

/**
 * Get hover animation props
 */
export function useHoverAnimation(
  type: "lift" | "scale" | "glow" = "lift"
): TargetAndTransition {
  const reducedMotion = useReducedMotion();

  return useMemo(() => {
    if (reducedMotion) {
      return {};
    }

    switch (type) {
      case "lift":
        return { y: -4, transition: { duration: 0.2 } };
      case "scale":
        return { scale: 1.02, transition: { duration: 0.2 } };
      case "glow":
        return {
          boxShadow: "0 0 20px rgba(90, 115, 242, 0.3)",
          transition: { duration: 0.2 },
        };
      default:
        return {};
    }
  }, [type, reducedMotion]);
}

/**
 * Get tap animation props
 */
export function useTapAnimation(): TargetAndTransition {
  const reducedMotion = useReducedMotion();

  return useMemo(() => {
    if (reducedMotion) {
      return {};
    }

    return { scale: 0.98, transition: { duration: 0.1 } };
  }, [reducedMotion]);
}
