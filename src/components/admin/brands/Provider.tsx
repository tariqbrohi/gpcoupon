import React, { ReactNode, useState } from 'react';
import Context, { Brand } from './Context';

export default function Provider({ children }: Props) {
  const [brand, setBrand] = useState<Brand>({
    sub: '',
    name: '',
    slug: '',
    description: '',
    disclaimer: '',
    backgroundUrl: '',
    thumbnailUrl: '',
    available: true,
    terms: '',
    categories: [],
    countries: ['US'],
    metadata: {},
  });

  return (
    <Context.Provider value={{ brand, setBrand }}>{children}</Context.Provider>
  );
}

type Props = {
  children: ReactNode;
};
