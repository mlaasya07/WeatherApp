import React, { useEffect, useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const HistoricalChart: React.FC = () => {
  const { weatherData, temperatureUnit } = useWeather();
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (weatherData) {
      const data = weatherData.historical.map(item => ({
        date: item.date,
        temp: temperatureUnit === 'celsius' 
          ? item.temp 
          : (item.temp * 9/5 + 32),
      }));
      setChartData(data);
    }
  }, [weatherData, temperatureUnit]);
  
  if (!weatherData) return null;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md transition-colors duration-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Temperature History (5 Days)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: 'var(--color-text, #333)' }}
              stroke="var(--color-text, #333)"
            />
            <YAxis 
              tick={{ fill: 'var(--color-text, #333)' }}
              stroke="var(--color-text, #333)"
              label={{ 
                value: temperatureUnit === 'celsius' ? '°C' : '°F', 
                angle: -90, 
                position: 'insideLeft',
                fill: 'var(--color-text, #333)'
              }}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toFixed(1)}${temperatureUnit === 'celsius' ? '°C' : '°F'}`, 'Temperature']}
              contentStyle={{ 
                backgroundColor: 'var(--color-bg, white)', 
                borderColor: 'var(--color-border, #ddd)',
                color: 'var(--color-text, #333)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};