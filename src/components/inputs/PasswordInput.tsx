import React, { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import useBoolean from '@/hooks/useBoolean';
import { Input } from './Input';
import { HidePasswordIcon } from '../icons/HidePasswordIcon';
import { ShowPasswordIcon } from '../icons/ShowPasswordIcon';

interface IPasswordInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  id: string;
  label: string;
  wrapperClassName?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, IPasswordInput>(
  ({ label, id, className, error, wrapperClassName, ...props }, ref) => {
    const { value, toggle } = useBoolean();

    return (
      <div className={twMerge(['relative w-full', wrapperClassName])}>
        <Input
          ref={ref}
          id={id}
          type={value ? 'text' : 'password'}
          label={label}
          error={error}
          {...props}
          className={twMerge(['w-full pr-12', className])}
        />
        <button
          type="button"
          className="absolute right-4 top-9 m-auto"
          onClick={() => toggle()}
          tabIndex={-1}
        >
          {value ? (
            <HidePasswordIcon className="text-slate-500" />
          ) : (
            <ShowPasswordIcon className="text-slate-500" />
          )}
        </button>
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInputWithLabel';
