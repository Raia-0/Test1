"use client";
import MenuQuem from "@/components/menuquem";
import Footer from "@/components/footer";
import Image from "next/image";
import imgGalinha1 from "@/assets/galinhas1.jpg";
import imgGalinha2 from "@/assets/galinhas2.png";

export default function quemsomos() {
  return (
    <div className="w-full bg-[#FFF7E3] flex flex-col overflow-y-auto ">
      <MenuQuem />

      <main className="shadow-[inset_0_-4px_0_0_#222222] w-full px-6 md:px-20 py-10 flex flex-col gap-16">
        {/* Seção 1 */}
        <section className="flex flex-col lg:flex-row items-center gap-10">
          <img src={imgGalinha1.src} alt="Galinhas" className="w-full max-w-md rounded" />
          <div className="max-w-2xl ">
            <h2 className="text-3xl text-[#B86021] font-semibold mb-4">A solução está mais perto do que você pensa</h2>
            <p className="text-lg text-black">
              O AviControl é uma solução inovadora para o gerenciamento otimizado da sua granja, especialmente projetado para atender às necessidades avícolas.
              Integrando tecnologia avançada, o sistema oferece um amplo monitoramento que permite ao avicultor ter controle total sobre captação de parâmetros ambientais e eficiência da granja.
            </p>
          </div>
        </section>

        <hr className="border-1 border-black w-700px" />

        {/* Seção 2 */}
        <section className="flex flex-col lg:flex-row-reverse items-center gap-10">
          <img src={imgGalinha2.src} alt="Ambiente avícola" className="w-full max-w-xl rounded" />
          <div className="max-w-2xl">
            <h2 className="text-3xl text-[#B86021] font-semibold mb-4">
              Não apenas nos dedicamos ao gerenciamento da granja, mas também nos empenhamos em cuidar da nossa sociedade.
            </h2>
            <p className="text-black text-lg">
              Investimos em tecnologias avançadas para assegurar a otimização e o gerenciamento eficaz do ambiente avícola.
              Nosso objetivo é garantir o melhor bem-estar para as aves.
            </p>
          </div>
        </section>

        <hr className="border-1 border-black w-700px" />

        {/* Seção 3 */}
        <section className="flex  lg:flex-row items-center gap-10">
        <img src={imgGalinha2.src} alt="Ambiente avícola" className="w-full max-w-xl rounded" />
        <div className="max-w-2xl">
          <h2 className="text-3xl text-[#B86021] font-semibold mb-4">
            Em nossas decisões de negócios, priorizamos a segurança, agindo com respeito, cuidado e integridade.
          </h2>
          <p className="text-black text-lg">
            AviControl visa otimizar o ambiente avícola. A escolha do AviControl não apenas transforma a forma como os frangos são criados, mas também representa um passo crucial em direção a um bem-estar de boa qualidade para as aves poedeiras ou de corte.
          </p>
        </div>
        </section>
      </main>

      <div className="flex w-full h-full ">
      <Footer/>
      </div>
    </div>
  );
}
