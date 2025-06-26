"use client";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inicio from "@/pages/prélogin/inicio1";
import Quem from "@/pages/prélogin/quemsomos";
import Servece from "@/pages/prélogin/servicos";
import Contact from "@/pages/prélogin/contato";
import Login from "@/pages/prélogin/entrar";
import Register from "@/pages/prélogin/cadastroo";
import RecuperarSenha from "@/pages/prélogin/recupsenha";
import NovaSenha from "@/pages/prélogin/novasenha";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Dash from "@/pages/poslogin/dashboard";
import Inserirdados from "@/pages/poslogin/inserirdados";
import InserirALLdados from '@/pages/poslogin/todosdados';
import Sair from "@/pages/poslogin/Sair";
import Temp from "@/pages/poslogin/temperatura";
import Umid from "@/pages/poslogin/umidade";
import Luz from "@/pages/poslogin/luz";
import Morte from "@/pages/calculos/mortalidade";
import Viabilidade from "@/pages/calculos/viabilidade";
import Conversao from "@/pages/calculos/conversaoalim";
import Fator from "@/pages/calculos/fatdeproducao";
import PESOMEDIO from "@/pages/calculos/pesomedio";
import Indice from "@/pages/calculos/indeproducao";
import Ovos from "@/pages/calculos/ovos";
import Ciclo from "@/pages/calculos/inicioefimciclo";

const Rotas = () => {
    return (
        <div>
            <Router>
                <Routes>

                    <Route path="/" element={<Inicio />} />
                    <Route path="/Quem" element={<Quem />} />
                    <Route path="/Servece" element={<Servece />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/RecuperarSenha" element={<RecuperarSenha />} />
                    <Route path="/NovaSenha" element={<NovaSenha />} />

                    
                    <Route path="/Dash" element={<Dash />} />
                    <Route path="/Inserirdados" element={<Inserirdados />} />
                    <Route path="/InserirALLdados" element={<InserirALLdados />} />
                    <Route path="/Sair" element={<Sair />} />
                    <Route path="/Temp" element={<Temp />} />
                    <Route path="/Umid" element={<Umid />} />
                    <Route path="/Luz" element={<Luz />} />
                    
                    <Route path="/Morte" element={<Morte />} />
                    <Route path="/Viabilidade" element={<Viabilidade />} />
                    <Route path="/Conversao" element={<Conversao />} />
                    <Route path="/Fator" element={<Fator />} />
                    <Route path="/PESOMEDIO" element={<PESOMEDIO />} />
                    <Route path="/Indice" element={<Indice />} />
                    <Route path="/Ovos" element={<Ovos />} />
                    <Route path="/Ciclo" element={<Ciclo />} />
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Rotas;