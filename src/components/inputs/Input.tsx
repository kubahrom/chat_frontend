import React, { forwardRef, InputHTMLAttributes } from 'react';

import { BaseInput } from './BaseInput';
import { InputWrapper } from './InputWrapper';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  id?: string;
  label?: string;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ label, id, className, wrapperClassName, error, ...props }, ref) => {
    return (
      <InputWrapper
        label={label}
        id={id}
        error={error}
        wrapperClassName={wrapperClassName}
      >
        <BaseInput
          ref={ref}
          id={id}
          {...props}
          className={className}
          error={!!error}
        />
      </InputWrapper>
    );
  },
);

Input.displayName = 'Input';
