import Logo from "@/assets/Group 1412.png";
import Insta from "@/components/buttons/insta";
import InstagramIcon from '@mui/icons-material/Instagram';
import Fmm from "@/assets/image 37.png";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full bg-[#F5E7C6] text-white py-8  text-center flex flex-col items-center">
            <div className="w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-20 gap-4 md:gap-0">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img src={Logo.src} alt="Logo" className="w-32" />
                    <p className="w-52 text-sm text-[#222222] mt-2">
                        Fundação Matias Machline<br />
                        Av. Min. João Gonçalves de Souza, 916 - Distrito Industrial I, Manaus - AM, 69075-830
                    </p>
                </div>
                <a target='_blank'
                    rel='noopener noreferrer' href="https://www.instagram.com/avi_control/">
                    <div className="text-[#222222] font-['Montserrat']">

                        <Insta
                            icon={<InstagramIcon />} text="@AviControl_proj" type="button"
                        />
                    </div>
                </a>
                <div className="flex flex-col items-center md:items-end">
                    <img src={Fmm.src} alt="FMM Logo" />
                </div>
            </div>
        </footer>
    );
}

