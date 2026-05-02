interface ToolbarProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
  gradient?: string;
}

export function Toolbar({
  title,
  onBack,
  backLabel = "← Hasiera",
  gradient = "linear-gradient(145deg, #f74c6f, #d42050)",
}: ToolbarProps) {
  return (
    <header
      className="flex items-center px-3 sm:px-4 py-3 sm:py-4 gap-3 shrink-0"
      style={{
        background: gradient,
        boxShadow: "0 2px 12px rgba(0,0,0,.14)",
      }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-white font-bold px-3 sm:px-4 py-2.5 rounded-xl transition-all text-sm sm:text-base min-w-0 shrink-0"
        style={{
          background: "rgba(0,0,0,0.18)",
          border: "1.5px solid rgba(255,255,255,0.22)",
          minHeight: 44,
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.26)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.18)")}
        data-testid="button-toolbar-back"
      >
        {backLabel}
      </button>
      <h2
        className="flex-1 text-center text-white truncate"
        style={{
          fontSize: "clamp(1rem, 4vw, 1.25rem)",
          fontFamily: "var(--app-font-display)",
          fontWeight: 600,
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h2>
      <div className="shrink-0" style={{ minWidth: 80 }} />
    </header>
  );
}
