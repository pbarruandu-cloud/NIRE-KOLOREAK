import { useState, useRef, useCallback } from "react";
import type { SvgDrawing } from "@/lib/drawings/types";

export function useColoring(
  drawing: SvgDrawing | null,
  initialColors?: Record<string, string>,
) {
  const [colors, setColors] = useState<Record<string, string>>(
    () => initialColors ?? (drawing ? { ...drawing.defaultColors } : {}),
  );
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const paintZone = useCallback(
    (zone: string, color: string) => {
      setColors((prev) => ({ ...prev, [zone]: color }));
    },
    [],
  );

  const reset = useCallback(() => {
    if (drawing) setColors({ ...drawing.defaultColors });
  }, [drawing]);

  const exportToPng = useCallback(async (): Promise<string | null> => {
    const svgEl = svgContainerRef.current?.querySelector("svg");
    if (!svgEl) return null;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 400);

    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    await new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 400, 400);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });

    return canvas.toDataURL("image/png");
  }, []);

  return {
    colors,
    svgContainerRef,
    paintZone,
    reset,
    exportToPng,
  };
}
