import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api'; // Asegúrate de tener este archivo configurado
import { FiLogIn, FiUserPlus, FiMail, FiLock } from 'react-icons/fi';
import './login.css';
import Carousel from './carousel';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', credentials);
      
      // Guarda el token en localStorage 
      localStorage.setItem('token', response.data.token);
      
      // Redirige al dashboard/home
      navigate('/home');
      
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Error al conectar con el servidor'
      );
      console.error('Detalles del error:', err.response?.data);  
    }
  };

  return (
    <section className="login-container">
      <div className="login-grid">
        {/* Sección del Formulario */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <div className="logo-container">
              <h2 className="logo-text">Ruta Maya</h2>
              <p className="welcome-text">Bienvenido a tu plataforma de viajes</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input 
                  type="email" 
                  name="email"
                  className="form-input"
                  placeholder="Correo electrónico"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <FiLock className="input-icon" />
                <input 
                  type="password" 
                  name="password"
                  className="form-input"
                  placeholder="Contraseña"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>

              <div className="button-group">
                <button 
                  type="submit" 
                  className="login-button"
                  disabled={loading}
                >
                  <FiLogIn className="button-icon" />
                  {loading ? 'Cargando...' : 'Iniciar Sesión'}
                </button>
              </div>

              <div className="divider">
                <span>o</span>
              </div>

              <button 
                type="button" 
                className="register-button"
                onClick={() => navigate('/register')}
              >
                <FiUserPlus className="button-icon" />
                Crear una cuenta
              </button>
            </form>
          </div>
        </div>

        {/* Sección del Carrusel (opcional) */}
        <div className="carousel-section">
          <Carousel />
        </div>
      </div>
    </section>
  );
};

export default Login;