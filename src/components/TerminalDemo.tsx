"use client";

import { useState } from "react";

const steps = [
  { label: "1. Keep the decision", actor: "Dana · Claude Code · yesterday", command: 'git commit -m "Add jitter to webhook retries"', lines: ["Project conversation: fixed delays made retries arrive together.", "Project note: use jitter; preserve the retry budget.", "Rekal captures supported sessions and project notes at checkpoint."], outcome: "After merge and push, eligible records are available through Git." },
  { label: "2. Find it again", actor: "Sam · Codex · today", command: 'rekal sync\nrekal "why do webhook retries use jitter?"', lines: ["Conversation lead → the retry design discussion", "Memory match → the project's retry note", "Choose a source reference returned by search."], outcome: "A teammate can discover the decision without knowing who made it." },
  { label: "3. Read before changing", actor: "Sam · Codex · same task", command: "rekal query --ref <returned-reference>", lines: ["Original discussion: fixed delays synchronized failing deliveries.", "Decision: spread retries with jitter, within a bounded budget.", "Read the source; check today's implementation and tests."], outcome: "Continue the work with the reason in view—not just the final note." },
];

export default function TerminalDemo() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  return (
    <figure className="card mt-12 overflow-hidden" aria-label="Rekal handoff walkthrough">
      <div className="flex flex-wrap gap-2 border-b border-border p-4" role="group" aria-label="Choose a walkthrough step">
        {steps.map((s, i) => <button key={s.label} type="button" aria-pressed={active === i} onClick={() => setActive(i)} className={`rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${active === i ? "border-cyan-400 text-cyan-300 bg-cyan-950/30" : "border-border text-muted hover:text-foreground"}`}>{s.label}</button>)}
      </div>
      <div className="p-5 sm:p-8" aria-live="polite" aria-atomic="true">
        <p className="text-xs text-muted font-mono mb-5">{step.actor}</p>
        <pre className="text-sm sm:text-base text-cyan-300 whitespace-pre-wrap break-words leading-7"><code>{step.command.split("\n").map(l => "$ " + l).join("\n")}</code></pre>
        <div className="mt-6 border-l-2 border-violet pl-4 space-y-3 text-sm sm:text-base text-muted leading-relaxed">{step.lines.map(l => <p key={l}>{l}</p>)}</div>
        <p className="mt-7 text-foreground font-medium">{step.outcome}</p>
      </div>
      <figcaption className="px-5 sm:px-8 py-4 border-t border-border text-xs text-muted leading-relaxed">Illustrative walkthrough with synthetic project content. Commands are real; result descriptions are abbreviated, not a recording of CLI output. No automatic note-to-conversation link is implied.</figcaption>
    </figure>
  );
}
