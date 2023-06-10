import {
  ChatRoomsCreateInput,
  ChatRoomsUpdateInput,
  Chatroom,
  Chatrooms,
} from '@/types/chatroom';
import api from '@/utils/api';
import { AxiosError } from 'axios';

export const getChatRooms = async () => {
  try {
    const res = await api.get('/chatrooms');
    const { data } = res.data as { data: Chatrooms[] };
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const getChatRoom = async (id: string) => {
  try {
    const res = await api.get(`/chatrooms/${id}`);
    const { data } = res.data as { data: Chatroom };
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const createChatRoom = async (inputs: ChatRoomsCreateInput) => {
  try {
    const res = await api.post('/chatrooms', inputs);
    const { data } = res.data as { data: Chatroom };
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const updateChatRoom = async (inputs: ChatRoomsUpdateInput) => {
  try {
    const res = await api.put(`/chatrooms/${inputs.chatroomId}`, inputs);
    const { data } = res.data as { data: Chatroom };
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const deleteChatRoom = async (id: string) => {
  try {
    await api.delete(`/chatrooms/${id}`);
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};
