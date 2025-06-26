import Menudash from "@/components/menudash";
import { useState, useEffect } from "react";
import Barra from "@/components/MenuTemp";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TemperatureEntry = {
  value: number;
  timestamp: string;
};

// 🔒 Dados fixos entre 25°C e 30°C por 180 dias
const staticTemperatureData: TemperatureEntry[] = (() => {
  const now = new Date();
  const data: TemperatureEntry[] = [];

  const fixedValues = [
    27.3, 28.1, 26.5, 25.8, 29.0, 26.1, 28.4, 27.7, 29.5, 25.2,
    28.9, 26.8, 27.5, 29.1, 26.0, 27.9, 28.2, 25.7, 29.4, 27.0,
    28.0, 27.6, 25.4, 28.3, 29.3, 26.7, 27.8, 25.9, 28.6, 26.3,
    28.8, 27.1, 29.2, 25.5, 26.9, 28.7, 27.2, 25.6, 27.4, 28.5,
    26.6, 27.0, 28.1, 25.8, 27.6, 26.4, 29.1, 27.5, 25.3, 28.9,
    26.2, 28.0, 27.3, 26.0, 28.2, 27.7, 25.9, 29.0, 26.1, 28.3,
    27.4, 25.6, 29.2, 27.1, 26.8, 28.4, 27.8, 25.7, 28.6, 26.5,
    29.3, 27.2, 25.4, 28.5, 27.9, 26.3, 28.7, 27.0, 25.5, 28.8,
    26.9, 29.4, 27.6, 26.6, 28.9, 27.5, 25.2, 29.0, 26.4, 28.0,
    27.3, 25.8, 28.1, 27.7, 25.6, 29.1, 26.7, 28.2, 27.8, 26.1,
    28.3, 27.1, 25.9, 28.4, 26.0, 27.9, 28.5, 26.2, 27.0, 28.6,
    27.2, 26.3, 28.7, 27.3, 25.4, 28.8, 26.5, 27.4, 28.9, 26.6,
    27.5, 29.0, 26.7, 27.6, 29.1, 26.8, 27.7, 29.2, 26.9, 27.8,
    29.3, 27.0, 27.9, 29.4, 27.1, 28.0, 29.5, 27.2, 28.1, 29.0,
    27.3, 28.2, 28.9, 27.4, 28.3, 28.8, 27.5, 28.4, 28.7, 27.6,
    28.5, 28.6, 27.7, 28.6, 27.8, 28.5, 27.9, 28.4, 28.0, 28.3,
    28.1, 28.2, 28.2, 28.1, 28.3, 28.2, 28.4, 28.3, 28.5, 28.4
  ];

  for (let i = 0; i < 180; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - (179 - i));

    data.push({
      value: fixedValues[i % fixedValues.length],
      timestamp: date.toISOString(),
    });
  }

  return data;
})();

export default function Dashboard() {
  const [temperature, setTemperature] = useState("--");
  const [temperatureHistory, setTemperatureHistory] = useState<TemperatureEntry[]>([]);
  const [chartData7Days, setChartData7Days] = useState<ChartData<"line">>({ labels: [], datasets: [] });
  const [chartData30Days, setChartData30Days] = useState<ChartData<"line">>({ labels: [], datasets: [] });
  const [chartData180Days, setChartData180Days] = useState<ChartData<"line">>({ labels: [], datasets: [] });

  useEffect(() => {
    setTemperatureHistory(staticTemperatureData);
    setTemperature(staticTemperatureData[179].value.toFixed(1) + "°C");
  }, []);

  useEffect(() => {
    const createChartData = (data: TemperatureEntry[]): ChartData<"line"> => ({
      labels: data.map(d =>
        new Date(d.timestamp).toLocaleDateString([], {
          day: "2-digit",
          month: "2-digit",
        })
      ),
      datasets: [
        {
          label: "Temperatura (°C)",
          data: data.map(d => d.value),
          borderColor: "#FF4C4C",
          backgroundColor: "rgba(255, 76, 76, 0.5)",
          tension: 0.3,
          fill: true,
        },
      ],
    });

    const last7 = temperatureHistory.slice(-7);
    const last30 = temperatureHistory.slice(-30);
    const last180 = temperatureHistory.slice(-180);

    setChartData7Days(createChartData(last7));
    setChartData30Days(createChartData(last30));
    setChartData180Days(createChartData(last180));
  }, [temperatureHistory]);

  return (
    <div className="flex flex-col w-full h-screen min-h-screen overflow-y-auto bg-[#FFF7E3] flex flex-col">
      <div>
        <Barra />
      </div>
      {/* Div dos graficos */}
      <div className="bg-[#F5E7C6] lg:mr-60 w-full lg:w-350 lg:ml-60 p-4">
        {/* Card de Temperatura */}
        <div className="grid grid-cols-1">
          <div
            style={{ backgroundColor: "#FF4C4C" }}
            className="text-white p-5 shadow-md rounded-md text-center"
          >
            <h2 className="text-lg font-medium">TEMPERATURA</h2>
            <p className="mt-2 text-3xl font-bold">{temperature}</p>
          </div>
        </div>

        {/* Gráficos de Temperatura */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="mb-2 font-semibold">Últimos 7 Dias</h3>
            <Line data={chartData7Days} height={200} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="mb-2 font-semibold">Últimos 30 Dias</h3>
            <Line data={chartData30Days} height={200} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/2">
            <h3 className="mb-2 font-semibold">Últimos 180 Dias</h3>
            <Line data={chartData180Days} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
