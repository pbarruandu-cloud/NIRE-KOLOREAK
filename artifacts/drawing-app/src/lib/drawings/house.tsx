import type { SvgDrawing } from "./types";

const STROKE = "#1e293b";
const SW = "3";

export const houseDrawing: SvgDrawing = {
  id: "house",
  name: "Etxea",
  emoji: "🏠",
  category: "fantasia",
  zones: ["roof", "wall", "door", "window", "chimney"],
  defaultColors: {
    roof: "#fca5a5",
    wall: "#fde68a",
    door: "#92400e",
    window: "#bae6fd",
    chimney: "#d1d5db",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      <rect x="130" y="50" width="20" height="40" fill={colors.chimney ?? "#d1d5db"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("chimney")} />
      <polygon points="20,105 100,30 180,105" fill={colors.roof ?? "#fca5a5"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("roof")} />
      <rect x="30" y="103" width="140" height="80" fill={colors.wall ?? "#fde68a"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("wall")} />
      <rect x="83" y="133" width="34" height="50" rx="5" fill={colors.door ?? "#92400e"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("door")} />
      <circle cx="112" cy="159" r="3" fill={STROKE} />
      <rect x="42" y="118" width="36" height="30" rx="4" fill={colors.window ?? "#bae6fd"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("window")} />
      <line x1="60" y1="118" x2="60" y2="148" stroke={STROKE} strokeWidth="1.5" />
      <line x1="42" y1="133" x2="78" y2="133" stroke={STROKE} strokeWidth="1.5" />
      <rect x="122" y="118" width="36" height="30" rx="4" fill={colors.window ?? "#bae6fd"} stroke={STROKE} strokeWidth={SW} className="color-zone" onClick={() => onClick("window")} />
      <line x1="140" y1="118" x2="140" y2="148" stroke={STROKE} strokeWidth="1.5" />
      <line x1="122" y1="133" x2="158" y2="133" stroke={STROKE} strokeWidth="1.5" />
    </svg>
  ),
};
