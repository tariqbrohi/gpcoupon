const ls = {
  set<T>(key: string, value: T) {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
      }),
    );

    return true;
  },
  get<R = any>(key: string): R | null {
    const item = localStorage.getItem(key);

    if (item === null) {
      return item;
    }

    try {
      const parsedItem = JSON.parse(item) as Record<string, any>;

      return parsedItem.value;
    } catch {}

    return item as unknown as R;
  },
  remove(key: string) {
    localStorage.removeItem(key);

    const item = localStorage.getItem(key);

    if (item) {
      return false;
    }

    return true;
  },
  has(key: string) {
    return !!localStorage.getItem(key);
  },
};

export default ls;
