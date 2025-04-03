import CryptoList from "@/components/crypto/CryptoList";
import WeatherList from "@/components/weather/WeatherList";
import CryptoNews from "@/components/news/NewsList";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CryptoWeather Dashboard
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your all-in-one platform for real-time cryptocurrency prices and weather updates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <CryptoList />
        </div>
        
        <div className="backdrop-blur-sm bg-white/50 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
          <WeatherList />
        </div>
      </div>

      <div className="mt-8 backdrop-blur-sm bg-white/50 rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
        <CryptoNews />
      </div>
    </div>
  );
}