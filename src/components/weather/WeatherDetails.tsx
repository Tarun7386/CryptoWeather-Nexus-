"use client"
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FC } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);


interface GroupedWeatherData {
  tempSum: number;
  humiditySum: number;
  count: number;
}
// Types for weather props
interface WeatherDetailsProps {
  city: string;
  current: {
    main: {
      temp: number;
      humidity: number;
    };
    weather: { description: string }[];
  };
  history: {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
  }[];
}

const WeatherDetails: FC<WeatherDetailsProps> = ({ city, current, history }) => {
  if (!current || !history || history.length === 0) return <p>Loading weather data...</p>;

  // Group forecast data by date
  const groupedData = history.reduce<Record<string, GroupedWeatherData>>(
    (acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { tempSum: 0, humiditySum: 0, count: 0 };
      }
      acc[date].tempSum += item.main.temp;
      acc[date].humiditySum += item.main.humidity;
      acc[date].count += 1;
      return acc;
    },
    {}
  );

  const labels = Object.keys(groupedData);
  const temperatures = labels.map(
    (date) => (groupedData[date].tempSum / groupedData[date].count).toFixed(1)
  );
  const humidity = labels.map(
    (date) => (groupedData[date].humiditySum / groupedData[date].count).toFixed(1)
  );

  return (
    <div className="p-8 bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl shadow-xl border border-sky-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-8 h-8 mr-3 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
        {city} Weather Details
      </h2>

      {/* Current Weather Card */}
      <div className="mt-6 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-sky-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-4 rounded-lg bg-sky-50">
            <span className="text-sky-400 text-sm uppercase tracking-wide">Temperature</span>
            <span className="text-2xl font-bold text-gray-800 mt-2">{current.main.temp}°C</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-emerald-50">
            <span className="text-emerald-400 text-sm uppercase tracking-wide">Humidity</span>
            <span className="text-2xl font-bold text-gray-800 mt-2">{current.main.humidity}%</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-violet-50">
            <span className="text-violet-400 text-sm uppercase tracking-wide">Condition</span>
            <span className="text-2xl font-bold text-gray-800 mt-2 capitalize">{current.weather[0].description}</span>
          </div>
        </div>
      </div>

      {/* Historical Weather Chart */}
      {labels.length > 0 && (
        <div className="mt-8 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-md border border-sky-100">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Historical Trend</h3>
          <Line
            data={{
              labels,
              datasets: [
                {
                  label: "Avg Temperature (°C)",
                  data: temperatures,
                  borderColor: "rgb(14, 165, 233)",
                  backgroundColor: "rgba(14, 165, 233, 0.1)",
                  borderWidth: 2,
                  tension: 0.4,
                  fill: true,
                },
                {
                  label: "Avg Humidity (%)",
                  data: humidity,
                  borderColor: "rgb(16, 185, 129)",
                  backgroundColor: "rgba(16, 185, 129, 0.1)",
                  borderWidth: 2,
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: false,
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }}
          />
        </div>
      )}

      {/* Historical Weather Table */}
      {labels.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Avg Temperature (°C)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Avg Humidity (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {labels.map((date, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm text-gray-700">{date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{temperatures[i]}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{humidity[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WeatherDetails;
