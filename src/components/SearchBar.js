import React, { useState } from 'react';
import axios from 'axios';

const apiKey = 'afce42a26eedf431e4e42e3139a1a1c6';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (q) => {
    if (!q) return setSuggestions([]);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=5&appid=${apiKey}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error('Suggestion fetch error:', error);
      setSuggestions([]);
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (city) => {
    setQuery(`${city.name}, ${city.country}`);
    setSuggestions([]);
    onSearch(city); // Pass the selected city to App.js
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full px-4 py-3 rounded-lg text-black"
        placeholder="Search for a city..."
        value={query}
        onChange={handleInput}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white text-black mt-1 w-full rounded shadow-md z-10 max-h-60 overflow-y-auto">
          {suggestions.map((sug, index) => (
            <li
              key={index}
              onClick={() => handleSelect(sug)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {sug.name}, {sug.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
