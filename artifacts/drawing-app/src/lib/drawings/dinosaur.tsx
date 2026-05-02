import type { SvgDrawing } from "./types";

const STROKE = "#1e293b";
const SW = "3";

export const dinosaurDrawing: SvgDrawing = {
  id: "dino",
  name: "Dinosauroa",
  emoji: "🦕",
  category: "animaliak",
  zones: ["body", "belly", "spines", "eye", "legs"],
  defaultColors: {
    body: "#86efac",
    belly: "#d9f99d",
    spines: "#4ade80",
    eye: "#ffffff",
    legs: "#4ade80",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <path d="M 170,135 Q 185,155 175,170 Q 165,165 163,148" fill={colors.body ?? "#86efac"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("body")} />
      <rect x="60" y="148" width="20" height="38" rx="8" fill={colors.legs ?? "#4ade80"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("legs")} />
      <rect x="90" y="150" width="20" height="36" rx="8" fill={colors.legs ?? "#4ade80"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("legs")} />
      <rect x="120" y="148" width="20" height="38" rx="8" fill={colors.legs ?? "#4ade80"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("legs")} />
      <ellipse cx="105" cy="130" rx="70" ry="40" fill={colors.body ?? "#86efac"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("body")} />
      <ellipse cx="100" cy="137" rx="45" ry="26" fill={colors.belly ?? "#d9f99d"} stroke={STROKE} strokeWidth="1.5" className="color-zone" onClick={() => onClick("belly")} />
      <path d="M 42,100 Q 38,70 50,55" fill="none" stroke={colors.body ?? "#86efac"} strokeWidth={30} strokeLinecap="round" className="color-zone" onClick={() => onClick("body")} />
      <ellipse cx="52" cy="47" rx="30" ry="22" fill={colors.body ?? "#86efac"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("body")} />
      <circle cx="40" cy="40" r="9" fill={colors.eye ?? "#ffffff"} stroke={STROKE} strokeWidth="2" className="color-zone" onClick={() => onClick("eye")} />
      <circle cx="40" cy="40" r="4" fill="#1e293b" />
      <circle cx="38" cy="38" r="1.5" fill="#ffffff" />
      <circle cx="25" cy="46" r="2.5" fill={STROKE} opacity="0.5" />
      <path d="M 22,52 L 66,52" stroke={STROKE} strokeWidth="2" strokeLinecap="round" />
      <path d="M 30,52 L 27,58 L 34,52" fill="#ffffff" stroke={STROKE} strokeWidth="1" />
      <path d="M 42,52 L 39,58 L 46,52" fill="#ffffff" stroke={STROKE} strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 62 + i * 22;
        const y = 95 - (i === 2 ? 10 : i === 1 || i === 3 ? 5 : 0);
        return (
          <polygon
            key={i}
            points={`${x - 8},${y + 5} ${x},${y - 18} ${x + 8},${y + 5}`}
            fill={colors.spines ?? "#4ade80"}
            stroke={STROKE}
            strokeWidth="2"
            className="color-zone"
            onClick={() => onClick("spines")}
          />
        );
      })}
      <path d="M 52,120 Q 36,130 34,142" fill="none" stroke={colors.legs ?? "#4ade80"} strokeWidth={14} strokeLinecap="round" className="color-zone" onClick={() => onClick("legs")} />
    </svg>
  ),
};
