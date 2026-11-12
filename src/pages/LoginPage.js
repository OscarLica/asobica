import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AlertCircle } from 'lucide-react';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.signIn(email, password);
            navigate('/admin');
        }
        catch (err) {
            setError(err.message || 'Error al iniciar sesión');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(Layout, { children: _jsx("div", { className: "min-h-screen flex items-center justify-center px-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-billar to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg shadow-billar/50", children: _jsx("span", { className: "text-white font-bold text-3xl", children: "9" }) }), _jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "ASOBICA Admin" }), _jsx("p", { className: "text-gray-400", children: "Panel administrativo de la liga" })] }), error && (_jsxs("div", { className: "mb-6 p-4 bg-red-900/20 border border-red-700 rounded-lg flex gap-3", children: [_jsx(AlertCircle, { className: "text-red-400 flex-shrink-0", size: 20 }), _jsx("p", { className: "text-red-300 text-sm", children: error })] })), _jsxs("form", { onSubmit: handleSubmit, className: "card p-8", children: [_jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Correo Electr\u00F3nico" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "input-field", placeholder: "admin@asobica.com" })] }), _jsxs("div", { className: "mb-8", children: [_jsx("label", { className: "block text-sm font-medium text-gray-300 mb-2", children: "Contrase\u00F1a" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "input-field", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] }), _jsx("button", { type: "submit", disabled: loading, className: "btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed", children: loading ? 'Iniciando sesión...' : 'Iniciar Sesión' })] }), _jsx("div", { className: "mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg", children: _jsxs("p", { className: "text-blue-300 text-xs leading-relaxed", children: [_jsx("strong", { children: "Nota:" }), " Este es el panel administrativo. Solo usuarios autorizados pueden acceder. Contacta al administrador del sistema si necesitas credenciales."] }) })] }) }) }));
}
