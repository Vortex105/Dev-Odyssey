import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubAvatar from "./GitHubAvatar";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function ProjectList({ projects, onDelete, onUpdate, onSelect }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
            />
          </svg>
        </div>
        <p className="text-gray-600 text-lg">No projects yet</p>
        <p className="text-gray-500 mt-1">Start your dev odyssey </p>
      </div>
    );
  }

  return (
    <motion.ul
      className="space-y-4"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {projects.map((project) => (
          <motion.li
            key={project._id}
            variants={itemVariants}
            className="flex items-center justify-between p-5 bg-white rounded-xl border border-gray-100 
                       hover:shadow-lg hover:border-gray-200 hover:-translate-y transition-all"
          >
            {/* Left: clickable area */}
            <div
              className="flex items-center gap-4 cursor-pointer group"
              onClick={() => onSelect(project)}
            >
              <GitHubAvatar repoUrl={project.repoUrl} />

              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-800 group-hover:text-blue-600 group-hover:underline transition">
                    {project.title}
                  </span>

                  {/* Chevron = visual affordance */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <span className="text-xs text-gray-400 group-hover:text-blue-500 transition">
                  Click to view details
                </span>

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-flex items-center"
                  >
                    View GitHub Repo
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Right: controls */}
            <div className="flex items-center gap-4">
              <select
                value={project.status}
                onChange={(e) =>
                  onUpdate(project._id, { status: e.target.value })
                }
                className={`text-sm px-3 py-1.5 rounded-full capitalize font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition ${
                  project.status === "active"
                    ? "bg-blue-100 text-blue-700 border border-blue-400"
                    : project.status === "paused"
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-400"
                    : project.status === "abandoned"
                    ? "bg-red-100 text-red-700 border border-red-400"
                    : "bg-green-100 text-green-700 border border-green-400"
                }`}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="abandoned">Abandoned</option>
                <option value="shipped">Shipped</option>
              </select>

              <button
                onClick={() => onDelete(project._id)}
                className="text-red-500 hover:text-red-700 active:scale-95 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6"
                  />
                </svg>
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
