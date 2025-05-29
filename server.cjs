const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;

app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "OpenWeather API key is not configured. Please check your .env file." });
  }

  if (!city) {
    return res.status(400).json({ error: "City parameter is required." });
  }

  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(APIUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
