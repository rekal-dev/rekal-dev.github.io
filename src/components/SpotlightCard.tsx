"use client";

import { ReactNode, useRef } from "react";

const MAX_TILT = 3.2; // degrees — perceptible depth, never seasick

export default function SpotlightCard({
  children,
  className = "",
  as = "div",
  href,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
}) {
  const ref = useRef<HTMLDivElement & HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rx = ((y / r.height) - 0.5) * -2 * MAX_TILT;
      const ry = ((x / r.width) - 0.5) * 2 * MAX_TILT;
      el.style.transform = `translateY(-3px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  const props = {
    ref,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `spot-card ${className}`,
  };

  const card =
    as === "a" ? (
      <a {...props} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      <div {...props}>{children}</div>
    );

  return <div className="tilt-wrap h-full">{card}</div>;
}
