import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const unicornDrawing: SvgDrawing = {
  id: "unicorn",
  name: "Unicornioa",
  emoji: "🦄",
  category: "fantasia",
  zones: ["cuerpo", "melena", "cuerno", "patas", "cola"],
  defaultColors: { cuerpo: "#f8fafc", melena: "#f472b6", cuerno: "#fbbf24", patas: "#e2e8f0", cola: "#a78bfa" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Tail */}
      <path d="M 170,115 C 192,108 196,128 186,138 C 178,148 172,140 178,132 C 184,124 190,126 186,138"
            fill="none" stroke={colors.cola ?? "#a78bfa"} strokeWidth="12" strokeLinecap="round"
            className="color-zone" onClick={() => onClick("cola")} />
      <path d="M 170,115 C 192,108 196,128 186,138 C 178,148 172,140 178,132 C 184,124 190,126 186,138"
            fill="none" stroke={K} strokeWidth="2.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Legs */}
      <rect x="68" y="148" width="18" height="40" rx="8"
            fill={colors.patas ?? "#e2e8f0"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("patas")} />
      <rect x="94" y="148" width="18" height="40" rx="8"
            fill={colors.patas ?? "#e2e8f0"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("patas")} />
      <rect x="120" y="150" width="18" height="38" rx="8"
            fill={colors.patas ?? "#e2e8f0"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("patas")} />
      <rect x="146" y="150" width="18" height="38" rx="8"
            fill={colors.patas ?? "#e2e8f0"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("patas")} />
      {/* Body */}
      <ellipse cx="118" cy="126" rx="58" ry="38"
               fill={colors.cuerpo ?? "#f8fafc"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Neck */}
      <path d="M 68,110 Q 60,90 70,70 L 90,72 Q 78,90 86,110 Z"
            fill={colors.cuerpo ?? "#f8fafc"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Head */}
      <ellipse cx="60" cy="62" rx="30" ry="24"
               fill={colors.cuerpo ?? "#f8fafc"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Mane */}
      <path d="M 70,48 C 80,32 96,36 100,52 C 104,68 92,72 88,88 C 84,100 86,108 80,112"
            fill="none" stroke={colors.melena ?? "#f472b6"} strokeWidth="14" strokeLinecap="round"
            className="color-zone" onClick={() => onClick("melena")} />
      <path d="M 70,48 C 80,32 96,36 100,52 C 104,68 92,72 88,88 C 84,100 86,108 80,112"
            fill="none" stroke={K} strokeWidth="2.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Mane strand 2 */}
      <path d="M 76,52 C 90,38 108,44 106,60 C 104,74 92,76 88,92"
            fill="none" stroke="#a78bfa" strokeWidth="8" strokeLinecap="round" opacity="0.7" style={{ pointerEvents: "none" }} />
      {/* Horn */}
      <polygon points="50,42 66,44 56,4"
               fill={colors.cuerno ?? "#fbbf24"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerno")} />
      {/* Horn stripes */}
      <line x1="53" y1="38" x2="62" y2="40" stroke={K} strokeWidth="1" opacity="0.4" style={{ pointerEvents: "none" }} />
      <line x1="55" y1="28" x2="62" y2="30" stroke={K} strokeWidth="1" opacity="0.4" style={{ pointerEvents: "none" }} />
      <line x1="57" y1="18" x2="62" y2="20" stroke={K} strokeWidth="1" opacity="0.4" style={{ pointerEvents: "none" }} />
      {/* Eye */}
      <circle cx="48" cy="62" r="8" fill="white" stroke={K} strokeWidth="2" />
      <circle cx="48" cy="62" r="5" fill="#1e293b" />
      <circle cx="46" cy="60" r="2" fill="white" />
      {/* Nostril */}
      <ellipse cx="36" cy="68" rx="3" ry="2" fill="#fda4af" />
      {/* Star sparkles */}
      <text x="148" y="100" fontSize="14" fill="#fbbf24" opacity="0.6" style={{ pointerEvents: "none" }}>✦</text>
      <text x="158" y="80" fontSize="10" fill="#f472b6" opacity="0.5" style={{ pointerEvents: "none" }}>✦</text>
    </svg>
  ),
};
