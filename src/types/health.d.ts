export interface HealthMetric {
    id: string;
    type: 'blood_pressure' | 'heart_rate' | 'glucose' | 'weight' | 'lab_result';
    value: string | number;
    unit: string;
    timestamp: Date;
    notes?: string;
  }
  
  export interface HealthProfile {
    userId: string;
    metrics: HealthMetric[];
    lastUpdated: Date;
  }
  
  // Update existing types
  export type PromptType = {
    title: string;
    description: string;
    promptMessage: string;
    category?: 'health' | 'general' | 'writing';
    requiresData?: boolean;
  };