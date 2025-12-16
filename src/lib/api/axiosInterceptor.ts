import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://fixwi-backend.onrender.com',
});

// Request interceptor - Agrega el token JWT a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expiró o no es válido, limpiar y redirigir
    // EXCEPTO si es un error de login (para permitir mostrar el mensaje de error)
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/login')) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;