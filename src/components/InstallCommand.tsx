"use client";

import { useState } from "react";

const INSTALL_CMD = "curl -fsSL https://rekal.dev/install.sh | bash";

export default function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy install command"
      className="group ring-grad flex w-full max-w-xl items-center gap-3 px-4 py-3.5 font-mono text-sm text-left cursor-pointer transition-transform hover:-translate-y-0.5"
    >
      <span className="text-accent select-none">$</span>
      <span className="text-foreground truncate">
        curl -fsSL <span className="text-muted">https://rekal.dev/install.sh</span> | bash
      </span>
      <span className="ml-auto flex items-center gap-1.5 text-xs text-faint group-hover:text-accent transition-colors shrink-0">
        {copied ? (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span className="text-green">copied</span>
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            <span>copy</span>
          </>
        )}
      </span>
    </button>
  );
}
