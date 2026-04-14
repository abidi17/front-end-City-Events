import axios from 'axios';

const API = axios.create({
  baseURL: 'srv-d7f5m8bbc2fs738hmrgg/api'
});

// Automatically increase the token in each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;