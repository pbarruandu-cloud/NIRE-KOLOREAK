import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const spaceshipDrawing: SvgDrawing = {
  id: "spaceship",
  name: "Espazio-ontzia",
  emoji: "🚀",
  category: "abenturak",
  zones: ["fuselaia", "hegoak", "kabina", "motorrak", "xehetasunak"],
  defaultColors: {
    fuselaia:     "#cbd5e1",
    hegoak:       "#6366f1",
    kabina:       "#7dd3fc",
    motorrak:     "#f97316",
    xehetasunak:  "#fbbf24",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* ── ENGINE GLOW (behind everything) ── */}
      <ellipse cx="100" cy="186" rx="20" ry="10"
        fill={colors.motorrak ?? "#f97316"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("motorrak")} />
      <ellipse cx="100" cy="192" rx="12" ry="8" fill="#fef08a" opacity="0.85" style={{ pointerEvents: "none" }} />

      {/* ── LOWER SIDE FINS ── */}
      <path d="M 72,148 L 42,178 L 72,168 Z"
        fill={colors.hegoak ?? "#6366f1"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hegoak")} />
      <path d="M 128,148 L 158,178 L 128,168 Z"
        fill={colors.hegoak ?? "#6366f1"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hegoak")} />

      {/* ── MAIN WINGS ── */}
      <path d="M 72,110 L 18,138 Q 14,148 24,150 L 72,138 Z"
        fill={colors.hegoak ?? "#6366f1"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hegoak")} />
      <path d="M 128,110 L 182,138 Q 186,148 176,150 L 128,138 Z"
        fill={colors.hegoak ?? "#6366f1"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hegoak")} />

      {/* Wing stripes */}
      <line x1="38" y1="144" x2="72" y2="130" stroke={colors.xehetasunak ?? "#fbbf24"} strokeWidth="4" strokeLinecap="round" className="color-zone" onClick={() => onClick("xehetasunak")} />
      <line x1="162" y1="144" x2="128" y2="130" stroke={colors.xehetasunak ?? "#fbbf24"} strokeWidth="4" strokeLinecap="round" className="color-zone" onClick={() => onClick("xehetasunak")} />

      {/* ── MAIN FUSELAGE ── */}
      <rect x="72" y="80" width="56" height="96" rx="14"
        fill={colors.fuselaia ?? "#cbd5e1"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("fuselaia")} />

      {/* ── NOSE CONE ── */}
      <path d="M 72,82 Q 72,22 100,10 Q 128,22 128,82 Z"
        fill={colors.fuselaia ?? "#cbd5e1"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("fuselaia")} />
      {/* Nose tip accent */}
      <path d="M 92,28 Q 100,14 108,28" fill={colors.xehetasunak ?? "#fbbf24"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("xehetasunak")} />

      {/* ── COCKPIT WINDOW ── */}
      <ellipse cx="100" cy="108" rx="20" ry="24"
        fill={colors.kabina ?? "#7dd3fc"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("kabina")} />
      {/* Cockpit glare */}
      <path d="M 90,96 Q 96,90 104,92" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" style={{ pointerEvents: "none" }} />

      {/* ── BODY DETAILS ── */}
      {/* Side panel lines */}
      <line x1="78" y1="140" x2="122" y2="140" stroke={K} strokeWidth="1.5" opacity="0.25" style={{ pointerEvents: "none" }} />
      <line x1="78" y1="154" x2="122" y2="154" stroke={K} strokeWidth="1.5" opacity="0.25" style={{ pointerEvents: "none" }} />
      {/* Port holes */}
      <circle cx="85" cy="147" r="4" fill={colors.xehetasunak ?? "#fbbf24"} stroke={K} strokeWidth="1.5"
        className="color-zone" onClick={() => onClick("xehetasunak")} />
      <circle cx="115" cy="147" r="4" fill={colors.xehetasunak ?? "#fbbf24"} stroke={K} strokeWidth="1.5"
        className="color-zone" onClick={() => onClick("xehetasunak")} />

      {/* ── ENGINE NOZZLE ── */}
      <rect x="82" y="170" width="36" height="16" rx="8"
        fill={colors.motorrak ?? "#f97316"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("motorrak")} />
    </svg>
  ),
};
