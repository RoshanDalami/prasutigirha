"use client";
import { motion } from "framer-motion";

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.03, duration: 0.25, ease: "easeOut" },
  }),
};

export default function ReportSkeleton({ rows = 20 }) {
  return (
    <div className="w-full px-3 py-4">
      {Array.from({ length: rows }).map((_, i) => {
        const isSection = i % 6 === 0;
        return (
          <motion.div
            key={i}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4 border-b border-gray-100 py-3"
          >
            <motion.div
              className={`h-4 bg-gray-200 rounded ${isSection ? "w-full" : "w-2/3"}`}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
            />
            {!isSection && (
              <motion.div
                className="h-4 bg-gray-200 rounded w-1/3"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 + 0.2 }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
