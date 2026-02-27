"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const lines = [
  { comment: 'agent is adding semantic search — why was Ollama rejected?', delay: 0 },
  { cmd: 'rekal "embedding model Ollama vs in-process"', delay: 1200 },
  { out: '', delay: 2000 },
  { out: '{"session_id":"01KJC1W8...","score":0.91,', delay: 2200 },
  { out: ' "snippet":"Ollama breaks the single-binary principle. Embedded GGUF...",', delay: 2400 },
  { out: ' "snippet_turn_index":76}', delay: 2600 },
  { out: '', delay: 2800 },
  { comment: 'drill into that turn — 5 turns, not the full 82-turn session', delay: 3200 },
  { cmd: 'rekal query --session 01KJC1W8... --offset 74 --limit 5', delay: 4200 },
  { out: '', delay: 5000 },
  { out: '{"total_turns":82,"offset":74,"limit":5,"has_more":true,', delay: 5200 },
  { out: ' "turns":[', delay: 5400 },
  { out: '  {"role":"human","content":"we want nomic-embed-text for deep semantic..."},', delay: 5600 },
  { out: '  {"role":"assistant","content":"Ollama breaks single-binary principle..."},', delay: 5800 },
  { out: '  {"role":"assistant","content":"GGUF in-process, no external server..."},', delay: 6000 },
  { out: '  {"role":"assistant","content":"go-llama.cpp — lightweight CGO, ~5MB..."},', delay: 6200 },
  { out: '  {"role":"human","content":"ship it"}]}', delay: 6400 },
  { out: '', delay: 6600 },
  { comment: '5 turns loaded — 1.2k tokens instead of 38k for the full session', delay: 7000 },
];

function colorize(text: string): string {
  return text
    .replace(/("session_id"|"score"|"snippet"|"snippet_turn_index"|"total_turns"|"offset"|"limit"|"has_more"|"turns"|"role"|"content")/g, '<span class="text-accent">$1</span>')
    .replace(/("human"|"assistant")/g, '<span class="text-green">$1</span>')
    .replace(/\b(0\.91|true)\b/g, '<span class="text-amber">$1</span>')
    .replace(/(?<=[:,])(\d+)/g, '<span class="text-amber">$1</span>');
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
