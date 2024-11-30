import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ez-schedules.com:5108',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    // console.log(error);
    return Promise.reject(error);
  },
);

export default api;
