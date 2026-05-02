import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const treeDrawing: SvgDrawing = {
  id: "tree",
  name: "Zuhaitza",
  emoji: "🌳",
  category: "natura",
  zones: ["tronco", "hojas_abajo", "hojas_arriba"],
  defaultColors: { tronco: "#92400e", hojas_abajo: "#4ade80", hojas_arriba: "#22c55e" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Trunk */}
      <rect x="82" y="140" width="36" height="54" rx="6"
            fill={colors.tronco ?? "#92400e"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("tronco")} />
      {/* Roots */}
      <path d="M 82,185 Q 68,178 62,188" fill="none" stroke={colors.tronco ?? "#92400e"} strokeWidth="6" strokeLinecap="round" className="color-zone" onClick={() => onClick("tronco")} />
      <path d="M 118,185 Q 132,178 138,188" fill="none" stroke={colors.tronco ?? "#92400e"} strokeWidth="6" strokeLinecap="round" className="color-zone" onClick={() => onClick("tronco")} />
      {/* Lower leaves */}
      <ellipse cx="100" cy="128" rx="62" ry="44"
               fill={colors.hojas_abajo ?? "#4ade80"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("hojas_abajo")} />
      {/* Upper leaves */}
      <ellipse cx="100" cy="88" rx="46" ry="50"
               fill={colors.hojas_arriba ?? "#22c55e"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("hojas_arriba")} />
      {/* Apple decorations */}
      <circle cx="72" cy="118" r="7" fill="#f87171" stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />
      <circle cx="128" cy="122" r="7" fill="#f87171" stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />
      <circle cx="100" cy="108" r="7" fill="#f87171" stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />
      {/* Bird on top */}
      <path d="M 95,46 Q 92,40 88,44" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" />
      <path d="M 95,46 Q 98,40 102,44" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};
