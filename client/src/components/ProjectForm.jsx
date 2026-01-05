import React, { useState } from "react";
import { motion } from "framer-motion";

// GitHub repo URL validator
const isValidGitHubRepo = (url) => {
  const githubRepoRegex =
    /^https:\/\/github\.com\/[A-Za-z0-9_-]+\/[A-Za-z0-9._-]+$/;

  return githubRepoRegex.test(url);
};

export default function ProjectForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [githubrepoUrl, setgithubRepoUrl] = useState("");
  const [repoError, setRepoError] = useState("");


  const normalizeGitHubUrl = (url) => {
  let clean = url.trim();

  // Quick empty check
  if (!clean) return null;

  // Add https:// if missing
  if (!/^https?:\/\//i.test(clean)) {
    clean = `https://${clean}`;
  }

  try {
    const parsed = new URL(clean);

    // Must be github.com
    if (parsed.hostname.toLowerCase() !== "github.com") return null;

    // Path must have exactly /user/repo
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length !== 2) return null;

    // Append .git if missing
    if (!parsed.pathname.endsWith(".git")) {
      parsed.pathname += ".git";
    }
    return parsed.toString();
  } catch {
    return null;
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (githubrepoUrl && !isValidGitHubRepo(githubrepoUrl)) {
      setRepoError("Enter a valid GitHub repository URL");
      return;
    }

    const normalizedRepo = githubrepoUrl ? normalizeGitHubUrl(githubrepoUrl) : null;
if (githubrepoUrl && !normalizedRepo) {
  alert("Enter a valid GitHub repo URL in the form: github.com/user/repo");
  return;
}

const newProject = {
  title,
  status,
  repoUrl: normalizedRepo,
};


    onAdd(newProject);

    setTitle("");
    setStatus("active");
    setgithubRepoUrl("");
    setRepoError("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Project Title */}
      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />

      {/* Status */}
      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm appearance-none bg-white"
        >
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="abandoned">Abandoned</option>
          <option value="shipped">Shipped</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* GitHub Repo URL */}
      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="GitHub Repo URL (https://github.com/user/repo)"
          value={githubrepoUrl}
          onChange={(e) => {
            const value = e.target.value;
            setgithubRepoUrl(value);

            if (!value) {
              setRepoError("");
              return;
            }

            if (!isValidGitHubRepo(value)) {
              setRepoError("Enter a valid GitHub repository URL");
            } else {
              setRepoError("");
            }
          }}
          className={`w-full px-4 py-3 rounded-xl border transition-all shadow-sm focus:outline-none focus:ring-2
            ${
              repoError
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-200 focus:ring-blue-500 focus:border-transparent"
            }
          `}
        />

        {repoError && (
          <p className="text-left text-sm text-red-600">{repoError}</p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        className="cursor-pointer w-full py-3 px-4 rounded-xl bg-sky-500 text-white font-medium active:scale-[0.98] transition-all shadow-md"
        whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
        whileTap={{ scale: 0.98 }}
      >
        Add Project
      </motion.button>
    </motion.form>
  );
}
