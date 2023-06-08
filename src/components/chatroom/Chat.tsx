import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChatMessage } from './ChatMessage';
import { schemaBuilder } from '@/utils/schemaBuilder';
import { ChatInput } from '../inputs/ChatInput';
import { Button } from '../UI/Button';
import { SendChatIcon } from '../icons/SendChatIcon';

type Props = {
  chatroomId: string;
};

export const Chat = ({ chatroomId }: Props) => {
  const [chatRef, setChatRef] = useState<HTMLDivElement | null>(null);
  const {
    methods: {
      register,
      formState: { errors },
      setValue,
    },
    onSubmit,
  } = useChat();

  useEffect(() => {
    if (chatRef) {
      chatRef.scrollTop = chatRef.scrollHeight;
    }
  }, [chatRef]);

  return (
    <div className="flex flex-col justify-between">
      <div
        ref={setChatRef}
        className="scrollbar mb-4 flex max-h-[409px] w-full flex-col gap-1 overflow-auto pr-2 md:h-[500px]"
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
          Proin pede metus vulputate nec fermentum fringilla, vehicula lor
          tempus purus at lorem.
        </ChatMessage>
        <ChatMessage afterSame>Donec quis nibh at felis congue co</ChatMessage>
        <ChatMessage>Ut tempus purus at</ChatMessage>

        <p className="pb-2 pt-3 text-center text-xs text-gray-600">
          Today 11:55
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
          Proin pede metus vulputate nec fermentum fringilla, vehicula lor
          tempus purus at lorem.
        </ChatMessage>
        <ChatMessage afterSame>Donec quis nibh at felis congue co</ChatMessage>
        <ChatMessage>Ut tempus purus at</ChatMessage>
      </div>
      <form className="w-ful flex items-end" onSubmit={onSubmit}>
        <ChatInput
          register={register}
          error={errors.content}
          setValue={setValue}
        />
        <Button className="ml-2 min-h-[50px] w-auto flex-shrink-0 px-3">
          <SendChatIcon className="w-6 text-white" />
        </Button>
      </form>
    </div>
  );
};

export const useChat = () => {
  const methods = useForm<ChatForm>({
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

type ChatForm = z.infer<typeof schema>;
