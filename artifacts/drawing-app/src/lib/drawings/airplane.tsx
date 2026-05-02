import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const airplaneDrawing: SvgDrawing = {
  id: "airplane",
  name: "Hegazkina",
  emoji: "✈️",
  category: "ibilgailuak",
  zones: ["cuerpo", "alas", "cola", "ventanas"],
  defaultColors: { cuerpo: "#e2e8f0", alas: "#94a3b8", cola: "#6366f1", ventanas: "#7dd3fc" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Main wing */}
      <path d="M 60,100 L 18,130 L 30,138 L 80,116 Z"
            fill={colors.alas ?? "#94a3b8"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas")} />
      <path d="M 80,98 L 150,72 L 148,84 L 80,108 Z"
            fill={colors.alas ?? "#94a3b8"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas")} />
      {/* Tail fin (vertical) */}
      <path d="M 24,100 L 18,82 L 36,96 Z"
            fill={colors.cola ?? "#6366f1"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("cola")} />
      {/* Tail fins (horizontal) */}
      <path d="M 26,104 L 10,114 L 20,118 L 32,110 Z"
            fill={colors.cola ?? "#6366f1"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("cola")} />
      {/* Body (fuselage) */}
      <path d="M 18,102 Q 20,88 40,88 L 158,90 Q 188,92 186,104 Q 185,116 158,118 L 40,118 Q 20,118 18,102 Z"
            fill={colors.cuerpo ?? "#e2e8f0"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Nose */}
      <path d="M 158,90 Q 190,96 186,104 Q 190,112 158,118 Z"
            fill={colors.alas ?? "#94a3b8"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas")} />
      {/* Windows */}
      <circle cx="90" cy="100" r="9"
              fill={colors.ventanas ?? "#7dd3fc"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("ventanas")} />
      <circle cx="115" cy="99" r="9"
              fill={colors.ventanas ?? "#7dd3fc"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("ventanas")} />
      <circle cx="140" cy="99" r="9"
              fill={colors.ventanas ?? "#7dd3fc"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("ventanas")} />
      {/* Stripe */}
      <line x1="30" y1="106" x2="160" y2="106" stroke={colors.cola ?? "#6366f1"} strokeWidth="3" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
