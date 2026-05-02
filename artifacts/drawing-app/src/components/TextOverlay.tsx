import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export interface TextOverlayData {
  fixedLeft: number;
  fixedTop: number;
  text: string;
  fontSize: number;
  fontFamily: string;
}

interface TextOverlayProps extends TextOverlayData {
  color: string;
  onChange: (data: Partial<TextOverlayData>) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const FONTS = [
  { key: "Fredoka One", label: "Biribila", cssFn: "'Fredoka One', cursive" },
  { key: "Georgia",     label: "Klasikoa", cssFn: "Georgia, serif"          },
  { key: "Courier New", label: "Makina",   cssFn: "'Courier New', monospace" },
];

export function TextOverlay({
  fixedLeft, fixedTop,
  text, fontSize, fontFamily, color,
  onChange, onConfirm, onCancel,
}: TextOverlayProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dragRef  = useRef<{ sx: number; sy: number; ol: number; ot: number } | null>(null);

  /* Auto-focus when the overlay mounts */
  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(id);
  }, []);

  /* Drag-to-reposition */
  const startDrag = (cx: number, cy: number) => {
    dragRef.current = { sx: cx, sy: cy, ol: fixedLeft, ot: fixedTop };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      onChange({
        fixedLeft: dragRef.current.ol + x - dragRef.current.sx,
        fixedTop:  dragRef.current.ot + y - dragRef.current.sy,
      });
    };
    const onEnd = () => {
      dragRef.current = null;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
  };

  const activeFontCss = FONTS.find((f) => f.key === fontFamily)?.cssFn ?? fontFamily;

  return (
    <motion.div
      style={{
        position: "fixed",
        left: fixedLeft,
        top: fixedTop,
        zIndex: 100,
        background: "rgba(255,255,255,0.97)",
        border: "2px solid #e2e8f0",
        borderRadius: 14,
        boxShadow: "0 8px 36px rgba(0,0,0,.22)",
        minWidth: 228,
        maxWidth: "min(88vw, 300px)",
        overflow: "hidden",
        touchAction: "none",
      }}
      initial={{ scale: 0.82, opacity: 0 }}
      animate={{ scale: 1,    opacity: 1 }}
      exit={{   scale: 0.82, opacity: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Drag handle header ── */}
      <div
        onMouseDown={(e) => { e.preventDefault(); startDrag(e.clientX, e.clientY); }}
        onTouchStart={(e) => { startDrag(e.touches[0].clientX, e.touches[0].clientY); }}
        style={{
          background: "linear-gradient(135deg,#8b5cf6,#6d28d9)",
          padding: "8px 10px",
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          userSelect: "none",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontSize: "0.72rem",
            fontWeight: 900,
            fontFamily: "var(--app-font-sans)",
            letterSpacing: "0.03em",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          ⠿ Mugitu
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {/* Active colour preview */}
          <div
            style={{
              width: 16, height: 16, borderRadius: "50%",
              background: color,
              border: "2px solid rgba(255,255,255,.55)",
              flexShrink: 0,
            }}
          />
          {/* Cancel × */}
          <button
            onClick={(e) => { e.stopPropagation(); onCancel(); }}
            style={{
              background: "rgba(255,255,255,.22)",
              border: "none",
              color: "#fff",
              width: 22, height: 22,
              borderRadius: "50%",
              fontSize: "0.82rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "10px 12px 13px" }}>

        {/* Text input */}
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => onChange({ text: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === "Escape") { e.preventDefault(); onCancel(); }
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onConfirm(); }
          }}
          placeholder="Idatzi hemen..."
          rows={2}
          style={{
            display: "block",
            width: "100%",
            border: "1.5px solid #e2e8f0",
            borderRadius: 9,
            padding: "7px 9px",
            fontSize: fontSize,
            fontFamily: activeFontCss,
            color: color,
            resize: "none",
            outline: "none",
            boxSizing: "border-box",
            background: "#fafafa",
            lineHeight: 1.35,
            marginBottom: 10,
          }}
        />

        {/* Font size slider */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
          <span
            style={{
              fontSize: "0.63rem",
              fontWeight: 900,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              flexShrink: 0,
              fontFamily: "var(--app-font-sans)",
            }}
          >
            Tamaina
          </span>
          <input
            type="range"
            min={16}
            max={80}
            value={fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="accent-violet-500"
            style={{ flex: 1, cursor: "pointer" }}
          />
          <span
            style={{
              fontSize: "0.72rem",
              fontWeight: 800,
              color: "#475569",
              minWidth: 24,
              textAlign: "right",
              fontFamily: "var(--app-font-sans)",
            }}
          >
            {fontSize}
          </span>
        </div>

        {/* Font family */}
        <div style={{ display: "flex", gap: 5, marginBottom: 11 }}>
          {FONTS.map((f) => (
            <button
              key={f.key}
              onClick={() => onChange({ fontFamily: f.key })}
              style={{
                flex: 1,
                padding: "5px 3px",
                borderRadius: 7,
                border: fontFamily === f.key ? "2px solid #7c3aed" : "1.5px solid #e2e8f0",
                background: fontFamily === f.key ? "#f3f0ff" : "white",
                color: fontFamily === f.key ? "#6d28d9" : "#64748b",
                fontSize: "0.68rem",
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "var(--app-font-sans)",
                transition: "all .12s",
                fontStyle: f.key === "Georgia" ? "italic" : "normal",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          style={{
            width: "100%",
            background: text.trim()
              ? "linear-gradient(145deg,#8b5cf6,#6d28d9)"
              : "#e2e8f0",
            color: text.trim() ? "#fff" : "#94a3b8",
            border: "none",
            borderRadius: 10,
            padding: "9px",
            fontWeight: 900,
            fontSize: "0.88rem",
            cursor: text.trim() ? "pointer" : "default",
            fontFamily: "var(--app-font-sans)",
            transition: "background .15s",
            letterSpacing: "0.01em",
          }}
        >
          ✓ Jarri testua
        </button>
      </div>
    </motion.div>
  );
}
