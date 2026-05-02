import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const wolfDrawing: SvgDrawing = {
  id: "wolf",
  name: "Otsoa",
  emoji: "🐺",
  category: "animaliak",
  zones: ["larruazala", "sabelaldea", "aurpegia", "ilargia"],
  defaultColors: {
    larruazala: "#94a3b8",
    sabelaldea: "#e2e8f0",
    aurpegia:   "#e2e8f0",
    ilargia:    "#fef08a",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* ── MOON ── */}
      <circle cx="165" cy="30" r="22"
        fill={colors.ilargia ?? "#fef08a"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("ilargia")} />
      {/* Moon craters */}
      <circle cx="158" cy="24" r="5" fill={K} opacity="0.1" style={{ pointerEvents: "none" }} />
      <circle cx="170" cy="35" r="3" fill={K} opacity="0.1" style={{ pointerEvents: "none" }} />

      {/* ── TAIL ── */}
      <path d="M 140,155 Q 165,148 178,130 Q 185,115 178,105 Q 170,96 162,105 Q 156,115 160,125"
        fill="none" stroke={colors.larruazala ?? "#94a3b8"} strokeWidth="18" strokeLinecap="round"
        className="color-zone" onClick={() => onClick("larruazala")} />
      <path d="M 140,155 Q 165,148 178,130 Q 185,115 178,105 Q 170,96 162,105 Q 156,115 160,125"
        fill="none" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Tail tip white */}
      <circle cx="161" cy="125" r="9" fill={colors.sabelaldea ?? "#e2e8f0"} stroke={K} strokeWidth="2" className="color-zone" onClick={() => onClick("sabelaldea")} />

      {/* ── BACK LEGS ── */}
      <path d="M 124,160 Q 130,175 128,190 L 145,190 Q 148,175 148,160 Z"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />
      {/* Back paw */}
      <ellipse cx="136" cy="191" rx="14" ry="7"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* ── BODY ── */}
      <ellipse cx="100" cy="155" rx="62" ry="38"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* Belly */}
      <ellipse cx="88" cy="163" rx="38" ry="22"
        fill={colors.sabelaldea ?? "#e2e8f0"} stroke={K} strokeWidth="1.5"
        className="color-zone" onClick={() => onClick("sabelaldea")} />

      {/* Body fur texture */}
      <path d="M 52,138 Q 48,128 56,130" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" opacity="0.3" style={{ pointerEvents: "none" }} />
      <path d="M 44,148 Q 40,138 48,140" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" opacity="0.3" style={{ pointerEvents: "none" }} />

      {/* ── FRONT LEGS ── */}
      <rect x="56" y="168" width="20" height="28" rx="8"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />
      <ellipse cx="66" cy="196" rx="14" ry="6"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("larruazala")} />

      <rect x="80" y="168" width="20" height="28" rx="8"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />
      <ellipse cx="90" cy="196" rx="14" ry="6"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* ── NECK ── */}
      <path d="M 58,130 Q 62,110 70,100 L 90,110 Q 80,122 78,138 Z"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* ── EARS ── */}
      <polygon points="58,70 42,40 72,62"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />
      <polygon points="60,68 48,46 70,62" fill="#fda4af" style={{ pointerEvents: "none" }} />
      <polygon points="90,62 82,34 104,58"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />
      <polygon points="90,60 84,40 102,56" fill="#fda4af" style={{ pointerEvents: "none" }} />

      {/* ── HEAD (tilted upward — howling) ── */}
      <ellipse cx="76" cy="78" rx="32" ry="28"
        fill={colors.larruazala ?? "#94a3b8"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* Head fur lines */}
      <path d="M 50,70 Q 46,62 52,65" fill="none" stroke={K} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" style={{ pointerEvents: "none" }} />
      <path d="M 48,80 Q 44,72 50,75" fill="none" stroke={K} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" style={{ pointerEvents: "none" }} />

      {/* ── MUZZLE — open (howling upward) ── */}
      <path d="M 58,86 Q 68,92 76,90 Q 90,90 100,78 Q 96,65 80,66 Q 64,66 58,78 Z"
        fill={colors.aurpegia ?? "#e2e8f0"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("aurpegia")} />

      {/* Open mouth */}
      <path d="M 64,82 Q 76,92 88,84" fill="#e11d48" stroke={K} strokeWidth="1.5"
        className="color-zone" onClick={() => onClick("aurpegia")} />
      {/* Teeth */}
      <polygon points="68,82 71,88 74,82" fill="white" stroke={K} strokeWidth="1" style={{ pointerEvents: "none" }} />
      <polygon points="74,82 77,88 80,82" fill="white" stroke={K} strokeWidth="1" style={{ pointerEvents: "none" }} />
      <polygon points="80,82 83,88 86,82" fill="white" stroke={K} strokeWidth="1" style={{ pointerEvents: "none" }} />

      {/* Nose */}
      <ellipse cx="96" cy="75" rx="7" ry="5" fill={K} style={{ pointerEvents: "none" }} />

      {/* ── EYE ── */}
      <circle cx="62" cy="72" r="8" fill="#fbbf24" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <circle cx="62" cy="72" r="4" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="60" cy="70" r="1.5" fill="white" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
