import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const wizardDrawing: SvgDrawing = {
  id: "wizard",
  name: "Aztia",
  emoji: "🧙",
  category: "fantasia",
  zones: ["sombrero", "capa", "ropa", "cara", "varita"],
  defaultColors: { sombrero: "#6366f1", capa: "#7c3aed", ropa: "#4f46e5", cara: "#fde68a", varita: "#fbbf24" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Cape back */}
      <path d="M 58,110 L 30,190 L 100,176 L 170,190 L 142,110 Z"
            fill={colors.capa ?? "#7c3aed"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("capa")} />
      {/* Body/robe */}
      <path d="M 65,118 L 55,188 L 145,188 L 135,118 Z"
            fill={colors.ropa ?? "#4f46e5"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("ropa")} />
      {/* Wand (right arm) */}
      <path d="M 142,115 L 172,72"
            fill="none" stroke={colors.varita ?? "#fbbf24"} strokeWidth="6" strokeLinecap="round"
            className="color-zone" onClick={() => onClick("varita")} />
      <path d="M 142,115 L 172,72"
            fill="none" stroke={K} strokeWidth="2.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Wand star */}
      <circle cx="174" cy="70" r="8" fill="#fbbf24" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Star sparkles */}
      <text x="155" y="58" fontSize="12" fill="#fbbf24" opacity="0.8" style={{ pointerEvents: "none" }}>✦</text>
      <text x="168" y="50" fontSize="9" fill="#f472b6" opacity="0.7" style={{ pointerEvents: "none" }}>✦</text>
      <text x="178" y="58" fontSize="8" fill="#a78bfa" opacity="0.7" style={{ pointerEvents: "none" }}>✦</text>
      {/* Head */}
      <circle cx="100" cy="95" r="30"
              fill={colors.cara ?? "#fde68a"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("cara")} />
      {/* Beard */}
      <path d="M 78,106 Q 90,124 100,128 Q 110,124 122,106"
            fill="white" stroke={K} strokeWidth="2" />
      <path d="M 86,110 Q 90,126 96,132 Q 100,130 96,132"
            fill="none" stroke={K} strokeWidth="1.5" strokeLinecap="round" />
      {/* Eyes */}
      <circle cx="90" cy="91" r="6" fill={K} />
      <circle cx="110" cy="91" r="6" fill={K} />
      <circle cx="88" cy="89" r="2" fill="white" />
      <circle cx="108" cy="89" r="2" fill="white" />
      {/* Eyebrows (bushy) */}
      <path d="M 84,84 Q 90,80 96,83" fill="none" stroke={K} strokeWidth="3" strokeLinecap="round" />
      <path d="M 104,83 Q 110,80 116,84" fill="none" stroke={K} strokeWidth="3" strokeLinecap="round" />
      {/* Nose */}
      <ellipse cx="100" cy="99" rx="4" ry="5" fill="#f9a8d4" />
      {/* Hat brim */}
      <ellipse cx="100" cy="68" rx="38" ry="12"
               fill={colors.sombrero ?? "#6366f1"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("sombrero")} />
      {/* Hat cone */}
      <path d="M 68,70 Q 80,32 100,10 Q 120,32 132,70 Z"
            fill={colors.sombrero ?? "#6366f1"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("sombrero")} />
      {/* Hat stars */}
      <text x="88" y="52" fontSize="12" fill="#fbbf24" opacity="0.8" style={{ pointerEvents: "none" }}>★</text>
      <text x="103" y="38" fontSize="9" fill="#fde68a" opacity="0.7" style={{ pointerEvents: "none" }}>★</text>
    </svg>
  ),
};
