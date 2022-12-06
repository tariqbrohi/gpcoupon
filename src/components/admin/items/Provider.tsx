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
    price: 0,
    amount: 0,
    influencerDiscountRate: 0,
    customerDiscountRate: 0,
    totDiscountRate: 0,
    originalPrice: 0,
    couponImageUrl: '',
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
