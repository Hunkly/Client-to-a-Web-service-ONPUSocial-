import React from 'react';
import { LongText } from './TextArea.styled'

export function TextAreaSecond ({id, name, value, placeholder, children, onChange, required, maxLength}) {
        return (
            <LongText id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} required={required} maxLength={maxLength}>
                {children}
            </LongText>
        );
}

