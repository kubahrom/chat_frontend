import React, { SVGAttributes } from 'react';

export const ArrowDownIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fill="currentColor"
        d="M6 8.5a1 1 0 0 1 .71.29l4.58 4.59a1.002 1.002 0 0 0 1.42 0l4.58-4.59a1.004 1.004 0 0 1 1.42 1.42l-4.59 4.58a3.06 3.06 0 0 1-4.24 0l-4.59-4.58A1 1 0 0 1 6 8.5Z"
      />
    </svg>
  );
};
