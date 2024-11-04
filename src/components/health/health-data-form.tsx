import { useState } from 'react';
import { useHealth } from '@/context/health-context';
import { HealthMetric } from '@/types/health';

interface HealthDataFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export default function HealthDataForm({ isOpen, onClose, onSubmitSuccess }: HealthDataFormProps) {
  const { addHealthMetric, loading } = useHealth();
  const [metric, setMetric] = useState<Partial<HealthMetric>>({
    type: 'blood_pressure',
    value: '',
    unit: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (metric.type && metric.value && metric.unit) {
      await addHealthMetric({
        id: crypto.randomUUID(),
        timestamp: new Date(),
        ...metric
      } as HealthMetric);
      onSubmitSuccess?.();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Health Metric</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Metric Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Metric Type
            </label>
            <select
              value={metric.type}
              onChange={(e) => setMetric(prev => ({ ...prev, type: e.target.value as HealthMetric['type'] }))}
              className="w-full p-2 border rounded"
              required
            >
              <option value="blood_pressure">Blood Pressure</option>
              <option value="heart_rate">Heart Rate</option>
              <option value="glucose">Blood Glucose</option>
              <option value="weight">Weight</option>
              <option value="lab_result">Lab Result</option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Value
            </label>
            <input
              type="text"
              value={metric.value}
              onChange={(e) => setMetric(prev => ({ ...prev, value: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Enter value"
              required
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Unit
            </label>
            <input
              type="text"
              value={metric.unit}
              onChange={(e) => setMetric(prev => ({ ...prev, unit: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="e.g., mmHg, bpm, mg/dL"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Notes (optional)
            </label>
            <textarea
              value={metric.notes}
              onChange={(e) => setMetric(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-2 border rounded"
              placeholder="Add any additional notes"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Metric'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}