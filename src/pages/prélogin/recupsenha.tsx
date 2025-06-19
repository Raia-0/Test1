"use client";
import Menulogin from "@/components/menulogin";
import Footer from "@/components/footer";
import LogoIni from "@/assets/Logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "../../services/firebase";

export default function recupsenha() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth();
        auth.languageCode = "pt-BR";

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccess(true);
            setError("");
        } catch (err: any) {
            setError("Erro ao enviar e-mail. Verifique se o e-mail está correto.");
            console.error(err);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#FFF7E3] flex flex-col overflow-hidden">
            <div className="flex flex-col flex-grow">
                {/* Header */}
                <div>
                    <Menulogin />
                </div>

                {/* Body */}
                <div className="shadow-[inset_0_-4px_0_0_#222222] gap-10 flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-70 w-full flex-grow overflow-y-auto">
                    {/* Esquerda */}
                    <div className="lg:flex lg:flex-col items-center lg:items-start space-y-6 max-w-md text-center lg:text-left">
                        {/* <div>
                            <img className="lg:pt-6 lg:max-w-[100%]" src={LogoIni.src} alt="Logo" />
                        </div> */}
                        <div className="w-full text-lg lg:text-2xl font-['Montserrat'] mt-50 text-[#222222]">
                            <p>
                                Esqueceu sua senha? Sem problemas! Informe seu e-mail cadastrado e enviaremos um link para redefinição.
                            </p>
                        </div>
                    </div>

                    {/* Direita */}
                    <div className="bg-white border border-black p-6 w-full max-w-[28rem] rounded-lg shadow-lg mt-10 mb-10 lg:mt-50">
                        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Senha</h2>
                        {success ? (
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-green-600 text-center font-medium">
                                    E-mail enviado! Verifique sua caixa de entrada.
                                </p>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="bg-[#9D2525] text-white py-2 px-6 rounded-md hover:bg-[#7A1E1E] transition"
                                >
                                    Voltar para login
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <label htmlFor="email" className="text-sm font-medium">
                                    E-mail cadastrado
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="border border-gray-300 p-2 rounded-md"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite seu e-mail"
                                    required
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    className="bg-[#9D2525] text-white py-2 rounded-md hover:bg-[#23306A] transition">
                                    Enviar link de recuperação
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
}
