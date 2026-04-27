// Componente Header con selector de usuario
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import "./Header.css";
import iacooplogo from "../../assets/IA-COOP-LAB.jpeg";
import logoEBS from "../../assets/LogoEBS.jpeg";

const Header = () => {
  const {
    currentUser,
    changeUser,
    users,
    isApiConfigured,
    signOut,
    userRole,
    userAvatar,
    setCurrentView,
  } = useApp();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt="Logo Corporativa"
              className="company-logo"
            />
          ) : (
            <img
              src={logoEBS}
              alt="Logo Corporativa"
              className="company-logo"
            />
          )}
          <img src={iacooplogo} alt="Logo IA-COOP" className="cooplab-logo" />
        </div>
        <span className="logo-subtitle">Asistente Financiero Inteligente</span>
      </div>

      <div className="header-right">
        {/* Indicador de API */}
        <div
          className={`api-status ${isApiConfigured ? "connected" : "disconnected"}`}
        >
          <span className="status-dot"></span>
          <span className="status-text">
            {isApiConfigured ? "DeepSeek AI" : "Modo Demo"}
          </span>
        </div>

        {/* Rol del usuario real */}
        <div
          className={`user-role-badge ${userRole || "usuario"}`}
          style={{ fontSize: "13px", padding: "6px 12px" }}
        >
          {userRole === "admin" ? "Administrador" : "Usuario Normal"}
        </div>

        {/* Selector de usuario */}
        <div
          className={`user-selector ${isDropdownOpen ? "open" : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="current-user" title="Perfil de Prueba para el Chat">
            <img
              src={currentUser.avatar}
              alt={currentUser.nombre}
              className="user-avatar"
            />
            <div className="user-info">
              <span className="user-name">{currentUser.nombre}</span>
              <span
                className="user-label"
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-secondary)",
                }}
              >
                Perfil de Prueba
              </span>
            </div>
          </div>

          <div className="dropdown-menu">
            {users.map((user) => (
              <button
                key={user.id}
                className={`dropdown-item ${user.id === currentUser.id ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  changeUser(user.id);
                  setIsDropdownOpen(false);
                }}
              >
                <img
                  src={user.avatar}
                  alt={user.nombre}
                  className="dropdown-avatar"
                />
                <div className="dropdown-info">
                  <span className="dropdown-name">{user.nombre}</span>
                  <span className="dropdown-health">
                    {user.nivelSaludFinanciera}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {userRole === "admin" && (
          <button
            onClick={() => setCurrentView("admin")}
            className="admin-panel-btn"
          >
            Panel de Admin
          </button>
        )}

        <button onClick={signOut} className="logout-btn">
          Cerrar Sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
