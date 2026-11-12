import { supabase } from './supabase';
export const standingsService = {
    async getStandings() {
        const { data, error } = await supabase
            .from('standings_view')
            .select('*')
            .order('games_won', { ascending: false })
            .order('games_avg', { ascending: false });
        if (error)
            throw error;
        return data || [];
    },
    async getTeamStats(teamId) {
        const { data, error } = await supabase
            .from('standings_view')
            .select('*')
            .eq('id', teamId)
            .single();
        if (error && error.code !== 'PGRST116')
            throw error;
        return data || null;
    },
    subscribeToStandings(callback) {
        const subscription = supabase
            .from('standings_view')
            .on('*', (payload) => {
            standingsService.getStandings().then(callback);
        })
            .subscribe();
        return subscription;
    },
};
