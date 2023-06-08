import React from 'react';
import Link, { LinkProps } from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ITextLink
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: LinkProps['href'];
}

export const TextLink: React.FC<ITextLink> = ({
  href,
  className,
  children,
  ...props
}) => {
  return (
    <Link
      href={href}
      {...props}
      className={twMerge([
        'text-sm font-bold text-slate-200 hover:underline',
        className,
      ])}
    >
      {children}
    </Link>
  );
};
