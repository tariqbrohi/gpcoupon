import { Country } from '@prisma/client';
import { createContext, Dispatch, SetStateAction } from 'react';

export type Brand = {
  sub: string | null;
  name: string;
  slug: string;
  description: string;
  disclaimer: string;
  backgroundUrl: string | File;
  thumbnailUrl: string | File;
  available: boolean;
  terms: string;
  categories: string[];
  countries: Country[];
};

export default createContext<{
  brand: Brand;
  setBrand: Dispatch<SetStateAction<Brand>>;
}>({} as any);
