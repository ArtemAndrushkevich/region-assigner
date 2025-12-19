import { useState, useCallback } from 'react';
import { russiaRegions, RegionData } from '@/data/russiaRegions';

export interface RegionState extends RegionData {
  employee?: string;
  color?: string;
}

export interface RegionStateMap {
  [key: string]: RegionState;
}

// Initialize state from regions data
const initializeRegionState = (): RegionStateMap => {
  const state: RegionStateMap = {};
  russiaRegions.forEach(region => {
    state[region.id] = { ...region };
  });
  return state;
};

export const useRegionState = () => {
  const [regions, setRegions] = useState<RegionStateMap>(initializeRegionState);

  // Assign employee to a region
  const assignEmployee = useCallback((regionId: string, employee: string, color: string) => {
    setRegions(prev => ({
      ...prev,
      [regionId]: {
        ...prev[regionId],
        employee,
        color,
      },
    }));
  }, []);

  // Update region data
  const updateRegion = useCallback((regionId: string, data: Partial<RegionState>) => {
    setRegions(prev => ({
      ...prev,
      [regionId]: {
        ...prev[regionId],
        ...data,
      },
    }));
  }, []);

  // Reset region to default state
  const resetRegion = useCallback((regionId: string) => {
    const originalRegion = russiaRegions.find(r => r.id === regionId);
    if (originalRegion) {
      setRegions(prev => ({
        ...prev,
        [regionId]: { ...originalRegion },
      }));
    }
  }, []);

  // Get region by ID
  const getRegion = useCallback((regionId: string): RegionState | undefined => {
    return regions[regionId];
  }, [regions]);

  // Get all assigned regions
  const getAssignedRegions = useCallback((): RegionState[] => {
    return Object.values(regions).filter(region => region.employee);
  }, [regions]);

  // Get statistics
  const getStats = useCallback(() => {
    const total = Object.keys(regions).length;
    const assigned = Object.values(regions).filter(r => r.employee).length;
    return {
      total,
      assigned,
      unassigned: total - assigned,
    };
  }, [regions]);

  return {
    regions,
    assignEmployee,
    updateRegion,
    resetRegion,
    getRegion,
    getAssignedRegions,
    getStats,
  };
};
