import React, { useState } from 'react';
import { supabase } from '../../services/supabase';
import { updateProfileFields } from '../../services/adminService';
import './Login.css';

// Códigos de país para WhatsApp
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
  { code: '+502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '+503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '+504', country: 'Honduras', flag: '🇭🇳' },
  { code: '+505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '+591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '+595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '+598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '+53', country: 'Cuba', flag: '🇨🇺' },
  { code: '+1', country: 'EE. UU. / Canadá', flag: '🇺🇸' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+1809', country: 'República Dominicana', flag: '🇩🇴' },
];

const RegisterForm = ({ onToggle, onSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    entity: '',
    position: '',
    countryCode: '+57',
    whatsappNumber: '',
    want_contact: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const fullWhatsapp = `${formData.countryCode}${formData.whatsappNumber}`;

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            entity: formData.entity,
            position: formData.position,
            whatsapp: fullWhatsapp,
            want_contact: formData.want_contact,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Si hay sesión (auto-confirm), actualizamos perfil directamente
      if (data?.user) {
        // También actualizamos por si acaso el trigger no alcanzó a leer metadata
        try {
          await updateProfileFields(data.user.id, {
            first_name: formData.first_name,
            last_name: formData.last_name,
            entity: formData.entity,
            position: formData.position,
            whatsapp: fullWhatsapp,
            want_contact: formData.want_contact,
          });
        } catch (profileErr) {
          console.warn('Profile update warning (non-critical):', profileErr);
        }
      }

      if (data?.session) {
        // Sesión iniciada automáticamente
        onSuccess && onSuccess();
      } else {
        // Confirmación de email requerida
        setSuccessMsg(
          'Cuenta creada exitosamente. Revisa tu correo electrónico para confirmar tu registro.'
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form register-form">
      {error && <div className="login-error">{error}</div>}
      {successMsg && <div className="login-success">{successMsg}</div>}

      {/* Sección: Datos Personales */}
      <div className="form-section">
        <div className="form-section-header">
          <span className="form-section-icon">👤</span>
          <span>Datos Personales</span>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="first_name">Nombre</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Apellido</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              required
              placeholder="Tu apellido"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="reg-email">Correo Electrónico</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="tu@correo.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="reg-password">Contraseña</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Mínimo 6 caracteres"
              minLength={6}
            />
          </div>
        </div>
      </div>

      {/* Sección: Información Laboral */}
      <div className="form-section">
        <div className="form-section-header">
          <span className="form-section-icon">🏢</span>
          <span>Información Laboral</span>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="entity">Entidad / Empresa</label>
            <input
              id="entity"
              name="entity"
              type="text"
              value={formData.entity}
              onChange={handleChange}
              required
              placeholder="Nombre de tu entidad"
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">Cargo</label>
            <input
              id="position"
              name="position"
              type="text"
              value={formData.position}
              onChange={handleChange}
              required
              placeholder="Tu cargo"
            />
          </div>
        </div>
      </div>

      {/* Sección: Contacto */}
      <div className="form-section">
        <div className="form-section-header">
          <span className="form-section-icon">📱</span>
          <span>Contacto</span>
        </div>
        <div className="form-group">
          <label htmlFor="whatsappNumber">WhatsApp</label>
          <div className="whatsapp-group">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="country-code-select"
              required
            >
              {COUNTRY_CODES.map((cc) => (
                <option key={cc.code} value={cc.code}>
                  {cc.flag} {cc.code} ({cc.country})
                </option>
              ))}
            </select>
            <input
              id="whatsappNumber"
              name="whatsappNumber"
              type="tel"
              value={formData.whatsappNumber}
              onChange={handleChange}
              required
              placeholder="300 123 45 67"
              className="whatsapp-input"
            />
          </div>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="want_contact"
              checked={formData.want_contact}
              onChange={handleChange}
            />
            <span className="checkbox-custom" />
            <span className="checkbox-text">
              Quiero ser contactado para conocer más sobre <strong>IA-COOP-LAB</strong>
            </span>
          </label>
        </div>
      </div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? (
          <span className="btn-loading">
            <span className="spinner" />
            Creando cuenta...
          </span>
        ) : (
          'Crear Cuenta'
        )}
      </button>

      <div className="login-toggle">
        <button type="button" className="toggle-btn" onClick={onToggle}>
          ¿Ya tienes cuenta? <strong>Inicia sesión</strong>
        </button>
      </div>
    </form>
  );
};

const LoginForm = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      {error && <div className="login-error">{error}</div>}

      <div className="form-group">
        <label htmlFor="login-email">Correo Electrónico</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="tu@correo.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Contraseña</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="********"
        />
      </div>

      <button type="submit" className="login-btn" disabled={loading}>
        {loading ? 'Ingresando...' : 'Ingresar'}
      </button>

      <div className="login-toggle">
        <button type="button" className="toggle-btn" onClick={onToggle}>
          ¿No tienes cuenta? <strong>Regístrate</strong>
        </button>
      </div>
    </form>
  );
};

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="login-container">
      <div className={`login-card ${isRegistering ? 'register-card' : ''}`}>
        <div className="login-card-header">
          <div className="login-logo">
            <span className="login-logo-icon">🤝</span>
          </div>
          <h2 className="login-title">
            {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h2>
          <p className="login-subtitle">
            {isRegistering
              ? 'Completa tus datos para registrarte en IA-COOP'
              : 'Sistema de Servicio al Asociado IA-COOP'}
          </p>
        </div>

        {isRegistering ? (
          <RegisterForm
            onToggle={() => setIsRegistering(false)}
            onSuccess={() => {
              // La sesión se maneja automáticamente vía onAuthStateChange
            }}
          />
        ) : (
          <LoginForm
            onToggle={() => setIsRegistering(true)}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
