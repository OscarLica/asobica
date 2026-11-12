import React, { useEffect, useState } from 'react';
import { Trophy, TrendingUp, Zap } from 'lucide-react';
import { TeamStats } from '@/types';
import { standingsService } from '@/services/standingsService';

export function StandingsTable() {
  const [standings, setStandings] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStandings();
  }, []);

  const loadStandings = async () => {
    try {
      const data = await standingsService.getStandings();
      setStandings(data);
    } catch (error) {
      console.error('Error loading standings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-400">
          Cargando tabla de posiciones...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-billar/50 bg-gray-900/50">
              <th className="px-4 py-4 text-left text-sm font-bold text-gold">#</th>
              <th className="px-4 py-4 text-left text-sm font-bold text-gold">Equipo</th>
              <th className="px-4 py-4 text-center text-sm font-bold text-emerald-400">Juegos</th>
              <th className="px-4 py-4 text-center text-sm font-bold text-emerald-400">Prom. J</th>
              <th className="px-4 py-4 text-center text-sm font-bold text-blue-400">Mesas</th>
              <th className="px-4 py-4 text-center text-sm font-bold text-blue-400">Prom. M</th>
              <th className="px-4 py-4 text-right text-sm font-bold text-yellow-400">Puntos</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, index) => (
              <tr
                key={team.id}
                className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center justify-center">
                    {index === 0 && <Trophy className="text-gold w-5 h-5" />}
                    {index === 1 && <Trophy className="text-gray-400 w-5 h-5" />}
                    {index === 2 && <Trophy className="text-orange-500 w-5 h-5" />}
                    {index > 2 && <span className="text-gray-400 font-bold">{index + 1}</span>}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    {team.logo_url && (
                      <img
                        src={team.logo_url}
                        alt={team.name}
                        className="w-10 h-10 rounded-full bg-gray-800"
                      />
                    )}
                    <span className="font-semibold text-white">{team.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-emerald-400 font-bold">
                    {team.games_won}-{team.games_lost}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-emerald-400">{(team.games_avg * 100).toFixed(1)}%</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-blue-400 font-bold">
                    {team.tables_won}-{team.tables_lost}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-blue-400">{(team.tables_avg * 100).toFixed(1)}%</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-yellow-400 font-bold">{team.points_won}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {standings.map((team, index) => (
          <div
            key={team.id}
            className="card p-4 border-l-4 border-l-billar hover:border-l-gold transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800">
                  {index === 0 && <Trophy className="text-gold w-4 h-4" />}
                  {index === 1 && <Trophy className="text-gray-400 w-4 h-4" />}
                  {index === 2 && <Trophy className="text-orange-500 w-4 h-4" />}
                  {index > 2 && (
                    <span className="text-gray-300 font-bold text-xs">{index + 1}</span>
                  )}
                </div>
                {team.logo_url && (
                  <img
                    src={team.logo_url}
                    alt={team.name}
                    className="w-10 h-10 rounded-full bg-gray-800"
                  />
                )}
                <h3 className="font-semibold text-white flex-1">{team.name}</h3>
              </div>
              <div className="text-right">
                <div className="text-yellow-400 font-bold">{team.points_won}</div>
                <div className="text-xs text-gray-400">puntos</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-gray-800/50 p-2 rounded">
                <div className="text-emerald-400 font-bold">{team.games_won}W</div>
                <div className="text-gray-400">{(team.games_avg * 100).toFixed(0)}%</div>
              </div>
              <div className="bg-gray-800/50 p-2 rounded">
                <div className="text-blue-400 font-bold">{team.tables_won}M</div>
                <div className="text-gray-400">{(team.tables_avg * 100).toFixed(0)}%</div>
              </div>
              <div className="bg-gray-800/50 p-2 rounded">
                <div className="text-gray-300 font-bold">{team.games_played}J</div>
                <div className="text-gray-400">jugados</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
