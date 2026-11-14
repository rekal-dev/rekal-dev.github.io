"use client";

import { useEffect, useState } from "react";
import story from "@/lib/demo-story.json";

const duration = 28000;
const stages = [
  { label: "Build", detail: "Alex + Claude Code", time: 4000 },
  { label: "Share", detail: "Your existing Git remote", time: 12000 },
  { label: "Continue", detail: "Sam + Codex", time: duration },
];

export default function TerminalDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const finished = elapsed >= duration;
  const stage = elapsed < 11000 ? 0 : elapsed < 17000 ? 1 : 2;
  useEffect(() => {
    if (paused || finished) return;
    const timer = window.setInterval(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setElapsed(t => reduced ? duration : Math.min(duration, t + 100));
    }, 100);
    return () => window.clearInterval(timer);
  }, [paused, finished]);

  return (
    <figure aria-label="Animated team handoff: Alex builds, Sam extends" className="handoff-demo w-full">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-sm text-muted">Two teammates. Different agents. Shared context.</p>
        <button type="button" className="min-h-11 px-3 text-sm text-cyan-300 rounded-md focus-visible:outline-2 focus-visible:outline-cyan-400"
          onClick={() => { if (finished) setElapsed(0); setPaused(finished ? false : !paused); }}>
          {finished ? "Replay demo" : paused ? "Play demo" : "Pause demo"}
        </button>
      </div>
      <div className="handoff-stages" role="group" aria-label="Explore the team workflow">
        {stages.map((item, i) => <button key={item.label} type="button"
          aria-pressed={stage === i} onClick={() => { setElapsed(item.time); setPaused(true); }}
          className={stage === i ? "handoff-stage is-active" : "handoff-stage"}>
          <span className="handoff-stage-number">{i + 1}</span>
          <span><strong>{item.label}</strong><small>{item.detail}</small></span>
          <span aria-hidden="true" className="handoff-stage-arrow">→</span>
        </button>)}
      </div>
      <div className="handoff-progress" aria-hidden="true"><span style={{ width: `${elapsed / duration * 100}%` }} /></div>
      <div className="grid md:grid-cols-2 gap-4" aria-live="off">
        {story.map(person => (
          <div key={person.name} className={`handoff-terminal ${person.name === "Alex" ? "terminal-alex" : "terminal-sam"}`}>
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5"><i className="w-2 h-2 rounded-full bg-rose-400" /><i className="w-2 h-2 rounded-full bg-amber-400" /><i className="w-2 h-2 rounded-full bg-emerald-400" /></span>
              <span className="ml-2 text-sm font-mono">{person.name} · {person.agent}</span>
            </div>
            <div className="p-5 font-mono text-sm leading-6 min-h-[450px]">
              <p className="text-xs text-violet mb-5 uppercase tracking-wider">{person.label}</p>
              {person.rows.map((row, i) => {
                const age = elapsed - row.at * 1000;
                const shown = age >= 0;
                const text = row.kind === "prompt" ? row.text.slice(0, Math.max(0, Math.floor(age / 28))) : row.text;
                if (person.name === "Sam" && i === 2) return <div key={i} className={`handoff-source mb-4 ${shown ? "" : "invisible"}`}>
                  <span className="handoff-source-label">RECALLED CONTEXT</span>
                  <strong>Alex’s session · Claude Code</strong>
                  <p>{row.text}</p>
                  <span className="handoff-source-origin">Shared through Git · original session read</span>
                </div>;
                return <div key={i} className={`mb-4 break-words ${shown ? "" : "invisible"} ${row.kind === "prompt" ? "text-cyan-300" : row.kind === "status" ? "text-emerald-300 text-xs" : row.kind === "tool" ? "text-violet text-xs" : "text-foreground/85"}`}>
                  {row.kind === "prompt" ? <><span aria-hidden="true">❯ </span>{text}<span className="invisible">{row.text.slice(text.length)}</span></> : row.text}
                </div>;
              })}
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-4 text-xs text-muted leading-relaxed">Illustrative agent sessions with synthetic content, not a recorded run. After setup, ask your agent in plain language. Shared context requires capture, merge/push and sync.</figcaption>
    </figure>
  );
}
