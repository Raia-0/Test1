"use client";
import Menudash from "@/components/menudash";
import { Link } from "react-router-dom";
import { useState } from "react";
import Thirdbutton from "@/components/buttons/thirdbutton";
import Quartobutton from "@/components/buttons/quartobutton";
//import gerarPdf from "@/components/PdfGenerator"

export default function relatorios() {
    const [sidebarOpen, setSidebarOpen] = useState(false);


    return (
        <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-col">
            {/* Header */}
            <div>
                <Menudash />
            </div>
            {/* Page Title */}
            <div className="px-4 lg:px-0">
                <h1 className="mt-5 text-2xl font-bold lg:ml-10 text-[#23306A]">Parâmetros &gt; Gerador de relatórios</h1>
            </div>

            {/* Reports Grid - Now with fixed height on lg screens */}
            <div className="w-full bg-[#FFF7E3] lg:ml-20 px-4 lg:px-60 mb-10 lg:h-[calc(100vh-200px)] lg:overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-20 justify-center pb-10">
                    {/* Density */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Densidade de aves</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Weight */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Peso das aves</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Eggs */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Número de ovos</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Food */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Consumo de ração</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Dimensions */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Dimensões da granja</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Lots */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Número de lotes</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Sensors */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Sensores</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Calculations */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Cálculos aviários</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>
                    
                    {/* Updates */}
                    <div className="bg-[#FFFFFF] w-full lg:w-75 h-50 text-white p-6 shadow-lg shadow-black/50 rounded-lg text-center">
                        <h2 className="text-xl mb-15 font-semibold text-[#23306A]">Atualização de dados</h2>
                        <Quartobutton
                            text="Gerar relatórios"
                            type="button"
                        />
                    </div>

                    {/* Generate All Button - Now inside scrollable area on lg */}
                    <div className="lg:col-span-3 flex justify-center mt-10 w-full lg:w-72 mx-auto">
                        <Link className="text-2xl" to="/pdf">
                            <Quartobutton
                                text="Gerar todos"
                                type="button"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}