import React, { SVGAttributes } from 'react';

export const ChatLogoIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17 9c0 3.87-3.36 7-7.5 7l-.93 1.12-.55.66c-.47.56-1.37.44-1.68-.23L5 14.6C3.18 13.32 2 11.29 2 9c0-3.87 3.36-7 7.5-7 3.02 0 5.63 1.67 6.8 4.07.45.89.7 1.88.7 2.93Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M22 12.86c0 2.29-1.18 4.32-3 5.6l-1.34 2.95c-.31.67-1.21.8-1.68.23l-1.48-1.78c-2.42 0-4.58-1.07-5.93-2.74L9.5 16c4.14 0 7.5-3.13 7.5-7 0-1.05-.25-2.04-.7-2.93 3.27.75 5.7 3.51 5.7 6.79ZM7 9h5"
      />
    </svg>
  );
};
