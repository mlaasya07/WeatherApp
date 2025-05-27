import React from 'react';
import { WeatherDashboard } from './components/WeatherDashboard';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <WeatherProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black dark:from-black dark:to-gray-900 transition-colors duration-500">
        <WeatherDashboard />
      </div>
    </WeatherProvider>
  );
}

export default App;