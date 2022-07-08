import { createContext, Dispatch } from 'react';
import { Item } from '@prisma/client';

export type State = {
  email: string;
  name: string;
  message: string;
  slug: string;
  item: Item | null;
  qty: number;
  loading: boolean;
};

export default createContext<{
  state: State;
  setState: Dispatch<React.SetStateAction<State>>;
}>({} as any);
