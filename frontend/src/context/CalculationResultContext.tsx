import { createContext, useContext, useState, ReactNode } from 'react';
import { FunctionReturn } from '@/utils/calculateOutput';

// Define the new type for the calculation results object
interface CalculationResults {
  [identifier: string]: FunctionReturn;
}

interface CalculationResultContextProps {
  // The context will now hold multiple calculation results, one per identifier
  calculationResults: CalculationResults;
  updateCalculationResult: (identifier: string, result: FunctionReturn) => void;
}

// Create the context with default values
const CalculationResultContext = createContext<CalculationResultContextProps>({
  calculationResults: {}, // Default to an empty object
  updateCalculationResult: () => {},
});

// Custom hook for consuming the context
export const useCalculationResultContext = () => useContext(CalculationResultContext);

interface CalculationResultProviderProps {
  children: ReactNode;
}

// Context Provider Component
export const CalculationResultProvider = ({ children }: CalculationResultProviderProps) => {
  const [calculationResults, setCalculationResults] = useState<CalculationResults>({});

  const updateCalculationResult = (identifier: string, result: FunctionReturn) => {
    // Update the state by merging the new result with the existing results
    setCalculationResults((prevResults) => ({
      ...prevResults,
      [identifier]: result, // Use the identifier as the key and store the result
    }));
  };

  console.log(calculationResults);

  return (
    <CalculationResultContext.Provider value={{ calculationResults, updateCalculationResult }}>
      {children}
    </CalculationResultContext.Provider>
  );
};
