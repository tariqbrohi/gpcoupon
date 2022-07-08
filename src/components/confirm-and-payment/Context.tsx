import { createContext, Dispatch } from 'react';

export type State = {
  email: string;
  name: string;
  message: string;
};

export default createContext<{
  state: State;
  setState: Dispatch<React.SetStateAction<State>>;
}>({} as any);
