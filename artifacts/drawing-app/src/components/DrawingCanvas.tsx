import { motion, AnimatePresence } from "framer-motion";
import { type DrawTool, useDrawing } from "@/hooks/useDrawing";
import { SaveToast } from "@/components/SaveToast";
import { ColorPickerPanel } from "@/components/ColorPickerPanel";
import { TextOverlay, type TextOverlayData } from "@/components/TextOverlay";
import { saveDrawing } from "@/lib/storage";
import { usePoints } from "@/hooks/usePoints";
import { useState } from "react";

const RECENT_KEY = "nirekoloreak_recent";

/* Approximate size of the TextOverlay card — used to clamp position to viewport */
const OVL_W = 304;
const OVL_H = 248;

interface DrawingCanvasProps {
  initialCanvasDataUrl?: string | null;
  onBack: () => void;
  isEditing?: boolean;
}

type ToolDef = { value: DrawTool; label: string; emoji: string; gradient: string; topGradient: string; cursor: string };

/* ── 6 creative brush types ── */
const BRUSH_TOOLS: ToolDef[] = [
  {
    value: "brush",
    label: "Pintzela",
    emoji: "🖌️",
    gradient: "linear-gradient(145deg,#f74c6f,#d42050)",
    topGradient: "linear-gradient(145deg,#f74c6f,#c81a46)",
    cursor: "crosshair",
  },
  {
    value: "spray",
    label: "Spraya",
    emoji: "🫧",
    gradient: "linear-gradient(145deg,#a78bfa,#7c3aed)",
    topGradient: "linear-gradient(145deg,#9f5ee8,#6820c0)",
    cursor: "crosshair",
  },
  {
    value: "dots",
    label: "Puntuak",
    emoji: "⬤",
    gradient: "linear-gradient(145deg,#4ade80,#16a34a)",
    topGradient: "linear-gradient(145deg,#22c55e,#15803d)",
    cursor: "crosshair",
  },
  {
    value: "stars",
    label: "Izarrak",
    emoji: "⭐",
    gradient: "linear-gradient(145deg,#fbbf24,#d97706)",
    topGradient: "linear-gradient(145deg,#f59e0b,#b45309)",
    cursor: "crosshair",
  },
  {
    value: "squares",
    label: "Karratuak",
    emoji: "⬛",
    gradient: "linear-gradient(145deg,#2dd4bf,#0d9488)",
    topGradient: "linear-gradient(145deg,#14b8a6,#0f766e)",
    cursor: "crosshair",
  },
  {
    value: "lines",
    label: "Marrak",
    emoji: "≡",
    gradient: "linear-gradient(145deg,#38bdf8,#0284c7)",
    topGradient: "linear-gradient(145deg,#0ea5e9,#0369a1)",
    cursor: "crosshair",
  },
];

/* ── 2 utility tools: eraser + text ── */
const UTIL_TOOLS: ToolDef[] = [
  {
    value: "eraser",
    label: "Borragoma",
    emoji: "🧹",
    gradient: "linear-gradient(145deg,#fb923c,#ea6d00)",
    topGradient: "linear-gradient(145deg,#f97316,#c25400)",
    cursor: "cell",
  },
  {
    value: "text",
    label: "Testua",
    emoji: "Aa",
    gradient: "linear-gradient(145deg,#8b5cf6,#6d28d9)",
    topGradient: "linear-gradient(145deg,#8b5cf6,#5b21b6)",
    cursor: "text",
  },
];

const ALL_TOOLS: ToolDef[] = [...BRUSH_TOOLS, ...UTIL_TOOLS];

/* 10 vibrant quick-access colors shown in the toolbar row */
const QUICK_COLORS = [
  "#f43f5e", "#fb923c", "#facc15", "#4ade80",
  "#38bdf8", "#a78bfa", "#f472b6", "#2dd4bf",
  "#1e293b", "#92400e",
];

function loadRecentColors(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"); }
  catch { return []; }
}

