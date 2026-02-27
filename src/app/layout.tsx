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
  ],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
