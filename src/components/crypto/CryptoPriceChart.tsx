import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import cryptoApi from "../../lib/cryptoApi";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PriceChart = ({ cryptoId }: { cryptoId: string }) => {
  const [historicalData, setHistoricalData] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      setLoading(true);
      const data = await cryptoApi.getHistoricalData(cryptoId, 30); // Get 30 days of data
      setHistoricalData(data.prices);
      setLoading(false);
    };

    fetchHistoricalData();
  }, [cryptoId]);

  if (loading) return <p>Loading chart...</p>;

  const chartData = {
    labels: historicalData.map((entry) => new Date(entry[0]).toLocaleDateString()),
    datasets: [
      {
        label: "Price (USD)",
        data: historicalData.map((entry) => entry[1]),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Price History (Last 30 Days)</h3>
      <Line data={chartData} />
    </div>
  );
};

export default PriceChart;
