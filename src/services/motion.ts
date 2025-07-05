import { Accelerometer } from 'expo-sensors';

export function subscribeMovement(threshold: number, callback: () => void) {
  Accelerometer.setUpdateInterval(1000);
  const sub = Accelerometer.addListener(data => {
    const magnitude = Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z);
    if (magnitude > threshold) {
      callback();
    }
  });
  return () => sub.remove();
}
