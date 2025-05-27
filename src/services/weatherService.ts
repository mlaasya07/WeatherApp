import { HistoricalTemp } from '../types';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export async function searchLocations(query: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch locations');
    }
    
    const data = await response.json();
    return data.map((location: any) => ({
      name: location.name,
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      state: location.state
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
}

export async function fetchCurrentWeather(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch current weather');
    }
    
    const data = await response.json();
    
    return {
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      weather: {
        id: data.weather[0].id,
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon
      },
      pressure: data.main.pressure,
      visibility: data.visibility,
      uv_index: data.uvi,
      dt: data.dt
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
}

export async function fetchHistoricalWeather(lat: number, lon: number): Promise<HistoricalTemp[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch historical weather');
    }
    
    const data = await response.json();
    
    // Get daily temperatures from the 5-day forecast
    const dailyTemps = data.list
      .filter((reading: any, index: number) => index % 8 === 0) // One reading per day
      .map((reading: any) => ({
        date: new Date(reading.dt * 1000).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        temp: reading.main.temp
      }));
    
    return dailyTemps;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
}