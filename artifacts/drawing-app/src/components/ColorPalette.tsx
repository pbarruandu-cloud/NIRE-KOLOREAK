import { motion } from "framer-motion";

const PRESET_COLORS = [
  "#f43f6e", "#fb923c", "#facc15", "#4ade80",
  "#38bdf8", "#a78bfa", "#f472b6", "#2dd4bf",
  "#1e293b", "#94a3b8", "#ffffff", "#92400e",
];

interface ColorPaletteProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  testIdPrefix?: string;
}

export function ColorPalette({
  selectedColor,
  onColorChange,
  testIdPrefix = "color",
}: ColorPaletteProps) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm">
      <p className="text-xs font-black text-muted-foreground uppercase tracking-wide mb-2.5">
        Kolorea
      </p>
      <div className="grid grid-cols-6 lg:grid-cols-4 gap-1.5">
        {PRESET_COLORS.map((color) => {
          const isSelected = selectedColor === color;
          return (
            <motion.button
              key={color}
              onClick={() => onColorChange(color)}
              whileTap={{ scale: 0.85 }}
              className="rounded-xl relative"
              style={{
                backgroundColor: color,
                width: 34,
                height: 34,
                border: isSelected ? "3px solid #1e293b" : "2px solid rgba(0,0,0,0.12)",
                boxShadow: isSelected ? "0 0 0 2px white, 0 0 0 4px #1e293b" : "none",
                transform: isSelected ? "scale(1.18)" : "scale(1)",
                transition: "transform 0.12s, box-shadow 0.12s",
              }}
              data-testid={`${testIdPrefix}-${color.replace("#", "")}`}
            />
          );
        })}
      </div>
      <div className="mt-2.5 flex items-center gap-2">
        <label className="text-xs text-muted-foreground font-bold">Beste bat:</label>
        <input
          type="color"
          value={selectedColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="rounded-lg cursor-pointer"
          style={{ width: 34, height: 34, border: "2px solid rgba(0,0,0,0.12)", padding: 2 }}
          data-testid={`${testIdPrefix}-custom`}
        />
        <span
          className="flex-1 h-8 rounded-xl border-2 border-gray-100"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
    </div>
  );
}
