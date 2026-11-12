import { supabase } from './supabase';
import { TeamStats } from '@/types';

export const standingsService = {
  async getStandings(): Promise<TeamStats[]> {
    const { data, error } = await supabase
      .from('standings_view')
      .select('*')
      .order('games_won', { ascending: false })
      .order('games_avg', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getTeamStats(teamId: string): Promise<TeamStats | null> {
    const { data, error } = await supabase
      .from('standings_view')
      .select('*')
      .eq('id', teamId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  subscribeToStandings(callback: (data: TeamStats[]) => void) {
    const channel = supabase
      .channel('standings_updates')
      .on<any>(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'games',
        },
        () => {
          standingsService.getStandings().then(callback);
        }
      )
      .subscribe((status: any) => {
        if (status === 'SUBSCRIBED') {
          standingsService.getStandings().then(callback);
        }
      });

    return {
      unsubscribe: () => {
        supabase.removeChannel(channel);
      }
    };
  },
};
