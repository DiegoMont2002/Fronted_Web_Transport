import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/api';
import { FiUser, FiMail, FiLock, FiKey } from 'react-icons/fi';
import './admin.css';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminKey: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register-admin', formData);
      alert('Admin registrado!');
    } catch (error) {
      alert('Error: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="admin-register">
      <h2>Registro para Administradores</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos similares a register.js + campo adminKey */}
        <div className="form-group">
          <label>Clave Secreta:</label>
          <input 
            type="password" 
            value={formData.adminKey}
            onChange={(e) => setFormData({...formData, adminKey: e.target.value})}
            required
          />
        </div>
        <button type="submit">Registrar Admin</button>
      </form>
    </div>
  );
};

export default RegisterAdmin;