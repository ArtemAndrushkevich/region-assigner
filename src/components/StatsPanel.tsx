import React from 'react';
import { MapPin, Users, CheckCircle } from 'lucide-react';

interface StatsPanelProps {
  total: number;
  assigned: number;
  unassigned: number;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  total,
  assigned,
  unassigned,
}) => {
  const stats = [
    {
      label: 'Всего регионов',
      value: total,
      icon: MapPin,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Назначено',
      value: assigned,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Свободно',
      value: unassigned,
      icon: Users,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-card border border-border rounded-xl p-4 animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
