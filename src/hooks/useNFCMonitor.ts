import { useEffect, useRef } from 'react';

/**
 * Hook to monitor NFC tag presence and phone movement.
 * - Polls for NFC tags every `pollInterval` ms.
 * - Records timestamp of last successful read.
 * - If no tag read for `missingTimeout` ms and movement is detected,
 *   triggers vibration and local notification.
 */
export function useNFCMonitor({
  pollInterval = 5000,
  missingTimeout = 10 * 60 * 1000, // 10 minutes
  movementThreshold = 1.2,
}: {
  pollInterval?: number;
  missingTimeout?: number;
  movementThreshold?: number;
}) {
  const lastTagTimeRef = useRef(Date.now());
  const { moved: movementDetected, reset } = useMovementDetection(movementThreshold);
  const { setLastTagTime } = useAppContext();

  // Start NFC polling
  useEffect(() => {
      }
    }, pollInterval);

    return () => {
      clearInterval(poll);
    };
  }, [pollInterval]);

  // Movement detection handled by useMovementDetection

  // Check for missing tag and movement
  useEffect(() => {
    const check = setInterval(() => {
      const now = Date.now();
      const timeSinceLastTag = now - lastTagTimeRef.current;
      if (timeSinceLastTag > missingTimeout && movementDetected) {
        reset();
      }
    }, 10000);

    return () => clearInterval(check);
  }, [missingTimeout]);
}
