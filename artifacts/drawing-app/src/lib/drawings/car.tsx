import type { SvgDrawing } from "./types";

const STROKE = "#1e293b";
const SW = "3";

export const carDrawing: SvgDrawing = {
  id: "car",
  name: "Autoa",
  emoji: "🚗",
  category: "ibilgailuak",
  zones: ["body", "roof", "windows", "wheels", "lights"],
  defaultColors: {
    body: "#f87171",
    roof: "#ef4444",
    windows: "#bae6fd",
    wheels: "#374151",
    lights: "#fef08a",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect x="15" y="105" width="170" height="55" rx="12" fill={colors.body ?? "#f87171"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("body")} />
      <path d="M 55,105 Q 65,68 100,65 Q 135,68 145,105 Z" fill={colors.roof ?? "#ef4444"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("roof")} />
      <path d="M 65,104 Q 70,78 100,75 Q 115,76 125,104 Z" fill={colors.windows ?? "#bae6fd"} stroke={STROKE} strokeWidth="2" className="color-zone" onClick={() => onClick("windows")} />
      <circle cx="52" cy="158" r="22" fill={colors.wheels ?? "#374151"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("wheels")} />
      <circle cx="52" cy="158" r="10" fill="#9ca3af" stroke={STROKE} strokeWidth="2" />
      <circle cx="148" cy="158" r="22" fill={colors.wheels ?? "#374151"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("wheels")} />
      <circle cx="148" cy="158" r="10" fill="#9ca3af" stroke={STROKE} strokeWidth="2" />
      <rect x="168" y="115" width="16" height="10" rx="4" fill={colors.lights ?? "#fef08a"} stroke={STROKE} strokeWidth="2" className="color-zone" onClick={() => onClick("lights")} />
      <rect x="16" y="115" width="14" height="10" rx="4" fill="#fca5a5" stroke={STROKE} strokeWidth="2" className="color-zone" onClick={() => onClick("lights")} />
      <line x1="100" y1="108" x2="100" y2="155" stroke={STROKE} strokeWidth="1.5" opacity="0.5" />
      <rect x="85" y="130" width="12" height="5" rx="2" fill={STROKE} opacity="0.5" />
      <rect x="105" y="130" width="12" height="5" rx="2" fill={STROKE} opacity="0.5" />
    </svg>
  ),
};
