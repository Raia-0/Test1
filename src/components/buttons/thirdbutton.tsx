// submit
'use client'
type TextButton = {
    text?:string;
    type?:'button' | 'submit' | 'reset';
    onClick?:()=> void;
}

export default function thirdbutton({text, type='submit', onClick}:TextButton){
    return(
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-[#9D2525] font-['MontserratSemiBold'] text-xl text-[#FFFFFF] py-3 px-5 rounded-md hover:mouse-pointer hover:cursor-pointer" 
        >
            {text}
        </button>
    );
}

