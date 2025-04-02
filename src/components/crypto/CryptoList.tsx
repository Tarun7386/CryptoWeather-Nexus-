"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

const CryptoList = () => {
  const [cryptoData, setCryptoData] = useState<Crypto[]>([]);
  const [livePrices, setLivePrices] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch initial market data
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
    
    return () => socket.close(); // Cleanup WebSocket on component unmount
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Live Crypto Prices</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-4 py-2">Coin</th>
            <th className="border px-4 py-2">Price (USD)</th>
            <th className="border px-4 py-2">24h Change (%)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr key={coin.id} className="text-center bg-white">
              <td className="border px-4 py-2 flex items-center gap-2">
                <Image src={coin.image} alt={coin.name} width={24} height={24} />
                <Link href={`/crypto/${coin.id}`} className="text-blue-500 hover:underline">
                  {coin.name} ({coin.symbol.toUpperCase()})
                </Link>
              </td>
              <td className="border px-4 py-2 font-semibold">
                {livePrices[coin.id] 
                  ? `$${livePrices[coin.id].toLocaleString()} (Live)` 
                  : `$${coin.current_price.toLocaleString()}`}
              </td>
              <td
                className={`border px-4 py-2 ${
                  coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;
