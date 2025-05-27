import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  Droplets, Wind, Eye, Thermometer, Clock, Compass, Sun
} from 'lucide-react';

export const WeatherDetails: React.FC = () => {
  const { weatherData } = useWeather();
  
  if (!weatherData) return null;
  
  const { current } = weatherData;
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full transition-colors duration-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Weather Details
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplets size={20} className="text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">Humidity</span>
          </div>
          <span className="font-medium text-gray-800 dark:text-white">{current.humidity}%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wind size={20} className="text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">Wind Speed</span>
          </div>
          <span className="font-medium text-gray-800 dark:text-white">{current.wind_speed} m/s</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Compass size={20} className="text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">Pressure</span>
          </div>
          <span className="font-medium text-gray-800 dark:text-white">{current.pressure} hPa</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Eye size={20} className="text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">Visibility</span>
          </div>
          <span className="font-medium text-gray-800 dark:text-white">
            {(current.visibility / 1000).toFixed(1)} km
          </span>
        </div>
        
        {current.uv_index && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sun size={20} className="text-blue-500 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">UV Index</span>
            </div>
            <span className="font-medium text-gray-800 dark:text-white">{current.uv_index}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer size={20} className="text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">Weather</span>
          </div>
          <span className="font-medium text-gray-800 dark:text-white capitalize">
            {current.weather.description}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock size={20} className="text-blue-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">Last Updated</span>
          </div>
          <span className="font-medium text-gray-800 dark:text-white">
            {formatTime(current.dt)}
          </span>
        </div>
      </div>
    </div>
  );
};