import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { getProjects } from './api/projectsApi'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import './App.css'
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen min-w-7xl flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return token ? children : <Navigate to="/login" />;
}

// Public Route Component (redirects if already logged in)
function PublicRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen min-w-full flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return !token ? children : <Navigate to="/" />;
}

function AppContent() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (token) {
      getProjects().then(data => setProjects(data)).catch(err => console.error(err))
    }
  }, [token])

  const handleAddProject = (project) => {
    setProjects(prev => [...prev, project]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-gray-100">
        <Navbar />
        <div className="lg:max-w-7xl mx-auto py-8 px-4">
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
