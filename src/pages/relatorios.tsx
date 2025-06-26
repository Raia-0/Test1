// "use client";

// import { FiAlertCircle } from "react-icons/fi";
// import Quartobutton from "@/components/buttons/quartobutton";
// import html2pdf from "html2pdf.js";
// import { db } from '@/services/firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import { useState } from 'react';
// import Barra from "@/components/barralateral";

// interface FirestoreData {
//   avesInicio: string;
//   avesMortas: string;
//   ovosColetados: string;
//   racaoConsumida: string;
//   pesoFinal: string;
//   pesoInicial: string;
//   avesFinal: string;
//   idadeAves: string;
//   responsavel: string;
//   inicioLote: string;
//   fimLote: string;
// }

// interface CalculatedData {
//   mortalidade: number;
//   viabilidade: number;
//   ovos: number;
//   conversao: number;
//   fator: number;
//   peso: number;
//   indice: number;
//   ganho: number;
//   loteInicio: string;
//   loteFim: string;
//   responsavel: string;
//   dataAtual: string;
// }

// export default function Relatorios() {
//   const [loading, setLoading] = useState(false);

//   function showErrorPopup(message: string) {
//     alert(message);
//   }

//   // Função para carregar dados do Firestore
//   const loadDataFromFirestore = async () => {
//     setLoading(true);
//     try {
//       const today = new Date().toISOString().split('T')[0];
//       const docRef = doc(db, 'lotes', today);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         return docSnap.data() as FirestoreData;
//       } else {
//         showErrorPopup("Nenhum dado encontrado para hoje!");
//         return null;
//       }
//     } catch (error) {
//       console.error('Erro ao carregar dados:', error);
//       showErrorPopup('Erro ao carregar dados do Firestore');
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Função para calcular dados com base nos dados do Firestore
//   const calculateData = (data: FirestoreData): CalculatedData | null => {
//     if (!data) return null;

//     const avesInicio = parseFloat(data.avesInicio) || 0;
//     const avesMortas = parseFloat(data.avesMortas) || 0;
//     const avesFinal = parseFloat(data.avesFinal) || 0;
//     const pesoFinal = parseFloat(data.pesoFinal) || 0;
//     const pesoInicial = parseFloat(data.pesoInicial) || 0;
//     const racaoConsumida = parseFloat(data.racaoConsumida) || 0;
//     const ovosColetados = parseFloat(data.ovosColetados) || 0;
//     const idadeAves = parseFloat(data.idadeAves) || 1;
    
//     return {
//       mortalidade: (avesMortas / avesInicio) * 100,
//       viabilidade: ((avesInicio - avesMortas) / avesInicio) * 100,
//       ovos: ovosColetados,
//       conversao: racaoConsumida / pesoFinal,
//       fator: (avesFinal * (pesoFinal / avesFinal)) / avesFinal,
//       peso: pesoFinal / avesFinal,
//       indice: ((pesoFinal / avesFinal) * ((avesInicio - avesMortas) / avesInicio * 100)) / idadeAves * ((avesFinal * (pesoFinal / avesFinal)) / avesFinal),
//       ganho: (pesoFinal - pesoInicial) / idadeAves,
//       loteInicio: data.inicioLote,
//       loteFim: data.fimLote,
//       responsavel: data.responsavel,
//       dataAtual: new Date().toLocaleDateString()
//     };
//   };

//   // Função principal para gerar relatórios
//   const generateReport = async (type: string) => {
//     try {
//       // Carrega dados do Firestore
//       const firestoreData = await loadDataFromFirestore();
      
//       if (!firestoreData) {
//         showErrorPopup("Não foi possível carregar os dados do banco de dados!");
//         return;
//       }

//       // Calcula os dados
//       const calculatedData = calculateData(firestoreData);
      
//       if (!calculatedData) {
//         showErrorPopup("Não foi possível calcular os dados para o relatório!");
//         return;
//       }

//       // Verificação de campos obrigatórios
//       if(!firestoreData.responsavel){
//         showErrorPopup("O campo 'Responsável' é obrigatório para todos os relatórios!");
//         return;
//       }

//       // Geração do PDF
//       let content = "";
//       let title = "";
      
//       switch(type) {
//         case "mortalidade":
//           if (!firestoreData.avesInicio || !firestoreData.avesMortas) {
//             showErrorPopup("Dados de aves no início e aves mortas são necessários!");
//             return;
//           }
          
//           title = "Relatório de Mortalidade";
//           content = `
//             <div style="text-align: center; margin-bottom: 20px;">
//               <h1>${title}</h1>
//             </div>
//             <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Mortalidade</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.mortalidade.toFixed(2)}%</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Data:</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.dataAtual}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Responsável:</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.responsavel}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Início do Lote:</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.loteInicio}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Fim do Lote:</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.loteFim}</td>
//               </tr>
//             </table>
//             <div style="margin-top: 30px;">
//               <p>CNPJ: _________________________________</p>
//               <p>Responsável pela mudança de dados: _________________________________</p>
//               <p>Data: _________________________________</p>
//               <p style="margin-top: 50px;">ASSINATURA: _________________________________</p>
//             </div>
//           `;
//           break;
          
//         // ... (outros casos de relatório mantidos iguais)

