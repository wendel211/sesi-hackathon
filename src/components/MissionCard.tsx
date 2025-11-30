import { ChevronRight, Clock, Award, Circle } from "lucide-react";

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
  status,
}: MissionCardProps) {
  const priorityStyle: any = {
    Alta: {
      iconColor: "text-purple-600",
      bg: "bg-purple-100",
      tag: "text-purple-600 bg-purple-100 border border-purple-200",
    },
    Média: {
      iconColor: "text-yellow-600",
      bg: "bg-yellow-100",
      tag: "text-yellow-600 bg-yellow-100 border border-yellow-200",
    },
    Baixa: {
      iconColor: "text-green-600",
      bg: "bg-green-100",
      tag: "text-green-600 bg-green-100 border border-green-200",
    },
  };

  const p = priorityStyle[priority] ?? priorityStyle["Média"];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
      
      {/* Ícone colorido + título */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.bg}`}>
          <Circle className={`${p.iconColor}`} size={22} />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">
            {title}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>

        <ChevronRight size={20} className="text-gray-400" />
      </div>

      {/* Tags */}
      <div className="flex items-center gap-3 mb-4 ml-1">
        {/* Prioridade */}
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${p.tag}`}>
          {priority}
        </span>

        {/* Pontos */}
        <span className="text-xs text-gray-700 flex items-center gap-1">
          <Award size={14} className={p.iconColor} />
          {points} pontos
        </span>

        {/* Prazo */}
        <span className="text-xs text-gray-700 flex items-center gap-1">
          <Clock size={14} className={p.iconColor} />
          {deadline}
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="ml-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-700">
            {status === "completed" ? "Missão Concluída!" : "Progresso"}
          </span>
          <span className={`text-xs font-bold ${p.iconColor}`}>
            {progress}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              status === "completed" ? "bg-green-500" : p.iconColor.replace("text-", "bg-")
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Missão concluída */}
      {status === "completed" && (
        <div className="mt-3 ml-1">
          <span className="text-sm font-semibold text-green-600">
            ✓ Missão Concluída!
          </span>
        </div>
      )}
    </div>
  );
}
