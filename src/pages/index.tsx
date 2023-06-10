import React, { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';

import { Layout } from '@/components/layouts/Layout';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Card } from '@/components/UI/Card';
import ChatRoomsList from '@/components/chatrooms/ChatRoomsList';
import { getChatRoom, getChatRooms } from '@/modules/chatrooms';
import { FullScreenLoader } from '@/components/UI/FullScreenLoader';
import { PageTitle } from '@/components/UI/PageTitle';
import { useUser } from '@/hooks/useUser';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { ChatRoom } from '@/components/chatrooms/ChatRoom';
import { getUsers } from '@/modules/users';
import { useGlobalStoreState } from '@/store/globalStore';
import { getMessages } from '@/modules/messages';

export default function HomePage() {
  useProtectedRoute();
  const { t } = useTranslation();
  const { user } = useUser();
  const { activeChat } = useGlobalStoreState();

  const { data: chatrooms, isLoading: isLoadingChatrooms } = useQuery(
    ['chatrooms'],
    getChatRooms,
    {
      staleTime: Infinity,
      keepPreviousData: true,
      enabled: !!user,
    },
  );

  const { data: chatroom, isLoading: isLoadingChatroom } = useQuery(
    ['chatrooms', activeChat],
    () => getChatRoom(activeChat || ''),
    {
      staleTime: Infinity,
      enabled: !!activeChat,
      keepPreviousData: true,
    },
  );

  useQuery(
    ['messages', activeChat],
    () => getMessages({ id: activeChat || '' }),
    {
      staleTime: Infinity,
      enabled: !!activeChat,
      keepPreviousData: true,
    },
  );

  useQuery(['users'], getUsers, {
    staleTime: Infinity,
  });

  return (
    <>
      <PageTitle title={''} />
      {isLoadingChatrooms ? (
        <FullScreenLoader />
      ) : (
        <Card className="flex h-[750px] w-[1000px] px-7 pb-7 pt-6">
          <ChatRoomsList chatrooms={chatrooms} />
          {!activeChat ? (
            <div className="grid w-full place-content-center text-slate-500">
              {t('common:home.empty')}
            </div>
          ) : (
            <>
              {isLoadingChatroom && (
                <div className="grid h-full w-full place-items-center">
                  <LoadingSpinner />
                </div>
              )}
              {!isLoadingChatroom && chatroom && (
                <ChatRoom chatroom={chatroom} activeChat={activeChat} />
              )}
            </>
          )}
        </Card>
      )}
    </>
  );
}

HomePage.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
