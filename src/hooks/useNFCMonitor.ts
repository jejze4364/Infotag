import { useEffect, useRef } from 'react';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import * as Notifications from 'expo-notifications';
import { Vibration } from 'react-native';
import { useMovementDetection } from './useMovementDetection';
import { useAppContext } from '../context/AppProvider';

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
    NfcManager.start();
    const poll = setInterval(async () => {
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef, { alertMessage: 'Ready to scan NFC' });
        const tag = await NfcManager.getTag();
        if (tag) {
          lastTagTimeRef.current = Date.now();
          setLastTagTime(lastTagTimeRef.current);
        }
      } catch (e) {
        // ignore errors when tag is not present
      } finally {
        NfcManager.cancelTechnologyRequest().catch(() => {});
      }
    }, pollInterval);

    return () => {
      clearInterval(poll);
      NfcManager.cancelTechnologyRequest().catch(() => {});
    };
  }, [pollInterval]);

  // Movement detection handled by useMovementDetection

  // Check for missing tag and movement
  useEffect(() => {
    const check = setInterval(() => {
      const now = Date.now();
      const timeSinceLastTag = now - lastTagTimeRef.current;
      if (timeSinceLastTag > missingTimeout && movementDetected) {
        Vibration.vibrate();
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'GoTag alerta',
            body: 'Objeto movido sem ler a tag NFC',
            sound: true,
          },
          trigger: null,
        });
        reset();
      }
    }, 10000);

    return () => clearInterval(check);
  }, [missingTimeout]);
}
