// submit
'use client'
type TextButton = {
    text?:string;
    type?:'button' | 'submit' | 'reset';
    onClick?:()=> void;
}

export default function quartobutton({text, type='submit', onClick}:TextButton){
    return(
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-[#23306A] font-['MontserratSemiBold'] text-xl text-[#FFFFFF] py-3 px-5 rounded-full hover:mouse-pointer hover:cursor-pointer" 
        >
            {text}
        </button>
    );
}

