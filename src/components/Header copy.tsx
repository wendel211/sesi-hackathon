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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <Menu size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">SESI Onboarding</h1>
          <p className="text-xs text-gray-500">Plataforma de Gestão Inteligente</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">{profile?.company || 'Indústria XYZ'}</p>
            <p className="text-xs text-gray-500">Gestor: {profile?.full_name || 'João Silva'}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={20} className="text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
