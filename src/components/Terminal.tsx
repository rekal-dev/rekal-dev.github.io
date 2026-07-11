"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Line =
  | { cmd: string; delay: number }
  | { out: string; delay: number }
  | { comment: string; delay: number };

const lines: Line[] = [
  { cmd: 'git commit -m "webhooks: switch retries to exponential backoff"', delay: 0 },
  { out: "rekal: captured 1 session, 214 turns", delay: 800 },
  { out: "", delay: 1000 },
  { comment: "next week — a different agent, same question", delay: 1500 },
  { cmd: 'rekal "should webhook retries use a fixed delay?"', delay: 2600 },
  { out: "", delay: 3300 },
  { out: '{"session_id":"01JNQX8F2K9M","score":0.87,', delay: 3500 },
  { out: '  "snippet":"no — a fixed 5s delay stampedes the downstream on', delay: 3750 },
  { out: '            recovery. use exponential backoff with jitter.",', delay: 3950 },
  { out: '  "snippet_role":"human_steering"}', delay: 4150 },
  { out: "", delay: 4400 },
  { cmd: "rekal query --session 01JNQX8F2K9M --role human_steering", delay: 5100 },
  { out: "", delay: 5800 },
  { out: '{"turns":[', delay: 6000 },
  { out: '  {"role":"human_steering",', delay: 6200 },
  { out: '   "content":"don’t retry on a fixed delay — it stampedes on recovery"},', delay: 6400 },
  { out: '  {"role":"assistant",', delay: 6650 },
  { out: '   "content":"switched to exponential backoff with full jitter"}]}', delay: 6850 },
  { out: "", delay: 7150 },
  { comment: "the dead-end was already ruled out — before it got re-proposed", delay: 7700 },
];

function colorize(text: string): string {
  return text
    .replace(
      /("session_id"|"score"|"snippet"|"snippet_role"|"turns"|"role"|"content")/g,
      '<span class="text-accent">$1</span>',
    )
    .replace(/("human_steering"|"human"|"assistant")/g, '<span class="text-green">$1</span>')
    .replace(/\b(0\.87|true)\b/g, '<span class="text-amber">$1</span>')
    .replace(/(?<=[:,])(\d+)\b/g, '<span class="text-amber">$1</span>');
}

export default function Terminal() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    (async () => {
      if (reduce) {
        setVisible(lines.length);
        return;
      }
      let prev = 0;
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) return;
        const line = lines[i];
        await sleep(Math.max(0, line.delay - prev));
        prev = line.delay;
        if (cancelled) return;
        if ("cmd" in line) {
          // Type the command character by character, like a human at a prompt.
          for (let c = 1; c <= line.cmd.length; c++) {
            if (cancelled) return;
            setTyping(line.cmd.slice(0, c));
            await sleep(13);
          }
          setTyping(null);
        }
        setVisible(i + 1);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visible, typing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="ring-grad glow-accent overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/80 bg-[#0b0b0e]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-faint font-mono">rekal — recall</span>
          <span className="ml-auto text-[10px] text-faint font-mono tracking-wider">git-native · local</span>
        </div>
        <div
          ref={scrollRef}
          className="p-4 sm:p-5 font-mono text-[13px] leading-6 h-[380px] overflow-y-auto overflow-x-auto scroll-smooth"
        >
          {lines.slice(0, visible).map((line, i) => (
            <div key={i} className="whitespace-pre">
              {"comment" in line ? (
                <span className="text-faint italic"># {line.comment}</span>
              ) : "cmd" in line ? (
                <span>
                  <span className="text-accent">❯</span>{" "}
                  <span className="text-foreground">{line.cmd}</span>
                </span>
              ) : (
                <span
                  className="text-muted"
                  dangerouslySetInnerHTML={{ __html: colorize(line.out) }}
                />
              )}
            </div>
          ))}
          {typing !== null && (
            <div className="whitespace-pre">
              <span className="text-accent">❯</span>{" "}
              <span className="text-foreground">{typing}</span>
              <span className="inline-block w-[7px] h-[15px] translate-y-[2px] bg-accent" />
            </div>
          )}
          {typing === null && visible < lines.length && (
            <span className="inline-block w-[7px] h-[15px] translate-y-[2px] bg-accent animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
