"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { db } from '../../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import html2pdf from 'html2pdf.js';
import Barra from "@/components/MenuCal";
import Quartobutton from "@/components/buttons/quartobutton";
import { FiAlertCircle } from "react-icons/fi";

interface FormData {
  racaoConsumida: string;
  pesoFinal: string;
  responsavel: string;
  inicioLote: string;
  fimLote: string;
  avesFinal: string;
}

interface CalculatedData {
  conversao: number;
  responsavel: string;
  dataAtual: string;
  loteInicio: string;
  loteFim: string;
}

export default function ConversaoAlimentar() {
  const [formData, setFormData] = useState<FormData>({
    racaoConsumida: "",
    pesoFinal: "",
    responsavel: "",
    inicioLote: "",
    fimLote: "",
    avesFinal: ""
  });

  const [calculatedData, setCalculatedData] = useState<CalculatedData | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    
    const pesoFinal = parseFloat(formData.pesoFinal) || 0;
    const racaoConsumida = parseFloat(formData.racaoConsumida) || 0;
    const avesFinal = parseFloat(formData.avesFinal) || 0;
    
    setCalculatedData({
      conversao: racaoConsumida / (avesFinal * pesoFinal),
      responsavel: formData.responsavel,
      dataAtual: new Date().toLocaleDateString(),
      loteInicio: formData.inicioLote,
      loteFim: formData.fimLote
    });
  };

  const generateReport = () => {
    if (!calculatedData) {
      alert("Por favor, salve os dados primeiro!");
      return;
    }

    if (!formData.responsavel) {
      alert("O campo 'Responsável' é obrigatório!");
      return;
    }

    if (!formData.racaoConsumida || !formData.pesoFinal) {
      alert("Dados de ração consumida e peso final são necessários!");
      return;
    }

    const title = "Relatório de Conversão Alimentar";
    const content = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1>${title}</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Conversão Alimentar</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.conversao.toFixed(2)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Data</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.dataAtual}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Responsável</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.responsavel}</td>
        </tr>
      </table>
      <div style="margin-top: 30px;">
        <p>CNPJ: _________________________________</p>
        <p>Responsável pela mudança de dados: _________________________________</p>
        <p>Data: _________________________________</p>
        <p style="margin-top: 50px;">ASSINATURA: _________________________________</p>
      </div>
    `;
    
    const element = document.createElement("div");
    element.innerHTML = content;
    
    const opt = {
      margin: 10,
      filename: `${title}.pdf`,
      image: { 
        type: 'jpeg' as const,
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2 
      },
      jsPDF: { 
        unit: 'mm' as const,
        format: 'a4' as const,
        orientation: 'portrait' as const
      }
    };
    
    html2pdf()
      .from(element)
      .set(opt)
      .save();
  };

  const tooltip = "Fórmula: Consumo total de ração / (Número de aves × Peso médio das aves)";

  return (
    <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-col overflow-x-hidden">
      <div>
        <Barra />
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="bg-[#FFF7E3] p-4 lg:w-1/4 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-lg font-semibold text-[#23306A] mb-4">Inserir Dados</h2>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <p>Kg de ração consumido durante o lote</p>
              <input 
                type="number" 
                name="racaoConsumida"
                placeholder="Kg de ração consumido" 
                className="w-full p-2 border rounded" 
                value={formData.racaoConsumida}
                onChange={handleChange}
              />
              <p>Peso final das aves (kg)</p>
              <input 
                type="number" 
                name="pesoFinal"
                placeholder="Peso final das aves" 
                className="w-full p-2 border rounded" 
                value={formData.pesoFinal}
                onChange={handleChange}
              />
              <p>N° de aves total do lote</p>
              <input 
                type="number" 
                name="avesFinal"
                placeholder="Número de aves" 
                className="w-full p-2 border rounded" 
                value={formData.avesFinal}
                onChange={handleChange}
              />
              <p>Responsável pela atualização</p>
              <input 
                type="text" 
                name="responsavel"
                placeholder="Responsável" 
                className="w-full p-2 border rounded" 
                value={formData.responsavel}
                onChange={handleChange}
              />
              <div>
                <label className="text-sm text-gray-700">Início do lote</label>
                <input 
                  type="date" 
                  name="inicioLote"
                  className="w-full p-2 border rounded" 
                  value={formData.inicioLote}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Fim do lote</label>
                <input 
                  type="date" 
                  name="fimLote"
                  className="w-full p-2 border rounded" 
                  value={formData.fimLote}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="bg-[#23306A] text-white px-4 py-2 rounded hover:bg-[#1b2757] transition">
                Salvar
              </button>
            </form>
          </div>
        </div>

        <div className="flex-1 bg-[#FFF7E3] p-4 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
            <div className="relative bg-[#FFFFFF] w-full h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
              <div className="group relative">
                <FiAlertCircle className="absolute top-2 right-2 text-yellow-500 text-xl cursor-pointer" />
                <div className="absolute hidden group-hover:block right-0 top-8 w-64 p-2 bg-orange-500 text-white text-sm rounded-lg z-10">
                  {tooltip}
                </div>
              </div>
              <h2 className="text-xl mb-10 font-semibold text-[#23306A]">Conversão alimentar</h2>
              <button 
                onClick={generateReport} 
                className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer w-full"
              >
                <Quartobutton text="Gerar relatório" type="button" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}