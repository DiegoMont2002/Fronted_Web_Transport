import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  };

  // Elementos del menú
  const menuItems = [
    { path: '/admin/home', icon: 'bi-speedometer2', label: 'Dashboard' },
    { path: '/admin/rutas', icon: 'bi-map', label: 'Gestión de Rutas' },
    { path: '/admin/usuarios', icon: 'bi-people', label: 'Usuarios' },
    { path: '/admin/pagos', icon: 'bi-credit-card', label: 'Métodos de Pago' },
    { path: '/admin/reportes', icon: 'bi-graph-up', label: 'Reportes' },
    { path: '/admin/configuracion', icon: 'bi-gear', label: 'Configuración' }
  ];

  return (
    <div className="sidebar">
      {/* Logo y título */}
      <div className="d-flex align-items-center mb-4">
        <span className="fs-4 fw-bold">Ruta Maya Admin</span>
      </div>
      <hr className="sidebar-divider" />

      {/* Menú principal */}
      <ul className="nav flex-column">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <button 
              onClick={() => handleNavigation(item.path)}
              className="nav-link sidebar-button"
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Espaciador */}
      <div className="mt-auto"></div>

      {/* Pie de sidebar con perfil */}
      <hr className="sidebar-divider" />
      <div className="dropdown">
        <button 
          className="d-flex align-items-center text-white dropdown-toggle w-100 bg-transparent border-0"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={`https://ui-avatars.com/api/?name=${user?.email}&background=16a085&color=fff`}
            alt="Perfil"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <div className="text-start">
            <strong>{user?.email}</strong>
            <small className="d-block text-muted">{user?.role}</small>
          </div>
        </button>
        <ul className="dropdown-menu">
          <li>
            <button 
              className="dropdown-item" 
              onClick={() => handleNavigation('/admin/perfil')}
            >
              <i className="bi bi-person me-2"></i> Mi Perfil
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button 
              className="dropdown-item logout-button" 
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;