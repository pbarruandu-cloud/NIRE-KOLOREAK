import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const boatDrawing: SvgDrawing = {
  id: "boat",
  name: "Ontzia",
  emoji: "⛵",
  category: "ibilgailuak",
  zones: ["casco", "vela", "bandera", "agua"],
  defaultColors: { casco: "#dc2626", vela: "#f8fafc", bandera: "#f43f6e", agua: "#7dd3fc" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Water waves */}
      <path d="M 10,156 Q 30,148 50,156 Q 70,164 90,156 Q 110,148 130,156 Q 150,164 170,156 Q 185,150 190,154 L 190,190 L 10,190 Z"
            fill={colors.agua ?? "#7dd3fc"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("agua")} />
      {/* Hull */}
      <path d="M 28,148 L 22,168 Q 40,182 100,182 Q 160,182 178,168 L 172,148 Z"
            fill={colors.casco ?? "#dc2626"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("casco")} />
      {/* Hull stripe */}
      <line x1="28" y1="148" x2="172" y2="148" stroke="white" strokeWidth="4" style={{ pointerEvents: "none" }} />
      {/* Mast */}
      <line x1="100" y1="148" x2="100" y2="40" stroke={K} strokeWidth="4" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Main sail */}
      <path d="M 100,48 L 100,144 L 40,130 Z"
            fill={colors.vela ?? "#f8fafc"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("vela")} />
      {/* Second sail */}
      <path d="M 100,48 L 100,144 L 164,124 Z"
            fill={colors.vela ?? "#f8fafc"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("vela")} />
      {/* Flag */}
      <path d="M 100,40 L 124,50 L 100,60 Z"
            fill={colors.bandera ?? "#f43f6e"} stroke={K} strokeWidth="2"
            className="color-zone" onClick={() => onClick("bandera")} />
      {/* Porthole */}
      <circle cx="100" cy="162" r="8" fill="white" stroke={K} strokeWidth="2" opacity="0.7" style={{ pointerEvents: "none" }} />
      {/* Sun reflection on water */}
      <path d="M 30,170 Q 40,166 50,170" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" style={{ pointerEvents: "none" }} />
      <path d="M 140,172 Q 155,168 168,172" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
