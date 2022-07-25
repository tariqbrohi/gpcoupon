import { countryOptions } from '@growth-ui/react';
import { createContext } from 'react';

type Country = typeof countryOptions[number]['iso'];

interface Context {
  country: Country;
  setCountry: (lang: Country) => void;
  searchHistories: string[];
  setSearchHistories: (searchHistories: string[]) => void;
  user: Record<string, any> | null;
  loading: boolean;
  setUser: (user: Record<string, any> | null) => void;
}

export default createContext<Context>({} as any);
