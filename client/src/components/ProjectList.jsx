import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubAvatar from "./GitHubAvatar";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

const statusStyles = {
  active: "text-blue-600",
  paused: "text-yellow-600",
  abandoned: "text-red-600",
  shipped: "text-green-600",
};

export default function ProjectList({ projects, onDelete, onSelect }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  if (!projects.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        No projects yet. Go build something 🔥
      </div>
    );
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.ul
        layout
        className="space-y-4"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project) => (
          <motion.li
            key={project._id}
            layout
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => onSelect(project)}
            className="
              cursor-pointer
              p-5 bg-white rounded-xl border border-gray-100
              hover:border-gray-200 hover:shadow-md
              transition-all
              flex items-center justify-between gap-4
            "
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <GitHubAvatar repoUrl={project.repoUrl} />

              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-800 capitalize">
                  {project.title}
                </h3>
                <span
                  className={`text-sm font-medium capitalize ${statusStyles[project.status]}`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={(e) => handleDelete(e, project._id)}
              disabled={deletingId === project._id}
              className="
                text-red-500 hover:text-red-700
                disabled:opacity-60
                active:scale-95
                transition
              "
            >
              {deletingId === project._id ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
