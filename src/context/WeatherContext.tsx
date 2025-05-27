import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WeatherData, SearchResult, TemperatureUnit } from '../types';
import { fetchCurrentWeather, fetchHistoricalWeather, searchLocations } from '../services/weatherService';

interface WeatherContextType {
  weatherData: WeatherData | null;
  loading: boolean;
  error: string | null;
  searchCity: (city: string) => Promise<void>;
  searchResults: SearchResult[];
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>;
  selectedLocation: SearchResult | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<SearchResult | null>>;
  temperatureUnit: TemperatureUnit;
  toggleTemperatureUnit: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  useEffect(() => {
    const defaultLocation = { 
      name: "San Francisco", 
      country: "US", 
      lat: 37.7749, 
      lon: -122.4194 
    };
    setSelectedLocation(defaultLocation);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      fetchWeatherData(selectedLocation);
    }
  }, [selectedLocation]);

  const fetchWeatherData = async (location: SearchResult) => {
    setLoading(true);
    setError(null);
    
    try {
      const [current, historical] = await Promise.all([
        fetchCurrentWeather(location.lat, location.lon),
        fetchHistoricalWeather(location.lat, location.lon)
      ]);
      
      setWeatherData({
        location: {
          name: location.name,
          country: location.country,
          lat: location.lat,
          lon: location.lon
        },
        current,
        historical
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error fetching weather data:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchCity = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const results = await searchLocations(query);
      setSearchResults(results);
    } catch (err) {
      console.error('Error searching for city:', err);
      setError(err instanceof Error ? err.message : 'Failed to search for city');
    } finally {
      setLoading(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        searchCity,
        searchResults,
        setSearchResults,
        selectedLocation,
        setSelectedLocation,
        temperatureUnit,
        toggleTemperatureUnit
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};