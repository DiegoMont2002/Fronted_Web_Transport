// src/services/api.js (frontend)
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a las requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;