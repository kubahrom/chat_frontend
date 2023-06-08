import Head from 'next/head';
import React from 'react';

import { appName } from '@/utils/constants';

type PageTitleProps = {
  title: string;
};

export const pageTitle = (title: string | undefined) => {
  return title ? `${title} • ${appName}` : appName;
};

export const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Head>
      <title>{pageTitle(title)}</title>
    </Head>
  );
};
