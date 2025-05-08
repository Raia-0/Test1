"use client";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Inicio from "@/pages/inicio1";
import Quem from "@/pages/quemsomos";
import Servece from "@/pages/servicos";
import Contact from "@/pages/contato";
import Login from "@/pages/entrar";
import Register from "@/pages/cadastroo";
import RecuperarSenha from "@/pages/recupsenha";
import NovaSenha from "@/pages/novasenha";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Dash from "@/pages/dashboard";
import Relatório from "@/pages/relatorios";
import Inserirdados from "@/pages/inserirdados";
import InserirALLdados from '@/pages/todosdados';
import Sair from "@/pages/Sair";

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
                <Route path="/Register" element={<Register/>} />
                <Route path="/RecuperarSenha" element={<RecuperarSenha/>} />
                <Route path="/NovaSenha" element={<NovaSenha/>} />

                <Route path="/Dash" element={<Dash />} />
                <Route path="/Inserirdados" element={<Inserirdados />} />
                <Route path="/InserirALLdados" element={<InserirALLdados />} />
                <Route path="/Sair" element={<Sair/>} />

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