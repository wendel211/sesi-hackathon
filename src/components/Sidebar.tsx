import { LayoutDashboard, FileText, Calendar, Settings, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6">
      <button className="mb-8 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        <LayoutDashboard size={24} />
      </button>

      <nav className="flex-1 flex flex-col gap-4">
        <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
          <FileText size={24} />
        </button>
        <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
          <Calendar size={24} />
        </button>
        <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
          <Bell size={24} />
        </button>
        <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
          <Settings size={24} />
        </button>
      </nav>

      <button
        onClick={handleSignOut}
        className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
      >
        <LogOut size={24} />
      </button>
    </div>
  );
}
