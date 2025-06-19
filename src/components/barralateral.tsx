"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from '@/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent } from 'react';

// Tipos e Interfaces
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

// Componente Principal
export default function DashboardSidebar() {
  // Estados do menu
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showCalcMenu, setShowCalcMenu] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [activeParam, setActiveParam] = useState("");
  const [activeCalc, setActiveCalc] = useState("");

  // Estados dos dados
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
  const [html2pdf, setHtml2pdf] = useState<any>(null);

  // Carrega html2pdf apenas no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((module) => {
        setHtml2pdf(() => module.default);
      }).catch(error => {
        console.error("Erro ao carregar html2pdf:", error);
      });
    }
  }, []);

  // Função utilitária para classes condicionais
  function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
  }

  // Mostra popup de erro
  const showErrorPopup = (message: string) => {
    const errorPopup = document.createElement("div");
    errorPopup.style.position = "fixed";
    errorPopup.style.top = "20px";
    errorPopup.style.right = "20px";
    errorPopup.style.backgroundColor = "#ef4444";
    errorPopup.style.color = "white";
    errorPopup.style.padding = "16px";
    errorPopup.style.borderRadius = "8px";
    errorPopup.style.zIndex = "1000";
    errorPopup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    errorPopup.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(errorPopup);

    setTimeout(() => {
      errorPopup.remove();
    }, 5000);
  };

  // Manipulador de mudança nos inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Envio do formulário
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

    // Cálculos dos dados
    const avesInicio = parseFloat(formData.avesInicio) || 0;
    const avesMortas = parseFloat(formData.avesMortas) || 0;
    const avesFinal = parseFloat(formData.avesFinal) || 0;
    const pesoFinal = parseFloat(formData.pesoFinal) || 0;
    const pesoInicial = parseFloat(formData.pesoInicial) || 0;
    const racaoConsumida = parseFloat(formData.racaoConsumida) || 0;
    const ovosColetados = parseFloat(formData.ovosColetados) || 0;
    const idadeAves = parseFloat(formData.idadeAves) || 1;

    const newCalculatedData: CalculatedData = {
      mortalidade: (avesMortas / avesInicio) * 100,
      viabilidade: ((avesInicio - avesMortas) / avesInicio) * 100,
      ovos: ovosColetados,
      conversao: racaoConsumida / pesoFinal,
      fator: (avesFinal * (pesoFinal / avesFinal)) / avesFinal,
      peso: pesoFinal / avesFinal,
      indice: ((pesoFinal / avesFinal) * ((avesInicio - avesMortas) / avesInicio * 100)) / idadeAves * ((avesFinal * (pesoFinal / avesFinal)) / avesFinal),
      ganho: (pesoFinal - pesoInicial) / idadeAves,
      loteInicio: formData.inicioLote,
      loteFim: formData.fimLote,
      responsavel: formData.responsavel,
      dataAtual: new Date().toLocaleDateString()
    };

    setCalculatedData(newCalculatedData);
  };

  // Geração de relatório PDF
  const generateReport = (type: string) => {
    if (!html2pdf) {
      showErrorPopup("A funcionalidade de PDF está carregando, por favor aguarde...");
      return;
    }

    if (!calculatedData) {
      showErrorPopup("Por favor, salve os dados primeiro!");
      return;
    }

    if (!formData.responsavel) {
      showErrorPopup("O campo 'Responsável' é obrigatório para todos os relatórios!");
      return;
    }

    // Validação de campos obrigatórios
    if (type === "all") {
      const requiredFields = [
        'avesInicio', 'avesMortas', 'ovosColetados',
        'racaoConsumida', 'pesoFinal', 'pesoInicial',
        'avesFinal', 'idadeAves', 'responsavel',
        'inicioLote'
      ];

      const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);

      if (missingFields.length > 0) {
        showErrorPopup(`Campos necessários faltando: ${missingFields.join(', ')}`);
        return;
      }
    }

    // Conteúdo do relatório
    let content = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h1>Relatório Completo de Cálculos Avícolas</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Mortalidade</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.mortalidade.toFixed(2)}%</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Viabilidade</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.viabilidade.toFixed(2)}%</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Ovos Coletados</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.ovos}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Conversão Alimentar</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.conversao.toFixed(2)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Fator de Produção</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.fator.toFixed(2)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Peso Médio</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.peso.toFixed(2)} kg</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Índice de Eficiência Produtiva</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.indice.toFixed(2)}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Ganho Médio de Peso</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.ganho.toFixed(2)} kg/dia</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Data</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.dataAtual}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Responsável</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.responsavel}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Início do Lote</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.loteInicio}</td>
        </tr>
        <tr style="border-bottom: 1px solid #000;">
          <td style="padding: 8px; text-align: left;">Fim do Lote</td>
          <td style="padding: 8px; text-align: right;">${calculatedData.loteFim}</td>
        </tr>
      </table>
      <div style="margin-top: 30px;">
        <p>CNPJ: _________________________________</p>
        <p>Responsável pela mudança de dados: _________________________________</p>
        <p>Data: _________________________________</p>
        <p style="margin-top: 50px;">ASSINATURA: _________________________________</p>
      </div>
    `;

    // Criar elemento e gerar PDF
    const element = document.createElement("div");
    element.innerHTML = content;

    const opt = {
      margin: 10,
      filename: `Relatório_Avícola_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save();
  };

  // Renderização do componente
  return (
    <div className="flex flex-col bg-[#8D5740] w-70 h-screen text-white">
      {/* Botão Dashboard */}
      <Link to="/Dash" className="py-full rounded-none flex justify-center items-center font-['Montserrat']">
        <button
          onClick={() => {
            setShowSubmenu(false);
            setShowCalcMenu(false);
            setShowReportMenu(false);
            setActiveParam("");
            setActiveCalc("");
          }}
          className="bg-[#222222] h-20 w-full text-3xl font-['MontserratBold'] text-white flex items-center justify-center hover:bg-white hover:text-[#e95a1b] hover:cursor-pointer transition-colors duration-300"
        >
          Dashboard
        </button>
      </Link>

      {/* Seção Parâmetros */}
      <div>
        <button
          onClick={() => setShowSubmenu(!showSubmenu)}
          className="hover:bg-[#decfb6] bg-[#FBEBD1] text-[#FF6D1F] w-full text-xl h-10 px-3 text-left font-['MontserratMedium'] hover:cursor-pointer flex items-center justify-between"
        >
          <span>Parâmetros</span>
          <span className={classNames("transform transition-transform duration-300", showSubmenu ? "rotate-90" : "rotate-0")}>
            ▶
          </span>
        </button>

        <div className={classNames("flex flex-col ml-3 mr-3 gap-2 transition-all duration-500 ease-in-out overflow-hidden", showSubmenu ? "max-h-96 mt-2" : "max-h-0")}>
          {[
            { name: "Temperatura", path: "/Temp" },
            { name: "Umidade", path: "/Umid" },
          ].map((item) => (
            <Link key={item.name} to={item.path} className="w-full">
              <button
                onClick={() => setActiveParam(item.name)}
                className={`w-full px-4 py-2 text-left rounded hover:cursor-pointer ${activeParam === item.name
                    ? "bg-[#decfb6] text-[#8D5740]"
                    : "bg-[#FBEBD1] text-[#8D5740] hover:bg-[#decfb6]"
                  }`}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Seção Cálculos Aviários */}
      <div className="mt-4">
        <button
          onClick={() => setShowCalcMenu(!showCalcMenu)}
          className="hover:bg-[#decfb6] bg-[#FBEBD1] text-[#FF6D1F] w-full text-xl h-10 px-3 text-left font-['MontserratMedium'] hover:cursor-pointer flex items-center justify-between"
        >
          <span>Cálculos aviários</span>
          <span className={classNames("transform transition-transform duration-300", showCalcMenu ? "rotate-90" : "rotate-0")}>
            ▶
          </span>
        </button>

        <div className={classNames("flex flex-col ml-3 mr-3 gap-2 transition-all duration-500 ease-in-out overflow-hidden", showCalcMenu ? "max-h-[500px] mt-2" : "max-h-0")}>
          {[
            { name: "Taxa de Mortalidade", path: "/Morte" },
            { name: "Viabilidade", path: "/Viabilidade" },
            { name: "N° ovos coletados no dia", path: "/Ovos" },
            { name: "Índice de produção", path: "/Indice" },
            { name: "Fator de produção", path: "/Fator" },
            { name: "Conversão alimentar", path: "/Conversao" },
            { name: "peso médio", path: "/Ciclo" },
            { name: "Início e fim do ciclo", path: "/Ciclo" },
          ].map((item) => (
            <Link key={item.name} to={item.path} className="w-full">
              <button
                onClick={() => setActiveCalc(item.name)}
                className={`w-full px-4 py-2 text-left rounded hover:cursor-pointer ${activeCalc === item.name
                    ? "bg-[#decfb6] text-[#8D5740]"
                    : "bg-[#FBEBD1] text-[#8D5740] hover:bg-[#decfb6]"
                  }`}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Seção Relatório Geral */}
      <div className="mt-4">
        <button
          onClick={() => setShowReportMenu(!showReportMenu)}
          className="hover:bg-[#decfb6] bg-[#FBEBD1] text-[#FF6D1F] w-full text-xl h-10 px-3 text-left font-['MontserratMedium'] hover:cursor-pointer flex items-center justify-between"
        >
          <span>Relatório Geral</span>
          <span className={classNames("transform transition-transform duration-300", showReportMenu ? "rotate-90" : "rotate-0")}>
            ▶
          </span>
        </button>
        <Link to="/Inserirdados" className="">
          <div className={classNames("flex flex-col ml-3 mr-3 gap-2 transition-all duration-500 ease-in-out overflow-hidden", showReportMenu ? "max-h-40 mt-2" : "max-h-0")}>
            <button
              onClick={() => generateReport("all")}
              className="w-full px-4 py-2 text-left rounded bg-[#FBEBD1] text-[#8D5740] hover:bg-[#decfb6] hover:cursor-pointer"
            >
              Gerar Relatório geral
            </button>
          </div>
        </Link>

      </div>

      {/* Botão Sair */}
      <div className="mt-auto px-2 pb-4">
        <Link to="/sair" className="px-5 py-full flex justify-center items-center font-['Montserrat']">
          <button className="w-full bg-[#FF6D1F] text-white text-xl h-12 rounded hover:bg-[#e95a1b] hover:cursor-pointer">
            Sair
          </button>
        </Link>
      </div>
    </div>
  );
}