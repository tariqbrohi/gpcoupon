import { Country, ItemType } from '@prisma/client';
import { createContext, Dispatch, SetStateAction } from 'react';

export type Item = {
  name: string;
  slug: string;
  extendedName: string;
  available: boolean;
  currency: string;
  expiresIn: number;
  discountRate: number;
  amount: number;
  country: Country;
  type: ItemType;
  brand: string;
  categories: string[];
  sortOrder: number;
  redemptionInstructions: string;
  termsAndConditionsInstructions: string;
  imageUrl: string | File;
};

export default createContext<{
  item: Item;
  setItem: Dispatch<SetStateAction<Item>>;
}>({} as any);
