/* eslint-disable @typescript-eslint/no-explicit-any */
import { withPerformanceLogging } from '@/utils/performance';

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  name = 'debounced function'
) {
  let timeoutId: NodeJS.Timeout;

  const debouncedFn = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => withPerformanceLogging(callback, name)(...args), delay);
  };

  return debouncedFn;
}

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  limit: number,
  name = 'throttled function'
) {
  let waiting = false;

  const throttledFn = (...args: Parameters<T>) => {
    if (!waiting) {
      withPerformanceLogging(callback, name)(...args);
      waiting = true;
      
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };

    return throttledFn;
}