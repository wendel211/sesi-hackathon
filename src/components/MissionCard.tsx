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
  const priorityStyle: Record<string, { iconColor: string, bg: string, tag: string }> = {
    Alta: {
      iconColor: "text-purple-600",
      bg: "bg-purple-100",
      tag: "text-purple-700 bg-purple-50 border-purple-200",
    },
    Média: {
      iconColor: "text-amber-500",
      bg: "bg-amber-100",
      tag: "text-amber-700 bg-amber-50 border-amber-200",
    },
    Baixa: {
      iconColor: "text-emerald-600",
      bg: "bg-emerald-100",
      tag: "text-emerald-700 bg-emerald-50 border-emerald-200",
    },
  };

  const p = priorityStyle[priority] ?? priorityStyle["Média"];

  const isCompleted = status === "completed";

  return (
    <div className={`group relative bg-white rounded-2xl p-6 border ${isCompleted ? 'border-emerald-200 bg-emerald-50/10' : 'border-gray-100'} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full overflow-hidden`}>

      {/* Decoração lateral para missões ativas/concluídas */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCompleted ? 'bg-emerald-500' : 'bg-transparent group-hover:bg-sesi-orange'} transition-colors duration-300`} />

      <div className="flex items-start gap-4 mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${p.bg}`}>
          {isCompleted ? <Award className="text-emerald-600" size={24} /> : <Circle className={p.iconColor} size={24} strokeWidth={2.5} />}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-lg truncate ${isCompleted ? 'text-gray-900 line-through decoration-emerald-500 decoration-2' : 'text-gray-900 group-hover:text-sesi-blue transition-colors'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">{description}</p>
        </div>

        <div className="shrink-0 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-sesi-blue group-hover:text-white transition-colors duration-300 cursor-pointer">
          <ChevronRight size={18} className={isCompleted ? 'text-emerald-500' : 'text-gray-400 group-hover:text-white'} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border ${p.tag} shadow-sm`}>
          {priority}
        </span>

        <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          <Award size={14} className={p.iconColor} />
          {points} pts
        </span>

        {!isCompleted && (
          <span className="text-xs font-semibold text-gray-600 flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            <Clock size={14} className={p.iconColor} />
            Restam {deadline}
          </span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold uppercase tracking-wider ${isCompleted ? 'text-emerald-600' : 'text-gray-500'}`}>
            {isCompleted ? "Missão Concluída" : "Progresso"}
          </span>
          <span className={`text-xs font-extrabold ${isCompleted ? 'text-emerald-600' : 'text-gray-900'}`}>
            {progress}%
          </span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${isCompleted ? "bg-emerald-500" : p.iconColor.replace("text-", "bg-")
              }`}
            style={{ width: `${progress}%` }}
          >
            {/* Efeito de brilho na barra */}
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-white/20 -translate-x-full animate-[slideUp_2s_ease-out_infinite]" style={{ transform: 'skewX(-20deg)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
