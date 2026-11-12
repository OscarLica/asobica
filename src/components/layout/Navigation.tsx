import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { authService } from '@/services/authService';

interface NavigationProps {
  isAdmin?: boolean;
  onLogout?: () => void;
}

export function Navigation({ isAdmin = false, onLogout }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authService.signOut();
    if (onLogout) onLogout();
  };

  return (
    <nav className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800 shadow-lg shadow-billar/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-billar to-emerald-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-lg">9</span>
            </div>
            <span className="font-bold text-lg text-white hidden sm:inline">ASOBICA</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Posiciones
            </Link>
            {isAdmin && (
              <>
                <Link 
                  to="/admin" 
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Panel Admin
                </Link>
                <Link 
                  to="/admin/juegos" 
                  className="text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Juegos
                </Link>
              </>
            )}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
              >
                <LogOut size={18} />
                <span className="text-sm">Salir</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 border-t border-gray-800 pt-4">
            <Link 
              to="/" 
              className="block text-gray-300 hover:text-white transition-colors"
            >
              Posiciones
            </Link>
            {isAdmin && (
              <>
                <Link 
                  to="/admin" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Panel Admin
                </Link>
                <Link 
                  to="/admin/juegos" 
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Juegos
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Salir</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
