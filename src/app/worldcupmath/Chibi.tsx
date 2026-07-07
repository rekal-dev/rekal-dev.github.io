import type { PlayerDef } from "./engine";

export type ChibiState = "idle" | "run" | "kick" | "cheer" | "stumble";

/**
 * Layered SVG chibi character. Body parts live in separate <g> layers
 * (head / torso / arms / legs) so wcm.css can animate them like a
 * lightweight 2D skeletal rig — idle, run, kick, cheer, stumble.
 */
export function Chibi({
  p,
  state = "idle",
  size = 96,
  flip = false,
  className = "",
}: {
  p: PlayerDef;
  state?: ChibiState;
  size?: number;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={size * 1.25}
      className={`wcm-chibi wcm-${state} ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <g className="wcm-whole">
        {/* legs */}
        <g className="wcm-legL">
          <rect x="45.5" y="106" width="11" height="24" rx="5" fill={p.pants} />
          <ellipse cx="51" cy="131" rx="8" ry="5" fill="#2b2b31" />
          <rect x="43" y="131.5" width="16" height="4" rx="2" fill="#e8e8ec" />
        </g>
        <g className="wcm-legR">
          <rect x="63.5" y="106" width="11" height="24" rx="5" fill={p.pants} />
          <ellipse cx="69" cy="131" rx="8" ry="5" fill="#2b2b31" />
          <rect x="61" y="131.5" width="16" height="4" rx="2" fill="#e8e8ec" />
        </g>

        {/* torso */}
        <g className="wcm-torso">
          <rect x="40" y="70" width="40" height="38" rx="12" fill={p.jacket} />
          <rect x="40" y="100" width="40" height="8" rx="4" fill={p.jacketTrim} />
          <line x1="60" y1="74" x2="60" y2="102" stroke={p.jacketTrim} strokeWidth="2.5" />
          <rect x="51" y="68" width="18" height="6" rx="3" fill={p.jacketTrim} />
        </g>

        {/* arms */}
        <g className="wcm-armL">
          <rect x="31" y="71" width="10" height="27" rx="5" fill={p.jacket} />
          <rect x="31" y="91" width="10" height="5" rx="2.5" fill={p.jacketTrim} />
          <circle cx="36" cy="100" r="4.5" fill={p.skin} />
        </g>
        <g className="wcm-armR">
          <rect x="79" y="71" width="10" height="27" rx="5" fill={p.jacket} />
          <rect x="79" y="91" width="10" height="5" rx="2.5" fill={p.jacketTrim} />
          <circle cx="84" cy="100" r="4.5" fill={p.skin} />
        </g>

        {/* accessory held in front of the torso */}
        {p.accessory === "tablet" && (
          <g>
            <rect x="46" y="85" width="28" height="20" rx="3" fill="#1f2733" />
            <rect x="48.5" y="87.5" width="23" height="15" rx="1.5" fill="#4695d8" />
            <rect x="51" y="90" width="8" height="4" rx="1" fill="#bfe0f7" />
            <rect x="61" y="90" width="8" height="4" rx="1" fill="#ffd54a" />
            <rect x="51" y="96" width="18" height="4" rx="1" fill="#eaf5fd" />
          </g>
        )}

        {/* head */}
        <g className="wcm-head">
          {/* hair behind the face (long style side masses) */}
          {p.hairStyle === "long" && (
            <>
              <path d="M33 40 Q27 66 34 86 Q43 82 42 62 Q40 48 40 42 Z" fill={p.hairColor} />
              <path d="M87 40 Q93 66 86 86 Q77 82 78 62 Q80 48 80 42 Z" fill={p.hairColor} />
            </>
          )}

          <circle cx="60" cy="46" r="27" fill={p.skin} />

          {/* hair on top — hidden under a beanie when one is worn */}
          {!p.beanie && (
            <>
              <path d="M33 46 A27 27 0 1 1 87 46 Z" fill={p.hairColor} />
              {p.hairStyle === "fringe" && (
                <>
                  <circle cx="42" cy="41" r="6.5" fill={p.hairColor} />
                  <circle cx="60" cy="37" r="7" fill={p.hairColor} />
                  <circle cx="78" cy="41" r="6.5" fill={p.hairColor} />
                </>
              )}
              {p.hairStyle === "bun" && <circle cx="60" cy="15" r="9" fill={p.hairColor} />}
              {p.hairStyle === "curly" && (
                <>
                  <circle cx="39" cy="31" r="8.5" fill={p.hairColor} />
                  <circle cx="51" cy="23" r="8.5" fill={p.hairColor} />
                  <circle cx="64" cy="21" r="8.5" fill={p.hairColor} />
                  <circle cx="77" cy="25" r="8.5" fill={p.hairColor} />
                  <circle cx="86" cy="34" r="8" fill={p.hairColor} />
                </>
              )}
              {p.hairStyle === "spiky" && (
                <polygon
                  points="34,36 41,15 48,30 56,9 64,29 73,13 80,31 86,38"
                  fill={p.hairColor}
                />
              )}
            </>
          )}

          {/* beanie */}
          {p.beanie && (
            <>
              <rect x="35" y="44" width="50" height="6" rx="3" fill={p.hairColor} />
              <path d="M31 44 A29 29 0 1 1 89 44 Z" fill={p.beanie} />
              <rect x="30" y="37" width="60" height="10" rx="5" fill={p.beanie} />
              <rect x="30" y="37" width="60" height="10" rx="5" fill="#ffffff" opacity="0.22" />
              <circle cx="60" cy="12" r="7" fill={p.beanie} />
              <circle cx="60" cy="12" r="7" fill="#ffffff" opacity="0.35" />
            </>
          )}

          {/* face */}
          <circle cx="50" cy="50" r="3" fill="#2b2320" />
          <circle cx="70" cy="50" r="3" fill="#2b2320" />
          <circle cx="51" cy="49" r="1" fill="#fff" />
          <circle cx="71" cy="49" r="1" fill="#fff" />
          <circle cx="43" cy="56" r="3.5" fill="#f29a8a" opacity="0.55" />
          <circle cx="77" cy="56" r="3.5" fill="#f29a8a" opacity="0.55" />
          <path
            d="M53 59 Q60 65 67 59"
            stroke="#7a4a3a"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* football at their feet */}
        {p.accessory === "ball" && (
          <g>
            <circle cx="94" cy="129" r="11" fill="#fff" stroke="#26262c" strokeWidth="1.5" />
            <polygon points="94,123 99,127 97,133 91,133 89,127" fill="#26262c" />
            <circle cx="86" cy="124" r="1.8" fill="#26262c" />
            <circle cx="102" cy="126" r="1.8" fill="#26262c" />
            <circle cx="97" cy="138" r="1.8" fill="#26262c" />
          </g>
        )}
      </g>
    </svg>
  );
}

/** Standalone vector football used on the pitch. */
export function Football({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10.5" fill="#fff" stroke="#26262c" strokeWidth="1.4" />
      <polygon points="12,6.5 16.4,9.8 14.7,14.9 9.3,14.9 7.6,9.8" fill="#26262c" />
      <circle cx="4.6" cy="9" r="1.5" fill="#26262c" />
      <circle cx="19.4" cy="9" r="1.5" fill="#26262c" />
      <circle cx="12" cy="21" r="1.5" fill="#26262c" />
    </svg>
  );
}
