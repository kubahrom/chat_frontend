import { AxiosError } from 'axios';

import api from '@/utils/api';
import { LoginInputs, RegisterInputs } from '@/types/auth';
import { UserData } from '@/types/users';

export const me = async () => {
  try {
    const res = await api.get('/auth/me');
    const { data } = res.data as UserData;
    handleLogin();
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message || e.message);
  }
};

export const login = async (input: LoginInputs) => {
  try {
    const res = await api.post('/auth/login', input);
    const { data } = res.data as UserData;
    handleLogin();
    return data;
  } catch (error) {
    const e = error as AxiosError<{ message: string }>;
    throw new Error(e.response?.data.message || e.message);
  }
};

export const register = async (input: RegisterInputs) => {
  try {
    const res = await api.post('/auth/register', input);
    const { data } = res.data as UserData;
    handleLogin();
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
    handleLogin();
    return data;
  } catch (_) {}
};

export const handleLogin = () => {
  localStorage.setItem('auto-login', '1');
};

export const handleLogout = () => {
  localStorage.removeItem('auto-login');
};
