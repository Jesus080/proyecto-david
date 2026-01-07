import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type = 'text', width, height, count = 1, className = '' }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`skeleton skeleton-${type} ${className}`}
      style={{ width, height }}
    />
  ));

  return <>{skeletons}</>;
};

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card-header">
      <Skeleton type="circle" width="48px" height="48px" />
      <div className="skeleton-card-content">
        <Skeleton type="text" width="60%" height="20px" />
        <Skeleton type="text" width="40%" height="16px" />
      </div>
    </div>
    <Skeleton type="text" width="100%" height="12px" count={2} />
    <div className="skeleton-card-footer">
      <Skeleton type="button" width="80px" height="32px" />
      <Skeleton type="button" width="80px" height="32px" />
    </div>
  </div>
);

export const SkeletonStats = () => (
  <div className="skeleton-stats-grid">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="skeleton-stat-card">
        <Skeleton type="circle" width="56px" height="56px" />
        <div className="skeleton-stat-content">
          <Skeleton type="text" width="70%" height="14px" />
          <Skeleton type="text" width="90%" height="28px" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonList = ({ count = 5 }) => (
  <div className="skeleton-list">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="skeleton-list-item">
        <Skeleton type="circle" width="40px" height="40px" />
        <div className="skeleton-list-content">
          <Skeleton type="text" width="70%" height="18px" />
          <Skeleton type="text" width="50%" height="14px" />
        </div>
        <Skeleton type="text" width="80px" height="24px" />
      </div>
    ))}
  </div>
);

export default Skeleton;
