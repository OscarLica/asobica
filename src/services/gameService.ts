import { supabase } from './supabase';
import { Game } from '@/types';

export const gameService = {
  async getAll(): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('game_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Game | null> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async getByTeam(teamId: string): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
      .order('game_date', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(game: Omit<Game, 'id' | 'created_at' | 'updated_at'>): Promise<Game> {
    const { data, error } = await supabase
      .from('games')
      .insert([game])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Game>): Promise<Game> {
    const { data, error } = await supabase
      .from('games')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    // First delete related game_matches
    await supabase
      .from('game_matches')
      .delete()
      .eq('game_id', id);

    // Then delete the game
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
