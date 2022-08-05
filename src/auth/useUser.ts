import AppContext from '@/modules/components/AppContext';
import { useContext } from 'react';

export default function useUser() {
  const { user, loading } = useContext(AppContext);

  return { user, loading };
}
