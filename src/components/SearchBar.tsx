import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export const SearchBar: React.FC = () => {
  const { searchCity, searchResults, setSelectedLocation, setSearchResults } = useWeather();
  const [query, setQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await searchCity(query);
      setIsDropdownOpen(true);
    }
  };
  
  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
    setQuery(`${location.name}, ${location.country}`);
    setIsDropdownOpen(false);
    setSearchResults([]);
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 
                     shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 
                     transition-all duration-300"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-500 dark:text-gray-400" />
        </div>
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                     text-white rounded-r-lg transition-colors duration-300"
        >
          Search
        </button>
      </form>
      
      {isDropdownOpen && searchResults.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border 
                     border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {searchResults.map((location, index) => (
            <div
              key={index}
              onClick={() => handleLocationSelect(location)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer
                         text-gray-800 dark:text-gray-200 transition-colors duration-200"
            >
              {location.name}, {location.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};