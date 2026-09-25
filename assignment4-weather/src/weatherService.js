// Weather Service with OpenWeatherMap API integration + rich local fallback

const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Pre-packaged realistic dataset for demo/fallback when offline or no API key is provided
const MOCK_WEATHER_DATABASE = {
  kolkata: {
    city: 'Kolkata',
    country: 'IN',
    temp: 30,
    feelsLike: 35,
    humidity: 76,
    windSpeed: 4.2,
    pressure: 1010,
    condition: 'Clouds',
    description: 'tropical warmth & pleasant breeze',
    icon: '02d',
    sunrise: '05:25 AM',
    sunset: '05:35 PM'
  },
  pursurah: {
    city: 'Pursurah',
    country: 'IN',
    temp: 29,
    feelsLike: 33,
    humidity: 74,
    windSpeed: 3.8,
    pressure: 1011,
    condition: 'Clear',
    description: 'pleasant skies over Hooghly',
    icon: '01d',
    sunrise: '05:26 AM',
    sunset: '05:36 PM'
  },
  hooghly: {
    city: 'Hooghly',
    country: 'IN',
    temp: 30,
    feelsLike: 34,
    humidity: 75,
    windSpeed: 3.9,
    pressure: 1010,
    condition: 'Haze',
    description: 'gentle breeze along the Hooghly river',
    icon: '50d',
    sunrise: '05:25 AM',
    sunset: '05:35 PM'
  },
  mumbai: {
    city: 'Mumbai',
    country: 'IN',
    temp: 31,
    feelsLike: 36,
    humidity: 78,
    windSpeed: 4.8,
    pressure: 1009,
    condition: 'Haze',
    description: 'scattered clouds & humid breeze',
    icon: '04d',
    sunrise: '06:28 AM',
    sunset: '06:44 PM'
  },
  delhi: {
    city: 'Delhi',
    country: 'IN',
    temp: 28,
    feelsLike: 29,
    humidity: 55,
    windSpeed: 3.2,
    pressure: 1012,
    condition: 'Clear',
    description: 'clear sky with gentle breeze',
    icon: '01d',
    sunrise: '06:12 AM',
    sunset: '06:31 PM'
  },
  london: {
    city: 'London',
    country: 'GB',
    temp: 16,
    feelsLike: 15,
    humidity: 72,
    windSpeed: 5.6,
    pressure: 1015,
    condition: 'Rain',
    description: 'light drizzle and overcast',
    icon: '10d',
    sunrise: '06:50 AM',
    sunset: '07:05 PM'
  },
  'new york': {
    city: 'New York',
    country: 'US',
    temp: 21,
    feelsLike: 21,
    humidity: 60,
    windSpeed: 6.2,
    pressure: 1018,
    condition: 'Clouds',
    description: 'broken clouds',
    icon: '03d',
    sunrise: '06:45 AM',
    sunset: '06:55 PM'
  },
  tokyo: {
    city: 'Tokyo',
    country: 'JP',
    temp: 24,
    feelsLike: 25,
    humidity: 68,
    windSpeed: 3.9,
    pressure: 1014,
    condition: 'Clear',
    description: 'sunny and pleasant',
    icon: '01d',
    sunrise: '05:32 AM',
    sunset: '05:42 PM'
  },
  paris: {
    city: 'Paris',
    country: 'FR',
    temp: 19,
    feelsLike: 19,
    humidity: 64,
    windSpeed: 4.1,
    pressure: 1016,
    condition: 'Clouds',
    description: 'scattered clouds',
    icon: '02d',
    sunrise: '07:35 AM',
    sunset: '07:48 PM'
  },
  sydney: {
    city: 'Sydney',
    country: 'AU',
    temp: 20,
    feelsLike: 20,
    humidity: 58,
    windSpeed: 5.1,
    pressure: 1020,
    condition: 'Clear',
    description: 'crisp sunshine',
    icon: '01d',
    sunrise: '05:54 AM',
    sunset: '05:50 PM'
  }
};