export function DrawingCanvas({ initialCanvasDataUrl, onBack, isEditing = false }: DrawingCanvasProps) {
  const {
    canvasRef,
    tool,
    setTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
    canUndo,
    startStroke,
    continueStroke,
    endStroke,
    undo,
    clear,
    getDataUrl,
    pushUndoSnapshot,
    canvasWidth,
    canvasHeight,
  } = useDrawing(initialCanvasDataUrl);

  const { addPoints } = usePoints();
  const [saved, setSaved]         = useState(false);
  const [saving, setSaving]       = useState(false);
  const [quotaErr, setQuotaErr]   = useState(false);
  const [colorPanelOpen, setColorPanelOpen] = useState(false);
  const [recentColors, setRecentColors]     = useState<string[]>(loadRecentColors);
  const [textOverlay, setTextOverlay]       = useState<TextOverlayData | null>(null);

  /* ── Text tool: place a new overlay at the tapped canvas position ── */
  const placeText = (clientX: number, clientY: number) => {
    if (textOverlay) return; // one at a time
    const left = Math.max(8, Math.min(clientX, window.innerWidth  - OVL_W - 8));
    const top  = Math.max(8, Math.min(clientY, window.innerHeight - OVL_H - 8));
    setTextOverlay({ fixedLeft: left, fixedTop: top, text: "", fontSize: 40, fontFamily: "Fredoka One" });
  };

  /* ── Text tool: stamp the overlay text onto the canvas pixels ── */
  const stampText = () => {
    if (!textOverlay?.text.trim()) { setTextOverlay(null); return; }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const cx     = (textOverlay.fixedLeft - rect.left) * scaleX;
    const cy     = (textOverlay.fixedTop  - rect.top)  * scaleY;
    const cSize  = Math.round(textOverlay.fontSize * ((scaleX + scaleY) / 2));

    pushUndoSnapshot();
    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.font          = `bold ${cSize}px '${textOverlay.fontFamily}'`;
    ctx.fillStyle     = color;
    ctx.textBaseline  = "top";
    ctx.fillText(textOverlay.text, cx, cy);
    ctx.restore();
    setTextOverlay(null);
  };

  const handleColorChange = (c: string) => {
    setColor(c);
    if (tool === "eraser") setTool("brush");
    /* Track in recent colors — newest first, deduplicated, max 8 */
    setRecentColors((prev) => {
      const updated = [c, ...prev.filter((x) => x !== c)].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSave = async () => {
    if (saving) return;
    const dataUrl = getDataUrl();
    if (!dataUrl) return;
    setSaving(true);
    try {
      await saveDrawing({
        title: `Marrazkia ${new Date().toLocaleDateString("eu")}`,
        dataUrl,
        type: "drawing",
      });
      addPoints(10);
      setSaved(true);
      setTimeout(() => setSaved(false), 2400);
    } catch {
      setQuotaErr(true);
      setTimeout(() => setQuotaErr(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  const activeTool = ALL_TOOLS.find((t) => t.value === tool)!;

  /* Brush preview dot size (clamped to a visible range) */
  const dotSize = Math.max(8, Math.min(brushSize * 0.65, 22));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        overflow: "hidden",
        background: "hsl(215 20% 97%)",
      }}
    >
      {/* ── TOP BAR ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 10px",
          height: 54,
          flexShrink: 0,
          background: activeTool.topGradient,
          boxShadow: "0 2px 10px rgba(0,0,0,.14)",
          transition: "background 0.3s ease",
        }}
      >
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            color: "#fff",
            background: "rgba(0,0,0,.20)",
            border: "1.5px solid rgba(255,255,255,.24)",
            padding: "7px 12px",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
            minHeight: 38,
            fontFamily: "var(--app-font-sans)",
            cursor: "pointer",
          }}
          data-testid="button-toolbar-back"
        >
          ← Hasiera
        </button>

        {/* Title */}
        <h2
          style={{
            flex: 1,
            textAlign: "center",
            color: "white",
            fontFamily: "var(--app-font-display)",
            fontSize: "clamp(0.95rem, 4vw, 1.15rem)",
            fontWeight: 600,
            letterSpacing: "0.01em",
            margin: 0,
          }}
        >
          {isEditing ? "✏️ Editatzen..." : "✏️ Marraztu"}
        </h2>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            color: "#fff",
            background: saved
              ? "rgba(0,180,90,.55)"
              : saving
              ? "rgba(0,0,0,.10)"
              : "rgba(0,0,0,.20)",
            border: "1.5px solid rgba(255,255,255,.24)",
            padding: "7px 12px",
            borderRadius: 10,
            fontWeight: 800,
            fontSize: "0.85rem",
            whiteSpace: "nowrap",
            minHeight: 38,
            fontFamily: "var(--app-font-sans)",
            cursor: saving ? "default" : "pointer",
            transition: "background 0.25s",
            opacity: saving ? 0.7 : 1,
          }}
          data-testid="button-save"
        >
          {saved ? "✅ Gordeta!" : saving ? "⏳..." : "💾 Gorde"}
        </button>
      </div>

      {/* ── CANVAS AREA ── */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          padding: "8px 8px 0",
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            position: "relative",
            background: "#fff",
            borderRadius: "1rem 1rem 0 0",
            overflow: "hidden",
            boxShadow: "0 2px 16px rgba(60,80,140,.12), 0 1px 4px rgba(0,0,0,.06)",
          }}
        >
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              cursor: activeTool.cursor,
              touchAction: "none",
            }}
            onPointerDown={(e) => {
              // Capture keeps pointermove/up firing even if finger leaves the element
              e.currentTarget.setPointerCapture(e.pointerId);
              if (tool === "text") { placeText(e.clientX, e.clientY); }
              else { startStroke(e); }
            }}
            onPointerMove={continueStroke}
            onPointerUp={endStroke}
            onPointerCancel={endStroke}
            data-testid="canvas-draw"
          />

          {/* Text-mode hint — shown when text tool is active and no overlay is open */}
          {tool === "text" && !textOverlay && (
            <div
              style={{
                position: "absolute",
                bottom: 14,
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(109,40,217,0.82)",
                color: "#fff",
                padding: "7px 16px",
                borderRadius: 20,
                fontSize: "0.8rem",
                fontWeight: 800,
                fontFamily: "var(--app-font-sans)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 3px 10px rgba(109,40,217,.30)",
                backdropFilter: "blur(4px)",
              }}
            >
              ✏️ Sakatu lienzoan testua jartzeko
            </div>
          )}

          {/* Active-tool badge (top-right of canvas) */}
          <div
            className="pointer-events-none"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "5px 12px",
              borderRadius: 99,
              background: activeTool.gradient,
              color: "#fff",
              fontSize: "0.78rem",
              fontWeight: 800,
              fontFamily: "var(--app-font-sans)",
              boxShadow: "0 2px 8px rgba(0,0,0,.18)",
              transition: "background 0.3s",
            }}
          >
            <span style={{ fontSize: "1rem" }}>{activeTool.emoji}</span>
            <span>{activeTool.label}</span>
          </div>
        </div>
      </div>

      {/* ── BOTTOM TOOLBAR ── position:relative so the color panel slides up from here */}
      <div
        style={{
          flexShrink: 0,
          position: "relative",
          zIndex: 50,
          background: "#ffffff",
          boxShadow: "0 -3px 16px rgba(60,80,140,.10)",
          padding: "8px 12px",
          paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        {/* ── Color picker panel — slides up above toolbar ── */}
        <ColorPickerPanel
          isOpen={colorPanelOpen}
          onClose={() => setColorPanelOpen(false)}
          color={color}
          recentColors={recentColors}
          onColorChange={handleColorChange}
        />

        {/* ── Row 1: 6 Brush type buttons ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 7,
          }}
        >
          {BRUSH_TOOLS.map((t) => {
            const active = tool === t.value;
            return (
              <motion.button
                key={t.value}
                onClick={() => { setTool(t.value); setTextOverlay(null); }}
                whileTap={{ scale: 0.84 }}
                title={t.label}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "none",
                  background: active ? t.gradient : "rgba(0,0,0,.055)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  cursor: "pointer",
                  boxShadow: active ? "0 3px 10px rgba(0,0,0,.20)" : "none",
                  transform: active ? "scale(1.09)" : "scale(1)",
                  transition: "background 0.18s, box-shadow 0.18s, transform 0.18s",
                  flexShrink: 0,
                }}
                data-testid={`button-tool-${t.value}`}
              >
                <span style={{
                  fontSize: t.value === "lines" ? "1.05rem" : "1.1rem",
                  lineHeight: 1,
                  color: active ? "#fff" : "#475569",
                  fontWeight: t.value === "lines" ? 900 : undefined,
                }}>
                  {t.emoji}
                </span>
                <span style={{
                  fontSize: "0.53rem",
                  fontWeight: 700,
                  letterSpacing: 0,
                  color: active ? "rgba(255,255,255,.85)" : "#94a3b8",
                  fontFamily: "var(--app-font-sans)",
                  lineHeight: 1,
                  maxWidth: 40,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {t.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ── Row 2: Util tools + Size slider + Undo/Clear ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            marginBottom: 8,
          }}
        >
          {/* Eraser + Text (utility tools) */}
          {UTIL_TOOLS.map((t) => {
            const active = tool === t.value;
            return (
              <motion.button
                key={t.value}
                onClick={() => { setTool(t.value); if (t.value !== "text") setTextOverlay(null); }}
                whileTap={{ scale: 0.88 }}
                title={t.label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  border: "none",
                  background: active ? t.gradient : "rgba(0,0,0,.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: t.value === "text" ? "0.78rem" : "1.1rem",
                  fontWeight: t.value === "text" ? 900 : undefined,
                  fontFamily: t.value === "text" ? "var(--app-font-display)" : undefined,
                  flexShrink: 0,
                  cursor: "pointer",
                  boxShadow: active ? "0 3px 10px rgba(0,0,0,.18)" : "none",
                  transform: active ? "scale(1.08)" : "scale(1)",
                  transition: "background 0.18s, box-shadow 0.18s, transform 0.18s",
                  color: active ? "#fff" : "#475569",
                }}
                data-testid={`button-tool-${t.value}`}
              >
                {t.emoji}
              </motion.button>
            );
          })}

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: "rgba(0,0,0,.10)", margin: "0 1px", flexShrink: 0 }} />

          {/* Brush size preview dot */}
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background: tool === "eraser" ? "#e2e8f0" : color,
              border: "1.5px solid rgba(0,0,0,.14)",
              flexShrink: 0,
              transition: "all .15s",
            }}
          />

          {/* Brush size slider */}
          <input
            type="range"
            min={4}
            max={40}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="accent-pink-500"
            style={{ flex: 1, minWidth: 40, cursor: "pointer" }}
            data-testid="slider-brush-size"
          />

          {/* Divider */}
          <div style={{ width: 1, height: 28, background: "rgba(0,0,0,.10)", margin: "0 1px", flexShrink: 0 }} />

          {/* Undo */}
          <motion.button
            onClick={undo}
            disabled={!canUndo}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              border: "none",
              background: "#fef3c7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              flexShrink: 0,
              cursor: canUndo ? "pointer" : "default",
              opacity: canUndo ? 1 : 0.34,
            }}
            data-testid="button-undo"
          >
            ↩️
          </motion.button>

          {/* Clear */}
          <motion.button
            onClick={clear}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              border: "none",
              background: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              flexShrink: 0,
              cursor: "pointer",
            }}
            data-testid="button-clear"
          >
            🗑️
          </motion.button>
        </div>

        {/* ── Row 2: Current color swatch + 10 quick colors + panel button ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Current color swatch — tap to open full panel */}
          <motion.button
            onClick={() => setColorPanelOpen((o) => !o)}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: color,
              border: "3px solid white",
              boxShadow: `0 0 0 2px ${color}, 0 2px 8px rgba(0,0,0,.22)`,
              cursor: "pointer",
              flexShrink: 0,
              transition: "box-shadow .15s",
            }}
            data-testid="button-color-swatch"
            title="Kolore gehiago"
          />

          {/* 10 quick-access preset colors */}
          {QUICK_COLORS.map((c) => {
            const isSelected = color === c;
            return (
              <motion.button
                key={c}
                onClick={() => handleColorChange(c)}
                whileTap={{ scale: 0.8 }}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: c,
                  border: isSelected ? "2.5px solid #1e293b" : "1.5px solid rgba(0,0,0,.14)",
                  boxShadow: isSelected
                    ? "0 0 0 2px white, 0 0 0 4px #1e293b"
                    : "0 1px 3px rgba(0,0,0,.16)",
                  cursor: "pointer",
                  transform: isSelected ? "scale(1.22)" : "scale(1)",
                  transition: "transform .12s, box-shadow .12s",
                  flexShrink: 0,
                }}
                data-testid={`draw-color-${c.replace("#", "")}`}
              />
            );
          })}

          {/* "More colors" panel button */}
          <motion.button
            onClick={() => setColorPanelOpen((o) => !o)}
            whileTap={{ scale: 0.88 }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: colorPanelOpen
                ? "2px solid #8b5cf6"
                : "1.5px solid rgba(0,0,0,.14)",
              background: colorPanelOpen
                ? "linear-gradient(135deg,#f74c6f,#8b5cf6)"
                : "linear-gradient(135deg,#f8fafc,#e2e8f0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
              cursor: "pointer",
              flexShrink: 0,
              boxShadow: colorPanelOpen ? "0 2px 8px rgba(139,92,246,.35)" : "none",
              transition: "background .15s, box-shadow .15s",
            }}
            data-testid="button-color-more"
            title="Kolore guztiak"
          >
            🎨
          </motion.button>
        </div>
      </div>

      {/* ── Text overlay ── */}
      <AnimatePresence>
        {textOverlay && (
          <TextOverlay
            {...textOverlay}
            color={color}
            onChange={(data) => setTextOverlay((prev) => prev ? { ...prev, ...data } : null)}
            onConfirm={stampText}
            onCancel={() => setTextOverlay(null)}
          />
        )}
      </AnimatePresence>

      {/* ── Save toast ── */}
      <AnimatePresence>
        {saved && <SaveToast message="Gordeta! +10 ⭐" />}
      </AnimatePresence>

      {/* ── Quota error toast ── */}
      <AnimatePresence>
        {quotaErr && (
          <motion.div
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 rounded-full px-6 py-3.5 font-black text-white text-sm shadow-xl"
            style={{ background: "linear-gradient(145deg,#f74c6f,#d42050)" }}
            initial={{ opacity: 0, y: 20, x: "-50%", scale: 0.8 }}
            animate={{ opacity: 1, y: 0,  x: "-50%", scale: 1   }}
            exit={{   opacity: 0, y: -12, x: "-50%", scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <span style={{ fontSize: "1.3rem" }}>⚠️</span>
            <span>Memoria beteta! Ezabatu zaharren bat.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
