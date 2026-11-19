import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { gameService } from '@/services/gameService';
import { teamService } from '@/services/teamService';
import { authService } from '@/services/authService';
import { Game, Team } from '@/types';

export function GamesPage({ readOnly = false }: { readOnly?: boolean }) {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [games, setGames] = useState<Game[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (readOnly) return;

    let active = true;
    let receivedAuthEvent = false;
    const subscription = authService.onAuthStateChange((user) => {
      receivedAuthEvent = true;
      if (active) {
        setIsAuthenticated(!!user);
        setAuthError(null);
      }
    });

    authService.getCurrentUser().then((user) => {
      if (active && !receivedAuthEvent) setIsAuthenticated(!!user);
    }).catch((err) => {
      if (active && !receivedAuthEvent) {
        setAuthError(err instanceof Error ? err.message : 'Error comprobando la sesión');
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [readOnly]);

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

  const canManage = !readOnly && isAuthenticated;
  const selectedTeam = teamId ? teams.find(team => team.id === teamId) : undefined;
  const searchTerm = search.trim().toLocaleLowerCase('es');
  const visibleGames = games.filter(game => {
    if (teamId && game.home_team_id !== teamId && game.away_team_id !== teamId) return false;
    return !searchTerm || [game.home_team_id, game.away_team_id]
      .some(id => getTeamName(id).toLocaleLowerCase('es').includes(searchTerm));
  });

  const deleteGame = async (gameId: string) => {
    if (!canManage) return;
    if (!confirm('¿Estás seguro de que deseas eliminar este juego?')) return;
    
    try {
      await gameService.delete(gameId);
      setGames(games.filter(g => g.id !== gameId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error eliminando juego');
    }
  };

  return (
    <Layout isAdmin={canManage}>
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {readOnly ? 'Juegos del equipo' : canManage ? 'Gestionar Juegos' : 'Juegos'}
            </h1>
            <p className="text-gray-400">
              {readOnly ? selectedTeam?.name : canManage ? 'Edita o elimina juegos registrados' : 'Consulta los juegos registrados'}
            </p>
          </div>
          {canManage && (
            <button
              onClick={() => navigate('/admin/juegos/nuevo')}
              className="btn-primary"
            >
              + Nuevo Juego
            </button>
          )}
        </div>
        {readOnly ? (
          <Link to="/" className="text-gold hover:underline">← Volver a posiciones</Link>
        ) : (
          <div className="max-w-md">
            <label htmlFor="team-search" className="block text-sm font-medium text-gray-300 mb-2">
              Buscar por equipo
            </label>
            <input
              id="team-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Nombre del equipo"
              className="input-field w-full"
            />
          </div>
        )}
      </div>

      {(error || authError) && (
        <div className="card p-4 mb-6 border-l-4 border-red-500">
          {error && <p className="text-red-400">{error}</p>}
          {authError && <p className="text-red-400">{authError}</p>}
        </div>
      )}

      {loading ? (
        <div className="card p-12 text-center">
          <div className="animate-pulse text-gray-400">Cargando juegos...</div>
        </div>
      ) : teamId && !selectedTeam ? (
        <div className="card p-12 text-center">
          <p className="text-gray-400">Equipo no encontrado</p>
        </div>
      ) : visibleGames.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-400 mb-4">
            {searchTerm ? 'No hay juegos para la búsqueda indicada' : readOnly ? 'Este equipo no tiene juegos registrados' : 'No hay juegos registrados'}
          </p>
          {canManage && games.length === 0 && (
            <button
              onClick={() => navigate('/admin/juegos/nuevo')}
              className="btn-primary"
            >
              Registrar Primer Juego
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {visibleGames.map((game) => (
            <div key={game.id} className="card p-6 hover:border-gold transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-bold text-gold">
                      {game.home_team_final_points}
                      <span className="text-sm font-normal text-gray-400"> ({game.home_tables_won ?? 0})</span>
                    </span>
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-1">
                        {new Date(game.game_date).toLocaleDateString('es-ES')}
                      </p>
                      <p className="text-xs text-gray-500">vs</p>
                    </div>
                    <span className="text-2xl font-bold text-billar">
                      {game.away_team_final_points}
                      <span className="text-sm font-normal text-gray-400"> ({game.away_tables_won ?? 0})</span>
                    </span>
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
                {canManage && (
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
