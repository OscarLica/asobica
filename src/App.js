import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { authService } from '@/services/authService';
function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authService.getCurrentUser();
            setIsAuthenticated(!!user);
        };
        checkAuth();
        const subscription = authService.onAuthStateChange((user) => {
            setIsAuthenticated(!!user);
        });
        return () => {
            subscription?.unsubscribe();
        };
    }, []);
    if (isAuthenticated === null) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950", children: _jsx("div", { className: "animate-pulse text-gray-400", children: "Cargando..." }) }));
    }
    return isAuthenticated ? _jsx(_Fragment, { children: children }) : _jsx(Navigate, { to: "/login" });
}
export function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/admin/juegos", element: _jsx(ProtectedRoute, { children: _jsx("div", { children: "Juegos" }) }) }), _jsx(Route, { path: "/admin/juegos/nuevo", element: _jsx(ProtectedRoute, { children: _jsx("div", { children: "Nuevo Juego" }) }) }), _jsx(Route, { path: "/admin/equipos", element: _jsx(ProtectedRoute, { children: _jsx("div", { children: "Equipos" }) }) })] }) }));
}
