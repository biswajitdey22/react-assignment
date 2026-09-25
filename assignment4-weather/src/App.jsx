import React, { useState, useEffect } from 'react';
import './weather.css';
import { fetchWeatherData } from './weatherService';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';

const WeatherApp = () => {
  const [currentCity, setCurrentCity] = useState('Kolkata');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [apiKey, setApiKey] = useState('f42d24ea332955abc369da38cb16a105');
  const [recentSearches, setRecentSearches] = useState(['Pursurah', 'Kolkata', 'London']);
  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'info') => {
    setToast({ message: msg, type });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === msg ? null : curr));
    }, 3200);
  };

  // Primary fetch effect leveraging async/await
  const loadWeather = async (cityToFetch) => {
    if (!cityToFetch || !cityToFetch.trim()) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await fetchWeatherData(cityToFetch, apiKey);
      setWeatherData(data);
      setCurrentCity(data.city);

      // Add to recent searches (unique, max 5)
      setRecentSearches((prev) => {
        const next = [data.city, ...prev.filter((c) => c.toLowerCase() !== data.city.toLowerCase())];
        return next.slice(0, 5);
      });

      triggerToast(`🌤️ Loaded meteorological data for ${data.city}!`, 'success');
    } catch (err) {
      setErrorMessage(err.message || 'Unable to retrieve weather data.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load via useEffect
  useEffect(() => {
    loadWeather('Kolkata');
  }, [apiKey]);

  const handleSearch = (city) => {
    loadWeather(city);
  };

  const handleRetry = () => {
    loadWeather(currentCity || 'Kolkata');
  };

  return (
    <div className="weather-container">
      {/* Toast Feedback */}
      {toast && (
        <aside className={`weather-toast ${toast.type}`}>
          <span>{toast.message}</span>
        </aside>
      )}

      <header className="weather-header">
        <div className="weather-header-inner">
          <div className="weather-badge-pill">
            <span className="weather-live-dot" />
            <span className="weather-badge-text">AtmosPulse 4.0 • Async/Await & useEffect</span>
          </div>
          <h1 className="weather-header-title">Global Weather Dashboard</h1>
          <p className="weather-header-subtitle">
            Real-time meteorology, live atmospheric observations, and solar cycle tracking.
          </p>

          {/* Recent Searches Pills */}
          {recentSearches.length > 0 && (
            <div className="weather-recent-bar">
              <span className="recent-label">Recent:</span>
              {recentSearches.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`recent-chip ${currentCity.toLowerCase() === city.toLowerCase() ? 'active' : ''}`}
                  onClick={() => loadWeather(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="weather-main">
        {/* Search City Toolbar */}
        <SearchBar onSearch={handleSearch} />

        {/* Loading Spinner */}
        {isLoading && <LoadingSpinner />}

        {/* Error Handling */}
        {!isLoading && errorMessage && (
          <ErrorAlert message={errorMessage} onRetry={handleRetry} />
        )}

        {/* Weather Results */}
        {!isLoading && weatherData && (
          <div className="weather-results-container">
            <WeatherCard weather={weatherData} />
            <WeatherDetails weather={weatherData} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="weather-footer">
        <div className="weather-footer-inner">
          <span>Assignment 4 • React Asynchronous API Integration</span>
          <div className="weather-footer-tags">
            <span className="footer-tag">OpenWeatherMap</span>
            <span className="footer-tag">useEffect</span>
            <span className="footer-tag">Async/Await</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeatherApp;
