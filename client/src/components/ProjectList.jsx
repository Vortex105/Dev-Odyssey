import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import GitHubAvatar from "./GitHubAvatar";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // small delay between each card
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function ProjectList({ projects, onDelete, onUpdate, onSelect }) {
  if (projects.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No projects yet. Start your dev odyssey 🚀
      </div>
    );
  }

  return (
    <motion.ul
      className="space-y-3"
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {projects.map((project) => (
          <motion.li
            key={project._id}
            variants={itemVariants}
            className="flex items-center justify-between p-4 border rounded-lg bg-surface-primary
                       hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            {/* Left: avatar + title + repo */}
            <div
  className="flex items-center gap-3 cursor-pointer"
  onClick={() => onSelect(project)}
>
  <GitHubAvatar repoUrl={project.repoUrl} />
  <div className="flex flex-col">
    <span className="font-semibold">{project.title}</span>
    {project.repoUrl && (
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-blue-600 hover:underline"
        onClick={(e) => e.stopPropagation()} // prevent sidebar open
      >
        View GitHub Repo
      </a>
    )}
  </div>
</div>


            {/* Right: status + delete */}
            <div className="flex items-center gap-3">
              <select
                value={project.status}
                onChange={(e) => onUpdate(project._id, { status: e.target.value })}
                className="text-xs px-2 py-1 rounded border bg-white
                           focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="abandoned">Abandoned</option>
                <option value="shipped">Shipped</option>
              </select>

              <button
                onClick={() => onDelete(project._id)}
                className="text-sm text-red-500 hover:text-red-700 active:scale-95 transition"
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
