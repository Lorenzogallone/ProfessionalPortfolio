import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile, siteUrl } from "@/lib/content";
import "./globals.css";

const title = `${profile.name} · ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Lorenzo Gallone",
    "Full-Stack Engineer",
    "LLM integration",
    "AI engineering",
    "TypeScript",
    "React",
    "Next.js",
    "NestJS",
    "PostgreSQL",
    "Kubernetes",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
  },
  twitter: { card: "summary_large_image", title, description: profile.description },
};

export const viewport: Viewport = {
  themeColor: "#0a1020",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-teal focus:px-3 focus:py-2 focus:text-teal-deep"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