//         case "all":
//           title = "Relatório Completo de Cálculos Avícolas";
//           content = `
//             <div style="text-align: center; margin-bottom: 20px;">
//               <h1>${title}</h1>
//             </div>
//             <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Mortalidade</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.mortalidade.toFixed(2)}%</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Viabilidade</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.viabilidade.toFixed(2)}%</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Ovos Coletados</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.ovos}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Conversão Alimentar</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.conversao.toFixed(2)}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Fator de Produção</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.fator.toFixed(2)}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Peso Médio</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.peso.toFixed(2)} kg</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Índice de Eficiência Produtiva</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.indice.toFixed(2)}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Ganho Médio de Peso</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.ganho.toFixed(2)} kg/dia</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Data</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.dataAtual}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Responsável</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.responsavel}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Início do Lote</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.loteInicio}</td>
//               </tr>
//               <tr style="border-bottom: 1px solid #000;">
//                 <td style="padding: 8px; text-align: left;">Fim do Lote</td>
//                 <td style="padding: 8px; text-align: right;">${calculatedData.loteFim}</td>
//               </tr>
//             </table>
//             <div style="margin-top: 30px;">
//               <p>CNPJ: _________________________________</p>
//               <p>Responsável pela mudança de dados: _________________________________</p>
//               <p>Data: _________________________________</p>
//               <p style="margin-top: 50px;">ASSINATURA: _________________________________</p>
//             </div>
//           `;
//           break;
//       }
      
//       const element = document.createElement("div");
//       element.innerHTML = content;
      
//       const opt = {
//           margin: 10,
//           filename: `${title}.pdf`,
//           image: { 
//             type: 'jpeg', 
//             quality: 0.98 
//           },
//           html2canvas: { 
//             scale: 2 
//           },
//           jsPDF: { 
//             unit: 'mm',
//             format: 'a4',
//             orientation: 'portrait'
//           }
//       };
      
//       html2pdf()
//         .from(element)
//         .set(opt)
//         .save();

//     } catch (error) {
//       console.error('Erro ao gerar relatório:', error);
//       showErrorPopup('Erro ao gerar relatório. Verifique o console.');
//     }
//   };

//   const tooltips = {
//     mortalidade: "Fórmula: (N° de aves mortas / N° inicial de aves) × 100",
//     viabilidade: "Fórmula: ((N° inicial - N° mortas) / N° inicial) × 100",
//     ovos: "Fórmula: Soma diária de ovos coletados",
//     conversao: "Fórmula: Consumo total de ração / Peso total de aves ao final do abate",
//     fator: "Fórmula: (N° de aves × Peso médio) / N° de aves",
//     peso: "Fórmula: Peso total / N° de aves",
//     indice: "Fórmula: (Peso médio × Viabilidade) / Idade × Fator",
//     ganho: "Fórmula: (Peso final - Peso inicial) / Período",
//     lote: "Datas de início e término do ciclo produtivo"
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-row overflow-x-hidden">
//       <div>
//         <Barra />
//       </div>

//       <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
//         <div className="flex-1 bg-[#FFF7E3] p-4 overflow-y-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-4">
//             {/* Card de Mortalidade */}
//             <div className="relative bg-[#FFFFFF] w-full h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
//               <div className="group relative">
//                 <FiAlertCircle className="absolute top-2 right-2 text-yellow-500 text-xl cursor-pointer" />
//                 <div className="absolute hidden group-hover:block right-0 top-8 w-64 p-2 bg-orange-500 text-white text-sm rounded-lg z-10">
//                   {tooltips.mortalidade}
//                 </div>
//               </div>
//               <h2 className="text-xl mb-10 font-semibold text-[#23306A]">Mortalidade</h2>
//               <button 
//                 onClick={() => generateReport("mortalidade")} 
//                 disabled={loading}
//                 className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer w-full"
//               >
//                 <Quartobutton text={loading ? "Carregando..." : "Gerar relatório"} type="button" />
//               </button>
//             </div>

//             {/* Card de Viabilidade */}
//             <div className="relative bg-[#FFFFFF] w-full h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
//               <div className="group relative">
//                 <FiAlertCircle className="absolute top-2 right-2 text-yellow-500 text-xl cursor-pointer" />
//                 <div className="absolute hidden group-hover:block right-0 top-8 w-64 p-2 bg-orange-500 text-white text-sm rounded-lg z-10">
//                   {tooltips.viabilidade}
//                 </div>
//               </div>
//               <h2 className="text-xl mb-10 font-semibold text-[#23306A]">Viabilidade</h2>
//               <button 
//                 onClick={() => generateReport("viabilidade")} 
//                 disabled={loading}
//                 className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer w-full"
//               >
//                 <Quartobutton text={loading ? "Carregando..." : "Gerar relatório"} type="button" />
//               </button>
//             </div>

//             {/* Outros cards de relatório... */}

//             {/* Card de Relatório Completo */}
//             <div className="w-full py-4 bg-[#FFF7E3] sticky bottom-0 z-10">
//               <div 
//                 onClick={() => generateReport("all")} 
//                 disabled={loading}
//                 className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer w-full"
//               >
//                 <Quartobutton text={loading ? "Carregando..." : "Gerar relatório completo"} type="button" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }