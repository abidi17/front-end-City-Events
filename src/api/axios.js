import axios from 'axios';

const API = axios.create({
  baseURL: 'https://back-end-city-events.onrender.com/api'
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