"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lines = [
  { cmd: "curl -fsSL https://rekal.dev/install.sh | bash", delay: 0 },
  { out: "", delay: 800 },
  { out: "  ┌─────────────────────────────────┐", delay: 900 },
  { out: "  │         rekal installer          │", delay: 950 },
  { out: "  └─────────────────────────────────┘", delay: 1000 },
  { out: "", delay: 1050 },
  { out: "  \u001b[32m✓\u001b[0m Platform: darwin/arm64", delay: 1200 },
  { out: "  \u001b[32m✓\u001b[0m Version: v0.2.2", delay: 1600 },
  { out: "  \u001b[32m✓\u001b[0m Installed to ~/.local/bin/rekal", delay: 2400 },
  { cmd: "rekal init", delay: 3200 },
  { out: "rekal: initialized .rekal/ with data.db", delay: 3800 },
  { out: "rekal: installed post-commit hook", delay: 4000 },
  { out: "rekal: installed pre-push hook", delay: 4200 },
  { out: 'rekal: wrote skill file to .claude/skills/rekal/', delay: 4400 },
  { cmd: 'rekal "JWT token expiry"', delay: 5200 },
  { out: '{"session_id":"01JNQX...","score":0.87,"snippet":"Fix JWT expiry to use refresh token rotation...","snippet_turn_index":12}', delay: 6000 },
];

function colorize(text: string): string {
  return text
    .replace(/\u001b\[32m/g, '<span class="text-green">')
    .replace(/\u001b\[0m/g, "</span>")
    .replace(/(✓)/g, '<span class="text-green">$1</span>')
    .replace(/(rekal:)/g, '<span class="text-accent">$1</span>')
    .replace(/("session_id"|"score"|"snippet"|"snippet_turn_index")/g, '<span class="text-accent">$1</span>')
    .replace(/(0\.87|12)/g, '<span class="text-amber">$1</span>');
}

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    lines.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-lg border border-border overflow-hidden bg-card shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#0d0d0f]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-muted font-mono">terminal</span>
        </div>
        <div className="p-4 font-mono text-sm leading-6 min-h-[360px] overflow-x-auto">
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="whitespace-pre">
              {"cmd" in line ? (
                <span>
                  <span className="text-green">$</span>{" "}
                  <span className="text-foreground">{line.cmd}</span>
                </span>
              ) : (
                <span
                  className="text-muted"
                  dangerouslySetInnerHTML={{ __html: colorize(line.out!) }}
                />
              )}
            </div>
          ))}
          {visibleLines < lines.length && (
            <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
