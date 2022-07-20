import React, { ReactNode, useState } from 'react';
import Context, { Brand } from './Context';

export default function Provider({ children }: Props) {
  const [brand, setBrand] = useState<Brand>({
    name: '',
    description: '',
    slug: '',
    sub: '',
    disclaimer: '',
    backgroundUrl: '',
    thumbnailUrl: '',
    available: true,
    terms: '',
    categories: [],
    countries: ['US'],
  });

  return (
    <Context.Provider value={{ brand, setBrand }}>{children}</Context.Provider>
  );
}

type Props = {
  children: ReactNode;
};
