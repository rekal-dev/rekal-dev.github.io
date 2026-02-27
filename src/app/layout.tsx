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
  title: "Rekal — Git-anchored intent ledger with built-in RAG",
  description:
    "Agent-first intent ledger anchored to git. RAG-queryable team intent history alongside git commits. Your agent starts every session knowing exactly why — with minimal token cost.",
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
  alternates: {
    canonical: "https://rekal.dev",
  },
  openGraph: {
    title: "Rekal — Git-anchored intent ledger with built-in RAG",
    description:
      "Your agent starts every session knowing exactly why — with minimal token cost.",
    url: "https://rekal.dev",
    siteName: "Rekal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rekal — Git-anchored intent ledger with built-in RAG",
    description:
      "Your agent starts every session knowing exactly why — with minimal token cost.",
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
