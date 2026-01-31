"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { ToastProvider } from "@/components/ui/Toast";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="theme">
      <SearchProvider>
        <ToastProvider>{children}</ToastProvider>
      </SearchProvider>
    </ThemeProvider>
  );
}
