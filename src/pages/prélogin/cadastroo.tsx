"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Menulogin from "@/components/menulogin";
import Footer from "@/components/footer";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ícones de olho

export default function CadastroSimples() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

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
            <Menulogin />

            <div className="flex flex-grow overflow-y-auto">
                <div className="shadow-[inset_0_-4px_0_0_#222222] gap-10 flex flex-col lg:flex-row justify-center items-center lg:items-start lg:gap-70 w-full flex-grow p-6">
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
                                <div className="relative">
                                    <input
                                        type={mostrarSenha ? "text" : "password"}
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required
                                        placeholder="Digite sua senha"
                                        className="w-full p-2 pr-10 border border-gray-300 rounded"
                                    />
                                    <span
                                        onClick={() => setMostrarSenha(!mostrarSenha)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    >
                                        {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </label>

                            <label>
                                Confirmar senha:
                                <div className="relative">
                                    <input
                                        type={mostrarConfirmarSenha ? "text" : "password"}
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        required
                                        placeholder="Confirme sua senha"
                                        className="w-full p-2 pr-10 border border-gray-300 rounded"
                                    />
                                    <span
                                        onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                                    >
                                        {mostrarConfirmarSenha ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
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

            <Footer />
        </div>
    );
}
