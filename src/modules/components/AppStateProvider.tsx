import AppContext from './AppContext';
import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useState } from 'react';

export default function AppStateProvider({
  children,
  cookies = {},
}: {
  children: ReactNode;
  cookies: Record<string, string>;
}) {
  const [country, setCountry] = useState(cookies['country'] || 'us');
  const [searchHistories, setSearchHistories] = useState<string[]>([]);

  useEffect(() => {
    const { searchHistories } = cookies;

    try {
      setSearchHistories(JSON.parse(searchHistories));
    } catch {}
  }, []);

  const handleCountryChange = (country: string) => {
    setCountry(country);
    Cookies.set('country', country);
  };

  const handleSearchHistories = (histories: string[]) => {
    setSearchHistories(histories);
    Cookies.set('searchHistories', JSON.stringify(histories));
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
