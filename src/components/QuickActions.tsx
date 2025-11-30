import { FileText, Plus, Headphones } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h2>

      <div className="grid grid-cols-3 gap-4">
        <button className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group">
          <FileText size={28} className="text-gray-400 group-hover:text-blue-600 mb-3" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
            Documentos
          </span>
          <span className="text-xs text-gray-500 mt-1">Acesse seus arquivos</span>
        </button>

        <button className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group">
          <Plus size={28} className="text-gray-400 group-hover:text-blue-600 mb-3" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
            Nova Missão
          </span>
          <span className="text-xs text-gray-500 mt-1">Iniciar nova tarefa</span>
        </button>

        <button className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group">
          <Headphones size={28} className="text-gray-400 group-hover:text-blue-600 mb-3" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
            Suporte SESI
          </span>
          <span className="text-xs text-gray-500 mt-1">Fale conosco</span>
        </button>
      </div>
    </div>
  );
}
