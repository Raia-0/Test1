"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Menulogin from "@/components/menulogin";
import Footer from "@/components/footer";
import LogoIni from "@/assets/Logo.png";
import "../../services/firebase";
import { Link } from "react-router-dom";

export default function CadastroSimples() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        setSucesso("");

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, senha);
            setSucesso("Cadastro realizado com sucesso!");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
        } catch (error: any) {
            console.error(error);
            setErro("Erro ao cadastrar: " + error.message);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-col overflow-x-hidden">
            {/* Header */}
            <Menulogin />

            {/* Body com rolagem */}
            <div className="flex flex-grow overflow-y-auto">
                <div className="shadow-[inset_0_-4px_0_0_#222222] gap-10 flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-70 w-full flex-grow p-6">
                    
                    {/* Lado Esquerdo */}
                    {/* <div className="lg:flex lg:flex-col items-center lg:items-start space-y-6 max-w-md text-center lg:text-left">
                        <img className="lg:pt-6 lg:max-w-[100%]" src={LogoIni.src} alt="Logo" />
                        <p className="w-full text-lg lg:text-2xl font-['Montserrat'] text-[#222222]">
                            Ao ingressar no projeto avicontrol você irá ter uma melhor visão sobre a sua granja,
                            gerar relatórios, ver dashboards e realizar os cálculos avícolas.
                        </p>
                    </div> */}

                    {/* Formulário */}
                    <div className="bg-white border border-black p-6 w-full max-w-[28rem] rounded-lg shadow-lg mt-10 mb-10 lg:mt-10">
                        <h2 className="text-2xl font-bold mb-6 text-center">Seja Bem-Vindo!</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <label>
                                E-mail:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Digite seu e-mail"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </label>
                            <label>
                                Senha:
                                <input
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                    placeholder="Digite sua senha"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </label>
                            <label>
                                Confirmar senha:
                                <input
                                    type="password"
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required
                                    placeholder="Confirme sua senha"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </label>

                            {erro && <p className="text-red-600 font-medium text-sm">{erro}</p>}
                            {sucesso && <p className="text-green-600 font-medium text-sm">{sucesso}</p>}

                            <button
                                type="submit"
                                className="mt-4 bg-[#9D2525] text-white py-2 rounded hover:bg-[#7a1e1e] transition"
                            >
                                Cadastre-se
                            </button>
                        </form>

                        {/* Redirecionamento */}
                        <div className="mt-6 border-t border-gray-300 pt-4 text-center">
                            <p className="mb-2 font-medium">Já possui cadastro?</p>
                            <Link
                                to="/login"
                                className="block bg-[#9D2525] text-white py-2 rounded hover:bg-[#7a1e1e] transition"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer visível com rolagem */}
            <Footer />
        </div>
    );
}
