import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const ninjaDrawing: SvgDrawing = {
  id: "ninja",
  name: "Ninja",
  emoji: "🥷",
  category: "abenturak",
  zones: ["traje", "banda", "gerriko", "shuriken"],
  defaultColors: {
    traje:    "#374151",
    banda:    "#dc2626",
    gerriko:  "#f8fafc",
    shuriken: "#94a3b8",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* HEAD — fully covered in dark cloth */}
      <circle cx="100" cy="40" r="23"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* Headband */}
      <path d="M 78,28 Q 100,20 122,28 Q 122,38 100,40 Q 78,38 78,28 Z"
        fill={colors.banda ?? "#dc2626"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("banda")} />
      {/* Headband tail */}
      <path d="M 120,34 Q 135,30 140,40 Q 132,46 120,40 Z"
        fill={colors.banda ?? "#dc2626"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("banda")} />

      {/* Eye slit */}
      <rect x="84" y="38" width="32" height="10" rx="3" fill={colors.traje ?? "#374151"} stroke={K} strokeWidth="1.5" className="color-zone" onClick={() => onClick("traje")} />
      {/* Eyes */}
      <ellipse cx="92" cy="43" rx="5" ry="4" fill="#e2e8f0" style={{ pointerEvents: "none" }} />
      <ellipse cx="108" cy="43" rx="5" ry="4" fill="#e2e8f0" style={{ pointerEvents: "none" }} />
      <circle cx="92" cy="43" r="3" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="108" cy="43" r="3" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="91" cy="42" r="1" fill="white" style={{ pointerEvents: "none" }} />
      <circle cx="107" cy="42" r="1" fill="white" style={{ pointerEvents: "none" }} />
      {/* Cloth fold below eyes */}
      <path d="M 78,50 Q 100,56 122,50" fill="none" stroke={K} strokeWidth="1.5" opacity="0.35" style={{ pointerEvents: "none" }} />

      {/* BODY — wide at shoulders */}
      <path d="M 70,63 Q 100,56 130,63 L 122,140 L 78,140 Z"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* Cloth fold lines on body */}
      <path d="M 90,66 L 86,138" fill="none" stroke={K} strokeWidth="1" opacity="0.18" style={{ pointerEvents: "none" }} />
      <path d="M 110,66 L 114,138" fill="none" stroke={K} strokeWidth="1" opacity="0.18" style={{ pointerEvents: "none" }} />

      {/* Left arm — lowered */}
      <path d="M 70,63 L 40,110 Q 34,120 45,123 L 78,85 Z"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />
      <circle cx="40" cy="123" r="11"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* Right arm — raised, holding shuriken */}
      <path d="M 130,63 L 162,40 Q 169,34 168,46 L 132,82 Z"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />
      <circle cx="168" cy="46" r="10"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />

      {/* SHURIKEN — 4-pointed star */}
      <polygon
        points="180,15 183,25 193,22 183,28 186,38 178,31 168,35 175,26 165,20 175,23"
        fill={colors.shuriken ?? "#94a3b8"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("shuriken")} />
      <circle cx="179" cy="26" r="4" fill={K} opacity="0.5" style={{ pointerEvents: "none" }} />

      {/* Sash / belt */}
      <path d="M 76,105 Q 100,100 124,105 L 120,122 Q 100,128 80,122 Z"
        fill={colors.gerriko ?? "#f8fafc"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("gerriko")} />
      {/* Belt knot */}
      <ellipse cx="100" cy="116" rx="12" ry="8"
        fill={colors.gerriko ?? "#f8fafc"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("gerriko")} />

      {/* Left leg — slightly wide stance */}
      <path d="M 78,140 L 60,192 Q 61,196 76,196 L 90,148 Z"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />
      {/* Right leg */}
      <path d="M 122,140 L 140,192 Q 139,196 124,196 L 110,148 Z"
        fill={colors.traje ?? "#374151"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("traje")} />
    </svg>
  ),
};
