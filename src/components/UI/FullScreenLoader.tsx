import React from 'react';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import Image from 'next/image';

export const FullScreenLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-900">
      <div className="absolute h-full w-full">
        <div className="absolute grid h-full w-full place-items-center after:absolute after:inset-0 after:bg-black/20">
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
      <LoadingSpinner className="h-12 w-12" />
    </div>
  );
};
