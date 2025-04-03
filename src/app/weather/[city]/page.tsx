import { notFound } from "next/navigation";
import { weatherApi } from "@/lib/weatherApi";
import WeatherDetails from "@/components/weather/WeatherDetails";

export default async function WeatherPage({ params }: { params: { city: string } }) {
  if (!params?.city) return notFound();

  const cityName = decodeURIComponent(params.city);
  const currentWeather = await weatherApi.getCurrentWeather(cityName);
  if (!currentWeather) return notFound();

  // Fetch weather forecast instead of history
  const weatherForecast = await weatherApi.getWeatherForecast(cityName);

  return (
    <div className="container mx-auto p-6">
      <WeatherDetails city={cityName} current={currentWeather} history={weatherForecast} />
    </div>
  );
}
