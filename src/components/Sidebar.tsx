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
    <aside className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col px-5 py-6">

      {/* HEADER COMPACTO */}
      <div className="mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded-md text-white flex items-center justify-center text-sm font-semibold">
          S
        </div>
        <h2 className="text-sm font-semibold mt-2 leading-none">EMPRESA CLIENTE</h2>
        <p className="text-xs text-gray-400 mt-0.5">Onboarding</p>
      </div>

      <nav className="flex-1 flex flex-col justify-between py-1">

        {/* BLOCOS COMPACTADOS */}
        <div className="flex flex-col gap-4">

          {/* PRINCIPAL */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-1">Principal</p>

            <div className="flex flex-col gap-0.5">
              <button className="sidebar-item-active">
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </button>

              <button className="sidebar-item">
                <CheckCircle size={16} />
                <span>Missões</span>
              </button>

              <button className="sidebar-item">
                <FileText size={16} />
                <span>Conformidade</span>
              </button>

              <button className="sidebar-item">
                <Calendar size={16} />
                <span>Calendário</span>
              </button>
            </div>
          </div>

          {/* RECURSOS */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-1">Recursos</p>

            <div className="flex flex-col gap-0.5">
              <button className="sidebar-item">
                <FileText size={16} />
                <span>Documentos</span>
              </button>

              <button className="sidebar-item">
                <Users size={16} />
                <span>Colaboradores</span>
              </button>
            </div>
          </div>

          {/* CONTROLE */}
          <div>
            <p className="text-xs font-semibold text-gray-400 mb-1">Controle</p>

            <div className="flex flex-col gap-0.5">
              <button className="sidebar-item">
                <Trophy size={16} />
                <span>Conquistas</span>
              </button>

              <button className="sidebar-item">
                <Settings size={16} />
                <span>Configurações</span>
              </button>
            </div>
          </div>
        </div>

        {/* LOGOUT COMPACTO */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-gray-400 hover:text-red-600 transition mt-2 text-sm"
        >
          <LogOut size={16} />
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
}
