import { TrendingUp, Trophy } from 'lucide-react';

interface ConformityScoreProps {
  score: number;
}

export default function ConformityScore({ score }: ConformityScoreProps) {
  const progressPercentage = (score / 100) * 100;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden group">

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 -m-32 w-64 h-64 bg-sesi-orange/20 rounded-full blur-3xl group-hover:bg-sesi-orange/30 transition-colors duration-700"></div>

      <div className="flex items-start justify-between mb-8 relative z-10">
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-1 tracking-tight">Índice de Conformidade</h2>
          <p className="text-gray-400 font-medium">Seu desempenho geral em SST</p>
        </div>
        <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-700 shadow-inner">
          <Trophy size={24} className="text-sesi-orange" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
        <div className="relative transform hover:scale-105 transition-transform duration-500">
          <svg className="w-40 h-40 transform -rotate-90 filter drop-shadow-[0_0_8px_rgba(244,148,28,0.5)]">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#374151" /* gray-700 */
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#f4941c" /* sesi-orange */
              strokeWidth="10"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - progressPercentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-[1.5s] ease-out shadow-lg"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/40 rounded-full backdrop-blur-[2px] m-4">
            <span className="text-4xl font-black text-white">{score}</span>
            <span className="text-xs font-bold text-sesi-orange uppercase tracking-widest mt-1">pontos</span>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="mb-6 bg-gray-800 rounded-xl p-5 border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-300">Nível Atual</span>
              <span className="text-sm font-extrabold text-white bg-sesi-blue/20 px-3 py-1 rounded-full border border-sesi-blue/30">Profissional</span>
            </div>
            <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-sesi-blue to-[#00a8e8] rounded-full transition-all duration-1000 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 -translate-x-full animate-[slideUp_2s_infinite]" style={{ transform: 'skewX(-20deg)' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between hover:bg-emerald-500/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <TrendingUp size={16} className="text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-gray-200">Tendência de crescimento</span>
            </div>
            <p className="text-sm font-black text-emerald-400">+12% este mês</p>
          </div>
        </div>
      </div>
    </div>
  );
}
