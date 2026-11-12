import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    ];
    return (_jsxs(Layout, { isAdmin: true, children: [_jsxs("div", { className: "mb-12", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-2", children: "Panel Administrativo" }), _jsx("p", { className: "text-gray-400", children: "Gestiona la liga de billar Asobica 2026" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12", children: adminOptions.map((option) => (_jsxs("button", { onClick: () => navigate(option.path), className: "card p-6 text-left hover:border-gold transition-all transform hover:scale-105 group", children: [_jsx("div", { className: `w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center text-2xl mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/50 transition-shadow`, children: option.icon }), _jsx("h3", { className: "text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors", children: option.title }), _jsx("p", { className: "text-gray-400 text-sm", children: option.description }), _jsx("div", { className: "mt-4 text-billar font-semibold text-sm", children: "Ir \u2192" })] }, option.path))) }), _jsxs("section", { className: "card p-8 border-l-4 border-l-gold", children: [_jsx("h2", { className: "text-2xl font-bold text-white mb-6", children: "Acciones R\u00E1pidas" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx("button", { className: "btn-primary", children: "+ Nuevo Equipo" }), _jsx("button", { className: "btn-primary", children: "+ Nuevo Juego" }), _jsx("button", { className: "btn-secondary", children: "Configuraci\u00F3n" })] })] })] }));
}
