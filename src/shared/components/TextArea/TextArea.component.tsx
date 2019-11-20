import React from 'react';
import { LongText } from './TextArea.styled'

interface ITextAreaProps {
    id?: string;
    placeholder?: string;
    children?: string;
    name?: string;
    value?: string;
    onChange?: (event: any) => void;
    required?: boolean;
    maxLength?: number;
}

export default function TextArea ( {id, name, value, placeholder, children, onChange, required, maxLength}: ITextAreaProps) {
        return (
            <LongText id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} required={required} maxLength={maxLength}>
                {children}
            </LongText>
        );
}

