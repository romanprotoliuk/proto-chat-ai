import { HealthProfile } from '@/types/health';

const HEALTH_PROFILE_KEY = 'health_profile';

export const saveHealthProfile = (profile: HealthProfile) => {
  localStorage.setItem(HEALTH_PROFILE_KEY, JSON.stringify(profile));
};

export const loadHealthProfile = (): HealthProfile | null => {
  const stored = localStorage.getItem(HEALTH_PROFILE_KEY);
  return stored ? JSON.parse(stored) : null;
};