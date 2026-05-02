import { useState } from "react";
import { useLocation } from "wouter";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import { PageTransition } from "@/components/PageTransition";
import { consumePendingEdit } from "@/lib/editStore";

export default function DrawMode() {
  const [, setLocation] = useLocation();
  const [initialDataUrl] = useState<string | null>(() => {
    const edit = consumePendingEdit();
    return edit?.type === "drawing" ? edit.canvasDataUrl : null;
  });

  return (
    <PageTransition className="flex flex-col" style={{ height: "100dvh", overflow: "hidden" }}>
      <DrawingCanvas
        initialCanvasDataUrl={initialDataUrl}
        onBack={() => setLocation("/")}
        isEditing={!!initialDataUrl}
      />
    </PageTransition>
  );
}
