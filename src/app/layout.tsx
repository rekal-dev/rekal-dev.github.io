import type { Metadata, Viewport } from "next";
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

const TITLE = "Rekal — the memory your AI coding agent is missing";
const DESCRIPTION =
  "Your coding agent starts every session blank. Rekal captures the why behind your code — decisions, rejected paths, dead-ends — at every commit and recalls it next session. Works with Claude Code, Codex, Gemini, OpenCode, and Kiro. Stored in git, not someone else's cloud.";
const SHORT_DESC =
  "The why behind your code — captured at every commit, recalled next session. Works with Claude Code, Codex, Gemini, OpenCode & Kiro. In git, not someone else's cloud.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s · Rekal",
  },
  applicationName: "Rekal",
  description: DESCRIPTION,
  keywords: [
    "rekal",
    "ai coding agent memory",
    "agent memory",
    "rag for code",
    "git-native memory",
    "intent ledger",
    "session history",
    "semantic code search",
    "claude code",
    "codex cli",
    "gemini cli",
    "opencode",
    "kiro",
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
    "arxiv 2607.14390",
    "agentic development lifecycle",
  ],
  authors: [{ name: "Rekal", url: "https://github.com/rekal-dev" }],
  creator: "Rekal",
  publisher: "Rekal",
  category: "technology",
  metadataBase: new URL("https://rekal.dev"),
  alternates: {
    canonical: "https://rekal.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: TITLE,
    description: SHORT_DESC,
    url: "https://rekal.dev",
    siteName: "Rekal",
    type: "website",
    locale: "en_US",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Rekal — git-native memory for AI coding agents", type: "image/png" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHORT_DESC,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "Rekal",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://rekal.dev/#app",
      name: "Rekal",
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "AI coding agent memory",
      operatingSystem: "macOS, Linux",
      description:
        "Git-native memory for AI coding agents. Rekal captures the intent behind every commit — decisions, rejected approaches, dead-ends — and recalls it in the next session. Works with Claude Code, Codex, Gemini, OpenCode, and Kiro.",
      url: "https://rekal.dev",
      downloadUrl: "https://rekal.dev/install.sh",
      softwareHelp: "https://github.com/rekal-dev/rekal-cli#readme",
      license: "https://opensource.org/licenses/Apache-2.0",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: [
        "Captures AI session intent at every git commit",
        "Hybrid recall: BM25 + LSA + Nomic embeddings",
        "Works with Claude Code, Codex, Gemini, OpenCode, and Kiro",
        "Agent-agnostic — teams don't lock into one coding agent",
        "Runs fully local — no server, no API, no telemetry",
        "Distributed through git orphan branches",
        "Single embedded binary",
      ],
      sameAs: [
        "https://github.com/rekal-dev/rekal-cli",
        "https://discord.gg/hDMj8zHH2",
      ],
      publisher: { "@id": "https://rekal.dev/#org" },
    },
    {
      "@type": "Organization",
      "@id": "https://rekal.dev/#org",
      name: "Rekal",
      url: "https://rekal.dev",
      sameAs: [
        "https://github.com/rekal-dev",
        "https://discord.gg/hDMj8zHH2",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rekal.dev/#site",
      url: "https://rekal.dev",
      name: "Rekal",
      description: SHORT_DESC,
      publisher: { "@id": "https://rekal.dev/#org" },
      inLanguage: "en",
    },
    {
      "@type": "ScholarlyArticle",
      "@id": "https://rekal.dev/paper#article",
      headline: "Why Git Is the Memory Solution for the Agentic Development Lifecycle",
      author: { "@type": "Person", name: "Frank Guo" },
      publisher: { "@id": "https://rekal.dev/#org" },
      datePublished: "2026-07",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "arXiv",
        value: "arXiv:2607.14390",
      },
      url: "https://rekal.dev/paper",
      sameAs: ["https://arxiv.org/abs/2607.14390"],
      about: { "@id": "https://rekal.dev/#app" },
      inLanguage: "en",
    },
    {
      "@type": "FAQPage",
      "@id": "https://rekal.dev/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which AI coding agents does Rekal work with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rekal ships tested session adapters for Claude Code, Codex, Gemini, OpenCode, and Kiro, and also works with Cursor and Copilot. Captures at every commit. Agent-agnostic — switch tools without losing team memory.",
          },
        },
        {
          "@type": "Question",
          name: "Does my code or its intent leave my machine?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Rekal never sends data to a server. Intent is stored on a git orphan branch — no server, no API, no telemetry — and the embedding model ships inside the binary.",
          },
        },
        {
          "@type": "Question",
          name: "Why not just use a MEMORY.md file or a RAG SaaS?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A notes file rots, is hand-maintained, and is tied to one branch; a memory SaaS puts your code's intent on someone else's server. Rekal captures context automatically at every commit, immutably and branch-aware, and keeps everything in git and on your machine.",
          },
        },
        {
          "@type": "Question",
          name: "How does an AI agent recall past context with Rekal?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The agent runs rekal \"<problem>\", which returns scored prior sessions plus a knowledge block — pointers into the repo's prose at HEAD — as JSON, using hybrid search (BM25 + LSA + Nomic embeddings). A confidence gate then decides: read the knowledge pointer, drill into the episode, or stay silent.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="me" href="https://github.com/rekal-dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
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
