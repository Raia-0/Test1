'use client'
import { Link } from "react-router-dom";
import Login from "@/components/buttons/login";
import Primarybutton from "./buttons/primarybutton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from "@/assets/Laranjapreto.png";
import Secondbutton from "@/components/buttons/secondbutton";
import Logoo from "@/assets/Group 1412.png";
import Linha from "@/assets/Line.png";
import { Button } from "@mui/material";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BurguerButton from "@/components/buttons/burguer";

export default function menuDashB() {
    const [exibirMenu1, setexibirMenu1] = useState<boolean>(false);
    const [showGraficosSubmenu, setShowGraficosSubmenu] = useState<boolean>(false);
    const [showCalculosSubmenu, setShowCalculosSubmenu] = useState<boolean>(false);

    function verificarMenu1() {
        setexibirMenu1(!exibirMenu1);
    }

    return (
        <div className="w-full h-20 bg-[#F5E7C6] shadow-[inset_0_-4px_0_0_#EF820D]">
            <div className="px-5 w-full h-full m-auto flex justify-between items-center gap-10">
                <div>
                    <img className="w-60 " src={Logoo.src} alt="Logo" />
                </div>

                <div className="hidden lg:flex flex-grow gap-10">
                    <Link className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer" to="/Dash">
                        <Secondbutton text="Dashboard" type="button" />
                    </Link>

                    {/* Botão Gráficos - visual igual aos outros + submenu */}
                    <div
                        className="relative px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]"
                        onMouseEnter={() => setShowGraficosSubmenu(true)}
                        onMouseLeave={() => setShowGraficosSubmenu(false)}
                    >
                        <Link
                            to=""
                            className=""
                        >
                            <Primarybutton text="Gráficos" type="button" />
                        </Link>

                        <div
                            className={`flex flex-col absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 transition-all duration-300 ease-in-out ${showGraficosSubmenu ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"}`}
                        >
                            {[
                                { name: "Temperatura", path: "/Temp" },
                                { name: "Umidade", path: "/Umid" },
                            ].map((item) => (
                                <Link key={item.name} to={item.path} className="w-full">
                                    <button
                                        className="w-40 px-4 py-2 text-left font-['Montserrat'] rounded 
                                                   bg-[#FBEBD1] text-[#8D5740] 
                                                   hover:bg-[#decfb6] hover:cursor-pointer transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                    {/* Botão Calculos */}
                    <div
                        className="relative px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]"
                        onMouseEnter={() => {
                            setShowGraficosSubmenu(false);
                            setShowCalculosSubmenu(true);
                        }}
                        onMouseLeave={() => setShowCalculosSubmenu(false)}
                    >
                        <Link
                            to=""
                        >
                            <Secondbutton text="Cálculos" type="button" />
                        </Link>

                        <div
                            className={`
      flex flex-col absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 transition-all duration-300 ease-in-out
      ${showCalculosSubmenu ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"}
    `}
                        >
                            {[
                                { name: "Taxa de mortalidade", path: "/Morte" },
                                { name: "Viabilidade", path: "/Viabilidade" },
                                { name: "N° de ovos coletados", path: "/Ovos" },
                                { name: "Índice de produção", path: "/Indice" },
                                { name: "Fator de produção", path: "/Fator" },
                                { name: "Conversão Alimentar", path: "/Conversao" },
                                { name: "Peso Médio", path: "/PESOMEDIO" },
                                { name: "Início e fim de ciclo", path: "/Ciclo" },
                            ].map((item) => (
                                <Link key={item.name} to={item.path} className="w-full">
                                    <button
                                        className="w-64 px-4 py-2 text-left font-['Montserrat'] rounded 
                     bg-[#FBEBD1] text-[#8D5740] 
                     hover:bg-[#decfb6] hover:cursor-pointer transition-colors"
                                    >
                                        {item.name}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>



                    <Link
                        to="/Inserirdados"
                        className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]"
                    >
                        <Secondbutton text="Relatório geral" type="button" />
                    </Link>
                </div>

                <div className="mt-auto px-2 pb-4">
                    <Link to="/sair" className="px-5 py-full flex justify-center items-center font-['Montserrat']">
                        <button className="w-40 bg-[#FF6D1F] text-white text-xl h-12 rounded hover:bg-[#e95a1b] hover:cursor-pointer">
                            Sair
                        </button>
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <Button onClick={verificarMenu1}>
                        {exibirMenu1 ? <HighlightOffIcon /> : <BurguerButton />}
                    </Button>
                </div>
            </div>

            {/* MENU MOBILE */}
            {exibirMenu1 && (
                <div className="bg-[#F5E7C6] w-full h-[100vh-80px] fixed top-20 lg:hidden">
                    <div className="flex flex-col gap-2 px-50">
                        <Link className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]" to="/">
                            <Secondbutton text="Início" type="button" />
                        </Link>
                        <Link to="/Quem" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]">
                            <Secondbutton text="Quem somos" type="button" />
                        </Link>
                        <Link to="/Servece" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]">
                            <Secondbutton text="Serviços" type="button" />
                        </Link>
                        <Link to="/Contact" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]">
                            <Primarybutton text="Contato" type="button" />
                        </Link>
                        <Link to="/Login" className="bg-[#F5E7C6] text-[#222222] px-5 py-6 rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer">
                            <Login icon={<AccountCircleOutlinedIcon />} text="Entrar" type="button" />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
