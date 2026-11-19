-- Aplicar en Supabase para corregir y actualizar standings_view en instalaciones existentes.
ALTER TABLE public.games
  ADD COLUMN IF NOT EXISTS home_tables_won INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS away_tables_won INTEGER NOT NULL DEFAULT 0;

DO $migration$
DECLARE
    view_id oid := to_regclass('public.standings_view');
    known_columns text[] := ARRAY[
        'id', 'name', 'logo_url', 'games_won', 'games_lost', 'games_played',
        'games_avg', 'tables_won', 'tables_lost', 'tables_played',
        'tables_difference', 'tables_avg', 'total_points', 'points_won',
        'points_lost', 'points_avg', 'points_difference', 'created_at'
    ];
    unexpected_columns text;
    output_columns text;
BEGIN
    SELECT string_agg(a.attname, ', ' ORDER BY a.attnum)
    INTO unexpected_columns
    FROM pg_catalog.pg_attribute a
    WHERE a.attrelid = view_id AND a.attnum > 0 AND NOT a.attisdropped
      AND NOT (a.attname = ANY(known_columns));

    IF unexpected_columns IS NOT NULL THEN
        RAISE EXCEPTION 'standings_view tiene columnas no reconocidas: %', unexpected_columns;
    END IF;

    -- Preserve existing column order and types; append any missing columns.
    SELECT string_agg(column_sql, ', ' ORDER BY sort_group, sort_position)
    INTO output_columns
    FROM (
        SELECT 0 AS sort_group, a.attnum AS sort_position,
               format('s.%1$I::%2$s AS %1$I', a.attname,
                      pg_catalog.format_type(a.atttypid, a.atttypmod)) AS column_sql
        FROM pg_catalog.pg_attribute a
        WHERE a.attrelid = view_id AND a.attnum > 0 AND NOT a.attisdropped
        UNION ALL
        SELECT 1, c.ordinality, format('s.%1$I AS %1$I', c.name)
        FROM unnest(known_columns) WITH ORDINALITY AS c(name, ordinality)
        WHERE NOT EXISTS (
            SELECT 1 FROM pg_catalog.pg_attribute a
            WHERE a.attrelid = view_id AND a.attnum > 0 AND NOT a.attisdropped
              AND a.attname = c.name
        )
    ) columns_to_select;

    EXECUTE format($view$
CREATE OR REPLACE VIEW public.standings_view AS
WITH game_match_stats AS (
    SELECT game_id, SUM(COALESCE(home_points, 0)) AS home_points,
           SUM(COALESCE(away_points, 0)) AS away_points
    FROM public.game_matches
    GROUP BY game_id
),
team_game_results AS (
    SELECT
        g.home_team_id AS team_id,
        CASE WHEN g.winner_team_id = g.home_team_id THEN 1 ELSE 0 END AS game_won,
        CASE WHEN g.winner_team_id IS NOT NULL AND g.winner_team_id <> g.home_team_id THEN 1 ELSE 0 END AS game_lost,
        CASE WHEN g.winner_team_id IS NOT NULL THEN 1 ELSE 0 END AS game_played,
        COALESCE(g.home_tables_won, 0) AS tables_won,
        COALESCE(g.away_tables_won, 0) AS tables_lost,
        COALESCE(gm.home_points, 0) AS match_points,
        COALESCE(g.home_team_final_points, 0) AS points_won,
        COALESCE(g.away_team_final_points, 0) AS points_lost
    FROM public.games g
    LEFT JOIN game_match_stats gm ON gm.game_id = g.id

    UNION ALL

    SELECT
        g.away_team_id AS team_id,
        CASE WHEN g.winner_team_id = g.away_team_id THEN 1 ELSE 0 END AS game_won,
        CASE WHEN g.winner_team_id IS NOT NULL AND g.winner_team_id <> g.away_team_id THEN 1 ELSE 0 END AS game_lost,
        CASE WHEN g.winner_team_id IS NOT NULL THEN 1 ELSE 0 END AS game_played,
        COALESCE(g.away_tables_won, 0) AS tables_won,
        COALESCE(g.home_tables_won, 0) AS tables_lost,
        COALESCE(gm.away_points, 0) AS match_points,
        COALESCE(g.away_team_final_points, 0) AS points_won,
        COALESCE(g.home_team_final_points, 0) AS points_lost
    FROM public.games g
    LEFT JOIN game_match_stats gm ON gm.game_id = g.id
),
team_totals AS (
    SELECT
        team_id,
        SUM(game_won) AS games_won,
        SUM(game_lost) AS games_lost,
        SUM(game_played) AS games_played,
        ROUND(SUM(game_won)::NUMERIC / NULLIF(SUM(game_played), 0), 3) AS games_avg,
        SUM(tables_won) AS tables_won,
        SUM(tables_lost) AS tables_lost,
        SUM(tables_won + tables_lost) AS tables_played,
        SUM(tables_won - tables_lost) AS tables_difference,
        SUM(tables_won)::NUMERIC / NULLIF(SUM(tables_won + tables_lost), 0) AS tables_avg,
        SUM(match_points) AS total_points,
        SUM(points_won) AS points_won,
        SUM(points_lost) AS points_lost,
        SUM(points_won) - SUM(points_lost) AS points_difference,
        SUM(points_won)::NUMERIC / NULLIF(SUM(game_played), 0) AS points_avg
    FROM team_game_results
    GROUP BY team_id
),
standings AS (
SELECT
    t.id,
    t.name,
    t.logo_url,
    COALESCE(s.games_won, 0) AS games_won,
    COALESCE(s.games_lost, 0) AS games_lost,
    COALESCE(s.games_played, 0) AS games_played,
    COALESCE(s.games_avg, 0) AS games_avg,
    COALESCE(s.tables_won, 0) AS tables_won,
    COALESCE(s.tables_lost, 0) AS tables_lost,
    COALESCE(s.tables_played, 0) AS tables_played,
    COALESCE(s.tables_difference, 0) AS tables_difference,
    COALESCE(s.tables_avg, 0) AS tables_avg,
    COALESCE(s.total_points, 0) AS total_points,
    COALESCE(s.points_won, 0) AS points_won,
    COALESCE(s.points_lost, 0) AS points_lost,
    COALESCE(s.points_avg, 0) AS points_avg,
    COALESCE(s.points_difference, 0) AS points_difference,
    t.created_at
FROM public.teams t
LEFT JOIN team_totals s ON s.team_id = t.id
)
SELECT %s FROM standings s
$view$, output_columns);
END
$migration$;



-- Si cambias a un proyecto Supabase nuevo
-- En SQL Editor, ejecuta en este orden:

-- 001_create_tables.sql: tablas y vista inicial.
-- 002_setup_rls.sql: políticas y registro de perfiles.
-- 003_update_games_schema.sql: columnas e índices de juegos.
-- 004_update_standings_view.sql: vista de posiciones actualizada.
-- Crea el usuario en Authentication → Users y usa create_admin.sql, ajustando el correo.
-- Si necesitas conservar información, restaura los datos reales desde un respaldo. No uses sample_data.sql para ello: contiene datos de ejemplo.
-- Configura la URL y clave pública del nuevo proyecto en el entorno de la aplicación y despliega nuevamente.
-- Importante: antes de publicar, revisa las políticas de profiles en el paso 2: son autorreferentes y permiten actualizar el propio perfil, incluido el rol. También conserva los scripts: actualmente la mayoría están excluidos por .gitignore.

-- Si cambias a otra plataforma o motor
-- No basta con ejecutar estos scripts: dependen de PostgreSQL, Supabase Auth y sus políticas RLS. Habría que adaptar la base de datos, autenticación, permisos y servicios de la aplicación a la nueva plataforma.