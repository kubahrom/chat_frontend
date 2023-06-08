import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/store/globalStore';

import Routes from '@/utils/routes';

export const useProtectedRoute: (revert?: boolean) => null = (revert) => {
  const router = useRouter();

  const [globalStore, setGlobalStore] = useGlobalStore();
  const { init, user } = globalStore;

  useEffect(() => {
    const condition = revert ? !!user : user?.id ? false : true;
    if (init) {
      setGlobalStore((state) => ({
        ...state,
        loader: true,
      }));
      if (condition) {
        router.replace(revert ? Routes.home : Routes.login).then(() =>
          setGlobalStore((state) => ({
            ...state,
            loader: false,
          })),
        );
        return;
      }
      setGlobalStore((state) => ({
        ...state,
        loader: false,
      }));
    }
  }, [user, init]);

  return null;
};
