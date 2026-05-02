import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const dragonDrawing: SvgDrawing = {
  id: "dragon",
  name: "Dragoia",
  emoji: "🐲",
  category: "fantasia",
  zones: ["cuerpo", "alas", "barriga", "cabeza", "fuego"],
  defaultColors: { cuerpo: "#4ade80", alas: "#16a34a", barriga: "#bbf7d0", cabeza: "#22c55e", fuego: "#fb923c" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Tail */}
      <path d="M 158,130 C 182,138 192,155 185,168 C 180,178 170,172 172,164 C 174,156 182,158 180,168"
            fill="none" stroke={colors.cuerpo ?? "#4ade80"} strokeWidth="14" strokeLinecap="round"
            className="color-zone" onClick={() => onClick("cuerpo")} />
      <path d="M 158,130 C 182,138 192,155 185,168 C 180,178 170,172 172,164 C 174,156 182,158 180,168"
            fill="none" stroke={K} strokeWidth="2.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Left wing */}
      <path d="M 80,90 L 32,42 L 56,80 L 22,82 L 58,108 Z"
            fill={colors.alas ?? "#16a34a"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas")} />
      {/* Right wing */}
      <path d="M 120,90 L 168,42 L 144,80 L 178,82 L 142,108 Z"
            fill={colors.alas ?? "#16a34a"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas")} />
      {/* Body */}
      <ellipse cx="100" cy="128" rx="52" ry="44"
               fill={colors.cuerpo ?? "#4ade80"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Belly */}
      <ellipse cx="100" cy="138" rx="28" ry="28"
               fill={colors.barriga ?? "#bbf7d0"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("barriga")} />
      {/* Spikes on back */}
      {[82, 94, 106, 118].map((x, i) => (
        <polygon key={i} points={`${x},88 ${x - 6},70 ${x + 6},70`}
                 fill={colors.cuerpo ?? "#4ade80"} stroke={K} strokeWidth="2"
                 style={{ pointerEvents: "none" }} />
      ))}
      {/* Head */}
      <ellipse cx="100" cy="76" rx="34" ry="28"
               fill={colors.cabeza ?? "#22c55e"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cabeza")} />
      {/* Snout */}
      <ellipse cx="100" cy="92" rx="18" ry="12"
               fill={colors.cabeza ?? "#22c55e"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("cabeza")} />
      {/* Nostrils */}
      <circle cx="93" cy="93" r="3" fill={K} />
      <circle cx="107" cy="93" r="3" fill={K} />
      {/* Eyes */}
      <ellipse cx="84" cy="70" rx="9" ry="10" fill="#fbbf24" stroke={K} strokeWidth="2" />
      <ellipse cx="116" cy="70" rx="9" ry="10" fill="#fbbf24" stroke={K} strokeWidth="2" />
      <circle cx="86" cy="70" r="5" fill={K} />
      <circle cx="118" cy="70" r="5" fill={K} />
      <circle cx="84" cy="68" r="2" fill="white" />
      <circle cx="116" cy="68" r="2" fill="white" />
      {/* Horns */}
      <polygon points="82,48 78,26 90,44" fill={colors.cuerpo ?? "#4ade80"} stroke={K} strokeWidth="2" />
      <polygon points="118,48 122,26 110,44" fill={colors.cuerpo ?? "#4ade80"} stroke={K} strokeWidth="2" />
      {/* Fire */}
      <path d="M 100,102 Q 88,114 82,130 Q 92,120 96,132 Q 100,118 104,132 Q 108,120 118,130 Q 112,114 100,102 Z"
            fill={colors.fuego ?? "#fb923c"} stroke={K} strokeWidth="2"
            className="color-zone" onClick={() => onClick("fuego")} />
      <path d="M 100,108 Q 93,118 90,128 Q 96,120 99,128 Q 101,120 108,128 Q 107,118 100,108 Z"
            fill="#fde68a" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
