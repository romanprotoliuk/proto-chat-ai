import { useHealth } from '@/context/health-context';
import { HealthMetric } from '@/types/health';

export default function HealthDataDisplay() {
  const { healthProfile } = useHealth();

  if (!healthProfile || !healthProfile.metrics.length) {
    return (
      <div className="text-center p-4 text-gray-500">
        No health data available
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatMetricValue = (metric: HealthMetric) => {
    return `${metric.value} ${metric.unit}`;
  };

  const getMetricIcon = (type: HealthMetric['type']) => {
    switch (type) {
      case 'blood_pressure':
        return '🫀';
      case 'heart_rate':
        return '💓';
      case 'glucose':
        return '🩸';
      case 'weight':
        return '⚖️';
      case 'lab_result':
        return '🔬';
      default:
        return '📊';
    }
  };

  return (
    <div className="space-y-2">
      <div className="font-medium text-sm px-3">Recent Health Metrics</div>
      <div className="space-y-1">
        {healthProfile.metrics.slice(-5).map((metric) => (
          <div
            key={metric.id}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg"
          >
            <span className="text-lg">{getMetricIcon(metric.type)}</span>
            <div className="flex-1">
              <div className="text-sm font-medium capitalize">
                {metric.type.replace('_', ' ')}
              </div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>{formatMetricValue(metric)}</span>
                <span>{formatDate(metric.timestamp)}</span>
              </div>
              {metric.notes && (
                <div className="text-xs text-gray-500 mt-1">{metric.notes}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}