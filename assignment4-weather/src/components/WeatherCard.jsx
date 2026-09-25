import React, { useState } from 'react';

const WeatherCard = ({ weather }) => {
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const displayTemp = isFahrenheit
    ? Math.round((weather.temp * 9) / 5 + 32)
    : weather.temp;

  const displayFeelsLike = isFahrenheit
    ? Math.round((weather.feelsLike * 9) / 5 + 32)
    : weather.feelsLike;

  // Compute atmospheric theme class
  const getThemeClass = (condition) => {
    const c = (condition || '').toLowerCase();
    if (c.includes('clear')) return 'sunny';
    if (c.includes('rain') || c.includes('drizzle') || c.includes('thunder')) return 'rainy';
    if (c.includes('cloud')) return 'cloudy';
    return 'hazy';
  };

  const themeClass = getThemeClass(weather.condition);

  // OpenWeather icon URL
  const iconUrl = weather.icon
    ? `https://openweathermap.org/img/wn/${weather.icon}@4x.png`
    : 'https://openweathermap.org/img/wn/02d@4x.png';

  return (
    <article className={`weather-card-hero ${themeClass}`}>
      <div className="weather-hero-content">
        <div className="weather-hero-header">
          <div className="weather-location-group">
            <h2 className="weather-hero-location">
              {weather.city}, <span className="weather-country-badge">{weather.country}</span>
            </h2>
            <span className={`weather-source-badge ${weather.isLiveApi ? 'live' : 'sim'}`}>
              <span className="live-dot" />
              {weather.isLiveApi ? 'Live OpenWeather API' : 'Regional Meteorological Feed'}
            </span>
          </div>
        </div>

        <div className="weather-condition-badge-row">
          <span className="weather-condition-tag">{weather.condition}</span>
          <span className="weather-desc-text">“{weather.description}”</span>
        </div>

        <div className="weather-apparent-temp">
          <span>Feels like</span>
          <strong className="apparent-val">{displayFeelsLike}°{isFahrenheit ? 'F' : 'C'}</strong>
          <span className="divider">•</span>
          <span className="barometer-hint">Barometric: {weather.pressure} hPa</span>
        </div>
      </div>

      <div className="weather-temp-section">
        <div className="weather-icon-aura-wrapper">
          <img
            src={iconUrl}
            alt={weather.description}
            className="weather-icon-img"
          />
        </div>

        <div className="weather-temp-readout">
          <span className="weather-temp-number">{displayTemp}</span>
          <div className="weather-unit-selector">
            <button
              type="button"
              className={`unit-toggle-btn ${!isFahrenheit ? 'active' : ''}`}
              onClick={() => setIsFahrenheit(false)}
            >
              °C
            </button>
            <span className="unit-divider">|</span>
            <button
              type="button"
              className={`unit-toggle-btn ${isFahrenheit ? 'active' : ''}`}
              onClick={() => setIsFahrenheit(true)}
            >
              °F
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default WeatherCard;
