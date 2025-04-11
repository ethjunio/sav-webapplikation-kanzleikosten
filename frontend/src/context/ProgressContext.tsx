import { createContext, useState, useContext, ReactNode } from 'react';

// Define the possible progress states
export type ProgressState = 'location' | 'process' | 'finances';

// Define the shape of the context value
interface ProgressContextType {
  currentProgress: ProgressState;
  setProgress: (progress: ProgressState) => void;
}

// Create the context with default values
const ProgressContext = createContext<ProgressContextType>({
  currentProgress: 'location', // default state
  setProgress: () => {},
});

// Create the provider component
export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [currentProgress, setCurrentProgress] = useState<ProgressState>('location');

  const setProgress = (progress: ProgressState) => {
    setCurrentProgress(progress);
  };

  return <ProgressContext.Provider value={{ currentProgress, setProgress }}>{children}</ProgressContext.Provider>;
};

// Custom hook to use the ProgressContext
export const useProgress = () => useContext(ProgressContext);
