import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getGitHubData } from "../api/githubApi";

export default function ProjectSidebar({ project, isOpen, onClose, onUpdate }) {
  const [gitData, setGitData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project?.repoUrl) {
      setLoading(true);
      getGitHubData(project.repoUrl)
        .then((data) => setGitData(data))
        .finally(() => setLoading(false));
    } else {
      setGitData(null);
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/40 bg-opacity-30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            className="fixed top-0 right-0 w-full max-w-md h-full bg-surface-primary shadow-lg z-50 flex flex-col p-6 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-text-default">{project.title}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-lg font-bold"
              >
                ×
              </button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="text-sm text-text-muted uppercase">Status</label>
              <select
                value={project.status}
                onChange={(e) => onUpdate(project._id, { status: e.target.value })}
                className="mt-1 w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="abandoned">Abandoned</option>
                <option value="shipped">Shipped</option>
              </select>
            </div>

            {/* GitHub info */}
            <div className="mb-4 space-y-2">
              {loading && (
                <p className="text-sm text-gray-400 animate-pulse">
                  Loading GitHub data...
                </p>
              )}

              {!loading && gitData && (
                <>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View GitHub Repo
                  </a>

                  {gitData.latestCommit && (
                    <p className="text-sm text-gray-600">
                      Latest commit: {gitData.latestCommit.commit.message} (
                      {new Date(gitData.latestCommit.commit.author.date).toLocaleDateString()})
                    </p>
                  )}

                  <p className="text-sm text-gray-600">Open PRs: {gitData.openPRs}</p>

                  <div className="flex -space-x-2">
                    {gitData.contributors?.slice(0, 5).map((contrib) => (
                      <img
                        key={contrib.id}
                        src={contrib.avatar_url}
                        alt={contrib.login}
                        className="w-8 h-8 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                </>
              )}

              {!loading && !gitData && (
                <p className="text-sm text-gray-400">No GitHub data available</p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-3">
              <button
                onClick={() => onUpdate(project._id, { status: "shipped" })}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Mark Shipped
              </button>
              <button
                onClick={onClose}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
