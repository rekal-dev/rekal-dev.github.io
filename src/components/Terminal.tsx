"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lines = [
  { cmd: 'curl -fsSL https://rekal.dev/install.sh | bash', delay: 0 },
  { out: '  \u2713 Installed to ~/.local/bin/rekal', delay: 800 },
  { out: '', delay: 1000 },
  { cmd: 'rekal init', delay: 1500 },
  { out: 'rekal: initialized .rekal/ with data.db', delay: 2000 },
  { out: 'rekal: installed hooks', delay: 2200 },
  { out: '', delay: 2400 },
  { cmd: 'rekal sync', delay: 2800 },
  { out: 'rekal: fetched 3 branches, imported 12 sessions', delay: 3300 },
  { out: '', delay: 3500 },
  { comment: 'agent is adding SSO \u2014 how was auth done before?', delay: 3900 },
  { cmd: 'rekal "auth middleware role-based access"', delay: 5000 },
  { out: '', delay: 5800 },
  { out: '{"session_id":"01KGR1...","score":0.92,', delay: 6000 },
  { out: ' "snippet":"middleware chain: verify token, extract roles, check permission...",', delay: 6200 },
  { out: ' "snippet_turn_index":14}', delay: 6400 },
  { out: '', delay: 6600 },
  { cmd: 'rekal query --session 01KGR1... --offset 12 --limit 5', delay: 7200 },
  { out: '', delay: 8000 },
  { out: '{"total_turns":51,"has_more":true,', delay: 8200 },
  { out: ' "turns":[', delay: 8400 },
  { out: '  {"role":"human","content":"need role-based access on API routes..."},', delay: 8600 },
  { out: '  {"role":"assistant","content":"middleware chain: authN then authZ..."},', delay: 8800 },
  { out: '  {"role":"human","content":"how to handle admin vs user roles?"},', delay: 9000 },
  { out: '  {"role":"assistant","content":"permission map per role. middleware checks route requirements..."},', delay: 9200 },
  { out: '  {"role":"human","content":"clean, do it"}]}', delay: 9400 },
  { out: '', delay: 9600 },
  { comment: 'agent loaded exact context \u2014 1.0k tokens instead of 24k', delay: 10000 },
];

function colorize(text: string): string {
  return text
    .replace(/("session_id"|"score"|"snippet"|"snippet_turn_index"|"total_turns"|"has_more"|"turns"|"role"|"content")/g, '<span class="text-accent">$1</span>')
    .replace(/("human"|"assistant")/g, '<span class="text-green">$1</span>')
    .replace(/\b(0\.92|true)\b/g, '<span class="text-amber">$1</span>')
    .replace(/(?<=[:,])(\d+)/g, '<span class="text-amber">$1</span>')
    .replace(/(✓)/g, '<span class="text-green">$1</span>');
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
              {"comment" in line ? (
                <span className="text-muted italic"># {line.comment}</span>
              ) : "cmd" in line ? (
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
