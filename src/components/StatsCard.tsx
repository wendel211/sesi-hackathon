import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  sublabel?: string;
  trend?: string;
  iconColor?: string;
  iconBg?: string;
  valueColor?: string;
}

export default function StatsCard({
  icon: Icon,
  value,
  label,
  sublabel,
  trend,
  iconColor = "text-blue-600",
  iconBg = "bg-blue-100",
  valueColor = "text-blue-600", // NOVO
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-sesi-orange/30 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 group">

      {/* Decoração sutil de fundo */}
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150 ${iconBg.replace('bg-', 'bg-')}`}></div>

      {/* Ícone */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative z-10 ${iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
        <Icon className={iconColor} size={24} strokeWidth={2.5} />
      </div>

      {/* Número */}
      <p className={`text-4xl font-extrabold mt-5 tracking-tight relative z-10 ${valueColor}`}>
        {value}
      </p>

      {/* Texto */}
      <p className="text-gray-600 font-medium text-sm mt-2 relative z-10">{label}</p>
      {sublabel && <p className="text-gray-400 text-xs mt-0.5 relative z-10">{sublabel}</p>}

      {/* Tendência */}
      {trend && (
        <div className="absolute top-6 right-6 px-2.5 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold border border-green-100 flex items-center gap-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
          {trend}
        </div>
      )}
    </div>
  );
}
