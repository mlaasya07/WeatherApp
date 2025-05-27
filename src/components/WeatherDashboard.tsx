import React from 'react';
import { SearchBar } from './SearchBar';
import { CurrentWeather } from './CurrentWeather';
import { HistoricalChart } from './HistoricalChart';
import { WeatherDetails } from './WeatherDetails';
import { useWeather } from '../context/WeatherContext';
import { Loader } from './ui/Loader';
import { TemperatureUnitToggle } from './TemperatureUnitToggle';

export const WeatherDashboard: React.FC = () => {
  const { weatherData, loading, error } = useWeather();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-2">
          Weather Forecast
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Get accurate weather information for any location
        </p>
        <SearchBar />
      </header>
      
      {loading && (
        <div className="flex justify-center my-12">
          <Loader />
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {weatherData && !loading && (
        <div className="space-y-6 transition-all duration-500 ease-in-out">
          <div className="flex justify-end mb-2">
            <TemperatureUnitToggle />
          </div>
          
          <CurrentWeather />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HistoricalChart />
            </div>
            <div>
              <WeatherDetails />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};