import axios from "axios";

 // Replace with your actual key
const BASE_URL = "https://newsdata.io/api/1/news";

export const newsApi = {
  getCryptoNews: async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
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
