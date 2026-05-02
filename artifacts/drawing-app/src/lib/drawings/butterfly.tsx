import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const butterflyDrawing: SvgDrawing = {
  id: "butterfly",
  name: "Tximeleta",
  emoji: "🦋",
  category: "natura",
  zones: ["alas_arriba", "alas_abajo", "cuerpo"],
  defaultColors: { alas_arriba: "#f472b6", alas_abajo: "#a78bfa", cuerpo: "#1e293b" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Upper wings */}
      <path d="M 100,95 C 88,60 38,30 28,70 C 18,105 68,110 100,105"
            fill={colors.alas_arriba ?? "#f472b6"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas_arriba")} />
      <path d="M 100,95 C 112,60 162,30 172,70 C 182,105 132,110 100,105"
            fill={colors.alas_arriba ?? "#f472b6"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas_arriba")} />
      {/* Lower wings */}
      <path d="M 100,108 C 82,120 42,118 48,148 C 54,168 88,158 100,140"
            fill={colors.alas_abajo ?? "#a78bfa"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas_abajo")} />
      <path d="M 100,108 C 118,120 158,118 152,148 C 146,168 112,158 100,140"
            fill={colors.alas_abajo ?? "#a78bfa"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("alas_abajo")} />
      {/* Wing patterns (decorative) */}
      <circle cx="68" cy="78" r="10" fill="white" opacity="0.4" style={{ pointerEvents: "none" }} />
      <circle cx="132" cy="78" r="10" fill="white" opacity="0.4" style={{ pointerEvents: "none" }} />
      <circle cx="65" cy="138" r="7" fill="white" opacity="0.4" style={{ pointerEvents: "none" }} />
      <circle cx="135" cy="138" r="7" fill="white" opacity="0.4" style={{ pointerEvents: "none" }} />
      {/* Body */}
      <ellipse cx="100" cy="118" rx="7" ry="28"
               fill={colors.cuerpo ?? "#1e293b"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Head */}
      <circle cx="100" cy="86" r="8"
              fill={colors.cuerpo ?? "#1e293b"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Antennae */}
      <path d="M 96,80 Q 82,58 78,50" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" />
      <circle cx="78" cy="50" r="4" fill={K} />
      <path d="M 104,80 Q 118,58 122,50" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" />
      <circle cx="122" cy="50" r="4" fill={K} />
    </svg>
  ),
};
