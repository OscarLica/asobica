import { supabase } from './supabase';
export const authService = {
    async signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error)
            throw error;
        return data;
    },
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            throw error;
        return data;
    },
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error)
            throw error;
    },
    async getCurrentUser() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error)
            throw error;
        return session?.user || null;
    },
    async getCurrentSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error)
            throw error;
        return session;
    },
    async getUserProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error && error.code !== 'PGRST116')
            throw error;
        return data || null;
    },
    async updatePassword(newPassword) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error)
            throw error;
        return data;
    },
    onAuthStateChange(callback) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null);
        });
        return subscription;
    },
};
