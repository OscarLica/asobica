import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AlertCircle } from 'lucide-react';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.signIn(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-billar to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-billar/50">
              <span className="text-white font-bold text-3xl">9</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">ASOBICA Admin</h1>
            <p className="text-gray-400">Panel administrativo de la liga</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex gap-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="card p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder="admin@asobica.com"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
            <p className="text-blue-300 text-xs leading-relaxed">
              <strong>Nota:</strong> Este es el panel administrativo. Solo usuarios autorizados pueden acceder. 
              Contacta al administrador del sistema si necesitas credenciales.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
