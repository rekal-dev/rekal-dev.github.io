import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { TITLE, DESCRIPTION } from "@/lib/marketing";
const SHORT_DESC = DESCRIPTION;

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s · Rekal",
  },
  applicationName: "Rekal",
  description: DESCRIPTION,
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
      {
        url: "/og-v2.png",
        width: 1200,
        height: 630,
        alt: "Rekal — git-native memory for AI coding agents",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHORT_DESC,
    images: ["/og-v2.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="me" href="https://github.com/rekal-dev" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
