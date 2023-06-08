import { AxiosError } from 'axios';

import api from '@/utils/api';
import { LoginInputs, RegisterInputs } from '@/types/auth';
import { UserData } from '@/types/users';

export const getUser = async () => {
  try {
    const res = await api.get('/auth/me');
    const { data } = res.data as UserData;
    handleLogin(data.at);
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const login = async (input: LoginInputs) => {
  try {
    const res = await api.post('/auth/login', input);
    const { data } = res.data as UserData;
    handleLogin(data.at);
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const register = async (input: RegisterInputs) => {
  try {
    const res = await api.post('/auth/register', input);
    const { data } = res.data as UserData;
    handleLogin(data.at);
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message);
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout', {});
  } catch (_) {}
};

export const refreshToken = async () => {
  try {
    const res = await api.post('/auth/refresh', {});
    const { data } = res.data as { data: string };
    handleLogin(data);
    return data;
  } catch (_) {}
};

export const handleLogin = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('auto-login', '1');
  localStorage.setItem('at', token);
};

export const handleLogout = () => {
  api.defaults.headers.common['Authorization'] = '';
  localStorage.removeItem('auto-login');
  localStorage.removeItem('at');
};
