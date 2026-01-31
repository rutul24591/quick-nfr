import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for SSG
  output: "export",

  // Image optimization configuration
  images: {
    unoptimized: true, // Required for static export
  },

  // Strict mode for better development experience
  reactStrictMode: true,

  // Trailing slashes for consistent URLs
  trailingSlash: true,
};

export default nextConfig;
