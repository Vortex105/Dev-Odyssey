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
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl z-50 flex flex-col p-6 overflow-y-auto border-l border-gray-100"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">{project.title}</h2>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                  project.status === "active"
                    ? "bg-[#dbeafe] text-[#1d4ed8] border border-[#3b82f6]"
                    : project.status === "paused"
                    ? "bg-[#fef9c3] text-[#854d0e] border border-[#f59e0b]"
                    : project.status === "abandoned"
                    ? "bg-[#fee2e2] text-[#b91c1c] border border-[#ef4444]"
                    : "bg-[#dcfce7] text-[#166534] border border-[#22c55e]"
                }`}>
                  {project.status}
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">Update Status</label>
              <select
                value={project.status}
                onChange={(e) => onUpdate(project._id, { status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="abandoned">Abandoned</option>
                <option value="shipped">Shipped</option>
              </select>
            </div>

            {/* GitHub info */}
            <div className="mb-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">GitHub Details</h3>

              {loading && (
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              )}

              {!loading && gitData && (
                <div className="space-y-4">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View GitHub Repository
                  </a>

                  {gitData.latestCommit && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 font-medium">Latest Commit</p>
                      <p className="text-gray-800 mt-1">{gitData.latestCommit.commit.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(gitData.latestCommit.commit.author.date).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Open PRs</p>
                      <p className="text-xl font-bold text-gray-800">{gitData.openPRs || 0}</p>
                    </div>

                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Stars</p>
                      <p className="text-xl font-bold text-gray-800">{gitData.stars || 0}</p>
                    </div>
                  </div>

                  {gitData.contributors && gitData.contributors.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Contributors</p>
                      <div className="flex -space-x-2">
                        {gitData.contributors?.slice(0, 5).map((contrib) => (
                          <img
                            key={contrib.id}
                            src={contrib.avatar_url}
                            alt={contrib.login}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                            title={contrib.login}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!loading && !gitData && (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <p className="text-gray-500 mt-2">No GitHub data available</p>
                  {project.repoUrl && (
                    <p className="text-sm text-gray-400 mt-1">Check if the URL is valid</p>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-3">
              <button
                onClick={() => onUpdate(project._id, { status: "shipped" })}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mark Shipped
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
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
