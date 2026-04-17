// Componente Header con selector de usuario
import React from 'react';
import { useApp } from '../../context/AppContext';
import './Header.css';

const Header = () => {
  const { currentUser, changeUser, users, isApiConfigured } = useApp();

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🤖</span>
          <span className="logo-text">IA-COOP</span>
        </div>
        <span className="logo-subtitle">Asistente Financiero Inteligente</span>
      </div>

      <div className="header-right">
        {/* Indicador de API */}
        <div className={`api-status ${isApiConfigured ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          <span className="status-text">
            {isApiConfigured ? 'DeepSeek AI' : 'Modo Demo'}
          </span>
        </div>

        {/* Selector de usuario */}
        <div className="user-selector">
          <div className="current-user">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.nombre} 
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">{currentUser.nombre}</span>
              <span className="user-label">Usuario Demo</span>
            </div>
          </div>
          
          <div className="dropdown-menu">
            {users.map(user => (
              <button
                key={user.id}
                className={`dropdown-item ${user.id === currentUser.id ? 'active' : ''}`}
                onClick={() => changeUser(user.id)}
              >
                <img src={user.avatar} alt={user.nombre} className="dropdown-avatar" />
                <div className="dropdown-info">
                  <span className="dropdown-name">{user.nombre}</span>
                  <span className="dropdown-health">{user.nivelSaludFinanciera}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;