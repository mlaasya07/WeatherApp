import React from 'react';
import { useWeather } from '../context/WeatherContext';

export const TemperatureUnitToggle: React.FC = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useWeather();
  
  return (
    <div className="inline-flex items-center">
      <span className={`mr-2 text-sm font-medium ${
        temperatureUnit === 'celsius' 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-500 dark:text-gray-400'
      }`}>
        °C
      </span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={temperatureUnit === 'fahrenheit'}
          onChange={toggleTemperatureUnit}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 
                        peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
                        peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute 
                        after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                        after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
      <span className={`ml-2 text-sm font-medium ${
        temperatureUnit === 'fahrenheit' 
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-500 dark:text-gray-400'
      }`}>
        °F
      </span>
    </div>
  );
};