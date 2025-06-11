import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = 'afce42a26eedf431e4e42e3139a1a1c6';

const WeatherCard = ({ city, onWeatherChange }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (city) {
      const fetchWeather = async () => {
        try {
          const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`;
          const response = await axios.get(weatherUrl);
          setWeather(response.data);
          onWeatherChange(response.data.weather[0].main.toLowerCase());
        } catch (error) {
          console.error('Error fetching weather:', error);
        }
      };

      fetchWeather();
    }
  }, [city, onWeatherChange]);

  if (!city) {
    return null;
  }

  if (!weather) {
    return <p className="mt-6 text-lg">Loading weather...</p>;
  }

  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-6 mt-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2">
        {weather.name}, {weather.sys.country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto mb-4"
      />
      <p className="text-lg">🌡️ Temperature: {weather.main.temp}°C</p>
      <p className="text-lg">☁️ Weather: {weather.weather[0].description}</p>
      <p className="text-lg">💨 Wind Speed: {weather.wind.speed} m/s</p>
      <p className="text-lg">💧 Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
