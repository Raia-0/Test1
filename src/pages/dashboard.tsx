"use client";
import Menudash from "@/components/menudash";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import app from "@/services/firebase";

export default function Dashboard() {

  const incrementarLote = () => {
    setNumeroLoteEditavel((prev) => prev + 1);
  };
  
  const decrementarLote = () => {
    setNumeroLoteEditavel((prev) => (prev > 0 ? prev - 1 : 0));
  };
  
  const [temperature, setTemperature] = useState("--");
  const [humidade, setHumidade] = useState("--");
  const [fanStatus, setFanStatus] = useState(null);
  const [lampStatus, setLampStatus] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [loteData, setLoteData] = useState({
    inicioLote: "--/--/----",
    idadeAves: "--",
    numeroLote: "--",
    mortalidade: "--%",
    ovosColetados: "N°--",
    viabilidade: "--%",
    indiceProducao: "--%",
    fatorProducao: "--%",
    conversaoAlimentar: "--%"
  });
  const [numeroLoteEditavel, setNumeroLoteEditavel] = useState(0);

  useEffect(() => {
    const db = getDatabase(app);
    const tempRef = ref(db, "sensores/temperatura");
    onValue(tempRef, (snapshot) => {
      const data = snapshot.val();
      setTemperature(data !== null ? data + "°C" : "--");
    });

    const umidRef = ref(db, "sensores/umidade");
    onValue(umidRef, (snapshot) => {
      const data = snapshot.val();
      setHumidade(data !== null ? data + "%" : "--");
    });

    const fanRef = ref(db, "fan");
    onValue(fanRef, (snapshot) => {
      const fanValue = snapshot.val();
      setFanStatus(fanValue);
    });

    const lampRef = ref(db, "lampada");
    onValue(lampRef, (snapshot) => {
      const lampValue = snapshot.val();
      setLampStatus(lampValue);
    });
  }, []);

  useEffect(() => {
    const fetchLoteData = async () => {
      const db = getFirestore(app);
      const today = new Date().toISOString().split('T')[0];
      const loteRef = doc(db, "lotes", today);
      
      try {
        const docSnap = await getDoc(loteRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          let inicioLoteFormatado = "--/--/----";
        if (data.inicioLote) {
          const parsedDate = new Date(data.inicioLote);
        if (!isNaN(parsedDate)) {
          inicioLoteFormatado = parsedDate.toLocaleDateString("pt-BR");
        }
        }

          const avesInicio = Number(data.avesInicio) || 0;
          const avesFinal = Number(data.avesFinal) || 0;
          const avesMortas = Number(data.avesMortas) || 0;
          setNumeroLoteEditavel(Number(data.numLote) || 0);
          
          const mortalidade = avesInicio > 0 
            ? ((avesMortas / avesInicio) * 100).toFixed(2) + "%"
            : "--%";
            
          const viabilidade = avesInicio > 0
            ? ((avesFinal / avesInicio) * 100).toFixed(2) + "%"
            : "--%";

            const pesoFinal = Number(data.pesoFinal) || 0;

            const pesoMedio = avesFinal > 0 ? (pesoFinal / avesFinal) : 0;
            const fatorProducao = pesoMedio;
            
            const idadeAves = Number(data.idadeAves) || 0;
            const viabilidadeNum = avesInicio > 0 ? (avesFinal / avesInicio) * 100 : 0;
            
            const indiceProducao = (idadeAves > 0 && fatorProducao > 0)
              ? ((pesoMedio * viabilidadeNum) / (idadeAves * fatorProducao)).toFixed(2)
              : "--";
          
          const racaoConsumida = Number(data.racaoConsumida) || 0;
          const conversaoAlimentar = pesoFinal > 0
            ? (racaoConsumida / pesoFinal).toFixed(2) + "%"
            : "--%";

            setLoteData({
              inicioLote: inicioLoteFormatado,
              idadeAves: data.idadeAves || "--",
              numeroLote: data.numLote || "--",
              mortalidade,
              ovosColetados: `N°${data.ovosColetados || "--"}`,
              viabilidade: viabilidadeNum.toFixed(2) + "%",
              indiceProducao: indiceProducao !== "--" ? indiceProducao + "%" : "--%",
              fatorProducao: fatorProducao > 0 ? fatorProducao.toFixed(2) + " kg" : "--%",
              conversaoAlimentar
            });
        }
      } catch (error) {
        console.error("Erro ao buscar dados do lote:", error);
      }
    };
    
    fetchLoteData();
  }, []);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className="w-full h-full min-h-screen overflow-y-auto bg-[#FFF7E3] flex flex-col">
      <div>
        <Menudash />
      </div>

      <div className="bg-[#F5E7C6] w-full lg:w-350 lg:mt-4 lg:ml-60 p-4">
        <div className="bg-[#FF9349] mb-8 w-full h-28 text-white p-5 shadow-md rounded-md text-center">
          <h2 className="text-lg font-semibold">CATEGORIA</h2>
          <p className="mt-2 text-3xl font-bold">Frango de corte</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 lg:gap-8">
          {[
            { title: "TEMPERATURA", value: temperature, color: "#FF4C4C" },
            { title: "UMIDADE", value: humidade, color: "#4A90E2" },
            {
              title: "LÂMPADA",
              value: lampStatus === true ? "Ligada" : "Desligada",
              color: "#FFC107",
            },
            {
              title: "VENTILAÇÃO",
              value: fanStatus === true ? "Ligada" : "Desligada",
              color: "#56C6E1",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: item.color }}
              className="text-white p-5 shadow-md rounded-md text-center"
            >
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="mt-2 text-3xl font-bold">{item.value}</p>
            </div>
          ))}

          {[
            { title: "Mortalidade", value: loteData.mortalidade, color: "#b87e14" },
            { title: "N° ovos coletados no dia", value: loteData.ovosColetados, color: "#e69e19" },
            { title: "Viabilidade", value: loteData.viabilidade, color: "#ed9121" },
            { title: "Índice de produção", value: loteData.indiceProducao, color: "#e69e19" },
            { title: "Fator de produção", value: loteData.fatorProducao, color: "#ffa500" },
            { title: "Conversão alimentar", value: loteData.conversaoAlimentar, color: "#ffa500" },
            { title: "IDADE DAS AVES", value: loteData.idadeAves, color: "#ff8c00" },
            {
              title: "N° do lote",
              value: (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={decrementarLote}
                    className="cursor-pointer px-2 py-1 bg-white text-black rounded-sm font-bold"
                  >
                    -
                  </button>
                  <span className="text-white text-2xl">{numeroLoteEditavel}</span>
                  <button
                    onClick={incrementarLote}
                    className="cursor-pointer px-2 py-1 bg-white text-black rounded-sm font-bold"
                  >
                    +
                  </button>
                </div>
              ),
              color: "#ff8c00"
            }            
          ].map((item, idx) => (
            <div
              key={idx}
              style={{ backgroundColor: item.color }}
              className="text-white p-5 shadow-md rounded-md text-center"
            >
              <h2 className="text-lg font-medium">{item.title}</h2>
              <p className="mt-2 text-3xl font-bold">{item.value}</p>
            </div>
          ))}

          <div className="lg:col-span-2 flex justify-center items-center gap-4 mt-4">
            <div
              style={{ backgroundColor: "#B0BEC5" }}
              className="text-white p-5 shadow-md rounded-md text-center w-1/2"
            >
              <h2 className="text-lg font-medium">Início do lote</h2>
              <p className="mt-2 text-3xl font-bold">{loteData.inicioLote}</p>
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-center items-center gap-4 mt-4">
            <div
              style={{ backgroundColor: "#4CAF50" }}
              className="text-white p-5 shadow-md rounded-md text-center w-1/2"
            >
              <h2 className="text-lg font-medium">Data</h2>
              <p className="mt-2 text-3xl font-bold">{currentDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}