import React from 'react';
import SearchBar from '../Components/searchbar';
import '../Components/formulario.css';
import SidebarAdmin from '../Components/sidebarAdmin';

const AdminHome = () => {
  return (
    <div className="app-container">
      <SidebarAdmin />
      
      <div className="main-content">
        <SearchBar />
        
        <div className="admin-panel">
          <h1>Panel de Administrador</h1>
          <div className="admin-actions">
            <button className="admin-btn">Gestionar Rutas</button>
            <button className="admin-btn">Gestionar Usuarios</button>
            <button className="admin-btn">Reportes</button>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default AdminHome;