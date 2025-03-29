import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './carousel';
import { FiUser, FiMail, FiLock, FiLogIn, FiArrowLeft } from 'react-icons/fi';
import './register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
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
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nombre completo es requerido';
    }
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simular registro
      setTimeout(() => {
        console.log('Registro exitoso:', formData);
        setIsSubmitting(false);
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <div className="register-container">
      <div className="register-grid">
        {/* Sección del Formulario */}
        <div className="register-form-container">
          <div className="register-form-wrapper">
            <button 
              className="back-button"
              onClick={() => navigate('/login')}
            >
              <FiArrowLeft className="back-icon" />
              Volver al login
            </button>
            
            <div className="logo-container">
              <h2 className="logo-text">Ruta Maya</h2>
              <p className="welcome-text">Crea tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FiUser className="input-icon" />
                <input
                  type="text"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="input-group">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="input-group">
                <FiLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
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
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>

              <div className="button-group">
                <button
                  type="submit"
                  className="register-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registrando...' : 'Registrarse'}
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

        {/* Sección del Carrusel */}
        <div className="carousel-section">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Register;