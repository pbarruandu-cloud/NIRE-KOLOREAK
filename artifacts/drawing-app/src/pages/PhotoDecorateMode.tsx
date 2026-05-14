import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Stage, Layer, Image as KonvaImage, Line, Text } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Stage as KonvaStage } from "konva/lib/Stage";
import { PageTransition } from "@/components/PageTransition";
import { SaveToast } from "@/components/SaveToast";
import { saveDrawing } from "@/lib/storage";
import { usePoints } from "@/hooks/usePoints";

type PhotoLine = {
  id: string;
  points: number[];
  color: string;
  width: number;
};

type PhotoSticker = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  fontSize: number;
};

type PhotoText = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
};

type Snapshot = {
  lines: PhotoLine[];
  stickers: PhotoSticker[];
  texts: PhotoText[];
};

const STICKERS = ["⭐", "💖", "🌈", "🦋", "🌸", "🐱", "🦄", "🚀", "🎈", "👑"];
const COLORS = ["#f43f5e", "#fb923c", "#facc15", "#22c55e", "#38bdf8", "#8b5cf6", "#f472b6", "#111827"];

function useLoadedImage(src: string | null) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!src) {
      setImage(null);
      return;
    }
    const img = new window.Image();
    img.onload = () => setImage(img);
    img.onerror = () => setImage(null);
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return image;
}

