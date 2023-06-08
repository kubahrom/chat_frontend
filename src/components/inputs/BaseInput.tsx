import React, { forwardRef, InputHTMLAttributes, KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const BaseInput = forwardRef<HTMLInputElement, IBaseInput>(
  ({ className, error, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        {...props}
        className={twMerge([
          'input',
          error
            ? 'border-red-600 focus:ring-1 focus:ring-red-600'
            : 'border-slate-500 focus:ring-2 focus:ring-slate-400',

          className,
        ])}
      />
    );
  },
);

BaseInput.displayName = 'BaseInput';
