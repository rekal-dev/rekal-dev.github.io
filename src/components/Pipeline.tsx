"use client";

import { motion } from "framer-motion";

const steps = [
  {
    k: "commit",
    t: "Commit",
    d: "A post-commit hook snapshots the AI conversation that produced the change into an append-only log.",
    icon: "M12 2v14M12 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  },
  {
    k: "push",
    t: "Push",
    d: "Only merged work rides a git orphan branch to your team. No server, no API, no telemetry.",
    icon: "M12 19V5M5 12l7-7 7 7",
  },
  {
    k: "recall",
    t: "Recall",
    d: 'rekal "<problem>" returns scored prior context as JSON your agent drills into — cheapest turns first.',
    icon: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.35-4.35",
  },
];

export default function Pipeline() {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Flowing connector line (desktop) */}
      <svg
        className="hidden md:block absolute left-0 right-0 top-[46px] w-full h-2 overflow-visible"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b7cf6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <line x1="16%" y1="4" x2="84%" y2="4" stroke="var(--color-border-hi)" strokeWidth="1.5" />
        <line
          x1="16%"
          y1="4"
          x2="84%"
          y2="4"
          stroke="url(#flow)"
          strokeWidth="2"
          strokeDasharray="14 220"
          className="flow-dash"
        />
      </svg>

      <div className="grid md:grid-cols-3 gap-6 relative">
        {steps.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="text-center px-4"
          >
            <div className="relative mx-auto mb-5 w-14 h-14 grid place-items-center">
              <div className="absolute inset-0 rounded-2xl bg-accent/10 border border-accent/20" />
              <div
                className="node-pulse absolute inset-0 rounded-2xl bg-accent/20 blur-md"
                style={{ "--np": `${i * 1.05}s` } as React.CSSProperties}
              />
              <svg
                className="relative w-6 h-6 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={s.icon} />
              </svg>
            </div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-xs font-mono text-faint">0{i + 1}</span>
              <span className="font-mono text-sm text-accent">{s.k}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">{s.d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
