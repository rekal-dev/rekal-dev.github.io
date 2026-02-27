"use client";

import { useState } from "react";

const INSTALL_CMD = "curl -fsSL https://rekal.dev/install.sh | bash";

export default function InstallCommand() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="group flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-3 font-mono text-sm transition-all hover:border-accent/50 hover:bg-accent/5 cursor-pointer"
    >
      <span className="text-green">$</span>
      <span className="text-foreground">{INSTALL_CMD}</span>
      <span className="ml-auto text-muted group-hover:text-accent transition-colors">
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </span>
    </button>
  );
}
