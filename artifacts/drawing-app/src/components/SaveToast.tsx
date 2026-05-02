import { motion } from "framer-motion";

interface SaveToastProps {
  message: string;
}

export function SaveToast({ message }: SaveToastProps) {
  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2 rounded-full px-7 py-3.5 font-black text-white text-base shadow-xl"
      style={{ background: "linear-gradient(145deg, #34d399, #059669)" }}
      initial={{ opacity: 0, y: 20, x: "-50%", scale: 0.8 }}
      animate={{ opacity: 1, y: 0,  x: "-50%", scale: 1   }}
      exit={{   opacity: 0, y: -12, x: "-50%", scale: 0.9 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <span style={{ fontSize: "1.4rem" }}>✅</span>
      <span>{message}</span>
    </motion.div>
  );
}
