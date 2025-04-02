// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import cryptoApi from "../../lib/cryptoApi";
// import PriceChart from "./CryptoPriceChart";

// const CryptoDetails = ({ cryptoId }: { cryptoId: string }) => {
//   const [crypto, setCrypto] = useState<any>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     if (!cryptoId) return;

//     const fetchData = async () => {
//       setLoading(true);
//       const data = await cryptoApi.getCryptoDetails(cryptoId);
//       setCrypto(data);
//       setLoading(false);
//     };

//     fetchData();
//   }, [cryptoId]);

//   if (loading) return <p>Loading...</p>;
//   if (!crypto) return <p>Crypto not found</p>;

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-md">
//       <Image src={crypto.image.large} alt={crypto.name} width={32} height={32} className="w-8 h-8 mr-2" />
//       <h2 className="text-2xl font-bold mb-4">
//         {crypto.name} ({crypto.symbol.toUpperCase()})
//       </h2>

//       <p className="text-lg"><strong>Current Price:</strong> ${crypto.market_data.current_price.usd.toLocaleString()}</p>
//       <p className="text-lg"><strong>Market Cap:</strong> ${crypto.market_data.market_cap.usd.toLocaleString()}</p>
//       <p className="text-lg"><strong>All-Time High:</strong> ${crypto.market_data.ath.usd.toLocaleString()}</p>
//       <p className="text-lg"><strong>Circulating Supply:</strong> {crypto.market_data.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}</p>

//       {/* Include historical price chart */}
//       <PriceChart cryptoId={cryptoId} />
//     </div>
//   );
// };

// export default CryptoDetails;

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

const CryptoDetails = ({ cryptoId }: { cryptoId: string }) => {
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

  if (loading) return <div className="p-6">Loading...</div>;
  if (!crypto) return <div className="p-6">Crypto not found</div>;

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