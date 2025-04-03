import axios from "axios";

const API_KEY = "c9e71ef77553b4d4126f693ecd54d38f"; // Your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherApi = {
  // Get current weather for a city
  getCurrentWeather: async (city: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching current weather:", error);
      return null;
    }
  },

  // Get weather forecast (5-day, every 3 hours)
  getWeatherForecast: async (city: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: "metric",
          appid: API_KEY,
        },
      });
      return response.data.list; // Return forecast data
    } catch (error) {
      console.error("Error fetching weather forecast:", error);
      return [];
    }
  },
};
