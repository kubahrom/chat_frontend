import { AxiosError } from 'axios';
import { User } from '@/types/users';
import api from '@/utils/api';

export const getUsers = async () => {
  try {
    const res = await api.get('/users');
    const { data } = res.data as { data: User[] };
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};
