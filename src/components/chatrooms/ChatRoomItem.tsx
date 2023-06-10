import { useGlobalStore } from '@/store/globalStore';
import { Chatrooms } from '@/types/chatroom';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  chatroom: Chatrooms;
};

export const ChatRoomItem = ({ chatroom }: Props) => {
  const { t } = useTranslation();
  const [state, setState] = useGlobalStore();
  return (
    <button
      onClick={() => setState((prev) => ({ ...prev, activeChat: chatroom.id }))}
      className={twMerge([
        'flex w-full items-center rounded-lg p-4 hover:bg-gray-700/20',
        state.activeChat === chatroom.id &&
          'bg-slate-600/30 hover:bg-slate-600/30',
      ])}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-gray-500">
        {chatroom.name[0].toUpperCase()}
      </span>
      <span className="pl-4 text-left">
        <p className="font-medium text-slate-50">{chatroom.name}</p>
        <p className="text-sm text-slate-400">
          {t('common:chatrooms.number_of') + chatroom._count.users}
        </p>
      </span>
    </button>
  );
};
