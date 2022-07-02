import AppContext from './AppContext';
import ls from '@/lib/local-storage';
import React, { ReactNode, useEffect, useState } from 'react';

export default function AppStateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [country, setCountry] = useState('us');
  const [searchHistories, setSearchHistories] = useState<string[]>([]);

  useEffect(() => {
    setCountry(ls.get('country') || 'us');
    setSearchHistories(ls.get('searchHistories') || []);
  }, []);

  const handleCountryChange = (country: string) => {
    setCountry(country);
    ls.set('country', country);
  };

  const handleSearchHistories = (histories: string[]) => {
    setSearchHistories(histories);
    ls.set('searchHistories', histories);
  };

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry: handleCountryChange,
        searchHistories,
        setSearchHistories: handleSearchHistories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
