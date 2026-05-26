"use client";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const shimmer = (delay = 0) => ({
  animate: { opacity: [0.4, 1, 0.4] },
  transition: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay },
});

export default function DetailSkeleton({ gridCols = 4, infoRows = 8, tableCols = 5, tableRows = 8 }) {
  return (
    <div className="px-10 pt-10">
      <motion.div
        className={`grid grid-cols-${gridCols} gap-5 mb-8`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Array.from({ length: infoRows }).map((_, i) => (
          <motion.div key={i} variants={itemVariants}>
            <motion.div className="h-5 bg-gray-200 rounded" {...shimmer(i * 0.07)} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="border-2 rounded-lg border-gray-200 pt-8 px-4 relative my-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
      >
        <motion.div className="h-8 bg-gray-200 rounded w-40 mb-6" {...shimmer(0.1)} />
        <table className="w-full">
          <thead>
            <tr className="bg-gray-300">
              {Array.from({ length: tableCols }).map((_, j) => (
                <th key={j} className="py-3 px-3">
                  <motion.div className="h-4 bg-gray-400 rounded" {...shimmer(j * 0.05)} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: tableRows }).map((_, i) => (
              <motion.tr
                key={i}
                className="border border-gray-100"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.04, duration: 0.25, ease: "easeOut" }}
              >
                {Array.from({ length: tableCols }).map((_, j) => (
                  <td key={j} className="py-4 px-3">
                    <motion.div className="h-4 bg-gray-200 rounded" {...shimmer((i * tableCols + j) * 0.025)} />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
