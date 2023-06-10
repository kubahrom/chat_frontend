import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import useBoolean from '@/hooks/useBoolean';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { schemaBuilder } from '@/utils/schemaBuilder';
import { Input } from '../inputs/Input';
import { updateChatRoom } from '@/modules/chatrooms';
import { Chatroom } from '@/types/chatroom';
import { EditIcon } from '../icons/EditIcon';
import { UserSelect } from '../inputs/UserSelect';
import { DeleteChatModal } from './DeleteChatModal';

type Props = {
  chatroom: Chatroom;
  userId: string;
};

export const EditChatModal = ({ chatroom, userId }: Props) => {
  const { t } = useTranslation();
  const { value, setTrue, setFalse } = useBoolean();
  const {
    methods: {
      register,
      formState: { errors },
      reset,
      control,
    },
    onSubmit,
    isLoading,
  } = useEditChat(chatroom, userId, setFalse);

  const handleOpen = () => {
    setTrue();
    reset();
  };

  return (
    <>
      <Button
        variant="text"
        className="ml-2 min-h-0 w-auto p-1.5 text-slate-400"
        onClick={handleOpen}
      >
        <EditIcon className="w-5" />
      </Button>
      <Modal
        isOpen={value}
        closeModal={setFalse}
        title={t('common:chatrooms.edit')}
      >
        <form className="" onSubmit={onSubmit}>
          <Input
            label={t('inputs:chat_name.label')}
            id="new-chat-name"
            {...register('name')}
            placeholder={t('inputs:chat_name.placeholder')}
            error={errors.name?.message}
          />
          <UserSelect control={control} name="users" />
          <div className="mt-6 flex gap-3">
            <DeleteChatModal chatroomId={chatroom.id} callback={setFalse} />
            <Button className="min-h-[50px] w-full" disabled={isLoading}>
              {t('common:general.edit')}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

const useEditChat = (
  chatroom: Chatroom,
  userId: string,
  callback: () => void,
) => {
  const methods = useForm<NewChatFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(newChatSchema),
    defaultValues: {
      name: chatroom.name,
      users:
        chatroom.users
          .map((user) => user.id)
          .filter((user) => user !== userId) || [],
    },
  });

  useEffect(() => {
    methods.reset({
      name: chatroom.name,
      users:
        chatroom.users
          .map((user) => user.id)
          .filter((user) => user !== userId) || [],
    });
  }, [chatroom, userId, methods]);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateChatRoom, {
    onSuccess: (chatroom) => {
      callback();

      queryClient.invalidateQueries(['chatrooms']);
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutate({ ...data, chatroomId: chatroom.id });
  });

  return { methods, onSubmit, isLoading };
};

const newChatSchema = z.object({
  name: schemaBuilder.name,
  users: schemaBuilder.users,
});

export type NewChatFormValues = z.infer<typeof newChatSchema>;
