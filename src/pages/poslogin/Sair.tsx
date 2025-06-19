"use client";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "@/services/firebase";
import Quartobutton from "@/components/buttons/quartobutton";
import Barraleteral from "@/components/barralateral";

export default function Sair() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="flex flex-row w-full min-h-screen bg-[#FFF7E3] flex flex-col overflow-hidden">
      <div><Barraleteral/></div>
      

      <div className="flex flex-grow justify-center items-center">
        <div className="bg-white w-[90%] max-w-md p-8 rounded-lg shadow-lg text-center">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-[#23306A] mb-4">
              Deseja realmente sair?
            </h2>

            <div className="flex flex-col gap-4 w-full">
              <Link to="/" onClick={handleLogout} className="w-full">
                <Quartobutton text="Sim, sair" type="button" />
              </Link>

              <Link to="/Dash" className="w-full">
                <button className="hover:cursor-pointer transition">
                  Cancelar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
