import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import {
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';
import { useCallback } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import { GlobalStoreProvider, useGlobalStore } from '@/store/globalStore';
import { useUser } from '@/hooks/useUser';
import { FullScreenLoader } from '@/components/UI/FullScreenLoader';
import { getUser, handleLogout, logout } from '@/modules/auth';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Providers>{getLayout(<Component {...pageProps} />)}</Providers>
    </>
  );
}

const queryClient = new QueryClient();

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStoreProvider>
        <Initializer>{children}</Initializer>
      </GlobalStoreProvider>
      <Toaster />
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools position="bottom-right" />
      )}
    </QueryClientProvider>
  );
};

const Initializer: FC<PropsWithChildren> = ({ children }) => {
  const { setUser } = useUser();
  const [{ init, loader }, setGlobalStore] = useGlobalStore();

  const initialLoad = useCallback(async () => {
    const lsAutoLogin = localStorage.getItem('auto-login');

    if (lsAutoLogin) {
      await getUser()
        .then((user) => {
          setUser(user);
        })
        .catch(() =>
          logout().then(() => {
            handleLogout();
          }),
        );
    }
    setGlobalStore((state) => ({ ...state, init: true }));
  }, [setGlobalStore, setUser]);

  useEffect(() => {
    if (!init) initialLoad();
  }, [init, initialLoad]);

  return (
    <>
      {(!init || loader) && <FullScreenLoader />}
      {children}
    </>
  );
};
