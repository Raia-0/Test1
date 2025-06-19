"use client";
import Menudash from "@/components/menudash";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import Quartobutton from "@/components/buttons/quartobutton";

// Tipagem corrigida usando os valores específicos para format
type Html2PdfOptionsFix = {
  margin: number;
  filename: string;
  image: { type: string; quality: number };
  html2canvas: { scale: number };
  jsPDF: {
    unit: "mm" | "cm" | "in" | "pt";
    format: "a0" | "a1" | "a2" | "a3" | "a4" | "letter" | [number, number];
    orientation: "portrait" | "landscape";
  };
};

export default function Relatorios() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const gerarPdf = () => {
    const element = pdfRef.current;
    if (!element) return;

    const opt: Html2PdfOptionsFix = {
      margin: 10,
      filename: "relatorio.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { 
        unit: "mm", 
        format: "a4", // Agora usando um valor válido do tipo
        orientation: "portrait" 
      }
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-col">
      <Menudash />

      <div className="px-4 lg:px-0">
        <h1 className="mt-5 text-2xl font-bold lg:ml-10 text-[#23306A]">
          Parâmetros &gt; Gerador de relatórios
        </h1>
      </div>

      <div
        ref={pdfRef}
        className="w-full bg-[#FFF7E3] lg:ml-20 px-4 lg:px-60 mb-10 lg:h-[calc(100vh-200px)] lg:overflow-y-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-20 justify-center pb-10">
          {[
            "Densidade de aves",
            "Peso das aves",
            "Número de ovos",
            "Consumo de ração",
            "Dimensões da granja",
            "Número de lotes",
            "Sensores",
            "Cálculos aviários",
            "Atualização de dados"
          ].map((titulo, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center"
            >
              <h2 className="text-xl mb-4 font-semibold text-[#23306A]">{titulo}</h2>
              <Quartobutton text="Gerar relatórios" type="button" />
            </div>
          ))}

          <div className="lg:col-span-3 flex justify-center mt-10 w-full lg:w-72 mx-auto">
            <Link className="text-2xl" to="/pdf">
              <Quartobutton text="Gerar todos" type="button" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={gerarPdf}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded"
        >
          Exportar PDF
        </button>
      </div>
    </div>
  );
}