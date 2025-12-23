import React from "react";
import { motion } from "framer-motion";
import { statusColors } from "../utils/statusColors";

export default function StatusTiles({ projects }) {
  // Count projects by status
  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  const statuses = ["active", "paused", "abandoned", "shipped"];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {statuses.map((status) => (
        <motion.div
          key={status}
          whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
          className={`p-4 rounded flex flex-col items-center justify-center cursor-pointer ${statusColors[status]}`}
        >
          <span className="text-lg font-bold text-text-default">
            {statusCounts[status] || 0}
          </span>
          <span className="uppercase text-xs text-text-muted">{status}</span>
        </motion.div>
      ))}
    </div>
  );
}
