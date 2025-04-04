import { useEffect, useState } from "react";
import cryptoApi from "@/lib/cryptoApi";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const useCryptoData = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [livePrices, setLivePrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await cryptoApi.getMarketData();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching market data:", error);
      }
      setLoading(false);
    };

    fetchData();

    // WebSocket for live price updates
    const socket = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana");

    socket.onmessage = (event) => {
      try {
        const newPrices = JSON.parse(event.data);
        setLivePrices((prev) => ({ ...prev, ...newPrices }));
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);

    return () => socket.close(); // Cleanup WebSocket
  }, []);

  return { cryptoData, livePrices, loading };
};

export default useCryptoData;
