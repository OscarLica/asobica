import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigation } from './Navigation';
import { Footer } from './Footer';
export function Layout({ children, isAdmin = false }) {
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950", children: [_jsx(Navigation, { isAdmin: isAdmin }), _jsx("main", { className: "flex-1 container mx-auto px-4 py-8", children: children }), _jsx(Footer, {})] }));
}
