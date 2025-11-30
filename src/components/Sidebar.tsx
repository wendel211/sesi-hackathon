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
    <aside className="w-44 h-screen bg-white border-r border-gray-200 flex flex-col px-4 py-5">
      {/* Header */}
      <div className="mb-4">
        <div className="w-7 h-7 bg-blue-500 rounded-md text-white flex items-center justify-center text-xs font-semibold">
          S
        </div>

        <h2 className="text-[13px] font-semibold mt-2 leading-tight">
          EMPRESA CLIENTE
        </h2>

        <p className="text-[11px] text-gray-400 mt-0.5">Onboarding</p>
      </div>

      <nav className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col gap-4">

          {/* Principal */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 mb-1">Principal</p>

            <div className="flex flex-col gap-0.5">
              <button className="sidebar-item-active">
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
              </button>

              <button className="sidebar-item">
                <CheckCircle size={15} />
                <span>Missões</span>
              </button>

              <button className="sidebar-item">
                <FileText size={15} />
                <span>Conformidade</span>
              </button>

              <button className="sidebar-item">
                <Calendar size={15} />
                <span>Calendário</span>
              </button>
            </div>
          </div>

          {/* Recursos */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 mb-1">Recursos</p>

            <div className="flex flex-col gap-0.5">
              <button className="sidebar-item">
                <FileText size={15} />
                <span>Documentos</span>
              </button>

              <button className="sidebar-item">
                <Users size={15} />
                <span>Colaboradores</span>
              </button>
            </div>
          </div>

          {/* Controle */}
          <div>
            <p className="text-[11px] font-semibold text-gray-400 mb-1">Controle</p>

            <div className="flex flex-col gap-0.5">
              <button className="sidebar-item">
                <Trophy size={15} />
                <span>Conquistas</span>
              </button>

              <button className="sidebar-item">
                <Settings size={15} />
                <span>Configurações</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 text-gray-400 hover:text-red-600 transition text-xs"
        >
          <LogOut size={15} />
          <span>Sair</span>
        </button>
      </nav>
    </aside>
  );
}
