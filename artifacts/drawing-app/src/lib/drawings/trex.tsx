import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const trexDrawing: SvgDrawing = {
  id: "trex",
  name: "T-Rexa",
  emoji: "🦖",
  category: "animaliak",
  zones: ["gorputza", "sabelaldea", "burua", "hankak", "hortzak"],
  defaultColors: {
    gorputza:  "#4ade80",
    sabelaldea:"#d9f99d",
    burua:     "#22c55e",
    hankak:    "#16a34a",
    hortzak:   "#ffffff",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* ── TAIL ── */}
      <path d="M 150,120 Q 180,115 192,100 Q 196,85 188,80 Q 178,78 172,90"
        fill="none" stroke={colors.gorputza ?? "#4ade80"} strokeWidth="22" strokeLinecap="round"
        className="color-zone" onClick={() => onClick("gorputza")} />
      <path d="M 150,120 Q 180,115 192,100 Q 196,85 188,80 Q 178,78 172,90"
        fill="none" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Tail tip */}
      <ellipse cx="173" cy="89" rx="10" ry="8" transform="rotate(30 173 89)"
        fill={colors.gorputza ?? "#4ade80"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("gorputza")} />

      {/* Tail spine bumps */}
      {[0, 1, 2, 3].map(i => (
        <ellipse key={i}
          cx={155 + i * 10} cy={108 - i * 4} rx="5" ry="8"
          transform={`rotate(${-10 + i * 15} ${155 + i * 10} ${108 - i * 4})`}
          fill={colors.gorputza ?? "#4ade80"} stroke={K} strokeWidth="1.5"
          className="color-zone" onClick={() => onClick("gorputza")} />
      ))}

      {/* ── BACK LEGS ── */}
      {/* Upper thigh */}
      <path d="M 116,148 Q 126,168 116,185 L 136,185 Q 140,168 136,148 Z"
        fill={colors.hankak ?? "#16a34a"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hankak")} />
      {/* Lower shin */}
      <path d="M 116,175 Q 108,185 104,195 L 130,195 Q 132,185 136,175 Z"
        fill={colors.hankak ?? "#16a34a"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hankak")} />
      {/* Foot */}
      <ellipse cx="114" cy="195" rx="18" ry="6"
        fill={colors.hankak ?? "#16a34a"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("hankak")} />
      {/* Claws */}
      <polygon points="100,193 96,199 103,196" fill={K} opacity="0.8" style={{ pointerEvents: "none" }} />
      <polygon points="110,195 107,201 113,198" fill={K} opacity="0.8" style={{ pointerEvents: "none" }} />

      {/* ── BODY ── */}
      <ellipse cx="100" cy="140" rx="60" ry="42"
        fill={colors.gorputza ?? "#4ade80"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("gorputza")} />

      {/* Belly */}
      <ellipse cx="94" cy="152" rx="36" ry="26"
        fill={colors.sabelaldea ?? "#d9f99d"} stroke={K} strokeWidth="1.5"
        className="color-zone" onClick={() => onClick("sabelaldea")} />

      {/* Body scales (decorative bumps along spine) */}
      {[0, 1, 2, 3].map(i => (
        <ellipse key={i}
          cx={48 + i * 20} cy={104 - (i === 1 || i === 2 ? 4 : 0)} rx="6" ry="10"
          fill={colors.gorputza ?? "#4ade80"} stroke={K} strokeWidth="1.5"
          className="color-zone" onClick={() => onClick("gorputza")} />
      ))}

      {/* ── TINY ARMS ── */}
      <path d="M 56,120 Q 40,115 36,125 Q 32,135 42,136"
        fill="none" stroke={colors.gorputza ?? "#4ade80"} strokeWidth="12" strokeLinecap="round"
        className="color-zone" onClick={() => onClick("gorputza")} />
      <path d="M 56,120 Q 40,115 36,125 Q 32,135 42,136"
        fill="none" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Tiny claws */}
      <line x1="38" y1="136" x2="34" y2="141" stroke={K} strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <line x1="42" y1="137" x2="40" y2="143" stroke={K} strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: "none" }} />

      {/* ── NECK ── */}
      <path d="M 42,108 Q 38,80 45,65 L 65,75 Q 60,90 58,115 Z"
        fill={colors.gorputza ?? "#4ade80"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("gorputza")} />

      {/* ── HEAD ── */}
      <path d="M 10,50 Q 15,30 35,28 Q 62,26 72,50 Q 78,62 72,75 Q 55,88 30,88 Q 12,85 8,70 Q 6,60 10,50 Z"
        fill={colors.burua ?? "#22c55e"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("burua")} />

      {/* ── MOUTH / TEETH ── */}
      {/* Upper jaw */}
      <path d="M 8,68 Q 8,76 30,80 Q 52,82 72,72 Q 76,80 68,88 Q 48,98 22,94 Q 6,88 6,76 Z"
        fill={colors.burua ?? "#22c55e"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("burua")} />
      {/* Open mouth (red interior) */}
      <path d="M 10,72 Q 40,86 70,76 Q 68,80 60,85 Q 38,92 12,84 Z"
        fill="#e11d48" stroke="none" style={{ pointerEvents: "none" }} />
      {/* Upper teeth */}
      {[0, 1, 2, 3, 4].map(i => (
        <polygon key={i}
          points={`${14 + i * 12},72 ${17 + i * 12},80 ${20 + i * 12},72`}
          fill={colors.hortzak ?? "#ffffff"} stroke={K} strokeWidth="1.5"
          className="color-zone" onClick={() => onClick("hortzak")} />
      ))}
      {/* Lower teeth */}
      {[0, 1, 2, 3].map(i => (
        <polygon key={i}
          points={`${18 + i * 12},82 ${21 + i * 12},75 ${24 + i * 12},82`}
          fill={colors.hortzak ?? "#ffffff"} stroke={K} strokeWidth="1.5"
          className="color-zone" onClick={() => onClick("hortzak")} />
      ))}

      {/* ── EYE ── */}
      <circle cx="45" cy="46" r="10" fill="#fbbf24" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <ellipse cx="45" cy="46" rx="5" ry="7" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="43" cy="43" r="2" fill="white" style={{ pointerEvents: "none" }} />
      {/* Brow ridge */}
      <path d="M 36,38 Q 45,34 54,38" fill="none" stroke={K} strokeWidth="3" strokeLinecap="round" style={{ pointerEvents: "none" }} />

      {/* Nostril */}
      <circle cx="18" cy="52" r="4" fill={K} opacity="0.5" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
