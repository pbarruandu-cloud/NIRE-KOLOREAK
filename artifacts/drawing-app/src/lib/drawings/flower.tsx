import type { SvgDrawing } from "./types";

const STROKE = "#1e293b";
const SW = "3";

export const flowerDrawing: SvgDrawing = {
  id: "flower",
  name: "Lorea",
  emoji: "🌸",
  category: "natura",
  zones: ["petals", "center", "stem", "leaf"],
  defaultColors: { petals: "#f9a8d4", center: "#fef08a", stem: "#86efac", leaf: "#4ade80" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <path d="M 100,130 Q 105,160 100,185" fill="none" stroke={colors.stem ?? "#86efac"} strokeWidth={10} strokeLinecap="round" className="color-zone" onClick={() => onClick("stem")} />
      <path d="M 98,155 Q 72,145 70,130 Q 90,140 98,155" fill={colors.leaf ?? "#4ade80"} stroke={STROKE} strokeWidth="2" className="color-zone" onClick={() => onClick("leaf")} />
      <path d="M 102,150 Q 128,140 130,125 Q 110,135 102,150" fill={colors.leaf ?? "#4ade80"} stroke={STROKE} strokeWidth="2" className="color-zone" onClick={() => onClick("leaf")} />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 35;
        const cy = 85 + Math.sin(rad) * 35;
        return (
          <ellipse
            key={angle}
            cx={cx} cy={cy}
            rx={20} ry={28}
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            fill={colors.petals ?? "#f9a8d4"}
            stroke={STROKE} strokeWidth="2"
            className="color-zone"
            onClick={() => onClick("petals")}
          />
        );
      })}
      <circle cx="100" cy="85" r="22" fill={colors.center ?? "#fef08a"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("center")} />
      <circle cx="94" cy="80" r="3" fill={STROKE} opacity="0.3" />
      <circle cx="106" cy="80" r="3" fill={STROKE} opacity="0.3" />
      <circle cx="100" cy="91" r="3" fill={STROKE} opacity="0.3" />
    </svg>
  ),
};
