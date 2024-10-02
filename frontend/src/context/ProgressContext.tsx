import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the possible progress states
export type ProgressContext = 'location' | 'process' | 'finances';

// Define the shape of the context value
interface ProgressContextType {
  currentProgress: ProgressContext;
  setProgress: (progress: ProgressContext) => void;
}

// Create the context with default values
const ProgressContext = createContext<ProgressContextType>({
  currentProgress: 'location', // default state
  setProgress: () => {},
});

// Create the provider component
export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [currentProgress, setCurrentProgress] = useState<ProgressContext>('location');

  const setProgress = (progress: ProgressContext) => {
    setCurrentProgress(progress);
  };

  return <ProgressContext.Provider value={{ currentProgress, setProgress }}>{children}</ProgressContext.Provider>;
};

// Custom hook to use the ProgressContext
export const useProgress = () => useContext(ProgressContext);
