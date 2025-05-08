// submit
'use client'
type TextButton = {
    text?:string;
    type?:'button' | 'submit' | 'reset';
    onClick?:()=> void;
}

export default function Google({text, type='submit', onClick}:TextButton){
    return(
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-white text-black py-3 px-6 rounded-md border border-[#222222] font-['Montserrat'] hover:bg-gray-100 hover:cursor-pointer"
        >
            {text}
        </button>
    );
}

