import { Menu, Bell, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  full_name: string;
  company: string;
  role: string;
}

export default function Header() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    const { data } = await supabase
      .from('user_profiles')
      .select('full_name, company, role')
      .eq('id', user!.id)
      .maybeSingle();

    if (data) {
      setProfile(data);
    }
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50 animate-fade-in transition-all duration-300">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-xl transition duration-300 hover:scale-105 active:scale-95">
          <Menu size={20} className="text-gray-700" />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-sesi-blue to-sesi-orange">SESI Onboarding</h1>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">Plataforma de Gestão Inteligente</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-100 rounded-xl transition duration-300 hover:scale-105 active:scale-95">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sesi-orange rounded-full animate-pulse-slow ring-2 ring-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">{profile?.company || 'Indústria XYZ'}</p>
            <p className="text-xs text-gray-500 font-medium">Gestor: {profile?.full_name || 'João Silva'}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-sesi-blue to-blue-600 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center transform transition duration-300 hover:scale-105 hover:rotate-3 cursor-pointer">
            <User size={18} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
