import { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context state
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'German', // default language
  setLanguage: () => {}, // placeholder function
});

// Provider component to wrap the app and manage the language state
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('German');

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

// Custom hook to easily access the language context
export const useLanguage = () => {
  return useContext(LanguageContext);
};
