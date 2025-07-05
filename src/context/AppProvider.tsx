import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
  lastTagTime: number;
  setLastTagTime: (t: number) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastTagTime, setLastTagTime] = useState(Date.now());
  return <AppContext.Provider value={{ lastTagTime, setLastTagTime }}>{children}</AppContext.Provider>;
};

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
