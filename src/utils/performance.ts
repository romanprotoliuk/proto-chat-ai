export function logPerformance(
    functionName: string,
    startTime: number,
    endTime: number
  ) {
    const duration = endTime - startTime;
    console.log(`${functionName} took ${duration}ms to execute`);
  }
  
  // Usage example with our hooks
  export function withPerformanceLogging<T extends (...args: never[]) => void>(
    fn: T,
    name: string
  ): T {
    return ((...args: Parameters<T>) => {
      const start = performance.now();
      const result = fn(...args);
      const end = performance.now();
      logPerformance(name, start, end);
      return result;
    }) as T;
  }