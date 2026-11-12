import React from 'react';
import { Trophy, Users, Zap, TrendingUp } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative mb-12 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-billar rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-billar to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-billar/50">
                <Trophy className="w-12 h-12 text-gold" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gold rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            PRIMERA LIGA INTERCLUBES
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-billar to-emerald-400">
              ASOBICA 2026
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Torneo de Bola 9 por Equipos
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="card p-6 text-center hover:border-gold transition-colors">
              <div className="text-3xl font-bold text-emerald-400 mb-2">9</div>
              <p className="text-sm text-gray-400">Equipos</p>
            </div>
            <div className="card p-6 text-center hover:border-gold transition-colors">
              <div className="text-3xl font-bold text-blue-400 mb-2">100+</div>
              <p className="text-sm text-gray-400">Juegos</p>
            </div>
            <div className="card p-6 text-center hover:border-gold transition-colors">
              <div className="text-3xl font-bold text-yellow-400 mb-2">45+</div>
              <p className="text-sm text-gray-400">Jugadores</p>
            </div>
            <div className="card p-6 text-center hover:border-gold transition-colors">
              <div className="text-3xl font-bold text-pink-400 mb-2">LIVE</div>
              <p className="text-sm text-gray-400">En Vivo</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="card p-6 border-l-4 border-l-emerald-500">
            <Trophy className="w-8 h-8 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Posiciones Actualizadas</h3>
            <p className="text-sm text-gray-400">
              Tabla de posiciones en tiempo real con todas las estadísticas
            </p>
          </div>

          <div className="card p-6 border-l-4 border-l-blue-500">
            <Users className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Estadísticas Completas</h3>
            <p className="text-sm text-gray-400">
              Desempeño detallado de cada equipo y jugador
            </p>
          </div>

          <div className="card p-6 border-l-4 border-l-gold">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="font-bold text-white mb-2">Resultados Instantáneos</h3>
            <p className="text-sm text-gray-400">
              Actualizaciones automáticas cuando se registran juegos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
