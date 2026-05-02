import type { SvgDrawing } from "./types";

const K = "#1e293b";
const W = "2.5";

export const tigerDrawing: SvgDrawing = {
  id: "tiger",
  name: "Tigrea",
  emoji: "🐯",
  category: "animaliak",
  zones: ["larruazala", "sabelaldea", "aurpegia", "hankak"],
  defaultColors: {
    larruazala: "#f97316",
    sabelaldea: "#fef3c7",
    aurpegia:   "#fef3c7",
    hankak:     "#ea580c",
  },
  render: (colors, onClick) => (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* ── TAIL ── */}
      <path d="M 152,145 Q 178,130 182,112 Q 186,94 175,90 Q 164,88 162,100"
        fill="none" stroke={colors.larruazala ?? "#f97316"} strokeWidth="14" strokeLinecap="round"
        className="color-zone" onClick={() => onClick("larruazala")} />
      <path d="M 152,145 Q 178,130 182,112 Q 186,94 175,90 Q 164,88 162,100"
        fill="none" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Tail tip */}
      <ellipse cx="162" cy="99" rx="9" ry="12" transform="rotate(-20 162 99)"
        fill={colors.larruazala ?? "#f97316"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* ── BODY ── */}
      <ellipse cx="100" cy="148" rx="58" ry="44"
        fill={colors.larruazala ?? "#f97316"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* Body belly */}
      <ellipse cx="100" cy="155" rx="34" ry="28"
        fill={colors.sabelaldea ?? "#fef3c7"} stroke={K} strokeWidth="1.5"
        className="color-zone" onClick={() => onClick("sabelaldea")} />

      {/* Body stripes (decorative) */}
      <path d="M 58,128 Q 65,118 70,130" fill="none" stroke={K} strokeWidth="3.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <path d="M 50,145 Q 58,132 65,145" fill="none" stroke={K} strokeWidth="3.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <path d="M 142,128 Q 135,118 130,130" fill="none" stroke={K} strokeWidth="3.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <path d="M 150,145 Q 142,132 135,145" fill="none" stroke={K} strokeWidth="3.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />

      {/* ── FRONT PAWS ── */}
      <ellipse cx="70" cy="186" rx="18" ry="12"
        fill={colors.hankak ?? "#ea580c"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hankak")} />
      <ellipse cx="130" cy="186" rx="18" ry="12"
        fill={colors.hankak ?? "#ea580c"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("hankak")} />
      {/* Claw lines */}
      {[-6, 0, 6].map(dx => (
        <line key={dx} x1={70 + dx} y1="183" x2={70 + dx} y2="193" stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />
      ))}
      {[-6, 0, 6].map(dx => (
        <line key={dx} x1={130 + dx} y1="183" x2={130 + dx} y2="193" stroke={K} strokeWidth="1.5" style={{ pointerEvents: "none" }} />
      ))}

      {/* ── EARS ── */}
      <polygon points="72,52 60,28 88,44"
        fill={colors.larruazala ?? "#f97316"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />
      <polygon points="74,50 64,33 86,45" fill="#fda4af" style={{ pointerEvents: "none" }} />
      <polygon points="128,52 140,28 112,44"
        fill={colors.larruazala ?? "#f97316"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />
      <polygon points="126,50 136,33 114,45" fill="#fda4af" style={{ pointerEvents: "none" }} />

      {/* ── HEAD ── */}
      <circle cx="100" cy="68" r="44"
        fill={colors.larruazala ?? "#f97316"} stroke={K} strokeWidth={W}
        className="color-zone" onClick={() => onClick("larruazala")} />

      {/* Head stripes (forehead) */}
      <path d="M 93,28 Q 97,24 100,28" fill="none" stroke={K} strokeWidth="4" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <path d="M 100,25 Q 100,20 100,25" fill="none" stroke={K} strokeWidth="4" style={{ pointerEvents: "none" }} />
      <path d="M 83,35 Q 86,28 92,36" fill="none" stroke={K} strokeWidth="3.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <path d="M 108,35 Q 112,28 117,36" fill="none" stroke={K} strokeWidth="3.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />

      {/* ── MUZZLE ── */}
      <ellipse cx="100" cy="82" rx="26" ry="20"
        fill={colors.aurpegia ?? "#fef3c7"} stroke={K} strokeWidth="2"
        className="color-zone" onClick={() => onClick("aurpegia")} />

      {/* Nose */}
      <ellipse cx="100" cy="73" rx="7" ry="5" fill="#ec4899" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      {/* Nose line */}
      <line x1="100" y1="78" x2="100" y2="84" stroke={K} strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Mouth */}
      <path d="M 88,84 Q 94,90 100,87 Q 106,90 112,84" fill="none" stroke={K} strokeWidth="2" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      {/* Whiskers */}
      <line x1="74" y1="80" x2="94" y2="83" stroke={K} strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <line x1="74" y1="85" x2="94" y2="86" stroke={K} strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <line x1="106" y1="83" x2="126" y2="80" stroke={K} strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />
      <line x1="106" y1="86" x2="126" y2="85" stroke={K} strokeWidth="1.5" strokeLinecap="round" style={{ pointerEvents: "none" }} />

      {/* ── EYES ── */}
      <ellipse cx="83" cy="60" rx="9" ry="10" fill="#fbbf24" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <ellipse cx="117" cy="60" rx="9" ry="10" fill="#fbbf24" stroke={K} strokeWidth="2" style={{ pointerEvents: "none" }} />
      <ellipse cx="83" cy="60" rx="4" ry="7" fill={K} style={{ pointerEvents: "none" }} />
      <ellipse cx="117" cy="60" rx="4" ry="7" fill={K} style={{ pointerEvents: "none" }} />
      <circle cx="81" cy="57" r="2" fill="white" style={{ pointerEvents: "none" }} />
      <circle cx="115" cy="57" r="2" fill="white" style={{ pointerEvents: "none" }} />
    </svg>
  ),
};
