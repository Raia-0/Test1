import MenuInicio from "@/components/menuini";
import LogoIni from "@/assets/Logoinicio.png";
import Gali from "@/assets/El.png";
export default function inicio1() {
    return (
        <div>
            <MenuInicio />
            <div className="flex flex-col lg:flex-row gap-20 w-screen min-h-screen lg:h-screen bg-[url('/images/background.png')] bg-cover bg-left-top overflow-hidden lg:overflow-hidden">
                <div className="flex flex-col items-start">
                    <div>
                        <img className="pt-30 pl-30" src={LogoIni.src} alt="" />
                    </div>
                    <div className="w-189 h-100 pl-32 pt-8 text-3xl font-['Abhaya'] text-[#FFFFFF]">
                        <p>Conectar você ao melhor sistema de gerenciamento e otimização feito com cuidado e precisão para granjas de aves poedeiras ou de corte. Caso esteja expandindo a sua avicultura ou começando agora, nós somos a sua melhor opção. Aves bem criadas garantem o seu sucesso. Venha descobrir o nosso produto e traga o melhor para a sua granja.</p>
                    </div>
                    {/* Gali.src vai para baixo em telas menores */}
                    <div className="flex lg:hidden justify-center items-center mt-6">
                        <img className="w-auto h-auto" src={Gali.src} alt="" />
                    </div>
                </div>

                {/* Em telas grandes, Gali.src fica ao lado */}
                <div className="hidden lg:flex flex-grow justify-center items-center">
                    <img className="w-auto h-auto" src={Gali.src} alt="" />
                </div>
            </div>
        </div>

    );
}