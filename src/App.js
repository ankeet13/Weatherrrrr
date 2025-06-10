import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import AnalogClock from './components/AnalogClock';

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isAtHome, setIsAtHome] = useState(true);
  const [weatherCondition, setWeatherCondition] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationObj = {
            name: 'Your Location',
            country: '',
            lat: latitude,
            lon: longitude,
          };

          setSelectedCity(locationObj);
          setUserLocation(locationObj);
          setIsAtHome(true); // On first load → we are at home
          setLoading(false);
        },
        (error) => {
          console.error('Location error:', error);
          setLoading(false);
        }
      );
    } else {
      console.error('Geolocation not supported.');
      setLoading(false);
    }
  }, []);

  const getBackgroundClass = (condition) => {
    switch (condition) {
      case 'clear':
        return 'bg-gradient-to-br from-blue-400 to-yellow-300';
      case 'clouds':
        return 'bg-gradient-to-br from-gray-400 to-gray-700';
      case 'rain':
        return 'bg-gradient-to-br from-blue-900 to-gray-700';
      case 'snow':
        return 'bg-gradient-to-br from-gray-200 to-white';
      case 'thunderstorm':
        return 'bg-gradient-to-br from-purple-900 to-indigo-900';
      default:
        return 'bg-gradient-to-br from-blue-400 to-indigo-700';
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full transition-all duration-1000 text-white ${getBackgroundClass(weatherCondition)}`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-start px-4 py-6">
        <AnalogClock />
        <h1 className="text-4xl font-bold mb-4 text-center">🌤️ WeatherApp PRO 🌊</h1>
        
        <SearchBar
          onCitySelect={(city) => {
            setSelectedCity(city);
          }}
          onSearch={() => setIsAtHome(false)}
        />

        {/* 🏠 Home button → show only when not at home */}
        {userLocation && !isAtHome && (
          <button
            onClick={() => {
              setSelectedCity(userLocation);
              setIsAtHome(true);
            }}
            className="mt-2 mb-4 text-lg bg-white text-black px-4 py-2 rounded shadow hover:bg-gray-200 transition"
          >
            🏠 Home (Your Location)
          </button>
        )}

        {loading ? (
          <p className="mt-6 text-lg animate-pulse">Loading your location...</p>
        ) : (
          <>
            <WeatherCard city={selectedCity} onWeatherChange={setWeatherCondition} />
            <ForecastCard city={selectedCity} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
