"use client";
import Menulogin from "@/components/menulogin";
import { Link } from "react-router-dom";
import LogoIni from "@/assets/Logo.png";
import Thirdbutton from "@/components/buttons/thirdbutton";
import Footer from "@/components/footer";
import Logaar from "@/components/login/login";
export default function Entrar() {
    return (
        <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-col overflow-hidden">
            
            {/* Div Pai contendo Header, Body e Footer */}
            <div className="flex flex-col flex-grow">

                {/* Header */}
                <div>
                    <Menulogin />
                </div>
                
                {/* Body */}
                <div className="shadow-[inset_0_-4px_0_0_#222222] gap-10 flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-70 w-full flex-grow overflow-y-auto">
                    
                    {/* Seção da esquerda (vai para baixo no mobile)
                    <div className="lg:flex lg:flex-col items-center lg:items-start space-y-6 max-w-md text-center lg:text-left">
                        <div>
                            <img className=" lg:pt-6 lg:max-w-[80%] lg:max-w-[100%]" src={LogoIni.src} alt="Logo" />
                        </div>
                        <div className="w-full text-lg lg:text-2xl font-['Montserrat'] text-[#222222]">
                            <p>
                                Ao ingressar no projeto Avicontrol, você terá uma melhor visão sobre a sua granja,
                                poderá gerar relatórios, visualizar dashboards e realizar cálculos avícolas.
                            </p>
                        </div>
                    </div> */}
                    
                    {/* Seção da direita (Login) */}
                    <div className="bg-white border border-black p-6 w-full max-w-[28rem] rounded-lg shadow-lg mt-10 mb-10 lg:mt-10">
                    <Logaar/>
                    </div>
                </div>

                {/* Footer (mantendo altura fixa) */}
                <div className="w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
