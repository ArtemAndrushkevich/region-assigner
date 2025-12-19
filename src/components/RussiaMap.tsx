import React, { useState, useCallback, useRef } from 'react';
import { RegionStateMap, RegionState } from '@/hooks/useRegionState';
import { RegionTooltip } from './RegionTooltip';

interface RussiaMapProps {
  regions: RegionStateMap;
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
}

// SVG paths for Russian regions (simplified for demonstration)
// In production, you would use actual geographic data
const regionPaths: { [key: string]: { d: string; cx: number; cy: number } } = {
  // Central Federal District
  "RU-MOW": { d: "M180,180 L185,175 L195,178 L198,185 L192,192 L183,190 Z", cx: 188, cy: 183 },
  "RU-MOS": { d: "M165,165 L210,160 L220,175 L215,200 L190,210 L160,195 L155,180 Z", cx: 187, cy: 185 },
  "RU-TVE": { d: "M155,145 L195,140 L205,155 L195,165 L155,170 L145,160 Z", cx: 172, cy: 155 },
  "RU-YAR": { d: "M205,140 L240,135 L250,155 L240,170 L210,165 L200,150 Z", cx: 225, cy: 152 },
  "RU-KOS": { d: "M250,125 L285,120 L295,140 L285,155 L250,150 L245,135 Z", cx: 268, cy: 138 },
  "RU-IVA": { d: "M245,155 L270,150 L280,165 L270,180 L245,175 L240,165 Z", cx: 260, cy: 165 },
  "RU-VLA": { d: "M220,175 L255,170 L265,185 L255,200 L220,195 L215,185 Z", cx: 240, cy: 185 },
  "RU-SMO": { d: "M130,175 L160,170 L170,190 L160,210 L130,205 L120,190 Z", cx: 145, cy: 190 },
  "RU-KLU": { d: "M160,195 L185,190 L195,210 L185,225 L160,220 L155,208 Z", cx: 175, cy: 208 },
  "RU-TUL": { d: "M190,210 L215,205 L225,220 L215,235 L190,230 L185,220 Z", cx: 205, cy: 220 },
  "RU-RYA": { d: "M225,200 L260,195 L270,215 L260,235 L225,230 L220,215 Z", cx: 245, cy: 215 },
  "RU-ORL": { d: "M175,230 L200,225 L210,245 L200,260 L175,255 L170,243 Z", cx: 190, cy: 243 },
  "RU-BRY": { d: "M130,215 L160,210 L170,235 L160,255 L130,250 L120,233 Z", cx: 145, cy: 233 },
  "RU-KRS": { d: "M165,260 L195,255 L205,275 L195,295 L165,290 L160,275 Z", cx: 182, cy: 275 },
  "RU-BEL": { d: "M195,275 L225,270 L235,290 L225,310 L195,305 L190,290 Z", cx: 212, cy: 290 },
  "RU-VOR": { d: "M235,265 L275,260 L290,290 L275,320 L235,310 L225,288 Z", cx: 258, cy: 290 },
  "RU-LIP": { d: "M255,235 L285,230 L295,255 L285,275 L255,270 L250,253 Z", cx: 272, cy: 253 },
  "RU-TAM": { d: "M285,250 L320,245 L335,275 L320,300 L285,290 L280,270 Z", cx: 305, cy: 273 },
  
  // Northwestern Federal District
  "RU-SPE": { d: "M155,115 L170,112 L175,122 L168,130 L155,128 L152,120 Z", cx: 163, cy: 121 },
  "RU-LEN": { d: "M140,100 L180,95 L190,120 L175,140 L140,135 L130,118 Z", cx: 160, cy: 118 },
  "RU-PSK": { d: "M110,130 L145,125 L155,150 L145,175 L110,170 L100,150 Z", cx: 128, cy: 150 },
  "RU-NGR": { d: "M155,125 L190,120 L200,145 L190,165 L155,160 L150,143 Z", cx: 175, cy: 143 },
  "RU-VLG": { d: "M215,105 L280,95 L300,130 L280,160 L215,150 L200,128 Z", cx: 250, cy: 128 },
  "RU-KR": { d: "M160,60 L210,50 L230,85 L210,115 L160,110 L145,85 Z", cx: 188, cy: 83 },
  "RU-MUR": { d: "M175,10 L250,5 L275,45 L250,75 L175,70 L155,40 Z", cx: 215, cy: 40 },
  "RU-ARK": { d: "M260,35 L380,20 L420,80 L380,130 L280,125 L250,80 Z", cx: 340, cy: 78 },
  "RU-NEN": { d: "M400,5 L500,0 L540,50 L500,90 L400,80 L380,43 Z", cx: 460, cy: 45 },
  "RU-KO": { d: "M350,100 L450,85 L490,150 L450,210 L350,195 L320,148 Z", cx: 405, cy: 148 },
  "RU-KGD": { d: "M80,155 L105,152 L110,165 L102,175 L80,172 L75,163 Z", cx: 93, cy: 163 },
  
  // Southern Federal District
  "RU-KDA": { d: "M195,350 L250,340 L280,380 L260,420 L200,410 L180,380 Z", cx: 228, cy: 378 },
  "RU-AD": { d: "M230,405 L260,400 L270,420 L260,435 L230,430 L225,418 Z", cx: 248, cy: 418 },
  "RU-ROS": { d: "M260,310 L330,295 L360,340 L340,380 L260,365 L245,338 Z", cx: 302, cy: 338 },
  "RU-VGG": { d: "M330,280 L400,265 L430,320 L400,370 L330,350 L310,315 Z", cx: 368, cy: 318 },
  "RU-AST": { d: "M410,345 L470,330 L500,385 L470,435 L410,420 L395,383 Z", cx: 448, cy: 383 },
  "RU-KL": { d: "M380,360 L420,350 L440,390 L420,425 L380,415 L370,388 Z", cx: 405, cy: 388 },
  "RU-KRM": { d: "M175,385 L210,380 L225,410 L210,440 L175,435 L165,410 Z", cx: 195, cy: 410 },
  "RU-SEV": { d: "M190,420 L210,418 L215,432 L208,442 L190,440 L187,430 Z", cx: 202, cy: 430 },
  
  // North Caucasian Federal District
  "RU-STA": { d: "M285,385 L345,370 L375,415 L345,455 L285,440 L265,413 Z", cx: 320, cy: 413 },
  "RU-KC": { d: "M265,440 L295,435 L310,460 L295,480 L265,475 L258,458 Z", cx: 285, cy: 458 },
  "RU-KB": { d: "M295,455 L330,448 L345,478 L330,500 L295,492 L288,473 Z", cx: 318, cy: 475 },
  "RU-SE": { d: "M330,480 L360,475 L375,500 L360,520 L330,515 L325,498 Z", cx: 352, cy: 498 },
  "RU-IN": { d: "M360,495 L385,490 L395,515 L385,530 L360,525 L355,510 Z", cx: 375, cy: 510 },
  "RU-CE": { d: "M385,505 L420,498 L438,530 L420,555 L385,545 L378,525 Z", cx: 408, cy: 528 },
  "RU-DA": { d: "M420,490 L480,475 L510,530 L480,580 L420,560 L400,525 Z", cx: 455, cy: 528 },
  
  // Volga Federal District
  "RU-NIZ": { d: "M295,170 L350,160 L370,200 L350,235 L295,225 L280,198 Z", cx: 325, cy: 198 },
  "RU-ME": { d: "M315,155 L350,150 L362,175 L350,195 L315,190 L308,173 Z", cx: 335, cy: 173 },
  "RU-CU": { d: "M330,195 L365,188 L378,218 L365,243 L330,235 L322,215 Z", cx: 350, cy: 215 },
  "RU-MO": { d: "M295,225 L330,218 L345,250 L330,278 L295,270 L285,248 Z", cx: 315, cy: 248 },
  "RU-TA": { d: "M365,185 L430,172 L455,220 L430,265 L365,250 L348,218 Z", cx: 400, cy: 218 },
  "RU-UD": { d: "M410,145 L465,135 L490,180 L465,220 L410,205 L395,175 Z", cx: 443, cy: 178 },
  "RU-KIR": { d: "M350,110 L430,95 L460,145 L430,185 L350,170 L330,140 Z", cx: 395, cy: 140 },
  "RU-PNZ": { d: "M320,255 L370,245 L390,285 L370,320 L320,308 L305,282 Z", cx: 348, cy: 283 },
  "RU-SAR": { d: "M375,290 L440,275 L470,330 L440,380 L375,360 L355,325 Z", cx: 412, cy: 328 },
  "RU-SAM": { d: "M420,240 L485,225 L515,280 L485,330 L420,310 L400,275 Z", cx: 458, cy: 278 },
  "RU-ULY": { d: "M385,235 L430,228 L448,265 L430,298 L385,288 L372,262 Z", cx: 410, cy: 263 },
  "RU-ORE": { d: "M500,260 L590,240 L630,310 L590,375 L500,350 L475,305 Z", cx: 555, cy: 308 },
  "RU-BA": { d: "M475,195 L560,175 L600,240 L560,300 L475,275 L452,235 Z", cx: 525, cy: 238 },
  "RU-PER": { d: "M480,130 L560,110 L600,170 L560,225 L480,200 L458,165 Z", cx: 530, cy: 168 },
  
  // Ural Federal District
  "RU-SVE": { d: "M570,140 L660,115 L710,190 L660,260 L570,230 L545,185 Z", cx: 625, cy: 188 },
  "RU-CHE": { d: "M600,250 L680,230 L720,300 L680,365 L600,340 L575,295 Z", cx: 650, cy: 298 },
  "RU-KGN": { d: "M680,290 L750,270 L785,335 L750,395 L680,370 L660,330 Z", cx: 722, cy: 333 },
  "RU-TYU": { d: "M680,165 L790,140 L840,230 L790,310 L680,280 L648,223 Z", cx: 748, cy: 225 },
  "RU-KHM": { d: "M700,60 L870,30 L940,130 L870,220 L700,180 L660,120 Z", cx: 810, cy: 125 },
  "RU-YAN": { d: "M720,0 L920,-20 L1000,60 L920,150 L720,110 L680,55 Z", cx: 850, cy: 65 },
  
  // Siberian Federal District
  "RU-OMS": { d: "M790,260 L870,240 L910,310 L870,375 L790,350 L765,305 Z", cx: 840, cy: 308 },
  "RU-NVS": { d: "M860,320 L950,295 L995,375 L950,450 L860,420 L835,370 Z", cx: 915, cy: 373 },
  "RU-ALT": { d: "M910,410 L980,390 L1015,455 L980,515 L910,490 L890,450 Z", cx: 952, cy: 453 },
  "RU-AL": { d: "M970,455 L1020,440 L1045,490 L1020,535 L970,520 L958,488 Z", cx: 1002, cy: 488 },
  "RU-TOM": { d: "M900,230 L1000,205 L1050,290 L1000,365 L900,335 L872,283 Z", cx: 962, cy: 285 },
  "RU-KEM": { d: "M1000,340 L1075,318 L1112,395 L1075,465 L1000,438 L978,388 Z", cx: 1048, cy: 392 },
  "RU-KK": { d: "M1070,410 L1130,395 L1160,455 L1130,510 L1070,492 L1055,452 Z", cx: 1110, cy: 453 },
  "RU-TY": { d: "M1100,480 L1180,458 L1220,535 L1180,605 L1100,580 L1078,530 Z", cx: 1150, cy: 532 },
  "RU-KYA": { d: "M1000,80 L1200,40 L1280,170 L1200,300 L1000,250 L950,165 Z", cx: 1120, cy: 170 },
  "RU-IRK": { d: "M1180,260 L1320,225 L1380,340 L1320,445 L1180,400 L1145,330 Z", cx: 1262, cy: 335 },
  "RU-BU": { d: "M1310,395 L1400,370 L1450,460 L1400,545 L1310,515 L1285,455 Z", cx: 1368, cy: 458 },
  "RU-ZAB": { d: "M1400,420 L1520,385 L1580,500 L1520,610 L1400,570 L1365,495 Z", cx: 1478, cy: 498 },
  
  // Far Eastern Federal District
  "RU-SA": { d: "M1200,0 L1550,-40 L1680,150 L1550,350 L1200,280 L1120,140 Z", cx: 1400, cy: 155 },
  "RU-AMU": { d: "M1510,480 L1640,445 L1700,560 L1640,670 L1510,630 L1475,555 Z", cx: 1595, cy: 558 },
  "RU-YEV": { d: "M1640,580 L1710,560 L1745,625 L1710,685 L1640,665 L1622,623 Z", cx: 1683, cy: 623 },
  "RU-KHA": { d: "M1620,350 L1750,310 L1810,430 L1750,545 L1620,500 L1585,425 Z", cx: 1708, cy: 428 },
  "RU-PRI": { d: "M1710,600 L1800,575 L1845,665 L1800,750 L1710,720 L1685,660 Z", cx: 1765, cy: 663 },
  "RU-SAK": { d: "M1820,450 L1880,430 L1910,510 L1880,590 L1820,570 L1800,510 Z", cx: 1858, cy: 510 },
  "RU-MAG": { d: "M1680,200 L1820,160 L1880,280 L1820,400 L1680,350 L1640,275 Z", cx: 1762, cy: 280 },
  "RU-KAM": { d: "M1850,280 L1950,245 L2010,380 L1950,515 L1850,470 L1815,375 Z", cx: 1920, cy: 380 },
  "RU-CHU": { d: "M1750,50 L1920,0 L2000,130 L1920,260 L1750,205 L1705,128 Z", cx: 1858, cy: 130 },
};

