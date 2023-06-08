import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, variant = 'primary', disabled, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge([
          `btn btn-${variant}`,
          className,
          !!disabled && 'btn-disabled',
        ])}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
