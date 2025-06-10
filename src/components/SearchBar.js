import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onCitySelect, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=afce42a26eedf431e4e42e3139a1a1c6`
        );

        if (response.data.length > 0) {
          const cityData = response.data[0];
          onCitySelect({
            name: cityData.name,
            country: cityData.country,
            lat: cityData.lat,
            lon: cityData.lon,
          });
          onSearch(); // Trigger → not at home anymore
        } else {
          alert('City not found.');
        }
      } catch (error) {
        console.error('Error searching city:', error);
      }
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for a city..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleSearch}
      className="w-full max-w-md px-4 py-2 rounded-lg text-black mb-4"
    />
  );
};

export default SearchBar;
