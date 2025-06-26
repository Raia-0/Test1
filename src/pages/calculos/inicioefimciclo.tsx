"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FiAlertCircle } from "react-icons/fi";
import Quartobutton from "@/components/buttons/quartobutton";
import Barra from "@/components/MenuCal";
import { db } from '../../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

interface FormData {
  avesInicio: string;
  avesMortas: string;
  ovosColetados: string;
  racaoConsumida: string;
  pesoFinal: string;
  pesoInicial: string;
  avesFinal: string;
  idadeAves: string;
  responsavel: string;
  inicioLote: string;
  fimLote: string;
}

interface CalculatedData {
  mortalidade: number;
  viabilidade: number;
  ovos: number;
  conversao: number;
  fator: number;
  peso: number;
  indice: number;
  ganho: number;
  loteInicio: string;
  loteFim: string;
  responsavel: string;
  dataAtual: string;
}

export default function Inserirdados() {
  const [formData, setFormData] = useState<FormData>({
    avesInicio: "",
    avesMortas: "",
    ovosColetados: "",
    racaoConsumida: "",
    pesoFinal: "",
    pesoInicial: "",
    avesFinal: "",
    idadeAves: "",
    responsavel: "",
    inicioLote: "",
    fimLote: ""
  });

  const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showErrorPopup = (message: string) => {
    if (isClient) alert(message);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const today = new Date().toISOString().split('T')[0];
      const docRef = doc(db, 'lotes', today);
      await setDoc(docRef, formData, { merge: true });
      alert('✅ Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('❌ Erro ao salvar dados. Verifique o console.');
    }

    const avesInicio = parseFloat(formData.avesInicio) || 0;
    const avesMortas = parseFloat(formData.avesMortas) || 0;
    const avesFinal = parseFloat(formData.avesFinal) || 0;
    const pesoFinal = parseFloat(formData.pesoFinal) || 0;
    const pesoInicial = parseFloat(formData.pesoInicial) || 0;
    const racaoConsumida = parseFloat(formData.racaoConsumida) || 0;
    const ovosColetados = parseFloat(formData.ovosColetados) || 0;
    const idadeAves = parseFloat(formData.idadeAves) || 1;

    setCalculatedData({
      mortalidade: avesInicio > 0 ? (avesMortas / avesInicio) * 100 : 0,
      viabilidade: avesInicio > 0 ? ((avesInicio - avesMortas) / avesInicio) * 100 : 0,
      ovos: ovosColetados,
      conversao: pesoFinal > 0 ? racaoConsumida / pesoFinal : 0,
      fator: avesFinal > 0 ? (avesFinal * (pesoFinal / avesFinal)) / avesFinal : 0,
      peso: avesFinal > 0 ? pesoFinal / avesFinal : 0,
      indice: avesInicio > 0 && avesFinal > 0 && idadeAves > 0
        ? ((pesoFinal / avesFinal) * ((avesInicio - avesMortas) / avesInicio * 100)) / idadeAves * ((avesFinal * (pesoFinal / avesFinal)) / avesFinal)
        : 0,
      ganho: idadeAves > 0 ? (pesoFinal - pesoInicial) / idadeAves : 0,
      loteInicio: formData.inicioLote,
      loteFim: formData.fimLote,
      responsavel: formData.responsavel,
      dataAtual: new Date().toLocaleDateString()
    });
  };

  const generateMortalidadeContent = (data: CalculatedData) => `
    <div style="text-align: center; margin-bottom: 20px;">
      <h1>Relatório de Mortalidade</h1>
    </div>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
      <tr><td>Mortalidade</td><td>${data.mortalidade.toFixed(2)}%</td></tr>
      <tr><td>Data:</td><td>${data.dataAtual}</td></tr>
      <tr><td>Responsável:</td><td>${data.responsavel}</td></tr>
      <tr><td>Início do Lote:</td><td>${data.loteInicio}</td></tr>
      <tr><td>Fim do Lote:</td><td>${data.loteFim}</td></tr>
    </table>
    <div style="margin-top: 30px;">
      <p>CNPJ: _________________________________</p>
      <p>Responsável pela mudança de dados: _________________________________</p>
      <p>Data: _________________________________</p>
      <p style="margin-top: 50px;">ASSINATURA: _________________________________</p>
    </div>
  `;

  const generateReport = async (type: string) => {
    if (!isClient || !calculatedData) {
      showErrorPopup("Por favor, salve os dados primeiro!");
      return;
    }

    if (!formData.responsavel) {
      showErrorPopup("O campo 'Responsável' é obrigatório para todos os relatórios!");
      return;
    }

    if (type === "mortalidade" && (!formData.avesInicio || !formData.avesMortas)) {
      showErrorPopup("Dados de aves no início e aves mortas são necessários!");
      return;
    }

    const content = generateMortalidadeContent(calculatedData);
    const title = "Relatório de Mortalidade";

    try {
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default;

      const element = document.createElement("div");
      element.innerHTML = content;

      html2pdf()
        .from(element)
        .set({
          margin: 10,
          filename: `${title}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .save();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      showErrorPopup("Erro ao gerar PDF. Verifique o console.");
    }
  };

  const tooltips = {
    mortalidade: "Fórmula: (N° de aves mortas / N° inicial de aves) × 100",
    lote: "Datas de início e término do ciclo produtivo"
  };

  return (
    <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-col overflow-x-hidden">
      <Barra />
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="bg-[#FFF7E3] p-4 lg:w-1/4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-[#23306A] mb-4">Inserir Dados</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                name="responsavel"
                value={formData.responsavel}
                onChange={handleChange}
                placeholder="Responsável"
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="date"
                name="inicioLote"
                value={formData.inicioLote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="fimLote"
                value={formData.fimLote}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-[#23306A] text-white px-4 py-2 rounded hover:bg-[#1b2757]"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>

        <div className="flex-1 bg-[#FFF7E3] p-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative bg-white p-6 shadow-lg rounded-lg text-center">
              <div className="group relative">
                <FiAlertCircle className="absolute top-2 right-2 text-yellow-500 text-xl" />
                <div className="absolute hidden group-hover:block right-0 top-8 w-64 p-2 bg-orange-500 text-white text-sm rounded-lg z-10">
                  {tooltips.lote}
                </div>
              </div>
              <h2 className="text-xl mb-10 font-semibold text-[#23306A]">Início e fim do lote</h2>
              <button onClick={() => generateReport("mortalidade")} className="w-full">
                <Quartobutton text="Gerar relatório" type="button" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
