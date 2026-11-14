"use client";

import { useEffect } from "react";
import { trackInstallAction } from "@/lib/analytics";
import Script from "next/script";

const GA_MEASUREMENT_ID = "G-WCNBK5HH2Z";

/** Google Analytics 4 — page visits for rekal.dev. */
export default function Analytics() {
  useEffect(() => {
    const trackLink = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === "/install.sh") {
        trackInstallAction("installer_view");
      } else if (url.hostname === "github.com" && /^\/rekal-dev\/rekal-cli\/releases(?:\/|$)/.test(url.pathname)) {
        trackInstallAction("releases_open");
      }
    };
    document.addEventListener("click", trackLink);
    return () => document.removeEventListener("click", trackLink);
  }, []);
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
