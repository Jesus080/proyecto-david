import React from 'react';
import './EmptyState.css';

const EmptyState = ({ 
  icon = '📭', 
  title = 'No hay datos', 
  message = 'Aún no hay información para mostrar',
  action,
  actionLabel
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {action && actionLabel && (
        <button onClick={action} className="btn btn-primary empty-state-action">
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
