import React, { useState, useEffect, useCallback } from 'react';
import { getAllUsers, createUser, updateUserRole, updateUserLimit, deleteUser, updateUserProfile } from '../../services/adminService';
import { useApp } from '../../context/AppContext';
import './AdminDashboard.css';

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

const AdminDashboard = () => {
  const { signOut, setCurrentView } = useApp();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form state
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entity, setEntity] = useState('');
  const [position, setPosition] = useState('');
  const [countryCode, setCountryCode] = useState('+57');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [want_contact, setWant_contact] = useState(true);
  const [role, setRole] = useState('usuario');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [limitUpdates, setLimitUpdates] = useState({});

  // Edit modal state
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    entity: '',
    position: '',
    countryCode: '+57',
    whatsappNumber: '',
    want_contact: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data.sort((a, b) => {
        if (a.role === 'admin' && b.role !== 'admin') return -1;
        if (a.role !== 'admin' && b.role === 'admin') return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);
    setSuccess(null);

    const fullWhatsapp = `${countryCode}${whatsappNumber}`;

    try {
      await createUser(email, password, role, avatarUrl, {
        first_name,
        last_name,
        entity,
        position,
        whatsapp: fullWhatsapp,
        want_contact,
      });
      setSuccess(`Usuario ${email} creado exitosamente.`);
      // Reset form
      setFirst_name('');
      setLast_name('');
      setEmail('');
      setPassword('');
      setEntity('');
      setPosition('');
      setCountryCode('+57');
      setWhatsappNumber('');
      setWant_contact(true);
      setRole('usuario');
      setAvatarUrl('');
      fetchUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${userEmail}?`)) return;
    try {
      await deleteUser(userId);
      setSuccess('Usuario eliminado exitosamente.');
      fetchUsers();
    } catch (err) {
      setError('Error eliminando usuario: ' + err.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setSuccess('Rol actualizado exitosamente.');
      fetchUsers();
    } catch (err) {
      setError('Error actualizando rol: ' + err.message);
    }
  };

  const handleLimitChange = (userId, value) => {
    setLimitUpdates((prev) => ({ ...prev, [userId]: value }));
  };

  const handleLimitSave = async (userId) => {
    const rawValue = limitUpdates[userId];
    const parsed = Number(rawValue);
    if (Number.isNaN(parsed) || parsed < 0) {
      setError('El límite debe ser un número válido mayor o igual a 0.');
      return;
    }
    try {
      await updateUserLimit(userId, parsed);
      setSuccess('Límite actualizado exitosamente.');
      fetchUsers();
    } catch (err) {
      setError('Error actualizando límite: ' + err.message);
    }
  };

  const getInitials = (firstName, lastName) => {
    const f = (firstName || '')[0] || '';
    const l = (lastName || '')[0] || '';
    return (f + l).toUpperCase() || '?';
  };

  // ── Edit Modal ────────────────────────────

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

  const openEditModal = (user) => {
    const { countryCode, number } = parseWhatsapp(user.whatsapp);
    setEditForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      entity: user.entity || '',
      position: user.position || '',
      countryCode,
      whatsappNumber: number,
      want_contact: user.want_contact || false,
    });
    setEditingUser(user);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editingUser) return;
    setIsEditing(true);
    setError(null);
    setSuccess(null);

    const fullWhatsapp = `${editForm.countryCode}${editForm.whatsappNumber}`;

    try {
      await updateUserProfile(editingUser.id, {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        entity: editForm.entity,
        position: editForm.position,
        whatsapp: fullWhatsapp,
        want_contact: editForm.want_contact,
      });
      setSuccess(`Perfil de ${editingUser.email} actualizado exitosamente.`);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setError('Error actualizando perfil: ' + err.message);
    } finally {
      setIsEditing(false);
    }
  };

  const closeEditModal = () => {
    setEditingUser(null);
  };

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header-left">
          <button className="back-to-app-btn" onClick={() => setCurrentView('app')}>
            ← Volver a la App
          </button>
          <div className="logo">
            <span className="logo-icon">👑</span>
            <span className="logo-text">Panel de Administración</span>
          </div>
        </div>
        <button className="logout-btn" onClick={signOut}>
          Cerrar Sesión
        </button>
      </header>

      <main className="admin-main">
        {error && <div className="admin-alert error">{error}</div>}
        {success && <div className="admin-alert success">{success}</div>}

        <div className="admin-grid">
          {/* --- Formulario de Creación --- */}
          <div className="admin-card create-user-card">
            <h2 className="admin-card-title">Crear Nuevo Usuario</h2>
            <form onSubmit={handleCreateUser} className="admin-form">
              {/* Datos Personales */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>👤</span> Datos Personales
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirst_name(e.target.value)}
                      required
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      value={last_name}
                      onChange={(e) => setLast_name(e.target.value)}
                      required
                      placeholder="Apellido"
                    />
                  </div>
                </div>
              </div>

              {/* Acceso */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>🔐</span> Acceso
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="usuario@ejemplo.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                    />
                  </div>
                </div>
              </div>

              {/* Información Laboral */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>🏢</span> Información Laboral
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Entidad / Empresa</label>
                    <input
                      type="text"
                      value={entity}
                      onChange={(e) => setEntity(e.target.value)}
                      required
                      placeholder="Nombre de la entidad"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cargo</label>
                    <input
                      type="text"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      required
                      placeholder="Cargo"
                    />
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>📱</span> Contacto
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <div className="whatsapp-group">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="country-code-select"
                    >
                      {COUNTRY_CODES.map((cc) => (
                        <option key={cc.code} value={cc.code}>
                          {cc.flag} {cc.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      required
                      placeholder="300 123 45 67"
                      className="whatsapp-input"
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 'var(--space-sm)' }}>
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={want_contact}
                      onChange={(e) => setWant_contact(e.target.checked)}
                    />
                    <span className="admin-checkbox-custom" />
                    <span>
                      Interesado en conocer más de <strong>IA-COOP-LAB</strong>
                    </span>
                  </label>
                </div>
              </div>

              {/* Configuración */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>⚙️</span> Configuración
                </div>
                <div className="form-group">
                  <label>Rol</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="usuario">Usuario Normal</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Logo de la Corporativa (Opcional)</label>
                  <div className="admin-avatar-upload">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const MAX_SIZE = 150;
                            let width = img.width;
                            let height = img.height;
                            if (width > height) {
                              if (width > MAX_SIZE) {
                                height *= MAX_SIZE / width;
                                width = MAX_SIZE;
                              }
                            } else {
                              if (height > MAX_SIZE) {
                                width *= MAX_SIZE / height;
                                height = MAX_SIZE;
                              }
                            }
                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0, width, height);
                            setAvatarUrl(canvas.toDataURL('image/png'));
                          };
                          img.src = event.target.result;
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt="Vista previa"
                        className="admin-avatar-preview"
                      />
                    )}
                  </div>
                  <small className="admin-field-hint">PNG o JPG. Se adaptará automáticamente (150px máx).</small>
                </div>
              </div>

              <button type="submit" className="admin-btn-primary" disabled={isCreating}>
                {isCreating ? 'Creando...' : 'Crear Usuario'}
              </button>
            </form>
          </div>

          {/* --- Lista de Usuarios --- */}
          <div className="admin-card users-list-card">
            <h2 className="admin-card-title">Usuarios Registrados ({users.length})</h2>

            {loading ? (
              <p className="admin-loading">Cargando usuarios...</p>
            ) : (
              <>
                {/* Vista Desktop: Tabla */}
                <div className="users-table-container desktop-table">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Entidad</th>
                        <th>Rol</th>
                        <th>Contacto</th>
                        <th>Mensajes</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="user-name-cell">
                              <span className="user-avatar-initials">
                                {getInitials(user.first_name, user.last_name)}
                              </span>
                              <span className="user-full-name">
                                {user.first_name || user.last_name
                                  ? `${user.first_name || ''} ${user.last_name || ''}`
                                  : '—'}
                              </span>
                            </div>
                          </td>
                          <td className="user-email">{user.email}</td>
                          <td className="user-entity">{user.entity || '—'}</td>
                          <td>
                            <select
                              value={user.role}
                              onChange={(e) => handleRoleChange(user.id, e.target.value)}
                              className={`role-badge ${user.role}`}
                            >
                              <option value="admin">Admin</option>
                              <option value="usuario">Usuario</option>
                            </select>
                          </td>
                          <td>
                            {user.want_contact ? (
                              <span className="contact-badge" title={user.whatsapp || 'Sin WhatsApp'}>
                                📱 Sí
                              </span>
                            ) : (
                              <span className="contact-badge no-contact">No</span>
                            )}
                          </td>
                          <td>
                            <div className="messages-cell">
                              <input
                                type="number"
                                min="0"
                                value={limitUpdates[user.id] ?? user.messages_left ?? 0}
                                onChange={(e) => handleLimitChange(user.id, e.target.value)}
                                className="limit-input"
                              />
                            </div>
                          </td>
                          <td className="user-date">{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="actions-cell">
                              <button
                                className="admin-btn-edit"
                                onClick={() => openEditModal(user)}
                                title="Editar perfil"
                              >
                                Editar
                              </button>
                              <button
                                className="admin-btn-primary btn-sm"
                                onClick={() => handleLimitSave(user.id)}
                              >
                                Guardar
                              </button>
                              <button
                                className="admin-btn-danger"
                                onClick={() => handleDeleteUser(user.id, user.email)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Vista Mobile: Cards */}
                <div className="users-cards-container mobile-cards">
                  {users.map((user) => (
                    <div key={user.id} className="user-card">
                      <div className="user-card-header">
                        <span className="user-avatar-initials">
                          {getInitials(user.first_name, user.last_name)}
                        </span>
                        <div className="user-card-name">
                          <strong>
                            {user.first_name || user.last_name
                              ? `${user.first_name || ''} ${user.last_name || ''}`
                              : 'Sin nombre'}
                          </strong>
                          <span className="user-card-email">{user.email}</span>
                        </div>
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className={`role-badge ${user.role}`}
                        >
                          <option value="admin">Admin</option>
                          <option value="usuario">Usuario</option>
                        </select>
                      </div>
                      <div className="user-card-body">
                        <div className="user-card-info">
                          <span>🏢 {user.entity || '—'}</span>
                          {user.want_contact && <span>📱 {user.whatsapp || 'Sí'}</span>}
                          <span>📅 {new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="user-card-actions">
                          <div className="messages-cell">
                            <label>Mensajes:</label>
                            <input
                              type="number"
                              min="0"
                              value={limitUpdates[user.id] ?? user.messages_left ?? 0}
                              onChange={(e) => handleLimitChange(user.id, e.target.value)}
                              className="limit-input"
                            />
                          </div>
                          <div className="user-card-buttons">
                            <button
                              className="admin-btn-edit btn-sm"
                              onClick={() => openEditModal(user)}
                            >
                              Editar
                            </button>
                            <button
                              className="admin-btn-primary btn-sm"
                              onClick={() => handleLimitSave(user.id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="admin-btn-danger"
                              onClick={() => handleDeleteUser(user.id, user.email)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* ── Modal de edición de usuario ── */}
      {editingUser && (
        <div className="admin-modal-overlay" onClick={closeEditModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>
                Editar Usuario
                <span className="admin-modal-subtitle">{editingUser.email}</span>
              </h3>
              <button type="button" className="admin-modal-close" onClick={closeEditModal}>
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSave} className="admin-form">
              {/* Datos Personales */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>👤</span> Datos Personales
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input
                      type="text"
                      name="first_name"
                      value={editForm.first_name}
                      onChange={handleEditChange}
                      required
                      placeholder="Nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellido</label>
                    <input
                      type="text"
                      name="last_name"
                      value={editForm.last_name}
                      onChange={handleEditChange}
                      required
                      placeholder="Apellido"
                    />
                  </div>
                </div>
              </div>

              {/* Información Laboral */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>🏢</span> Información Laboral
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label>Entidad / Empresa</label>
                    <input
                      type="text"
                      name="entity"
                      value={editForm.entity}
                      onChange={handleEditChange}
                      required
                      placeholder="Nombre de la entidad"
                    />
                  </div>
                  <div className="form-group">
                    <label>Cargo</label>
                    <input
                      type="text"
                      name="position"
                      value={editForm.position}
                      onChange={handleEditChange}
                      required
                      placeholder="Cargo"
                    />
                  </div>
                </div>
              </div>

              {/* Contacto */}
              <div className="admin-form-section">
                <div className="admin-form-section-header">
                  <span>📱</span> Contacto
                </div>
                <div className="form-group">
                  <label>WhatsApp</label>
                  <div className="whatsapp-group">
                    <select
                      name="countryCode"
                      value={editForm.countryCode}
                      onChange={handleEditChange}
                      className="country-code-select"
                    >
                      {COUNTRY_CODES.map((cc) => (
                        <option key={cc.code} value={cc.code}>
                          {cc.flag} {cc.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={editForm.whatsappNumber}
                      onChange={handleEditChange}
                      required
                      placeholder="300 123 45 67"
                      className="whatsapp-input"
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 'var(--space-sm)' }}>
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      name="want_contact"
                      checked={editForm.want_contact}
                      onChange={handleEditChange}
                    />
                    <span className="admin-checkbox-custom" />
                    <span>
                      Interesado en conocer más de <strong>IA-COOP-LAB</strong>
                    </span>
                  </label>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button type="button" className="admin-btn-cancel" onClick={closeEditModal}>
                  Cancelar
                </button>
                <button type="submit" className="admin-btn-primary" disabled={isEditing}>
                  {isEditing ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
