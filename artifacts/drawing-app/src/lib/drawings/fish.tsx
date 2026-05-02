import type { SvgDrawing } from "./types";

const STROKE = "#1e293b";
const SW = "3";

export const fishDrawing: SvgDrawing = {
  id: "fish",
  name: "Arraina",
  emoji: "🐟",
  category: "animaliak",
  zones: ["body", "tail", "fins", "eye"],
  defaultColors: { body: "#7dd3fc", tail: "#38bdf8", fins: "#0ea5e9", eye: "#ffffff" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <polygon
        points="155,100 185,65 185,135"
        fill={colors.tail ?? "#38bdf8"}
        stroke={STROKE} strokeWidth={SW}
        className="color-zone"
        onClick={() => onClick("tail")}
      />
      <ellipse cx="95" cy="100" rx="65" ry="40" fill={colors.body ?? "#7dd3fc"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("body")} />
      <path d="M 80,62 Q 100,40 115,62" fill={colors.fins ?? "#0ea5e9"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("fins")} />
      <path d="M 80,138 Q 100,160 115,138" fill={colors.fins ?? "#0ea5e9"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("fins")} />
      <circle cx="55" cy="93" r="12" fill={colors.eye ?? "#ffffff"} stroke={STROKE} strokeWidth="2" className="color-zone" onClick={() => onClick("eye")} />
      <circle cx="55" cy="93" r="5" fill="#1e293b" />
      <circle cx="52" cy="90" r="2" fill="#ffffff" />
      <path d="M 32,102 Q 30,108 36,110" fill="none" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M 85,90 Q 95,82 105,90" fill="none" stroke={STROKE} strokeWidth="1.5" opacity="0.4" />
      <path d="M 100,105 Q 110,97 120,105" fill="none" stroke={STROKE} strokeWidth="1.5" opacity="0.4" />
      <path d="M 70,105 Q 80,97 90,105" fill="none" stroke={STROKE} strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),
};
