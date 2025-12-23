import { useState, useEffect } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { getProjects } from './api/projectsApi'
import './App.css'
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => { 
    getProjects().then(data => setProjects(data)).catch(err => console.error(err))
  }, [])

  const handleAddProject = (project) => {
    setProjects(prev => [...prev, project]);
  };

  return (
    <BrowserRouter>
    <div className="
  w-full lg:max-w-3xl bg-white rounded-lg shadow p-0 lg:p-6
  animate-fade-in text-black
">

        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
          <Routes>
      <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<NotFound />} />
            {/* <Route path="/login" element={<Login />} /> */}

    </Routes>
      </div>
      </div>
    
    </BrowserRouter>

  )
}

export default App
