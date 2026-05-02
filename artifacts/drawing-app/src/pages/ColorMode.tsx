import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { type SvgDrawing } from "@/lib/drawings";
import { allDrawings } from "@/lib/drawings";
import { Toolbar } from "@/components/Toolbar";
import { ColoringGallery } from "@/components/ColoringGallery";
import { ColoringPage } from "@/components/ColoringPage";
import { PageTransition } from "@/components/PageTransition";
import { consumePendingEdit, type PendingEditColoring } from "@/lib/editStore";

const BG = "rgba(114,48,196,0.04)";
const GRADIENT = "linear-gradient(145deg, #b57bee, #8b42d4)";

export default function ColorMode() {
  const [, setLocation] = useLocation();

  /* Consume a pending coloring edit (set from MyDrawings → Editatu) */
  const [pendingEdit] = useState<PendingEditColoring | null>(() => {
    const edit = consumePendingEdit();
    return edit?.type === "coloring" ? edit : null;
  });

  const [activeDrawing, setActiveDrawing] = useState<SvgDrawing | null>(null);
  const [activeEditData, setActiveEditData] = useState<PendingEditColoring | null>(null);

  /* On mount: if there's a pending edit, auto-select that drawing */
  useEffect(() => {
    if (!pendingEdit) return;
    const drawing = allDrawings.find((d) => d.id === pendingEdit.drawingId);
    if (drawing) {
      setActiveDrawing(drawing);
      setActiveEditData(pendingEdit);
    }
  }, []); // only on mount

  const handleSelect = (drawing: SvgDrawing) => {
    setActiveDrawing(drawing);
    setActiveEditData(null); // fresh session from gallery
  };

  const handleBack = () => {
    if (activeDrawing) {
      setActiveDrawing(null);
      setActiveEditData(null);
    } else {
      setLocation("/");
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col">
      <div className="flex flex-col flex-1" style={{ background: BG }}>
        <Toolbar
          title={
            activeDrawing
              ? `${activeDrawing.emoji} ${activeDrawing.name}${activeEditData ? " — editatzen" : ""}`
              : "🖌️ Margotu"
          }
          onBack={handleBack}
          backLabel={activeDrawing ? "← Galeria" : "← Hasiera"}
          gradient={GRADIENT}
        />

        <AnimatePresence mode="wait">
          {activeDrawing ? (
            <motion.div
              key="coloring"
              className="flex flex-col flex-1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ColoringPage
                drawing={activeDrawing}
                initialZoneColors={activeEditData?.zoneColors}
                initialBrushDataUrl={activeEditData?.brushDataUrl}
              />
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              className="flex flex-col flex-1"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <ColoringGallery onSelect={handleSelect} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
