// sem barrinha vermelha
"use client"
type TextButton = {
    text?:string;
    type?:'button' | 'submit' | 'reset';
    onClick?:()=> void;
}

export default function secondbutton({text, type='button', onClick}:TextButton){
    return(
        <button
            type={type}
            onClick={onClick}
            className="hover:cursor-pointer"
        >
            {text}
        </button>
    );
}