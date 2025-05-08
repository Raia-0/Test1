"use client";
import MenuServicos from "@/components/menuservicos";
import { Link } from "react-router-dom";
import LogoIni from "@/assets/Logo.png";
import Thirdbutton from "@/components/buttons/thirdbutton";
import Footer from "@/components/footer";
import Logo from "@/assets/Laranjapreto.png";
import Umid from "@/assets/Umidade.png";
import luz from "@/assets/image 39.png"
import Gaga from "@/assets/image 40.png"
import Vent from "@/assets/image 41.png"
// ... (imports iguais)

export default function servicos() {
    return (
        <div className="w-full min-h-screen h-auto bg-[#FFF7E3] flex flex-col">
            <div className="flex flex-col h-full">

                {/* Header */}
                <div>
                    <MenuServicos />
                </div>

                {/* Body */}
                <div className="flex flex-col shadow-[inset_0_-4px_0_0_#222222]">
                    <div className="flex flex-col items-center">
                        <div>
                            <img className="w-120 h-auto" src={Logo.src} alt="" />
                        </div>
                        <div>
                            <h1 className="font-['Abhaya'] text-5xl mt-4 text-center">
                                O melhor para a sua granja
                            </h1>
                            <h2 className="font-['Abhaya'] text-5xl mt-4 text-center mb-10">
                                Aqui!
                            </h2>
                        </div>
                    </div>

                    {/* Umidade */}
                    <hr className="my-10 border-1 border-black w-700px" />
                    <div className="flex flex-col lg:flex-row justify-around items-center mt-10 gap-6">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h1 className="font-['MontserratMedium'] text-4xl text-[#B86021] mb-4">
                                Monitoramento da umidade da granja
                            </h1>
                            <div className="flex flex-col gap-2">
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Prevenção contra doenças, bactérias e fungos
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Bem-estar
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Higiene
                                </p>
                            </div>
                        </div>
                        <div>
                            <img src={Umid.src} alt="" />
                        </div>
                    </div>

                    {/* Luminosidade */}
                    <hr className="my-10 border-1 border-black w-700px" />
                    <div className="flex flex-col lg:flex-row-reverse justify-around items-center mt-10 gap-6">
                        <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
                            <h1 className="font-['MontserratMedium'] text-4xl text-[#B86021] mb-4">
                                Monitoramento da luminosidade da granja
                            </h1>
                            <div className="flex flex-col gap-2">
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Maior produtividade
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Descanso necessário
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Rotina automatizada
                                </p>
                            </div>
                        </div>
                        <div>
                            <img src={luz.src} alt="" />
                        </div>
                    </div>

                    {/* Temperatura */}
                    <hr className="my-10 border-1 border-black w-700px" />
                    <div className="flex flex-col lg:flex-row justify-around items-center mt-10 gap-6">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <h1 className="font-['MontserratMedium'] text-4xl text-[#B86021] mb-4">
                                Monitoramento da temperatura da granja
                            </h1>
                            <div className="flex flex-col gap-2">
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Dispositivos para controle da temperatura
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Eficiência em regiões de climas diversos
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Saúde das aves
                                </p>
                            </div>
                        </div>
                        <div>
                            <img src={Gaga.src} alt="" />
                        </div>
                    </div>

                    {/* Ventilação */}
                    <hr className="my-10 border-1 border-black w-700px" />
                    <div className="flex flex-col lg:flex-row-reverse justify-around items-center mt-10 gap-6">
                        <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
                            <h1 className="font-['MontserratMedium'] text-4xl text-[#B86021] mb-4">
                                Monitoramento da ventilação da granja
                            </h1>
                            <div className="flex flex-col gap-2">
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Circulação do ar
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Prevenção contra gases nocivos
                                </p>
                                <p className="font-['MontserratMedium'] text-xl text-[#222222]">
                                    Controle da umidade
                                </p>
                            </div>
                        </div>
                        <div className="mb-10">
                            <img src={Vent.src} alt="" />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

