import { createContext, useContext, useState, useEffect } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Función para cargar el usuario desde localStorage
  const loadUser = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  };

  // 2. Efecto que se ejecuta al inicio
  useEffect(() => {
    loadUser();
  }, []);

  // Login modificado
  console.log('Antes de login');
  const login = async (credentials) => {
    console.log('Inicinando login');
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', credentials);
      
     localStorage.setItem('token', data.token);
     localStorage.setItem('user', JSON.stringify(data.user));

     setUser(data.user);

     const redirectPath = data.user.role === 'admin' ? '/admin/home' : '/home';
     navigate(redirectPath, { replace: true });

      console.log('Login exitoso:', data.user);

     return data.user;
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.error('Error en login:', err);
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  //Funcion de logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);