import { ChevronRight, Clock, Award } from 'lucide-react';

interface MissionCardProps {
  title: string;
  description: string;
  priority: string;
  points: number;
  deadline: string;
  progress: number;
  status: string;
}

export default function MissionCard({
  title,
  description,
  priority,
  points,
  deadline,
  progress,
  status
}: MissionCardProps) {
  const priorityColors: Record<string, string> = {
    Alta: 'bg-red-100 text-red-700',
    Média: 'bg-orange-100 text-orange-700',
    Baixa: 'bg-blue-100 text-blue-700'
  };

  const statusText: Record<string, string> = {
    completed: 'Missão Concluída!',
    in_progress: 'Em Progresso',
    pending: 'Progresso'
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition group cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              status === 'completed' ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {status === 'completed' ? (
                <span className="text-green-600 text-xl">✓</span>
              ) : (
                <Clock size={20} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition">
                {title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 ml-13">{description}</p>
        </div>
        <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition" />
      </div>

      <div className="flex items-center gap-3 mb-3 ml-13">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
        <span className="text-xs text-gray-600 flex items-center gap-1">
          <Award size={14} />
          {points} pontos
        </span>
        <span className="text-xs text-gray-600 flex items-center gap-1">
          <Clock size={14} />
          {deadline}
        </span>
      </div>

      <div className="ml-13">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-700">{statusText[status]}</span>
          <span className="text-xs font-semibold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              status === 'completed' ? 'bg-green-500' : 'bg-blue-600'
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {status === 'completed' && (
        <div className="mt-4 ml-13">
          <span className="text-sm text-green-600 font-medium">Missão Concluída!</span>
        </div>
      )}
    </div>
  );
}