function fitImage(image: HTMLImageElement | null, stageWidth: number, stageHeight: number) {
  if (!image) return { x: 0, y: 0, width: stageWidth, height: stageHeight };
  const scale = Math.min(stageWidth / image.width, stageHeight / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  return {
    x: (stageWidth - width) / 2,
    y: (stageHeight - height) / 2,
    width,
    height,
  };
}

export default function PhotoDecorateMode() {
  const [, setLocation] = useLocation();
  const stageRef = useRef<KonvaStage | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const drawingRef = useRef(false);

  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const photoImage = useLoadedImage(photoDataUrl);
  const [stageSize, setStageSize] = useState({ width: 360, height: 420 });
  const [lines, setLines] = useState<PhotoLine[]>([]);
  const [stickers, setStickers] = useState<PhotoSticker[]>([]);
  const [texts, setTexts] = useState<PhotoText[]>([]);
  const [history, setHistory] = useState<Snapshot[]>([]);
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [brushSize, setBrushSize] = useState(12);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [quotaErr, setQuotaErr] = useState(false);
  const { addPoints } = usePoints();

  useEffect(() => {
    const resize = () => {
      const width = Math.min(window.innerWidth - 16, 960);
      const topAndToolbar = 236;
      const height = Math.max(280, window.innerHeight - topAndToolbar);
      setStageSize({ width, height });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const imageRect = useMemo(() => fitImage(photoImage, stageSize.width, stageSize.height), [photoImage, stageSize]);
  const selectedSticker = stickers.find((s) => s.id === selectedStickerId) ?? null;
  const selectedText = texts.find((t) => t.id === selectedTextId) ?? null;

  const pushHistory = () => {
    setHistory((prev) => [...prev.slice(-19), { lines, stickers, texts }]);
  };

  const resetDecorations = () => {
    pushHistory();
    setLines([]);
    setStickers([]);
    setTexts([]);
    setSelectedStickerId(null);
    setSelectedTextId(null);
  };

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoDataUrl(String(reader.result));
      setLines([]);
      setStickers([]);
      setTexts([]);
      setHistory([]);
      setSelectedStickerId(null);
      setSelectedTextId(null);
    };
    reader.readAsDataURL(file);
  };

  const getPointer = () => stageRef.current?.getPointerPosition();

  const startLine = (e: KonvaEventObject<PointerEvent>) => {
    if (!photoImage) return;
    if (e.target !== e.target.getStage()) return;
    const pos = getPointer();
    if (!pos) return;
    pushHistory();
    setSelectedStickerId(null);
    setSelectedTextId(null);
    drawingRef.current = true;
    setLines((prev) => [
      ...prev,
      { id: `line_${Date.now()}`, points: [pos.x, pos.y], color, width: brushSize },
    ]);
  };

  const continueLine = () => {
    if (!drawingRef.current) return;
    const pos = getPointer();
    if (!pos) return;
    setLines((prev) => {
      const next = [...prev];
      const last = next[next.length - 1];
      if (!last) return prev;
      next[next.length - 1] = { ...last, points: [...last.points, pos.x, pos.y] };
      return next;
    });
  };

  const endLine = () => {
    drawingRef.current = false;
  };

  const addSticker = (emoji: string) => {
    if (!photoImage) return;
    pushHistory();
    const id = `sticker_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const sticker = {
      id,
      emoji,
      x: stageSize.width / 2,
      y: stageSize.height / 2,
      fontSize: 58,
    };
    setStickers((prev) => [...prev, sticker]);
    setSelectedStickerId(id);
    setSelectedTextId(null);
  };

  const addText = () => {
    if (!photoImage) return;
    pushHistory();
    const id = `text_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const text = {
      id,
      text: "Kaixo!",
      x: imageRect.x + imageRect.width / 2,
      y: imageRect.y + imageRect.height / 2,
      fontSize: 42,
      color,
    };
    setTexts((prev) => [...prev, text]);
    setSelectedTextId(id);
    setSelectedStickerId(null);
  };

  const updateSticker = (id: string, patch: Partial<PhotoSticker>) => {
    setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  };

  const updateText = (id: string, patch: Partial<PhotoText>) => {
    setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const resizeSticker = (delta: number) => {
    if (!selectedSticker) return;
    pushHistory();
    updateSticker(selectedSticker.id, { fontSize: Math.max(28, Math.min(130, selectedSticker.fontSize + delta)) });
  };

  const deleteSelectedSticker = () => {
    if (!selectedSticker) return;
    pushHistory();
    setStickers((prev) => prev.filter((s) => s.id !== selectedSticker.id));
    setSelectedStickerId(null);
  };

  const resizeText = (delta: number) => {
    if (!selectedText) return;
    pushHistory();
    updateText(selectedText.id, { fontSize: Math.max(22, Math.min(110, selectedText.fontSize + delta)) });
  };

  const deleteSelectedText = () => {
    if (!selectedText) return;
    pushHistory();
    setTexts((prev) => prev.filter((t) => t.id !== selectedText.id));
    setSelectedTextId(null);
  };

  const handleColorSelect = (nextColor: string) => {
    setColor(nextColor);
    if (!selectedText) return;
    pushHistory();
    updateText(selectedText.id, { color: nextColor });
  };

  const undo = () => {
    setHistory((prev) => {
      const last = prev[prev.length - 1];
      if (!last) return prev;
      setLines(last.lines);
      setStickers(last.stickers);
      setTexts(last.texts);
      setSelectedStickerId(null);
      setSelectedTextId(null);
      return prev.slice(0, -1);
    });
  };

  const handleSave = async () => {
    if (!stageRef.current || saving || !photoImage) return;
    setSaving(true);
    setSelectedStickerId(null);
    setSelectedTextId(null);
    await new Promise((resolve) => window.requestAnimationFrame(resolve));
    try {
      const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2, mimeType: "image/png" });
      await saveDrawing({
        title: `Argazkia ${new Date().toLocaleDateString("eu")}`,
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

  return (
    <PageTransition className="min-h-screen flex flex-col">
      <div className="flex min-h-screen flex-col" style={{ background: "hsl(215 20% 97%)" }}>
        <div
          className="flex items-center gap-2 px-3 py-2"
          style={{ background: "linear-gradient(145deg,#8b5cf6,#0ea5e9)", boxShadow: "0 2px 12px rgba(0,0,0,.14)" }}
        >
          <button onClick={() => setLocation("/")} className="rounded-xl bg-black/20 px-3 py-2 text-sm font-black text-white" data-testid="button-photo-back">
            ← Hasiera
          </button>
          <h1 className="flex-1 text-center font-display text-lg font-bold text-white">📸 Argazkia apaindu</h1>
          <button
            onClick={handleSave}
            disabled={!photoImage || saving}
            className="rounded-xl bg-black/20 px-3 py-2 text-sm font-black text-white disabled:opacity-40"
            data-testid="button-photo-save"
          >
            {saved ? "✅" : saving ? "⏳" : "💾 Gorde"}
          </button>
        </div>

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col p-2">
          {!photoImage ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 rounded-3xl bg-white p-6 text-center shadow-lg">
              <span style={{ fontSize: "4rem" }}>🌈</span>
              <div>
                <h2 className="font-display text-3xl font-bold text-slate-800">Aukeratu argazki bat</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">Carga una foto o haz una nueva para decorarla con dibujos y pegatinas.</p>
              </div>
              <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
                <button onClick={() => fileInputRef.current?.click()} className="btn-main flex-1" style={{ background: "linear-gradient(145deg,#f74c6f,#d42050)" }} data-testid="button-load-photo">
                  <span style={{ fontSize: "2rem" }}>🖼️</span>
                  <span>Kargatu</span>
                </button>
                <button onClick={() => cameraInputRef.current?.click()} className="btn-main flex-1" style={{ background: "linear-gradient(145deg,#2ea8f0,#0e7fd4)" }} data-testid="button-take-photo">
                  <span style={{ fontSize: "2rem" }}>📷</span>
                  <span>Kamera</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-white p-2 shadow-md">
                <button onClick={() => fileInputRef.current?.click()} className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">🖼️ Aldatu</button>
                <button onClick={undo} disabled={!history.length} className="rounded-xl bg-amber-100 px-3 py-2 text-sm font-black text-amber-700 disabled:opacity-35" data-testid="button-photo-undo">↩️ Desegin</button>
                <button onClick={resetDecorations} className="rounded-xl bg-rose-100 px-3 py-2 text-sm font-black text-rose-700">🧽 Garbitu</button>
                <button onClick={addText} className="rounded-xl bg-violet-100 px-3 py-2 text-sm font-black text-violet-700" data-testid="button-photo-text">Aa Testua</button>
                {selectedSticker && (
                  <>
                    <button onClick={() => resizeSticker(-10)} className="rounded-xl bg-violet-100 px-3 py-2 text-sm font-black text-violet-700" data-testid="button-sticker-smaller">➖</button>
                    <button onClick={() => resizeSticker(10)} className="rounded-xl bg-violet-100 px-3 py-2 text-sm font-black text-violet-700" data-testid="button-sticker-bigger">➕</button>
                    <button onClick={deleteSelectedSticker} className="rounded-xl bg-red-100 px-3 py-2 text-sm font-black text-red-700">🗑️</button>
                  </>
                )}
                {selectedText && (
                  <>
                    <input
                      value={selectedText.text}
                      onChange={(event) => updateText(selectedText.id, { text: event.target.value.slice(0, 36) })}
                      onFocus={() => pushHistory()}
                      className="min-w-0 flex-1 rounded-xl bg-violet-50 px-3 py-2 text-sm font-black text-violet-800 outline-none ring-2 ring-violet-100"
                      placeholder="Idatzi testua"
                      data-testid="input-photo-text"
                    />
                    <button onClick={() => resizeText(-6)} className="rounded-xl bg-violet-100 px-3 py-2 text-sm font-black text-violet-700" data-testid="button-text-smaller">➖</button>
                    <button onClick={() => resizeText(6)} className="rounded-xl bg-violet-100 px-3 py-2 text-sm font-black text-violet-700" data-testid="button-text-bigger">➕</button>
                    <button onClick={deleteSelectedText} className="rounded-xl bg-red-100 px-3 py-2 text-sm font-black text-red-700" data-testid="button-text-delete">🗑️</button>
                  </>
                )}
              </div>

              <div className="overflow-hidden rounded-3xl bg-white shadow-xl" style={{ height: stageSize.height }} data-testid="photo-stage-wrap">
                <Stage
                  ref={stageRef}
                  width={stageSize.width}
                  height={stageSize.height}
                  onPointerDown={startLine}
                  onPointerMove={continueLine}
                  onPointerUp={endLine}
                  onPointerCancel={endLine}
                  style={{ touchAction: "none", margin: "0 auto", background: "#f8fafc" }}
                >
                  <Layer>
                    <KonvaImage image={photoImage} {...imageRect} listening={false} />
                    {lines.map((line) => (
                      <Line
                        key={line.id}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={line.width}
                        tension={0.45}
                        lineCap="round"
                        lineJoin="round"
                        listening={false}
                      />
                    ))}
                    {stickers.map((sticker) => {
                      const selected = sticker.id === selectedStickerId;
                      return (
                        <Text
                          key={sticker.id}
                          text={sticker.emoji}
                          x={sticker.x}
                          y={sticker.y}
                          fontSize={sticker.fontSize}
                          draggable
                          offsetX={sticker.fontSize / 2}
                          offsetY={sticker.fontSize / 2}
                          shadowColor={selected ? "#8b5cf6" : "rgba(0,0,0,.25)"}
                          shadowBlur={selected ? 14 : 5}
                          shadowOffset={{ x: 0, y: 2 }}
                          onPointerDown={(event) => {
                            event.cancelBubble = true;
                            setSelectedStickerId(sticker.id);
                            setSelectedTextId(null);
                          }}
                          onDragStart={() => pushHistory()}
                          onDragEnd={(event) => updateSticker(sticker.id, { x: event.target.x(), y: event.target.y() })}
                        />
                      );
                    })}
                    {texts.map((textItem) => {
                      const selected = textItem.id === selectedTextId;
                      return (
                        <Text
                          key={textItem.id}
                          text={textItem.text}
                          x={textItem.x}
                          y={textItem.y}
                          width={260}
                          align="center"
                          fontSize={textItem.fontSize}
                          fontFamily="Fredoka One"
                          fontStyle="bold"
                          fill={textItem.color}
                          draggable
                          offsetX={130}
                          offsetY={textItem.fontSize / 2}
                          shadowColor={selected ? "#8b5cf6" : "rgba(0,0,0,.30)"}
                          shadowBlur={selected ? 16 : 4}
                          shadowOffset={{ x: 0, y: 2 }}
                          onPointerDown={(event) => {
                            event.cancelBubble = true;
                            setSelectedTextId(textItem.id);
                            setSelectedStickerId(null);
                            setColor(textItem.color);
                          }}
                          onDragStart={() => pushHistory()}
                          onDragEnd={(event) => updateText(textItem.id, { x: event.target.x(), y: event.target.y() })}
                        />
                      );
                    })}
                  </Layer>
                </Stage>
              </div>

              <div className="mt-2 rounded-2xl bg-white p-2 shadow-md">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">Pintzela</span>
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => handleColorSelect(c)}
                      className="h-8 w-8 rounded-full"
                      style={{ background: c, border: color === c ? "3px solid #111827" : "2px solid white", boxShadow: "0 1px 5px rgba(0,0,0,.22)" }}
                      data-testid={`photo-color-${c.replace("#", "")}`}
                    />
                  ))}
                  <input className="min-w-20 flex-1 accent-pink-500" type="range" min={4} max={34} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} data-testid="slider-photo-brush" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {STICKERS.map((emoji) => (
                    <motion.button
                      key={emoji}
                      onClick={() => addSticker(emoji)}
                      whileTap={{ scale: 0.88 }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-sky-100 text-3xl shadow-sm"
                      data-testid={`button-sticker-${emoji}`}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
                <p className="mt-1 text-center text-xs font-bold text-slate-400">Marraztu hatzarekin. Pegatinak mugitu, hautatu eta ➕/➖ botoiekin aldatu.</p>
              </div>
            </>
          )}
        </main>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />

        <AnimatePresence>{saved && <SaveToast message="Argazkia gordeta! +10 ⭐" />}</AnimatePresence>
        <AnimatePresence>
          {quotaErr && (
            <motion.div
              className="fixed bottom-6 left-1/2 z-50 rounded-full px-6 py-3 font-black text-white shadow-xl"
              style={{ background: "linear-gradient(145deg,#f74c6f,#d42050)" }}
              initial={{ opacity: 0, y: 18, x: "-50%", scale: 0.85 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: -10, x: "-50%", scale: 0.9 }}
            >
              Memoria beteta! Ezabatu zaharren bat.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
