import React from 'react';
import InputStyled from './Input.styled';
import {LongText} from "../TextArea/TextArea.styled";

interface IInputProps {
    id?: string;
    type: string;
    placeholder?: string;
    name?: string;
    value?: string;
    onChange?: (event: any) => void;
    required?: boolean;
    borderColor?: string;
}

export default function Input({id, name, value, placeholder, onChange, required,  borderColor, type}: IInputProps){

    return (
        <InputStyled id={id} type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} required={required} />
    )
}
