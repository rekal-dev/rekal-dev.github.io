"use client";

import { useEffect, useState } from "react";

const DEFAULT_WORDS = ["intent", "why", "reasoning"];

/**
 * Entire-style rotating word. Gradient must sit on the text node
 * (`color: transparent` + `background-clip: text`), not the wrapper.
 *
 * `reserveWidth` keeps layout stable for short swaps (Problem section).
 * Hero phrases vary a lot — leave it off so the line stays centered.
 */
export default function RotatingWord({
  words = DEFAULT_WORDS,
  className = "",
  interval = 2400,
  reserveWidth = true,
}: {
  words?: string[];
  className?: string;
  interval?: number;
  reserveWidth?: boolean;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || words.length < 2) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words, interval]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), words[0] ?? "");

  if (!reserveWidth) {
    return (
      <span className="relative inline-block overflow-hidden align-baseline">
        <span key={i} className={`rotate-word inline-block ${className}`} aria-live="polite">
          {words[i]}
        </span>
      </span>
    );
  }

  return (
    <span className="relative inline-block overflow-hidden align-baseline">
      <span className="invisible whitespace-nowrap" aria-hidden>
        {longest}
      </span>
      <span
        key={i}
        className={`rotate-word absolute left-0 top-0 whitespace-nowrap ${className}`}
        aria-live="polite"
      >
        {words[i]}
      </span>
    </span>
  );
}
