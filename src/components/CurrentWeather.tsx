import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { 
  CloudRain, Sun, Cloud, CloudFog, CloudLightning, CloudSnow, Droplets 
} from 'lucide-react';

export const CurrentWeather: React.FC = () => {
  const { weatherData, temperatureUnit } = useWeather();
  
  if (!weatherData) return null;
  
  const { current, location } = weatherData;
  const date = new Date(current.dt * 1000);
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  const getWeatherIcon = (weatherId: number) => {
    if (weatherId >= 200 && weatherId < 300) return <CloudLightning size={64} className="text-gray-700 dark:text-gray-300" />;
    if (weatherId >= 300 && weatherId < 600) return <CloudRain size={64} className="text-blue-500" />;
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow size={64} className="text-blue-200" />;
    if (weatherId >= 700 && weatherId < 800) return <CloudFog size={64} className="text-gray-400" />;
    if (weatherId === 800) return <Sun size={64} className="text-yellow-400" />;
    return <Cloud size={64} className="text-gray-400" />;
  };
  
  const temp = temperatureUnit === 'celsius' 
    ? `${current.temp.toFixed(1)}°C` 
    : `${(current.temp * 9/5 + 32).toFixed(1)}°F`;
  
  const feelsLike = temperatureUnit === 'celsius' 
    ? `${current.feels_like.toFixed(1)}°C` 
    : `${(current.feels_like * 9/5 + 32).toFixed(1)}°F`;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-500">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {location.name}, {location.country}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {formattedDate} | {formattedTime}
            </p>
          </div>
          <div className="flex items-center">
            {getWeatherIcon(current.weather.id)}
            <span className="text-4xl ml-2 font-bold text-gray-800 dark:text-white">
              {temp}
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Droplets size={24} className="text-blue-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-300">Feels Like</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{feelsLike}</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Droplets size={24} className="text-blue-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-300">Humidity</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{current.humidity}%</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Droplets size={24} className="text-blue-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-300">Pressure</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{current.pressure} hPa</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-blue-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Droplets size={24} className="text-blue-500 mb-1" />
            <span className="text-sm text-gray-500 dark:text-gray-300">Wind</span>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">{current.wind_speed} m/s</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xl capitalize text-gray-800 dark:text-white">
            {current.weather.description}
          </p>
        </div>
      </div>
    </div>
  );
};