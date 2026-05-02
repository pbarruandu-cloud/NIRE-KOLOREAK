import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { PointsDisplay } from "@/components/PointsDisplay";
import { usePoints } from "@/hooks/usePoints";
import { PageTransition } from "@/components/PageTransition";

const NAV_BUTTONS = [
  {
    path: "/draw",
    icon: "✏️",
    label: "Sortu",
    sub: "Marraztu nahi duzuna",
    gradient: "linear-gradient(145deg, #f74c6f, #d42050)",
    shadow: "0 8px 28px rgba(212,32,80,.32)",
    testId: "button-create-drawing",
  },
  {
    path: "/my-drawings",
    icon: "🖼️",
    label: "Nire Marrazkiak",
    sub: "Ikusi gordeak",
    gradient: "linear-gradient(145deg, #2ea8f0, #0e7fd4)",
    shadow: "0 8px 28px rgba(14,127,212,.32)",
    testId: "button-my-drawings",
  },
];

/* Abstract paint-blob shapes for background */
const BLOBS = [
  {
    className: "blob-drift",
    style: {
      top: "-12%", right: "-8%",
      width: "44%", paddingBottom: "44%",
      background: "radial-gradient(circle, rgba(247,76,111,0.13) 0%, transparent 72%)",
      borderRadius: "62% 38% 55% 45% / 50% 44% 56% 50%",
    },
  },
  {
    className: "blob-drift-2",
    style: {
      bottom: "-10%", left: "-10%",
      width: "52%", paddingBottom: "52%",
      background: "radial-gradient(circle, rgba(14,127,212,0.11) 0%, transparent 72%)",
      borderRadius: "42% 58% 38% 62% / 60% 38% 62% 40%",
    },
  },
  {
    className: "blob-drift-3",
    style: {
      top: "28%", left: "-6%",
      width: "30%", paddingBottom: "30%",
      background: "radial-gradient(circle, rgba(247,76,111,0.08) 0%, transparent 70%)",
      borderRadius: "50%",
    },
  },
];

/* Small paint-dot accents */
const DOTS = [
  { style: { top: "12%",  right: "18%", width: 14, height: 14, background: "rgba(247,76,111,0.45)", borderRadius: "50%" } },
  { style: { top: "22%",  right: "12%", width:  8, height:  8, background: "rgba(247,76,111,0.25)", borderRadius: "50%" } },
  { style: { top:  "8%",  left:  "22%", width: 10, height: 10, background: "rgba(14,127,212,0.35)",  borderRadius: "50%" } },
  { style: { bottom:"18%",right: "10%", width: 12, height: 12, background: "rgba(14,127,212,0.40)",  borderRadius: "50%" } },
  { style: { bottom:"30%",left:   "8%", width:  9, height:  9, background: "rgba(247,76,111,0.30)",  borderRadius: "50%" } },
  { style: { top:  "55%", right:  "6%", width: 16, height: 16, background: "rgba(255,193,7,0.40)",   borderRadius: "50%" } },
  { style: { top:  "45%", left:  "4%",  width:  7, height:  7, background: "rgba(14,127,212,0.28)",  borderRadius: "50%" } },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
};

export default function Home() {
  const [, setLocation] = useLocation();
  const { points } = usePoints();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center p-5 relative overflow-hidden">

        {/* Background blobs + dots */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {BLOBS.map((b, i) => (
            <div key={i} className={b.className} style={{ position: "absolute", ...b.style }} />
          ))}
          {DOTS.map((d, i) => (
            <div key={i} style={{ position: "absolute", ...d.style }} />
          ))}
        </div>

        {/* Brand + Title */}
        <motion.div
          className="mb-6 text-center relative z-10"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mb-3 flex justify-center">
            <span style={{ fontSize: "3.2rem", filter: "drop-shadow(0 4px 8px rgba(0,0,0,.15))", display: "block" }}>
              🎨
            </span>
          </div>

          <h1
            className="font-display leading-none"
            style={{
              fontSize: "clamp(2.6rem, 9vw, 4.4rem)",
              background: "linear-gradient(135deg, #e8305b 0%, #1a7fdb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,.10))",
              letterSpacing: "0.01em",
            }}
            data-testid="title-main"
          >
            Nire Koloreak
          </h1>

          <p
            className="mt-2 font-bold tracking-wide"
            style={{
              fontSize: "clamp(0.9rem, 2.5vw, 1.05rem)",
              color: "hsl(222 42% 42%)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Zure arte-estudioa ✦
          </p>
        </motion.div>

        {/* Points badge */}
        <motion.div
          className="mb-10 relative z-10"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.18, type: "spring", stiffness: 280, damping: 20 }}
        >
          <PointsDisplay points={points} />
        </motion.div>

        {/* Navigation — two large cards */}
        <motion.nav
          className="flex flex-col sm:flex-row gap-5 w-full max-w-sm sm:max-w-lg relative z-10 px-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {NAV_BUTTONS.map(({ path, icon, label, sub, gradient, shadow, testId }) => (
            <motion.button
              key={path}
              className="btn-main flex-1"
              style={{
                background: gradient,
                boxShadow: shadow,
                paddingTop: "2rem",
                paddingBottom: "1.8rem",
              }}
              onClick={() => setLocation(path)}
              data-testid={testId}
              variants={itemVariants}
              whileTap={{ scale: 0.94 }}
            >
              {/* Icon in frosted circle */}
              <div
                style={{
                  width: 68,
                  height: 68,
                  borderRadius: "1.1rem",
                  background: "rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(4px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.30)",
                }}
              >
                <span style={{ fontSize: "2.2rem", lineHeight: 1 }}>{icon}</span>
              </div>

              {/* Label + subtitle */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.35rem", fontFamily: "var(--app-font-display)", lineHeight: 1.2 }}>
                  {label}
                </div>
                <div style={{ fontSize: "0.76rem", opacity: 0.78, marginTop: 4, fontFamily: "var(--app-font-sans)", fontWeight: 700, letterSpacing: "0.03em" }}>
                  {sub}
                </div>
              </div>
            </motion.button>
          ))}
        </motion.nav>
      </div>
    </PageTransition>
  );
}
