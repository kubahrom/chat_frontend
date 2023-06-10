import React, { SVGAttributes } from 'react';

export const CheckmarkIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m5 12 4.994 5L20 7"
      />
    </svg>
  );
};
