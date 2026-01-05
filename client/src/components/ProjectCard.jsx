import React from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center cursor-pointer border border-gray-100 hover:border-gray-300 transition-all duration-300"
    >
      {/* Left: Project info */}
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm mt-1 flex items-center"
          >
            <span>View Repo</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      {/* Right: Status Badge */}
      <motion.span
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${
          project.status === "active"
            ? "bg-status-active text-status-active-text border border-[#3b82f6]"
            : project.status === "paused"
            ? "bg-status-paused text-status-paused-text border border-status-paused-border"
            : project.status === "abandoned"
            ? "bg-status-abandoned text-status-abandoned-text border border-status-abandoned-border"
            : "bg-status-shipped text-status-shipped-text border border-status-shipped-border"
        }`}
      >
        {project.status}
      </motion.span>
    </motion.div>
  );
};

export default ProjectCard;
