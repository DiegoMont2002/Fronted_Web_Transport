/*import { createContext, useContext, useState, useEffect } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false); // Estado para verificar si la autenticación ha sido comprobada
  const navigate = useNavigate();

  // 1. Función para cargar el usuario desde localStorage
  const loadUser = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data', error);
        localStorage.clear();
      }
    }
    setLoading(false);
    setAuthChecked(true);
  };

  // 2. Efecto que se ejecuta al inicio
  useEffect(() => {
    loadUser();
  }, []);

  // Redirección basada en autenticación
  useEffect(() => {
    if (!authChecked || loading) return;

    if (user) {
      const redirectPath = user.role.includes('admin') 
        ? '/admin/home' 
        : '/home';
      navigate(redirectPath, { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [user, authChecked, loading, navigate]);

  // Login modificado
  const login = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', credentials);
      
     localStorage.setItem('token', data.token);
     localStorage.setItem('user', JSON.stringify(data.user));
     setUser(data.user);
     
    } catch (err) {
      throw err;
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

export const useAuth = () => useContext(AuthContext);*/


import { createContext, useContext, useState, useEffect } from 'react';
import api from '../Services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Carga inicial del usuario
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data', error);
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  // Redirección basada en autenticación
  useEffect(() => {
    if (loading) return;

    // Solo redirige si hay usuario (no redirigimos automáticamente al login)
    if (user) {
      const redirectPath = user.role.includes('admin') 
        ? '/admin/home' 
        : '/home';
      navigate(redirectPath, { replace: true });
    }
  }, [user, loading, navigate]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', credentials);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (err) {
      setLoading(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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