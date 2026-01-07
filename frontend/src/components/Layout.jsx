import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">💰 Gestor de Gastos</h1>
            <div className="header-actions">
              <button 
                onClick={toggleTheme} 
                className="theme-toggle"
                title={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                aria-label="Cambiar tema"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <div className="user-menu">
                <span className="user-name">👤 {user?.name}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <ul className="nav-list">
            <li>
              <Link to="/" className={isActive('/') ? 'active' : ''}>
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link to="/expenses" className={isActive('/expenses') ? 'active' : ''}>
                💸 Gastos
              </Link>
            </li>
            <li>
              <Link to="/categories" className={isActive('/categories') ? 'active' : ''}>
                🏷️ Categorías
              </Link>
            </li>
            <li>
              <Link to="/stats" className={isActive('/stats') ? 'active' : ''}>
                📈 Estadísticas
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;
