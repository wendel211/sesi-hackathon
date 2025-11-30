import { CheckCircle2, Clock, Circle } from 'lucide-react';

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 size={24} className="text-white" />;
      case 'in_progress':
        return <Clock size={24} className="text-white" />;
      default:
        return <Circle size={24} className="text-white" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Jornada Transparente</h2>
          <p className="text-sm text-gray-600 mt-1">Acompanhe cada etapa do processo</p>
        </div>
      </div>

      <div className="relative">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-6 mb-8 last:mb-0">
            <div className="relative flex flex-col items-center">
              <div className={`${getStatusColor(step.status)} rounded-full w-12 h-12 flex items-center justify-center z-10`}>
                {getStatusIcon(step.status)}
              </div>
              {index < steps.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 absolute top-12"></div>
              )}
            </div>

            <div className="flex-1 pb-8">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-base">{step.title}</h3>
                {step.linkText && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    {step.linkText}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{step.description}</p>
              {step.date && (
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  {step.status === 'completed' ? '' : 'Previsão: '}
                  {formatDate(step.date)}
                </p>
              )}
              {step.status === 'in_progress' && (
                <p className="text-xs text-blue-600 font-medium mt-1">Em andamento</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
