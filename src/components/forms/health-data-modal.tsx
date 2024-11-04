import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useHealth } from '@/context/health-context';
import { HealthMetric } from '@/types/health';

interface HealthDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function HealthDataModal({ isOpen, onClose, onComplete }: HealthDataModalProps) {
  const { data: session } = useSession();
  const { addHealthMetric } = useHealth();
  const [formData, setFormData] = useState<Omit<HealthMetric, 'id' | 'timestamp'>>({
    type: 'blood_pressure',
    value: '',
    unit: '',
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Create the metric object with required properties
    const newMetric: HealthMetric = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      ...formData
    };

    await addHealthMetric(newMetric);
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Health Profile Required</h2>
        <p className="text-gray-600 mb-4">
          Please provide your health information to get personalized assistance.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Health Metrics */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Current Health Conditions
            </label>
            <input
              type="text"
              placeholder="e.g., Diabetes, Hypertension"
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                conditions: e.target.value.split(',').map(s => s.trim())
              }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Current Medications
            </label>
            <input
              type="text"
              placeholder="e.g., Metformin, Lisinopril"
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                medications: e.target.value.split(',').map(s => s.trim())
              }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Allergies
            </label>
            <input
              type="text"
              placeholder="e.g., Penicillin, Peanuts"
              className="w-full p-2 border rounded"
              onChange={(e) => setFormData(prev => ({
                ...prev,
                allergies: e.target.value.split(',').map(s => s.trim())
              }))}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}