import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { GamesPage } from '@/pages/GamesPage';
import { NewGamePage } from '@/pages/NewGamePage';
import { TeamsPage } from '@/pages/TeamsPage';
import { NewTeamPage } from '@/pages/NewTeamPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { StandingsPage } from '@/pages/StandingsPage';
import { authService } from '@/services/authService';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await authService.getCurrentUser();
      setIsAuthenticated(!!user);
    };

    checkAuth();

    const subscription = authService.onAuthStateChange((user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        <div className="animate-pulse text-gray-400">Cargando...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<StandingsPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rutas Administrativas */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Gestión de Juegos */}
        <Route
          path="/admin/juegos"
          element={
            <ProtectedRoute>
              <GamesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/juegos/nuevo"
          element={
            <ProtectedRoute>
              <NewGamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/juegos/:id/editar"
          element={
            <ProtectedRoute>
              <NewGamePage />
            </ProtectedRoute>
          }
        />

        {/* Gestión de Equipos */}
        <Route
          path="/admin/equipos"
          element={
            <ProtectedRoute>
              <TeamsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipos/nuevo"
          element={
            <ProtectedRoute>
              <NewTeamPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipos/:id"
          element={
            <ProtectedRoute>
              <TeamsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/equipos/:id/editar"
          element={
            <ProtectedRoute>
              <NewTeamPage />
            </ProtectedRoute>
          }
        />

        {/* Configuración */}
        <Route
          path="/admin/configuracion"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
