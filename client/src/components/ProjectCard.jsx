import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}
      transition={{ duration: 0.2 }}
      className="bg-surface-primary rounded-lg shadow-sm p-4 flex justify-between items-center cursor-pointer"
    >
      {/* Left: Project info */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-text-default">{project.title}</h3>
        {project.repoURL && (
          <a
            href={project.repoURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-default text-sm mt-1"
          >
            View Repo
          </a>
        )}
      </div>

      {/* Right: Status Badge */}
      <motion.span
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            project.status === "active"
              ? "bg-status-active-bg text-status-active-text"
              : project.status === "idea"
              ? "bg-status-idea-bg text-status-idea-text"
              : project.status === "stale"
              ? "bg-status-stale-bg text-status-stale-text"
              : project.status === "blocked"
              ? "bg-status-blocked-bg text-status-blocked-text"
              : "bg-status-completed-bg text-status-completed-text"
          }`}
      >
        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
      </motion.span>
    </motion.div>
  );
};

export default ProjectCard;
