import React from 'react';
import { ChatRoomItem } from './ChatRoomItem';
import { Chatrooms } from '@/types/chatroom';
import { NewChatModal } from './NewChatModal';

type Props = {
  chatrooms?: Chatrooms[];
  activeChat?: string | null;
  setActiveChat: (id: string) => void;
};

const ChatRoomsList = ({ chatrooms, setActiveChat, activeChat }: Props) => {
  return (
    <div className="min-w-[300px] flex-shrink-0 border-r border-slate-700 pr-4">
      <NewChatModal />
      <div className="scrollbar h-[calc(100%-56px)] overflow-auto pr-3">
        {chatrooms && chatrooms.length === 0 ? (
          <div className="grid h-full w-full place-items-center">
            <p className="text-slate-500">You dont have any chatroom</p>
          </div>
        ) : (
          <>
            {chatrooms?.map((chatroom) => (
              <ChatRoomItem
                key={chatroom.id}
                chatroom={chatroom}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ChatRoomsList;
