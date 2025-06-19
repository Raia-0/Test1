import Menudash from "@/components/menudash";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import app from "@/services/firebase";
import Barra from "@/components/barralateral";
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

export default function Dashboard() {
  const [humidity, setHumidity] = useState("--");
  const [humidityHistory, setHumidityHistory] = useState<HumidityEntry[]>([]);
  const [chartData7Days, setChartData7Days] = useState<any>({ labels: [], datasets: [] });
  const [chartData30Days, setChartData30Days] = useState<any>({ labels: [], datasets: [] });
  const [chartData180Days, setChartData180Days] = useState<any>({ labels: [], datasets: [] });
  const [buttonClicked, setButtonClicked] = useState(false);

  const generateRandomData = () => {
    const now = new Date();
    const newData: HumidityEntry[] = [];

    for (let i = 0; i < 180; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (179 - i));
      newData.push({
        value: Math.floor(Math.random() * 41) + 40, // 40 a 80%
        timestamp: date.toISOString()
      });
    }

    setHumidityHistory(newData);
    setButtonClicked(true);
  };

  const fetchRealtimeHumidity = async () => {
    const db = getDatabase(app);
    const humRef = ref(db, "sensores/umidade");
    const histRef = ref(db, "sensoresHistorico/umidade");

    try {
      const humSnap = await get(humRef);
      if (humSnap.exists()) {
        const hum = Number(humSnap.val());
        setHumidity(hum + "%");
      }

      if (!buttonClicked) {
        const histSnap = await get(histRef);
        if (histSnap.exists()) {
          const histData = histSnap.val();
          const histArray = Object.values(histData) as HumidityEntry[];
          const sorted = histArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setHumidityHistory(sorted);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar umidade do Realtime Database:", error);
    }
  };

  useEffect(() => {
    fetchRealtimeHumidity();
    const interval = setInterval(fetchRealtimeHumidity, 30000);
    return () => clearInterval(interval);
  }, [buttonClicked]);

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
    <div className="flex flex-row w-full h-screen min-h-screen overflow-y-auto bg-[#E3F7FF] flex flex-col">
      <div><Barra /></div>
      {!buttonClicked && (
        <div className="flex justify-center my-4 h-20">
          <button
            onClick={generateRandomData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Gerar 180 Dados Aleatórios (40-80%)
          </button>
        </div>
      )}
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
