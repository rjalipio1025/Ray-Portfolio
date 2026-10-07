import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { CommandPalette } from "@/components/command/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SideRail } from "@/components/layout/SideRail";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { RevealObserver } from "@/components/providers/RevealObserver";
import { SpotlightTracker } from "@/components/providers/SpotlightTracker";
import { site } from "@/content/site";
import { themeBootstrapScript } from "@/lib/theme-script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "IT Systems Administrator",
    "Endpoint Management",
    "Microsoft Intune",
    "Windows Autopilot",
    "Jamf Pro",
    "Entra ID",
    "Okta",
    "Identity and Access Management",
    "Microsoft 365",
    "Google Workspace",
    "IT Operations",
    "Ray Joseph Alipio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.seoTitle,
    description: site.description,
    locale: "en_US",
    firstName: "Ray Joseph",
    lastName: "Alipio",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seoTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#070b12" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      {/* Extensions such as Grammarly add attributes to <body> before React hydrates. */}
      <body className="min-h-dvh bg-bg text-fg" suppressHydrationWarning>
        <div aria-hidden="true" className="schematic-bg" />
        <a
          href="#main"
          className="sr-only z-[60] rounded-lg bg-accent px-4 py-2.5 font-medium text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
            {children}
          </main>
          <Footer />
          <SideRail />
          <CommandPalette />
        </MotionProvider>
        <RevealObserver />
        <SpotlightTracker />
      </body>
    </html>
  );
}
