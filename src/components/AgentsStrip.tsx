"use client";

const AGENTS = [
  "Claude Code",
  "Cursor",
  "Codex",
  "Gemini",
  "Copilot",
  "OpenCode",
  "Kiro",
];

/** Agent compatibility strip — presence without card clutter. */
export default function AgentsStrip() {
  return (
    <section className="border-y border-border" aria-label="Supported agents">
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7">
        {AGENTS.map((name) => (
          <div
            key={name}
            className="flex items-center justify-center px-2 py-5 select-none border-b border-r border-border/70 last:border-r-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(4n)]:border-r-0 md:[&:nth-child(4n)]:border-r md:[&:nth-child(7n)]:border-r-0 md:border-b-0"
          >
            <span className="font-mono text-xs sm:text-sm text-muted tracking-wide">{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
