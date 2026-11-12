import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { teamService } from '@/services/teamService';
import { Team } from '@/types';

export function TeamsPage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setLoading(true);
      const data = await teamService.getAll();
      setTeams(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando equipos');
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async (teamId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este equipo?')) return;

    try {
      await teamService.delete(teamId);
      setTeams(teams.filter(t => t.id !== teamId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando equipo');
    }
  };

  return (
    <Layout isAdmin>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gestionar Equipos</h1>
            <p className="text-gray-400">Administra los equipos y jugadores</p>
          </div>
          <button
            onClick={() => navigate('/admin/equipos/nuevo')}
            className="btn-primary"
          >
            + Nuevo Equipo
          </button>
        </div>
      </div>

      {error && (
        <div className="card p-4 mb-6 border-l-4 border-red-500">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="card p-12 text-center">
          <div className="animate-pulse text-gray-400">Cargando equipos...</div>
        </div>
      ) : teams.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-400 mb-4">No hay equipos registrados</p>
          <button
            onClick={() => navigate('/admin/equipos/nuevo')}
            className="btn-primary"
          >
            Registrar Primer Equipo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team.id} className="card p-6 hover:border-gold transition-all group">
              <div className="mb-4">
                {team.logo_url ? (
                  <img
                    src={team.logo_url}
                    alt={team.name}
                    className="w-12 h-12 rounded-lg mb-4 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-billar to-billar/50 flex items-center justify-center mb-4 text-lg">
                    🎱
                  </div>
                )}
                <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors">
                  {team.name}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Creado: {new Date(team.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-700">
                <button
                  onClick={() => navigate(`/admin/equipos/${team.id}`)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  Ver
                </button>
                <button
                  onClick={() => navigate(`/admin/equipos/${team.id}/editar`)}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
