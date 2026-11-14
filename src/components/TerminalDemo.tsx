"use client";

import { useEffect, useState } from "react";

const steps = [
  { label: "1. Capture", actor: "dana / webhook-service / Claude Code", command: 'git commit -m "Add jitter to webhook retries"', lines: ['# Earlier in this session', 'Dana: Fixed delays made retries arrive together.', 'Claude: Add jitter; keep the retry budget bounded.', '', '# Commit checkpoints the session and project notes.', '# Eligible records travel after merge and push.'] },
  { label: "2. Search", actor: "sam / webhook-service / Codex", command: 'rekal sync\nrekal "why do webhook retries use jitter?"', lines: ['Conversation · Webhook retry design', '  "Fixed delays made retries arrive together."', '  ref: passage:demo-webhook:12-14', '', 'Memory · retry-policy.md', '  "Use jitter; preserve the retry budget."'] },
  { label: "3. Read", actor: "sam / webhook-service / Codex", command: "rekal query --ref passage:demo-webhook:12-14", lines: ['[12] Dana: Fixed delays synchronized failing deliveries.', '[13] Claude: Spread retries with jitter.', '[14] Dana: Keep the total retry budget bounded.', '', '# Check the current implementation against this context.'] },
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
        <button type="button" className="min-h-11 px-3 text-sm text-cyan-300 rounded-md focus-visible:outline-2 focus-visible:outline-cyan-400" onClick={() => { if (!playing) setActive(0); setPlaying(!playing); }} aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}>{playing ? "Ⅱ Pause" : "Play story →"}</button>
      </div>
      <div key={active} className="demo-frame p-5 sm:p-8 sm:min-h-80" aria-live={playing ? "off" : "polite"} aria-atomic="true">
        <p className="text-xs text-muted font-mono mb-5">{step.actor}</p>
        <pre className="text-sm text-cyan-300 whitespace-pre-wrap break-words leading-7"><code>{step.command.split("\n").map(l => "$ " + l).join("\n")}</code></pre>
        <div className="mt-5 font-mono text-[13px] leading-7 text-foreground/80 whitespace-pre-wrap break-words">{step.lines.map((line, i) => <div key={i} className={playing ? "terminal-line" : ""} style={playing ? { animationDelay: `${i * 280}ms` } : undefined}>{line || "\u00a0"}</div>)}</div>
      </div>
      <figcaption className="px-5 sm:px-8 py-4 border-t border-border text-xs text-muted leading-relaxed">Illustrative walkthrough with synthetic project content. Commands are real; output is abbreviated and references are illustrative. This is not a recording of CLI output.</figcaption>
    </figure>
  );
}
