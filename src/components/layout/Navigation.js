import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { authService } from "@/services/authService";
function Navigation({ isAdmin = false, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleLogout = async () => {
    await authService.signOut();
    if (onLogout) onLogout();
  };
  return /* @__PURE__ */ jsx("nav", { className: "bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-b border-gray-800 shadow-lg shadow-billar/20 sticky top-0 z-50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-billar to-emerald-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsx("span", { className: "text-white font-bold text-lg", children: "9" }) }),
        /* @__PURE__ */ jsx("span", { className: "font-bold text-lg text-white hidden sm:inline", children: "ASOBICA" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-8", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "text-gray-300 hover:text-white transition-colors font-medium",
            children: "Posiciones"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin/juegos",
            className: "text-gray-300 hover:text-white transition-colors font-medium",
            children: "Juegos"
          }
        ),
        isAdmin && /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin",
            className: "text-gray-300 hover:text-white transition-colors font-medium",
            children: "Panel Admin"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-4", children: isAdmin && /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleLogout,
          className: "flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors",
          children: [
            /* @__PURE__ */ jsx(LogOut, { size: 18 }),
            /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Salir" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setMobileMenuOpen(!mobileMenuOpen),
          className: "md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors",
          children: mobileMenuOpen ? /* @__PURE__ */ jsx(X, { size: 24, className: "text-white" }) : /* @__PURE__ */ jsx(Menu, { size: 24, className: "text-white" })
        }
      )
    ] }),
    mobileMenuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden mt-4 space-y-4 border-t border-gray-800 pt-4", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "block text-gray-300 hover:text-white transition-colors",
          children: "Posiciones"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/admin/juegos",
          className: "block text-gray-300 hover:text-white transition-colors",
          children: "Juegos"
        }
      ),
      isAdmin && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/admin",
            className: "block text-gray-300 hover:text-white transition-colors",
            children: "Panel Admin"
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 transition-colors",
            children: [
              /* @__PURE__ */ jsx(LogOut, { size: 18 }),
              /* @__PURE__ */ jsx("span", { children: "Salir" })
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Navigation
};
