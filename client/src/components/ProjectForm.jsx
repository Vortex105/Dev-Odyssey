import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ProjectForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("active");
  const [repoUrl, setRepoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      title,
      status,
      repoUrl: repoUrl.trim() || null,
    };

    onAdd(newProject);

    setTitle("");
    setStatus("active");
    setRepoUrl("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      <div className="relative">
        <input
          required
          type="url"
          placeholder="GitHub Repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      <motion.button
        type="submit"
        className="cursor-pointer w-full py-3 px-4 rounded-xl bg-sky-500 active:scale-[0.98] transition-all shadow-md"
        whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
        whileTap={{ scale: 0.98 }}
      >
        Add Project
      </motion.button>
    </motion.form>
  );
}
