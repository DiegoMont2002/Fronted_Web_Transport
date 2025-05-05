import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import './register.css';
import Carousel from './carousel';
import { useLocation } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email no válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await api.post('/auth/register', {
        email: formData.email,
        password: formData.password
      });

      navigate('/login', { 
        state: { 
          registeredSuccessfully: true,
          email: formData.email 
        }
      });
      
    } catch (err) {
      setErrors({
        server: err.response?.data?.message || 
               'Error al registrar. Por favor intenta nuevamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = (e) => {
    e.preventDefault();
    window.history.replaceState({}, '', '/login');
  window.dispatchEvent(new PopStateEvent('popstate'));
    /*navigate(location.state?.from || '/login', {
      replace: true
    });*/
  };

  return (
    <div className="register-container">
      <div className="register-grid">
        <div className="register-form-container">
          <div className="register-form-wrapper">
          <button 
      className="back-button"
      onClick={handleBackClick} // Usa la nueva función
    >
      <FiArrowLeft className="back-icon" />
      Volver al login
    </button>
            
            <div className="logo-container">
              <h2 className="logo-text">Ruta Maya</h2>
              <p className="welcome-text">Crea tu cuenta</p>
            </div>

            {errors.server && (
              <div className="error-message mb-3">{errors.server}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Contraseña (mínimo 6 caracteres)"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  className="register-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Registrando...
                    </>
                  ) : (
                    'Registrarse'
                  )}
                </button>
              </div>

              <div className="login-redirect">
                ¿Ya tienes una cuenta?{' '}
                <button 
                  type="button" 
                  className="login-link"
                  onClick={() => navigate('/login')}
                >
                  Inicia sesión
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="carousel-section">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Register;