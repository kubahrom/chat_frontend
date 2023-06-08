import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { ChatLogoIcon } from '../icons/ChatLogoIcon';

export const Title = () => {
  const { t } = useTranslation();
  return (
    <h1 className="flex items-center justify-center text-3xl font-bold text-slate-200 sm:text-4xl">
      <ChatLogoIcon className="mr-3 w-8 text-slate-200 sm:w-10" />
      <span className="mr-2 bg-gradient-to-r from-primary-300 to-secondary bg-clip-text text-transparent">
        {t('common:title.first')}
      </span>
      {t('common:title.second')}
    </h1>
  );
};
