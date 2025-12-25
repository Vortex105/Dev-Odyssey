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

  const statusIcons = {
    active: "circle",
    paused: "square",
    abandoned: "x",
    shipped: "check"
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statuses.map((status, index) => (
        <motion.div
          key={status}
          className={`p-5 rounded-2xl border-2 ${statusColors[status]} bg-white shadow-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105`}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="text-2xl mb-2">
            {status === "active" && (
              <div className="w-6 h-6 rounded-full bg-blue-500"></div>
            )}
            {status === "paused" && (
              <div className="flex space-x-1">
                <div className="w-1.5 h-4 bg-yellow-500 rounded"></div>
                <div className="w-1.5 h-4 bg-yellow-500 rounded"></div>
              </div>
            )}
            {status === "abandoned" && (
              <div className="w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            {status === "shipped" && (
              <div className="w-6 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
          <span className="text-2xl font-bold text-gray-800">
            {statusCounts[status] || 0}
          </span>
          <span className="uppercase text-xs font-semibold tracking-wider text-gray-600">
            {status}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
