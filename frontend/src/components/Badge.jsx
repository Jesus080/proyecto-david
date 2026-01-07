import React from 'react';
import './Badge.css';

const Badge = ({ 
  children, 
  variant = 'default', // 'default', 'primary', 'success', 'danger', 'warning', 'info'
  size = 'md', // 'sm', 'md', 'lg'
  className = '',
  icon
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size} ${className}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
