import React, { useEffect, useRef, useState } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  FieldError,
  UseFormWatch,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = {
  register: UseFormRegister<{
    content: string;
  }>;
  setValue: UseFormSetValue<{
    content: string;
  }>;
  watch: UseFormWatch<{
    content: string;
  }>;
  error: FieldError | undefined;
};

export const ChatInput = ({ register, setValue, error, watch }: Props) => {
  const [messageRef, setMessageRef] = useState<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const content = watch('content');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      buttonRef.current?.click();
    }
  };

  useEffect(() => {
    if (messageRef && content === '') {
      messageRef.textContent = '';
    }
  }, [content, messageRef]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const data = e.clipboardData?.getData('text/plain');
      if (data) {
        document.execCommand(
          'inserttext',
          false,
          e.clipboardData?.getData('text/plain'),
        );
      }
    };

    messageRef?.addEventListener('paste', handlePaste);

    return () => {
      messageRef?.removeEventListener('paste', handlePaste);
    };
  }, [messageRef]);

  useEffect(() => {
    if (error) messageRef?.focus();
  }, [error, messageRef]);

  return (
    <div className="relative w-full max-w-[calc(100%-3.5rem)]">
      <button className="hidden" ref={buttonRef}></button>
      <div
        {...register('content')}
        tabIndex={0}
        ref={setMessageRef}
        role="button"
        placeholder="Type a message..."
        className={twMerge([
          'chat-input input scrollbar mb-[2px] ml-[2px] max-h-[146px] cursor-text overflow-auto break-words pr-10',
          error
            ? 'border-error focus:ring-error focus:ring-1'
            : 'focus:ring-2 focus:ring-primary',
        ])}
        contentEditable
        onKeyDown={handleKeyDown}
        onInput={(e) => {
          setValue('content', e.currentTarget.innerText || '', {
            shouldValidate: true,
          });
        }}
      />
    </div>
  );
};
