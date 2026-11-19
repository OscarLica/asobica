import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { standingsService } from "@/services/standingsService";
function StandingsTable() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadStandings();
  }, []);
  const loadStandings = async () => {
    try {
      const data = await standingsService.getStandings();
      setStandings(data);
    } catch (error) {
      console.error("Error loading standings:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center h-64", children: /* @__PURE__ */ jsx("div", { className: "animate-pulse text-gray-400", children: "Cargando tabla de posiciones..." }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden lg:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b-2 border-billar/50 bg-gray-900/50", children: [
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-left text-sm font-bold text-gold", children: "#" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-left text-sm font-bold text-gold", children: "Equipo" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-center text-sm font-bold text-emerald-400", children: "Juegos" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-center text-sm font-bold text-emerald-400", children: "Prom. J" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-center text-sm font-bold text-blue-400", children: "Mesas jugadas" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-center text-sm font-bold text-blue-400", children: "Ganadas" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-center text-sm font-bold text-blue-400", children: "Perdidas" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-center text-sm font-bold text-blue-400", children: "Diferencia" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-center text-sm font-bold text-blue-400", children: "Prom. M" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-right text-sm font-bold text-yellow-400", children: "Pts. ganados" }),
        /* @__PURE__ */ jsx("th", { className: "px-4 py-4 text-right text-sm font-bold text-yellow-400", children: "Prom. pts." })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: standings.map((team, index) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "border-b border-gray-800 hover:bg-gray-900/30 transition-colors",
          children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center", children: [
              index === 0 && /* @__PURE__ */ jsx(Trophy, { className: "text-gold w-5 h-5" }),
              index === 1 && /* @__PURE__ */ jsx(Trophy, { className: "text-gray-400 w-5 h-5" }),
              index === 2 && /* @__PURE__ */ jsx(Trophy, { className: "text-orange-500 w-5 h-5" }),
              index > 2 && /* @__PURE__ */ jsx("span", { className: "text-gray-400 font-bold", children: index + 1 })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              team.logo_url && /* @__PURE__ */ jsx(
                "img",
                {
                  src: team.logo_url,
                  alt: team.name,
                  className: "w-10 h-10 rounded-full bg-gray-800"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-white", children: team.name })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsxs("span", { className: "text-emerald-400 font-bold", children: [
              team.games_won,
              "-",
              team.games_lost
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsxs("span", { className: "text-emerald-400", children: [
              (team.games_avg * 100).toFixed(1),
              "%"
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-bold", children: team.tables_played }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-bold", children: team.tables_won }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: team.tables_lost }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400 font-bold", children: team.tables_difference }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-center", children: /* @__PURE__ */ jsx("span", { className: "text-blue-400", children: team.tables_avg.toFixed(2) }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-right", children: /* @__PURE__ */ jsx("span", { className: "text-yellow-400 font-bold", children: team.points_won }) }),
            /* @__PURE__ */ jsx("td", { className: "px-4 py-4 text-right", children: /* @__PURE__ */ jsx("span", { className: "text-yellow-400", children: team.points_avg.toFixed(2) }) })
          ]
        },
        team.id
      )) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "lg:hidden space-y-4", children: standings.map((team, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "card p-4 border-l-4 border-l-billar hover:border-l-gold transition-colors",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between mb-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center w-8 h-8 rounded-full bg-gray-800", children: [
                index === 0 && /* @__PURE__ */ jsx(Trophy, { className: "text-gold w-4 h-4" }),
                index === 1 && /* @__PURE__ */ jsx(Trophy, { className: "text-gray-400 w-4 h-4" }),
                index === 2 && /* @__PURE__ */ jsx(Trophy, { className: "text-orange-500 w-4 h-4" }),
                index > 2 && /* @__PURE__ */ jsx("span", { className: "text-gray-300 font-bold text-xs", children: index + 1 })
              ] }),
              team.logo_url && /* @__PURE__ */ jsx(
                "img",
                {
                  src: team.logo_url,
                  alt: team.name,
                  className: "w-10 h-10 rounded-full bg-gray-800"
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white flex-1", children: team.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsx("div", { className: "text-yellow-400 font-bold", children: team.points_won }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-400", children: [
                "prom. ",
                team.points_avg.toFixed(2)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 p-2 rounded", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-emerald-400 font-bold", children: [
                team.games_won,
                "W"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-gray-400", children: [
                (team.games_avg * 100).toFixed(0),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 p-2 rounded", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-blue-400 font-bold", children: [
                team.tables_won,
                "-",
                team.tables_lost
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-gray-400", children: [
                team.tables_played,
                " jugadas"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 p-2 rounded", children: [
              /* @__PURE__ */ jsx("div", { className: "text-blue-400 font-bold", children: team.tables_difference }),
              /* @__PURE__ */ jsxs("div", { className: "text-gray-400", children: [
                "dif. / prom. ",
                team.tables_avg.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-800/50 p-2 rounded", children: [
              /* @__PURE__ */ jsxs("div", { className: "text-gray-300 font-bold", children: [
                team.games_played,
                "J"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-gray-400", children: [
                "prom. pts. ",
                team.points_avg.toFixed(2)
              ] })
            ] })
          ] })
        ]
      },
      team.id
    )) })
  ] });
}
export {
  StandingsTable
};
