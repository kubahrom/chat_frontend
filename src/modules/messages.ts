import { AxiosError } from 'axios';

import api from '@/utils/api';
import { AddMessageInputs, GetMessagesInputs, Message } from '@/types/messages';

export const getMessages = async (inputs: GetMessagesInputs) => {
  try {
    const res = await api.get('/messages', { params: inputs });
    const { data } = res.data as { data: Message[] };
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const addMessage = async (inputs: AddMessageInputs) => {
  try {
    const res = await api.post('/messages', inputs);
    const { data } = res.data as { data: Message };
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};
