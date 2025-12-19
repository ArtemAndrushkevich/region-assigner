import React, { useState, useCallback, useEffect } from 'react';
import { VectorMap } from '@react-jvectormap/core';
import { ruMill } from '@react-jvectormap/russia';
import { RegionStateMap, RegionState } from '@/hooks/useRegionState';
import { RegionTooltip } from './RegionTooltip';

interface RussiaMapProps {
  regions: RegionStateMap;
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
}

export const RussiaMap: React.FC<RussiaMapProps> = ({
  regions,
  selectedRegionId,
  onSelectRegion,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionState | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Generate region colors based on state
  const getRegionColors = useCallback(() => {
    const colors: { [key: string]: string } = {};
    Object.entries(regions).forEach(([id, region]) => {
      if (region.color) {
        colors[id] = region.color;
      }
    });
    return colors;
  }, [regions]);

  // Handle mouse move for tooltip positioning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRegionOver = useCallback(
    (_e: unknown, code: string) => {
      const region = regions[code];
      if (region) {
        setHoveredRegion(region);
      }
    },
    [regions]
  );

  const handleRegionOut = useCallback(() => {
    setHoveredRegion(null);
  }, []);

  const handleRegionClick = useCallback(
    (_e: unknown, code: string) => {
      onSelectRegion(code);
    },
    [onSelectRegion]
  );

  // Custom region tip - prevent default
  const handleRegionTipShow = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
    },
    []
  );

  const regionColors = getRegionColors();

  // Region style
  const regionStyle = {
    initial: {
      fill: 'hsl(217, 33%, 25%)',
      stroke: 'hsl(217, 33%, 40%)',
      strokeWidth: 0.5,
    },
    hover: {
      fill: 'hsl(217, 33%, 35%)',
      cursor: 'pointer',
    },
    selected: {
      fill: 'hsl(217, 91%, 50%)',
    },
  };

  return (
    <div className="relative w-full" style={{ minHeight: '450px' }}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <VectorMap
        map={ruMill as any}
        backgroundColor="transparent"
        zoomOnScroll={false}
        panOnDrag={true}
        zoomMax={8}
        zoomMin={1}
        regionStyle={regionStyle}
        selectedRegions={selectedRegionId ? [selectedRegionId] : []}
        regionsSelectable={true}
        regionsSelectableOne={true}
        onRegionOver={handleRegionOver}
        onRegionOut={handleRegionOut}
        onRegionClick={handleRegionClick}
        onRegionTipShow={handleRegionTipShow}
        series={{
          regions: [
            {
              values: regionColors as any,
              attribute: 'fill',
            },
          ],
        }}
        style={{
          width: '100%',
          height: '450px',
        }}
      />

      {/* Custom Tooltip */}
      {hoveredRegion && (
        <RegionTooltip
          region={hoveredRegion}
          position={tooltipPosition}
          visible={!!hoveredRegion}
        />
      )}
    </div>
  );
};
