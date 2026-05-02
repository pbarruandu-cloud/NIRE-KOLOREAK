import { useRef, useState, useEffect, useCallback } from "react";

export interface Point {
  x: number;
  y: number;
}

export type DrawTool = "brush" | "spray" | "dots" | "stars" | "squares" | "lines" | "eraser" | "text";

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 900;

// Accept PointerEvent (extends MouseEvent, has clientX/clientY directly) or legacy events
type AnyDrawEvent =
  | React.PointerEvent<HTMLCanvasElement>
  | React.MouseEvent<HTMLCanvasElement>
  | React.TouchEvent<HTMLCanvasElement>;

function getEventPos(e: AnyDrawEvent, canvas: HTMLCanvasElement): Point {
  const rect   = canvas.getBoundingClientRect();
  const scaleX = canvas.width  / rect.width;
  const scaleY = canvas.height / rect.height;
  // Touch events carry coordinates in e.touches / e.changedTouches
  if ("touches" in e) {
    const t = (e.touches[0] ?? (e as React.TouchEvent).changedTouches[0]);
    return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
  }
  // MouseEvent and PointerEvent both have clientX / clientY
  return {
    x: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
    y: ((e as React.MouseEvent).clientY - rect.top)  * scaleY,
  };
}

/* Exponential moving average — reduces jitter for stamp-based tools */
function ema(prev: Point, curr: Point, alpha: number): Point {
  return { x: prev.x + alpha * (curr.x - prev.x), y: prev.y + alpha * (curr.y - prev.y) };
}

/* ── Pixel drawing primitives (pure functions, no closures) ── */

function applyBrush(ctx: CanvasRenderingContext2D, from: Point, to: Point, color: string, size: number) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

function applySpray(ctx: CanvasRenderingContext2D, pt: Point, color: string, size: number) {
  const radius = size * 2.5;
  const density = Math.max(30, Math.round(size * 5));
  ctx.fillStyle = color;
  for (let i = 0; i < density; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius; // sqrt → uniform distribution
    ctx.fillRect(
      Math.round(pt.x + r * Math.cos(angle)),
      Math.round(pt.y + r * Math.sin(angle)),
      2, 2,
    );
  }
}

