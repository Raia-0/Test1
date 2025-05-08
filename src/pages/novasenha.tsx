"use client";
import Menulogin from "@/components/menulogin";
import { Link } from "react-router-dom";
import LogoIni from "@/assets/Logo.png";
import Thirdbutton from "@/components/buttons/thirdbutton";
import Footer from "@/components/footer";

export default function novasenha() {
    return (
        <div className="w-full h-screen bg-[#FFF7E3] flex flex-col">
            
            {/* Div Pai contendo Header, Body e Footer */}
            <div className="flex flex-col h-full">

                {/* Header */}
                {/* O Header é o topo da página, geralmente com informações de navegação ou login */}
                <div>
                    <Menulogin />
                </div>
                
                {/* Body */}
                {/* O Body é o conteúdo principal da página, onde a maior parte das informações interativas e de layout são exibidas */}
                <div className="shadow-[inset_0_-4px_0_0_#222222] flex flex-col lg:flex-row justify-center items-center lg:items-start gap-70 w-full px-10 mt-5 flex-grow overflow-y-auto">
                    
                    {/* Seção da esquerda */}
                    {/* Aqui, temos o logo e a descrição sobre o projeto */}
                    <div className="flex flex-col space-y-6 max-w-md">
                        <div>
                            <img className="pt-10 pl-10 scale-150" src={LogoIni.src} alt="Logo" />
                        </div>
                        <div className="w-135 mt-15 text-2xl font-['Montserrat'] text-[#222222]">
                            <p>
                                Ao ingressar no projeto Avicontrol, você terá uma melhor visão sobre a sua granja,
                                poderá gerar relatórios, visualizar dashboards e realizar cálculos avícolas.
                            </p>
                        </div>
                    </div>
                    
                    {/* Seção da direita */}
                    {/* Aqui, temos o formulário de login com campos de email, senha e botões para entrar */}
                    <div className="bg-white border border-black p-8 w-[28rem] rounded-lg shadow-lg mt-10 lg:mt-20">
                        <form className="flex flex-col space-y-4">
                            <p>NOVA SENHA</p>
                            <input
                                type="email"
                                placeholder="Email"
                                className="border border-[#222222] p-3 rounded"
                            />
                            <p>Senha</p>
                            <input
                                type="password"
                                placeholder="Senha"
                                className="border border-[#222222] p-3 rounded"
                            />
                            <div className="flex flex-col space-y-3">
                                <Link className="text-2xl" to="/Dash">
                                    <Thirdbutton
                                        text="Entrar"
                                        type="button"
                                    />
                                </Link>
                                <Link className="text-xl" to="/dashboard">
                                    <button className="w-full bg-white text-black py-3 px-6 rounded-md border border-[#222222] font-['Montserrat'] hover:bg-gray-100 hover:cursor-pointer">
                                        Entrar com o Google
                                    </button>
                                </Link>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <Link to="/esqueceu-senha" className="text-[#222222] font-['Montserrat'] text-sm underline hover:underline">
                                Esqueceu a senha?
                            </Link>
                        </div>
                        <div className="border-t-2 border-black my-5"></div>
                        <div className="flex flex-col space-y-4">
                            <h1 className="text-center text-2xl font-['MontserratMedium']">Não possui cadastro?</h1>
                            <Link className="text-2xl" to="/cadastro">
                                <Thirdbutton
                                    text="Cadastre-se"
                                    type="button"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                {/* O Footer é a parte inferior da página, geralmente com links de navegação secundários e informações complementares */}
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
