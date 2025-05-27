export interface WeatherData {
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
    pressure: number;
    visibility: number;
    uv_index?: number;
    dt: number;
  };
  historical: HistoricalTemp[];
}

export interface HistoricalTemp {
  date: string;
  temp: number;
}

export interface SearchResult {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';