import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { gameService } from '@/services/gameService';
import { teamService } from '@/services/teamService';
import { Game, Team } from '@/types';

export function NewGamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    home_team_id: '',
    away_team_id: '',
    game_date: new Date().toISOString().split('T')[0],
    home_team_final_points: 0,
    away_team_final_points: 0,
    home_tables_won: 0,
    away_tables_won: 0,
  });

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const teamsData = await teamService.getAll();
        setTeams(teamsData);
        
        if (isEditing && id) {
          const game = await gameService.getById(id);
          if (game) {
            setFormData({
              home_team_id: game.home_team_id,
              away_team_id: game.away_team_id,
              game_date: game.game_date.split('T')[0],
              home_team_final_points: game.home_team_final_points,
              away_team_final_points: game.away_team_final_points,
              home_tables_won: game.home_tables_won || 0,
              away_tables_won: game.away_tables_won || 0,
            });
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error cargando datos');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['home_team_final_points', 'away_team_final_points', 'home_tables_won', 'away_tables_won'].includes(name)
        ? parseInt(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.home_team_id || !formData.away_team_id) {
      setError('Selecciona ambos equipos');
      return;
    }

    if (formData.home_team_id === formData.away_team_id) {
      setError('Los equipos deben ser diferentes');
      return;
    }

    try {
      setSubmitting(true);
      const winner_team_id = formData.home_team_final_points > formData.away_team_final_points
        ? formData.home_team_id
        : formData.away_team_final_points > formData.home_team_final_points
        ? formData.away_team_id
        : undefined;

      // Asegurar que las mesas ganadas sean inversas
      const away_tables_won = formData.home_tables_won;
      const home_tables_won = formData.away_tables_won;

      const gameData = {
        home_team_id: formData.home_team_id,
        away_team_id: formData.away_team_id,
        game_date: formData.game_date,
        home_team_final_points: formData.home_team_final_points,
        away_team_final_points: formData.away_team_final_points,
        home_tables_won,
        away_tables_won,
        winner_team_id,
      };

      if (isEditing && id) {
        await gameService.update(id, gameData);
      } else {
        await gameService.create(gameData as any);
      }

      navigate('/admin/juegos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error guardando juego');
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
          {isEditing ? 'Editar Juego' : 'Registrar Nuevo Juego'}
        </h1>
        <p className="text-gray-400">Ingresa los detalles del juego</p>
      </div>

      <div className="card p-8 max-w-2xl">
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Equipo Local *
              </label>
              <select
                name="home_team_id"
                value={formData.home_team_id}
                onChange={handleChange}
                className="input-field w-full"
                required
              >
                <option value="">Selecciona equipo...</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Equipo Visitante *
              </label>
              <select
                name="away_team_id"
                value={formData.away_team_id}
                onChange={handleChange}
                className="input-field w-full"
                required
              >
                <option value="">Selecciona equipo...</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Fecha del Juego *
            </label>
            <input
              type="date"
              name="game_date"
              value={formData.game_date}
              onChange={handleChange}
              className="input-field w-full"
              required
            />
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Resultado Final</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Puntos {formData.home_team_id && `(${teams.find(t => t.id === formData.home_team_id)?.name})`}
                </label>
                <input
                  type="number"
                  name="home_team_final_points"
                  value={formData.home_team_final_points}
                  onChange={handleChange}
                  min="0"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Puntos {formData.away_team_id && `(${teams.find(t => t.id === formData.away_team_id)?.name})`}
                </label>
                <input
                  type="number"
                  name="away_team_final_points"
                  value={formData.away_team_final_points}
                  onChange={handleChange}
                  min="0"
                  className="input-field w-full"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Mesas Ganadas</h3>
            <p className="text-xs text-gray-400 mb-4">Las mesas ganadas del equipo visitante serán las perdidas del equipo local</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mesas Ganadas {formData.away_team_id && `(${teams.find(t => t.id === formData.away_team_id)?.name})`}
                </label>
                <input
                  type="number"
                  name="away_tables_won"
                  value={formData.away_tables_won}
                  onChange={handleChange}
                  min="0"
                  className="input-field w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mesas Ganadas {formData.home_team_id && `(${teams.find(t => t.id === formData.home_team_id)?.name})`}
                </label>
                <input
                  type="number"
                  name="home_tables_won"
                  value={formData.home_tables_won}
                  onChange={handleChange}
                  min="0"
                  className="input-field w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 disabled:opacity-50"
            >
              {submitting ? 'Guardando...' : isEditing ? 'Actualizar Juego' : 'Registrar Juego'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/juegos')}
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
