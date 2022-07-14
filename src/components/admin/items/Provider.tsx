import React, { ReactNode, useState } from 'react';
import Context, { Item } from './Context';

export default function Provider({ children }: Props) {
  const [item, setItem] = useState<Item>({
    name: '',
    extendedName: '',
    slug: '',
    available: true,
    imageUrl: '',
    currency: 'GPT',
    expiresIn: 90,
    discountRate: 0,
    amount: 0,
    categories: [],
    brand: '',
    redemptionInstructions: '',
    termsAndConditionsInstructions: '',
    type: 'GIFT_ICON',
    sortOrder: 0,
    country: 'US',
  });

  return (
    <Context.Provider value={{ item, setItem }}>{children}</Context.Provider>
  );
}

type Props = {
  children: ReactNode;
};
