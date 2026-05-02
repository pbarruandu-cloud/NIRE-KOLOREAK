import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { type SavedDrawing } from "@/lib/storage";
import { setPendingEdit } from "@/lib/editStore";

interface SavedDrawingsProps {
  drawings: SavedDrawing[];
  onDelete: (id: string) => void;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.88, y: 16 },
  visible: { opacity: 1, scale: 1,    y: 0,
    transition: { type: "spring", stiffness: 280, damping: 22 } },
};

export function SavedDrawings({ drawings, onDelete }: SavedDrawingsProps) {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<SavedDrawing | null>(null);

  const handleEdit = (drawing: SavedDrawing) => {
    setPendingEdit({ type: "drawing", canvasDataUrl: drawing.dataUrl });
    setLocation("/draw");
  };

  if (drawings.length === 0) {
    return <EmptyState onGoToCreate={() => setLocation("/draw")} />;
  }

  return (
    <>
      <p className="text-sm font-black text-muted-foreground mb-4 uppercase tracking-wide">
        {drawings.length} gordetako marrazki
      </p>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {drawings.map((drawing, index) => (
            <motion.div
              key={drawing.id}
              variants={cardVariants}
              layout
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="drawing-card flex flex-col"
              data-testid={`card-drawing-${index}`}
            >
              {/* Thumbnail */}
              <button
                className="relative w-full aspect-video group"
                onClick={() => setSelected(drawing)}
                data-testid={`button-view-thumb-${index}`}
              >
                <img
                  src={drawing.dataUrl}
                  alt={drawing.title}
                  className="w-full h-full object-contain rounded-t-2xl"
                  style={{ background: "#fafaf8" }}
                />
                <div className="absolute inset-0 rounded-t-2xl bg-black/0 group-hover:bg-black/8 transition-colors flex items-center justify-center">
                  <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg">
                    🔍
                  </span>
                </div>
              </button>

              {/* Title */}
              <div className="px-3 pt-2 pb-1.5">
                <p className="text-xs font-black text-foreground truncate leading-tight">{drawing.title}</p>
                <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                  🎨 Nire Koloreak
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-1 px-2 pb-2.5 mt-auto">
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => setSelected(drawing)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-black transition-colors"
                  style={{ background: "#f0f9ff", color: "#0284c7" }}
                  data-testid={`button-view-${index}`}
                >
                  <span>👁️</span>
                  <span>Ikusi</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => handleEdit(drawing)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-black transition-colors"
                  style={{ background: "#fef3c7", color: "#b45309" }}
                  data-testid={`button-edit-${index}`}
                >
                  <span>✏️</span>
                  <span>Editatu</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={() => onDelete(drawing.id)}
                  className="flex items-center justify-center w-9 rounded-xl text-xs font-black transition-colors shrink-0"
                  style={{ background: "#fee2e2", color: "#b91c1c" }}
                  data-testid={`button-delete-drawing-${index}`}
                >
                  🗑️
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <DrawingViewer
            drawing={selected}
            onClose={() => setSelected(null)}
            onEdit={() => { setSelected(null); handleEdit(selected); }}
            onDelete={(id) => { onDelete(id); setSelected(null); }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Sub-components ── */

function EmptyState({ onGoToCreate }: { onGoToCreate: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-64 gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span style={{ fontSize: "4rem" }}>🎨</span>
      <p className="text-xl font-black text-muted-foreground text-center">
        Oraindik ez duzu marrazkirik!
      </p>
      <p className="text-sm text-muted-foreground text-center font-semibold">
        Sortu zure lehen marrazkia eta gorde hemen.
      </p>
      <motion.button
        onClick={onGoToCreate}
        whileTap={{ scale: 0.93 }}
        className="mt-2 px-6 py-3 rounded-2xl text-white font-black text-sm"
        style={{ background: "linear-gradient(145deg,#f74c6f,#d42050)", boxShadow: "0 4px 14px rgba(212,32,80,.28)" }}
        data-testid="button-go-draw"
      >
        ✏️ Sortu marrazkia
      </motion.button>
    </motion.div>
  );
}

function DrawingViewer({
  drawing,
  onClose,
  onEdit,
  onDelete,
}: {
  drawing: SavedDrawing;
  onClose: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-testid="modal-drawing-viewer"
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1,    y: 0 }}
        exit={{   opacity: 0, scale: 0.88,  y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-black text-base truncate pr-2">{drawing.title}</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold text-xl transition-colors shrink-0"
            data-testid="button-close-viewer"
          >
            ×
          </button>
        </div>
        <div className="p-4">
          <img
            src={drawing.dataUrl}
            alt={drawing.title}
            className="w-full rounded-2xl border border-gray-100"
          />
        </div>
        <div className="px-4 pb-4 flex gap-2 flex-wrap">
          <motion.button
            onClick={onEdit}
            whileTap={{ scale: 0.93 }}
            className="px-5 py-2.5 font-black rounded-xl text-sm text-white"
            style={{ background: "linear-gradient(145deg,#fbbf24,#d97706)" }}
            data-testid="button-edit-selected"
          >
            ✏️ Editatu
          </motion.button>
          <motion.button
            onClick={() => onDelete(drawing.id)}
            whileTap={{ scale: 0.93 }}
            className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-black rounded-xl transition-colors text-sm"
            data-testid="button-delete-selected"
          >
            🗑️ Ezabatu
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
