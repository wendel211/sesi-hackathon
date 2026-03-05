import {
  LayoutDashboard,
  CheckCircle,
  FileText,
  Users,
  Calendar,
  Settings,
  Trophy,
  LogOut,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <aside className="w-56 h-screen bg-white/60 backdrop-blur-xl border-r border-gray-200 flex flex-col px-4 py-6 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-40">
      {/* Header */}
      <div className="mb-8 px-2">
        <div className="w-10 h-10 bg-gradient-to-br from-sesi-orange to-amber-500 rounded-xl text-white flex items-center justify-center text-lg font-bold shadow-lg shadow-orange-500/30 mb-3 transform transition hover:scale-105 hover:rotate-3 cursor-pointer">
          S
        </div>

        <h2 className="text-sm font-extrabold mt-2 text-gray-900 tracking-tight leading-tight">
          EMPRESA CLIENTE
        </h2>

        <p className="text-xs font-medium text-gray-500 mt-1 uppercase tracking-wider">Onboarding</p>
      </div>

      <nav className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
        <div className="flex flex-col gap-6">

          {/* Principal */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 mb-2 px-2 uppercase tracking-widest">Principal</p>

            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-sesi-blue/10 to-transparent text-sesi-blue rounded-xl font-bold transition-all border-l-4 border-sesi-blue">
                <LayoutDashboard size={18} />
                <span className="text-sm">Dashboard</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-sesi-orange font-medium transition-all group">
                <CheckCircle size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">Missões</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-sesi-orange font-medium transition-all group">
                <FileText size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">Conformidade</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-sesi-orange font-medium transition-all group">
                <Calendar size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">Calendário</span>
              </button>
            </div>
          </div>

          {/* Recursos */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 mb-2 px-2 uppercase tracking-widest">Recursos</p>

            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-sesi-orange font-medium transition-all group">
                <FileText size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">Documentos</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-sesi-orange font-medium transition-all group">
                <Users size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">Colaboradores</span>
              </button>
            </div>
          </div>

          {/* Controle */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 mb-2 px-2 uppercase tracking-widest">Controle</p>

            <div className="flex flex-col gap-1">
              <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-sesi-orange font-medium transition-all group">
                <Trophy size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">Conquistas</span>
              </button>

              <button className="flex items-center gap-3 px-3 py-2.5 text-gray-600 rounded-xl hover:bg-gray-50 hover:text-sesi-orange font-medium transition-all group">
                <Settings size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm">Configurações</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-8 pt-4 border-t border-gray-100 px-2">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all duration-300 group"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Sair</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
