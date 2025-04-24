import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { FiUser, FiMail, FiLock, FiKey } from 'react-icons/fi';
import './admin.css';

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminKey: '' // Clave especial para registro de admins
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await api.post('/auth/register-admin', {
        email: formData.email,
        password: formData.password,
        adminKey: formData.adminKey
      });
      
      alert('Administrador registrado exitosamente');
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/'); // Por si falla la clave pero no da error
      }
    } catch (err) {
      setErrors({
        adminKey: err.response?.data?.message || 'Clave de admin inválida'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin-register-container">
      <h2>Registro de Administrador</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos similares a Register.js pero con adminKey */}
        <div className="input-group">
          <FiKey className="input-icon" />
          <input
            type="password"
            name="adminKey"
            placeholder="Clave de administrador"
            value={formData.adminKey}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registrando...' : 'Registrar Administrador'}
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;