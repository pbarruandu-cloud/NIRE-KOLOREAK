import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const owlDrawing: SvgDrawing = {
  id: "owl",
  name: "Hontzea",
  emoji: "🦉",
  category: "animaliak",
  zones: ["cuerpo", "alas", "pecho", "ojos", "pico"],
  defaultColors: { cuerpo: "#92400e", alas: "#78350f", pecho: "#fef3c7", ojos: "#fbbf24", pico: "#f97316" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Wings */}
      <ellipse cx="44" cy="120" rx="28" ry="50"
               fill={colors.alas ?? "#78350f"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("alas")} />
      <ellipse cx="156" cy="120" rx="28" ry="50"
               fill={colors.alas ?? "#78350f"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("alas")} />
      {/* Body */}
      <ellipse cx="100" cy="128" rx="46" ry="56"
               fill={colors.cuerpo ?? "#92400e"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Chest / belly */}
      <ellipse cx="100" cy="145" rx="28" ry="34"
               fill={colors.pecho ?? "#fef3c7"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("pecho")} />
      {/* Head */}
      <circle cx="100" cy="72" r="38"
              fill={colors.cuerpo ?? "#92400e"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Ear tufts */}
      <polygon points="82,40 74,12 90,36" fill={colors.cuerpo ?? "#92400e"} stroke={K} strokeWidth={W} />
      <polygon points="118,40 126,12 110,36" fill={colors.cuerpo ?? "#92400e"} stroke={K} strokeWidth={W} />
      {/* Eye rings */}
      <circle cx="83" cy="74" r="16" fill={colors.ojos ?? "#fbbf24"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("ojos")} />
      <circle cx="117" cy="74" r="16" fill={colors.ojos ?? "#fbbf24"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("ojos")} />
      {/* Pupils */}
      <circle cx="83" cy="74" r="8" fill={K} />
      <circle cx="117" cy="74" r="8" fill={K} />
      <circle cx="81" cy="71" r="3" fill="white" />
      <circle cx="115" cy="71" r="3" fill="white" />
      {/* Beak */}
      <polygon points="100,88 92,100 108,100"
               fill={colors.pico ?? "#f97316"} stroke={K} strokeWidth="2"
               className="color-zone" onClick={() => onClick("pico")} />
      {/* Feet */}
      <path d="M 82,182 L 74,196 M 82,182 L 82,196 M 82,182 L 90,196" stroke={K} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 118,182 L 110,196 M 118,182 L 118,196 M 118,182 L 126,196" stroke={K} strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="82" cy="182" rx="12" ry="6" fill={colors.cuerpo ?? "#92400e"} stroke={K} strokeWidth="2" />
      <ellipse cx="118" cy="182" rx="12" ry="6" fill={colors.cuerpo ?? "#92400e"} stroke={K} strokeWidth="2" />
    </svg>
  ),
};
