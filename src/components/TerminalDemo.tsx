"use client";

import { useEffect, useState } from "react";

const steps = [
  { label: "1. Keep the decision", actor: "Dana · Claude Code · yesterday", command: 'git commit -m "Add jitter to webhook retries"', lines: ["Project conversation: fixed delays made retries arrive together.", "Project note: use jitter; preserve the retry budget.", "Rekal captures supported sessions and project notes at checkpoint."], outcome: "After merge and push, eligible records are available through Git." },
  { label: "2. Find it again", actor: "Sam · Codex · today", command: 'rekal sync\nrekal "why do webhook retries use jitter?"', lines: ["Conversation lead → the retry design discussion", "Memory match → the project's retry note", "Choose a source reference returned by search."], outcome: "A teammate can discover the decision without knowing who made it." },
  { label: "3. Read before changing", actor: "Sam · Codex · same task", command: "rekal query --ref <returned-reference>", lines: ["Original discussion: fixed delays synchronized failing deliveries.", "Decision: spread retries with jitter, within a bounded budget.", "Read the source; check today's implementation and tests."], outcome: "Continue the work with the reason in view—not just the final note." },
];

export default function TerminalDemo() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active === steps.length - 1) setPlaying(false);
      else setActive(active + 1);
    }, 7000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);
  const step = steps[active];
  return (
    <figure className="card overflow-hidden shadow-[0_0_70px_-30px_rgba(34,211,238,0.25)]" aria-label="Rekal handoff walkthrough">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b border-border p-4" role="group" aria-label="Choose a walkthrough step">
        {steps.map((s, i) => <button key={s.label} type="button" aria-pressed={active === i} onClick={() => { setPlaying(false); setActive(i); }} className={`min-h-11 rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${active === i ? "border-cyan-400 text-cyan-300 bg-cyan-950/30" : "border-border text-muted hover:text-foreground"}`}>{s.label}</button>)}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-8">
        <span className="text-xs font-mono text-muted">PROJECT HANDOFF · {active + 1} / 3</span>
        <button type="button" className="min-h-11 px-3 text-sm text-cyan-300 rounded-md focus-visible:outline-2 focus-visible:outline-cyan-400" onClick={() => { if (!playing) setActive(0); setPlaying(!playing); }} aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}>{playing ? "Ⅱ Pause" : "▶ Play story"}</button>
      </div>
      <div key={active} className="demo-frame p-5 sm:p-8 sm:min-h-80" aria-live={playing ? "off" : "polite"} aria-atomic="true">
        <p className="text-xs text-muted font-mono mb-5">{step.actor}</p>
        <pre className="text-sm text-cyan-300 whitespace-pre-wrap break-words leading-7"><code>{step.command.split("\n").map(l => "$ " + l).join("\n")}</code></pre>
        <div className="mt-6 border-l-2 border-violet pl-4 space-y-3 text-sm text-muted leading-relaxed">{step.lines.map(l => <p key={l}>{l}</p>)}</div>
        <p className="mt-7 text-foreground font-medium">{step.outcome}</p>
      </div>
      <figcaption className="px-5 sm:px-8 py-4 border-t border-border text-xs text-muted leading-relaxed">Illustrative walkthrough with synthetic project content. Commands are real; result descriptions are abbreviated, not a recording of CLI output. No automatic note-to-conversation link is implied.</figcaption>
    </figure>
  );
}
