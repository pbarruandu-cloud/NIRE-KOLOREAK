import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const rabbitDrawing: SvgDrawing = {
  id: "rabbit",
  name: "Untxia",
  emoji: "🐰",
  category: "animaliak",
  zones: ["cuerpo", "orejas", "barriga", "cola"],
  defaultColors: { cuerpo: "#e2e8f0", orejas: "#e2e8f0", barriga: "#f8fafc", cola: "#f1f5f9" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Left ear */}
      <ellipse cx="72" cy="38" rx="14" ry="36"
               fill={colors.orejas ?? "#e2e8f0"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("orejas")} />
      <ellipse cx="72" cy="38" rx="7" ry="28" fill="#fda4af" opacity="0.9" style={{ pointerEvents: "none" }} />
      {/* Right ear */}
      <ellipse cx="120" cy="38" rx="14" ry="36"
               fill={colors.orejas ?? "#e2e8f0"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("orejas")} />
      <ellipse cx="120" cy="38" rx="7" ry="28" fill="#fda4af" opacity="0.9" style={{ pointerEvents: "none" }} />
      {/* Body */}
      <ellipse cx="96" cy="140" rx="52" ry="48"
               fill={colors.cuerpo ?? "#e2e8f0"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Belly */}
      <ellipse cx="96" cy="148" rx="28" ry="28"
               fill={colors.barriga ?? "#f8fafc"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("barriga")} />
      {/* Head */}
      <circle cx="96" cy="88" r="34"
              fill={colors.cuerpo ?? "#e2e8f0"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Eyes */}
      <circle cx="84" cy="84" r="8" fill="#f472b6" stroke={K} strokeWidth="1.5" />
      <circle cx="108" cy="84" r="8" fill="#f472b6" stroke={K} strokeWidth="1.5" />
      <circle cx="82" cy="82" r="3" fill="white" />
      <circle cx="106" cy="82" r="3" fill="white" />
      {/* Nose */}
      <ellipse cx="96" cy="99" rx="5" ry="4" fill="#f9a8d4" />
      {/* Mouth */}
      <path d="M 96,103 Q 90,108 88,106" fill="none" stroke={K} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 96,103 Q 102,108 104,106" fill="none" stroke={K} strokeWidth="1.5" strokeLinecap="round" />
      {/* Tail */}
      <circle cx="148" cy="158" r="14"
              fill={colors.cola ?? "#f1f5f9"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("cola")} />
      {/* Paws */}
      <ellipse cx="72" cy="185" rx="16" ry="10"
               fill={colors.cuerpo ?? "#e2e8f0"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("cuerpo")} />
      <ellipse cx="115" cy="185" rx="16" ry="10"
               fill={colors.cuerpo ?? "#e2e8f0"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("cuerpo")} />
    </svg>
  ),
};
