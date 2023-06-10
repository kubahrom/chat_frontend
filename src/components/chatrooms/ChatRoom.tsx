import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { Chatroom } from '@/types/chatroom';
import { Chat } from '../chat/Chat';
import { EditChatModal } from './EditChatModal';
import { useUser } from '@/hooks/useUser';
import { ChatForm } from '../chat/ChatForm';

type Props = {
  chatroom: Chatroom;
};

export const ChatRoom = ({ chatroom }: Props) => {
  const { t } = useTranslation();
  const { user } = useUser();
  return (
    <div className="flex w-full flex-col px-6">
      <div className="flex min-h-0 flex-grow flex-col">
        <div className="mb-5 h-32 border-b border-slate-700 pb-6">
          <div className="flex items-center">
            <h1 className="truncate text-2xl text-slate-100">
              {chatroom.name}
            </h1>
            {user && chatroom.authorId === user.id && (
              <EditChatModal userId={user.id} chatroom={chatroom} />
            )}
          </div>
          <p className="pb-1 pt-1 text-slate-400">
            {t('common:chatroom.users')}
          </p>
          <div className="flex h-[24px] w-full flex-wrap gap-2 overflow-hidden pb-6">
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
        <Chat chatroomId={chatroom.id} />
        <ChatForm />
      </div>
    </div>
  );
};
