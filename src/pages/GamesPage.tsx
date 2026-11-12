import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';
import { gameService } from '@/services/gameService';
import { teamService } from '@/services/teamService';
import { Game, Team } from '@/types';

export function GamesPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [gamesData, teamsData] = await Promise.all([
        gameService.getAll(),
        teamService.getAll(),
      ]);
      setGames(gamesData);
      setTeams(teamsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando datos');
    } finally {
      setLoading(false);
    }
  };

  const getTeamName = (teamId: string): string => {
    return teams.find(t => t.id === teamId)?.name || 'Equipo desconocido';
  };

  const deleteGame = async (gameId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este juego?')) return;
    
    try {
      await gameService.delete(gameId);
      setGames(games.filter(g => g.id !== gameId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando juego');
    }
  };

  return (
    <Layout isAdmin>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Gestionar Juegos</h1>
            <p className="text-gray-400">Edita o elimina juegos registrados</p>
          </div>
          <button
            onClick={() => navigate('/admin/juegos/nuevo')}
            className="btn-primary"
          >
            + Nuevo Juego
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
          <div className="animate-pulse text-gray-400">Cargando juegos...</div>
        </div>
      ) : games.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-400 mb-4">No hay juegos registrados</p>
          <button
            onClick={() => navigate('/admin/juegos/nuevo')}
            className="btn-primary"
          >
            Registrar Primer Juego
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="card p-6 hover:border-gold transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-bold text-gold">{game.home_team_final_points}</span>
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-1">
                        {new Date(game.game_date).toLocaleDateString('es-ES')}
                      </p>
                      <p className="text-xs text-gray-500">vs</p>
                    </div>
                    <span className="text-2xl font-bold text-billar">{game.away_team_final_points}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">{getTeamName(game.home_team_id)}</span>
                    <span className="text-gray-500">-</span>
                    <span className="text-white font-semibold">{getTeamName(game.away_team_id)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Ganador: {game.winner_team_id ? getTeamName(game.winner_team_id) : 'No definido'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/juegos/${game.id}/editar`)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteGame(game.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
