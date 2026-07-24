"use client";

import { useEffect, useState } from "react";

const WORDS = ["intent", "why", "reasoning"];

/**
 * Entire-style rotating word. Layout stays stable via an invisible sizer.
 */
export default function RotatingWord({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % WORDS.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  const longest = WORDS.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <span className="invisible whitespace-nowrap" aria-hidden>
        {longest}
      </span>
      {WORDS.map((w, idx) => (
        <span
          key={w}
          className="absolute left-0 top-0 whitespace-nowrap transition-[opacity,transform] duration-500 ease-out"
          style={{
            opacity: idx === i ? 1 : 0,
            transform: idx === i ? "translateY(0)" : "translateY(0.3em)",
          }}
          aria-hidden={idx !== i}
        >
          {w}
        </span>
      ))}
      <span className="sr-only">{WORDS[i]}</span>
    </span>
  );
}
