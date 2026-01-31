import { MetadataRoute } from "next";
import { getAllNFRMetadata } from "@/lib/nfr";
import { CATEGORIES } from "@/lib/constants/categories";

// Required for static export
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nfr-guide.dev";

  // Get all NFRs for dynamic routes
  const allNFRs = getAllNFRMetadata();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = Object.keys(CATEGORIES).map(
    (category) => ({
      url: `${baseUrl}/categories/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // NFR detail pages
  const nfrPages: MetadataRoute.Sitemap = allNFRs.map((nfr) => ({
    url: `${baseUrl}/categories/${nfr.category}/${nfr.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...nfrPages];
}
