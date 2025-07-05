import { useEffect, useState } from 'react';
import { Accelerometer } from 'expo-sensors';

/**
 * Simple hook that reports whether movement above a threshold was detected.
 */
export function useMovementDetection(threshold: number = 1.2) {
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    const sub = Accelerometer.addListener(data => {
      const magnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
      if (magnitude > threshold) {
        setMoved(true);
      }
    });
    return () => sub.remove();
  }, [threshold]);

  return { moved, reset: () => setMoved(false) };
}
