import React from 'react';
import StyledButton from './Button.styled';

interface IButtonProps {
    children: React.ReactNode;
    color?: string;
    activeColor?: string;
    type?: 'button' | 'reset' | 'submit';
    onClick?: (event: any) => void;
    value?: string;
    maxHeight?: string;
    minWidth?: string;
    disabled?: boolean;
}

export default function Button({ type, activeColor, color, children, onClick , value, maxHeight, minWidth,disabled}: IButtonProps) {
    return (
        <StyledButton disabled={disabled} type={type} color={color} activeColor={activeColor} onClick={onClick} value={value} maxHeight={maxHeight} minWidth={minWidth}>
            {children}
        </StyledButton>
    )};
