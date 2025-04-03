import axios from "axios";

const API_KEY = "pub_78054b75d8d4c5d2097e5ea1ba114540762bd"; // Replace with your actual key
const BASE_URL = "https://newsdata.io/api/1/news";

export const newsApi = {
  getCryptoNews: async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          q: "cryptocurrency OR bitcoin OR ethereum",
          language: "en",
          category: "business",
          country: "us",
        },
      });

      return response.data.results.slice(0, 5); // Get the top 5 articles
    } catch (error) {
      console.error("Error fetching crypto news:", error);
      return [];
    }
  },
};
