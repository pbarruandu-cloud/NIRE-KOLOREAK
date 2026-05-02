/**
 * Storage v2 — individual keys + JPEG compression
 *
 * Layout in localStorage:
 *   nirekoloreak_idx          → JSON array of DrawingMeta (no image data)
 *   nirekoloreak_d_<id>       → compressed JPEG data URL for that drawing
 *   nirekoloreak_pts          → points integer
 *
 * Each drawing is compressed to 600×450 JPEG at quality 0.72 ≈ 60–100 KB,
 * so localStorage (≈5 MB) can hold 50+ drawings comfortably.
 */

/* ── Types ── */

export interface SavedDrawing {
  id: string;
  title: string;
  dataUrl: string;
  createdAt: number;
  type: "drawing";
}

interface DrawingMeta {
  id: string;
  title: string;
  createdAt: number;
  type: "drawing";
}

/* ── Internal constants ── */

const IDX_KEY      = "nirekoloreak_idx";
const DATA_PREFIX  = "nirekoloreak_d_";
const POINTS_KEY   = "nirekoloreak_pts";

/** Maximum dimension (longest edge) for saved thumbnails */
const MAX_DIM  = 600;
/** JPEG quality 0–1 */
const QUALITY  = 0.72;

/* ── One-time migration from the old "dibujos_magicos_drawings" key ── */

function migrateOnce(): void {
  const OLD_KEY = "dibujos_magicos_drawings";
  const raw = localStorage.getItem(OLD_KEY);
  if (!raw) return;

  try {
    const old = JSON.parse(raw) as Array<{
      id: string;
      title: string;
      dataUrl: string;
      createdAt: number;
    }>;

    const idx: DrawingMeta[] = [];
    for (const d of old) {
      try {
        localStorage.setItem(DATA_PREFIX + d.id, d.dataUrl);
        idx.push({ id: d.id, title: d.title, createdAt: d.createdAt, type: "drawing" });
      } catch {
        /* quota — skip this one */
      }
    }

    if (idx.length) _setIndex(idx);
    localStorage.removeItem(OLD_KEY);
  } catch {
    /* corrupt data — ignore */
  }
}

/* ── Index helpers ── */

function _getIndex(): DrawingMeta[] {
  const raw = localStorage.getItem(IDX_KEY);
  if (!raw) return [];
  try { return JSON.parse(raw) as DrawingMeta[]; } catch { return []; }
}

function _setIndex(idx: DrawingMeta[]): void {
  localStorage.setItem(IDX_KEY, JSON.stringify(idx));
}

/* ── Image compression ── */

/**
 * Shrinks a data-URL to at most MAX_DIM × MAX_DIM and re-encodes as JPEG.
 * Returns a Promise so callers must await it.
 */
function compressImage(dataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_DIM / Math.max(img.width, img.height));
      const w = Math.round(img.width  * scale);
      const h = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width  = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;

      /* White background so transparency (if any) doesn't produce black JPEG */
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      resolve(canvas.toDataURL("image/jpeg", QUALITY));
    };
    img.onerror = () => resolve(dataUrl); /* fallback: keep original */
    img.src = dataUrl;
  });
}

/* ── Public API ── */

/** Returns all saved drawings (newest first), each with its image data. */
export function getSavedDrawings(): SavedDrawing[] {
  migrateOnce();
  const idx = _getIndex();
  return idx
    .map((meta): SavedDrawing | null => {
      const dataUrl = localStorage.getItem(DATA_PREFIX + meta.id);
      if (!dataUrl) return null; // orphaned meta — skip
      return { ...meta, dataUrl };
    })
    .filter((d): d is SavedDrawing => d !== null);
}

/**
 * Compresses and saves a new drawing.
 * Returns the saved drawing or throws `{ code: "QUOTA_EXCEEDED" }`.
 */
export async function saveDrawing(
  drawing: Pick<SavedDrawing, "title" | "dataUrl" | "type">,
): Promise<SavedDrawing> {
  const compressed = await compressImage(drawing.dataUrl);

  const id = `d_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const meta: DrawingMeta = {
    id,
    title: drawing.title,
    createdAt: Date.now(),
    type: "drawing",
  };

  /* Store the image data first */
  try {
    localStorage.setItem(DATA_PREFIX + id, compressed);
  } catch {
    throw { code: "QUOTA_EXCEEDED" };
  }

  /* Prepend to index */
  const idx = _getIndex();
  idx.unshift(meta);
  try {
    _setIndex(idx);
  } catch {
    /* Index is tiny; if this fails we're extremely constrained — clean up */
    localStorage.removeItem(DATA_PREFIX + id);
    throw { code: "QUOTA_EXCEEDED" };
  }

  return { ...meta, dataUrl: compressed };
}

/** Deletes a drawing and its image data. */
export function deleteDrawing(id: string): void {
  localStorage.removeItem(DATA_PREFIX + id);
  _setIndex(_getIndex().filter((d) => d.id !== id));
}

/* ── Points ── */

export function getPoints(): number {
  const raw = localStorage.getItem(POINTS_KEY);
  return raw ? parseInt(raw, 10) : 0;
}

export function addPoints(amount: number): number {
  const updated = getPoints() + amount;
  localStorage.setItem(POINTS_KEY, String(updated));
  return updated;
}

/**
 * Returns a rough estimate of localStorage usage in KB.
 * Useful for debugging; not exposed in UI.
 */
export function getStorageUsageKB(): number {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)!;
    total += (localStorage.getItem(key)?.length ?? 0) * 2; // UTF-16
  }
  return Math.round(total / 1024);
}
