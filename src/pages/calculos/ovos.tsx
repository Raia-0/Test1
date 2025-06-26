"use client";

import { Link } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiSettings, FiUser, FiAlertCircle } from "react-icons/fi";
import Quartobutton from "@/components/buttons/quartobutton";
import Menuinserdados from "@/components/menuinserdados";
import html2pdf from "html2pdf.js";
import { db } from '../../services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useState, ChangeEvent, FormEvent } from 'react';
import Barra from "@/components/MenuCal";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  function showErrorPopup(message: string) {
    alert(message);
  }

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
    
    setCalculatedData(newCalculatedData);
    alert("Dados salvos com sucesso!");
  };

  const today = new Date().toISOString().split('T')[0];

  const generateReport = (type: string) => {
    if (!calculatedData) {
      showErrorPopup("Por favor, salve os dados primeiro!");
      return;
    }

    if(!formData.responsavel){
        showErrorPopup("O campo 'Responsável' é obrigatório para todos os relatórios!");
        return;
    }
  
    switch(type) {
      case "mortalidade":
        if (!formData.avesInicio || !formData.avesMortas) {
          showErrorPopup("Dados de aves no início e aves mortas são necessários!");
          return;
        }
        break;
      
      case "viabilidade":
        if (!formData.avesInicio || !formData.avesMortas) {
          showErrorPopup("Dados de aves no início e aves mortas são necessários!");
          return;
        }
        break;
      
      case "ovos":
        if (!formData.ovosColetados) {
          showErrorPopup("Dados de ovos coletados são necessários!");
          return;
        }
        break;
      
      case "conversao":
        if (!formData.racaoConsumida || !formData.pesoFinal) {
          showErrorPopup("Dados de ração consumida e peso final são necessários!");
          return;
        }
        break;
      
      case "fator":
        if (!formData.avesFinal || !formData.pesoFinal) {
          showErrorPopup("Dados de aves no final e peso final são necessários!");
          return;
        }
        break;
      
      case "peso":
        if (!formData.pesoFinal || !formData.avesFinal) {
          showErrorPopup("Dados de peso final e número de aves são necessários!");
          return;
        }
        break;
      
      case "indice":
        if (!formData.pesoFinal || !formData.avesInicio || !formData.avesMortas || !formData.idadeAves || !formData.avesFinal) {
          showErrorPopup("Dados de peso, aves e idade são necessários!");
          return;
        }
        break;
      
      case "ganho":
        if (!formData.pesoFinal || !formData.pesoInicial || !formData.idadeAves) {
          showErrorPopup("Dados de peso inicial, final e idade são necessários!");
          return;
        }
        break;
      
      case "lote":
        if (!formData.inicioLote) {
          showErrorPopup("Data de início do lote é necessária!");
          return;
        }
        break;
      
      case "all":
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
        break;
    }
    let content = "";
    let title = "";
    
    switch(type) {
      case "mortalidade":
        title = "Relatório de Mortalidade";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Mortalidade</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.mortalidade.toFixed(2)}%</td>
            </tr>
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Data:</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.dataAtual}</td>
            </tr>
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Responsável:</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.responsavel}</td>
            </tr>
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Início do Lote:</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.loteInicio}</td>
            </tr>
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Fim do Lote:</td>
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
        break;
      
      case "viabilidade":
        title = "Relatório de Viabilidade";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Viabilidade</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.viabilidade.toFixed(2)}%</td>
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
        break;
      
      case "ovos":
        title = "Relatório de Ovos Coletados";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Ovos Coletados</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.ovos}</td>
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
        break;
      
      case "conversao":
        title = "Relatório de Conversão Alimentar";
        content = `
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
        break;
      
      case "fator":
        title = "Relatório de Fator de Produção";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Fator de Produção</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.fator.toFixed(2)}</td>
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
        break;
      
      case "peso":
        title = "Relatório de Peso Médio";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Peso Médio</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.peso.toFixed(2)} kg</td>
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
        break;
      
      case "indice":
        title = "Relatório de Índice de Eficiência";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Índice de Eficiência Produtiva</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.indice.toFixed(2)}</td>
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
        break;
      
      case "ganho":
        title = "Relatório de Ganho Médio de Peso";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
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
          </table>
          <div style="margin-top: 30px;">
            <p>CNPJ: _________________________________</p>
            <p>Responsável pela mudança de dados: _________________________________</p>
            <p>Data: _________________________________</p>
            <p style="margin-top: 50px;">ASSINATURA: _________________________________</p>
          </div>
        `;
        break;
      
      case "lote":
        title = "Relatório de Período do Lote";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Início do Lote</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.loteInicio}</td>
            </tr>
            <tr style="border-bottom: 1px solid #000;">
              <td style="padding: 8px; text-align: left;">Fim do Lote</td>
              <td style="padding: 8px; text-align: right;">${calculatedData.loteFim}</td>
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
        break;
      
      case "all":
        title = "Relatório Completo de Cálculos Avícolas";
        content = `
          <div style="text-align: center; margin-bottom: 20px;">
            <h1>${title}</h1>
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
        break;
    }
    
    const element = document.createElement("div");
    element.innerHTML = content;
    
    const opt = {
        margin: 10 as const, // ou [10, 10] se quiser margens diferentes
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

  const tooltips = {
    mortalidade: "Fórmula: (N° de aves mortas / N° inicial de aves) × 100",
    viabilidade: "Fórmula: ((N° inicial - N° mortas) / N° inicial) × 100",
    ovos: "Fórmula: Soma diária de ovos coletados",
    conversao: "Fórmula: Consumo total de ração / Peso total de aves ao final do abate",
    fator: "Fórmula: (N° de aves × Peso médio) / N° de aves",
    peso: "Fórmula: Peso total / N° de aves",
    indice: "Fórmula: (Peso médio × Viabilidade) / Idade × Fator",
    ganho: "Fórmula: (Peso final - Peso inicial) / Período",
    lote: "Datas de início e término do ciclo produtivo"
  };

  return (
    <div className=" w-full min-h-screen bg-[#FFF7E3] flex flex-col overflow-x-hidden">
      
      <div>
         <Barra />
      </div>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="bg-[#FFF7E3] p-4 lg:w-1/4 overflow-y-auto lg:overflow-y-auto lg:max-h-220">
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-lg font-semibold text-[#23306A] mb-4">Inserir Dados</h2>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <p>N° de ovos coletados hoje</p>
              <input 
                type="number" 
                name="ovosColetados"
                placeholder="Ovos coletados (diário)" 
                className="w-full p-2 border rounded" 
                value={formData.ovosColetados}
                onChange={handleChange}
              />
            
              <p>Responsável pela atualização de dados</p>
              <input 
                type="text" 
                name="responsavel"
                placeholder="Responsável pela atualização de dados" 
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
            

            {/* Ovos coletados */}
            <div className="relative bg-[#FFFFFF] w-full h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
              <div className="group relative">
                <FiAlertCircle className="absolute top-2 right-2 text-yellow-500 text-xl cursor-pointer" />
                <div className="absolute hidden group-hover:block right-0 top-8 w-64 p-2 bg-orange-500 text-white text-sm rounded-lg z-10">
                  {tooltips.ovos}
                </div>
              </div>
              <h2 className="text-xl mb-10 font-semibold text-[#23306A]">Ovo coletados(dia)</h2>
              <button 
                onClick={() => generateReport("ovos")} 
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