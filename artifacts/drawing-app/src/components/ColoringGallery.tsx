import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allDrawings, type SvgDrawing, type DrawingCategory } from "@/lib/drawings";

interface ColoringGalleryProps {
  onSelect: (drawing: SvgDrawing) => void;
}

const CATEGORIES: {
  id: DrawingCategory | "denak";
  label: string;
  emoji: string;
  color: string;
}[] = [
  { id: "denak",         label: "Denak",        emoji: "🎨", color: "linear-gradient(145deg,#f95f87,#e8305b)" },
  { id: "superheroiak",  label: "Superheroiak",  emoji: "🦸", color: "linear-gradient(145deg,#f97316,#c2410c)" },
  { id: "abenturak",     label: "Abenturak",     emoji: "⚔️",  color: "linear-gradient(145deg,#8b5cf6,#6d28d9)" },
  { id: "animaliak",     label: "Animaliak",     emoji: "🐾", color: "linear-gradient(145deg,#4ade80,#16a34a)" },
  { id: "natura",        label: "Natura",        emoji: "🌿", color: "linear-gradient(145deg,#34d399,#059669)" },
  { id: "ibilgailuak",   label: "Ibilgailuak",   emoji: "🚀", color: "linear-gradient(145deg,#38bdf8,#0284c7)" },
  { id: "fantasia",      label: "Fantasia",      emoji: "✨", color: "linear-gradient(145deg,#a78bfa,#7c3aed)" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22 },
  },
};

export function ColoringGallery({ onSelect }: ColoringGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<DrawingCategory | "denak">("denak");

  const visible =
    activeCategory === "denak"
      ? allDrawings
      : allDrawings.filter((d) => d.category === activeCategory);

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <div className="flex flex-col flex-1 overflow-auto p-3 sm:p-5 gap-4">

      {/* ── Category tabs ── */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0">
        {CATEGORIES.map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as DrawingCategory | "denak")}
              whileTap={{ scale: 0.93 }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-black text-sm whitespace-nowrap shrink-0 transition-all"
              style={
                active
                  ? {
                      background: cat.color,
                      color: "#fff",
                      boxShadow: "0 4px 14px rgba(0,0,0,.18)",
                      transform: "scale(1.04)",
                    }
                  : {
                      background: "rgba(255,255,255,0.75)",
                      color: "#64748b",
                      border: "2px solid rgba(0,0,0,.07)",
                    }
              }
              data-testid={`tab-category-${cat.id}`}
            >
              <span style={{ fontSize: "1.1rem" }}>{cat.emoji}</span>
              {cat.label}
            </motion.button>
          );
        })}
      </div>

      {/* ── Count ── */}
      <p className="text-xs font-black text-muted-foreground uppercase tracking-wide shrink-0">
        {visible.length} marrazki
      </p>

      {/* ── Grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {visible.map((drawing) => (
            <motion.button
              key={drawing.id}
              onClick={() => onSelect(drawing)}
              className="drawing-card p-3 flex flex-col items-center text-center group"
              variants={cardVariants}
              whileTap={{ scale: 0.93 }}
              data-testid={`button-select-drawing-${drawing.id}`}
            >
              <div
                className="w-full aspect-square mb-2 rounded-2xl overflow-hidden p-2 transition-all group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #fef9ef, #fef3f8)" }}
              >
                {drawing.render(drawing.defaultColors, () => {})}
              </div>
              <p className="font-black text-sm leading-tight">{drawing.name}</p>
              <span className="text-xs text-muted-foreground font-semibold mt-0.5">
                {getCategoryLabel(drawing.category)}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function getCategoryLabel(cat: DrawingCategory): string {
  switch (cat) {
    case "animaliak":    return "🐾 Animalia";
    case "natura":       return "🌿 Natura";
    case "ibilgailuak":  return "🚀 Ibilgailua";
    case "fantasia":     return "✨ Fantasia";
    case "superheroiak": return "🦸 Superheroi";
    case "abenturak":    return "⚔️ Abentura";
  }
}
