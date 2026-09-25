import React from 'react';

const WeatherDetails = ({ weather }) => {
  // Humidity helper
  const getHumidityStatus = (val) => {
    if (val >= 70) return { label: 'Humid', class: 'high' };
    if (val >= 40) return { label: 'Optimal', class: 'optimal' };
    return { label: 'Dry Air', class: 'low' };
  };

  // Wind speed helper
  const getWindStatus = (speed) => {
    const s = parseFloat(speed) || 0;
    if (s > 8) return 'Strong Breeze';
    if (s > 4) return 'Moderate Breeze';
    return 'Gentle Air';
  };

  const hum = getHumidityStatus(weather.humidity);
  const windText = getWindStatus(weather.windSpeed);

  return (
    <section className="weather-details-section">
      <h3 className="weather-section-title">Atmospheric Observations</h3>
      <div className="weather-details-grid">
        {/* Humidity */}
        <div className="weather-detail-item">
          <div className="weather-detail-icon-box humidity">
            <span>💧</span>
          </div>
          <div className="weather-detail-body">
            <span className="weather-detail-label">Relative Humidity</span>
            <div className="weather-detail-val-row">
              <span className="weather-detail-val">{weather.humidity}%</span>
              <span className={`weather-metric-pill ${hum.class}`}>{hum.label}</span>
            </div>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="weather-detail-item">
          <div className="weather-detail-icon-box wind">
            <span>💨</span>
          </div>
          <div className="weather-detail-body">
            <span className="weather-detail-label">Wind Velocity</span>
            <div className="weather-detail-val-row">
              <span className="weather-detail-val">{weather.windSpeed} <small>m/s</small></span>
              <span className="weather-metric-pill wind">{windText}</span>
            </div>
          </div>
        </div>

        {/* Sunrise */}
        <div className="weather-detail-item">
          <div className="weather-detail-icon-box sunrise">
            <span>🌅</span>
          </div>
          <div className="weather-detail-body">
            <span className="weather-detail-label">Sunrise Time</span>
            <div className="weather-detail-val-row">
              <span className="weather-detail-val mono">{weather.sunrise}</span>
              <span className="weather-metric-pill dawn">Dawn</span>
            </div>
          </div>
        </div>

        {/* Sunset */}
        <div className="weather-detail-item">
          <div className="weather-detail-icon-box sunset">
            <span>🌇</span>
          </div>
          <div className="weather-detail-body">
            <span className="weather-detail-label">Sunset Time</span>
            <div className="weather-detail-val-row">
              <span className="weather-detail-val mono">{weather.sunset}</span>
              <span className="weather-metric-pill dusk">Dusk</span>
            </div>
          </div>
        </div>

        {/* Barometric Pressure */}
        <div className="weather-detail-item">
          <div className="weather-detail-icon-box pressure">
            <span>⏲️</span>
          </div>
          <div className="weather-detail-body">
            <span className="weather-detail-label">Barometric Pressure</span>
            <div className="weather-detail-val-row">
              <span className="weather-detail-val">{weather.pressure} <small>hPa</small></span>
              <span className="weather-metric-pill pressure">Standard</span>
            </div>
          </div>
        </div>

        {/* Thermal Comfort */}
        <div className="weather-detail-item">
          <div className="weather-detail-icon-box thermal">
            <span>🌡️</span>
          </div>
          <div className="weather-detail-body">
            <span className="weather-detail-label">Thermal Index</span>
            <div className="weather-detail-val-row">
              <span className="weather-detail-val">{weather.feelsLike}°C</span>
              <span className="weather-metric-pill thermal">Apparent</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherDetails;
