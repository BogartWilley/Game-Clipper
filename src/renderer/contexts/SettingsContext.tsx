import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface SettingsOptions {
  WS_PORT: number;
  WS_PASSWORD: string;
  REPLAY_DIRECTORY: string;
  USERNAME: string;
  DARK_MODE: boolean;
}

interface SettingsContextType {
  settings: SettingsOptions;
  setSettings: (settings: SettingsOptions) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<SettingsOptions>({
    WS_PORT: 0,
    WS_PASSWORD: '',
    REPLAY_DIRECTORY: '',
    USERNAME: '',
    DARK_MODE: true,
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
