import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const racingCarDrawing: SvgDrawing = {
  id: "racingCar",
  name: "Lasterketa-autoa",
  emoji: "🏎️",
  category: "ibilgailuak",
  zones: ["carrozeria", "aleron", "gurpilak", "kristala", "raiak"],
  defaultColors: {
    carrozeria: "#dc2626",
    aleron:     "#991b1b",
    gurpilak:   "#1e293b",
    kristala:   "#bae6fd",
    raiak:      "#fbbf24",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* ── REAR WING ── */}
      {/* Wing pillar */}
      <rect x="26" y="100" width="8" height="32" rx="3"
        fill={colors.aleron ?? "#991b1b"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("aleron")} />
      {/* Wing blade */}
      <rect x="12" y="98" width="36" height="9" rx="4"
        fill={colors.aleron ?? "#991b1b"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("aleron")} />

      {/* ── WHEELS — rear (left) ── */}
      <circle cx="52" cy="158" r="24"
        fill={colors.gurpilak ?? "#1e293b"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("gurpilak")} />
      <circle cx="52" cy="158" r="12" fill="#6b7280" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <circle cx="52" cy="158" r="4" fill={K} style={{ pointerEvents: "none" }} />
      {[0, 60, 120, 180, 240, 300].map(a => {
        const rad = (a * Math.PI) / 180;
        return <line key={a} x1={52 + 5 * Math.cos(rad)} y1={158 + 5 * Math.sin(rad)} x2={52 + 11 * Math.cos(rad)} y2={158 + 11 * Math.sin(rad)} stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />;
      })}

      {/* ── WHEELS — front (right) ── */}
      <circle cx="152" cy="158" r="24"
        fill={colors.gurpilak ?? "#1e293b"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("gurpilak")} />
      <circle cx="152" cy="158" r="12" fill="#6b7280" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <circle cx="152" cy="158" r="4" fill={K} style={{ pointerEvents: "none" }} />
      {[0, 60, 120, 180, 240, 300].map(a => {
        const rad = (a * Math.PI) / 180;
        return <line key={a} x1={152 + 5 * Math.cos(rad)} y1={158 + 5 * Math.sin(rad)} x2={152 + 11 * Math.cos(rad)} y2={158 + 11 * Math.sin(rad)} stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />;
      })}

      {/* ── MAIN BODY ── */}
      {/* Rear/bottom zone flat */}
      <path
        d="M 28,132 L 72,132 L 72,140 L 130,140 L 175,140 Q 186,140 186,150 L 186,160 Q 170,160 155,140 L 48,140 Q 34,160 18,160 L 18,148 Q 18,132 28,132 Z"
        fill={colors.carrozeria ?? "#dc2626"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("carrozeria")} />
      {/* Upper body / side pod */}
      <path
        d="M 32,132 L 70,132 L 80,118 L 130,118 L 162,130 Q 178,134 182,142 L 170,142 L 130,140 L 70,140 L 34,140 Q 22,136 22,130 Z"
        fill={colors.carrozeria ?? "#dc2626"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("carrozeria")} />

      {/* ── RACING STRIPES ── */}
      <path d="M 60,119 L 62,140" fill="none" stroke={colors.raiak ?? "#fbbf24"} strokeWidth="5" strokeLinecap="round"
        className="color-zone" onClick={() => onClick("raiak")} />
      <path d="M 75,119 L 77,140" fill="none" stroke={colors.raiak ?? "#fbbf24"} strokeWidth="5" strokeLinecap="round"
        className="color-zone" onClick={() => onClick("raiak")} />
      {/* Racing number */}
      <text x="103" y="137" fontSize="14" fontWeight="900" fill={colors.raiak ?? "#fbbf24"} textAnchor="middle" style={{ pointerEvents: "none" }}>7</text>

      {/* ── COCKPIT (nose cone) ── */}
      <path
        d="M 80,118 Q 90,102 100,100 Q 110,100 120,104 Q 130,108 130,118 Z"
        fill={colors.kristala ?? "#bae6fd"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("kristala")} />
      {/* Cockpit glare */}
      <path d="M 88,110 Q 96,104 106,106" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" style={{ pointerEvents: "none" }} />

      {/* ── FRONT WING ── */}
      <rect x="162" y="136" width="24" height="8" rx="3"
        fill={colors.aleron ?? "#991b1b"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("aleron")} />
      <rect x="170" y="130" width="5" height="10" rx="2"
        fill={colors.aleron ?? "#991b1b"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("aleron")} />

      {/* Exhaust pipe details */}
      <ellipse cx="26" cy="136" rx="5" ry="4" fill={K} opacity="0.5" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
