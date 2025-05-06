import axios from 'axios';
import cookies from 'js-cookie';

//Api del backend
const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api/v1';


const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('jwt-auth', { path: '/' });
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;