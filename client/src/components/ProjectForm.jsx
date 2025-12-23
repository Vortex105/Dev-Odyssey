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
      className="flex flex-col gap-3 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        whileFocus={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      />

      <motion.select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        whileFocus={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      >
        <option value="active">Active</option>
        <option value="paused">Paused</option>
        <option value="abandoned">Abandoned</option>
        <option value="shipped">Shipped</option>
      </motion.select>

      <motion.input
        type="url"
        placeholder="GitHub Repo URL (optional)"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        whileFocus={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      />

      <motion.button
        type="submit"
        className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 active:scale-95 transition-transform"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        Add Project
      </motion.button>
    </motion.form>
  );
}
