import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        setUser(session?.user ?? null);
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
            company: 'Indústria XYZ',
            role: 'Gestor'
          }
        ]);

      if (profileError) throw profileError;

      const { data: missions } = await supabase.from('missions').select('id');

      if (missions) {
        const userMissions = missions.map(mission => ({
          user_id: data.user.id,
          mission_id: mission.id,
          status: 'pending',
          progress: 0
        }));

        await supabase.from('user_missions').insert(userMissions);
      }

      const journeySteps = [
        {
          user_id: data.user.id,
          title: 'Formulário M1 Enviado',
          description: 'Dados iniciais coletados com sucesso',
          status: 'completed',
          date: new Date().toISOString(),
          link_text: 'Você',
          order: 1
        },
        {
          user_id: data.user.id,
          title: 'Análise Preliminar em Andamento',
          description: 'Equipe SESI está analisando as informações',
          status: 'in_progress',
          date: null,
          link_text: 'SESI',
          order: 2
        },
        {
          user_id: data.user.id,
          title: 'Agendamento de Visita Técnica',
          description: 'Aguardando disponibilidade para visita',
          date: new Date('2025-12-26').toISOString(),
          status: 'pending',
          link_text: 'Você',
          order: 3
        },
        {
          user_id: data.user.id,
          title: 'Elaboração do PGR',
          description: 'Desenvolvimento do Programa de Gerenciamento de Riscos',
          date: new Date('2025-12-10').toISOString(),
          status: 'pending',
          link_text: 'SESI',
          order: 4
        }
      ];

      await supabase.from('journey_steps').insert(journeySteps);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
