import React, { useState } from 'react';

const POPULAR_CITIES = [
  'Pursurah',
  'Kolkata',
  'Hooghly',
  'Delhi',
  'Mumbai',
  'London',
  'Tokyo',
  'New York'
];

const SearchBar = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput.trim());
    }
  };

  const handleQuickCity = (city) => {
    setCityInput(city);
    onSearch(city);
  };

  return (
    <div className="weather-search-card">
      <form onSubmit={handleSubmit} className="weather-search-form">
        <div className="weather-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search any city (e.g. Pursurah, Kolkata, London, Tokyo)..."
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="weather-search-input"
            id="weather-city-input"
          />
          {cityInput && (
            <button
              type="button"
              className="weather-clear-btn"
              onClick={() => setCityInput('')}
              title="Clear text"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="weather-search-btn" id="weather-search-submit">
          <span>Search</span>
        </button>
      </form>

      <div className="weather-quick-cities">
        <span className="weather-quick-label">⚡ Quick Cities:</span>
        <div className="weather-quick-chips">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city}
              type="button"
              className="weather-quick-btn"
              onClick={() => handleQuickCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
