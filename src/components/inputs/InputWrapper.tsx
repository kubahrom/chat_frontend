import React, { FC, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

import { Label } from './Label';
import { Error } from '../UI/Error';

type InputWrapperProps = {
  error?: string;
  wrapperClassName?: string;
  label?: string;
  id?: string;
};

export const InputWrapper: FC<PropsWithChildren<InputWrapperProps>> = ({
  wrapperClassName,
  label,
  error,
  id,
  children,
}) => {
  return (
    <div className={twMerge(['relative w-full', wrapperClassName])}>
      {label && id && <Label label={label} id={id} />}
      {children}
      {error && <Error error={error} />}
    </div>
  );
};
