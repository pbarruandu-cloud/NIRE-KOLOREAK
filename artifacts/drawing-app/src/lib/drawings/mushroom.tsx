import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const mushroomDrawing: SvgDrawing = {
  id: "mushroom",
  name: "Perretxikoa",
  emoji: "🍄",
  category: "natura",
  zones: ["sombrero", "tallo", "manchas"],
  defaultColors: { sombrero: "#ef4444", tallo: "#fef9c3", manchas: "#ffffff" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Ground */}
      <ellipse cx="100" cy="188" rx="50" ry="8" fill="#86efac" opacity="0.5" style={{ pointerEvents: "none" }} />
      {/* Stem */}
      <path d="M 72,130 Q 68,160 72,185 L 128,185 Q 132,160 128,130 Z"
            fill={colors.tallo ?? "#fef9c3"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("tallo")} />
      {/* Stem lines */}
      <path d="M 88,135 Q 88,165 88,183" fill="none" stroke={K} strokeWidth="1.2" opacity="0.3" style={{ pointerEvents: "none" }} />
      <path d="M 112,135 Q 112,165 112,183" fill="none" stroke={K} strokeWidth="1.2" opacity="0.3" style={{ pointerEvents: "none" }} />
      {/* Cap underside - gills */}
      <path d="M 58,132 Q 100,148 142,132"
            fill="#fde68a" stroke={K} strokeWidth="2"
            className="color-zone" onClick={() => onClick("tallo")} />
      {/* Cap */}
      <path d="M 14,128 Q 14,52 100,44 Q 186,52 186,128 Z"
            fill={colors.sombrero ?? "#ef4444"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("sombrero")} />
      {/* Spots */}
      <circle cx="80" cy="92" r="16"
              fill={colors.manchas ?? "#ffffff"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("manchas")} />
      <circle cx="120" cy="86" r="13"
              fill={colors.manchas ?? "#ffffff"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("manchas")} />
      <circle cx="100" cy="118" r="10"
              fill={colors.manchas ?? "#ffffff"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("manchas")} />
      <circle cx="52" cy="108" r="9"
              fill={colors.manchas ?? "#ffffff"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("manchas")} />
      <circle cx="148" cy="112" r="9"
              fill={colors.manchas ?? "#ffffff"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("manchas")} />
    </svg>
  ),
};
