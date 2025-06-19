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

// Tipo para os dados de temperatura
type TemperatureEntry = {
  value: number;
  timestamp: string;
};

export default function Dashboard() {
  const [temperature, setTemperature] = useState("--");
  const [temperatureHistory, setTemperatureHistory] = useState<TemperatureEntry[]>([]);
  const [chartData7Days, setChartData7Days] = useState<ChartData<"line">>({ labels: [], datasets: [] });
  const [chartData30Days, setChartData30Days] = useState<ChartData<"line">>({ labels: [], datasets: [] });
  const [chartData180Days, setChartData180Days] = useState<ChartData<"line">>({ labels: [], datasets: [] });
  const [buttonClicked, setButtonClicked] = useState(false);

  const generateRandomData = () => {
    const now = new Date();
    const newData: TemperatureEntry[] = [];

    for (let i = 0; i < 180; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - (179 - i)); // Distribui os dados nos últimos 180 dias
      newData.push({
        value: Math.floor(Math.random() * 30) + 10, // Valores entre 10 e 39
        timestamp: date.toISOString(),
      });
    }

    setTemperatureHistory(newData);
    setButtonClicked(true);
  };

  const fetchRealtimeTemperature = async () => {
    const db = getDatabase(app);
    const tempRef = ref(db, "sensores/temperatura");
    const histRef = ref(db, "sensoresHistorico/temperatura");

    try {
      // valor atual
      const tempSnap = await get(tempRef);
      if (tempSnap.exists()) {
        const temp = Number(tempSnap.val());
        setTemperature(temp + "°C");
      }

      // histórico (só carrega se o botão não foi clicado)
      if (!buttonClicked) {
        const histSnap = await get(histRef);
        if (histSnap.exists()) {
          const histData = histSnap.val();
          const histArray = Object.values(histData) as TemperatureEntry[];
          const sorted = histArray.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          setTemperatureHistory(sorted);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar temperatura do Realtime Database:", error);
    }
  };

  useEffect(() => {
    fetchRealtimeTemperature();
    const interval = setInterval(fetchRealtimeTemperature, 30000);
    return () => clearInterval(interval);
  }, [buttonClicked]);

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
    <div className="flex flex-row w-full h-screen min-h-screen overflow-y-auto bg-[#FFF7E3] flex flex-col">
      <div>
        <Barra />
      </div>

      {!buttonClicked && (
        <div className="flex justify-center my-4 h-20">
          <button
            onClick={generateRandomData}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Gerar 180 Dados Aleatórios (10-39°C)
          </button>
        </div>
      )}

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
            <h3 className="mb-2 font-semibold">Últimos 7 dados</h3>
            <Line data={chartData7Days} height={200} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="mb-2 font-semibold">Últimos 30 dados</h3>
            <Line data={chartData30Days} height={200} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md w-full lg:w-1/2">
            <h3 className="mb-2 font-semibold">Todos os 180 dados</h3>
            <Line data={chartData180Days} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
