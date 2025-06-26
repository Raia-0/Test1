import Menudash from "@/components/menudash";
import { useState, useEffect, useRef } from "react";
import { getDatabase, ref, get, onValue } from "firebase/database";
import app from "@/services/firebase";
import Barra from "@/components/MenuCal";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Definindo tipos para os dados históricos
interface SensorData {
  value: number;
  timestamp: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
  }[];
}

export default function Dashboard() {
  const [temperature, setTemperature] = useState("--");
  const [humidade, setHumidade] = useState("--");
  const [temperatureHistory, setTemperatureHistory] = useState<SensorData[]>([]);
  const [humidadeHistory, setHumidadeHistory] = useState<SensorData[]>([]);
  const [temperatureChartData, setTemperatureChartData] = useState<ChartData>({ 
    labels: [], 
    datasets: [] 
  });
  const [humidadeChartData, setHumidadeChartData] = useState<ChartData>({ 
    labels: [], 
    datasets: [] 
  });
  const [fanStatus, setFanStatus] = useState<boolean | null>(null);
  const [lampStatus, setLampStatus] = useState<boolean | null>(null);

  const fetchSensors = async () => {
    const dbRealtime = getDatabase(app);
    const tempRef = ref(dbRealtime, "sensores/temperatura");
    const umidRef = ref(dbRealtime, "sensores/umidade");
    
    try {
      const [tempSnap, umidSnap] = await Promise.all([get(tempRef), get(umidRef)]);
      const tempVal = tempSnap.val();
      const umidVal = umidSnap.val();
      const timestamp = new Date().toISOString();

      if (tempVal !== null) {
        const tempNum = Number(tempVal);
        setTemperature(tempNum + "°C");
        setTemperatureHistory(prev => [...prev, { value: tempNum, timestamp }].slice(-30));
      }

      if (umidVal !== null) {
        const umidNum = Number(umidVal);
        setHumidade(umidNum + "%");
        setHumidadeHistory(prev => [...prev, { value: umidNum, timestamp }].slice(-30));
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchSensors();
    const interval = setInterval(fetchSensors, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const labels = temperatureHistory.map(d =>
      new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
    const values = temperatureHistory.map(d => d.value);
    setTemperatureChartData({
      labels,
      datasets: [{
        label: "Temperatura (°C)",
        data: values,
        borderColor: "#FF4C4C",
        backgroundColor: "rgba(255, 76, 76, 0.5)",
        tension: 0.3,
        fill: true
      }]
    });
  }, [temperatureHistory]);

  useEffect(() => {
    const labels = humidadeHistory.map(d =>
      new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    );
    const values = humidadeHistory.map(d => d.value);
    setHumidadeChartData({
      labels,
      datasets: [{
        label: "Umidade (%)",
        data: values,
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.5)",
        tension: 0.3,
        fill: true
      }]
    });
  }, [humidadeHistory]);

  useEffect(() => {
    const db = getDatabase(app);
    onValue(ref(db, "fan"), (snapshot) => setFanStatus(snapshot.val()));
    onValue(ref(db, "lampada"), (snapshot) => setLampStatus(snapshot.val()));
  }, []);

  const getStatusCardInfo = (status: boolean | null, title: string) => {
    if (status === true) return { backgroundColor: "#4CAF50", text: "Ligado", title };
    if (status === false) return { backgroundColor: "#f44336", text: "Desligado", title };
    return { backgroundColor: "#9e9e9e", text: "Desconhecido", title };
  };

  const fanCardInfo = getStatusCardInfo(fanStatus, "VENTILAÇÃO");
  const lampCardInfo = getStatusCardInfo(lampStatus, "LUZ");

  return (
    <div className="flex flex-row w-full h-full min-h-screen overflow-y-auto bg-[#FFF7E3] flex flex-col">
      <div><Barra /></div>
      <div className="bg-[#F5E7C6] lg:mr-60 lg:mb-60 w-full lg:w-350 lg:mt-10 lg:ml-60 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
          <div style={{ backgroundColor: "#FF4C4C" }} className="text-white p-5 shadow-md rounded-md text-center">
            <h2 className="text-lg font-medium">TEMPERATURA</h2>
            <p className="mt-2 text-3xl font-bold">{temperature}</p>
          </div>
          <div style={{ backgroundColor: "#4A90E2" }} className="text-white p-5 shadow-md rounded-md text-center">
            <h2 className="text-lg font-medium">UMIDADE</h2>
            <p className="mt-2 text-3xl font-bold">{humidade}</p>
          </div>
        </div>

        <div className="mt-6"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Line data={temperatureChartData} height={200} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Line data={humidadeChartData} height={200} />
          </div>
        </div>

        <div className="mt-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
          <div style={{ backgroundColor: fanCardInfo.backgroundColor }} className="text-white p-5 shadow-md rounded-md text-center">
            <h2 className="text-lg font-medium">{fanCardInfo.title}</h2>
            <p className="mt-2 text-3xl font-bold">{fanCardInfo.text}</p>
          </div>
          <div style={{ backgroundColor: lampCardInfo.backgroundColor }} className="text-white p-5 shadow-md rounded-md text-center">
            <h2 className="text-lg font-medium">{lampCardInfo.title}</h2>
            <p className="mt-2 text-3xl font-bold">{lampCardInfo.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}