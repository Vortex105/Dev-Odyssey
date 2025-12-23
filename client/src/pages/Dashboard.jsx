import React, { useEffect, useState } from 'react';
import StatusTiles from '../components/StatusTiles';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import { getProjects, createProject, deleteProject, updateProject } from '../api/projectsApi';
import ProjectSidebar from '../components/ProjectSidebar';


export default function Dashboard() {
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
      setError('Failed to load projects. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);


  // Add project
  const handleAddProject = async (projectData) => {
  try {
    const newProject = await createProject(projectData);
    setProjects((prev) => [...prev, newProject]);
  } catch {
    setError('Failed to add project. Please try again.');
  }
};


  // Delete project
    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id);
            setProjects((prev) => prev.filter((p) => p._id !== id));
        } catch {
            setError('Failed to delete project. Please try again.');
        }
    };
    
    const handleUpdateProject = async (id, updates) => {
        try {
            const updated = await updateProject(id, updates);

            setProjects((prev) =>
                prev.map((p) => (p._id === id ? updated : p))
            );
        } catch {
            setError('Failed to update project. Please try again.');
        }
    };
    
    if (loading) {
  return (
    <div className="text-center py-20 text-gray-500">
      Loading your projects…
    </div>
  );
}
    if (error) {
  return (
    <div className="text-center py-20">
      <p className="text-red-600 font-medium">{error}</p>
      <p className="text-sm text-gray-500 mt-2">
        Try refreshing the page.
      </p>
    </div>
  );
}



  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-sm text-gray-500">
          Track what you’re building and what’s stuck
        </p>
      </div>

      {/* Status summary */}
      <StatusTiles projects={projects} />

      {/* Add project */}
      <div className="border rounded-lg p-4 bg-gray-50">
        <h3 className="font-medium mb-3">Add new project</h3>
        <ProjectForm onAdd={handleAddProject} />
      </div>

      {/* Project list */}
      <div>
        <h3 className="font-medium mb-3">Your projects</h3>
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

      </div>
    </div>
  );
}
