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
  // Sizer shares the grid cell with the visible word so baselines match
  // adjacent copy ("it's missing", "has nothing").
  const measure = reserveWidth ? longest : words[i];

  return (
    <span className="rotate-word-slot">
      <span className="invisible whitespace-nowrap col-start-1 row-start-1" aria-hidden>
        {measure}
      </span>
      <span className="rotate-word-clip col-start-1 row-start-1">
        <span key={i} className={`rotate-word ${className}`} aria-live="polite">
          {words[i]}
        </span>
      </span>
    </span>
  );
}
