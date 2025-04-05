// import axios from "axios";
// import { CryptoHistoryData } from "../utils/types";


// const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

// export const cryptoApi = {
//   getMarketData: async () => {
//     try {
//       const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
//         params: {
//           vs_currency: "usd",
//           ids: "bitcoin,ethereum,solana",
//           order: "market_cap_desc",
//           per_page: 3,
//           page: 1,
//           sparkline: false,
//           price_change_percentage: "24h",
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching market data:", error);
//       return [];
//     }
//   },

//   getCryptoDetails: async (cryptoId: string) => {
//     try {
//       const response = await axios.get(`${COINGECKO_API_URL}/coins/${cryptoId}`, {
//         params: {
//           localization: false,
//           tickers: false,
//           market_data: true,
//           community_data: false,
//           developer_data: false,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching crypto details:", error);
//       return null;
//     }
//   },

//   getHistoricalData: async (cryptoId: string, days: number = 30): Promise<CryptoHistoryData> => {
//     try {
//       const response = await axios.get(`${COINGECKO_API_URL}/coins/${cryptoId}/market_chart`, {
//         params: {
//           vs_currency: "usd",
//           days,
//           interval: days > 90 ? "daily" : undefined,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching historical data:", error);
//       return { prices: [], market_caps: [], total_volumes: [] };
//     }
//   },
// };

// export default cryptoApi;

import axios from "axios";
import { CryptoHistoryData } from "../utils/types";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export const cryptoApi = {
  // ✅ Fetches top 3 coins: BTC, ETH, SOL
  getMarketData: async () => {
    try {
      const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,solana",
          order: "market_cap_desc",
          per_page: 3,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching market data:", error);
      return [];
    }
  },

  // ✅ Fetches detailed metadata for a coin
  getCryptoDetails: async (cryptoId: string) => {
    try {
      const response = await axios.get(`${COINGECKO_API_URL}/coins/${cryptoId}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching details for ${cryptoId}:`, error);
      return null;
    }
  },

  // ✅ Fetches historical price data
  getHistoricalData: async (
    cryptoId: string,
    days: number = 30
  ): Promise<CryptoHistoryData> => {
    try {
      const response = await axios.get(`${COINGECKO_API_URL}/coins/${cryptoId}/market_chart`, {
        params: {
          vs_currency: "usd",
          days,
          interval: days > 90 ? "daily" : undefined,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`❌ Error fetching historical data for ${cryptoId}:`, error);
      return { prices: [], market_caps: [], total_volumes: [] };
    }
  },
};

export default cryptoApi;
