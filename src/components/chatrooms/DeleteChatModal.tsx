import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import useBoolean from '@/hooks/useBoolean';
import { BinIcon } from '../icons/BinIcon';
import { Button } from '../UI/Button';
import { Modal } from '../UI/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteChatRoom } from '@/modules/chatrooms';
import { useGlobalStoreUpdate } from '@/store/globalStore';

type Props = {
  chatroomId: string;
  callback: () => void;
};

export const DeleteChatModal = ({ chatroomId, callback }: Props) => {
  const { t } = useTranslation();
  const { value, setTrue, setFalse } = useBoolean();
  const queryClient = useQueryClient();
  const setState = useGlobalStoreUpdate();
  const { mutate, isLoading } = useMutation(deleteChatRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(['chatrooms']);
      setState((state) => ({ ...state, activeChat: null }));
      setFalse();
      callback();
    },
  });

  return (
    <>
      <Button
        variant="outlined"
        className="flex-1"
        onClick={setTrue}
        type="button"
      >
        <BinIcon className="w-5 text-slate-400" />
      </Button>
      <Modal
        isOpen={value}
        closeModal={setFalse}
        title={t('common:delete.title')}
      >
        <p className="text-slate-500">{t('common:delete.message')}</p>
        <div className="flex justify-between pt-8">
          <Button variant="outlined" className="w-auto" onClick={setFalse}>
            {t('common:general.cancel')}
          </Button>
          <Button
            className="w-auto"
            disabled={isLoading}
            onClick={() => mutate(chatroomId)}
          >
            {t('common:delete.confirm')}
          </Button>
        </div>
      </Modal>
    </>
  );
};
