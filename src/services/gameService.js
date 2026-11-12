import { supabase } from './supabase';
export const gameService = {
    async getAll() {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .order('game_date', { ascending: false });
        if (error)
            throw error;
        return data || [];
    },
    async getById(id) {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .eq('id', id)
            .single();
        if (error && error.code !== 'PGRST116')
            throw error;
        return data || null;
    },
    async getByTeam(teamId) {
        const { data, error } = await supabase
            .from('games')
            .select('*')
            .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
            .order('game_date', { ascending: false });
        if (error)
            throw error;
        return data || [];
    },
    async create(game) {
        const { data, error } = await supabase
            .from('games')
            .insert([game])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
    async update(id, updates) {
        const { data, error } = await supabase
            .from('games')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
    async delete(id) {
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
        if (error)
            throw error;
    },
};
