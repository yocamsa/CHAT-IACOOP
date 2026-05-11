// Componente Header con selector de usuario y perfil
import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { updateUserProfile } from "../../services/adminService";
import "./Header.css";
import iacooplogo from "../../assets/IA-COOP-LAB.jpeg";
import logoCygnus from "../../assets/CygnusLogo.png";

const COUNTRY_CODES = [
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '+507', country: 'Panamá', flag: '🇵🇦' },
  { code: '+506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '+1', country: 'EE. UU. / Canadá', flag: '🇺🇸' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
];

const Header = () => {
  const {
    currentUser,
    changeUser,
    users,
    isApiConfigured,
    signOut,
    userRole,
    userAvatar,
    userProfile,
    refreshProfile,
    setCurrentView,
    session,
  } = useApp();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ── Profile Edit State ──────────────────────
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    entity: '',
    position: '',
    countryCode: '+57',
    whatsappNumber: '',
    want_contact: false,
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);

  const parseWhatsapp = (fullNumber) => {
    if (!fullNumber) return { countryCode: '+57', number: '' };
    const sorted = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length);
    for (const cc of sorted) {
      if (fullNumber.startsWith(cc.code)) {
        return { countryCode: cc.code, number: fullNumber.slice(cc.code.length) };
      }
    }
    return { countryCode: '+57', number: fullNumber };
  };

  const openProfileModal = () => {
    const { countryCode, number } = parseWhatsapp(userProfile.whatsapp);
    setProfileForm({
      first_name: userProfile.first_name || '',
      last_name: userProfile.last_name || '',
      entity: userProfile.entity || '',
      position: userProfile.position || '',
      countryCode,
      whatsappNumber: number,
      want_contact: userProfile.want_contact || false,
    });
    setProfileError(null);
    setProfileSuccess(null);
    setShowProfileModal(true);
  };

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) return;
    setSavingProfile(true);
    setProfileError(null);
    setProfileSuccess(null);

    const fullWhatsapp = `${profileForm.countryCode}${profileForm.whatsappNumber}`;

    try {
      await updateUserProfile(session.user.id, {
        first_name: profileForm.first_name,
        last_name: profileForm.last_name,
        entity: profileForm.entity,
        position: profileForm.position,
        whatsapp: fullWhatsapp,
        want_contact: profileForm.want_contact,
      });
      setProfileSuccess('Perfil actualizado exitosamente.');
      refreshProfile();
      setTimeout(() => setShowProfileModal(false), 1200);
    } catch (err) {
      setProfileError(err.message || 'Error al actualizar perfil');
    } finally {
      setSavingProfile(false);
    }
  };

  const getInitials = (firstName, lastName) => {
    const f = (firstName || '')[0] || '';
    const l = (lastName || '')[0] || '';
    return (f + l).toUpperCase() || (session?.user?.email?.[0]?.toUpperCase() || '?');
  };

  const displayName = userProfile.first_name || userProfile.last_name
    ? `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim()
    : session?.user?.email?.split('@')[0] || 'Usuario';

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          {userAvatar ? (
            <img src={userAvatar} alt="Logo Corporativa" className="company-logo" />
          ) : (
            <img src={logoCygnus} alt="Logo Corporativa" className="company-logo" />
          )}
          <img src={iacooplogo} alt="Logo IA-COOP" className="cooplab-logo" />
        </div>
        <span className="logo-subtitle">Asistente Financiero Inteligente</span>
      </div>

      <div className="header-right">
        {/* Indicador de API */}
        <div className={`api-status ${isApiConfigured ? "connected" : "disconnected"}`}>
          <span className="status-dot"></span>
          <span className="status-text">
            {isApiConfigured ? "DeepSeek AI" : "Modo Demo"}
          </span>
        </div>

        {/* Rol del usuario real */}
        <div className={`user-role-badge ${userRole || "usuario"}`}>
          {userRole === "admin" ? "Administrador" : "Usuario Normal"}
        </div>

        {/* Perfil — botón con iniciales */}
        <button className="profile-btn" onClick={openProfileModal} title="Mi Perfil">
          <span className="profile-initials">{getInitials(userProfile.first_name, userProfile.last_name)}</span>
          <span className="profile-name">{displayName}</span>
        </button>

        {/* Selector de usuario (mock para el chat demo) */}
        <div className={`user-selector ${isDropdownOpen ? "open" : ""}`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div className="current-user" title="Perfil de Prueba para el Chat">
            <img src={currentUser.avatar} alt={currentUser.nombre} className="user-avatar" />
            <div className="user-info">
              <span className="user-name">{currentUser.nombre}</span>
              <span className="user-label" style={{ fontSize: "11px", color: "var(--color-text-secondary)" }}>
                Perfil de Prueba
              </span>
            </div>
          </div>

          <div className="dropdown-menu">
            {users.map((user) => (
              <button key={user.id}
                className={`dropdown-item ${user.id === currentUser.id ? "active" : ""}`}
                onClick={(e) => { e.stopPropagation(); changeUser(user.id); setIsDropdownOpen(false); }}>
                <img src={user.avatar} alt={user.nombre} className="dropdown-avatar" />
                <div className="dropdown-info">
                  <span className="dropdown-name">{user.nombre}</span>
                  <span className="dropdown-health">{user.nivelSaludFinanciera}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {userRole === "admin" && (
          <button onClick={() => setCurrentView("admin")} className="admin-panel-btn">
            Panel de Admin
          </button>
        )}

        <button onClick={signOut} className="logout-btn">
          Cerrar Sesión
        </button>
      </div>

      {/* ── Modal de edición de perfil ── */}
      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <div className="profile-modal-header">
              <div className="profile-modal-header-info">
                <span className="profile-modal-icon">👤</span>
                <div>
                  <h3>Mi Perfil</h3>
                  <span className="profile-modal-email">{session?.user?.email}</span>
                </div>
              </div>
              <button type="button" className="profile-modal-close" onClick={() => setShowProfileModal(false)}>
                ✕
              </button>
            </div>

            {profileError && <div className="profile-modal-alert error">{profileError}</div>}
            {profileSuccess && <div className="profile-modal-alert success">{profileSuccess}</div>}

            <form onSubmit={handleProfileSave} className="profile-form">
              {/* Datos Personales */}
              <div className="profile-form-section">
                <div className="profile-form-section-header">
                  <span>👤</span> Datos Personales
                </div>
                <div className="profile-form-row">
                  <div className="profile-field">
                    <label>Nombre</label>
                    <input type="text" name="first_name" value={profileForm.first_name}
                      onChange={handleProfileChange} required placeholder="Tu nombre" />
                  </div>
                  <div className="profile-field">
                    <label>Apellido</label>
                    <input type="text" name="last_name" value={profileForm.last_name}
                      onChange={handleProfileChange} required placeholder="Tu apellido" />
                  </div>
                </div>
              </div>

              {/* Información Laboral */}
              <div className="profile-form-section">
                <div className="profile-form-section-header">
                  <span>🏢</span> Información Laboral
                </div>
                <div className="profile-form-row">
                  <div className="profile-field">
                    <label>Entidad / Empresa</label>
                    <input type="text" name="entity" value={profileForm.entity}
                      onChange={handleProfileChange} required placeholder="Nombre de tu entidad" />
                  </div>
                  <div className="profile-field">
                    <label>Cargo</label>
                    <input type="text" name="position" value={profileForm.position}
                      onChange={handleProfileChange} required placeholder="Tu cargo" />
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="profile-form-section">
                <div className="profile-form-section-header">
                  <span>📱</span> Contacto
                </div>
                <div className="profile-field">
                  <label>WhatsApp</label>
                  <div className="whatsapp-group">
                    <select name="countryCode" value={profileForm.countryCode}
                      onChange={handleProfileChange} className="country-code-select">
                      {COUNTRY_CODES.map((cc) => (
                        <option key={cc.code} value={cc.code}>{cc.flag} {cc.code}</option>
                      ))}
                    </select>
                    <input type="tel" name="whatsappNumber" value={profileForm.whatsappNumber}
                      onChange={handleProfileChange} required placeholder="300 123 45 67" className="whatsapp-input" />
                  </div>
                </div>
                <div className="profile-field" style={{ marginTop: '12px' }}>
                  <label className="profile-checkbox-label">
                    <input type="checkbox" name="want_contact" checked={profileForm.want_contact}
                      onChange={handleProfileChange} />
                    <span className="profile-checkbox-custom" />
                    <span>Quiero ser contactado para conocer más sobre <strong>IA-COOP-LAB</strong></span>
                  </label>
                </div>
              </div>

              <div className="profile-modal-footer">
                <button type="button" className="profile-btn-cancel" onClick={() => setShowProfileModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="profile-btn-save" disabled={savingProfile}>
                  {savingProfile ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
