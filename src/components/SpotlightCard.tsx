"use client";

import { ReactNode, useRef } from "react";

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
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const props = {
    ref,
    onMouseMove: onMove,
    className: `spot-card ${className}`,
  };

  if (as === "a") {
    return (
      <a {...props} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <div {...props}>{children}</div>;
}
