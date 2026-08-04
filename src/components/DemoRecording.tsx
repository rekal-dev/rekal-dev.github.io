"use client";

import { motion } from "framer-motion";

// Real recorded session against the released rekal binary — not a scripted
// re-enactment. Kept in sync with docs/assets/demo.svg in rekal-dev/rekal-cli.
export default function DemoRecording() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="ring-grad glow-accent overflow-hidden rounded-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/demo.svg"
          alt="Two terminals side by side. On the left, Dana commits a 37-turn session about webhook delivery and pushes it. On the right, Sam, who was never in that conversation, syncs and his agent answers that a fixed retry delay was already rejected."
          className="w-full h-auto block"
        />
      </div>
    </motion.div>
  );
}
