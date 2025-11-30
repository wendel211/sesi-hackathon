import { LucideIcon } from "lucide-react";

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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
      
      {/* Ícone */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
        <Icon className={iconColor} size={26} />
      </div>

      {/* Número (AGORA COM COR DO ÍCONE) */}
      <p className={`text-4xl font-bold mt-4 ${valueColor}`}>
        {value}
      </p>

      {/* Texto */}
      <p className="text-gray-600 text-sm mt-1">{label}</p>
      {sublabel && <p className="text-gray-400 text-xs">{sublabel}</p>}

      {/* Tendência */}
      {trend && (
        <p className="absolute top-4 right-4 text-green-600 text-sm font-medium">
          {trend}
        </p>
      )}
    </div>
  );
}
