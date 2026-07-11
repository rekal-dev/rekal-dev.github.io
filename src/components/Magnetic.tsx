"use client";

import { ReactNode, useRef } from "react";

/**
 * Magnetic hover: children drift a few pixels toward the cursor and spring
 * back on leave. Pure transform (no layout), inert under reduced motion and
 * on touch (no mousemove events fire).
 */
export default function Magnetic({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0, 0)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 450);
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
