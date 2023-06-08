import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'en',
  },
  withCredentials: true,
});

export default api;
