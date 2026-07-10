import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rekal — the memory your AI coding agent is missing",
  description:
    "Your AI agent starts every session blank. Rekal captures the why behind your code — decisions, rejected paths, dead-ends — at every commit and recalls it next session. Stored in git, not someone else's cloud.",
  keywords: [
    "rekal",
    "ai coding",
    "agent memory",
    "rag",
    "git",
    "intent ledger",
    "session history",
    "semantic search",
    "claude code",
    "developer tools",
    "ai agent",
    "code context",
    "vector search",
    "bm25",
    "duckdb",
    "git hooks",
    "append-only",
    "coding assistant",
    "llm memory",
    "ai pair programming",
    "institutional memory",
  ],
  metadataBase: new URL("https://rekal.dev"),
  alternates: {
    canonical: "https://rekal.dev",
  },
  openGraph: {
    title: "Rekal — the memory your AI coding agent is missing",
    description:
      "The why behind your code — captured at every commit, recalled next session. In git, not someone else's cloud.",
    url: "https://rekal.dev",
    siteName: "Rekal",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Rekal — the memory your AI coding agent is missing" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekal — the memory your AI coding agent is missing",
    description:
      "The why behind your code — captured at every commit, recalled next session. In git, not someone else's cloud.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rekal",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "macOS, Linux",
              description:
                "Git-anchored intent ledger with built-in RAG. Gives your AI coding agent memory of prior sessions — who changed what, why, and when.",
              url: "https://rekal.dev",
              license: "https://opensource.org/licenses/Apache-2.0",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              sourceOrganization: {
                "@type": "Organization",
                name: "Rekal",
                url: "https://github.com/rekal-dev",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
