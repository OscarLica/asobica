import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';

export function SettingsPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUserEmail(user?.email || null);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando información');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cerrando sesión');
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get('new_password') as string;
    const confirmPassword = formData.get('confirm_password') as string;

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await authService.updatePassword(newPassword);
      setSuccessMessage('Contraseña actualizada correctamente');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error actualizando contraseña');
    }
  };

  if (loading) {
    return (
      <Layout isAdmin>
        <div className="animate-pulse text-gray-400">Cargando...</div>
      </Layout>
    );
  }

  return (
    <Layout isAdmin>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Configuración</h1>
        <p className="text-gray-400">Gestiona tu cuenta y preferencias</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Información de la Cuenta */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Información de la Cuenta</h2>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-lg text-white font-medium">{userEmail}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Cambiar Contraseña */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Cambiar Contraseña</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-400">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nueva Contraseña *
              </label>
              <input
                type="password"
                name="new_password"
                placeholder="Mínimo 6 caracteres"
                className="input-field w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Repite la contraseña"
                className="input-field w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
            >
              Actualizar Contraseña
            </button>
          </form>
        </div>

        {/* Sobre la Aplicación */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Sobre la Aplicación</h2>

          <div className="space-y-4 text-gray-300">
            <div>
              <p className="font-semibold text-white mb-2">ASOBICA 2026</p>
              <p className="text-sm">Plataforma profesional de gestión de ligas de billar</p>
            </div>

            <div>
              <p className="font-semibold text-white mb-2">Versión</p>
              <p className="text-sm">1.0.0</p>
            </div>

            <div>
              <p className="font-semibold text-white mb-2">Tecnología</p>
              <p className="text-sm">React + TypeScript + Supabase + Tailwind CSS</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
