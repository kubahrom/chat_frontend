import { ChatroomData, ChatroomsData } from '@/types/chatroom';
import api from '@/utils/api';
import { AxiosError } from 'axios';

export const getChatRooms = async () => {
  try {
    const res = await api.get('/chatrooms');
    const { data } = res.data as ChatroomsData;
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const getChatRoom = async (id: string) => {
  try {
    const res = await api.get(`/chatrooms/${id}`);
    const { data } = res.data as ChatroomData;
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};
