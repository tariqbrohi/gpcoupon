import AppContext from './AppContext';
import Cookies from 'js-cookie';
import React, { ReactNode, useEffect, useState } from 'react';
import { uniq } from 'lodash';

export default function AppStateProvider({
  children,
  cookies = {},
}: {
  children: ReactNode;
  cookies: Record<string, string>;
}) {
  const [country, setCountry] = useState(cookies['country'] || 'US');
  const [searchHistories, setSearchHistories] = useState<string[]>([]);
  const [user, setUser] = useState<Record<string, any> | null>(null);
  
  useEffect(() => {
    const { sess, searchHistories } = cookies;
    
    try {
      setSearchHistories(JSON.parse(searchHistories));
    } catch {}

    if (sess) {
      const user = atob(sess);

      if (user) setUser(JSON.parse(user));
    }
  }, [cookies]);

  const handleCountryChange = (country: string) => {
    setCountry(country);
    Cookies.set('country', country);
  };

  const handleSearchHistories = (histories: string[]) => {
    setSearchHistories(uniq(histories));
    Cookies.set('searchHistories', JSON.stringify(histories));
  };

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry: handleCountryChange,
        searchHistories,
        setSearchHistories: handleSearchHistories,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
