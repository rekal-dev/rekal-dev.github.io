"use client";

import { motion } from "framer-motion";

/**
 * Entire-style product demo: a commit on the left, a pulsing link, and the
 * session that produced it on the right — the "intent attached to git" beat.
 */
export default function CheckpointSync() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="flex flex-col gap-0 font-mono text-sm">
        {/* Ghost commits above */}
        <div className="flex items-stretch gap-4 opacity-40">
          <div className="flex flex-col items-center">
            <div className="size-3.5 rounded-full border border-border bg-card" />
            <div className="w-px flex-1 min-h-8 bg-border" />
          </div>
          <div className="flex flex-1 items-center gap-3 pb-6">
            <div className="h-3 flex-1 rounded border border-border bg-card-hi/60" />
            <div className="h-3 w-20 shrink-0 rounded border border-border bg-card-hi/60" />
          </div>
        </div>

        {/* Active commit ↔ session */}
        <div className="flex items-stretch gap-4">
          <div className="flex flex-col items-center pt-2">
            <div className="size-3.5 rounded-full border border-accent/50 bg-accent/20 shadow-[0_0_12px_color-mix(in_oklab,var(--color-accent)_40%,transparent)]" />
            <div className="w-px flex-1 min-h-10 bg-border" />
          </div>
          <div className="mb-6 flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3">
            <div className="ring-grad flex h-10 min-w-0 flex-1 items-center gap-3 px-3">
              <span className="shrink-0 text-[11px] tracking-wider text-muted">a1b2c3d</span>
              <span className="truncate text-foreground">webhooks: exponential backoff</span>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 shrink-0" aria-hidden>
              <svg className="w-7 h-2" viewBox="0 0 28 8" fill="none">
                <path
                  className="sync-dash"
                  d="M0 4H28"
                  stroke="var(--color-border-hi)"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
              </svg>
              <div className="relative grid place-items-center size-9">
                <div className="sync-halo absolute inset-0 rounded-full bg-accent/25 blur-md" />
                <div className="relative size-8 rounded-full border border-accent/30 bg-card grid place-items-center text-accent">
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path
                      d="M1 9H6M12 9H17M9 5.5L12.5 9L9 12.5L5.5 9L9 5.5Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <svg className="w-7 h-2" viewBox="0 0 28 8" fill="none">
                <path
                  className="sync-dash"
                  d="M0 4H28"
                  stroke="var(--color-border-hi)"
                  strokeWidth="1.5"
                  strokeDasharray="3 5"
                />
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0.7, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="ring-grad flex h-10 shrink-0 items-center gap-2 px-3 text-xs text-muted"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-foreground">1 session</span>
              <span className="text-faint hidden xs:inline">· 214 turns</span>
            </motion.div>
          </div>
        </div>

        {/* Ghost commits below */}
        <div className="flex items-stretch gap-4 opacity-40">
          <div className="flex flex-col items-center">
            <div className="size-3.5 rounded-full border border-border bg-card" />
            <div className="w-px flex-1 min-h-8 bg-border" />
          </div>
          <div className="flex flex-1 items-center gap-3 pb-6">
            <div className="h-3 flex-1 rounded border border-border bg-card-hi/60" />
            <div className="h-3 w-24 shrink-0 rounded border border-border bg-card-hi/60" />
          </div>
        </div>
        <div className="flex items-stretch gap-4 opacity-25">
          <div className="flex flex-col items-center">
            <div className="size-3.5 rounded-full border border-border bg-card" />
          </div>
          <div className="flex flex-1 items-center gap-3">
            <div className="h-3 flex-1 rounded border border-border bg-card-hi/60" />
            <div className="h-3 w-16 shrink-0 rounded border border-border bg-card-hi/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
