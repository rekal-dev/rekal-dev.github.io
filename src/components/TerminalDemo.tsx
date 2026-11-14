"use client";

import { useEffect, useState } from "react";

const steps = [
  { label: "1. Context", actor: "your-project / new feature: invoice CSV export", command: 'rekal "invoice export conventions"', lines: ['Memory · exports.md', '  Stream rows. Keep large exports out of memory.', '', 'Conversation · Invoice export design', '  Use UTC timestamps. Exclude internal account IDs.', '  ref: passage:demo-export:12-14'] },
  { label: "2. Source", actor: "your-project / read the original context", command: "rekal query --ref passage:demo-export:12-14", lines: ['[12] Export timestamps in UTC for reconciliation.', '[13] Keep internal account IDs out of the CSV.', '[14] Stream rows so large exports stay bounded.'] },
  { label: "3. Build", actor: "your-project / continue with context", command: 'git commit -m "Add invoice CSV export"', lines: ['# Build the feature. Run the tests. Then commit.', '', '# Rekal checkpoints supported sessions and project notes.', '# Context is ready for the next session or agent.'] },
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
    <figure className="card overflow-hidden shadow-[0_0_70px_-30px_rgba(34,211,238,0.25)]" aria-label="Rekal terminal demo">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 border-b border-border p-4" role="group" aria-label="Choose a walkthrough step">
        {steps.map((s, i) => <button key={s.label} type="button" aria-pressed={active === i} onClick={() => { setPlaying(false); setActive(i); }} className={`min-h-11 rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 ${active === i ? "border-cyan-400 text-cyan-300 bg-cyan-950/30" : "border-border text-muted hover:text-foreground"}`}>{s.label}</button>)}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-8">
        <span className="text-xs font-mono text-muted">NEW FEATURE · CONTEXT READY · {active + 1} / 3</span>
        <button type="button" className="min-h-11 px-3 text-sm text-cyan-300 rounded-md focus-visible:outline-2 focus-visible:outline-cyan-400" onClick={() => { if (!playing) setActive(0); setPlaying(!playing); }} aria-label={playing ? "Pause walkthrough" : "Play walkthrough"}>{playing ? "Ⅱ Pause" : "Play demo →"}</button>
      </div>
      <div key={active} className="demo-frame p-5 sm:p-8 sm:min-h-80" aria-live={playing ? "off" : "polite"} aria-atomic="true">
        <p className="text-xs text-muted font-mono mb-5">{step.actor}</p>
        <pre className="text-sm text-cyan-300 whitespace-pre-wrap break-words leading-7"><code>{step.command.split("\n").map(l => "$ " + l).join("\n")}</code></pre>
        <div className="mt-5 font-mono text-[13px] leading-7 text-foreground/80 whitespace-pre-wrap break-words">{step.lines.map((line, i) => <div key={i} className={playing ? "terminal-line" : ""} style={playing ? { animationDelay: `${i * 280}ms` } : undefined}>{line || "\u00a0"}</div>)}</div>
      </div>
      <figcaption className="px-5 sm:px-8 py-4 border-t border-border text-xs text-muted leading-relaxed">Synthetic context, abbreviated output and illustrative references. This demo assumes captured project history.</figcaption>
    </figure>
  );
}
