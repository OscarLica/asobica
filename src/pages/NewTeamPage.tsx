import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { teamService } from '@/services/teamService';
import { Team } from '@/types';

export function NewTeamPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
  });

  useEffect(() => {
    if (isEditing) {
      loadTeam();
    }
  }, [id]);

  const loadTeam = async () => {
    try {
      if (!id) return;
      const team = await teamService.getById(id);
      if (team) {
        setFormData({
          name: team.name,
          logo_url: team.logo_url || '',
        });
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando equipo');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('El nombre del equipo es requerido');
      return;
    }

    try {
      setSubmitting(true);
      const teamData = {
        name: formData.name,
        logo_url: formData.logo_url || undefined,
      };

      if (isEditing && id) {
        await teamService.update(id, teamData as any);
      } else {
        await teamService.create(teamData as any);
      }

      navigate('/admin/equipos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error guardando equipo');
    } finally {
      setSubmitting(false);
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
        <h1 className="text-4xl font-bold text-white mb-2">
          {isEditing ? 'Editar Equipo' : 'Nuevo Equipo'}
        </h1>
        <p className="text-gray-400">
          {isEditing ? 'Actualiza la información del equipo' : 'Crea un nuevo equipo para la liga'}
        </p>
      </div>

      <div className="card p-8 max-w-2xl">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Equipo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Equipo Azul, Equipo Rojo"
              className="input-field w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL del Logo
            </label>
            <input
              type="url"
              name="logo_url"
              value={formData.logo_url}
              onChange={handleChange}
              placeholder="https://ejemplo.com/logo.png"
              className="input-field w-full"
            />
            {formData.logo_url && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg flex items-center justify-center">
                <img
                  src={formData.logo_url}
                  alt="Logo preview"
                  className="h-24 object-contain"
                  onError={() => <p className="text-red-400">Error cargando imagen</p>}
                />
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : isEditing ? 'Actualizar Equipo' : 'Crear Equipo'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/equipos')}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
