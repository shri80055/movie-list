// SkeletonLoader.js
import React from 'react';
import '../css/SkeletonLoader.css'; // Assuming you will add the styles in this file

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
    </div>
  );
};

export default SkeletonLoader;
