import React, { useState, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
// import { useUser } from '@/hooks/useUser';

type Props = {
  chatroomId: string;
};

export const Chat = ({ chatroomId }: Props) => {
  const [chatRef, setChatRef] = useState<HTMLDivElement | null>(null);
  // const { user } = useUser();

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
  }, [chatRef]);

  return (
    <div
      ref={setChatRef}
      className="scrollbar min-h-0 flex-grow overflow-auto pr-2"
    >
      <p className="pb-2 pt-3 text-center text-xs text-gray-600">
        Yesterday 9:32
      </p>
      <ChatMessage afterSame>
        In laoreet, magna id viverra tincidu sem odio bibendum jus imperdiet
        sapien wisi sed libero.
      </ChatMessage>
      <ChatMessage>Nullam rhoncus aliquam.</ChatMessage>
      <ChatMessage mine afterSame>
        Nullam rhoncus aliquam.
      </ChatMessage>
      <ChatMessage mine>
        Phasellus et lorem id felis nonum placerat aenean id metus id.
      </ChatMessage>
      <ChatMessage>Curabitur bibendum justo non</ChatMessage>
      <ChatMessage mine>
        Proin pede metus vulputate nec fermentum fringilla, vehicula lor tempus
        purus at lorem.
      </ChatMessage>
      <ChatMessage afterSame>Donec quis nibh at felis congue co</ChatMessage>
      <ChatMessage>Ut tempus purus at</ChatMessage>

      <p className="pb-2 pt-3 text-center text-xs text-gray-600">Today 11:55</p>
      <ChatMessage afterSame>
        In laoreet, magna id viverra tincidu sem odio bibendum jus imperdiet
        sapien wisi sed libero.
      </ChatMessage>
      <ChatMessage>Nullam rhoncus aliquam.</ChatMessage>
      <ChatMessage mine afterSame>
        Nullam rhoncus aliquam.
      </ChatMessage>
      <ChatMessage mine>
        Phasellus et lorem id felis nonum placerat aenean id metus id.
      </ChatMessage>
      <ChatMessage>Curabitur bibendum justo non</ChatMessage>
      <ChatMessage mine>
        Proin pede metus vulputate nec fermentum fringilla, vehicula lor tempus
        purus at lorem.
      </ChatMessage>
      <ChatMessage afterSame>Donec quis nibh at felis congue co</ChatMessage>
      <ChatMessage>Ut tempus purus at</ChatMessage>
    </div>
  );
};
