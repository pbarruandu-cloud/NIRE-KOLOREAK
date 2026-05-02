import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function PageTransition({
  children,
  className = "flex flex-col min-h-screen",
  style,
}: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
