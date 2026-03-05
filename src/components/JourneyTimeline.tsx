import { Clock } from 'lucide-react';

interface JourneyStep {
  title: string;
  description: string;
  status: string;
  date: string | null;
  linkText: string;
}

interface JourneyTimelineProps {
  steps: JourneyStep[];
}

export default function JourneyTimeline({ steps }: JourneyTimelineProps) {
  const formatDate = (date: string | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500 shadow-emerald-500/40 shadow-lg';
      case 'in_progress':
        return 'bg-sesi-blue shadow-blue-500/40 shadow-lg animate-pulse';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Jornada Transparente</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Acompanhe cada etapa em tempo real</p>
        </div>
      </div>

      <div className="relative pl-6">
        <div className="absolute top-4 bottom-8 left-[34px] w-0.5 bg-gradient-to-b from-emerald-400 via-sesi-blue to-gray-200"></div>
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-6 mb-8 last:mb-0 group">
            <div className={`absolute -left-[5px] top-1 w-5 h-5 rounded-full border-4 border-white z-10 ${getStatusColor(step.status).split(' ')[0]} ${step.status === 'in_progress' ? 'animate-pulse' : ''} transition-transform group-hover:scale-125 duration-300`}></div>

            <div className="flex-1 bg-gray-50/50 p-4 rounded-xl border border-gray-100/50 group-hover:bg-white group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className={`font-bold text-base ${step.status === 'completed' ? 'text-gray-900' : step.status === 'in_progress' ? 'text-sesi-blue' : 'text-gray-500'}`}>{step.title}</h3>
                {step.linkText && (
                  <span className="text-[10px] uppercase tracking-wider bg-white text-sesi-blue px-2.5 py-1 rounded-full font-bold border border-blue-100 shadow-sm flex items-center gap-1.5 shrink-0">
                    <span className="w-1.5 h-1.5 bg-sesi-orange rounded-full"></span>
                    {step.linkText}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-3 leading-relaxed">{step.description}</p>

              <div className="flex flex-wrap items-center gap-3">
                {step.date && (
                  <p className="text-xs font-medium text-gray-400 flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-gray-100">
                    <Clock size={12} />
                    {step.status === 'completed' ? 'Concluído em: ' : 'Previsão: '}
                    {formatDate(step.date)}
                  </p>
                )}
                {step.status === 'in_progress' && (
                  <p className="text-xs text-sesi-blue font-bold px-2 py-1 rounded-md bg-blue-50">Em andamento</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
