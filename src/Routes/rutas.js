import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Necesitarás crear este contexto

import Login from '../Login/login';
import Register from '../Login/register';
import Home from '../Pages/home';
import AdminHome from '../Pages/AdminHome'; // Componente que creamos anteriormente
import LoadingSpinner from '../Components/LoadingSpinner';
import RegisterAdmin from '../Login/RegisterAdmin'; // Componente que creamos anteriormente

// Componente de ruta protegida
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner fullScream />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !requiredRole.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin/home' : '/home'}
    replace />;
  }

  return children;
};

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      {/* Ruta normal para usuarios */} 
      <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
      {/* Ruta especial para admin */}
      <Route path="/admin/home" element={
        <ProtectedRoute requiredRole={['admin', 'superadmin']}>
          <AdminHome />
        </ProtectedRoute>
      } />

      <Route path="/admin/register" element={
        <ProtectedRoute requiredRole="admin">
          <RegisterAdmin />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<Login  replace/>} />
    </Routes>
  );
}

export default Rutas;