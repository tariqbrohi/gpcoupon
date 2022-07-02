import { countryOptions } from '@growth-ui/react';
import { createContext } from 'react';

type Country = typeof countryOptions[number]['iso'];

interface Context {
  country: Country;
  setCountry: (lang: Country) => void;
  searchHistories: string[];
  setSearchHistories: (searchHistories: string[]) => void;
}

export default createContext<Context>({
  country: 'us',
  setCountry: () => {},
  searchHistories: [],
  setSearchHistories: () => {},
});
