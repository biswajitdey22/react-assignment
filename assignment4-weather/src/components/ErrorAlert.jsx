import React from 'react';

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="weather-error-card">
      <div className="weather-error-icon-box">
        <span>⚠️</span>
      </div>
      <div className="weather-error-content">
        <h4 className="weather-error-title">Meteorological Query Error</h4>
        <p className="weather-error-msg">{message}</p>
        {onRetry && (
          <div className="weather-error-actions">
            <button type="button" className="weather-retry-btn" onClick={onRetry}>
              🔄 Retry Fetch
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
