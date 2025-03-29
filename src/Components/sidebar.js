import React from "react";
import './sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar d-flex flex-column flex-shrink-0 p-3">
      {/* Logo */}
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
        <span className="fs-4 fw-bold" style={{ color: "white" }}>Ruta Maya</span>
      </div>
      <hr className="sidebar-divider" />

      {/* Menú de navegación */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button 
            onClick={() => handleNavigation('/')} 
            className="nav-link d-flex align-items-center mt-3 sidebar-button"
          >
            <i className="bi bi-house-door me-2"></i>
            Home
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavigation('/rutas')} 
            className="nav-link d-flex align-items-center mt-3 sidebar-button"
          >
            <i className="bi bi-map me-2"></i>
            Rutas
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavigation('/metodos-pago')} 
            className="nav-link d-flex align-items-center mt-3 sidebar-button"
          >
            <i className="bi bi-credit-card me-2"></i>
            Métodos de Pago
          </button>
        </li>
        <li>
          <button 
            onClick={() => handleNavigation('/acerca-de')} 
            className="nav-link d-flex align-items-center mt-3 sidebar-button"
          >
            <i className="bi bi-info-circle me-2"></i>
            Acerca de Nosotros
          </button>
        </li>
        <li className="mt-4">
          <button 
            onClick={() => handleNavigation('/login')} 
            className="nav-link d-flex align-items-center mt-3 sidebar-button logout-button"
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Salir
          </button>
        </li>
      </ul>

      {/* Perfil de usuario */}
      <div className="dropdown mt-auto">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="Perfil"
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Usuario</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <button className="dropdown-item" onClick={() => handleNavigation('/perfil')}>
              <i className="bi bi-person me-2"></i> Perfil
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleNavigation('/configuracion')}>
              <i className="bi bi-gear me-2"></i> Configuración
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item" onClick={() => handleNavigation('/login')}>
              <i className="bi bi-box-arrow-right me-2"></i> Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;