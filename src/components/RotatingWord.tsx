"use client";

import { useEffect, useState } from "react";

const WORDS = ["intent", "why", "reasoning"];

/**
 * Entire-style rotating word. Gradient must sit on the text node
 * (`color: transparent` + `background-clip: text`), not the wrapper.
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
    <span className="relative inline-block align-baseline">
      <span className="invisible whitespace-nowrap" aria-hidden>
        {longest}
      </span>
      <span
        className={`absolute left-0 top-0 whitespace-nowrap ${className}`}
        aria-live="polite"
      >
        {WORDS[i]}
      </span>
    </span>
  );
}
