import Context, { State } from './Context';
import React, { ReactNode, useEffect, useState } from 'react';
import { useGetItemQuery } from '@/services';
import { useRouter } from 'next/router';

export default function Provider({ children }: { children: ReactNode }) {
  const {
    query: { slug, id, qty = 1, amount },
  } = useRouter();
  const { data: item, loading } = useGetItemQuery({
    data: {
      id: id as string,
      amount: amount as any,
    },
  });
  const [state, setState] = useState<State>({
    email: '',
    name: '',
    message: '',
    item,
    qty: qty as number,
    slug: slug as string,
    loading,
    exchangeRate: 1,
  });

  useEffect(() => {
    if (item) setState({ ...state, item });
  }, [item]);

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
}
