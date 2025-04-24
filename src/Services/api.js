import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use(
  (response) => {
    // Verifica que la respuesta tenga la estructura correcta
    if (response.data?.token) {
      const rawToken = response.data.token;
      const cleanToken = rawToken.toString().trim();

      if (cleanToken.includes(' ')) {
        console.error('Token malformado:', cleanToken);
        throw new Error('Token contiene espacios');
      }

      //Reemplaza el token por la version limpia 
      response.data.token = cleanToken;
    }
  
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
export default api;