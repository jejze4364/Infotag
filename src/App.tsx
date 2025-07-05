import React from 'react';
import { View, Text } from 'react-native';
import { AppProvider } from './context/AppProvider';
import { useNFCMonitor } from './hooks/useNFCMonitor';

export default function App() {
  useNFCMonitor({ missingTimeout: 10 * 60 * 1000 });
  return (
    <AppProvider>
      <View>
        <Text>GoTag app</Text>
      </View>
    </AppProvider>
  );
}
