import React from 'react';
import { RegionState } from '@/hooks/useRegionState';
import { MapPin, Clock, User } from 'lucide-react';

interface RegionTooltipProps {
  region: RegionState;
  position: { x: number; y: number };
  visible: boolean;
}

export const RegionTooltip: React.FC<RegionTooltipProps> = ({
  region,
  position,
  visible,
}) => {
  if (!visible || !region) return null;

  return (
    <div
      className="tooltip-enter fixed z-50 pointer-events-none"
      style={{
        left: position.x + 15,
        top: position.y + 15,
        maxWidth: '280px',
      }}
    >
      <div className="bg-popover border border-border rounded-lg shadow-xl p-4">
        {/* Region Name */}
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">
            {region.name}
          </h3>
        </div>

        {/* Timezone */}
        <div className="flex items-center gap-2 mb-2 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs">{region.timezone}</span>
        </div>

        {/* Assigned Employee */}
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          {region.employee ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground">{region.employee}</span>
              {region.color && (
                <div
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: region.color }}
                />
              )}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground italic">
              Не назначен
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
