import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type SvgDrawing } from "@/lib/drawings";
import { useColoring } from "@/hooks/useColoring";
import { ColorPalette } from "@/components/ColorPalette";
import { SaveToast } from "@/components/SaveToast";
import { saveDrawing } from "@/lib/storage";
import { usePoints } from "@/hooks/usePoints";

type Tool = "pintzel" | "eremuak";

const CANVAS_SIZE = 800;

interface ColoringPageProps {
  drawing: SvgDrawing;
  initialZoneColors?: Record<string, string>;
  initialBrushDataUrl?: string | null;
}

export function ColoringPage({ drawing, initialZoneColors, initialBrushDataUrl }: ColoringPageProps) {
  const { colors, svgContainerRef, paintZone, reset: resetZones } = useColoring(drawing, initialZoneColors);
  const { addPoints } = usePoints();

  const [activeColor, setActiveColor] = useState("#f43f6e");
  const [tool, setTool] = useState<Tool>("pintzel");
  const [brushSize, setBrushSize] = useState(14);
  const [saved, setSaved] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const undoStack = useRef<ImageData[]>([]);

  /* Load saved brush strokes on mount */
  useEffect(() => {
    if (!initialBrushDataUrl || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    img.src = initialBrushDataUrl;
  }, []); // only on mount

  /* ── Canvas brush helpers ── */

  const getPoint = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const src = "touches" in e ? e.touches[0] : e;
    return {
      x: ((src.clientX - rect.left) / rect.width) * CANVAS_SIZE,
      y: ((src.clientY - rect.top) / rect.height) * CANVAS_SIZE,
    };
  }, []);

  const saveSnapshot = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    undoStack.current.push(ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE));
    if (undoStack.current.length > 30) undoStack.current.shift();
  }, []);

  const startStroke = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (tool !== "pintzel") return;
      e.preventDefault();
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      saveSnapshot();
      isDrawing.current = true;
      const pt = getPoint(e);
      lastPoint.current = pt;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = activeColor;
      ctx.fill();
    },
    [tool, getPoint, brushSize, activeColor, saveSnapshot],
  );

  const continueStroke = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing.current || tool !== "pintzel") return;
      e.preventDefault();
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx || !lastPoint.current) return;
      const pt = getPoint(e);
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(pt.x, pt.y);
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      lastPoint.current = pt;
    },
    [tool, getPoint, brushSize, activeColor],
  );

  const endStroke = useCallback(() => {
    isDrawing.current = false;
    lastPoint.current = null;
  }, []);

  const undo = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || undoStack.current.length === 0) return;
    ctx.putImageData(undoStack.current.pop()!, 0, 0);
  }, []);

  const clearBrush = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    saveSnapshot();
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, [saveSnapshot]);

  const resetAll = useCallback(() => {
    resetZones();
    clearBrush();
    undoStack.current = [];
  }, [resetZones, clearBrush]);

  /* ── Composite export: zone SVG + brush canvas → PNG ── */

  const handleSave = useCallback(async () => {
    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (!svgEl) return;

    const clone = svgEl.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", `${CANVAS_SIZE}`);
    clone.setAttribute("height", `${CANVAS_SIZE}`);
    const serialized = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([serialized], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const output = document.createElement("canvas");
    output.width = CANVAS_SIZE;
    output.height = CANVAS_SIZE;
    const ctx = output.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, CANVAS_SIZE, CANVAS_SIZE); resolve(); };
      img.onerror = reject;
      img.src = url;
    });
    URL.revokeObjectURL(url);

    if (canvasRef.current) {
      ctx.drawImage(canvasRef.current, 0, 0);
    }

    const dataUrl = output.toDataURL("image/png");
    const brushDataUrl = canvasRef.current?.toDataURL("image/png") ?? "";

    saveDrawing({
      title: `${drawing.emoji} ${drawing.name} margoztua`,
      dataUrl,
      type: "coloring",
      editData: {
        drawingId: drawing.id,
        zoneColors: { ...colors },
        brushDataUrl,
      },
    });
    addPoints(15);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }, [drawing, svgContainerRef, colors, addPoints]);

  return (
    <div className="flex flex-col lg:flex-row flex-1 gap-3 p-3 sm:p-4 overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-52 shrink-0 pb-1 lg:pb-0">

        {/* Tool selector */}
        <div className="bg-white rounded-2xl p-3 shadow-sm flex gap-2 lg:flex-col min-w-fit lg:min-w-0 shrink-0">
          <p className="hidden lg:block text-xs font-black uppercase tracking-wide text-muted-foreground mb-1">
            Tresna
          </p>
          {(["pintzel", "eremuak"] as Tool[]).map((t) => (
            <motion.button
              key={t}
              onClick={() => setTool(t)}
              whileTap={{ scale: 0.92 }}
              className="btn-tool flex-1 lg:flex-none justify-center lg:justify-start"
              style={
                tool === t
                  ? {
                      background: t === "pintzel"
                        ? "linear-gradient(145deg,#b57bee,#8b42d4)"
                        : "linear-gradient(145deg,#38bdf8,#1a7fdb)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(0,0,0,.15)",
                    }
                  : { background: "#f8f5f0", color: "#64748b" }
              }
              data-testid={`tool-${t}`}
            >
              <span style={{ fontSize: "1.2rem" }}>{t === "pintzel" ? "🖌️" : "🎯"}</span>
              <span className="hidden sm:inline font-black">
                {t === "pintzel" ? "Pintzel" : "Eremuak"}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Brush size — only in brush mode */}
        {tool === "pintzel" && (
          <div className="bg-white rounded-2xl p-3 shadow-sm shrink-0 min-w-[160px] lg:min-w-0">
            <p className="text-xs font-black uppercase tracking-wide text-muted-foreground mb-2">
              Lodiera: {brushSize}px
            </p>
            <input
              type="range" min={4} max={40} value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full accent-purple-500"
              data-testid="slider-brush-size-color"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1 font-semibold">
              <span>Mehea</span><span>Lodia</span>
            </div>
          </div>
        )}

        {/* Zone chips — only in zone mode */}
        {tool === "eremuak" && (
          <div className="bg-white rounded-2xl p-3 shadow-sm shrink-0 min-w-fit lg:min-w-0">
            <p className="text-xs font-black uppercase tracking-wide text-muted-foreground mb-2">
              Eremuak
            </p>
            <div className="flex flex-wrap gap-1.5">
              {drawing.zones.map((zone) => {
                const bg = colors[zone] ?? "#e5e7eb";
                const isLight = ["#ffffff", "#fef08a", "#fef9c3", "#d9f99d", "#f8fafc"].includes(bg);
                return (
                  <motion.button
                    key={zone}
                    whileTap={{ scale: 0.88 }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-black border-2"
                    style={{
                      backgroundColor: bg,
                      borderColor: "rgba(0,0,0,0.12)",
                      color: isLight ? "#1e293b" : "#fff",
                    }}
                    onClick={() => paintZone(zone, activeColor)}
                    data-testid={`zone-${zone}`}
                  >
                    {zone}
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Color palette */}
        <div className="min-w-[200px] lg:min-w-0">
          <ColorPalette
            selectedColor={activeColor}
            onColorChange={setActiveColor}
            testIdPrefix="color-palette"
          />
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl p-3 shadow-sm flex lg:flex-col gap-2 shrink-0 min-w-fit lg:min-w-0">
          {tool === "pintzel" && (
            <motion.button
              onClick={undo} whileTap={{ scale: 0.91 }}
              className="btn-tool flex-1 lg:flex-none justify-center lg:justify-start"
              style={{ background: "#fef3c7", color: "#92400e" }}
              data-testid="button-undo-brush"
            >
              <span style={{ fontSize: "1.1rem" }}>↩️</span>
              <span className="hidden sm:inline font-black">Desegin</span>
            </motion.button>
          )}

          <motion.button
            onClick={resetAll} whileTap={{ scale: 0.91 }}
            className="btn-tool flex-1 lg:flex-none justify-center lg:justify-start"
            style={{ background: "#fee2e2", color: "#b91c1c" }}
            data-testid="button-reset-coloring"
          >
            <span style={{ fontSize: "1.1rem" }}>🔄</span>
            <span className="hidden sm:inline font-black">Berrezarri</span>
          </motion.button>

          <motion.button
            onClick={handleSave} whileTap={{ scale: 0.91 }}
            className="btn-tool flex-1 lg:flex-none justify-center lg:justify-start font-black text-white"
            style={{
              background: saved
                ? "linear-gradient(145deg,#34d399,#059669)"
                : "linear-gradient(145deg,#b57bee,#8b42d4)",
              boxShadow: "0 4px 12px rgba(0,0,0,.14)",
            }}
            data-testid="button-save-coloring"
          >
            <span style={{ fontSize: "1.1rem" }}>{saved ? "✅" : "💾"}</span>
            <span className="hidden sm:inline">{saved ? "Gordeta!" : "Gorde"}</span>
          </motion.button>
        </div>

        {/* Contextual hint */}
        <p
          className="hidden lg:block rounded-2xl p-3 text-xs text-muted-foreground font-bold leading-snug"
          style={{ background: "rgba(255,255,255,0.6)" }}
        >
          {tool === "pintzel"
            ? "💡 Erabili pintzela marrazkia askatasunez margolatzeko"
            : "💡 Sakatu eremu bat kolore batekin betetzeko"}
        </p>
      </aside>

      {/* ── Drawing area: SVG base + canvas overlay ── */}
      <div
        className="flex-1 rounded-3xl flex items-center justify-center p-4 relative"
        style={{
          minHeight: 360,
          background: "#fff",
          boxShadow: "0 6px 28px rgba(180,120,80,.14), 0 1px 3px rgba(0,0,0,.06)",
        }}
      >
        <motion.div
          className="relative w-full max-w-xs sm:max-w-sm aspect-square"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          data-testid="coloring-area"
        >
          {/* Layer 1 — Zone-coloured SVG */}
          <div ref={svgContainerRef} className="w-full h-full">
            {drawing.render(
              colors,
              tool === "eremuak" ? (z) => paintZone(z, activeColor) : () => {},
            )}
          </div>

          {/* Layer 2 — Brush canvas (transparent overlay) */}
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="absolute inset-0 w-full h-full rounded-2xl"
            style={{
              pointerEvents: tool === "pintzel" ? "all" : "none",
              cursor: tool === "pintzel" ? "crosshair" : "default",
              touchAction: "none",
            }}
            onMouseDown={startStroke}
            onMouseMove={continueStroke}
            onMouseUp={endStroke}
            onMouseLeave={endStroke}
            onTouchStart={startStroke}
            onTouchMove={continueStroke}
            onTouchEnd={endStroke}
            data-testid="canvas-brush"
          />
        </motion.div>

        {/* Active tool badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-black text-white shadow-md"
          style={{
            background:
              tool === "pintzel"
                ? "linear-gradient(145deg,#b57bee,#8b42d4)"
                : "linear-gradient(145deg,#38bdf8,#1a7fdb)",
          }}
        >
          {tool === "pintzel" ? "🖌️ Pintzel" : "🎯 Eremuak"}
        </div>
      </div>

      <AnimatePresence>
        {saved && <SaveToast message="Gordeta! +15 ⭐" />}
      </AnimatePresence>
    </div>
  );
}
