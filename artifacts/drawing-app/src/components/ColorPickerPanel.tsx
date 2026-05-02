import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ColorPickerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  color: string;
  recentColors: string[];
  onColorChange: (color: string) => void;
}

/* 30 palette colors — 5 rows × 6 cols, warm → cool → neutral */
const PALETTE = [
  // Row 1: Reds → warm tones
  "#ef4444", "#f97316", "#facc15", "#84cc16", "#4ade80", "#2dd4bf",
  // Row 2: Vivid mid-spectrum
  "#38bdf8", "#60a5fa", "#818cf8", "#a78bfa", "#e879f9", "#f472b6",
  // Row 3: Saturated variants
  "#f43f5e", "#fb923c", "#fde047", "#a3e635", "#34d399", "#22d3ee",
  // Row 4: Deep & rich
  "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#0284c7", "#7c3aed",
  // Row 5: Neutrals & earth
  "#1e293b", "#475569", "#94a3b8", "#e2e8f0", "#ffffff", "#92400e",
];

const isValidHex = (v: string) => /^#[0-9a-fA-F]{6}$/.test(v);
const isLight = (c: string) => ["#ffffff", "#e2e8f0", "#f1f5f9"].includes(c.toLowerCase());

export function ColorPickerPanel({
  isOpen,
  onClose,
  color,
  recentColors,
  onColorChange,
}: ColorPickerPanelProps) {
  const [hexVal, setHexVal]   = useState(color);
  const nativeRef             = useRef<HTMLInputElement>(null);

  /* Keep hex input in sync when color changes from outside */
  useEffect(() => { setHexVal(color); }, [color]);

  const pick = (c: string) => {
    onColorChange(c);
    onClose();
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value;
    setHexVal(v);
    if (isValidHex(v)) onColorChange(v);
  };

  const handleNative = (e: React.ChangeEvent<HTMLInputElement>) => {
    onColorChange(e.target.value);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <div
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15,23,42,0.30)",
              zIndex: 40,
            }}
          />

          {/* ── Panel ── */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              bottom: "100%",
              left: 0,
              right: 0,
              background: "#ffffff",
              borderRadius: "1.25rem 1.25rem 0 0",
              boxShadow: "0 -6px 32px rgba(0,0,0,.14)",
              padding: "6px 14px 16px",
              zIndex: 50,
              overflowY: "auto",
              maxHeight: "58dvh",
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
          >
            {/* Drag handle */}
            <div
              style={{
                width: 36,
                height: 4,
                background: "#e2e8f0",
                borderRadius: 99,
                margin: "0 auto 12px",
              }}
            />

            {/* ── Recent colors ── */}
            {recentColors.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <SectionLabel>⏱ Azkenak</SectionLabel>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {recentColors.map((c) => (
                    <Swatch
                      key={c}
                      color={c}
                      selected={color === c}
                      size={32}
                      onClick={() => pick(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Full palette ── */}
            <div style={{ marginBottom: 14 }}>
              <SectionLabel>🎨 Kolore guztiak</SectionLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: 7,
                }}
              >
                {PALETTE.map((c) => (
                  <GridSwatch
                    key={c}
                    color={c}
                    selected={color === c}
                    onClick={() => pick(c)}
                  />
                ))}
              </div>
            </div>

            {/* ── Custom color picker ── */}
            <div>
              <SectionLabel>✏️ Kolore propioa</SectionLabel>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#f8fafc",
                  borderRadius: 12,
                  padding: "8px 10px",
                  border: "1.5px solid #e2e8f0",
                }}
              >
                {/* Color preview — tapping opens native picker */}
                <div
                  onClick={() => nativeRef.current?.click()}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    background: isValidHex(hexVal) ? hexVal : color,
                    border: "2px solid rgba(0,0,0,.12)",
                    cursor: "pointer",
                    flexShrink: 0,
                    boxShadow: "0 2px 6px rgba(0,0,0,.10)",
                  }}
                />

                {/* Hex input */}
                <input
                  type="text"
                  value={hexVal}
                  onChange={handleHexChange}
                  placeholder="#ff0000"
                  maxLength={7}
                  style={{
                    flex: 1,
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 8,
                    padding: "7px 10px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    fontFamily: "'Courier New', monospace",
                    outline: "none",
                    color: "#1e293b",
                    background: "white",
                    minWidth: 0,
                  }}
                />

                {/* Native picker button */}
                <button
                  onClick={() => nativeRef.current?.click()}
                  style={{
                    background: "linear-gradient(135deg, #f74c6f 0%, #8b5cf6 50%, #38bdf8 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 9,
                    padding: "9px 12px",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    fontFamily: "var(--app-font-sans)",
                    boxShadow: "0 2px 8px rgba(139,92,246,.28)",
                  }}
                >
                  🌈 Aukeratu
                </button>

                {/* Hidden native color input */}
                <input
                  ref={nativeRef}
                  type="color"
                  value={isValidHex(hexVal) ? hexVal : color}
                  onChange={handleNative}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    width: 0,
                    height: 0,
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Internal helpers ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.68rem",
        fontWeight: 900,
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: 8,
        fontFamily: "var(--app-font-sans)",
      }}
    >
      {children}
    </p>
  );
}

interface SwatchProps {
  color: string;
  selected: boolean;
  size: number;
  onClick: () => void;
}

function Swatch({ color, selected, size, onClick }: SwatchProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        border: selected
          ? "2.5px solid #1e293b"
          : isLight(color)
          ? "1.5px solid #cbd5e1"
          : "1.5px solid rgba(0,0,0,.12)",
        boxShadow: selected
          ? "0 0 0 2.5px white, 0 0 0 4.5px #1e293b"
          : "0 1px 4px rgba(0,0,0,.14)",
        transform: selected ? "scale(1.15)" : "scale(1)",
        transition: "transform .12s, box-shadow .12s",
        cursor: "pointer",
        flexShrink: 0,
        padding: 0,
      }}
    />
  );
}

function GridSwatch({
  color,
  selected,
  onClick,
}: {
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        aspectRatio: "1",
        borderRadius: "50%",
        background: color,
        border: selected
          ? "2.5px solid #1e293b"
          : isLight(color)
          ? "1.5px solid #cbd5e1"
          : "1.5px solid rgba(0,0,0,.10)",
        boxShadow: selected
          ? "0 0 0 2px white, 0 0 0 4px #1e293b"
          : "0 1px 4px rgba(0,0,0,.14)",
        transform: selected ? "scale(1.1)" : "scale(1)",
        transition: "transform .12s, box-shadow .12s",
        cursor: "pointer",
        padding: 0,
      }}
    />
  );
}
