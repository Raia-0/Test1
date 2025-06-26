import Menudash from "@/components/menudash";
import { useState, useEffect } from "react";
import Barra from "@/components/MenuUmid";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Tipagem para os dados de umidade
type HumidityEntry = {
  value: number;
  timestamp: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Dados fixos de umidade entre 40 e 80%, 180 registros para últimos 180 dias
const staticHumidityData: HumidityEntry[] = (() => {
  const now = new Date();
  const fixedValues = [
    45, 52, 47, 55, 60, 58, 63, 67, 69, 72,
    70, 65, 62, 59, 54, 53, 51, 49, 46, 48,
    50, 55, 58, 61, 64, 66, 68, 71, 73, 75,
    74, 70, 68, 65, 63, 60, 58, 56, 54, 52,
    50, 48, 47, 45, 44, 46, 49, 51, 54, 57,
    60, 63, 66, 69, 71, 73, 72, 70, 68, 65,
    63, 61, 59, 57, 55, 53, 51, 50, 48, 46,
    44, 45, 47, 49, 52, 54, 56, 59, 61, 64,
    66, 68, 70, 72, 74, 75, 73, 71, 69, 67,
    65, 63, 61, 59, 57, 55, 53, 51, 49, 48,
    47, 46, 45, 44, 46, 48, 50, 53, 55, 58,
    60, 62, 64, 66, 68, 70, 72, 74, 76, 78,
    75, 73, 71, 69, 67, 65, 63, 61, 59, 57,
    55, 53, 51, 50, 48, 46, 44, 45, 47, 49,
    51, 53, 55, 57, 59, 61, 63, 65, 67, 69,
    71, 73, 75, 77, 79, 80, 78, 76, 74, 72,
    70, 68, 66, 64, 62, 60, 58, 56, 54, 52,
    50, 48, 46, 45, 44, 43, 45, 47, 49, 51,
    53, 55, 57, 59, 61, 63, 65, 67, 69, 71
  ];

  const data: HumidityEntry[] = [];
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
  const [humidity, setHumidity] = useState("--");
  const [humidityHistory, setHumidityHistory] = useState<HumidityEntry[]>([]);
  const [chartData7Days, setChartData7Days] = useState<any>({ labels: [], datasets: [] });
  const [chartData30Days, setChartData30Days] = useState<any>({ labels: [], datasets: [] });
  const [chartData180Days, setChartData180Days] = useState<any>({ labels: [], datasets: [] });
  const [buttonClicked, setButtonClicked] = useState(false);

  // Substitui a geração aleatória pelo uso dos dados fixos ao abrir a página
  useEffect(() => {
    setHumidityHistory(staticHumidityData);
    setHumidity(staticHumidityData[179].value + "%");
    setButtonClicked(true);
  }, []);

  useEffect(() => {
    const now = new Date();

    const getFilteredData = (days: number) => {
      const cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - days);
      return humidityHistory.filter(d => new Date(d.timestamp) >= cutoff);
    };

    const createChartData = (data: HumidityEntry[]) => ({
      labels: data.map(d => new Date(d.timestamp).toLocaleTimeString([], {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })),
      datasets: [{
        label: "Umidade (%)",
        data: data.map(d => d.value),
        borderColor: "#4C9EFF",
        backgroundColor: "rgba(76, 158, 255, 0.5)",
        tension: 0.3,
        fill: true
      }]
    });

    setChartData7Days(createChartData(getFilteredData(7)));
    setChartData30Days(createChartData(getFilteredData(30)));
    setChartData180Days(createChartData(getFilteredData(180)));
  }, [humidityHistory]);

  return (
    <div className="flex flex-col w-full h-screen min-h-screen overflow-y-auto bg-[#E3F7FF] flex flex-col">
      <div><Barra /></div>
      {/* Removi o botão pois os dados já são fixos */}
      <div className="bg-[#C6E7F5] lg:mr-60 w-full lg:w-350 lg:ml-60 p-4">
        <div className="grid grid-cols-1">
          <div style={{ backgroundColor: "#4C9EFF" }} className="text-white p-5 shadow-md rounded-md text-center">
            <h2 className="text-lg font-medium">UMIDADE</h2>
            <p className="mt-2 text-3xl font-bold">{humidity}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="mb-2 font-semibold">Últimos 7 dias</h3>
            <Line data={chartData7Days} height={200} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="mb-2 font-semibold">Últimos 30 dias</h3>
            <Line data={chartData30Days} height={200} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/2">
            <h3 className="mb-2 font-semibold">Últimos 180 dias</h3>
            <Line data={chartData180Days} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
