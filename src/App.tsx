import React from 'react';
import { View, Text } from 'react-native';
import { AppProvider, useAppContext } from './context/AppProvider';
import { useNFCMonitor } from './hooks/useNFCMonitor';

function Main() {
  useNFCMonitor({ missingTimeout: 10 * 60 * 1000 });
  const { lastTagTime } = useAppContext();
  const lastSeen = new Date(lastTagTime).toLocaleTimeString();
  return (
    <View>
      <Text>GoTag app</Text>
      <Text>Última leitura da tag: {lastSeen}</Text>
    </View>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
}
