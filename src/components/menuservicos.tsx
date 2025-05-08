'use client'
import { Link } from "react-router-dom";
import Login from "@/components/buttons/login";
import Primarybutton from "./buttons/primarybutton";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from "@/assets/Laranjapreto.png";
import Secondbutton from "@/components/buttons/secondbutton";
import Logoo from "@/assets/Logo_Barra.png";
import Linha from "@/assets/Line.png";
import { Button } from "@mui/material";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BurguerButton from "@/components/buttons/burguer";
// import MenuIcon from '@mui/icons-material/Menu';

export default function menuservicos() {

    const [exibirMenu1, setexibirMenu1] = useState<boolean>(false);

    function verificarMenu1() {
        if (exibirMenu1) {
            setexibirMenu1(false);
        } else {
            setexibirMenu1(true);
        }
    }

    return (
        <div className="w-full h-20 bg-[#F5E7C6] shadow-[inset_0_-4px_0_0_#EF820D]">
            <div className="px-5 w-full h-full m-auto flex justify-between items-center gap-10">

                <div>
                    <img className="w-60 " src={Logoo.src} alt="" />
                </div>

                <div className="hidden lg:flex flex-grow gap-10">

                    <Link className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525] " to="/">

                        <Secondbutton
                            text="Início"
                            type="button"

                        />

                    </Link>

                    <Link to="/Quem" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]  "
                    >
                        <Secondbutton

                            text="Quem somos"
                            type="button"

                        />
                    </Link>


                    <Link to="/Servece" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer ">
                        <Primarybutton
                            text="Serviços"
                            type="button"
                        />
                    </Link>

                    <Link to="/Contact" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525] " >
                        <Secondbutton
                            text="Contato"
                            type="button"
                        />
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-9" >
                    <img className="h-15" src={Linha.src} alt="" />
                    <Link to="/Login" className="bg-[#F5E7C6] text-[#222222] px-5 py-6 rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525] ">
                    <Login
                        icon={<AccountCircleOutlinedIcon />}
                        text="Entrar"
                        type="button"
                    />
                    </Link>

                </div>

                <div className="flex lg:hidden">
                    <Button onClick={verificarMenu1}>

                        {exibirMenu1 ? (
                            <HighlightOffIcon />
                        ) : (

                            <BurguerButton />
                        )

                        }
                    </Button>
                </div>
            </div>

            {exibirMenu1 && (
                <div className="bg-[#F5E7C6] w-full h-[100vh-80px] fixed top-20 lg:hidden">
                    <div className="flex flex-col gap-2 px-50">
                    <Link className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525] " to="/">
                    <Secondbutton
                        text="Início"
                        type="button"

                    />
                    </Link>
                        <Link to="/Quem" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525]  ">
                        <Secondbutton
                            text="Quem somos"
                            type="button"
                        />
                        </Link>
                        <Link to="/Servece" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer ">
                        <Primarybutton
                            text="Serviços"
                            type="button"
                        />
                        </Link>
                        <Link to="/Contact" className="px-5 py-full rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525] " >
                        <Secondbutton
                            text="Contato"
                            type="button"
                        />
                        </Link>
                        <Link to="/Login" className="bg-[#F5E7C6] text-[#222222] px-5 py-6 rounded-none flex justify-center items-center transition-all duration-100 font-['Montserrat'] hover:cursor-pointer hover:shadow-[inset_0_-4px_0_0_#9D2525] ">
                        <Login
                            icon={<AccountCircleOutlinedIcon />}
                            text="Entrar"
                            type="button"
                        />
                    </Link>
                    </div>
                </div>
            )}
        </div>
    );
}