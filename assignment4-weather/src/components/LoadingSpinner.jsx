import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="weather-spinner-wrapper">
      <div className="weather-spinner-radar">
        <span className="weather-radar-icon">📡</span>
      </div>
      <p className="weather-spinner-text">
        Querying atmospheric satellites & weather stations...
      </p>
    </div>
  );
};

export default LoadingSpinner;
