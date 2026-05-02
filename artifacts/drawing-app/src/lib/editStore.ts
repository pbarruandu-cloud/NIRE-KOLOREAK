export type PendingEditDrawing = {
  type: "drawing";
  canvasDataUrl: string;
};

export type PendingEditColoring = {
  type: "coloring";
  drawingId: string;
  zoneColors: Record<string, string>;
  brushDataUrl: string;
};

export type PendingEdit = PendingEditDrawing | PendingEditColoring;

let _pending: PendingEdit | null = null;

export function setPendingEdit(edit: PendingEdit): void {
  _pending = edit;
}

export function consumePendingEdit(): PendingEdit | null {
  const edit = _pending;
  _pending = null;
  return edit;
}
