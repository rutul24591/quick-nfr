import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/animations.css";
import "@/styles/theme.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Font configurations
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: {
    default: "NFR Guide - Non-Functional Requirements Learning Platform",
    template: "%s | NFR Guide",
  },
  description:
    "Master 85 essential Non-Functional Requirements for building better software. Comprehensive learning platform covering frontend, backend, shared, and advanced NFRs.",
  keywords: [
    "non-functional requirements",
    "NFR",
    "software architecture",
    "performance",
    "scalability",
    "accessibility",
    "security",
    "software engineering",
  ],
  authors: [{ name: "NFR Guide Team" }],
  creator: "NFR Guide",
  publisher: "NFR Guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nfr-guide.dev",
    siteName: "NFR Guide",
    title: "NFR Guide - Non-Functional Requirements Learning Platform",
    description:
      "Master 85 essential Non-Functional Requirements for building better software.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NFR Guide - Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFR Guide - Non-Functional Requirements Learning Platform",
    description:
      "Master 85 essential Non-Functional Requirements for building better software.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

// Viewport configuration
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (theme === 'system' && prefersDark) || (!theme && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
