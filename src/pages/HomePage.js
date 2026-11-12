import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/public/HeroSection';
import { StandingsTable } from '@/components/public/StandingsTable';
export function HomePage() {
    return (_jsxs(Layout, { children: [_jsx(HeroSection, {}), _jsxs("section", { className: "mb-12", children: [_jsx("h2", { className: "text-3xl font-bold text-white mb-8 text-center", children: "Tabla de Posiciones" }), _jsx(StandingsTable, {})] })] }));
}
