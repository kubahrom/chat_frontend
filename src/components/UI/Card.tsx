import React, { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = PropsWithChildren<{
  className?: string;
}>;

export const Card: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={twMerge([
        'z-10 rounded-[16px] bg-slate-950/30 px-16 py-12  shadow-md backdrop-blur-sm',
        className,
      ])}
    >
      {children}
    </div>
  );
};
