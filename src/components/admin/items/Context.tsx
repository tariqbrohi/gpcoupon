import { Country, ItemType } from '@prisma/client';
import { createContext, Dispatch, SetStateAction } from 'react';

export type Item = {
  name: string;
  slug: string;
  extendedName: string;
  available: boolean;
  currency: string;
  expiresIn: number;
  customerDiscountRate?: number;
  influencerDiscountRate?: number;
  influencerId?: string;
  discountRate: number;
  amount: number;
  price: number;
  country: Country;
  originalPrice: number;
  type: ItemType;
  brand: string;
  categories: string[];
  couponImageUrl: string | File;
  sortOrder: number;
  redemptionInstructions: string;
  termsAndConditionsInstructions: string;
  imageUrl: string | File;
};

export default createContext<{
  item: Item;
  setItem: Dispatch<SetStateAction<Item>>;
}>({} as any);
