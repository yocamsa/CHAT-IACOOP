import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUserRole, deleteUser } from '../../services/adminService';
import { useApp } from '../../context/AppContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { signOut, setCurrentView } = useApp();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('usuario');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      // Sort: admins first, then by date
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
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    setError(null);
    setSuccess(null);

    try {
      await createUser(email, password, role, avatarUrl);
      setSuccess(`Usuario ${email} creado exitosamente.`);
      setEmail('');
      setPassword('');
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
          {/* Formulario de Creación */}
          <div className="admin-card create-user-card">
            <h2 className="admin-card-title">Crear Nuevo Usuario</h2>
            <form onSubmit={handleCreateUser} className="admin-form">
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
              <div className="form-group">
                <label>Logo de la Corporativa (Opcional)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                          // Redimensionar imagen para que no pese mucho en la base de datos
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
                          
                          // Convertir a base64 (texto)
                          const dataUrl = canvas.toDataURL('image/png');
                          setAvatarUrl(dataUrl);
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
                      style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'contain', border: '1px solid var(--color-primary)' }} 
                    />
                  )}
                </div>
                <small style={{ color: 'var(--color-text-secondary)', fontSize: '11px', marginTop: '4px' }}>Sube una imagen PNG o JPG. Se adaptará automáticamente.</small>
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="usuario">Usuario Normal</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <button type="submit" className="admin-btn-primary" disabled={isCreating}>
                {isCreating ? 'Creando...' : 'Crear Usuario'}
              </button>
            </form>
          </div>

          {/* Lista de Usuarios */}
          <div className="admin-card users-list-card">
            <h2 className="admin-card-title">Usuarios Registrados ({users.length})</h2>
            
            {loading ? (
              <p>Cargando usuarios...</p>
            ) : (
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Fecha de Creación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="user-email">{user.email}</td>
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
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="admin-btn-danger"
                            onClick={() => handleDeleteUser(user.id, user.email)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
