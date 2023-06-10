import React, { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = PropsWithChildren<{
  mine?: boolean;
  afterSame?: boolean;
}>;

export const ChatMessage: FC<Props> = ({ children, mine, afterSame }) => {
  return (
    <div
      className={twMerge(['flex w-full', mine ? 'justify-end' : 'items-end'])}
    >
      {!mine && (
        <div className="mr-2 w-6">
          {!afterSame && (
            <div className="grid h-6 w-6 place-items-center rounded-full bg-gray-500 text-xs">
              T
            </div>
          )}
        </div>
      )}
      <p
        className={twMerge([
          'w-3/5 max-w-max rounded-lg px-3 py-2 text-sm',
          mine
            ? 'rounded-br-none bg-primary-600/80 text-white'
            : 'rounded-bl-none bg-slate-800/70',
          afterSame && 'mt-2',
        ])}
      >
        {children}
      </p>
    </div>
  );
};
