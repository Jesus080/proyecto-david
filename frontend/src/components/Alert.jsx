import React from 'react';
import './Alert.css';

const Alert = ({ 
  type = 'info', // 'success', 'warning', 'danger', 'info'
  title,
  message,
  onClose,
  icon,
  className = ''
}) => {
  const getDefaultIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠️';
      case 'danger':
        return '✕';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div className={`alert alert-${type} ${className}`}>
      <div className="alert-icon">{icon || getDefaultIcon()}</div>
      <div className="alert-content">
        {title && <h4 className="alert-title">{title}</h4>}
        <p className="alert-message">{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="alert-close">
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;
