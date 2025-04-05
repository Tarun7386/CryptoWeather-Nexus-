
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { weatherApi } from "@/lib/weatherApi";
import WeatherDetails from "@/components/weather/WeatherDetails";
import { WeatherData } from "@/utils/types";

// Update PageProps to match Next.js 14 types
interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cityName = decodeURIComponent(resolvedParams.city);
  
  try {
    await weatherApi.getCurrentWeather(cityName);
    return {
      title: `${cityName} Weather Forecast | CryptoWeather`,
      description: `Current weather and forecast for ${cityName}`,
      openGraph: {
        title: `${cityName} Weather Information`,
        description: `Live weather updates and forecast for ${cityName}`,
      },
    };
  } catch {
    return {
      title: 'Weather Forecast | CryptoWeather',
      description: 'Live weather updates and forecasts',
    };
  }
}

export default async function WeatherPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  if (!resolvedParams?.city) {
    notFound();
  }

  const cityName = decodeURIComponent(resolvedParams.city);
  const currentWeather = await weatherApi.getCurrentWeather(cityName);
  
  if (!currentWeather) {
    notFound();
  }

  const weatherForecast = await weatherApi.getWeatherForecast(cityName);

  return (
    <div className="container mx-auto px-4 py-8">
      <WeatherDetails 
        city={cityName} 
        current={currentWeather as WeatherData} 
        history={weatherForecast} 
      />
    </div>
  );
}

// Static params for common cities
export function generateStaticParams() {
  return [
    { city: 'London' },
    { city: 'New York' },
    { city: 'Tokyo' },
  ];
}