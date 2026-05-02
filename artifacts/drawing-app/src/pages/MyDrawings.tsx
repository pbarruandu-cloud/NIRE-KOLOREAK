import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { getSavedDrawings, deleteDrawing, type SavedDrawing } from "@/lib/storage";
import { Toolbar } from "@/components/Toolbar";
import { SavedDrawings } from "@/components/SavedDrawings";
import { PageTransition } from "@/components/PageTransition";

export default function MyDrawings() {
  const [, setLocation] = useLocation();
  const [drawings, setDrawings] = useState<SavedDrawing[]>([]);

  useEffect(() => {
    setDrawings(getSavedDrawings());
  }, []);

  const handleDelete = (id: string) => {
    deleteDrawing(id);
    setDrawings(getSavedDrawings());
  };

  return (
    <PageTransition className="min-h-screen flex flex-col">
      <div
        className="flex flex-col flex-1"
        style={{ background: "rgba(14,127,212,0.04)" }}
      >
        <Toolbar
          title="🖼️ Nire Marrazkiak"
          onBack={() => setLocation("/")}
          backLabel="← Hasiera"
          gradient="linear-gradient(145deg, #3ea8f5, #1a7fdb)"
        />
        <main className="flex-1 p-4 sm:p-6 max-w-5xl mx-auto w-full">
          <SavedDrawings drawings={drawings} onDelete={handleDelete} />
        </main>
      </div>
    </PageTransition>
  );
}
