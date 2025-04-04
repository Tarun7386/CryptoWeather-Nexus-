"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCryptoData } from "@/redux/slices/cryptoSlice";
import { RootState } from "@/redux/store";

const CryptoList = () => {
  const dispatch = useAppDispatch();
  
  // ✅ Ensure Redux state is properly typed
  const { cryptoData, status } = useAppSelector((state: RootState) => state.crypto);

  // ✅ Fix: Create a state for live prices
  const [livePrices, setLivePrices] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  // ✅ Example: Simulate live price updates (replace with WebSocket logic later)
  useEffect(() => {
    if (cryptoData.length === 0) return; // Prevent updating empty state initially

    const interval = setInterval(() => {
      setLivePrices((prevPrices) => {
        const updatedPrices = { ...prevPrices };
        cryptoData.forEach((coin) => {
          updatedPrices[coin.id] =
            (prevPrices[coin.id] || coin.current_price) + (Math.random() * 10 - 5); // Simulated fluctuation
        });
        return updatedPrices;
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [cryptoData]);

  if (status === "loading") return <p>Loading crypto data...</p>;
  if (status === "failed") return <p>Error loading crypto data.</p>;

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
                {livePrices[coin.id] !== undefined
                  ? `$${livePrices[coin.id].toFixed(2)} (Live)`
                  : `$${coin.current_price.toFixed(2)}`}
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
