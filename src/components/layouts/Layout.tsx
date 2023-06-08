import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { user, logoutUser } = useUser();
  return (
    <main
      className="relative grid min-h-screen w-full
    place-items-center overflow-hidden bg-slate-900 text-slate-200"
    >
      <div className="absolute h-full w-full">
        <div className="absolute grid h-full w-full place-items-center after:absolute after:inset-0 after:bg-black/30">
          <Image
            src="/images/blob-green.png"
            width="1800"
            height="1800"
            alt="blob"
            className="absolute right-0 translate-x-[60%] translate-y-72 opacity-80"
          />
          <Image
            src="/images/blob-green.png"
            width="1200"
            height="1200"
            alt="blob"
            className="user-select-none absolute left-0 -translate-x-[20rem] -translate-y-24 opacity-60"
          />
          <Image
            src="/images/blob-blue.png"
            width="800"
            height="800"
            alt="blob"
            className="absolute left-0 translate-x-32 translate-y-52 opacity-75"
          />
        </div>
      </div>
      {user && (
        <button
          className="absolute right-0 top-0 m-8 px-4 py-2"
          onClick={logoutUser}
        >
          Logout
        </button>
      )}
      {children}
    </main>
  );
};
