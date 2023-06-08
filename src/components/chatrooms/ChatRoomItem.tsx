import { Chatrooms } from '@/types/chatroom';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  chatroom: Chatrooms;
  activeChat?: string | null;
  setActiveChat: (id: string) => void;
};

export const ChatRoomItem = ({
  chatroom,
  activeChat,
  setActiveChat,
}: Props) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={() => setActiveChat(chatroom.id)}
      className={twMerge([
        'flex w-full items-center rounded-lg p-4 hover:bg-gray-700/20',
        activeChat === chatroom.id && 'bg-slate-600/30 hover:bg-slate-600/30',
      ])}
    >
      <span className="h-11 w-11 rounded-full bg-gray-500" />
      <span className="pl-4 text-left">
        <p className="font-medium text-slate-50">{chatroom.name}</p>
        <p className="text-sm text-slate-400">
          {t('common:chatrooms.number_of') + chatroom._count.users}
        </p>
      </span>
    </button>
  );
};
