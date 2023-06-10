import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ChatInput } from '../inputs/ChatInput';
import { schemaBuilder } from '@/utils/schemaBuilder';
import { Button } from '../UI/Button';
import { SendChatIcon } from '../icons/SendChatIcon';
import { addMessage } from '@/modules/messages';

type Props = {
  chatroomId: string;
};

export const ChatForm = ({ chatroomId }: Props) => {
  const {
    methods: {
      register,
      formState: { errors },
      setValue,
      watch,
    },
    onSubmit,
    isLoading,
  } = useChatForm(chatroomId);

  return (
    <form
      className="w-ful flex items-end pt-4"
      onSubmit={onSubmit}
      id="chat-form"
    >
      <ChatInput
        register={register}
        error={errors.content}
        setValue={setValue}
        watch={watch}
      />
      <Button
        className="mb-[2px] ml-2 min-h-[50px] w-auto flex-shrink-0 px-3"
        disabled={isLoading}
      >
        <SendChatIcon className="w-6 text-white" />
      </Button>
    </form>
  );
};

export const useChatForm = (chatroomId: string) => {
  const methods = useForm<ChatFormFormValues>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(addMessage, {
    onSuccess: (message) => {
      queryClient.setQueryData(['messages', chatroomId], (oldData: any) => [
        ...oldData,
        message,
      ]);
      methods.setValue('content', '');
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    mutate({
      id: chatroomId,
      content: data.content,
    });
  });

  return { methods, onSubmit, isLoading };
};

const schema = z.object({
  content: schemaBuilder.content,
});

type ChatFormFormValues = z.infer<typeof schema>;
