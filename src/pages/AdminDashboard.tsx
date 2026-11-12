import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const navigate = useNavigate();

  const adminOptions = [
    {
      title: 'Registrar Juego',
      description: 'Ingresa los resultados de un nuevo juego',
      icon: '🎮',
      path: '/admin/juegos/nuevo',
      color: 'from-emerald-600 to-teal-600',
    },
    {
      title: 'Gestionar Juegos',
      description: 'Edita o elimina juegos registrados',
      icon: '⚙️',
      path: '/admin/juegos',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      title: 'Gestionar Equipos',
      description: 'Administra equipos y jugadores',
      icon: '👥',
      path: '/admin/equipos',
      color: 'from-violet-600 to-purple-600',
    },
    {
      title: 'Ver Posiciones',
      description: 'Visualiza la tabla de posiciones actualizada',
      icon: '🏆',
      path: '/',
      color: 'from-yellow-600 to-orange-600',
    },
    {
      title: 'Configuración',
      description: 'Cambia contraseña y preferencias',
      icon: '⚙️',
      path: '/admin/configuracion',
      color: 'from-gray-600 to-slate-600',
    },
  ];

  return (
    <Layout isAdmin>
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Panel Administrativo</h1>
        <p className="text-gray-400">Gestiona la liga de billar Asobica 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {adminOptions.map((option) => (
          <button
            key={option.path}
            onClick={() => navigate(option.path)}
            className="card p-6 text-left hover:border-gold transition-all transform hover:scale-105 group"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center text-2xl mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/50 transition-shadow`}>
              {option.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
              {option.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {option.description}
            </p>
            <div className="mt-4 text-billar font-semibold text-sm">
              Ir →
            </div>
          </button>
        ))}
      </div>
    </Layout>
  );
}
