import * as Notifications from 'expo-notifications';
import { Vibration } from 'react-native';

export function alertMovement() {
  Vibration.vibrate();
  return Notifications.scheduleNotificationAsync({
    content: {
      title: 'GoTag alerta',
      body: 'Objeto movido sem ler a tag NFC',
      sound: true,
    },
    trigger: null,
  });
}
