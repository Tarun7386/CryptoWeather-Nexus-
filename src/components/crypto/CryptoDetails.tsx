

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import cryptoApi from "@/lib/cryptoApi";
import PriceChart from "./CryptoPriceChart";

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    ath: { usd: number };
    circulating_supply: number;
  };
}

interface Props {
  cryptoId: string;
}
const CryptoDetails = ({ cryptoId }: Props) => {
  const [crypto, setCrypto] = useState<CryptoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await cryptoApi.getCryptoDetails(cryptoId);
        setCrypto(data);
      } catch (error) {
        console.error("Error fetching crypto details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }
  if (!crypto) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">Failed to load cryptocurrency details</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <Image 
            src={crypto.image.large} 
            alt={crypto.name} 
            width={48} 
            height={48} 
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold ml-4">
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg">
              <span className="font-semibold">Current Price:</span> 
              ${crypto.market_data.current_price.usd.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg">
              <span className="font-semibold">Market Cap:</span> 
              ${crypto.market_data.market_cap.usd.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg">
              <span className="font-semibold">All-Time High:</span> 
              ${crypto.market_data.ath.usd.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-lg">
              <span className="font-semibold">Circulating Supply:</span> 
              {crypto.market_data.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}
            </p>
          </div>
        </div>

        <PriceChart cryptoId={cryptoId} />
      </div>
    </div>
  );
};

export default CryptoDetails;