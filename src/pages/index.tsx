import React, { ReactElement, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/layouts/Layout';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card } from '@/components/UI/Card';
import ChatRoomsList from '@/components/chatrooms/ChatRoomsList';
// import { useToken } from '@/hooks/useToken';
import { getChatRoom, getChatRooms } from '@/modules/chatrooms';
import { FullScreenLoader } from '@/components/UI/FullScreenLoader';
import { PageTitle } from '@/components/UI/PageTitle';
import { useUser } from '@/hooks/useUser';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { ChatRoom } from '@/components/chatroom/ChatRoom';

export default function HomePage() {
  // useToken();
  useProtectedRoute();
  const { t } = useTranslation();
  const { user } = useUser();
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const { data: chatrooms, isLoading: isLoadingChatrooms } = useQuery(
    ['chatrooms'],
    getChatRooms,
    {
      staleTime: Infinity,
      enabled: !!user,
    },
  );

  const { data: chatroom, isLoading: isLoadingChatroom } = useQuery(
    ['chatroom', activeChat],
    () => getChatRoom(activeChat || ''),
    {
      staleTime: Infinity,
      enabled: !!activeChat,
    },
  );

  // useEffect(() => {
  //   if (user) {
  //     const websocket = new WebSocket(`ws://localhost:3000/?at=${user.at}`);
  //     websocket.onopen = () => {
  //       console.log('connected');
  //     };

  //     websocket.onmessage = (message) => {
  //       console.log(message);
  //     };

  //     return () => {
  //       websocket.close();
  //     };
  //   }
  // }, [user]);

  return (
    <>
      <PageTitle title={''} />
      {isLoadingChatrooms ? (
        <FullScreenLoader />
      ) : (
        <Card className="flex h-[750px] w-[1000px] px-7 py-6">
          <ChatRoomsList
            chatrooms={chatrooms}
            setActiveChat={setActiveChat}
            activeChat={activeChat}
          />
          {!activeChat && (
            <div className="grid w-full place-content-center text-slate-500">
              {t('common:home.empty')}
            </div>
          )}
          {activeChat && isLoadingChatroom && (
            <div className="grid h-full w-full place-items-center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoadingChatroom && chatroom && <ChatRoom chatroom={chatroom} />}
        </Card>
      )}
    </>
  );
}

HomePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
