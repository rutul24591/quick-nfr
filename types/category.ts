// Category Type Definitions

import type { NFRCategory } from "./nfr";

export interface Category {
  id: NFRCategory;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  bgColor: string; // Background color class
  borderColor: string; // Border color class
  nfrCount: number;
  featured: boolean;
}

export interface CategoryWithNFRs extends Category {
  nfrIds: number[];
}
