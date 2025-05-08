'use client'
// barrinha
import { ReactElement } from "react";

type TextButton = {
    text?:string;
    type?:'button' | 'submit' | 'reset';
    onClick?:()=> void;
}

export default function primarybutton({text, type='button', onClick}:TextButton){
    return(
        <button
            type={type}
            onClick={onClick}
            className="bg-[#F5E7C6] text-[#9D2525] text-2xl px-5 py-5 shadow-[inset_0_-4px_0_0_#9D2525] rounded-none justify-center items-center font-['Montserrat'] hover:cursor-pointer"
        >
            {text}                                                                                              
        </button>
    );
}