import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "3";

export const elephantDrawing: SvgDrawing = {
  id: "elephant",
  name: "Elefantea",
  emoji: "🐘",
  category: "animaliak",
  zones: ["cuerpo", "cabeza", "oreja", "trompa", "patas"],
  defaultColors: { cuerpo: "#94a3b8", cabeza: "#94a3b8", oreja: "#cbd5e1", trompa: "#64748b", patas: "#64748b" },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Ear */}
      <ellipse cx="52" cy="88" rx="26" ry="32"
               fill={colors.oreja ?? "#cbd5e1"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("oreja")} />
      {/* Body */}
      <ellipse cx="112" cy="130" rx="60" ry="46"
               fill={colors.cuerpo ?? "#94a3b8"} stroke={K} strokeWidth={W}
               className="color-zone" onClick={() => onClick("cuerpo")} />
      {/* Head */}
      <circle cx="72" cy="90" r="38"
              fill={colors.cabeza ?? "#94a3b8"} stroke={K} strokeWidth={W}
              className="color-zone" onClick={() => onClick("cabeza")} />
      {/* Trunk */}
      <path d="M 48,110 Q 32,130 40,155 Q 44,165 50,158 Q 58,150 46,130 Q 54,115 62,118"
            fill={colors.trompa ?? "#64748b"} stroke={K} strokeWidth={W} strokeLinejoin="round"
            className="color-zone" onClick={() => onClick("trompa")} />
      {/* Legs */}
      <rect x="75" y="166" width="22" height="28" rx="10"
            fill={colors.patas ?? "#64748b"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("patas")} />
      <rect x="105" y="166" width="22" height="28" rx="10"
            fill={colors.patas ?? "#64748b"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("patas")} />
      <rect x="135" y="166" width="22" height="28" rx="10"
            fill={colors.patas ?? "#64748b"} stroke={K} strokeWidth={W}
            className="color-zone" onClick={() => onClick("patas")} />
      {/* Tail */}
      <path d="M 168,118 Q 180,125 176,138" fill="none" stroke={K} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="175" cy="140" r="4" fill={K} />
      {/* Eye */}
      <circle cx="65" cy="83" r="9" fill="white" stroke={K} strokeWidth="2" />
      <circle cx="65" cy="83" r="5" fill={K} />
      <circle cx="63" cy="81" r="2" fill="white" />
      {/* Tusk */}
      <path d="M 50,108 Q 40,118 44,128" fill="none" stroke="#fef3c7" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
};
