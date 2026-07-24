"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a number up to `value` when it scrolls into view. `prefix`/`suffix`
 * wrap it (e.g. "~", "B"). Pass `decimals` to force precision (e.g. 5.9, 90.6).
 */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1100,
  decimals,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}) {
  const places = decimals ?? (Number.isInteger(value) ? 0 : 1);
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        if (reduce) {
          setN(value);
          return;
        }
        const start = performance.now();
        const factor = 10 ** places;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(eased * value * factor) / factor);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, places]);

  const shown = places > 0 ? n.toFixed(places) : String(n);

  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
