import React, { useEffect, useState } from 'react';
import { UseFormRegister, UseFormSetValue, FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = {
  register: UseFormRegister<{
    content: string;
  }>;
  setValue: UseFormSetValue<{
    content: string;
  }>;
  error: FieldError | undefined;
};

export const ChatInput = ({ register, setValue, error }: Props) => {
  const [messageRef, setMessageRef] = useState<HTMLDivElement | null>(null);

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
        onInput={(e) => {
          setValue('content', e.currentTarget.textContent || '', {
            shouldValidate: true,
          });
        }}
      />
    </div>
  );
};