/**
export const DEFAULT_API_KEY = 'f42d24ea332955abc369da38cb16a105';

const CITY_GEO_MAPPINGS = {
  pursurah: { lat: 22.84, lon: 87.97, name: 'Pursurah (Hooghly)' },
  hooghly: { lat: 22.89, lon: 88.38, name: 'Hooghly-Chinsurah' }
};

/**
 * Format timestamp (seconds) into human-readable HH:MM AM/PM
 */
const formatTime = (unixSeconds, timezoneOffset = 0) => {
  if (!unixSeconds) return '--:--';
  const date = new Date((unixSeconds + timezoneOffset) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

/**
 * Fetch weather from OpenWeatherMap API with fallback
 */
export const fetchWeatherData = async (city, apiKey = '') => {
  const activeKey = (apiKey && apiKey.trim() !== '') ? apiKey.trim() : DEFAULT_API_KEY;
  const normalizedCity = city.trim().toLowerCase();

  // If active API key is available, attempt live OpenWeatherMap API request
  if (activeKey) {
    try {
      let requestUrl;
      const geoMapping = CITY_GEO_MAPPINGS[normalizedCity];

      if (geoMapping) {
        requestUrl = `${OPENWEATHER_BASE_URL}?lat=${geoMapping.lat}&lon=${geoMapping.lon}&units=metric&appid=${activeKey}`;
      } else {
        requestUrl = `${OPENWEATHER_BASE_URL}?q=${encodeURIComponent(city.trim())}&units=metric&appid=${activeKey}`;
      }

      const response = await fetch(requestUrl);

      if (response.ok) {
        const data = await response.json();
        return {
          city: geoMapping ? geoMapping.name : data.name,
          country: data.sys.country,
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
          condition: data.weather[0].main,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          sunrise: formatTime(data.sys.sunrise, data.timezone),
          sunset: formatTime(data.sys.sunset, data.timezone),
          isLiveApi: true
        };
      } else {
        // If 404 from live API, check local fallback database
        const localMatch = MOCK_WEATHER_DATABASE[normalizedCity];
        if (localMatch) {
          return { ...localMatch, isLiveApi: false };
        }
        if (response.status === 404) {
          throw new Error(`City "${city}" not found on OpenWeatherMap. Please check spelling.`);
        } else if (response.status === 401) {
          throw new Error('Invalid OpenWeatherMap API key. Please check your credentials.');
        } else {
          throw new Error(`Weather service error code: ${response.status}`);
        }
      }
    } catch (err) {
      // Check if local mock match exists before bubbling error
      const localMatch = MOCK_WEATHER_DATABASE[normalizedCity];
      if (localMatch) {
        return { ...localMatch, isLiveApi: false };
      }
      throw err;
    }
  }

  // Otherwise, use fallback mock database
  await new Promise((resolve) => setTimeout(resolve, 500));
  const match = MOCK_WEATHER_DATABASE[normalizedCity];
  if (match) {
    return { ...match, isLiveApi: false };
  }

  if (normalizedCity.length < 2) {
    throw new Error('Please enter a valid city name.');
  }

  const seed = normalizedCity.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const temp = 18 + (seed % 16);
  return {
    city: city.charAt(0).toUpperCase() + city.slice(1),
    country: 'GLOBAL',
    temp: temp,
    feelsLike: temp + 2,
    humidity: 50 + (seed % 40),
    windSpeed: (2.5 + (seed % 60) / 10).toFixed(1),
    pressure: 1010 + (seed % 12),
    condition: seed % 3 === 0 ? 'Clear' : seed % 3 === 1 ? 'Clouds' : 'Rain',
    description: seed % 3 === 0 ? 'clear skies' : seed % 3 === 1 ? 'scattered clouds' : 'light showers',
    icon: seed % 3 === 0 ? '01d' : seed % 3 === 1 ? '03d' : '10d',
    sunrise: '05:40 AM',
    sunset: '05:50 PM',
    isLiveApi: false
  };
};
