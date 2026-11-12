import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { standingsService } from '@/services/standingsService';
import { TeamStats } from '@/types';

export function StandingsPage() {
  const [standings, setStandings] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      setLoading(true);
      const data = await standingsService.getStandings();
      setStandings(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando posiciones');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Tabla de Posiciones</h1>
        <p className="text-gray-400">Liga de Billar ASOBICA 2026</p>
      </div>

      {error && (
        <div className="card p-4 mb-6 border-l-4 border-red-500">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {loading ? (
        <div className="card p-12 text-center">
          <div className="animate-pulse text-gray-400">Cargando tabla de posiciones...</div>
        </div>
      ) : standings.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-gray-400">No hay datos de posiciones disponibles</p>
          <p className="text-sm text-gray-500 mt-2">Los datos aparecerán cuando se registren juegos</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gold">Pos.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Equipo</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">PJ</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-400">G</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-red-400">P</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-billar">Prom.</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-400">Pts.</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <tr
                    key={team.id}
                    className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <span className="text-lg font-bold text-gold">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {team.logo_url ? (
                          <img
                            src={team.logo_url}
                            alt={team.name}
                            className="w-8 h-8 rounded object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded bg-gradient-to-br from-billar to-billar/50 flex items-center justify-center text-sm">
                            🎱
                          </div>
                        )}
                        <span className="font-medium text-white">{team.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-300">{team.games_played}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-400 font-semibold">{team.games_won}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-red-400 font-semibold">{team.games_lost}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-billar font-semibold">
                        {team.games_avg.toFixed(3)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-yellow-400 font-bold">{team.points_won}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Estadísticas Adicionales */}
      {standings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Líder de Juegos</h3>
            <p className="text-2xl font-bold text-gold">
              {standings[0]?.name}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {standings[0]?.games_won} - {standings[0]?.games_lost}
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Juegos Totales</h3>
            <p className="text-2xl font-bold text-billar">
              {standings.reduce((sum, team) => sum + team.games_played, 0)}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {standings.length} equipos
            </p>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Mejor Promedio</h3>
            <p className="text-2xl font-bold text-emerald-400">
              {standings[0]?.games_avg.toFixed(3)}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              {standings[0]?.name}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
}
