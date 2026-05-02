import { useState, useEffect } from "react";
import { getPoints, addPoints as persistPoints } from "@/lib/storage";

const POINTS_EVENT = "points-updated";

export function usePoints() {
  const [points, setPoints] = useState<number>(getPoints);

  useEffect(() => {
    const sync = () => setPoints(getPoints());
    window.addEventListener(POINTS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(POINTS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addPoints = (amount: number) => {
    persistPoints(amount);
    setPoints(getPoints());
    window.dispatchEvent(new Event(POINTS_EVENT));
  };

  return { points, addPoints };
}
