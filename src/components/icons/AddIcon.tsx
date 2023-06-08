import React, { SVGAttributes } from 'react';

export const AddIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 12h12M12 18V6"
      />
    </svg>
  );
};
