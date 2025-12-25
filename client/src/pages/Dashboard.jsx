import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StatusTiles from '../components/StatusTiles';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import { getProjects, createProject, deleteProject, updateProject } from '../api/projectsApi';
import ProjectSidebar from '../components/ProjectSidebar';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        if (err.message.includes('Authentication required')) {
          logout(); // Log out if authentication fails
        } else {
          setError('Failed to load projects. Check your connection.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [logout]);

  // Add project
  const handleAddProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setProjects((prev) => [...prev, newProject]);
    } catch (err) {
      if (err.message.includes('Authentication required')) {
        logout();
      } else {
        setError('Failed to add project. Please try again.');
      }
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      if (err.message.includes('Authentication required')) {
        logout();
      } else {
        setError('Failed to delete project. Please try again.');
      }
    }
  };

  const handleUpdateProject = async (id, updates) => {
    try {
      const updated = await updateProject(id, updates);

      setProjects((prev) =>
        prev.map((p) => (p._id === id ? updated : p))
      );
    } catch (err) {
      if (err.message.includes('Authentication required')) {
        logout();
      } else {
        setError('Failed to update project. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md w-full text-center">
          <div className="text-red-500 text-2xl mb-2">⚠️</div>
          <p className="text-red-700 font-medium mb-2">{error}</p>
          <p className="text-sm text-red-500">
            Try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center py-6">
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome back!
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your development journey. Manage your projects and see your progress at a glance.
        </p>
      </div>

      {/* Status summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <StatusTiles projects={projects} />
      </motion.div>

      {/* Add project */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
           Add new project
        </h3>
        <ProjectForm onAdd={handleAddProject} />
      </motion.div>

      {/* Project list */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2"></span> Your projects ({projects.length})
        </h3>
        <ProjectList
          projects={projects}
          onDelete={handleDeleteProject}
          onUpdate={handleUpdateProject}
          onSelect={(project) => {
            setSelectedProject(project);
            setIsSidebarOpen(true);
          }}
        />

        <ProjectSidebar
          project={selectedProject}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onUpdate={handleUpdateProject}
        />
      </motion.div>
    </motion.div>
  );
}
