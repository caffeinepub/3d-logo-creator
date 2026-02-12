import { createContext, useContext, useState, type ReactNode } from 'react';

interface ProModeContextValue {
  isPro: boolean;
  togglePro: () => void;
}

const ProModeContext = createContext<ProModeContextValue | undefined>(undefined);

export function ProModeProvider({ children }: { children: ReactNode }) {
  const [isPro, setIsPro] = useState(false);

  const togglePro = () => setIsPro((prev) => !prev);

  return <ProModeContext.Provider value={{ isPro, togglePro }}>{children}</ProModeContext.Provider>;
}

export function useProMode() {
  const context = useContext(ProModeContext);
  if (!context) {
    throw new Error('useProMode must be used within ProModeProvider');
  }
  return context;
}
