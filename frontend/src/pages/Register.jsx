import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState(() => {
    // Restaurar valores desde localStorage si existen
    const saved = localStorage.getItem('registerFormData');
    return saved ? JSON.parse(saved) : { name: '', email: '', password: '', confirmPassword: '' };
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Guardar formData en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('registerFormData', JSON.stringify(formData));
  }, [formData]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Ingresa un correo electrónico válido');
      } else {
        setEmailError('');
      }
    }

    if (name === 'confirmPassword' || name === 'password') {
      if (formData.password && value !== formData.password) {
        setPasswordError('Las contraseñas no coinciden');
      } else {
        setPasswordError('');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      setSuccessMessage('¡Cuenta creada exitosamente! 🎉');
      // Limpiar localStorage al registro exitoso
      localStorage.removeItem('registerFormData');
      // Navegar después de un breve delay para mostrar el mensaje
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  const closeError = () => {
    setError('');
  };

  const closeSuccess = () => {
    setSuccessMessage('');
  };

  return (
    <div className="auth-container">
      {/* Estructura Invertida: Register (Welcome Izquierda - Formulario Derecha) */}
      <div className="auth-card inverted">
        
        <div className="auth-side-form">
          <h2>Crear Cuenta 🚀</h2>
          <p>Únete y empieza a ahorrar hoy mismo</p>

          {error && (
            <div className="error-banner">
              {error}
              <button onClick={closeError} className="error-close-btn">✕</button>
            </div>
          )}

          {successMessage && (
            <div className="success-banner">
              {successMessage}
              <button onClick={closeSuccess} className="success-close-btn">✕</button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
            <div className="form-group">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Tu nombre completo"
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Correo</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${emailError ? 'input-error' : ''}`}
                required
                placeholder="tu@email.com"
                autoComplete="email"
              />
              {emailError && <div className="field-error">{emailError}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="••••••••"
                  minLength={6}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
               <small style={{display:'block', marginTop:'0.25rem', color:'#94a3b8', fontSize:'0.85rem'}}>Mínimo 6 caracteres</small>
            </div>

            <div className="form-group">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`form-input ${passwordError ? 'input-error' : ''}`}
                required
                placeholder="••••••••"
                minLength={6}
                autoComplete="new-password"
              />
              {passwordError && <div className="field-error">{passwordError}</div>}
            </div>

            <button
              type="submit"
              className="btn-modern"
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </form>

          <p className="auth-footer">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>

        <div className="auth-side-welcome">
          <div className="welcome-content">
            <h1 className="welcome-title">Bienvenido a Bordo!</h1>
            <p className="welcome-text">
              Regístrate para acceder a herramientas avanzadas de gestión financiera.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
