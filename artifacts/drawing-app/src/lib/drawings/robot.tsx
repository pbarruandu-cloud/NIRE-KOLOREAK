import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const robotDrawing: SvgDrawing = {
  id: "robot",
  name: "Robota",
  emoji: "🤖",
  category: "superheroiak",
  zones: ["cabeza", "cuerpo", "brazos", "piernas", "pantalla"],
  defaultColors: {
    cabeza:   "#94a3b8",
    cuerpo:   "#64748b",
    brazos:   "#475569",
    piernas:  "#475569",
    pantalla: "#7dd3fc",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* ── ANTENNA ── */}
      <line x1="100" y1="8" x2="100" y2="25" stroke={K} strokeWidth="3" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <circle cx="100" cy="7" r="5" fill="#f43f6e" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />

      {/* ── HEAD ── */}
      <rect x="62" y="24" width="76" height="54" rx="10"
        fill={colors.cabeza ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("cabeza")} />

      {/* Left eye */}
      <circle cx="83" cy="44" r="12"
        fill={colors.pantalla ?? "#7dd3fc"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("pantalla")} />
      <circle cx="83" cy="44" r="6" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="80" cy="41" r="2" fill="white" style={{ pointerEvents: "none" }} />

      {/* Right eye */}
      <circle cx="117" cy="44" r="12"
        fill={colors.pantalla ?? "#7dd3fc"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("pantalla")} />
      <circle cx="117" cy="44" r="6" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="114" cy="41" r="2" fill="white" style={{ pointerEvents: "none" }} />

      {/* Mouth grill (decorative) */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={72 + i * 14} y="63" width="10" height="7" rx="2"
          fill={K} opacity="0.25" style={{ pointerEvents: "none" }} />
      ))}

      {/* ── NECK ── */}
      <rect x="90" y="77" width="20" height="10" rx="4"
        fill={colors.cabeza ?? "#94a3b8"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("cabeza")} />

      {/* ── BODY ── */}
      <rect x="52" y="86" width="96" height="68" rx="10"
        fill={colors.cuerpo ?? "#64748b"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("cuerpo")} />

      {/* Chest screen */}
      <rect x="68" y="96" width="64" height="42" rx="8"
        fill={colors.pantalla ?? "#7dd3fc"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("pantalla")} />
      {/* Screen content — smiley bars */}
      <path d="M 80,108 Q 100,100 120,108" fill="none" stroke={K} strokeWidth="2" opacity="0.5" style={{ pointerEvents: "none" }} />
      <path d="M 78,118 Q 100,128 122,118" fill="none" stroke={K} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" style={{ pointerEvents: "none" }} />

      {/* Shoulder bolts */}
      <circle cx="58" cy="93" r="5" fill={colors.cabeza ?? "#94a3b8"} stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <circle cx="142" cy="93" r="5" fill={colors.cabeza ?? "#94a3b8"} stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />

      {/* ── LEFT ARM ── */}
      <rect x="20" y="90" width="34" height="18" rx="8"
        fill={colors.brazos ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("brazos")} />
      {/* Left hand/claw */}
      <rect x="15" y="104" width="22" height="28" rx="6"
        fill={colors.brazos ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("brazos")} />
      <line x1="22" y1="110" x2="22" y2="128" stroke={K} strokeWidth="1.5" opacity="0.4" style={{ pointerEvents: "none" }} />
      <line x1="29" y1="110" x2="29" y2="128" stroke={K} strokeWidth="1.5" opacity="0.4" style={{ pointerEvents: "none" }} />

      {/* ── RIGHT ARM ── */}
      <rect x="146" y="90" width="34" height="18" rx="8"
        fill={colors.brazos ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("brazos")} />
      {/* Right hand/claw */}
      <rect x="163" y="104" width="22" height="28" rx="6"
        fill={colors.brazos ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("brazos")} />
      <line x1="170" y1="110" x2="170" y2="128" stroke={K} strokeWidth="1.5" opacity="0.4" style={{ pointerEvents: "none" }} />
      <line x1="177" y1="110" x2="177" y2="128" stroke={K} strokeWidth="1.5" opacity="0.4" style={{ pointerEvents: "none" }} />

      {/* ── LEFT LEG ── */}
      <rect x="64" y="154" width="28" height="40" rx="8"
        fill={colors.piernas ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("piernas")} />
      {/* Left foot */}
      <rect x="56" y="188" width="40" height="12" rx="6"
        fill={colors.piernas ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("piernas")} />

      {/* ── RIGHT LEG ── */}
      <rect x="108" y="154" width="28" height="40" rx="8"
        fill={colors.piernas ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("piernas")} />
      {/* Right foot */}
      <rect x="104" y="188" width="40" height="12" rx="6"
        fill={colors.piernas ?? "#475569"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("piernas")} />

      {/* Hip joint */}
      <rect x="55" y="152" width="90" height="8" rx="4"
        fill={colors.cuerpo ?? "#64748b"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("cuerpo")} />
    </svg>
  ),
};
