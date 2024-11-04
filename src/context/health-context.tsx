import { createContext, useContext, useState } from 'react';
import { HealthMetric } from '@/types/health';

interface HealthContextType {
  healthProfile: {
    metrics: HealthMetric[];
  } | null;
  addHealthMetric: (metric: HealthMetric) => Promise<void>;
  loading: boolean;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export function HealthProvider({ children }: { children: React.ReactNode }) {
  const [healthProfile, setHealthProfile] = useState<HealthContextType['healthProfile']>(null);
  const [loading, setLoading] = useState(false);

  const addHealthMetric = async (metric: HealthMetric) => {
    setLoading(true);
    try {
      setHealthProfile(prev => prev ? {
        ...prev,
        metrics: [...prev.metrics, metric]
      } : {
        metrics: [metric]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <HealthContext.Provider value={{
      healthProfile,
      addHealthMetric,
      loading
    }}>
      {children}
    </HealthContext.Provider>
  );
}

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};