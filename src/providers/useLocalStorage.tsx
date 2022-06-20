import { useState } from 'react';

export function returnInitialState(storageKey: any, value: any) {
  try {
    // Get from local storage by key

    const item = typeof window === `object` && localStorage.getItem(storageKey);
    // Parse stored json or if none return an empty object

    if (!item) {
      typeof window === `object` &&
        localStorage.setItem(storageKey, JSON.stringify(value));
    }

    return item ? JSON.parse(item) : value;
  } catch (error) {
    // If error also return an empty object
    console.log(error);
    return {};
  }
}

export function useLocalStorage(storageKey: any, value: any) {
  const [storedValue, setStoredValue] = useState(
    returnInitialState(storageKey, value),
  );

  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      typeof window === `object` &&
        localStorage.setItem(storageKey, JSON.stringify(valueToStore));
      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
