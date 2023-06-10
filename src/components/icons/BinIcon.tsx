import React, { SVGAttributes } from 'react';

export const BinIcon = (props: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg fill="none" viewBox="0 0 13 13" {...props}>
      <path
        d="M11.375 3.24a55.088 55.088 0 0 0-5.428-.271c-1.072 0-2.144.054-3.217.162l-1.105.109M4.604 2.693l.119-.71c.086-.514.151-.899 1.067-.899h1.419c.915 0 .986.406 1.067.905l.12.704M10.21 4.951l-.352 5.455c-.06.85-.109 1.511-1.62 1.511H4.761c-1.512 0-1.56-.66-1.62-1.511L2.79 4.95M5.596 8.938h1.803M5.146 6.771h2.709"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
