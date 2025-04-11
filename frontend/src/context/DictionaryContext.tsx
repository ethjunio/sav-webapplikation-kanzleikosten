import { createContext, useContext, PropsWithChildren } from 'react';
import Dictionary from "@/types/Dictionary";
import resolveLanguageKeys from "@/utils/resolveLanguageKeys";

const dictionary = resolveLanguageKeys()

const DictionaryContext = createContext<Dictionary>(dictionary);

export const DictionaryProvider = ({ children }: PropsWithChildren) => {
  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw Error('useDictionary must be used inside the DictionaryContext');
  }

  return context;
};
