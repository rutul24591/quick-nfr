// Interaction Animation Configurations
// Hover, tap, drag, and focus animations

import type { TargetAndTransition } from "framer-motion";

// Hover animations
export const hoverLiftAnimation: TargetAndTransition = {
  y: -4,
  transition: { duration: 0.2, ease: "easeOut" },
};

export const hoverLift = {
  whileHover: { y: -4 },
  whileTap: { scale: 0.98 },
};

export const hoverScale: TargetAndTransition = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" },
};

export const hoverScaleSmall: TargetAndTransition = {
  scale: 1.01,
  transition: { duration: 0.15 },
};

export const hoverGlow = (color: string = "rgba(90, 115, 242, 0.3)"): TargetAndTransition => ({
  boxShadow: `0 0 20px ${color}`,
  transition: { duration: 0.2 },
});

export const hoverBrighten: TargetAndTransition = {
  filter: "brightness(1.05)",
  transition: { duration: 0.2 },
};

export const hoverDarken: TargetAndTransition = {
  filter: "brightness(0.95)",
  transition: { duration: 0.2 },
};

// Tap animations
export const tapScale: TargetAndTransition = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

export const tapScaleSmall: TargetAndTransition = {
  scale: 0.99,
  transition: { duration: 0.1 },
};

export const tapPush: TargetAndTransition = {
  y: 2,
  transition: { duration: 0.1 },
};

// Focus animations
export const focusRing = (color: string = "rgba(90, 115, 242, 0.5)"): TargetAndTransition => ({
  boxShadow: `0 0 0 3px ${color}`,
  transition: { duration: 0.15 },
});

// Button interaction presets
export const buttonInteraction = {
  whileHover: hoverScale,
  whileTap: tapScale,
};

export const buttonInteractionSubtle = {
  whileHover: hoverScaleSmall,
  whileTap: tapScaleSmall,
};

// Card interaction presets
export const cardInteraction = {
  whileHover: {
    y: -4,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
  whileTap: tapScaleSmall,
};

// Link interaction presets
export const linkInteraction = {
  whileHover: {
    color: "var(--color-primary-500)",
    transition: { duration: 0.15 },
  },
  whileTap: tapScaleSmall,
};

// Icon button interaction
export const iconButtonInteraction = {
  whileHover: {
    scale: 1.1,
    transition: { duration: 0.15 },
  },
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

// Nav item interaction
export const navItemInteraction = {
  whileHover: {
    backgroundColor: "var(--interactive-hover)",
    transition: { duration: 0.15 },
  },
  whileTap: {
    backgroundColor: "var(--interactive-active)",
    transition: { duration: 0.1 },
  },
};

// Drag constraints helper
export const createDragConstraints = (
  left: number,
  right: number,
  top: number,
  bottom: number
) => ({
  left,
  right,
  top,
  bottom,
});

// Drag elastic settings
export const dragElastic = {
  none: 0,
  low: 0.1,
  medium: 0.3,
  high: 0.5,
};

// Swipe gesture thresholds
export const swipeThreshold = {
  velocity: 500,
  distance: 100,
};

// Checkbox toggle animation
export const checkboxToggle = {
  unchecked: {
    scale: 0,
    opacity: 0,
  },
  checked: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// Switch toggle animation
export const switchToggle = {
  off: { x: 0 },
  on: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

// Ripple effect (for buttons)
export const rippleEffect = {
  initial: {
    scale: 0,
    opacity: 0.5,
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Pulse effect (for notifications)
export const pulseEffect = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Shake effect (for errors)
export const shakeEffect = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// Bounce effect
export const bounceEffect = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
