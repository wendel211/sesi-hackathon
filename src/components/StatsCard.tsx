import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  sublabel?: string;
  trend?: string;
  iconColor: string;
  iconBg: string;
}

export default function StatsCard({
  icon: Icon,
  value,
  label,
  sublabel,
  trend,
  iconColor,
  iconBg
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} p-3 rounded-lg`}>
          <Icon size={24} className={iconColor} />
        </div>
        {trend && (
          <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
            {trend}
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      {sublabel && <div className="text-xs text-gray-500 mt-1">{sublabel}</div>}
    </div>
  );
}
