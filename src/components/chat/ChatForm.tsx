import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ChatInput } from '../inputs/ChatInput';
import { schemaBuilder } from '@/utils/schemaBuilder';
import { Button } from '../UI/Button';
import { SendChatIcon } from '../icons/SendChatIcon';

export const ChatForm = () => {
  const {
    methods: {
      register,
      formState: { errors },
      setValue,
    },
    onSubmit,
  } = useChatForm();

  return (
    <form className="w-ful flex items-end pt-4" onSubmit={onSubmit}>
      <ChatInput
        register={register}
        error={errors.content}
        setValue={setValue}
      />
      <Button className="mb-[2px] ml-2 min-h-[50px] w-auto flex-shrink-0 px-3">
        <SendChatIcon className="w-6 text-white" />
      </Button>
    </form>
  );
};

export const useChatForm = () => {
  const methods = useForm<ChatFormFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
  });

  return { methods, onSubmit };
};

const schema = z.object({
  content: schemaBuilder.content,
});

type ChatFormFormValues = z.infer<typeof schema>;
