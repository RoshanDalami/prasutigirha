"use client";
import { motion } from "framer-motion";

const shimmer = {
  initial: { opacity: 0.4 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.8,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.25, ease: "easeOut" },
  }),
};

export default function TableSkeleton({ rows = 8, cols = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <motion.tr
          key={rowIndex}
          custom={rowIndex}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          className="border border-gray-100"
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <td key={colIndex} className="py-4 px-3">
              <motion.div
                className="h-4 bg-gray-200 rounded mx-1"
                initial={shimmer.initial}
                animate={shimmer.animate}
                transition={{
                  ...shimmer.transition,
                  delay: (rowIndex * cols + colIndex) * 0.02,
                }}
              />
            </td>
          ))}
        </motion.tr>
      ))}
    </>
  );
}
