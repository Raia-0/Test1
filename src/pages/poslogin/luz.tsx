"use client";
import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "@/services/firebase";
import Quartobutton from "@/components/buttons/quartobutton";
import Barraleteral from "@/components/MenuCal";

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
    </div>
  );
}
