
import CryptoList from "@/components/crypto/CryptoList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CryptoWeather Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CryptoList />
       
      </div>
    </div>
  );
}