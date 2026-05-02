import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const rocketDrawing: SvgDrawing = {
  id: "rocket",
  name: "Kohetea",
  emoji: "🚀",
  category: "ibilgailuak",
  zones: ["cuerpo", "nariz", "aletas", "ventana", "fuego"],
  defaultColors: { cuerpo: "#e2e8f0", nariz: "#f43f6e", aletas: "#6366f1", ventana: "#7dd3fc", fuego: "#fb923c" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Fire / exhaust */}
      <ellipse cx="100" cy="178" rx="18" ry="14"
               fill={colors.fuego ?? "#fb923c"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("fuego")} />
      <ellipse cx="100" cy="184" rx="10" ry="10" fill="#fde68a" opacity="0.9" style={{ pointerEvents: "none" }} />
      {/* Left fin */}
      <path d="M 72,148 L 52,172 L 72,164 Z"
            fill={colors.aletas ?? "#6366f1"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("aletas")} />
      {/* Right fin */}
      <path d="M 128,148 L 148,172 L 128,164 Z"
            fill={colors.aletas ?? "#6366f1"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("aletas")} />
      {/* Body */}
      <rect x="72" y="92" width="56" height="78" rx="12"
            fill={colors.cuerpo ?? "#e2e8f0"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Nose cone */}
      <path d="M 72,94 Q 72,34 100,22 Q 128,34 128,94 Z"
            fill={colors.nariz ?? "#f43f6e"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("nariz")} />
      {/* Window */}
      <circle cx="100" cy="118" r="20"
              fill={colors.ventana ?? "#7dd3fc"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("ventana")} />
      {/* Window glare */}
      <path d="M 90,108 Q 94,104 100,104" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7" style={{ pointerEvents: "none" }} />
      {/* Stars on body */}
      <text x="82" y="158" fontSize="10" fill={K} opacity="0.4" style={{ pointerEvents: "none" }}>★</text>
      <text x="106" y="152" fontSize="8" fill={K} opacity="0.4" style={{ pointerEvents: "none" }}>★</text>
    </svg>
  ),
};
