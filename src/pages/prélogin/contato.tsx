"use client";
import Menucontato from "@/components/menucontato";
import { Link } from "react-router-dom";
import LogoIni from "@/assets/Logo.png";
import Thirdbutton from "@/components/buttons/thirdbutton";
import Footer from "@/components/footer";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function contato() {
    return (
        <div className="w-full h-screen bg-[#FFF7E3] flex flex-col">
            <div className="flex flex-col h-full">

                {/* Header */}
                <div>
                    <Menucontato />
                </div>

                {/* Body */}
                <div className="shadow-[inset_0_-4px_0_0_#222222] flex flex-col lg:flex-row lg:items-start w-full flex-grow overflow-y-auto px-4 py-8 justify-around">
                    <div className="flex flex-col lg:flex-row justify-around w-full max-w-6xl gap-20">

                        {/* Primeira seção: Formulário */}
                        <div className="bg-white p-6 rounded-2xl shadow-md w-full lg:w-1/2">
                            <h2 className="text-2xl font-[Montserrat] mb-6 text-[#222222] text-center">Fale conosco</h2>
                            <form className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-lg font-medium text-[#222222] mb-1">Nome</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#B86021]"
                                        placeholder="Digite seu nome"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium text-[#222222] mb-1">Email</label>
                                    <input
                                        type="email"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#B86021]"
                                        placeholder="Digite seu email"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium text-[#222222] mb-1">Assunto</label>
                                    <input
                                        type="text"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#B86021]"
                                        placeholder="Assunto da mensagem"
                                    />
                                </div>
                                <div>
                                    <label className="block text-lg font-medium text-[#222222] mb-1">Mensagem</label>
                                    <textarea
                                        rows={4}
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#B86021]"
                                        placeholder="Escreva sua mensagem"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[#9D2525] text-white py-2 px-4 rounded-lg hover:bg-[#a14f1b] transition-colors hover:cursor-pointer"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>

                        {/* Segunda seção: Contatos */}
                        <div className="w-full lg:w-1/2 flex flex-col gap-6">

                            {/* Endereço */}
                            <div className="flex flex-row items-start">
                                <LocationOnIcon fontSize="large" className="text-[#222222] mr-3 mt-1" />
                                <div className="flex flex-col">
                                    <h1 className="font-['MontserratBold'] text-4xl text-[#222222] mb-4">Endereço:</h1>
                                    <p className="font-['MontserratMedium']">Fundação Matias Machline</p>
                                    <p className="font-['MontserratMedium']">Av. Min. João Gonçalves de Souza, 916 - Distrito Industrial I</p>
                                    <p className="font-['MontserratMedium']">Manaus - AM, 69075-830</p>
                                </div>
                            </div>
                            <hr className="border border-black" />

                            {/* Contato */}
                            <div className="flex flex-row items-start">
                                <WhatsAppIcon fontSize="large" className="text-[#222222] mr-3 mt-1" />
                                <div className="flex flex-col">
                                    <h1 className="font-['MontserratBold'] text-4xl text-[#222222] mb-4">Contato:</h1>
                                    <div className="flex flex-row gap-10">
                                        <p className="font-['MontserratMedium']">(92) 9273-5150</p>
                                        <p className="font-['MontserratMedium']">(92) 8552-8494</p>
                                    </div>
                                </div>
                            </div>
                            <hr className="border border-black" />

                            {/* Email */}
                            <div className="flex flex-row items-start">
                                <EmailIcon fontSize="large" className="text-[#222222] mr-3 mt-1" />
                                <div className="flex flex-col">
                                    <h1 className="font-['MontserratBold'] text-4xl text-[#222222] mb-4">E-mail:</h1>
                                    <p className="font-['MontserratMedium']">avicontrol@gmail.com</p>
                                </div>
                            </div>
                            <hr className="border border-black" />

                            {/* Instagram */}
                            <div className="flex flex-row items-start">
                                <InstagramIcon fontSize="large" className="text-[#222222] mr-3 mt-1" />
                                <div className="flex flex-col">
                                    <h1 className="font-['MontserratBold'] text-4xl text-[#222222] mb-4">Instagram:</h1>
                                    <p className="font-['MontserratMedium']">https://www.instagram.com/avicontrol_proj</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
