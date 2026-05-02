import type { SvgDrawing } from "./types";

const STROKE = "#1e293b";
const SW = "3";

export const sunDrawing: SvgDrawing = {
  id: "sun",
  name: "Eguzkia",
  emoji: "☀️",
  category: "natura",
  zones: ["body", "rays", "face"],
  defaultColors: { body: "#fef08a", rays: "#fbbf24", face: "#f59e0b" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 55;
        const y1 = 100 + Math.sin(rad) * 55;
        const x2 = 100 + Math.cos(rad) * 80;
        const y2 = 100 + Math.sin(rad) * 80;
        return (
          <line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={colors.rays ?? "#fbbf24"}
            strokeWidth={8}
            strokeLinecap="round"
            className="color-zone"
            onClick={() => onClick("rays")}
          />
        );
      })}
      <circle
        cx="100" cy="100" r="48"
        fill={colors.body ?? "#fef08a"}
        stroke={STROKE} strokeWidth={SW}
        className="color-zone"
        onClick={() => onClick("body")}
      />
      <ellipse cx="86" cy="92" rx="5" ry="6" fill={colors.face ?? "#f59e0b"} stroke={STROKE} strokeWidth="1.5" className="color-zone" onClick={() => onClick("face")} />
      <ellipse cx="114" cy="92" rx="5" ry="6" fill={colors.face ?? "#f59e0b"} stroke={STROKE} strokeWidth="1.5" className="color-zone" onClick={() => onClick("face")} />
      <path d="M 82 112 Q 100 126 118 112" fill="none" stroke={STROKE} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
};
