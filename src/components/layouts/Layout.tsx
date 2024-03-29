import Image from 'next/image';
import React, { FC, PropsWithChildren } from 'react';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className="relative grid min-h-screen w-full
    overflow-hidden bg-slate-900 text-slate-200 md:place-items-center"
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
      <div className="z-10 flex max-h-screen w-full bg-slate-950/30 px-7 pb-7 pt-6 shadow-md backdrop-blur-sm md:h-[750px] md:w-[750px] md:rounded-[16px] lg:w-[1000px]">
        {children}
      </div>
    </main>
  );
};
