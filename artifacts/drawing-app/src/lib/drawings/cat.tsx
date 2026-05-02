import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const catDrawing: SvgDrawing = {
  id: "cat",
  name: "Katua",
  emoji: "🐱",
  category: "animaliak",
  zones: ["cuerpo", "cabeza", "orejas", "cola"],
  defaultColors: { cuerpo: "#fbbf24", cabeza: "#fbbf24", orejas: "#f9a8d4", cola: "#f59e0b" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Tail */}
      <path d="M 115,150 C 160,142 175,110 155,98"
            fill="none" stroke={colors.cola ?? "#f59e0b"} strokeWidth="15" strokeLinecap="round"
            className="color-zone" onClick={() => onClick("cola")} />
      <path d="M 115,150 C 160,142 175,110 155,98"
            fill="none" stroke={K} strokeWidth={W} strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Body */}
      <ellipse cx="90" cy="148" rx="50" ry="36"
               fill={colors.cuerpo ?? "#fbbf24"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Head */}
      <circle cx="90" cy="88" r="42"
              fill={colors.cabeza ?? "#fbbf24"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("cabeza")} />
      {/* Left ear */}
      <polygon points="58,54 50,18 80,48"
               fill={colors.orejas ?? "#f9a8d4"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("orejas")} />
      {/* Right ear */}
      <polygon points="122,54 140,18 110,48"
               fill={colors.orejas ?? "#f9a8d4"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("orejas")} />
      {/* Eyes */}
      <ellipse cx="76" cy="86" rx="9" ry="11" fill={K} />
      <ellipse cx="104" cy="86" rx="9" ry="11" fill={K} />
      <circle cx="74" cy="83" r="3" fill="white" />
      <circle cx="102" cy="83" r="3" fill="white" />
      {/* Nose */}
      <polygon points="90,102 85,108 95,108" fill="#f472b6" />
      {/* Mouth */}
      <path d="M 90,108 Q 83,114 80,112" fill="none" stroke={K} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 90,108 Q 97,114 100,112" fill="none" stroke={K} strokeWidth="1.5" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="54" y1="103" x2="82" y2="106" stroke="#94a3b8" strokeWidth="1.2" />
      <line x1="54" y1="109" x2="82" y2="108" stroke="#94a3b8" strokeWidth="1.2" />
      <line x1="98" y1="106" x2="126" y2="103" stroke="#94a3b8" strokeWidth="1.2" />
      <line x1="98" y1="108" x2="126" y2="109" stroke="#94a3b8" strokeWidth="1.2" />
      {/* Paws */}
      <ellipse cx="65" cy="179" rx="14" ry="9"
               fill={colors.cuerpo ?? "#fbbf24"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("cuerpo")} />
      <ellipse cx="105" cy="179" rx="14" ry="9"
               fill={colors.cuerpo ?? "#fbbf24"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("cuerpo")} />
    </svg>
  ),
};
