import { supabase } from './supabase';
export const teamService = {
    async getAll() {
        const { data, error } = await supabase
            .from('teams')
            .select('*')
            .order('created_at', { ascending: false });
        if (error)
            throw error;
        return data || [];
    },
    async getById(id) {
        const { data, error } = await supabase
            .from('teams')
            .select('*')
            .eq('id', id)
            .single();
        if (error && error.code !== 'PGRST116')
            throw error;
        return data || null;
    },
    async create(team) {
        const { data, error } = await supabase
            .from('teams')
            .insert([team])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
    async update(id, updates) {
        const { data, error } = await supabase
            .from('teams')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw error;
        return data;
    },
    async delete(id) {
        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', id);
        if (error)
            throw error;
    },
};
