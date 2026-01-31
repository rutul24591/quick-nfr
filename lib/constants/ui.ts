// UI Constants

// Color palette for the neo-editorial design
export const COLORS = {
  // Primary - Navy
  primary: {
    50: "#f0f4ff",
    100: "#e0e9ff",
    200: "#c7d7fe",
    300: "#a4bdfc",
    400: "#7e9af8",
    500: "#5a73f2",
    600: "#3d4de6",
    700: "#2f3bcb",
    800: "#2a33a4",
    900: "#283182",
    950: "#1a1f4e",
  },
  // Accent - Cyan
  accent: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344",
  },
  // Category colors
  frontend: "#3b82f6", // blue-500
  backend: "#22c55e", // green-500
  shared: "#a855f7", // purple-500
  advanced: "#f97316", // orange-500
  // Difficulty colors
  beginner: "#22c55e", // green-500
  intermediate: "#eab308", // yellow-500
  advancedDifficulty: "#ef4444", // red-500
} as const;

// Animation timing presets
export const ANIMATION_DURATION = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
} as const;

// Animation easing presets
export const ANIMATION_EASING = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// Responsive breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Z-index scale
export const Z_INDEX = {
  dropdown: 50,
  sticky: 100,
  modal: 200,
  popover: 300,
  tooltip: 400,
  toast: 500,
} as const;

// Spacing scale (in pixels, based on 4px grid)
export const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

// Typography scale
export const TYPOGRAPHY = {
  fonts: {
    heading: '"Playfair Display", Georgia, serif',
    body: '"DM Sans", "Plus Jakarta Sans", system-ui, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  sizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Container max-widths
export const CONTAINER = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Border radius scale
export const BORDER_RADIUS = {
  none: "0",
  sm: "0.125rem",
  default: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
} as const;

// Shadow scale
export const SHADOWS = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
} as const;

// Grid configurations
export const GRID = {
  columns: {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4,
  },
  gap: {
    sm: 16,
    md: 24,
    lg: 32,
  },
} as const;
