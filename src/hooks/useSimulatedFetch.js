import { useState, useEffect } from 'react';

/**
 * Hook to simulate a brief async fetch delay (defaults to 200-350ms)
 * to showcase clean skeleton transitions without annoying user lag
 */
export function useSimulatedFetch(initialData, delay = 250) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(initialData);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [initialData, delay]);

  return { data: data ?? initialData, loading };
}
