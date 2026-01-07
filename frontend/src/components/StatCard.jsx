import React from 'react';
import './StatCard.css';

const StatCard = ({ 
  icon, 
  label, 
  value, 
  trend, // 'up', 'down', 'neutral'
  trendValue,
  color = 'primary',
  className = ''
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
    }
  };

  const getTrendClass = () => {
    switch (trend) {
      case 'up':
        return 'stat-trend-up';
      case 'down':
        return 'stat-trend-down';
      default:
        return 'stat-trend-neutral';
    }
  };

  return (
    <div className={`stat-card stat-card-${color} ${className}`}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-body">
        <p className="stat-card-label">{label}</p>
        <h3 className="stat-card-value">{value}</h3>
        {trendValue && (
          <div className={`stat-trend ${getTrendClass()}`}>
            <span className="stat-trend-icon">{getTrendIcon()}</span>
            <span className="stat-trend-value">{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
