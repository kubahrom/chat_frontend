import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import useBoolean from '@/hooks/useBoolean';
import { Button } from '../UI/Button';
import { AddIcon } from '../icons/AddIcon';
import { Modal } from '../UI/Modal';
import { schemaBuilder } from '@/utils/schemaBuilder';
import { Input } from '../inputs/Input';

export const NewChatModal = () => {
  const { t } = useTranslation();
  const { value, setTrue, setFalse } = useBoolean();
  const {
    methods: {
      register,
      formState: { errors },
      reset,
    },
    onSubmit,
    // isLoading,
  } = useNewChat();

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
      <Modal isOpen={value} closeModal={setFalse} title={t('New chat')}>
        <form className="flex items-start gap-2" onSubmit={onSubmit}>
          <Input
            label={t('inputs:chat_name.label')}
            id="new-chat-name"
            {...register('name')}
            placeholder={t('inputs:chat_name.placeholder')}
            error={errors.name?.message}
          />
          <Button className="mt-6 min-h-[50px] w-2/5">
            {t('common:general.create')}
          </Button>
        </form>
      </Modal>
    </>
  );
};

const useNewChat = () => {
  const methods = useForm<NewChatFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(newChatSchema),
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return { methods, onSubmit };
};

const newChatSchema = z.object({
  name: schemaBuilder.name,
});

export type NewChatFormValues = z.infer<typeof newChatSchema>;
