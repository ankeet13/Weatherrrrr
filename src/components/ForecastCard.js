import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = 'afce42a26eedf431e4e42e3139a1a1c6';

const ForecastCard = ({ city }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (city) {
      const fetchForecast = async () => {
        try {
          const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`;
          const response = await axios.get(forecastUrl);
          const forecastList = response.data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
          );
          setForecast(forecastList);
        } catch (error) {
          console.error('Error fetching forecast:', error);
        }
      };

      fetchForecast();
    }
  }, [city]);

  if (!city) {
    return null;
  }

  if (forecast.length === 0) {
    return <p className="mt-6 text-lg">Loading forecast...</p>;
  }

  return (
    <div className="bg-white text-black rounded-lg shadow-lg p-6 mt-6 w-full max-w-4xl">
      <h3 className="text-xl font-bold mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((item) => (
          <div
            key={item.dt}
            className="bg-gray-100 rounded-lg p-4 text-center shadow"
          >
            <h4 className="font-bold mb-2">
              {new Date(item.dt_txt).toLocaleDateString()}
            </h4>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto mb-2"
            />
            <p>🌡️ {item.main.temp}°C</p>
            <p>☁️ {item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
