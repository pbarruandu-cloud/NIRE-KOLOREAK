import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const castleDrawing: SvgDrawing = {
  id: "castle",
  name: "Gaztelua",
  emoji: "🏰",
  category: "fantasia",
  zones: ["murallas", "torres", "tejados", "puerta"],
  defaultColors: { murallas: "#e2e8f0", torres: "#cbd5e1", tejados: "#6366f1", puerta: "#92400e" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Ground */}
      <rect x="10" y="182" width="180" height="18" rx="4" fill="#86efac" opacity="0.6" style={{ pointerEvents: "none" }} />
      {/* Left tower */}
      <rect x="14" y="82" width="40" height="102" rx="4"
            fill={colors.torres ?? "#cbd5e1"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("torres")} />
      {/* Left tower battlements */}
      {[14, 24, 34, 44].map((x) => (
        <rect key={x} x={x} y="70" width="8" height="16" rx="2"
              fill={colors.torres ?? "#cbd5e1"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("torres")} />
      ))}
      {/* Right tower */}
      <rect x="146" y="82" width="40" height="102" rx="4"
            fill={colors.torres ?? "#cbd5e1"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("torres")} />
      {/* Right tower battlements */}
      {[146, 156, 166, 176].map((x) => (
        <rect key={x} x={x} y="70" width="8" height="16" rx="2"
              fill={colors.torres ?? "#cbd5e1"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("torres")} />
      ))}
      {/* Main wall */}
      <rect x="54" y="110" width="92" height="74" rx="4"
            fill={colors.murallas ?? "#e2e8f0"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("murallas")} />
      {/* Main battlements */}
      {[54, 66, 78, 90, 102, 114, 126, 138].map((x) => (
        <rect key={x} x={x} y="98" width="9" height="16" rx="2"
              fill={colors.murallas ?? "#e2e8f0"} stroke={K} strokeWidth="2"
              className="color-zone" onClick={() => onClick("murallas")} />
      ))}
      {/* Left tower roof */}
      <polygon points="14,84 54,84 34,40"
               fill={colors.tejados ?? "#6366f1"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("tejados")} />
      {/* Right tower roof */}
      <polygon points="146,84 186,84 166,40"
               fill={colors.tejados ?? "#6366f1"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("tejados")} />
      {/* Gate (arch) */}
      <path d="M 80,184 L 80,152 Q 80,132 100,132 Q 120,132 120,152 L 120,184 Z"
            fill={colors.puerta ?? "#92400e"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("puerta")} />
      {/* Gate arch highlight */}
      <path d="M 84,150 Q 84,138 100,138 Q 116,138 116,150" fill="none" stroke={K} strokeWidth="1.5" opacity="0.4" style={{ pointerEvents: "none" }} />
      {/* Left tower window */}
      <path d="M 26,112 L 26,100 Q 34,94 42,100 L 42,112 Z"
            fill="#7dd3fc" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Right tower window */}
      <path d="M 158,112 L 158,100 Q 166,94 174,100 L 174,112 Z"
            fill="#7dd3fc" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Main wall windows */}
      <path d="M 62,130 L 62,118 Q 70,112 78,118 L 78,130 Z"
            fill="#7dd3fc" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <path d="M 122,130 L 122,118 Q 130,112 138,118 L 138,130 Z"
            fill="#7dd3fc" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Flag left */}
      <line x1="34" y1="40" x2="34" y2="20" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <path d="M 34,20 L 48,26 L 34,32 Z" fill="#f43f6e" style={{ pointerEvents: "none" }} />
      {/* Flag right */}
      <line x1="166" y1="40" x2="166" y2="20" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <path d="M 166,20 L 180,26 L 166,32 Z" fill="#f43f6e" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
