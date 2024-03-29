import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import useBoolean from '@/hooks/useBoolean';
import { Button } from '../UI/Button';
import { AddIcon } from '../icons/AddIcon';
import { Modal } from '../UI/Modal';
import { schemaBuilder } from '@/utils/schemaBuilder';
import { Input } from '../inputs/Input';
import { createChatRoom } from '@/modules/chatrooms';
import { UserSelect } from '../inputs/UserSelect';

export const NewChatModal = () => {
  const { t } = useTranslation();
  const { value, setTrue, setFalse } = useBoolean();
  const {
    methods: {
      register,
      control,
      formState: { errors },
      reset,
    },
    onSubmit,
    isLoading,
  } = useNewChat(setFalse);

  const handleOpen = () => {
    setTrue();
    reset();
  };

  return (
    <>
      <Button
        variant="text"
        className="mb-3 ml-auto mr-0 flex w-auto items-center py-2 pl-2 pr-4 text-slate-400"
        onClick={handleOpen}
      >
        <AddIcon className="w-6" />
        {t('common:chatrooms.add')}
      </Button>
      <Modal
        isOpen={value}
        closeModal={setFalse}
        title={t('common:chatrooms.new')}
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
          <Button className="mt-6 min-h-[50px] w-full" disabled={isLoading}>
            {t('common:general.create')}
          </Button>
        </form>
      </Modal>
    </>
  );
};

const useNewChat = (callback: () => void) => {
  const methods = useForm<NewChatFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(newChatSchema),
    defaultValues: {
      name: '',
      users: [],
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createChatRoom, {
    onSuccess: (chatroom) => {
      callback();
      queryClient.invalidateQueries(['chatrooms']);
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return { methods, onSubmit, isLoading };
};

const newChatSchema = z.object({
  name: schemaBuilder.name,
  users: schemaBuilder.users,
});

export type NewChatFormValues = z.infer<typeof newChatSchema>;
