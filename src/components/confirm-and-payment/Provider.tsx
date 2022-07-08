import Context, { State } from './Context';
import React, { ReactNode, useState } from 'react';

export default function Provider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    email: '',
    name: '',
    message: '',
  });

  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
}
