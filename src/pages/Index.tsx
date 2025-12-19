import React, { useState } from 'react';
import { RussiaMap } from '@/components/RussiaMap';
import { RegionManagement } from '@/components/RegionManagement';
import { StatsPanel } from '@/components/StatsPanel';
import { useRegionState } from '@/hooks/useRegionState';
import { Map } from 'lucide-react';

const Index: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const {
    regions,
    assignEmployee,
    updateRegion,
    resetRegion,
    getRegion,
    getStats,
  } = useRegionState();

  const stats = getStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Map className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Карта регионов РФ
              </h1>
              <p className="text-sm text-muted-foreground">
                Управление сотрудниками по регионам
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats */}
        <StatsPanel
          total={stats.total}
          assigned={stats.assigned}
          unassigned={stats.unassigned}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Map */}
          <div className="xl:col-span-2">
            <div className="bg-card border border-border rounded-xl p-4 card-glow animate-fade-in">
              <RussiaMap
                regions={regions}
                selectedRegionId={selectedRegionId}
                onSelectRegion={setSelectedRegionId}
              />
              <p className="text-xs text-muted-foreground text-center mt-4">
                Нажмите на регион для выбора. Наведите курсор для просмотра информации.
              </p>
            </div>
          </div>

          {/* Management Panel */}
          <div className="xl:col-span-1">
            <RegionManagement
              selectedRegionId={selectedRegionId}
              onSelectRegion={setSelectedRegionId}
              getRegion={getRegion}
              onAssign={assignEmployee}
              onUpdate={updateRegion}
              onReset={resetRegion}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
