import { ApprovalStatus, Country, ItemType } from '@prisma/client';
import { createContext, Dispatch, SetStateAction } from 'react';

export type Item = {
  id?: string;
  name: string;
  extendedName: string;
  slug: string;
  available: boolean;
  imageUrl: string | File;
  currency: string;
  expiresIn: number;
  discountRate: number;
  price: number;
  amount: number;
  influencerDiscountRate?: number;
  customerDiscountRate?: number;
  totDiscountRate: number;
  originalPrice: number;
  couponImageUrl: string | File;
  influencerId?: string;
  categories: string[];
  brand: string;
  redemptionInstructions: string;
  termsAndConditionsInstructions: string;
  type: ItemType;
  sortOrder: number;
  country: Country;
  approvalStatus?: ApprovalStatus;
};

export default createContext<{
  item: Item;
  setItem: Dispatch<SetStateAction<Item>>;
}>({} as any);
