import { useState } from 'react';
import { useHealth } from '@/context/health-context';
import { HealthMetric } from '@/types/health';

export default function HealthDataForm() {
  const { addHealthMetric, loading } = useHealth();
  const [metric, setMetric] = useState<Partial<HealthMetric>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (metric.type && metric.value && metric.unit) {
      await addHealthMetric({
        id: crypto.randomUUID(),
        timestamp: new Date(),
        ...metric
      } as HealthMetric);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Add form fields */}
      
    </form>
  );
}