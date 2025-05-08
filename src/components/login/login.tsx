"use client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoIni from "@/assets/Logo.png";
import Thirdbutton from "@/components/buttons/thirdbutton";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/services/firebase";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      toast.success("Login realizado com sucesso!", {
        position: "bottom-center",
      });
      navigate("/Dash");
    } catch (error) {
      toast.error("Email ou senha errados!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <p>Email</p>
        <input
          type="email"
          placeholder="Email"
          className="border border-[#222222] p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p>Senha</p>
        <div className="flex flex-row items-center justify-between">
          <input
            type={show ? "text" : "password"}
            placeholder="Senha"
            className="border border-[#222222] p-3 rounded w-[60vh]"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <span onClick={handleClick} className="mx-4 text-xl cursor-pointer">
            {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </span>
        </div>
        <div className="flex flex-col space-y-3">
          <Thirdbutton text="Entrar" type="submit" />
          {/* Este botão com Link precisa ser ajustado se for usar autenticação com Google */}
          <button
            type="button" // Chama a função para login com o Google
            className="w-full bg-white text-black py-3 px-6 rounded-md border border-[#222222] font-['Montserrat'] hover:bg-gray-100 hover:cursor-pointer"
          >
            Entrar com o Google
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <Link
          to="/RecuperarSenha"
          className="text-[#222222] font-['Montserrat'] text-sm underline hover:underline"
        >
          Esqueceu a senha?
        </Link>
      </div>

      <div className="border-t-2 border-black my-5"></div>

      <div className="flex flex-col space-y-4">
        <h1 className="text-center text-2xl font-['MontserratMedium']">
          Não possui cadastro?
        </h1>
        <Link className="text-2xl" to="/Register">
          <Thirdbutton text="Cadastre-se" type="button" />
        </Link>
      </div>
    </div>
  );
}
