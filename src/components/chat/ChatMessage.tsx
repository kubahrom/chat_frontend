import React, { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = PropsWithChildren<{
  mine?: boolean;
  withIcon?: boolean;
  authorName: string;
  differentAuthor: boolean;
}>;

export const ChatMessage: FC<Props> = ({
  children,
  mine,
  withIcon,
  authorName,
  differentAuthor,
}) => {
  return (
    <div
      className={twMerge([
        'flex w-full first:mt-0',
        mine ? 'justify-end' : 'items-end',
        differentAuthor ? 'mt-8' : 'mt-1.5',
      ])}
    >
      {!mine && (
        <div className="mr-2 w-6">
          {withIcon && (
            <div className="grid h-6 w-6 place-items-center rounded-full bg-gray-500 text-xs">
              {authorName}
            </div>
          )}
        </div>
      )}
      <p
        className={twMerge([
          'w-3/5 max-w-max rounded-lg px-3 py-2 text-sm first:mt-0',
          mine
            ? 'rounded-br-none bg-primary-600/80 text-white'
            : 'rounded-bl-none bg-slate-800/70',
        ])}
      >
        {children}
      </p>
    </div>
  );
};
