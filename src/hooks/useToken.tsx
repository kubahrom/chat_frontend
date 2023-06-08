import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useMutation } from '@tanstack/react-query';
import { intervalToDuration } from 'date-fns';

import { refreshToken } from '@/modules/auth';
import { useGlobalStore } from '@/store/globalStore';

type DecodedToken = {
  userId: string;
  iat: number;
  exp: number;
};

export const useToken = () => {
  const [globalStore, setGlobalStore] = useGlobalStore();
  const at = globalStore.user?.at;

  const { mutate: refresh } = useMutation(refreshToken, {
    onSuccess: (at) => {
      if (at) {
        setGlobalStore((state) => ({
          ...state,
          user: state.user ? { ...state.user, at: at } : null,
        }));
      }
    },
  });

  useEffect(() => {
    if (!at) return;

    const decoded: DecodedToken = jwt_decode(at);
    const exp = new Date(decoded.exp * 1000);

    const time = intervalToDuration({ start: exp, end: new Date() });
    const timeNumber =
      (time.seconds || 0) +
      (time.minutes || 0) * 60 +
      (time.hours || 0) * 60 * 60;
    const timeout = setTimeout(() => {
      console.log('refresh');
      refresh();
    }, timeNumber * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [at, refresh]);

  return {};
};
