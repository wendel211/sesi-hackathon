import { TrendingUp, Trophy } from 'lucide-react';

interface ConformityScoreProps {
  score: number;
}

export default function ConformityScore({ score }: ConformityScoreProps) {
  const progressPercentage = (score / 100) * 100;

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Índice de Conformidade</h2>
          <p className="text-sm text-gray-600">Seu desempenho em SST</p>
        </div>
        <Trophy size={24} className="text-blue-600" />
      </div>

      <div className="flex items-center gap-8">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#f3f4f6"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#f59e0b"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{score}</span>
            <span className="text-xs text-gray-500">pontos</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Nível Atual</span>
              <span className="text-sm font-bold text-blue-600">Profissional</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-sm font-semibold text-green-700">Tendência mensal</span>
            </div>
            <p className="text-xs text-green-600">+12% este mês</p>
          </div>
        </div>
      </div>
    </div>
  );
}
