import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout, token } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dev Odyssey
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                    <span className="text-sm text-gray-700 hidden md:block">
                      {user?.username || user?.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-sm bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-gray-700 hover:text-gray-900 transition-colors flex items-center space-x-1"
                >
                  <User size={16} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;