export const RussiaMap: React.FC<RussiaMapProps> = ({
  regions,
  selectedRegionId,
  onSelectRegion,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionState | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<SVGSVGElement>(null);

  const handleMouseEnter = useCallback(
    (regionId: string, event: React.MouseEvent) => {
      const region = regions[regionId];
      if (region) {
        setHoveredRegion(region);
        setTooltipPosition({ x: event.clientX, y: event.clientY });
      }
    },
    [regions]
  );

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredRegion(null);
  }, []);

  const handleClick = useCallback(
    (regionId: string) => {
      onSelectRegion(regionId);
    },
    [onSelectRegion]
  );

  const getRegionColor = (regionId: string): string => {
    const region = regions[regionId];
    if (region?.color) {
      return region.color;
    }
    return '';
  };

  return (
    <div className="relative w-full">
      <svg
        ref={mapRef}
        viewBox="0 0 2100 800"
        className="w-full h-auto"
        style={{ minHeight: '400px' }}
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width="2100"
          height="800"
          fill="transparent"
        />

        {/* Regions */}
        <g>
          {Object.entries(regionPaths).map(([id, path]) => {
            const regionColor = getRegionColor(id);
            const isSelected = selectedRegionId === id;
            const isHovered = hoveredRegion?.id === id;

            return (
              <path
                key={id}
                d={path.d}
                className="region-path"
                style={{
                  fill: regionColor || undefined,
                  strokeWidth: isSelected ? 2 : isHovered ? 1.5 : 0.5,
                  stroke: isSelected
                    ? 'hsl(217, 91%, 60%)'
                    : 'hsl(217, 33%, 40%)',
                }}
                onMouseEnter={e => handleMouseEnter(id, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(id)}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
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
