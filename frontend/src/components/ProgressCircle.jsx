import React from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ 
  percentage = 0, 
  size = 120, 
  strokeWidth = 8,
  color = '#3B82F6',
  children
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-circle" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="progress-circle-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress-circle-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: color }}
        />
      </svg>
      <div className="progress-circle-content">
        {children || <span className="progress-percentage">{percentage}%</span>}
      </div>
    </div>
  );
};

export default ProgressCircle;
