import { Chatroom } from '@/types/chatroom';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { Chat } from './Chat';

type Props = {
  chatroom: Chatroom;
};

export const ChatRoom = ({ chatroom }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col px-6 py-4">
      <div>
        <h1 className="text-2xl text-slate-100">{chatroom.name}</h1>
        <p className="pb-1 pt-1 text-slate-400">{t('common:chatroom.users')}</p>
        <div className="mb-2 flex w-full flex-wrap gap-2 border-b border-slate-700 pb-6">
          {chatroom.users.map((user) => (
            <p
              key={user.name}
              className="rounded-lg bg-slate-600/30 px-2 py-[2px] text-sm"
            >
              {user.name}
            </p>
          ))}
        </div>
      </div>
      <div className="pr-3">
        <Chat chatroomId={chatroom.id} />
      </div>
    </div>
  );
};
