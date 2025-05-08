// import { ReactElement } from "react";
'use client'
import { Icon } from "@mui/material";
import { ReactElement } from "react";

type TextButton = {
    text?: string;
    icon?: ReactElement
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export default function login({ text, icon, type = 'button', onClick }: TextButton) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="hover:cursor-pointer"

        >
            {icon}
            {text}

        </button>
    );
}