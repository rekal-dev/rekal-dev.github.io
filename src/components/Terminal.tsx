"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Line =
  | { cmd: string; delay: number }
  | { out: string; delay: number; tone?: "accent" | "green" | "amber" | "muted" }
  | { comment: string; delay: number };

const lines: Line[] = [
  { cmd: 'git commit -m "webhooks: switch retries to exponential backoff"', delay: 0 },
  { out: "rekal: captured 1 session · 214 turns", delay: 700, tone: "muted" },
  { out: "", delay: 950 },
  { comment: "next week — a different agent, same question", delay: 1400 },
  { cmd: 'rekal "should webhook retries use a fixed delay?"', delay: 2400 },
  { out: "", delay: 3000 },
  { out: "INJECT top=0.81 gap=0.28  2 seeds", delay: 3200, tone: "accent" },
  {
    out: '  01JNQX8F2K9M conf=0.81 t14 [reached 3× · "webhook retry policy"]',
    delay: 3450,
    tone: "green",
  },
  {
    out: '  "no, a fixed 5s delay stampedes the downstream on recovery.',
    delay: 3700,
  },
  { out: '   Use exponential backoff with jitter…"', delay: 3900 },
  { out: "", delay: 4200 },
  { cmd: "rekal query --session 01JNQX8F2K9M --role human_steering", delay: 4900 },
  { out: "", delay: 5500 },
  { out: "human_steering  t14", delay: 5700, tone: "amber" },
  {
    out: "don’t retry on a fixed delay — it stampedes on recovery",
    delay: 5950,
  },
  { out: "", delay: 6300 },
  { comment: "dead-end already ruled out — before it got re-proposed", delay: 6800 },
];

function lineClass(line: Line): string {
  if ("tone" in line && line.tone === "accent") return "text-accent";
  if ("tone" in line && line.tone === "green") return "text-green";
  if ("tone" in line && line.tone === "amber") return "text-amber";
  if ("tone" in line && line.tone === "muted") return "text-faint";
  return "text-muted";
}

export default function Terminal() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState<string | null>(null);
  const [runId, setRunId] = useState(0);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceRef = useRef(false);

  const replay = useCallback(() => {
    setVisible(0);
    setTyping(null);
    setDone(false);
    setRunId((n) => n + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduceRef.current = reduce;
    const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    (async () => {
      if (reduce) {
        setVisible(lines.length);
        setDone(true);
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
          for (let c = 1; c <= line.cmd.length; c++) {
            if (cancelled) return;
            setTyping(line.cmd.slice(0, c));
            await sleep(12);
          }
          setTyping(null);
        }
        setVisible(i + 1);
      }
      if (!cancelled) setDone(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [runId]);

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
          <button
            type="button"
            onClick={replay}
            disabled={!done && !reduceRef.current}
            className="ml-auto text-[10px] text-faint font-mono tracking-wider hover:text-accent transition-colors disabled:opacity-40 disabled:hover:text-faint cursor-pointer disabled:cursor-default"
            aria-label="Replay demo"
          >
            {done ? "replay ↺" : "git-native · local"}
          </button>
        </div>
        <div
          ref={scrollRef}
          className="p-4 sm:p-5 font-mono text-[13px] leading-6 h-[380px] overflow-y-auto overflow-x-auto scroll-smooth"
        >
          {lines.slice(0, visible).map((line, i) => (
            <div key={`${runId}-${i}`} className="whitespace-pre">
              {"comment" in line ? (
                <span className="text-faint italic"># {line.comment}</span>
              ) : "cmd" in line ? (
                <span>
                  <span className="text-accent">❯</span>{" "}
                  <span className="text-foreground">{line.cmd}</span>
                </span>
              ) : (
                <span className={lineClass(line)}>{line.out}</span>
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
