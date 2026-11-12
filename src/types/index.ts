export interface Team {
  id: string;
  name: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  name: string;
  team_id: string;
  player_position?: string;
  created_at: string;
}

export interface Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  game_date: string;
  home_team_final_points: number;
  away_team_final_points: number;
  home_tables_won: number;
  away_tables_won: number;
  winner_team_id?: string;
  created_at: string;
  updated_at: string;
}

export interface GameMatch {
  id: string;
  game_id: string;
  round_number: number;
  home_player_id: string;
  away_player_id: string;
  home_wins: number;
  home_losses: number;
  away_wins: number;
  away_losses: number;
  home_points: number;
  away_points: number;
  created_at: string;
}

export interface TeamStats {
  id: string;
  name: string;
  logo_url?: string;
  games_won: number;
  games_lost: number;
  games_played: number;
  games_avg: number;
  tables_won: number;
  tables_lost: number;
  tables_played: number;
  tables_avg: number;
  total_points: number;
  points_won: number;
  points_lost: number;
  points_avg: number;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'viewer';
  created_at: string;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    user_metadata: any;
  };
  session: any;
}
