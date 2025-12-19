import React, { useState, useEffect } from 'react';
import { getRegionNames } from '@/data/russiaRegions';
import { RegionState } from '@/hooks/useRegionState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserPlus, Edit, RotateCcw, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface RegionManagementProps {
  selectedRegionId: string | null;
  onSelectRegion: (id: string) => void;
  getRegion: (id: string) => RegionState | undefined;
  onAssign: (regionId: string, employee: string, color: string) => void;
  onUpdate: (regionId: string, data: Partial<RegionState>) => void;
  onReset: (regionId: string) => void;
}

export const RegionManagement: React.FC<RegionManagementProps> = ({
  selectedRegionId,
  onSelectRegion,
  getRegion,
  onAssign,
  onUpdate,
  onReset,
}) => {
  const [employeeName, setEmployeeName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3B82F6');
  const regionNames = getRegionNames();

  // Update form when region is selected
  useEffect(() => {
    if (selectedRegionId) {
      const region = getRegion(selectedRegionId);
      if (region) {
        setEmployeeName(region.employee || '');
        setSelectedColor(region.color || '#3B82F6');
      }
    }
  }, [selectedRegionId, getRegion]);

  const handleAssign = () => {
    if (!selectedRegionId) {
      toast.error('Выберите регион');
      return;
    }
    if (!employeeName.trim()) {
      toast.error('Введите имя сотрудника');
      return;
    }

    onAssign(selectedRegionId, employeeName.trim(), selectedColor);
    toast.success('Сотрудник назначен');
  };

  const handleUpdate = () => {
    if (!selectedRegionId) {
      toast.error('Выберите регион');
      return;
    }
    if (!employeeName.trim()) {
      toast.error('Введите имя сотрудника');
      return;
    }

    onUpdate(selectedRegionId, {
      employee: employeeName.trim(),
      color: selectedColor,
    });
    toast.success('Данные обновлены');
  };

  const handleReset = () => {
    if (!selectedRegionId) {
      toast.error('Выберите регион');
      return;
    }

    onReset(selectedRegionId);
    setEmployeeName('');
    setSelectedColor('#3B82F6');
    toast.success('Регион сброшен');
  };

  const currentRegion = selectedRegionId ? getRegion(selectedRegionId) : null;

  // Predefined colors for quick selection
  const presetColors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#84CC16', // Lime
  ];

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-glow animate-slide-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Управление регионами
        </h2>
      </div>

      <div className="space-y-5">
        {/* Region Select */}
        <div className="space-y-2">
          <Label htmlFor="region" className="text-muted-foreground text-sm">
            Регион
          </Label>
          <Select
            value={selectedRegionId || ''}
            onValueChange={onSelectRegion}
          >
            <SelectTrigger className="w-full bg-secondary border-border">
              <SelectValue placeholder="Выберите регион..." />
            </SelectTrigger>
            <SelectContent className="max-h-64 bg-popover border-border">
              {regionNames.map(region => (
                <SelectItem
                  key={region.id}
                  value={region.id}
                  className="cursor-pointer"
                >
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current Region Info */}
        {currentRegion && (
          <div className="p-3 bg-secondary/50 rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Часовой пояс</p>
            <p className="text-sm text-foreground">{currentRegion.timezone}</p>
            {currentRegion.employee && (
              <>
                <p className="text-xs text-muted-foreground mt-2 mb-1">
                  Текущий сотрудник
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-foreground">
                    {currentRegion.employee}
                  </p>
                  {currentRegion.color && (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: currentRegion.color }}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Employee Name */}
        <div className="space-y-2">
          <Label htmlFor="employee" className="text-muted-foreground text-sm">
            Имя и фамилия сотрудника
          </Label>
          <Input
            id="employee"
            value={employeeName}
            onChange={e => setEmployeeName(e.target.value)}
            placeholder="Введите имя..."
            className="bg-secondary border-border"
          />
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm">
            Цвет региона
          </Label>
          <div className="flex items-center gap-3">
            {/* Color input */}
            <div className="relative">
              <input
                type="color"
                value={selectedColor}
                onChange={e => setSelectedColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-border overflow-hidden"
              />
            </div>
            {/* Preset colors */}
            <div className="flex flex-wrap gap-2">
              {presetColors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    selectedColor === color
                      ? 'border-foreground'
                      : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button
            onClick={handleAssign}
            className="flex-1 min-w-[140px]"
            disabled={!selectedRegionId}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Назначить
          </Button>
          <Button
            onClick={handleUpdate}
            variant="secondary"
            className="flex-1 min-w-[140px]"
            disabled={!selectedRegionId || !currentRegion?.employee}
          >
            <Edit className="w-4 h-4 mr-2" />
            Изменить
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 min-w-[140px]"
            disabled={!selectedRegionId}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
};
