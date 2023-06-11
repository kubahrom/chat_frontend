import React from 'react';
import { twMerge } from 'tailwind-merge';
import useTranslation from 'next-translate/useTranslation';

import { ChatRoomItem } from './ChatRoomItem';
import { Chatrooms } from '@/types/chatroom';
import { NewChatModal } from './NewChatModal';
import { useGlobalStoreState } from '@/store/globalStore';
import { useUser } from '@/hooks/useUser';
import { Button } from '../UI/Button';

type Props = {
  chatrooms?: Chatrooms[];
};

const ChatRoomsList = ({ chatrooms }: Props) => {
  const { t } = useTranslation();
  const { activeChat } = useGlobalStoreState();
  const { user, logoutUser } = useUser();

  return (
    <div
      className={twMerge([
        'w-full flex-shrink-0 border-slate-700 md:w-auto md:min-w-[250px] md:border-r md:pr-4 lg:min-w-[300px]',
        activeChat && 'hidden md:block',
      ])}
    >
      <div className="flex h-full min-h-0 flex-col">
        <NewChatModal />
        <div className="scrollbar h-[calc(100%-56px)] overflow-auto md:pr-3">
          {chatrooms && chatrooms.length === 0 ? (
            <div className="grid h-full w-full place-items-center">
              <p className="text-slate-500">
                {t('common:chatrooms.no_chatrooms')}
              </p>
            </div>
          ) : (
            <>
              {chatrooms?.map((chatroom) => (
                <ChatRoomItem key={chatroom.id} chatroom={chatroom} />
              ))}
            </>
          )}
        </div>
        <div className="pt-2">
          <p className="text-center text-xs text-slate-500">
            {chatrooms?.length} chatrooms
          </p>
          <div className="flex gap-3 pt-2">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-600">
              {user?.name[0].toUpperCase()}
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <p className="text-slate-200">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <Button
                variant="text"
                className="min-h-0 w-auto p-2 text-xs text-slate-400"
                onClick={logoutUser}
              >
                {t('common:general.logout')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomsList;