function applyDot(ctx: CanvasRenderingContext2D, pt: Point, color: string, size: number) {
  ctx.beginPath();
  ctx.arc(pt.x, pt.y, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function applyEraser(ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number) {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = size * 2.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}

/* ── Draw a single 5-pointed star ── */
function drawStarShape(ctx: CanvasRenderingContext2D, x: number, y: number, outerR: number, color: string) {
  const inner = outerR * 0.4;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : inner;
    if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
    else         ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

/* ── Stars spray: scattered stars around the pointer ── */
function applyStars(ctx: CanvasRenderingContext2D, pt: Point, color: string, size: number) {
  const count  = Math.max(2, Math.round(size * 0.55));
  const radius = size * 2.2;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r     = Math.sqrt(Math.random()) * radius;
    const starR = size * 0.32 + Math.random() * size * 0.22;
    drawStarShape(ctx, pt.x + r * Math.cos(angle), pt.y + r * Math.sin(angle), starR, color);
  }
}

/* ── Squares: rotated squares that follow the stroke direction ── */
function applySquares(ctx: CanvasRenderingContext2D, from: Point, to: Point, color: string, size: number) {
  const dx   = to.x - from.x;
  const dy   = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  const step = Math.max(1, size * 0.55);
  const n    = Math.max(1, Math.floor(dist / step));
  const ang  = Math.atan2(dy, dx);
  const s    = size * 0.82;
  ctx.fillStyle = color;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    ctx.save();
    ctx.translate(from.x + t * dx, from.y + t * dy);
    ctx.rotate(ang);
    ctx.fillRect(-s / 2, -s / 2, s, s);
    ctx.restore();
  }
}

/* ── Lines: 3 parallel thin lines — calligraphy / multi-line effect ── */
function applyLines(ctx: CanvasRenderingContext2D, from: Point, to: Point, color: string, size: number) {
  const dx     = to.x - from.x;
  const dy     = to.y - from.y;
  const len    = Math.hypot(dx, dy) || 1;
  const px     = -dy / len; // perpendicular unit vector
  const py     =  dx / len;
  const spread = size * 0.85;
  const lw     = Math.max(1.5, size * 0.24);
  const count  = 3;

  ctx.strokeStyle = color;
  ctx.lineWidth   = lw;
  ctx.lineCap     = "round";
  ctx.lineJoin    = "round";

  for (let i = 0; i < count; i++) {
    const offset = (i / (count - 1) - 0.5) * spread;
    ctx.beginPath();
    ctx.moveTo(from.x + px * offset, from.y + py * offset);
    ctx.lineTo(to.x   + px * offset, to.y   + py * offset);
    ctx.stroke();
  }
}

/* ── Hook ── */

export function useDrawing(initialImageDataUrl?: string | null) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<DrawTool>("brush");
  const [color, setColor] = useState("#ef4444");
  const [brushSize, setBrushSize] = useState(12);
  const [undoCount, setUndoCount] = useState(0);

  const undoStack    = useRef<ImageData[]>([]);
  const isDrawing    = useRef(false);
  const lastPoint    = useRef<Point | null>(null);
  // Bézier midpoint smoothing state (used by brush + eraser)
  const strokePoints = useRef<Point[]>([]);
  const lastMid      = useRef<Point | null>(null);

  // Refs mirror state so event-handler callbacks never go stale
  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const sizeRef = useRef(brushSize);
  toolRef.current = tool;
  colorRef.current = color;
  sizeRef.current = brushSize;

  /* Initialise white canvas on mount */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, []);

  /* Load initial background image (for re-editing a saved drawing) */
  useEffect(() => {
    if (!initialImageDataUrl) return;
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    };
    img.src = initialImageDataUrl;
  }, []); // intentionally only on mount

  /* Push current canvas state onto undo stack */
  const saveSnapshot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    undoStack.current.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
    if (undoStack.current.length > 30) undoStack.current.shift();
    setUndoCount((n) => n + 1);
  }, []);

  /* Start of a stroke — save snapshot, draw initial mark */
  const startStroke = useCallback(
    (e: AnyDrawEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      saveSnapshot();
      isDrawing.current = true;
      const pos = getEventPos(e, canvas);
      lastPoint.current = pos;

      const t = toolRef.current;
      const c = colorRef.current;
      const s = sizeRef.current;

      if (t === "text") { isDrawing.current = false; return; }

      if (t === "brush") {
        // Init Bézier buffer — draw a dot at the tap position
        strokePoints.current = [pos];
        lastMid.current = pos;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, s / 2, 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      } else if (t === "eraser") {
        // Init Bézier buffer for eraser too
        strokePoints.current = [pos];
        lastMid.current = pos;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, s * 1.25, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      } else if (t === "spray") {
        applySpray(ctx, pos, c, s);
      } else if (t === "dots") {
        applyDot(ctx, pos, c, s);
      } else if (t === "stars") {
        applyStars(ctx, pos, c, s);
      } else if (t === "squares") {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        const sq = s * 0.82;
        ctx.fillStyle = c;
        ctx.fillRect(-sq / 2, -sq / 2, sq, sq);
        ctx.restore();
      } else if (t === "lines") {
        /* single tap: draw a short round mark */
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, Math.max(1.5, s * 0.15), 0, Math.PI * 2);
        ctx.fillStyle = c;
        ctx.fill();
      }
    },
    [saveSnapshot],
  );

  /* Continuation of stroke */
  const continueStroke = useCallback(
    (e: AnyDrawEvent) => {
      e.preventDefault();
      if (!isDrawing.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rawPos = getEventPos(e, canvas);
      const prev   = lastPoint.current ?? rawPos;

      const t = toolRef.current;
      const c = colorRef.current;
      const s = sizeRef.current;

      if (t === "brush") {
        /* ── Quadratic Bézier midpoint smoothing ────────────────────────
           Algorithm: for consecutive points P[n-1] → P[n], draw a quadratic
           curve from the previous midpoint M[n-1] to the new midpoint M[n],
           using P[n-1] as the Bézier control point. The result is a smooth
           G1-continuous curve that passes through all midpoints.          */
        strokePoints.current.push(rawPos);
        const pts  = strokePoints.current;
        const pPrev = pts[pts.length - 2];
        const pCurr = pts[pts.length - 1];
        const mid: Point = { x: (pPrev.x + pCurr.x) / 2, y: (pPrev.y + pCurr.y) / 2 };
        const origin = lastMid.current ?? pPrev;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.quadraticCurveTo(pPrev.x, pPrev.y, mid.x, mid.y);
        ctx.strokeStyle = c;
        ctx.lineWidth   = s;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.stroke();
        lastMid.current   = mid;
        lastPoint.current = rawPos;

      } else if (t === "eraser") {
        /* Same Bézier smoothing for the eraser */
        strokePoints.current.push(rawPos);
        const pts   = strokePoints.current;
        const pPrev = pts[pts.length - 2];
        const pCurr = pts[pts.length - 1];
        const mid: Point = { x: (pPrev.x + pCurr.x) / 2, y: (pPrev.y + pCurr.y) / 2 };
        const origin = lastMid.current ?? pPrev;
        ctx.beginPath();
        ctx.moveTo(origin.x, origin.y);
        ctx.quadraticCurveTo(pPrev.x, pPrev.y, mid.x, mid.y);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth   = s * 2.5;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.stroke();
        lastMid.current   = mid;
        lastPoint.current = rawPos;

      } else if (t === "spray") {
        // EMA smoothing reduces spray-center jitter on touch
        const pos = ema(prev, rawPos, 0.6);
        applySpray(ctx, pos, c, s);
        lastPoint.current = pos;

      } else if (t === "stars") {
        const pos = ema(prev, rawPos, 0.6);
        applyStars(ctx, pos, c, s);
        lastPoint.current = pos;

      } else if (t === "squares") {
        // EMA for smoother direction changes
        const pos = ema(prev, rawPos, 0.7);
        applySquares(ctx, prev, pos, c, s);
        lastPoint.current = pos;

      } else if (t === "lines") {
        // EMA for smoother parallel-line direction
        const pos = ema(prev, rawPos, 0.65);
        applyLines(ctx, prev, pos, c, s);
        lastPoint.current = pos;

      } else if (t === "dots") {
        // Only stamp a new dot when the cursor has moved far enough
        const dist = Math.hypot(rawPos.x - prev.x, rawPos.y - prev.y);
        if (dist >= s * 1.3) {
          applyDot(ctx, rawPos, c, s);
          lastPoint.current = rawPos;
        }
      }
    },
    [],
  );

  const endStroke = useCallback((e: AnyDrawEvent) => {
    e.preventDefault();
    isDrawing.current = false;
    lastPoint.current = null;
  }, []);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.current.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(undoStack.current.pop()!, 0, 0);
    setUndoCount((n) => Math.max(0, n - 1));
  }, []);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveSnapshot();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, [saveSnapshot]);

  const getDataUrl = useCallback((): string | null => {
    return canvasRef.current?.toDataURL("image/png") ?? null;
  }, []);

  return {
    canvasRef,
    tool,
    setTool,
    color,
    setColor,
    brushSize,
    setBrushSize,
    canUndo: undoCount > 0,
    startStroke,
    continueStroke,
    endStroke,
    undo,
    clear,
    getDataUrl,
    pushUndoSnapshot: saveSnapshot,
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
  };
}
