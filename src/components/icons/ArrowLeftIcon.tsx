import React, { SVGAttributes } from 'react';

export const ArrowLeftIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M15 19.92 8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
      />
    </svg>
  );
};
