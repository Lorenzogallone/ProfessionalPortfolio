import type { Metadata, Viewport } from "next";
import { Archivo, STIX_Two_Text } from "next/font/google";
import { Effects } from "@/components/Effects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile, siteUrl } from "@/lib/content";
import "./globals.css";

// Archivo with its width axis: wide and heavy for display, normal for reading.
const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], display: "swap", variable: "--font-archivo" });
// A math-flavoured serif, only for the TIGER figure.
const stix = STIX_Two_Text({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-stix",
  preload: false,
});

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
  themeColor: "#16130f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${stix.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-signal focus:px-3 focus:py-2 focus:text-asphalt"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Effects />
      </body>
    </html>
  );
}
