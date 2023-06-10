import React, { useState, useEffect, Fragment } from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '@/types/messages';
import { useUser } from '@/hooks/useUser';

type Props = {
  chatroomId: string;
  messages?: Message[];
};

export const Chat = ({ chatroomId, messages }: Props) => {
  const [chatRef, setChatRef] = useState<HTMLDivElement | null>(null);
  const { user } = useUser();

  // useEffect(() => {
  //   if (user) {
  //     const websocket = new WebSocket(`ws://localhost:3000/?id=456`);
  //     websocket.onopen = () => {
  //       console.log('connected');
  //     };

  //     websocket.onmessage = (message) => {
  //       console.log(message);
  //     };

  //     websocket.onclose = () => {
  //       console.log('disconnected');
  //     };
  //     websocket.onerror = (error) => {
  //       console.log(error);
  //     };

  //     return () => {
  //       console.log('closing');
  //       websocket.close();
  //     };
  //   }
  // }, [user]);

  useEffect(() => {
    if (chatRef) {
      chatRef.scrollTop = chatRef.scrollHeight;
    }
  }, [chatRef, messages]);

  return (
    <div
      ref={setChatRef}
      className="scrollbar min-h-0 flex-grow overflow-auto pr-2"
    >
      {messages && messages?.length > 0 ? (
        <>
          {messages.map((message, idx) => (
            <Fragment key={message.id}>
              <ChatMessage
                mine={message.author.id === user?.id}
                authorName={message.author.name[0].toLocaleUpperCase()}
                withIcon={
                  (!!messages[idx + 1] &&
                    messages[idx + 1].author.id !== message.author.id) ||
                  idx === messages.length - 1
                }
                differentAuthor={
                  (!!messages[idx - 1] &&
                    messages[idx - 1].author.id !== message.author.id) ||
                  idx === 0
                }
              >
                {message.content}
              </ChatMessage>
            </Fragment>
          ))}
        </>
      ) : (
        <>No messages yet</>
      )}
    </div>
  );
};
