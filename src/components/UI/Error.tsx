import React from 'react';

import { twMerge } from 'tailwind-merge';

type ErrorProps = {
  error: string;
  className?: string;
};

export const Error = ({ error, className }: ErrorProps) => {
  return (
    <p className={twMerge(['mt-1 text-sm text-red-600', className])}>{error}</p>
  );
};
