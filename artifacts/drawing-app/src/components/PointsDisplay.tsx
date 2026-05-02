interface PointsDisplayProps {
  points: number;
}

export function PointsDisplay({ points }: PointsDisplayProps) {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-full"
      style={{
        padding: "0.5rem 1.4rem 0.5rem 1rem",
        background: "linear-gradient(145deg, #f5c438, #e09800)",
        boxShadow: "0 4px 14px rgba(200,130,0,.28), inset 0 1px 0 rgba(255,255,255,.28)",
        border: "1.5px solid rgba(0,0,0,.08)",
        color: "#fff",
        fontWeight: 900,
        fontSize: "1rem",
        fontFamily: "var(--app-font-display)",
        letterSpacing: "0.02em",
      }}
      data-testid="points-display"
    >
      <span style={{ fontSize: "1.35rem", lineHeight: 1, filter: "drop-shadow(0 1px 2px rgba(0,0,0,.20))" }}>⭐</span>
      <span>{points} puntu</span>
    </div>
  );
}
