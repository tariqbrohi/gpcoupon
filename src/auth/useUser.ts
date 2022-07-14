import AppContext from '@/modules/components/AppContext';
import { useContext } from 'react';

export default function useUser() {
  const { user } = useContext(AppContext);

  return user;
}
