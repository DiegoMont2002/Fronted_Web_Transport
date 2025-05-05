import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogIn, FiUserPlus, FiMail, FiLock } from 'react-icons/fi';
import './login.css';
import Carousel from './carousel';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading: authLoading } = useAuth(); // *** Usamos authLoading del contexto
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [formLoading, setFormLoading] = useState(false); // *** Separamos loading del formulario
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // *** Limpia errores al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
  
    try {
      await login(credentials); 
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales inválidas');
    } finally {
      setFormLoading(false);
    }
  };
  
  const handleRegisterClick = (e) => {
   // Redirige a la página de registro
    e.preventDefault();
    window.history.replaceState({}, '', '/register');
  window.dispatchEvent(new PopStateEvent('popstate'));
    /*navigate('/register', {
      state: { from: 'login' }, // Envía estado de procedencia
      replace: true // Evita guardar en historial
    });*/
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

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

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
                  disabled={formLoading}
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
                  disabled={formLoading}
                />
              </div>

              <div className="button-group">
                <button 
                  type="submit" 
                  className="login-button"
                  disabled={formLoading || authLoading}
                >
                  {formLoading ? (
                    <>
                      <span className="spinner"></span> Cargando...
                    </>
                  ) : (
                    <>
                      <FiLogIn className="button-icon" />
                      Iniciar Sesión
                    </>
                  )}
                </button>
              </div>

              <div className="divider">
                <span>o</span>
              </div>
              </form>

              <button 
      type="button" 
      className="register-button"
      onClick={handleRegisterClick} // Usa la nueva función
      disabled={formLoading}
    >
      <FiUserPlus className="button-icon" />
      Crear una cuenta
    </button>

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