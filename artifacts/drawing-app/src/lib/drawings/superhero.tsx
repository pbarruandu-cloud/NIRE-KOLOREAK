import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const superheroDrawing: SvgDrawing = {
  id: "superhero",
  name: "Superheroea",
  emoji: "🦸",
  category: "superheroiak",
  zones: ["traje", "capa", "mascara", "cinturon", "botas"],
  defaultColors: {
    traje:    "#3b82f6",
    capa:     "#dc2626",
    mascara:  "#dc2626",
    cinturon: "#f59e0b",
    botas:    "#1e3a8a",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Cape — behind everything */}
      <path
        d="M 68,62 C 42,100 30,150 55,192 L 145,192 C 170,150 158,100 132,62 Z"
        fill={colors.capa ?? "#dc2626"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("capa")}
      />
      <path d="M 90,65 C 86,112 88,158 90,192" fill="none" stroke={K} strokeWidth="1" opacity="0.2" style={{ pointerEvents: "none" }} />
      <path d="M 110,65 C 114,112 112,158 110,192" fill="none" stroke={K} strokeWidth="1" opacity="0.2" style={{ pointerEvents: "none" }} />

      {/* Left arm */}
      <path d="M 68,63 L 24,104 Q 18,113 28,116 L 73,83 Z"
        fill={colors.traje ?? "#3b82f6"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />
      <circle cx="22" cy="114" r="11"
        fill={colors.traje ?? "#3b82f6"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* Right arm */}
      <path d="M 132,63 L 176,104 Q 182,113 172,116 L 127,83 Z"
        fill={colors.traje ?? "#3b82f6"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />
      <circle cx="178" cy="114" r="11"
        fill={colors.traje ?? "#3b82f6"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* Body / suit */}
      <path d="M 68,63 Q 100,56 132,63 L 124,136 L 76,136 Z"
        fill={colors.traje ?? "#3b82f6"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* Star emblem on chest */}
      <polygon
        points="100,73 103,81 111,81 105,87 107,95 100,90 93,95 95,87 89,81 97,81"
        fill={colors.cinturon ?? "#f59e0b"} stroke={K} strokeWidth="1.5"
        style={{ pointerEvents: "none" }} />

      {/* Belt */}
      <rect x="73" y="127" width="54" height="14" rx="5"
        fill={colors.cinturon ?? "#f59e0b"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("cinturon")} />
      <rect x="91" y="130" width="18" height="8" rx="3" fill="white" stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />
      <line x1="100" y1="130" x2="100" y2="138" stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />

      {/* Left leg */}
      <rect x="74" y="140" width="22" height="34" rx="7"
        fill={colors.traje ?? "#3b82f6"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />
      {/* Right leg */}
      <rect x="104" y="140" width="22" height="34" rx="7"
        fill={colors.traje ?? "#3b82f6"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* Left boot */}
      <path d="M 70,170 L 70,185 Q 71,193 100,193 L 100,177 L 96,170 Z"
        fill={colors.botas ?? "#1e3a8a"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("botas")} />
      {/* Right boot */}
      <path d="M 104,170 L 104,177 L 100,193 Q 129,193 130,185 L 130,170 Z"
        fill={colors.botas ?? "#1e3a8a"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("botas")} />

      {/* Head — skin */}
      <circle cx="100" cy="37" r="23" fill="#fde68a" stroke={K} strokeWidth={W} style={{ pointerEvents: "none" }} />
      {/* Hair */}
      <path d="M 78,25 Q 100,12 122,25 Q 120,14 100,13 Q 80,14 78,25 Z" fill="#92400e" style={{ pointerEvents: "none" }} />

      {/* Mask */}
      <path d="M 80,30 Q 100,25 120,30 Q 118,44 100,45 Q 82,44 80,30 Z"
        fill={colors.mascara ?? "#dc2626"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("mascara")} />
      {/* Eye whites */}
      <ellipse cx="90" cy="34" rx="5" ry="4" fill="white" style={{ pointerEvents: "none" }} />
      <ellipse cx="110" cy="34" rx="5" ry="4" fill="white" style={{ pointerEvents: "none" }} />
      {/* Pupils */}
      <circle cx="90" cy="34" r="2.5" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="110" cy="34" r="2.5" fill={K} style={{ pointerEvents: "none" }} />
      {/* Smile */}
      <path d="M 93,50 Q 100,55 107,50" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
