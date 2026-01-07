import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState(() => {
    // Restaurar valores desde localStorage si existen
    const saved = localStorage.getItem('loginFormData');
    return saved ? JSON.parse(saved) : { email: '', password: '' };
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Guardar formData en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('loginFormData', JSON.stringify(formData));
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
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      await login(formData.email, formData.password);
      setSuccessMessage('¡Bienvenido de vuelta! 🎉');
      // Limpiar localStorage al login exitoso
      localStorage.removeItem('loginFormData');
      // Navegar después de un breve delay para mostrar el mensaje
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales incorrectas. Verifica tu email y contraseña.');
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
      <div className="auth-card">
        
        {/* Lado Izquierdo: Formulario */}
        <div className="auth-side-form">
          <h2>¡Hola de nuevo! 👋</h2>
          <p>Ingresa tus credenciales para continuar</p>

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
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-modern"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="auth-footer">
            ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
          </p>
        </div>

        {/* Lado Derecho: Welcome Cyan */}
        <div className="auth-side-welcome">
          <div className="welcome-content">
            <h1 className="welcome-title">Gestor de Gastos!</h1>
            <p className="welcome-text">
              Toma el control de tus finanzas personales de manera inteligente y visual.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
